import { Link } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { Section, SectionHeading, PrimaryButton } from '../components/ui';
import { TopicBlockView, type TopicBlock } from '../components/topic/TopicBlocks';
import FaqAccordion from '../components/topic/FaqAccordion';
import JourneyHero from '../components/journey/JourneyHero';
import TrustBand from '../components/journey/TrustBand';
import FestivalCalendarRail from '../components/festival/FestivalCalendarRail';
import FestivalCard from '../components/festival/FestivalCard';
import FestivalLibrary from '../components/festival/FestivalLibrary';
import FestivalPersonalise from '../components/festival/FestivalPersonalise';
import FestivalStageTrack from '../components/festival/FestivalStageTrack';
import {
  FESTIVALS,
  FESTIVAL_HUB_PATH,
  FESTIVAL_MARKETING_RATE,
  FESTIVAL_SEQUENCE_COST,
  FESTIVAL_TEMPLATE_COUNT,
  festivalPath,
  festivalsByCluster,
} from '../data/festivalTemplates';
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
import { SITE_URL } from '../data/marketingSeo';
import '../styles/journey-flow.css';
import '../styles/festival-templates.css';

const PATH = FESTIVAL_HUB_PATH;
const TITLE = '100 Free WhatsApp Marketing Templates: Copy, Edit, Send';
const DESCRIPTION =
  '100 free WhatsApp marketing message templates across 25 festivals. Copy the text, edit it, download the set and submit it to Meta from your own account.';

const FAQS = [
  {
    question: 'What is the best WhatsApp template for marketing?',
    answer:
      'There is no single best one — the best marketing template is the one that matches where the customer already is. For a festival that means four: an early-access message for people who would buy at full price, a gift guide for the undecided, a discount for the price-sensitive, and an offer-free greeting that keeps the list subscribed. A single "best" template sent to everyone reaches only the people who were going to buy anyway.',
  },
  {
    question: 'Can I download these WhatsApp templates for free?',
    answer:
      'Yes. Every template on this page can be copied with the button on its card, and the Download as CSV button hands you the whole filtered set — all 100, or just the festival you selected — as a spreadsheet with the body, footer, button label, Meta template name and send window in separate columns. No sign-up, no email, nothing logged.',
  },
  {
    question: 'How do I create a WhatsApp message template?',
    answer:
      'Write the body, add a footer and up to three buttons, pick a category and a language, then submit it to Meta from your WhatsApp Business account and wait for approval. The part people get wrong is the sample values: every variable needs a realistic example or Meta rejects the template without reading the copy. Starting from a template here means the structure is already right and you are only changing words.',
  },
  {
    question: 'Can I edit a WhatsApp template after Meta approves it?',
    answer:
      'You can edit an approved template a limited number of times per month, and the edit goes back through review. What you cannot do is change its category without resubmitting. In practice it is cleaner to treat each festival as a new template rather than rewriting last year\u2019s, which also keeps your approval history readable.',
  },
  {
    question: 'What is a festival WhatsApp template?',
    answer:
      'It is a message Meta has approved in advance for a festive campaign, so you can send it to customers outside the 24-hour reply window. You submit it from your own WhatsApp Business account, Meta reviews it, and only then can a campaign send it. Festive templates are always marketing templates, because they exist to make a sale.',
  },
  {
    question: 'How many festival templates does TopEdge include?',
    answer:
      `One hundred: four per festival across twenty-five festivals, covering the Hindu, Islamic, Christian and secular calendars. The four are an early-access message, a gift guide, a flash sale and a day-of greeting, which together make one campaign rather than four separate blasts.`,
  },
  {
    question: 'Can I edit the festive copy, or is it fixed?',
    answer:
      'You edit it, and you should. Each template arrives pre-filled with the body, footer and button in place, with your store name and discount code as blanks. You change the wording, the offer, the button, the language and the audience, then submit it to Meta under your own account.',
  },
  {
    question: 'What does a festival WhatsApp campaign cost in India?',
    answer:
      `Every festive template is a marketing template, which Meta bills at ${FESTIVAL_MARKETING_RATE} per delivered message in India. The full four-message sequence is about ${FESTIVAL_SEQUENCE_COST} to reach one customer, so roughly ₹3,450 for a list of a thousand. Meta bills your own WhatsApp Business account directly and TopEdge adds no markup.`,
  },
  {
    question: 'Can I send a festive greeting as a cheap utility message instead?',
    answer:
      'No. Meta classifies by intent, not by wording: a message that is not about an existing order is marketing. Worse, adding festive wording with an offer to an order update reclassifies that template as marketing too, so an order confirmation that cost ₹0.1150 starts costing ₹0.8631 on every send.',
  },
  {
    question: 'Do I need opt-in to send a festival campaign?',
    answer:
      'Yes, for every one of these. A WhatsApp marketing template can only go to customers who have given opt-in consent, and a past purchase is not consent on its own. Collect the opt-in at checkout or with an opt-in message first — sending without it damages your quality rating and can get your number restricted.',
  },
  {
    question: 'How long does Meta take to approve a festive template?',
    answer:
      'Usually hours rather than days once your business is verified, though Meta publishes no guarantee and festive marketing templates get a closer read than order updates. Submit a week before you plan to send, and leave the media header off unless you need it — it is the component most often responsible for a rejection.',
  },
  {
    question: 'Which festival should a business start with?',
    answer:
      'The next one more than ten days away, so there is time for Meta approval. If you are choosing on value instead of timing: Diwali and Dhanteras carry the most volume, Raksha Bandhan has the cleanest gifting intent, and Holi is the biggest spring event most stores under-plan.',
  },
];

const BLOCKS: TopicBlock[] = [
  {
    kind: 'specTable',
    id: 'what-it-costs',
    h2: 'What a festive campaign costs',
    accent: 'festive campaign',
    intro:
      'Meta charges per delivered message and every festive template is a marketing template. There is no cheaper category available for a message whose job is to sell, so the only real lever is how many people you send to.',
    columns: ['Send', 'Rate per delivered message', 'Cost per 1,000 customers'],
    rows: [
      {
        label: 'Early access',
        cells: [FESTIVAL_MARKETING_RATE, '₹863'],
        note: 'Send to repeat buyers only and this is the cheapest of the four.',
      },
      {
        label: 'Gift guide',
        cells: [FESTIVAL_MARKETING_RATE, '₹863'],
        note: 'The highest-converting message in most festive sequences.',
      },
      {
        label: 'Flash sale',
        cells: [FESTIVAL_MARKETING_RATE, '₹863'],
        note: 'Worth restricting to customers who did not buy from the first two.',
      },
      {
        label: 'Day-of greeting',
        cells: [FESTIVAL_MARKETING_RATE, '₹863'],
        note: 'Carries no offer, so it is the send that keeps the list opted in.',
      },
      {
        label: 'Full sequence',
        cells: [FESTIVAL_SEQUENCE_COST + ' per customer', '₹3,450'],
        note: 'Four sends to the same thousand customers, before any segmentation.',
      },
    ],
    footnote:
      'Rates are Meta’s own published India prices, billed by Meta to your WhatsApp Business account. TopEdge adds no markup on them.',
  },
  {
    kind: 'callout',
    id: 'reclassify',
    tone: 'warn',
    title: 'A festive greeting in an order update costs you seven times more',
    body:
      'It is tempting to add “Happy Diwali” and an offer to the order confirmation you already send. Meta reclassifies that template as marketing, so a message that cost ₹0.1150 starts costing ₹0.8631 — on every order, not just the festive ones. Keep festive offers in their own template.',
    link: { label: 'See the full India rate card', href: '/pricing/meta-rates' },
  },
  {
    kind: 'checklist',
    id: 'plan-the-run',
    h2: 'How to plan a festival campaign',
    accent: 'festival campaign',
    intro:
      'The same four mistakes cost most stores their festive quarter, and all four are decided before a single message goes out.',
    doLabel: 'Do this',
    dontLabel: 'Not this',
    doItems: [
      'Submit the templates to Meta a week before you plan to send, so an approval queue is not the thing that decides your campaign',
      'Send the four messages to narrowing audiences — everyone, then non-openers, then non-buyers — rather than the same list four times',
      'Publish your delivery cut-off in the flash-sale message and hold to it, especially in the last week before Diwali',
      'Keep the day-of greeting free of any offer, so the list is still there for the next festival',
    ],
    dontItems: [
      'Blast all four messages to your whole list on consecutive days',
      'Promise festive delivery inside the last three days, when courier networks are saturated',
      'Spend your deepest discount at Dussehra, nineteen days before the week that actually matters',
      'Send to customers who never opted in to marketing messages, whatever the occasion',
    ],
  },
  {
    kind: 'prose',
    id: 'why-four',
    h2: 'Why four messages and not one',
    accent: 'four messages',
    body: [
      'A single festive blast asks everyone on your list the same question on the same day, and the only people who answer are the ones who were already going to buy. The four-message shape works because **each send is aimed at a different reason somebody has not bought yet**: they did not know the collection was live, they did not know what to pick, the price was holding them back, or they were never going to buy and you would rather keep them subscribed.',
      'That is also why the order matters more than the copy. Discounting first trains your best customers to wait for the code, and it spends margin on people who would have paid full price during early access. **The discount belongs third, once the people it is for are the only ones left.**',
    ],
  },
];

const RELATED = [
  { label: 'All WhatsApp templates', href: '/whatsapp-templates' },
  { label: 'Journey examples', href: '/whatsapp-journey-examples' },
  { label: 'Audience campaigns', href: '/features/campaigns' },
  { label: 'Meta template manager', href: '/features/meta-manager' },
  { label: 'Meta India rate card', href: '/pricing/meta-rates' },
  { label: 'Why templates get rejected', href: '/blog/whatsapp-template-rejected-meta-shopify-fix' },
  { label: 'WhatsApp opt-in rules', href: '/blog/whatsapp-opt-in-shopify-india' },
  { label: 'Pricing', href: '/pricing' },
];

export default function FestivalTemplatesPage() {
  const groups = festivalsByCluster();

  return (
    <>
      <MarketingSEO
        title={TITLE}
        description={DESCRIPTION}
        keywords="best whatsapp template for marketing, free whatsapp marketing templates, whatsapp message template example, create whatsapp message template free, whatsapp template download, meta templates whatsapp, festival whatsapp templates, diwali whatsapp template, holi whatsapp message"
        path={PATH}
        noSuffix
        faqSchema={FAQS}
        jsonLd={[
          organizationJsonLd(),
          softwareApplicationJsonLd(),
          webPageJsonLd({
            name: 'Free WhatsApp marketing templates for every festival',
            description: DESCRIPTION,
            path: PATH,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Free WhatsApp marketing templates', path: PATH },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Festival WhatsApp template collections',
            numberOfItems: FESTIVALS.length,
            itemListElement: FESTIVALS.map((f, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: `${f.name} WhatsApp templates`,
              url: `${SITE_URL}${festivalPath(f.slug)}`,
            })),
          },
        ]}
      />
      <MarketingPage>
        <JourneyHero
          title="Free WhatsApp marketing templates for every festival"
          accent="Free WhatsApp marketing templates"
          trust
          subtitle={`${FESTIVAL_TEMPLATE_COUNT} ready-written WhatsApp message templates across ${FESTIVALS.length} festivals — four per festival, written as a campaign rather than a blast. Copy the text, edit it to your brand, download the set, and submit it to Meta from your own WhatsApp Business account.`}
          image="/marketing/journeys/hero-festival-templates.webp"
          imageAlt="A festival campaign calendar running Dussehra to Bhai Dooj beside an approved Diwali WhatsApp template"
          imageWidth={1672}
          imageHeight={941}
          /* Stacked, not side by side: one primary action on the centre line,
             and the library link under it as the quieter second choice. */
          actions={
            <div className="mkt-fhero-actions">
              <PrimaryButton to="/signup">Start free</PrimaryButton>
              <Link to="#library" className="mkt-fhero-actions__link">
                Browse all {FESTIVAL_TEMPLATE_COUNT} templates
              </Link>
            </div>
          }
        />

        <Section className="!pt-10 md:!pt-12">
          <SectionHeading
            title="The festivals you can still act on"
            accent="still act on"
            subtitle="Meta approval takes hours once your business is verified, so anything more than a week out is comfortably reachable. Each one opens on its own page with the four messages and when to send them."
          />
          <FestivalCalendarRail />
        </Section>

        <Section wash="soft">
          <SectionHeading
            title="Four messages, and the order is the product"
            accent="the order is the product"
            subtitle="Every festival in the library ships the same four-message arc. Sent in sequence they answer four different reasons a customer has not bought yet."
          />
          <FestivalStageTrack />
        </Section>

        <Section>
          <SectionHeading
            title="Browse festivals by when they land"
            accent="when they land"
            subtitle="Grouped the way a merchant plans — the quarter the festival falls in, not the alphabet. Each card opens a page with the four templates, the demand window and what sells."
          />
          {groups.map(({ cluster, festivals }) => (
            <section key={cluster.id} className="mkt-fgroup" aria-labelledby={`cluster-${cluster.id}`}>
              <div className="mkt-fgroup__head">
                <h3 className="mkt-fgroup__title" id={`cluster-${cluster.id}`}>
                  {cluster.label}
                  <span className="mkt-fgroup__count">{festivals.length}</span>
                </h3>
                <p className="mkt-fgroup__blurb">{cluster.blurb}</p>
              </div>
              <ul className="mkt-fgroup__grid">
                {festivals.map((f) => (
                  <li key={f.slug}>
                    <FestivalCard festival={f} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </Section>

        <Section wash="soft" id="library">
          <SectionHeading
            title={`All ${FESTIVAL_TEMPLATE_COUNT} festive templates`}
            accent="festive templates"
            subtitle="Filter by festival or by stage, or search the copy itself. Each preview is the template exactly as the dashboard hands it over — the real body, footer and button, with the blanks you fill marked in amber. Download the set from the button under the grid."
          />
          <FestivalLibrary />
        </Section>

        <Section>
          <SectionHeading
            title="Customise and personalise it in the dashboard"
            accent="personalise it"
            subtitle="These are drafts, not scripts. Every template is submitted to Meta from your own WhatsApp Business account, under your brand, with your offer in it."
          />
          <FestivalPersonalise />
        </Section>

        <Section wash="soft">
          <TrustBand title="Brands already sending festive campaigns on WhatsApp" />
        </Section>

        <Section>
          <div className="mkt-jx-centered mx-auto flex max-w-3xl flex-col gap-14 md:gap-16">
            {BLOCKS.map((b) => (
              <TopicBlockView key={b.id} block={b} />
            ))}
          </div>
        </Section>

        <Section wash="soft">
          <SectionHeading title="Questions teams ask" accent="teams ask" />
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={FAQS} />
          </div>

          <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {RELATED.map((r) => (
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
          title="Set up your next festival this week"
          subtitle="Copy the four templates for the next festival, edit them to your brand, push them to Meta for approval and schedule the sends. Free for 14 days, no card."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
