import type { FeatureStoryId } from './home';
import { featureStories } from './home';

export type MarketingFeature = {
  slug: string;
  scene: FeatureStoryId | 'hero';
  title: string;
  body: string;
  bullets: readonly string[];
  outcomes: string[];
  aliases?: string[];
};

/** Canonical public slugs (aligned with netlify.toml redirects) */
export const MARKETING_FEATURES: MarketingFeature[] = [
  {
    slug: 'journeys',
    scene: 'journey',
    title: 'Abandoned cart and COD journeys',
    body: 'Pre-built WhatsApp journeys on Shopify events that send only Meta-approved templates and report recovered ₹.',
    bullets: [
      'Drag-and-drop builder, no code',
      'Pre-built cart, COD, and shipping templates',
      'Meta approval gating + recovered ₹',
    ],
    outcomes: [
      '3-step cart recovery without custom code',
      'Journeys blocked until templates are APPROVED',
      'Recovered revenue attribution per journey',
    ],
    aliases: ['journey', 'order-automations', 'order-messages', 'cart-recovery'],
  },
  {
    slug: 'flow-builder',
    scene: 'flow-builder',
    title: 'WhatsApp chat flows, drafted by AI',
    body: 'Describe the bot and TopEdge AI drafts a button-and-list flow that you edit step by step.',
    bullets: [
      'AI form → editable flow',
      'Menus, conditions, handoff',
      'Test before you publish',
    ],
    outcomes: [
      'First conversational flow in minutes, not weeks',
      'Catalog send nodes wired to Shopify products',
      'Handoff into Live Chat when the shopper needs a human',
    ],
  },
  {
    slug: 'ai-brain',
    scene: 'ai-brain',
    title: 'WhatsApp AI on your own API keys',
    body: 'Connect OpenAI, Claude or Gemini and answer from your catalog and policies.',
    bullets: [
      'Store knowledge + bot persona',
      'Bring your own OpenAI, Claude or Gemini key',
      'Intent Detect without AI waste',
    ],
    outcomes: [
      'Catalog-grounded replies on your provider bill',
      'Live Chat takeover pauses AI instantly',
      'Flow AI nodes powered by the same hub',
    ],
  },
  {
    slug: 'campaigns',
    scene: 'campaigns',
    title: 'Broadcasts to a segment, measured in ₹',
    body: 'Send an approved marketing template to an audience and see the Meta rate before you spend.',
    bullets: [
      'Segmented audiences',
      'Approved templates only',
      'Transparent Meta ₹ rates',
    ],
    outcomes: [
      'Broadcasts that never sneak past Meta approval',
      'Audience pulls from real lead scores and cart state',
      'Cost clarity before you hit send',
    ],
  },
  {
    slug: 'analytics',
    scene: 'analytics',
    title: 'Tracking Pixel: see who is browsing',
    body: 'A Shopify theme embed that matches product views and carts to WhatsApp numbers you can message.',
    bullets: [
      'Theme app embed install',
      'Product & cart intent → WhatsApp',
      'Consent-aware firing + pixel health',
    ],
    outcomes: [
      'Reach shoppers who browsed but never opened chat',
      'Intent signals wire into journeys and campaigns',
      'Know when the pixel is healthy before you spend',
    ],
  },
  {
    slug: 'meta-manager',
    scene: 'meta-manager',
    title: 'You approve every template before anything sends',
    body: 'Create, submit and track WhatsApp templates with Meta, with catalog and QR codes in the same place.',
    bullets: [
      'Library + status sync',
      'Catalog & QR tools',
      'Merchant-owned approval',
    ],
    outcomes: [
      'Clear Pending vs Approved states',
      'QR and deep links for storefront capture',
      'No silent sends on rejected templates',
    ],
  },
  {
    slug: 'audience-crm',
    scene: 'audience',
    title: 'Segments, scores, and cart leads in one CRM',
    body: 'See who abandoned, who is VIP and who is a COD risk, then build segments from it.',
    bullets: [
      'Waterfall interest scores',
      'Abandoned cart leads',
      'Campaign-ready segments',
    ],
    outcomes: [
      'Target warm leads without CSV gymnastics',
      'Scores update from carts, orders, and chats',
      'Segments feed Campaigns and Journeys',
    ],
    aliases: ['audience'],
  },
  {
    slug: 'chat-rules',
    scene: 'inbox',
    title: 'Route the right conversations to the right people',
    body: 'Assign chats by keyword, COD intent or VIP status so the inbox stays calm when volume spikes.',
    bullets: [
      'Keyword and intent routing',
      'Assign to ops or sales',
      'Works with AI takeover pause',
    ],
    outcomes: [
      'COD confirmations land with the right team',
      'VIP shoppers skip the queue when you say so',
      'Rules stay editable in the dashboard',
    ],
    aliases: ['rules'],
  },
  {
    slug: 'warranty',
    scene: 'audience',
    title: 'Warranty registration and claims',
    body: 'Buyers register with a WhatsApp OTP, and every claim is assigned against the Shopify order.',
    bullets: [
      'Warranty hub list with status badges',
      'Unassigned queue that doesn’t disappear',
      'Manual assign to order or teammate',
    ],
    outcomes: [
      'No spreadsheet chase for warranty records',
      'Ownerless warranties stay in a clear queue',
      'Assign lands on the right Shopify order',
    ],
  },
  {
    slug: 'opt-in-tools',
    scene: 'hero',
    title: 'WhatsApp opt-in tools for your Shopify storefront',
    body: 'Popup, spin wheel, mystery discount, Pulse Drop and widget, all writing to one consented list.',
    bullets: [
      'Five storefront capture tools',
      'Subscriber list with marketing consent',
      'Bridge into campaigns at 100+ signups',
    ],
    outcomes: [
      'Publish into Shopify theme without risky surgery',
      'Every opt-in lands in a WhatsApp-ready list',
      'Message consented audiences for recovery and revenue',
    ],
    aliases: ['opt-in', 'optin', 'opt-in-popup', 'optin-popup', 'popup'],
  },
  {
    slug: 'profit-loss',
    scene: 'analytics',
    title: 'Net profit after COD, RTO and ads',
    body: 'See what you kept after COGS, packaging, gateway fees, COD, RTO and ad spend.',
    bullets: [
      '3-step setup: products, fees, COD & returns',
      'Cost waterfall to net profit ₹',
      'Product margins with missing COGS called out',
    ],
    outcomes: [
      'See net profit vs prior period',
      'Plain-language COD and RTO findings',
      'Sample mode labeled until Shopify connects',
    ],
    aliases: ['pnl', 'p-and-l', 'profit-and-loss', 'pl-analytics', 'profit-costs'],
  },
  {
    slug: 'intent-detection',
    scene: 'ai-brain',  
    title: 'Route chats by what they mean',
    body: 'Match shipping, returns, COD and handoff questions to a flow without calling the AI model.',
    bullets: [
      'Phrase matching you control',
      'Route without AI spend',
      'Test confidence before go-live',
    ],
    outcomes: [
      'Shipping and returns land on the right flow',
      'Handoff intents open the agent queue',
      'Save AI tokens for hard catalog questions',
    ],
    aliases: ['intent', 'intents'],
  },
];

const aliasToSlug = new Map<string, string>();
for (const f of MARKETING_FEATURES) {
  aliasToSlug.set(f.slug, f.slug);
  f.aliases?.forEach((a) => aliasToSlug.set(a, f.slug));
}

/* Redirected / retired slugs, resolve to surviving hubs */
aliasToSlug.set('segments', 'audience-crm');
aliasToSlug.set('segmentation', 'audience-crm');
aliasToSlug.set('segment', 'audience-crm');
aliasToSlug.set('audience-segments', 'audience-crm');
aliasToSlug.set('byok', 'ai-brain');
aliasToSlug.set('byok-ai', 'ai-brain');
aliasToSlug.set('bring-your-own-key', 'ai-brain');

export function resolveFeatureSlug(raw: string): string | null {
  return aliasToSlug.get(raw) ?? null;
}

export function getFeatureBySlug(raw: string): MarketingFeature | undefined {
  const slug = resolveFeatureSlug(raw);
  if (!slug) return undefined;
  return MARKETING_FEATURES.find((f) => f.slug === slug);
}

/** Sync homepage story hrefs to canonical feature slugs */
export function canonicalHrefForStory(storyId: string): string {
  const map: Record<string, string> = {
    shopify: '/integrations',
    'cart-recovery': '/features/journeys',
    inbox: '/features',
    journey: '/features/journeys',
    'flow-builder': '/features/flow-builder',
    'opt-in-tools': '/features/opt-in-tools',
    'opt-in': '/features/opt-in-tools',
    optin: '/features/opt-in-tools',
    'optin-popup': '/features/opt-in-tools',
    'ai-brain': '/features/ai-brain',
    campaigns: '/features/campaigns',
    instagram: '/integrations',
    dashboard: '/features',
    analytics: '/features/analytics',
    'meta-manager': '/features/meta-manager',
    audience: '/features/audience-crm',
    intent: '/features/intent-detection',
    'intent-detection': '/features/intent-detection',
    segmentation: '/features/audience-crm',
    segment: '/features/audience-crm',
    'profit-loss': '/features/profit-loss',
    byok: '/features/ai-brain',
  };
  return map[storyId] ?? '/features';
}

/** Ensure home stories stay aligned when imported elsewhere */
export function storiesWithCanonicalHrefs() {
  return featureStories.map((s) => ({
    ...s,
    href: canonicalHrefForStory(s.id),
  }));
}
