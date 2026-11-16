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
  Reveal,
  Rings,
  Row,
  Stage,
  Toggle,
  TypeText,
  Typing,
  Wires,
  type SceneMap,
  type SceneProps,
} from '../kit';

/* ── Bento tiles: plain, one focal element, a short story each ─────────── */

/** A shopper asks; the bot calls Shopify live; the answer comes back. */
function ShopifyTools({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Rings x={50} y={52} count={4} gap={9} />
      <Wires paths={['M 50 33 L 50 44', 'M 50 63 L 50 72']} />
      <Float x={20} y={12} w={60} at={0.2}>
        <Bubble from="user" time="11:02">
          <TypeText text="Where is my order?" at={0.5} />
        </Bubble>
      </Float>
      <Float x={18} y={44} w={64} at={1.6} z={3}>
        <Node icon={ShoppingBag} title="Fetch order" sub="Live from Shopify" active />
      </Float>
      <Float x={16} y={72} w={68} at={3}>
        <Bubble from="biz" time="11:02" read>
          #1042 is out for delivery today.
        </Bubble>
      </Float>
    </Stage>
  );
}

/** The shopper asks for a human; the bot pauses; Priya picks it up with context. */
function Handoff({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7.5}>
      <Glow x={50} y={58} size={20} />
      <Float x={14} y={12} w={66} at={0.2}>
        <Bubble from="user" time="11:04">
          <TypeText text="Can I talk to a person?" at={0.5} />
        </Bubble>
      </Float>
      <Float x={36} y={36} at={1.8} until={3.4}>
        <Chip icon={Bot} tone="amber" dot>Bot paused</Chip>
      </Float>
      <Float x={36} y={36} at={3.5}>
        <Chip icon={Headphones} tone="emerald" dot>Priya joined</Chip>
      </Float>
      <Float x={12} y={52} w={76} at={2.6} z={3}>
        <Panel title="Assigned to Priya" icon={Headphones}>
          <Row lead={<Avatar name="Rahul Mehta" />} title="Rahul Mehta" sub="Order #1042 · ₹2,499 COD" />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Store events land one after another, in real time. */
function WebhookSync({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Rings x={50} y={48} count={4} gap={10} />
      <Float x={39} y={34} at={0} z={3}>
        <IconTile icon={Webhook} size="xl" pulse />
      </Float>
      <Float x={6} y={16} at={1.2} drift>
        <Chip tone="amber" dot>Cart abandoned</Chip>
      </Float>
      <Float x={60} y={28} at={2.2} drift>
        <Chip tone="emerald" dot>Order created</Chip>
      </Float>
      <Float x={20} y={72} at={3.2} drift>
        <Chip tone="sky" dot>Fulfilment shipped</Chip>
      </Float>
    </Stage>
  );
}

/* ── Wide panels: page mesh backdrop, one large card, a story ──────────── */

/** Toggle a flow live, then publish confirms. */
function FlowList({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={6} y={28} w={22} at={0}>
        <Panel glass title="Folders" icon={Folder}>
          <Row title="Support" sub="4 flows" active />
          <Row title="Sales" sub="3 flows" />
        </Panel>
      </Float>
      <Float x={32} y={14} w={56} at={0.4} z={3}>
        <Panel title="Flows" right={<Btn primary icon={Zap} pressAt={2.6}>Publish</Btn>}>
          <Row
            lead={<IconTile icon={MessageCircle} tone="emerald" />}
            title="Welcome menu"
            sub="Runs on the first message"
            right={<Toggle />}
          />
          <Row lead={<IconTile icon={Package} />} title="Order status bot" sub="Reads live from Shopify" right={<Toggle />} />
          <Reveal at={1.2}>
            <Row
              lead={<IconTile icon={List} />}
              title="Returns and FAQ"
              sub="New flow · ready"
              right={<Chip tone="amber" dot>Draft</Chip>}
              active
            />
          </Reveal>
        </Panel>
      </Float>
      <Float x={58} y={74} at={3.2}>
        <Chip solid icon={Zap}>Live for the next message</Chip>
      </Float>
      <Cursor
        path={[
          [92, 82, 0.6],
          [79, 24, 2.3],
          [79, 24, 3],
          [70, 60, 4.4],
        ]}
        clicks={[2.6]}
      />
    </Stage>
  );
}

/** The welcome menu branches; a shopper taps Track order; the path lights up. */
function Canvas({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Wires
        shape="wide"
        paths={[
          'M 34 31 C 42 31, 42 13.5, 50 13.5',
          'M 34 31 L 50 31',
          'M 34 31 C 42 31, 42 48.5, 50 48.5',
        ]}
      />
      <Float x={8} y={42} w={26} at={0} z={3}>
        <Node icon={MessageCircle} tone="emerald" title="Welcome" sub="Any first message" />
      </Float>
      <Float x={50} y={14} w={30} at={0.7} until={3.1}>
        <Node icon={Package} title="Track order" sub="Fetches from Shopify" />
      </Float>
      <Float x={50} y={14} w={30} at={3.1}>
        <Node icon={Package} title="Track order" sub="Shopper tapped" active />
      </Float>
      <Float x={50} y={42} w={30} at={1}>
        <Node icon={List} title="Browse catalog" sub="5 collections" />
      </Float>
      <Float x={50} y={70} w={30} at={1.3}>
        <Node icon={User} title="Talk to us" sub="Opens Live Chat" />
      </Float>
      <Cursor path={[[30, 90, 1.6], [66, 24, 2.8], [66, 24, 3.4], [88, 60, 4.6]]} clicks={[3]} />
    </Stage>
  );
}

/** Test the flow on a simulator: menu, tap, typing, answer, all checks pass. */
function Simulator({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={9}>
      <Float x={8} y={30} w={30} at={0}>
        <Panel glass title="Test Flow" icon={Play}>
          <Reveal at={1}>
            <Row title="Welcome" sub="Passed" right={<Chip tone="emerald">Pass</Chip>} />
          </Reveal>
          <Reveal at={3}>
            <Row title="Track order" sub="Passed" right={<Chip tone="emerald">Pass</Chip>} />
          </Reveal>
          <Reveal at={5}>
            <Row title="Fetch order" sub="Answered in 1.2s" right={<Chip tone="emerald">Pass</Chip>} />
          </Reveal>
        </Panel>
      </Float>
      <Float x={52} y={4} w={34} at={0.2} z={3}>
        <Phone name="Your store">
          <Reveal at={0.8}>
            <Bubble from="biz" buttons={['Track order', 'Browse', 'Talk to us']}>
              Hi! How can we help today?
            </Bubble>
          </Reveal>
          <Reveal at={2.6}>
            <Bubble from="user">Track order</Bubble>
          </Reveal>
          <Reveal at={3.2} until={4.6}>
            <Typing />
          </Reveal>
          <Reveal at={4.7}>
            <Bubble from="biz" time="11:06" read>
              #1042 is out for delivery today.
            </Bubble>
          </Reveal>
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
