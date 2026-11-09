/**
 * Fair one-line index for /compare/alternatives — factual positioning, not a pitch.
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
};

export const COMPARE_ALTERNATIVES: AlternativeEntry[] = [
  {
    slug: 'wati',
    name: 'WATI',
    href: '/compare/wati',
    logo: '/marketing/compare/compare-logo-wati.png',
    logoAlt: 'WATI logo',
    oneLiner: 'Broad WhatsApp BSP with its own per-message rate card and automation trigger caps.',
    entryPrice: '₹2,699/mo billed quarterly (₹2,999 monthly), 3 users, 7-day trial',
    markup: 'Growth rate card 20% above Meta on marketing, 30% on utility',
    currency: 'INR',
  },
  {
    slug: 'aisensy',
    name: 'AiSensy',
    href: '/compare/aisensy',
    logo: '/marketing/compare/compare-logo-aisensy.png',
    logoAlt: 'AiSensy logo',
    oneLiner: 'India WhatsApp marketing platform with credit / conversation-based plans.',
    entryPrice: 'From ₹1,500/mo billed monthly, AI and chatbot flows extra',
    markup: 'About 26% above Meta on marketing and utility',
    currency: 'INR',
  },
  {
    slug: 'interakt',
    name: 'Interakt',
    href: '/compare/interakt',
    logo: '/marketing/compare/compare-logo-interakt.png',
    logoAlt: 'Interakt logo',
    oneLiner: 'Shopify WhatsApp marketing with plan meters and optional AI add-ons.',
    entryPrice: '₹1,973.48/mo on its Shopify App Store plan (Shopify’s INR estimate), plus messages',
    markup: 'Growth 11% above Meta on marketing, 30% on utility',
    currency: 'INR',
  },
  {
    slug: 'bitespeed',
    name: 'Bitespeed',
    href: '/compare/bitespeed',
    logo: '/marketing/compare/compare-logo-bitespeed.png',
    logoAlt: 'Bitespeed logo',
    oneLiner: 'Omnichannel AI marketing OS sold through a sales demo, with paid AI add-ons.',
    entryPrice: 'Not published: /pricing redirects to a demo request',
    markup: 'Not published',
    currency: 'Not published',
  },
  {
    slug: 'zoko',
    name: 'Zoko',
    href: '/compare/zoko',
    logo: '/marketing/compare/compare-logo-zoko.svg',
    logoAlt: 'Zoko logo',
    oneLiner: 'India-native WhatsApp commerce with base fee plus per-conversation metering.',
    entryPrice: '$49.99 to $499.99/mo plus per-conversation metering',
    markup: 'Starter about $0.015 per conversation, then buckets',
    currency: 'USD',
  },
  {
    slug: 'getgabs',
    name: 'Getgabs',
    href: '/compare/getgabs',
    logo: '/marketing/compare/compare-logo-getgabs.svg',
    logoAlt: 'Getgabs logo',
    oneLiner: 'Low-cost WhatsApp entry (free to install; paid from ~$11–$15/mo). Check tier gates for depth.',
    entryPrice: '$11 to $59/mo, and the listing and site disagree',
    markup: 'Claims 0% Meta markup',
    currency: 'USD',
  },
  {
    slug: 'kanal',
    name: 'Kanal',
    href: '/compare/kanal',
    logo: '/marketing/compare/compare-logo-kanal.svg',
    logoAlt: 'Kanal logo',
    oneLiner: 'Global WhatsApp marketing from €89/mo with native Klaviyo integration.',
    entryPrice: '€89 to €1,900/mo',
    markup: 'Meta fees billed separately',
    currency: 'EUR',
  },
  {
    slug: 'dondy',
    name: 'Dondy',
    href: '/compare/dondy',
    logo: '/marketing/compare/compare-logo-dondy.svg',
    logoAlt: 'Dondy logo',
    oneLiner:
      'Broad Shopify WhatsApp app (widget through Elite AI) whose published rate table sits about 60% above Meta marketing rates.',
    entryPrice: 'Free widget, then $6.99 to $159.99/mo',
    markup: 'Rate table about 60% above Meta marketing rates',
    currency: 'USD',
  },
  {
    slug: 'updatrr',
    name: 'Updatrr',
    href: '/compare/updatrr',
    logo: '/marketing/compare/compare-logo-updatrr.svg',
    logoAlt: 'Updatrr logo',
    oneLiner:
      'Shopify-only WhatsApp automation with a 7-day trial from $29.99; strong on Shopify event triggers, lighter on identity/warranty.',
    entryPrice: 'From $29.99/mo, 7-day trial',
    markup: '0% platform markup',
    currency: 'USD',
  },
  {
    slug: 'gupshup',
    name: 'Gupshup',
    href: '/compare/gupshup',
    logo: '/marketing/compare/compare-logo-gupshup.svg',
    logoAlt: 'Gupshup logo',
    oneLiner:
      'Enterprise WhatsApp CPaaS on pay-as-you-go; platform fee on templates and advanced flows often gated behind Conversation Studio / enterprise modules.',
    entryPrice: 'Pay as you go, no public tiers and no public trial',
    markup: 'Platform fee on every template message',
    currency: 'Not published',
  },
];
