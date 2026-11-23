import {
  PARTNER_COOKIE_DAYS,
  PARTNER_EMAIL,
  PARTNER_HOLD_DAYS,
  PARTNER_PORTAL_HOST,
  PARTNER_TIERS,
  pct,
} from '../../data/partners';

const [T1, T2, T3] = PARTNER_TIERS;

/**
 * /partners FAQ. The same array renders the visible accordion and the FAQPage
 * JSON-LD, so the two can never disagree. Tier numbers and the check period
 * come from data/partners.ts. TopEdge AI gives no money back on payments, so
 * nothing here may promise or describe one (check:partner-offer enforces it).
 */
export const PARTNER_FAQS: { question: string; answer: string }[] = [
  {
    question: 'Who can join?',
    answer:
      'Agencies, freelancers, creators, community owners and Shopify consultants. Anyone who recommends tools to online store owners is welcome. You sign up yourself, with no application.',
  },
  {
    question: 'Is it free to join?',
    answer: 'Yes. There is no fee and no minimum number of referrals.',
  },
  {
    question: 'How much can I earn?',
    answer: `${pct(T1.rateBp)} of every referred client's payment (before GST) while you have ${T1.minClients} to ${T2.minClients - 1} paying clients, ${pct(T2.rateBp)} from ${T2.minClients}, and ${pct(T3.rateBp)} from ${T3.minClients}.`,
  },
  {
    question: 'How does the rate move up?',
    answer: `It is based on how many clients have paid through your links. A client counts once their first payment has cleared the ${PARTNER_HOLD_DAYS}-day check period. Once you reach a level you keep it.`,
  },
  {
    question: 'For how long do I earn on a client?',
    answer: 'For every payment they make while they stay on a paid plan.',
  },
  {
    question: 'When and how do I get paid?',
    answer:
      'On the 1st of every month we pay everything approved up to the end of the previous month, by UPI or bank transfer.',
  },
  {
    question: 'Is there a minimum payout?',
    answer: 'No. Any amount is paid.',
  },
  {
    question: `What is the ${PARTNER_HOLD_DAYS}-day check period?`,
    answer: `Each commission goes through a ${PARTNER_HOLD_DAYS}-day check period, then it is approved. In that time we confirm the payment went through and the referral follows the Partner Terms.`,
  },
  {
    question: 'How are referrals tracked?',
    answer: `Your link stores a small cookie in the visitor's browser for ${PARTNER_COOKIE_DAYS} days. If they create a new TopEdge AI account in that time, the account is attributed to you. If a visitor clicks links from two partners, the most recent one counts.`,
  },
  {
    question: 'Can I refer my own store?',
    answer: 'No. Accounts linked to you, your company or your payout details are not eligible.',
  },
  {
    question: 'Do I need a company or a GST number?',
    answer:
      'No. You need a PAN to be paid. If you are registered for GST we will ask for your GSTIN and an invoice for each payout.',
  },
  {
    question: 'Are taxes deducted?',
    answer:
      'We deduct TDS where the law requires it. Every payout has a statement showing the gross amount, the tax deducted and the net amount.',
  },
  {
    question: 'Do referred clients get a discount?',
    answer: 'Not at the moment.',
  },
  {
    question: 'What are the rules for promoting TopEdge AI?',
    answer:
      'Describe the product honestly and from your own experience. Do not make earnings or results claims we cannot back up, do not send spam, and do not bid on TopEdge AI brand terms in paid search. The full list is in the Partner Terms.',
  },
  {
    question: 'Can I get a custom rate?',
    answer: `If you run an agency or community that can bring many clients, write to us at ${PARTNER_EMAIL}. Negotiated terms are possible for partners with significant volume.`,
  },
  {
    question: 'Where do I sign in?',
    answer: `At ${PARTNER_PORTAL_HOST}.`,
  },
  {
    question: 'Which payments count?',
    answer:
      'Payments made by referred clients on paid plans billed through TopEdge AI, in rupees. Shopify app billing is not covered yet.',
  },
];
