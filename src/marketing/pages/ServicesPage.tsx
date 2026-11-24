import { Link } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import ProofBadges from '../components/ProofBadges';
import FaqAccordion from '../components/topic/FaqAccordion';
import TrustBand from '../components/journey/TrustBand';
import { highlightTitle } from '../lib/highlight';
import { SITE_URL } from '../data/marketingSeo';
import { PAGE_SEO, breadcrumbJsonLd, organizationJsonLd, webPageJsonLd } from '../data/pageSeo';
import {
  SERVICES_PATH,
  SERVICE_FAQS,
  SERVICE_GROUPS,
  SERVICE_STEPS,
} from '../data/services';
import '../styles/services.css';

const seo = PAGE_SEO.services;

export default function ServicesPage() {
  return (
    <>
      <MarketingSEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        path={SERVICES_PATH}
        faqSchema={SERVICE_FAQS.map((f) => ({ question: f.question, answer: f.answer }))}
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'WhatsApp automation services for Shopify stores in India',
            description: seo.description,
            path: SERVICES_PATH,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: SERVICES_PATH },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'WhatsApp automation services for Shopify stores in India',
            itemListElement: SERVICE_GROUPS.map((g, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: g.title,
              description: g.body,
              url: `${SITE_URL}${SERVICES_PATH}#${g.id}`,
            })),
          },
        ]}
      />
      {/* Framed layout (styles/frame.css, 24 Nov 2026): one column between two
          rails, hairline rows. The seven outcomes are split rows (promise on
          the left, deliverables on the right), the steps are step cells and
          the questions use the shared accordion. Copy is unchanged. */}
      <MarketingPage className="mkt-svc fx">
        <div className="fx-shell">
          <header className="mkt-svc__hero">
            <nav aria-label="Breadcrumb">
              <ol className="fx-crumbs">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li aria-current="page">Services</li>
              </ol>
            </nav>
            <h1 className="mkt-svc__title">
              WhatsApp automation services for{' '}
              <span className="mkt-svc__title-accent">Shopify stores in India</span>
            </h1>
            <p className="mkt-svc__sub">
              Seven things we take responsibility for, from recovering abandoned carts and COD
              orders to getting you through Meta template approval. Your own number, your own
              Meta credentials, 0% markup on Meta India rates.
            </p>
            <div className="mkt-svc__proof">
              <ProofBadges compact />
            </div>
          </header>

          <div className="mkt-svc__intro fx-sec fx-sec--tight fx-sec--tint">
            <p>
              TopEdge AI is software you run yourself, with guided onboarding, not an agency
              retainer. You connect Shopify and your own Meta WhatsApp Cloud API credentials,
              so the number, the template library and the quality rating stay in your name.
              What follows is what the platform is responsible for once that is connected, and
              the page for each capability behind it.
            </p>
          </div>

          <section className="mkt-svc__outcomes fx-sec fx-sec--flush" aria-labelledby="svc-outcomes">
            <div className="fx-head mkt-svc__head">
              <p className="fx-eyebrow">What we do</p>
              <h2 id="svc-outcomes" className="fx-head__title">
                {highlightTitle(
                  'Seven outcomes, and the product behind each one',
                  'behind each one',
                )}
              </h2>
              <p className="fx-head__sub">
                Grouped by the result you are buying rather than by menu item.
              </p>
            </div>
            <ul className="mkt-svc__rows">
              {SERVICE_GROUPS.map((g) => (
                <li key={g.id} id={g.id} className="mkt-svc__row">
                  <div className="mkt-svc__row-main">
                    <h3 className="mkt-svc__row-title">{g.title}</h3>
                    <p className="mkt-svc__row-copy">{g.body}</p>
                  </div>
                  <ul className="mkt-svc__row-list fx-checks">
                    {g.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <div className="mkt-svc__row-links">
                    {g.links.map((l) => (
                      <Link key={l.href} to={l.href}>
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mkt-svc__steps fx-sec" aria-labelledby="svc-steps">
            <div className="fx-head">
              <p className="fx-eyebrow">How it starts</p>
              <h2 id="svc-steps" className="fx-head__title">
                {highlightTitle(
                  'Four steps from signup to a journey that sends',
                  'a journey that sends',
                )}
              </h2>
              <p className="fx-head__sub">
                The only step with a variable timeline is Meta template approval.
              </p>
            </div>
            <ol className="fx-cells fx-cells--4 fx-cells--bleed">
              {SERVICE_STEPS.map((s, i) => (
                <li key={s.title} className="fx-step">
                  <span className="fx-step__num mkt-svc__step-num">{i + 1}</span>
                  <h3 className="fx-step__title">{s.title}</h3>
                  <p className="fx-step__copy">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="mkt-svc__note">
              The full field-by-field walkthrough is on <Link to="/integrations">integrations</Link>
              , and the{' '}
              <Link to="/shopify-whatsapp-integration">Shopify WhatsApp integration guide</Link>{' '}
              covers what syncs once OAuth completes.
            </p>
          </section>

          <section className="mkt-svc__faq fx-sec" aria-labelledby="svc-faq">
            <div className="fx-head">
              <p className="fx-eyebrow">Questions</p>
              <h2 id="svc-faq" className="fx-head__title">
                {highlightTitle('What stores ask before they start', 'before they start')}
              </h2>
            </div>
            <FaqAccordion
              items={SERVICE_FAQS.map((f) => ({ question: f.question, answer: f.answer }))}
            />
          </section>

          <div className="mkt-svc__trust fx-sec">
            <TrustBand title="Used by Shopify brands running COD at scale in India" />
          </div>

          <MarketingCtaBand
            eyebrow="Start free"
            title="Connect Shopify and see what a month of carts is worth"
            highlight="what a month of carts is worth"
            subtitle="14 days free, plans from ₹1,999/mo + GST ($19 on the Shopify App Store), and 0% markup on Meta India rates."
            primaryLabel="Start free"
            secondaryLabel="See pricing"
            secondaryTo="/pricing"
          />
        </div>
      </MarketingPage>
    </>
  );
}
