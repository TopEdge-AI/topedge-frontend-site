/** Every public URL uses the marketing shell, including unknown paths / 404s. */
export function isMarketingRoute(_pathname: string): boolean {
  return true;
}

/**
 * Static landing pages: plain HTML in public/<path>/index.html, built by
 * scripts/generate-landing-pages.mjs and served by Netlify, with no React route.
 * Keep in step with STATIC_LANDING_PATHS in scripts/marketing-urls.mjs.
 * A client-side <Link> to one of these finds no route, so links must load the
 * page from the server (footer) and the 404 page reloads once if it lands here.
 */
export const STATIC_LANDING_PATHS = [
  '/whatsapp-app-for-shopify',
  '/whatsapp-abandoned-cart-recovery-app',
  '/shopify-whatsapp-order-notifications',
  '/rto-reduction-shopify',
  '/shopify-whatsapp-integration',
] as const;

export function isStaticLandingPath(pathname: string): boolean {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return (STATIC_LANDING_PATHS as readonly string[]).includes(clean);
}

export { DASH_SIGNUP, DASH_LOGIN, DASH_ORIGIN } from './lib/billingCatalog';
