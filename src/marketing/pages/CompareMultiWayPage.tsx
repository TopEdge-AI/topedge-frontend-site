import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import CompareStatus from '../components/compare/CompareStatus';
import CompareFaq from '../components/compare/CompareFaq';
import { articleJsonLd, breadcrumbJsonLd, organizationJsonLd, webPageJsonLd } from '../data/pageSeo';
import { updatedKicker } from '../data/contentDates';
import ProofBadges from '../components/ProofBadges';
import ReviewPlatforms from '../components/ReviewPlatforms';
import '../styles/compare.css';

/** One rival column: the label a buyer reads and the key the row cell is under. */
export type MultiWayPeer<K extends string> = {
  key: K;
  name: string;
  logo: string;
  /** Pairwise board for the sourced numbers behind this column. */
  href: string;
};

export type MultiWayConfig<K extends string> = {
  path: string;
  title: string;
  description: string;
  keywords: string;
  /** "3-way" / "4-way", shown in the kicker. */
  ways: string;
  /** Short name for breadcrumbs and the WebPage node. */
  shortName: string;
  peers: MultiWayPeer<K>[];
  rows: ({ id: string; name: string; description?: string; topedge: string } & Record<
    K,
    string
  >)[];
  faqs: { question: string; answer: string }[];
  modifiedIso: string;
  /** Rendered under the board: the other multi-way boards and the hub. */
  alsoSee?: { label: string; href: string }[];
  /**
   * Refreshed layout (Track C, 27 Nov 2026): the two-way template's short
   * answer, dated price table, "which one fits" and numbered FAQ, with one
   * column per vendor. The capability board above is unchanged. When set,
   * `refresh.updated` is the board's own date.
   */
  refresh?: MultiWayRefresh<K>;
};

export type MultiWayRefresh<K extends string> = {
  /** ISO date every competitor fact on this board was last read. */
  updated: string;
  heroSub: string;
  verdict: string;
  priceRows: ({ label: string; topedge: string } & Record<K, string>)[];
  priceNote: string;
  /** One honest line per vendor, TopEdge AI first. */
  fits: { name: string; body: string }[];
  /** Phrase used in "Frequently asked questions about …". */
  faqTopic: string;
};

function readLabel(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

const TE_LOGO = '/logo.png';

/**
 * Shared renderer for every multi-vendor board.
 *
 * The three-way page used to hold this markup inline, which meant a four-way
 * board would have been a 200-line copy that drifts. The peers are data now, so
 * adding a column is a config change.
 */
export default function CompareMultiWayPage<K extends string>({
  config,
}: {
  config: MultiWayConfig<K>;
}) {
  const { path, title, description, keywords, ways, shortName, peers, rows, faqs, refresh } = config;
  const modifiedIso = refresh?.updated ?? config.modifiedIso;
  const boardLabel = ['TopEdge AI', ...peers.map((p) => p.name)].join(' vs ');

  return (
    <>
      <MarketingSEO
        title={title}
        description={description}
        keywords={keywords}
        path={path}
        noSuffix
        faqSchema={faqs}
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({ name: shortName, description, path, dateModified: modifiedIso }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Compare', path: '/compare' },
            { name: shortName, path },
          ]),
          // Same reason as the two-way boards: dated editorial comparison.
          articleJsonLd({
            headline: shortName,
            description,
            path,
            dateModified: modifiedIso,
            section: 'Comparison',
            keywords,
          }),
        ]}
      />
      <MarketingPage className="mkt-cmp fx">
        <div className="fx-shell">
        <header className="mkt-cmp__arena">
          <nav aria-label="Breadcrumb">
            <ol className="fx-crumbs">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/compare">Compare</Link>
              </li>
              <li aria-current="page">{shortName}</li>
            </ol>
          </nav>
          <p className="mkt-cmp__kicker">
            Comparison · {ways}
            <span className="mkt-cmp__asof">
              {' '}
              · <time dateTime={modifiedIso}>{updatedKicker(modifiedIso)}</time>
            </span>
          </p>
          <h1 className="mkt-cmp__h1 mkt-cmp__h1--trio">
            <span className="mkt-cmp__h1-brand">
              {/* alt="" on purpose: the wordmark beside it already says the name. */}
              <img
                src="/brand-mark.png"
                alt=""
                aria-hidden
                width={28}
                height={28}
                className="mkt-cmp__h1-mark"
                decoding="async"
              />
              <span className="mkt-cmp__h1-name">
                TopEdge <span>AI</span>
              </span>
            </span>
            {peers.map((peer) => (
              <span className="mkt-cmp__h1-group" key={peer.key}>
                <span className="mkt-cmp__h1-vs">vs</span>
                <span className="mkt-cmp__h1-peer">
                  <img src={peer.logo} alt={peer.name} width={28} height={28} decoding="async" />
                  <span className="mkt-cmp__h1-peer-name">{peer.name}</span>
                </span>
              </span>
            ))}
          </h1>
          {refresh ? <p className="mkt-cmp__sub">{refresh.heroSub}</p> : null}
          <div className="mkt-cmp__proof">
            <ProofBadges compact />
          </div>
        </header>

        {refresh ? (
          <section className="mkt-cmp__block mkt-cmp__block--answer fx-sec fx-sec--tight" aria-labelledby="cmp-answer">
            <div className="mkt-cmp__answer">
              <h2 id="cmp-answer" className="mkt-cmp__answer-label">
                {boardLabel}: the short answer
              </h2>
              <p>{refresh.verdict}</p>
            </div>
          </section>
        ) : null}
        <section className="mkt-cmp__block mkt-cmp__block--board fx-sec" aria-labelledby="cmp-multi">
          <div className="mkt-cmp__block-head fx-head">
            <h2 id="cmp-multi" className="fx-head__title">
              Capability <span className="mkt-cmp__hl">board</span>
            </h2>
          </div>

          {/* --cmp-cols seats the board: one status column per vendor, so a
              four-vendor row no longer wraps its last column under "Feature". */}
          <div
            className="mkt-cmp__triple-wrap"
            style={{ '--cmp-cols': peers.length + 1 } as CSSProperties}
          >
            <table className="mkt-cmp__triple" aria-label={boardLabel}>
              <thead>
                <tr className="mkt-cmp__triple-head">
                  <th scope="col" className="mkt-cmp__triple-cap">
                    Feature
                  </th>
                  <th scope="col" className="mkt-cmp__triple-col is-te">
                    <img src={TE_LOGO} alt="" width={18} height={18} aria-hidden />
                    TopEdge AI
                  </th>
                  {peers.map((peer) => (
                    <th scope="col" className="mkt-cmp__triple-col" key={peer.key}>
                      <img src={peer.logo} alt="" width={18} height={18} aria-hidden />
                      {peer.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="mkt-cmp__triple-row">
                    <th scope="row" className="mkt-cmp__triple-feat">
                      <span className="mkt-cmp__board-feat">{row.name}</span>
                      {row.description ? (
                        <p className="mkt-cmp__feat-desc">{row.description}</p>
                      ) : null}
                    </th>
                    <td className="mkt-cmp__triple-cell is-te">
                      <span className="mkt-cmp__cell-brand">
                        <img src={TE_LOGO} alt="" width={16} height={16} aria-hidden />
                        TopEdge AI
                      </span>
                      <CompareStatus value={row.topedge} />
                    </td>
                    {peers.map((peer) => (
                      <td className="mkt-cmp__triple-cell" key={peer.key}>
                        <span className="mkt-cmp__cell-brand">
                          <img src={peer.logo} alt="" width={16} height={16} aria-hidden />
                          {peer.name}
                        </span>
                        <CompareStatus value={row[peer.key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mkt-cmp__block mkt-cmp__block--related fx-sec fx-sec--flush">
          <nav className="mkt-cmp__more fx-cells fx-links" aria-label="Pairwise comparisons">
            {peers.map((peer) => (
              <Link to={peer.href} key={peer.key} className="fx-link">
                TopEdge AI vs {peer.name}
              </Link>
            ))}
            {(config.alsoSee ?? []).map((item) => (
              <Link to={item.href} key={item.href} className="fx-link">
                {item.label}
              </Link>
            ))}
            <Link to="/compare" className="fx-link">
              All comparisons
            </Link>
            <Link to="/pricing" className="fx-link">
              TopEdge AI pricing
            </Link>
          </nav>
        </div>

        {refresh ? (
          <>
            <section className="mkt-cmp__block fx-sec" aria-labelledby="cmp-cost">
              <div className="mkt-cmp__block-head fx-head">
                <h2 id="cmp-cost" className="fx-head__title">
                  What each one costs, <span className="mkt-cmp__hl">read {readLabel(refresh.updated)}</span>
                </h2>
              </div>
              <div className="mkt-cmp__cost-wrap">
                <table className="mkt-cmp__cost">
                  <thead>
                    <tr>
                      <th scope="col">What you pay for</th>
                      <th scope="col" className="is-te">TopEdge AI</th>
                      {peers.map((peer) => (
                        <th scope="col" key={peer.key}>
                          {peer.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {refresh.priceRows.map((r) => (
                      <tr key={r.label}>
                        <th scope="row">{r.label}</th>
                        <td className="is-te">{r.topedge}</td>
                        {peers.map((peer) => (
                          <td key={peer.key}>{r[peer.key]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mkt-cmp__fine">{refresh.priceNote}</p>
            </section>

            <section className="mkt-cmp__block fx-sec" aria-labelledby="cmp-fits">
              <div className="mkt-cmp__block-head fx-head">
                <h2 id="cmp-fits" className="fx-head__title">
                  Which one fits <span className="mkt-cmp__hl">which store</span>
                </h2>
              </div>
              <div className="mkt-cmp__gaps fx-cells fx-cells--bleed">
                {refresh.fits.map((f) => (
                  <article key={f.name} className="mkt-cmp__gap fx-step">
                    <h3 className="fx-step__title">{f.name}</h3>
                    <p className="fx-step__copy">{f.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mkt-cmp__block mkt-cmp__block--faq fx-sec" aria-labelledby="cmp-faq">
              <div className="mkt-cmp__block-head fx-head">
                <h2 id="cmp-faq" className="fx-head__title">
                  Frequently asked questions about <span className="mkt-cmp__hl">{refresh.faqTopic}</span>
                </h2>
              </div>
              <ol className="mkt-cmp__qa">
                {faqs.map((f) => (
                  <li key={f.question} className="mkt-cmp__qa-item">
                    <h3 className="mkt-cmp__qa-q">{f.question}</h3>
                    <p className="mkt-cmp__qa-a">{f.answer}</p>
                  </li>
                ))}
              </ol>
            </section>
          </>
        ) : (
        <section className="mkt-cmp__block mkt-cmp__block--faq fx-sec" aria-labelledby="cmp-faq">
          <div className="mkt-cmp__block-head fx-head">
            <h2 id="cmp-faq" className="fx-head__title">
              Common <span className="mkt-cmp__hl">questions</span>
            </h2>
          </div>
          <CompareFaq items={faqs} />
        </section>
        )}

        <section className="mkt-cmp__block mkt-cmp__block--reviews fx-sec" aria-label="Reviews">
          <ReviewPlatforms />
        </section>

        <MarketingCtaBand
          title="Run WhatsApp growth without the markup tax"
          subtitle="0% template markup, BYOK AI, unified identity, and unlimited chatflows, start free on Shopify."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
        </div>
      </MarketingPage>
    </>
  );
}
