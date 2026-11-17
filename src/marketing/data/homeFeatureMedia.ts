/**
 * Homepage feature videos + CRM / identity stills.
 */

export type DemoVideo = {
  src: string;
  poster: string;
  /** Smaller encode for phones; when set, mobile autoplays in-view (no Play tap). */
  mobileSrc?: string;
};

const CART: DemoVideo = {
  src: '/marketing/demos/cart-recovery.mp4',
  poster: '/marketing/demos/cart-recovery-poster.jpg',
  mobileSrc: '/marketing/demos/cart-recovery-mobile.mp4',
};

const COD: DemoVideo = {
  src: '/marketing/demos/cod-prepaid11.mp4?v=20260918a',
  poster: '/marketing/demos/cod-prepaid-poster.jpg?v=20260918a',
  mobileSrc: '/marketing/demos/cod-prepaid-mobile.mp4',
};

const FLOW: DemoVideo = {
  src: '/marketing/demos/flowwww1.mp4?v=20260918a',
  poster: '/marketing/demos/flow-builder-poster.jpg?v=20260918a',
  mobileSrc: '/marketing/demos/flow-builder-mobile.mp4',
};

const INTENT: DemoVideo = {
  src: '/marketing/demos/intentt.mp4?v=20260918a',
  poster: '/marketing/demos/intent-poster.jpg?v=20260918a',
  mobileSrc: '/marketing/demos/intent-mobile.mp4',
};

const OPTIN: DemoVideo = {
  src: '/marketing/demos/opt-in.mp4?v=20260918a',
  poster: '/marketing/demos/optin-popup-poster.jpg?v=20260918a',
  mobileSrc: '/marketing/demos/opt-in-mobile.mp4',
};

const SEGMENT: DemoVideo = {
  src: '/marketing/demos/segment.mp4',
  poster: '/marketing/demos/segment-poster.jpg',
  mobileSrc: '/marketing/demos/segment-mobile.mp4',
};

/**
 * Code-rendered feature films (video/, docs/video/feature-library): one per home
 * story, 1600x900 with a 960x540 phone encode. They replace the old dashboard
 * screen recordings and stills.
 */
const film = (name: string): DemoVideo => ({
  src: `/marketing/feature-clips/home/${name}.mp4?v=20261117a`,
  mobileSrc: `/marketing/feature-clips/home/${name}-mobile.mp4?v=20261117a`,
  poster: `/marketing/feature-clips/home/${name}-poster.jpg?v=20261117a`,
});

/** Flip once public/marketing/feature-clips/home/ holds every film. */
const FILMS_READY = false;

const HOME_FILMS_READY = {
  cart: film('cart'),
  campaigns: film('campaigns'),
  optin: film('optin'),
  pixel: film('pixel'),
  cod: film('cod'),
  flow: film('flow'),
  intent: film('intent'),
  identity: film('identity'),
  segments: film('segments'),
  profit: film('profit'),
} as const;

/** Until the films ship, each story keeps the media it had. */
const LEGACY: Record<keyof typeof HOME_FILMS_READY, DemoVideo> = {
  cart: CART,
  campaigns: CART,
  optin: OPTIN,
  pixel: CART,
  cod: COD,
  flow: FLOW,
  intent: INTENT,
  identity: SEGMENT,
  segments: SEGMENT,
  profit: COD,
};

export const HOME_FILMS = FILMS_READY ? HOME_FILMS_READY : LEGACY;

/** Feature moments, video demos. */
export const FEATURE_VIDEOS = {
  cart: CART,
  cod: COD,
  shopifyTools: FLOW,
  campaigns: CART,
  optin: OPTIN,
  intent: INTENT,
  segmentation: SEGMENT,
} as const;

/** Feature moments that use a still instead of video. */
export const FEATURE_IMAGES = {
  campaigns: {
    src: '/campaignn.webp?v=20260921lcp',
  },
  unifiedIdentity: {
    src: '/leaadd.webp?v=20260921lcp',
  },
  pixel: {
    src: '/website-pixel.webp?v=20260921lcp',
  },
  /** Same still as the /features/profit-loss hero. */
  profit: {
    src: '/pnl/39.webp',
  },
} as const;

export const CRM_BENTO = {
  orders: {
    id: 'orders',
    titleLead: 'Orders &',
    titleAccent: 'care',
    body: 'Track shipments and warranty claims without leaving WhatsApp.',
    image: '/1.webp?v=20260921lcp',
  },
  profiles: {
    id: 'profiles',
    titleLead: 'Customer',
    titleAccent: 'profiles',
    body: 'Live carts, order value and recovery status in one table.',
    image: '/2.webp?v=20260921lcp',
  },
  stock: {
    id: 'stock',
    titleLead: 'Live',
    titleAccent: 'stock',
    body: 'SKU availability and low-stock alerts, synced from Shopify.',
    image: '/3.webp?v=20260921lcp',
  },
} as const;
