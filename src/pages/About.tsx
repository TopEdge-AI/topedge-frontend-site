import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BadgeCheck, LineChart, Megaphone, MessagesSquare, Workflow, Users } from 'lucide-react';
import MarketingSEO from '../marketing/components/MarketingSEO';
import {
  PAGE_SEO,
  organizationJsonLd,
  ORG_REF,
  WEBSITE_ID,
  breadcrumbJsonLd,
} from '../marketing/data/pageSeo';
import { SITE_URL } from '../marketing/data/marketingSeo';
import MarketingPage from '../marketing/components/MarketingPage';
import MarketingCtaBand from '../marketing/components/MarketingCtaBand';
import { highlightTitle } from '../marketing/lib/highlight';
import '../marketing/styles/about.css';

const founders = [
  {
    name: 'Moksh Patel',
    role: 'Co-founder · Product',
    image: '/marketing/team/moksh-patel.jpg',
    imageAlt: 'Moksh Patel, Co-founder of TopEdge AI',
    bio: 'Builds the Shopify ↔ Meta ↔ WhatsApp product: journeys, Live Chat, template hygiene, and recovery math operators can trust.',
  },
  {
    name: 'Smit Tilva',
    role: 'Co-founder · Growth',
    image: '/marketing/team/smit-tilva.jpg',
    imageAlt: 'Smit Tilva, Co-founder of TopEdge AI',
    bio: 'Runs go-to-market with merchants: onboarding, DFY setup, and getting cart recovery and COD flows live without the fluff.',
  },
];

const brands = [
  {
    name: 'Delitech Smart Home',
    href: 'https://delitechsmarthome.in/',
    logo: '/trust/delitech-white.png',
    tag: 'Smart security · India',
    copy: 'Video doorbells and home security for Indian families, with Amazon Choice traction and WhatsApp as a primary support channel. TopEdge AI keeps cart recovery, order updates, and help on the same thread.',
    stats: ['2K+ customers', 'Amazon Choice', '24×7 support'],
  },
  {
    name: 'Apex Light',
    href: 'https://apexlight.in/',
    logo: '/trust/apex-white.png',
    tag: 'Smart lighting · India',
    copy: 'Shopify-native smart lighting, RGBIC, floor lamps, TV sync, for buyers across India. TopEdge AI runs WhatsApp carts, prepaid nudges, and post-purchase support without rebuilding flows every drop.',
    stats: ['50K+ customers', 'RGBIC category', 'Ahmedabad D2C'],
  },
];

function aboutPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About TopEdge AI',
    description: PAGE_SEO.about.description,
    url: `${SITE_URL}/about`,
    // Both by reference. Until 24 Nov 2026 this nested a second, anonymous
    // Organization with its own founders and a differently split address, so
    // the page described the company twice with two sets of facts (schema
    // audit, seo-audit/2026-11-24/full-audit/03-schema.md). The full node,
    // founders included, is organizationJsonLd() in the same graph.
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: ORG_REF,
  };
}

const modules = [
  { name: 'Journeys & cart recovery', desc: 'Win back abandoned checkouts on WhatsApp and email', href: '/features/journeys', icon: Workflow },
  { name: 'COD confirmation', desc: 'Confirm COD orders and move them to prepaid', href: '/features/cod-confirmation', icon: BadgeCheck },
  { name: 'Campaigns', desc: 'Broadcasts that report revenue after Meta fees', href: '/features/campaigns', icon: Megaphone },
  { name: 'Audience CRM', desc: 'One profile for every shopper and order', href: '/features/audience-crm', icon: Users },
  { name: 'Flow builder & live chat', desc: 'Answer order questions with live Shopify data', href: '/features/flow-builder', icon: MessagesSquare },
  { name: 'Profit & costs', desc: 'True profit on every order, after RTO', href: '/features/profit-loss', icon: LineChart },
];

export default function About() {
  return (
    <>
      <MarketingSEO
        title={PAGE_SEO.about.title}
        description={PAGE_SEO.about.description}
        keywords={PAGE_SEO.about.keywords}
        path={PAGE_SEO.about.path}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          aboutPageJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />
      <MarketingPage className="mkt-about2 fx">
        {/*
          Layout and motion after kachingappz.com/about (owner, 22 Nov 2026):
          a letter on notebook paper that settles in and marks that draw
          themselves. Our font, our words, our facts.

          24 Nov 2026: the page sits in the framed column (styles/frame.css).
          The letter is the deliberate left-aligned exception; it now lies on
          the stage row instead of floating on open white.
        */}
        <div className="fx-shell">
        <header className="mkt-about2__stage fx-stage fx-stage--soft">
          <nav aria-label="Breadcrumb">
            <ol className="fx-crumbs">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li aria-current="page">About</li>
            </ol>
          </nav>
          <div className="mkt-about2__sheet">
          <article className="mkt-about2__letter" aria-labelledby="about-title">
            <h1 id="about-title" className="mkt-about2__h1">
              Built in Ahmedabad,
              <br />
              <span className="mkt-hl">for Shopify brands.</span>
            </h1>
            <div className="mkt-about2__body">
              <p>
                TopEdge AI is all-in-one D2C software for Shopify stores, built as one suite. We
                started it in 2024 because Indian brands were stitching five apps together to
                recover carts, confirm COD orders and answer &ldquo;where is my order?&rdquo; on
                WhatsApp.
              </p>
              <p>
                So we put it in{' '}
                <span className="mkt-about2__mark mkt-about2__mark--hl" style={{ '--m': 0 } as CSSProperties}>
                  one suite
                </span>
                : cart recovery, COD confirmation, campaigns, a shopper CRM, live chat and profit
                reporting, priced in rupees with 0% markup on Meta&rsquo;s rates. Every plan starts
                with{' '}
                <span className="mkt-about2__mark mkt-about2__mark--ul" style={{ '--m': 1 } as CSSProperties}>
                  a 14-day free trial
                </span>
                .
              </p>
              <p>
                If something could be better,{' '}
                <Link to="/contact" className="mkt-about2__mark mkt-about2__mark--ul" style={{ '--m': 2 } as CSSProperties}>
                  tell us
                </Link>
                . It shapes what we build next.
              </p>
            </div>
            <div className="mkt-about2__founders">
              {founders.map((f, i) => (
                <figure key={f.name} className="mkt-about2__founder" style={{ '--s': i } as CSSProperties}>
                  <span className="mkt-about2__photo">
                    <img src={f.image} alt={f.imageAlt} width={72} height={84} loading="eager" decoding="async" />
                  </span>
                  <figcaption>
                    <span className="mkt-about2__name">{f.name}</span>
                    <span className="mkt-about2__role">{f.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </article>
          </div>
        </header>

          <section className="mkt-about2__section fx-sec" aria-labelledby="about-build">
            <div className="mkt-about2__head">
              <div>
                <h2 id="about-build" className="mkt-about2__h2">
                  {highlightTitle('What we build.', 'build.')}
                </h2>
                <p className="mkt-about2__sub">
                  Six modules, one customer record.
                  <br />
                  Start with one and switch on the rest when you need them.
                </p>
              </div>
              <Link to="/features" className="mkt-about2__all">
                All features <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mkt-about2__grid fx-cells fx-cells--bleed">
              {modules.map((m) => (
                <li key={m.name}>
                  <Link to={m.href} className="mkt-about2__cell">
                    <span className="mkt-about2__icon" aria-hidden>
                      <m.icon className="h-5 w-5" />
                    </span>
                    <span className="mkt-about2__cell-text">
                      <span className="mkt-about2__cell-name">{m.name}</span>
                      <span className="mkt-about2__cell-desc">{m.desc}</span>
                    </span>
                    <ArrowUpRight aria-hidden className="mkt-about2__cell-arrow h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mkt-about2__section fx-sec" aria-labelledby="about-brands">
            <div className="mkt-about2__head">
              <div>
                <h2 id="about-brands" className="mkt-about2__h2">
                  {highlightTitle('Brands that run on it.', 'run on it.')}
                </h2>
                <p className="mkt-about2__sub">Shopify brands in India using TopEdge AI today.</p>
              </div>
              <Link to="/customers" className="mkt-about2__all">
                Customer stories <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mkt-about2__grid mkt-about2__grid--two fx-cells fx-cells--2 fx-cells--bleed">
              {brands.map((b) => (
                <li key={b.name}>
                  <a href={b.href} target="_blank" rel="noopener noreferrer" className="mkt-about2__cell mkt-about2__cell--brand">
                    <span className="mkt-about2__cell-text">
                      <span className="mkt-about2__cell-name">{b.name}</span>
                      <span className="mkt-about2__cell-desc">{b.tag}</span>
                      <span className="mkt-about2__cell-copy">{b.copy}</span>
                    </span>
                    <ArrowUpRight aria-hidden className="mkt-about2__cell-arrow h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

        <MarketingCtaBand
          title="Grow your Shopify brand with one suite."
          highlight="with one suite."
          subtitle="Flat INR plans from ₹1,999/mo, or $19 on the Shopify App Store. 14-day free trial."
          primaryLabel="Start free trial"
          secondaryLabel="Talk to our team"
          secondaryTo="/contact"
        />
        </div>
      </MarketingPage>
    </>
  );
}
