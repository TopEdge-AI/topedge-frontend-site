/**
 * TopEdge AI Partner Program: the offer, in one place.
 *
 * This is the only file on the site that holds the commission tiers and the
 * payout rules. The /partners page, its calculator, its FAQ and the terms
 * draft all read from here, and `node scripts/check-partner-offer.mjs` (in
 * build:netlify) checks these values against the partner service's
 * GET /v1/public/policy when it is reachable.
 *
 * Founder decisions (2026-11-21): 20% for 1 to 4 paying clients, 30% for 5 to
 * 9, 40% for 10 or more, never lowered. 7-day check period, paid on the 1st,
 * no minimum. TopEdge AI gives no money back on payments, so partner copy never
 * mentions it (check:partner-offer fails the build if it does).
 *
 * Prices are never typed here: they come from lib/billingCatalog.ts.
 */
import { COMPANY_EMAIL } from '../legal/companyIdentity';


export type PartnerTier = {
  /** Qualified paying clients needed for this tier. */
  minClients: number;
  /** Rate in basis points (2000 = 20%). Same unit as the partner service. */
  rateBp: number;
};

export const PARTNER_TIERS: readonly PartnerTier[] = [
  { minClients: 1, rateBp: 2000 },
  { minClients: 5, rateBp: 3000 },
  { minClients: 10, rateBp: 4000 },
];

/** Days each commission spends in the check period before it is approved. */
export const PARTNER_HOLD_DAYS = 7;
/** Day of the month payouts are made (Asia/Kolkata). */
export const PARTNER_PAYOUT_DAY = 1;
/** Days a partner link is remembered in the visitor's browser (te_ref cookie). */
export const PARTNER_COOKIE_DAYS = 90;

export const PARTNER_PORTAL_URL = 'https://partners.topedgeai.com';
export const PARTNER_PORTAL_HOST = 'partners.topedgeai.com';
export const PARTNER_SIGNUP_URL = `${PARTNER_PORTAL_URL}/signup?from=partners-page`;
/** One inbox for everything: the partner program uses the company address, with no separate partner mailbox. */
export const PARTNER_EMAIL = COMPANY_EMAIL;

export const PARTNERS_PATH = '/partners';
export const PARTNERS_TERMS_PATH = '/partners/terms';

/** Calculator range (spec 9.4). */
export const CALC_MIN_CLIENTS = 1;
export const CALC_MAX_CLIENTS = 30;
export const CALC_DEFAULT_CLIENTS = 5;
export const CALC_DEFAULT_PLAN = 'growth';

export function pct(rateBp: number): string {
  return `${rateBp / 100}%`;
}

/** Lowest and highest rate, for "20% to 40%". */
export const PARTNER_MIN_RATE = pct(Math.min(...PARTNER_TIERS.map((t) => t.rateBp)));
export const PARTNER_MAX_RATE = pct(Math.max(...PARTNER_TIERS.map((t) => t.rateBp)));
export const PARTNER_RATE_RANGE = `${PARTNER_MIN_RATE} to ${PARTNER_MAX_RATE}`;

/** Highest tier whose minClients <= count; the lowest tier when none qualifies. */
export function tierFor(count: number): { tier: PartnerTier; index: number } {
  let index = 0;
  PARTNER_TIERS.forEach((t, i) => {
    if (t.minClients <= count && t.minClients >= PARTNER_TIERS[index].minClients) index = i;
  });
  return { tier: PARTNER_TIERS[index], index };
}

/** The next tier above `count`, or null at the top. */
export function nextTierFor(count: number): PartnerTier | null {
  const { index } = tierFor(count);
  return PARTNER_TIERS[index + 1] ?? null;
}

/** "1 to 4 paying clients", "10 or more paying clients". */
export function tierRangeLabel(index: number): string {
  const t = PARTNER_TIERS[index];
  const next = PARTNER_TIERS[index + 1];
  return next ? `${t.minClients} to ${next.minClients - 1} paying clients` : `${t.minClients} or more paying clients`;
}

/** Rupee amount for display: ₹5,998.50, ₹71,982. */
export function formatInr(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  const hasPaise = Math.round(rounded * 100) % 100 !== 0;
  return `₹${rounded.toLocaleString('en-IN', {
    minimumFractionDigits: hasPaise ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

/** Commission on `clients` clients each paying `priceInr` a month before GST. */
export function monthlyCommission(clients: number, priceInr: number): number {
  return (clients * priceInr * tierFor(clients).tier.rateBp) / 10000;
}
