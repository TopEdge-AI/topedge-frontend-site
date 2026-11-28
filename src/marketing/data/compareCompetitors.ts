import {
  AISENSY_PAIRWISE_MATRIX,
  BITESPEED_PAIRWISE_MATRIX,
  GETGABS_PAIRWISE_MATRIX,
  GUPSHUP_PAIRWISE_MATRIX,
  INTERAKT_PAIRWISE_MATRIX,
  DONDYY_PAIRWISE_MATRIX,
  KANAL_PAIRWISE_MATRIX,
  UPDATRR_PAIRWISE_MATRIX,
  WATI_PAIRWISE_MATRIX,
  ZOKO_PAIRWISE_MATRIX,
} from './compareFeatureMatrix';
import { FALLBACK_CATALOG } from '../lib/billingCatalog';

export type CompareCell = 'yes' | 'no' | 'partial' | string;

export type CompareRow = {
  label: string;
  description?: string;
  topedge: CompareCell;
  competitor: CompareCell;
};

export type CompetitorPlan = {
  name: string;
  price: string;
  note?: string;
  highlights: string[];
  popular?: boolean;
};

export type CompareScoreRow = {
  area: string;
  topedge: string;
  competitor: string;
  edge: 'TopEdge AI' | 'Competitor' | 'Even' | 'Trade-off';
};

export type CompareCompetitor = {
  slug: string;
  name: string;
  shortName: string;
  website: string;
  logo: string;
  logoAlt: string;
  accent: string;
  /** Short tag under competitor name in hero */
  brandTag?: string;
  title: string;
  description: string;
  keywords: string;
  h1: string;
  subtitle: string;
  /** Lean pages omit these — capability matrix is the page. */
  answerFirst?: string;
  whoForTopEdge?: string;
  whoForCompetitor?: string;
  positioning?: string;
  differentiators?: { title: string; body: string }[];
  matrix: CompareRow[];
  /** Footnote under capability board (unverified / dated claims) */
  matrixNote?: string;
  /** Research freshness stamp shown in UI + copy */
  researchAsOf?: string;
  scorecard?: CompareScoreRow[];
  deepDives?: { title: string; body: string }[];
  competitorPlans?: CompetitorPlan[];
  topedgePlansNote?: string;
  pricingCaveat?: string;
  faqs?: { question: string; answer: string }[];
  related: { label: string; href: string }[];
};

/** TopEdge public plans — labels derived from billingCatalog FALLBACK (same SSOT as /pricing). */
const PLAN_HIGHLIGHTS: Record<string, { highlights: string[]; popular?: boolean }> = {
  launch: {
    highlights: ['Abandoned cart recovery', 'COD tools', 'Live Chat + CRM', 'Meta templates'],
  },
  growth: {
    highlights: ['Journey branching', 'COD → prepaid', 'Priority send', 'Most popular'],
    popular: true,
  },
  scale: {
    highlights: ['Highest send priority', 'Larger volume', 'Same core stack', 'Team-ready'],
  },
};

export const TOPEDGE_PLANS_SUMMARY = FALLBACK_CATALOG.plans
  .filter((p) => ['launch', 'growth', 'scale'].includes(p.slug))
  .map((p) => {
    const extra = PLAN_HIGHLIGHTS[p.slug] || { highlights: [] as string[] };
    const sends =
      p.campaignEmailSendsPerCycle >= 1000
        ? `${Math.round(p.campaignEmailSendsPerCycle / 1000)}k`
        : String(p.campaignEmailSendsPerCycle);
    return {
      name: p.displayName,
      price: `${p.monthlyPriceLabel}/mo`,
      note: `${p.ordersPerCycle.toLocaleString('en-IN')} orders · ${sends} campaign sends`,
      highlights: extra.highlights,
      ...(extra.popular ? { popular: true as const } : {}),
    };
  });


export const COMPARE_COMPETITORS: Record<string, CompareCompetitor> = {
  wati: {
    slug: 'wati',
    name: 'WATI',
    shortName: 'WATI',
    website: 'https://www.wati.io',
    logo: '/marketing/compare/compare-logo-wati.png',
    logoAlt: 'WATI logo',
    accent: '#0d9488',
    brandTag: 'WhatsApp BSP',
    title: 'TopEdge AI vs WATI (2027): Shopify COD, Seats & Meta Markup',
    description:
      'TopEdge AI vs WATI for Shopify India, read 24 Nov 2026: ₹1,999/mo with 0% Meta markup vs WATI’s ₹2,999 Growth, per-user fees and a 20% marketing markup.',
    keywords:
      'TopEdge AI vs WATI, WATI alternative India, WhatsApp template markup, COD to prepaid WhatsApp, unified customer identity WhatsApp, intent routing chatbot, WATI vs TopEdge AI Shopify',
    h1: 'TopEdge AI vs WATI',
    subtitle: 'TopEdge AI vs WATI for Shopify India D2C brands, prices read 24 November 2026.',
    matrix: WATI_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Prices and rates read 24 Nov 2026 on wati.io/pricing (monthly, quarterly and annual views) and WATI’s Growth INR rate card: Growth ₹2,999 / ₹2,699 / ₹2,199, Pro ₹6,499 / ₹5,799 / ₹4,899, Business ₹18,499 / ₹16,799 / ₹14,799; 3 users on Growth, 5 on Pro and Business, then ₹1,299 and ₹2,199 per user; 1,000, 2,000 and 5,000 free automation triggers; Shopify features need a $4.99/mo add-on. Meta’s India card is ₹0.8631 per marketing and ₹0.1150 per utility message.',
    researchAsOf: 'Nov 2026',
    related: [
      { label: 'WATI alternative guide', href: '/blog/wati-alternative-shopify-india' },
      { label: 'All comparisons', href: '/compare' },
      { label: 'vs AiSensy', href: '/compare/aisensy' },
      { label: 'vs Bitespeed', href: '/compare/bitespeed' },
      { label: '3-way board', href: '/compare/topedge-vs-wati-vs-aisensy' },
      { label: '4-way board', href: '/compare/topedge-vs-wati-vs-interakt-vs-aisensy' },
      { label: 'TopEdge AI pricing', href: '/pricing' },
    ],
  },

  aisensy: {
    slug: 'aisensy',
    name: 'AiSensy',
    shortName: 'AiSensy',
    website: 'https://aisensy.com',
    logo: '/marketing/compare/compare-logo-aisensy.png',
    logoAlt: 'AiSensy logo',
    accent: '#0f766e',
    brandTag: 'WhatsApp marketing platform',
    title: 'TopEdge AI vs AiSensy (2027): Shopify COD & Message Markup',
    description:
      'TopEdge AI vs AiSensy for Shopify India, read 24 Nov 2026: COD confirmation and 0% Meta markup vs AiSensy’s ₹1,500 Basic and rates about 26% above Meta.',
    keywords:
      'TopEdge AI vs AiSensy, AiSensy alternative India, AiSensy vs TopEdge AI, WhatsApp template markup, COD prepaid WhatsApp, unified customer profile WhatsApp, AiSensy pricing India',
    h1: 'TopEdge AI vs AiSensy',
    subtitle: 'TopEdge AI vs AiSensy for Shopify India D2C brands, prices read 24 November 2026.',
    matrix: AISENSY_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Read 24 Nov 2026 on aisensy.com/pricing (monthly view): Basic ₹1,500, Pro ₹3,200, Premium ₹9,100, Unlimited ₹45,000; Chatbot Flows ₹2,500/mo extra; AI ₹1,350/mo per 1,000 AI messages; marketing ₹1.09, utility and service ₹0.145 (after 1,000 free service messages), about 26% above Meta’s ₹0.8631 and ₹0.1150. Shopify App Store listing: 4.1 from 56 reviews, $1 one-time charge.',
    researchAsOf: 'Nov 2026',
    related: [
      { label: 'AiSensy alternative guide', href: '/blog/aisensy-alternative-shopify-india' },
      { label: 'All comparisons', href: '/compare' },
      { label: 'vs WATI', href: '/compare/wati' },
      { label: 'vs Bitespeed', href: '/compare/bitespeed' },
      { label: '3-way board', href: '/compare/topedge-vs-wati-vs-aisensy' },
      { label: '4-way board', href: '/compare/topedge-vs-wati-vs-interakt-vs-aisensy' },
      { label: 'TopEdge AI pricing', href: '/pricing' },
    ],
  },

  interakt: {
    slug: 'interakt',
    name: 'Interakt',
    shortName: 'Interakt',
    website: 'https://www.interakt.shop',
    logo: '/marketing/compare/compare-logo-interakt.png',
    logoAlt: 'Interakt logo',
    accent: '#7c3aed',
    brandTag: 'Shopify WhatsApp app',
    title: 'TopEdge AI vs Interakt (2027): Shopify COD, Pricing & Markup',
    description:
      'TopEdge AI vs Interakt for Shopify India, read 24 Nov 2026: INR plans with COD confirmation and 0% Meta markup vs Interakt’s USD app plans and markups.',
    keywords:
      'TopEdge AI vs Interakt, Interakt alternative Shopify, Interakt vs TopEdge AI, WhatsApp marketing Shopify India, abandoned cart WhatsApp Interakt, COD confirmation WhatsApp, Interakt pricing',
    h1: 'TopEdge AI vs Interakt',
    subtitle: 'TopEdge AI vs Interakt for Shopify India D2C brands, prices read 24 November 2026.',
    matrix: INTERAKT_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Read 24 Nov 2026 on interakt.shop/pricing (monthly and quarterly views) and apps.shopify.com/interakt-marketing: web Starter ₹999 a month (Instagram only on monthly billing), Growth ₹2,799, Advanced ₹3,799, plus taxes; Growth rates ₹0.958 marketing and ₹0.150 utility; AI agents ₹3,000/mo add-on with 100 free AI messages, then ₹0.50. Shopify app: $21, $41, $51 and $99 a month in USD, 4.3 from 236 reviews; popup number capture, cart reminders to those numbers, Shopify workflow actions and AI agents listed only on Premier.',
    researchAsOf: 'Nov 2026',
    related: [
      { label: 'Interakt alternative guide', href: '/blog/interakt-alternative-shopify-india' },
      { label: 'WATI vs Interakt vs AiSensy', href: '/compare/topedge-vs-wati-vs-interakt-vs-aisensy' },
      { label: 'All comparisons', href: '/compare' },
      { label: 'vs WATI', href: '/compare/wati' },
      { label: 'vs AiSensy', href: '/compare/aisensy' },
      { label: 'vs Updatrr', href: '/compare/updatrr' },
      { label: 'vs Bitespeed', href: '/compare/bitespeed' },
      { label: 'TopEdge AI pricing', href: '/pricing' },
    ],
  },

  bitespeed: {
    slug: 'bitespeed',
    name: 'Bitespeed',
    shortName: 'Bitespeed',
    website: 'https://www.bitespeed.co',
    logo: '/marketing/compare/compare-logo-bitespeed.png',
    logoAlt: 'Bitespeed logo',
    accent: '#ea580c',
    brandTag: 'AI-agent omnichannel OS',
    title: 'TopEdge AI vs Bitespeed (2027): Public Prices vs Demo Quote',
    description:
      'TopEdge AI vs Bitespeed for Shopify India, read 25 Nov 2026: plans from ₹1,999/mo incl. GST and 0% Meta markup vs no published Bitespeed prices.',
    keywords:
      'TopEdge AI vs Bitespeed, Bitespeed alternative Shopify, Bitespeed pricing India, Shopify WhatsApp app INR pricing, Bitespeed vs TopEdge AI, Bitespeed AI add-on',
    h1: 'TopEdge AI vs Bitespeed',
    subtitle: 'TopEdge AI vs Bitespeed for Shopify India D2C brands, checked 25 November 2026.',
    researchAsOf: 'Nov 2026',
    matrix: BITESPEED_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Read 25 Nov 2026: bitespeed.co/pricing redirects to a demo request, and Bitespeed’s Shopify listing (B: WhatsApp, Voice, SMS & Chat, 4.6 from 408 reviews) shows “Free to install. Additional charges may apply.” with no plan prices or message rates. Rows we could not re-read that day are as checked in September 2026. Confirm live before purchase.',
    related: [
      { label: 'Bitespeed alternative guide', href: '/blog/bitespeed-alternative-shopify-india' },
      { label: 'All comparisons', href: '/compare' },
      { label: 'Alternatives index', href: '/compare/alternatives' },
      { label: 'vs WATI', href: '/compare/wati' },
      { label: 'vs AiSensy', href: '/compare/aisensy' },
      { label: 'vs Interakt', href: '/compare/interakt' },
      { label: 'vs Dondy', href: '/compare/dondy' },
      { label: 'TopEdge AI pricing', href: '/pricing' },
    ],
  },

  zoko: {
    slug: 'zoko',
    name: 'Zoko',
    shortName: 'Zoko',
    website: 'https://www.zoko.io',
    logo: '/marketing/compare/compare-logo-zoko.svg',
    logoAlt: 'Zoko logo',
    accent: '#2563eb',
    brandTag: 'India WhatsApp commerce',
    title: 'TopEdge AI vs Zoko (2027): Flat INR vs USD Conversation Fees',
    description:
      'TopEdge AI vs Zoko for Shopify India, read 25 Nov 2026: ₹1,999/mo incl. GST, sized by orders, vs Zoko’s $49.99+ USD plans and $0.015 per conversation.',
    keywords:
      'TopEdge AI vs Zoko, Zoko alternative Shopify, Zoko pricing conversations, Shopify WhatsApp India Zoko, Zoko vs TopEdge AI',
    h1: 'TopEdge AI vs Zoko',
    subtitle: 'TopEdge AI vs Zoko for Shopify India D2C brands, checked 25 November 2026.',
    answerFirst:
      'TopEdge AI vs Zoko comes down to how you want to be billed. TopEdge AI charges a flat fee by Shopify orders: ₹1,999 to ₹6,499 a month including GST on topedgeai.com, or $19 to $65 through Shopify, with no conversation fee. Zoko charges $49.99 to $139.99 a month in US dollars and meters conversations on Starter. Where Zoko is better: selling from a WhatsApp catalog inside the chat, COD to prepaid on every plan, and 4.9 from 481 App Store reviews against none yet for TopEdge AI. Read 25 November 2026.',
    researchAsOf: 'Nov 2026',
    matrix: ZOKO_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Read off zoko.io/pricing and apps.shopify.com/whatsapp-button-chat on 25 Nov 2026 (listing: 4.9 from 481 reviews). Starter $49.99/mo meters $0.015 per conversation with no cap and has unlimited agents. Plus $79.99/mo includes 5,000 conversations then $0.00199 each, with 5 agents and $15 per extra agent. Elite $139.99/mo includes 100,000 then $0.00099, 10 agents at $12 each. A Max plan (5M conversations, 30 agents) is shown only on the App Store listing, at about ₹46,455 a month. AI agents from $24.99/mo, premium flows $5.99 per flow per month, Instagram $9.99/mo. Confirm live before purchase; figures change.',
    related: [
      { label: 'Zoko alternatives guide', href: '/blog/zoko-alternative-shopify-india' },
      { label: 'Alternatives index', href: '/compare/alternatives' },
      { label: 'vs Bitespeed', href: '/compare/bitespeed' },
      { label: 'vs Getgabs', href: '/compare/getgabs' },
      { label: 'vs Kanal', href: '/compare/kanal' },
      { label: 'vs Dondy', href: '/compare/dondy' },
      { label: 'TopEdge AI pricing', href: '/pricing' },
    ],
  },

  getgabs: {
    slug: 'getgabs',
    name: 'Getgabs',
    shortName: 'Getgabs',
    website: 'https://getgabs.com',
    logo: '/marketing/compare/compare-logo-getgabs.svg',
    logoAlt: 'Getgabs logo',
    accent: '#16a34a',
    brandTag: 'Low-cost WhatsApp entry',
    title: 'TopEdge AI vs Getgabs (2027): COD Flows vs ₹699 Broadcasts',
    description:
      'TopEdge AI vs Getgabs for Shopify India, read 26 Nov 2026: COD confirmation on every plan from ₹1,999 vs Getgabs’s ₹699 broadcast-first plans.',
    keywords:
      'TopEdge AI vs Getgabs, Getgabs alternative Shopify, Getgabs pricing, cheap WhatsApp Shopify app, Getgabs vs TopEdge AI',
    h1: 'TopEdge AI vs Getgabs',
    subtitle: 'TopEdge AI vs Getgabs for Shopify India D2C brands, checked 26 November 2026.',
    researchAsOf: 'Nov 2026',
    matrix: GETGABS_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Getgabs pricing read 26 November 2026 from India: getgabs.com lists Basic ₹699 · Plus ₹1,499 · Business ₹2,999 a month (₹6,990, ₹14,990 and ₹29,990 a year), each labelled 0% Meta markup; the Shopify app is an add-on on Basic. Its Shopify App Store listing (apps.shopify.com/getgabs-whatsapp-chatbot-api) read “not currently available on the Shopify App Store” that day, so confirm how it connects before purchase.',
    related: [
      { label: 'Getgabs alternatives guide', href: '/blog/getgabs-alternative-shopify-whatsapp' },
      { label: 'Alternatives index', href: '/compare/alternatives' },
      { label: 'vs Zoko', href: '/compare/zoko' },
      { label: 'vs Bitespeed', href: '/compare/bitespeed' },
      { label: 'vs Kanal', href: '/compare/kanal' },
      { label: 'vs Dondy', href: '/compare/dondy' },
      { label: 'TopEdge AI pricing', href: '/pricing' },
    ],
  },

  kanal: {
    slug: 'kanal',
    name: 'Kanal',
    shortName: 'Kanal',
    website: 'https://getkanal.com',
    logo: '/marketing/compare/compare-logo-kanal.svg',
    logoAlt: 'Kanal logo',
    accent: '#7c3aed',
    brandTag: 'Global WhatsApp + Klaviyo',
    title: 'TopEdge AI vs Kanal (2027): ₹1,999 INR vs €89 EUR Plans',
    description:
      'TopEdge AI vs Kanal for Shopify India, read 26 Nov 2026: INR plans from ₹1,999 with COD to prepaid vs Kanal’s €89 and €149 plans built for Europe.',
    keywords:
      'TopEdge AI vs Kanal, Kanal alternative Shopify, Kanal pricing, Kanal WhatsApp Klaviyo, Shopify WhatsApp India vs Kanal',
    h1: 'TopEdge AI vs Kanal',
    subtitle: 'TopEdge AI vs Kanal for Shopify India D2C brands, checked 26 November 2026.',
    researchAsOf: 'Nov 2026',
    matrix: KANAL_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Kanal plans read 26 November 2026 on getkanal.com/pricing: Pro €89 · Scale €149 · Business €350 · Agency €1,900 a month, no commitment. Its Shopify App Store listing (apps.shopify.com/kanal-marketing-ai) shows a free Demo plan, Pro $89 and Scale $149 billed in USD, +$50 a month per extra market, and 5.0 from 153 reviews that day. Currency differs by surface, so verify on the surface you buy from.',
    related: [
      { label: 'Kanal alternatives guide', href: '/blog/kanal-whatsapp-alternative-shopify' },
      { label: 'Alternatives index', href: '/compare/alternatives' },
      { label: 'vs Bitespeed', href: '/compare/bitespeed' },
      { label: 'vs Zoko', href: '/compare/zoko' },
      { label: 'vs Getgabs', href: '/compare/getgabs' },
      { label: 'vs Dondy', href: '/compare/dondy' },
      { label: 'TopEdge AI pricing', href: '/pricing' },
    ],
  },

  dondy: {
    slug: 'dondy',
    name: 'Dondy',
    shortName: 'Dondy',
    website: 'https://www.dondy.net/dondy-pricing',
    logo: '/marketing/compare/compare-logo-dondy.svg',
    logoAlt: 'Dondy logo',
    accent: '#0f766e',
    brandTag: 'WhatsApp widget + USD automation',
    title: 'TopEdge AI vs Dondy (2027): 0% Markup vs a 1.6x Message Rate',
    description:
      'TopEdge AI vs Dondy for Shopify India, read 25 Nov 2026: Meta’s ₹0.8631 rate at 0% markup vs Dondy’s $0.01888 India rate and $79.99 automation.',
    keywords:
      'TopEdge AI vs Dondy, Dondy alternative Shopify, Dondy WhatsApp markup, Dondy pricing India, Dondy vs TopEdge AI',
    h1: 'TopEdge AI vs Dondy',
    subtitle: 'TopEdge AI vs Dondy for Shopify India D2C brands, checked 25 November 2026.',
    researchAsOf: 'Nov 2026',
    matrix: DONDYY_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Checked 25 Nov 2026: Shopify listing apps.shopify.com/dondy-marketing-ai shows Built for Shopify, 4.9★ / 828 reviews, Free widget, Pro $6.99, Power Automation $79.99 (about ₹7,432 a month as Shopify’s estimate), Elite $159.99. dondy.net/dondy-pricing also lists Advanced $14.99 and Ultimate $299 tiers and the per-market rate table (India $0.01888, 1.6× the $0.0118 on Meta’s USD rate card effective 1 Oct 2026). Surfaces disagree on agent seats (listing: 5 on Elite; site: unlimited) and on the US floor (“from $0.0158” on the listing vs North America $0.04 on the table). Dondy bills in dollars: at ₹93.92 to the dollar (ECB reference rate, 6 Nov 2026) that India row is about ₹1.77 a message against Meta’s ₹0.8631 INR rate, about ₹0.91 extra per send, or about ₹9,100 on 10,000 marketing messages. Verify both before purchase.',
    related: [
      { label: 'Dondy alternative (markup)', href: '/blog/dondy-alternative-shopify-india' },
      { label: 'Best WhatsApp tools India', href: '/blog/best-whatsapp-automation-tools-shopify-india' },
      { label: 'Alternatives index', href: '/compare/alternatives' },
      { label: 'vs Updatrr', href: '/compare/updatrr' },
      { label: 'API pricing India', href: '/blog/whatsapp-business-api-pricing-india' },
      { label: 'TopEdge AI pricing', href: '/pricing' },
    ],
  },

  updatrr: {
    slug: 'updatrr',
    name: 'Updatrr',
    shortName: 'Updatrr',
    website: 'https://updatrr.com/',
    logo: '/marketing/compare/compare-logo-updatrr.svg',
    logoAlt: 'Updatrr logo',
    accent: '#ea580c',
    brandTag: 'Shopify-only WhatsApp automation',
    title: 'TopEdge AI vs Updatrr (2027): ₹1,999 INR vs $29.99 USD',
    description:
      'TopEdge AI vs Updatrr for Shopify India, read 26 Nov 2026: ₹1,999 INR plans and a 14-day trial vs Updatrr’s $29.99 USD plans, with AI on $99.99.',
    keywords:
      'TopEdge AI vs Updatrr, Updatrr alternative India, Updatrr WhatsApp Shopify, Updatrr pricing, TopEdge AI vs Updatrr COD prepaid, Updatrr AI conversation cost',
    h1: 'TopEdge AI vs Updatrr',
    subtitle: 'TopEdge AI vs Updatrr for Shopify India D2C brands, checked 26 November 2026.',
    matrix: UPDATRR_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Read off updatrr.com/pricing on 26 Nov 2026: Growth $29.99/mo, Pro $49.99/mo, Pro AI $99.99/mo, 7-day no-card trial, country-wise prices inside its dashboard, annual pricing on request, and its pricing FAQ says Updatrr adds no markup on Meta’s fees (so the Meta line matches ours). Its Shopify listing (apps.shopify.com/prizma-updatrr) bills in USD, shows a 15-day trial on ProAI and 5.0 from 45 reviews that day. Capability rows reflect its publicly described Shopify-app surface, not its roadmap.',
    researchAsOf: 'Nov 2026',
    related: [
      { label: 'All comparisons', href: '/compare' },
      { label: 'Alternatives index', href: '/compare/alternatives' },
      { label: 'Updatrr alternative playbook', href: '/blog/updatrr-alternative-shopify-india' },
      { label: 'vs Dondy', href: '/compare/dondy' },
      { label: 'vs Bitespeed', href: '/compare/bitespeed' },
      { label: 'vs Zoko', href: '/compare/zoko' },
      { label: 'TopEdge AI pricing', href: '/pricing' },
    ],
  },

  gupshup: {
    slug: 'gupshup',
    name: 'Gupshup',
    shortName: 'Gupshup',
    website: 'https://www.gupshup.io/',
    logo: '/marketing/compare/compare-logo-gupshup.svg',
    logoAlt: 'Gupshup logo',
    accent: '#00a651',
    brandTag: 'Enterprise WhatsApp CPaaS',
    title: 'TopEdge AI vs Gupshup (2027): COD Suite vs Message Wallet',
    description:
      'TopEdge AI vs Gupshup for Shopify India, read 27 Nov 2026: COD journeys at Meta’s rates against a ₹0 wallet charging ₹1.15 a marketing message.',
    keywords:
      'TopEdge AI vs Gupshup, Gupshup vs TopEdge AI, Gupshup WhatsApp markup, Gupshup Shopify, Gupshup COD prepaid',
    h1: 'TopEdge AI vs Gupshup',
    subtitle: 'TopEdge AI vs Gupshup for Shopify India D2C brands, read 27 November 2026.',
    researchAsOf: 'Nov 2026',
    matrix: GUPSHUP_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Board compiled Sep 2026. Rows marked Read 27 Nov 2026 were re-read that day on gupshup.ai/pricing, its India rate card and its Shopify App Store listing; the other Gupshup cells are from the September reading. Check gupshup.ai before you buy.',
    related: [
      { label: 'All comparisons', href: '/compare' },
      { label: 'Alternatives index', href: '/compare/alternatives' },
      { label: 'vs WATI', href: '/compare/wati' },
      { label: 'vs AiSensy', href: '/compare/aisensy' },
      { label: 'vs Dondy', href: '/compare/dondy' },
      { label: 'API pricing India', href: '/blog/whatsapp-business-api-pricing-india' },
      { label: 'TopEdge AI pricing', href: '/pricing' },
    ],
  },
};

/*
 * Each competitor's `related` list opens with its alternatives guide on the
 * blog. Until 2026-11-02 the two clusters were isolated: `/compare/*` pages
 * linked only to each other and to /pricing, while the blog posts were linked
 * only from other blog posts. GSC showed the split costing real ground --
 * /blog/zoko-alternative-shopify-india drew 349 impressions at position 8.6
 * while /compare/zoko drew 7 at 6.3, so the page Google actually ranks for
 * "zoko alternative" was the one receiving no authority from the nav-linked
 * side of the site. Gupshup has no alternatives post, so it has no such link.
 */

export function getCompareCompetitor(slug: string) {
  return COMPARE_COMPETITORS[slug] ?? null;
}

export function allCompareCompetitors() {
  return Object.values(COMPARE_COMPETITORS);
}
