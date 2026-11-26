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
  /** Closing CTA title when the default “Leave X’s markup behind” would not be true for this competitor. */
  closeTitle?: string;
  /** Phrase inside closeTitle that gets the lilac highlight. */
  closeHighlight?: string;
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

  bitespeed: {
    updated: '2026-11-25',
    // Bitespeed publishes no message rate, so the default closing line about its markup would be unverified.
    closeTitle: 'See your bill before a sales call',
    closeHighlight: 'before a sales call',
    heroSub:
      'Plans you can price before a sales call: ₹1,999 a month incl. GST, COD confirmation on every plan and Meta’s rates at 0% markup.',
    verdict:
      'For an Indian Shopify store that wants to see the bill before a demo, TopEdge AI is the simpler buy: ₹1,999 a month including GST, or $19 on the Shopify App Store, with COD confirmation on every plan. Bitespeed publishes no prices: its pricing address redirects to a demo request, and its App Store listing says free to install with additional charges it does not list. Bitespeed is the stronger pick if you want AI voice calls and SMS from the same vendor. Read 25 November 2026.',
    switchReasons: [
      {
        title: 'A price you can read before the call',
        body: 'On 25 November 2026 bitespeed.co/pricing redirected to bitespeed.co/request-demo. TopEdge AI’s three plans are on our pricing page: ₹1,999, ₹3,999 and ₹6,499 a month including GST, sized at 100, 800 and 1,500 orders.',
      },
      {
        title: 'Meta’s rate, with nothing added',
        body: 'Meta charges ₹0.8631 per India marketing message and ₹0.1150 per utility message. TopEdge AI passes both through at 0% markup. Bitespeed publishes no per-message rate, so there is nothing to compare until a quote arrives.',
      },
      {
        title: 'A trial on your own orders, no demo first',
        body: 'TopEdge AI’s trial is 14 days with 20 orders and 200 sends, started from the App Store or our site. Bitespeed’s listing shows no trial length.',
      },
    ],
    fallsShort: [
      {
        title: 'The plan price is not public',
        body: 'Bitespeed’s Shopify listing reads “Free to install. Additional charges may apply.” and shows no plan price. Two lines on the same listing disagree on currency: “billed in USD/INR” and “billed in USD”.',
      },
      {
        title: 'No message rate to check',
        body: 'Without a published rate card you cannot set Bitespeed’s per-message cost against Meta’s ₹0.8631 before you sign. On TopEdge AI the message line is Meta’s own bill to your WhatsApp Business Account.',
      },
      {
        title: 'Plans are not sized by orders',
        body: 'Nothing on bitespeed.co or its listing ties a price to order volume. TopEdge AI plans step at 100, 800 and 1,500 Shopify orders a month, so the bill tracks the store you run.',
      },
    ],
    betterPick: [
      'You want AI voice calls for cart recovery and COD confirmation: Bitespeed’s listing names an AI voice agent, and TopEdge AI does not make calls.',
      'You want WhatsApp, SMS, email, Instagram and Messenger from one vendor’s inbox, with SMS campaigns as well.',
      'Review history matters to you: Bitespeed is rated 4.6 from 408 reviews on the Shopify App Store (25 November 2026), and TopEdge AI has none yet.',
    ],
    priceRows: [
      { label: 'Entry price, monthly billing', topedge: '₹1,999/mo incl. GST, or $19 on the App Store', competitor: 'Not published (pricing page redirects to a demo request)' },
      { label: 'Billed yearly', topedge: '₹1,599/mo billed yearly', competitor: 'Not published' },
      { label: 'Shopify App Store', topedge: '$19, $39 or $65 a month, billed by Shopify', competitor: 'Free to install, additional charges not listed' },
      { label: 'India marketing message', topedge: '₹0.8631, Meta’s rate', competitor: 'Not published' },
      { label: 'Free trial', topedge: '14 days, 20 orders, 200 sends', competitor: 'Not shown on the listing' },
      { label: 'Shopify App Store rating', topedge: 'No reviews yet', competitor: '4.6 from 408 reviews' },
    ],
    priceNote:
      'Sources: bitespeed.co/pricing (a 301 redirect to bitespeed.co/request-demo), Bitespeed’s Shopify App Store listing “B: WhatsApp, Voice, SMS & Chat” and bitespeed.co. TopEdge AI prices include 18% GST on our site.',
    switchSteps: [
      { title: 'Get the Bitespeed quote in writing', body: 'Ask for the plan, the per-message charge on top of Meta and the notice period. Then you are comparing two real numbers, not a demo against a price page.' },
      { title: 'Start the TopEdge AI trial', body: 'Install from the Shopify App Store or start on topedgeai.com. No sales call is needed, and orders sync from Shopify on install.' },
      { title: 'Connect your WhatsApp Business Account', body: 'Approved templates sit in your own WhatsApp Business Account. Connect it in a quiet hour so no COD confirmation is missed during the move.' },
      { title: 'Rebuild one journey at a time', body: 'COD confirmation first, then cart recovery, then order updates. Leave broadcasts for last, and cancel Bitespeed only after each journey has fired on a real order.' },
    ],
    faqs: [
      {
        question: 'How much does Bitespeed cost?',
        answer:
          'Bitespeed does not publish a price. On 25 November 2026 bitespeed.co/pricing redirected to a demo request, and its Shopify App Store listing said free to install with additional charges it does not list. TopEdge AI starts at ₹1,999 a month including GST, or $19 on the App Store.',
      },
      {
        question: 'Is Bitespeed free?',
        answer:
          'Free to install, but not priced beyond that. Bitespeed’s listing says additional charges may apply and does not show them, and WhatsApp messages still cost Meta’s rate whoever sends them: ₹0.8631 per India marketing message.',
      },
      {
        question: 'What do Shopify merchants rate Bitespeed?',
        answer:
          'Bitespeed was rated 4.6 from 408 reviews on the Shopify App Store on 25 November 2026: 374 five-star and 23 one-star. TopEdge AI had no App Store reviews yet that day, so judge both on a trial with your own orders.',
      },
      {
        question: 'Does Bitespeed do COD confirmation?',
        answer:
          'Yes. Bitespeed’s listing names COD verification and converting COD to prepaid, and its site lists COD confirmation under AI voice calls. TopEdge AI confirms COD orders on WhatsApp on every plan and runs COD to prepaid from Growth at ₹3,999 a month including GST.',
      },
      {
        question: 'Which is better for a Shopify store, Bitespeed or TopEdge AI?',
        answer:
          'TopEdge AI if you want published INR plans, 0% markup on Meta’s rates and COD journeys from ₹1,999 a month; Bitespeed if you want AI voice calls and SMS beside WhatsApp and are happy to price it with sales. Our Bitespeed alternatives guide compares more options.',
      },
    ],
  },

  zoko: {
    updated: '2026-11-25',
    heroSub:
      'A flat INR plan sized by Shopify orders against USD plans that meter conversations, with COD confirmation on every plan.',
    verdict:
      'For an Indian Shopify store that checks out on its own storefront, TopEdge AI is the simpler bill: ₹1,999 a month including GST, priced by orders, with no conversation fee. Zoko charges $49.99 to $139.99 a month in US dollars and adds $0.015 per conversation on Starter. Zoko is the better pick when a WhatsApp catalog and ordering inside the chat are how you sell. Read 25 November 2026.',
    switchReasons: [
      {
        title: 'Rupees, not dollars',
        body: 'Zoko’s pricing page says its charges are always in USD; Starter is $49.99 a month, shown as about ₹4,645 on its Shopify listing. TopEdge AI is ₹1,999 a month including GST, billed in INR, or $19 through Shopify.',
      },
      {
        title: 'No conversation meter',
        body: 'Zoko Starter adds $0.015 per conversation with no cap, so 10,000 conversations a month add $150 to the plan. TopEdge AI charges by Shopify orders, and Meta bills each message at its own rate.',
      },
      {
        title: 'No share of your order value',
        body: 'Zoko’s order-taking AI agent is $24.99 a month plus 3% of order value after the first 100 orders: on ₹5 lakh of orders through it, that is ₹15,000. TopEdge AI plans are flat.',
      },
    ],
    fallsShort: [
      {
        title: 'Starter meters every conversation',
        body: 'Each marketing, utility or authentication message opens a new 24-hour conversation in Zoko’s definition, and Starter charges $0.015 for each one with no monthly cap.',
      },
      {
        title: 'A 7-day trial',
        body: 'Zoko’s trial is 7 days on every plan, and its Shopify listing shows no free plan. TopEdge AI’s trial is 14 days with 20 orders and 200 sends, long enough to see COD confirmations come back.',
      },
      {
        title: 'Premium flows cost per flow',
        body: 'Beyond Zoko’s 11 free essential flows, premium flows are $5.99 a month each, and flow steps past 500,000 a month cost $0.0002. TopEdge AI journeys come with the plan; Journey Branch starts on Growth.',
      },
    ],
    betterPick: [
      'You sell from a WhatsApp catalog synced from Shopify, and want an AI agent to take the order and the payment inside the chat.',
      'You want Instagram DMs in the same inbox, which Zoko adds for $9.99 a month.',
      'Review history matters to you: Zoko is rated 4.9 from 481 reviews on the Shopify App Store (25 November 2026), and TopEdge AI has none yet.',
    ],
    priceRows: [
      { label: 'Entry price', topedge: '₹1,999/mo incl. GST, or $19 on the App Store', competitor: 'Starter $49.99/mo (about ₹4,645 on its listing)' },
      { label: 'Middle plan', topedge: 'Growth ₹3,999/mo incl. GST', competitor: 'Plus $79.99/mo (about ₹7,432)' },
      { label: 'Conversation fee', topedge: 'None from us', competitor: 'Starter $0.015 each; Plus 5,000 included, then $0.00199' },
      { label: 'India marketing message', topedge: '₹0.8631, Meta’s rate', competitor: 'Meta’s rate, paid to Meta' },
      { label: 'AI agents', topedge: 'Bring your own AI key, every plan', competitor: '$24.99/mo plus $0.09 a resolution, or plus 3% of order value' },
      { label: 'Free trial', topedge: '14 days, 20 orders, 200 sends', competitor: '7 days' },
    ],
    priceNote:
      'Sources: zoko.io/pricing (monthly view; the page publishes no yearly prices) and Zoko’s Shopify App Store listing, whose rupee figures are Shopify’s own estimates. TopEdge AI prices include 18% GST on our site.',
    switchSteps: [
      { title: 'Read last month’s conversation count', body: 'Zoko bills usage after the month ends. That count, times $0.015 on Starter, is the line you stop paying.' },
      { title: 'List the Zoko flows you actually use', body: 'Abandoned checkout, COD double-confirm, COD to prepaid and order notifications map to TopEdge AI journeys. Note any premium flow you pay $5.99 for.' },
      { title: 'Connect your WhatsApp Business Account', body: 'Templates you had approved belong to your WhatsApp Business Account, not to Zoko. Connect that account to TopEdge AI during a low-order hour.' },
      { title: 'Cancel before the next billing period', body: 'Zoko charges its subscription on the first day of each period, so cancel once your journeys have fired on real orders and before the next period starts.' },
    ],
    closeTitle: 'Leave the conversation meter behind',
    closeHighlight: 'conversation meter behind',
    faqs: [
      {
        question: 'How much does Zoko cost?',
        answer:
          'Zoko’s plans were $49.99, $79.99 and $139.99 a month in US dollars on 25 November 2026, shown on its Shopify listing as about ₹4,645, ₹7,432 and ₹13,007. Starter also adds $0.015 per conversation. TopEdge AI is ₹1,999 a month including GST.',
      },
      {
        question: 'Does Zoko charge per conversation?',
        answer:
          'Yes, on Starter: $0.015 per conversation with no monthly cap. Plus includes 5,000 conversations then $0.00199 each, and Elite 100,000 then $0.00099. TopEdge AI charges no conversation fee; Meta bills each message at its own rate.',
      },
      {
        question: 'Does Zoko have a free trial?',
        answer:
          'Yes, 7 days on every plan, and its Shopify listing shows no free plan. TopEdge AI’s trial runs 14 days with 20 orders and 200 sends.',
      },
      {
        question: 'Does Zoko work with Shopify?',
        answer:
          'Yes. Zoko WhatsApp Marketing & Chat on the Shopify App Store, rated 4.9 from 481 reviews on 25 November 2026, names cart recovery, COD verification, order updates and a WhatsApp catalog synced from Shopify.',
      },
      {
        question: 'Is Zoko or TopEdge AI better for COD orders?',
        answer:
          'Both confirm COD orders and offer COD to prepaid. TopEdge AI bills ₹1,999 a month including GST with COD confirmation on every plan and COD to prepaid from Growth; Zoko includes both as free flows but bills in USD from $49.99 with a $0.015 conversation fee on Starter. Our Zoko alternatives guide compares more tools.',
      },
    ],
  },

  dondy: {
    updated: '2026-11-25',
    heroSub:
      'Meta’s own India rates at 0% markup against a single per-message rate 1.6 times Meta’s USD card, with plans in rupees.',
    verdict:
      'For an Indian Shopify store that sends real message volume, TopEdge AI costs less to run: ₹1,999 a month including GST, with Meta’s ₹0.8631 marketing rate passed through at 0% markup. Dondy’s published India rate is $0.01888 a message, 1.6 times the $0.0118 on Meta’s USD card, and its automated cart recovery starts on the $79.99 Power Automation plan. Dondy is the better pick for a free WhatsApp chat button or a store that sells mainly outside India. Read 25 November 2026.',
    switchReasons: [
      {
        title: 'Meta’s rate, not 1.6 times it',
        body: 'At Dondy’s India rate, 10,000 marketing messages cost $188.80; at the $0.0118 on Meta’s USD card they cost $118, so $70.80 more a month. TopEdge AI passes Meta’s ₹0.8631 through with nothing added.',
      },
      {
        title: 'Automation from ₹1,999, not $79.99',
        body: 'Dondy’s automated WhatsApp cart recovery starts on Power Automation at $79.99 a month, about ₹7,432 on its listing. TopEdge AI Launch, at ₹1,999 including GST, includes cart recovery and COD confirmation journeys.',
      },
      {
        title: 'Billed in rupees',
        body: 'Dondy’s plans are priced in US dollars. TopEdge AI bills in INR on topedgeai.com, with a GST invoice, or in USD through Shopify if you prefer one Shopify bill.',
      },
    ],
    fallsShort: [
      {
        title: 'Pro’s cart recovery is manual',
        body: 'Dondy Pro at $6.99 a month lists manual abandoned cart recovery and manual order confirmation messages. Automated recovery needs the $79.99 plan.',
      },
      {
        title: 'One rate for every message type',
        body: 'Dondy’s rate table shows one India figure, $0.01888 a message, with no separate utility price. Meta’s own utility rate is ₹0.1150, so ask Dondy what a COD confirmation costs before you switch it on.',
      },
      {
        title: 'A 7-day trial',
        body: 'Dondy’s paid plans carry a 7-day trial. TopEdge AI’s runs 14 days with 20 orders and 200 sends, enough to see a COD order confirmed and delivered.',
      },
    ],
    betterPick: [
      'You only want a WhatsApp chat button: Dondy’s free plan has one, with unlimited conversations and prefilled messages.',
      'You sell in several countries and want the app in Spanish, Italian, Portuguese, French or Turkish.',
      'Review history matters to you: Dondy is rated 4.9 from 828 reviews with the Built for Shopify badge (25 November 2026), and TopEdge AI has none yet.',
    ],
    priceRows: [
      { label: 'First plan with automated cart recovery', topedge: 'Launch ₹1,999/mo incl. GST, or $19 on the App Store', competitor: 'Power Automation $79.99/mo (about ₹7,432)' },
      { label: 'Low tier', topedge: 'Launch includes COD confirmation', competitor: 'Pro $6.99/mo, manual recovery only' },
      { label: 'India message rate', topedge: '₹0.8631 marketing, ₹0.1150 utility (Meta’s rates)', competitor: '$0.01888 a message, one rate' },
      { label: '10,000 marketing messages', topedge: '$118 on Meta’s USD card, or ₹8,631 on its INR card', competitor: '$188.80' },
      { label: 'Free plan', topedge: 'None; 14-day trial', competitor: 'WhatsApp chat button' },
      { label: 'Free trial', topedge: '14 days, 20 orders, 200 sends', competitor: '7 days on paid plans' },
    ],
    priceNote:
      'Sources: dondy.net/dondy-pricing (plans and the per-market rate table) and Dondy’s Shopify App Store listing, whose rupee figures are Shopify’s estimates. Meta’s USD card rate of $0.0118 was read on 8 November 2026. TopEdge AI prices include 18% GST on our site.',
    switchSteps: [
      { title: 'Price last month’s messages both ways', body: 'Take your message count from Dondy and multiply it by $0.01888 and by Meta’s rate. The gap is what the switch saves before plan prices.' },
      { title: 'Keep Dondy’s free button while you test', body: 'Dondy’s free plan keeps the chat button live, so the widget stays up while your journeys move to TopEdge AI.' },
      { title: 'Connect your WhatsApp Business Account', body: 'Your approved templates sit in your own WhatsApp Business Account. Connect it to TopEdge AI, and Meta bills that account directly from then on.' },
      { title: 'Turn on COD confirmation and cart recovery', body: 'Both journeys are pre-built. Watch one COD order get confirmed and one abandoned checkout get a reminder before you cancel the paid Dondy plan.' },
    ],
    faqs: [
      {
        question: 'How much does Dondy cost?',
        answer:
          'Dondy listed Free, Pro $6.99, Power Automation $79.99, Elite $159.99 and Ultimate $299 a month in US dollars on dondy.net on 25 November 2026, plus a per-message rate of $0.01888 in India. Automated abandoned cart recovery starts on Power Automation.',
      },
      {
        question: 'Is Dondy free?',
        answer:
          'Partly. Dondy’s free plan is a WhatsApp chat button with unlimited conversations and prefilled messages; its website adds 10 manual abandoned cart and 10 manual order confirmation messages. Automated WhatsApp recovery starts at $79.99 a month.',
      },
      {
        question: 'Does Dondy add a markup on WhatsApp messages?',
        answer:
          'Its India rate is $0.01888 a message on dondy.net, 1.6 times the $0.0118 India marketing rate on Meta’s USD card. TopEdge AI adds 0% to Meta’s rates. Our Dondy alternatives guide works through the markup at real volumes.',
      },
      {
        question: 'What do Shopify merchants rate Dondy?',
        answer:
          'Dondy was rated 4.9 from 828 reviews on the Shopify App Store on 25 November 2026, with the Built for Shopify badge. TopEdge AI had no App Store reviews yet that day.',
      },
      {
        question: 'Which is better for an Indian Shopify store, Dondy or TopEdge AI?',
        answer:
          'TopEdge AI if you send real WhatsApp volume and need COD confirmation and COD to prepaid billed in rupees; Dondy if you mainly want a free chat button or sell across several countries in their own languages.',
      },
    ],
  },

  updatrr: {
    updated: '2026-11-26',
    heroSub:
      'Rupee plans from ₹1,999 with a 14-day trial, against Updatrr’s USD plans that keep AI replies and voice calls on the $99.99 tier.',
    verdict:
      'Both pass Meta’s message rates through with no markup, so the bill comes down to the plan. TopEdge AI costs less at each tier: ₹1,999 a month including GST or $19 on the App Store, against Updatrr’s $29.99, and $65 against $99.99 at the top. Updatrr is the better pick when you want AI voice calls to confirm COD orders, or an app with 45 five-star reviews. Read 26 November 2026.',
    switchReasons: [
      {
        title: 'Less at every tier',
        body: 'On the Shopify App Store TopEdge AI is $19, $39 and $65 a month against Updatrr’s $29.99, $49.99 and $99.99. On topedgeai.com the same plans are ₹1,999, ₹3,999 and ₹6,499 including GST, billed in INR.',
      },
      {
        title: 'Fourteen days on real COD orders',
        body: 'TopEdge AI’s trial runs 14 days with 20 orders and 200 sends. Updatrr’s is 7 days on Growth and Pro, which may end before your first confirmed COD order is delivered.',
      },
      {
        title: 'More of the store in one plan',
        body: 'TopEdge AI is all-in-one D2C software for Shopify stores: a tracking pixel, profit reporting and a warranty hub sit beside cart recovery and COD confirmation. Updatrr’s pricing page lists none of those three (read 26 November 2026).',
      },
    ],
    fallsShort: [
      {
        title: 'AI waits for the top plan',
        body: 'Updatrr lists its AI chatbot with human handover and AI voice calling only on Pro AI at $99.99 a month. TopEdge AI lets you bring your own AI key on every plan.',
      },
      {
        title: 'Billed in US dollars',
        body: 'Updatrr’s Shopify listing says all charges are billed in USD, and its website shows country prices only inside the dashboard. TopEdge AI bills in INR with a GST invoice on topedgeai.com.',
      },
      {
        title: 'Yearly price only on request',
        body: 'Updatrr’s pricing FAQ asks you to contact the team for annual plans. TopEdge AI publishes yearly prices: Launch is ₹1,599 a month billed yearly, including GST.',
      },
    ],
    betterPick: [
      'You want an AI voice call to confirm COD orders or chase abandoned carts: Updatrr Pro AI includes AI voice calling, and TopEdge AI does not make calls.',
      'Review history matters to you: Updatrr is rated 5.0 from 45 reviews on the Shopify App Store (26 November 2026), and TopEdge AI has none yet.',
    ],
    priceRows: [
      { label: 'Entry plan', topedge: 'Launch ₹1,999/mo incl. GST, or $19 on the App Store', competitor: 'Growth $29.99/mo, billed in USD' },
      { label: 'Middle plan', topedge: 'Growth ₹3,999/mo incl. GST, or $39', competitor: 'Pro $49.99/mo' },
      { label: 'Top plan', topedge: 'Scale ₹6,499/mo incl. GST, or $65', competitor: 'Pro AI $99.99/mo' },
      { label: 'AI replies', topedge: 'Bring your own AI key, every plan', competitor: 'AI chatbot with human handover on Pro AI' },
      { label: 'Meta message fees', topedge: 'Meta’s rate, 0% markup', competitor: 'Meta’s rate, no markup (Updatrr’s pricing FAQ)' },
      { label: 'Free trial', topedge: '14 days, 20 orders, 200 sends', competitor: '7 days, no card (15 days on ProAI per its Shopify listing)' },
      { label: 'Billed yearly', topedge: '₹1,599/mo billed yearly', competitor: 'On request' },
    ],
    priceNote:
      'Sources: updatrr.com/pricing (one view; annual pricing on request) and Updatrr’s Shopify App Store listing, which bills in USD. TopEdge AI prices include 18% GST on our site.',
    switchSteps: [
      { title: 'List the Updatrr automations you run', body: 'Cart reminders, COD confirmation reminders, order and shipment updates and review reminders map to TopEdge AI journeys. Note anything that relies on AI voice calls, which has no TopEdge AI equivalent.' },
      { title: 'Keep your WhatsApp Business Account', body: 'Templates approved on your number belong to your WhatsApp Business Account, not to Updatrr. Connect the same account to TopEdge AI.' },
      { title: 'Pause each Updatrr flow as its twin goes live', body: 'Publish COD confirmation in TopEdge AI and pause Updatrr’s COD reminder the same hour, so no buyer gets two messages for one order.' },
      { title: 'Cancel from your Shopify admin', body: 'Updatrr is billed by Shopify every 30 days and plans change from the Shopify admin. Cancel once your journeys have fired on real orders.' },
    ],
    faqs: [
      {
        question: 'How much does Updatrr cost?',
        answer:
          'Updatrr’s plans were Growth $29.99, Pro $49.99 and Pro AI $99.99 a month on 26 November 2026, billed in USD through Shopify, with annual pricing on request. TopEdge AI is ₹1,999 a month including GST, or $19 on the App Store. Our Updatrr alternatives guide compares more tools.',
      },
      {
        question: 'Does Updatrr add a markup on WhatsApp messages?',
        answer:
          'No. Updatrr’s pricing FAQ says it adds no markup on Meta’s fees, which Meta bills separately. TopEdge AI also adds 0%, so the message line is the same on both and the difference is the plan price.',
      },
      {
        question: 'Does Updatrr have a free trial?',
        answer:
          'Yes, 7 days with no card on its website, and its Shopify listing shows 15 days on ProAI. TopEdge AI’s trial runs 14 days with 20 orders and 200 sends.',
      },
      {
        question: 'What do Shopify merchants rate Updatrr?',
        answer:
          'Updatrr WhatsApp AI Automation was rated 5.0 from 45 reviews on the Shopify App Store on 26 November 2026. TopEdge AI had no App Store reviews yet that day.',
      },
      {
        question: 'Is Updatrr or TopEdge AI better for COD orders?',
        answer:
          'Both confirm COD orders on WhatsApp on their entry plan. TopEdge AI adds COD to prepaid from Growth at ₹3,999 and costs less at each tier; Updatrr adds AI voice calls for COD confirmation on Pro AI at $99.99.',
      },
    ],
    closeTitle: 'Same Meta rates, a smaller plan',
    closeHighlight: 'a smaller plan',
  },

  getgabs: {
    updated: '2026-11-26',
    heroSub:
      'COD confirmation on every plan and a live Shopify App Store install, against a ₹699 broadcast plan with no COD flows on its plan table.',
    verdict:
      'For a Shopify store that ships COD, TopEdge AI is the closer fit: COD confirmation on every plan from ₹1,999 a month including GST, COD to prepaid from Growth, and an install on the Shopify App Store. Getgabs is cheaper to start at ₹699 and suits broadcast-heavy teams, but its Shopify listing was unavailable and its plan table names no COD flow. Both add 0% to Meta’s rates. Read 26 November 2026.',
    switchReasons: [
      {
        title: 'COD confirmation from the first plan',
        body: 'TopEdge AI Launch, ₹1,999 a month including GST, confirms every COD order on WhatsApp before dispatch. Getgabs’s plan table lists order updates and abandoned checkout reminders from Plus, and has no COD confirmation row (read 26 November 2026).',
      },
      {
        title: 'Installs from the Shopify App Store',
        body: 'Getgabs’s Shopify listing said “This app is not currently available on the Shopify App Store” on 26 November 2026. TopEdge AI installs there at $19 a month, or connects from topedgeai.com in INR.',
      },
      {
        title: 'Priced by orders, not broadcasts',
        body: 'Getgabs meters broadcasts (30,000, 5,00,000 and 15,00,000 a month), contacts and API calls by tier. TopEdge AI plans are sized by Shopify orders: 100, 800 or 1,500 a month.',
      },
    ],
    fallsShort: [
      {
        title: 'Basic leaves Shopify out',
        body: 'On the ₹699 Basic plan the Shopify app is an add-on, and order updates and abandoned checkout reminders start on Plus at ₹1,499. TopEdge AI includes Shopify cart recovery and COD confirmation on Launch.',
      },
      {
        title: 'No COD to prepaid',
        body: 'Getgabs’s plans name no flow that moves a COD buyer to prepaid. TopEdge AI offers a prepaid link in the confirmation from Growth and replaces the COD order with a paid one.',
      },
      {
        title: 'Budget per message, not per conversation',
        body: 'Getgabs’s pricing page still says Meta charges per conversation. Meta has billed per delivered message since 1 July 2025, at ₹0.8631 marketing and ₹0.1150 utility in India, which is how TopEdge AI shows the cost.',
      },
    ],
    betterPick: [
      'You mainly send broadcasts on a tight budget: Basic is ₹699 a month with 30,000 broadcasts, under TopEdge AI’s ₹1,999 entry.',
      'A large team works the inbox: Getgabs Plus includes 10 users and Business 20.',
      'You run Instagram automation rules next to WhatsApp, from 30 rules on Basic to 500 on Business.',
    ],
    priceRows: [
      { label: 'Entry plan', topedge: 'Launch ₹1,999/mo incl. GST, or $19 on the App Store', competitor: 'Basic ₹699/mo, admin only' },
      { label: 'First plan with Shopify automation', topedge: 'Launch, ₹1,999/mo', competitor: 'Plus ₹1,499/mo' },
      { label: 'Top self-serve plan', topedge: 'Scale ₹6,499/mo incl. GST', competitor: 'Business ₹2,999/mo' },
      { label: 'Billed yearly', topedge: '₹1,599/mo billed yearly', competitor: '₹6,990, ₹14,990 or ₹29,990 a year' },
      { label: 'Meta markup', topedge: '0%', competitor: '0%' },
      { label: 'COD confirmation', topedge: 'Every plan', competitor: 'Not on its plan table' },
      { label: 'Shopify App Store', topedge: 'Live, $19, $39 or $65 a month', competitor: 'Listing not available' },
    ],
    priceNote:
      'Sources: getgabs.com/pricing on the monthly and annual views, and Getgabs’s Shopify App Store listing. TopEdge AI prices include 18% GST on our site.',
    switchSteps: [
      { title: 'Check how your store connects today', body: 'With the Shopify listing unavailable, confirm whether your Getgabs account reaches Shopify through its own integration page, and which order events it receives.' },
      { title: 'Export contacts with their opt-in', body: 'Take your broadcast lists out with the opt-in source for each number. Meta requires opt-in before you message anyone, on any tool.' },
      { title: 'Connect your WhatsApp Business Account', body: 'Your approved templates sit in your own WhatsApp Business Account. Connect it to TopEdge AI and Meta keeps billing that account directly.' },
      { title: 'Start with COD confirmation and order updates', body: 'Turn on the two journeys Getgabs did not run for you, watch a COD order get confirmed, then move your campaigns across.' },
    ],
    faqs: [
      {
        question: 'How much does Getgabs cost?',
        answer:
          'Getgabs listed Basic ₹699, Plus ₹1,499 and Business ₹2,999 a month on 26 November 2026, or ₹6,990, ₹14,990 and ₹29,990 a year, with Enterprise on request. TopEdge AI is ₹1,999 a month including GST. Our Getgabs alternatives guide compares more tools.',
      },
      {
        question: 'Does Getgabs add a markup on WhatsApp messages?',
        answer:
          'No. Every Getgabs plan is labelled 0% markup and lists Meta’s India rates of ₹0.8631 marketing and ₹0.115 utility. TopEdge AI also adds 0%, so the difference is in plans and COD features.',
      },
      {
        question: 'Is Getgabs on the Shopify App Store?',
        answer:
          'Not on 26 November 2026: its listing read “This app is not currently available on the Shopify App Store”. Its website still offers a Shopify integration. TopEdge AI installs from the App Store at $19 a month.',
      },
      {
        question: 'Does Getgabs confirm COD orders?',
        answer:
          'Its pricing page does not list COD confirmation; it lists order update notifications and abandoned checkout reminders from the Plus plan. TopEdge AI confirms COD orders on every plan and adds COD to prepaid from Growth.',
      },
      {
        question: 'Which is better for an Indian Shopify store, Getgabs or TopEdge AI?',
        answer:
          'TopEdge AI if COD is a large share of your orders and you want confirmation and COD to prepaid run from Shopify. Getgabs if you mainly need low-cost broadcasts and a large shared inbox from ₹699 a month.',
      },
    ],
    closeTitle: 'Confirm your next COD order first',
    closeHighlight: 'COD order first',
  },

  kanal: {
    updated: '2026-11-26',
    heroSub:
      'Rupee plans built for Indian COD orders, against Kanal’s euro plans built for European Shopify brands.',
    verdict:
      'For an Indian Shopify store that ships COD, TopEdge AI costs less and does more of the COD work: ₹1,999 a month including GST, or $19 on the App Store against Kanal’s $89, with COD to prepaid from Growth. Kanal suits brands selling across Europe that want EU hosting, RCS and iMessage, or a team to run their flows. Read 26 November 2026.',
    switchReasons: [
      {
        title: 'A fifth of the entry price',
        body: 'Kanal Pro is €89 a month on getkanal.com, about ₹9,300 at the ECB’s 6 November rate, or $89 through Shopify. TopEdge AI Launch is ₹1,999 including GST, or $19 on the App Store.',
      },
      {
        title: 'COD to prepaid built in',
        body: 'Kanal’s Shopify listing names COD verification, but neither its pricing page nor its listing names a COD to prepaid flow. TopEdge AI confirms COD orders on every plan and offers the prepaid switch from Growth.',
      },
      {
        title: 'Profit after RTO, not only revenue',
        body: 'Kanal’s dashboard reports revenue, orders and ROAS attributed to WhatsApp. TopEdge AI reports net profit after COD fees, RTO and ad spend, order by order, which is the number a COD store is judged on.',
      },
    ],
    fallsShort: [
      {
        title: 'AI agent from Scale',
        body: 'Kanal’s AI agent starts on Scale at €149 a month, or $149 through Shopify. TopEdge AI lets you bring your own AI key on every plan.',
      },
      {
        title: 'No message rate published',
        body: 'Kanal’s pricing page publishes no per-message rate and no markup statement. TopEdge AI passes Meta’s India rates through at 0%: ₹0.8631 marketing, ₹0.1150 utility.',
      },
      {
        title: 'Priced in euros or dollars',
        body: 'Kanal bills in EUR on its site and in USD through Shopify, where each extra market adds $50 a month. TopEdge AI bills Indian stores in INR with a GST invoice.',
      },
    ],
    betterPick: [
      'You sell across Europe and want EU hosting and GDPR, with the app in French, Spanish, Italian, German or Portuguese.',
      'You want RCS, iMessage and SMS campaigns next to WhatsApp, or Kanal’s experts to build and run your flows on Business at €350 a month.',
      'Review history matters to you: Kanal is rated 5.0 from 153 reviews on the Shopify App Store (26 November 2026), and TopEdge AI has none yet.',
    ],
    priceRows: [
      { label: 'Entry plan', topedge: 'Launch ₹1,999/mo incl. GST, or $19 on the App Store', competitor: 'Pro €89/mo, or $89 on the App Store' },
      { label: 'AI agent', topedge: 'Bring your own AI key, every plan', competitor: 'Scale €149/mo, or $149' },
      { label: 'India message rate', topedge: '₹0.8631 marketing, ₹0.1150 utility, 0% markup', competitor: 'Not published on its pricing page' },
      { label: 'Billing currency', topedge: 'INR with GST, or USD through Shopify', competitor: 'EUR on its site, USD through Shopify' },
      { label: 'Selling in more countries', topedge: 'Same plan', competitor: '+$50/mo per market on its Shopify listing' },
      { label: 'Free option', topedge: '14-day trial, 20 orders, 200 sends', competitor: 'Free demo plan on its Shopify listing' },
    ],
    priceNote:
      'Sources: getkanal.com/pricing (one view, no commitment) and Kanal’s Shopify App Store listing, billed in USD. The rupee figure uses the ECB reference rate of 6 November 2026 and is an estimate. TopEdge AI prices include 18% GST on our site.',
    switchSteps: [
      { title: 'Note which Kanal flows earn', body: 'Kanal’s dashboard shows revenue by cart recovery, campaigns and upsell. Rebuild the flows that earn first; TopEdge AI journeys cover cart recovery, order updates and COD.' },
      { title: 'Move Klaviyo-triggered flows last', body: 'If a flow starts from Klaviyo, Gorgias or Recharge on Kanal, check the trigger exists for you before you switch it off.' },
      { title: 'Connect your WhatsApp Business Account', body: 'Templates you had approved belong to your WhatsApp Business Account. Connect it to TopEdge AI and Meta bills that account at its own rate.' },
      { title: 'Cancel with no notice period', body: 'Kanal plans carry no commitment, so cancel once COD confirmation and cart recovery have fired on real orders in TopEdge AI.' },
    ],
    faqs: [
      {
        question: 'How much does Kanal cost?',
        answer:
          'Kanal listed Pro €89, Scale €149, Business €350 and Agency €1,900 a month on 26 November 2026, with no commitment; its Shopify listing bills Pro and Scale at $89 and $149. TopEdge AI is ₹1,999 a month including GST, or $19 on the App Store.',
      },
      {
        question: 'Is Kanal free?',
        answer:
          'Partly. Kanal’s Shopify listing shows a free Demo plan; automated cart recovery and campaigns start on Pro at $89 a month. TopEdge AI has no free plan but a 14-day trial with 20 orders and 200 sends.',
      },
      {
        question: 'Does Kanal work with Shopify?',
        answer:
          'Yes. Kanal: WhatsApp Marketing & AI is on the Shopify App Store, by KANAL SAS, and lists cart recovery, order confirmation on WhatsApp, COD verification and campaigns. It also works with Klaviyo, Gorgias and Recharge from Scale.',
      },
      {
        question: 'What do Shopify merchants rate Kanal?',
        answer:
          'Kanal was rated 5.0 from 153 reviews on the Shopify App Store on 26 November 2026. TopEdge AI had no App Store reviews yet that day.',
      },
      {
        question: 'Is Kanal or TopEdge AI better for an Indian COD store?',
        answer:
          'TopEdge AI: INR plans from ₹1,999, COD confirmation on every plan and COD to prepaid from Growth. Kanal fits a brand selling mainly in Europe. Our Kanal alternatives guide compares more tools.',
      },
    ],
    closeTitle: 'Run your COD store on rupee plans',
    closeHighlight: 'rupee plans',
  },
};
