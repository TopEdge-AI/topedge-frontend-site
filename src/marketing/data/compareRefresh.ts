/**
 * Refreshed two-way compare boards (owner, 24 Nov 2026).
 *
 * Structure reverse-engineered from WATI's own vs pages (wati.io/wati-vs-interakt,
 * wati.io/wati-vs-aisensy, read 24 Nov 2026): a hero with the buttons in it, "why
 * brands switch", the at-a-glance board, a mid-page CTA, "where X falls short",
 * then the close. We copy the structure, not the tone: every claim about a
 * competitor here was read off that competitor's own live page on the date in
 * `updated`, and each board also says plainly where the competitor is the better
 * pick. The capability board itself is untouched (owner: it stays as it is).
 *
 * Each board carries its own `updated` date, so editing one board no longer moves
 * the visible date on all of them (the shared-date problem from the 20 Nov
 * people-first audit). Three boards are refreshed a day; see PLAN-AND-LOG 3c.
 */
export type CompareRefresh = {
  /** ISO date the competitor facts on this board were last read. */
  updated: string;
  /** One line under the H1: the board's one-sentence answer. */
  heroSub: string;
  /** Answer-first verdict, 2 or 3 sentences with dated numbers. */
  verdict: string;
  switchReasons: { title: string; body: string }[];
  fallsShort: { title: string; body: string }[];
  betterPick: string[];
  priceRows: { label: string; topedge: string; competitor: string }[];
  priceNote: string;
  switchSteps: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

const TE_PRICE = '₹1,999, ₹3,999 or ₹6,499 a month incl. GST on topedgeai.com, or $19, $39 or $65 billed by Shopify';

export const COMPARE_REFRESH: Record<string, CompareRefresh> = {
  interakt: {
    updated: '2026-11-24',
    heroSub:
      'INR plans, COD confirmation on every plan and Meta’s rates at 0% markup, against Interakt’s USD app plans.',
    verdict:
      'For a Shopify store in India that ships COD, TopEdge AI is the closer fit: COD confirmation on every plan from ₹1,999 a month, and Meta’s ₹0.8631 marketing rate with nothing added. Interakt suits brands that want Instagram DMs and WhatsApp in one inbox, and it has 236 App Store reviews to our none. Prices read 24 November 2026.',
    switchReasons: [
      {
        title: 'Rupee billing instead of dollars',
        body: 'Interakt’s Shopify app plans are $21, $41, $51 and $99 a month, billed in USD by Shopify. TopEdge AI is ₹1,999, ₹3,999 or ₹6,499 a month including GST on topedgeai.com, so the cost does not move with the exchange rate. The App Store door ($19, $39, $65) is there if you prefer one Shopify bill.',
      },
      {
        title: 'Meta’s rate with nothing on top',
        body: 'On Interakt’s web Growth plan an India marketing message costs ₹0.958 and a utility message ₹0.150, about 11% and 30% above Meta’s ₹0.8631 and ₹0.1150. TopEdge AI adds 0%, and Meta bills your own Business Account directly.',
      },
      {
        title: 'Shopify automation without the top tier',
        body: 'Interakt’s Shopify app lists the number-collecting popup, cart reminders to those numbers, Shopify actions in its workflow builder and AI agents only on Premier at $99 a month. TopEdge AI confirms COD orders on every plan and adds COD to prepaid from Growth.',
      },
    ],
    fallsShort: [
      {
        title: 'Order messages cost 30% more',
        body: 'Order updates and COD confirmations are utility messages. Three per order at 1,500 orders a month is 4,500 messages: ₹675 at Interakt’s web Growth rate against ₹517.50 at Meta’s rate through TopEdge AI.',
      },
      {
        title: 'The cheap web plan is Instagram only',
        body: 'Interakt’s ₹999 web Starter plan includes Instagram only on monthly billing. WhatsApp starts on Growth at ₹2,799 a month plus taxes.',
      },
      {
        title: 'AI replies are a separate bill',
        body: 'On the web plans, WhatsApp AI agents are a ₹3,000 a month add-on with 100 free AI messages and ₹0.50 each after that, so 500 AI replies add ₹3,200 a month.',
      },
    ],
    betterPick: [
      'You want Instagram DMs and WhatsApp in one inbox: Interakt’s Growth plan includes both channels.',
      'You want an app other Shopify merchants have already reviewed: Interakt is rated 4.3 from 236 reviews on the Shopify App Store; TopEdge AI had no reviews yet on 24 November 2026.',
      'You already run campaigns on Interakt and your COD share is small, so confirmation and COD to prepaid matter less than broadcasts.',
    ],
    priceRows: [
      { label: 'Entry price with Shopify', topedge: '₹1,999/mo incl. GST, or $19 on the App Store', competitor: '$21/mo on the Shopify App Store' },
      { label: 'Plan with Shopify actions and AI', topedge: 'COD to prepaid from Growth, ₹3,999/mo or $39', competitor: 'Premier, $99/mo' },
      { label: 'Billed in', topedge: 'INR on our site, or USD via Shopify', competitor: 'USD via Shopify (app); INR (web plans)' },
      { label: 'India marketing message', topedge: '₹0.8631, Meta’s rate', competitor: '₹0.958 (web Growth)' },
      { label: 'India utility message', topedge: '₹0.1150, Meta’s rate', competitor: '₹0.150 (web Growth)' },
      { label: 'Free trial', topedge: '14 days, 20 orders, 200 sends', competitor: '14 days on App Store plans' },
      { label: 'Shopify App Store rating', topedge: 'No reviews yet', competitor: '4.3 from 236 reviews' },
    ],
    priceNote:
      'Sources: interakt.shop/pricing (monthly and quarterly views) and apps.shopify.com/interakt-marketing. Interakt web prices are plus taxes; TopEdge AI prices include 18% GST on our site.',
    switchSteps: [
      { title: 'Install TopEdge AI alongside Interakt', body: 'Start the 14-day trial from topedgeai.com or the Shopify App Store. Nothing is removed from Interakt yet.' },
      { title: 'Connect your WhatsApp Business Account', body: 'Approved templates belong to your WhatsApp Business Account, not to the app that submitted them. Moving a number between providers goes through Meta, so plan a quiet hour for it.' },
      { title: 'Switch on COD confirmation and cart recovery', body: 'Both journeys are pre-built. Edit the wording, then watch one real COD order and one abandoned checkout go through.' },
      { title: 'Uninstall Interakt from Shopify', body: 'Interakt’s app is billed by Shopify, so removing it from your Shopify admin stops the charge at the end of the billing cycle.' },
    ],
    faqs: [
      {
        question: 'Is TopEdge AI cheaper than Interakt for a Shopify store?',
        answer:
          'At entry level they are close: Interakt’s Shopify app starts at $21 a month, TopEdge AI at $19 on the App Store or ₹1,999 including GST on our site. The gap opens on messages and features: Interakt’s web Growth plan charges about 11% over Meta on marketing and 30% on utility messages, and its Shopify actions and AI agents sit on the $99 Premier plan.',
      },
      {
        question: 'How much does Interakt cost in India?',
        answer:
          'On 24 November 2026 Interakt’s web plans were ₹999 (Instagram only on monthly billing), ₹2,799 and ₹3,799 a month plus taxes, and its Shopify app plans were $21, $41, $51 and $99 a month in USD. Our Interakt pricing guide shows the full bill at three order volumes.',
      },
      {
        question: 'Does Interakt add a markup on WhatsApp messages?',
        answer:
          'Yes, on its web plans. Growth charges ₹0.958 per India marketing message and ₹0.150 per utility message against Meta’s ₹0.8631 and ₹0.1150; only Enterprise lists no template markup. TopEdge AI passes Meta’s rates through at 0%.',
      },
      {
        question: 'What do Shopify merchants rate Interakt?',
        answer:
          'Interakt was rated 4.3 from 236 reviews on the Shopify App Store on 24 November 2026. TopEdge AI had no App Store reviews yet that day, so judge it on a 14-day trial with your own orders.',
      },
      {
        question: 'Which is better for COD orders, Interakt or TopEdge AI?',
        answer:
          'TopEdge AI, if COD is a large share of your orders. It confirms every COD order on WhatsApp on every plan, writes the reply back to the Shopify order, and offers COD to prepaid from Growth. Interakt focuses on campaigns and a shared inbox across WhatsApp and Instagram.',
      },
    ],
  },

  wati: {
    updated: '2026-11-24',
    heroSub:
      'Built for Shopify orders, not support seats: COD confirmation on every plan and Meta’s rates at 0% markup.',
    verdict:
      'For a Shopify D2C store in India, TopEdge AI is the closer fit: ₹1,999 a month on monthly billing, COD confirmation on every plan and no markup on Meta’s rates. WATI is the better pick for a multi-agent support desk across WhatsApp, Instagram, TikTok and calling. Prices read 24 November 2026.',
    switchReasons: [
      {
        title: 'Built around Shopify orders, not seats',
        body: 'WATI’s Growth plan includes 3 users; Pro and Business include 5, then charge ₹1,299 and ₹2,199 per extra user a month. TopEdge AI plans are sized by Shopify orders: 100, 800 and 1,500 a month.',
      },
      {
        title: 'Meta’s rate, not a rate card',
        body: 'WATI’s Growth rate card charges ₹1.0357 per India marketing message, 20% over Meta’s ₹0.8631. On a 50,000-message festive week that is ₹8,630 more than Meta’s own rate. TopEdge AI adds 0%.',
      },
      {
        title: 'Shopify included, not an add-on',
        body: 'WATI’s pricing page marks its Shopify features as needing a $4.99 a month Shopify add-on. TopEdge AI is a Shopify app, so cart recovery and COD confirmation work from install.',
      },
    ],
    fallsShort: [
      {
        title: 'The team line grows the bill',
        body: 'A seven-person desk on WATI Pro costs ₹9,097 a month on monthly billing (₹6,499 plus two extra users at ₹1,299), or ₹8,397 billed quarterly, before a message is sent.',
      },
      {
        title: 'Automations are capped',
        body: 'WATI includes 1,000, 2,000 or 5,000 free automation triggers a month on Growth, Pro and Business; more are a paid add-on.',
      },
      {
        title: 'The lower prices need a quarterly or annual commitment',
        body: 'WATI Growth is ₹2,999 a month on monthly billing, ₹2,699 billed quarterly and ₹2,199 billed annually. TopEdge AI Launch is ₹1,999 a month on monthly billing.',
      },
    ],
    betterPick: [
      'Your first problem is a support desk: WATI’s inbox covers WhatsApp, calling, Facebook, Instagram, TikTok, webchat and RCS.',
      'You want AI agents included in the plan: WATI Growth includes 1 Astra AI agent and 2,000 AI credits a month, Pro 2 agents and 5,000 credits.',
      'You sell outside Shopify, or across several channels where a Shopify-first tool is not the centre of your stack.',
    ],
    priceRows: [
      { label: 'Entry price, monthly billing', topedge: '₹1,999/mo incl. GST, or $19 on the App Store', competitor: 'Growth ₹2,999/mo' },
      { label: 'Billed quarterly or yearly', topedge: '₹1,599/mo billed yearly', competitor: '₹2,699 quarterly, ₹2,199 annual' },
      { label: 'Shopify', topedge: 'Built in (it is a Shopify app)', competitor: '$4.99/mo Shopify add-on' },
      { label: 'India marketing message', topedge: '₹0.8631, Meta’s rate', competitor: '₹1.0357 (Growth rate card)' },
      { label: 'Automation limits', topedge: 'Sized by orders: 100, 800, 1,500 a month', competitor: '1,000 to 5,000 free triggers, then add-on' },
      { label: 'Free trial', topedge: '14 days, 20 orders, 200 sends', competitor: '7 days' },
    ],
    priceNote:
      'Sources: wati.io/pricing (monthly, quarterly and annual views) and WATI’s Growth INR rate card. TopEdge AI prices include 18% GST on our site.',
    switchSteps: [
      { title: 'Time it to your WATI renewal', body: 'WATI’s lower prices come with quarterly or annual billing, so start the TopEdge AI trial a couple of weeks before your WATI period ends.' },
      { title: 'Install TopEdge AI on Shopify', body: 'Install from the Shopify App Store or start on topedgeai.com. Your store data syncs without a webhook build.' },
      { title: 'Bring your WhatsApp Business Account', body: 'Approved templates belong to your WhatsApp Business Account. Moving a number between providers goes through Meta, so plan a quiet hour for it.' },
      { title: 'Turn on COD confirmation and cart recovery', body: 'Both journeys are pre-built. Run one real COD order and one abandoned checkout before you cancel WATI.' },
    ],
    faqs: [
      {
        question: 'Is TopEdge AI cheaper than WATI?',
        answer:
          'On monthly billing, yes at entry level: TopEdge AI Launch is ₹1,999 a month including GST and WATI Growth ₹2,999 (24 November 2026). WATI is cheaper billed annually at ₹2,199, but adds ₹1,299 to ₹2,199 per extra user and charges ₹1.0357 per India marketing message against Meta’s ₹0.8631.',
      },
      {
        question: 'Does WATI charge per user?',
        answer:
          'Yes. WATI Growth includes 3 users and Pro and Business include 5; each extra user costs ₹1,299 a month on Pro and ₹2,199 on Business. A seven-person desk on monthly Pro is ₹9,097 a month before messages.',
      },
      {
        question: 'Does WATI work with Shopify?',
        answer:
          'Yes, with an add-on. WATI’s pricing page lists Shopify abandoned cart and order templates, and marks them as requiring a $4.99 a month Shopify add-on. TopEdge AI is itself a Shopify app, from $19 a month on the App Store.',
      },
      {
        question: 'Does WATI have a free trial?',
        answer:
          'Yes, 7 days. TopEdge AI’s trial is 14 days with 20 orders and 200 sends, which is enough to watch a real COD confirmation and an abandoned checkout reminder fire on your own store.',
      },
      {
        question: 'Which is better for a Shopify store, WATI or TopEdge AI?',
        answer:
          'TopEdge AI if COD confirmation, cart recovery and order updates are the job; WATI if the job is a multi-agent support desk across WhatsApp, Instagram, TikTok and calling. Our WATI pricing guide shows the full WATI bill at three order volumes.',
      },
    ],
  },

  aisensy: {
    updated: '2026-11-24',
    heroSub:
      'Meta’s rates at 0% markup and COD confirmation on every plan, against AiSensy’s rates about 26% above Meta.',
    verdict:
      'For a Shopify store in India that ships COD, TopEdge AI is the closer fit: Meta’s rates with nothing added, COD confirmation on every plan and COD to prepaid from Growth at ₹3,999. AiSensy is cheaper to start at ₹1,500 a month and suits broadcast-led marketing with ads built in. Prices read 24 November 2026.',
    switchReasons: [
      {
        title: '0% markup instead of about 26%',
        body: 'AiSensy charges ₹1.09 per India marketing message and ₹0.145 per utility message, against Meta’s ₹0.8631 and ₹0.1150. On a 50,000-message festive week that is ₹11,345 above Meta’s rate. TopEdge AI adds nothing.',
      },
      {
        title: 'Flows are part of the plan',
        body: 'AiSensy sells Chatbot Flows as a ₹2,500 a month add-on, so Basic plus flows is ₹4,000 a month. TopEdge AI’s journey builder is on every plan, and Growth at ₹3,999 adds COD to prepaid.',
      },
      {
        title: 'Plans sized by Shopify orders',
        body: 'TopEdge AI plans cover 100, 800 or 1,500 orders a month, so the bill follows your store, not your contact list or agent count.',
      },
    ],
    fallsShort: [
      {
        title: 'Order messages carry the markup too',
        body: 'Three utility messages per order at 1,500 orders a month cost ₹652.50 at AiSensy’s ₹0.145, against ₹517.50 at Meta’s rate through TopEdge AI.',
      },
      {
        title: 'AI replies are bought in blocks',
        body: 'AiSensy’s AI is ₹1,350 a month for 1,000 AI messages, and each AI reply is also a WhatsApp service message at ₹0.145 after the first 1,000 free.',
      },
      {
        title: 'Service replies past the free 1,000',
        body: 'Every number gets 1,000 free service messages a month; after that AiSensy charges ₹0.145 per reply against Meta’s ₹0.1150, so support volume costs more as it grows.',
      },
    ],
    betterPick: [
      'You want the lowest entry price: AiSensy Basic is ₹1,500 a month with five agent logins.',
      'Marketing is the job: AiSensy runs Click-to-WhatsApp, lead form, website traffic and sales ads from inside the product.',
      'You want an app with reviews: AiSensy is rated 4.1 from 56 reviews on the Shopify App Store; TopEdge AI had none yet on 24 November 2026.',
    ],
    priceRows: [
      { label: 'Entry price, monthly', topedge: '₹1,999/mo incl. GST, or $19 on the App Store', competitor: 'Basic ₹1,500/mo' },
      { label: 'With automation flows', topedge: 'Included; Growth ₹3,999 adds COD to prepaid', competitor: 'Basic + Chatbot Flows = ₹4,000/mo' },
      { label: 'India marketing message', topedge: '₹0.8631, Meta’s rate', competitor: '₹1.09' },
      { label: 'India utility message', topedge: '₹0.1150, Meta’s rate', competitor: '₹0.145' },
      { label: 'Shopify', topedge: 'Shopify app, from $19/mo', competitor: 'Integration on Basic; App Store listing $1 one-time' },
      { label: 'Shopify App Store rating', topedge: 'No reviews yet', competitor: '4.1 from 56 reviews' },
    ],
    priceNote:
      'Sources: www.aisensy.com/pricing (monthly view) and apps.shopify.com/aisensy-whatsapp-marketing. TopEdge AI prices include 18% GST on our site.',
    switchSteps: [
      { title: 'Count your monthly messages first', body: 'Pull last month’s marketing and utility counts from AiSensy. That number, times 26%, is what the markup cost you.' },
      { title: 'Install TopEdge AI on Shopify', body: 'Start the 14-day trial from topedgeai.com or the Shopify App Store.' },
      { title: 'Bring your WhatsApp Business Account', body: 'Approved templates belong to your WhatsApp Business Account. Moving a number between providers goes through Meta, so plan a quiet hour for it.' },
      { title: 'Rebuild flows as journeys', body: 'Start from the pre-built COD confirmation and cart recovery journeys, then add the branches you had in AiSensy’s flows.' },
    ],
    faqs: [
      {
        question: 'How much does AiSensy cost per month?',
        answer:
          'On 24 November 2026 AiSensy’s monthly plans were Basic ₹1,500, Pro ₹3,200, Premium ₹9,100 and Unlimited ₹45,000. Chatbot Flows are ₹2,500 a month extra, AI is ₹1,350 a month per 1,000 AI messages, and extra agents ₹750 each. Our AiSensy pricing guide has the full bill.',
      },
      {
        question: 'Does AiSensy mark up WhatsApp message rates?',
        answer:
          'Yes. AiSensy charges ₹1.09 per India marketing message and ₹0.145 per utility or service message, about 26% above Meta’s ₹0.8631 and ₹0.1150. TopEdge AI passes Meta’s rates through at 0% markup.',
      },
      {
        question: 'Does AiSensy work with Shopify?',
        answer:
          'Yes. AiSensy’s Basic plan lists a Shopify and WooCommerce integration for order, shipping and abandoned cart messages, and its Shopify App Store listing names automated COD confirmation notifications. The listing itself is a $1 one-time charge; plans are billed by AiSensy.',
      },
      {
        question: 'What do Shopify merchants say about AiSensy?',
        answer:
          'AiSensy was rated 4.1 from 56 reviews on the Shopify App Store on 24 November 2026: 31 five-star and 13 one-star. TopEdge AI had no App Store reviews yet, so test both on your own orders.',
      },
      {
        question: 'Is AiSensy or TopEdge AI better for COD orders?',
        answer:
          'Both send COD confirmations. TopEdge AI writes the buyer’s reply back to the Shopify order, offers COD to prepaid from Growth, and does it at Meta’s rate; AiSensy charges ₹0.145 per utility message, so each confirmation costs about 26% more.',
      },
    ],
  },
};
