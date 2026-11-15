/**
 * Flow Builder scenes. Reference file for the kit: copy this shape for a new page.
 * Keys are the image paths in productPages.ts.
 */
import {
  Bot,
  Folder,
  GitBranch,
  Headphones,
  List,
  MapPin,
  MessageCircle,
  MousePointerClick,
  Package,
  Play,
  RefreshCw,
  ShoppingBag,
  ShoppingCart,
  Truck,
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
  IconTile,
  Node,
  Panel,
  Phone,
  Row,
  Stage,
  Toggle,
  Typing,
  Wires,
  type SceneMap,
  type SceneProps,
} from '../kit';

/* ── Bento tiles (square, 36em x 36em) ─────────────────────────────────── */

/** Shopify tools: a bot node calling live store actions. */
function ShopifyTools({ label }: SceneProps) {
  return (
    <Stage label={label} tone="emerald" grid>
      <Wires tone="emerald" paths={['M 50 27 C 50 38, 26 36, 26 47', 'M 50 27 C 50 38, 74 36, 74 47', 'M 50 27 L 50 66']} />
      <Float x={22} y={9} w={56} delay={0}>
        <Node icon={Bot} tone="violet" title="Shopper asks" sub="Where is my order?" active />
      </Float>
      <Float x={5} y={45} w={43} delay={2} rotate={-2} drift>
        <Node icon={Package} tone="emerald" title="Fetch order" sub="#1042 · Shipped" />
      </Float>
      <Float x={52} y={45} w={43} delay={3} rotate={2} drift>
        <Node icon={MapPin} tone="sky" title="Edit address" sub="Before dispatch" />
      </Float>
      <Float x={18} y={68} w={64} delay={4}>
        <Panel>
          <Row
            lead={<IconTile icon={ShoppingBag} tone="emerald" />}
            title="Live from Shopify"
            sub="Orders, catalog, fulfilment"
            right={<Chip tone="emerald" dot>Synced</Chip>}
          />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Live Chat handoff: bot pauses, a human picks up with order context. */
function Handoff({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet">
      <Float x={7} y={8} w={70} delay={0}>
        <Bubble from="user" time="11:02">Can I talk to someone about my refund?</Bubble>
      </Float>
      <Float x={30} y={31} w={63} delay={2}>
        <Bubble from="biz" time="11:02" read>Connecting you to our team now.</Bubble>
      </Float>
      <Float x={32} y={47} delay={3}>
        <Chip tone="amber" icon={Bot}>Bot paused</Chip>
      </Float>
      <Float x={8} y={60} w={84} delay={4} drift>
        <Panel title="Assigned to Priya" icon={Headphones} right={<Chip tone="emerald" dot>Live</Chip>}>
          <Row
            lead={<Avatar name="Rahul Mehta" tone="sky" />}
            title="Rahul Mehta"
            sub="Order #1042 · ₹2,499 · COD"
            right={<Chip tone="violet">Refund</Chip>}
          />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Webhook sync: store events streaming in. */
function WebhookSync({ label }: SceneProps) {
  return (
    <Stage label={label} tone="sky" grid>
      <Wires tone="sky" paths={['M 50 30 L 50 44']} />
      <Float x={36} y={8} delay={0}>
        <IconTile icon={Webhook} tone="sky" size="xl" pulse />
      </Float>
      <Float x={8} y={42} w={84} delay={2}>
        <Panel title="Shopify events" icon={RefreshCw} tone="sky" right={<Chip tone="emerald" dot>Real time</Chip>}>
          <Row lead={<IconTile icon={ShoppingCart} tone="amber" size="sm" />} title="Checkout abandoned" sub="2 sec ago" right={<Chip tone="amber">Cart</Chip>} />
          <Row lead={<IconTile icon={Package} tone="emerald" size="sm" />} title="Order created" sub="14 sec ago" right={<Chip tone="emerald">Order</Chip>} />
          <Row lead={<IconTile icon={Truck} tone="sky" size="sm" />} title="Fulfilment shipped" sub="1 min ago" right={<Chip tone="sky">Ship</Chip>} />
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Showcases (wide, 64em x 40em) ─────────────────────────────────────── */

/** Flow list and folders. */
function FlowList({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet" shape="wide">
      <Float x={5} y={24} w={27} delay={0} rotate={-2}>
        <Panel title="Folders" icon={Folder} tone="amber">
          <Row title="Support" sub="4 flows" active />
          <Row title="Sales" sub="3 flows" />
          <Row title="Festive" sub="2 flows" />
        </Panel>
      </Float>
      <Float x={28} y={20} w={66} delay={2} z={3}>
        <Panel title="Flows" icon={GitBranch} right={<Btn primary icon={Zap}>New flow</Btn>}>
          <Row lead={<IconTile icon={MessageCircle} tone="emerald" />} title="Welcome menu" sub="Runs on first message" right={<><Chip tone="emerald" dot>Live</Chip><Toggle /></>} active />
          <Row lead={<IconTile icon={Package} tone="sky" />} title="Order status bot" sub="Fetches from Shopify" right={<><Chip tone="emerald" dot>Live</Chip><Toggle /></>} />
          <Row lead={<IconTile icon={List} tone="violet" />} title="Returns and FAQ" sub="Edited 2 days ago" right={<><Chip tone="slate">Draft</Chip><Toggle on={false} /></>} />
        </Panel>
      </Float>
      <Float x={58} y={78} delay={5} z={4} drift>
        <Chip tone="violet" solid icon={Zap}>Publish replaces the live flow</Chip>
      </Float>
      <Cursor x={84} y={29} delay={7} />
    </Stage>
  );
}

/** Buttons, lists and branches on the canvas. */
function Canvas({ label }: SceneProps) {
  return (
    <Stage label={label} tone="indigo" shape="wide" grid>
      <Wires
        shape="wide"
        tone="indigo"
        paths={[
          'M 28 27.5 C 36 27.5, 34 10.6, 42 10.6',
          'M 28 27.5 L 42 27.5',
          'M 28 27.5 C 36 27.5, 34 44.4, 42 44.4',
          'M 68 10.6 C 72 10.6, 71 18.4, 75 18.4',
          'M 68 44.4 C 72 44.4, 71 38.4, 75 38.4',
        ]}
      />
      <Float x={4} y={38} w={24} delay={0}>
        <Node icon={MessageCircle} tone="emerald" title="Welcome" sub="Any first message" active />
      </Float>
      <Float x={42} y={11} w={26} delay={2}>
        <Node icon={Package} tone="sky" title="Track order" sub="Button reply" />
      </Float>
      <Float x={42} y={38} w={26} delay={3}>
        <Node icon={List} tone="violet" title="Browse list" sub="5 collections" />
      </Float>
      <Float x={42} y={65} w={26} delay={4}>
        <Node icon={User} tone="amber" title="Talk to us" sub="Button reply" />
      </Float>
      <Float x={75} y={24} w={22} delay={5} rotate={2} drift>
        <Node icon={ShoppingBag} tone="emerald" title="Fetch order" />
      </Float>
      <Float x={75} y={56} w={22} delay={6} rotate={-2} drift>
        <Node icon={Headphones} tone="rose" title="Live Chat" />
      </Float>
      <Float x={5} y={76} delay={7}>
        <Chip tone="indigo" icon={MousePointerClick}>Each tap moves to the next node</Chip>
      </Float>
    </Stage>
  );
}

/** Simulator before publish. */
function Simulator({ label }: SceneProps) {
  return (
    <Stage label={label} tone="emerald" shape="wide">
      <Float x={7} y={14} w={40} delay={0} rotate={-1}>
        <Panel title="Test Flow" icon={Play} tone="emerald" right={<Chip tone="emerald" dot>Simulator</Chip>}>
          <Row lead={<IconTile icon={MessageCircle} tone="emerald" size="sm" />} title="Welcome" sub="Sent" right={<Chip tone="emerald">Pass</Chip>} />
          <Row lead={<IconTile icon={Package} tone="sky" size="sm" />} title="Track order" sub="Button tapped" right={<Chip tone="emerald">Pass</Chip>} active />
          <Row lead={<IconTile icon={ShoppingBag} tone="violet" size="sm" />} title="Fetch order" sub="Running" right={<Chip tone="amber">Now</Chip>} />
        </Panel>
      </Float>
      <Float x={10} y={74} delay={5}>
        <Chip tone="slate">No real customer is messaged</Chip>
      </Float>
      <Float x={56} y={7} w={33} delay={2} z={3} drift>
        <Phone name="Your store">
          <Bubble from="biz" buttons={['Track order', 'Browse', 'Talk to us']}>Hi! How can we help today?</Bubble>
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
