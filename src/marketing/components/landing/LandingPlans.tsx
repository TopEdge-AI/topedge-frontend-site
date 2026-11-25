import { Link } from 'react-router-dom';
import { FALLBACK_CATALOG, GST_FOOTNOTE, TRIAL } from '../../lib/billingCatalog';
import { SHOPIFY_APP_PRICING } from '../../data/shopifyAppPricing';

/**
 * The three plans with both ways to pay, for landing pages.
 *
 * Prices and order caps come from the same catalog /pricing seeds from, and the
 * USD figures from the App Store table, so a landing page cannot quote a price
 * the pricing page does not. Monthly figures only: an ad visitor compares the
 * monthly number, and /pricing carries the quarterly and yearly views.
 */
export default function LandingPlans({ intro }: { intro?: string }) {
  const usd = new Map<string, number>(SHOPIFY_APP_PRICING.plans.map((p) => [p.slug, p.monthlyUsd]));

  return (
    <section className="mkt-lp-plans" aria-labelledby="lp-plans-head">
      <header className="mkt-topic__sec-head">
        <h2 className="mkt-topic__sec-title" id="lp-plans-head">
          What it <span className="mkt-hl">costs</span>
        </h2>
        <p className="mkt-topic__sec-sub">
          {intro ??
            `Flat monthly plans by orders, plus Meta’s own fee per message with no markup. Free for ${TRIAL.days} days, ${TRIAL.orders} orders and ${TRIAL.sends} sends, no card.`}
        </p>
      </header>
      <ul className="mkt-lp-plans__grid">
        {FALLBACK_CATALOG.plans.map((plan) => (
          <li key={plan.slug} className={`mkt-lp-plan${plan.emphasis ? ' mkt-lp-plan--pick' : ''}`}>
            <p className="mkt-lp-plan__name">{plan.displayName}</p>
            <p className="mkt-lp-plan__price">
              {plan.monthlyPriceLabel}
              <span> / month incl. GST</span>
            </p>
            <p className="mkt-lp-plan__usd">or ${usd.get(plan.slug)} a month on the Shopify App Store</p>
            <ul className="mkt-lp-plan__facts">
              <li>Up to {plan.ordersPerCycle.toLocaleString('en-IN')} orders a month</li>
              <li>{plan.campaignEmailSendsPerCycle.toLocaleString('en-IN')} campaign and email sends</li>
              <li>COD confirmation{plan.features.journeyCodPrepaid ? ', COD to prepaid and branching' : ''}</li>
            </ul>
          </li>
        ))}
      </ul>
      <p className="mkt-lp-plans__note">
        On topedgeai.com you pay in INR ({GST_FOOTNOTE}). Install from the{' '}
        <a href={SHOPIFY_APP_PRICING.listingUrl} target="_blank" rel="noopener noreferrer">
          Shopify App Store
        </a>{' '}
        and Shopify bills the same plans in USD. <Link to="/pricing">Full pricing</Link>
      </p>
    </section>
  );
}
