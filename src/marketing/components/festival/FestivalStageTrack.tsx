import { FESTIVAL_STAGES } from '../../data/festivalTemplates';

/**
 * The four-message arc, as a track.
 *
 * The catalog has always been four templates per festival; what it never said
 * is that the order is the product. Each message on its own is a blast. Run in
 * sequence they are a campaign — pull demand forward, remove the indecision,
 * discount only what is left, then close on goodwill so the list survives to
 * the next festival. This block is where the page makes that argument, so the
 * cards underneath read as a sequence rather than four alternatives.
 */
export default function FestivalStageTrack({
  /** Festival name, where the track is shown on a single festival's page. */
  festivalName,
}: {
  festivalName?: string;
}) {
  return (
    <ol className="mkt-fst">
      {FESTIVAL_STAGES.map((stage, i) => (
        <li key={stage.id} className="mkt-fst__step">
          <div className="mkt-fst__rail" aria-hidden>
            <span className="mkt-fst__dot">{i + 1}</span>
          </div>
          <div className="mkt-fst__body">
            <p className="mkt-fst__when">{stage.timing}</p>
            <h3 className="mkt-fst__title">{stage.label}</h3>
            <p className="mkt-fst__purpose">{stage.purpose}</p>
            <p className="mkt-fst__why">{stage.why}</p>
          </div>
        </li>
      ))}
      {festivalName && (
        <li className="mkt-fst__note">
          All four are marketing templates. {festivalName} is one of twenty-five festivals with
          the same four ready in the dashboard.
        </li>
      )}
    </ol>
  );
}
