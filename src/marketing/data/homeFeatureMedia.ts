/**
 * Homepage feature films + CRM bento stills.
 */

export type DemoVideo = {
  src: string;
  poster: string;
  /** Smaller encode for phones; when set, mobile autoplays in-view (no Play tap). */
  mobileSrc?: string;
  /** Poster for the phone encode; its presence marks the phone encode as portrait 4:5. */
  mobilePoster?: string;
};

/**
 * Code-rendered launch films (video/, src/comps/launch*.tsx): one per home story,
 * 1600x900 on desktop and a portrait 720x900 cut composed for phones.
 */
const V = '20261119c';
const film = (name: string): DemoVideo => ({
  src: `/marketing/feature-clips/home/${name}.mp4?v=${V}`,
  mobileSrc: `/marketing/feature-clips/home/${name}-mobile.mp4?v=${V}`,
  poster: `/marketing/feature-clips/home/${name}-poster.jpg?v=${V}`,
  mobilePoster: `/marketing/feature-clips/home/${name}-mobile-poster.jpg?v=${V}`,
});

export const HOME_FILMS = {
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
