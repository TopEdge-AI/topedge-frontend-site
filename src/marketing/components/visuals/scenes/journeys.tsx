/**
 * Journeys scenes, v3 storytelling style (see flow-builder.tsx).
 *
 * Square tiles: plain white, one focal element, at most two small pieces.
 * Wide panels: page mesh backdrop, one large white card, one or two satellites.
 * Keys are the image paths in productPages.ts.
 */
import {
  Clock,
  CreditCard,
  Eye,
  Lock,
  MessageCircle,
  Package,
  Workflow,
  Send,
  ShoppingCart,
  Truck,
  Wallet,
} from 'lucide-react';
import {
  Avatar,
  Btn,
  Bubble,
  Burst,
  Chip,
  Cursor,
  Float,
  Glow,
  IconTile,
  Node,
  Panel,
  Phone,
  Reveal,
  Rings,
  Row,
  Stage,
  TypeText,
  Typing,
  Wires,
  type SceneMap,
  type SceneProps,
} from '../kit';

/* ── Bento tiles: plain, one focal element ─────────────────────────────── */

/** Drop a wait step between the trigger and the send. */
function Builder({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6.5}>
      <Rings x={50} y={50} count={4} gap={9} />
      <Wires paths={['M 50 29 L 50 41', 'M 50 59 L 50 71']} />
      <Float x={22} y={12} w={56} at={0.2}>
        <Node icon={ShoppingCart} title="Cart abandoned" sub="Shopify trigger" />
      </Float>
      <Float x={18} y={41} w={64} at={1.2} z={3}>
        <Node icon={Clock} title="Wait 30 min" sub="Dropped on canvas" active />
      </Float>
      <Float x={22} y={71} w={56} at={2.4}>
        <Node icon={Send} title="Send reminder" sub="WhatsApp template" />
      </Float>
      <Cursor
        path={[
          [88, 30, 0.5],
          [70, 52, 1.4],
          [86, 88, 2.8],
        ]}
        clicks={[1.5]}
      />
    </Stage>
  );
}

/** Pre-built journeys, ready to use. */
function Library({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Glow x={50} y={52} size={22} />
      <Float x={12} y={18} w={76} at={0} z={3} fade="bottom">
        <Panel
          title="Pre-built journeys"
          icon={Workflow}
          right={
            <Btn primary pressAt={2}>
              Use
            </Btn>
          }
        >
          <Row lead={<IconTile icon={ShoppingCart} />} title="Cart recovery" sub="3 steps" active />
          <Row lead={<IconTile icon={Wallet} />} title="COD confirmation" sub="2 steps" />
          <Row lead={<IconTile icon={Package} />} title="Order confirmed" sub="1 step" />
          <Row lead={<IconTile icon={Truck} />} title="Shipping updates" sub="3 steps" />
        </Panel>
      </Float>
      <Cursor
        path={[
          [40, 90, 0.6],
          [64, 14, 1.8],
          [80, 40, 3],
        ]}
        clicks={[2]}
      />
    </Stage>
  );
}

/** Pending template blocks go-live; once approved, it publishes. */
function Gating({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Rings x={50} y={46} count={4} gap={9} />
      <Float x={16} y={34} w={68} at={0.2} z={3}>
        <Node icon={Send} title="Send reminder" sub="cart_reminder_v2" active />
      </Float>
      <Float x={28} y={14} at={0.8} until={2.6}>
        <Chip tone="amber" dot>Pending approval</Chip>
      </Float>
      <Float x={34} y={14} at={2.8}>
        <Chip tone="emerald" dot>Approved</Chip>
      </Float>
      <Float x={28} y={66} at={1.2} until={2.6}>
        <Chip tone="rose" icon={Lock}>Can't go live yet</Chip>
      </Float>
      <Float x={36} y={66} at={3}>
        <Btn primary pressAt={3.9}>
          Go live
        </Btn>
      </Float>
      <Cursor
        path={[
          [80, 92, 2.6],
          [50, 70, 3.7],
          [76, 90, 4.8],
        ]}
        clicks={[3.9]}
      />
    </Stage>
  );
}

/* ── Wide panels: one large card, a story ──────────────────────────────── */

/** Cart abandoned, wait, the reminder types, the cart is recovered. */
function AbandonedCart({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7}>
      <Float x={6} y={26} w={28} at={0}>
        <Panel glass title="Cart recovery" icon={Workflow}>
          <Reveal at={0.3}>
            <Row title="Cart abandoned" sub="₹3,450 · 2 items" />
          </Reveal>
          <Reveal at={0.9}>
            <Row title="Wait 30 min" sub="Then remind" />
          </Reveal>
          <Reveal at={1.5}>
            <Row title="Reminder 1 of 3" sub="Approved template" />
          </Reveal>
        </Panel>
      </Float>
      <Float x={46} y={4} w={34} at={0.5} z={3}>
        <Phone name="Your store">
          <Reveal at={0.9} until={1.7}>
            <Typing />
          </Reveal>
          <Reveal at={1.8}>
            <Bubble from="biz" time="4:12 pm" read buttons={['Complete order']}>
              <TypeText text="Riya, your cart is waiting. 10% off for the next hour." at={2} cps={40} />
            </Bubble>
          </Reveal>
          <Reveal at={3.5}>
            <Bubble from="user">Done, paid!</Bubble>
          </Reveal>
        </Phone>
      </Float>
      <Burst x={86} y={74} at={4.2} />
      <Float x={76} y={70} at={4.1}>
        <Chip solid icon={Wallet}>Recovered ₹3,450</Chip>
      </Float>
    </Stage>
  );
}

/** Branch on payment method: COD, prepaid and quiet buyers split. */
function Routes({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7}>
      <Wires
        shape="wide"
        paths={[
          'M 34 31 C 42 31, 42 13.5, 50 13.5',
          'M 34 31 L 50 31',
          'M 34 31 C 42 31, 42 48.5, 50 48.5',
        ]}
      />
      <Float x={8} y={42} w={26} at={0} z={3}>
        <Node icon={Package} title="Order created" sub="Branch on payment" />
      </Float>
      <Float x={50} y={14} w={30} at={1} until={3.1}>
        <Node icon={Wallet} title="COD" sub="Ask to confirm" />
      </Float>
      <Float x={50} y={14} w={30} at={3.1}>
        <Node icon={Wallet} title="COD" sub="Confirm sent" active />
      </Float>
      <Float x={50} y={42} w={30} at={1.4}>
        <Node icon={CreditCard} title="Prepaid" sub="Send thank you" />
      </Float>
      <Float x={50} y={70} w={30} at={1.8}>
        <Node icon={MessageCircle} title="No reply" sub="Nudge in 4 hours" />
      </Float>
    </Stage>
  );
}

/** A known shopper comes back, leaves again, and a journey starts. */
function Retarget({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7}>
      <Float x={8} y={14} w={50} at={0} z={3}>
        <Panel title="Return visit" icon={Eye}>
          <Row lead={<Avatar name="Riya Sharma" />} title="Riya Sharma" sub="Back on the site" />
          <Reveal at={0.8}>
            <Row lead={<IconTile icon={Eye} />} title="Linen kurta" sub="Viewed 3 times" />
          </Reveal>
          <Reveal at={1.4}>
            <Row
              lead={<IconTile icon={ShoppingCart} />}
              title="Left again"
              sub="Pixel intent: high"
              right={<Chip tone="amber" dot>Exit</Chip>}
              active
            />
          </Reveal>
        </Panel>
      </Float>
      <Float x={64} y={18} at={2}>
        <Chip tone="emerald" dot>Journey started</Chip>
      </Float>
      <Float x={62} y={38} w={32} at={2.6}>
        <Bubble from="biz" time="6:40 pm">
          <TypeText text="Still thinking about the Linen kurta? Your size is back." at={2.8} cps={40} />
        </Bubble>
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
