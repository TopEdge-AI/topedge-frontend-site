/**
 * Audience CRM scenes, v3 storytelling style (see flow-builder.tsx).
 *
 * Square tiles: plain white, one focal element, at most two small pieces.
 * Wide panels: page mesh backdrop, one large white card, one or two satellites.
 * Keys are the image paths in productPages.ts.
 */
import {
  Filter,
  Mail,
  Megaphone,
  MessageCircle,
  Package,
  Phone as PhoneIcon,
  Workflow,
  ShoppingBag,
  User,
  Users,
} from 'lucide-react';
import {
  Avatar,
  Btn,
  Chip,
  Cursor,
  Meter,
  Float,
  Glow,
  IconTile,
  Node,
  Panel,
  Reveal,
  Rings,
  Row,
  Stage,
  Stat,
  Wires,
  type SceneMap,
  type SceneProps,
} from '../kit';

/* ── Hero ──────────────────────────────────────────────────────────────── */

/** One shopper's card fills with orders, chats and campaigns, row by row. */
function Hero({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7}>
      <Float x={34} y={10} w={52} at={0} z={3}>
        <Panel title="Riya Sharma" icon={User} right={<Chip dot>VIP</Chip>}>
          <Reveal at={0.8}>
            <Row lead={<IconTile icon={Package} />} title="Order #1187" sub="₹2,340 · Delivered" />
          </Reveal>
          <Reveal at={1.6}>
            <Row lead={<IconTile icon={MessageCircle} />} title="WhatsApp chat" sub="Asked about sizing" />
          </Reveal>
          <Reveal at={2.4}>
            <Row lead={<IconTile icon={Megaphone} />} title="Diwali sale" sub="Clicked, then ordered" active />
          </Reveal>
        </Panel>
      </Float>
      <Float x={6} y={34} w={24} at={3.3}>
        <Panel glass title="Linked numbers" icon={PhoneIcon}>
          <Row title="+91 98200 11223" sub="Primary" />
          <Row title="+91 90040 55667" sub="Secondary" />
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Bento tiles: plain, one focal element ─────────────────────────────── */

/** Order, chat and campaign stack up on one contact. */
function Timeline({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Glow x={50} y={50} size={20} />
      <Wires paths={['M 50 31 L 50 42', 'M 50 59 L 50 70']} />
      <Float x={22} y={14} w={56} at={0.2}>
        <Node icon={Package} title="Order #1204" sub="₹1,890 · today" />
      </Float>
      <Float x={18} y={42} w={64} at={1.2} z={3}>
        <Node icon={MessageCircle} title="Ananya Rao" sub="Replied on WhatsApp" active />
      </Float>
      <Float x={22} y={70} w={56} at={2.2}>
        <Node icon={Megaphone} title="Diwali offer" sub="Opened · 3 days ago" />
      </Float>
    </Stage>
  );
}

/** A segment built here feeds campaigns and journeys directly. */
function Segments({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Rings x={50} y={40} count={4} gap={9} />
      <Wires paths={['M 50 45 C 50 60, 24 58, 24 71', 'M 50 45 C 50 60, 72 58, 72 71']} />
      <Float x={18} y={30} w={64} at={0.2} z={3}>
        <Node icon={Filter} title="High-intent carts" sub="1,240 shoppers" active />
      </Float>
      <Float x={12} y={72} at={1.4}>
        <Chip icon={Megaphone}>Campaign</Chip>
      </Float>
      <Float x={60} y={72} at={2}>
        <Chip icon={Workflow}>Journey</Chip>
      </Float>
    </Stage>
  );
}

/** A score built from purchase and engagement signals. */
function LeadScoring({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Rings x={50} y={48} count={4} gap={9} />
      <Float x={18} y={32} w={64} at={0.2} z={3}>
        <Panel title="Ishaan Gupta" icon={User}>
          <Stat label="Lead score" value="86" />
          <Meter pct={86} />
        </Panel>
      </Float>
      <Float x={6} y={14} at={1.4} drift>
        <Chip icon={ShoppingBag} dot>Cart ₹3,450</Chip>
      </Float>
      <Float x={58} y={74} at={2.2} drift>
        <Chip icon={Package} dot>3 past orders</Chip>
      </Float>
    </Stage>
  );
}

/* ── Wide panels: one large card, a story ──────────────────────────────── */

/** A chat from an unknown number merges into the shopper it belongs to. */
function Identity({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7}>
      <Wires shape="wide" paths={['M 30 31 C 34 31, 34 31, 38 31']} />
      <Float x={4} y={38} w={26} at={0.2}>
        <Panel glass title="New chat" icon={MessageCircle}>
          <Row title="+91 90040 55667" sub="Unknown number" />
        </Panel>
      </Float>
      <Float x={38} y={12} w={52} at={0.6} z={3}>
        <Panel title="Riya Sharma" icon={User}>
          <Row lead={<IconTile icon={PhoneIcon} />} title="+91 98200 11223" sub="Primary" />
          <Row lead={<IconTile icon={Mail} />} title="riya.s@example.in" sub="Email" />
          <Reveal at={2.2}>
            <Row
              lead={<IconTile icon={PhoneIcon} />}
              title="+91 90040 55667"
              sub="Secondary"
              right={<Chip tone="emerald" dot>Merged</Chip>}
              active
            />
          </Reveal>
        </Panel>
      </Float>
      <Float x={56} y={58} at={3.2} z={4}>
        <Chip solid icon={Users}>1 profile, 1 thread</Chip>
      </Float>
    </Stage>
  );
}

/** One record: the numbers count up, then the campaign history slides in. */
function Customer360({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7}>
      <Float x={36} y={12} w={52} at={0} z={3}>
        <Panel title="Arjun Nair" icon={User} right={<Chip dot>Score 86</Chip>}>
          <div style={{ display: 'flex', gap: '2.4em', padding: '0.2em 0.6em 0.9em' }}>
            <Stat label="Orders" value="7" />
            <Stat label="Spent" value="₹18,420" />
          </div>
          <Row lead={<Avatar name="Arjun Nair" />} title="Order #1218" sub="Delivered · 2 days ago" />
          <Reveal at={1.6}>
            <Row lead={<IconTile icon={MessageCircle} />} title="Last chat" sub="Wants a size exchange" active />
          </Reveal>
        </Panel>
      </Float>
      <Float x={8} y={32} w={24} at={2.6}>
        <Panel glass title="Campaigns" icon={Megaphone}>
          <Row title="Diwali sale" sub="Clicked, ordered" />
          <Row title="New arrivals" sub="Opened" />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Rules stack up, the live count follows, save it as a segment. */
function SegmentBuilder({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7.5}>
      <Float x={32} y={12} w={54} at={0} z={3}>
        <Panel
          title="New segment"
          icon={Filter}
          right={
            <Btn primary pressAt={3.8}>
              Save
            </Btn>
          }
        >
          <Reveal at={0.6}>
            <Row lead={<IconTile icon={ShoppingBag} />} title="Orders 2 or more" sub="Shopify" />
          </Reveal>
          <Reveal at={1.3}>
            <Row lead={<IconTile icon={Package} />} title="Last order in 60 days" sub="Shopify" />
          </Reveal>
          <Reveal at={2}>
            <Row lead={<IconTile icon={MessageCircle} />} title="Opted in" sub="WhatsApp consent" />
          </Reveal>
        </Panel>
      </Float>
      <Float x={6} y={36} w={22} at={2.6}>
        <Panel glass title="Matches" icon={Users}>
          <Stat label="Shoppers" value="3,126" />
        </Panel>
      </Float>
      <Cursor
        path={[
          [70, 92, 2],
          [80, 22, 3.6],
          [84, 66, 5],
        ]}
        clicks={[3.8]}
      />
    </Stage>
  );
}

const scenes: SceneMap = {
  '/audience-crm-hero.webp': Hero,
  '/audience-crm-sub-feature/16.webp': Timeline,
  '/audience-crm-sub-feature/18.webp': Segments,
  '/audience-crm-sub-feature/17.webp': LeadScoring,
  '/leaadd.webp': Identity,
  '/audience-crm-sub-feature/360.webp': Customer360,
  '/audience-crm-sub-feature/crm-segement.webp': SegmentBuilder,
};

export default scenes;
