import { Link } from 'react-router-dom';
import DemoProductVideoFrame from './demo/DemoProductVideoFrame';
import {
  HOME_FILMS,
  type DemoVideo,
} from '../../data/homeFeatureMedia';

type Glow = 'violet' | 'emerald' | 'sky' | 'amber' | 'rose' | 'indigo';

type Story = {
  id: string;
  /** The plain job this feature does. Rendered as the eyebrow. */
  job: 'Recover revenue' | 'Protect COD orders' | 'Support customers' | 'Know your profit';
  titleLead: string;
  titleAccent: string;
  /** One line. If it needs a colon and a list, it is two features. */
  body: string;
  href: string;
  cta: string;
  glow: Glow;
  kind: 'video';
  video: DemoVideo;
};

/**
 * One line on desktop; on a phone the line breaks once, at the clause or
 * sentence boundary nearest the middle, so neither half is a stranded word.
 */
function splitBody(body: string) {
  const mid = body.length / 2;
  let best = -1;
  for (const m of body.matchAll(/[.,] /g)) {
    const i = (m.index ?? 0) + 1;
    if (best < 0 || Math.abs(i - mid) < Math.abs(best - mid)) best = i;
  }
  if (best < 0) {
    for (const m of body.matchAll(/ /g)) {
      const i = m.index ?? 0;
      if (best < 0 || Math.abs(i - mid) < Math.abs(best - mid)) best = i;
    }
  }
  if (best < 0) return body;
  return (
    <>
      {body.slice(0, best).trimEnd()}{" "}
      <br className="home-sticky__br" />
      {body.slice(best).trimStart()}
    </>
  );
}

/**
 * Four plain jobs, not a flat feature list. `job` renders as the eyebrow over
 * each moment, so a reader scanning the page sees what the product is for
 * (recover revenue, protect COD orders, support customers, know your profit)
 * before the feature name. Keep the stories sorted by job.
 */
const STORIES: Story[] = [
  {
    id: 'abandoned-cart',
    job: 'Recover revenue',
    titleLead: 'Abandoned Cart',
    titleAccent: 'Recovery',
    body: 'Three timed WhatsApp reminders bring shoppers back to the same checkout.',
    href: '/features/journeys',
    cta: 'See cart recovery',
    glow: 'emerald',
    kind: 'video',
    video: HOME_FILMS.cart,
  },
  {
    id: 'audience-campaigns',
    job: 'Recover revenue',
    titleLead: 'Broadcast',
    titleAccent: 'Campaigns',
    body: 'Send a Meta-approved template to a segment and track the revenue it earns.',
    href: '/features/campaigns',
    cta: 'See campaigns',
    glow: 'rose',
    kind: 'video',
    video: HOME_FILMS.campaigns,
  },
  {
    id: 'optin-popup',
    job: 'Recover revenue',
    titleLead: 'Website',
    titleAccent: 'Opt-in Tools',
    body: 'Popup, spin wheel and chat widget turn visitors into a consented WhatsApp list.',
    href: '/features/opt-in-tools',
    cta: 'See opt-in tools',
    glow: 'indigo',
    kind: 'video',
    video: HOME_FILMS.optin,
  },
  {
    id: 'website-pixel',
    job: 'Recover revenue',
    titleLead: 'Website',
    titleAccent: 'Tracking Pixel',
    body: 'See who is browsing now, matched to a WhatsApp number you can message.',
    href: '/features/analytics',
    cta: 'See the pixel',
    glow: 'violet',
    kind: 'video',
    video: HOME_FILMS.pixel,
  },
  {
    id: 'cod-prepaid',
    job: 'Protect COD orders',
    titleLead: 'COD Confirmation',
    titleAccent: 'and Prepaid',
    body: 'Confirm every COD order before it ships, because a returned parcel costs ₹180 to ₹240.',
    href: '/features/cod-confirmation',
    cta: 'See COD confirmation',
    glow: 'violet',
    kind: 'video',
    video: HOME_FILMS.cod,
  },
  {
    id: 'shopify-tools',
    job: 'Support customers',
    titleLead: 'Flow Builder +',
    titleAccent: 'Shopify Tools',
    body: 'Fetch an order, fix an address or cancel a shipment without leaving the chat.',
    href: '/features/flow-builder',
    cta: 'See Flow Builder',
    glow: 'sky',
    kind: 'video',
    video: HOME_FILMS.flow,
  },
  {
    id: 'intent-detection',
    job: 'Support customers',
    titleLead: 'Real-time',
    titleAccent: 'Intent Detection',
    body: 'Spot shipping, returns and COD questions in the chat and route each to the right flow.',
    href: '/features/intent-detection',
    cta: 'See intent routing',
    glow: 'indigo',
    kind: 'video',
    video: HOME_FILMS.intent,
  },
  {
    id: 'unified-identity',
    job: 'Support customers',
    titleLead: 'Unified Customer',
    titleAccent: 'Identity',
    body: 'Every chat carries the shopper’s full order history, across every number and email they use.',
    href: '/features/audience-crm',
    cta: 'See profiles',
    glow: 'violet',
    kind: 'video',
    video: HOME_FILMS.identity,
  },
  {
    id: 'segmentation',
    job: 'Know your profit',
    titleLead: 'Smart Audience',
    titleAccent: 'Segmentation',
    body: 'Group customers by carts, COD risk and order history, then see what each segment earned.',
    href: '/features/audience-crm',
    cta: 'See audiences',
    glow: 'rose',
    kind: 'video',
    video: HOME_FILMS.segments,
  },
  {
    id: 'net-profit',
    job: 'Know your profit',
    titleLead: 'Net Profit',
    titleAccent: 'After RTO',
    body: 'See what you kept after COGS, COD fees, RTO, gateway charges and ad spend.',
    href: '/features/profit-loss',
    cta: 'See profit and costs',
    glow: 'amber',
    kind: 'video',
    video: HOME_FILMS.profit,
  },
];

function FeatureMoment({ story }: { story: Story }) {
  const title = `${story.titleLead} ${story.titleAccent}`;

  return (
    <article
      className="home-sticky__moment"
      data-story={story.id}
      data-glow={story.glow}
    >
      <div className="home-sticky__stage">
        <div className="home-sticky__static-copy home-sticky__copy-layer">
          <p className="home-sticky__job">{story.job}</p>
          <h2 className="home-sticky__title">
            {story.titleLead}{' '}
            <span className="home-sticky__title-accent">{story.titleAccent}</span>
          </h2>
          <p className="home-sticky__body">{splitBody(story.body)}</p>
          <Link className="mkt-btn-primary home-sticky__cta-btn" to={story.href}>
            {story.cta}
          </Link>
        </div>

        <div className="home-sticky__static-scene home-sticky__static-scene--iframe home-sticky__moment-scene home-sticky__frame-layer">
          <div className="home-sticky__moment-glow" aria-hidden>
            <span className="home-sticky__moment-glow__core" />
            <span className="home-sticky__moment-glow__halo" />
            <span className="home-sticky__moment-glow__wash" />
          </div>
          <DemoProductVideoFrame
            src={story.video.src}
            mobileSrc={story.video.mobileSrc}
            poster={story.video.poster}
            mobilePoster={story.video.mobilePoster}
            portraitMobile={Boolean(story.video.mobilePoster)}
            glow={story.glow}
            title={`${title} preview`}
          />
        </div>
      </div>
    </article>
  );
}

/** Product feature moments, video or still, restart from start when in view. */
export default function HomeStickyStories() {
  return (
    <section
      className="home-sticky home-sticky--static home-sticky--moments home-sticky--moments-flow home-sticky--moments-static"
      aria-label="Product features"
    >
      <div className="home-sticky__static">
        {STORIES.map((story) => (
          <FeatureMoment key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}
