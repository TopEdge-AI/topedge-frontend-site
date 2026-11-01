import { Link } from 'react-router-dom';
import { PrimaryButton } from '../ui';

/**
 * What "personalise" actually means, field by field.
 *
 * The honest answer to "can I customise these?" is yes, and you will have to —
 * every one of these is submitted to Meta from the merchant's own WhatsApp
 * Business account, under their own brand, with their own store name and code
 * in it. A page that showed the templates without saying so would leave a
 * merchant thinking they were sending somebody else's copy.
 *
 * The four steps are the real dashboard path: the festive catalog in Template
 * Manager, Edit & Use to open the template pre-filled, submit to Meta for
 * approval, then schedule the send. Written as what the merchant does rather
 * than what the screen is called, because screen names change.
 */

const FIELDS: { label: string; detail: string }[] = [
  {
    label: 'Your store name and brand voice',
    detail:
      'Every template carries a [Store Name] slot. Fill it once and the rest of the copy is yours to rewrite — the catalog copy is a starting draft, not a fixed script.',
  },
  {
    label: 'Your discount code and offer',
    detail:
      '[Discount Code] is a blank, so the code, the depth and whether there is an offer at all are decisions you make per festival rather than ones the template makes for you.',
  },
  {
    label: 'The button and where it goes',
    detail:
      'Each template ships with one call-to-action button. Change the label, point it at the collection you actually want to land on, or swap it for a quick-reply button.',
  },
  {
    label: 'Festive creative in the header',
    detail:
      'The catalog ships without a media header, because that is the component Meta rejects most often. Add your own festive image or video on your submission when you want one.',
  },
  {
    label: 'Language',
    detail:
      'The catalog is in English. Submit a Hindi, Marathi, Tamil, Telugu, Bengali or Gujarati version of the same template under your own account and send it to the segment it fits.',
  },
  {
    label: 'Who receives it, and when',
    detail:
      'Build the audience from order history, city, past festival purchases or spend, then schedule each of the four messages against the festival date instead of sending them by hand.',
  },
];

const STEPS: { title: string; body: string }[] = [
  {
    title: 'Open the festive catalog',
    body: 'All one hundred templates are in your dashboard under the template library, grouped by festival with the same previews you see on this page.',
  },
  {
    title: 'Edit and use',
    body: 'One click opens the template pre-filled — body, footer and button already in place — so you are editing a draft rather than writing from a blank form.',
  },
  {
    title: 'Submit to Meta',
    body: 'Push it to Meta for approval from inside the dashboard. Approval is usually hours rather than days once your business is verified.',
  },
  {
    title: 'Schedule the sequence',
    body: 'Set the four sends against the festival date, pick the audience for each, and the campaign runs without anyone remembering to press send.',
  },
];

export default function FestivalPersonalise() {
  return (
    <div className="mkt-fper">
      <div className="mkt-fper__fields">
        <h3 className="mkt-fper__h3">What you change</h3>
        <ul className="mkt-fper__list">
          {FIELDS.map((f) => (
            <li key={f.label}>
              <span className="mkt-fper__tick" aria-hidden>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12.5l5 5L20 6.5" />
                </svg>
              </span>
              <span>
                <strong>{f.label}</strong>
                <span className="mkt-fper__detail">{f.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mkt-fper__steps">
        <h3 className="mkt-fper__h3">From catalog to campaign</h3>
        <ol className="mkt-fper__ol">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="mkt-fper__num" aria-hidden>
                {i + 1}
              </span>
              <span>
                <strong>{s.title}</strong>
                <span className="mkt-fper__detail">{s.body}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="mkt-fper__cta">
          <PrimaryButton to="/signup">Personalise these templates free</PrimaryButton>
          <Link to="/features/meta-manager" className="mkt-fper__link">
            See the Meta template manager
          </Link>
        </div>
        <p className="mkt-fper__fine">
          Free for 14 days, no card. Templates are submitted under your own WhatsApp Business
          account, so they stay yours.
        </p>
      </div>
    </div>
  );
}
