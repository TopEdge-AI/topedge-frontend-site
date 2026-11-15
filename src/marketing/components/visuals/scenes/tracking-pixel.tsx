/**
 * Tracking Pixel scenes. Keys are the image paths in productPages.ts.
 * Palette: amber hero, then violet, sky, emerald, rose and indigo per scene.
 */
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Clock,
  Code2,
  CreditCard,
  Eye,
  Fingerprint,
  Radio,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Store,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from 'lucide-react';
import {
  Avatar,
  Bars,
  Btn,
  Bubble,
  Chip,
  Cursor,
  Float,
  IconTile,
  Meter,
  Node,
  Panel,
  Row,
  Stage,
  Stat,
  Toggle,
  Wires,
  type IconType,
  type SceneMap,
  type SceneProps,
  type Tone,
} from '../kit';

/* ── Local pieces ──────────────────────────────────────────────────────── */

type Step = { label: string; pct: string; count: string; drop?: string; h: number };

/** Four-step funnel: numbers over solid bars that grow in (kit bar styles). */
function Funnel({ steps }: { steps: Step[] }) {
  const cols = { display: 'grid', gridTemplateColumns: `repeat(${steps.length}, 1fr)`, columnGap: '0.5em' };
  return (
    <div data-tone="emerald">
      <div style={cols}>
        {steps.map((s) => (
          <div key={s.label} style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <small style={{ fontSize: '0.85em', color: 'var(--fv-muted)', whiteSpace: 'nowrap' }}>{s.label}</small>
            <b style={{ fontSize: '1.4em', fontWeight: 600, letterSpacing: '-0.03em' }}>{s.pct}</b>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35em', fontSize: '0.85em', color: 'var(--fv-muted)', whiteSpace: 'nowrap' }}>
              {s.count}
              {s.drop ? (
                <i style={{ fontStyle: 'normal', fontWeight: 600, color: '#e11d48', background: '#ffe4e6', borderRadius: '99em', padding: '0 0.45em' }}>
                  {s.drop}
                </i>
              ) : null}
            </span>
          </div>
        ))}
      </div>
      <div className="fv-bars" style={{ height: '5.2em', marginTop: '0.8em' }}>
        {steps.map((s, i) => (
          <i
            key={s.label}
            className="is-hi"
            style={{ height: `${Math.max(s.h, 7)}%`, animationDelay: `calc(var(--fv-d, 0ms) + ${200 + i * 70}ms)` }}
          />
        ))}
      </div>
    </div>
  );
}

/** Icon tile with a caption under it. */
function Labeled({ icon, tone, label }: { icon: IconType; tone: Tone; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.55em' }}>
      <IconTile icon={icon} tone={tone} size="lg" />
      <b style={{ fontSize: '1.05em', fontWeight: 600, letterSpacing: '-0.02em' }}>{label}</b>
    </div>
  );
}

/** One expanded pixel event: event chip plus the page it fired on. */
function Event({ tone, name, path }: { tone: Tone; name: string; path: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7em', padding: '0.35em 0.65em 0.35em 3.4em' }}>
      <span style={{ width: '7.6em', flex: 'none' }}>
        <Chip tone={tone}>{name}</Chip>
      </span>
      <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '0.92em', color: 'var(--fv-muted)', whiteSpace: 'nowrap' }}>
        {path}
      </span>
    </div>
  );
}

/* ── Hero (wide, kept inside the 16:9 crop) ────────────────────────────── */

/** Funnel plus identified shoppers, and the WhatsApp nudge it unlocks. */
function Hero({ label }: SceneProps) {
  return (
    <Stage label={label} tone="amber" shape="wide">
      <Wires shape="wide" tone="amber" paths={['M 26 29.4 L 26 38.4', 'M 42 41.8 C 49 41.8, 49 41.3, 56 41.3']} />
      <Float x={3} y={8} w={47} delay={0}>
        <Panel title="Shopper journey" icon={TrendingUp} tone="emerald" right={<Chip tone="violet">6.7% reach checkout</Chip>}>
          <Funnel
            steps={[
              { label: 'Visitors', pct: '100%', count: '4,280', h: 100 },
              { label: 'Product view', pct: '72.9%', count: '3,120', drop: '−27%', h: 73 },
              { label: 'Add to cart', pct: '15.0%', count: '640', drop: '−79%', h: 15 },
              { label: 'Checkout', pct: '6.7%', count: '286', drop: '−55%', h: 7 },
            ]}
          />
        </Panel>
      </Float>
      <Float x={53} y={8} w={44} delay={2}>
        <Panel title="Live shoppers" icon={Users} tone="violet" right={<Chip tone="emerald" dot>Pixel live</Chip>}>
          <Row lead={<IconTile icon={Smartphone} tone="violet" size="sm" />} title="+91 98765 43210" sub="/checkouts/…/cn" right={<Chip tone="violet">Contact captured</Chip>} active />
          <Row lead={<IconTile icon={Smartphone} tone="sky" size="sm" />} title="+91 98111 22233" sub="/products/hydrating-gel" right={<Chip tone="sky">Add to cart</Chip>} />
          <Row lead={<IconTile icon={Eye} tone="slate" size="sm" />} title="Anonymous" sub="/products/retinol-cream" right={<Chip tone="slate">Product view</Chip>} />
        </Panel>
      </Float>
      <Float x={9} y={61} w={33} delay={4}>
        <Node icon={Zap} tone="amber" title="Cart recovery" sub="Matched +91 98111 22233" active />
      </Float>
      <Float x={56} y={58} w={38} delay={5} drift>
        <Bubble from="biz" time="12:31" read>Hi Aarav, your hydrating gel is still in your cart.</Bubble>
      </Float>
      <Float x={57} y={78} delay={6}>
        <Chip tone="slate" icon={ShieldCheck}>Messaged only after opt-in</Chip>
      </Float>
    </Stage>
  );
}

/* ── Bento tiles (square, 36em x 36em) ─────────────────────────────────── */

/** Theme app embed: one toggle in Shopify, events start flowing. */
function ThemeEmbed({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet" grid>
      <Wires
        tone="violet"
        paths={['M 50 35 C 50 43, 20 41, 20 49', 'M 50 35 L 50 49', 'M 50 35 C 50 43, 80 41, 80 49']}
      />
      <Float x={8} y={9} w={84} delay={0}>
        <Panel title="Theme settings" icon={Store} tone="emerald" right={<Chip tone="slate">App embeds</Chip>}>
          <Row lead={<IconTile icon={Code2} tone="violet" />} title="TopEdge AI pixel" sub="Theme app embed" right={<Toggle tone="violet" />} active />
        </Panel>
      </Float>
      <Cursor x={83} y={26} delay={5} />
      <Float x={10} y={49} w={20} delay={2}>
        <Labeled icon={Eye} tone="sky" label="Views" />
      </Float>
      <Float x={40} y={49} w={20} delay={3}>
        <Labeled icon={ShoppingCart} tone="amber" label="Carts" />
      </Float>
      <Float x={70} y={49} w={20} delay={4}>
        <Labeled icon={CreditCard} tone="emerald" label="Checkouts" />
      </Float>
      <Float x={12} y={72} w={76} delay={6} drift>
        <Panel>
          <Row lead={<IconTile icon={ShieldCheck} tone="emerald" />} title="Pixel installed" sub="No developer, no snippet" right={<Chip tone="emerald" dot>Live</Chip>} />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Views, carts and checkouts streaming into a journey trigger. */
function EventStream({ label }: SceneProps) {
  return (
    <Stage label={label} tone="sky">
      <Wires tone="sky" paths={['M 50 56 L 50 67']} />
      <Float x={7} y={8} w={86} delay={0}>
        <Panel title="Live events" icon={Activity} tone="sky" right={<Chip tone="emerald" dot>Streaming</Chip>}>
          <Row lead={<IconTile icon={Eye} tone="sky" size="sm" />} title="Product view" sub="Vitamin C serum · 2s ago" right={<Chip tone="sky">View</Chip>} />
          <Row lead={<IconTile icon={ShoppingCart} tone="amber" size="sm" />} title="Add to cart" sub="₹729 · 1 item" right={<Chip tone="amber">Cart</Chip>} active />
          <Row lead={<IconTile icon={CreditCard} tone="emerald" size="sm" />} title="Checkout started" sub="Number captured" right={<Chip tone="emerald">Checkout</Chip>} />
        </Panel>
      </Float>
      <Float x={15} y={67} w={70} delay={3} drift>
        <Node icon={Zap} tone="violet" title="Cart recovery fired" sub="Matched +91 98111 22233" active />
      </Float>
      <Float x={22} y={85} delay={5}>
        <Chip tone="slate">Fires when the number is known</Chip>
      </Float>
    </Stage>
  );
}

/** Funnel with the leaking step called out. */
function JourneyFunnel({ label }: SceneProps) {
  return (
    <Stage label={label} tone="emerald">
      <Float x={7} y={7} w={86} delay={0}>
        <Panel title="Shopper journey" icon={TrendingUp} tone="emerald" right={<Chip tone="violet">6.7% to checkout</Chip>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
            <Meter tone="emerald" label="Visitors" value="4,280" pct={100} />
            <Meter tone="emerald" label="Product view" value="3,120" pct={73} />
            <Meter tone="emerald" label="Add to cart" value="640" pct={15} />
            <Meter tone="emerald" label="Reached checkout" value="286" pct={7} />
          </div>
        </Panel>
      </Float>
      <Float x={36} y={59.5} delay={3} rotate={2} drift z={3}>
        <Chip tone="rose" solid icon={TrendingDown}>−79% at add to cart</Chip>
      </Float>
      <Float x={10} y={70} w={80} delay={5}>
        <Panel>
          <Row lead={<IconTile icon={ShoppingBag} tone="amber" />} title="Buy Now / skip cart" sub="Tracked as its own path" right={<Chip tone="amber">Path</Chip>} />
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Showcases (wide, 64em x 40em) ─────────────────────────────────────── */

/** Live feed: one shopper expanded into the events behind them. */
function IntentFeed({ label }: SceneProps) {
  return (
    <Stage label={label} tone="rose" shape="wide">
      <Wires shape="wide" tone="rose" paths={['M 60 38.6 L 64 38.6']} />
      <Float x={4} y={12} w={56} delay={0}>
        <Panel title="Live intent feed" icon={Radio} tone="rose" right={<Chip tone="rose" dot>Live</Chip>}>
          <Row lead={<IconTile icon={Smartphone} tone="violet" size="sm" />} title="+91 98765 43210" sub="5 events · 14:33" right={<Chip tone="violet">Contact captured</Chip>} active />
          <Event tone="amber" name="checkout" path="/checkouts/…/cn" />
          <Event tone="indigo" name="add to cart" path="/products/vitamin-c-serum" />
          <Event tone="sky" name="product view" path="/products/vitamin-c-serum" />
          <Event tone="slate" name="page view" path="yourstore.myshopify.com" />
          <Row lead={<IconTile icon={Smartphone} tone="sky" size="sm" />} title="+91 98111 22233" sub="3 events · 12:48" right={<Chip tone="sky">Add to cart</Chip>} />
        </Panel>
      </Float>
      <Float x={64} y={12} w={32} delay={2}>
        <Panel title="Signal mix" icon={BarChart3} tone="violet">
          <Bars values={[92, 30, 48, 22]} hi={0} tone="violet" height={7} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: '0.5em', marginTop: '0.5em', fontSize: '0.82em', color: 'var(--fv-muted)', textAlign: 'center' }}>
            <span>Browse</span>
            <span>Page</span>
            <span>Product</span>
            <span>Cart</span>
          </div>
        </Panel>
      </Float>
      <Float x={64} y={56.5} w={32} delay={4} drift>
        <Node icon={Zap} tone="amber" title="Cart recovery" sub="Ready while it is warm" active />
      </Float>
      <Float x={6} y={80} delay={5}>
        <Chip tone="slate" icon={Clock}>Events land in seconds</Chip>
      </Float>
    </Stage>
  );
}

/** Anonymous browsing attaches to a WhatsApp number at checkout. */
function NumberMatch({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet" shape="wide" grid>
      <Wires
        shape="wide"
        tone="violet"
        paths={['M 35 19.5 C 40 19.5, 40 18.1, 45 18.1', 'M 53.8 18.1 C 59 18.1, 59 17.5, 64 17.5', 'M 80 32.5 L 80 37.5']}
      />
      <Float x={4} y={16} w={31} delay={0} rotate={-1}>
        <Panel title="Anonymous visitor" icon={Eye} tone="slate">
          <Row title="Viewed serum 3×" sub="/products/vitamin-c-serum" />
          <Row title="Added to cart" sub="₹729.95 · 1 item" />
        </Panel>
      </Float>
      <Float x={45} y={22} delay={2}>
        <IconTile icon={Fingerprint} tone="violet" size="xl" pulse />
      </Float>
      <Float x={38.5} y={41} delay={3}>
        <Chip tone="violet">Checkout reveals number</Chip>
      </Float>
      <Float x={64} y={10} w={32} delay={4}>
        <Panel title="Profile matched" icon={UserCheck} tone="violet" right={<Chip tone="emerald" dot>Opted in</Chip>}>
          <Row lead={<Avatar name="Moksh Patel" tone="violet" />} title="Moksh Patel" sub="+91 93130 45439" />
          <Row lead={<IconTile icon={ShoppingBag} tone="emerald" size="sm" />} title="Order #1041" sub="₹649.96 · Purchased" />
          <Row lead={<IconTile icon={Eye} tone="sky" size="sm" />} title="3 views, 1 cart" sub="Attached to profile" />
        </Panel>
      </Float>
      <Float x={60} y={60} w={36} delay={6} drift>
        <Bubble from="biz" time="12:06" read>Hi Moksh, your Vitamin C serum is waiting. Want it delivered?</Bubble>
      </Float>
      <Float x={6} y={60} delay={5}>
        <Chip tone="slate" icon={ShieldCheck}>No message before opt-in</Chip>
      </Float>
      <Float x={6} y={69} delay={6}>
        <Chip tone="violet" solid icon={Zap}>Ready for journeys</Chip>
      </Float>
    </Stage>
  );
}

/** Pixel health: events still flowing, a stale alert, audience handoff. */
function PixelHealth({ label }: SceneProps) {
  return (
    <Stage label={label} tone="indigo" shape="wide">
      <Float x={4} y={10} w={58} delay={0}>
        <Panel title="Store growth" icon={TrendingUp} tone="indigo" right={<Chip tone="indigo">30 days</Chip>}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: '1em' }}>
            <Stat label="Visitors" value="4,280" />
            <Stat label="Product view" value="3,120" />
            <Stat label="Add to cart" value="640" />
            <Stat label="Checkout" value="286" />
          </div>
          <div style={{ marginTop: '1.1em' }}>
            <Bars tone="indigo" height={5.5} hi={11} values={[34, 46, 40, 58, 52, 64, 60, 72, 66, 80, 74, 90]} />
          </div>
        </Panel>
      </Float>
      <Float x={66} y={8} w={30} delay={2}>
        <Panel title="Pixel health" icon={Activity} tone="emerald" right={<Chip tone="emerald" dot>Healthy</Chip>}>
          <Row title="Last event" sub="2 min ago" right={<Chip tone="emerald">OK</Chip>} />
          <Row title="Theme embed" sub="Enabled" right={<Toggle tone="emerald" />} />
        </Panel>
      </Float>
      <Float x={65} y={52} w={31} delay={4} rotate={2} drift z={3}>
        <Panel>
          <Row lead={<IconTile icon={AlertTriangle} tone="amber" />} title="Stale pixel alert" sub="Flagged when events stop" />
          <div style={{ marginTop: '0.6em' }}>
            <Btn tone="violet" primary icon={Zap}>Reconnect pixel</Btn>
          </div>
        </Panel>
      </Float>
      <Float x={6} y={61} w={42} delay={5}>
        <Panel>
          <Row lead={<IconTile icon={Users} tone="violet" />} title="Viewed 3×, never bought" sub="Audience for campaigns" right={<Chip tone="violet">Sync</Chip>} />
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
