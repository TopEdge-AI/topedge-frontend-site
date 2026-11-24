import { Navigate } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { PrimaryButton, GhostButton } from '../components/ui';
import { TopicToc } from '../components/topic/TopicBlocks';
import FaqAccordion from '../components/topic/FaqAccordion';
import JourneyFlow from '../components/journey/JourneyFlow';
import JourneyHero from '../components/journey/JourneyHero';
import JourneyCard from '../components/journey/JourneyCard';
import TrustBand from '../components/journey/TrustBand';
import { FxHead, FxLinks } from '../components/journey/Framed';
import FxBlocks from '../components/journey/FramedBlocks';
import { JOURNEY_EXAMPLES, journeyExampleBySlug } from '../data/journeyExamples';
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';

const INDEX_PATH = '/whatsapp-journey-examples';

/** One worked journey: the flow diagram first, then the argument around it. */
export default function JourneyExamplePage({ slug }: { slug: string }) {
  const j = journeyExampleBySlug(slug);
  if (!j) return <Navigate to={INDEX_PATH} replace />;

  const path = `${INDEX_PATH}/${j.slug}`;
  const siblings = JOURNEY_EXAMPLES.filter((x) => x.slug !== j.slug);

  return (
    <>
      <MarketingSEO
        title={j.title}
        description={j.description}
        keywords={j.keywords}
        path={path}
        noSuffix
        faqSchema={j.faqs.map((f) => ({ question: f.question, answer: f.answer }))}
        jsonLd={[
          organizationJsonLd(),
          softwareApplicationJsonLd(),
          webPageJsonLd({ name: j.h1, description: j.description, path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Journey examples', path: INDEX_PATH },
            { name: j.cardTitle, path },
          ]),
        ]}
      />
      <MarketingPage className="mkt-jx mkt-jx--example fx">
        <div className="fx-shell">
        <JourneyHero
          crumbs={[
            { name: 'Home', path: '/' },
            { name: 'Journey examples', path: INDEX_PATH },
            { name: j.cardTitle },
          ]}
          stage
          eyebrow={j.eyebrow}
          title={j.h1}
          accent={j.h1Accent}
          subtitle={j.subtitle}
          trust
          image={j.hero}
          imageAlt={j.heroAlt}
          actions={
            <>
              <PrimaryButton to="/signup">Start free</PrimaryButton>
              <GhostButton to={INDEX_PATH}>All journey examples</GhostButton>
            </>
          }
        />

        <section className="fx-sec fx-sec--tight mkt-jx__lead">
          <p className="mkt-jh-lead">{j.answerFirst}</p>
        </section>

        {/*
          The diagram sits above the prose on purpose. A merchant comparing
          platforms wants the shape of the automation before the argument
          for it, and the shape is the thing a feature list cannot show.
        */}
        <section className="fx-sec fx-stage fx-stage--soft mkt-jx__flow">
          {/*
            Hidden label for the diagram. The step titles inside it are H3s,
            so they need an H2 above them rather than jumping from the H1.
          */}
          <h2 className="sr-only">{j.h1}: step by step</h2>
          <JourneyFlow trigger={j.trigger} triggerNote={j.triggerNote} steps={j.steps} />
        </section>

        {j.blocks.length > 0 && (
          <div className="fx-row mkt-jx__toc">
            <TopicToc blocks={j.blocks} />
          </div>
        )}

        <FxBlocks blocks={j.blocks} />

        <div className="fx-sec">
          <TrustBand />
        </div>

        <section className="fx-sec">
          <FxHead title="Questions teams ask" accent="teams ask" />
          <FaqAccordion items={j.faqs} />
        </section>

        <section className="fx-sec">
          <FxHead
            title="Other journeys"
            accent="journeys"
            subtitle="More ready-made automations for your Shopify store."
          />
          <ul className="mkt-jx-cards fx-cells fx-cells--bleed">
            {siblings.map((s) => (
              <li key={s.slug}>
                <JourneyCard journey={s} href={`${INDEX_PATH}/${s.slug}`} />
              </li>
            ))}
          </ul>

          <FxLinks items={j.related} />
        </section>

        <MarketingCtaBand
          title="Run this journey on your store"
          subtitle="Connect Shopify, push the templates to Meta for approval, and publish. Free for 14 days, no card."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
        </div>
      </MarketingPage>
    </>
  );
}
