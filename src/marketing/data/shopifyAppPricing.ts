/**
 * The second way to pay: TopEdge on the Shopify App Store.
 *
 * Two doors, by design (see docs/shopify-app-store-submission-notes.md in the
 * app repo). A signup on topedgeai.com is billed by Razorpay in INR, the prices
 * in billingCatalog.ts. An install from the Shopify App Store is billed by
 * Shopify through Shopify App Pricing, which Shopify only lets an app price in
 * USD ("Plan prices are set in USD only", shopify.dev, read 9 Nov 2026).
 * Shopify converts the charge for stores billed in INR and adds a 1.5%
 * currency exchange fee to converted app charges (help.shopify.com, read
 * 9 Nov 2026).
 *
 * Same plans, same limits, same features on both doors; only the currency and
 * the biller differ. Change these numbers only after changing them in the
 * Shopify Partner Dashboard, and re-read the listing for the INR estimates.
 */
export const SHOPIFY_APP_PRICING = {
  listingUrl: 'https://apps.shopify.com/topedge-ai',
  read: '9 Nov 2026',
  plans: [
    { slug: 'launch', name: 'Launch', monthlyUsd: 19, yearlyUsd: 182, monthlyInrEstimate: '₹1,785.53' },
    { slug: 'growth', name: 'Growth', monthlyUsd: 39, yearlyUsd: 374, monthlyInrEstimate: '₹3,665.03' },
    { slug: 'scale', name: 'Scale', monthlyUsd: 65, yearlyUsd: 624, monthlyInrEstimate: '₹6,108.39' },
  ],
} as const;

/** One sentence used wherever the site states what TopEdge costs. */
export const TWO_DOORS_LINE =
  'On topedgeai.com you pay in INR through Razorpay, from ₹1,999 a month plus 18% GST. Install from the Shopify App Store instead and Shopify bills the same plans in USD, from $19 a month; TopEdge AI adds no GST to App Store charges.';
