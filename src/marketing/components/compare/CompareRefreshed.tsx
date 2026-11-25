import MarketingCtaBand from '../MarketingCtaBand';
import type { CompareRefresh } from '../../data/compareRefresh';
import { COMPANY_WHATSAPP_URL } from '../../legal/companyIdentity';

/**
 * Sections for a refreshed two-way board (24 Nov 2026), modelled on the flow of
 * WATI's own vs pages: verdict and "why brands switch" above the capability
 * board; a mid-page CTA, "where X falls short", "where X is the better pick",
 * dated pricing and switch steps below it; a numbered, always-open FAQ at the
 * end. The board in ComparePage is unchanged.
 *
 * Framed layout (24 Nov 2026): every section is an `.fx-sec` row; reasons,
 * gaps and switch steps are `.fx-cells`; the better-pick list is a tick list
 * on a flat tint, so the competitor logo bullets are no longer drawn there.
 */
type Props = {
  refresh: CompareRefresh;
  name: string;
  logo: string;
  logoAlt: string;
  part: 'top' | 'bottom';
};

function dateLabel(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export default function CompareRefreshed({ refresh, name, part }: Props) {
  if (part === 'top') {
    return (
      <>
        <section className="mkt-cmp__block mkt-cmp__block--answer fx-sec fx-sec--tight" aria-labelledby="cmp-answer">
          <div className="mkt-cmp__answer">
            <h2 id="cmp-answer" className="mkt-cmp__answer-label">
              TopEdge AI vs {name}: the short answer
            </h2>
            <p>{refresh.verdict}</p>
          </div>
        </section>

        <section className="mkt-cmp__block fx-sec" aria-labelledby="cmp-switch">
          <div className="mkt-cmp__block-head fx-head">
            <h2 id="cmp-switch" className="fx-head__title">
              Why Shopify brands switch from {name} to <span className="mkt-cmp__hl">TopEdge AI</span>
            </h2>
          </div>
          <div className="mkt-cmp__why fx-cells fx-cells--bleed">
            {refresh.switchReasons.map((r, i) => (
              <article key={r.title} className="mkt-cmp__why-row fx-step">
                <span className="mkt-cmp__why-num fx-step__num" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="mkt-cmp__why-copy">
                  <h3 className="fx-step__title">{r.title}</h3>
                  <p className="fx-step__copy">{r.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </>
    );
  }

  const read = dateLabel(refresh.updated);
  return (
    <>
      <MarketingCtaBand
        variant="inline"
        label={`Try TopEdge AI instead of ${name}`}
        title={`Test it against ${name} on your own orders`}
        highlight="on your own orders"
        subtitle="14 days, 20 orders and 200 sends. No card on this site."
        primaryLabel="Start free"
        secondaryLabel="Chat with us on WhatsApp"
        secondaryHref={COMPANY_WHATSAPP_URL}
      />

      <section className="mkt-cmp__block fx-sec" aria-labelledby="cmp-short">
        <div className="mkt-cmp__block-head fx-head">
          <h2 id="cmp-short" className="fx-head__title">
            Where {name} falls short and <span className="mkt-cmp__hl">TopEdge AI</span> does better
          </h2>
        </div>
        <div className="mkt-cmp__gaps fx-cells fx-cells--bleed">
          {refresh.fallsShort.map((g) => (
            <article key={g.title} className="mkt-cmp__gap fx-step">
              <h3 className="fx-step__title">{g.title}</h3>
              <p className="fx-step__copy">{g.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mkt-cmp__block fx-sec" aria-labelledby="cmp-better">
        <div className="mkt-cmp__block-head fx-head">
          <h2 id="cmp-better" className="fx-head__title">
            Where {name} is the <span className="mkt-cmp__hl">better pick</span>
          </h2>
        </div>
        <ul className="mkt-cmp__fair fx-checks">
          {refresh.betterPick.map((b) => (
            <li key={b}>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mkt-cmp__block fx-sec" aria-labelledby="cmp-cost">
        <div className="mkt-cmp__block-head fx-head">
          <h2 id="cmp-cost" className="fx-head__title">
            TopEdge AI vs {name} <span className="mkt-cmp__hl">pricing</span>
          </h2>
        </div>
        <div className="mkt-cmp__cost-wrap">
          <table className="mkt-cmp__cost">
            <thead>
              <tr>
                <th scope="col">What you pay for</th>
                <th scope="col" className="is-te">TopEdge AI</th>
                <th scope="col">{name}</th>
              </tr>
            </thead>
            <tbody>
              {refresh.priceRows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td className="is-te">{r.topedge}</td>
                  <td>{r.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mkt-cmp__fine">
          Prices read {read}. {refresh.priceNote}
        </p>
      </section>

      <section className="mkt-cmp__block fx-sec" aria-labelledby="cmp-steps">
        <div className="mkt-cmp__block-head fx-head">
          <h2 id="cmp-steps" className="fx-head__title">
            How to switch from {name} in <span className="mkt-cmp__hl">four steps</span>
          </h2>
        </div>
        <ol className="mkt-cmp__steps fx-cells fx-cells--bleed fx-cells--4">
          {refresh.switchSteps.map((st) => (
            <li key={st.title} className="fx-step">
              <h3 className="fx-step__title">{st.title}</h3>
              <p className="fx-step__copy">{st.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

/** Numbered, always-open FAQ (owner rules, 22 and 24 Nov 2026). Schema comes from the same array. */
export function CompareRefreshedClose({ refresh, name }: { refresh: CompareRefresh; name: string }) {
  return (
    <section className="mkt-cmp__block mkt-cmp__block--faq fx-sec" aria-labelledby="cmp-faq-open">
      <div className="mkt-cmp__block-head fx-head">
        <h2 id="cmp-faq-open" className="fx-head__title">
          Frequently asked questions about TopEdge AI vs <span className="mkt-cmp__hl">{name}</span>
        </h2>
      </div>
      <ol className="mkt-cmp__qa">
        {refresh.faqs.map((f) => (
          <li key={f.question} className="mkt-cmp__qa-item">
            <h3 className="mkt-cmp__qa-q">{f.question}</h3>
            <p className="mkt-cmp__qa-a">{f.answer}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
