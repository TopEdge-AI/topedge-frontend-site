import { inrAmountFromLabel, type CatalogPlan } from '../../lib/billingCatalog';
import { PARTNER_TIERS, formatInr } from '../../data/partners';

/**
 * A static picture of the partner portal, drawn in HTML and CSS from the data
 * below. Every business name is made up and every amount is derived from the
 * catalog price at the first-tier rate. It carries a visible "Example figures"
 * pill because none of it is a real partner's account.
 */
const PREVIEW = {
  link: 'topedgeai.com/?via=yourstudio',
  referrals: [
    { name: 'Example Store', plan: 'growth', status: 'Paying' },
    { name: 'Sample Apparel Co', plan: 'launch', status: 'Paying' },
    { name: 'Demo Home Goods', plan: 'scale', status: 'Trial' },
  ],
  /** Which referrals' latest payments sit in each money bucket. */
  money: [
    { label: 'In check period', plans: ['growth'] },
    { label: 'Approved', plans: ['launch'] },
    { label: 'Paid', plans: ['growth', 'launch'] },
  ],
} as const;

export default function PartnerDashboardPreview({ plans }: { plans: CatalogPlan[] }) {
  const rateBp = PARTNER_TIERS[0].rateBp;
  const commissionFor = (slug: string) => {
    const p = plans.find((x) => x.slug === slug);
    return ((Number(inrAmountFromLabel(p?.monthlyPriceLabel || '')) || 0) * rateBp) / 10000;
  };
  const planName = (slug: string) => plans.find((x) => x.slug === slug)?.displayName ?? slug;

  return (
    <figure className="mkt-pdash" aria-label="Example of the partner dashboard">
      <div className="mkt-pdash__bar">
        <span className="mkt-pdash__dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="mkt-pdash__title">Partner dashboard</span>
        <span className="mkt-ppill">Example figures</span>
      </div>

      <dl className="mkt-pdash__money">
        {PREVIEW.money.map((m) => (
          <div key={m.label} className="mkt-pdash__cell">
            <dt>{m.label}</dt>
            <dd>{formatInr(m.plans.reduce((sum, s) => sum + commissionFor(s), 0))}</dd>
          </div>
        ))}
      </dl>

      <div className="mkt-pdash__list">
        <p className="mkt-pdash__list-head">Referrals</p>
        <ul>
          {PREVIEW.referrals.map((r) => (
            <li key={r.name} className="mkt-pdash__row">
              <span className="mkt-pdash__avatar" aria-hidden>
                {r.name.charAt(0)}
              </span>
              <span className="mkt-pdash__who">
                <span className="mkt-pdash__name">{r.name}</span>
                <span className="mkt-pdash__plan">{planName(r.plan)} plan</span>
              </span>
              <span className={`mkt-pdash__status mkt-pdash__status--${r.status.toLowerCase()}`}>
                {r.status}
              </span>
              <span className="mkt-pdash__amt">
                {r.status === 'Paying' ? `${formatInr(commissionFor(r.plan))} a month` : 'No commission yet'}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <figcaption className="mkt-pdash__link">
        <span className="mkt-pdash__link-label">Your link</span>
        <code>{PREVIEW.link}</code>
      </figcaption>
    </figure>
  );
}
