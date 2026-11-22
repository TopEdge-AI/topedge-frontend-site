import { useEffect, useRef, useState } from 'react';
import type { TocItem } from '../../lib/blogHtml';

/*
 * "On this page" with live scroll-spy (blog SOP section 8, 22 Nov 2026).
 *
 * Desktop: a sticky rail beside the article; the entry for the section being
 * read lights up with a purple segment on the rail, and the rail scrolls
 * itself (never the page) so the active entry stays in view on long lists.
 * Below 1024px the rail is hidden by CSS and the same links sit in a
 * collapsed "On this page" bar above the article, so a phone reader meets the
 * opening lines first instead of eleven links.
 *
 * Every link is in the served HTML; the observer only adds a class.
 */
export default function BlogToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '');
  const lockRef = useRef<number | null>(null);
  const railRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return undefined;
    const headings = items
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!headings.length) return undefined;

    const visible = new Set<string>();
    const pick = () => {
      if (lockRef.current) return;
      // Bottom of the page: short closing sections never reach the trigger line.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(headings[headings.length - 1].id);
        return;
      }
      // The first heading inside the reading zone wins; otherwise the last one above it.
      const inZone = headings.find((h) => visible.has(h.id));
      if (inZone) {
        setActive(inZone.id);
        return;
      }
      let current = headings[0].id;
      for (const h of headings) {
        if (h.getBoundingClientRect().top < 120) current = h.id;
      }
      setActive(current);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        pick();
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: 0 },
    );
    headings.forEach((h) => io.observe(h));
    window.addEventListener('scroll', pick, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', pick);
    };
  }, [items]);

  // Keep the active entry visible inside the rail's own scroll box only.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || rail.scrollHeight <= rail.clientHeight) return;
    const link = rail.querySelector<HTMLElement>(`a[data-toc-id="${CSS.escape(active)}"]`);
    if (!link) return;
    const top = link.offsetTop - rail.offsetTop;
    if (top < rail.scrollTop + 24 || top > rail.scrollTop + rail.clientHeight - 48) {
      rail.scrollTo({ top: Math.max(0, top - rail.clientHeight / 3), behavior: 'smooth' });
    }
  }, [active]);

  const onClick = (id: string) => {
    setActive(id);
    // Hold the clicked entry while the smooth scroll passes other headings.
    if (lockRef.current) window.clearTimeout(lockRef.current);
    lockRef.current = window.setTimeout(() => {
      lockRef.current = null;
    }, 900);
  };

  const list = (variant: 'rail' | 'bar') => (
    <ol className="mkt-blog-toc__list">
      {items.map((t) => (
        <li key={t.id}>
          <a
            href={`#${t.id}`}
            data-toc-id={variant === 'rail' ? t.id : undefined}
            className={active === t.id ? 'is-active' : undefined}
            aria-current={active === t.id ? 'location' : undefined}
            onClick={() => onClick(t.id)}
          >
            {t.label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details className="mkt-blog-toc-bar">
        <summary>
          <span>On this page</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <nav aria-label="On this page">{list('bar')}</nav>
      </details>
      <aside className="mkt-blog-toc" aria-label="On this page" ref={railRef}>
        <p className="mkt-blog-toc__label">On this page</p>
        <nav>{list('rail')}</nav>
      </aside>
    </>
  );
}
