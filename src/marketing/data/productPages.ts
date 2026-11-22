/**
 * Priority product pages, shared enterprise layout content.
 * Hero media is video or still; bentos use real product screenshots.
 */

export type ProductPageId =
  | 'flow-builder'
  | 'opt-in-tools'
  | 'campaigns'
  | 'audience-crm'
  | 'journeys'
  | 'tracking-pixel'
  | 'ai-brain'
  | 'meta-manager'
  | 'chat-rules'
  | 'warranty'
  | 'profit-loss'
  | 'intent-detection'
  | 'cod-confirmation';

export type ProductHeroMedia =
  | { kind: 'video'; src: string; poster: string; mobileSrc?: string; mobilePoster?: string; label: string; glow?: ProductGlow }
  | { kind: 'image'; src: string; alt: string; glow?: ProductGlow };

export type ProductGlow = 'violet' | 'emerald' | 'sky' | 'amber' | 'rose' | 'indigo';

export type ProductBento = {
  titleLead: string;
  titleAccent: string;
  body: string;
  image: string;
  /** SEO-friendly alt for the bento screenshot */
  imageAlt?: string;
  /** default third = equal 3-col row */
  span?: 'third' | 'half' | 'full' | 'wide';
};

export type ProductShowcase = {
  title: string;
  titleAccent?: string;
  body: string;
  /** Dashboard screenshot path, empty string shows a labeled placeholder */
  image: string;
  imageLabel?: string;
  reverse?: boolean;
  /** In-page anchor id (e.g. abandoned-cart) for deep links */
  anchor?: string;
};

/**
 * A sourced data table rendered under the showcases.
 *
 * Added for /features/profit-loss, where the 2026-10-21 research pass found the
 * page asserting that COD and RTO eat margin without ever showing the rupee
 * lines. An AI engine will not repeat a claim it cannot read a number off, and
 * a worked table is also the thing an operator links to. `note` carries the
 * citation, so no figure here is published without the page it was read from.
 */
export type ProductProofTable = {
  title: string;
  titleAccent?: string;
  /** Short lead-in above the table. */
  intro?: string;
  columns: string[];
  /** First cell of each row renders as a row header. */
  rows: string[][];
  /** Rows to render emphasised (0-indexed into `rows`). */
  emphasise?: number[];
  /** Sourcing footnote. Required in practice: cite or do not publish. */
  note: string;
  /** Optional closing paragraphs under the note. */
  takeaways?: string[];
};

export type ProductPage = {
  id: ProductPageId;
  /** Canonical public path */
  path: string;
  /** When set, `/features/:slug` also renders this page */
  featureSlug?: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  /**
   * AEO: 30–50 word direct answer under the hero (what it is + who it’s for).
   * Keep factual — no invented pricing or competitor claims.
   */
  answerFirst?: string;
  /** Visible FAQ + FAQPage schema when set (must match on-page Q&A). */
  faqs?: { question: string; answer: string }[];
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  hero: ProductHeroMedia;
  /** @deprecated Removed from UI, optional for backwards-compatible data */
  outcomesTitle?: string;
  outcomesAccent?: string;
  outcomes?: { metric: string; label: string; detail: string }[];
  bentoTitle: string;
  bentoAccent: string;
  bentoSub: string;
  bentos: ProductBento[];
  showcasesTitle: string;
  showcasesAccent: string;
  showcasesSub?: string;
  showcases: ProductShowcase[];
  /** Sourced worked example, rendered after the showcases. */
  proofTable?: ProductProofTable;
  stepsTitle: string;
  stepsAccent: string;
  steps: { title: string; body: string }[];
  relatedTitle: string;
  relatedAccent: string;
  related: { label: string; href: string }[];
  ctaTitle: string;
  ctaSub: string;
};

const COD_VIDEO = {
  src: '/marketing/demos/cod-prepaid11.mp4?v=20260918a',
  poster: '/marketing/demos/cod-prepaid-poster.jpg?v=20260918a',
  mobileSrc: '/marketing/demos/cod-prepaid-mobile.mp4',
} as const;

const FLOW_VIDEO = {
  src: '/marketing/demos/flowwww1.mp4?v=20260918a',
  poster: '/marketing/demos/flow-builder-poster.jpg?v=20260918a',
  mobileSrc: '/marketing/demos/flow-builder-mobile.mp4',
} as const;

const OPTIN_VIDEO = {
  src: '/marketing/demos/opt-in.mp4?v=20260918a',
  poster: '/marketing/demos/optin-popup-poster.jpg?v=20260918a',
  mobileSrc: '/marketing/demos/opt-in-mobile.mp4',
} as const;

export const PRODUCT_PAGES: Record<ProductPageId, ProductPage> = {
  'flow-builder': {
    id: 'flow-builder',
    path: '/features/flow-builder',
    featureSlug: 'flow-builder',
    eyebrow: 'Flow Builder',
    title: 'WhatsApp flow builder for Shopify',
    titleAccent: 'that reads every order',
    subtitle:
      'Look up an order, fix an address or hand off to a human, without anyone leaving the chat.',
    answerFirst:
      'TopEdge AI Flow Builder is a no-code WhatsApp flow builder for Shopify brands in India. It builds button and list menus that look up an order, change a shipping address or hand the chat to an agent, all from live Shopify data. Flow Builder is on every plan, from ₹1,999/mo.',
    faqs: [
      {
        question: 'How is Flow Builder different from Journeys?',
        answer:
          'Flow Builder answers chats; Journeys send messages on Shopify events. Journeys run cart, COD and shipping sequences, while Flow Builder runs the menus a shopper taps through when they message you.',
      },
      {
        question: 'Can flows hand off to a human with order context?',
        answer:
          'Yes. Escalate into Live Chat so agents see the same Shopify order beside the thread, and takeover pauses automation on that chat.',
      },
      {
        question: 'Do I need to write code to build a flow?',
        answer:
          'No. Flows are built on a canvas with Shopify tools as nodes, so order lookup, address capture and Live Chat handoff are drag and drop. Developers are not in the loop for a normal flow change.',
      },
      {
        question: 'Should I use a flow or AI to answer customers?',
        answer:
          'Use a flow wherever a wrong answer costs money: exchanges, address changes and refunds. Open-ended catalog questions are where AI earns its place.',
      },
    ],
    seoTitle: 'WhatsApp Flow Builder for Shopify: No-Code Chat Menus',
    seoDescription:
      'A no-code WhatsApp flow builder for Shopify: menus that look up orders, fix addresses and hand off to an agent with the order attached. On every plan.',
    keywords:
      'WhatsApp flow builder Shopify, WhatsApp chatbot India D2C, Shopify WhatsApp OAuth, ecommerce WhatsApp automation India',
    hero: {
      kind: 'video', ...FLOW_VIDEO,
      label: 'Flow Builder canvas with Shopify order tools',
      glow: 'sky',
    },
    outcomesTitle: 'What builders',
    outcomesAccent: 'ship faster',
    outcomes: [
      {
        metric: 'OAuth',
        label: 'Shopify connect',
        detail: 'Native install, no manual API key setup',
      },
      {
        metric: 'Webhooks',
        label: 'Real-time sync',
        detail: 'Orders, checkouts, fulfillments, not polling',
      },
      {
        metric: 'Inbox',
        label: 'Order context',
        detail: 'Shopify data attached to WhatsApp threads',
      },
    ],
    bentoTitle: 'Automation with',
    bentoAccent: 'store context',
    bentoSub: 'Shopify tools, Live Chat handoff, and webhook sync, not a generic chatbot taped onto ecommerce.',
    bentos: [
      {
        titleLead: 'Shopify',
        titleAccent: 'tools',
        body: 'Fetch orders, change addresses and cancel fulfillments from the canvas, using live Shopify data.',
        image: '/flow-sub-feature/7.webp',
        imageAlt: 'Flow Builder Shopify tools, order lookup, address update, and catalog send nodes',
        span: 'third',
      },
      {
        titleLead: 'Live Chat',
        titleAccent: 'handoff',
        body: 'When a shopper needs a human, the bot pauses and the chat opens in Live Chat with the order attached.',
        image: '/flow-sub-feature/9.webp',
        imageAlt: 'WhatsApp Live Chat handoff from Flow Builder with Shopify order context',
        span: 'third',
      },
      {
        titleLead: 'Webhook',
        titleAccent: 'sync',
        body: 'Orders, checkouts and fulfillments update in real time, so the bot answers from current store data.',
        image: '/flow-sub-feature/8.webp',
        imageAlt: 'Shopify webhook sync status for WhatsApp flow automation',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'Flow Builder',
    showcasesSub: 'Menus and bots for inbound chat, order updates and cart recovery stay in Journeys.',
    showcases: [
      {
        title: 'Flow list &',
        titleAccent: 'folders',
        body: 'Open your welcome flow or start a new one. Publishing replaces the live flow for the next inbound message.',
        image: '/flow-sub-feature/14.webp',
        imageLabel: 'TopEdge AI Flow Builder home, WhatsApp flows and folders for Shopify',
      },
      {
        title: 'Buttons, lists',
        titleAccent: '& branches',
        body: 'Welcome menus and FAQ paths where each tap moves the shopper to the next step.',
        image: '/flow-sub-feature/15.webp',
        imageLabel: 'WhatsApp interactive buttons, lists, and conditional branches on Flow Builder canvas',
      },
      {
        title: 'Simulator',
        titleAccent: 'before publish',
        body: 'Test Flow walks every button and list without messaging real customers. Fix what it flags, then publish.',
        image: '/flow-sub-feature/13.webp',
        imageLabel: 'Test Flow simulator phone preview for WhatsApp chatbot before publish',
      },
    ],

    stepsTitle: 'How a flow',
    stepsAccent: 'goes live',
    steps: [
      {
        title: 'Connect Shopify with OAuth',
        body: 'Native install, store data and tools without pasting API secrets into a form.',
      },
      {
        title: 'Describe or draft the canvas',
        body: 'Use the AI form or start from a template; wire Shopify tool nodes where the shopper needs order help.',
      },
      {
        title: 'Add human handoff',
        body: 'Route stuck or high-intent threads into Live Chat, takeover pauses automation until Release.',
      },
      {
        title: 'Publish when ready',
        body: 'Test critical paths in the simulator, then go live without waiting on an agency sprint.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'recovery + CRM',
    related: [
      { label: 'Flow Builder reference', href: '/docs/reference/flow-builder' },
      { label: 'Guide: build your first flow', href: '/docs/guides/build-your-first-flow' },
      { label: 'Cart recovery journeys', href: '/features/journeys#abandoned-cart' },
      // A flow sends templates, so the library belongs in this cluster. Also
      // helps "whatsapp flows shopify" reach the page that answers it.
      { label: 'WhatsApp template library', href: '/whatsapp-templates' },
      { label: 'Live Chat handoff', href: '/features' },
      { label: 'Intent detection', href: '/features/intent-detection' },
      { label: 'Chat rules', href: '/features/chat-rules' },
      { label: 'What to automate first', href: '/blog/shopify-whatsapp-automation-what-to-automate-first' },
    ],
    ctaTitle: 'Build your first Shopify-aware WhatsApp flow',
    ctaSub: 'Draft on a canvas that already speaks orders, SKUs, and Live Chat handoff.',
  },

  'opt-in-tools': {
    id: 'opt-in-tools',
    path: '/features/opt-in-tools',
    featureSlug: 'opt-in-tools',
    eyebrow: 'Opt-in tools',
    title: 'WhatsApp opt-in popups for Shopify',
    titleAccent: 'that build a consented list',
    subtitle:
      'Popup, spin wheel and chat widget, with every consent timestamped.',
    answerFirst:
      'TopEdge AI Opt-in Tools are WhatsApp opt-in popups for Shopify stores in India: a welcome popup, spin wheel, mystery discount, Pulse Drop and chat widget. Each one saves the number with a consent timestamp, so campaigns only reach people who agreed. All five are on every plan, including Launch.',
    faqs: [
      {
        question: 'Where do opted-in numbers go?',
        answer:
          'Into one subscriber list in Audience CRM, with name, phone, consent, source tool and timestamp. You can filter it and open any shopper in Customer 360.',
      },
      {
        question: 'Can I run journeys only to consented shoppers?',
        answer:
          'Yes. Use the consented list as the audience for campaigns and journey eligibility so Meta marketing sends stay tied to real opt-in.',
      },
      {
        question: 'Which opt-in tools are included, and on which plan?',
        answer:
          'Pulse Drop, the welcome popup, spin the wheel, the mystery discount and the chat widget are on every plan, including Launch. There is no separate opt-in add-on.',
      },
      {
        question: 'Does a spin wheel or popup count as valid WhatsApp consent?',
        answer:
          'Only if the shopper actively opts in and you log it. Keep the box unticked by default, record what was agreed and when, and keep that record, because Meta judges your quality rating on who complains.',
      },
    ],
    seoTitle: 'WhatsApp Opt-in Popup for Shopify: Spin Wheel & Widget',
    seoDescription:
      'WhatsApp opt-in popup, spin wheel and chat widget for Shopify: capture consented numbers with a timestamp, then message only subscribers. On every plan.',
    keywords:
      'WhatsApp opt-in Shopify India, WhatsApp popup Shopify, spin to win WhatsApp, WhatsApp widget Shopify, WhatsApp subscriber list D2C',
    hero: {
      kind: 'video', ...OPTIN_VIDEO,
      label: 'WhatsApp opt-in tools on the Shopify storefront',
      glow: 'rose',
    },
    bentoTitle: 'List, triggers,',
    bentoAccent: 'widget',
    bentoSub: 'One consented WhatsApp audience, design who sees what, then capture with the storefront widget.',
    bentos: [
      {
        titleLead: 'Subscriber',
        titleAccent: 'list',
        body: 'Name, phone, consent, source tool and timestamp in one WhatsApp-ready list.',
        image: '/opt-in-sub-feature/10.webp',
        imageAlt: 'WhatsApp subscriber list with marketing consent and opt-in source for Shopify',
        span: 'third',
      },
      {
        titleLead: 'Triggers &',
        titleAccent: 'design',
        body: 'Choose when it shows (delay, exit intent, scroll, add to cart), on which pages, and to whom.',
        image: '/opt-in-sub-feature/11.webp',
        imageAlt: 'Opt-in trigger settings, delay, exit intent, scroll, and Shopify page rules',
        span: 'third',
      },
      {
        titleLead: 'WhatsApp',
        titleAccent: 'widget',
        body: 'A floating chat button that can capture a phone number, then opens WhatsApp. One live widget per store.',
        image: '/opt-in-sub-feature/12.webp',
        imageAlt: 'Shopify storefront WhatsApp chat widget with phone capture',
        span: 'third',
      },
    ],
    showcasesTitle: 'Storefront',
    showcasesAccent: 'tools',
    showcasesSub:
      'Each capture path writes the same consented audience, ready for Meta-safe campaigns and journeys.',
    showcases: [
      {
        title: 'Pulse',
        titleAccent: 'Drop',
        body: 'A VIP drop reveal with a coupon that opens WhatsApp. Every claim lands on the subscriber list.',
        image: '/opt-in-sub-feature/16.webp',
        imageLabel: 'Pulse Drop VIP WhatsApp opt-in on Shopify storefront',
      },
      {
        title: 'Welcome',
        titleAccent: 'popup',
        body: 'A discount and phone capture in three layouts, with your brand colours and a live preview.',
        image: '/opt-in-sub-feature/17.webp',
        imageLabel: 'Shopify welcome popup capturing WhatsApp number with discount offer',
      },
      {
        title: 'Spin to',
        titleAccent: 'win',
        body: 'Weighted prize slices with unique Shopify codes. Every spin records marketing consent.',
        image: '/opt-in-sub-feature/18.webp',
        imageLabel: 'Spin-to-win WhatsApp opt-in wheel on Shopify India storefront',
      },
      {
        title: 'Mystery',
        titleAccent: 'discount',
        body: 'A scratch card or tap-and-hold reveal that still captures the number and consent.',
        image: '/opt-in-sub-feature/19.webp',
        imageLabel: 'Mystery discount scratch reveal WhatsApp opt-in for Shopify',
      },
    ],
    stepsTitle: 'How opt-in',
    stepsAccent: 'ships',
    steps: [
      {
        title: 'Pick a tool',
        body: 'Pulse Drop, Popup, Spin, Mystery, or WhatsApp widget. Start from an India D2C template if you want speed.',
      },
      {
        title: 'Design + set triggers',
        body: 'Brand, offers, lead fields, when/where/who, frequency, and schedule. Preview desktop and mobile.',
      },
      {
        title: 'Publish to Shopify',
        body: 'Theme install injects the script. Live toggle hides instantly; preview with ?te_preview_tool=.',
      },
      {
        title: 'Grow the list, then message',
        body: 'Read views, signups, and redemptions, then send Meta-approved campaigns or journeys from consented subscribers.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'growth',
    related: [
      { label: 'Opt-in tools reference', href: '/docs/reference/opt-in-tools' },
      { label: 'Guide: collect WhatsApp opt-in', href: '/docs/guides/website-opt-in' },
      { label: 'Audience campaigns', href: '/features/campaigns' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
      { label: 'WhatsApp journeys', href: '/features/journeys' },
      { label: 'Choose a WhatsApp app', href: '/blog/how-to-choose-whatsapp-app-shopify-app-store' },
    ],
    ctaTitle: 'Turn Shopify traffic into WhatsApp revenue',
    ctaSub: 'Five opt-in tools, one consented list, Meta-safe campaigns that attribute ₹.',
  },

  campaigns: {
    id: 'campaigns',
    path: '/features/campaigns',
    featureSlug: 'campaigns',
    eyebrow: 'Campaigns',
    title: 'WhatsApp broadcast campaigns for Shopify,',
    titleAccent: 'measured in ₹',
    subtitle:
      'Send a Meta-approved template to a segment and read the revenue it earned, not the sends.',
    answerFirst:
      'TopEdge AI Campaigns sends WhatsApp broadcast campaigns from Shopify to segments built on purchase and browsing behaviour, for D2C brands in India. Only Meta-approved templates go out, and reports show attributed orders after Meta fees. Launch includes 3,000 campaign and email sends a month, Growth 15,000 and Scale 30,000.',
    faqs: [
      {
        question: 'Do campaigns require approved Meta templates?',
        answer:
          'Yes. Marketing and utility templates must be APPROVED in Meta Manager before a campaign can send, matching Cloud API rules.',
      },
      {
        question: 'How do I measure WhatsApp campaign revenue?',
        answer:
          'By attributed Shopify orders, net of Meta fees. Clicks and orders are tied back to the send, so finance sees profit, not only delivery counts.',
      },
      {
        question: 'How many campaign sends does each plan include?',
        answer:
          'Launch includes 3,000 campaign plus email sends a month, Growth 15,000 and Scale 30,000. The trial includes 200. Meta charges its own per-message rate on top, billed to your Business Account.',
      },
      {
        question: 'Can a campaign send to a template Meta has not approved yet?',
        answer:
          'No. Anything not APPROVED is blocked from sending rather than queued, because a rejected template that goes out anyway is how a WhatsApp number loses its quality rating.',
      },
    ],
    seoTitle: 'WhatsApp Broadcast Campaigns for Shopify India',
    seoDescription:
      'WhatsApp broadcast campaigns for Shopify India: Meta-approved templates to behaviour segments, with orders after Meta fees. 3,000 to 30,000 sends a month.',
    keywords:
      'WhatsApp marketing Shopify India, WhatsApp broadcast ecommerce, Meta template campaigns India, WhatsApp campaign ROI Shopify',
    hero: {
      kind: 'image',
      src: '/campaignn.webp',
      alt: 'TopEdge AI WhatsApp marketing campaign templates for Shopify India on mobile',
      glow: 'rose',
    },
    outcomesTitle: 'What growth',
    outcomesAccent: 'teams need',
    outcomes: [
      {
        metric: 'Meta-safe',
        label: 'Frequency capped',
        detail: 'Built-in caps so segments don’t get spammed',
      },
      {
        metric: 'Behavior',
        label: 'Not just tags',
        detail: 'Purchase history and intent drive segments',
      },
      {
        metric: 'Net ₹',
        label: 'After Meta fees',
        detail: 'Profit per campaign, not gross sends',
      },
    ],
    bentoTitle: 'Campaigns with',
    bentoAccent: 'guardrails',
    bentoSub: 'Segments, lead scores, and honest cost, built for Indian D2C WhatsApp growth.',
    bentos: [
      {
        titleLead: 'Behavior',
        titleAccent: 'segments',
        body: 'Build audiences from Shopify purchase history and on-site intent, not an old CSV.',
        image: '/campaign-sub-feature/13.webp',
        imageAlt: 'WhatsApp campaign behavior segments from Shopify purchase and intent data',
        span: 'third',
      },
      {
        titleLead: 'Lead',
        titleAccent: 'scoring',
        body: 'Rank shoppers by cart, browse and purchase signals, so broadcasts reach intent first.',
        image: '/campaign-sub-feature/14.webp',
        imageAlt: 'Lead scoring for WhatsApp marketing campaigns on Shopify',
        span: 'third',
      },
      {
        titleLead: 'Net-of-Meta',
        titleAccent: 'reporting',
        body: 'See profit per campaign after messaging fees, the ₹ number finance can use.',
        image: '/campaign-sub-feature/15.webp',
        imageAlt: 'WhatsApp campaign performance reporting net of Meta fees in ₹',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'campaigns',
    showcasesSub: 'Segment → Meta-approved template → net revenue after fees.',
    showcases: [
      {
        title: 'Audience',
        titleAccent: 'builder',
        body: 'Pick a pixel or CRM segment with lead scores in view, and message people who earned a send.',
        image: '/campaign-sub-feature/21.webp',
        imageLabel: 'WhatsApp campaign audience builder with lead scoring for Shopify',
      },
      {
        title: 'Template',
        titleAccent: 'lock',
        body: 'Only APPROVED Meta templates go out, so drafts never hurt your quality rating.',
        image: '/campaign-sub-feature/22.webp',
        imageLabel: 'Meta-approved WhatsApp marketing template gallery for campaigns',
      },
      {
        title: 'Performance',
        titleAccent: 'card',
        body: 'Attributed Shopify orders and cost after Meta fees for every campaign.',
        image: '/campaign-sub-feature/20.webp',
        imageLabel: 'WhatsApp campaign performance card, Shopify orders net of Meta cost',
      },
    ],

    stepsTitle: 'How a campaign',
    stepsAccent: 'ships',
    steps: [
      {
        title: 'Choose the audience',
        body: 'Behavior, purchase history, or pixel cohorts, anyone who has earned a WhatsApp message.',
      },
      {
        title: 'Lock an approved template',
        body: 'Pick copy Meta already cleared so the send cannot leak a draft past quality rating.',
      },
      {
        title: 'Broadcast with caps',
        body: 'Frequency capping and quality controls protect the number while you scale India D2C sends.',
      },
      {
        title: 'Read net ₹',
        body: 'Attribute paid Shopify orders, subtract Meta fees, and keep the campaigns that actually profit.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'CRM + pixel',
    related: [
      { label: 'Campaigns reference', href: '/docs/reference/campaigns' },
      { label: 'Guide: segment customers', href: '/docs/guides/segment-your-customers' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
      { label: 'Meta Manager', href: '/features/meta-manager' },
      { label: 'Opt-in tools', href: '/features/opt-in-tools' },
      { label: 'API pricing India', href: '/blog/whatsapp-business-api-pricing-india' },
      { label: 'TopEdge AI vs WATI vs AiSensy', href: '/compare/topedge-vs-wati-vs-aisensy' },
    ],
    ctaTitle: 'Launch a Meta-safe WhatsApp campaign',
    ctaSub: 'Segment, approve, send, and measure revenue against Shopify orders, after Meta fees.',
  },

  'audience-crm': {
    id: 'audience-crm',
    path: '/features/audience-crm',
    featureSlug: 'audience-crm',
    eyebrow: 'Audience CRM',
    title: 'The WhatsApp CRM for Shopify:',
    titleAccent: 'one shopper, every order',
    subtitle:
      'Chats, orders and support on one timeline, however many numbers a shopper uses.',
    answerFirst:
      'TopEdge AI Audience CRM is a WhatsApp CRM for Shopify brands in India. It merges WhatsApp chats, Shopify orders and support history into one profile per shopper, scores leads and builds segments for campaigns and journeys. Profiles are unlimited on every plan, and plans are sized by orders, from 100 a month on Launch.',
    faqs: [
      {
        question: 'What shows on a contact timeline?',
        answer:
          'Orders, WhatsApp threads, campaign touches, tags and opt-in state. Growth and support work from the same customer record.',
      },
      {
        question: 'Can segments feed campaigns and journeys?',
        answer:
          'Yes. Build segments from purchase and engagement signals, then use them in Campaigns or journey eligibility without exporting CSVs.',
      },
      {
        question: 'How many customer profiles can I keep?',
        answer:
          'Profiles are not metered on any plan. The plan is sized by Shopify orders a month, 100 on Launch, 800 on Growth and 1,500 on Scale, so growing your list does not change the bill.',
      },
      {
        question: 'What happens when the same buyer has two phone numbers?',
        answer:
          'They merge into one profile, with both numbers, past orders and conversation history on a single timeline. That is what stops the same person getting the same campaign twice.',
      },
    ],
    seoTitle: 'WhatsApp CRM for Shopify India: Segments & Profiles',
    seoDescription:
      'A WhatsApp CRM for Shopify India: one timeline per shopper with orders and chats, lead scores and segments for campaigns. Unlimited profiles on every plan.',
    keywords:
      'WhatsApp CRM Shopify India, ecommerce audience segmentation, WhatsApp lead scoring, Shopify customer timeline WhatsApp',
    hero: {
      kind: 'image',
      src: '/audience-crm-hero.webp',
      alt: 'Unified Shopify customer identity, one lead across WhatsApp numbers and emails',
      glow: 'violet',
    },
    outcomesTitle: 'What CRM',
    outcomesAccent: 'should do',
    outcomes: [
      {
        metric: '1 timeline',
        label: 'Orders + chats',
        detail: 'Campaigns and WhatsApp beside the same lead',
      },
      {
        metric: 'Scores',
        label: 'From real signals',
        detail: 'Purchase and engagement, not gut feel tags',
      },
      {
        metric: 'Unlimited',
        label: 'Profiles',
        detail: 'Every plan, no profile-count upsell trap',
      },
    ],
    bentoTitle: 'Identity &',
    bentoAccent: 'ops in one place',
    bentoSub: 'Timeline, scores, and segments, the surfaces growth and support already live in.',
    bentos: [
      {
        titleLead: 'Unified',
        titleAccent: 'timeline',
        body: 'Shopify orders, WhatsApp chats and campaigns on one contact.',
        image: '/audience-crm-sub-feature/16.webp',
        imageAlt: 'Audience CRM unified timeline, Shopify orders and WhatsApp chats on one contact',
        span: 'third',
      },
      {
        titleLead: 'Segments',
        titleAccent: 'in-product',
        body: 'Build audiences here and feed journeys and campaigns without exporting.',
        image: '/audience-crm-sub-feature/18.webp',
        imageAlt: 'In-product WhatsApp audience segment builder for Shopify CRM',
        span: 'third',
      },
      {
        titleLead: 'Lead',
        titleAccent: 'scoring',
        body: 'Scores from purchase and engagement signals, so you chase the carts and VIPs that pay.',
        image: '/audience-crm-sub-feature/17.webp',
        imageAlt: 'Lead scoring from Shopify purchase and WhatsApp engagement signals',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'Audience',
    showcasesSub: 'One shopper across WhatsApp chats, Shopify orders, scores, and segments.',
    showcases: [
      {
        title: 'Unified',
        titleAccent: 'profiles',
        body: 'Extra numbers and emails merge into one profile, so threads and orders stay together.',
        image: '/leaadd.webp?v=20260917c',
        imageLabel: 'Audience CRM unified identity, primary and secondary WhatsApp numbers',
      },
      {
        title: 'Customer',
        titleAccent: '360',
        body: 'Open any shopper and see orders, WhatsApp threads and campaign history on one record.',
        image: '/audience-crm-sub-feature/360.webp',
        imageLabel: 'Customer 360, Shopify orders, WhatsApp chats, and campaign history',
      },
      {
        title: 'Segment',
        titleAccent: 'builder',
        body: 'Build cohorts for campaigns and journeys without a separate CDP.',
        image: '/audience-crm-sub-feature/crm-segement.webp',
        imageLabel: 'Segment builder in TopEdge AI Audience CRM for WhatsApp campaigns',
      },
    ],

    stepsTitle: 'How identity',
    stepsAccent: 'stays clean',
    steps: [
      {
        title: 'Touchpoints arrive',
        body: 'Chats, checkouts, and emails come in with different numbers or aliases.',
      },
      {
        title: 'TopEdge AI stitches the lead',
        body: 'Primary/secondary phones and emails collapse into one master profile with a shared timeline.',
      },
      {
        title: 'Score and segment',
        body: 'Lead scores update from real purchase and engagement; segments feed journeys and campaigns.',
      },
      {
        title: 'Ops works one record',
        body: 'Recovery, broadcast, and care all read the same shopper, no duplicate WhatsApp blasts.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'growth tools',
    related: [
      { label: 'Audience reference', href: '/docs/reference/audience-crm' },
      { label: 'Orders reference', href: '/docs/reference/orders' },
      { label: 'Audience campaigns', href: '/features/campaigns' },
      { label: 'Cart recovery', href: '/features/journeys#abandoned-cart' },
      { label: 'COD journeys', href: '/features/journeys' },
      { label: 'Opt-in tools', href: '/features/opt-in-tools' },
      { label: 'WhatsApp automation guide (win-back)', href: '/blog/whatsapp-automation-for-shopify' },
    ],
    ctaTitle: 'Run WhatsApp from one customer record',
    ctaSub: 'Unlimited profiles, real scores, and segments that feed journeys, without another CRM seat.',
  },

  journeys: {
    id: 'journeys',
    path: '/features/journeys',
    featureSlug: 'journeys',
    eyebrow: 'Journey',
    title: 'Shopify WhatsApp journey builder',
    titleAccent: 'for carts and COD',
    subtitle:
      'Cart, COD and shipping journeys on one canvas, measured in recovered rupees.',
    answerFirst:
      'TopEdge AI Journeys is a Shopify WhatsApp journey builder for D2C brands in India. It sends abandoned cart, COD confirmation and shipping messages on Shopify events, using Meta-approved templates, and reports recovered revenue in ₹. A 3-step cart recovery journey comes pre-built, and Journey Branch is on Growth and Scale.',
    faqs: [
      {
        question: 'What is a WhatsApp journey for Shopify?',
        answer:
          'A WhatsApp journey is an event-driven sequence tied to Shopify data: abandoned checkout, order created, COD pending or fulfilment. Each shopper gets the next message based on real store state, not a static list.',
      },
      {
        question: 'How does TopEdge AI recover abandoned carts on WhatsApp?',
        answer:
          'With a pre-built 3-step journey that starts when Shopify marks a checkout abandoned, carrying live line items and a checkout link. Each reminder is a marketing template at ₹0.8631 per delivered message in India, so all three steps cost ₹2.59 in Meta fees.',
      },
      {
        question: 'Can Journeys run COD confirmation before warehouse release?',
        answer:
          'Yes. A COD journey sends a confirm, reschedule or cancel utility template at ₹0.1150 and holds dispatch until the buyer confirms. Splitting COD and prepaid in one journey needs Journey Branch on Growth and Scale; on Launch, run a linear journey on the COD pending trigger.',
      },
      {
        question: 'Do journeys send before Meta templates are approved?',
        answer:
          'No. TopEdge AI gates live sends on APPROVED templates so drafts and rejected copy cannot go out and damage quality rating.',
      },
    ],
    seoTitle: 'Shopify WhatsApp Journey Builder for Cart & COD',
    seoDescription:
      'A Shopify WhatsApp journey builder for India: pre-built cart recovery, COD confirmation and shipping journeys on Meta-approved templates. From ₹1,999/mo.',
    keywords:
      'WhatsApp cart recovery Shopify India, abandoned cart WhatsApp, COD confirmation WhatsApp, Shopify journey automation, Meta template approval journeys',
    hero: {
      kind: 'video', ...COD_VIDEO,
      label: 'Visual WhatsApp journey canvas for Shopify cart and COD',
      glow: 'violet',
    },
    outcomesTitle: 'What operators',
    outcomesAccent: 'build here',
    outcomes: [
      {
        metric: 'Canvas',
        label: 'Drag → publish',
        detail: 'Triggers, waits, branches, and sends, no code',
      },
      {
        metric: 'Shopify',
        label: 'Real events',
        detail: 'Orders, checkouts, fulfillments, not polling lag',
      },
      {
        metric: '₹',
        label: 'Recovered revenue',
        detail: 'Attribution per journey, not vanity send counts',
      },
    ],
    bentoTitle: 'What powers the',
    bentoAccent: 'journey engine?',
    bentoSub: 'A real builder with Meta gates and Shopify triggers: cart, COD, and shipping without custom code.',
    bentos: [
      {
        titleLead: 'Drag-and-drop',
        titleAccent: 'builder',
        body: 'Connect Shopify triggers, waits, conditions and WhatsApp sends on a canvas, with no engineering tickets.',
        image: '/journey-sub-feature/4.webp?v=20261115a',
        imageAlt: 'Drag-and-drop WhatsApp journey builder canvas for Shopify ecommerce',
        span: 'third',
      },
      {
        titleLead: 'Pre-built',
        titleAccent: 'templates',
        body: 'Cart recovery (3-step), order confirmation, COD confirmation and shipping updates come pre-built.',
        image: '/journey-sub-feature/5.webp?v=20261115a',
        imageAlt: 'Pre-built WhatsApp journey templates, cart recovery, COD, and shipping',
        span: 'third',
      },
      {
        titleLead: 'Meta approval',
        titleAccent: 'gating',
        body: 'A journey cannot go live with an unapproved template, and the status shows in the builder.',
        image: '/journey-sub-feature/6.webp?v=20261115a',
        imageAlt: 'Meta WhatsApp template approval status gating on journey canvas',
        span: 'third',
      },
    ],
    showcasesTitle: 'Which journeys',
    showcasesAccent: 'ship first?',
    showcasesSub:
      'Abandoned cart, conditional COD/prepaid routes, and return-visit retargeting on one canvas, Meta-safe by default.',
    showcases: [
      {
        anchor: 'abandoned-cart',
        title: 'Abandoned',
        titleAccent: 'Cart',
        body: 'A pre-built 3-step WhatsApp recovery sequence on Meta-approved templates. Chase high-value carts first and read recovered ₹.',
        image: '/journey-sub-feature/10.webp?v=20261115a',
        imageLabel: 'Abandoned cart recovery journey, 3-step WhatsApp sequence for Shopify India',
      },
      {
        anchor: 'conditional-routes',
        title: 'Conditional',
        titleAccent: 'routes',
        body: 'Branch on payment method, order state or reply, so COD, prepaid and quiet buyers get different next steps. Journey Branch is on Growth and Scale.',
        image: '/journey-sub-feature/11.webp?v=20261115a',
        imageLabel: 'Conditional WhatsApp journey routes for COD vs prepaid on Shopify',
      },
      {
        anchor: 'return-retarget',
        title: 'Return &',
        titleAccent: 'retarget',
        body: 'When a known shopper comes back and leaves again, pixel intent can start a journey while interest is warm.',
        image: '/journey-sub-feature/12.webp?v=20261115a',
        imageLabel: 'Return-visit website intent matched to WhatsApp retargeting journeys',
      },
    ],

    stepsTitle: 'How does a journey',
    stepsAccent: 'go live?',
    steps: [
      {
        title: 'Start from a Shopify event',
        body: 'Checkout abandoned, order created, fulfillment, or COD pending, triggered off store webhooks rather than a delayed batch.',
      },
      {
        title: 'Use a template or branch paths',
        body: 'Pick a pre-seeded cart or COD journey, or add waits and conditional routes so each shopper gets the right path.',
      },
      {
        title: 'Gate on Meta approval',
        body: 'Attach only APPROVED templates; drafts stay blocked so quality rating stays protected.',
      },
      {
        title: 'Publish and read recovered ₹',
        body: 'Watch sent → clicked → paid per journey, then tighten the steps that leak recovery revenue.',
      },
    ],
    relatedTitle: 'Related in this',
    relatedAccent: 'cluster',
    related: [
      { label: 'WhatsApp journey examples with costs', href: '/whatsapp-journey-examples' },
      { label: 'Journeys reference', href: '/docs/reference/journeys' },
      { label: 'Guide: order status updates', href: '/docs/guides/order-status-updates' },
      { label: 'Cart recovery playbook', href: '/blog/whatsapp-abandoned-cart-recovery-shopify' },
      { label: 'COD confirmation on WhatsApp', href: '/features/cod-confirmation' },
      { label: 'COD confirmation & RTO', href: '/blog/how-to-reduce-rto-with-whatsapp-cod-confirmation' },
      { label: 'Meta templates', href: '/features/meta-manager' },
      { label: 'Pricing', href: '/pricing' },
    ],
    ctaTitle: 'Build your first WhatsApp journey',
    ctaSub: 'Cart recovery, COD confirm, Meta gates, recovered ₹ you can show finance.',
  },

  'tracking-pixel': {
    id: 'tracking-pixel',
    path: '/features/analytics',
    featureSlug: 'analytics',
    eyebrow: 'Tracking Pixel',
    title: 'Shopify visitor tracking pixel:',
    titleAccent: 'see who browses, then message them',
    subtitle:
      'One Shopify embed matches views, carts and checkouts to a WhatsApp number that opted in.',
    answerFirst:
      'TopEdge AI Tracking Pixel is a Shopify visitor tracking pixel for WhatsApp, installed as a one-click theme app embed. It records product views, carts and checkouts, then matches them to opted-in WhatsApp numbers so journeys and campaigns fire while interest is warm. It is on every plan, including Launch at ₹1,999/mo.',
    faqs: [
      {
        question: 'Do I need a developer to install the pixel?',
        answer:
          'No. Enable the theme app embed from Shopify settings. No manual snippet paste for the standard install.',
      },
      {
        question: 'How does the pixel help cart recovery?',
        answer:
          'It turns browsing into journey triggers. Browse and cart events start journeys and build audiences (for example, viewed three times and never bought) once a WhatsApp number is known.',
      },
      {
        question: 'Is the pixel on every plan?',
        answer:
          'Yes, including Launch. It installs as a Shopify theme app embed, so it is a settings toggle rather than a code change, and it is not a paid add-on.',
      },
      {
        question: 'What happens if a visitor has not given a WhatsApp number yet?',
        answer:
          'The browse and cart events are held against the anonymous visitor and attach to the profile later, at checkout or at opt-in. Nothing is messaged to someone who has not consented.',
      },
    ],
    seoTitle: 'Shopify WhatsApp Visitor Identity Tracking Pixel',
    seoDescription:
      'One-click Shopify theme app embed that matches live product views, add-to-cart and browse drop-offs to consented WhatsApp numbers for retargeting journeys.',
    keywords:
      'WhatsApp tracking pixel Shopify, website intent WhatsApp India, Shopify theme app embed tracking, cart recovery analytics WhatsApp',
    hero: {
      kind: 'image',
      src: '/website-pixel.webp',
      alt: 'Website tracking pixel events matched to WhatsApp numbers for Shopify',
      glow: 'amber',
    },
    outcomesTitle: 'What the pixel',
    outcomesAccent: 'surfaces',
    outcomes: [
      {
        metric: '1-click',
        label: 'Theme install',
        detail: 'App embed toggle, no developer paste job',
      },
      {
        metric: 'Live',
        label: 'View → cart → checkout',
        detail: 'Events feed journeys (e.g. viewed 3×, never bought)',
      },
      {
        metric: 'Health',
        label: 'In-dashboard',
        detail: 'Know if tracking stops, before revenue dips',
      },
    ],
    bentoTitle: 'Intent that',
    bentoAccent: 'becomes action',
    bentoSub: 'Pixel events become journey triggers and campaign audiences, not a vanity analytics page.',
    bentos: [
      {
        titleLead: 'Theme app',
        titleAccent: 'embed',
        body: 'Turn tracking on from Shopify theme settings, with no code snippet.',
        image: '/website-track/20.webp',
        imageAlt: 'Shopify theme app embed toggle for TopEdge AI WhatsApp tracking pixel',
        span: 'third',
      },
      {
        titleLead: 'View, cart,',
        titleAccent: 'checkout',
        body: 'Product views, add-to-cart and checkout events stream in and feed WhatsApp journeys.',
        image: '/website-track/21.webp',
        imageAlt: 'Live product view, add-to-cart, and checkout events for WhatsApp journeys',
        span: 'third',
      },
      {
        titleLead: 'Shopper',
        titleAccent: 'journey',
        body: 'See where visitors drop off between product view, cart and checkout, page by page.',
        image: '/website-track/22.webp',
        imageAlt: 'Shopify shopper journey funnel, view to cart to checkout drop-offs',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'tracking',
    showcasesSub: 'Install once, watch health, then hand intent to WhatsApp journeys and campaigns.',
    showcases: [
      {
        title: 'Live',
        titleAccent: 'intent feed',
        body: 'Product views, scroll, and carts stream in while intent is still warm, ready for recovery or broadcast.',
        image: '/website-track/31.webp',
        imageLabel: 'Tracking pixel live feed, Shopify product and cart events for WhatsApp',
      },
      {
        title: 'Number',
        titleAccent: 'matching',
        body: 'Browsing ties to a WhatsApp number once opt-in or checkout reveals it.',
        image: '/website-track/32.webp',
        imageLabel: 'Website browse intent matched to WhatsApp numbers for Shopify D2C',
      },
      {
        title: 'Pixel',
        titleAccent: 'health',
        body: 'See in the dashboard whether tracking is healthy, before a dead pixel costs you recovered ₹.',
        image: '/website-track/33.webp',
        imageLabel: 'WhatsApp tracking pixel health dashboard and audience handoff',
      },
    ],

    stepsTitle: 'How tracking',
    stepsAccent: 'pays off',
    steps: [
      {
        title: 'Enable the theme embed',
        body: 'One-click install in Shopify, no developer required to paste code.',
      },
      {
        title: 'Intent lights up',
        body: 'Views, carts, and checkouts appear; numbers match when opt-in or checkout reveals WhatsApp.',
      },
      {
        title: 'Feed journeys & campaigns',
        body: 'Use behavior as triggers and audiences, e.g. viewed 3×, never bought, without rebuilding tracking.',
      },
      {
        title: 'Watch pixel health',
        body: 'Confirm events still flow. Catch breakage before recovery and campaign numbers go quiet.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'campaigns + recovery',
    related: [
      { label: 'Analytics reference', href: '/docs/reference/analytics' },
      { label: 'Store growth reference', href: '/docs/reference/store-growth' },
      { label: 'Cart recovery', href: '/features/journeys#abandoned-cart' },
      { label: 'Return & retarget', href: '/features/journeys#return-retarget' },
      { label: 'Audience campaigns', href: '/features/campaigns' },
      { label: 'Cart recovery playbook', href: '/blog/whatsapp-abandoned-cart-recovery-shopify' },
    ],
    ctaTitle: 'Turn site intent into WhatsApp revenue',
    ctaSub: 'Theme embed, consent-aware events, and journeys that fire on real browse behavior.',
  },

  'ai-brain': {
    id: 'ai-brain',
    path: '/features/ai-brain',
    featureSlug: 'ai-brain',
    eyebrow: 'AI Brain',
    title: 'A WhatsApp AI agent for Shopify',
    titleAccent: 'on your own keys',
    subtitle:
      'Bring your own OpenAI, Claude or Gemini key, answer from your catalog, and step back when an agent joins.',
    answerFirst:
      'TopEdge AI Brain is a WhatsApp AI agent for Shopify brands in India that runs on your own OpenAI, Claude or Gemini key. It answers from your catalog and policies, and pauses when an agent takes over. TopEdge AI adds no per-message AI charge; a reply costs roughly ₹0.10 to ₹0.30 on your provider bill.',
    faqs: [
      {
        question: 'What does bring-your-own-key AI mean?',
        answer:
          'BYOK means you bring your own OpenAI, Claude, or Gemini API key. TopEdge AI grounds replies in catalog and policy knowledge, while tokens and model spend stay on your provider account.',
      },
      {
        question: 'Does Live Chat takeover stop the AI?',
        answer:
          'Yes. When an agent takes control, AI and Flow Builder pause on that thread until release, so humans and bots never talk over each other.',
      },
      {
        question: 'Will the AI make up prices or stock levels?',
        answer:
          'Not if you ground it. Load store knowledge and policies first, keep Quick FAQs for fixed answers, and send disputes to Live Chat with the order attached.',
      },
      {
        question: 'Who pays for the AI tokens?',
        answer:
          'You do, directly to OpenAI, Anthropic or Google, because you connect your own key. There is no per-message AI charge from us on any plan, and the estimated cost is roughly ₹0.10 to ₹0.30 per AI reply depending on the model.',
      },
    ],
    seoTitle: 'WhatsApp AI Agent for Shopify: Bring Your Own Key',
    seoDescription:
      'A WhatsApp AI agent for Shopify India on your own OpenAI, Claude or Gemini key: answers from your catalog, hands off to agents, no per-message AI fee.',
    keywords:
      'WhatsApp AI Shopify India, BYOK OpenAI Claude ecommerce, store knowledge WhatsApp bot, WhatsApp AI own API keys D2C',
    hero: {
      kind: 'image',
      src: '/aiii/ai-brain-hero.webp?v=2',
      alt: 'TopEdge AI Brain, WhatsApp AI on your own OpenAI or Claude API keys for Shopify',
      glow: 'violet',
    },
    bentoTitle: 'What does AI Brain',
    bentoAccent: 'control?',
    bentoSub: 'Knowledge grounds answers. Persona sets voice. Bring your own key (OpenAI, Claude, or Gemini), so spend stays on your provider bill.',
    bentos: [
      {
        titleLead: 'Store',
        titleAccent: 'knowledge',
        body: 'Import store pages and docs, and keep return, refund and shipping policies as the source for answers.',
        image: '/aiii/25.webp',
        imageAlt: 'TopEdge AI store knowledge documents and Shopify store policies for WhatsApp AI',
        span: 'third',
      },
      {
        titleLead: 'BYOK',
        titleAccent: 'your keys',
        body: 'Connect OpenAI, Claude or Gemini, pick the model and cap reply length. Tokens bill to your provider.',
        image: '/aiii/27.webp',
        imageAlt: 'AI Brain BYOK settings, connect OpenAI, Claude, or Gemini API key for WhatsApp',
        span: 'third',
      },
      {
        titleLead: 'Bot',
        titleAccent: 'persona',
        body: 'Set the bot name, tone and Quick FAQs so replies stay on brand.',
        image: '/aiii/26.webp',
        imageAlt: 'WhatsApp bot persona settings, name, tone, and Quick FAQs for Shopify brands',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'AI Brain',
    showcasesSub: 'BYOK settings, knowledge, persona, plus Intent Detect so every message does not need a model call.',
    showcases: [
      {
        title: 'BYOK',
        titleAccent: 'settings',
        body: 'Connect your key, choose the model, and track token use and cost.',
        image: '/aiii/36.webp',
        imageLabel: 'AI Brain BYOK settings, OpenAI, Claude, or Gemini key for WhatsApp AI',
      },
      {
        title: 'Knowledge',
        titleAccent: '+ persona',
        body: 'Answers draw on your imported pages and docs, in your brand voice.',
        image: '/aiii/37.webp',
        imageLabel: 'Store knowledge base and bot persona for catalog-grounded WhatsApp AI',
      },
      {
        title: 'Live',
        titleAccent: 'routing',
        body: 'Inbound WhatsApp hits Intent Detect before or beside Flow Builder, Live Chat takeover still wins and pauses AI.',
        image: '/intent-sub-feature/live-routing.webp?v=8',
        imageLabel: 'Intent Detect live routing into Flow Builder or Live Chat for WhatsApp',
      },
    ],
    stepsTitle: 'How does the brain',
    stepsAccent: 'go live?',
    steps: [
      {
        title: 'Add your key',
        body: 'Intelligence → AI, bring OpenAI, Claude or Gemini. Keyword FAQs still work without a key.',
      },
      {
        title: 'Load knowledge + persona',
        body: 'Policies, docs, tone, and Quick FAQs the bot must respect for India D2C support.',
      },
      {
        title: 'Train intents',
        body: 'Route shipping, returns, COD, and handoff without burning AI tokens on every message.',
      },
      {
        title: 'Activate & hand off',
        body: 'Powers Live Chat fallback and Flow AI nodes, Live Chat takeover pauses AI instantly.',
      },
    ],
    relatedTitle: 'Related in this',
    relatedAccent: 'cluster',
    related: [
      { label: 'AI brain reference', href: '/docs/reference/ai-brain' },
      { label: 'Guide: train the AI brain', href: '/docs/guides/train-your-ai-brain' },
      { label: 'AI WhatsApp chatbot for Shopify India', href: '/blog/ai-whatsapp-chatbot-for-shopify-india' },
      { label: 'AI chatbot playbook (India WhatsApp)', href: '/blog/ai-whatsapp-chatbot-for-shopify-india' },
      { label: 'Intent detection', href: '/features/intent-detection' },
      { label: 'Live Chat', href: '/features' },
      { label: 'Flow Builder', href: '/features/flow-builder' },
    ],
    ctaTitle: 'Run WhatsApp AI on your own keys',
    ctaSub: 'OpenAI, Claude or Gemini, catalog + policies + persona, your model, your spend ceiling.',
  },

  'meta-manager': {
    id: 'meta-manager',
    path: '/features/meta-manager',
    featureSlug: 'meta-manager',
    eyebrow: 'Meta Manager',
    title: 'WhatsApp template approval for Shopify:',
    titleAccent: 'nothing sends until Meta approves',
    subtitle:
      'Templates, catalog and QR codes in one place, and only approved copy reaches a journey or campaign.',
    answerFirst:
      'TopEdge AI Meta Manager handles WhatsApp template approval for Shopify brands in India: write a template, submit it to Meta, track its status and fix rejections. Only approved templates reach journeys and campaigns. Utility templates cost ₹0.1150 per delivered message in India and marketing templates ₹0.8631, at 0% markup.',
    faqs: [
      {
        question: 'Why do WhatsApp templates need Meta approval before sending?',
        answer:
          'Because Meta only delivers approved templates outside the 24-hour service window, and rejected sends hurt your quality rating. Meta Manager shows draft, pending and approved status and blocks live sends until Meta approves.',
      },
      {
        question: 'What template categories matter for Shopify India?',
        answer:
          'Utility covers transactional COD, order, and shipping messages, at ₹0.1150 per delivered message in India. Marketing covers promos and cart recovery offers, at ₹0.8631. Keep categories honest. Meta reviews content against the chosen category, and a utility template rejected as marketing costs 7.5 times as much per send.',
      },
      {
        question: 'Where do approved templates get used?',
        answer:
          'In Journeys, Flow Builder, Campaigns and the Live Chat composer when a chat is outside the 24-hour customer service window.',
      },
      {
        question: 'Do my approved templates survive a platform change?',
        answer:
          'Yes. Templates belong to your WhatsApp Business Account, not to the platform that submitted them. Keep the Meta Business Account in your own name and the library follows you.',
      },
      {
        question: 'Does TopEdge AI build Meta WhatsApp Flows?',
        answer:
          'No. TopEdge AI does not build Meta WhatsApp Flows, the in-chat form screens Meta offers. Flow Builder makes button and list conversations, and Journeys send approved templates on Shopify events.',
      },
    ],
    seoTitle: 'Shopify WhatsApp Template Approvals | Meta Manager',
    seoDescription:
      'Submit, track and approve Meta WhatsApp templates for Shopify India: utility and marketing categories, cart and COD blueprints, catalog and wa.me QR codes.',
    keywords:
      'Meta WhatsApp template manager, WhatsApp Cloud API Shopify India, Meta template approval, WhatsApp utility marketing templates',
    hero: {
      kind: 'image',
      src: '/marketing/customers/customers-outcome-template.png',
      alt: 'TopEdge AI Meta Manager WhatsApp template library with approval status',
      glow: 'indigo',
    },
    outcomesTitle: 'What Meta',
    outcomesAccent: 'requires',
    outcomes: [
      {
        metric: 'Approved',
        label: 'Before Live',
        detail: 'Journeys and campaigns pick green templates only',
      },
      {
        metric: 'Blueprints',
        label: 'Cart · COD · order',
        detail: 'Same packs Journeys use, prefilled mappings',
      },
      {
        metric: 'Catalog',
        label: '+ QR',
        detail: 'Import products; wa.me QR for ads and packaging',
      },
    ],
    bentoTitle: 'Compliance with',
    bentoAccent: 'commerce speed',
    bentoSub: 'Draft → Submit → Approved, then wire into Journeys, Flow Builder, or Campaigns.',
    bentos: [
      {
        titleLead: 'Template',
        titleAccent: 'library',
        body: 'Draft, pending, approved and rejected in one list, with Meta’s rejection reason on the row.',
        image: '/marketing/customers/customers-outcome-template.png',
        imageAlt: 'Meta WhatsApp template library showing draft, pending, approved, and rejected status',
        span: 'third',
      },
      {
        titleLead: 'Blueprints',
        titleAccent: 'for Journeys',
        body: 'Cart recovery, order confirmation and COD to prepaid (Growth and Scale) templates, prefilled with product headers.',
        image: '/campaignn.webp',
        imageAlt: 'WhatsApp Journey blueprints for cart recovery and COD confirmation templates',
        span: 'third',
      },
      {
        titleLead: 'Catalog',
        titleAccent: '& QR',
        body: 'Import from Meta or Shopify, refresh after catalog changes, and download wa.me QR for storefront or ads.',
        image: '/marketing/features/shopify-whatsapp.webp',
        imageAlt: 'Shopify WhatsApp product catalog import and wa.me QR download',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'Meta Manager',
    showcasesSub: 'Library, builder, Blueprints, catalog, QR, approve here before anything sends live.',
    showcases: [
      {
        title: 'Library',
        titleAccent: 'statuses',
        body: 'See draft, pending, approved, and rejected at a glance. Sync from Meta when templates were created outside TopEdge AI.',
        image: '/marketing/customers/customers-outcome-template.png',
        imageLabel: 'Meta Manager library, WhatsApp template draft, pending, and approved statuses',
      },
      {
        title: 'Template',
        titleAccent: 'studio',
        body: 'Named variables like {{first_name}} map to Meta slots on submit. Utility stays transactional, marketing owns promos.',
        image: '',
        imageLabel: 'WhatsApp template studio, body variables, buttons, and Meta category',
      },
      {
        title: 'Catalog',
        titleAccent: '& QR codes',
        body: 'Product catalog for WhatsApp commerce cards; QR tab downloads PNG links that open a chat or catalog on scan.',
        image: '',
        imageLabel: 'WhatsApp catalog import and wa.me QR code download for Shopify',
      },
    ],
    stepsTitle: 'How does a template',
    stepsAccent: 'get Approved?',
    steps: [
      {
        title: 'Create in Library',
        body: 'Pick Marketing, Utility, or Authentication, names in lowercase_with_underscores.',
      },
      {
        title: 'Map variables',
        body: 'Write body + named fields; choose Live product header for cart / COD / order blueprints.',
      },
      {
        title: 'Submit to Meta',
        body: 'Wait minutes to 24h. Fix rejections from the row reason, then resubmit.',
      },
      {
        title: 'Use in automations',
        body: 'Pick Approved templates in Journeys, Flow Builder, or Campaigns, never silent sends on rejected rows.',
      },
    ],
    relatedTitle: 'Related in this',
    relatedAccent: 'cluster',
    related: [
      { label: 'Meta Manager reference', href: '/docs/reference/meta-manager' },
      { label: 'Template categories and rules', href: '/docs/platform/message-templates' },
      // First, deliberately. GSC showed this page absorbing "whatsapp flow
      // template" (106 impressions, 0 clicks) because it out-matched the
      // actual library on the word "template". Someone who lands here wanting
      // example copy should reach /whatsapp-templates in one click.
      { label: 'WhatsApp template library', href: '/whatsapp-templates' },
      { label: 'Meta templates guide', href: '/blog/meta-whatsapp-cloud-api-shopify-templates' },
      { label: 'API pricing India', href: '/blog/whatsapp-business-api-pricing-india' },
      { label: 'WhatsApp journeys', href: '/features/journeys' },
      { label: 'Campaigns', href: '/features/campaigns' },
      { label: 'TopEdge AI vs Gupshup', href: '/compare/gupshup' },
    ],
    ctaTitle: 'Own every Meta approval',
    ctaSub: 'Submit templates, sync status, and only blast what Meta already greenlit.',
  },

  'chat-rules': {
    id: 'chat-rules',
    path: '/features/chat-rules',
    featureSlug: 'chat-rules',
    eyebrow: 'Chat rules',
    title: 'WhatsApp chat routing rules',
    titleAccent: 'for Shopify support teams',
    subtitle:
      'Route COD, refund and VIP chats by rule, so the inbox stays calm when volume triples.',
    answerFirst:
      'TopEdge AI Chat Rules are WhatsApp chat routing rules for Shopify support teams in India. They match keywords and intents such as COD, refund or VIP, then assign the chat to the right teammate or escalate it. Routing, assignment and escalation are on every plan, from ₹1,999/mo on Launch.',
    faqs: [
      {
        question: 'What can chat rules match on?',
        answer:
          'Keywords and intents, such as COD, refund or VIP. A matched chat goes to the right queue or teammate before anyone digs through the inbox.',
      },
      {
        question: 'Do rules work with AI takeover?',
        answer:
          'Yes. Routing lands the chat correctly; Live Chat takeover still pauses AI/flows when an agent takes control.',
      },
      {
        question: 'Are chat rules available on Launch?',
        answer:
          'Yes. Keyword and intent routing, assignment and escalation are on every plan. What Growth and Scale add is Journey Branch and automated COD to prepaid, not inbox routing.',
      },
      {
        question: 'Does a rule keep firing after an agent takes the chat?',
        answer:
          'No. Takeover pauses automation and AI on that thread until it is released, so a customer never gets a bot reply in the middle of a human conversation.',
      },
    ],
    seoTitle: 'WhatsApp Chat Routing Rules for Shopify Teams',
    seoDescription:
      'WhatsApp chat routing rules for Shopify: match COD, refund and VIP keywords or intents, then assign or escalate to the right agent. On every plan.',
    keywords:
      'WhatsApp chat rules Shopify, ecommerce inbox routing India, COD WhatsApp assignment, WhatsApp support routing D2C',
    hero: {
      kind: 'image',
      src: '/marketing/solutions/sol-fashion-inbox.webp',
      alt: 'TopEdge AI chat rules routing WhatsApp conversations to the right Shopify team',
      glow: 'amber',
    },
    outcomesTitle: 'What routing',
    outcomesAccent: 'protects',
    outcomes: [
      {
        metric: 'COD',
        label: 'to ops',
        detail: 'Confirmations land with the right queue',
      },
      {
        metric: 'VIP',
        label: 'skip the line',
        detail: 'High-LTV shoppers route when you say so',
      },
      {
        metric: 'AI',
        label: 'respects takeover',
        detail: 'Rules work with Live Chat pause',
      },
    ],
    bentoTitle: 'Rules that',
    bentoAccent: 'keep the inbox calm',
    bentoSub: 'Assignment, keywords, and escalation, editable in the dashboard when India D2C volume spikes.',
    bentos: [
      {
        titleLead: 'Keyword',
        titleAccent: 'routing',
        body: 'Match COD, refund, or “talk to human” phrases and assign to ops or sales before the queue piles up.',
        image: '/marketing/solutions/sol-fashion-inbox.webp',
        imageAlt: 'WhatsApp keyword routing rules assigning COD and support chats in Live Chat',
        span: 'third',
      },
      {
        titleLead: 'Intent',
        titleAccent: 'handoff',
        body: 'Pair with AI Brain handoff intents so escalation opens the right agent queue with thread history intact.',
        image: '/marketing/features/intent-detection-lead.webp',
        imageAlt: 'Intent detection handoff routing WhatsApp chats to agent queues',
        span: 'third',
      },
      {
        titleLead: 'Assign',
        titleAccent: '& filters',
        body: 'Live Chat status filters (assigned to me, open, needs help) stay aligned with the rules you publish.',
        image: '/marketing/customers/customers-outcome-inbox.webp',
        imageAlt: 'Live Chat assign filters aligned with WhatsApp chat routing rules',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'chat rules',
    showcasesSub: 'Route, assign, escalate, then agents finish in Live Chat with Shopify order context.',
    showcases: [
      {
        title: 'Rule',
        titleAccent: 'builder',
        body: 'Define triggers (keyword, intent, tag) and actions (assign, escalate, pause bot) without redeploying code.',
        image: '',
        imageLabel: 'WhatsApp chat rules builder, triggers and assign actions for Shopify teams',
      },
      {
        title: 'Queue',
        titleAccent: 'assignment',
        body: 'COD confirms and VIP threads land with the right teammate, filters show assigned to me / needs help.',
        image: '/marketing/solutions/sol-fashion-inbox-saas.jpg',
        imageLabel: 'Live Chat queue filters aligned with COD and VIP routing rules',
      },
      {
        title: 'AI +',
        titleAccent: 'takeover',
        body: 'When an agent Takes control, automation and AI pause until Release, rules never fight human replies.',
        image: '/marketing/customers/customers-outcome-inbox.webp',
        imageLabel: 'Live Chat takeover pauses WhatsApp AI while chat rules stay active',
      },
    ],
    stepsTitle: 'How routing',
    stepsAccent: 'goes live',
    steps: [
      {
        title: 'Map the queues',
        body: 'Decide who owns COD, refunds, and VIP, then name the filters agents already use.',
      },
      {
        title: 'Add keyword rules',
        body: 'Match the phrases shoppers actually type; keep utility language separate from promo intent.',
      },
      {
        title: 'Wire AI handoff',
        body: 'Point escalation intents at the same queues so bot and rules agree.',
      },
      {
        title: 'Watch Live Chat',
        body: 'Confirm assigned threads and takeover pause behave under a test spike.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'inbox + AI',
    related: [
      { label: 'Chat rules reference', href: '/docs/reference/chat-rules' },
      { label: 'The 24-hour service window', href: '/docs/platform/whatsapp-service-window' },
      { label: 'Live Chat', href: '/features' },
      { label: 'Intent detection', href: '/features/intent-detection' },
      { label: 'COD confirmation', href: '/blog/how-to-reduce-rto-with-whatsapp-cod-confirmation' },
      { label: 'Shared inbox playbook', href: '/blog/whatsapp-shared-inbox-shopify-order-context' },
    ],
    ctaTitle: 'Keep Live Chat calm at peak',
    ctaSub: 'Route COD and VIP correctly, then let agents finish with Shopify order context.',
  },

  warranty: {
    id: 'warranty',
    path: '/features/warranty',
    featureSlug: 'warranty',
    eyebrow: 'Warranty',
    title: 'Shopify warranty registration',
    titleAccent: 'on WhatsApp, without the spreadsheet',
    subtitle:
      'Registration, claims and status tied to the Shopify order, from one hub.',
    answerFirst:
      'TopEdge AI Warranty runs Shopify warranty registration on WhatsApp for brands in India. Buyers register and track claims on a mobile page with a WhatsApp OTP, and your team assigns and closes each claim against the Shopify order. It is on every plan, and 1,000 registrations cost about ₹115 in Meta fees.',
    faqs: [
      {
        question: 'Can warranty tickets sit next to WhatsApp?',
        answer:
          'Yes. Ops assign and close warranty work in-product while continuing customer care in Live Chat with the same order context.',
      },
      {
        question: 'Who is the warranty hub for?',
        answer:
          'Indian D2C brands that track warranties after purchase and want to stop doing it in a spreadsheet.',
      },
      {
        question: 'Does the customer need an app or a login to register a warranty?',
        answer:
          'No. Registration and claim status run through a mobile page with a WhatsApp OTP, so the buyer uses the number they already ordered with.',
      },
      {
        question: 'Is the warranty hub on every plan?',
        answer:
          'Yes, on Launch, Growth and Scale. It is part of the workspace rather than a paid module.',
      },
      {
        question: 'What does WhatsApp OTP warranty registration cost per customer?',
        answer:
          'One Meta authentication template, which is ₹0.1150 per delivered message on Meta’s published India rate card before 18% GST, billed by Meta directly to your own account at 0% TopEdge AI markup. Claim status updates sent as utility templates cost the same ₹0.1150. Registering 1,000 warranties therefore costs about ₹115 in Meta fees.',
      },
      {
        question: 'Which kinds of brands get the most out of a warranty hub?',
        answer:
          'High-ticket categories where the product outlives the order: electronics, appliances, smart home and lighting. These buyers expect a warranty record, and WhatsApp is where they will ask for it.',
      },
      {
        question: 'Do competing WhatsApp platforms include warranty management?',
        answer:
          'Not natively, on our reading of their public product pages as of 21 October 2026. WATI, AiSensy, Interakt, Bitespeed, Zoko and Updatrr route warranty work to an external CRM, a spreadsheet or custom webhooks. Check each vendor’s live documentation before you rely on it.',
      },
    ],
    seoTitle: 'Shopify Warranty Registration on WhatsApp with OTP',
    seoDescription:
      'Shopify warranty registration on WhatsApp: buyers register with an OTP, claims tie to the order and your team assigns each one. On every plan.',
    keywords:
      'shopify digital warranty registration whatsapp otp india, digital warranty Shopify India, product warranty ecommerce, warranty assignment Shopify, WhatsApp warranty aftercare D2C, warranty OTP WhatsApp India',
    hero: {
      kind: 'image',
      src: '/warranty-sub-feature/manual-assign.webp',
      alt: 'TopEdge AI digital warranty hub and manual assign workspace for Shopify',
      glow: 'emerald',
    },
    bentoTitle: 'Assign without',
    bentoAccent: 'the spreadsheet',
    bentoSub: 'Hub list, unassigned queue, and manual assign, the three surfaces ops actually opens.',
    bentos: [],
    showcasesTitle: 'Inside',
    showcasesAccent: 'Warranty',
    showcasesSub: 'Hub list, unassigned queue, and manual assign, three surfaces, no spreadsheet.',
    showcases: [
      {
        title: 'Warranty',
        titleAccent: 'hub',
        body: 'List view with status badges, create records, set support contacts, and keep every warranty visible in one workspace.',
        image: '/warranty-sub-feature/27.webp',
        imageLabel: 'Digital warranty hub list, batches and status badges for Shopify orders',
      },
      {
        title: 'Unassigned',
        titleAccent: 'list',
        body: 'Warranties that still need an owner sit in an unassigned queue, nothing disappears until someone takes it.',
        image: '/warranty-sub-feature/unassigned.webp',
        imageLabel: 'Unassigned warranty queue waiting for Shopify order or teammate assign',
      },
      {
        title: 'Manual',
        titleAccent: 'assign',
        body: 'Match the claim to the right Shopify order and teammate yourself, without a bot guess.',
        image: '/warranty-sub-feature/2212.webp',
        imageLabel: 'Manual warranty assign to Shopify order or support teammate',
      },
    ],
    stepsTitle: 'How warranty',
    stepsAccent: 'goes live',
    steps: [
      {
        title: 'Connect Shopify',
        body: 'Orders need a live store link so assign can attach to the right purchase.',
      },
      {
        title: 'Open the warranty hub',
        body: 'See every record with status badges in one list, no parallel spreadsheet.',
      },
      {
        title: 'Clear the unassigned queue',
        body: 'Work the ownerless list first so nothing sits without a home.',
      },
      {
        title: 'Assign manually',
        body: 'Attach each warranty to the right order or teammate, you pick, not the bot.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'CRM + Meta',
    related: [
      { label: 'Warranty hub reference', href: '/docs/reference/warranty-hub' },
      { label: 'Guide: warranty registration', href: '/docs/guides/warranty-registration' },
      { label: 'Live Chat', href: '/features' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
      { label: 'Profit & costs', href: '/features/profit-loss' },
      { label: 'Customers', href: '/customers' },
      { label: 'Getgabs alternative (warranty, COD)', href: '/blog/getgabs-alternative-shopify-whatsapp' },
    ],
    ctaTitle: 'Run warranty without a spreadsheet',
    ctaSub: 'Hub list, unassigned queue, and manual assign, tied to Shopify orders.',
  },

  'profit-loss': {
    id: 'profit-loss',
    path: '/features/profit-loss',
    featureSlug: 'profit-loss',
    eyebrow: 'Profit & costs',
    title: 'Shopify profit and loss for India:',
    titleAccent: 'what did you actually keep?',
    subtitle:
      'Net profit after COGS, COD fees, RTO, gateway charges and ad spend, the lines Shopify admin leaves out.',
    answerFirst:
      'TopEdge AI Profit & costs is a Shopify profit and loss app for D2C brands in India. It subtracts COGS, packaging, gateway fees, COD fees, RTO losses and ad spend from your Shopify sales and shows net profit in ₹ as a cost waterfall. A returned COD parcel alone costs ₹180 to ₹240.',
    faqs: [
      {
        question: 'What costs does the P&L include?',
        answer:
          'Product COGS, packaging, payment fees, COD and RTO losses, and marketing. Together they give net profit for an Indian D2C store.',
      },
      {
        question: 'Does Profit & costs send WhatsApp messages?',
        answer:
          'No. It is unit-economics reporting that sits beside your WhatsApp tools, so you do not grow send volume while losing money on COD returns.',
      },
      {
        question: 'Which costs does it subtract before showing net profit?',
        answer:
          'Cost of goods, packaging, payment gateway fees, shipping, COD RTO losses and ad spend. That is the gap between revenue and what finance actually banks, which is why ROAS can look healthy while margin is gone.',
      },
      {
        question: 'Can I see margin per product rather than per store?',
        answer:
          'Yes. The product table shows margin percentage per SKU, which is usually where a single loss-making variant is hiding behind a profitable average.',
      },
      {
        question: 'How do you calculate true net profit per order for an Indian D2C brand?',
        answer:
          'Subtract India-specific costs from net sales: COGS, packaging at about ₹12 to ₹24 a box, freight on volumetric weight, a COD fee of about ₹30 a parcel, amortised RTO loss, gateway fees and acquisition cost. On Amazon Shipping India’s worked ₹799 kurta example, those lines turn ₹85 of visible freight into ₹179 of true cost. Profit & costs builds that waterfall from your own Shopify data.',
      },
      {
        question: 'How much does one RTO order actually cost?',
        answer:
          '₹180 to ₹240 in direct logistics per returned parcel, per Amazon Shipping India: forward and reverse shipping, repackaging and inventory holding. ClickPost puts the fully loaded loss at ₹450 to ₹900 once written-off acquisition spend is counted.',
      },
      {
        question: 'Why is Shopify admin revenue misleading for a COD brand?',
        answer:
          'Because it reports the order, not the outcome. A COD order refused at the door still counts as revenue until it is cancelled, while its freight and ad spend are already gone. Unicommerce recorded festive-quarter COD return rates near 58% against under 15% for prepaid.',
      },
    ],
    seoTitle: 'Shopify Profit and Loss App India: Net Profit After RTO',
    seoDescription:
      'A Shopify profit and loss app for India: net profit after COGS, ₹12 to ₹24 packaging, ₹30 COD fees, ₹180 to ₹240 RTO losses and ad spend, in one waterfall.',
    keywords:
      'Shopify P&L India, shopify india p&l analytics cogs cod rto net profit, ecommerce COGS RTO analytics, COD profit calculator Shopify, true cost per order india, Indian D2C net profit, WhatsApp D2C unit economics',
    hero: {
      kind: 'image',
      src: '/pnl/39.webp',
      alt: 'TopEdge AI Profit & costs net profit dashboard with Indian D2C cost waterfall',
      glow: 'amber',
    },
    bentoTitle: 'Setup once,',
    bentoAccent: 'see real net',
    bentoSub: 'Three-step wizard, then a live dashboard that answers what you kept after Indian D2C costs.',
    bentos: [
      {
        titleLead: 'Products',
        titleAccent: '+ COGS',
        body: 'Enter COGS and packaging, uniform or per product, so margin starts from real unit costs.',
        image: '/pnl/28.webp',
        imageAlt: 'Profit & costs setup, Shopify products with COGS and packaging costs in ₹',
        span: 'third',
      },
      {
        titleLead: 'Fees &',
        titleAccent: 'overhead',
        body: 'Ad spend, gateway %, Shopify fees and optional fixed overhead per order.',
        image: '/pnl/29.webp',
        imageAlt: 'India D2C fee setup, payment gateway, Shopify, and marketing overhead costs',
        span: 'third',
      },
      {
        titleLead: 'COD &',
        titleAccent: 'returns',
        body: 'COD share, delivery cost, RTO rates and the loss on each refused COD order.',
        image: '/pnl/30.webp',
        imageAlt: 'COD and RTO return cost settings for Indian D2C Shopify profit calculation',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'Profit & costs',
    showcasesSub: 'True net profit, cost waterfall, and product margins, periods from today to all synced.',
    showcases: [
      {
        title: 'Net profit',
        titleAccent: 'hero',
        body: 'True net profit in ₹ against the prior period, with revenue, orders, margin and AOV.',
        image: '/pnl/40.webp',
        imageLabel: 'Profit & costs net profit hero KPIs for Shopify India D2C',
      },
      {
        title: 'Cost',
        titleAccent: 'waterfall',
        body: 'Revenue to net profit step by step, with the biggest cost and the COD and RTO drivers called out.',
        image: '/pnl/41.webp',
        imageLabel: 'Profit & costs net profit dashboard with Indian D2C cost waterfall',
      },
      {
        title: 'Product',
        titleAccent: 'table',
        body: 'Revenue, cost, profit and margin per SKU. Products missing COGS sink to the bottom.',
        image: '/pnl/42.webp',
        imageLabel: 'Product profit table with margin % per SKU for Shopify India',
      },
    ],
    proofTable: {
      title: 'The ₹799 kurta:',
      titleAccent: 'what one order really costs',
      intro:
        'Five cost lines separate the freight number you see from the one you pay. Amazon Shipping India works it through on a ₹799 women’s cotton kurta weighing 300g, and this is the waterfall Profit & costs builds from your own Shopify data.',
      columns: ['Cost line', 'Amount', 'How it is arrived at'],
      rows: [
        ['Packaging materials', '₹13', '₹10 poly mailer, ₹2 tape, ₹1 label'],
        [
          'National freight',
          '₹85',
          'Volumetric weight (32 x 25 x 5) / 5,000 = 0.80 kg, billed at the 1 kg slab on a 300g product',
        ],
        ['COD remittance fee', '₹30', 'Standard charge on a cash on delivery order'],
        ['Visible cost', '₹128', 'The three lines above, the ones that appear on an invoice'],
        ['Amortised RTO cost', '₹38', '30% RTO rate x ₹125 incremental reverse cost per return'],
        [
          'Customer support time',
          '₹13',
          '40% touch rate x ₹32 per interaction (20 minutes at ₹96/hr)',
        ],
        ['True total', '₹179', 'More than double the ₹85 the seller thinks they are paying'],
      ],
      emphasise: [3, 6],
      note:
        'Every line read off Amazon Shipping India’s true cost per order breakdown (shipping.amazon.in/blog/true-cost-of-shipping-per-order-india, published 15 July 2026, read 21 October 2026). The 30% RTO assumption sits inside the fashion and apparel band of 25% to 40% published by ClickPost. These are national indicative figures, not your rate card: your courier contract, category and parcel dimensions move every line, which is the reason to compute it from your own data rather than ours.',
      takeaways: [
        'A 300g product gets billed at 1 kg. Volumetric weight did that, not an unfair courier. Rightsizing the mailer is the cheapest margin win available to most apparel brands, and it needs no negotiation with anyone.',
        'RTO is a cost on every order you ship, not only the ones that come back. At a 30% RTO rate each parcel carries ₹38 of amortised return cost, so cutting RTO improves margin on all of your orders at once.',
        'Support time is a real line. ₹32 per WISMO interaction at a 40% touch rate adds ₹13 to every order, which is a margin argument for proactive shipping updates rather than a convenience one.',
      ],
    },
    stepsTitle: 'How Profit & costs',
    stepsAccent: 'gets honest',
    steps: [
      {
        title: 'Run the setup wizard',
        body: 'Products + COGS, fees, then COD & returns, three steps, then recalculate anytime.',
      },
      {
        title: 'Connect Shopify when ready',
        body: 'Sample mode is labeled until the store is live, no fake “live P&L” claim.',
      },
      {
        title: 'Pick a period',
        body: 'Today, 7d, 30d, 90d, or all synced, compare vs prior period in ₹.',
      },
      {
        title: 'Act on findings',
        body: 'Cut SKUs or channels that destroy margin after RTO and ads, edit setup when costs change.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'growth',
    related: [
      { label: 'Commerce reference: margins', href: '/docs/reference/commerce' },
      { label: 'Settings and billing reference', href: '/docs/reference/settings-billing' },
      { label: 'COD confirmation', href: '/blog/how-to-reduce-rto-with-whatsapp-cod-confirmation' },
      { label: '2026 RTO benchmark', href: '/blog/cod-rto-benchmark-india-2026' },
      { label: 'Cart recovery', href: '/features/journeys#abandoned-cart' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
      { label: 'Pricing', href: '/pricing' },
    ],
    ctaTitle: 'See what you kept after costs',
    ctaSub: 'India-aware P&L, COGS, COD, RTO, ads, honest net ₹, not vanity revenue.',
  },

  'intent-detection': {
    id: 'intent-detection',
    path: '/features/intent-detection',
    featureSlug: 'intent-detection',
    eyebrow: 'Intent detection',
    title: 'WhatsApp intent detection',
    titleAccent: 'that routes chats before AI spends tokens',
    subtitle:
      'Read the intent first, then spend AI tokens only where they are needed.',
    answerFirst:
      'TopEdge AI Intent Detection is WhatsApp intent detection for Shopify support teams in India. It matches trained phrases, Hinglish included, to intents such as shipping, returns, COD and handoff, then starts a flow, replies, assigns or escalates. You train 5 to 10 phrases per intent, and the AI model is called only when nothing matches.',
    faqs: [
      {
        question: 'Does intent detection replace AI Brain?',
        answer:
          'No. It sits in front: cheap phrase matching routes obvious intents; AI Brain handles harder questions when a model call is worth it.',
      },
      {
        question: 'Can intents escalate to Live Chat?',
        answer:
          'Yes. Configure handoff intents to assign humans, and Live Chat takeover still pauses bots on that thread.',
      },
      {
        question: 'How does this reduce AI cost?',
        answer:
          'By answering routine questions without the model. Shipping, returns and COD questions are matched by intent and answered by a flow, so the model is only called when a question needs it.',
      },
      {
        question: 'What happens when no intent matches?',
        answer:
          'It falls through to AI Brain if AI is on, or to Live Chat if it is not. Nothing is answered by guessing, and nothing is left unanswered.',
      },
    ],
    seoTitle: 'WhatsApp Intent Detection for Shopify Support',
    seoDescription:
      'WhatsApp intent detection for Shopify: route shipping, returns, COD and handoff chats to the right flow or agent before you spend any AI tokens.',
    keywords:
      'WhatsApp intent detection Shopify, chatbot intent routing India, COD WhatsApp intent, ecommerce chat intent D2C, save AI tokens WhatsApp',
    hero: {
      kind: 'video',
      src: '/marketing/demos/intentt.mp4?v=20260918a',
      poster: '/marketing/demos/intent-poster.jpg?v=20260918a',
      mobileSrc: '/marketing/demos/intent-mobile.mp4',
      label: 'Intent detection routing WhatsApp chats for Shopify India',
      glow: 'sky',
    },
    bentoTitle: 'Intent that',
    bentoAccent: 'steers the bot',
    bentoSub: 'Phrases → confidence → action, start a Flow, reply, assign, or escalate without guessing or burning AI.',
    bentos: [
      {
        titleLead: 'Phrase',
        titleAccent: 'matching',
        body: 'Train 5 to 10 real customer phrases per intent, Hinglish and slang included.',
        image: '/intent-sub-feature/23.webp',
        imageAlt: 'WhatsApp intent phrase matching list with Hinglish training examples',
        span: 'third',
      },
      {
        titleLead: 'Route without',
        titleAccent: 'AI spend',
        body: 'Matched intents start support flows, saving model tokens for catalog questions.',
        image: '/intent-sub-feature/route-without-ai-spend.webp?v=8',
        imageAlt: 'Intent routing that saves WhatsApp AI tokens by matching phrases first',
        span: 'third',
      },
      {
        titleLead: 'Test',
        titleAccent: 'confidence',
        body: 'Hub Test modal shows matched intent and score, fix weak phrases before production WhatsApp traffic.',
        image: '/intent-sub-feature/24.webp',
        imageAlt: 'Intent detection test modal showing confidence score before publish',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'intent',
    showcasesSub: 'List, editor, and live routing, same Intelligence hub as AI Brain.',
    showcases: [
      {
        title: 'Intent',
        titleAccent: 'list',
        body: 'Shipping, Returns, COD confirm, handoff, each with phrases, action, and Active toggle for India D2C support.',
        image: '/intent-sub-feature/34.webp',
        imageLabel: 'WhatsApp intent list, shipping, returns, COD, and handoff for Shopify',
      },
      {
        title: 'Editor',
        titleAccent: '& actions',
        body: 'Reply text, start a Flow, assign agent, or escalate. Set once, match forever while Active.',
        image: '/intent-sub-feature/35.webp',
        imageLabel: 'Intent editor, phrases and routing action for WhatsApp chatbot flows',
      },
      {
        title: 'Live',
        titleAccent: 'routing',
        body: 'Inbound WhatsApp hits the intent engine before or beside Flow Builder, Live Chat takeover still pauses AI and wins.',
        image: '/intent-sub-feature/live-routing.webp?v=8',
        imageLabel: 'Live intent match routing into Flow Builder or Live Chat for WhatsApp',
      },
    ],
    stepsTitle: 'How intent',
    stepsAccent: 'goes live',
    steps: [
      {
        title: 'Create intents',
        body: 'Name the jobs India D2C shoppers ask: shipping, returns, COD, talk to human.',
      },
      {
        title: 'Add real phrases',
        body: 'Write how customers actually ask, Hinglish welcome. Split broad intents when confidence is low.',
      },
      {
        title: 'Set actions',
        body: 'Fixed reply, Flow start, assign, or escalate, then toggle Active.',
      },
      {
        title: 'Test & publish',
        body: 'Use the Test modal, then watch Live Chat and Flow Builder respect the routes, takeover still pauses AI.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'AI + flows',
    related: [
      { label: 'Go-live checklist', href: '/docs/go-live-checklist' },
      { label: 'Troubleshooting', href: '/docs/troubleshooting' },
      { label: 'AI Brain', href: '/features/ai-brain' },
      { label: 'Flow Builder', href: '/features/flow-builder' },
      { label: 'Live Chat', href: '/features' },
      { label: 'Chat rules', href: '/features/chat-rules' },
      { label: 'AI chatbot playbook (India WhatsApp)', href: '/blog/ai-whatsapp-chatbot-for-shopify-india' },
    ],
    ctaTitle: 'Route WhatsApp by intent, save AI for hard questions',
    ctaSub: 'Match shipping, returns, and COD phrases first. Pair with AI Brain when shoppers need catalog answers.',
  },


  'cod-confirmation': {
    id: 'cod-confirmation',
    path: '/features/cod-confirmation',
    eyebrow: 'COD confirmation',
    // Owns "shopify cod app" (PLAN-AND-LOG 3b, row 2): exact keyword leads the title and H1.
    title: 'Shopify COD app',
    titleAccent: 'that confirms orders on WhatsApp',
    subtitle:
      'Every cash on delivery buyer confirms on WhatsApp before you ship, so RTO falls and COD can turn into prepaid.',
    answerFirst:
      'COD confirmation is the Shopify COD app module of TopEdge AI, all-in-one D2C software for Shopify stores. It messages every cash on delivery buyer on WhatsApp the moment the order lands, so you ship only confirmed orders. It is on every plan.',
    faqs: [
      {
        question: 'How do I confirm COD orders on WhatsApp in Shopify?',
        answer:
          'Connect Shopify and your WhatsApp Business account, then publish the COD confirmation journey. It triggers on every new cash on delivery order and sends a Meta-approved template with Confirm and Cancel buttons. The step-by-step setup is in the COD confirmation guide in our docs.',
      },
      {
        question: 'Does COD confirmation reduce RTO?',
        answer:
          'It stops you shipping orders that were never going to be accepted, such as impulse, duplicate or mistaken orders. It cannot fix RTO caused by failed deliveries or wrong addresses, so measure your own RTO before and after rather than trusting a headline number.',
      },
      {
        question: 'What happens if the customer does not reply?',
        answer:
          'You decide. Send one follow-up, then hold the order, call the buyer or dispatch anyway, according to the rule you set in the journey.',
      },
      {
        question: 'Can I convert COD orders to prepaid on WhatsApp?',
        answer:
          'Yes, on the Growth and Scale plans. TopEdge AI sends a WhatsApp payment link created from a Shopify draft invoice, so the buyer can pay now instead of in cash. The Launch plan includes COD confirmation only.',
      },
      {
        question: 'How much does WhatsApp COD confirmation cost?',
        answer:
          'COD confirmation is on every TopEdge AI plan, from ₹1,999 a month plus GST on the website or $19 a month on the Shopify App Store. Meta bills its own message fee on your Meta account at 0% TopEdge AI markup: a confirmation is a utility template at ₹0.1150 per delivered message in India, so confirming 500 COD orders costs ₹57.50.',
      },
    ],
    seoTitle: 'Shopify COD App: Confirm COD Orders on WhatsApp | TopEdge AI',
    seoDescription:
      'Shopify COD app that confirms every cash on delivery order on WhatsApp before dispatch, at ₹0.115 a message against ₹180 to ₹240 lost per RTO.',
    keywords:
      'Shopify COD app, COD app Shopify, COD verification Shopify, WhatsApp COD confirmation Shopify, COD confirmation WhatsApp India, reduce RTO Shopify, COD to prepaid WhatsApp',
    hero: {
      kind: 'video',
      src: '/marketing/feature-clips/home/cod.mp4?v=20261119d',
      poster: '/marketing/feature-clips/home/cod-poster.jpg?v=20261119d',
      // Phones play the same 16:9 film (the portrait home cut crops badly in
      // this frame); setting mobileSrc is what lets phones autoplay it.
      mobileSrc: '/marketing/feature-clips/home/cod.mp4?v=20261119d',
      label: 'A Shopify cash on delivery order confirmed on WhatsApp in TopEdge AI',
      glow: 'emerald',
    },
    bentoTitle: 'Confirm, convert,',
    bentoAccent: 'then ship',
    bentoSub: 'Three jobs on every COD order, before it reaches the courier.',
    bentos: [
      {
        titleLead: 'Confirm',
        titleAccent: 'on WhatsApp',
        body: 'Each COD order gets a Meta-approved message with Confirm and Cancel buttons the moment it is placed.',
        image: '/marketing/solutions/sol-cod-confirm-saas.webp',
        imageAlt: 'Shopify COD order awaiting confirmation, with the WhatsApp message asking the buyer to confirm COD or switch to prepaid',
      },
      {
        titleLead: 'COD to',
        titleAccent: 'prepaid',
        body: 'A WhatsApp payment link from a Shopify draft invoice turns a COD order into a paid one. Growth and Scale.',
        image: '/marketing/solutions/sol-cod-prepaid-saas.jpg',
        imageAlt: 'COD to prepaid on WhatsApp: confirm, prepaid offer and paid steps with a payment link in the chat',
      },
      {
        titleLead: 'Branch by',
        titleAccent: 'reply',
        body: 'COD, prepaid and no-reply orders each take their own path, so a silent buyer gets a different step, not the same message.',
        image: '/journey-sub-feature/11.webp?v=20261115a',
        imageAlt: 'Journey branch for a Shopify order: payment is COD, payment is prepaid, or no reply',
      },
    ],
    showcasesTitle: 'Built in',
    showcasesAccent: 'Journeys',
    showcases: [
      {
        title: 'One journey,',
        titleAccent: 'your rules',
        body: 'COD confirmation is a ready journey in the builder: trigger on a COD order, send the template, wait, then branch. You set the wait times and what happens when nobody replies.',
        image: '/docs/img/journey-cod.webp',
        imageLabel: 'TopEdge AI journey builder with the COD confirmation journey for Shopify',
      },
    ],
    proofTable: {
      title: 'What one confirmation',
      titleAccent: 'costs',
      columns: ['Line', 'Cost'],
      rows: [
        ['WhatsApp utility confirmation, Meta India rate', '₹0.1150 per delivered message'],
        ['Confirming 500 COD orders', '₹57.50'],
        ['One returned COD parcel: forward, reverse, repack and holding', '₹180 to ₹240'],
        ['TopEdge AI plan with COD confirmation', 'From ₹1,999/mo + GST, or $19/mo on the App Store'],
      ],
      emphasise: [1, 2],
      note: 'Meta’s India utility rate from its WhatsApp pricing documentation, re-read 16 November 2026. Parcel cost lines from Amazon Shipping India and ClickPost, read 21 October 2026: national indicative ranges, not customer results. Website plans are billed in INR; App Store plans are billed by Shopify in USD.',
    },
    stepsTitle: 'How it',
    stepsAccent: 'goes live',
    steps: [
      { title: 'Connect Shopify and WhatsApp', body: 'Shopify by OAuth, and your own WhatsApp Business account through Meta.' },
      { title: 'Get the template approved', body: 'Meta approves the confirmation template; journeys cannot send it before that.' },
      { title: 'Publish the COD journey', body: 'Every new COD order is asked to confirm, and you ship what is confirmed.' },
    ],
    relatedTitle: 'Read',
    relatedAccent: 'next',
    related: [
      { label: 'COD confirmation setup guide', href: '/docs/guides/cod-confirmation' },
      { label: 'Journeys', href: '/features/journeys' },
      { label: 'Profit & costs', href: '/features/profit-loss' },
      { label: 'How to reduce RTO with COD confirmation', href: '/blog/how-to-reduce-rto-with-whatsapp-cod-confirmation' },
      { label: 'COD to prepaid on WhatsApp', href: '/blog/cod-to-prepaid-whatsapp-shopify-india' },
      { label: 'Pricing', href: '/pricing' },
    ],
    ctaTitle: 'Ship only the COD orders buyers confirm',
    ctaSub: '14 days, 20 orders, no card. Connect Shopify and WhatsApp, approve one template, go live.',
  },
};

export function getProductPage(id: ProductPageId): ProductPage {
  return PRODUCT_PAGES[id];
}

export function getProductPageByPath(path: string): ProductPage | undefined {
  return Object.values(PRODUCT_PAGES).find((p) => p.path === path);
}

export function getProductPageByFeatureSlug(slug: string): ProductPage | undefined {
  return Object.values(PRODUCT_PAGES).find((p) => p.featureSlug === slug);
}

export const PRODUCT_FEATURE_SLUGS = new Set(
  Object.values(PRODUCT_PAGES)
    .map((p) => p.featureSlug)
    .filter(Boolean) as string[]
);
