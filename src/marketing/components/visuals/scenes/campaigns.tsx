/**
 * Campaigns scenes, v3 storytelling style (see flow-builder.tsx).
 *
 * Square tiles: plain white, one focal element, at most two small pieces.
 * Wide panels: page mesh backdrop, one large white card, one or two satellites.
 * Keys are the image paths in productPages.ts.
 */
import { Megaphone, Lock, Repeat, Send, ShoppingBag, ShoppingCart, Eye, TrendingUp, Users } from 'lucide-react';
import {
  Avatar,
  Btn,
  Bubble,
  Chip,
  Cursor,
  Float,
  Glow,
  IconTile,
  Panel,
  Phone,
  Reveal,
  Rings,
  Row,
  Spark,
  Stage,
  Stat,
  Thumb,
  type SceneMap,
  type SceneProps,
} from '../kit';

/* ── Hero ──────────────────────────────────────────────────────────────── */

/** An approved template lands on the phone, then the revenue it earned. */
function Hero({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7.5}>
      <Float x={52} y={4} w={32} at={0} z={3}>
        <Phone name="Your store">
          <Reveal at={0.8}>
            <Bubble
              from="biz"
              time="7:30 pm"
              read
              media={<Thumb icon={ShoppingBag} h={7} />}
              buttons={['Shop the edit']}
            >
              Riya, the Diwali edit is here. 20% off till Sunday.
            </Bubble>
          </Reveal>
          <Reveal at={2.4}>
            <Bubble from="user">Ordered the blue one!</Bubble>
          </Reveal>
        </Phone>
      </Float>
      <Float x={14} y={18} at={0.4}>
        <Chip tone="emerald" dot>Approved template</Chip>
      </Float>
      <Float x={10} y={36} w={32} at={3.2}>
        <Panel glass title="Diwali sale" icon={Megaphone}>
          <Stat label="Revenue earned" value="₹1,84,200" delta="After Meta fees" />
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Bento tiles: plain, one focal element ─────────────────────────────── */

/** Two behaviour rules become one live segment. */
function Segments({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Rings x={50} y={62} count={4} gap={9} />
      <Float x={8} y={14} at={0.2}>
        <Chip icon={Repeat}>Orders 2 or more</Chip>
      </Float>
      <Float x={54} y={14} at={0.8}>
        <Chip icon={Eye}>Viewed 3+ items</Chip>
      </Float>
      <Float x={16} y={34} w={68} at={1.6} z={3}>
        <Panel title="Repeat buyers" icon={Users}>
          <Stat label="Shoppers in segment" value="2,418" />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Shoppers rank themselves by intent, highest first. */
function LeadScoring({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Glow x={50} y={54} size={22} />
      <Float x={12} y={20} w={76} at={0} z={3}>
        <Panel title="Top intent" icon={TrendingUp}>
          <Reveal at={0.7}>
            <Row lead={<Avatar name="Ishaan Gupta" />} title="Ishaan Gupta" sub="Cart ₹3,450" right="92" active />
          </Reveal>
          <Reveal at={1.3}>
            <Row lead={<Avatar name="Sneha Kulkarni" />} title="Sneha Kulkarni" sub="Viewed 6 items" right="81" />
          </Reveal>
          <Reveal at={1.9}>
            <Row lead={<Avatar name="Vikram Joshi" />} title="Vikram Joshi" sub="2 past orders" right="64" />
          </Reveal>
        </Panel>
      </Float>
      <Float x={32} y={80} at={2.8}>
        <Chip dot>Sorted by score</Chip>
      </Float>
    </Stage>
  );
}

/** The ₹ number that is left after Meta fees. */
function NetReport({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Rings x={50} y={48} count={4} gap={9} />
      <Float x={14} y={26} w={72} at={0.2} z={3}>
        <Panel title="Diwali sale" icon={Megaphone}>
          <Stat label="Net revenue" value="₹1,42,560" delta="After Meta fees" />
        </Panel>
      </Float>
      <Float x={28} y={64} at={2.2}>
        <Chip>Meta fees ₹2,158</Chip>
      </Float>
    </Stage>
  );
}

/* ── Wide panels: one large card, a story ──────────────────────────────── */

/** Pick a scored segment, press Send, the sent counter climbs. */
function AudienceBuilder({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7.5}>
      <Float x={30} y={12} w={56} at={0} z={3}>
        <Panel
          title="Choose audience"
          icon={Users}
          right={
            <Btn primary icon={Send} pressAt={3}>
              Send
            </Btn>
          }
        >
          <Row lead={<IconTile icon={Eye} />} title="Browsed, no order" sub="5,906 shoppers · score 40+" />
          <Row lead={<IconTile icon={Repeat} />} title="Repeat buyers" sub="2,418 shoppers · score 60+" />
          <Reveal at={1.6}>
            <Row
              lead={<IconTile icon={ShoppingCart} />}
              title="Cart abandoners"
              sub="1,240 shoppers · score 70+"
              right={<Chip dot>Selected</Chip>}
              active
            />
          </Reveal>
        </Panel>
      </Float>
      <Float x={6} y={36} w={22} at={3.5}>
        <Panel glass title="Sending" icon={Send}>
          <Stat label="Delivered" value="1,240" />
        </Panel>
      </Float>
      <Cursor
        path={[
          [80, 92, 0.3],
          [56, 60, 1.3],
          [80, 22, 2.8],
          [86, 70, 4.2],
        ]}
        clicks={[1.45, 3]}
      />
    </Stage>
  );
}

/** Approved templates send; a draft is stopped at the gate. */
function TemplateLock({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7}>
      <Float x={22} y={12} w={56} at={0} z={3}>
        <Panel title="Templates" icon={Megaphone}>
          <Row
            title="diwali_offer"
            sub="Marketing · ₹0.8631"
            right={<Chip tone="emerald" dot>Approved</Chip>}
          />
          <Row title="order_update" sub="Utility · ₹0.115" right={<Chip tone="emerald" dot>Approved</Chip>} />
          <Row title="flash_sale_draft" sub="Marketing · not reviewed" right={<Chip tone="amber" dot>Draft</Chip>} active />
        </Panel>
      </Float>
      <Float x={54} y={56} at={2.4} z={4}>
        <Chip solid icon={Lock}>Drafts can't send</Chip>
      </Float>
      <Cursor
        path={[
          [20, 88, 0.4],
          [46, 60, 1.6],
          [40, 86, 3.2],
        ]}
        clicks={[1.8]}
      />
    </Stage>
  );
}

/** One campaign: net revenue counts up, then where it came from. */
function Performance({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7}>
      <Float x={36} y={14} w={50} at={0} z={3}>
        <Panel title="Diwali sale" icon={Megaphone} right={<Chip tone="emerald" dot>Sent</Chip>}>
          <Stat label="Net revenue" value="₹3,92,400" delta="After Meta fees" />
          <Spark points={[12, 18, 26, 30, 44, 52, 66, 78, 86]} height={6} />
        </Panel>
      </Float>
      <Float x={8} y={30} w={24} at={2.6}>
        <Panel glass title="Breakdown">
          <Row title="Sent" right="4,000" />
          <Row title="Orders" right="212" />
          <Row title="Meta fees" right="₹3,452" />
        </Panel>
      </Float>
    </Stage>
  );
}

const scenes: SceneMap = {
  '/campaignn.webp': Hero,
  '/campaign-sub-feature/13.webp': Segments,
  '/campaign-sub-feature/14.webp': LeadScoring,
  '/campaign-sub-feature/15.webp': NetReport,
  '/campaign-sub-feature/21.webp': AudienceBuilder,
  '/campaign-sub-feature/22.webp': TemplateLock,
  '/campaign-sub-feature/20.webp': Performance,
};

export default scenes;
