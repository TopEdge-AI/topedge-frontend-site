import { useEffect, useRef } from 'react';
import { HOME_FILMS } from '../../data/homeFeatureMedia';

export type HomeFilmId = keyof typeof HOME_FILMS;

/**
 * A home-page feature film reused as a landing page's hero visual.
 *
 * Same files as the home page's sticky stories, so a visitor who arrives from
 * an ad sees exactly what the product does in the first screen, and the films
 * stay one set rather than drifting copies. No VideoObject here: the home page
 * owns those files' structured data, and check-video-markup requires each
 * VideoObject to be unique to one URL.
 *
 * Poster first, `preload="none"`, muted and inline. The phone cut (portrait)
 * is chosen with `<source media>`; the clip only plays while on screen, and
 * reduced-motion visitors keep the poster.
 */
export default function LandingFilm({ film, label }: { film: HomeFilmId; label: string }) {
  const media = HOME_FILMS[film];
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The phone cut is portrait, so its poster has to be too.
    if (media.mobilePoster && window.matchMedia?.('(max-width: 640px)').matches) {
      el.poster = media.mobilePoster;
    }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {
            /* Autoplay can be refused; the poster stays, which is fine. */
          });
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [media.mobilePoster]);

  return (
    <video
      ref={ref}
      className="mkt-lp-film"
      poster={media.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      width={1600}
      height={900}
    >
      {media.mobileSrc && <source src={media.mobileSrc} type="video/mp4" media="(max-width: 640px)" />}
      <source src={media.src} type="video/mp4" />
    </video>
  );
}
