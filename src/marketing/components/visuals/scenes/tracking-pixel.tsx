/**
 * Tracking Pixel scenes (page slug: analytics). v3 storytelling style, see
 * flow-builder.tsx.
 *
 * Square tiles are plain white with one focal element. Wide panels sit on the
 * page mesh with one large white card and at most two satellites. Each scene
 * plays a short sequence (Float `at`, Reveal rows) instead of a static board.
 * Keys are the image paths in productPages.ts.
 */
import {
  Activity,
  Code2,
  CreditCard,
  Eye,
  Fingerprint,
  Footprints,
  LogOut,
  ShoppingCart,
  Users,
  Zap,
} from 'lucide-react';
import {
  Avatar,
  Bubble,
  Chip,
  Cursor,
  Float,
  Glow,
  IconTile,
  Meter,
  Node,
  Panel,
  Reveal,
  Rings,
  Row,
  Spark,
  Stack,
  Stage,
  Stat,
  Toggle,
  type SceneMap,
  type SceneProps,
} from '../kit';

/* ── Hero ──────────────────────────────────────────────────────────────── */

/** One shopper views, adds to cart, leaves; the pixel fires cart recovery. */
function Hero({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8.5}>
      <Float x={12} y={14} w={50} at={0.2} z={3}>
        <Panel title="Aarav Shah" icon={Fingerprint} right={<Chip tone="emerald" dot>Pixel live</Chip>}>
          <Reveal at={0.9}>
            <Row lead={<IconTile icon={Eye} />} title="Product view" sub="Hydrating gel · 2s ago" />
          </Reveal>
          <Reveal at={2.1}>
            <Row lead={<IconTile icon={ShoppingCart} />} title="Add to cart" sub="₹729 · 1 item" />
          </Reveal>
          <Reveal at={3.3}>
            <Row
              lead={<IconTile icon={LogOut} tone="amber" />}
              title="Left the store"
              sub="No checkout"
              right={<Chip tone="amber">Abandoned</Chip>}
            />
          </Reveal>
        </Panel>
      </Float>
      <Float x={66} y={22} w={28} at={4.6} z={4}>
        <Node icon={Zap} tone="emerald" title="Cart recovery fired" sub="To +91 98111 22233" active />
      </Float>
      <Float x={66} y={48} w={28} at={5.8} z={4}>
        <Bubble from="biz" time="12:31" read>
          Hi Aarav, your hydrating gel is still in your cart.
        </Bubble>
      </Float>
    </Stage>
  );
}

/* ── Bento tiles: plain, one focal element ─────────────────────────────── */

/** Tracking turns on from Shopify theme settings, no code. */
function ThemeEmbed({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Glow x={50} y={46} size={22} />
      <Float x={12} y={28} w={76} at={0.3} z={3}>
        <Panel title="App embeds" icon={Code2}>
          <Row title="TopEdge AI pixel" sub="Theme settings" right={<Toggle />} />
        </Panel>
      </Float>
      <Cursor
        path={[
          [62, 78, 0.4],
          [79, 48, 0.9],
        ]}
        clicks={[1]}
      />
      <Float x={36} y={66} at={1.8}>
        <Chip tone="emerald" dot>Pixel live</Chip>
      </Float>
    </Stage>
  );
}

/** View, cart and checkout events stream in from shoppers as they happen. */
function EventStream({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Rings x={50} y={52} count={4} gap={10} />
      <Float x={36} y={12} at={0.1}>
        <Chip tone="emerald" dot>Streaming</Chip>
      </Float>
      <Float x={12} y={26} w={76} at={0.3} z={3}>
        <Panel>
          <Reveal at={0.7}>
            <Row lead={<IconTile icon={Eye} />} title="Product view" sub="Pune · just now" />
          </Reveal>
          <Reveal at={1.7}>
            <Row lead={<IconTile icon={ShoppingCart} />} title="Add to cart" sub="Delhi · just now" />
          </Reveal>
          <Reveal at={2.7}>
            <Row lead={<IconTile icon={CreditCard} />} title="Checkout started" sub="Mumbai · just now" />
          </Reveal>
        </Panel>
      </Float>
    </Stage>
  );
}

/** Where shoppers drop off between view, cart and checkout. */
function JourneyFunnel({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Glow x={50} y={46} size={22} />
      <Float x={12} y={18} w={76} at={0.2} z={3}>
        <Panel title="Shopper journey" icon={Footprints}>
          <Stack gap={0.9}>
            <Meter label="Product view" value="3,120" pct={100} />
            <Meter label="Add to cart" value="640" pct={21} />
            <Meter label="Checkout" value="286" pct={9} />
          </Stack>
        </Panel>
      </Float>
      <Float x={30} y={76} at={2.2}>
        <Chip tone="rose" dot>−79% at add to cart</Chip>
      </Float>
    </Stage>
  );
}

/* ── Wide panels: page mesh, one large card ────────────────────────────── */

/** Views, scroll and carts land while intent is still warm. */
function IntentFeed({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7}>
      <Float x={12} y={14} w={52} at={0.2} z={3}>
        <Panel title="Live intent feed" icon={Activity} right={<Chip tone="emerald" dot>Live</Chip>}>
          <Reveal at={0.8}>
            <Row lead={<IconTile icon={Eye} />} title="Anonymous" sub="Scrolled 80% · serum page" />
          </Reveal>
          <Reveal at={1.8}>
            <Row lead={<IconTile icon={Eye} />} title="+91 98111 22233" sub="Viewed serum 3×" />
          </Reveal>
          <Reveal at={2.8}>
            <Row
              lead={<IconTile icon={ShoppingCart} />}
              title="+91 98765 43210"
              sub="Added to cart · ₹729"
              active
            />
          </Reveal>
        </Panel>
      </Float>
      <Float x={68} y={46} w={26} at={4.2} z={4}>
        <Node icon={Zap} title="Cart recovery" sub="Ready while warm" active />
      </Float>
    </Stage>
  );
}

/** Browsing ties to a WhatsApp number once checkout reveals it. */
function NumberMatch({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7}>
      <Float x={6} y={30} w={26} at={0.2}>
        <Panel glass title="Visitor" icon={Fingerprint}>
          <Row title="Viewed serum 3×" sub="No number yet" />
          <Row title="Added to cart" sub="₹729 · 1 item" />
        </Panel>
      </Float>
      <Float x={42} y={12} at={1.6}>
        <Chip icon={CreditCard}>Checkout reveals number</Chip>
      </Float>
      <Float x={40} y={22} w={50} at={2.6} z={3}>
        <Panel title="Profile matched" right={<Chip tone="emerald" dot>Opted in</Chip>}>
          <Row lead={<Avatar name="Moksh Patel" />} title="Moksh Patel" sub="+91 93130 45439" active />
          <Reveal at={3.4}>
            <Row lead={<IconTile icon={Eye} />} title="3 views, 1 cart" sub="Attached to profile" />
          </Reveal>
        </Panel>
      </Float>
    </Stage>
  );
}

/** Confirm events still flow, then hand the warm audience to campaigns. */
function PixelHealth({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7}>
      <Float x={10} y={12} w={52} at={0.2} z={3}>
        <Panel title="Pixel health" icon={Activity} right={<Chip tone="emerald" dot>Healthy</Chip>}>
          <Stat label="Events today" value="1,284" delta="Last event 2 min ago" />
          <Spark points={[30, 42, 38, 52, 48, 61, 58, 72, 70, 84]} height={5} />
          <Row title="Theme embed" sub="Enabled on live theme" right={<Toggle />} />
        </Panel>
      </Float>
      <Float x={68} y={44} w={26} at={3}>
        <Panel glass title="Audience" icon={Users}>
          <Row title="Viewed 3×, no buy" sub="412 shoppers" />
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
