import { Link, Navigate } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { Section, SectionHeading, PrimaryButton } from '../components/ui';
import { TopicBlockView, type TopicBlock } from '../components/topic/TopicBlocks';
import FaqAccordion from '../components/topic/FaqAccordion';
import JourneyHero from '../components/journey/JourneyHero';
import TrustBand from '../components/journey/TrustBand';
import FestivalCard from '../components/festival/FestivalCard';
import FestivalTemplateCard from '../components/festival/FestivalTemplateCard';
import FestivalPersonalise from '../components/festival/FestivalPersonalise';
import {
  FESTIVAL_HUB_PATH,
  FESTIVAL_MARKETING_RATE,
  FESTIVAL_SEQUENCE_COST,
  FESTIVAL_TRADITION_LABEL,
  festivalBySlug,
  festivalPath,
  festivalTemplateItems,
  festivalTiming,
  nearbyFestivals,
  stageSendWindow,
} from '../data/festivalTemplates';
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
import { downloadTemplatesCsv } from '../lib/templateExport';
import { SITE_URL } from '../data/marketingSeo';
import '../styles/journey-flow.css';
import '../styles/festival-templates.css';

/**
 * One festival, with its four templates and the brief around them.
 *
 * The page is ordered the way the decision is made: what this festival is
 * commercially, then the four messages with the dates to send them, then how to
 * make them yours, then the cost and the rules. The previews come before the
 * prose on purpose — a merchant who has searched for "Diwali WhatsApp message"
 * wants to see the message, and will read the argument for it afterwards.
 */
export default function FestivalTemplatePage({ slug }: { slug: string }) {
  const festival = festivalBySlug(slug);
  if (!festival) return <Navigate to={FESTIVAL_HUB_PATH} replace />;

  const path = festivalPath(festival.slug);
  const timing = festivalTiming(festival);
  const items = festivalTemplateItems(festival);
  const siblings = nearbyFestivals(festival, 3);

  /*
   * Two FAQs every one of these pages earns, built from the festival name so
   * each page's FAQPage block stays distinct rather than twenty-five copies of
   * the same two questions. They are here and not in the data file because
   * they describe what the page does, not what the festival is.
   */
  const faqs = [
    ...festival.faqs,
    {
      question: `Can I download these ${festival.shortName} WhatsApp templates for free?`,
      answer: `Yes. Download all four as a CSV from the button above the previews, or copy any single message with the button on its card. The CSV carries the body, footer, button label, Meta template name and send window in separate columns. No sign-up, no email.`,
    },
    {
      question: `Can I edit the ${festival.shortName} template copy?`,
      answer: `You are expected to. Each template arrives with the body, footer and button already in place and your store name and discount code left as blanks, so you change the wording, the offer, the button and the language, then submit it to Meta under your own WhatsApp Business account. The copy here is a starting draft, not a script.`,
    },
  ];

  const blocks: TopicBlock[] = [
    {
      kind: 'specTable',
      id: 'when-to-send',
      h2: `When to send each ${festival.shortName} message`,
      intro: timing.date
        ? `Dates below are counted from ${timing.fullLabel}. Submit the templates to Meta about a week before the first send, so an approval queue is never the thing that decides the campaign.`
        : 'Submit the templates to Meta about a week before the first send, so an approval queue is never the thing that decides the campaign.',
      columns: ['Message', 'Send window', 'Who it goes to'],
      rows: [
        {
          label: 'Early access',
          cells: [stageSendWindow(festival, items[0].stage), 'Repeat buyers and your highest-spend segment'],
          note: items[0].stage.purpose,
        },
        {
          label: 'Gift guide',
          cells: [stageSendWindow(festival, items[1].stage), 'The full opted-in list'],
          note: items[1].stage.purpose,
        },
        {
          label: 'Flash sale',
          cells: [stageSendWindow(festival, items[2].stage), 'Everyone who has not bought from the first two'],
          note: items[2].stage.purpose,
        },
        {
          label: 'Day-of greeting',
          cells: [stageSendWindow(festival, items[3].stage), 'The full opted-in list, offer-free'],
          note: items[3].stage.purpose,
        },
      ],
      footnote:
        'Windows are a starting point, not a rule. Shift them earlier if you ship nationwide, and earlier again for anything that has to arrive before the day.',
    },
    {
      kind: 'prose',
      id: 'buyer',
      h2: `What your customer is buying at ${festival.shortName}`,
      body: [festival.buyerIntent, `**Who to send to.** ${festival.targeting}`],
    },
    {
      kind: 'callout',
      id: 'watch-out',
      tone: 'warn',
      title: `The ${festival.shortName} mistake that costs the most`,
      body: festival.watchOut,
    },
    {
      kind: 'callout',
      id: 'cost',
      tone: 'note',
      title: `What this campaign costs: ${FESTIVAL_SEQUENCE_COST} per customer`,
      body: `All four ${festival.shortName} templates are marketing templates, which Meta bills at ${FESTIVAL_MARKETING_RATE} per delivered message in India — about ${FESTIVAL_SEQUENCE_COST} to reach one customer across the sequence, or roughly ₹3,450 for a list of a thousand. Meta bills your own WhatsApp Business account and TopEdge adds no markup.`,
      link: { label: 'See the full India rate card', href: '/pricing/meta-rates' },
    },
  ];

  return (
    <>
      <MarketingSEO
        title={festival.title}
        description={festival.description}
        keywords={festival.keywords}
        path={path}
        noSuffix
        faqSchema={faqs}
        jsonLd={[
          organizationJsonLd(),
          softwareApplicationJsonLd(),
          webPageJsonLd({ name: festival.h1, description: festival.description, path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Free WhatsApp marketing templates', path: FESTIVAL_HUB_PATH },
            { name: festival.shortName, path },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `${festival.name} WhatsApp message templates`,
            numberOfItems: items.length,
            itemListElement: items.map((item, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: item.row.internalName,
              description: item.stage.purpose,
              url: `${SITE_URL}${path}#${item.row.metaName}`,
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: `How to send a ${festival.shortName} WhatsApp campaign`,
            description: `Copy, edit and submit the four ${festival.shortName} WhatsApp message templates, then schedule the sequence against the festival date.`,
            step: items.map((item, i) => ({
              '@type': 'HowToStep',
              position: i + 1,
              name: `${item.stage.label} — ${stageSendWindow(festival, item.stage)}`,
              text: item.stage.purpose,
              url: `${SITE_URL}${path}#${item.row.metaName}`,
            })),
          },
        ]}
      />
      <MarketingPage>
        <JourneyHero
          eyebrow={festival.eyebrow}
          title={festival.h1}
          accent={festival.h1Accent}
          subtitle={festival.subtitle}
          trust
          actions={
            <>
              <PrimaryButton to="/signup">Personalise these free</PrimaryButton>
              <Link
                to={FESTIVAL_HUB_PATH}
                className="text-sm font-medium text-[#7C3AED] hover:underline"
              >
                All 25 festivals
              </Link>
            </>
          }
        />

        <Section className="!pt-0 !pb-6 md:!pb-8">
          <div className="mx-auto max-w-3xl">
            <div className="mkt-fplate">
              {timing.fullLabel && (
                <span className="mkt-fplate__pill mkt-fplate__pill--date">{timing.fullLabel}</span>
              )}
              {timing.label && timing.tone !== 'past' && (
                <span className={`mkt-fplate__pill mkt-fplate__pill--${timing.tone}`}>
                  {timing.label}
                </span>
              )}
              <span className="mkt-fplate__pill">4 ready templates</span>
              <span className="mkt-fplate__pill">
                {FESTIVAL_TRADITION_LABEL[festival.tradition]}
              </span>
            </div>

            <p className="mkt-jh-lead">{festival.answerFirst}</p>
          </div>
        </Section>

        <Section className="!pt-4 md:!pt-6">
          <SectionHeading
            eyebrow="The sequence"
            title={`The four ${festival.shortName} messages, in order`}
            accent="in order"
            subtitle="Each preview is the real template — the exact body, the footer Meta needs, and the button. Amber marks the blanks you fill in. Copy any one of them, or download all four."
          />
          <div className="mkt-fdl">
            <button
              type="button"
              className="mkt-fdl__btn"
              onClick={() => downloadTemplatesCsv(items, `${festival.slug}-whatsapp-templates.csv`)}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 4v11m0 0 4-4m-4 4-4-4" />
                <path d="M4 19h16" />
              </svg>
              Download all 4 as CSV
            </button>
            <span className="mkt-fdl__note">Free, no sign-up. Copy any single message with the button on its card.</span>
          </div>

          <ul className="mkt-fseq">
            {items.map((item, i) => (
              <li key={item.id} id={item.row.metaName}>
                <FestivalTemplateCard item={item} linkFestival={false} step={i + 1} />
              </li>
            ))}
          </ul>
        </Section>

        <Section wash="soft">
          <SectionHeading
            eyebrow="The brief"
            title={`What moves at ${festival.shortName}`}
            accent={festival.shortName}
            subtitle="The commercial facts behind the copy: when the money moves, what sells, and where in India it matters."
          />
          <div className="mkt-fbrief">
            <div className="mkt-fbrief__item">
              <p className="mkt-fbrief__label">When the money moves</p>
              <p className="mkt-fbrief__text">{festival.peak}</p>
            </div>
            <div className="mkt-fbrief__item">
              <p className="mkt-fbrief__label">Where it matters most</p>
              <p className="mkt-fbrief__text">{festival.regions}</p>
            </div>
            <div className="mkt-fbrief__item mkt-fbrief__item--wide">
              <p className="mkt-fbrief__label">What sells</p>
              <ul className="mkt-fbrief__sells">
                {festival.sells.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section>
          <div className="mkt-jx-centered mx-auto flex max-w-3xl flex-col gap-14 md:gap-16">
            {blocks.map((b) => (
              <TopicBlockView key={b.id} block={b} />
            ))}
          </div>
        </Section>

        <Section wash="soft">
          <SectionHeading
            eyebrow="Yours, not ours"
            title="Customise and personalise it in the dashboard"
            accent="personalise it"
            subtitle={`The ${festival.shortName} copy is a draft, not a script. Rewrite it, set your own offer, pick the audience, and submit it to Meta from your own WhatsApp Business account.`}
          />
          <FestivalPersonalise />
        </Section>

        <Section>
          <TrustBand title="Brands already sending these campaigns on WhatsApp" />
        </Section>

        <Section wash="soft">
          <SectionHeading title={`${festival.shortName} questions teams ask`} accent="teams ask" />
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={faqs} />
          </div>
        </Section>

        <Section>
          <SectionHeading
            title="Festivals close to this one"
            accent="close to this one"
            subtitle="Plan the run rather than the date — the campaign that follows is usually the one that pays for this one."
          />
          <ul className="mkt-fgroup__grid mx-auto max-w-5xl">
            {siblings.map((s) => (
              <li key={s.slug}>
                <FestivalCard festival={s} />
              </li>
            ))}
          </ul>

          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
            {[
              { label: 'All 100 free templates', href: FESTIVAL_HUB_PATH },
              { label: 'All WhatsApp templates', href: '/whatsapp-templates' },
              { label: 'Audience campaigns', href: '/features/campaigns' },
              { label: 'Meta template manager', href: '/features/meta-manager' },
              { label: 'Meta India rate card', href: '/pricing/meta-rates' },
              { label: 'WhatsApp opt-in rules', href: '/blog/whatsapp-opt-in-shopify-india' },
            ].map((r) => (
              <li key={r.href}>
                <Link
                  to={r.href}
                  className="inline-flex rounded-full border border-[#efeaf8] bg-white px-4 py-2 text-sm font-medium text-[#7C3AED] hover:border-[#c4b5fd]"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <MarketingCtaBand
          title={`Run your ${festival.shortName} campaign on WhatsApp`}
          subtitle="Copy the four templates, edit them to your brand, push them to Meta for approval and schedule the sends. Free for 14 days, no card."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
