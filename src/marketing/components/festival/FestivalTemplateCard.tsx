import { Link } from 'react-router-dom';
import PhoneMock from '../journey/PhoneMock';
import FestivalMark from './FestivalMark';
import FestivalImage from './FestivalImage';
import {
  FESTIVAL_MARKETING_RATE,
  festivalPath,
  stageSendWindow,
  type FestivalTemplateItem,
} from '../../data/festivalTemplates';

/**
 * One festive template, as a card.
 *
 * The preview is the product, so it shows the template exactly as the dashboard
 * will hand it over: the real body, the real footer line, the real button
 * label, with `[Store Name]` and `[Discount Code]` marked as the blanks a
 * merchant fills rather than quietly swapped for a made-up shop name. A preview
 * that reads better than the thing it previews is a lie the merchant discovers
 * on their first send.
 *
 * The festival artwork goes in the header slot of the message, because that is
 * where a merchant's own festive creative goes when they add one — so the card
 * doubles as a picture of what the template looks like finished.
 */
export default function FestivalTemplateCard({
  item,
  /** Links the festival name through to its page. Off on the festival's own page. */
  linkFestival = true,
  /** Numbers the card by its place in the sequence, for the detail page. */
  step,
}: {
  item: FestivalTemplateItem;
  linkFestival?: boolean;
  step?: number;
}) {
  const { festival, stage, row } = item;

  return (
    <article className="mkt-ftc">
      <header className="mkt-ftc__head">
        <span className="mkt-ftc__mark">
          <FestivalMark festivalName={festival.catalogName} />
        </span>
        {/*
          On the hub the festival is what identifies a card, because the grid
          mixes twenty-five of them. On a festival's own page it is the same
          word four times down the column, so the stage takes the main line and
          the step number becomes the label.
        */}
        <span className="mkt-ftc__heading">
          {linkFestival ? (
            <>
              <Link to={festivalPath(festival.slug)} className="mkt-ftc__festival">
                {festival.shortName}
              </Link>
              <span className="mkt-ftc__stage">{stage.label}</span>
            </>
          ) : (
            <>
              <span className="mkt-ftc__festival">{stage.label}</span>
              <span className="mkt-ftc__stage">{step ? `Step ${step} of 4` : festival.shortName}</span>
            </>
          )}
        </span>
        {/* The real date, not "T-3". A merchant puts a date in a calendar. */}
        <span className="mkt-ftc__when">{stageSendWindow(festival, stage)}</span>
      </header>

      <div className="mkt-ftc__preview">
        <PhoneMock
          businessName="Your store"
          compact
          message={{
            header: 'Festival creative',
            headerArt: <FestivalImage catalogName={festival.catalogName} />,
            body: row.body,
            footer: row.footer,
            buttons: [row.buttonLabel],
          }}
        />
      </div>

      <div className="mkt-ftc__body">
        <h3 className="mkt-ftc__title">{row.internalName}</h3>
        <p className="mkt-ftc__purpose">{stage.purpose}</p>

        {/*
          One line, not a definition list. Four of these sit in a row on a
          desktop now, so a two-column dl was wrapping every value onto three
          lines inside a 300px card.
        */}
        <p className="mkt-ftc__meta">
          <span>{stage.timing}</span>
          <span aria-hidden>·</span>
          <span>
            Marketing <span className="mkt-ftc__rate">{FESTIVAL_MARKETING_RATE}</span>
          </span>
        </p>
        <p className="mkt-ftc__name">
          <code>{row.metaName}</code>
        </p>

        <Link to="/signup" className="mkt-ftc__cta">
          Personalise this
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
