import type { TopicBlock } from '../components/topic/TopicBlocks';
import type { HomeFilmId } from '../components/landing/LandingFilm';

export type SeoTopic = {
  slug: string;
  eyebrow: string;
  h1: string;
  subtitle: string;
  title: string;
  description: string;
  keywords: string;
  answerFirst: string;
  /**
   * Legacy shape: one heading, one paragraph. Kept for the topics that still
   * use it. A page built only from these renders as prose and nothing else,
   * which is why /shopify-whatsapp-integration sat at 474 words.
   */
  sections: { h2: string; body: string }[];
  /**
   * Structured blocks. When present the page renders these instead of
   * `sections`, so a topic can carry a spec table, a step sequence, cited
   * figures and callouts rather than paragraph after paragraph.
   */
  blocks?: TopicBlock[];
  bullets: string[];
  faqs: { question: string; answer: string }[];
  related: { label: string; href: string }[];
  /*
   * Landing-page fields (added 20 Nov 2026). All optional: the original
   * integration topic sets none of them and renders exactly as before.
   */
  /** Phrase inside `h1` to highlight. When set, the H1 renders from `h1`. */
  h1Accent?: string;
  /** Small link above the H1. Defaults to Integrations. */
  kicker?: { label: string; href: string };
  /** Home feature film used as the hero visual instead of the inbox image. */
  film?: HomeFilmId;
  filmLabel?: string;
  /** Adds an "Install on Shopify" App Store button beside Start free. */
  appStoreCta?: boolean;
  /** Renders the plan strip after the article, with an optional intro line. */
  plans?: { intro?: string };
  answerLabel?: string;
  trustTitle?: string;
  faqTitle?: { lead: string; accent: string };
  faqSub?: string;
  cta?: { title: string; subtitle: string };
};

export const SEO_TOPICS: Record<string, SeoTopic> = {
  'whatsapp-cart-recovery': {
    slug: 'whatsapp-cart-recovery',
    eyebrow: 'Cart recovery',
    h1: 'WhatsApp cart recovery for Shopify',
    subtitle:
      'Recover abandoned carts on WhatsApp with Meta-approved templates, live Shopify cart data, and a three-message sequence built for Indian D2C.',
    title: 'WhatsApp Cart Recovery for Shopify | TopEdge AI',
    description:
      'Abandoned cart recovery on WhatsApp for Shopify India, timing, Meta templates, COD-aware journeys, and recovery ₹ tracking in one workspace.',
    keywords:
      'WhatsApp cart recovery, abandoned cart recovery WhatsApp, Shopify cart recovery, ecommerce automation India',
    answerFirst:
      'WhatsApp cart recovery is ecommerce automation that detects Shopify abandoned checkouts and sends Meta-approved WhatsApp messages with product, price, and a return-to-checkout link. For Indian D2C, it typically outperforms email because shoppers read WhatsApp faster, especially on COD-heavy catalogs.',
    sections: [
      {
        h2: 'Why abandoned cart recovery belongs on WhatsApp',
        body: 'Email still matters for newsletters, but cart abandonment is a short-window problem. A WhatsApp reminder within 30-60 minutes, grounded in live Shopify cart lines and ₹ totals, gives shoppers a one-tap path back to checkout. Pair it with a second value nudge and a final close within 72 hours, without spamming beyond Meta policy.',
      },
      {
        h2: 'A three-message sequence that respects Meta rules',
        body: 'Message one is a gentle utility-friendly reminder. Message two clarifies shipping, size, or COD. Message three offers human help via Live Chat rather than endless discounts. Gate every send until templates are APPROVED so drafts never blast customers.',
      },
      {
        h2: 'Measure recovery ₹, not vanity opens',
        body: 'Track sent → read → clicked → paid against Shopify orders. That is how you know cart recovery software is paying for itself, not just message volume.',
      },
    ],
    bullets: [
      'Shopify abandon events trigger journeys automatically',
      'Product cards and checkout links from live store data',
      'COD vs prepaid branching inside the same canvas',
      'Shared inbox takeover when a shopper replies',
    ],
    faqs: [
      {
        question: 'What is WhatsApp cart recovery for Shopify?',
        answer:
          'It is automated WhatsApp messaging triggered by abandoned Shopify checkouts, using Meta-approved templates and live cart data to bring shoppers back to pay.',
      },
      {
        question: 'How many WhatsApp cart recovery messages should I send?',
        answer:
          'Most Indian D2C brands see strong results with two to three messages over 48-72 hours. More than that often hurts trust and risks template quality.',
      },
      {
        question: 'Does TopEdge AI require Zapier for cart recovery?',
        answer:
          'No. TopEdge AI connects Shopify over OAuth and Meta WhatsApp Cloud API directly, then runs journeys and Live Chat in one workspace.',
      },
    ],
    related: [
      { label: 'Journey builder', href: '/features/journeys' },
      { label: 'COD confirmation', href: '/features/journeys' },
      { label: 'Cart recovery playbook', href: '/blog/whatsapp-abandoned-cart-recovery-shopify' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  'cod-confirmation-whatsapp': {
    slug: 'cod-confirmation-whatsapp',
    eyebrow: 'COD / RTO',
    h1: 'COD confirmation on WhatsApp',
    subtitle:
      'Confirm Cash on Delivery orders before you ship, cut RTO risk with utility templates, Shopify order context, and operator takeover.',
    title: 'COD Confirmation on WhatsApp | Reduce RTO Shopify',
    description:
      'WhatsApp COD confirmation for Shopify India: confirm, reschedule, or cancel before dispatch to reduce RTO while keeping conversion high.',
    keywords:
      'COD confirmation WhatsApp, reduce RTO Shopify, COD WhatsApp automation, Cash on Delivery confirmation India',
    answerFirst:
      'COD confirmation on WhatsApp asks buyers to confirm, reschedule, or cancel a Cash on Delivery order before you ship. Indian Shopify brands use it to reduce return-to-origin (RTO) while keeping the conversion lift COD provides at checkout.',
    sections: [
      {
        h2: 'Confirm before you pack',
        body: 'Trigger confirmation right after order creation. Show order number, items, and ₹ COD amount from Shopify. Offer clear reply paths, YES / reschedule / cancel, and escalate unsure buyers to Live Chat instead of shipping blindly.',
      },
      {
        h2: 'Branch journeys on payment method',
        body: 'Prepaid and COD should not share the same tone. Condition WhatsApp journeys on COD status so recovery and confirmation stay honest and Meta-safe.',
      },
      {
        h2: 'Pair with cart recovery',
        body: 'Cart recovery wins the order; COD confirmation protects the margin. Run both from the same Shopify + Meta workspace so ops is not juggling three tools.',
      },
    ],
    bullets: [
      'Utility-friendly COD confirm templates',
      'Shopify order # and COD amount in-thread',
      'Pause automation when an agent takes over',
      'Transparent Meta utility rates on pricing',
    ],
    faqs: [
      {
        question: 'Does COD confirmation on WhatsApp reduce RTO?',
        answer:
          'Yes, confirming intent before dispatch typically cuts failed deliveries and refusal-on-delivery. Exact lift varies by category, AOV, and follow-up policy.',
      },
      {
        question: 'Is COD confirmation a marketing or utility message?',
        answer:
          'Order confirmation and shipping-related COD checks often qualify as utility when they follow Meta’s category rules. Always submit templates for approval before automating.',
      },
    ],
    related: [
      { label: 'Journeys', href: '/features/journeys' },
      { label: 'Cart recovery', href: '/features/journeys#abandoned-cart' },
      { label: 'RTO playbook', href: '/blog/how-to-reduce-rto-with-whatsapp-cod-confirmation' },
      { label: 'Journeys', href: '/features/journeys' },
    ],
  },
  'shopify-whatsapp-integration': {
    slug: 'shopify-whatsapp-integration',
    eyebrow: 'Integrations',
    h1: 'Shopify WhatsApp integration',
    subtitle:
      'Carts, orders, customers and the COD flag sync over Shopify OAuth into Meta WhatsApp Cloud API. Cart recovery, COD confirmation and support run on live store data, with no markup on Meta fees.',
    title: 'Shopify WhatsApp Integration India | Meta Cloud API',
    description:
      'A Shopify WhatsApp integration connects your store by OAuth and the Meta Cloud API, syncing carts, orders and the COD flag. India rates at 0% markup.',
    keywords:
      'Shopify WhatsApp integration, WhatsApp for Shopify, Meta Cloud API Shopify, ecommerce WhatsApp automation, connect WhatsApp to Shopify, Shopify WhatsApp API India, WhatsApp Business API Shopify app',
    answerFirst:
      'A Shopify WhatsApp integration connects your store’s carts, orders, customers and catalog to Meta’s WhatsApp Cloud API, so cart recovery, COD confirmation, order updates and support run on live store data. In TopEdge AI the connection takes about 30 minutes, and Meta rates pass through at 0% markup, from ₹0.115 per utility message.',
    sections: [],
    blocks: [
      {
        kind: 'prose',
        id: 'what-it-connects',
        h2: 'What a Shopify WhatsApp integration actually connects',
        accent: 'actually connects',
        body: [
          'There are two systems involved and they speak different languages. Shopify knows what was bought, by whom, for how much, and whether the order is Cash on Delivery. Meta’s WhatsApp Cloud API knows how to deliver a message to a phone number, but only inside the template and policy rules Meta sets. A Shopify WhatsApp integration is the layer that turns a store event into a compliant WhatsApp send, with the order detail filled in.',
          'That detail is the whole point. A generic chatbot can reply to “where is my order”. A connected integration answers it with the order number, the courier, and the amount due on delivery, because it is reading your store rather than guessing. The same connection is what lets a cart reminder name the product and the ₹ total, and what lets a COD confirmation quote the real amount before anything ships.',
        ],
      },
      {
        kind: 'specTable',
        id: 'what-syncs',
        h2: 'What syncs from Shopify, and what each object drives',
        accent: 'each object drives',
        intro:
          'After Shopify OAuth, these objects flow into TopEdge AI continuously. The right column is what they are actually used for, because a sync that powers nothing is just storage.',
        columns: ['Shopify object', 'What comes across', 'What it powers on WhatsApp'],
        rows: [
          {
            label: 'Abandoned checkouts',
            cells: [
              'Cart lines, variants, ₹ totals, checkout URL, customer phone',
              'Cart recovery journeys with the product named and a one-tap return to checkout',
            ],
          },
          {
            label: 'Orders',
            cells: [
              'Order number, line items, totals, fulfilment state, COD or prepaid flag',
              'Order confirmation, dispatch and delivery updates, COD confirmation before pickup',
            ],
          },
          {
            label: 'Customers',
            cells: [
              'Phone, name, order history, tags',
              'Audience segments, repeat-purchase campaigns, opt-in state per number',
            ],
          },
          {
            label: 'Products and variants',
            cells: [
              'Titles, images, prices, inventory state',
              'Product cards inside messages, back-in-stock and catalog replies',
            ],
          },
          {
            label: 'COD flag',
            cells: [
              'Payment method on the order',
              'COD confirmation on every plan, and COD to prepaid journeys on Growth and above',
            ],
            note: 'The flag is what branches a journey.',
          },
        ],
        footnote:
          'Basic COD confirmation runs on every plan. COD to prepaid conversion and Journey Branch are Growth and Scale features.',
      },
      {
        kind: 'steps',
        id: 'how-to-connect',
        h2: 'How to connect WhatsApp to Shopify',
        accent: 'connect WhatsApp to Shopify',
        intro:
          'The engineering is not the slow part. Meta business verification and first template approval are, and both are queues you wait in rather than work you do.',
        steps: [
          {
            title: 'Install TopEdge AI and authorise Shopify',
            body:
              'One-click Shopify OAuth from the app listing or the dashboard. No private app keys, no Zapier in the middle, no code on your theme for the core sync.',
            meta: 'about 2 minutes',
          },
          {
            title: 'Connect your WhatsApp Business account',
            body:
              'Add your WABA and phone number credentials for Meta’s WhatsApp Cloud API in the dashboard. If you do not have a WABA yet, this is where you create one against your Meta Business account.',
            meta: 'about 10 minutes',
          },
          {
            title: 'Clear Meta business verification',
            body:
              'Meta verifies the business behind the number. This is a review on Meta’s side, not something a platform can shorten, and it is the usual reason a go-live slips by days rather than hours.',
            meta: 'Meta review, varies',
          },
          {
            title: 'Submit your message templates',
            body:
              'Cart recovery, order update and COD confirmation templates go to Meta for approval by category. TopEdge AI tracks approval state so a journey cannot send a template that is still a draft.',
            meta: 'Many clear in minutes, most within a day',
          },
          {
            title: 'Publish the first journey',
            body:
              'Start with one. Cart recovery if you are prepaid-heavy, COD confirmation if RTO is the bleeding problem. Watch it for a week before you add the second.',
            meta: 'about 15 minutes',
          },
        ],
      },
      {
        kind: 'figures',
        id: 'meta-rates',
        h2: 'What Meta charges in India, and what we add',
        accent: 'what we add',
        intro:
          'Meta bills per delivered message by category, directly to you. TopEdge AI adds no markup on those fees, so these are the rates you pay rather than a resold number.',
        figures: [
          {
            value: '₹0.8631',
            label: 'Per delivered marketing message in India. This is the category a promotional campaign send falls into.',
            source: 'metaPricing',
          },
          {
            value: '₹0.1150',
            label: 'Per delivered utility or authentication message in India. Order updates and COD confirmations are utility, which is why they cost roughly a seventh of a marketing send.',
            source: 'metaPricing',
          },
          {
            value: '1,000 free',
            label: 'Service messages per business phone number per month from 1 October 2026. Meta charges from the 1,001st service message onward.',
            source: 'metaPricing',
          },
        ],
      },
      {
        kind: 'callout',
        id: 'markup-note',
        tone: 'note',
        title: 'Why the utility rate matters more than the headline rate',
        body:
          'Most of what a Shopify store sends is utility: order placed, order shipped, out for delivery, confirm your COD order. At ₹0.1150 a message, transactional automation is cheap to run and the cost scales with orders rather than with audience size. Marketing sends are the expensive category, and they are the ones worth rationing.',
        link: { label: 'See the full India rate card', href: '/pricing/meta-rates' },
      },
      {
        kind: 'figures',
        id: 'why-it-pays',
        h2: 'Why Indian stores connect WhatsApp first',
        accent: 'connect WhatsApp first',
        intro:
          'Two problems drive almost every integration we see, and both are measurable. These are published figures with the source beside each one, not our estimates.',
        figures: [
          {
            value: '70.22%',
            label: 'Average documented online cart abandonment rate, averaged across 50 published studies.',
            source: 'baymardCart',
          },
          {
            value: '39.2% to 21.0%',
            label: 'RTO at the November 2025 festive peak, falling to 21.0% by March 2026 among brands running prepaid incentives and pre-dispatch address verification. Built from 410M+ shipments across 6,000+ brands.',
            source: 'unicommerceRto',
          },
          {
            value: '₹180 to ₹240',
            label: 'Direct logistics cost of a single RTO parcel: forward shipping, reverse logistics, repackaging and inventory holding. Acquisition spend is on top of that.',
            source: 'amazonShippingRto',
          },
        ],
      },
      {
        kind: 'prose',
        id: 'cod',
        h2: 'Why this matters most for COD stores',
        accent: 'COD stores',
        body: [
          'COD is why a Shopify WhatsApp integration pays for itself faster in India than almost anywhere else. An unconfirmed COD order is a parcel you pay to ship twice if the customer changes their mind at the door, and the published RTO figures above show how often that happens during a festive quarter.',
          'A confirmation message before dispatch does two things at once. It filters out the orders that were never serious, which is the larger share of the problem, and it gives the serious ones a reason to switch to prepaid when you offer one. Confirmation runs on every TopEdge AI plan. The prepaid switch, which needs a branching journey, is a Growth and Scale feature.',
        ],
      },
      {
        kind: 'checklist',
        id: 'getting-it-right',
        h2: 'Getting the integration right',
        accent: 'integration right',
        intro:
          'What separates a WhatsApp setup that compounds from one that gets a number flagged. Most of this is learned the expensive way.',
        doLabel: 'Do this',
        dontLabel: 'Avoid this',
        doItems: [
          'Send the cart reminder inside 30 to 60 minutes, while the intent is still warm',
          'Keep order updates on utility templates so cost scales with orders, not audience',
          'Confirm COD orders before dispatch, not after the courier has the parcel',
          'Collect opt-in properly and keep the state per phone number',
          'Hand a replying customer to a human in a shared inbox with the order beside the thread',
          'Track sent to read to clicked to paid against Shopify orders',
        ],
        dontItems: [
          'Blasting a marketing template to every number you have ever collected',
          'Running more than two or three cart messages across 48 to 72 hours',
          'Answering “where is my order” with a bot that cannot read the order',
          'Treating template approval as optional and discovering it at send time',
          'Discounting in message one when the shopper only needed a shipping answer',
          'Measuring opens and declaring the integration a success',
        ],
      },
      {
        kind: 'callout',
        id: 'policy',
        tone: 'warn',
        title: 'Template approval is a hard gate, not a formality',
        body:
          'Meta reviews and categorises every template before it can be sent, and a number that collects blocks or poor-quality ratings gets its messaging limits cut. That is why automation should be unable to send an unapproved draft at all, rather than merely discouraged from it. Opt-in and content rules are set by Meta and WhatsApp, not by the platform you buy.',
        link: { label: 'Read Meta’s template guidelines', href: 'https://developers.facebook.com/docs/whatsapp/message-templates/guidelines/' },
      },
      {
        kind: 'specTable',
        id: 'native-vs-glue',
        h2: 'Native integration compared with glue code',
        accent: 'glue code',
        intro:
          'Three ways Shopify stores connect WhatsApp, and what each one actually costs you in practice.',
        columns: ['', 'Zapier or glue code', 'A general BSP panel', 'TopEdge AI'],
        mineColumn: 3,
        rows: [
          {
            label: 'Shopify connection',
            cells: ['Webhooks you maintain', 'Often a CSV or partial app', 'One-click OAuth'],
          },
          {
            label: 'Order context in the inbox',
            cells: ['No', 'Rarely', 'Beside every thread'],
          },
          {
            label: 'COD flag available to branch on',
            cells: ['You build it', 'Usually not', 'Yes'],
          },
          {
            label: 'Template approval state',
            cells: ['Tracked manually', 'In a separate console', 'Blocks unapproved sends'],
          },
          {
            label: 'Markup on Meta fees',
            cells: ['None, you pay Meta', 'Commonly marked up', 'None, you pay Meta'],
          },
          {
            label: 'Breaks when Shopify changes',
            cells: ['Your problem', 'Their roadmap', 'Maintained'],
          },
        ],
        footnote:
          'Platform pricing and markup practices differ by vendor. See the alternatives comparison for each platform’s own published pricing page.',
      },
    ],
    bullets: [
      'One-click Shopify OAuth',
      'Meta Cloud API credentials in-dashboard',
      'Template approval tracking',
      'Live Chat + journeys on the same data',
    ],
    faqs: [
      {
        question: 'How do I connect Shopify to WhatsApp?',
        answer:
          'Install a platform that supports Shopify OAuth and Meta’s WhatsApp Cloud API, then authorise your store, add your WhatsApp Business account credentials, clear Meta business verification, get your templates approved, and publish a journey. In TopEdge AI the connection steps take roughly half an hour of actual work; Meta’s verification and template reviews are the waiting.',
      },
      {
        question: 'Do I need Zapier for Shopify WhatsApp automation?',
        answer:
          'No. TopEdge AI connects to Shopify over OAuth and to Meta’s WhatsApp Cloud API directly, so carts, orders, customers, catalog and the COD flag arrive natively. Glue code becomes a maintenance job the first time Shopify changes a webhook.',
      },
      {
        question: 'How much does WhatsApp cost for a Shopify store in India?',
        answer:
          'Meta bills you per delivered message by category. In India that is ₹0.8631 for a marketing message and ₹0.1150 for a utility or authentication message, and from 1 October 2026 each business phone number gets 1,000 free service messages a month. TopEdge AI adds no markup on those fees, so platform pricing and Meta pricing are separate lines. TopEdge AI plans start at ₹1,999 a month plus GST.',
      },
      {
        question: 'Can I confirm COD orders on WhatsApp before shipping?',
        answer:
          'Yes. The COD flag comes across from Shopify on the order, so a journey can message the customer to confirm before the parcel is picked up. Basic COD confirmation is available on every TopEdge AI plan. Converting a confirmed COD order to prepaid needs a branching journey and is a Growth and Scale feature.',
      },
      {
        question: 'Is a WhatsApp integration better than Shopify abandoned cart emails?',
        answer:
          'They do different jobs. Shopify counts a checkout as abandoned once it has been incomplete for more than ten minutes after the customer gave an email, and its recovery emails work on the Online Store and Buy Button channels. WhatsApp is read faster and does not need an email address, which matters on COD-heavy catalogs where shoppers often do not give one. Most Indian stores run both and let WhatsApp take the short window.',
      },
      {
        question: 'Will connecting WhatsApp get my number banned?',
        answer:
          'Not if you stay inside Meta’s rules. Bans and messaging-limit cuts follow blocks and poor quality ratings, which come from unsolicited marketing sends to numbers that did not opt in. Keep transactional messages on utility templates, collect opt-in properly, and make it impossible for automation to send an unapproved template.',
      },
      {
        question: 'Does the integration work with Shopify Plus and multiple stores?',
        answer:
          'The connection is standard Shopify OAuth, so it works the same on Shopify and Shopify Plus. If you run more than one store, connect each one and check your plan’s order and send allowances against your combined volume.',
      },
      {
        question: 'What happens when a customer replies to an automated message?',
        answer:
          'The thread lands in the shared inbox with the Shopify order beside it, so whoever picks it up can see what was bought and what is owed without opening Shopify admin. Automation handing off to a human is the point at which most stores stop losing the conversation.',
      },
    ],
    related: [
      { label: 'Integrations overview', href: '/integrations' },
      { label: 'Meta template manager', href: '/features/meta-manager' },
      { label: 'Journey builder', href: '/features/journeys' },
      { label: 'Journey examples', href: '/whatsapp-journey-examples' },
      { label: 'Meta India rate card', href: '/pricing/meta-rates' },
      { label: 'WhatsApp API pricing in India', href: '/blog/whatsapp-business-api-pricing-india' },
      { label: 'What to automate first', href: '/blog/shopify-whatsapp-automation-what-to-automate-first' },
      { label: 'Compare the alternatives', href: '/compare/alternatives' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },

  /*
   * Landing page 1 of the 20 Nov 2026 keyword map (PLAN-AND-LOG section 3b).
   * Owns "whatsapp abandoned cart recovery app" and "shopify abandoned cart app".
   * The blog playbook keeps "how to" and message-copy queries; the shortlist
   * post keeps "best ... app". Timings are the Cart recovery playbook defaults
   * (docs/guides/abandoned-cart-recovery and DocDiagram cart-recovery-ladder).
   */
  'whatsapp-abandoned-cart-recovery-app': {
    slug: 'whatsapp-abandoned-cart-recovery-app',
    eyebrow: 'Cart recovery',
    h1: 'WhatsApp abandoned cart recovery app for Shopify',
    h1Accent: 'abandoned cart recovery app',
    subtitle:
      'Three timed WhatsApp reminders for every abandoned checkout, cancelled the moment the shopper buys.',
    title: 'WhatsApp Abandoned Cart Recovery App for Shopify',
    description:
      'WhatsApp abandoned cart recovery app for Shopify India: 3 reminders at 25 min, 4 h and 36 h, stopped on purchase, ₹0.8631 per message at Meta’s rate.',
    keywords:
      'whatsapp abandoned cart recovery app, shopify abandoned cart app, abandoned cart recovery shopify, whatsapp abandoned cart recovery, shopify abandoned cart whatsapp',
    answerFirst:
      'TopEdge AI is a Shopify app that sends abandoned checkout reminders on WhatsApp: the first about 25 minutes after the shopper leaves, then 4 hours and 36 hours later, and none once they order. Each reminder is a Meta marketing template at ₹0.8631 in India (Meta’s card, re-read 16 November 2026), so three reminders cost ₹2.59 at most per cart. Plans start at ₹1,999 a month plus GST, or $19 on the Shopify App Store.',
    sections: [],
    bullets: [
      'First reminder at 25 minutes',
      'Stops when the order is placed',
      'Replies land in a shared inbox',
      '14 days free, no card',
    ],
    kicker: { label: 'Journeys', href: '/features/journeys' },
    film: 'cart',
    filmLabel:
      'TopEdge AI film: a shopper leaves a Shopify checkout, gets a WhatsApp reminder with the cart, and completes the order',
    appStoreCta: true,
    answerLabel: 'In short',
    trustTitle: 'Shopify brands already on TopEdge AI',
    plans: {
      intro:
        'Cart recovery is on every plan. You pay a flat plan by orders, plus Meta’s fee per reminder with no markup. Free for 14 days, 20 orders and 200 sends, no card.',
    },
    faqTitle: { lead: 'Cart recovery', accent: 'questions' },
    faqSub: 'Timing, cost, opt-in, discounts, and how this compares with Shopify’s own reminders.',
    cta: {
      title: 'Turn on WhatsApp cart recovery this week',
      subtitle:
        'Connect Shopify and WhatsApp, approve three templates and publish the Cart recovery playbook. About 20 minutes once Meta has approved the templates.',
    },
    blocks: [
      {
        kind: 'steps',
        id: 'how-it-works',
        h2: 'How the WhatsApp cart recovery app works',
        accent: 'cart recovery app',
        intro:
          'These are the default waits in the Cart recovery playbook. You can change each one, and the copy of each message, before you publish.',
        steps: [
          {
            title: 'A shopper leaves checkout',
            body: 'They type a phone number at checkout and close the tab without paying. TopEdge AI saves it as an abandoned cart with its products. A cart without a phone number cannot be messaged, however good the journey is.',
          },
          {
            title: 'Reminder 1, about 25 minutes later',
            body: 'A short nudge with the product and a link back to the same checkout, while the shopper is still deciding. Sooner chases people who only switched tabs.',
            meta: 'Default wait, editable',
          },
          {
            title: 'Reminder 2, four hours after that',
            body: 'Answers the doubt that stopped them: delivery time, returns, or whether cash on delivery is available.',
          },
          {
            title: 'Reminder 3, thirty-six hours after that',
            body: 'The last nudge, and the only one where a discount belongs. A fourth message costs more in blocks and Meta fees than it brings back.',
          },
          {
            title: 'The order lands, the sequence stops',
            body: 'When the order reaches Shopify the remaining reminders are cancelled and the cart is marked recovered, with the revenue attributed to the reminder that brought it back. Replies at any point go to the shared inbox.',
          },
        ],
      },
      {
        kind: 'specTable',
        id: 'vs-shopify',
        h2: 'TopEdge AI vs Shopify’s own cart reminders',
        accent: 'Shopify’s own cart reminders',
        intro:
          'Shopify gives you two free or cheap starting points. Here is what each one does, as each side publishes it.',
        columns: ['', 'Shopify abandoned checkout email', 'Shopify Messaging on WhatsApp', 'TopEdge AI'],
        mineColumn: 3,
        rows: [
          {
            label: 'Channel',
            cells: ['Email', 'WhatsApp, marketing messages only', 'WhatsApp and email'],
          },
          {
            label: 'Who it reaches',
            cells: [
              'Shoppers who gave an email at checkout',
              'WhatsApp marketing subscribers only',
              'Shoppers who left a phone number; collect WhatsApp opt-in first',
            ],
          },
          {
            label: 'Reminders',
            cells: [
              'Recovery email from Shopify’s automations',
              'Abandoned browse, cart and checkout templates',
              'Three timed reminders by default (25 min, +4 h, +36 h)',
            ],
          },
          {
            label: 'India cost per WhatsApp message',
            cells: ['No WhatsApp', '$0.024, about ₹2.25, on your Shopify bill', '₹0.8631, Meta’s rate, no markup'],
          },
          {
            label: 'COD orders',
            cells: ['Not covered', 'No COD confirmation listed', 'COD confirmation journey on every plan'],
          },
          {
            label: 'App fee',
            cells: ['None', 'None beyond message charges', 'From ₹1,999 a month + GST, or $19 on the App Store'],
          },
        ],
        footnote:
          'Shopify facts read 20 November 2026 from the Shopify Help Center and Changelog. Meta’s India rate re-read 16 November 2026. ₹2.25 uses ₹93.92 to the dollar (ECB, 6 November 2026).',
      },
      {
        kind: 'prose',
        id: 'cost',
        h2: 'What it costs per 100 abandoned checkouts',
        accent: 'per 100 abandoned checkouts',
        body: [
          'Every reminder is a Meta marketing template, billed per delivered message at ₹0.8631 in India. If 100 shoppers who opted in to WhatsApp abandon checkout and all three reminders reach every one of them, the Meta bill is **₹258.93**. That is the ceiling: each shopper who buys after the first or second reminder stops the rest, so the real bill is lower.',
          'Set that against the order value you get back. Put your own traffic and order value into the [cart recovery calculator](/tools/cart-recovery-calculator), and check every India rate on the [Meta rate card](/pricing/meta-rates).',
        ],
      },
      {
        kind: 'checklist',
        id: 'before-you-start',
        h2: 'What you need before the first reminder sends',
        accent: 'first reminder',
        doLabel: 'Do',
        dontLabel: 'Avoid',
        doItems: [
          'Connect Shopify and switch on the TopEdge AI app embed in your live theme',
          'Connect your WhatsApp Business account through Meta',
          'Get three cart recovery templates approved by Meta (marketing category)',
          'Add a WhatsApp opt-in at checkout or on your storefront',
          'Abandon a test checkout from a second phone and watch the reminder arrive',
        ],
        dontItems: [
          'A discount in the first reminder: most carts come back without one',
          'A fourth reminder: it costs more than it recovers',
          'Cart reminders to numbers that never opted in to WhatsApp',
          'Going live without placing a real order mid-sequence to test the stop',
        ],
      },
      {
        kind: 'prose',
        id: 'when-not',
        h2: 'When you do not need a cart recovery app',
        accent: 'do not need',
        body: [
          'If most of your shoppers never give a phone number, or have not opted in to WhatsApp, start with Shopify’s free abandoned checkout email. An app adds little until your opt-in list grows.',
          'If you only want cart reminders for marketing subscribers and you sell mostly prepaid, Shopify Messaging can now send them on WhatsApp itself, at $0.024 a message in India. An app earns its fee when you also need COD confirmation, order updates and a shared inbox, which the [WhatsApp automation for Shopify guide](/blog/whatsapp-automation-for-shopify) walks through.',
          'Comparing tools? The ranked shortlist is [best Shopify app for abandoned cart recovery in India](/blog/best-shopify-app-for-abandoned-cart-recovery-india), and timing and copy for each reminder are in the [WhatsApp abandoned cart recovery playbook](/blog/whatsapp-abandoned-cart-recovery-shopify).',
        ],
      },
      {
        kind: 'callout',
        id: 'cod',
        tone: 'note',
        title: 'Pair cart recovery with COD confirmation',
        body: 'A recovered cart that comes back as a cash on delivery order still has to be accepted at the door. The COD confirmation journey asks the buyer to confirm before you ship, for ₹0.1150 a message, and it is on every plan.',
        link: { label: 'COD confirmation on WhatsApp', href: '/features/cod-confirmation' },
      },
    ],
    faqs: [
      {
        question: 'What is a WhatsApp abandoned cart recovery app?',
        answer:
          'An app that watches your Shopify checkouts and messages shoppers on WhatsApp when they leave without paying, with the products and a link back to the same checkout. TopEdge AI sends up to three reminders and cancels the rest the moment the order is placed.',
      },
      {
        question: 'When should the first abandoned cart message go out?',
        answer:
          'About 25 minutes after the shopper leaves, the default in the Cart recovery playbook. Sooner chases people who only switched tabs, and waiting several hours loses the ones still deciding.',
      },
      {
        question: 'How much does WhatsApp cart recovery cost on Shopify?',
        answer:
          'Meta charges ₹0.8631 per delivered marketing message in India, so three reminders cost ₹2.59 at most per cart. TopEdge AI plans start at ₹1,999 a month plus GST, or $19 on the Shopify App Store, with no markup on Meta’s rate.',
      },
      {
        question: 'Can Shopify send abandoned cart messages on WhatsApp without an app?',
        answer:
          'Yes since 28 October 2026. Shopify Messaging can send WhatsApp abandoned cart and checkout reminders to WhatsApp marketing subscribers, at $0.024 a message in India. It lists no COD confirmation or order updates, which is where an app is still needed.',
      },
      {
        question: 'Should an abandoned cart message include a discount?',
        answer:
          'Not the first one. Most recovered carts come back without a discount, so keep any offer for the third reminder and you avoid paying for sales you would have made anyway.',
      },
      {
        question: 'Do I need opt-in to send cart reminders on WhatsApp?',
        answer:
          'Yes. Meta requires opt-in before a business messages someone, and a phone number typed at checkout is not consent on its own. Add a WhatsApp opt-in at checkout or on your storefront before you switch reminders on.',
      },
    ],
    related: [
      { label: 'WhatsApp abandoned cart recovery playbook', href: '/blog/whatsapp-abandoned-cart-recovery-shopify' },
      { label: 'Best Shopify app for abandoned cart recovery in India', href: '/blog/best-shopify-app-for-abandoned-cart-recovery-india' },
      { label: 'Cart recovery calculator', href: '/tools/cart-recovery-calculator' },
      { label: 'Set up cart recovery: the docs', href: '/docs/guides/abandoned-cart-recovery' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
};

export function getSeoTopic(slug: string) {
  return SEO_TOPICS[slug] ?? null;
}
