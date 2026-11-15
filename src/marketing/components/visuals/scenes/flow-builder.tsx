/**
 * Flow Builder scenes. REFERENCE FILE for the v3 style: copy this shape.
 *
 * Square tiles (bento) are plain white, Graceview style: ONE focal element,
 * at most two supporting pieces, rings or a glow for place, generous air.
 * Wide panels (showcases, hero) sit on a rich gradient, Instantly style: ONE
 * large white card, at most one or two satellites (glass or small white).
 * Keys are the image paths in productPages.ts.
 */
import {
  Bot,
  Folder,
  Headphones,
  List,
  MessageCircle,
  Package,
  Play,
  ShoppingBag,
  User,
  Webhook,
  Zap,
} from 'lucide-react';
import {
  Avatar,
  Btn,
  Bubble,
  Chip,
  Cursor,
  Float,
  Glow,
  IconTile,
  Node,
  Panel,
  Phone,
  Rings,
  Row,
  Stage,
  Toggle,
  Typing,
  Wires,
  type SceneMap,
  type SceneProps,
} from '../kit';

/* ── Bento tiles: plain, one focal element ─────────────────────────────── */

/** A shopper question becomes a live Shopify lookup. */
function ShopifyTools({ label }: SceneProps) {
  return (
    <Stage label={label}>
      <Rings x={50} y={56} count={4} gap={9} />
      <Wires paths={['M 50 36 L 50 47', 'M 50 66 L 50 76']} />
      <Float x={22} y={16} w={56} delay={0}>
        <Bubble from="user" time="11:02">Where is my order?</Bubble>
      </Float>
      <Float x={18} y={47} w={64} delay={2} z={3}>
        <Node icon={ShoppingBag} title="Fetch order" sub="Live from Shopify" active />
      </Float>
      <Float x={33} y={76} delay={4}>
        <Chip tone="emerald" dot>#1042 shipped</Chip>
      </Float>
    </Stage>
  );
}

/** The bot steps aside and a teammate picks up with the order attached. */
function Handoff({ label }: SceneProps) {
  return (
    <Stage label={label}>
      <Glow x={50} y={52} size={20} />
      <Float x={36} y={18} delay={0}>
        <Chip icon={Bot} tone="amber">Bot paused</Chip>
      </Float>
      <Float x={14} y={34} w={72} delay={2} z={3}>
        <Panel title="Assigned to Priya" icon={Headphones}>
          <Row
            lead={<Avatar name="Rahul Mehta" />}
            title="Rahul Mehta"
            sub="Order #1042 · ₹2,499 COD"
          />
        </Panel>
      </Float>
      <Cursor x={70} y={62} delay={6} />
    </Stage>
  );
}

/** Store events stream into the bot in real time. */
function WebhookSync({ label }: SceneProps) {
  return (
    <Stage label={label}>
      <Rings x={50} y={48} count={4} gap={10} />
      <Float x={39} y={34} delay={0} z={3}>
        <IconTile icon={Webhook} size="xl" pulse />
      </Float>
      <Float x={8} y={18} delay={2} drift>
        <Chip tone="amber" dot>Cart abandoned</Chip>
      </Float>
      <Float x={60} y={30} delay={3} drift>
        <Chip tone="emerald" dot>Order created</Chip>
      </Float>
      <Float x={22} y={70} delay={4} drift>
        <Chip tone="sky" dot>Fulfilment shipped</Chip>
      </Float>
    </Stage>
  );
}

/* ── Wide panels: rich gradient, one large card ────────────────────────── */

/** Flows list with folders. */
function FlowList({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide">
      <Float x={6} y={26} w={22} delay={0}>
        <Panel glass title="Folders" icon={Folder}>
          <Row title="Support" sub="4 flows" />
          <Row title="Sales" sub="3 flows" />
        </Panel>
      </Float>
      <Float x={32} y={14} w={56} delay={2} z={3}>
        <Panel title="Flows" right={<Btn primary icon={Zap}>New flow</Btn>}>
          <Row
            lead={<IconTile icon={MessageCircle} tone="emerald" />}
            title="Welcome menu"
            sub="Runs on the first message"
            right={<Toggle />}
            active
          />
          <Row
            lead={<IconTile icon={Package} />}
            title="Order status bot"
            sub="Reads live from Shopify"
            right={<Toggle />}
          />
          <Row
            lead={<IconTile icon={List} />}
            title="Returns and FAQ"
            sub="Draft · edited 2 days ago"
            right={<Toggle on={false} />}
          />
        </Panel>
      </Float>
      <Cursor x={80} y={26} delay={7} />
    </Stage>
  );
}

/** Buttons and branches on the canvas. */
function Canvas({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide">
      <Wires
        shape="wide"
        paths={[
          'M 34 31 C 42 31, 42 13.5, 50 13.5',
          'M 34 31 L 50 31',
          'M 34 31 C 42 31, 42 48.5, 50 48.5',
        ]}
      />
      <Float x={8} y={42} w={26} delay={0} z={3}>
        <Node icon={MessageCircle} tone="emerald" title="Welcome" sub="Any first message" active />
      </Float>
      <Float x={50} y={14} w={30} delay={2}>
        <Node icon={Package} title="Track order" sub="Fetches from Shopify" />
      </Float>
      <Float x={50} y={42} w={30} delay={3}>
        <Node icon={List} title="Browse catalog" sub="5 collections" />
      </Float>
      <Float x={50} y={70} w={30} delay={4}>
        <Node icon={User} title="Talk to us" sub="Opens Live Chat" />
      </Float>
    </Stage>
  );
}

/** Test the flow on a simulator before it goes live. */
function Simulator({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide">
      <Float x={10} y={30} w={30} delay={0}>
        <Panel glass title="Test Flow" icon={Play}>
          <Row title="Welcome" sub="Passed" />
          <Row title="Track order" sub="Passed" />
          <Row title="Fetch order" sub="Running now" />
        </Panel>
      </Float>
      <Float x={50} y={6} w={34} delay={2} z={3}>
        <Phone name="Your store">
          <Bubble from="biz" buttons={['Track order', 'Browse', 'Talk to us']}>
            Hi! How can we help today?
          </Bubble>
          <Bubble from="user">Track order</Bubble>
          <Typing />
        </Phone>
      </Float>
    </Stage>
  );
}

const scenes: SceneMap = {
  '/flow-sub-feature/7.webp': ShopifyTools,
  '/flow-sub-feature/9.webp': Handoff,
  '/flow-sub-feature/8.webp': WebhookSync,
  '/flow-sub-feature/14.webp': FlowList,
  '/flow-sub-feature/15.webp': Canvas,
  '/flow-sub-feature/13.webp': Simulator,
};

export default scenes;
