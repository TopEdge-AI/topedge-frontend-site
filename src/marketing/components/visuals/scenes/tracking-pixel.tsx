/**
 * Website pixel scenes (v7). A sample skincare store, Glow Co. The hero
 * follows one visit end to end: browse, add to cart, leave, and the cart
 * recovery that reaches the shopper's phone while intent is warm.
 * Keys are the image paths in productPages.ts.
 */
import type { CSSProperties } from 'react';
import {
  Activity,
  Check,
  Code2,
  CreditCard,
  ExternalLink,
  Eye,
  Fingerprint,
  Footprints,
  LogOut,
  MousePointerClick,
  ShoppingCart,
  Users,
  Zap,
} from '../icons';
import {
  Attach,
  Avatar,
  Browser,
  Btn,
  Bubble,
  Chip,
  Cursor,
  Float,
  IconTile,
  IPhone,
  Meter,
  Panel,
  PhoneBanner,
  ProductArt,
  Reveal,
  Row,
  Spark,
  Stage,
  Stat,
  Swap,
  Toast,
  Toggle,
  type IconType,
  type SceneMap,
  type SceneProps,
} from '../kit';
import '../../../styles/optin-scenes.css';

const vars = (o: Record<string, string | number>) => o as unknown as CSSProperties;

/** One line in an event log: coloured dot, event, detail, time. */
function Ev({ icon, title, sub, when, at, tone }: { icon: IconType; title: string; sub: string; when: string; at: number; tone?: 'emerald' | 'amber' | 'rose' | 'sky' }) {
  return (
    <Reveal at={at}>
      <Row lead={<IconTile icon={icon} tone={tone} size="sm" />} title={title} sub={sub} right={<time className="px-when">{when}</time>} />
    </Reveal>
  );
}

/** Glow Co. serum product page. */
function SerumPage({ added }: { added: number }) {
  return (
    <div className="oi-store">
      <ProductArt kind="serum" h={10} />
      <div className="oi-store__info">
        <b className="jr-pdp-title">Hydrating gel serum</b>
        <small className="px-pdp-sub">30 ml · Niacinamide + HA</small>
        <span className="jr-pdp-price">₹729</span>
        <span data-cursor="add" className="px-add">
          <Swap
            at={added}
            a={<span className="px-add__btn">Add to cart</span>}
            b={
              <span className="px-add__btn is-added">
                <Check strokeWidth={3} /> Added
              </span>
            }
          />
        </span>
      </div>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */

function Hero({ label }: SceneProps) {
  return (
    <Stage label={label}
      steps={[[0, 'Views the serum'], [2.4, 'Adds to cart'], [4.4, 'Leaves the store'], [6.4, 'Recovery on WhatsApp']]} shape="wide" duration={12}>
      <Float x={6} y={10} w={50} until={5.6}>
        <Browser url="glowco.in/hydrating-gel">
          <SerumPage added={2.4} />
        </Browser>
      </Float>
      <Float x={18} y={0} at={5.8}>
        <IPhone name="Glow Co" overlay={<PhoneBanner at={6.4} until={7.6} title="Glow Co" body="Aarav, your hydrating gel is still in your cart" />}>
          <Reveal at={7}>
            <Bubble
              from="biz"
              time="12:31"
              media={<ProductArt kind="serum" h={6} />}
              buttons={[{ label: 'Complete checkout', icon: ExternalLink }]}
            >
              Hi Aarav, your hydrating gel is still in your cart. Free shipping if you check out today.
            </Bubble>
          </Reveal>
        </IPhone>
      </Float>
      <Float x={62} y={8} w={33}>
        <Panel title="Aarav Shah" icon={Fingerprint} right={<Chip tone="emerald" dot>Pixel live</Chip>}>
          <Ev icon={Eye} title="Product view" sub="Hydrating gel serum" when="12:20" at={0.8} />
          <Ev icon={ShoppingCart} title="Add to cart" sub="₹729 · 1 item" when="12:21" at={2.6} tone="sky" />
          <Ev icon={LogOut} title="Left the store" sub="No checkout" when="12:21" at={4.4} tone="amber" />
          <Ev icon={Zap} title="Cart recovery sent" sub="WhatsApp · +91 98111 22233" when="12:31" at={6.8} tone="emerald" />
        </Panel>
      </Float>
      <Cursor path={[[20, 80, 0.4], [30, 40, 1.2], ['add', 2], ['add', 2.5], [40, 20, 3.6], [48, 2, 4.3]]} clicks={[2.3]} />
    </Stage>
  );
}

/* ── Bento tiles ───────────────────────────────────────────────────────── */

/** Turn on the app embed in the Shopify theme: the pixel goes live. */
function ThemeEmbed({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={16} w={80}>
        <Panel title="App embeds" icon={Code2} right={<span className="px-shopify">Theme editor</span>}>
          <Row
            title="TopEdge AI pixel"
            sub="Tracks views, carts and checkouts"
            right={
              <span data-cursor="embed" style={vars({ '--fv-toggle-at': '1.1s' })}>
                <Toggle tone="emerald" />
              </span>
            }
            active
          />
          <Row title="Product reviews" sub="Another app" right={<Toggle on={false} />} />
          <Attach place="b" at={2} dy={0.4}>
            <Chip tone="emerald" dot>Pixel live · first event in 4s</Chip>
          </Attach>
        </Panel>
      </Float>
      <Cursor path={[[60, 96, 0.3], ['embed', 0.9], ['embed', 1.4], [64, 92, 2.4]]} clicks={[1.1]} />
    </Stage>
  );
}

/** Events stream in from shoppers across India, newest on top. */
function EventStream({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={12} w={80}>
        <Panel title="Live events" icon={Activity} right={<Chip tone="emerald" dot>Streaming</Chip>}>
          <Ev icon={CreditCard} title="Checkout started" sub="Mumbai · ₹1,458" when="now" at={2.4} tone="emerald" />
          <Ev icon={ShoppingCart} title="Add to cart" sub="Delhi · Vitamin C serum" when="now" at={1.5} tone="sky" />
          <Ev icon={Eye} title="Product view" sub="Pune · Hydrating gel" when="4s" at={0.6} />
          <Ev icon={MousePointerClick} title="Collection click" sub="Jaipur · Sunscreen" when="9s" at={0} />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Where shoppers drop: the funnel fills and the leak stands out. */
function JourneyFunnel({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={16} w={80}>
        <Panel title="Shopper journey" icon={Footprints} right={<Chip>Last 7 days</Chip>}>
          <div className="px-funnel">
            <Meter label="Product view" value="3,120" pct={100} />
            <div>
              <Meter label="Add to cart" value="640" pct={21} tone="rose" />
              <Reveal at={1.8}>
                <span className="px-drop">−79% drop after product view</span>
              </Reveal>
            </div>
            <Meter label="Checkout" value="286" pct={9} />
          </div>
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Showcases ─────────────────────────────────────────────────────────── */

/** Intent arrives live; the hottest cart is queued for recovery while warm. */
function IntentFeed({ label }: SceneProps) {
  return (
    <Stage label={label}
      steps={[[0, 'Intent arrives live'], [2.6, 'A hot cart'], [3.6, 'Recovery queued while warm']]} shape="wide" duration={8}>
      <Float x={18} y={8} w={58}>
        <Panel title="Live intent feed" icon={Activity} right={<Chip tone="emerald" dot>Live</Chip>}>
          <Ev icon={ShoppingCart} title="+91 98765 43210" sub="Added to cart · Vitamin C serum · ₹729" when="now" at={2.6} tone="sky" />
          <Ev icon={Eye} title="+91 98111 22233" sub="Viewed hydrating gel 3 times" when="1m" at={1.5} />
          <Ev icon={Eye} title="Anonymous visitor" sub="Scrolled 80% · sunscreen page" when="2m" at={0.5} />
          <Attach place="br" at={3.6} dx={2} dy={-2}>
            <Toast dark icon={Zap} title="Cart recovery queued" sub="Sends in 20 min while intent is warm" />
          </Attach>
        </Panel>
      </Float>
    </Stage>
  );
}

/** An anonymous visitor becomes a known shopper the moment checkout gives a number. */
function NumberMatch({ label }: SceneProps) {
  return (
    <Stage label={label}
      steps={[[0, 'Anonymous visitor'], [1.6, 'Checkout gives a number'], [2.6, 'Matched to a profile'], [3.4, 'History attached']]} shape="wide" duration={8}>
      <Float x={20} y={8} w={56}>
        <Panel>
          <Swap
            at={2.6}
            a={
              <div className="cr-head">
                <span className="px-anon">
                  <Fingerprint strokeWidth={1.8} />
                </span>
                <span className="cr-head__text">
                  <b>Visitor 8f2a</b>
                  <small>Anonymous · no number yet</small>
                </span>
                <Chip>Unknown</Chip>
              </div>
            }
            b={
              <div className="cr-head">
                <Avatar name="Moksh Patel" />
                <span className="cr-head__text">
                  <b>Moksh Patel</b>
                  <small>+91 93130 45439 · opted in</small>
                </span>
                <Chip tone="emerald" icon={Check}>Matched</Chip>
              </div>
            }
          />
          <Row lead={<IconTile icon={Eye} size="sm" />} title="Viewed Vitamin C serum" sub="3 times this week" right={<time className="px-when">Mon</time>} />
          <Row lead={<IconTile icon={ShoppingCart} size="sm" tone="sky" />} title="Added to cart" sub="₹729 · 1 item" right={<time className="px-when">Tue</time>} />
          <Reveal at={1.6}>
            <Row lead={<IconTile icon={CreditCard} size="sm" tone="emerald" />} title="Checkout started" sub="Entered +91 93130 45439" right={<time className="px-when">now</time>} active />
          </Reveal>
          <Attach place="r" at={3.4} dx={2} dy={3}>
            <Toast icon={Users} tone="emerald" title="History attached" sub="3 views and 1 cart, on one profile" />
          </Attach>
        </Panel>
      </Float>
    </Stage>
  );
}

/** Is the pixel healthy? Events, checks and an audience it already built. */
function PixelHealth({ label }: SceneProps) {
  return (
    <Stage label={label}
      steps={[[0, 'Events today'], [0.6, 'Health checks pass'], [2.8, 'An audience, ready']]} shape="wide" duration={8}>
      <Float x={16} y={6} w={62}>
        <Panel title="Pixel health" icon={Activity} right={<Chip tone="emerald" dot>Healthy</Chip>}>
          <div className="cp-perf">
            <div>
              <Stat label="Events today" value="1,284" delta="Last event 2 min ago" tone="emerald" />
              <Spark points={[30, 42, 38, 52, 48, 61, 58, 72, 70, 84]} height={5} tone="emerald" />
            </div>
            <div className="px-checks">
              <Reveal at={0.6}>
                <span><Check strokeWidth={3} /> Theme embed on</span>
              </Reveal>
              <Reveal at={1}>
                <span><Check strokeWidth={3} /> Cart events</span>
              </Reveal>
              <Reveal at={1.4}>
                <span><Check strokeWidth={3} /> Checkout events</span>
              </Reveal>
              <Reveal at={1.8}>
                <span><Check strokeWidth={3} /> Numbers matched</span>
              </Reveal>
            </div>
          </div>
          <Attach place="br" at={2.8} dx={2} dy={-1.4}>
            <Toast
              icon={Users}
              title="Viewed 3×, no buy"
              sub="412 shoppers · ready to message"
              right={<Btn primary>Use</Btn>}
            />
          </Attach>
        </Panel>
      </Float>
    </Stage>
  );
}

const scenes: SceneMap = {
  '/website-pixel.webp': Hero,
  '/website-track/20.webp': ThemeEmbed,
  '/website-track/21.webp': EventStream,
  '/website-track/22.webp': JourneyFunnel,
  '/website-track/31.webp': IntentFeed,
  '/website-track/32.webp': NumberMatch,
  '/website-track/33.webp': PixelHealth,
};

export default scenes;
