import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, X } from 'lucide-react';
import { shotFor, shotSrc } from '../shots';
import type { DocMark } from '../types';
import DocInline from './DocInline';

const pct = (n: number) => `${n}%`;
const TAG_MAX = 20;

/**
 * Highlights over a screenshot: a numbered box (or pin) per mark, positioned in
 * percentages so it tracks the image at any width. A short label rides on the
 * tag from tablet up; on phones the tag is the number only. The list under the
 * image always carries every label in full.
 */
function Marks({ marks }: { marks: DocMark[] }) {
  return (
    <>
      {marks.map((m, i) => {
        const boxed = m.w !== undefined && m.h !== undefined;
        // Only a short label rides on the image; a long one would cover the
        // screenshot or run into the next tag, so it lives in the list below.
        const plain = m.label.replace(/\*\*|`/g, '');
        const short = plain.length <= TAG_MAX ? plain : null;
        return (
          <span
            key={i}
            aria-hidden
            className={[
              'docs-mark',
              boxed ? 'docs-mark--box' : 'docs-mark--pin',
              m.place === 'bottom' ? 'is-bottom' : 'is-top',
              m.align === 'right' ? 'is-right' : 'is-left',
            ].join(' ')}
            style={{
              left: pct(m.x),
              top: pct(m.y),
              width: boxed ? pct(m.w as number) : undefined,
              height: boxed ? pct(m.h as number) : undefined,
            }}
          >
            <span className={`docs-mark__tag${short ? '' : ' is-num'}`}>
              <span className="docs-mark__num">{i + 1}</span>
              {short ? <span className="docs-mark__text">{short}</span> : null}
            </span>
          </span>
        );
      })}
    </>
  );
}

/**
 * A dashboard screenshot. Renders nothing when the shot id is not in
 * public/docs/img/shots.json, so a missing capture never breaks a page.
 * Click (or Enter) opens a full-screen view with the same highlights.
 */
export default function DocImage({
  shot,
  alt,
  caption,
  marks,
  inStep = false,
}: {
  shot: string;
  alt: string;
  caption?: string;
  marks?: DocMark[];
  /** Inside a numbered step: tighter margins, no anchor id. */
  inStep?: boolean;
}) {
  const size = shotFor(shot);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!size) return null;
  const src = shotSrc(shot);
  const hasMarks = Boolean(marks?.length);
  // A narrow capture (a dialog) is shown at its own width, not stretched.
  const narrow = size.w < 1000;
  // Every label already rides on the image: the list only repeats it, so it is
  // kept for phones (where tags are numbers only) and hidden from tablet up.
  const allTagged = hasMarks && (marks as DocMark[]).every((m) => m.label.replace(/\*\*|`/g, '').length <= TAG_MAX);

  return (
    <figure
      className={`docs-figure${inStep ? ' docs-figure--step' : ''}${narrow ? ' docs-figure--narrow' : ''}`}
      id={inStep ? undefined : `shot-${shot}`}
    >
      <button
        type="button"
        className="docs-figure__zoom"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge screenshot: ${alt}`}
      >
        <span className="docs-figure__stage">
          <img
            src={src}
            alt={alt}
            width={size.w}
            height={size.h}
            loading="lazy"
            decoding="async"
            className="docs-figure__img"
          />
          {hasMarks ? <Marks marks={marks as DocMark[]} /> : null}
        </span>
        <span className="docs-figure__hint" aria-hidden>
          <Maximize2 size={13} />
          Enlarge
        </span>
      </button>
      {hasMarks ? (
        <ol className={`docs-figure__legend${allTagged ? ' docs-figure__legend--tagged' : ''}`}>
          {(marks as DocMark[]).map((m, i) => (
            <li key={i}>
              <span className="docs-figure__legend-num" aria-hidden>
                {i + 1}
              </span>
              <span>
                <DocInline text={m.label} />
              </span>
            </li>
          ))}
        </ol>
      ) : null}
      {caption ? (
        <figcaption className="docs-figure__caption">
          <DocInline text={caption} />
        </figcaption>
      ) : null}
      {open && typeof document !== 'undefined'
        ? createPortal(
            <div
              className="docs-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={alt}
              onClick={() => setOpen(false)}
            >
              <button
                type="button"
                className="docs-lightbox__close"
                aria-label="Close"
                onClick={() => setOpen(false)}
                autoFocus
              >
                <X size={18} aria-hidden />
              </button>
              <span
                className="docs-lightbox__stage"
                style={{ aspectRatio: `${size.w} / ${size.h}`, maxWidth: `min(100%, ${size.w}px, calc((100dvh - 120px) * ${size.w / size.h}))` }}
              >
                <img src={src} alt="" aria-hidden="true" className="docs-lightbox__img" />
                {hasMarks ? <Marks marks={marks as DocMark[]} /> : null}
              </span>
              {caption ? <p className="docs-lightbox__caption">{caption.replace(/\*\*|`/g, '')}</p> : null}
            </div>,
            document.body,
          )
        : null}
    </figure>
  );
}
