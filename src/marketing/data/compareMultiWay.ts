import {
  FOUR_WAY_FEATURE_MATRIX,
  THREE_WAY_FEATURE_MATRIX,
} from './compareFeatureMatrix';
import type { MultiWayConfig, MultiWayRefresh } from '../pages/CompareMultiWayPage';

const LOGO_WATI = '/marketing/compare/compare-logo-wati.png';
const LOGO_AISENSY = '/marketing/compare/compare-logo-aisensy.png';
const LOGO_INTERAKT = '/marketing/compare/compare-logo-interakt.png';

export const THREE_WAY_PATH = '/compare/topedge-vs-wati-vs-aisensy';
export const FOUR_WAY_PATH = '/compare/topedge-vs-wati-vs-interakt-vs-aisensy';

const THREE_WAY_FAQS = [
  {
    question: 'How does TopEdge AI differ from WATI and AiSensy on Meta markup?',
    answer:
      'TopEdge AI publishes 0% platform markup: Meta bills your own Business Account, so you pay ₹0.8631 per marketing template and ₹0.1150 per utility template at Meta’s India card. WATI’s own Growth-plan rate card, dated 1 October 2026, lists ₹1.0357 and ₹0.1495 for the same two messages, which is 20% and 30% above Meta. AiSensy lists ₹1.09 and ₹0.145, about 26% above on both. Both vendors’ figures were read again off their own pricing pages on 27 November 2026. Open the pairwise pages for the full rows.',
  },
  {
    question: 'Who should pick TopEdge AI in this three-way shortlist?',
    answer:
      'A Shopify store in India that ships COD. TopEdge AI confirms COD orders on every plan, adds COD to prepaid on Growth and Scale, and passes Meta’s rates through at 0% markup on flat plans sized by orders.',
  },
  {
    question: 'When do WATI or AiSensy still fit?',
    answer:
      'When the main job is not COD. WATI fits a team that wants one inbox across WhatsApp, Instagram, Facebook, TikTok and calling; AiSensy fits a brand that mostly sends broadcasts and click-to-WhatsApp ads, from ₹1,500 a month. Both charge above Meta per message, so model your volume on the pairwise boards.',
  },
  {
    question: 'Where does Interakt sit against these three?',
    answer:
      'Interakt is the fourth name on most Indian shortlists, so it has its own column on the four-way board at /compare/topedge-vs-wati-vs-interakt-vs-aisensy. Every cell there is the same one published on the pairwise Interakt page.',
  },
];

const FOUR_WAY_FAQS = [
  {
    question: 'Which of WATI, Interakt and AiSensy charges a markup over Meta?',
    answer:
      'All three publish India per-message rates above Meta’s own card on the plans compared here. On a marketing template, where Meta charges ₹0.8631: WATI Growth ₹1.0357 (20% more), Interakt Growth ₹0.958 (11% more), AiSensy ₹1.09 (26% more). On a utility template, where Meta charges ₹0.1150: WATI Growth ₹0.1495, Interakt Growth ₹0.150 and AiSensy ₹0.145, all 26% to 30% more. WATI’s Pro and Business cards and Interakt’s Advanced plan are a little cheaper, and Interakt lists no markup only on Enterprise. TopEdge AI passes Meta through at 0% and bills the platform separately: in INR on topedgeai.com, or in USD through the Shopify App Store. All three were read off their own pricing pages on 7 November 2026; read your own rate card in Meta Business Manager before you take any vendor number, including ours.',
  },
  {
    question: 'What does Meta itself charge in India in 2026?',
    answer:
      'On Meta’s published India rate card: ₹0.8631 per delivered marketing template and ₹0.1150 per delivered utility or authentication template, before 18% GST. Effective 1 October 2026 every business phone number also gets 1,000 free service messages a month, after which replies cost ₹0.1150 each. That bill is identical whichever of these four platforms sends the message, which is why the only pricing question that matters is what each one adds on top.',
  },
  {
    question: 'What is the cheapest way into WhatsApp automation for a Shopify India store?',
    answer:
      'Entry price is only half the answer, because the Meta messaging bill sits on top of whatever the platform charges. Compare the plan fee, the per-message markup and whether COD to prepaid is gated, then model your real monthly order volume. The Subscription Model row on each pairwise board carries the published entry price.',
  },
  {
    question: 'Do I lose my approved templates if I move between these platforms?',
    answer:
      'No. Approved templates belong to your WhatsApp Business Account, not to the platform that submitted them. As long as the new tool binds the same WABA, the library follows you. Keep the Meta Business Account in your own name so this stays true.',
  },
  {
    question: 'Which one is actually best for a COD-heavy store?',
    answer:
      'Judge it on the COD rows rather than the feature count. A COD-heavy store needs confirmation before dispatch, a warehouse hold that operations will respect, and a prepaid conversion path. On TopEdge AI, COD confirmation is on every plan and automated COD to prepaid is on Growth and Scale.',
  },
  {
    question: 'Why does this board compare four platforms instead of two?',
    answer:
      'Because that is how the shortlist actually looks in India. Merchants search for WATI against Interakt against AiSensy, not one at a time. Every competitor cell on this board is the same verbatim cell published on that vendor pairwise page, so nothing here is written twice.',
  },
];

const THREE_WAY_REFRESH: MultiWayRefresh<'wati' | 'aisensy'> = {
  updated: '2026-11-27',
  heroSub:
    'Three WhatsApp tools for Shopify India on one board: entry plans, India message rates and COD work, read 27 November 2026.',
  verdict:
    'WATI and AiSensy start cheaper on plan price; TopEdge AI is the one built around COD orders and the one that adds nothing to Meta’s rates. Read 27 November 2026: an India marketing message costs ₹1.0357 on WATI Growth and ₹1.09 on AiSensy, against Meta’s ₹0.8631 through TopEdge AI. Pick WATI for a many-channel inbox, AiSensy for broadcasts, TopEdge AI for a COD store.',
  priceRows: [
    { label: 'Entry plan with WhatsApp, billed monthly', topedge: 'Launch ₹1,999 incl. GST', wati: 'Growth ₹2,999', aisensy: 'Basic ₹1,500' },
    { label: 'Same plan, billed yearly (a month)', topedge: '₹1,599 incl. GST', wati: '₹2,199', aisensy: '₹1,350' },
    { label: 'India marketing message', topedge: '₹0.8631, Meta’s rate', wati: '₹1.0357 (Growth card)', aisensy: '₹1.09' },
    { label: 'India utility message', topedge: '₹0.1150', wati: '₹0.1495', aisensy: '₹0.145' },
    { label: 'Shopify connection', topedge: 'Included on every plan', wati: 'USD 4.99 a month add-on', aisensy: 'Included from Basic' },
  ],
  priceNote:
    'Read 27 November 2026 on wati.io/pricing (monthly, quarterly and annual tabs) and its Growth INR rate card dated 1 October 2026, and on aisensy.com/pricing (monthly, quarterly and yearly views). Competitor plan prices and every message rate exclude GST; TopEdge AI plan prices include 18% GST. TopEdge AI Launch covers 100 orders a month; 500 orders needs Growth at ₹3,999.',
  fits: [
    { name: 'TopEdge AI', body: 'A Shopify store in India that ships COD: confirmation on every plan, COD to prepaid from Growth, Meta’s rates at 0% markup.' },
    { name: 'WATI', body: 'A support team that wants WhatsApp, Instagram, Facebook, TikTok, calling and webchat in one inbox, with AI agent credits in the plan.' },
    { name: 'AiSensy', body: 'A brand whose main job is broadcasts and click-to-WhatsApp ads, on the lowest entry plan of the three.' },
  ],
  faqTopic: 'TopEdge AI vs WATI vs AiSensy',
};

const FOUR_WAY_REFRESH: MultiWayRefresh<'wati' | 'interakt' | 'aisensy'> = {
  updated: '2026-11-27',
  heroSub:
    'The four names on most Indian WhatsApp shortlists, on one board for Shopify stores, read 27 November 2026.',
  verdict:
    'All three of WATI, Interakt and AiSensy charge above Meta per India message; TopEdge AI adds nothing. Read 27 November 2026, a marketing message costs ₹1.0357 on WATI Growth, ₹0.958 on Interakt Growth and ₹1.09 on AiSensy, against Meta’s ₹0.8631. AiSensy has the lowest entry plan, Interakt pairs WhatsApp with Instagram, WATI has the widest inbox, and TopEdge AI is the one built around COD orders.',
  priceRows: [
    { label: 'Entry plan with WhatsApp, billed monthly', topedge: 'Launch ₹1,999 incl. GST', wati: 'Growth ₹2,999', interakt: 'Growth ₹2,799 (web)', aisensy: 'Basic ₹1,500' },
    { label: 'India marketing message', topedge: '₹0.8631, Meta’s rate', wati: '₹1.0357', interakt: '₹0.958', aisensy: '₹1.09' },
    { label: 'India utility message', topedge: '₹0.1150', wati: '₹0.1495', interakt: '₹0.150', aisensy: '₹0.145' },
    { label: 'AI replies', topedge: 'Bring your own AI key', wati: 'AI credits in the plan', interakt: '₹3,000 a month add-on', aisensy: '₹1,350 a month per 1,000' },
    { label: 'Shopify connection', topedge: 'Included on every plan', wati: 'USD 4.99 a month add-on', interakt: 'Only on its Shopify App Store plans', aisensy: 'Included from Basic' },
  ],
  priceNote:
    'Read 27 November 2026 on wati.io/pricing (three tabs) and its Growth INR rate card dated 1 October 2026, interakt.shop/pricing (monthly and quarterly views; the yearly toggle did not respond that day) and aisensy.com/pricing (three views). Interakt’s Shopify integration note is from its pricing table. Competitor plan prices and every message rate exclude GST; TopEdge AI plan prices include 18% GST.',
  fits: [
    { name: 'TopEdge AI', body: 'A Shopify store in India that ships COD: confirmation on every plan, COD to prepaid from Growth, Meta’s rates at 0% markup.' },
    { name: 'WATI', body: 'A support team that wants one inbox across WhatsApp, Instagram, Facebook, TikTok, calling and webchat.' },
    { name: 'Interakt', body: 'A brand that wants Instagram DMs and WhatsApp in one place, with the lowest per-message marketing rate of the other three.' },
    { name: 'AiSensy', body: 'A broadcast-first brand on a tight entry budget, running click-to-WhatsApp ads from the same tool.' },
  ],
  faqTopic: 'TopEdge AI vs WATI vs Interakt vs AiSensy',
};

export function threeWayConfig(modifiedIso: string): MultiWayConfig<'wati' | 'aisensy'> {
  return {
    path: THREE_WAY_PATH,
    title: 'TopEdge AI vs WATI vs AiSensy (2027): Shopify India',
    description:
      'TopEdge AI vs WATI vs AiSensy for Shopify India, read 27 Nov 2026: entry plans from ₹1,500, India message rates up to 30% above Meta’s, and COD work.',
    keywords:
      'TopEdge AI vs WATI vs AiSensy, wati vs aisensy, WhatsApp automation comparison India, WhatsApp template markup, COD prepaid WhatsApp comparison',
    ways: '3-way',
    shortName: 'TopEdge AI vs WATI vs AiSensy',
    peers: [
      { key: 'wati', name: 'WATI', logo: LOGO_WATI, href: '/compare/wati' },
      { key: 'aisensy', name: 'AiSensy', logo: LOGO_AISENSY, href: '/compare/aisensy' },
    ],
    rows: THREE_WAY_FEATURE_MATRIX,
    faqs: THREE_WAY_FAQS,
    modifiedIso,
    alsoSee: [{ label: 'Add Interakt (4-way board)', href: FOUR_WAY_PATH }],
    refresh: THREE_WAY_REFRESH,
  };
}

export function fourWayConfig(
  modifiedIso: string,
): MultiWayConfig<'wati' | 'interakt' | 'aisensy'> {
  return {
    path: FOUR_WAY_PATH,
    title: 'TopEdge AI vs WATI vs Interakt vs AiSensy (2027)',
    description:
      'WATI, Interakt, AiSensy and TopEdge AI on one board for Shopify India, read 27 Nov 2026: marketing rates from ₹0.8631 to ₹1.09 and who fits which store.',
    keywords:
      'wati vs aisensy vs interakt, wati vs interakt, interakt vs aisensy, WhatsApp automation comparison Shopify India, WhatsApp API platform comparison India, best WhatsApp platform India',
    ways: '4-way',
    shortName: 'TopEdge AI vs WATI vs Interakt vs AiSensy',
    peers: [
      { key: 'wati', name: 'WATI', logo: LOGO_WATI, href: '/compare/wati' },
      { key: 'interakt', name: 'Interakt', logo: LOGO_INTERAKT, href: '/compare/interakt' },
      { key: 'aisensy', name: 'AiSensy', logo: LOGO_AISENSY, href: '/compare/aisensy' },
    ],
    rows: FOUR_WAY_FEATURE_MATRIX,
    faqs: FOUR_WAY_FAQS,
    modifiedIso,
    alsoSee: [{ label: '3-way board (no Interakt)', href: THREE_WAY_PATH }],
    refresh: FOUR_WAY_REFRESH,
  };
}
