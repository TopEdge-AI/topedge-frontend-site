import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import DemoProductVideoFrame from '../components/home/demo/DemoProductVideoFrame';
import DemoProductImageFrame from '../components/home/demo/DemoProductImageFrame';
import { mobileCropFor } from '../data/mobileCrops';
import {
  getProductPage,
  type ProductPage,
  type ProductPageId,
  type ProductBento,
  type ProductShowcase,
} from '../data/productPages';
import {
  featureSoftwareJsonLd,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
  videoObjectJsonLd,
} from '../data/pageSeo';
import { demoAssetBySrc } from '../data/productDemoVideos';
import { featurePagesModifiedIso } from '../data/contentDates';
import FeatureMeshStage, { AURORA_PALETTE } from '../components/effects/FeatureMeshStage';
import FaqAccordion from '../components/topic/FaqAccordion';
import HomeTrust from '../components/home/HomeTrust';
import { PrimaryButton, GhostButton } from '../components/ui';
import { ScenesContext, ScenePlaceholder, usePageScenes, useScene } from '../components/visuals';
import { AccentContext, MeshContext, SceneSlotContext } from '../components/visuals/kit';
import { FeatureClip, clipFor, hasClips } from '../components/visuals/clips';
import '../styles/product-feature.css';
import '../styles/feature-premium.css';

type Props = {
  pageId: ProductPageId;
};

function ShotFrame({
  src,
  label,
  wide,
  clipKey,
}: {
  src: string;
  label: string;
  wide?: boolean;
  /** [pageId, slot] for a rendered film clip, e.g. ['campaigns', 't1']. */
  clipKey?: [string, string];
}) {
  const [failed, setFailed] = useState(false);
  const empty = failed || !src;
  // A coded scene (components/visuals) replaces the screenshot where one exists.
  const { Scene, pending } = useScene(src);
  // A rendered film clip, where one exists, plays in place of the coded scene.
  const clip = clipKey ? clipFor(clipKey[0], clipKey[1]) : null;

  if (clip) {
    const fallback = Scene ? (
      <Scene label={label} />
    ) : src ? (
      <img className="mkt-pf__shot-img" src={src} alt={label} loading="lazy" decoding="async" />
    ) : (
      <ScenePlaceholder label={label} wide={wide} />
    );
    return (
      <div className={`mkt-pf__shot${wide ? ' is-wide' : ''} is-scene is-clip`}>
        <FeatureClip clip={clip} label={label} wide={wide} fallback={fallback} />
      </div>
    );
  }

  if (Scene || pending) {
    return (
      <div className={`mkt-pf__shot${wide ? ' is-wide' : ''} is-scene`}>
        {Scene ? <Scene label={label} /> : <ScenePlaceholder label={label} wide={wide} />}
      </div>
    );
  }

  // The empty frame deliberately carries no "add dashboard screenshot" note.
  // That was an instruction to us and it shipped into the crawlable text of
  // every page whose shot was missing or failed to load. The caption stays,
  // because the caption is real copy.

  if (empty) {
    return (
      <div className={`mkt-pf__shot${wide ? ' is-wide' : ''} is-empty`} role="img" aria-label={label}>
        <span className="mkt-pf__shot-label">{label}</span>
      </div>
    );
  }

  return (
    <div className={`mkt-pf__shot${wide ? ' is-wide' : ''}`}>
      <img
        className="mkt-pf__shot-img"
        src={src}
        alt={label}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function BentoTile({ tile, slot, pageId }: { tile: ProductBento; slot: number; pageId: string }) {
  const span = tile.span === 'half' ? 'half' : tile.span === 'full' ? 'full' : 'third';
  const label = tile.imageAlt || `${tile.titleLead} ${tile.titleAccent}`.trim();

  return (
    <article className={`mkt-pf__tile mkt-pf__tile--${span}`}>
      <div className="mkt-pf__tile-visual">
        <SceneSlotContext.Provider value={slot}>
          <ShotFrame src={tile.image} label={label} clipKey={[pageId, `t${slot + 1}`]} />
        </SceneSlotContext.Provider>
      </div>
      <div className="mkt-pf__tile-body">
        <h3 className="mkt-pf__tile-title">
          {tile.titleLead}{' '}
          <span className="mkt-pf__tile-accent">{tile.titleAccent}</span>
        </h3>
        <p className="mkt-pf__tile-copy">{tile.body}</p>
      </div>
    </article>
  );
}

function ShowcaseRow({ item, index, slot, pageId }: { item: ProductShowcase; index: number; slot: number; pageId: string }) {
  const reverse = item.reverse ?? index % 2 === 1;
  const label = item.imageLabel || `${item.title}${item.titleAccent ? ` ${item.titleAccent}` : ''}`;

  return (
    <article
      id={item.anchor}
      className={`mkt-pf__showcase${reverse ? ' is-reverse' : ''}${item.anchor ? ' has-anchor' : ''}`}
    >
      <div className="mkt-pf__showcase-media">
        <SceneSlotContext.Provider value={slot}>
          <ShotFrame src={item.image} label={label} wide clipKey={[pageId, `s${index + 1}`]} />
        </SceneSlotContext.Provider>
      </div>
      <div className="mkt-pf__showcase-copy">
        <h2 className="mkt-pf__showcase-title">
          {item.title}
          {item.titleAccent ? (
            <>
              {' '}
              <span className="mkt-pf__tile-accent">{item.titleAccent}</span>
            </>
          ) : null}
        </h2>
        <p className="mkt-pf__showcase-body">{item.body}</p>
      </div>
    </article>
  );
}

function ProductFeatureView({ page }: { page: ProductPage }) {
  const location = useLocation();
  const fullTitle = `${page.title} ${page.titleAccent}`.replace(/\s+/g, ' ').trim();
  const hasShowcases = Boolean(page.showcases?.length);
  const hasFaqs = Boolean(page.faqs?.length);
  const hasRelated = Boolean(page.related?.length);
  const proof = page.proofTable;
  const modifiedIso = featurePagesModifiedIso();
  // Every feature hero now plays its launch film; the screen recording a page
  // used to carry is no longer on the page, so it gets no VideoObject either.
  const heroClip = clipFor(page.id, 'h');
  const heroDemo = !heroClip && page.hero.kind === 'video' ? demoAssetBySrc(page.hero.src) : undefined;
  // Pages whose every slot plays a film skip the coded-scene chunk entirely.
  const scenes = usePageScenes(hasClips(page.id) ? '' : page.id);
  const HeroScene =
    page.hero.kind === 'image' ? scenes.map?.[page.hero.src.split('?')[0]] ?? null : null;

  useEffect(() => {
    const hash = location.hash.replace(/^#/, '');
    if (!hash) return;
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => window.clearTimeout(t);
  }, [location.hash, page.id]);

  return (
    <ScenesContext.Provider value={scenes}>
    <AccentContext.Provider value="violet">
    <MeshContext.Provider value={AURORA_PALETTE[page.id]}>
      <MarketingSEO
        title={page.seoTitle}
        description={page.seoDescription}
        keywords={page.keywords}
        path={page.path}
        noSuffix
        faqSchema={page.faqs}
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: fullTitle,
            description: page.seoDescription,
            path: page.path,
            dateModified: modifiedIso,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Product', path: '/features' },
            { name: page.eyebrow, path: page.path },
          ]),
          // This page is one capability of one application. Pointing every
          // feature page at the same @id keeps a single product entity instead
          // of thirteen near-duplicates.
          featureSoftwareJsonLd({
            name: page.eyebrow,
            description: page.seoDescription,
            path: page.path,
          }),
          // Hero demo is the page's lead visual, so it is main content and
          // eligible for a video result. Only pages whose clip this catalog
          // describes get markup — no invented names or dates.
          ...(heroDemo ? [videoObjectJsonLd(heroDemo)] : []),
        ]}
      />
      <MarketingPage className="mkt-pf fx">
        <div className="mkt-pf__theme">
        {/* The hero stays outside the frame, exactly as it was (owner, 24 Nov 2026). */}
        <FeatureMeshStage mesh={page.id}>
        <header className="mkt-pf__hero">
          <h1 className="mkt-pf__title">
            {page.title}{' '}
            <span className="mkt-pf__title-accent">{page.titleAccent}</span>
          </h1>
          <p className="mkt-pf__sub">
            {page.subtitle.split('\n').map((line, i) => (
              <span key={`${line}-${i}`}>
                {i > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </p>
          <div className="mkt-pf__actions">
            <PrimaryButton to="/signup">
              Start free trial
            </PrimaryButton>
            <GhostButton to="/pricing">See pricing</GhostButton>
          </div>
          <div className="mkt-pf__trust">
            <HomeTrust onStage />
          </div>
        </header>

          <section className="mkt-pf__media" aria-label="Product preview">
            {heroClip ? (
              <div className="demo-video-glow demo-video-glow--still" data-glow={page.hero.glow ?? 'violet'}>
                <div className="demo-video-glow__frame is-ready is-scene is-film">
                  <FeatureClip
                    clip={heroClip}
                    label={page.hero.kind === 'video' ? page.hero.label : page.hero.alt}
                    wide
                    fallback={
                      page.hero.kind === 'video' ? (
                        <img className="demo-video-glow__still" src={page.hero.poster} alt={page.hero.label} decoding="async" />
                      ) : HeroScene ? (
                        <HeroScene label={page.hero.alt} />
                      ) : (
                        <img className="demo-video-glow__still" src={page.hero.src} alt={page.hero.alt} decoding="async" />
                      )
                    }
                  />
                </div>
              </div>
            ) : page.hero.kind === 'video' ? (
              <DemoProductVideoFrame
                src={page.hero.src}
                mobileSrc={page.hero.mobileSrc}
                mobilePoster={page.hero.mobilePoster}
                poster={page.hero.poster}
                glow={page.hero.glow ?? 'violet'}
                title={page.hero.label}
              />
            ) : HeroScene ? (
              <div className="demo-video-glow demo-video-glow--still" data-glow={page.hero.glow ?? 'violet'}>
                <div className="demo-video-glow__frame is-ready is-scene">
                  <HeroScene label={page.hero.alt} />
                </div>
              </div>
            ) : (
              <DemoProductImageFrame
                src={page.hero.src}
                mobileSrc={mobileCropFor(page.hero.src)}
                alt={page.hero.alt}
                glow={page.hero.glow ?? 'violet'}
              />
            )}
          </section>
        </FeatureMeshStage>
        <div className="fx-shell">

        {page.bentos.length > 0 ? (
          <section className="mkt-pf__section fx-sec" aria-labelledby="mkt-pf-bento">
            <div className="mkt-pf__head">
              <h2 id="mkt-pf-bento" className="mkt-pf__head-title">
                {page.bentoTitle} <span>{page.bentoAccent}</span>
              </h2>
              {page.bentoSub ? <p className="mkt-pf__head-sub">{page.bentoSub}</p> : null}
            </div>
            <div className={`mkt-pf__bento fx-cells fx-cells--bleed${page.bentos.length >= 5 ? ' mkt-pf__bento--five' : ''}`}>
              {page.bentos.map((tile, i) => (
                <BentoTile key={`${tile.titleLead}-${tile.titleAccent}`} tile={tile} slot={i} pageId={page.id} />
              ))}
            </div>
          </section>
        ) : null}

        {hasShowcases ? (
          <section
            className="mkt-pf__section mkt-pf__section--showcases fx-sec fx-sec--flush"
            aria-label={`${page.showcasesTitle} ${page.showcasesAccent}`.trim()}
          >
            <div className="mkt-pf__showcases">
              {page.showcases!.map((item, i) => (
                <ShowcaseRow key={`${item.title}-${i}`} item={item} index={i} slot={page.bentos.length + i} pageId={page.id} />
              ))}
            </div>
          </section>
        ) : null}

        {proof ? (
          <section className="mkt-pf__section fx-sec" aria-labelledby="mkt-pf-proof">
            <div className="mkt-pf__head">
              <h2 id="mkt-pf-proof" className="mkt-pf__head-title">
                {proof.title} {proof.titleAccent ? <span>{proof.titleAccent}</span> : null}
              </h2>
              {proof.intro ? <p className="mkt-pf__head-sub">{proof.intro}</p> : null}
            </div>
            <div className="mkt-pf__proof">
              <div className="mkt-pf__proof-scroll">
                <table className="mkt-pf__proof-table">
                  <thead>
                    <tr>
                      {proof.columns.map((c) => (
                        <th key={c} scope="col">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {proof.rows.map((row, ri) => (
                      <tr
                        key={row[0]}
                        className={
                          proof.emphasise?.includes(ri) ? 'mkt-pf__proof-row--strong' : undefined
                        }
                      >
                        {row.map((cell, ci) =>
                          ci === 0 ? (
                            <th key={ci} scope="row">
                              {cell}
                            </th>
                          ) : (
                            <td key={ci} data-label={proof.columns[ci]}>
                              {cell}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {proof.takeaways?.length ? (
                <ul className="mkt-pf__proof-list">
                  {proof.takeaways.map((t) => (
                    <li key={t.slice(0, 40)}>{t}</li>
                  ))}
                </ul>
              ) : null}
              <p className="mkt-pf__proof-note">{proof.note}</p>
            </div>
          </section>
        ) : null}

        <section
          className="mkt-pf__section mkt-pf__section--steps fx-sec"
          aria-labelledby="mkt-pf-steps"
        >
          <div className="mkt-pf__head">
            <h2 id="mkt-pf-steps" className="mkt-pf__head-title">
              {page.stepsTitle} <span>{page.stepsAccent}</span>
            </h2>
          </div>
          <ol className={`mkt-pf__steps fx-cells fx-cells--bleed fx-cells--${Math.min(page.steps.length, 4)}`}>
            {page.steps.map((step, i) => (
              <li key={step.title} className="mkt-pf__step fx-step">
                <div className="mkt-pf__step-index" aria-hidden>
                  <span className="mkt-pf__step-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="mkt-pf__step-body">
                  <h3 className="mkt-pf__step-title">{step.title}</h3>
                  <p className="mkt-pf__step-copy">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {hasFaqs ? (
          <section className="mkt-pf__section mkt-pf__section--faq fx-sec" aria-labelledby="mkt-pf-faq">
            <div className="mkt-pf__head">
              <h2 id="mkt-pf-faq" className="mkt-pf__head-title">
                Common <span>questions</span>
              </h2>
            </div>
            <FaqAccordion items={page.faqs!} />
          </section>
        ) : null}

        {hasRelated ? (
          <section
            className="mkt-pf__section mkt-pf__section--related fx-sec"
            aria-labelledby="mkt-pf-related"
          >
            <div className="mkt-pf__head">
              <h2 id="mkt-pf-related" className="mkt-pf__head-title">
                {page.relatedTitle} <span>{page.relatedAccent}</span>
              </h2>
            </div>
            <div className="mkt-pf__related fx-cells fx-cells--bleed fx-links">
              {page.related.map((r) => (
                <Link key={r.href} to={r.href} className="mkt-pf__related-link fx-link">
                  {r.label}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <MarketingCtaBand
          title={page.ctaTitle}
          subtitle={page.ctaSub}
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
        </div>
        </div>
      </MarketingPage>
    </MeshContext.Provider>
    </AccentContext.Provider>
    </ScenesContext.Provider>
  );
}

/** Shared enterprise product page, Journey, flow, campaigns, CRM, and more. */
export default function ProductFeaturePage({ pageId }: Props) {
  const page = getProductPage(pageId);
  return <ProductFeatureView page={page} />;
}
