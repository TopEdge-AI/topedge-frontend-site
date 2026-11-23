import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import '../styles/partners.css';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import {
  COMPANY_ADDRESS_ONE_LINE,
  COMPANY_BRAND_NAME,
  COMPANY_CONSTITUTION,
  COMPANY_GOVERNING_LAW,
  COMPANY_GSTIN,
  COMPANY_LEGAL_NAME,
  COMPANY_VENUE,
} from '../legal/companyIdentity';
import {
  PARTNER_COOKIE_DAYS,
  PARTNER_EMAIL,
  PARTNER_HOLD_DAYS,
  PARTNER_PAYOUT_DAY,
  PARTNER_TIERS,
  PARTNERS_PATH,
  PARTNERS_TERMS_PATH,
  pct,
  tierRangeLabel,
} from '../data/partners';

/**
 * Partner Terms, DRAFT for the lawyer and the CA (spec 9.8, 11.4).
 *
 * noindex, out of the sitemap and llms until approved. Bracketed text marks
 * points the founder or the lawyer still has to decide. There is no money-back
 * clause: TopEdge AI gives no money back on payments (founder, 2026-11-21).
 */
const SEO = {
  title: 'TopEdge AI Partner Terms: draft under legal review',
  description:
    'Draft terms for the TopEdge AI Partner Program: referral tracking, commission tiers, the check period, payouts, taxes and promotion rules.',
};

type Section = { id: string; title: string; body: ReactNode };

export default function PartnersTermsPage() {
  const sections: Section[] = [
    {
      id: 'parties',
      title: 'Parties and eligibility',
      body: (
        <>
          <p>
            These Partner Terms are an agreement between {COMPANY_LEGAL_NAME}, a {COMPANY_CONSTITUTION.toLowerCase()}{' '}
            with its principal place of business at {COMPANY_ADDRESS_ONE_LINE} (GSTIN {COMPANY_GSTIN}), which runs{' '}
            {COMPANY_BRAND_NAME} (&quot;we&quot;, &quot;us&quot;), and the person or business that creates a partner
            account (&quot;you&quot;).
          </p>
          <p>
            You must be at least 18 and able to enter a contract under Indian law. One partner account is allowed per
            person or business. The details you give us must be accurate, and you must keep them up to date.
          </p>
        </>
      ),
    },
    {
      id: 'accounts',
      title: 'Accounts and security',
      body: (
        <p>
          You are responsible for keeping your sign-in details safe and for what happens in your account. Tell us at{' '}
          {PARTNER_EMAIL} straight away if you think someone else has access to it. Your partner code can be set
          once and cannot be changed after that.
        </p>
      ),
    },
    {
      id: 'tracking',
      title: 'How referrals are tracked',
      body: (
        <>
          <p>
            A referral is recorded when a visitor opens one of your partner links and creates a new{' '}
            {COMPANY_BRAND_NAME} account within {PARTNER_COOKIE_DAYS} days of their most recent partner click. If
            the visitor clicked links from more than one partner, the most recent click counts. A merchant can also
            type your partner code at sign-up, and a typed code takes precedence over a link.
          </p>
          <p>
            Only new accounts can be referred. An account that already exists cannot be attributed to you later. We
            decide attribution from our records, and we may correct an attribution that was made in error and
            record the reason.
          </p>
        </>
      ),
    },
    {
      id: 'commission',
      title: 'Commission',
      body: (
        <>
          <p>Your rate depends on how many of your referred clients have qualified as paying clients:</p>
          <ul>
            {PARTNER_TIERS.map((t, i) => (
              <li key={t.minClients}>
                {tierRangeLabel(i)}: {pct(t.rateBp)}
              </li>
            ))}
          </ul>
          <p>
            A client qualifies once their first payment has cleared the {PARTNER_HOLD_DAYS}-day check period. When
            you reach a new tier, the higher rate applies to payments made after that moment. A tier you have
            reached is never lowered, even if clients cancel later.
          </p>
          <p>
            Commission is calculated on the amount of each payment before GST, and it recurs on every payment the
            client makes while they stay on a paid plan. Each commission goes through a {PARTNER_HOLD_DAYS}-day
            check period, then it is approved.
          </p>
          <p>
            Eligible payments are payments for paid plans billed directly by {COMPANY_BRAND_NAME} in rupees, and
            offline payments we have confirmed. Free trials, plans billed through Shopify&apos;s app billing,
            complimentary or internal accounts, and accounts linked to you do not earn commission.
          </p>
        </>
      ),
    },
    {
      id: 'cancelled-invoices',
      title: 'Cancelled invoices and fraud',
      body: (
        <p>
          If a payment&apos;s invoice is cancelled, no commission is due on it. If a commission comes from fraud or
          from a breach of these terms, we may withhold it or cancel it.
        </p>
      ),
    },
    {
      id: 'payouts',
      title: 'Payouts',
      body: (
        <>
          <p>
            On day {PARTNER_PAYOUT_DAY} of every month (India time) we pay all commissions approved up to the end of
            the previous month. There is no minimum payout. We pay by UPI or bank transfer to a payout method in
            your name that we have verified against your KYC details.
          </p>
          <p>
            A new or changed payout method can receive payouts only after 72 hours have passed and we have verified
            it. If a transfer fails, the amount returns to your approved balance and is included in the next payout.
            Approved earnings wait for you, without expiry, until you add your payout and tax details.
          </p>
        </>
      ),
    },
    {
      id: 'taxes',
      title: 'Taxes',
      body: (
        <>
          <p>
            You need a PAN to be paid. We deduct TDS where the law requires it and give you a statement for every
            payout showing the gross amount, the tax deducted and the net amount. [Rates, thresholds and sections to
            be confirmed by our CA.]
          </p>
          <p>
            If you are registered for GST, you must give us your GSTIN and an invoice for each payout. You are
            responsible for your own income tax and GST filings.
          </p>
        </>
      ),
    },
    {
      id: 'promotion',
      title: 'Promotion rules',
      body: (
        <>
          <p>When you promote {COMPANY_BRAND_NAME} you must:</p>
          <ul>
            <li>describe the product honestly and from your own experience;</li>
            <li>not make earnings or results claims we cannot back up;</li>
            <li>not send spam or unsolicited bulk messages;</li>
            <li>not bid on {COMPANY_BRAND_NAME} trademarks or brand terms in paid search, or use them in domain names;</li>
            <li>not use coupon sites or cookie stuffing, or set a referral cookie without a real click;</li>
            <li>not offer incentives that lead people to sign up or report in a misleading way;</li>
            <li>not present yourself as {COMPANY_BRAND_NAME} or as speaking for us.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'self-referral',
      title: 'Self-referral and fraud',
      body: (
        <p>
          You cannot refer your own store, or accounts linked to you, your company or your payout details. Fake or
          duplicate accounts are not allowed. We run automated checks and reviews, and commissions under review are
          frozen until the review ends. We are not obliged to pay earnings we cannot verify.
        </p>
      ),
    },
    {
      id: 'suspension',
      title: 'Suspension and termination',
      body: (
        <>
          <p>
            We may suspend your account if we suspect fraud or a breach of these terms. While it is suspended, your
            links stop attributing new sign-ups, your commissions are frozen and your payouts are paused.
          </p>
          <p>
            You can close your account at any time. When an account is closed, its approved balance is paid once and
            then payouts stop. [Treatment of pending and approved balances after termination for breach to be
            confirmed by our lawyer.]
          </p>
        </>
      ),
    },
    {
      id: 'privacy',
      title: 'Data protection and privacy',
      body: (
        <>
          <p>
            We collect only what we need to run the program and to pay you: your name, email, partner code, PAN,
            payout details and, if you have one, your GSTIN. Payout details are stored encrypted and shown to you
            masked.
          </p>
          <p>
            Payment, payout, KYC and statement records are kept for 8 years for tax and audit purposes [period to be
            confirmed by our CA]. Click counts are kept for 13 months. If you ask us to delete your data, we pay any
            approved balance once, erase your personal data and payout details, and keep the payment records with an
            anonymised reference.
          </p>
          <p>
            Partner links set a first-party cookie named te_ref in the visitor&apos;s browser for{' '}
            {PARTNER_COOKIE_DAYS} days. It holds your partner code, the link name, the click time and the page the
            visitor landed on. Our <a href="/privacy">Privacy Policy</a> applies to everything else.
          </p>
        </>
      ),
    },
    {
      id: 'changes',
      title: 'Changes to the program',
      body: (
        <p>
          We may change rates, tiers or these terms. A change applies only to payments made after it takes effect,
          never to commissions already recorded. We will email you [notice period to be confirmed] before a change to
          rates or tiers takes effect.
        </p>
      ),
    },
    {
      id: 'liability',
      title: 'Liability and independence',
      body: (
        <p>
          The program is provided as it is. To the extent the law allows, our total liability to you under these
          terms is limited to commissions that are approved and unpaid. You act as an independent business. Nothing
          in these terms makes you our employee or agent, and you cannot make commitments on our behalf. Keep any
          non-public information we share with you about the program confidential.
        </p>
      ),
    },
    {
      id: 'law',
      title: 'Governing law and jurisdiction',
      body: (
        <p>
          These terms are governed by {COMPANY_GOVERNING_LAW}. Disputes are subject to the exclusive jurisdiction of{' '}
          {COMPANY_VENUE}.
        </p>
      ),
    },
    {
      id: 'contact',
      title: 'Contact',
      body: (
        <p>
          Write to <a href={`mailto:${PARTNER_EMAIL}`}>{PARTNER_EMAIL}</a>, or by post to {COMPANY_LEGAL_NAME},{' '}
          {COMPANY_ADDRESS_ONE_LINE}.
        </p>
      ),
    },
  ];

  return (
    <>
      <MarketingSEO title={SEO.title} description={SEO.description} path={PARTNERS_TERMS_PATH} noSuffix noIndex />
      <MarketingPage className="mkt-pterms">
        <div className="mkt-pterms__inner">
          <p className="mkt-pterms__crumb">
            <Link to={PARTNERS_PATH}>Partner program</Link> / Terms
          </p>
          <h1 className="mkt-pterms__title">Partner Terms</h1>
          <div className="mkt-pterms__draft" role="note">
            <strong>Draft, under legal review.</strong> This is a working draft for our lawyer and CA. It is not yet
            the final agreement and may change before the program opens. Text in square brackets is still to be
            decided.
          </div>
          <nav className="mkt-pterms__toc" aria-label="Contents">
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="mkt-pterms__section" aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`}>
                {i + 1}. {s.title}
              </h2>
              {s.body}
            </section>
          ))}
        </div>
      </MarketingPage>
    </>
  );
}
