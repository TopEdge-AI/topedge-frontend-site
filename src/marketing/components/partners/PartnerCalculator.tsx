import { useEffect, useId, useState } from 'react';
import PriceRoll from '../pricing/PriceRoll';
import { inrAmountFromLabel, type CatalogPlan } from '../../lib/billingCatalog';
import {
  CALC_DEFAULT_CLIENTS,
  CALC_DEFAULT_PLAN,
  CALC_MAX_CLIENTS,
  CALC_MIN_CLIENTS,
  PARTNER_TIERS,
  formatInr,
  monthlyCommission,
  nextTierFor,
  pct,
  tierFor,
} from '../../data/partners';

const DEBOUNCE_MS = 300;

function clientsLabel(n: number) {
  return `${n} ${n === 1 ? 'client' : 'clients'}`;
}

/**
 * "What could you earn?" (spec 9.4).
 *
 * The first render is the default (5 clients on Growth), so the prerendered
 * HTML carries the real default figures as text. The result region is
 * aria-live and only updates 300 ms after the slider stops moving. PriceRoll
 * already renders an instant change under prefers-reduced-motion.
 */
export default function PartnerCalculator({ plans }: { plans: CatalogPlan[] }) {
  const sliderId = useId();
  const planName = useId();
  const [clients, setClients] = useState(CALC_DEFAULT_CLIENTS);
  const [settled, setSettled] = useState(CALC_DEFAULT_CLIENTS);
  const [planSlug, setPlanSlug] = useState(CALC_DEFAULT_PLAN);

  useEffect(() => {
    if (clients === settled) return;
    const t = window.setTimeout(() => setSettled(clients), DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [clients, settled]);

  const plan = plans.find((p) => p.slug === planSlug) ?? plans[0];
  const price = Number(inrAmountFromLabel(plan?.monthlyPriceLabel || '')) || 0;
  const monthly = monthlyCommission(settled, price);
  const rate = pct(tierFor(settled).tier.rateBp);
  const next = nextTierFor(settled);
  const monthlyLabel = formatInr(monthly);
  const yearLabel = formatInr(monthly * 12);
  const span = CALC_MAX_CLIENTS - CALC_MIN_CLIENTS;
  const markers = PARTNER_TIERS.filter((t) => t.minClients > CALC_MIN_CLIENTS);

  return (
    <div className="mkt-pcalc" aria-labelledby={`${sliderId}-title`} role="group">
      <div className="mkt-pcalc__top">
        <h2 className="mkt-pcalc__title" id={`${sliderId}-title`}>
          What could you earn?
        </h2>
        <span className="mkt-ppill">Example figures</span>
      </div>

      <div className="mkt-pcalc__field">
        <div className="mkt-pcalc__label-row">
          <label htmlFor={sliderId} className="mkt-pcalc__label">
            Paying clients
          </label>
          <output htmlFor={sliderId} className="mkt-pcalc__count">
            {clients}
          </output>
        </div>
        <div className="mkt-pcalc__range-wrap">
          <input
            id={sliderId}
            type="range"
            className="mkt-pcalc__range"
            min={CALC_MIN_CLIENTS}
            max={CALC_MAX_CLIENTS}
            step={1}
            value={clients}
            aria-valuetext={clientsLabel(clients)}
            onChange={(e) => setClients(Number(e.target.value))}
            style={{ ['--fill' as string]: `${((clients - CALC_MIN_CLIENTS) / span) * 100}%` }}
          />
          <div className="mkt-pcalc__marks" aria-hidden>
            {markers.map((t) => (
              <span
                key={t.minClients}
                className="mkt-pcalc__mark"
                style={{ left: `${((t.minClients - CALC_MIN_CLIENTS) / span) * 100}%` }}
              >
                {t.minClients}
              </span>
            ))}
          </div>
        </div>
      </div>

      <fieldset className="mkt-pcalc__field mkt-pcalc__plans">
        <legend className="mkt-pcalc__label">Their plan</legend>
        <div className="mkt-pcalc__seg">
          {plans.map((p) => (
            <label key={p.slug} className={`mkt-pcalc__opt${p.slug === plan?.slug ? ' is-on' : ''}`}>
              <input
                type="radio"
                name={planName}
                value={p.slug}
                checked={p.slug === plan?.slug}
                onChange={() => {
                  setPlanSlug(p.slug);
                  setSettled(clients);
                }}
              />
              <span>{p.displayName}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mkt-pcalc__result" aria-live="polite" aria-atomic="true">
        <p className="mkt-pcalc__amount">
          <span aria-hidden>
            <PriceRoll value={monthlyLabel} size="lg" replayKey={`${settled}-${plan?.slug}`} />
          </span>
          <span className="sr-only">{monthlyLabel}</span>
          <span className="mkt-pcalc__per">per month</span>
        </p>
        <div className="mkt-pcalc__stats">
          <p className="mkt-pcalc__chip">
            Your rate: <strong>{rate}</strong>
          </p>
          <p className="mkt-pcalc__year">
            In your first year: <strong>{yearLabel}</strong>
          </p>
        </div>
        {next ? (
          <p className="mkt-pcalc__next">
            At {next.minClients} clients your rate becomes {pct(next.rateBp)}
          </p>
        ) : null}
      </div>

      <p className="mkt-pcalc__note">
        Based on {clientsLabel(settled)} on {plan?.displayName} at {formatInr(price)} a month before GST, all
        paying monthly. It is an illustration: your earnings depend on clients who actually pay.
      </p>
    </div>
  );
}
