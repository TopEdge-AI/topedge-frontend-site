/**
 * Campaigns scenes: segment, lock an approved template, read net ₹ after Meta fees.
 * Keys are the image paths in productPages.ts.
 */
import type { ReactNode } from 'react';
import {
  Activity,
  BadgeCheck,
  BarChart3,
  Check,
  FileCheck2,
  Filter,
  IndianRupee,
  Lock,
  Megaphone,
  Package,
  Radar,
  Send,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  Upload,
  Users,
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
  Meter,
  Panel,
  Phone,
  Row,
  Spark,
  Stage,
  Stat,
  Thumb,
  Wires,
  type SceneMap,
  type SceneProps,
  type Tone,
} from '../kit';

/* ── Local helpers ─────────────────────────────────────────────────────── */

/** Checkbox used as a row lead. */
function Tick({ on, tone = 'violet' }: { on?: boolean; tone?: Tone }) {
  return (
    <span
      data-tone={tone}
      style={{
        flex: 'none',
        display: 'grid',
        placeItems: 'center',
        width: '1.45em',
        height: '1.45em',
        borderRadius: '0.4em',
        color: '#fff',
        background: on ? 'linear-gradient(160deg, var(--t-400), var(--t-600))' : '#fff',
        boxShadow: on ? '0 0.3em 0.6em -0.2em var(--t-600)' : '0 0 0 1.5px rgba(15,23,42,0.18) inset',
      }}
    >
      {on ? <Check strokeWidth={3.2} style={{ width: '0.95em', height: '0.95em' }} /> : null}
    </span>
  );
}

/** Lead score tier badge. */
function Score({ n, tone }: { n: number; tone: Tone }) {
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

/** Key / value line. */
function KV({ k, v, strong }: { k: string; v: ReactNode; strong?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.45em 0.15em',
        borderTop: strong ? '1px solid var(--fv-line)' : undefined,
        marginTop: strong ? '0.3em' : undefined,
        paddingTop: strong ? '0.7em' : undefined,
      }}
    >
      <small style={{ fontSize: strong ? '1.05em' : '0.98em', color: strong ? 'var(--fv-ink)' : 'var(--fv-muted)', fontWeight: strong ? 600 : 400 }}>{k}</small>
      <b style={{ fontWeight: 600, fontSize: strong ? '1.3em' : '1em', letterSpacing: '-0.02em' }}>{v}</b>
    </div>
  );
}

/** Small row of stats laid out evenly. */
function StatRow({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: '1fr',
        gap: '0.8em',
        padding: '0.8em 0.9em',
        marginBottom: '0.6em',
        borderRadius: '0.9em',
        background: 'rgba(15,23,42,0.025)',
        boxShadow: '0 0 0 1px var(--fv-line) inset',
        fontSize: '0.82em',
      }}
    >
      {children}
    </div>
  );
}

/* ── Hero (wide stage in a 16:9 frame, 64em x 36em) ────────────────────── */

/** Campaign list with revenue, and the WhatsApp message it sent. */
function Hero({ label }: SceneProps) {
  return (
    <Stage label={label} tone="rose" shape="wide">
      <Float x={4} y={8} w={60} delay={0}>
        <Panel title="Campaigns" icon={Megaphone} tone="rose" right={<Btn tone="rose" primary icon={Zap}>Create campaign</Btn>}>
          <StatRow>
            <Stat label="Messages sent" value="4,280" />
            <Stat label="Read rate" value="67%" />
            <Stat label="Attributed revenue" value="₹1,86,400" />
          </StatRow>
          <Row lead={<IconTile icon={Sparkles} tone="violet" size="sm" />} title="Weekend flash sale" sub="Completed · 5 days ago" right={<Chip tone="emerald">₹1,18,000</Chip>} />
          <Row lead={<IconTile icon={ShoppingCart} tone="amber" size="sm" />} title="Restock cart nudge" sub="Completed · 2 days ago" right={<Chip tone="emerald">₹68,400</Chip>} active />
          <Row lead={<IconTile icon={Send} tone="sky" size="sm" />} title="Night cream launch" sub="Sending now" right={<Chip tone="sky" dot>Live</Chip>} />
        </Panel>
      </Float>
      <Float x={68} y={6} w={27} delay={2} rotate={2} drift z={3}>
        <Phone name="Your store">
          <Bubble from="biz" time="9:41" read media={<Thumb tone="rose" icon={Sparkles} h={6.5} />} buttons={['Shop the drop']}>
            New collection is live. Limited stock, shop before it goes.
          </Bubble>
        </Phone>
      </Float>
      <Float x={6} y={82} delay={4}>
        <Chip tone="emerald" icon={ShieldCheck}>Approved templates only</Chip>
      </Float>
      <Float x={32} y={82} delay={5}>
        <Chip tone="amber" icon={Filter}>Frequency capped</Chip>
      </Float>
      <Float x={68} y={84} delay={6}>
        <Chip tone="rose" solid icon={IndianRupee}>Net of Meta fees</Chip>
      </Float>
    </Stage>
  );
}

/* ── Bento tiles (square, 36em x 36em) ─────────────────────────────────── */

/** Behavior segments from Shopify purchase history and on-site intent. */
function Segments({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet">
      <Float x={7} y={6} w={86} delay={0}>
        <Panel title="Who receives it" icon={Users} tone="violet" right={<Chip tone="slate">Segment</Chip>}>
          <Row lead={<Tick on />} title="Abandoned cart" sub="Open cart, not recovered" right={<Chip tone="violet">67</Chip>} active />
          <Row lead={<Tick on />} title="Ordered in last 90 days" sub="Recent buyers" right={<Chip tone="violet">289</Chip>} />
          <Row lead={<Tick />} title="Exactly 1 order" sub="One-time buyers" right={<Chip tone="slate">198</Chip>} />
          <Row lead={<Tick />} title="Haven't purchased" sub="Never ordered" right={<Chip tone="slate">836</Chip>} />
        </Panel>
      </Float>
      <Float x={5} y={73} delay={3}>
        <Chip tone="violet" icon={Package}>Purchase history</Chip>
      </Float>
      <Float x={5} y={82} delay={4}>
        <Chip tone="sky" icon={Radar}>On-site intent</Chip>
      </Float>
      <Float x={42} y={71} w={52} delay={5} rotate={2} drift z={3}>
        <Panel>
          <Row lead={<IconTile icon={Users} tone="emerald" />} title="356 contacts" sub="2 segments" right={<Chip tone="emerald" dot>Ready</Chip>} />
        </Panel>
      </Float>
      <Cursor x={14} y={30} delay={6} />
    </Stage>
  );
}

/** Lead scoring: send to the score stages that earned it. */
function LeadScoring({ label }: SceneProps) {
  return (
    <Stage label={label} tone="amber">
      <Float x={7} y={6} w={86} delay={0}>
        <Panel title="Score stages" icon={Target} tone="amber" right={<Chip tone="amber">3 of 3</Chip>}>
          <Row lead={<Score n={100} tone="violet" />} title="VIP / Direct Buyer" sub="Placed 5+ orders" right={<Tick on tone="amber" />} active />
          <Row lead={<Score n={90} tone="indigo" />} title="Loyal Customer" sub="Placed 3+ orders" right={<Tick on tone="amber" />} />
          <Row lead={<Score n={80} tone="emerald" />} title="Repeat Buyer" sub="At least 1 order" right={<Tick on tone="amber" />} />
          <Row lead={<Score n={50} tone="sky" />} title="Active Shopper" sub="10+ WhatsApp messages" right={<Tick />} />
        </Panel>
      </Float>
      <Float x={5} y={74} delay={3}>
        <Chip tone="amber" icon={ShoppingCart}>Cart + purchase</Chip>
      </Float>
      <Float x={5} y={83} delay={4}>
        <Chip tone="slate" icon={Activity}>Browse signals</Chip>
      </Float>
      <Float x={42} y={72} w={52} delay={5} rotate={-2} drift z={3}>
        <Panel>
          <Row lead={<IconTile icon={Send} tone="violet" />} title="142 contacts" sub="From 3 stages" right={<Chip tone="emerald" dot>Ready</Chip>} />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Net-of-Meta reporting: revenue minus the messaging bill. */
function NetReport({ label }: SceneProps) {
  return (
    <Stage label={label} tone="emerald">
      <Float x={6} y={6} w={56} delay={0}>
        <Panel title="Performance" icon={BarChart3} tone="emerald">
          <KV k="Delivered" v="1,218" />
          <KV k="Read" v="73.2%" />
          <KV k="Revenue" v={<Chip tone="emerald">₹68,400</Chip>} />
          <KV k="Meta bill" v={<Chip tone="slate">−₹1,070</Chip>} />
        </Panel>
      </Float>
      <Float x={58} y={14} w={37} delay={2} rotate={3} drift z={3}>
        <Panel>
          <Stat label="Net revenue" value="₹67,330" delta="After Meta fees" tone="emerald" />
        </Panel>
      </Float>
      <Float x={63} y={45} delay={3}>
        <Chip tone="slate">₹0.8631 per message</Chip>
      </Float>
      <Float x={10} y={56} w={84} delay={4}>
        <Panel title="Attributed orders" icon={IndianRupee} tone="emerald" right={<Chip tone="slate">14-day window</Chip>}>
          <Row lead={<IconTile icon={Package} tone="emerald" size="sm" />} title="#1088" sub="19 Sep, 12:18 pm" right={<Chip tone="emerald">₹2,499</Chip>} />
          <Row lead={<IconTile icon={Package} tone="emerald" size="sm" />} title="#1087" sub="19 Sep, 12:24 pm" right={<Chip tone="emerald">₹1,899</Chip>} />
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Showcases (wide, 64em x 40em) ─────────────────────────────────────── */

/** Audience builder: source picker plus the contacts who earned a send. */
function AudienceBuilder({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet" shape="wide">
      <Float x={4} y={9} w={30} delay={0} rotate={-1.5}>
        <Panel title="Audience source" icon={Filter} tone="violet">
          <Row lead={<IconTile icon={Users} tone="slate" size="sm" />} title="Segment" sub="Behavior cohorts" />
          <Row lead={<IconTile icon={Check} tone="slate" size="sm" />} title="Opt-in" sub="Consented list" />
          <Row lead={<IconTile icon={Target} tone="amber" size="sm" />} title="Score stage" sub="Lead score tiers" right={<Chip tone="violet" icon={Check}>On</Chip>} active />
          <Row lead={<IconTile icon={Upload} tone="slate" size="sm" />} title="CSV upload" sub="Your own list" />
        </Panel>
      </Float>
      <Float x={37} y={7} w={59} delay={2} z={3}>
        <Panel title="Contacts" icon={Users} tone="indigo" right={<Chip tone="violet">18 selected</Chip>}>
          <Row lead={<><Tick on /><Avatar name="Rahul Mehta" tone="sky" /></>} title="Rahul Mehta" sub="+91 98111 22233" right={<><Chip tone="violet">Score 100</Chip><Chip tone="emerald" dot>Opt-in</Chip></>} />
          <Row lead={<><Tick on /><Avatar name="Neha Gupta" tone="rose" /></>} title="Neha Gupta" sub="+91 99001 12233" right={<><Chip tone="indigo">Score 90</Chip><Chip tone="emerald" dot>Opt-in</Chip></>} active />
          <Row lead={<><Tick on /><Avatar name="Arjun Kapoor" tone="amber" /></>} title="Arjun Kapoor" sub="+91 99556 67788" right={<><Chip tone="emerald">Score 80</Chip><Chip tone="emerald" dot>Opt-in</Chip></>} />
          <Row lead={<><Tick /><Avatar name="Harsh Vardhan" tone="slate" /></>} title="Harsh Vardhan" sub="+91 98012 34567" right={<><Chip tone="slate">Score 10</Chip><Chip tone="rose">Opt-out</Chip></>} />
        </Panel>
      </Float>
      <Float x={5} y={76} delay={4}>
        <Chip tone="sky" icon={Radar}>Pixel cohorts</Chip>
      </Float>
      <Float x={20} y={84} delay={5}>
        <Chip tone="violet" icon={Users}>CRM segments</Chip>
      </Float>
      <Float x={40} y={79} delay={6}>
        <Chip tone="violet" solid icon={Target}>Only people who earned a send</Chip>
      </Float>
      <Cursor x={41} y={42} delay={7} />
    </Stage>
  );
}

/** Template lock: only APPROVED templates can go out. */
function TemplateLock({ label }: SceneProps) {
  return (
    <Stage label={label} tone="emerald" shape="wide">
      <Float x={4} y={8} w={56} delay={0}>
        <Panel title="WhatsApp template" icon={FileCheck2} tone="emerald" right={<Chip tone="slate">3 ready</Chip>}>
          <Row lead={<IconTile icon={Check} tone="emerald" size="sm" />} title="cod_prepaid" sub="Utility · en" right={<Chip tone="emerald" dot>Approved</Chip>} active />
          <Row lead={<IconTile icon={Check} tone="emerald" size="sm" />} title="restock_alert" sub="Marketing · en" right={<Chip tone="emerald" dot>Approved</Chip>} />
          <Row lead={<IconTile icon={Lock} tone="amber" size="sm" />} title="festive_sale_v2" sub="Marketing · en" right={<Chip tone="amber" dot>In review</Chip>} />
          <Row lead={<IconTile icon={Lock} tone="rose" size="sm" />} title="draft_offer" sub="Not submitted" right={<Chip tone="rose" dot>Blocked</Chip>} />
        </Panel>
      </Float>
      <Float x={8} y={74} w={44} delay={4} rotate={-1.5} drift>
        <Panel>
          <Row lead={<IconTile icon={ShieldCheck} tone="emerald" />} title="Quality rating safe" sub="Drafts never blast" right={<Chip tone="emerald" icon={Lock}>Locked</Chip>} />
        </Panel>
      </Float>
      <Float x={65} y={7} w={29} delay={2} rotate={2} z={3}>
        <Phone name="Your store">
          <Bubble from="biz" time="12:37" read buttons={['Pay now']}>
            Thanks for your order! Pay online now and get an instant discount.
          </Bubble>
          <Bubble from="user">Paid, thanks!</Bubble>
        </Phone>
      </Float>
      <Float x={67} y={76} delay={5} z={4}>
        <Chip tone="emerald" solid icon={BadgeCheck}>Approved by Meta</Chip>
      </Float>
    </Stage>
  );
}

/** Performance card: attributed orders and cost after Meta fees. */
function Performance({ label }: SceneProps) {
  return (
    <Stage label={label} tone="sky" shape="wide">
      <Float x={4} y={7} w={61} delay={0}>
        <Panel title="Restock cart nudge" icon={Send} tone="sky" right={<Chip tone="emerald" dot>Completed</Chip>}>
          <StatRow>
            <Stat label="Sent" value="1,240" />
            <Stat label="Delivered" value="1,218" />
            <Stat label="Read" value="73.2%" />
            <Stat label="Reply" value="25.6%" />
          </StatRow>
          <Meter pct={98} tone="sky" label="1,240 of 1,262 sent" value="22 failed" />
        </Panel>
      </Float>
      <Float x={4} y={50} w={61} delay={2}>
        <Panel title="Recipients" icon={Users} tone="indigo">
          <Row lead={<Avatar name="Ananya Rao" tone="rose" />} title="Ananya Rao" sub="Replied · 18 Sep" right={<Chip tone="emerald">₹2,499</Chip>} />
          <Row lead={<Avatar name="Rahul Mehta" tone="sky" />} title="Rahul Mehta" sub="Read · 18 Sep" right={<Chip tone="emerald">₹1,899</Chip>} />
        </Panel>
      </Float>
      <Float x={69} y={9} w={27} delay={3} rotate={2} drift z={3}>
        <Panel title="Net of Meta" icon={IndianRupee} tone="emerald">
          <KV k="Revenue" v="₹68,400" />
          <KV k="Meta bill" v="−₹1,070" />
          <KV k="Net" v="₹67,330" strong />
          <div style={{ marginTop: '0.6em' }}>
            <Spark points={[12, 20, 18, 34, 42, 40, 58, 66, 74, 88]} tone="emerald" height={4.5} />
          </div>
        </Panel>
      </Float>
      <Float x={71} y={73} delay={5}>
        <Chip tone="sky" icon={Package}>Attributed Shopify orders</Chip>
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
