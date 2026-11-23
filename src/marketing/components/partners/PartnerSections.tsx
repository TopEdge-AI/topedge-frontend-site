import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import PricingSectionHead from '../pricing/PricingSectionHead';
import { inrAmountFromLabel, type CatalogPlan } from '../../lib/billingCatalog';
import {
  PARTNER_HOLD_DAYS,
  PARTNER_RATE_RANGE,
  PARTNER_TIERS,
  formatInr,
  pct,
  tierRangeLabel,
} from '../../data/partners';

const ease = [0.16, 0.84, 0.22, 1] as const;

function isPrerender() {
  return (
    typeof window !== 'undefined' &&
    Boolean((window as Window & { __TOPEDGE_PRERENDER__?: boolean }).__TOPEDGE_PRERENDER__)
  );
}

/** Fade and rise once on entering the viewport. Off under reduced motion and in the prerender. */
export function Reveal({
  children,
  className,
  id,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion || isPrerender()) {
    return (
      <section className={className} id={id} aria-labelledby={labelledBy}>
        {children}
      </section>
    );
  }
  return (
    <motion.section
      className={className}
      id={id}
      aria-labelledby={labelledBy}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease }}
    >
      {children}
    </motion.section>
  );
}

const priceOf = (plans: CatalogPlan[], slug: string) =>
  Number(inrAmountFromLabel(plans.find((p) => p.slug === slug)?.monthlyPriceLabel || '')) || 0;

/* ——— 2. Facts strip ——— */
export function PartnerFacts() {
  const facts = [
    { fig: PARTNER_RATE_RANGE, line: 'Recurring on every paid month, for as long as the client stays' },
    { fig: '1st', line: 'Every approved commission is paid out on the 1st of the month' },
    { fig: '₹0', line: 'Minimum payout. Any amount is paid' },
    { fig: 'UPI or bank', line: 'Choose how you want to be paid' },
  ];
  return (
    <section className="mkt-pfacts" aria-label="The offer in four facts">
      <ul className="mkt-pfacts__list">
        {facts.map((f) => (
          <li key={f.fig} className="mkt-pfacts__item">
            <span className="mkt-pfacts__fig">{f.fig}</span>
            <span className="mkt-pfacts__line">{f.line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ——— 3. Why recommend TopEdge AI ——— */
export function PartnerWhy({ plans, trialDays }: { plans: CatalogPlan[]; trialDays: number }) {
  const launch = plans.find((p) => p.slug === 'launch') ?? plans[0];
  const points = [
    {
      title: 'Brands can try it first',
      body: `Every new account gets a ${trialDays}-day free trial, so you never ask a client to pay before they have seen it work.`,
    },
    {
      title: 'Built for how Indian stores sell',
      body: 'Every plan is priced in rupees and includes COD confirmation, GST invoices and the WhatsApp Cloud API connection.',
    },
    {
      title: 'Prices you can quote',
      body: `Plans start at ${launch?.monthlyPriceLabel} a month before GST and are listed on the pricing page, so there is nothing to negotiate.`,
    },
  ];
  return (
    <Reveal className="mkt-psection" labelledBy="partners-why">
      <PricingSectionHead
        id="partners-why"
        eyebrow="Why recommend it"
        title="Easy to recommend,"
        highlight="easy to explain"
        sub="TopEdge AI is all-in-one D2C software for Shopify stores, built as one suite. It brings cart recovery, COD confirmation and COD to prepaid, WhatsApp and email journeys, campaigns, a shopper CRM, live chat, opt-in tools, a tracking pixel and profit reporting into one platform."
      />
      <div className="mkt-pwhy">
        {points.map((p, i) => (
          <article key={p.title} className="mkt-pwhy__card">
            <span className="mkt-pwhy__num" aria-hidden>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mkt-pwhy__title">{p.title}</h3>
            <p className="mkt-pwhy__body">{p.body}</p>
          </article>
        ))}
      </div>
      <p className="mkt-psection__link">
        <Link to="/pricing">
          See the plans <ArrowRight size={15} aria-hidden />
        </Link>
      </p>
    </Reveal>
  );
}

/* ——— 4. Tier ladder ——— */
export function PartnerTierLadder() {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion && !isPrerender();
  const maxBp = Math.max(...PARTNER_TIERS.map((t) => t.rateBp));
  const [, t2, t3] = PARTNER_TIERS;
  return (
    <Reveal className="mkt-psection" labelledBy="partners-tiers">
      <PricingSectionHead
        id="partners-tiers"
        eyebrow="Your rate"
        title="The more clients you bring,"
        highlight="the higher your rate"
        sub="Your rate is based on how many clients have paid through your links."
      />
      <div className="mkt-pladder-card">
        <ol className="mkt-pladder">
          {PARTNER_TIERS.map((t, i) => (
            <li
              key={t.minClients}
              className={`mkt-pladder__step mkt-pladder__step--${i + 1}${i === PARTNER_TIERS.length - 1 ? ' is-top' : ''}`}
            >
              <div className="mkt-pladder__track" aria-hidden>
                <motion.span
                  className="mkt-pladder__bar"
                  style={{ height: `${Math.max(38, (t.rateBp / maxBp) * 100)}%`, originY: 1 }}
                  initial={animate ? { scaleY: 0 } : false}
                  whileInView={animate ? { scaleY: 1 } : undefined}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease }}
                >
                  <span className="mkt-pladder__bar-rate">{pct(t.rateBp)}</span>
                </motion.span>
              </div>
              <div className="mkt-pladder__meta">
                <span className="mkt-pladder__tier">Tier {i + 1}</span>
                <p className="sr-only">{pct(t.rateBp)} commission</p>
                <p className="mkt-pladder__range">{tierRangeLabel(i)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="mkt-pladder__copy">
        <p>
          When you reach {t2.minClients} paying clients your rate becomes {pct(t2.rateBp)} on every one of your
          clients&apos; payments from then on. At {t3.minClients} clients it becomes {pct(t3.rateBp)}. Your rate
          never goes down, even if a client cancels later.
        </p>
        <p className="mkt-pladder__small">
          A client counts toward your rate once their first payment has cleared the {PARTNER_HOLD_DAYS}-day check
          period.
        </p>
      </div>
    </Reveal>
  );
}

/* ——— 6. How it works ——— */
export function PartnerSteps() {
  const steps = [
    {
      title: 'Join and get your link.',
      body: 'Create a free partner account. Your tracked link is ready as soon as the account is active, and you can make a separate one for each client or channel.',
    },
    {
      title: 'Share TopEdge AI your way.',
      body: 'Send it to a client, add it to a video description, put it in a proposal. Your link is remembered in the visitor’s browser for 90 days, so a sign-up in that time is recorded against you.',
    },
    {
      title: 'Get paid on the 1st.',
      body: `Every payment from a referred client earns you commission. After a ${PARTNER_HOLD_DAYS}-day check period it is approved, and it is paid out on the 1st of the next month by UPI or bank transfer.`,
    },
  ];
  return (
    <Reveal className="mkt-psection" labelledBy="partners-steps">
      <PricingSectionHead id="partners-steps" eyebrow="How it works" title="From first link to" highlight="first payout" />
      <ol className="mkt-psteps">
        {steps.map((s, i) => (
          <li key={s.title} className="mkt-psteps__item">
            <span className="mkt-psteps__num" aria-hidden>
              {i + 1}
            </span>
            <h3 className="mkt-psteps__title">{s.title}</h3>
            <p className="mkt-psteps__body">{s.body}</p>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

/* ——— 7. How and when you get paid ——— */
const ordinal = (n: number) => {
  const v = n % 100;
  const suf = v >= 11 && v <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] || 'th';
  return `${n}${suf}`;
};

const shortDate = (d: Date) =>
  d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' });

export function PartnerPayouts({ plans }: { plans: CatalogPlan[] }) {
  const growth = plans.find((p) => p.slug === 'growth') ?? plans[0];
  const commission = (priceOf(plans, growth?.slug || '') * PARTNER_TIERS[0].rateBp) / 10000;
  // A fixed worked example: a payment on 12 Nov, approved after the check period, paid on the 1st after that.
  const paid = new Date(Date.UTC(2026, 10, 12));
  const approved = new Date(paid.getTime() + PARTNER_HOLD_DAYS * 86400000);
  const payout = new Date(Date.UTC(approved.getUTCFullYear(), approved.getUTCMonth() + 1, 1));
  const cutoff = 31 - PARTNER_HOLD_DAYS;
  const timeline = [
    { when: shortDate(paid), what: `A client pays ${growth?.monthlyPriceLabel} for the ${growth?.displayName} plan` },
    {
      when: 'Same day',
      what: `Your commission of ${formatInr(commission)} (${pct(PARTNER_TIERS[0].rateBp)}) is recorded and starts its ${PARTNER_HOLD_DAYS}-day check period`,
    },
    { when: shortDate(approved), what: 'Approved' },
    { when: shortDate(payout), what: 'Paid to your UPI or bank account' },
  ];
  const rules = [
    'Commission is calculated on the amount before GST.',
    'Only paid plans earn commission. Free trials do not.',
    `Each commission goes through a ${PARTNER_HOLD_DAYS}-day check period, then it is approved.`,
    `Payments made after about the ${ordinal(cutoff)} usually fall into the following month’s payout, because of the ${PARTNER_HOLD_DAYS}-day check period.`,
    'We deduct TDS where the law requires it and give you a statement for every payout.',
    'Clients who subscribe through Shopify’s own app billing are not covered yet.',
  ];
  return (
    <Reveal className="mkt-psection" id="payouts" labelledBy="partners-payouts">
      <PricingSectionHead
        id="partners-payouts"
        eyebrow="Payouts"
        title="No guesswork about"
        highlight="your money"
      />
      <div className="mkt-ppay">
        <div className="mkt-ppay__timeline">
          <span className="mkt-ppill">Example</span>
          <ol>
            {timeline.map((t) => (
              <li key={t.what}>
                <span className="mkt-ppay__when">{t.when}</span>
                <span className="mkt-ppay__what">{t.what}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mkt-ppay__rules">
          <ul>
            {rules.map((r) => (
              <li key={r}>
                <Check size={16} strokeWidth={2.4} aria-hidden className="mkt-ppay__tick" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="mkt-ppay__note">
            You will need your PAN and bank or UPI details before your first payout. Your approved earnings wait
            for you until you add them.
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* ——— 8. What you get ——— */
export function PartnerTools() {
  const items = [
    'A tracked link for every client or channel, with clicks, sign-ups and earnings for each.',
    'QR codes and ready-to-send messages for WhatsApp, email and LinkedIn.',
    'One place to see every referral and exactly where each commission stands.',
    'Monthly payout statements you can use for your own accounts.',
  ];
  return (
    <Reveal className="mkt-psection" labelledBy="partners-tools">
      <PricingSectionHead id="partners-tools" eyebrow="What you get" title="Tools that make" highlight="sharing simple" />
      <ul className="mkt-ptools">
        {items.map((t) => (
          <li key={t} className="mkt-ptools__item">
            <Check size={18} strokeWidth={2.4} aria-hidden className="mkt-ptools__tick" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
