import { highlightTitle } from '../../lib/highlight';
import '../../styles/journey-flow.css';

const STEPS = [
  {
    title: 'Connect Shopify and WhatsApp',
    body: 'One-click Shopify login and your Meta WhatsApp Business account. No code, no Zapier.',
  },
  {
    title: 'Get the templates approved',
    body: 'Pick the ready-made templates you need and submit them to Meta from the dashboard.',
  },
  {
    title: 'Switch the journey on',
    body: 'Publish it. Every new order or cart now gets the right message at the right time.',
  },
];

export default function HowItWorks({ title = 'Live in three steps' }: { title?: string }) {
  return (
    <section className="mkt-how fx-sec" aria-labelledby="mkt-how-title">
      <div className="fx-head">
        <h2 className="mkt-how__title fx-head__title" id="mkt-how-title">
          {highlightTitle(title)}
        </h2>
      </div>
      <ol className="mkt-how__steps fx-cells fx-cells--bleed">
        {STEPS.map((s, i) => (
          <li key={s.title} className="mkt-how__step fx-step">
            <span className="mkt-how__n fx-step__num" aria-hidden>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mkt-how__step-title fx-step__title">{s.title}</h3>
            <p className="mkt-how__step-body fx-step__copy">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
