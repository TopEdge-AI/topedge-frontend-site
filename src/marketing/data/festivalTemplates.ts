import {
  FESTIVAL_CATALOG,
  FESTIVAL_MARKETING_FOOTER,
  catalogRowsForFestival,
  type FestivalCatalogRow,
  type FestivalStageId,
} from './festivalTemplateCatalog';

export { FESTIVAL_CATALOG, FESTIVAL_MARKETING_FOOTER };
export type { FestivalCatalogRow, FestivalStageId };

/**
 * The festive library, as the website publishes it.
 *
 * The catalog beside this file carries the words. This file carries everything
 * a merchant needs in order to decide whether to send them: when the demand
 * window actually opens, who to send to, what sells, what the four messages
 * cost together, and the one mistake that wastes the campaign.
 *
 * Why a page per festival rather than one long list. A merchant searching
 * "Diwali WhatsApp message for customers" in the second week of October is not
 * browsing a library — they have a date, a list and a week, and they want the
 * four messages and the order to send them in. A hundred cards on one page
 * cannot answer that; twenty-five pages that each answer it can. The hub stays
 * for the merchant who is planning the year rather than this week.
 *
 * Every date is Meta-relevant twice over: the catalog lists two years because
 * most of these move with the lunar calendar, and the page has to pick the one
 * that is still ahead. See `resolveFestivalTiming` below.
 */

/* ────────────────────────────────────────────────────────────────────────────
   Campaign stages
   ──────────────────────────────────────────────────────────────────────────── */

export type FestivalStage = {
  id: FestivalStageId;
  /** Chip label, filters and card tags. */
  label: string;
  /** When it goes out, relative to the festival. */
  timing: string;
  /** Short form for the timeline rail. */
  timingShort: string;
  /**
   * Send window as whole days from the festival, inclusive, negative for
   * before. Used to turn a festival's own date into real calendar dates, so a
   * page can say "29 Oct to 1 Nov" instead of "7 to 10 days before".
   */
  offsetFrom: number;
  offsetTo: number;
  /** What this message is for, in a merchant's words. */
  purpose: string;
  /** The reason it earns its send — the conversion argument. */
  why: string;
};

/**
 * Four messages, in order, and the order is the product.
 *
 * Each one on its own is a blast. Run in sequence they are a campaign: pull
 * demand forward before the rush, answer the "what do I buy" question while
 * there is still time to ship, discount only once the undecided are left, and
 * close on goodwill so the list is still there next festival. The catalog was
 * built this way; the website had never said so.
 */
export const FESTIVAL_STAGES: FestivalStage[] = [
  {
    id: 'early-access',
    label: 'Early access',
    timing: '7 to 10 days before',
    timingShort: 'T-10 to T-7',
    offsetFrom: -10,
    offsetTo: -7,
    purpose: 'Opens the festive collection to your best customers before anyone else.',
    why: 'Pulls demand forward into the week you can still ship comfortably, and tells you which SKUs to restock while a restock is still possible.',
  },
  {
    id: 'gift-guide',
    label: 'Gift guide',
    timing: '4 to 6 days before',
    timingShort: 'T-6 to T-4',
    offsetFrom: -6,
    offsetTo: -4,
    purpose:
      'A shortlist for the customer who wants to buy but has not decided what.',
    why: 'Festive shopping is gifting, and gifting stalls on indecision rather than price. A curated set converts browsers a discount would only have subsidised.',
  },
  {
    id: 'flash-sale',
    label: 'Flash sale',
    timing: '1 to 3 days before',
    timingShort: 'T-3 to T-1',
    offsetFrom: -3,
    offsetTo: -1,
    purpose: 'The discount-led push, with a code and a deadline the festival sets for you.',
    why: 'By now the people left on your list are the ones price was holding back. The festival supplies a real deadline, so the urgency is not invented.',
  },
  {
    id: 'greeting',
    label: 'Day-of greeting',
    timing: 'On the day',
    timingShort: 'Day 0',
    offsetFrom: 0,
    offsetTo: 0,
    purpose: 'A wish, a thank-you, and one small thing inside for next time.',
    why: 'The cheapest send of the four and the one that keeps the list warm. A merchant who only ever asks for money trains their audience to type STOP.',
  },
];

export const FESTIVAL_STAGE_BY_ID: Record<FestivalStageId, FestivalStage> = Object.fromEntries(
  FESTIVAL_STAGES.map((s) => [s.id, s]),
) as Record<FestivalStageId, FestivalStage>;

/* ────────────────────────────────────────────────────────────────────────────
   Calendar clusters + audience
   ──────────────────────────────────────────────────────────────────────────── */

export type FestivalClusterId = 'january' | 'spring' | 'mid-year' | 'festive-quarter' | 'december';

export type FestivalCluster = {
  id: FestivalClusterId;
  label: string;
  /** Shown under the group heading on the hub. */
  blurb: string;
};

export const FESTIVAL_CLUSTERS: FestivalCluster[] = [
  {
    id: 'january',
    label: 'January — new year and harvest',
    blurb:
      'Three sends inside four weeks, into an audience that just spent through December. Lean on gifting and restocking rather than discount depth.',
  },
  {
    id: 'spring',
    label: 'February to April — spring and the regional new years',
    blurb:
      'The second-biggest gifting run of the year, and the one most brands skip. Holi, Eid and four regional new years land inside seven weeks.',
  },
  {
    id: 'mid-year',
    label: 'May to August — the quiet half, and Rakhi',
    blurb:
      'Thin on volume except for Raksha Bandhan, which is a gifting festival with a hard delivery deadline and almost no competition in the inbox.',
  },
  {
    id: 'festive-quarter',
    label: 'September to November — the festive quarter',
    blurb:
      'Nine festivals in ten weeks and the bulk of the Indian D2C year. Plan the whole run before Ganesh Chaturthi, because there is no spare week inside it.',
  },
  {
    id: 'december',
    label: 'December — year end',
    blurb:
      'One festival, a long lead time and shoppers already in buying mode. The easiest campaign of the year to get right and the easiest to leave too late.',
  },
];

export const FESTIVAL_CLUSTER_BY_ID: Record<FestivalClusterId, FestivalCluster> =
  Object.fromEntries(FESTIVAL_CLUSTERS.map((c) => [c.id, c])) as Record<
    FestivalClusterId,
    FestivalCluster
  >;

export type FestivalTraditionId = 'hindu' | 'islamic' | 'christian' | 'secular';

export const FESTIVAL_TRADITIONS: { id: FestivalTraditionId; label: string }[] = [
  { id: 'hindu', label: 'Hindu calendar' },
  { id: 'islamic', label: 'Islamic calendar' },
  { id: 'christian', label: 'Christian calendar' },
  { id: 'secular', label: 'Secular' },
];

export const FESTIVAL_TRADITION_LABEL: Record<FestivalTraditionId, string> = Object.fromEntries(
  FESTIVAL_TRADITIONS.map((t) => [t.id, t.label]),
) as Record<FestivalTraditionId, string>;

/* ────────────────────────────────────────────────────────────────────────────
   Festival type
   ──────────────────────────────────────────────────────────────────────────── */

export type Festival = {
  slug: string;
  /** Must match `festivalName` in the catalog exactly — it is the join key. */
  catalogName: string;
  /** Display name on the page. */
  name: string;
  /** Short form for chips, breadcrumbs and card tags. */
  shortName: string;
  cluster: FestivalClusterId;
  tradition: FestivalTraditionId;
  /** Where in India the festival carries the most commercial weight. */
  regions: string;

  /* SEO */
  /** ≤ 65 characters including the brand suffix. Enforced by check:festivals. */
  title: string;
  /** 110–160 characters. Enforced by check:festivals. */
  description: string;
  keywords: string;

  /* Page copy */
  eyebrow: string;
  h1: string;
  /** Phrase inside `h1` to carry the violet highlight. */
  h1Accent: string;
  subtitle: string;
  /** Answer-first opening paragraph. Written to be quotable on its own. */
  answerFirst: string;

  /* The commercial brief */
  /** When the money actually moves. */
  peak: string;
  /** What the shopper is doing, not what the festival means. */
  buyerIntent: string;
  /** Categories that move, most reliable first. */
  sells: string[];
  /** Who on the list to send to. */
  targeting: string;
  /** The festival-specific mistake. One per page, never generic. */
  watchOut: string;

  faqs: { question: string; answer: string }[];
};

/* ────────────────────────────────────────────────────────────────────────────
   Dates
   ──────────────────────────────────────────────────────────────────────────── */

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

/**
 * "Nov 8, 2026 | Oct 29, 2027" → [Date, Date], earliest first.
 *
 * Ported from `festivalSchedule.js` in the dashboard, same reasoning: the
 * catalog stores two years as prose because most of these move with the lunar
 * calendar, and local midnight is used rather than UTC because a festival is a
 * calendar day and UTC parsing shifts it a day back for every merchant in IST.
 *
 * A range resolves on its first day, which is the one a campaign is planned
 * against. Two shapes occur in the catalog and both have to parse: a range
 * inside one month ("Oct 11-19, 2026") and one that crosses a month boundary
 * ("Sep 30-Oct 8, 2027"). Missing the second left Navratri with only its 2026
 * date, so a page about the biggest window in the festive quarter rendered as
 * a festival that had already happened.
 */
export function parseFestivalDates(raw: string): Date[] {
  const out: Date[] = [];
  for (const part of String(raw || '').split('|')) {
    const m = part
      .trim()
      .match(/^([A-Za-z]{3,})\s+(\d{1,2})(?:\s*[-–]\s*(?:[A-Za-z]{3,}\s+)?\d{1,2})?,\s*(\d{4})$/);
    if (!m) continue;
    const month = MONTHS[m[1].slice(0, 3).toLowerCase()];
    if (month == null) continue;
    const day = Number(m[2]);
    const year = Number(m[3]);
    if (!Number.isFinite(day) || !Number.isFinite(year)) continue;
    out.push(new Date(year, month, day));
  }
  return out.sort((a, b) => a.getTime() - b.getTime());
}

export type FestivalTiming = {
  /** The occurrence a visitor should plan against. */
  date: Date | null;
  /** Whole days from today. Negative once every listed year has passed. */
  daysAway: number | null;
  /** True when no listed year is still ahead. */
  isPast: boolean;
  /** "In 12 days", "Today", "8 Nov 2026". */
  label: string;
  /** "Sat, 8 Nov 2026" — the full date, always. */
  fullLabel: string;
  tone: 'now' | 'soon' | 'later' | 'past' | 'none';
};

const LONG = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' } as const;
const SHORT = { day: 'numeric', month: 'short', year: 'numeric' } as const;

/**
 * The occurrence that matters today: the next one still ahead, or the most
 * recent when every listed year has passed, so a lapsed festival says when it
 * was instead of rendering an empty slot.
 */
export function resolveFestivalTiming(raw: string, now: Date = new Date()): FestivalTiming {
  const dates = parseFestivalDates(raw);
  if (!dates.length) {
    return { date: null, daysAway: null, isPast: false, label: '', fullLabel: '', tone: 'none' };
  }

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const next = dates.find((d) => d.getTime() >= today.getTime()) || null;
  const last = [...dates].reverse().find((d) => d.getTime() < today.getTime()) || null;
  const date = next || last;
  if (!date) {
    return { date: null, daysAway: null, isPast: false, label: '', fullLabel: '', tone: 'none' };
  }

  const fullLabel = date.toLocaleDateString('en-IN', LONG);
  const daysAway = Math.round((date.getTime() - today.getTime()) / 86400000);

  if (!next) {
    return { date, daysAway, isPast: true, label: `Was ${date.toLocaleDateString('en-IN', SHORT)}`, fullLabel, tone: 'past' };
  }
  if (daysAway === 0) return { date, daysAway, isPast: false, label: 'Today', fullLabel, tone: 'now' };
  if (daysAway === 1) return { date, daysAway, isPast: false, label: 'Tomorrow', fullLabel, tone: 'now' };
  if (daysAway <= 30) {
    return { date, daysAway, isPast: false, label: `In ${daysAway} days`, fullLabel, tone: 'soon' };
  }
  return { date, daysAway, isPast: false, label: date.toLocaleDateString('en-IN', SHORT), fullLabel, tone: 'later' };
}

/* ────────────────────────────────────────────────────────────────────────────
   The 25 festivals, in calendar order
   ──────────────────────────────────────────────────────────────────────────── */

export const FESTIVALS: Festival[] = [
  {
    slug: 'new-year',
    catalogName: "New Year's Day",
    name: "New Year's Day",
    shortName: 'New Year',
    cluster: 'january',
    tradition: 'secular',
    regions: 'Pan-India, and the one festival your NRI segment keeps the same date for',
    title:
      'New Year WhatsApp Marketing Templates: 4 Free Examples',
    description:
      '4 free New Year WhatsApp message templates to copy, edit and send. Ready marketing copy with send dates, Meta category and cost per message.',
    keywords:
      'new year whatsapp template, happy new year message for customers, new year whatsapp marketing message, free whatsapp template download, new year business message example',
    eyebrow:
      'New Year campaign',
    h1:
      'New Year WhatsApp marketing templates',
    h1Accent:
      'New Year',
    subtitle:
      'Four free New Year WhatsApp templates you can copy, edit and submit to Meta — early access, gift picks, the sale and the greeting.',
    answerFirst:
      'A New Year campaign is four messages across the last week of December, not one on 1 January. The money moves before midnight — the 1st only needs the greeting.',
    peak:
      '26 December to 31 December. Demand collapses on 1 January itself, which is why the day-of message is a greeting rather than an offer.',
    buyerIntent:
      'Nobody is buying a New Year gift. They are finishing December — spending what is left of a bonus, replacing something they have been putting off, or buying the thing they mean to start the year with. That makes it the one festival in the calendar where a self-purchase message outperforms a gifting one, and where "new year, new X" is doing real work rather than decorating a discount.',
    sells: [
      'Fitness, wellness and self-improvement categories, which peak harder here than at any other point in the year',
      'Planners, journals and anything dated — a hard expiry built into the product',
      'Apparel and footwear, on party and travel demand across the last week of December',
      'Gift cards, for the shopper who left it to the 31st',
    ],
    targeting:
      'Everyone who opted in during the festive quarter and has not bought since Diwali. They are warm, they have not heard from you in six weeks, and December is the easiest month to come back in.',
    watchOut:
      'Do not send the discount on 1 January. Indian D2C checkout volume drops through the first week of the month, and a code that lands on the 1st burns your best offer of the quarter against the worst buying day of it.',
    faqs: [
      {
        question: 'When should a New Year WhatsApp campaign start?',
        answer:
          'Around 26 December. The spending window is the last week of December, not the first week of January, so early access goes out the day after Christmas, gift picks two days later, and the discount on the 30th or 31st. Starting on 1 January means arriving after the money has gone.',
      },
      {
        question: 'Is a "Happy New Year" message to customers a marketing template?',
        answer:
          'Yes. Meta classifies any message that is not about an existing order as marketing, greetings included, so a New Year wish is billed at ₹0.8631 in India rather than ₹0.1150. It is still worth sending — it is the send that keeps the list opted in — but budget it as marketing.',
      },
      {
        question: 'Can I send a New Year message to customers who bought during Diwali?',
        answer:
          'Only if they are opted in to marketing messages. A Diwali purchase is not consent on its own. If they ticked the WhatsApp opt-in at checkout or replied to an opt-in message, they are eligible; if not, collect the opt-in first.',
      },
    ],
  },
  {
    slug: 'makar-sankranti-pongal',
    catalogName: 'Makar Sankranti / Pongal',
    name: 'Makar Sankranti and Pongal',
    shortName: 'Makar Sankranti',
    cluster: 'january',
    tradition: 'hindu',
    regions: 'Gujarat and Maharashtra as Sankranti, Tamil Nadu as Pongal, Punjab as Lohri, Assam as Bihu',
    title:
      'Makar Sankranti WhatsApp Templates: 4 Free Examples',
    description:
      '4 free Makar Sankranti and Pongal WhatsApp message templates to copy and edit, with regional send windows, what sells and cost per message.',
    keywords:
      'makar sankranti whatsapp template, pongal whatsapp message, sankranti marketing message, free whatsapp template download, pongal wishes message for customers',
    eyebrow:
      'Makar Sankranti and Pongal',
    h1:
      'Makar Sankranti WhatsApp marketing templates',
    h1Accent:
      'Makar Sankranti',
    subtitle:
      'Four free Sankranti, Pongal, Lohri and Bihu WhatsApp templates to copy, edit per market and submit to Meta.',
    answerFirst:
      'One week, four names: Sankranti in the west, Pongal in Tamil Nadu, Lohri in Punjab, Bihu in Assam. Same four messages, with the festival name changed per state.',
    peak:
      '5 January to 13 January. Pongal runs four days in Tamil Nadu, so a South-heavy list has a longer tail than a West-heavy one.',
    buyerIntent:
      'This is a home-and-family festival, not a gifting one. People are cleaning, cooking, buying new clothes for the house and sending sweets to relatives. The purchase is practical and the basket is small, which makes it a volume play rather than an AOV play — and an unusually good week for first-time buyers, because the price point people are willing to risk on a new brand is low.',
    sells: [
      'Kitchenware, cookware and serveware — Pongal is cooked in a new vessel',
      'Sweets, dry fruit and gift hampers, mostly sent rather than kept',
      'Traditional and ethnic wear, with a strong South India skew',
      'Home decor, rangoli and cleaning categories on the pre-festival clean',
      'Kites and outdoor, in Gujarat specifically, where Uttarayan is the bigger event',
    ],
    targeting:
      'Split the send by state if you have it. A Tamil Nadu customer reading "Happy Makar Sankranti" knows the message was not written for them, and the fix costs one variable.',
    watchOut:
      'Do not send one message to the whole list calling it Makar Sankranti. The name is the festival in this week — Pongal, Lohri and Bihu are not nicknames for it — and a merchant who gets that wrong has told their South Indian customers they are an afterthought.',
    faqs: [
      {
        question: 'Should Pongal and Makar Sankranti be separate WhatsApp campaigns?',
        answer:
          'Same four messages, same dates, different festival name. Build it as one campaign with the festival name as a variable and segment the audience by state. Two separate template submissions to Meta only make sense if the offer or the product set differs by market.',
      },
      {
        question: 'How early should a Pongal campaign start?',
        answer:
          'Early access about nine days out, because Pongal buying is cooking and clothes buying and both have to arrive before the first day. Anything that ships after the 13th has missed the festival regardless of what the discount says.',
      },
      {
        question: 'What sells best during Makar Sankranti for a D2C brand?',
        answer:
          'Kitchen and home categories, sweets and hampers, and ethnic wear. Baskets are small and volumes are high, so it is a better week to acquire a first-time buyer than to push your top-priced SKU.',
      },
    ],
  },
  {
    slug: 'vasant-panchami',
    catalogName: 'Vasant Panchami',
    name: 'Vasant Panchami',
    shortName: 'Vasant Panchami',
    cluster: 'january',
    tradition: 'hindu',
    regions: 'North India, Bihar, West Bengal as Saraswati Puja',
    title:
      'Vasant Panchami WhatsApp Templates: Free Examples',
    description:
      '4 free Vasant Panchami and Saraswati Puja WhatsApp message templates to copy and edit, with the send window, what sells and cost per message.',
    keywords:
      'vasant panchami whatsapp template, basant panchami message for customers, saraswati puja whatsapp message, free whatsapp marketing template, festival message example',
    eyebrow:
      'Vasant Panchami',
    h1:
      'Vasant Panchami WhatsApp marketing templates',
    h1Accent:
      'Vasant Panchami',
    subtitle:
      'Four free Vasant Panchami and Saraswati Puja WhatsApp templates, ready to copy, edit and submit to Meta.',
    answerFirst:
      'A three-day festival almost no D2C brand sends for, which is exactly why it converts. Yellow sells, the inbox is empty, and three messages beat four.',
    peak:
      'The three days before. There is no long build-up, so a ten-day lead time only means the first message is forgotten by the time the offer lands.',
    buyerIntent:
      'Yellow is the whole festival. People are buying yellow clothing to wear on the day, flowers and puja items for Saraswati, and in Bengal and Bihar it is also a school and student occasion, which pulls in stationery, books and anything a parent buys for a child starting something new.',
    sells: [
      'Yellow and spring-palette apparel — the single most reliable seller of the week',
      'Puja essentials, flowers and decor',
      'Stationery, books and student categories, strongest in Bengal and Bihar',
      'Jewellery at accessible price points, worn with the yellow',
    ],
    targeting:
      'North India, Bihar and West Bengal first. A nationwide send is not wrong, but the conversion is concentrated enough that a regional segment makes the marketing spend look very different.',
    watchOut:
      'A compressed festival does not survive a long sequence. Four messages across nine days for a festival with a three-day window reads as spam, and the unsubscribes you collect here cost you Holi five weeks later.',
    faqs: [
      {
        question: 'Is Vasant Panchami worth a WhatsApp campaign for a D2C store?',
        answer:
          'For apparel, jewellery, decor and stationery, yes — the colour is specific, the date is fixed and the inbox is empty because most brands skip it. For categories with no yellow or puja angle, a single day-of greeting is enough.',
      },
      {
        question: 'Should the campaign say Vasant Panchami or Saraswati Puja?',
        answer:
          'Saraswati Puja for Bengal and Bihar, Vasant Panchami or Basant Panchami everywhere else. It is the same day and the same templates — only the name in the opening line changes, so keep it as a variable rather than submitting two templates.',
      },
      {
        question: 'How many messages should a small festival like this get?',
        answer:
          'Three is usually right: early access, the offer, and the greeting. The gift-guide message assumes a shopper weighing options over several days, which is not what happens in a three-day window.',
      },
    ],
  },
  {
    slug: 'maha-shivaratri',
    catalogName: 'Maha Shivaratri',
    name: 'Maha Shivaratri',
    shortName: 'Maha Shivaratri',
    cluster: 'spring',
    tradition: 'hindu',
    regions: 'Pan-India, strongest in Uttar Pradesh, Madhya Pradesh, Maharashtra and Karnataka',
    title:
      'Maha Shivaratri WhatsApp Templates: Free Examples',
    description:
      '4 free Maha Shivaratri WhatsApp message templates to copy and edit, written for a fasting day rather than a hard sale, with send timing and cost.',
    keywords:
      'maha shivaratri whatsapp template, shivratri message to customers, mahashivratri marketing message, free whatsapp message template, festival greeting message business',
    eyebrow:
      'Maha Shivaratri',
    h1:
      'Maha Shivaratri WhatsApp marketing templates',
    h1Accent:
      'Maha Shivaratri',
    subtitle:
      'Four free Maha Shivaratri WhatsApp templates written for a devotional day, ready to copy, edit and submit to Meta.',
    answerFirst:
      'A fasting and vigil day with no gifting obligation, so a loud discount lands badly. Lead with puja items, vrat food and temple wear, and keep the offer quiet.',
    peak:
      'Four to five days before. Observance starts the previous evening, so anything that has to arrive should be delivered two days ahead.',
    buyerIntent:
      'Buying is devotional and preparatory: puja items, rudraksha and spiritual jewellery, white and simple clothing for the temple visit, and fasting foods — fruit, sabudana, and the specific flours people keep for vrat days. It is a narrow set of categories with very high intent inside them and essentially zero intent outside them.',
    sells: [
      'Puja items, rudraksha, bead malas and spiritual jewellery',
      'Fasting and vrat food categories, including sabudana and vrat flours',
      'White, simple and temple-appropriate clothing',
      'Incense, diyas, brass and devotional decor',
    ],
    targeting:
      'Anyone who bought a devotional or puja SKU in the last year, plus your North and Central India segments. A broad send converts poorly because the relevant categories are so specific.',
    watchOut:
      'A loud percentage-off on a fasting festival reads as tone-deaf and gets replies you do not want. Keep the flash-sale message plain, lead with what the product is for rather than what it is off, and let the festival be the reason instead of the discount.',
    faqs: [
      {
        question: 'Should a brand run a sale on Maha Shivaratri?',
        answer:
          'A modest one, framed around the occasion rather than the discount. It is a fasting and vigil festival with no gifting obligation, so deep discounting feels off-register. Early access and a curated set of relevant products do better than a loud code.',
      },
      {
        question: 'What time should the Maha Shivaratri message be sent?',
        answer:
          'Morning for the greeting, and daytime for everything else. The night of Shivaratri is the vigil itself, so a marketing message landing at 10pm arrives in the middle of the observance.',
      },
      {
        question: 'Which products actually sell during Shivratri?',
        answer:
          'Puja and devotional items, spiritual jewellery such as rudraksha, white or simple clothing for temple visits, and fasting foods. Outside those categories, treat the day as a greeting rather than a campaign.',
      },
    ],
  },
  {
    slug: 'holi',
    catalogName: 'Holi',
    name: 'Holi',
    shortName: 'Holi',
    cluster: 'spring',
    tradition: 'hindu',
    regions: 'Pan-India, with the longest run-up in Uttar Pradesh, Bihar, Rajasthan and Delhi NCR',
    title:
      'Holi WhatsApp Marketing Templates: 4 Free Examples',
    description:
      '4 free Holi WhatsApp message templates to copy, edit and send — early access, gift picks, flash sale and greeting, with send dates and cost.',
    keywords:
      'holi whatsapp template, holi sale message to customers, holi offer whatsapp message, free whatsapp marketing template download, happy holi message business',
    eyebrow:
      'Holi campaign',
    h1:
      'Holi WhatsApp marketing templates',
    h1Accent:
      'Holi',
    subtitle:
      'Four free Holi WhatsApp templates you can copy, edit and submit to Meta — the biggest spring week, and the one most brands under-plan.',
    answerFirst:
      'India\'s biggest spring retail week, with an absolute deadline — nobody wants white clothes the day after. Bundle rather than discount, and stop promising delivery three days out.',
    peak:
      'The five days before, with a sharp cut-off. Holi demand does not tail off — it stops.',
    buyerIntent:
      'Two purchases happen: white clothes that are expected to be ruined, and gifting between families, mostly sweets and dry fruit. The white-clothing purchase is price-led and nearly disposable, which makes it the best Holi week for entry-priced SKUs and bundles. The gifting purchase is the one with a deadline, and it is the one your shipping promise has to be honest about.',
    sells: [
      'White and light-coloured apparel, especially kurtas and co-ords, bundled rather than sold singly',
      'Sweets, gujiya, thandai and dry-fruit hampers',
      'Skin and hair protection — pre-Holi oils, after-colour cleansers, SPF',
      'Colours, pichkaris and party supplies',
      'Sunglasses, slippers and anything cheap enough to risk at a Holi party',
    ],
    targeting:
      'Your whole opted-in list for the apparel and sweets angle, then a tighter segment for premium gifting. North India buys earlier and for longer than the South.',
    watchOut:
      'Holi is the festival where a delivery promise gets a brand into trouble. Stop promising pre-Holi delivery three days before the date, not one — and say so in the flash-sale message. A parcel that lands on the day after is a refund request, not a sale.',
    faqs: [
      {
        question: 'When should a Holi WhatsApp campaign be sent?',
        answer:
          'Early access about eight days before, gift picks five days before, the discount two days before, and the greeting on the morning of Holi. The sequence has to finish before the date because post-Holi demand for Holi products is effectively zero.',
      },
      {
        question: 'What is the best Holi offer for a D2C brand?',
        answer:
          'A bundle, not a percentage. White Holi clothing is bought to be ruined, so a two-or-three-piece set at a flat price converts better than a discount on a single item, and it moves AOV in the right direction at the same time.',
      },
      {
        question: 'Can I send a Holi message to customers who did not opt in?',
        answer:
          'No. A WhatsApp marketing template can only go to customers who have given opt-in consent, whatever the festival. Collect the opt-in at checkout or through an opt-in message first, or the send risks your quality rating.',
      },
    ],
  },
  {
    slug: 'ugadi-gudi-padwa',
    catalogName: 'Ugadi / Gudi Padwa',
    name: 'Ugadi and Gudi Padwa',
    shortName: 'Ugadi',
    cluster: 'spring',
    tradition: 'hindu',
    regions: 'Karnataka and Andhra Pradesh as Ugadi, Maharashtra as Gudi Padwa, Kashmir as Navreh',
    title:
      'Ugadi & Gudi Padwa WhatsApp Templates: Free Examples',
    description:
      '4 free Ugadi and Gudi Padwa WhatsApp message templates to copy and edit, with the regional new-year send window and cost per message.',
    keywords:
      'ugadi whatsapp template, gudi padwa message to customers, gudi padwa offer whatsapp, free whatsapp template example, regional new year marketing message',
    eyebrow:
      'Ugadi and Gudi Padwa',
    h1:
      'Ugadi and Gudi Padwa WhatsApp marketing templates',
    h1Accent:
      'Ugadi and Gudi Padwa',
    subtitle:
      'Four free Ugadi, Gudi Padwa and Navreh WhatsApp templates, ready to copy, edit per market and submit to Meta.',
    answerFirst:
      'A regional new year that is also one of the most auspicious buying days of the year. The one spring campaign where your most expensive product belongs in the message.',
    peak:
      'The week before, with a spike on the day itself because the purchase date is the point.',
    buyerIntent:
      'Two distinct behaviours. Households buy new clothes, decor and festive food for the day. Separately, a real segment of buyers treats the date as the right day to make a purchase they have already decided on — gold, appliances, vehicles, a home upgrade. That is the only festival in spring where a high-ticket SKU should be in the gift-guide message.',
    sells: [
      'Gold, silver and fine jewellery, on the auspicious-purchase behaviour',
      'Ethnic wear for the whole family, strongest in Maharashtra and Karnataka',
      'Home and kitchen upgrades, including appliances',
      'Festive food, mango and jaggery categories tied to Ugadi pachadi',
      'Puja items, gudi decor and door hangings',
    ],
    targeting:
      'Maharashtra, Karnataka and Andhra Pradesh and Telangana first. Use the day-of greeting nationally, but put the offer behind a regional segment.',
    watchOut:
      'Do not run this as one undifferentiated "regional new year" send. Ugadi and Gudi Padwa are the same date with different names, rituals and shopping lists, and one generic message loses the credibility that an auspicious-purchase campaign depends on.',
    faqs: [
      {
        question: 'Are Ugadi and Gudi Padwa the same festival?',
        answer:
          'Same day, different regions and names — Ugadi in Karnataka, Andhra Pradesh and Telangana, Gudi Padwa in Maharashtra, Navreh in Kashmir. For a campaign, treat it as one set of templates with the festival name as a variable and segment the audience by state.',
      },
      {
        question: 'Why is Ugadi a good day for high-value products?',
        answer:
          'Because it is treated as an auspicious day to begin a purchase. Buyers who have already decided on jewellery, an appliance or a vehicle often wait for a date like this, so the gift-guide message is the one place in spring where a premium SKU belongs.',
      },
      {
        question: 'How long should the Ugadi campaign run?',
        answer:
          'About eight days. Early access eight days out, gift picks four or five days out, the offer one or two days out, and the greeting on the morning of the new year itself.',
      },
    ],
  },
  {
    slug: 'eid-ul-fitr',
    catalogName: 'Eid-ul-Fitr / Ramzan Eid',
    name: 'Eid-ul-Fitr',
    shortName: 'Eid-ul-Fitr',
    cluster: 'spring',
    tradition: 'islamic',
    regions: 'Pan-India, strongest in Uttar Pradesh, Telangana, Kerala, West Bengal and urban Maharashtra',
    title:
      'Eid-ul-Fitr WhatsApp Templates: 4 Free Examples',
    description:
      '4 free Eid-ul-Fitr WhatsApp message templates to copy and edit, timed around Ramadan and Chand Raat, with send dates and cost per message.',
    keywords:
      'eid whatsapp template, eid mubarak message to customers, ramzan eid offer whatsapp, free whatsapp marketing template, eid greeting message for business',
    eyebrow:
      'Eid-ul-Fitr',
    h1:
      'Eid-ul-Fitr WhatsApp marketing templates',
    h1Accent:
      'Eid-ul-Fitr',
    subtitle:
      'Four free Eid-ul-Fitr WhatsApp templates timed around Ramadan and Chand Raat, ready to copy, edit and submit to Meta.',
    answerFirst:
      'Shopping builds through Ramadan and spikes on Chand Raat. Start early access in the last ten days, and never hard-code the date — it moves on moon sighting.',
    peak:
      'The last ten days of Ramadan, with a second spike on Chand Raat for anything that can be delivered same-day or collected.',
    buyerIntent:
      'New clothes for the whole family are near-obligatory, which makes this the most reliable apparel festival in the spring calendar. Beyond that: gifting to children and relatives in cash and kind, attar and fragrance, dates and sweets for the table, and a real jewellery segment. Because the date is confirmed only on moon sighting, buyers build in a day of slack — and so should your delivery promise.',
    sells: [
      'Ethnic and occasion wear for the whole family, kurta sets and abayas included',
      'Attar, perfume and grooming',
      'Dates, sweets, bakery and dry-fruit hampers',
      'Jewellery and watches as gifts',
      'Home and table decor for Eid hosting',
    ],
    targeting:
      'Anyone who engaged with your Eid or Ramadan content last year, plus your Hyderabad, Lucknow, Kolkata, Malappuram and Mumbai metro segments. A nationwide send is fine for the greeting.',
    watchOut:
      'The date moves on moon sighting, which can shift Eid by a day at a few hours notice. Never hard-code the date into the template body — keep it as a variable, or write the copy so it reads correctly on either day.',
    faqs: [
      {
        question: 'When should an Eid WhatsApp campaign start?',
        answer:
          'In the last ten days of Ramadan. Eid shopping builds through the month and peaks before Chand Raat, so an early-access message around ten days out catches the start of the spend, and the discount should land while you can still deliver before the day.',
      },
      {
        question: 'How do I handle Eid moving by a day?',
        answer:
          'Keep the date out of the template body. The festival is confirmed on moon sighting, so put the date in a variable you fill at send time, or write copy that works either way — "before Eid" rather than a hard date.',
      },
      {
        question: 'Is "Eid Mubarak" to customers a marketing message?',
        answer:
          'Yes. Any WhatsApp template that is not about an existing order is marketing in Meta’s classification, so a greeting is billed at ₹0.8631 per delivered message in India and needs the same opt-in as a sale message.',
      },
    ],
  },
  {
    slug: 'rama-navami',
    catalogName: 'Rama Navami',
    name: 'Rama Navami',
    shortName: 'Rama Navami',
    cluster: 'spring',
    tradition: 'hindu',
    regions: 'Pan-India, strongest in Uttar Pradesh, Bihar, Maharashtra, Andhra Pradesh and Telangana',
    title:
      'Rama Navami WhatsApp Templates: 4 Free Examples',
    description:
      '4 free Rama Navami WhatsApp message templates to copy and edit, with the nine-day Chaitra Navratri send window and cost per message.',
    keywords:
      'rama navami whatsapp template, ram navami message to customers, ram navami marketing message, free whatsapp message template example, festival whatsapp copy',
    eyebrow:
      'Rama Navami',
    h1:
      'Rama Navami WhatsApp marketing templates',
    h1Accent:
      'Rama Navami',
    subtitle:
      'Four free Rama Navami WhatsApp templates for a devotional day, ready to copy, edit and submit to Meta.',
    answerFirst:
      'The buying happens across the nine days of Chaitra Navratri, not on the date itself. A campaign that starts on Rama Navami has already missed it.',
    peak:
      'The nine days of Chaitra Navratri leading up to it, rather than a tight window before the date.',
    buyerIntent:
      'Devotional and household: puja items, idols and framed art, traditional and modest clothing for temple visits, and prasad-adjacent food categories. There is also a fasting segment running the full nine days, which puts vrat foods in demand for longer than any single-day festival manages.',
    sells: [
      'Puja items, idols, framed devotional art and pooja thalis',
      'Traditional and modest clothing, particularly in yellow and saffron',
      'Fasting and vrat food categories across the nine days',
      'Sweets and prasad-style boxes',
      'Incense, brass and devotional decor',
    ],
    targeting:
      'Past buyers of devotional or puja categories, plus North and Central India. The nine-day window means you can send the early-access message to a wider list and still have time to follow up only the openers.',
    watchOut:
      'Treating it as a one-day festival. The commercial window is the nine days of Chaitra Navratri, so a campaign built around the date alone arrives after the buying has finished.',
    faqs: [
      {
        question: 'When does Rama Navami buying actually start?',
        answer:
          'At the start of Chaitra Navratri, nine days earlier. Rama Navami is the ninth day, so the fasting, the puja shopping and the clothing purchases are already underway well before the date on the calendar.',
      },
      {
        question: 'Should the Rama Navami message carry a discount?',
        answer:
          'A modest one. It is a devotional day without a gifting obligation, so the early-access and curated-picks messages do more work than a percentage off, and a loud sale reads as off-register for the occasion.',
      },
      {
        question: 'Which categories should I feature for Rama Navami?',
        answer:
          'Puja and devotional items, traditional clothing in yellow and saffron, vrat foods for the nine-day fasting segment, and sweet boxes. Outside those, a day-of greeting is a better use of the send than an offer.',
      },
    ],
  },
  {
    slug: 'good-friday',
    catalogName: 'Good Friday',
    name: 'Good Friday',
    shortName: 'Good Friday',
    cluster: 'spring',
    tradition: 'christian',
    regions: 'Kerala, Goa, Tamil Nadu, the North East and metro Christian communities',
    title:
      'Good Friday WhatsApp Message Templates: 4 Examples',
    description:
      '4 free Good Friday WhatsApp message templates, written for a day of mourning rather than a sale, with send timing and cost per message.',
    keywords:
      'good friday whatsapp template, good friday message to customers, good friday business message, free whatsapp message template, easter weekend marketing message',
    eyebrow:
      'Good Friday',
    h1:
      'Good Friday WhatsApp message templates',
    h1Accent:
      'Good Friday',
    subtitle:
      'Four free Good Friday WhatsApp templates written for a solemn day — the one date where the right campaign is almost no campaign.',
    answerFirst:
      'A day of mourning, not a shopping occasion. Send one quiet greeting, move the offer to the Thursday or Easter Saturday, and never discount on the day.',
    peak:
      'There is no buying peak on the day. Commercial intent sits on the Thursday before and resumes on Easter Saturday.',
    buyerIntent:
      'Observance rather than purchase: church attendance, fasting and abstaining from meat, and family meals. Any commerce in the window is Easter preparation happening early — Sunday clothing, gifts for children, groceries for the Easter meal.',
    sells: [
      'Nothing on the day itself, for most categories',
      'Easter preparation bought early: Sunday outfits, children’s gifts, bakery pre-orders',
      'Fish and vegetarian grocery categories, in Kerala and Goa specifically',
      'Candles, crosses and devotional items',
    ],
    targeting:
      'Your Kerala, Goa, Tamil Nadu and North East segments, plus anyone who bought from an Easter campaign before. A pan-India send has very little to reach.',
    watchOut:
      'Do not send a discount on Good Friday. It is the single most reliable way to get an angry reply and a block from a customer who would have bought from you on Sunday. Move the offer to the Thursday or hold it for Easter Saturday.',
    faqs: [
      {
        question: 'Should a business send a sale message on Good Friday?',
        answer:
          'No. It is a day of mourning in the Christian calendar, and a discount landing on it reads as disrespectful to exactly the audience you are trying to reach. Send the offer on the Thursday before, or hold it until Easter Saturday.',
      },
      {
        question: 'What should a Good Friday message to customers say?',
        answer:
          'Keep it short, quiet and free of any offer. A single line acknowledging the day, with no code and no urgency, is the whole message. The sequence on this page uses the remaining three templates for Easter preparation instead.',
      },
      {
        question: 'Who should a Good Friday message go to?',
        answer:
          'A segment, not the full list. Kerala, Goa, Tamil Nadu and the North East carry most of the relevance, along with customers who engaged with Easter messaging before. Sending it nationwide spends marketing rate on an audience that is not observing the day.',
      },
    ],
  },
  {
    slug: 'easter',
    catalogName: 'Easter',
    name: 'Easter',
    shortName: 'Easter',
    cluster: 'spring',
    tradition: 'christian',
    regions: 'Kerala, Goa, Tamil Nadu, the North East and metro Christian communities',
    title:
      'Easter WhatsApp Marketing Templates: 4 Free Examples',
    description:
      '4 free Easter WhatsApp message templates to copy and edit, with a long-weekend send plan that works around Good Friday, and cost per message.',
    keywords:
      'easter whatsapp template, easter message to customers, easter sale whatsapp message, free whatsapp marketing template download, easter greeting message business',
    eyebrow:
      'Easter campaign',
    h1:
      'Easter WhatsApp marketing templates',
    h1Accent:
      'Easter',
    subtitle:
      'Four free Easter WhatsApp templates that work around Good Friday, ready to copy, edit and submit to Meta.',
    answerFirst:
      'A long weekend with a clear audience and one hard rule: nothing sells on Good Friday. Run early access the week before and put the offer on Easter Saturday.',
    peak:
      'The Wednesday and Thursday before, then Easter Saturday. Good Friday itself is flat and should stay that way.',
    buyerIntent:
      'Easter is a gifting-and-gathering day: chocolate and eggs for children, new clothes for the Sunday service, flowers and table decor for the family lunch, and bakery pre-orders. It is also one of the few festivals where a brand can speak to families and children directly without the Indian festive-season noise competing for the inbox.',
    sells: [
      'Chocolate, confectionery and Easter egg gifting',
      'Children’s gifts, toys and books',
      'Sunday-service clothing for the whole family',
      'Flowers, table decor and bakery pre-orders',
      'Hampers aimed at the family lunch',
    ],
    targeting:
      'Kerala, Goa, Tamil Nadu and the North East first, plus metro Christian communities and anyone who bought during a previous Easter or Christmas campaign.',
    watchOut:
      'Do not let the offer slip onto Good Friday because it looks like the obvious send day in the sequence. Hold it for Easter Saturday. Everything else in the campaign survives that shift; a sale on Good Friday does not.',
    faqs: [
      {
        question: 'When should an Easter WhatsApp campaign be sent in India?',
        answer:
          'Early access the week before, gift picks on the Wednesday or Thursday, the offer on Easter Saturday, and the greeting on Sunday morning. Skip Good Friday entirely — the two days either side carry all of the commercial intent.',
      },
      {
        question: 'Is Easter worth a campaign for an Indian D2C brand?',
        answer:
          'For confectionery, children’s products, apparel and bakery it is, because the audience is concentrated enough to target cleanly and the inbox is quiet compared with the festive quarter. For most other categories a greeting is enough.',
      },
      {
        question: 'What sells during Easter in India?',
        answer:
          'Chocolate and egg gifting, children’s gifts, Sunday-service clothing, flowers and bakery pre-orders. The family lunch also pulls hampers and table decor, particularly in Kerala and Goa.',
      },
    ],
  },
  {
    slug: 'akshaya-tritiya',
    catalogName: 'Akshaya Tritiya',
    name: 'Akshaya Tritiya',
    shortName: 'Akshaya Tritiya',
    cluster: 'spring',
    tradition: 'hindu',
    regions: 'Pan-India, strongest in Maharashtra, Gujarat, Tamil Nadu, Karnataka and West Bengal',
    title:
      'Akshaya Tritiya WhatsApp Templates: Free Examples',
    description:
      '4 free Akshaya Tritiya WhatsApp message templates to copy and edit, written for the highest-value buying day of spring, with send dates and cost.',
    keywords:
      'akshaya tritiya whatsapp template, akshaya tritiya offer message, gold sale whatsapp message, free whatsapp marketing template, high value offer message example',
    eyebrow:
      'Akshaya Tritiya',
    h1:
      'Akshaya Tritiya WhatsApp marketing templates',
    h1Accent:
      'Akshaya Tritiya',
    subtitle:
      'Four free Akshaya Tritiya WhatsApp templates for the highest-intent buying day in spring, ready to copy, edit and submit to Meta.',
    answerFirst:
      'Not a gifting festival — an auspicious buying day, where making the purchase is the point. Intent arrives already formed, so protect your price instead of cutting it.',
    peak:
      'The three days before and the day itself. Unlike most festivals, the day of is the strongest, not the weakest, because the purchase date carries the meaning.',
    buyerIntent:
      'The customer has already decided to buy something of value and is waiting for the right day. Gold and silver lead by a wide distance, but the behaviour extends to anything that reads as an investment or a lasting purchase — fine jewellery, watches, appliances, property deposits, even high-ticket furniture. Intent is high and price sensitivity is unusually low.',
    sells: [
      'Gold and silver coins, bars and fine jewellery',
      'Digital gold and investment products',
      'Premium watches and heirloom-positioned goods',
      'Appliances and electronics framed as a lasting purchase',
      'Brass and silver puja items',
    ],
    targeting:
      'Your highest-AOV past buyers first, then the full opted-in list. This is the one send where leading with your most expensive SKU is the correct decision rather than an optimistic one.',
    watchOut:
      'Do not discount deeply. The buyer is motivated by the date, not the price, and a steep cut signals that the product is worth less than the occasion implies. Use the flash-sale message for a making-charge waiver, a free add-on or a gold-rate lock rather than a percentage off.',
    faqs: [
      {
        question: 'Why is Akshaya Tritiya a good day for high-value sales?',
        answer:
          'Because buyers hold a purchase back for it. The date is considered auspicious for anything that should grow in value, so intent arrives already formed and price sensitivity is lower than on any other spring date — which is why gold is the headline category.',
      },
      {
        question: 'Should the Akshaya Tritiya message include a discount?',
        answer:
          'Prefer a making-charge waiver, a rate lock, a free add-on or an EMI offer over a percentage off. A deep discount on an auspicious-purchase day undercuts the value framing the occasion creates.',
      },
      {
        question: 'Does Akshaya Tritiya work for brands that do not sell gold?',
        answer:
          'Yes, if the product can be framed as lasting rather than consumable — appliances, furniture, watches, premium tools. The behaviour is about making a purchase that endures, so position the product that way rather than borrowing the gold language.',
      },
    ],
  },
  {
    slug: 'eid-ul-adha',
    catalogName: 'Eid-ul-Adha / Bakri Eid',
    name: 'Eid-ul-Adha',
    shortName: 'Eid-ul-Adha',
    cluster: 'mid-year',
    tradition: 'islamic',
    regions: 'Pan-India, strongest in Uttar Pradesh, Telangana, Kerala, West Bengal and urban Maharashtra',
    title:
      'Eid-ul-Adha WhatsApp Templates: 4 Free Examples',
    description:
      '4 free Eid-ul-Adha and Bakri Eid WhatsApp message templates to copy and edit, written for hosting rather than gifting, with send dates and cost.',
    keywords:
      'eid ul adha whatsapp template, bakri eid message to customers, bakrid offer whatsapp message, free whatsapp template example, eid greeting message business',
    eyebrow:
      'Eid-ul-Adha',
    h1:
      'Eid-ul-Adha WhatsApp marketing templates',
    h1Accent:
      'Eid-ul-Adha',
    subtitle:
      'Four free Bakri Eid WhatsApp templates written for a hosting festival, ready to copy, edit and submit to Meta.',
    answerFirst:
      'Bakri Eid is hosting, not gifting, and Eid-ul-Fitr copy lands wrong here. Lead with cookware, serveware and grocery for feeding a crowd.',
    peak:
      'The four days before. Hosting purchases have to arrive before the day, so the delivery cut-off is harder than at Eid-ul-Fitr.',
    buyerIntent:
      'People are preparing to cook for and feed a large number of guests, and to distribute meat to family and neighbours. That puts cookware, large serveware, storage, spices and bulk grocery in demand, with apparel as a secondary purchase. The gifting impulse that drives Eid-ul-Fitr is much weaker — the sharing happens in food, not in parcels.',
    sells: [
      'Cookware, large pots, serveware and dining sets',
      'Spices, bulk grocery and cooking essentials',
      'Food storage and containers for distributing meat',
      'Ethnic wear for the day, at lower volume than Eid-ul-Fitr',
      'Attar, fragrance and grooming',
    ],
    targeting:
      'The same segments as Eid-ul-Fitr, but with home, kitchen and grocery products in front rather than apparel and gifting.',
    watchOut:
      'Reusing your Eid-ul-Fitr creative and copy. The two festivals share a name and almost nothing else commercially — one is about new clothes and gifts, the other about cooking for a crowd. A gifting message on Bakri Eid converts noticeably worse than a hosting one.',
    faqs: [
      {
        question: 'How is an Eid-ul-Adha campaign different from Eid-ul-Fitr?',
        answer:
          'Eid-ul-Fitr is gifting and new clothes; Eid-ul-Adha is hosting and cooking. Lead with cookware, serveware, grocery and storage rather than gifts, and frame the gift-guide message around feeding guests rather than giving presents.',
      },
      {
        question: 'When should the Bakri Eid messages go out?',
        answer:
          'Early access about seven days before, the hosting picks four or five days out, the offer two days out, and the greeting on the morning. Everything that has to arrive should be delivered at least a day ahead, because the cooking starts early.',
      },
      {
        question: 'Does the date move for Eid-ul-Adha?',
        answer:
          'Yes, it follows the Islamic lunar calendar and can shift by a day on moon sighting. Keep the date in a variable rather than the template body so one shift does not make an approved template read wrong.',
      },
    ],
  },
  {
    slug: 'onam',
    catalogName: 'Onam',
    name: 'Onam',
    shortName: 'Onam',
    cluster: 'mid-year',
    tradition: 'hindu',
    regions: 'Kerala, plus Malayali communities in Bengaluru, Chennai, Mumbai and the Gulf',
    title:
      'Onam WhatsApp Marketing Templates: 4 Free Examples',
    description:
      '4 free Onam WhatsApp message templates to copy and edit, with the ten-day Atham to Thiruvonam send plan, what sells and cost per message.',
    keywords:
      'onam whatsapp template, onam offer message to customers, onam sale whatsapp message, free whatsapp marketing template download, onam wishes message business',
    eyebrow:
      'Onam campaign',
    h1:
      'Onam WhatsApp marketing templates',
    h1Accent:
      'Onam',
    subtitle:
      'Four free Onam WhatsApp templates across the ten days to Thiruvonam, ready to copy, edit and submit to Meta.',
    answerFirst:
      'Kerala\'s biggest retail event, ten days from Atham to Thiruvonam. The spending sits in the last four days, so a campaign opening on Thiruvonam is already late.',
    peak:
      'The four days before Thiruvonam, after a slow build through the earlier days of the ten.',
    buyerIntent:
      'Households are buying the Onakkodi — new clothes for every family member — along with everything the Onam Sadya needs: cookware, banana-leaf serveware, groceries and sweets. Home cleaning and decor matter too, because the house is prepared for guests. It is a family-wide purchase pattern, so basket sizes run larger than most single-day festivals.',
    sells: [
      'Onakkodi apparel — kasavu sarees, mundus and new clothes for the whole family',
      'Cookware, serveware and dining essentials for the Sadya',
      'Groceries, banana chips, payasam mixes and sweets',
      'Home decor, flowers for the pookalam and cleaning products',
      'Gold, which has a strong Kerala-specific Onam demand',
    ],
    targeting:
      'Kerala first, then Malayali communities in Bengaluru, Chennai, Mumbai and the Gulf — the diaspora segment buys and ships home, so give it a longer delivery runway.',
    watchOut:
      'Treating Thiruvonam as the start of the window instead of the end. Most of the spending happens in the four days before it, so a campaign that opens on Thiruvonam is selling into a day when people are eating, not shopping.',
    faqs: [
      {
        question: 'How long should an Onam campaign run?',
        answer:
          'Across the ten days from Atham to Thiruvonam. Early access at the start, gift picks around the midpoint, the offer two days before Thiruvonam, and the greeting on the morning itself. The heavy buying sits in the last four days.',
      },
      {
        question: 'Should an Onam campaign go to the whole list?',
        answer:
          'Segment it. Kerala and Malayali communities elsewhere in India and in the Gulf carry nearly all of the intent, and a pan-India send spends marketing rate on an audience that is not observing Onam.',
      },
      {
        question: 'What sells during Onam?',
        answer:
          'Onakkodi clothing for the whole family, cookware and serveware for the Sadya, groceries and sweets, and home decor for hosting. Gold also has a distinct Kerala Onam demand that most national campaigns miss.',
      },
    ],
  },
  {
    slug: 'milad-un-nabi',
    catalogName: 'Milad-un-Nabi',
    name: 'Milad-un-Nabi',
    shortName: 'Milad-un-Nabi',
    cluster: 'mid-year',
    tradition: 'islamic',
    regions: 'Kerala, Telangana, Uttar Pradesh, Jammu and Kashmir, West Bengal',
    title:
      'Milad-un-Nabi WhatsApp Templates: 4 Examples',
    description:
      '4 free Milad-un-Nabi WhatsApp message templates, written for an observance rather than a sale, with send timing and cost per delivered message.',
    keywords:
      'milad un nabi whatsapp template, eid e milad message customers, milad un nabi greeting business, free whatsapp message template, respectful festival message example',
    eyebrow:
      'Milad-un-Nabi',
    h1:
      'Milad-un-Nabi WhatsApp message templates',
    h1Accent:
      'Milad-un-Nabi',
    subtitle:
      'Four free Milad-un-Nabi WhatsApp templates for an observance with almost no retail intent — usually a greeting is the whole campaign.',
    answerFirst:
      'An observance marked by processions, readings and charity, not shopping. For almost every store the right campaign is one respectful greeting and nothing else.',
    peak:
      'There is no commercial peak. Any demand sits in the two days before, in a narrow set of categories.',
    buyerIntent:
      'Observance and charity. Where purchases happen they are tied to the occasion directly: sweets and food distributed to the community, attar and fragrance, modest clothing for processions and gatherings, and devotional books or prints. Nothing about the day suggests a general-purpose discount.',
    sells: [
      'Sweets and food in bulk, for community distribution',
      'Attar, itr and fragrance',
      'Modest wear and prayer caps',
      'Devotional books, prints and calligraphy',
    ],
    targeting:
      'Kerala, Telangana, Uttar Pradesh, Jammu and Kashmir and West Bengal segments, and only for the categories above. For everything else, send the greeting or send nothing.',
    watchOut:
      'Running the full four-message sequence because the library offers four. On a religious observance with no gifting convention, three sales messages in a week are the fastest way to earn a block from the community you are addressing.',
    faqs: [
      {
        question: 'Should a brand run a sale on Milad-un-Nabi?',
        answer:
          'Generally no. It is a religious observance marked by processions, readings and charity, not a shopping occasion. A short, respectful greeting on the day is the appropriate send for almost every category.',
      },
      {
        question: 'Which products are relevant to Milad-un-Nabi?',
        answer:
          'Sweets and food bought in bulk for community distribution, attar and fragrance, modest wear and prayer caps, and devotional books or calligraphy. Outside those, the occasion does not carry retail intent.',
      },
      {
        question: 'Is a Milad-un-Nabi greeting billed as marketing?',
        answer:
          'Yes. Every WhatsApp template that is not about an existing order falls under Meta’s marketing category, so a greeting costs ₹0.8631 per delivered message in India and needs marketing opt-in consent.',
      },
    ],
  },
  {
    slug: 'raksha-bandhan',
    catalogName: 'Raksha Bandhan',
    name: 'Raksha Bandhan',
    shortName: 'Raksha Bandhan',
    cluster: 'mid-year',
    tradition: 'hindu',
    regions: 'North and West India, with strong metro demand nationwide',
    title:
      'Raksha Bandhan WhatsApp Templates: Free Examples',
    description:
      '4 free Raksha Bandhan WhatsApp message templates to copy and edit, built around the Rakhi delivery cut-off, with send dates and cost per message.',
    keywords:
      'raksha bandhan whatsapp template, rakhi offer message to customers, rakhi sale whatsapp message, free whatsapp marketing template download, rakhi wishes message business',
    eyebrow:
      'Raksha Bandhan',
    h1:
      'Raksha Bandhan WhatsApp marketing templates',
    h1Accent:
      'Raksha Bandhan',
    subtitle:
      'Four free Rakhi WhatsApp templates built around the delivery cut-off, ready to copy, edit and submit to Meta.',
    answerFirst:
      'Pure gifting, a named recipient, and a quiet inbox. Delivery is the whole campaign, so the last offer goes on your shipping cut-off, not the day before.',
    peak:
      'Seven to three days before. Demand dies the moment your delivery promise can no longer reach the recipient.',
    buyerIntent:
      'Someone is buying a gift for a sibling, often in another city, and the decision is genuinely difficult — which is why the gift-guide message outperforms every other send in this campaign. Rakhis themselves are a low-value add-on; the gift beside them is where the money is. A large share of orders ship to an address that is not the buyer’s own.',
    sells: [
      'Gift hampers and curated sets, the highest-converting format of the week',
      'Sweets, chocolate and dry fruit',
      'Jewellery, watches and accessories for sisters',
      'Grooming, fragrance and gadgets for brothers',
      'Rakhis and pooja thalis as add-ons rather than the main purchase',
    ],
    targeting:
      'The full opted-in list. Rakhi is one of the few festivals where you cannot easily segment by region or gender, because everyone with a sibling is in the market and the buyer is as often the brother as the sister.',
    watchOut:
      'Running the discount at T-1 the way the rest of the calendar does. On Rakhi the gift has to physically arrive, so the last useful send is your shipping cut-off, and a code that lands the day before sells orders you cannot deliver on time.',
    faqs: [
      {
        question: 'When is the last day to send a Rakhi offer?',
        answer:
          'Your delivery cut-off, not the day before the festival. Because the gift has to reach a named recipient by a specific morning, the final offer should land three or four days out, and the message should say when orders stop shipping in time.',
      },
      {
        question: 'What converts best for Raksha Bandhan?',
        answer:
          'Curated gift sets and hampers. The buyer knows who they are buying for and does not know what to buy, so a shortlist removes the actual obstacle — which is why the gift-guide message is the strongest of the four in this campaign.',
      },
      {
        question: 'Should the Rakhi campaign be segmented by gender?',
        answer:
          'Not usefully. Brothers and sisters both buy, and the shipping address is frequently not the buyer’s own, so a split by past purchase category tends to work better than a split by gender.',
      },
    ],
  },
  {
    slug: 'krishna-janmashtami',
    catalogName: 'Krishna Janmashtami',
    name: 'Krishna Janmashtami',
    shortName: 'Janmashtami',
    cluster: 'festive-quarter',
    tradition: 'hindu',
    regions: 'Uttar Pradesh, Maharashtra, Gujarat, Rajasthan and Odisha',
    title:
      'Janmashtami WhatsApp Templates: 4 Free Examples',
    description:
      '4 free Krishna Janmashtami WhatsApp message templates to copy and edit, with midnight-observance send timing, what sells and cost per message.',
    keywords:
      'janmashtami whatsapp template, krishna janmashtami message customers, janmashtami offer whatsapp, free whatsapp template example, festival marketing message copy',
    eyebrow:
      'Krishna Janmashtami',
    h1:
      'Janmashtami WhatsApp marketing templates',
    h1Accent:
      'Janmashtami',
    subtitle:
      'Four free Janmashtami WhatsApp templates and the first send of the festive quarter, ready to copy, edit and submit to Meta.',
    answerFirst:
      'The first send of the festive quarter, and a cheap place to test your cadence. The observance peaks at midnight, so the greeting goes out in the evening.',
    peak:
      'The three days before. There is no long build-up, but there is a distinct evening spike on the day for anything deliverable locally.',
    buyerIntent:
      'Devotional and household, with a strong children’s angle: Krishna and Radha costumes for toddlers, laddu gopal idols and their outfits, jhula swings, puja items, and sweets — particularly makhan mishri and panjiri. In Maharashtra the Dahi Handi event adds an event-and-apparel layer that other states do not have.',
    sells: [
      'Laddu Gopal idols, outfits and jhula swings',
      'Children’s Krishna and Radha costumes',
      'Puja items, flowers and decor',
      'Sweets, makhan mishri and panjiri ingredients',
      'Traditional wear in yellows, blues and peacock tones',
    ],
    targeting:
      'Uttar Pradesh, Maharashtra, Gujarat, Rajasthan and Odisha, plus past buyers in devotional and children’s categories.',
    watchOut:
      'Sending the greeting in the morning. The birth is observed at midnight, so an evening send is both better timed and far more likely to be read — and it is the one festival where the late slot is the correct one.',
    faqs: [
      {
        question: 'What time should a Janmashtami message be sent?',
        answer:
          'Evening for the greeting, because the observance peaks at midnight. The offer and gift-guide messages still work best in the daytime a few days earlier, when there is time left to deliver.',
      },
      {
        question: 'Which categories sell for Janmashtami?',
        answer:
          'Laddu Gopal idols and outfits, jhula swings, children’s Krishna costumes, puja items, and sweets such as makhan mishri. In Maharashtra, Dahi Handi adds demand for event apparel.',
      },
      {
        question: 'Is Janmashtami worth a full four-message campaign?',
        answer:
          'For devotional, children’s and traditional-wear categories, yes. It is also the first send of the festive quarter, which makes it a low-risk place to test timing and cadence before Ganesh Chaturthi and Navratri.',
      },
    ],
  },
  {
    slug: 'ganesh-chaturthi',
    catalogName: 'Ganesh Chaturthi',
    name: 'Ganesh Chaturthi',
    shortName: 'Ganesh Chaturthi',
    cluster: 'festive-quarter',
    tradition: 'hindu',
    regions: 'Maharashtra above all, plus Karnataka, Goa, Telangana and Andhra Pradesh',
    title:
      'Ganesh Chaturthi WhatsApp Templates: Free Examples',
    description:
      '4 free Ganesh Chaturthi WhatsApp message templates to copy and edit, with the eleven-day send plan, what sells and cost per delivered message.',
    keywords:
      'ganesh chaturthi whatsapp template, ganpati offer message customers, ganesh chaturthi sale whatsapp, free whatsapp marketing template download, ganpati wishes message business',
    eyebrow:
      'Ganesh Chaturthi',
    h1:
      'Ganesh Chaturthi WhatsApp marketing templates',
    h1Accent:
      'Ganesh Chaturthi',
    subtitle:
      'Four free Ganpati WhatsApp templates across eleven days of demand, ready to copy, edit and submit to Meta.',
    answerFirst:
      'Where the festive quarter actually begins, and in Maharashtra it outsells Diwali. Eleven days of demand, and most campaigns stop after day one.',
    peak:
      'The five days before Chaturthi, then a sustained plateau across the eleven days for food, decor and gifting.',
    buyerIntent:
      'Households are preparing to host — an idol, decoration for the mandap, puja items, modak and prasad, and new clothes for the first day. Housing societies and mandals buy at scale for public pandals, which is a genuinely different, higher-volume buyer that most D2C campaigns never address. Gifting between visiting families runs through all eleven days.',
    sells: [
      'Eco-friendly idols, mandap decor, flowers and lighting',
      'Modak, sweets and prasad boxes',
      'Puja thalis, brass items and incense',
      'Ethnic wear for the first day and for visiting',
      'Bulk and society-scale orders for public pandals',
    ],
    targeting:
      'Maharashtra first and by a wide margin, then Karnataka, Goa, Telangana and Andhra Pradesh. Mumbai and Pune alone will justify a dedicated segment for most brands.',
    watchOut:
      'Stopping the campaign after day one. The festival runs eleven days and the visiting, gifting and food demand continues the whole way — a sequence that ends on Chaturthi morning leaves the longest tail in the calendar unworked.',
    faqs: [
      {
        question: 'How long does Ganesh Chaturthi demand last?',
        answer:
          'Eleven days, through to Anant Chaturdashi. The peak is the five days before the first day, but food, decor and gifting demand holds across the whole period, so the campaign should not stop on day one.',
      },
      {
        question: 'Should a Ganesh Chaturthi campaign be Maharashtra-only?',
        answer:
          'Not only, but Maharashtra should get its own segment and its own send timing. Karnataka, Goa, Telangana and Andhra Pradesh carry real demand too; the rest of India mostly does not.',
      },
      {
        question: 'What is the biggest missed opportunity at Ganesh Chaturthi?',
        answer:
          'Bulk buyers. Housing societies and mandals order at a scale no individual household matches, and almost no D2C WhatsApp campaign speaks to them. A single message offering society-scale pricing often outperforms the consumer sequence.',
      },
    ],
  },
  {
    slug: 'navratri-durga-puja',
    catalogName: 'Navratri / Durga Puja',
    name: 'Navratri and Durga Puja',
    shortName: 'Navratri',
    cluster: 'festive-quarter',
    tradition: 'hindu',
    regions: 'Gujarat as Navratri, West Bengal as Durga Puja, Maharashtra and Delhi NCR',
    title:
      'Navratri WhatsApp Marketing Templates: Free Examples',
    description:
      '4 free Navratri and Durga Puja WhatsApp message templates to copy and edit, with the nine-day send plan, colour angle and cost per message.',
    keywords:
      'navratri whatsapp template, durga puja offer message, navratri sale whatsapp message, free whatsapp marketing template download, garba offer message example',
    eyebrow:
      'Navratri and Durga Puja',
    h1:
      'Navratri WhatsApp marketing templates',
    h1Accent:
      'Navratri',
    subtitle:
      'Four free Navratri and Durga Puja WhatsApp templates across nine days of demand, ready to copy, edit and submit to Meta.',
    answerFirst:
      'Nine days, nine colours, and the only festival where sending more than four times is defensible. Gujarat buys garba wear, Bengal buys for Durga Puja — do not merge them.',
    peak:
      'The seven days before day one, then a sustained plateau across all nine days with a second lift before Ashtami.',
    buyerIntent:
      'In Gujarat and the West it is garba: chaniya cholis, jewellery, footwear you can dance in, and a new outfit for several of the nine nights — a genuinely repeat-purchase pattern inside one festival. In Bengal it is Durga Puja, the largest event of the year, built around new clothes for the whole family, pandal visiting and eating out. Both run alongside a large nine-day fasting segment buying vrat food.',
    sells: [
      'Chaniya cholis, lehengas and garba wear, often more than one per customer',
      'Oxidised and statement jewellery, bangles and footwear',
      'Durga Puja family apparel, strongest in West Bengal',
      'Vrat and fasting foods across all nine days',
      'Beauty, hair and makeup for nine nights of events',
    ],
    targeting:
      'Gujarat and Maharashtra for the garba angle, West Bengal for Durga Puja, with separate copy for each. The fasting segment cuts across both and can be targeted on past vrat-category purchases.',
    watchOut:
      'Sending one message that calls the festival Navratri to a Bengali audience. Durga Puja is not Navratri under another name — the rituals, the shopping list and the days that matter are different, and a merged send reads as a brand that did not bother to look.',
    faqs: [
      {
        question: 'Can I send more than four messages during Navratri?',
        answer:
          'Yes, and it is the one festival where it is defensible. Each of the nine days has an assigned colour, so a colour-of-the-day send is useful content for apparel, jewellery and beauty brands. Outside those categories, stick to the four-message sequence.',
      },
      {
        question: 'Should Navratri and Durga Puja share one campaign?',
        answer:
          'Same dates, different copy. Gujarat and Maharashtra are buying garba wear across nine nights; West Bengal is buying family clothing for its biggest festival of the year. Use two audience segments with two versions of the message rather than one generic send.',
      },
      {
        question: 'What is the best Navratri offer for an apparel brand?',
        answer:
          'Something that rewards a second purchase. Customers genuinely buy more than one outfit for nine nights, so a multi-buy or bundle offer fits the actual behaviour better than a flat percentage off a single item.',
      },
    ],
  },
  {
    slug: 'dussehra',
    catalogName: 'Dussehra',
    name: 'Dussehra',
    shortName: 'Dussehra',
    cluster: 'festive-quarter',
    tradition: 'hindu',
    regions: 'Pan-India, with Mysuru, Kullu, Delhi NCR and West Bengal as Bijoya Dashami',
    title:
      'Dussehra WhatsApp Marketing Templates: Free Examples',
    description:
      '4 free Dussehra WhatsApp message templates to copy and edit, written for an auspicious buying day, with send dates and cost per message.',
    keywords:
      'dussehra whatsapp template, dussehra offer message to customers, vijayadashami sale whatsapp, free whatsapp marketing template, dussehra wishes message business',
    eyebrow:
      'Dussehra campaign',
    h1:
      'Dussehra WhatsApp marketing templates',
    h1Accent:
      'Dussehra',
    subtitle:
      'Four free Dussehra WhatsApp templates for an auspicious buying day and the warm-up to Diwali, ready to copy and edit.',
    answerFirst:
      'An auspicious day to start something, so vehicles, electronics and appliances convert. Keep the discount small: Dhanteras and Diwali are barely two weeks away.',
    peak:
      'The two days before and the day itself, which is unusual — the auspicious-purchase behaviour makes the date the destination.',
    buyerIntent:
      'Two separate buyers. One is making an auspicious start: a vehicle, electronics, tools, a first instalment on something large. The other is buying for the day — new clothes, sweets, puja items, and Bijoya gifting in Bengal. The first is where the margin is, and it is the buyer most Dussehra campaigns talk straight past.',
    sells: [
      'Vehicles, electronics, appliances and tools, on the auspicious-start behaviour',
      'Gold and silver as a token purchase',
      'Ethnic wear and footwear',
      'Sweets and gifting boxes, strongest in West Bengal for Bijoya',
      'Puja items, aparajita flowers and shami leaves',
    ],
    targeting:
      'The whole opted-in list, with a separate high-AOV segment for the auspicious-purchase pitch. Add a Bengal segment for Bijoya Dashami gifting.',
    watchOut:
      'Spending your best offer here. Dhanteras and Diwali are seventeen and nineteen days away, and a customer who gets your deepest discount at Dussehra has no reason to buy again in the window that matters most.',
    faqs: [
      {
        question: 'Is Dussehra a good day to sell high-value products?',
        answer:
          'Yes. It is widely considered auspicious for starting something new, so vehicles, electronics, appliances and tools convert unusually well on the day. That buyer is distinct from the clothes-and-sweets buyer and deserves its own message.',
      },
      {
        question: 'How should Dussehra and Diwali campaigns relate?',
        answer:
          'Treat Dussehra as the opening of the same run. Keep the Dussehra discount modest, capture engagement, and roll the customers who opened into the Dhanteras and Diwali sequence seventeen to nineteen days later where your real offer belongs.',
      },
      {
        question: 'What is Bijoya Dashami and does it change the campaign?',
        answer:
          'It is the Bengali observance of the same day, centred on visiting, sweets and gifting rather than an auspicious purchase. For a Bengal segment, lead the gift-guide message with sweets and gift boxes instead of big-ticket products.',
      },
    ],
  },
  {
    slug: 'karwa-chauth',
    catalogName: 'Karwa Chauth',
    name: 'Karwa Chauth',
    shortName: 'Karwa Chauth',
    cluster: 'festive-quarter',
    tradition: 'hindu',
    regions: 'Punjab, Haryana, Delhi NCR, Uttar Pradesh, Rajasthan and Madhya Pradesh',
    title:
      'Karwa Chauth WhatsApp Templates: 4 Free Examples',
    description:
      '4 free Karwa Chauth WhatsApp message templates to copy and edit, with moonrise-evening timing, the two buyers to target and cost per message.',
    keywords:
      'karwa chauth whatsapp template, karva chauth offer message, karwa chauth gift whatsapp message, free whatsapp marketing template download, karwa chauth wishes business',
    eyebrow:
      'Karwa Chauth',
    h1:
      'Karwa Chauth WhatsApp marketing templates',
    h1Accent:
      'Karwa Chauth',
    subtitle:
      'Four free Karwa Chauth WhatsApp templates for a day with two buyers and an evening deadline, ready to copy and edit.',
    answerFirst:
      'Two buyers, and most campaigns reach only one. Women plan ahead; husbands buy the moonrise gift in the final 48 hours, and that is where the money is.',
    peak:
      'The two days before, with a heavy last-48-hour spike from gift buyers and a same-day evening tail.',
    buyerIntent:
      'The self-purchase is ritual-driven and planned: specific colours, specific items, bought with time to spare. The gift purchase is emotional, last-minute and unusually price-insensitive — jewellery, a watch, flowers, a bag. The gift-guide message is the highest-value send in this campaign, and it should be written for someone who has left it late and wants to be told what to buy.',
    sells: [
      'Jewellery — the single strongest gifting category of the day',
      'Red, maroon and festive ethnic wear, sarees and suits',
      'Bangles, bindis, sindoor and solah shringar sets',
      'Karwa Chauth thali kits, sieves and puja sets',
      'Mehendi, beauty, skincare and salon services',
      'Flowers, chocolates and gift hampers for the moonrise gift',
    ],
    targeting:
      'Punjab, Haryana, Delhi NCR, Uttar Pradesh, Rajasthan and Madhya Pradesh. Then split the gift-guide send toward male customers, because that is the buyer the generic festive message always loses.',
    watchOut:
      'Timing the day-of send in the morning. The fast runs sunrise to moonrise and the gift is given in the evening, so a message that lands at 9am reaches someone who is fasting, not shopping — and a same-day gifting nudge sent at 4pm catches the buyer who has not bought yet.',
    faqs: [
      {
        question: 'Who should a Karwa Chauth campaign target?',
        answer:
          'Both buyers. Women buying ritual items and an outfit plan ahead, so reach them with early access a week out. Husbands buying the moonrise gift decide in the final two days, so the gift-guide and offer messages should be written for them.',
      },
      {
        question: 'What time should Karwa Chauth messages be sent?',
        answer:
          'Afternoon and evening on the day itself. The fast runs from sunrise to moonrise and the gift is given at night, so an evening send reaches a gift buyer who still has time, while a morning send reaches someone who is fasting.',
      },
      {
        question: 'What sells best on Karwa Chauth?',
        answer:
          'Jewellery, by a wide margin, followed by red and maroon ethnic wear, bangles and shringar sets, thali kits, and mehendi and beauty. The last-minute gift buyer is noticeably less price-sensitive than the planned self-purchase.',
      },
    ],
  },
  {
    slug: 'dhanteras',
    catalogName: 'Dhanteras',
    name: 'Dhanteras',
    shortName: 'Dhanteras',
    cluster: 'festive-quarter',
    tradition: 'hindu',
    regions: 'Pan-India, strongest in Gujarat, Maharashtra, Rajasthan and North India',
    title:
      'Dhanteras WhatsApp Templates: 4 Free Examples',
    description:
      '4 free Dhanteras WhatsApp message templates to copy and edit, written for the highest-value buying day of the year, with send dates and cost.',
    keywords:
      'dhanteras whatsapp template, dhanteras offer message customers, dhanteras gold sale whatsapp, free whatsapp marketing template download, dhanteras wishes message business',
    eyebrow:
      'Dhanteras',
    h1:
      'Dhanteras WhatsApp marketing templates',
    h1Accent:
      'Dhanteras',
    subtitle:
      'Four free Dhanteras WhatsApp templates for buyers who have already decided to spend, ready to copy, edit and submit to Meta.',
    answerFirst:
      'The biggest single buying day in Indian retail, where customers arrive having already decided to spend. Do not discount into demand that is already there.',
    peak:
      'The day itself, with a heavy morning and a strong muhurat window in the evening.',
    buyerIntent:
      'The purchase is the ritual. Buying metal on Dhanteras is believed to bring prosperity, so the customer is not weighing whether to buy — they are choosing where. That makes availability, trust and a credible delivery or collection promise far more decisive than discount depth, and it is the one day where a sold-out message costs you more than a full-price one.',
    sells: [
      'Gold and silver coins, bars and jewellery',
      'Digital gold and investment products',
      'Brass, copper and steel utensils and kitchenware',
      'Appliances and electronics for the home',
      'Puja items, Lakshmi and Ganesh idols, diyas',
    ],
    targeting:
      'The entire opted-in list, led by your highest-AOV segment. This is the one send of the year where putting the most expensive product in the first line is simply correct.',
    watchOut:
      'Discounting into demand that already exists. Dhanteras buyers convert at full price, so use the flash-sale message for a making-charge waiver, a rate lock, an EMI option or a guaranteed delivery date — and keep the percentage off for a day when you actually need it.',
    faqs: [
      {
        question: 'Why is Dhanteras the biggest sales day in India?',
        answer:
          'Because buying metal on the day is believed to bring prosperity, so the decision to spend is made before the customer starts shopping. Gold and silver lead, with utensils, appliances and anything new for the home close behind.',
      },
      {
        question: 'Should I discount on Dhanteras?',
        answer:
          'Not deeply. Demand is already there, so a making-charge waiver, a gold-rate lock, EMI or a guaranteed delivery slot moves more volume than a percentage off — and protects the margin on the highest-AOV day you get.',
      },
      {
        question: 'How do Dhanteras and Diwali campaigns fit together?',
        answer:
          'Dhanteras is two days before Diwali, so they are one compressed run. Put your high-value and metal products in the Dhanteras messages and your gifting, decor and apparel products in the Diwali ones, rather than sending the same offer twice.',
      },
    ],
  },
  {
    slug: 'diwali',
    catalogName: 'Diwali',
    name: 'Diwali',
    shortName: 'Diwali',
    cluster: 'festive-quarter',
    tradition: 'hindu',
    regions: 'Pan-India, and the largest commercial event of the Indian year',
    title:
      'Diwali WhatsApp Marketing Templates: 4 Free Examples',
    description:
      '4 free Diwali WhatsApp message templates to copy, edit and send — early access, gift picks, flash sale and greeting, with send dates and cost.',
    keywords:
      'diwali whatsapp template, diwali offer message to customers, diwali sale whatsapp message, free whatsapp marketing template download, happy diwali message for business',
    eyebrow:
      'Diwali campaign',
    h1:
      'Diwali WhatsApp marketing templates',
    h1Accent:
      'Diwali',
    subtitle:
      'Four free Diwali WhatsApp templates you can copy, edit and submit to Meta — the biggest week of the year, and the most crowded inbox.',
    answerFirst:
      'The largest commercial event in India and the hardest inbox of the year to be read in. Start ten to twelve days out, and stop promising delivery in the final three.',
    peak:
      'Ten to four days before. The last three days belong to local delivery and quick commerce, not to anyone shipping across the country.',
    buyerIntent:
      'Three buyers at once, and they want different things. Corporate and bulk gifting is decided earliest and has the largest basket. Family gifting is the volume driver and stalls on indecision. Self-purchase — clothes, decor, electronics, the home upgrade — runs through the whole window. A campaign that writes one message for all three reaches none of them properly.',
    sells: [
      'Gift hampers and corporate gifting, booked earliest and at the highest value',
      'Diyas, lights, rangoli and home decor',
      'Ethnic wear and footwear for the whole family',
      'Sweets, chocolate and dry fruit',
      'Electronics, appliances and home upgrades',
      'Gold, silver and jewellery, carried over from Dhanteras',
    ],
    targeting:
      'Everyone opted in, but in waves: corporate and high-AOV buyers first with early access, then the full list for gift picks, then the non-openers for the discount. Sending one blast to the whole list on the same day is how a Diwali campaign gets ignored.',
    watchOut:
      'Promising Diwali delivery in the last three days. Courier networks saturate, pickups get missed, and a parcel arriving on the 10th for a festival on the 8th turns your best sales week into your worst support week. Publish the cut-off in the flash-sale message and hold the line.',
    faqs: [
      {
        question: 'When should a Diwali WhatsApp campaign start?',
        answer:
          'Ten to twelve days before Diwali, earlier than for any other Indian festival. Gifting decisions are made early, corporate orders earlier still, and the final three days belong to local delivery rather than nationwide shipping.',
      },
      {
        question: 'How many WhatsApp messages should a Diwali campaign send?',
        answer:
          'Four is the right shape: early access, gift picks, a discount and a greeting. What matters more than the count is that they go to different segments in waves — the same four messages blasted to the entire list on the same days perform far worse.',
      },
      {
        question: 'What does a Diwali WhatsApp campaign cost?',
        answer:
          'All four templates are marketing, billed by Meta at ₹0.8631 per delivered message in India, so about ₹3.45 to reach one customer across the full sequence — roughly ₹3,450 for a list of a thousand. TopEdge adds no markup on Meta’s rates.',
      },
      {
        question: 'Can I add a Diwali greeting to my order confirmation instead?',
        answer:
          'You can, but it changes the price. An order update is a utility template at ₹0.1150; add festive wording with an offer and Meta reclassifies it as marketing at ₹0.8631 on every send, including the order confirmations that were cheap before.',
      },
    ],
  },
  {
    slug: 'bhai-dooj',
    catalogName: 'Bhai Dooj',
    name: 'Bhai Dooj',
    shortName: 'Bhai Dooj',
    cluster: 'festive-quarter',
    tradition: 'hindu',
    regions: 'North and West India, Maharashtra as Bhau Beej, Bengal as Bhai Phonta',
    title:
      'Bhai Dooj WhatsApp Templates: 4 Free Examples',
    description:
      '4 free Bhai Dooj WhatsApp message templates to copy and edit, with the post-Diwali send window, sibling gifting angle and cost per message.',
    keywords:
      'bhai dooj whatsapp template, bhai dooj gift message, bhau beej offer whatsapp, free whatsapp message template example, bhai dooj wishes message business',
    eyebrow:
      'Bhai Dooj',
    h1:
      'Bhai Dooj WhatsApp marketing templates',
    h1Accent:
      'Bhai Dooj',
    subtitle:
      'Four free Bhai Dooj WhatsApp templates for the last gifting day of the festive quarter, ready to copy and edit.',
    answerFirst:
      'Sibling gifting three days after Diwali, into a list that has just had a full festive run. Send two or three messages, and make the offer a different one.',
    peak:
      'The two days after Diwali. There is no run-up to speak of, because Diwali occupies it.',
    buyerIntent:
      'A sister is buying for a brother or the reverse, often while already together for Diwali, which means same-city and same-day delivery matter more here than in any other festival on this list. Baskets are moderate, decisions are fast, and the buyer is frequently someone who bought from you four days earlier — so send them something different, not the same hamper.',
    sells: [
      'Gift sets and hampers aimed at siblings',
      'Sweets, chocolate and dry fruit',
      'Grooming, fragrance and accessories for brothers',
      'Jewellery and accessories at accessible price points for sisters',
      'Tilak thalis and pooja kits as add-ons',
    ],
    targeting:
      'Your Diwali non-buyers first — they have intent left and no purchase — then Diwali buyers with a deliberately different product set. North India, Maharashtra and Bengal carry most of the volume.',
    watchOut:
      'Sending the same offer your Diwali flash sale carried. A customer who ignored it three days ago will ignore it again, and a customer who took it has already bought. Change the product, the format or the price point, or do not send.',
    faqs: [
      {
        question: 'Is Bhai Dooj worth a campaign so soon after Diwali?',
        answer:
          'Yes, but a shorter one. It is genuine sibling gifting with a named recipient, so the gift-picks message converts — but your list has just been through the Diwali sequence, so two or three sends beat four and the offer has to be different from the Diwali one.',
      },
      {
        question: 'What should go in a Bhai Dooj gift message?',
        answer:
          'A shortlist split by recipient — a few picks for brothers, a few for sisters — plus a clear delivery promise. Buyers are often in the same city as the recipient, so same-day or next-day options convert better than any discount.',
      },
      {
        question: 'Who should the Bhai Dooj message go to first?',
        answer:
          'Customers who engaged with the Diwali campaign but did not buy. They still have festive intent and no purchase, which makes them a far better audience than the buyers who checked out three days earlier.',
      },
    ],
  },
  {
    slug: 'chhath-puja',
    catalogName: 'Chhath Puja',
    name: 'Chhath Puja',
    shortName: 'Chhath Puja',
    cluster: 'festive-quarter',
    tradition: 'hindu',
    regions: 'Bihar, Jharkhand, eastern Uttar Pradesh, and migrant communities in Delhi and Mumbai',
    title:
      'Chhath Puja WhatsApp Templates: 4 Free Examples',
    description:
      '4 free Chhath Puja WhatsApp message templates to copy and edit, with the four-day send window, the prescribed items that sell and cost per message.',
    keywords:
      'chhath puja whatsapp template, chhath puja offer message, chhath message to customers, free whatsapp marketing template, chhath puja wishes message business',
    eyebrow:
      'Chhath Puja',
    h1:
      'Chhath Puja WhatsApp marketing templates',
    h1Accent:
      'Chhath Puja',
    subtitle:
      'Four free Chhath Puja WhatsApp templates for a strictly observed festival with a loyal regional audience, ready to copy and edit.',
    answerFirst:
      'The strictest festival here: the ritual prescribes the items, so availability beats discount. Everything has to be in hand before Nahay Khay.',
    peak:
      'The four to six days before Nahay Khay, because the ingredients and vessels have to be in hand before the observance starts.',
    buyerIntent:
      'This is procurement, not shopping. A household observing Chhath needs a defined list of items by a specific day, and substitutes are not acceptable — which makes availability and delivery certainty worth far more than price. Demand is deep inside Bihar, Jharkhand and eastern Uttar Pradesh, and strong among migrant communities in Delhi and Mumbai who cannot source locally.',
    sells: [
      'Bamboo soop, daura and dala baskets',
      'Sugarcane, thekua ingredients, jaggery and wheat flour',
      'New unstitched and unworn cotton clothing, particularly sarees',
      'Brass and copper puja vessels, diyas and sindoor',
      'Seasonal fruit sets for the offering',
    ],
    targeting:
      'Bihar, Jharkhand and eastern Uttar Pradesh, plus Delhi NCR and Mumbai migrant communities — the second group is the more valuable audience because local sourcing is harder for them.',
    watchOut:
      'Offering substitutes or a generic festive bundle. The items are prescribed by the ritual, so a near-equivalent is not a sale, it is a return — and a brand that gets this wrong publicly loses a regional audience that is otherwise unusually loyal.',
    faqs: [
      {
        question: 'What do customers actually buy for Chhath Puja?',
        answer:
          'A prescribed list: bamboo soop and daura baskets, sugarcane, thekua ingredients, new unworn cotton clothing, brass and copper vessels, and seasonal fruit. Because the ritual specifies the items, availability matters far more than discount.',
      },
      {
        question: 'When should a Chhath Puja campaign be sent?',
        answer:
          'Four to six days before Nahay Khay, the first of the four days. Everything has to be in hand before the observance begins, so a message that arrives after the fast has started has nothing left to sell.',
      },
      {
        question: 'Who is the best audience for a Chhath campaign?',
        answer:
          'Bihar, Jharkhand and eastern Uttar Pradesh for volume, and migrant communities in Delhi NCR and Mumbai for value — they face the hardest time sourcing the prescribed items locally and convert strongly on a reliable delivery promise.',
      },
    ],
  },
  {
    slug: 'christmas',
    catalogName: 'Christmas',
    name: 'Christmas',
    shortName: 'Christmas',
    cluster: 'december',
    tradition: 'christian',
    regions: 'Pan-India in metros, strongest in Kerala, Goa, the North East, Mumbai and Bengaluru',
    title:
      'Christmas WhatsApp Templates: 4 Free Examples to Copy',
    description:
      '4 free Christmas WhatsApp message templates to copy, edit and send, with the December send plan, the shipping cut-off that decides it, and cost.',
    keywords:
      'christmas whatsapp template, christmas message to customers, christmas sale whatsapp message, free whatsapp marketing template download, merry christmas message for business',
    eyebrow:
      'Christmas campaign',
    h1:
      'Christmas WhatsApp marketing templates',
    h1Accent:
      'Christmas',
    subtitle:
      'Four free Christmas WhatsApp templates built around your shipping cut-off, ready to copy, edit and submit to Meta.',
    answerFirst:
      'The longest lead time of any festival here, and the hardest deadline. Nationwide delivery stops being reliable around the 20th, so that is your last offer — not the 23rd.',
    peak:
      '10 December to 20 December, ending at your shipping cut-off rather than at the date.',
    buyerIntent:
      'Metro-India Christmas is a secular gifting and party season layered over a religious festival, which means two audiences. One is observing: Sunday service clothing, church and home decor, the family lunch, cake and plum pudding. The other is buying gifts, Secret Santa presents and party outfits regardless of faith. December corporate gifting also closes in this window and has the largest baskets of the month.',
    sells: [
      'Gift sets, hampers and Secret Santa price-point products',
      'Cake, plum cake, chocolate and bakery pre-orders',
      'Party and occasion wear, plus winter apparel',
      'Trees, lights, ornaments and home decor',
      'Toys, books and children’s gifts',
      'Corporate gifting, which closes in the first half of December',
    ],
    targeting:
      'The whole opted-in list for gifting, with a tighter segment in Kerala, Goa, the North East and metro Christian communities for the observance-led products. Corporate buyers should be contacted by the first week of December.',
    watchOut:
      'Letting the final offer sit until the 22nd or 23rd because the date is the 25th. Nationwide courier delivery stops being reliable around the 20th, and a Christmas gift that arrives on the 27th is a refund. Make your cut-off date the headline of the flash-sale message, not a footnote.',
    faqs: [
      {
        question: 'When should a Christmas WhatsApp campaign start in India?',
        answer:
          'Around 8 to 10 December for early access, with gift picks about the 15th and the final offer on your shipping cut-off — usually the 19th or 20th for nationwide delivery. Corporate gifting should be approached in the first week of the month.',
      },
      {
        question: 'What should the last Christmas message say?',
        answer:
          'The cut-off date, prominently. By the final send the useful information is not the discount but whether the parcel will arrive in time, so lead with "order by the 20th to get it before Christmas" and let the offer follow.',
      },
      {
        question: 'Does Christmas work for brands outside the metros?',
        answer:
          'The gifting and party side does, nationwide — Secret Santa, party wear, cake and hampers are not tied to observance. The decor and church-adjacent categories concentrate in Kerala, Goa, the North East and the metros, so segment those rather than sending them everywhere.',
      },
    ],
  },
];

/* ────────────────────────────────────────────────────────────────────────────
   Paths, joins and lookups
   ──────────────────────────────────────────────────────────────────────────── */

export const FESTIVAL_HUB_PATH = '/whatsapp-festival-templates';

export function festivalPath(slug: string): string {
  return `${FESTIVAL_HUB_PATH}/${slug}`;
}

/**
 * Meta's India marketing rate, per delivered message.
 *
 * Every festive template is a marketing template — there is no utility
 * classification for a message that exists to make a sale — so this is the only
 * rate that applies on these pages. Kept as a string because it is published
 * copy, not arithmetic input, and mirrors TEMPLATE_RATE in whatsappTemplates.ts.
 */
export const FESTIVAL_MARKETING_RATE = '₹0.8631';

/** The full four-message run, per customer reached. 4 × 0.8631 = 3.4524. */
export const FESTIVAL_SEQUENCE_COST = '₹3.45';

export const FESTIVAL_TEMPLATE_COUNT = FESTIVAL_CATALOG.length;

export function festivalBySlug(slug: string): Festival | null {
  return FESTIVALS.find((f) => f.slug === slug) || null;
}

export type FestivalTemplateItem = {
  /** Catalog id — unique across the library, so it keys a flat grid. */
  id: string;
  festival: Festival;
  stage: FestivalStage;
  row: FestivalCatalogRow;
};

/** One festival's four templates, in send order, joined to their stage copy. */
export function festivalTemplateItems(festival: Festival): FestivalTemplateItem[] {
  return catalogRowsForFestival(festival.catalogName).map((row) => ({
    id: row.id,
    festival,
    stage: FESTIVAL_STAGE_BY_ID[row.stage],
    row,
  }));
}

/**
 * Every template in the library, flattened, festival by festival in calendar
 * order. This is what the hub grid filters over.
 */
export const FESTIVAL_LIBRARY: FestivalTemplateItem[] = FESTIVALS.flatMap((f) =>
  festivalTemplateItems(f),
);

/**
 * Festivals grouped by calendar cluster, clusters in calendar order, and each
 * cluster sorted by the occurrence that is actually next.
 *
 * FESTIVALS is written in 2026 order, but most of these move with the lunar
 * calendar and reorder themselves from one year to the next — Onam and Raksha
 * Bandhan swap places between 2026 and 2027. Sorting on the resolved date
 * means a merchant reads the cards in the order the year will give them.
 */
export function festivalsByCluster(
  now: Date = new Date(),
): { cluster: FestivalCluster; festivals: Festival[] }[] {
  return FESTIVAL_CLUSTERS.map((cluster) => ({
    cluster,
    festivals: FESTIVALS.filter((f) => f.cluster === cluster.id).sort((a, b) => {
      const da = festivalTiming(a, now).date;
      const db = festivalTiming(b, now).date;
      if (!da || !db) return 0;
      return da.getTime() - db.getTime();
    }),
  })).filter((g) => g.festivals.length > 0);
}

/** A festival's timing, resolved against its catalog date string. */
export function festivalTiming(festival: Festival, now: Date = new Date()): FestivalTiming {
  const row = FESTIVAL_CATALOG.find((r) => r.festivalName === festival.catalogName);
  return resolveFestivalTiming(row?.festivalDate || '', now);
}

/**
 * The next festivals a merchant can still act on, soonest first.
 *
 * Falls back to calendar order once every listed occurrence has passed, so the
 * strip never renders empty — a page that shows nothing because the vendored
 * catalog has aged out is worse than one showing January again.
 */
export function upcomingFestivals(
  limit = 4,
  now: Date = new Date(),
): { festival: Festival; timing: FestivalTiming }[] {
  const withTiming = FESTIVALS.map((festival) => ({ festival, timing: festivalTiming(festival, now) }));
  const ahead = withTiming
    .filter((x) => !x.timing.isPast && x.timing.daysAway != null)
    .sort((a, b) => (a.timing.daysAway as number) - (b.timing.daysAway as number));
  return (ahead.length ? ahead : withTiming).slice(0, limit);
}

/** Sibling festivals for the "what else is close" rail on a detail page. */
export function nearbyFestivals(festival: Festival, limit = 3): Festival[] {
  const sameCluster = FESTIVALS.filter((f) => f.cluster === festival.cluster && f.slug !== festival.slug);
  if (sameCluster.length >= limit) return sameCluster.slice(0, limit);
  const rest = FESTIVALS.filter(
    (f) => f.slug !== festival.slug && !sameCluster.some((s) => s.slug === f.slug),
  );
  return [...sameCluster, ...rest].slice(0, limit);
}

/** Slugs in calendar order — the route registry mirrors this list. */
export const FESTIVAL_SLUGS = FESTIVALS.map((f) => f.slug);

/**
 * A stage's send window as real dates, taken from the festival's own date.
 *
 * "7 to 10 days before" is the rule; "29 Oct to 1 Nov" is what a merchant puts
 * in a calendar. The festival date is the one still ahead, so the window moves
 * with the year rather than freezing at whatever was next when the page was
 * prerendered.
 */
export function stageSendWindow(
  festival: Festival,
  stage: FestivalStage,
  now: Date = new Date(),
): string {
  const { date } = festivalTiming(festival, now);
  if (!date) return stage.timing;

  const at = (offset: number) => {
    const d = new Date(date.getTime());
    d.setDate(d.getDate() + offset);
    return d;
  };
  const fmt = (d: Date) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  if (stage.offsetFrom === stage.offsetTo) return fmt(at(stage.offsetFrom));
  return `${fmt(at(stage.offsetFrom))} – ${fmt(at(stage.offsetTo))}`;
}
