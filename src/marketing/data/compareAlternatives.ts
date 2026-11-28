/**
 * Fair one-line index for /compare/alternatives: factual, not a pitch.
 * Keep in sync with COMPARE_COMPETITORS slugs.
 */
export type AlternativeEntry = {
  slug: string;
  name: string;
  href: string;
  logo: string;
  logoAlt: string;
  oneLiner: string;
  /**
   * Short, comparable cells for the decision table on /compare/alternatives.
   *
   * The page used to be a logo directory with one line each, at 446 words, and
   * a reader comparing platforms had to open ten child pages to learn anything.
   * These three fields are condensed from the `subscription` and markup rows
   * already researched per competitor in compareFeatureMatrix.ts, so the table
   * makes no claim that is not already dated and caveated on the child page.
   * Keep them short enough to read across a row, and keep them in sync.
   */
  entryPrice: string;
  markup: string;
  /** What the merchant is actually billed in. FX exposure is the hidden cost. */
  currency: string;
  /**
   * ISO date this row's figures were last read on the vendor's own pricing page
   * or Shopify listing (the same reading as the vendor's own board or
   * sources.ts entry). Shown in the table so no row borrows another's date.
   */
  read: string;
  /**
   * The blog post that owns the "<vendor> alternative" query (one owner per
   * query). This index links to it instead of competing with it.
   */
  altPost?: string;
};

export const COMPARE_ALTERNATIVES: AlternativeEntry[] = [
  {
    slug: 'wati',
    name: 'WATI',
    href: '/compare/wati',
    logo: '/marketing/compare/compare-logo-wati.png',
    logoAlt: 'WATI logo',
    oneLiner: 'Broad WhatsApp platform with its own per-message rate card, automation trigger caps and a $4.99 Shopify add-on.',
    entryPrice: 'Growth ₹2,999 a month, or ₹2,699 billed quarterly and ₹2,199 yearly; 7-day trial',
    markup: 'Growth rate card 20% above Meta on marketing, 30% on utility',
    currency: 'INR',
    read: '2026-11-27',
    altPost: '/blog/wati-alternative-shopify-india',
  },
  {
    slug: 'aisensy',
    name: 'AiSensy',
    href: '/compare/aisensy',
    logo: '/marketing/compare/compare-logo-aisensy.png',
    logoAlt: 'AiSensy logo',
    oneLiner: 'India WhatsApp marketing platform with prepaid credits; chatbot flows and the AI agent are paid add-ons.',
    entryPrice: 'Basic ₹1,500 a month; Chatbot Flows ₹2,500 and AI Chat Agent ₹1,350 a month extra',
    markup: 'About 26% above Meta on marketing and utility',
    currency: 'INR',
    read: '2026-11-27',
    altPost: '/blog/aisensy-alternative-shopify-india',
  },
  {
    slug: 'interakt',
    name: 'Interakt',
    href: '/compare/interakt',
    logo: '/marketing/compare/compare-logo-interakt.png',
    logoAlt: 'Interakt logo',
    oneLiner: 'WhatsApp and Instagram marketing with a shared inbox; Shopify popup, cart reminders and AI agents sit on its top app plan.',
    entryPrice: '$21 a month on the Shopify App Store; web plans from ₹3,499 a quarter plus taxes',
    markup: 'Web plans 10% to 39% above Meta',
    currency: 'USD through Shopify, INR on web plans',
    read: '2026-11-28',
    altPost: '/blog/interakt-alternative-shopify-india',
  },
  {
    slug: 'bitespeed',
    name: 'Bitespeed',
    href: '/compare/bitespeed',
    logo: '/marketing/compare/compare-logo-bitespeed.png',
    logoAlt: 'Bitespeed logo',
    oneLiner: 'AI marketing, sales and support across WhatsApp, AI voice, SMS and email, priced after a sales demo.',
    entryPrice: 'Not published: /pricing redirects to a demo request',
    markup: 'Not published',
    currency: 'Not published',
    read: '2026-11-28',
    altPost: '/blog/bitespeed-alternative-shopify-india',
  },
  {
    slug: 'zoko',
    name: 'Zoko',
    href: '/compare/zoko',
    logo: '/marketing/compare/compare-logo-zoko.svg',
    logoAlt: 'Zoko logo',
    oneLiner: 'WhatsApp commerce for Shopify with every feature on every plan, priced in US dollars plus a fee per conversation.',
    entryPrice: 'Starter $49.99, Plus $79.99, Elite $139.99 a month; 7-day trial',
    markup: 'Starter $0.015 a conversation; Plus 5,000 free, then $0.00199',
    currency: 'USD',
    read: '2026-11-28',
    altPost: '/blog/zoko-alternative-shopify-india',
  },
  {
    slug: 'getgabs',
    name: 'Getgabs',
    href: '/compare/getgabs',
    logo: '/marketing/compare/compare-logo-getgabs.svg',
    logoAlt: 'Getgabs logo',
    oneLiner: 'Low-cost WhatsApp broadcasts in rupees; Shopify automation starts on Plus, and COD confirmation is not on its plan table.',
    entryPrice: 'Basic ₹699, Plus ₹1,499, Business ₹2,999 a month',
    markup: '0% on Meta’s rates',
    currency: 'INR (its Shopify listing is unavailable)',
    read: '2026-11-26',
    altPost: '/blog/getgabs-alternative-shopify-whatsapp',
  },
  {
    slug: 'kanal',
    name: 'Kanal',
    href: '/compare/kanal',
    logo: '/marketing/compare/compare-logo-kanal.svg',
    logoAlt: 'Kanal logo',
    oneLiner: 'Global WhatsApp marketing from €89 a month, with $50 a month per extra selling market on its Shopify listing.',
    entryPrice: 'Pro €89 a month; Scale €149 with the AI agent',
    markup: 'India message rate not published',
    currency: 'EUR on its site, USD through Shopify',
    read: '2026-11-26',
    altPost: '/blog/kanal-whatsapp-alternative-shopify',
  },
  {
    slug: 'dondy',
    name: 'Dondy',
    href: '/compare/dondy',
    logo: '/marketing/compare/compare-logo-dondy.svg',
    logoAlt: 'Dondy logo',
    oneLiner: 'Shopify WhatsApp app from a free chat button up to AI plans, with one published India rate about 60% above Meta’s.',
    entryPrice: 'Free chat button; automated cart recovery from $79.99 a month',
    markup: 'India $0.01888 a message, about 60% above Meta’s USD rate',
    currency: 'USD',
    read: '2026-11-25',
    altPost: '/blog/dondy-alternative-shopify-india',
  },
  {
    slug: 'updatrr',
    name: 'Updatrr',
    href: '/compare/updatrr',
    logo: '/marketing/compare/compare-logo-updatrr.svg',
    logoAlt: 'Updatrr logo',
    oneLiner: 'Shopify WhatsApp automation from $29.99 a month, with COD confirmation on WhatsApp or by AI voice call.',
    entryPrice: 'Growth $29.99, Pro $49.99, Pro AI $99.99 a month; 7-day trial',
    markup: 'None, says its pricing FAQ',
    currency: 'USD',
    read: '2026-11-28',
    altPost: '/blog/updatrr-alternative-shopify-india',
  },
  {
    slug: 'gupshup',
    name: 'Gupshup',
    href: '/compare/gupshup',
    logo: '/marketing/compare/compare-logo-gupshup.svg',
    logoAlt: 'Gupshup logo',
    oneLiner: 'Self-serve WhatsApp platform with no monthly fee: you top up a wallet and pay its all-in rate per message.',
    entryPrice: '₹0 a month; prepaid wallet plus 18% GST',
    markup: 'All-in ₹1.15 marketing and ₹0.145 utility, 33% and 26% above Meta',
    currency: 'INR wallet',
    read: '2026-11-27',
  },
];
