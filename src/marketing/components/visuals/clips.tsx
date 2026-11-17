/**
 * Rendered film clips for feature-page slots (see docs/video/feature-library and
 * /video). Where a clip exists for a slot's image key it plays instead of the
 * coded scene; the coded scene stays as the fallback if the video can't play.
 *
 * Loading: nothing is fetched until the slot is near the viewport; the clip only
 * plays while visible; reduced-motion users get the result poster, no video.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';

type Clip = {
  /** Base path without extension, e.g. /marketing/feature-clips/journeys/t1 */
  base: string;
  /** Showcases ship a 1:1 cut for phones (the slot turns square there). */
  square?: boolean;
  /** 16:9 heroes ship a 4:3 cut for phones (the hero frame turns 4:3 there). */
  hero?: boolean;
};

const DIR = '/marketing/feature-clips';
const V = '20261117c';

/**
 * Clips by page slot: `${pageId}:h` (hero), `:t1..` (bento tiles), `:s1..` (showcase
 * rows). Keyed by slot rather than image because some pages reuse one image in
 * several slots, and some rows have no image at all.
 */
type PageClips = { dir: string; hero?: boolean; tiles: number; shows: number };
const PAGES: Record<string, PageClips> = {
  'flow-builder': { dir: 'flow', tiles: 3, shows: 3 },
  'opt-in-tools': { dir: 'optin', tiles: 3, shows: 4 },
  campaigns: { dir: 'campaigns', hero: true, tiles: 3, shows: 3 },
  'audience-crm': { dir: 'crm', hero: true, tiles: 3, shows: 3 },
  journeys: { dir: 'journeys', tiles: 3, shows: 3 },
  'tracking-pixel': { dir: 'pixel', hero: true, tiles: 3, shows: 3 },
  'ai-brain': { dir: 'brain', hero: true, tiles: 3, shows: 3 },
  'meta-manager': { dir: 'meta', hero: true, tiles: 3, shows: 3 },
  'chat-rules': { dir: 'rules', hero: true, tiles: 3, shows: 3 },
  warranty: { dir: 'warranty', hero: true, tiles: 0, shows: 3 },
  'profit-loss': { dir: 'profit', hero: true, tiles: 3, shows: 3 },
  'intent-detection': { dir: 'intent', tiles: 3, shows: 3 },
};

/** slot: 'h' | 't1'.. | 's1'.. */
export function clipFor(pageId: string, slot: string): Clip | null {
  const p = PAGES[pageId];
  if (!p) return null;
  const base = `${DIR}/${p.dir}/${slot}`;
  if (slot === 'h') return p.hero ? { base, hero: true } : null;
  const n = Number(slot.slice(1));
  if (slot[0] === 't') return n >= 1 && n <= p.tiles ? { base } : null;
  if (slot[0] === 's') return n >= 1 && n <= p.shows ? { base, square: true } : null;
  return null;
}

const PHONE = '(max-width: 640px)';
const PHONE_HERO = '(max-width: 767px)';
const REDUCED = '(prefers-reduced-motion: reduce)';

function useMedia(q: string) {
  const [on, setOn] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const fn = () => setOn(m.matches);
    fn();
    m.addEventListener('change', fn);
    return () => m.removeEventListener('change', fn);
  }, [q]);
  return on;
}

export function FeatureClip({ clip, label, wide, fallback }: { clip: Clip; label: string; wide?: boolean; fallback: ReactNode }) {
  const ref = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const phone = useMedia(PHONE);
  const phoneHero = useMedia(PHONE_HERO);
  const reduced = useMedia(REDUCED);
  const [near, setNear] = useState(false);
  const [failed, setFailed] = useState(false);
  const sq = wide && clip.square && phone;
  const m43 = clip.hero && phoneHero;
  const base = sq ? `${clip.base}-sq` : m43 ? `${clip.base}-m` : clip.base;

  // Fetch once the slot comes within a screen of the viewport.
  useEffect(() => {
    const el = box.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === 'undefined') return setNear(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '100% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  // Sources are added once near; the element has to be told to pick them up.
  useEffect(() => {
    if (near && !reduced) ref.current?.load();
  }, [near, reduced, base]);

  // Play only while at least a third of it is on screen.
  useEffect(() => {
    const v = ref.current;
    if (!v || !near || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.33) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: [0, 0.33, 0.6] },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [near, reduced, base]);

  if (failed) return <>{fallback}</>;

  return (
    <div ref={box} className={`fclip${clip.hero ? ' fclip--fill' : wide ? ' fclip--wide' : ' fclip--square'}${sq ? ' is-sq' : ''}`} role="img" aria-label={label}>
      {reduced ? (
        <img className="fclip__media" src={`${base}-result.jpg?v=${V}`} alt="" loading="lazy" decoding="async" />
      ) : (
        <video
          key={base}
          ref={ref}
          className="fclip__media"
          muted
          loop
          playsInline
          preload="none"
          poster={`${base}-poster.jpg?v=${V}`}
          aria-hidden="true"
          onError={() => setFailed(true)}
        >
          {near ? <source src={`${base}.webm?v=${V}`} type="video/webm" /> : null}
          {near ? <source src={`${base}.mp4?v=${V}`} type="video/mp4" onError={() => setFailed(true)} /> : null}
        </video>
      )}
    </div>
  );
}
