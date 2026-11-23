import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pricing.css';
import '../styles/partners.css';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import PricingSectionHead from '../components/pricing/PricingSectionHead';
import FaqAccordion from '../components/topic/FaqAccordion';
import PartnerCalculator from '../components/partners/PartnerCalculator';
import PartnerAudienceTabs from '../components/partners/PartnerAudienceTabs';
import PartnerContactForm from '../components/partners/PartnerContactForm';
import {
  PartnerFacts,
  PartnerPayouts,
  PartnerSteps,
  PartnerTierLadder,
  PartnerTools,
  PartnerWhy,
  Reveal,
} from '../components/partners/PartnerSections';
import { PARTNER_FAQS } from '../components/partners/partnerFaq';
import { breadcrumbJsonLd, webPageJsonLd } from '../data/pageSeo';
import {
  PARTNER_EMAIL,
  PARTNER_RATE_RANGE,
  PARTNER_SIGNUP_URL,
  PARTNERS_PATH,
  PARTNERS_TERMS_PATH,
} from '../data/partners';
import { BillingCatalog, FALLBACK_CATALOG, fetchBillingCatalog } from '../lib/billingCatalog';

const PARTNERS_SEO = {
  title: `TopEdge AI Partner Program: ${PARTNER_RATE_RANGE} Recurring Commission`,
  description: `Earn ${PARTNER_RATE_RANGE} recurring commission on every TopEdge AI client you refer. Free to join, paid on the 1st of each month by UPI or bank, no minimum payout.`,
  h1: `Earn ${PARTNER_RATE_RANGE} recurring commission on every TopEdge AI client you refer`,
};

function StickyBar({ hide }: { hide: boolean }) {
  return (
    <div className={`mkt-psticky${hide ? '' : ' is-on'}`} aria-hidden={hide}>
      <a className="mkt-btn-primary mkt-psticky__btn" href={PARTNER_SIGNUP_URL} tabIndex={hide ? -1 : 0}>
        Become a partner
      </a>
    </div>
  );
}

export default function PartnersPage() {
  const [catalog, setCatalog] = useState<BillingCatalog>(FALLBACK_CATALOG);
  const heroRef = useRef<HTMLElement>(null);
  const finalRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [finalVisible, setFinalVisible] = useState(false);

  // Live prices with the bundled fallback; a failed fetch shows nothing.
  useEffect(() => {
    let alive = true;
    fetchBillingCatalog()
      .then((live) => {
        if (alive) setCatalog(live);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === heroRef.current) setHeroVisible(e.isIntersecting);
        if (e.target === finalRef.current) setFinalVisible(e.isIntersecting);
      }
    });
    if (heroRef.current) io.observe(heroRef.current);
    if (finalRef.current) io.observe(finalRef.current);
    return () => io.disconnect();
  }, []);

  const plans = ['launch', 'growth', 'scale']
    .map((s) => catalog.plans.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <MarketingSEO
        title={PARTNERS_SEO.title}
        description={PARTNERS_SEO.description}
        path={PARTNERS_PATH}
        noSuffix
        faqSchema={PARTNER_FAQS}
        jsonLd={[
          webPageJsonLd({
            name: 'TopEdge AI Partner Program',
            description: PARTNERS_SEO.description,
            path: PARTNERS_PATH,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Partner program', path: PARTNERS_PATH },
          ]),
        ]}
      />
      <MarketingPage className="mkt-partners">
        {/* 1. Hero with the calculator */}
        <header className="mkt-phero" ref={heroRef}>
          <div className="mkt-phero__panel">
            <img
              className="mkt-phero__bg"
              src="/hero-aurora-preview.jpg"
              alt=""
              width={1024}
              height={576}
              decoding="async"
              aria-hidden
            />
            <div className="mkt-phero__inner">
          <div className="mkt-phero__copy">
            <p className="mkt-phero__eyebrow">TopEdge AI Partner Program</p>
            <h1 className="mkt-phero__title">{PARTNERS_SEO.h1}</h1>
            <p className="mkt-phero__sub">
              You already tell Shopify brands which tools to use. Now that advice pays. Earn a share of every
              payment your referred clients make, for as long as they stay on a paid plan.
            </p>
            <div className="mkt-phero__actions">
              <a className="mkt-btn-primary" href={PARTNER_SIGNUP_URL}>
                Become a partner
              </a>
              <a className="mkt-btn-ghost" href="#payouts">
                See how payouts work
              </a>
            </div>
            <p className="mkt-phero__note">Free to join. Paid on the 1st of every month. No minimum payout.</p>
          </div>
          <div className="mkt-phero__calc">
            <PartnerCalculator plans={plans} />
          </div>
            </div>
          </div>
        </header>

        {/* 2. Facts */}
        <PartnerFacts />

        {/* 3. Why recommend */}
        <PartnerWhy plans={plans} trialDays={catalog.trialDays} />

        {/* 4. Tier ladder */}
        <PartnerTierLadder />

        {/* 5. Who it is for */}
        <Reveal className="mkt-psection" labelledBy="partners-who">
          <PricingSectionHead
            id="partners-who"
            eyebrow="Who it is for"
            title="Built for people who"
            highlight="advise store owners"
          />
          <PartnerAudienceTabs plans={plans} />
        </Reveal>

        {/* 6. How it works */}
        <PartnerSteps />

        {/* 7. Payouts */}
        <PartnerPayouts plans={plans} />

        {/* 8. What you get */}
        <PartnerTools />

        {/* 9. FAQ */}
        <Reveal className="mkt-psection" labelledBy="partners-faq">
          <PricingSectionHead id="partners-faq" eyebrow="FAQ" title="Questions" highlight="partners ask" />
          <FaqAccordion items={PARTNER_FAQS} />
        </Reveal>

        {/* 10. Final call to action and contact form */}
        <section className="mkt-pfinal" ref={finalRef} aria-labelledby="partners-final">
          <div className="mkt-pfinal__cta">
            <h2 className="mkt-pfinal__title" id="partners-final">
              Start with one link.
            </h2>
            <p className="mkt-pfinal__sub">Create your free partner account and share your first link today.</p>
            <a className="mkt-btn-primary mkt-pfinal__btn" href={PARTNER_SIGNUP_URL}>
              Become a partner
            </a>
            <p className="mkt-pfinal__meta">
              Questions first? Write to <a href={`mailto:${PARTNER_EMAIL}`}>{PARTNER_EMAIL}</a>. Read the{' '}
              <Link to={PARTNERS_TERMS_PATH}>Partner Terms</Link>.
            </p>
          </div>
          <PartnerContactForm />
        </section>
      </MarketingPage>
      <StickyBar hide={heroVisible || finalVisible} />
    </>
  );
}
