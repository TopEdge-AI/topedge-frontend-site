/**
 * Primary sources the blog is allowed to cite.
 *
 * The 2026-10-07 audit (seo-audit/issues.csv, TE-014) found 12 unique external
 * hosts across 101 pages, 26 of the external URLs pointing at our own
 * dashboard, and zero sources behind the RTO and COD statistics. An unsourced
 * number is the thing an AI engine will not repeat and a reader cannot check,
 * so it is also the cheapest citation signal to fix.
 *
 * Rules for this file:
 *
 *   1. First-party only. Meta's docs for Meta's rules, Shopify's docs for
 *      Shopify's behaviour, the publisher's own page for a statistic. A blog
 *      that restates the number is not a source.
 *   2. `verified` is the day a human opened the URL and read the claim off it.
 *      Re-verify before citing a number that has moved.
 *   3. `claim` is what the page actually says, in its own numbers. If a post
 *      states something this field does not support, the post is wrong, not
 *      the source.
 *
 * scripts/check-blog-sources.mjs fails the build if a blog post links to an
 * external host that is not listed here.
 */

export type Source = {
  id: string;
  url: string;
  /** Link text used in the post. */
  label: string;
  publisher: string;
  /** What this page actually states, as read on `verified`. */
  claim: string;
  verified: string;
};

export const SOURCES = {
  metaPricing: {
    id: 'metaPricing',
    url: 'https://developers.facebook.com/docs/whatsapp/pricing/',
    label: 'Meta’s WhatsApp Business Platform pricing documentation',
    publisher: 'Meta',
    claim:
      'Per-message pricing since 1 July 2025, charged on delivery, by message category (marketing, utility, authentication, service) and the recipient’s country calling code. Carries the live rate card and the volume tiers. Effective 1 October 2026 by messaging account timezone, every business phone number gets a free tier of 1,000 service messages a month and Meta charges from the 1,001st service message onward. Meta Business Agent moved to token billing on 1 August 2026 at $2.00 per million tokens. Utility and authentication volume tiers start at 25,000,000 and 750,000 messages a month, with the India utility rate falling to ₹0.1081 above the utility tier. India card: ₹0.8631 marketing, ₹0.1150 utility and authentication, ₹2.4971 authentication-international, all per delivered message.',
    verified: '2026-10-21',
  },
  metaTemplates: {
    id: 'metaTemplates',
    url: 'https://developers.facebook.com/docs/whatsapp/message-templates/guidelines/',
    label: 'Meta’s message template guidelines',
    publisher: 'Meta',
    claim:
      'Template fundamentals: how templates are categorised, reviewed and approved, and what gets a template rejected.',
    verified: '2026-10-21',
  },
  whatsappPolicy: {
    id: 'whatsappPolicy',
    url: 'https://whatsappbusiness.com/policy/',
    label: 'the WhatsApp Business Messaging Policy',
    publisher: 'WhatsApp',
    claim:
      'Businesses may message a person only where that person gave their number and gave opt-in permission to receive messages. The business is responsible for the opt-in method. Last updated 23 September 2026.',
    verified: '2026-10-21',
  },
  shopifyAbandoned: {
    id: 'shopifyAbandoned',
    url: 'https://help.shopify.com/manual/orders/abandoned-checkouts',
    label: 'Shopify’s own abandoned checkout documentation',
    publisher: 'Shopify',
    claim:
      'A checkout counts as abandoned when it stays incomplete for more than ten minutes after the customer has given their email. Recovery emails are available on the Online Store and Buy Button channels only.',
    verified: '2026-10-21',
  },
  shopifyAbandonedApi: {
    id: 'shopifyAbandonedApi',
    url: 'https://shopify.dev/docs/api/admin-graphql/latest/queries/abandonedCheckouts',
    label: 'Shopify’s abandonedCheckouts GraphQL Admin API reference',
    publisher: 'Shopify',
    claim:
      'abandonedCheckouts returns a paginated list of abandoned checkouts, where a checkout counts as abandoned once a customer has given contact information and not completed the purchase. The list covers both abandoned and recovered checkouts. Arguments: first, after, last, before, query, reverse, savedSearchId, sortKey. Fields on the returned object include abandonedCheckoutUrl, billingAddress, completedAt and createdAt. A companion abandonedCheckoutsCount query returns a count with a precision value and an optional limit.',
    verified: '2026-10-30',
  },
  baymardCart: {
    id: 'baymardCart',
    url: 'https://baymard.com/blog/cart-abandonment-rate',
    label: 'Baymard Institute’s cart abandonment list',
    publisher: 'Baymard Institute',
    claim:
      '70.22% average documented online shopping cart abandonment rate, averaged across 50 published studies. Page last updated 22 September 2025.',
    verified: '2026-10-21',
  },
  unicommerceRto: {
    id: 'unicommerceRto',
    url: 'https://unicommerce.com/india-d2c-report-2026-april/',
    label: 'Unicommerce’s India D2C Report 2026',
    publisher: 'Unicommerce',
    claim:
      'RTO of 39.2% at the November 2025 festive peak falling to 25.6% in January 2026 and 21.0% by March 2026 among brands running prepaid incentives, pincode-level courier routing and pre-dispatch address verification, built from 410M+ shipments across 6,000+ brands. Festive-quarter COD returns around 58% against under 15% for prepaid. Tier-2 and Tier-3 cities drove 66% of incremental order volume in FY26.',
    verified: '2026-10-21',
  },
  amazonShippingRto: {
    id: 'amazonShippingRto',
    url: 'https://shipping.amazon.in/blog/what-is-rto-how-to-reduce-return-to-origin',
    label: 'Amazon Shipping India’s RTO cost breakdown',
    publisher: 'Amazon Shipping India',
    claim:
      'One RTO parcel costs ₹180 to ₹240 in direct logistics: forward shipping ₹60 to ₹100, reverse logistics ₹50 to ₹80, repackaging and quality check ₹20 to ₹40, inventory holding in transit ₹10 to ₹20. That total excludes acquisition cost, and the page notes ₹450 to ₹680 spent acquiring a customer who then refuses at the door. Orders attempted within 1 to 2 days had 22% RTO, rising to 35% when attempted after 5+ days. Vadodara recorded the lowest city RTO at 18%.',
    verified: '2026-10-21',
  },
  amazonShippingTrueCost: {
    id: 'amazonShippingTrueCost',
    url: 'https://shipping.amazon.in/blog/true-cost-of-shipping-per-order-india',
    label: 'Amazon Shipping India’s true cost per order breakdown',
    publisher: 'Amazon Shipping India',
    claim:
      'Worked ₹799 women’s cotton kurta example. Packaging ₹13 (₹10 mailer, ₹2 tape, ₹1 label). Volumetric weight (32 x 25 x 5) / 5,000 = 0.80 kg billed at the 1 kg slab, so ₹85 national freight on a 300g product. COD remittance fee ₹30. Amortised RTO cost ₹38 (30% x ₹125 incremental reverse cost). Support time ₹13 (40% touch rate x ₹32 per interaction, being 20 minutes at ₹96/hr). Visible costs ₹128, true total ₹179 against the ₹85 the seller sees.',
    verified: '2026-10-21',
  },
  amazonShippingNdr: {
    id: 'amazonShippingNdr',
    url: 'https://shipping.amazon.in/blog/what-is-ndr-in-shipping-india',
    label: 'Amazon Shipping India’s NDR resolution guide',
    publisher: 'Amazon Shipping India',
    claim:
      'Nearly every failed delivery not resolved within 36 hours of the NDR being raised ends in cancellation and RTO. Indian courier SLAs typically allow 24 to 48 hours between delivery attempts, most couriers make two to three attempts, and the page advises contacting the buyer within 2 to 4 hours of the NDR.',
    verified: '2026-10-21',
  },
  firstResortReturns: {
    id: 'firstResortReturns',
    url: 'https://www.firstresort.in/blogs/research/fashion-ecommerce-returns-rto-india-2026',
    label: 'First Resort’s 2026 India fashion returns and RTO research',
    publisher: 'First Resort',
    claim:
      'Citing ClickPost: ₹150 to ₹300 direct logistics per RTO parcel and ₹450 to ₹900 fully loaded once written-off acquisition spend is counted. Category RTO bands: fashion and apparel 25% to 40%, beauty and personal care 18% to 25%, furniture and large goods 15% to 20%, electronics 10% to 15%, FMCG and consumables 8% to 12%. Citing GoKwik: COD RTO near 26% against prepaid under 2%, with 60% to 70% of RTOs stemming from low buying intent rather than logistics failure.',
    verified: '2026-10-21',
  },
  aisensyPricing: {
    id: 'aisensyPricing',
    url: 'https://aisensy.com/pricing',
    label: 'AiSensy’s published pricing page',
    publisher: 'AiSensy',
    claim:
      'Per-message rates for Indian users, read 7 November 2026: marketing ₹1.09, utility ₹0.145, authentication ₹0.145, service ₹0.145 after 1,000 free service messages a month (from 1 October 2026). Against Meta’s India card of ₹0.8631 marketing and ₹0.1150 utility, that is about 26% above Meta on both lines. Plans billed monthly: Basic ₹1,500, Pro ₹3,200, Premium ₹9,100, Unlimited ₹45,000. Extra agents ₹750 each a month; AI Agent ₹1,350 a month for 1,000 AI messages; Chatbot Flows ₹2,500 a month.',
    verified: '2026-11-07',
  },
  interaktPricing: {
    id: 'interaktPricing',
    url: 'https://www.interakt.shop/pricing/',
    label: 'Interakt’s published pricing page',
    publisher: 'Interakt',
    claim:
      'Read 9 November 2026 on all three billing views, plus taxes. Monthly: Starter ₹999 (Instagram only), Growth ₹2,799, Advanced ₹3,799. Quarterly: Starter ₹3,499, Growth ₹7,699, Advanced ₹10,499. Yearly: Starter ₹11,999, Growth ₹26,399, Advanced ₹35,999. On quarterly and yearly billing Starter is “Pick any one channel”, WhatsApp or Instagram; Growth and Advanced include both. Enterprise on request. Unlimited agents on every plan, owner roles only on Starter. Per-message rates for Indian numbers: Starter marketing ₹0.970, authentication ₹0.129, utility ₹0.160, service ₹0.129; Growth ₹0.958, ₹0.128, ₹0.150, ₹0.128; Advanced ₹0.949, ₹0.127, ₹0.140, ₹0.127; service charged after 1,000 free service messages. Only Enterprise is listed with “No Markup Charges”. Against Meta’s ₹0.8631 marketing and ₹0.1150 utility, Growth is about 11% above Meta on marketing and 30% on utility. The feature table lists “Shopify Integration (Only included on Shopify plan...)” linking to apps.shopify.com/interakt-marketing. WhatsApp AI Agents tab: ₹9,000 a quarter (+GST), shown as a ₹3,000 add-on for Growth and Advanced on the main table, 100 free AI messages, then ₹0.50 per AI message. Sales CRM is a separate product; its ₹2,499 for 5 agents was last read 21 October 2026. The 7 November reading recorded the monthly view only and so missed the quarterly Starter channel rule.',
    verified: '2026-11-09',
  },
  topedgeShopifyListing: {
    id: 'topedgeShopifyListing',
    url: 'https://apps.shopify.com/topedge-ai',
    label: 'TopEdge AI on the Shopify App Store',
    publisher: 'Shopify App Store',
    claim:
      'Read 9 November 2026 from India: Launch ₹1,785.53 a month or ₹17,103.49 a year, Growth ₹3,665.03 or ₹35,146.74, Scale ₹6,108.39 or ₹58,640.55, as Shopify’s INR estimates at 1 INR = 0.0106 USD, billed in the store’s billing currency. The Partner Dashboard prices behind them are $19, $39 and $65 a month and $182, $374 and $624 a year. Limits match the website plans: 100, 800 and 1,500 orders and 3,000, 15,000 and 30,000 campaign plus email sends per cycle; Journey Branch and COD to prepaid on Growth and Scale; 14-day free trial. 0 reviews.',
    verified: '2026-11-09',
  },
  shopifyAppPricingDocs: {
    id: 'shopifyAppPricingDocs',
    url: 'https://shopify.dev/docs/apps/launch/billing/shopify-app-pricing',
    label: 'Shopify’s App Pricing documentation',
    publisher: 'Shopify',
    claim:
      'Read 9 November 2026: “Plan prices are set in USD only.” Merchants billed in a supported local currency are charged the converted amount and see estimated prices on the plan page and the App Store listing. Setting prices directly in a local billing currency requires Manual Pricing with the Billing API.',
    verified: '2026-11-09',
  },
  shopifyLocalCurrencyBilling: {
    id: 'shopifyLocalCurrencyBilling',
    url: 'https://help.shopify.com/en/manual/your-account/manage-billing/paying-your-bills/managing-payments/local-currency',
    label: 'Shopify Help Center on local currency billing',
    publisher: 'Shopify',
    claim:
      'Read 9 November 2026: India (INR) is a supported local billing currency on all plans. App charges (one-time, usage and subscription) are converted from USD, and converted charges include a 1.5% currency exchange fee, except third-party transaction fees.',
    verified: '2026-11-09',
  },
  interaktRateTable: {
    id: 'interaktRateTable',
    url: 'https://www.interakt.shop/whatsapp-conversation-pricing/',
    label: 'Interakt’s country-wise WhatsApp message rate table',
    publisher: 'Interakt',
    claim:
      'Read 9 November 2026. Per-message rates by country and plan column (Starter, Growth, Advanced). India: Starter ₹0.970 marketing, ₹0.160 utility, ₹0.129 authentication, ₹2.807 authentication-international, ₹0.129 service; Growth ₹0.958, ₹0.150, ₹0.128, ₹2.772, ₹0.128; Advanced ₹0.949, ₹0.140, ₹0.127, ₹2.747, ₹0.127. This is the page the Shopify App Store listing links to as “See all pricing options”.',
    verified: '2026-11-09',
  },
  interaktShopifyListing: {
    id: 'interaktShopifyListing',
    url: 'https://apps.shopify.com/interakt-marketing',
    label: 'Interakt on the Shopify App Store',
    publisher: 'Shopify App Store',
    claim:
      'Read 9 November 2026 from India. Rating 4.3 from 233 reviews. Prices shown as Shopify’s INR estimates at 1 INR = 0.0106 USD, billed in the store’s billing currency: Starter ₹1,973.48 a month or ₹16,915.54 a year; Growth ₹3,852.99 or ₹27,816.67; Advanced ₹4,792.74 or ₹43,980.42; Premier ₹9,303.55 or ₹78,845.23; each plus additional WhatsApp conversation charges, each with a 14-day free trial. Starter: API approval and setup, automated notifications, shared team inbox, WhatsApp widget, Blue tick application. Growth adds notifications with delay, analytics and reports, basic WhatsApp chatbot, roles and permissions, Instagram automation. Advanced adds advanced chatbot, API rate limit 600 msg/min, agent stats, advanced chat auto-routing. Premier adds WhatsApp AI agents (sales, FAQ, lead qualification), a popup for collecting WhatsApp numbers, cart reminders to those numbers, and Shopify actions in the workflow builder.',
    verified: '2026-11-09',
  },
  updatrrPricing: {
    id: 'updatrrPricing',
    url: 'https://www.updatrr.com/pricing',
    label: 'Updatrr’s published pricing page',
    publisher: 'Updatrr',
    claim:
      'Growth $29.99/month, Pro $49.99/month, Pro AI $99.99/month, all with a 7-day free trial and no card required. Updatrr states it does not add a markup on Meta’s conversation fees and that Meta bills WhatsApp conversations separately. Pro lists a “Custom No-code Chatbot”, shown as “No-code AI Chatbot” in the plan comparison table. “AI Chatbot with Smart Human Handover”, AI voice calling and the unified WhatsApp, Instagram and Facebook inbox are on Pro AI only. Team members: 1 on Growth, 3 on Pro, 10 on Pro AI. No order limit is published on any plan, and the page publishes no per-message AI fee. It says country-wise pricing is available inside the dashboard and annual pricing is on request. Re-read 9 November 2026, unchanged.',
    verified: '2026-11-09',
  },
  littledataConversion: {
    id: 'littledataConversion',
    url: 'https://www.littledata.io/ecommerce-conversion-rate',
    label: 'Littledata’s Shopify conversion rate benchmark',
    publisher: 'Littledata',
    claim:
      'Median conversion rate 1.4% of sessions across 436 Shopify stores sending data to GA4, 90 days Jul 27 to Oct 24, 2026, generated Oct 28, 2026. Bottom 10% 0.3%, bottom 20% 0.5%, top 20% 2.7%, top 10% 3.7%. Mobile median 1.5%, desktop 1.4%. Definition: sessions with at least one purchase divided by all sessions.',
    verified: '2026-10-31',
  },
  littledataAddToCart: {
    id: 'littledataAddToCart',
    url: 'https://www.littledata.io/benchmarks/add-to-cart-rate',
    label: 'Littledata’s Shopify add to cart rate benchmark',
    publisher: 'Littledata',
    claim:
      'Median add to cart rate 6.8% of sessions. Bottom 10% 2.1%, bottom 20% 3.4%, top 20% 12%, top 10% 17%. Definition: the share of sessions in which a product was added to the cart. Same 436-store sample and 90-day window to Oct 24, 2026.',
    verified: '2026-10-31',
  },
  littledataCartAbandonment: {
    id: 'littledataCartAbandonment',
    url: 'https://www.littledata.io/benchmarks/cart-abandonment-rate',
    label: 'Littledata’s Shopify cart abandonment benchmark',
    publisher: 'Littledata',
    claim:
      'Median cart abandonment 79% across 433 Shopify stores. Best 10% 56%, best 20% 65%, worst 20% 90%, worst 10% 94%. Definition: of the sessions that added to cart, the share that did not purchase. 90 days to Oct 24, 2026.',
    verified: '2026-10-31',
  },
  littledataCheckout: {
    id: 'littledataCheckout',
    url: 'https://www.littledata.io/benchmarks/checkout-completion-rate',
    label: 'Littledata’s Shopify checkout completion benchmark',
    publisher: 'Littledata',
    claim:
      'Median checkout completion 49% across 435 Shopify stores. Bottom 10% 15%, bottom 20% 26%, top 20% 66%, top 10% 74%. Mobile median 63% (414 stores), desktop median 35% (412 stores). Definition: of the sessions that started checkout, the share that went on to purchase. 90 days to Oct 24, 2026.',
    verified: '2026-10-31',
  },
  littledataBounce: {
    id: 'littledataBounce',
    url: 'https://www.littledata.io/benchmarks/bounce-rate',
    label: 'Littledata’s Shopify bounce rate benchmark',
    publisher: 'Littledata',
    claim:
      'Median bounce rate 40% across 436 Shopify stores. Best 10% below 9.8%, best 20% below 20%, worst 20% above 56%, worst 10% above 63%. Definition: the share of sessions that were not engaged (under 10 seconds, one page and no conversion). 90 days to Oct 24, 2026.',
    verified: '2026-10-31',
  },
  littledataBeauty: {
    id: 'littledataBeauty',
    url: 'https://www.littledata.io/benchmarks/beauty',
    label: 'Littledata’s beauty and skincare benchmark',
    publisher: 'Littledata',
    claim:
      '39 beauty and skincare Shopify stores, medians: conversion 2.5%, add to cart 12%, checkout completion 50%, cart abandonment 75%, bounce 38%, AOV $69, mobile traffic share 69%. 90 days to Oct 24, 2026.',
    verified: '2026-10-31',
  },
  littledataSupplements: {
    id: 'littledataSupplements',
    url: 'https://www.littledata.io/benchmarks/supplements',
    label: 'Littledata’s health and supplements benchmark',
    publisher: 'Littledata',
    claim:
      '35 health and supplements Shopify stores, medians: conversion 2.4%, add to cart 8.2%, checkout completion 60%, cart abandonment 70%, bounce 47%, AOV $75, mobile traffic share 67%. 90 days to Oct 24, 2026.',
    verified: '2026-10-31',
  },
  littledataFood: {
    id: 'littledataFood',
    url: 'https://www.littledata.io/benchmarks/food-and-beverage',
    label: 'Littledata’s food and beverage benchmark',
    publisher: 'Littledata',
    claim:
      '32 food and beverage Shopify stores, medians: conversion 2.3%, add to cart 11%, checkout completion 53%, cart abandonment 77%, bounce 42%, AOV $85, mobile traffic share 54%. 90 days to Oct 24, 2026.',
    verified: '2026-10-31',
  },
  littledataFashion: {
    id: 'littledataFashion',
    url: 'https://www.littledata.io/benchmarks/fashion',
    label: 'Littledata’s fashion and apparel benchmark',
    publisher: 'Littledata',
    claim:
      '76 fashion and clothing Shopify stores, medians: conversion 1.0%, add to cart 6.0%, checkout completion 48%, cart abandonment 81%, bounce 42%, AOV $113, mobile traffic share 68%. 90 days to Oct 24, 2026.',
    verified: '2026-10-31',
  },
  littledataHome: {
    id: 'littledataHome',
    url: 'https://www.littledata.io/benchmarks/home',
    label: 'Littledata’s home and furniture benchmark',
    publisher: 'Littledata',
    claim:
      '63 home and furniture Shopify stores, medians: conversion 1.0%, add to cart 5.0%, checkout completion 51%, cart abandonment 80%, bounce 42%, AOV $211, mobile traffic share 65%. 90 days to Oct 24, 2026.',
    verified: '2026-10-31',
  },
  irpMarketData: {
    id: 'irpMarketData',
    url: 'https://www.irpcommerce.com/en/gb/ecommercemarketdata.aspx',
    label: 'IRP Commerce’s ecommerce market data',
    publisher: 'IRP Commerce',
    claim:
      'September 2026 view (the page defaults to the latest month): all-market conversion rate 1.97% (1.68% a year earlier), bounce rate 41.55%. CPA, which IRP defines as total marketing cost divided by total revenue, by traffic source: Google PPC 11.19%, Email Marketing 0.85%, Bing and Yahoo PPC 11.53%, Facebook Paid 49.76%. Sales by channel: Paid Search 63.5%, Direct 20.2%, Email 10%, Paid Social 0.5%. Retailers on IRP’s platform, reported in pounds. Free to use with the source cited.',
    verified: '2026-10-31',
  },
  watiPricing: {
    id: 'watiPricing',
    url: 'https://www.wati.io/pricing/',
    label: 'WATI’s published pricing page',
    publisher: 'WATI',
    claim:
      'Read 7 November 2026 and re-read 10 November 2026 (unchanged). Billed annually: Growth ₹2,199, Pro ₹4,899 and Business ₹14,799 a month. Add-ons on 10 November: 1,000 extra automation triggers ₹1,000/month, 2,000 extra Wati AI credits ₹1,600/month, additional WhatsApp numbers ₹2,499/month each; 7-day free trial, no setup fee; Growth lists 15k broadcasts a month. India plans billed quarterly: Growth ₹2,699/month (3 users, no additional users), Pro ₹5,799/month (5 users included, additional users ₹1,299/user/month), Business ₹16,799/month (5 users included, additional users ₹2,199/user/month). Billed monthly: ₹2,999, ₹6,499 and ₹18,499. Every plan card says “Additional charges apply for template messages”. Broadcasts are listed at “Standard rates” on Growth and Pro, and volume discounts on Business, but the per-message prices are on WATI’s own rate cards (see watiRateCard), which sit above Meta. A Shopify Integration add-on is listed at USD 4.99/month. Growth includes 1 Astra AI agent, 2,000 Wati AI credits and 1,000 free automation triggers a month; Pro 2 agents, 5,000 credits and 2,000 triggers; Business unlimited agents, 20,000 credits and 5,000 triggers. Advanced inbox features (teams, intelligent routing) start on Pro. Correction: an earlier reading of this entry (2 Nov 2026) took “Standard rates” to mean Meta’s rate passed through; WATI’s rate cards show that is wrong.',
    verified: '2026-11-10',
  },
  watiRateCard: {
    id: 'watiRateCard',
    url: 'https://cdn.clare.ai/pricing/Wati-Pricing-Rate-Card-Growth-Plan-INR-I.pdf',
    label: 'WATI’s INR rate card for the Growth plan',
    publisher: 'WATI',
    claim:
      'Rate card dated 1 October 2026, linked from wati.io/pricing as “View Rate Card”, read 7 November 2026; the three PDFs were still last modified 1 October 2026 when checked on 10 November 2026. India (+91) per message: Growth plan marketing ₹1.0357, utility ₹0.1495, authentication ₹0.1495, service ₹0.1380. The Pro plan card lists ₹0.9926, ₹0.1495, ₹0.1495, ₹0.1380 and the Business plan card ₹0.9667, ₹0.1380, ₹0.1380, ₹0.1231. Against Meta’s ₹0.8631 marketing and ₹0.1150 utility, Growth is 20% above Meta on marketing and 30% on utility; Pro 15% and 30%; Business 12% and 20%. States that every business gets 1,000 free service messages a month.',
    verified: '2026-11-07',
  },
  zokoPricing: {
    id: 'zokoPricing',
    url: 'https://www.zoko.io/pricing',
    label: 'Zoko’s published pricing page',
    publisher: 'Zoko',
    claim:
      'Starter $49.99/month, Plus $79.99/month with extra agents at $15/agent/month, and a $139.99/month tier with extra agents at $12/agent/month. Priced in US dollars with no rupee plan published. Add-ons are metered on outcomes rather than seats: one at $24.99/month plus $0.09 per resolution, another at $24.99/month plus 3% of order value.',
    verified: '2026-11-02',
  },
  bitespeedPricing: {
    id: 'bitespeedPricing',
    url: 'https://www.bitespeed.co/pricing',
    label: 'BiteSpeed’s pricing page',
    publisher: 'BiteSpeed',
    claim:
      'BiteSpeed publishes no prices. Requesting https://www.bitespeed.co/pricing returns a single redirect to https://www.bitespeed.co/request-demo, so there is no plan, tier or per-message rate a buyer can read before speaking to sales.',
    verified: '2026-11-02',
  },
  dondyListing: {
    id: 'dondyListing',
    url: 'https://apps.shopify.com/dondy-marketing-ai',
    label: 'Dondy’s Shopify App Store listing',
    publisher: 'Shopify',
    claim:
      'Dondy carries the Built for Shopify badge, lists a free plan and a free trial, is rated 4.9 from 835 reviews, and the listing states the developer is based in India. Served to an Indian store in rupees: Pro ₹656.88, Power Automation ₹7,517.01 and Elite ₹15,034.96 a month, against $6.99, $79.99 and $159.99 list prices, which is about ₹93.97 to the dollar; Shopify bills in the store’s currency at the exchange rate on the day of each charge. Power says WhatsApp automation rates start from $0.0158 (US), Elite from $0.0126 (US), and both include 1,000 one-click messages every 30 days. COD verification is named among the chat features. Interface languages are English, Spanish, Italian, Portuguese (Brazil) and French.',
    verified: '2026-11-08',
  },
  dondyPricing: {
    id: 'dondyPricing',
    url: 'https://www.dondy.net/dondy-pricing',
    label: 'Dondy’s pricing page and per-market rate table',
    publisher: 'Dondy',
    claim:
      'Plans in US dollars, each with a 7-day free trial: Free $0, Pro $6.99, Advanced $14.99, Power Automation $79.99, Elite $159.99 and Ultimate $299 a month, with 25% off yearly. Power says automation rates start from $0.0158 (US) and include 1,000 one-click messages every 30 days. A “WhatsApp API Pricing, Market Rate Per Message (US$)” table lists India at $0.01888, North America $0.04, Colombia $0.02, Turkey $0.01744 and Rest of Central & Eastern Europe $0.1376. The table does not split marketing from utility messages.',
    verified: '2026-11-08',
  },
  metaUsdRateCard: {
    id: 'metaUsdRateCard',
    url: 'https://developers.facebook.com/docs/whatsapp/pricing/',
    label: 'Meta’s USD rate card for the WhatsApp Business Platform',
    publisher: 'Meta',
    claim:
      'The “USD list rates” sheet linked from Meta’s pricing documentation, titled “Cost per message in USD on the WhatsApp Business Platform, effective October 1, 2026”, lists India at $0.0118 marketing, $0.0014 utility, $0.0014 authentication, $0.0304 authentication-international and $0.0014 service. Marketing rows for comparison: North America $0.025, Colombia $0.0125, Turkey $0.0109, Rest of Central & Eastern Europe $0.086.',
    verified: '2026-11-08',
  },
  ecbUsdInr: {
    id: 'ecbUsdInr',
    url: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html',
    label: 'the European Central Bank’s euro reference exchange rates',
    publisher: 'European Central Bank',
    claim:
      'Reference rates for 6 November 2026, quoted against the euro: US dollar 1.1165, Indian rupee 104.8645, which implies ₹93.92 per US dollar. The ECB states the rates are published for information purposes only and not for transactions.',
    verified: '2026-11-08',
  },
  getgabsPricing: {
    id: 'getgabsPricing',
    url: 'https://getgabs.com/pricing/',
    label: 'Getgabs’s published pricing page',
    publisher: 'Getgabs',
    claim:
      'Read from India: Basic ₹699, Plus ₹1,499 and Pro ₹4,499 a month, or ₹6,990, ₹14,990 and ₹44,990 a year, each plan labelled “0% Markup”, with free onboarding and setup. Broadcast limits are 30,000, 500,000 and unlimited a month. Lists Meta messaging cost as marketing ₹0.8631, authentication ₹0.115, utility ₹0.115 and service ₹0.115 after 1,000 messages a month.',
    verified: '2026-11-08',
  },
  getgabsListing: {
    id: 'getgabsListing',
    url: 'https://apps.shopify.com/getgabs-whatsapp-chatbot-api',
    label: 'Getgabs’s Shopify App Store listing',
    publisher: 'Shopify',
    claim:
      'Getgabs: WhatsApp Chat Widget, by GETGABS LLP, rated 4.4 from 15 reviews. Free to install, with the note that a Getgabs subscription is required to unlock all features. Served to an Indian store: Plus ₹1,033.72 a month (₹10,243.21 a year) with 500,000 broadcasts and 3 inbox agents, Pro ₹5,544.49 a month (₹55,350.90 a year) with unlimited broadcasts and 10 agents. External charges may be billed by GETGABS LLP separately from the Shopify invoice.',
    verified: '2026-11-08',
  },
  delightchatPricing: {
    id: 'delightchatPricing',
    url: 'https://www.delightchat.io/pricing',
    label: 'DelightChat’s published pricing page',
    publisher: 'DelightChat',
    claim:
      'Three published tiers at $29, $99 and $299 a month. Overages are metered on support volume rather than messages: $10 per extra 100 tickets and $10 per extra 1,000 contacts. Every additional WhatsApp API number costs a further $25 a month. Priced in US dollars with no rupee plan published.',
    verified: '2026-11-02',
  },

  /*
   * Upsell and Shopify-SEO sources, added 3 November 2026 for the two listicle
   * posts. App Store prices below were read from an Indian IP, so the listing
   * served rupees: Shopify states a merchant is billed in their own store's
   * currency at the exchange rate on the day of each charge, so these are the
   * rupee figures an Indian store sees, not a converted USD list price.
   */
  shopifySeoKeywords: {
    id: 'shopifySeoKeywords',
    url: 'https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords',
    label: 'Shopify’s own guide to editing titles and meta descriptions',
    publisher: 'Shopify',
    claim:
      'States "You can enter up to 70 characters in the title" and recommends 60 or fewer to avoid truncation, and that "It’s recommended that 160 characters is used in the description". Says the title tag cannot be edited in HTML because it "is only included in one file of your Shopify theme: theme.liquid", and that where the field is left blank the theme generates the title from the shop name and the content title. Also states plainly "There’s no FTP access to your web pages" and "Your website isn’t made of static HTML pages that you can edit piece by piece". Notes search engines may rewrite titles and descriptions and that changes can take a couple of weeks to appear.',
    verified: '2026-11-03',
  },
  shopifyRobotsTxt: {
    id: 'shopifyRobotsTxt',
    url: 'https://help.shopify.com/en/manual/promoting-marketing/seo/hide-a-page-from-search-engines',
    label: 'Shopify’s guide to hiding a page from search engines',
    publisher: 'Shopify',
    claim:
      'States "All Shopify stores have a preconfigured and optimized robots.txt.liquid template" and that "you don’t need to make any changes to your robots.txt.liquid file unless you have a specific reason to do so". For pages the file does not cover it directs merchants to customise the head section of theme.liquid instead.',
    verified: '2026-11-03',
  },
  googleCanonical: {
    id: 'googleCanonical',
    url: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls',
    label: 'Google Search Central on canonicalisation',
    publisher: 'Google',
    claim:
      'Describes rel="canonical" as "A strong signal that the specified URL should become canonical" and a sitemap entry as "A weak signal that helps the URLs that are included in a sitemap become canonical". States that "Google will decide which pages (if any) are duplicates, based on similarity of content" and that where no canonical is specified "Google will identify which version of the URL is objectively the best version". Nowhere states that a declared canonical is obeyed.',
    verified: '2026-11-03',
  },
  candyRackListing: {
    id: 'candyRackListing',
    url: 'https://apps.shopify.com/candyrack',
    label: 'Candy Rack’s Shopify App Store listing',
    publisher: 'Shopify',
    claim:
      'Candy Rack by Digismoothie, rated 4.9 from 266 reviews, launched 17 October 2018. Free plan available plus an 8-day free trial. Listing states offers in 8 placements across product page, cart, checkout and post-purchase, AI product suggestions with a choice of engine including Google Gemini, new volume bundles and quantity breaks, a built-in cart drawer with a rewards bar, and that it is built in the EU, collects no sensitive data and is GDPR-compliant. Four plans shown: Trial & Dev free, then Lite ₹2,846.65, Starter ₹3,795.85 and Growth ₹5,694.24 per month, banded by online store orders a month (0 to 50, 51 to 200, 201 to 500) rather than by feature, with every band listing unlimited upsell orders and revenue, built-in slide cart, tailored design, 24/7 chat and email support and a 60-day money-back guarantee. Shopify Magic’s merchant summary, shown only on apps with 100+ reviews and at least 4.0, reports merchants saying it reliably drives extra revenue and higher AOV and often pays for itself quickly.',
    verified: '2026-11-03',
  },
  reconvertListing: {
    id: 'reconvertListing',
    url: 'https://apps.shopify.com/reconvert',
    label: 'ReConvert’s Shopify App Store listing',
    publisher: 'Shopify',
    claim:
      'ReConvert Post Purchase Upsell, developer shown as "Upsell.com ex ReConvert", rated 4.8 from 3,127 reviews, launched 26 September 2018. Free plan available plus a 14-day free trial. Paid bands shown were ₹948.25 for 51 to 100 orders, ₹1,897.45 for 101 to 200 and ₹3,795.85 for 201 to 500 a month.',
    verified: '2026-11-03',
  },
  aftersellListing: {
    id: 'aftersellListing',
    url: 'https://apps.shopify.com/aftersell',
    label: 'AfterSell’s Shopify App Store listing',
    publisher: 'Shopify',
    claim:
      'Aftersell Post Purchase Upsell, developer Rokt, rated 4.9 from 1,115 reviews, launched 31 December 2019. Free plan available plus a 30-day free trial. Three paid tiers shown, split by what they reach rather than by order volume: Post-Purchase ₹3,321.25, Pre-Purchase ₹5,694.24 and Complete ₹7,592.64 per month.',
    verified: '2026-11-03',
  },
  zipifyOcuListing: {
    id: 'zipifyOcuListing',
    url: 'https://apps.shopify.com/zipify-oneclickupsell',
    label: 'Zipify OneClickUpsell’s Shopify App Store listing',
    publisher: 'Shopify',
    claim:
      'One Click Upsell ‑ Zipify OCU, developer Zipify Apps, rated 4.5 from 572 reviews, launched 9 October 2020. Free plan available plus a 30-day free trial. The lowest rating of the major upsell apps checked on this date.',
    verified: '2026-11-03',
  },
  selleasyListing: {
    id: 'selleasyListing',
    url: 'https://apps.shopify.com/upsell-cross-sell-kit-1',
    label: 'Selleasy’s Shopify App Store listing',
    publisher: 'Shopify',
    claim:
      'Upsell & Cross Sell — Selleasy, developer Logbase, rated 4.9 from 2,766 reviews, launched 15 July 2021. Free plan available plus a 30-day free trial. Three paid tiers shown at ₹854.28, ₹2,752.68 and ₹5,600.27 per month, the cheapest entry tier of the apps checked on this date.',
    verified: '2026-11-03',
  },
  frequentlyBoughtListing: {
    id: 'frequentlyBoughtListing',
    url: 'https://apps.shopify.com/frequently-bought-together',
    label: 'Frequently Bought Together’s Shopify App Store listing',
    publisher: 'Shopify',
    claim:
      'Frequently Bought Together CBB, developer Code Black Belt, rated 4.9 from 1,213 reviews, launched 15 March 2017, the oldest of the upsell apps checked bar In Cart Upsell. Free plan available plus a 14-day free trial. Three paid tiers shown at ₹948.25, ₹2,372.05 and ₹3,795.85 per month.',
    verified: '2026-11-03',
  },
  inCartUpsellListing: {
    id: 'inCartUpsellListing',
    url: 'https://apps.shopify.com/in-cart-upsell',
    label: 'In Cart Upsell’s Shopify App Store listing',
    publisher: 'Shopify',
    claim:
      'ICU • In Cart Upsell Cross Sell, developer In Cart Upsell, rated 4.8 from 583 reviews, launched 8 December 2015, the oldest upsell app checked. Free plan available plus a 30-day free trial. Paid tiers shown at ₹948.25, ₹1,897.45 and ₹4,745.05 per month, banded by the merchant’s Shopify plan rather than by order volume.',
    verified: '2026-11-03',
  },
  releasitListing: {
    id: 'releasitListing',
    url: 'https://apps.shopify.com/releasit-cod-order-form',
    label: 'Releasit COD Form & Upsells on the Shopify App Store',
    publisher: 'Shopify',
    claim:
      'Releasit COD Form & Upsells, developer Releasit, rated 4.9 from 2,419 reviews, launched 31 August 2021, carries the Built for Shopify badge and is free to install. Subtitle reads "Cash on Delivery Form for Dropshipping: Upsells, OTP, SMS". Paid tiers shown at ₹1,090.63, ₹2,846.65 and ₹6,643.44 per month. Shopify’s own Upsell and bundles category page lists it first among recommended apps in that category.',
    verified: '2026-11-03',
  },
  kachingBundlesListing: {
    id: 'kachingBundlesListing',
    url: 'https://apps.shopify.com/bundle-deals',
    label: 'Kaching Bundles App & Upsells on the Shopify App Store',
    publisher: 'Shopify',
    claim:
      'Kaching Bundles App & Upsells, developer Kaching Bundles & Upsells, rated 5.0 from 6,592 reviews, launched 11 August 2022, free to install with a 7-day free trial. Paid tiers shown at ₹1,422.85, ₹2,846.65 and ₹5,694.24 per month. At 6,592 reviews it is the most-reviewed app in Shopify’s own Upsell and bundles category, more than twice ReConvert’s 3,127.',
    verified: '2026-11-03',
  },
  shopifyBundlesListing: {
    id: 'shopifyBundlesListing',
    url: 'https://apps.shopify.com/shopify-bundles',
    label: 'Shopify Bundles on the Shopify App Store',
    publisher: 'Shopify',
    claim:
      'Shopify Bundles, developer Shopify, rated 2.9 from 571 reviews, launched 11 July 2023, free. Shopify’s own first-party bundling app and the lowest-rated app encountered in its own Upsell and bundles category, where third-party apps in the same category sit at 4.5 to 5.0.',
    verified: '2026-11-03',
  },
  shopifyUpsellCategory: {
    id: 'shopifyUpsellCategory',
    url: 'https://apps.shopify.com/categories/marketing-and-conversion-upsell-and-bundles',
    label: 'Shopify’s own Upsell and bundles app category',
    publisher: 'Shopify',
    claim:
      'Shopify’s recommended list for this category opens with two cash-on-delivery upsell apps, Releasit COD Form & Upsells 4.9 (2,419) and EasySell COD Form & Upsells 4.9 (987), ahead of the general upsell apps. The page also carries a "Built into Shopify" panel on native product recommendations, a "Made by Shopify" panel for Shopify Subscriptions, and a named merchant example, Flakon, using Shopify Bundles to pair wine with an aerator at checkout. Other rated apps shown include Kaching Bundles 5.0 (6,592), BOGOS 5.0 (4,589), Vitals 4.9 (2,975), AOV.ai 5.0 (1,688), Kaching CartDrawer 5.0 (1,590), Hextom Upsell Sales Boost 4.8 (1,505), Essent Cart Drawer 5.0 (1,169), Simple Bundles 4.9 (821) and GoKwik Cart Drawer & Upsell 4.6 (82).',
    verified: '2026-11-03',
  },
  rebuyDelisted: {
    id: 'rebuyDelisted',
    url: 'https://apps.shopify.com/rebuy',
    label: 'Rebuy Personalization Engine’s Shopify App Store page',
    publisher: 'Shopify',
    claim:
      'The listing page for Rebuy Personalization Engine states "This app is not currently available on the Shopify App Store. If you have support questions, contact Rebuy directly." No rating, review count, pricing or install button is shown. Rebuy was still being ranked, in one case first, by third-party "best Shopify upsell apps" roundups on this date.',
    verified: '2026-11-03',
  },
  /*
   * Vendor home pages. The roundup links each app to the maker's own site
   * rather than to its App Store listing, because a merchant comparing apps
   * wants the product's own pricing and documentation. The App Store listings
   * stay cited in the footnote, since that is where the ratings, review counts
   * and prices in the copy were actually read.
   */
  candyRackSite: {
    id: 'candyRackSite',
    url: 'https://www.digismoothie.com/apps/candy-rack',
    label: 'Candy Rack’s own product page',
    publisher: 'Digismoothie',
    claim:
      'Titled "Candy Rack: The All-in-One Upsell & Cross-sell App for Shopify". Digismoothie’s own page for the app, carrying its feature and pricing detail. Digismoothie is a Prague-based Shopify agency and app maker whose other products include Gift Box, Nada, Payster, PartnerJam and Setpilot.',
    verified: '2026-11-03',
  },
  logbaseSite: {
    id: 'logbaseSite',
    url: 'https://www.logbase.io/',
    label: 'Logbase, the maker of Selleasy',
    publisher: 'Logbase',
    claim:
      'Titled "Shopify Apps to Grow & Scale Your Business - Logbase". The India-based maker of Upsell & Cross Sell by Selleasy.',
    verified: '2026-11-03',
  },
  upsellDotCom: {
    id: 'upsellDotCom',
    url: 'https://upsell.com/',
    label: 'Upsell.com, formerly ReConvert',
    publisher: 'Upsell.com',
    claim:
      'Titled "Upsell & Cross-Sell App for Shopify and Wix | Upsell.com". The vendor behind ReConvert, whose Shopify App Store developer name now reads "Upsell.com ex ReConvert", so the brand is mid-rename.',
    verified: '2026-11-03',
  },
  kachingSite: {
    id: 'kachingSite',
    url: 'https://www.kachingappz.com',
    label: 'Kaching, the maker of Kaching Bundles and CartDrawer',
    publisher: 'Kaching',
    claim:
      'Titled "Kaching: Shopify Apps for Bundles, Upsells and Subscriptions". The vendor behind Kaching Bundles & Upsells, Kaching CartDrawer Cart Upsell and Kaching Post Purchase Upsell.',
    verified: '2026-11-03',
  },
  aftersellSite: {
    id: 'aftersellSite',
    url: 'https://www.aftersell.com/',
    label: 'AfterSell’s own site',
    publisher: 'Rokt',
    claim:
      'Titled "Shopify Post Purchase Upsell App | Aftersell". AfterSell is owned by Rokt, which is the developer name shown on its Shopify App Store listing.',
    verified: '2026-11-03',
  },
  codeBlackBeltSite: {
    id: 'codeBlackBeltSite',
    url: 'https://web.codeblackbelt.com/products/frequently-bought-together',
    label: 'Code Black Belt’s page for Frequently Bought Together',
    publisher: 'Code Black Belt',
    claim:
      'The maker’s own product page for Frequently Bought Together, the Amazon-style product page recommendation app it has run since March 2017.',
    verified: '2026-11-03',
  },
  releasitSite: {
    id: 'releasitSite',
    url: 'https://www.releas.it',
    label: 'Releasit’s own site',
    publisher: 'Releasit',
    claim:
      'The maker of Releasit COD Form & Upsells, a cash on delivery order form for Shopify with upsells, OTP verification and SMS built in.',
    verified: '2026-11-03',
  },
  inCartUpsellSite: {
    id: 'inCartUpsellSite',
    url: 'https://www.incartupsell.com/',
    label: 'In Cart Upsell’s own site',
    publisher: 'In Cart Upsell',
    claim:
      'Titled "In Cart Upsell - Elevate Your Ecommerce Revenue". The maker of ICU In Cart Upsell & Cross Sell, live on the Shopify App Store since December 2015.',
    verified: '2026-11-03',
  },
  shopifyHome: {
    id: 'shopifyHome',
    url: 'https://www.shopify.com/',
    label: 'Shopify',
    publisher: 'Shopify',
    claim:
      'The platform itself, cited as the vendor of its own first-party bundling and product recommendation features.',
    verified: '2026-11-03',
  },
  digismoothieWhatsappList: {
    id: 'digismoothieWhatsappList',
    url: 'https://www.digismoothie.com/best-shopify-apps/whatsapp-marketing',
    label: 'Digismoothie’s roundup of Shopify WhatsApp marketing apps',
    publisher: 'Digismoothie',
    claim:
      'A "Top 10 best Shopify WhatsApp Marketing apps" roundup naming Kanal, Dondy, Zoko and Klaviyo among others, which links out to each app’s Shopify App Store listing with no rel="nofollow" or rel="sponsored" on those links. Digismoothie is the Prague-based maker of Candy Rack and publishes its own competing upsell roundup at /blog/best-shopify-upsell-apps.',
    verified: '2026-11-03',
  },
  rahulShopifyWhatsapp: {
    id: 'rahulShopifyWhatsapp',
    url: 'https://rahuldsarker.co/shopify-whatsapp-order-notifications',
    label: 'Rahul D Sarker’s Shopify WhatsApp order notifications guide',
    publisher: 'Rahul D Sarker',
    claim:
      'A guide headed "Shopify WhatsApp order notifications: confirm COD orders, tag them, and only count the real ones", covering which notifications belong on WhatsApp, three ways to send them from Shopify, step-by-step COD confirmation, a cost-against-RTO-saved calculation, abandoned cart messages in India, a test plan, and whether the Meta Purchase event should fire on order or on WhatsApp confirmation. Carries its own Sources section citing Shopify Flow trigger and action docs and Meta’s pricing, opt-in and CAPI documentation. Outbound links carry no rel="nofollow".',
    verified: '2026-11-03',
  },
  shopifyPostPurchase: {
    id: 'shopifyPostPurchase',
    url: 'https://shopify.dev/docs/apps/build/checkout/product-offers',
    label: 'Shopify’s post-purchase product offers documentation',
    publisher: 'Shopify',
    claim:
      'States "For render to be true, all the required conditions must be met. For example, the customer’s credit card must be vaulted before the post-purchase offer is displayed." No offer appears where "The initial purchase was made with a gift card or any payment method other than a credit card", nor where "The customer chooses to check out with an installment service or a wallet service" (examples given: Klarna, Affirm, AfterPay, Apple Pay, Amazon Pay, Google Pay). Also: "Orders need to be $0.50 or more to qualify for post-purchase offers", "Orders need to be placed through the Online Store sales channel", "A customer can accept a maximum of three post-purchase offers for each checkout", "Only one app can be selected for post-purchase product offers", and offers are not surfaced on orders with duties and multiple currencies, on orders for local delivery, or where the checkout creates an order without a shipping address. On analytics: services using the Pixel API "report only the purchase event and value for the initial purchase", and ScriptTag-based services "have incomplete conversion data, because they’re only triggered on the Order status page".',
    verified: '2026-11-03',
  },
  shopifyCodPostPurchaseThread: {
    id: 'shopifyCodPostPurchaseThread',
    url: 'https://community.shopify.dev/t/post-purchase-extension-with-cash-on-delivery-cod/14296',
    label: 'a Shopify developer forum thread on post-purchase extensions and cash on delivery',
    publisher: 'Shopify',
    claim:
      'A thread on Shopify’s own developer community raising that post-purchase extensions do not render for cash on delivery orders, citing the documented requirement for a vaulted credit card and the exclusion of payment methods other than a credit card. Used as corroboration for an inference drawn from the primary documentation, not as the primary source.',
    verified: '2026-11-03',
  },
  shopifyCheckoutLiquid: {
    id: 'shopifyCheckoutLiquid',
    url: 'https://shopify.dev/docs/storefronts/themes/architecture/layouts/checkout-liquid',
    label: 'Shopify’s checkout.liquid reference',
    publisher: 'Shopify',
    claim:
      'States "checkout.liquid is now unsupported for the Information, Shipping, and Payment checkout steps" and "checkout.liquid and additional scripts were sunset for the Thank you and Order status pages on August 28, 2025". On script tags: "Script tags were sunset on those pages on August 28, 2025 for Plus stores" and "are sunset for non-Plus stores on August 26, 2026".',
    verified: '2026-11-03',
  },
  shopifyThankYouUpgrade: {
    id: 'shopifyThankYouUpgrade',
    url: 'https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade/thank-you-order-status-upgrade',
    label: 'Shopify’s Thank you and Order status upgrade guide',
    publisher: 'Shopify',
    claim:
      'Written in the past tense as of this reading: "August 26, 2026 was the deadline for stores on a non-Plus Shopify subscription plan to upgrade" their Thank you and Order status pages. Also states "As of August 28, 2025, the additional scripts section in the Checkout settings is view-only" and that stores on the Pause and Build plan are upgraded automatically. Mentions neither upsell apps nor post-purchase offers.',
    verified: '2026-11-03',
  },
  shopifyCheckoutExtensions: {
    id: 'shopifyCheckoutExtensions',
    url: 'https://shopify.dev/docs/api/checkout-extensions',
    label: 'Shopify’s checkout extensions overview',
    publisher: 'Shopify',
    claim:
      'Settles plan availability in two statements: extensions on the information, shipping and payment steps "are available only to stores on a Shopify Plus plan", while extensions "that appear after a purchase has been completed will be available to all plans except Shopify Starter". So post-purchase and Thank you page upsells are not Plus-only; in-checkout upsells are.',
    verified: '2026-11-03',
  },
  digismoothieUpsellBenchmarks: {
    id: 'digismoothieUpsellBenchmarks',
    url: 'https://www.digismoothie.com/blog/upsell-benchmarks',
    label: 'Digismoothie’s 2026 Shopify upsell benchmarks',
    publisher: 'Digismoothie',
    claim:
      'By Tomas Janu, published 10 September 2026 and updated 3 October 2026. Dataset: offers shown between 1 January and 31 August 2026 across the 3,199 of 5,000+ stores running Candy Rack that showed at least one offer, covering 39,007 offers, 218.6 million offer views (56.5 million on the product page pop-up) and 1.91 million upsell units sold; offer-level tables include only the 8,854 offers with at least 1,000 views, and all figures are medians across stores. Median upsell incremental revenue 2.4% (total sales divided by sales without upsells), top 10% close to 9%, best 20% and more, "which is often the number you see in the marketing materials". Median take rate 2.4% (upsell sold against upsell viewed), top 10% close to 10%. Offers with no discount convert about the same as offers at 1 to 20% off. AI recommendations convert at 3.2% against 1.9% for hand-picked. Offers showing 1 product convert at 1.5% against 3.1% for 3 or more; recommended 3 to 4 products.',
    verified: '2026-11-03',
  },
  littledataAov: {
    id: 'littledataAov',
    url: 'https://www.littledata.io/average-website-performance',
    label: 'Littledata’s Shopify average order value benchmark',
    publisher: 'Littledata',
    claim:
      'Median average order value $110, "From 436 Shopify stores that use Littledata to send their data to Google Analytics 4", covering the 90 days from 27 July to 24 October 2026, figures generated 28 October 2026. Regenerated on a rolling 90-day window, so the figure moves: re-read 7 November 2026 at its new URL, the 4 November refresh shows a $111 median from 438 stores for 3 August to 31 October 2026.',
    verified: '2026-11-07',
  },
  shopifySeoOverview: {
    id: 'shopifySeoOverview',
    url: 'https://help.shopify.com/en/manual/promoting-marketing/seo/seo-overview',
    label: 'Shopify’s SEO overview',
    publisher: 'Shopify',
    claim:
      'States "Shopify handles many technical SEO optimizations automatically, such as generating sitemaps and structured data", "Themes automatically generate title tags that include your store name", "Auto-generated canonical tags are added to pages to prevent duplicate content from appearing in search results" and "Your website’s sitemap.xml and robots.txt files are automatically generated". Confirms "You can edit the title tags, meta descriptions, and URLs for the various pages on your site". Best practices given: title "Less than 60 characters, include primary keyword", meta description "Less than 160 characters, include keywords naturally", "Create descriptive, hyphen-separated URLs" and "Set up 301 redirects when moving or discontinuing products".',
    verified: '2026-11-03',
  },
  shopifySeoHub: {
    id: 'shopifySeoHub',
    url: 'https://help.shopify.com/en/manual/promoting-marketing/seo',
    label: 'Shopify’s SEO manual',
    publisher: 'Shopify',
    claim:
      'The hub page for Shopify’s merchant-facing SEO documentation, linking the SEO overview, editing robots.txt.liquid, adding keywords, optimising site structure, finding the sitemap, crawling the store and hiding a page from search engines.',
    verified: '2026-11-03',
  },
  shopifyAiOptimisation: {
    id: 'shopifyAiOptimisation',
    url: 'https://help.shopify.com/en/manual/promoting-marketing/seo/optimizing-store-for-ai',
    label: 'Shopify’s guidance on optimising a store for AI',
    publisher: 'Shopify',
    claim:
      'First-party Shopify guidance on making a store legible to AI answer engines. Live on this date and referenced by none of the competing Shopify SEO guides reviewed.',
    verified: '2026-11-03',
  },
  shopifyThemeMetadata: {
    id: 'shopifyThemeMetadata',
    url: 'https://shopify.dev/docs/storefronts/themes/seo/metadata',
    label: 'Shopify’s theme metadata reference',
    publisher: 'Shopify',
    claim:
      'States a theme "can include a <title> element for search engines to read the page title from" via the Liquid page_title object, a meta element for page_description, and that "You can specify a canonical URL for a given page using the global Liquid" canonical_url object. Publishes the Liquid snippet for all three. Does not discuss duplicate content or variant URLs, so canonical behaviour on parameterised URLs is undocumented.',
    verified: '2026-11-03',
  },
  shopifyRobotsLiquid: {
    id: 'shopifyRobotsLiquid',
    url: 'https://shopify.dev/docs/storefronts/themes/seo/robots-txt',
    label: 'Shopify’s robots.txt.liquid reference',
    publisher: 'Shopify',
    claim:
      'States "Shopify generates a default robots.txt file that works for most stores" and "Adding the robots.txt.liquid template replaces Shopify’s generated robots.txt output". The template "supports only the following Liquid objects": robots, group, rule, user_agent, sitemap and request. Warns that "rendered template output doesn’t always match Shopify’s generated file exactly", advises saving a copy of the current /robots.txt output first, and says host-specific rules should only be used with Shopify Markets. Verified separately by reading the generated robots.txt of allbirds.com, rothys.com and gymshark.com on 3 November 2026: all three carry Disallow rules for /collections/*sort_by*, /collections/*+* and /collections/*filter*&*filter*, and none blocks a single filter parameter, so a URL of the form /collections/x?filter.p.tag=y is crawlable by default.',
    verified: '2026-11-03',
  },
  shopifyHreflang: {
    id: 'shopifyHreflang',
    url: 'https://shopify.dev/docs/storefronts/themes/seo/hreflang',
    label: 'Shopify’s hreflang documentation',
    publisher: 'Shopify',
    claim:
      'Shopify adds hreflang tags automatically "If your store uses Shopify Markets", "through the content_for_header object, which your theme renders in the <head>". Tags "Stay in sync with each page’s canonical URL" and each localized URL must "reference itself as its own canonical URL". Warns that "Adding your own tags on top of the automatic ones can produce duplicate or conflicting annotations", and documents that Markets cannot coordinate hreflang across separate Shopify stores on different domains. Does not give subfolder against separate-domain guidance.',
    verified: '2026-11-03',
  },
  shopifyThemePerformance: {
    id: 'shopifyThemePerformance',
    url: 'https://shopify.dev/docs/storefronts/themes/best-practices/performance',
    label: 'Shopify’s theme performance best practices',
    publisher: 'Shopify',
    claim:
      'States "LCP, CLS, and INP are the Core Web Vitals (CWV), which Google uses as a ranking signal" and "Core Web Vitals scores are measured on mobile by default, so mobile performance is theme performance". Carries the only hard numeric threshold Shopify publishes: "To be accepted into the Shopify Theme Store, a theme must have a minimum average Lighthouse performance score of 60", averaged across home, product and collection pages. Advises identifying and deferring app scripts that block HTML parsing, warns that "Badly written first-party code is just as damaging as a poorly implemented third-party script", that overusing preload "competes with the browser’s own prioritization and can make pages slower", and recommends keeping pagination under 25,000 objects and tap targets at least 48 by 48 px. Publishes no pass or fail threshold for individual Core Web Vitals.',
    verified: '2026-11-03',
  },
  googleFacetedNav: {
    id: 'googleFacetedNav',
    url: 'https://developers.google.com/crawling/docs/faceted-navigation',
    label: 'Google Search Central on faceted navigation',
    publisher: 'Google',
    claim:
      'States "If you don’t need the faceted navigation URLs potentially indexed, prevent crawling of these URLs" and "Oftentimes there’s no good reason to allow crawling of filtered items". On canonical tags for facets: they "may, over time, decrease the crawl volume of non-canonical versions of those URLs" but "these methods are generally less effective in the long term than the previously mentioned methods". Advises returning "an HTTP 404 status code when a filter combination doesn’t return results" rather than redirecting to a common error page, warns that comma, semicolon and bracket characters "are hard for crawlers to detect as parameter separators", and notes URL-fragment filtering "will have no impact on crawling (positive or negative)". The companion December 2024 Crawling December post calls faceted navigation "by far the most common source of overcrawl issues site owners report" and says most such cases "could have been avoided by following best practices".',
    verified: '2026-11-03',
  },
  googleUrlStructure: {
    id: 'googleUrlStructure',
    url: 'https://developers.google.com/search/docs/crawling-indexing/url-structure',
    label: 'Google Search Central on URL structure',
    publisher: 'Google',
    claim:
      'Advises "Whenever possible, shorten URLs by trimming unnecessary parameters (meaning, parameters that don’t change the content)", warns that "Overly complex URLs, especially those containing multiple parameters, can cause problems for crawlers", and names "Shopping sorting parameters" among the irrelevant parameters that cause a large number of URLs. Shopify’s ?sort_by= is an instance of Google’s own example.',
    verified: '2026-11-03',
  },
  ethercycleSite: {
    id: 'ethercycleSite',
    url: 'https://ethercycle.com/',
    label: 'Ethercycle',
    publisher: 'Ethercycle',
    claim:
      'Page title reads "Ethercycle | Shopify Experts & Hosts of the Unofficial Shopify Podcast". A comment in the live HTML states Ethercycle "is an ecommerce consultancy, Shopify-exclusive since 2014", and a source banner names Kurt Elster as sysop with Paul Reda as co-sysop. Claims circulating in third-party interview bios about a 2011 partner date and specific client names do not appear on the site itself and are treated as unverified.',
    verified: '2026-11-03',
  },
  unofficialShopifyPodcast: {
    id: 'unofficialShopifyPodcast',
    url: 'https://unofficialshopifypodcast.com/',
    label: 'the Unofficial Shopify Podcast',
    publisher: 'Ethercycle',
    claim:
      'The podcast hosted by Kurt Elster with Paul Reda, independently listed on Apple Podcasts under id 918602360. Download figures circulating in directory listings vary by source and date, so no figure is cited.',
    verified: '2026-11-03',
  },
  applePodcastsUnofficialShopify: {
    id: 'applePodcastsUnofficialShopify',
    url: 'https://podcasts.apple.com/us/podcast/the-unofficial-shopify-podcast/id918602360',
    label: 'the Unofficial Shopify Podcast on Apple Podcasts',
    publisher: 'Apple',
    claim:
      'Independent third-party listing confirming the existence and hosts of the Unofficial Shopify Podcast. Ratings and review counts on directory pages drift, so none is cited.',
    verified: '2026-11-03',
  },
  kaiDavisSite: {
    id: 'kaiDavisSite',
    url: 'https://www.kaidavis.com/',
    label: 'Kai Davis',
    publisher: 'Kai Davis',
    claim:
      'An independent consultant positioned on Shopify SEO specifically rather than ecommerce SEO generally, also operating doubleyourecommerce.com. Experience figures on third-party directory profiles are self-reported and not independently checkable, so none is cited.',
    verified: '2026-11-03',
  },
  kaiDavisCollections: {
    id: 'kaiDavisCollections',
    url: 'https://mallorywhitfield.com/blog/shopify-seo-collections',
    label: 'Kai Davis on Shopify collection pages',
    publisher: 'Badass Creatives',
    claim:
      'Guest content carrying Kai Davis’s named thesis on collection pages, quoted as "almost every single store I work with isn’t creating enough collection pages". Hosted on a third-party site rather than his own.',
    verified: '2026-11-03',
  },
  kaiDavisCourse: {
    id: 'kaiDavisCourse',
    url: 'https://kaidavis.gumroad.com/l/shopify-seo-simplified',
    label: 'Shopify SEO Simplified',
    publisher: 'Kai Davis',
    claim:
      'Kai Davis’s paid Shopify SEO course, publicly listed at $40 on Gumroad.',
    verified: '2026-11-03',
  },
  kaspianFuadHiring: {
    id: 'kaspianFuadHiring',
    url: 'https://kaspianfuad.com/blog/hire-shopify-seo-consultant/',
    label: 'Kaspian Fuad’s guide to hiring a Shopify SEO consultant',
    publisher: 'Kaspian Fuad',
    claim:
      'Published 9 October 2026 and updated 30 October 2026. Covers collection-scoped product URLs, ?sort_by= and ?filter.p.product_type= parameters, robots.txt.liquid, JSON-LD in Liquid and dead URLs left by removed apps, and cites an external dataset alongside Google Search Central and Shopify’s own documentation, which no other page in this SERP does. The site carries a Shopify Select Partner badge linking to Shopify’s own partner directory. Experience figures, store counts and platform review scores on the page are self-reported and not cited here.',
    verified: '2026-11-03',
  },
  kaspianFuadSite: {
    id: 'kaspianFuadSite',
    url: 'https://kaspianfuad.com/',
    label: 'Kaspian Fuad',
    publisher: 'Kaspian Fuad',
    claim:
      'An independent Shopify CRO consultant and Liquid developer, carrying a Shopify Select Partner badge that links through to Shopify’s partner directory.',
    verified: '2026-11-03',
  },
  learningSeo: {
    id: 'learningSeo',
    url: 'https://learningseo.io/',
    label: 'LearningSEO.io',
    publisher: 'Aleyda Solis',
    claim:
      'A free structured SEO learning roadmap published by Aleyda Solis, accessible without an email gate.',
    verified: '2026-11-03',
  },
  aleydaSolisSite: {
    id: 'aleydaSolisSite',
    url: 'https://www.aleydasolis.com/en/',
    label: 'Aleyda Solis',
    publisher: 'Aleyda Solis',
    claim:
      'Self-describes as "an experienced SEO and AI Search Optimization consultant specialized in International, Ecommerce, Marketplaces and SaaS SEO" and founder of Orainti. Publishes the Crawling Mondays series, including an episode on criteria for indexing faceted pages on ecommerce sites, and the SEOFOMO newsletter. Not a Shopify specialist, and the site blocks automated crawlers while remaining reachable in a browser.',
    verified: '2026-11-03',
  },
  honestEcommerce: {
    id: 'honestEcommerce',
    url: 'https://honestecommerce.com/blogs/episodes',
    label: 'the Honest Ecommerce podcast',
    publisher: 'Electric Eye',
    claim:
      'A merchant-facing interview podcast hosted by Electric Eye co-founder Chase Clymer. Audible’s independent listing credits the show to Electric Eye with a copyright line of 2019. Current release cadence is unverified.',
    verified: '2026-11-03',
  },
  electricEye: {
    id: 'electricEye',
    url: 'https://electriceye.io/',
    label: 'Electric Eye',
    publisher: 'Electric Eye',
    claim:
      'A Shopify agency co-founded by Chase Clymer, which produces the Honest Ecommerce podcast. A full-service agency rather than an SEO specialist.',
    verified: '2026-11-03',
  },
  techSeoBoost: {
    id: 'techSeoBoost',
    url: 'https://techseoboost.com/',
    label: 'TechSEO Boost',
    publisher: 'TechSEO Boost',
    claim:
      'The technical SEO conference founded by Paul Shapiro, described as the industry’s first conference dedicated to technical SEO. Shapiro’s former role as Head of Technical SEO at Shopify is the safe claim; no source dated 2026 confirming his current employer was found, so his current role is treated as unverified.',
    verified: '2026-11-03',
  },
  screamingFrog: {
    id: 'screamingFrog',
    url: 'https://www.screamingfrog.co.uk/seo-spider/',
    label: 'Screaming Frog’s SEO Spider',
    publisher: 'Screaming Frog',
    claim:
      'A desktop crawler with a free tier, used to enumerate a store’s own parameterised and collection-nested URLs and read the canonical each one emits. The current free-tier URL limit was not verified, so no figure is cited.',
    verified: '2026-11-03',
  },
  shopifyCommunity: {
    id: 'shopifyCommunity',
    url: 'https://community.shopify.com/c/shopify-discussions/bd-p/shopify-discussion',
    label: 'the Shopify Community discussions forum',
    publisher: 'Shopify',
    claim:
      'Shopify’s own merchant discussion forum. On 3 November 2026 a thread here ranked second organically in the United States for "shopify seo experts", above every agency listicle in that result set.',
    verified: '2026-11-03',
  },
  redditShopifySeo: {
    id: 'redditShopifySeo',
    url: 'https://www.reddit.com/r/ShopifySEO/',
    label: 'r/ShopifySEO',
    publisher: 'Reddit',
    claim:
      'A merchant discussion community for Shopify SEO. On 3 November 2026 it ranked fourth organically in the United States for "shopify seo experts", and Reddit threads also ranked on page one for "shopify seo agency", "shopify seo expert for hire" and "shopify seo consultant", in the last case a thread questioning whether to trust SEO specialists who send cold messages. Subscriber counts could not be read and are not cited.',
    verified: '2026-11-03',
  },
  wordcampRahul: {
    id: 'wordcampRahul',
    url: 'https://asia.wordcamp.org/2023/speaker/rahul-d-sarker/',
    label: 'Rahul D Sarker’s WordCamp Asia 2023 speaker page',
    publisher: 'WordCamp Asia',
    claim:
      'A third-party speaker biography crediting Rahul D Sarker with "over 8 years of experience in SEO, Brand communication, Conversion optimization, Sales & Acquisition Funnel". Independent of his own site and the only non-self-reported corroboration of his background found.',
    verified: '2026-11-03',
  },
  wordpressPlugins: {
    id: 'wordpressPlugins',
    url: 'https://wordpress.org/plugins/',
    label: 'the WordPress.org plugin directory',
    publisher: 'WordPress',
    claim:
      'The directory where Rahul D Sarker’s published plugin, Simple Customer CRM, is listed. Cited as a checkable artifact of his WordPress community work alongside his WordCamp organising and Bengali translation editing roles.',
    verified: '2026-11-03',
  },
  rahulAboutPage: {
    id: 'rahulAboutPage',
    url: 'https://rahuldsarker.co/about',
    label: 'Rahul D Sarker’s about page',
    publisher: 'Rahul D Sarker',
    claim:
      'Describes himself as "A growth operator, not a marketer" building "revenue operating systems for growth-stage companies", and says "I speak in CAC, LTV, pipeline, and margin. Not likes, reach, or impressions." Based in Kolkata, working globally, contactable at hey@rahuldsarker.co. Targets companies between $1M and $15M ARR spending $4K to $25K a month on marketing. Work is organised in three layers: fractional CMO leadership, performance marketing across Meta, Google, LinkedIn and YouTube including Conversions API implementation, and RevOps covering HubSpot, Zoho and Salesforce, a GTM to GA4 to CRM attribution chain, Looker dashboards and WhatsApp automation. Engagements open with a two-week diagnostic to find the single revenue constraint.',
    verified: '2026-11-03',
  },
} as const satisfies Record<string, Source>;

export type SourceId = keyof typeof SOURCES;

/** Hosts a blog post may link to outside our own domain. */
export const ALLOWED_EXTERNAL_HOSTS = [
  ...new Set(Object.values(SOURCES).map((s) => new URL(s.url).hostname.replace(/^www\./, ''))),
  // Our own properties, and the competitor pricing pages the comparison posts
  // quote from. A comparison that names a rival's price has to link to where
  // that price is published, or the reader cannot check it either.
  'dash.topedgeai.com',
  'apps.shopify.com',
  'zoko.io',
  'dondy.net',
  'getgabs.com',
  'getkanal.com',
];
