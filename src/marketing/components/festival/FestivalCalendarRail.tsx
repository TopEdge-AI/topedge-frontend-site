import { Link } from 'react-router-dom';
import { FestivalThumb } from './FestivalImage';
import { festivalPath, upcomingFestivals } from '../../data/festivalTemplates';

/**
 * What is coming next, and how long there is to act.
 *
 * A festive library is only useful against a date. The merchant question is
 * never "which festivals exist" — it is "what do I have to write this week",
 * and a countdown answers it in a glance where a calendar table does not.
 *
 * Resolved at render rather than baked in, because the catalog lists two years
 * per festival and the prerendered HTML would otherwise freeze whatever was
 * next on the day of the build.
 */
export default function FestivalCalendarRail({ limit = 4 }: { limit?: number }) {
  const next = upcomingFestivals(limit);
  if (!next.length) return null;

  return (
    <ul className="mkt-fcal">
      {next.map(({ festival, timing }) => (
        <li key={festival.slug}>
          <Link to={festivalPath(festival.slug)} className="mkt-fcal__item">
            <span className="mkt-fcal__mark">
              <FestivalThumb catalogName={festival.catalogName} />
            </span>
            <span className="mkt-fcal__text">
              <span className="mkt-fcal__name">{festival.shortName}</span>
              <span className="mkt-fcal__date">{timing.fullLabel}</span>
            </span>
            <span className={`mkt-fcal__badge mkt-fcal__badge--${timing.tone}`}>
              {timing.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
