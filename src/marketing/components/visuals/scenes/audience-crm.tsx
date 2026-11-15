/* eslint-disable react-refresh/only-export-components -- a scene module exports its SceneMap by design. */
/**
 * Audience CRM scenes: one shopper, every order, every chat, scored and segmented.
 * Keys are the image paths in productPages.ts.
 */
import type { ReactNode } from 'react';
import {
  Activity,
  Fingerprint,
  Layers,
  Mail,
  Megaphone,
  MessageCircle,
  MoreHorizontal,
  Package,
  RefreshCw,
  Send,
  ShoppingCart,
  Target,
  Users,
  Workflow,
} from 'lucide-react';
import {
  Avatar,
  Bubble,
  Chip,
  Cursor,
  Field,
  Float,
  IconTile,
  Meter,
  Node,
  Panel,
  Row,
  Stage,
  Wires,
  type SceneMap,
  type SceneProps,
  type Tone,
} from '../kit';

/* ── Local helpers ─────────────────────────────────────────────────────── */

/** Lead score pill: number over its tier with a fill bar. */
function ScorePill({ n, tier, tone }: { n: number; tier: string; tone: Tone }) {
  return (
    <span
      data-tone={tone}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.15em',
        width: '4.6em',
        padding: '0.3em 0.4em 0.4em',
        borderRadius: '0.7em',
        background: '#fff',
        boxShadow: '0 0 0 1px var(--fv-line) inset',
        lineHeight: 1.05,
      }}
    >
      <b style={{ fontSize: '1em', fontWeight: 650 }}>{n}</b>
      <small style={{ fontSize: '0.72em', fontWeight: 600, color: 'var(--t-600)' }}>{tier}</small>
      <i style={{ display: 'block', width: '100%', height: '0.25em', borderRadius: 99, background: 'var(--t-100)' }}>
        <i style={{ display: 'block', width: `${n}%`, height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, var(--t-400), var(--t-600))' }} />
      </i>
    </span>
  );
}

/** Lead score tier badge (round). */
function Tier({ n, tone }: { n: number; tone: Tone }) {
  return (
    <span
      data-tone={tone}
      style={{
        flex: 'none',
        display: 'grid',
        placeItems: 'center',
        width: '2.6em',
        height: '2.6em',
        borderRadius: '50%',
        fontSize: '0.95em',
        fontWeight: 700,
        color: 'var(--t-700)',
        background: 'linear-gradient(160deg, var(--t-50), var(--t-100))',
        boxShadow: '0 0 0 1.5px color-mix(in srgb, var(--t-500) 35%, transparent) inset',
      }}
    >
      {n}
    </span>
  );
}

/** Compact stat strip used in profile headers. */
function Strip({ items }: { items: [string, string][] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        gap: '0.6em',
        padding: '0.7em 0.85em',
        margin: '0.5em 0 0.2em',
        borderRadius: '0.85em',
        background: 'rgba(15,23,42,0.025)',
        boxShadow: '0 0 0 1px var(--fv-line) inset',
      }}
    >
      {items.map(([k, v]) => (
        <span key={k} style={{ display: 'flex', flexDirection: 'column', gap: '0.1em', minWidth: 0 }}>
          <small style={{ fontSize: '0.75em', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--fv-muted)', textTransform: 'uppercase' }}>{k}</small>
          <b style={{ fontSize: '1.15em', fontWeight: 650, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>{v}</b>
        </span>
      ))}
    </div>
  );
}

/** Rule line in the segment builder: a connector word then a row of pills. */
function Rule({ word, children }: { word: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45em', padding: '0.55em 0' }}>
      <span
        style={{
          flex: 'none',
          width: '3em',
          padding: '0.25em 0',
          borderRadius: '0.5em',
          textAlign: 'center',
          fontSize: '0.8em',
          fontWeight: 700,
          letterSpacing: '0.06em',
          color: 'var(--fv-muted)',
          background: 'rgba(15,23,42,0.05)',
        }}
      >
        {word}
      </span>
      {children}
    </div>
  );
}

/** White select-like pill. */
function Pick({ children, on }: { children: ReactNode; on?: boolean }) {
  return (
    <span
      style={{
        padding: '0.4em 0.75em',
        borderRadius: '0.65em',
        fontSize: '0.95em',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        background: '#fff',
        boxShadow: on
          ? '0 0 0 1.5px var(--t-500), 0 0 0 0.35em color-mix(in srgb, var(--t-500) 14%, transparent)'
          : '0 0 0 1px rgba(15,23,42,0.12) inset',
      }}
    >
      {children}
    </span>
  );
}

/* ── Hero (wide stage in a 16:9 frame, 64em x 36em) ────────────────────── */

/** Customers and contacts: consent, live score, orders, spend. */
function Hero({ label }: SceneProps) {
  const row = (name: string, phone: string, tone: Tone, n: number, tier: string, tierTone: Tone, orders: string, spent: string, active?: boolean) => (
    <Row
      lead={<Avatar name={name} tone={tone} />}
      title={name}
      sub={phone}
      active={active}
      right={
        <>
          <Chip tone="emerald" dot>Opt-in</Chip>
          <ScorePill n={n} tier={tier} tone={tierTone} />
          <Chip tone="violet">{orders}</Chip>
          <span style={{ width: '5.2em', textAlign: 'right' }}>
            <Chip tone="emerald">{spent}</Chip>
          </span>
        </>
      }
    />
  );
  return (
    <Stage label={label} tone="violet" shape="wide">
      <Float x={4} y={7} w={64} delay={0}>
        <Panel title="Customers & contacts" icon={Users} tone="violet" right={<Chip tone="slate">Unlimited profiles</Chip>}>
          {row('Ananya Rao', '+91 98765 4xxxx', 'rose', 50, 'Warm', 'amber', '1x', '₹1,800')}
          {row('Kavita Reddy', '+91 98111 2xxxx', 'sky', 64, 'Warm', 'amber', '3x', '₹3,600')}
          {row('Arjun Kapoor', '+91 98555 6xxxx', 'amber', 85, 'Hot', 'violet', '3x', '₹6,300', true)}
          {row('Neha Gupta', '+91 98111 0xxxx', 'emerald', 92, 'Hot', 'violet', '2x', '₹7,200')}
        </Panel>
      </Float>
      <Float x={71} y={10} w={25} delay={2} rotate={2} drift z={3}>
        <Panel>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7em', marginBottom: '0.9em' }}>
            <Avatar name="Arjun Kapoor" tone="amber" />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.25 }}>
              <b style={{ fontSize: '1.15em', fontWeight: 650 }}>Arjun Kapoor</b>
              <small style={{ color: 'var(--fv-muted)' }}>Last order Sep 12</small>
            </span>
          </div>
          <Meter pct={85} tone="violet" label="Lead score" value="85 · Hot" />
          <Strip items={[['Orders', '3'], ['Spent', '₹6,300']]} />
        </Panel>
      </Float>
      <Float x={72} y={66} delay={4}>
        <Chip tone="violet" solid icon={Fingerprint}>1 profile, 2 numbers</Chip>
      </Float>
      <Float x={6} y={77} delay={5}>
        <Chip tone="emerald" icon={MessageCircle}>WhatsApp + Shopify</Chip>
      </Float>
      <Float x={28} y={77} delay={6}>
        <Chip tone="amber" icon={Target}>Scores from real signals</Chip>
      </Float>
    </Stage>
  );
}

/* ── Bento tiles (square, 36em x 36em) ─────────────────────────────────── */

/** Unified timeline: orders, chats and campaigns on one contact. */
function Timeline({ label }: SceneProps) {
  return (
    <Stage label={label} tone="sky">
      <Float x={6} y={5} w={88} delay={0}>
        <Panel>
          <Row lead={<Avatar name="Aarav Shah" tone="violet" />} title="Aarav Shah" sub="+91 93130 45439" right={<Chip tone="violet">100 VIP</Chip>} />
          <Strip items={[['Orders', '34'], ['Spent', '₹43,559'], ['Seen', '3d ago']]} />
        </Panel>
      </Float>
      <Float x={10} y={42} w={84} delay={2} z={3}>
        <Panel title="Timeline" icon={Activity} tone="sky" right={<Chip tone="sky">171 events</Chip>}>
          <Row lead={<IconTile icon={MessageCircle} tone="emerald" size="sm" />} title="WhatsApp chat" sub="Asked about sizes" right={<Chip tone="emerald">Chat</Chip>} />
          <Row lead={<IconTile icon={Package} tone="violet" size="sm" />} title="Order #1041 placed" sub="₹650 · Prepaid" right={<Chip tone="violet">Order</Chip>} active />
          <Row lead={<IconTile icon={Megaphone} tone="amber" size="sm" />} title="Campaign read" sub="Restock cart nudge" right={<Chip tone="amber">Campaign</Chip>} />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Segments built in-product, feeding campaigns and journeys. */
function Segments({ label }: SceneProps) {
  return (
    <Stage label={label} tone="indigo">
      <Float x={6} y={6} w={88} delay={0}>
        <Panel title="Segments" icon={Layers} tone="indigo" right={<Chip tone="indigo">13 saved</Chip>}>
          <Row title="Opted in, not ordered" sub="Prime for nurture" right={<><Chip tone="indigo">412</Chip><MoreHorizontal style={{ width: '1.3em', color: '#94a3b8' }} /></>} />
          <Row title="Prize winners" sub="Spin or mystery win" right={<><Chip tone="indigo">86</Chip><MoreHorizontal style={{ width: '1.3em', color: '#94a3b8' }} /></>} active />
          <Row title="High total spent" sub="₹5,000 and above" right={<><Chip tone="amber">143</Chip><MoreHorizontal style={{ width: '1.3em', color: '#94a3b8' }} /></>} />
          <Row title="No order in 90 days" sub="Win-back list" right={<><Chip tone="amber">238</Chip><MoreHorizontal style={{ width: '1.3em', color: '#94a3b8' }} /></>} />
        </Panel>
      </Float>
      <Float x={50} y={43} w={44} delay={3} rotate={2} drift z={3}>
        <Panel>
          <Row lead={<IconTile icon={Send} tone="violet" size="sm" />} title="Launch campaign" active />
          <Row lead={<IconTile icon={Workflow} tone="sky" size="sm" />} title="Use in journey" />
          <Row lead={<IconTile icon={RefreshCw} tone="slate" size="sm" />} title="Re-sync" />
        </Panel>
      </Float>
      <Float x={6} y={76} delay={5}>
        <Chip tone="indigo" icon={RefreshCw}>Live from Shopify</Chip>
      </Float>
      <Float x={6} y={85} delay={6}>
        <Chip tone="slate">No CSV export</Chip>
      </Float>
      <Cursor x={80} y={53} delay={7} />
    </Stage>
  );
}

/** Lead scoring: a waterfall of tiers, highest match wins. */
function LeadScoring({ label }: SceneProps) {
  return (
    <Stage label={label} tone="amber">
      <Float x={6} y={5} w={74} delay={0}>
        <Panel title="Waterfall tiers" icon={Target} tone="amber">
          <Row lead={<Tier n={100} tone="violet" />} title="VIP / Direct Buyer" sub="Placed 5+ orders" active />
          <Row lead={<Tier n={90} tone="indigo" />} title="Loyal Customer" sub="Placed 3+ orders" />
          <Row lead={<Tier n={70} tone="amber" />} title="Checkout intent" sub="Started checkout 2+ times" />
          <Row lead={<Tier n={50} tone="sky" />} title="Active Shopper" sub="Sent 10+ WhatsApp msgs" />
          <Row lead={<Tier n={10} tone="slate" />} title="Cold Lead" sub="No higher tier matched" />
        </Panel>
      </Float>
      <Float x={57} y={60} w={38} delay={3} rotate={3} drift z={3}>
        <Panel title="Rule" icon={ShoppingCart} tone="violet">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6em' }}>
            <Field label="Field" value="Total orders" />
            <Field label="Operator" value="At least 5" />
          </div>
        </Panel>
      </Float>
      <Float x={6} y={86} delay={5}>
        <Chip tone="amber" solid>Highest tier wins</Chip>
      </Float>
    </Stage>
  );
}

/* ── Showcases (wide, 64em x 40em) ─────────────────────────────────────── */

/** Unified identity: two numbers and three emails, one master profile. */
function Identity({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet" shape="wide" grid>
      <Wires
        shape="wide"
        tone="violet"
        paths={[
          'M 27 7.5 C 33 7.5, 32 23, 38 23',
          'M 27 18.4 C 33 18.4, 32 24.5, 38 24.5',
          'M 27 29.4 C 33 29.4, 32 26, 38 26',
          'M 27 40.3 C 33 40.3, 32 27.5, 38 27.5',
        ]}
      />
      <Float x={3} y={7} w={24} delay={1}>
        <Node icon={MessageCircle} tone="emerald" title="WhatsApp chat" sub="+91 94846 1xxxx" />
      </Float>
      <Float x={3} y={24.5} w={24} delay={2}>
        <Node icon={MessageCircle} tone="emerald" title="Second number" sub="+91 94846 2xxxx" />
      </Float>
      <Float x={3} y={42} w={24} delay={3}>
        <Node icon={ShoppingCart} tone="amber" title="Shopify checkout" sub="priya@example.com" />
      </Float>
      <Float x={3} y={59.5} w={24} delay={4}>
        <Node icon={Mail} tone="sky" title="Email signup" sub="work email" />
      </Float>
      <Float x={38} y={8} w={35} delay={0} z={3}>
        <Panel>
          <Row lead={<Avatar name="Priya Sharma" tone="rose" />} title="Priya Sharma" sub="1 master profile" right={<Chip tone="amber">Score 80</Chip>} />
          <div style={{ height: 1, background: 'var(--fv-line)', margin: '0.4em 0' }} />
          <Row lead={<IconTile icon={MessageCircle} tone="emerald" size="sm" />} title="+91 94846 1xxxx" sub="3 orders" right={<Chip tone="emerald">Primary</Chip>} />
          <Row lead={<IconTile icon={MessageCircle} tone="emerald" size="sm" />} title="+91 94846 2xxxx" sub="2 orders" right={<Chip tone="slate">Secondary</Chip>} />
          <Row lead={<IconTile icon={Mail} tone="sky" size="sm" />} title="priya@example.com" sub="Checkout email" />
          <Row lead={<IconTile icon={Mail} tone="sky" size="sm" />} title="priya.w@example.com" sub="Work email" />
        </Panel>
      </Float>
      <Float x={44} y={73} delay={5} z={4}>
        <Chip tone="violet" solid icon={Fingerprint}>5 touchpoints stitched</Chip>
      </Float>
      <Float x={76} y={20} w={21} delay={6} drift>
        <Bubble from="user" time="9:32">Has order #2847 shipped yet?</Bubble>
      </Float>
      <Float x={77} y={46} delay={7}>
        <Chip tone="emerald" icon={MessageCircle}>Same thread</Chip>
      </Float>
    </Stage>
  );
}

/** Customer 360: orders, threads and campaign history on one record. */
function Customer360({ label }: SceneProps) {
  return (
    <Stage label={label} tone="emerald" shape="wide">
      <Float x={3} y={12} w={28} delay={0} rotate={-2}>
        <Panel title="Contacts" icon={Users} tone="slate">
          <Row lead={<Avatar name="Aarav Shah" tone="violet" />} title="Aarav Shah" sub="Score 100" active />
          <Row lead={<Avatar name="Kajal Iyer" tone="rose" />} title="Kajal Iyer" sub="Score 10" />
          <Row lead={<Avatar name="Rohan Desai" tone="sky" />} title="Rohan Desai" sub="Score 80" />
        </Panel>
      </Float>
      <Float x={4} y={66} delay={5}>
        <Chip tone="emerald" icon={Users}>One record, every team</Chip>
      </Float>
      <Float x={36} y={80} delay={6}>
        <Chip tone="emerald" icon={MessageCircle}>WhatsApp threads</Chip>
      </Float>
      <Float x={57} y={80} delay={7}>
        <Chip tone="amber" icon={Megaphone}>Campaign history</Chip>
      </Float>
      <Float x={30} y={5} w={66} delay={2} z={3}>
        <Panel>
          <Row lead={<Avatar name="Aarav Shah" tone="violet" />} title="Aarav Shah" sub="+91 93130 45439 · Opt-in" right={<Chip tone="violet">100 VIP</Chip>} />
          <Strip items={[['Orders', '34'], ['Spent', '₹43,559'], ['Last order', 'Sep 13'], ['Cart', '₹780']]} />
          <div style={{ display: 'flex', gap: '0.4em', margin: '0.6em 0 0.4em' }}>
            <Chip tone="slate" icon={Activity}>Activity 171</Chip>
            <Chip tone="slate" icon={Workflow}>Journeys 9</Chip>
            <Chip tone="slate" icon={Megaphone}>Campaigns 9</Chip>
            <Chip tone="emerald" solid icon={Package}>Orders 34</Chip>
          </div>
          <Row lead={<IconTile icon={Package} tone="emerald" size="sm" />} title="#1041" sub="Paid · Sep 13" right={<><Chip tone="amber">Unfulfilled</Chip><b>₹650</b></>} />
          <Row lead={<IconTile icon={Package} tone="rose" size="sm" />} title="#1034" sub="COD · Sep 9" right={<><Chip tone="rose">Voided</Chip><b>₹780</b></>} />
          <Row lead={<IconTile icon={Package} tone="amber" size="sm" />} title="#1031" sub="COD · Aug 31" right={<><Chip tone="amber">Payment pending</Chip><b>₹1,527</b></>} />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Segment builder: rules over Shopify, WhatsApp and opt-in data. */
function SegmentBuilder({ label }: SceneProps) {
  return (
    <Stage label={label} tone="rose" shape="wide">
      <Wires shape="wide" tone="rose" paths={['M 31 34.5 C 31 39, 41.5 37, 41.5 41.3', 'M 79.5 28.6 C 79.5 36, 74 35, 74 41.3']} />
      <Float x={4} y={7} w={54} delay={0} z={3}>
        <Panel title="Segment builder" icon={Layers} tone="rose" right={<><Chip tone="rose" solid>Criteria</Chip><Chip tone="slate">Members</Chip></>}>
          <Field label="Segment name" value="Repeat buyers, high AOV" />
          <div style={{ marginTop: '0.6em' }} data-tone="rose">
            <Rule word="IF">
              <Pick>Number of orders</Pick>
              <Pick on>At least</Pick>
              <Pick>3</Pick>
            </Rule>
            <Rule word="AND">
              <Pick>Avg order value</Pick>
              <Pick>At least</Pick>
              <Pick>₹1,000</Pick>
            </Rule>
            <Rule word="AND">
              <Pick>WhatsApp consent</Pick>
              <Pick>is</Pick>
              <Pick>Opted in</Pick>
            </Rule>
          </div>
        </Panel>
      </Float>
      <Float x={63} y={12} w={33} delay={2} rotate={2}>
        <Panel title="Members" icon={Users} tone="violet" right={<Chip tone="violet">214</Chip>}>
          <Row lead={<Avatar name="Meera Iyer" tone="rose" />} title="Meera Iyer" sub="5 orders · ₹1,840 AOV" />
          <Row lead={<Avatar name="Kabir Singh" tone="sky" />} title="Kabir Singh" sub="3 orders · ₹1,320 AOV" />
        </Panel>
      </Float>
      <Float x={30} y={66} w={23} delay={4}>
        <Node icon={Send} tone="violet" title="Campaign" sub="Restock alert" />
      </Float>
      <Float x={62} y={66} w={24} delay={5}>
        <Node icon={Workflow} tone="sky" title="Journey" sub="VIP early access" />
      </Float>
      <Float x={4} y={86} delay={6}>
        <Chip tone="rose">No separate CDP</Chip>
      </Float>
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
