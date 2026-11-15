/* eslint-disable react-refresh/only-export-components -- a scene module exports its SceneMap by design. */
/**
 * Journeys scenes: cart, COD and shipping on one canvas, Meta-gated, measured in ₹.
 * Keys are the image paths in productPages.ts (the ?v= query is stripped).
 */
import {
  BadgeCheck,
  Banknote,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  Eye,
  Fingerprint,
  GitBranch,
  Hourglass,
  IndianRupee,
  Lock,
  LogOut,
  MessageCircle,
  MousePointer,
  Radar,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Truck,
  Workflow,
  Zap,
} from 'lucide-react';
import {
  Btn,
  Bubble,
  Chip,
  Cursor,
  Float,
  IconTile,
  Node,
  Panel,
  Phone,
  Row,
  Spark,
  Stage,
  Stat,
  Thumb,
  Toggle,
  Wires,
  type SceneMap,
  type SceneProps,
  type Tone,
} from '../kit';

/** Numbered step badge. */
function Step({ n, tone = 'violet' }: { n: number; tone?: Tone }) {
  return (
    <span
      data-tone={tone}
      style={{
        flex: 'none',
        display: 'grid',
        placeItems: 'center',
        width: '2.4em',
        height: '2.4em',
        borderRadius: '0.75em',
        fontSize: '1em',
        fontWeight: 700,
        color: 'var(--t-700)',
        background: 'linear-gradient(160deg, var(--t-50), var(--t-100))',
        boxShadow: '0 0 0 1px color-mix(in srgb, var(--t-500) 30%, transparent) inset',
      }}
    >
      {n}
    </span>
  );
}

/* ── Bento tiles (square, 36em x 36em) ─────────────────────────────────── */

/** Drag-and-drop builder: trigger, wait, send on a canvas. */
function Builder({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet" grid>
      <Wires tone="violet" paths={['M 14 19.7 L 14 36', 'M 14 47.7 L 14 64']} />
      <Float x={8} y={8} w={57} delay={0}>
        <Node icon={ShoppingCart} tone="emerald" title="Checkout abandoned" sub="Shopify trigger" active />
      </Float>
      <Float x={69} y={11} delay={1}>
        <Chip tone="violet">Trigger</Chip>
      </Float>
      <Float x={8} y={36} w={57} delay={2}>
        <Node icon={Clock} tone="amber" title="Wait 25 minutes" sub="Time to come back" />
      </Float>
      <Float x={69} y={39} delay={3}>
        <Chip tone="amber">Wait</Chip>
      </Float>
      <Float x={8} y={64} w={57} delay={4}>
        <Node icon={MessageCircle} tone="violet" title="Send cart reminder" sub="WhatsApp · checkout link" />
      </Float>
      <Float x={69} y={67} delay={5}>
        <Chip tone="emerald" dot>Approved</Chip>
      </Float>
      <Float x={40} y={85} delay={6} rotate={-3} drift z={4}>
        <Btn tone="violet" icon={GitBranch}>Add a condition</Btn>
      </Float>
      <Cursor x={66} y={89} delay={7} />
    </Stage>
  );
}

/** Pre-built library: seeded journeys instead of a blank canvas. */
function Library({ label }: SceneProps) {
  return (
    <Stage label={label} tone="emerald">
      <Float x={6} y={6} w={88} delay={0}>
        <Panel title="Start seeded" icon={Sparkles} tone="emerald" right={<Chip tone="emerald">4 ready</Chip>}>
          <Row lead={<IconTile icon={ShoppingCart} tone="amber" />} title="Cart recovery" sub="3 WhatsApp steps" right={<Chip tone="violet">Seeded</Chip>} active />
          <Row lead={<IconTile icon={Banknote} tone="emerald" />} title="COD confirm" sub="Confirm, reschedule, cancel" right={<Chip tone="violet">Seeded</Chip>} />
          <Row lead={<IconTile icon={CheckCircle2} tone="sky" />} title="Order confirm" sub="Right after checkout" right={<Chip tone="violet">Seeded</Chip>} />
          <Row lead={<IconTile icon={Truck} tone="violet" />} title="Shipping updates" sub="Packed, shipped, delivered" right={<Chip tone="violet">Seeded</Chip>} />
        </Panel>
      </Float>
      <Float x={18} y={75} w={76} delay={4} rotate={-1.5} drift z={3}>
        <Panel>
          <Row lead={<IconTile icon={Zap} tone="emerald" />} title="Cart recovery" sub="Templates attached" right={<Btn tone="emerald" primary>Use</Btn>} />
        </Panel>
      </Float>
      <Cursor x={84} y={86} delay={6} />
    </Stage>
  );
}

/** Meta gating: approved goes live, in review stays held. */
function Gating({ label }: SceneProps) {
  return (
    <Stage label={label} tone="amber">
      <Float x={6} y={7} w={88} delay={0}>
        <Panel>
          <Row lead={<IconTile icon={CheckCircle2} tone="emerald" />} title="cart_recovery_step_1" sub="Can go live" right={<Chip tone="emerald" dot>Approved</Chip>} />
        </Panel>
      </Float>
      <Float x={6} y={30} w={88} delay={2}>
        <Panel>
          <Row lead={<IconTile icon={Hourglass} tone="amber" />} title="cod_confirm_v2" sub="Held. Nothing sends." right={<Chip tone="amber" dot>In review</Chip>} active />
        </Panel>
      </Float>
      <Float x={12} y={56} w={76} delay={4} rotate={-1.5} drift z={3}>
        <Panel title="COD confirm" icon={Workflow} tone="slate" right={<Toggle on={false} />}>
          <Row lead={<IconTile icon={Lock} tone="rose" size="sm" />} title="Publish blocked" sub="Template still in review" />
        </Panel>
      </Float>
      <Float x={6} y={88} delay={6}>
        <Chip tone="amber" icon={BadgeCheck}>Status stays on the canvas</Chip>
      </Float>
    </Stage>
  );
}

/* ── Showcases (wide, 64em x 40em) ─────────────────────────────────────── */

/** Abandoned cart: three reminders, then stop, and the recovered ₹. */
function AbandonedCart({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet" shape="wide">
      <Float x={4} y={7} w={44} delay={0}>
        <Panel title="Abandoned cart" icon={ShoppingCart} tone="amber" right={<Chip tone="violet">3 steps</Chip>}>
          <Row lead={<Step n={1} />} title="You left items" sub="After 25 min" right={<Chip tone="emerald" dot>Sent</Chip>} />
          <Row lead={<Step n={2} />} title="Still in your cart" sub="After 4 hours" right={<Chip tone="emerald" dot>Sent</Chip>} active />
          <Row lead={<Step n={3} />} title="Last reminder" sub="After 24 hours, then stop" right={<Chip tone="slate">Queued</Chip>} />
        </Panel>
      </Float>
      <Float x={4} y={57} w={44} delay={2}>
        <Panel title="This journey" icon={IndianRupee} tone="emerald">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em', alignItems: 'end' }}>
            <Stat label="Recovered" value="₹48,240" delta="Paid checkouts" />
            <Spark points={[8, 14, 12, 26, 30, 44, 40, 58, 70, 82]} tone="emerald" height={5} />
          </div>
        </Panel>
      </Float>
      <Float x={55} y={6} w={29} delay={3} rotate={2} z={3}>
        <Phone name="Your store">
          <Bubble from="biz" time="7:25" read media={<Thumb tone="amber" icon={ShoppingBag} h={6} />} buttons={['Complete checkout']}>
            You left items in your cart. Your checkout is saved.
          </Bubble>
          <Bubble from="user">Paid, thanks!</Bubble>
        </Phone>
      </Float>
      <Float x={55} y={80} delay={5} z={4}>
        <Chip tone="emerald" solid icon={BadgeCheck}>Meta approved</Chip>
      </Float>
      <Float x={75} y={80} delay={6} z={4}>
        <Chip tone="violet">High AOV first</Chip>
      </Float>
      <Float x={86} y={30} delay={7}>
        <Chip tone="slate">₹0.8631 each</Chip>
      </Float>
    </Stage>
  );
}

/** Conditional routes: one trigger, a path per payment method or reply. */
function Routes({ label }: SceneProps) {
  return (
    <Stage label={label} tone="indigo" shape="wide" grid>
      <Wires
        shape="wide"
        tone="indigo"
        paths={[
          'M 26 28.3 C 30 28.3, 29 9.3, 33 9.3 L 60 9.3',
          'M 26 28.3 L 60 28.3',
          'M 26 28.3 C 30 28.3, 29 46.9, 33 46.9 L 60 46.9',
        ]}
      />
      <Float x={3} y={40} w={23} delay={0}>
        <Node icon={ShoppingBag} tone="emerald" title="Order created" sub="Shopify event" active />
      </Float>
      <Float x={3} y={10} delay={7}>
        <Chip tone="indigo" icon={GitBranch}>Branch on Growth & Scale</Chip>
      </Float>
      <Float x={34} y={12.5} delay={1}>
        <Chip tone="amber" icon={Banknote}>Payment is COD</Chip>
      </Float>
      <Float x={34} y={42.5} delay={2}>
        <Chip tone="sky" icon={CreditCard}>Payment is prepaid</Chip>
      </Float>
      <Float x={34} y={72.5} delay={3}>
        <Chip tone="slate" icon={Clock}>No reply</Chip>
      </Float>
      <Float x={60} y={9.7} w={36} delay={4}>
        <Node icon={CheckCircle2} tone="amber" title="Confirm or cancel" sub="Utility · ₹0.1150" />
      </Float>
      <Float x={60} y={40.2} w={36} delay={5}>
        <Node icon={Check} tone="sky" title="Order confirmed" sub="Receipt and next steps" />
      </Float>
      <Float x={60} y={70} w={36} delay={6}>
        <Node icon={MessageCircle} tone="rose" title="Quiet lead step" sub="A different message" />
      </Float>
    </Stage>
  );
}

/** Return and retarget: pixel intent on a known number fires a journey. */
function Retarget({ label }: SceneProps) {
  return (
    <Stage label={label} tone="sky" shape="wide">
      <Wires shape="wide" tone="sky" paths={['M 38 19 C 41 19, 39 28.3, 42 28.3', 'M 65 28.3 C 67 28.3, 65.5 21, 68 21']} />
      <Float x={4} y={10} w={34} delay={0}>
        <Panel title="On the site" icon={Radar} tone="sky" right={<Chip tone="emerald" dot>Known</Chip>}>
          <Row lead={<IconTile icon={Eye} tone="sky" size="sm" />} title="Viewed linen set" sub="Twice in 2 days" />
          <Row lead={<IconTile icon={MousePointer} tone="violet" size="sm" />} title="Scrolled 70%" sub="Product page" />
          <Row lead={<IconTile icon={LogOut} tone="slate" size="sm" />} title="Left the site" sub="No checkout" />
        </Panel>
      </Float>
      <Float x={42} y={40} w={23} delay={2} z={3}>
        <Node icon={Fingerprint} tone="violet" title="Number matched" sub="Journey fired" active />
      </Float>
      <Float x={68} y={8} w={28} delay={3} rotate={2} z={3}>
        <Phone name="Your store">
          <Bubble from="biz" time="6:12" read media={<Thumb tone="sky" icon={ShoppingBag} h={5.5} />} buttons={['View my cart']}>
            Still looking at the linen set? Your cart is saved.
          </Bubble>
        </Phone>
      </Float>
      <Float x={5} y={70} delay={5}>
        <Chip tone="sky" icon={Radar}>Tracking Pixel intent</Chip>
      </Float>
      <Float x={5} y={79} delay={6}>
        <Chip tone="violet" solid icon={Zap}>While interest is warm</Chip>
      </Float>
      <Float x={71} y={76} delay={7} z={4}>
        <Chip tone="sky" icon={Check}>No new checkout needed</Chip>
      </Float>
    </Stage>
  );
}

const scenes: SceneMap = {
  '/journey-sub-feature/4.webp': Builder,
  '/journey-sub-feature/5.webp': Library,
  '/journey-sub-feature/6.webp': Gating,
  '/journey-sub-feature/10.webp': AbandonedCart,
  '/journey-sub-feature/11.webp': Routes,
  '/journey-sub-feature/12.webp': Retarget,
};

export default scenes;
