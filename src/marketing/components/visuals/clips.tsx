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
const V = '20261117a';

/** Keyed by the slot's image path (without query), as productPages.ts carries it. */
export const CLIPS: Record<string, Clip> = {
  '/journey-sub-feature/4.webp': { base: `${DIR}/journeys/t1` },
  '/journey-sub-feature/5.webp': { base: `${DIR}/journeys/t2` },
  '/journey-sub-feature/6.webp': { base: `${DIR}/journeys/t3` },
  '/journey-sub-feature/10.webp': { base: `${DIR}/journeys/s1`, square: true },
  '/journey-sub-feature/11.webp': { base: `${DIR}/journeys/s2`, square: true },
  '/journey-sub-feature/12.webp': { base: `${DIR}/journeys/s3`, square: true },
  '/campaign-sub-feature/13.webp': { base: `${DIR}/campaigns/t1` },
  '/campaign-sub-feature/14.webp': { base: `${DIR}/campaigns/t2` },
  '/campaign-sub-feature/15.webp': { base: `${DIR}/campaigns/t3` },
  '/campaign-sub-feature/21.webp': { base: `${DIR}/campaigns/s1`, square: true },
  '/campaign-sub-feature/22.webp': { base: `${DIR}/campaigns/s2`, square: true },
  '/campaign-sub-feature/20.webp': { base: `${DIR}/campaigns/s3`, square: true },
  '/audience-crm-sub-feature/16.webp': { base: `${DIR}/crm/t1` },
  '/audience-crm-sub-feature/18.webp': { base: `${DIR}/crm/t2` },
  '/audience-crm-sub-feature/17.webp': { base: `${DIR}/crm/t3` },
  '/leaadd.webp': { base: `${DIR}/crm/s1`, square: true },
  '/audience-crm-sub-feature/360.webp': { base: `${DIR}/crm/s2`, square: true },
  '/audience-crm-sub-feature/crm-segement.webp': { base: `${DIR}/crm/s3`, square: true },
};

/** Page heroes, keyed by the hero image path. Kept apart from CLIPS because the
 *  same image can also appear as a tile elsewhere, where the hero film is wrong. */
export const HERO_CLIPS: Record<string, Clip> = {
  '/campaignn.webp': { base: `${DIR}/campaigns/h`, hero: true },
  '/audience-crm-hero.webp': { base: `${DIR}/crm/h`, hero: true },
};

const keyOf = (src: string) => src.split('?')[0];
export const clipFor = (src: string): Clip | null => CLIPS[keyOf(src)] ?? null;
export const heroClipFor = (src: string): Clip | null => HERO_CLIPS[keyOf(src)] ?? null;

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
