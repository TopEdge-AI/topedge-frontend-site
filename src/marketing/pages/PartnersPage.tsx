import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import '../styles/pricing.css';
import '../styles/partners.css';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import ProofBadges from '../components/ProofBadges';
import FaqAccordion from '../components/topic/FaqAccordion';
import PartnerCalculator from '../components/partners/PartnerCalculator';
import {
  PartnerLogos,
  PartnerPayouts,
  PartnerStats,
  PartnerSteps,
  PartnerTierLadder,
  PartnerValue,
  Reveal,
  SecHead,
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
import { COMPANY_PHONE_E164 } from '../legal/companyIdentity';
import { BillingCatalog, FALLBACK_CATALOG, fetchBillingCatalog } from '../lib/billingCatalog';

const PARTNERS_SEO = {
  title: `TopEdge AI Partner Program: ${PARTNER_RATE_RANGE} Recurring Commission`,
  description: `Earn ${PARTNER_RATE_RANGE} recurring commission on every TopEdge AI client you refer. Free to join, paid on the 1st of each month by UPI or bank, no minimum payout.`,
};

const PARTNER_WHATSAPP_URL = `https://wa.me/${COMPANY_PHONE_E164}?text=${encodeURIComponent(
  'Hi TopEdge AI, I want to join the partner program.',
)}`;

function WhatsAppButton({ className = '' }: { className?: string }) {
  return (
    <a className={`pk-btn pk-btn--light ${className}`} href={PARTNER_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
      <img src="/platforms/whatsapp.svg" alt="" width={18} height={18} aria-hidden />
      Chat on WhatsApp
    </a>
  );
}

function StickyBar({ hide }: { hide: boolean }) {
  return (
    <div className={`pk-sticky${hide ? '' : ' is-on'}`} aria-hidden={hide}>
      <a className="pk-btn pk-btn--dark" href={PARTNER_SIGNUP_URL} tabIndex={hide ? -1 : 0}>
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
      <MarketingPage className="pk">
        <div className="pk-shell">
          {/* Hero: copy on white, the earnings card on the dithered panel */}
          <header className="pk-hero" ref={heroRef}>
            <div className="pk-hero__copy">
              <p className="pk-hero__pill">
                <span className="pk-hero__pill-dot" aria-hidden />
                For agencies, freelancers and creators who work with Shopify brands
              </p>
              <h1 className="pk-hero__title">
                Recommend TopEdge AI.
                <span className="pk-hero__accent">Earn {PARTNER_RATE_RANGE}, every month.</span>
              </h1>
              <p className="pk-hero__sub">
                Get recurring commission on every paid plan you refer, for as long as the brand stays.
              </p>
              <div className="pk-hero__actions">
                <a className="pk-btn pk-btn--dark" href={PARTNER_SIGNUP_URL}>
                  Become a partner
                </a>
                <WhatsAppButton />
              </div>
              <ProofBadges compact brief className="pk-hero__proof" />
            </div>
            <div className="pk-hero__stage">
              <PartnerCalculator plans={plans} />
            </div>
          </header>

          <PartnerLogos />
          <PartnerStats />
          <PartnerValue plans={plans} trialDays={catalog.trialDays} />
          <PartnerTierLadder />
          <PartnerSteps />
          <PartnerPayouts plans={plans} />

          <Reveal className="pk-sec pk-faq" labelledBy="partners-faq">
            <SecHead
              id="partners-faq"
              title="Questions"
              muted="partners ask."
              sub="Anything else? Message us on WhatsApp and we reply the same day."
            />
            <FaqAccordion items={PARTNER_FAQS} />
          </Reveal>

          {/* Final call to action: centred, two ways in */}
          <section className="pk-final" ref={finalRef} aria-labelledby="partners-final">
            <div className="pk-final__card">
              <h2 className="pk-final__title" id="partners-final">
                Start with one link.
              </h2>
              <p className="pk-final__sub">Free to join. Your partner link is ready in minutes.</p>
              <div className="pk-final__actions">
                <a className="pk-btn pk-btn--dark" href={PARTNER_SIGNUP_URL}>
                  Become a partner <ArrowRight size={16} aria-hidden />
                </a>
                <WhatsAppButton />
              </div>
              <p className="pk-final__meta">
                Prefer email? <a href={`mailto:${PARTNER_EMAIL}`}>{PARTNER_EMAIL}</a> ·{' '}
                <Link to={PARTNERS_TERMS_PATH}>Partner Terms</Link>
              </p>
            </div>
          </section>
        </div>
      </MarketingPage>
      <StickyBar hide={heroVisible || finalVisible} />
    </>
  );
}
