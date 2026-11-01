import { Link } from 'react-router-dom';
import FestivalMark from './FestivalMark';
import {
  FESTIVAL_STAGES,
  festivalPath,
  festivalTiming,
  type Festival,
} from '../../data/festivalTemplates';

/**
 * A festival, as a card that links to its page.
 *
 * Carries the three things that decide whether a merchant opens it: how far
 * away the festival is, where in India it matters, and the first line of the
 * commercial brief. The four stage chips are there to say, without a sentence,
 * that a page has four ready templates behind it rather than one.
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
      <span className="mkt-fc__mark">
        <FestivalMark festivalName={festival.catalogName} />
      </span>

      <span className="mkt-fc__main">
        <span className="mkt-fc__top">
          <span className="mkt-fc__name">{festival.name}</span>
          {/*
            Only when it adds something. Beyond thirty days out the timing
            label IS the date, and the full date renders on the line below, so
            the pill was printing "17 May 2027" above "Mon, 17 May, 2027".
          */}
          {timing.label && timing.tone !== 'later' && (
            <span className={`mkt-fc__when mkt-fc__when--${timing.tone}`}>{timing.label}</span>
          )}
        </span>

        <span className="mkt-fc__date">{timing.fullLabel || festival.regions}</span>

        {large && <span className="mkt-fc__peak">{festival.peak}</span>}

        <span className="mkt-fc__stages" aria-label="Four templates">
          {FESTIVAL_STAGES.map((s) => (
            <span key={s.id} className="mkt-fc__chip">
              {s.label}
            </span>
          ))}
        </span>
      </span>

      <span className="mkt-fc__go" aria-hidden>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
