import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BadgeCheck, Check, Gauge, Info, Link2, Users, Wallet } from 'lucide-react';
import PartnerDashboardPreview from './PartnerDashboardPreview';
import { inrAmountFromLabel, type CatalogPlan } from '../../lib/billingCatalog';
import {
  PARTNER_COOKIE_DAYS,
  PARTNER_HOLD_DAYS,
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
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, ease }}
    >
      {children}
    </motion.section>
  );
}

/** Section heading: two short lines, the second in muted ink, plus one line of copy. */
export function SecHead({
  id,
  title,
  muted,
  sub,
  center = false,
}: {
  id: string;
  title: string;
  muted?: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={`pk-head${center ? ' pk-head--center' : ''}`}>
      <h2 className="pk-head__title" id={id}>
        {title}
        {muted ? (
          <>
            <br />
            <span className="pk-head__muted">{muted}</span>
          </>
        ) : null}
      </h2>
      {sub ? <p className="pk-head__sub">{sub}</p> : null}
    </div>
  );
}

/* ——— Logo strip ——— */
const LOGOS = [
  { name: 'Delitech Smart Home', src: '/trust/delitech-white.png' },
  { name: 'Apex Light', src: '/trust/apex-white.png' },
  { name: 'ajeeb', src: '/trust/ajeeb-black.png' },
  { name: 'Ecom', src: '/trust/ecom-black.png' },
  { name: 'Oleez Online', src: '/trust/oleez-black.png' },
];

export function PartnerLogos() {
  return (
    <section className="pk-row pk-logos" aria-label="Shopify brands that use TopEdge AI">
      <p className="pk-logos__label">Used by Shopify brands across India</p>
      <ul className="pk-logos__list">
        {LOGOS.map((l) => (
          <li key={l.name}>
            <img src={l.src} alt={l.name} loading="lazy" decoding="async" />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ——— Stats grid ——— */
export function PartnerStats() {
  const top = PARTNER_TIERS[PARTNER_TIERS.length - 1];
  const stats = [
    { fig: `${PARTNER_TIERS[0].rateBp / 100}–${pct(top.rateBp)}`, label: 'Recurring commission' },
    { fig: '₹0', label: 'Minimum payout' },
    { fig: '1st', label: 'Paid every month' },
    { fig: `${PARTNER_COOKIE_DAYS} days`, label: 'Link tracking window' },
  ];
  return (
    <section className="pk-row" aria-label="The offer in four numbers">
      <ul className="pk-stats">
        {stats.map((s) => (
          <li key={s.label} className="pk-stats__item">
            <span className="pk-stats__fig">{s.fig}</span>
            <span className="pk-stats__label">{s.label}</span>
          </li>
        ))}
      </ul>
      <p className="pk-stats__note">
        <BadgeCheck size={16} aria-hidden />
        Reach {top.minClients} paying clients for {pct(top.rateBp)}. Agencies with volume can ask for a custom rate.
      </p>
    </section>
  );
}

/* ——— Why partners recommend it ——— */
export function PartnerValue({ plans, trialDays }: { plans: CatalogPlan[]; trialDays: number }) {
  const launch = plans.find((p) => p.slug === 'launch') ?? plans[0];
  const points = [
    {
      icon: Users,
      title: 'A natural fit for your work.',
      body: 'Build stores, run ads or advise brands? Recommend the suite that runs their WhatsApp.',
    },
    {
      icon: Gauge,
      title: 'Easy for brands to say yes.',
      body: `${trialDays}-day free trial and flat rupee plans from ${launch?.monthlyPriceLabel}/mo. Nothing to negotiate.`,
    },
    {
      icon: Link2,
      title: 'Every referral tracked.',
      body: 'Your own links, with clicks, sign-ups and commission for each one in a single dashboard.',
    },
    {
      icon: Wallet,
      title: 'Paid on the 1st, every month.',
      body: 'By UPI or bank transfer, with no minimum and a statement for every payout.',
    },
  ];
  return (
    <Reveal className="pk-sec" labelledBy="partners-why">
      <SecHead
        id="partners-why"
        title="A good recommendation."
        muted="A lasting income."
        sub="You help Shopify brands pick the right tools. We make it worth your while."
      />
      <div className="pk-value">
        <div className="pk-frame">
          <div className="pk-frame__inner">
            <p className="pk-frame__title">
              One referral.
              <br />
              Every payment after.
            </p>
            <PartnerDashboardPreview plans={plans} />
          </div>
        </div>
        <ul className="pk-points">
          {points.map(({ icon: Icon, title, body }) => (
            <li key={title} className="pk-points__item">
              <span className="pk-points__icon" aria-hidden>
                <Icon size={18} strokeWidth={2} />
              </span>
              <div>
                <h3 className="pk-points__title">{title}</h3>
                <p className="pk-points__body">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/* ——— Tier ladder ——— */
export function PartnerTierLadder() {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion && !isPrerender();
  const maxBp = Math.max(...PARTNER_TIERS.map((t) => t.rateBp));
  return (
    <Reveal className="pk-sec" labelledBy="partners-tiers">
      <SecHead
        id="partners-tiers"
        title="Bring more brands."
        muted="Earn a higher rate."
        sub="Your rate rises with your paying clients and never goes down."
      />
      <ol className="pk-tiers">
        {PARTNER_TIERS.map((t, i) => (
          <li key={t.minClients} className={`pk-tiers__item pk-tiers__item--${i + 1}`}>
            <div className="pk-tiers__track" aria-hidden>
              <motion.span
                className="pk-tiers__bar"
                style={{ height: `${Math.max(40, (t.rateBp / maxBp) * 100)}%`, originY: 1 }}
                initial={animate ? { scaleY: 0 } : false}
                whileInView={animate ? { scaleY: 1 } : undefined}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease }}
              />
            </div>
            <p className="pk-tiers__rate">{pct(t.rateBp)}</p>
            <p className="pk-tiers__range">{tierRangeLabel(i)}</p>
          </li>
        ))}
      </ol>
      <p className="pk-tiers__note">
        <Info size={14} aria-hidden />A client counts once their first payment clears the {PARTNER_HOLD_DAYS}-day check
        period. Your new rate applies to all your clients from then on.
      </p>
    </Reveal>
  );
}

/* ——— How it works ——— */
export function PartnerSteps() {
  const steps = [
    { title: 'Join free', body: 'Create a partner account. Your link is ready in minutes.' },
    {
      title: 'Share your link',
      body: `Send it to clients, add it to videos or proposals. Sign-ups within ${PARTNER_COOKIE_DAYS} days count.`,
    },
    {
      title: 'Get paid on the 1st',
      body: `Each payment clears a ${PARTNER_HOLD_DAYS}-day check, then lands in your UPI or bank.`,
    },
  ];
  return (
    <Reveal className="pk-sec" labelledBy="partners-steps">
      <SecHead id="partners-steps" title="From first link" muted="to first payout." />
      <ol className="pk-steps">
        {steps.map((s, i) => (
          <li key={s.title} className="pk-steps__item">
            <span className="pk-steps__num" aria-hidden>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="pk-steps__title">{s.title}</h3>
            <p className="pk-steps__body">{s.body}</p>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

/* ——— Payouts ——— */
const shortDate = (d: Date) =>
  d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' });

export function PartnerPayouts({ plans }: { plans: CatalogPlan[] }) {
  const growth = plans.find((p) => p.slug === 'growth') ?? plans[0];
  const price = Number(inrAmountFromLabel(growth?.monthlyPriceLabel || '')) || 0;
  const commission = (price * PARTNER_TIERS[0].rateBp) / 10000;
  // A fixed worked example: paid on 12 Nov, approved after the check period, paid out on the next 1st.
  const paid = new Date(Date.UTC(2026, 10, 12));
  const approved = new Date(paid.getTime() + PARTNER_HOLD_DAYS * 86400000);
  const payout = new Date(Date.UTC(approved.getUTCFullYear(), approved.getUTCMonth() + 1, 1));
  const timeline = [
    { when: shortDate(paid), what: `Client pays ${growth?.monthlyPriceLabel} for ${growth?.displayName}` },
    { when: 'Same day', what: `${formatInr(commission)} commission recorded` },
    { when: shortDate(approved), what: 'Approved after the check period' },
    { when: shortDate(payout), what: 'Paid to your UPI or bank' },
  ];
  const rules = [
    'Commission is on the amount before GST.',
    'Only paid plans earn. Free trials do not.',
    'TDS is deducted where the law requires it.',
    'Shopify app billing sign-ups are not covered yet.',
  ];
  return (
    <Reveal className="pk-sec" id="payouts" labelledBy="partners-payouts">
      <SecHead id="partners-payouts" title="Clear money," muted="on a clear date." />
      <div className="pk-pay">
        <ol className="pk-pay__timeline" aria-label="Example payout timeline">
          {timeline.map((t, i) => (
            <li key={t.what} className={i === timeline.length - 1 ? 'is-last' : undefined}>
              <span className="pk-pay__when">{t.when}</span>
              <span className="pk-pay__what">{t.what}</span>
            </li>
          ))}
        </ol>
        <ul className="pk-pay__rules">
          {rules.map((r) => (
            <li key={r}>
              <Check size={16} strokeWidth={2.4} aria-hidden />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
