import type { ReactNode } from 'react';
import BrandWord from '../components/BrandWord';
import MarketingSEO from '../components/MarketingSEO';
import {
  PAGE_SEO,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import ProductDemoVideo from '../components/home/ProductDemoVideo';
import { MARKETING_FEATURES, type MarketingFeature } from '../data/features';
/*
 * No videoObjectJsonLd here, deliberately.
 *
 * This is the feature index; the cart-recovery clip on it is illustrative, and
 * the same file is embedded on a dozen other routes (PRODUCT_DEMO_ASSETS maps
 * CART to 16 scene ids). GSC reported that exact clip as "Video isn't on a
 * watch page" from three different URLs — /features, /features/live-chat/ and
 * /solutions/beauty/ — because no single page was its home. An index page is
 * the weakest of those claims, so it makes none. The four feature detail pages
 * whose clip demonstrates that one feature keep their markup.
 */
import { demoAssetFor } from '../data/productDemoVideos';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  GitBranch,
  IndianRupee,
  Instagram,
  Megaphone,
  MessagesSquare,
  MousePointerClick,
  RefreshCw,
  ScanSearch,
  ShieldCheck,
  Split,
  UserCheck,
  UserPlus,
  Users,
  Workflow,
} from 'lucide-react';
import '../styles/features-hub.css';

const ICON_PROPS = { size: 20, strokeWidth: 1.9, 'aria-hidden': true } as const;

const CARD_META: Record<string, { label: string; icon: ReactNode }> = {
  journeys: { label: 'Journeys', icon: <Workflow {...ICON_PROPS} /> },
  campaigns: { label: 'Campaigns', icon: <Megaphone {...ICON_PROPS} /> },
  'flow-builder': { label: 'Flow Builder', icon: <GitBranch {...ICON_PROPS} /> },
  'opt-in-tools': { label: 'Opt-in tools', icon: <UserPlus {...ICON_PROPS} /> },
  instagram: { label: 'Instagram', icon: <Instagram {...ICON_PROPS} /> },
  'live-chat': { label: 'Live Chat', icon: <MessagesSquare {...ICON_PROPS} /> },
  'chat-rules': { label: 'Chat rules', icon: <Split {...ICON_PROPS} /> },
  'ai-brain': { label: 'AI Brain', icon: <BrainCircuit {...ICON_PROPS} /> },
  'intent-detection': { label: 'Intent detection', icon: <ScanSearch {...ICON_PROPS} /> },
  warranty: { label: 'Warranty', icon: <ShieldCheck {...ICON_PROPS} /> },
  'meta-manager': { label: 'Meta Manager', icon: <BadgeCheck {...ICON_PROPS} /> },
  'audience-crm': { label: 'Audience CRM', icon: <Users {...ICON_PROPS} /> },
  analytics: { label: 'Tracking Pixel', icon: <MousePointerClick {...ICON_PROPS} /> },
  'profit-loss': { label: 'Profit and costs', icon: <IndianRupee {...ICON_PROPS} /> },
  'cod-confirmation': { label: 'COD confirmation', icon: <ShieldCheck {...ICON_PROPS} /> },
  'cod-to-prepaid': { label: 'COD to prepaid', icon: <IndianRupee {...ICON_PROPS} /> },
  'order-updates': { label: 'Order updates', icon: <RefreshCw {...ICON_PROPS} /> },
};

/*
 * Four plain jobs, in the order a store meets them. The product is one
 * WhatsApp app for Shopify, so the hub is organised by what it gets done,
 * not by the name of each dashboard tab.
 */
type HubCard = { key: string; href: string; label?: string; title: string; body: string };

/** Pages that are not in MARKETING_FEATURES but belong to a job. */
const EXTRA_CARDS: Record<string, HubCard> = {
  'cod-confirmation': {
    key: 'cod-confirmation',
    href: '/features/cod-confirmation',
    label: 'COD confirmation',
    title: 'Confirm every COD order before it ships',
    body: 'A ₹0.115 WhatsApp utility message asks the buyer to confirm, so you ship only confirmed orders. On every plan.',
  },
  'cod-to-prepaid': {
    key: 'cod-to-prepaid',
    href: '/whatsapp-journey-examples/cod-to-prepaid',
    label: 'COD to prepaid',
    title: 'Move COD orders to prepaid',
    body: 'After the order is confirmed, a second message offers UPI or card before dispatch. On Growth and Scale.',
  },
  'order-updates': {
    key: 'order-updates',
    href: '/whatsapp-journey-examples/order-status-updates',
    label: 'Order updates',
    title: 'Order updates that stop the questions',
    body: 'Confirmed, shipped with tracking, delivered and cancelled, each a utility template at ₹0.115.',
  },
};

const GROUPS = [
  {
    id: 'sell',
    lead: 'Recover',
    accent: 'revenue',
    sub: 'Win back abandoned carts and sell to a consented WhatsApp list.',
    slugs: ['journeys', 'campaigns', 'opt-in-tools', 'audience-crm', 'meta-manager'],
  },
  {
    id: 'cod',
    lead: 'Protect',
    accent: 'COD orders',
    sub: 'Confirm before dispatch, move buyers to prepaid, keep them updated.',
    slugs: ['cod-confirmation', 'cod-to-prepaid', 'order-updates'],
  },
  {
    id: 'support',
    lead: 'Support',
    accent: 'customers',
    sub: 'AI replies, flows and routing that already know the order.',
    slugs: ['ai-brain', 'flow-builder', 'intent-detection', 'chat-rules', 'warranty'],
  },
  {
    id: 'measure',
    lead: 'Know your',
    accent: 'profit',
    sub: 'Net profit after COD, RTO and ads, plus who is browsing right now.',
    slugs: ['profit-loss', 'analytics'],
  },
] as const;

const PRINCIPLES = [
  {
    icon: <RefreshCw {...ICON_PROPS} />,
    title: 'Shopify is source of truth',
    body: 'Connect once. Catalog, carts and orders sync from your store.',
  },
  {
    icon: <BadgeCheck {...ICON_PROPS} />,
    title: 'You approve Meta templates',
    body: 'Nothing sends until Meta approves the template. Meta rates pass through at 0% markup.',
  },
  {
    icon: <UserCheck {...ICON_PROPS} />,
    title: 'Operators stay in control',
    body: 'An agent taking over a chat pauses the AI. Journeys and flows need no developer.',
  },
];

function cardFor(slug: string, bySlug: Map<string, MarketingFeature>): HubCard | null {
  const extra = EXTRA_CARDS[slug];
  if (extra) return extra;
  const feature = bySlug.get(slug);
  if (!feature) return null;
  return { key: slug, href: `/features/${slug}`, title: feature.title, body: feature.body };
}

function FeatureCard({ card }: { card: HubCard }) {
  const meta = CARD_META[card.key];
  return (
    <Link to={card.href} className="mkt-fx-card">
      <div className="mkt-fx-card__top">
        <span className="mkt-fx-card__icon">{meta?.icon}</span>
        <span className="mkt-fx-card__label">{card.label ?? meta?.label ?? card.key}</span>
        <ArrowUpRight className="mkt-fx-card__arrow" size={18} aria-hidden />
      </div>
      <h3>{card.title}</h3>
      <p>{card.body}</p>
    </Link>
  );
}

export default function FeaturesPage() {
  const seo = PAGE_SEO.features;
  const bySlug = new Map(MARKETING_FEATURES.map((f) => [f.slug, f]));
  return (
    <>
      <MarketingSEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        path={seo.path}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({ name: 'Features', description: seo.description, path: seo.path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Features', path: '/features' },
          ]),
          // Hero demo is the page's lead visual, so it is main content.
        ]}
      />
      <MarketingPage className="mkt-fx">
        <header className="mkt-fx__hero">
          <p className="mkt-fx__eyebrow">Features</p>
          <h1 className="mkt-fx__h1">
            TopEdge AI features for <BrandWord platform="shopify">Shopify</BrandWord> brands on{' '}
            <BrandWord platform="whatsapp">WhatsApp</BrandWord>,{' '}
            <span className="mkt-fx__hl">by job</span>
          </h1>
          <p className="mkt-fx__sub">
            TopEdge AI is all-in-one D2C software for Shopify stores, built as one suite. Every module below works on the same customer data, and every
            plan starts with a 14-day free trial, from ₹1,999/mo.
          </p>
          <div className="mkt-fx__actions">
            <Link to="/signup" className="mkt-btn-primary">
              Start free
            </Link>
            <Link to="/pricing" className="mkt-fx__btn">
              See pricing
            </Link>
          </div>
        </header>

        {GROUPS.map((g) => (
          <section
            key={g.id}
            className={`mkt-fx__section mkt-fx-group mkt-fx-group--${g.id}`}
            aria-labelledby={`mkt-fx-${g.id}`}
          >
            <div className="mkt-fx__head">
              <h2 id={`mkt-fx-${g.id}`}>
                {g.lead} <span className="mkt-fx__hl">{g.accent}</span>
              </h2>
              <p>{g.sub}</p>
            </div>
            <div className={`mkt-fx__grid mkt-fx__grid--${g.slugs.length}`}>
              {g.slugs.map((slug) => {
                const card = cardFor(slug, bySlug);
                return card ? <FeatureCard key={slug} card={card} /> : null;
              })}
            </div>
          </section>
        ))}

        <section className="mkt-fx__section" aria-labelledby="mkt-fx-demo">
          <div className="mkt-fx__head">
            <h2 id="mkt-fx-demo">
              See TopEdge AI in <span className="mkt-fx__hl">motion</span>
            </h2>
            <p>
              A short demo of cart recovery, journeys and the shared inbox.
            </p>
          </div>
          <div className="mkt-fx__demo">
            <ProductDemoVideo
              src={demoAssetFor('hero').src}
              poster={demoAssetFor('hero').poster}
              label="TopEdge AI product demo"
            />
          </div>
        </section>

        <section className="mkt-fx__section" aria-labelledby="mkt-fx-principles">
          <div className="mkt-fx__head">
            <h2 id="mkt-fx-principles">
              Built for how <span className="mkt-fx__hl">operators</span> work
            </h2>
          </div>
          <div className="mkt-fx__principles">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="mkt-fx-principle">
                <span className="mkt-fx-principle__icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <MarketingCtaBand
          title="See it live on your store"
          subtitle="Start free. About 30 minutes of setup. Meta verification and template review are the wait."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
