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
const V = '20261118a';

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

/** True when every slot on the page plays a film, so the coded scenes need not load. */
export const hasClips = (pageId: string) => pageId in PAGES;

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

/**
 * Above-the-fold hero: the <video> is written straight into the HTML so the
 * browser starts it before any JavaScript runs (autoplay needs the `muted`
 * attribute, which React does not serialise, hence the raw markup). The browser
 * picks the 4:3 phone cut itself via <source media>. The poster is the film's
 * first frame, so poster → playback is seamless.
 */
function HeroClip({ clip, label, fallback }: { clip: Clip; label: string; fallback: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const q = `?v=${V}`;
  const b = clip.base;
  const html =
    `<video class="fclip__media" autoplay muted loop playsinline preload="auto" poster="${b}-poster.jpg${q}" aria-hidden="true">` +
    `<source src="${b}-m.webm${q}" type="video/webm" media="${PHONE_HERO}">` +
    `<source src="${b}-m.mp4${q}" type="video/mp4" media="${PHONE_HERO}">` +
    `<source src="${b}.webm${q}" type="video/webm">` +
    `<source src="${b}.mp4${q}" type="video/mp4"></video>`;

  useEffect(() => {
    const v = box.current?.querySelector('video');
    if (!v) return;
    if (window.matchMedia(REDUCED).matches) {
      v.removeAttribute('autoplay');
      v.pause();
      return;
    }
    v.muted = true;
    v.play().catch(() => {});
    const last = v.querySelector('source:last-of-type');
    const onError = () => setFailed(true);
    last?.addEventListener('error', onError);
    // Stop decoding once it scrolls away; resume on return.
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0 });
    io.observe(v);
    return () => {
      io.disconnect();
      last?.removeEventListener('error', onError);
    };
  }, []);

  if (failed) return <>{fallback}</>;
  return <div ref={box} className="fclip fclip--fill" role="img" aria-label={label} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function FeatureClip({ clip, label, wide, fallback }: { clip: Clip; label: string; wide?: boolean; fallback: ReactNode }) {
  if (clip.hero) return <HeroClip clip={clip} label={label} fallback={fallback} />;
  return <SlotClip clip={clip} label={label} wide={wide} fallback={fallback} />;
}

/** Below-the-fold tile or showcase: nothing (not even the poster) loads until one screen away. */
function SlotClip({ clip, label, wide, fallback }: { clip: Clip; label: string; wide?: boolean; fallback: ReactNode }) {
  const ref = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const phone = useMedia(PHONE);
  const reduced = useMedia(REDUCED);
  const [near, setNear] = useState(false);
  const [failed, setFailed] = useState(false);
  const sq = wide && clip.square && phone;
  const base = sq ? `${clip.base}-sq` : clip.base;

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
    <div ref={box} className={`fclip${wide ? ' fclip--wide' : ' fclip--square'}${sq ? ' is-sq' : ''}`} role="img" aria-label={label}>
      {reduced ? (
        near ? <img className="fclip__media" src={`${base}-result.jpg?v=${V}`} alt="" decoding="async" /> : null
      ) : (
        <video
          key={base}
          ref={ref}
          className="fclip__media"
          muted
          loop
          playsInline
          preload="none"
          poster={near ? `${base}-poster.jpg?v=${V}` : undefined}
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
