import { Link } from 'react-router-dom';
import FestivalImage from './FestivalImage';
import {
  FESTIVAL_STAGES,
  festivalPath,
  festivalTiming,
  type Festival,
} from '../../data/festivalTemplates';

/**
 * A festival, as a card that links to its page.
 *
 * The cover carries the festival's own artwork, because a grid of twenty-five
 * rows that differ only in their text is a list a merchant scrolls past. The
 * countdown sits on the image where the eye already is, and the body keeps the
 * three things that decide whether the card gets opened: the date, the first
 * line of the commercial brief, and the fact that four templates are behind it.
 */
export default function FestivalCard({
  festival,
  /** Larger type and the full buyer line — used on the hub, not the rails. */
  large = false,
}: {
  festival: Festival;
  large?: boolean;
}) {
  const timing = festivalTiming(festival);

  return (
    <Link
      to={festivalPath(festival.slug)}
      className={`mkt-fc${large ? ' mkt-fc--large' : ''}`}
    >
      <span className="mkt-fc__cover">
        <FestivalImage catalogName={festival.catalogName} />
        {/*
          Only when it adds something. Beyond thirty days out the timing label
          IS the date, and the full date renders below, so the badge was
          printing "17 May 2027" above "Mon, 17 May, 2027".
        */}
        {timing.label && timing.tone !== 'later' && (
          <span className={`mkt-fc__when mkt-fc__when--${timing.tone}`}>{timing.label}</span>
        )}
      </span>

      <span className="mkt-fc__main">
        <span className="mkt-fc__name">{festival.name}</span>
        <span className="mkt-fc__date">{timing.fullLabel || festival.regions}</span>

        {large && <span className="mkt-fc__peak">{festival.peak}</span>}

        <span className="mkt-fc__stages" aria-label="Four templates">
          {FESTIVAL_STAGES.map((s) => (
            <span key={s.id} className="mkt-fc__chip">
              {s.label}
            </span>
          ))}
        </span>

        <span className="mkt-fc__go">
          See the 4 templates
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </span>
    </Link>
  );
}
