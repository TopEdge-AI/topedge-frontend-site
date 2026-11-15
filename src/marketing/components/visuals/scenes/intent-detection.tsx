/**
 * Intent detection scenes: phrases, confidence and routing before any AI spend.
 * Keys are the image paths in productPages.ts (the hero is a video, so it has
 * no scene here).
 */
import type { CSSProperties, ReactNode } from 'react';
import {
  AlertTriangle,
  Banknote,
  Bell,
  Brain,
  CheckCircle2,
  FlaskConical,
  Headphones,
  Languages,
  MessageCircle,
  Play,
  Plus,
  Radar,
  Tag,
  Truck,
  Undo2,
  UserCheck,
  Zap,
} from 'lucide-react';
import {
  Btn,
  Bubble,
  Chip,
  Cursor,
  Donut,
  Field,
  Float,
  IconTile,
  Node,
  Panel,
  Phone,
  Row,
  Stage,
  Stat,
  Toggle,
  Wires,
  type SceneMap,
  type SceneProps,
} from '../kit';

/* ── Local bits ────────────────────────────────────────────────────────── */

const muted = '#5a6474';

/** Training phrase pill. */
function Phrase({ children, hi }: { children: ReactNode; hi?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.4em 0.75em',
        borderRadius: '0.7em',
        fontSize: '0.98em',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        background: hi ? '#e0f2fe' : '#fff',
        color: hi ? '#0369a1' : '#0c1222',
        boxShadow: hi ? '0 0 0 1px rgba(14,165,233,0.35) inset' : '0 0 0 1px rgba(15,23,42,0.1) inset',
      }}
    >
      {children}
    </span>
  );
}

const wrap: CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '0.45em' };

/** Numbered pipeline step badge. */
function Num({ n }: { n: number }) {
  return (
    <span
      style={{
        flex: 'none',
        display: 'inline-grid',
        placeItems: 'center',
        width: '1.7em',
        height: '1.7em',
        borderRadius: '50%',
        fontSize: '0.85em',
        fontWeight: 700,
        color: '#fff',
        background: 'linear-gradient(160deg, #38bdf8, #0369a1)',
      }}
    >
      {n}
    </span>
  );
}

/* ── Bento tiles (square, 36em x 36em) ─────────────────────────────────── */

/** Real phrases per intent, Hinglish welcome; inactive intents never match. */
function Phrases({ label }: SceneProps) {
  return (
    <Stage label={label} tone="sky">
      <Float x={14} y={5} w={78} delay={0} rotate={-2}>
        <Panel title="Festive offers" icon={Tag} tone="slate" right={<><Chip tone="slate">Inactive</Chip><Toggle on={false} /></>} />
      </Float>
      <Float x={5} y={22} w={90} delay={2} z={3}>
        <Panel title="Shipping status" icon={Truck} tone="sky" right={<><Chip tone="emerald" dot>Active</Chip><Toggle tone="sky" /></>}>
          <div style={wrap}>
            <Phrase>where is my order</Phrase>
            <Phrase hi>order kab aayega</Phrase>
            <Phrase>parcel kidhar hai</Phrase>
            <Phrase hi>tracking link bhejo</Phrase>
            <Phrase>delivery kab hogi</Phrase>
            <Phrase>still not received</Phrase>
          </div>
          <div style={{ marginTop: '0.8em' }}>
            <Field label="Add a phrase" value="abhi tak nahi aaya" />
          </div>
          <div style={{ marginTop: '0.6em' }}>
            <Row lead={<IconTile icon={Play} tone="emerald" size="sm" />} title="Then start flow" sub="Order status" right={<Chip tone="sky">Action</Chip>} />
          </div>
        </Panel>
      </Float>
      <Float x={8} y={86} delay={5}>
        <Chip tone="sky" solid icon={Languages}>Hinglish welcome</Chip>
      </Float>
      <Float x={54} y={86} delay={6}>
        <Chip tone="slate" icon={Plus}>6 phrases</Chip>
      </Float>
    </Stage>
  );
}

/** Phrase match routes to a flow, the model is never called. */
function RouteNoAi({ label }: SceneProps) {
  return (
    <Stage label={label} tone="sky" grid>
      <Wires tone="sky" paths={['M 50 35 C 50 47, 26 45, 26 57', 'M 50 35 C 50 47, 74 45, 74 57']} />
      <Float x={30} y={5} w={64} delay={0}>
        <Bubble from="user" time="2:14 pm">Where is my order?</Bubble>
      </Float>
      <Float x={17} y={23} w={66} delay={2} z={3}>
        <Node icon={Radar} tone="sky" title="Intent engine" sub="Shipping · 94% match" active />
      </Float>
      <Float x={4} y={56} w={44} delay={3} rotate={-2} drift>
        <Node icon={Play} tone="emerald" title="Start flow" sub="Order status" />
      </Float>
      <Float x={52} y={56} w={44} delay={4} rotate={2}>
        <Panel>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7em' }}>
            <IconTile icon={Brain} tone="slate" size="md" />
            <Stat label="AI tokens" value="₹0" />
          </div>
        </Panel>
      </Float>
      <Float x={18} y={84} delay={6}>
        <Chip tone="sky" solid icon={Zap}>Intent matched, AI skipped</Chip>
      </Float>
    </Stage>
  );
}

/** Test modal: matched intent, score, and the weak phrase to fix. */
function TestConfidence({ label }: SceneProps) {
  return (
    <Stage label={label} tone="indigo">
      <Float x={5} y={7} w={62} delay={0} z={3}>
        <Panel title="Test intent" icon={FlaskConical} tone="indigo">
          <Field label="Customer says" value="Speak to a human" />
        </Panel>
      </Float>
      <Float x={70} y={6} delay={2} rotate={3} drift>
        <Panel>
          <Donut pct={96} tone="emerald" size={7.5}>96%</Donut>
        </Panel>
      </Float>
      <Float x={5} y={38} w={90} delay={3} z={4}>
        <Panel>
          <Row
            lead={<IconTile icon={Headphones} tone="violet" />}
            title="Asking for assistance"
            sub="Tag chat · Notify team"
            right={<Chip tone="emerald" icon={CheckCircle2}>Matched</Chip>}
            active
          />
          <Row
            lead={<IconTile icon={AlertTriangle} tone="amber" />}
            title="“want to return”"
            sub="Low confidence · add phrases"
            right={<Chip tone="amber">Weak</Chip>}
          />
          <Row
            lead={<IconTile icon={Truck} tone="sky" />}
            title="“parcel kidhar hai”"
            sub="Shipping status"
            right={<Chip tone="emerald">94%</Chip>}
          />
        </Panel>
      </Float>
      <Float x={11} y={87} delay={6}>
        <Chip tone="indigo" solid icon={FlaskConical}>Fix weak phrases before live</Chip>
      </Float>
    </Stage>
  );
}

/* ── Showcases (wide, 64em x 40em) ─────────────────────────────────────── */

/** Intent list: phrases, action and the Active toggle. */
function IntentList({ label }: SceneProps) {
  return (
    <Stage label={label} tone="sky" shape="wide">
      <Float x={4} y={10} w={64} delay={0} z={3}>
        <Panel title="Intent detect" icon={Radar} tone="sky" right={<Btn primary tone="sky" icon={Plus}>New intent</Btn>}>
          <Row lead={<IconTile icon={Truck} tone="sky" />} title="Shipping status" sub="8 phrases · Start flow" right={<><Chip tone="emerald" dot>Active</Chip><Toggle tone="sky" /></>} active />
          <Row lead={<IconTile icon={Undo2} tone="violet" />} title="Returns" sub="6 phrases · Send reply" right={<><Chip tone="emerald" dot>Active</Chip><Toggle tone="sky" /></>} />
          <Row lead={<IconTile icon={Banknote} tone="amber" />} title="COD confirm" sub="5 phrases · Start flow" right={<><Chip tone="emerald" dot>Active</Chip><Toggle tone="sky" /></>} />
          <Row lead={<IconTile icon={Headphones} tone="rose" />} title="Talk to human" sub="9 phrases · Assign agent" right={<><Chip tone="emerald" dot>Active</Chip><Toggle tone="sky" /></>} />
          <Row lead={<IconTile icon={Tag} tone="slate" />} title="Festive offers" sub="4 phrases · Send reply" right={<><Chip tone="slate">Inactive</Chip><Toggle on={false} /></>} />
        </Panel>
      </Float>
      <Float x={72} y={14} w={24} delay={2}>
        <Panel>
          <Stat label="Active intents" value="4" delta="Live on WhatsApp" tone="sky" />
        </Panel>
      </Float>
      <Float x={72} y={50} w={24} delay={3} rotate={2} drift>
        <Panel>
          <Stat label="Training phrases" value="28" delta="Hinglish included" tone="violet" />
        </Panel>
      </Float>
      <Float x={6} y={86} delay={5}>
        <Chip tone="slate" icon={Tag}>Inactive intents never match</Chip>
      </Float>
    </Stage>
  );
}

/** Editor: phrases on the left, the action pipeline on the right. */
function Editor({ label }: SceneProps) {
  return (
    <Stage label={label} tone="indigo" shape="wide" grid>
      <Wires shape="wide" tone="indigo" paths={['M 50 15 C 53 15, 51 11, 55 11']} />
      <Float x={4} y={9} w={46} delay={0} z={3}>
        <Panel title="Edit intent" icon={MessageCircle} tone="indigo" right={<><Chip tone="emerald" dot>Active</Chip><Toggle tone="indigo" /></>}>
          <Field label="Intent name" value="Talk to human" />
          <small style={{ display: 'block', margin: '0.9em 0 0.5em', fontSize: '0.9em', fontWeight: 500, color: muted }}>
            Training phrases
          </small>
          <div style={wrap}>
            <Phrase>speak to a human</Phrase>
            <Phrase hi>agent se baat karao</Phrase>
            <Phrase>real person please</Phrase>
            <Phrase>call me back</Phrase>
            <Phrase hi>insaan chahiye</Phrase>
          </div>
          <small style={{ display: 'block', margin: '0.9em 0 0.5em', fontSize: '0.9em', fontWeight: 500, color: '#be123c' }}>
            Not this intent
          </small>
          <div style={wrap}>
            <Phrase>your agent helped me</Phrase>
            <Phrase>thanks for the support</Phrase>
          </div>
        </Panel>
      </Float>
      <Float x={55} y={9} w={41} delay={2} z={3}>
        <Panel title="Actions" icon={Zap} tone="sky" right={<Chip tone="slate">In order</Chip>}>
          <Row lead={<Num n={1} />} title="Tag chat" sub="requested-support" right={<IconTile icon={Tag} tone="violet" size="sm" />} />
          <Row lead={<Num n={2} />} title="Send reply" sub="Connecting you to our team" right={<IconTile icon={MessageCircle} tone="emerald" size="sm" />} />
          <Row lead={<Num n={3} />} title="Assign agent" sub="Support team" right={<IconTile icon={UserCheck} tone="sky" size="sm" />} active />
          <Row lead={<Num n={4} />} title="Notify team" sub="Support required" right={<IconTile icon={Bell} tone="amber" size="sm" />} />
        </Panel>
      </Float>
      <Float x={58} y={80} delay={5} drift>
        <Chip tone="indigo" solid icon={Play}>Reply, flow, assign or escalate</Chip>
      </Float>
      <Cursor x={84} y={47} delay={7} />
    </Stage>
  );
}

/** Live routing: inbound chat, intent match, flow starts, before any AI. */
function LiveRouting({ label }: SceneProps) {
  return (
    <Stage label={label} tone="sky" shape="wide">
      <Wires shape="wide" tone="sky" paths={['M 38 14 C 42 14, 41 9.4, 45 9.4']} />
      <Float x={5} y={7} w={33} delay={0} z={3}>
        <Phone name="Your store">
          <Bubble from="user" time="2:14 pm">Order kab aayega?</Bubble>
          <Bubble from="biz" time="2:15 pm" read buttons={['Track order']}>Order #1042 ships tomorrow.</Bubble>
        </Phone>
      </Float>
      <Float x={7} y={70} delay={5}>
        <Chip tone="sky" solid icon={Zap}>Matched before any AI</Chip>
      </Float>
      <Float x={45} y={9} w={51} delay={2} z={3}>
        <Panel title="Live routing" icon={Radar} tone="sky" right={<Chip tone="emerald" dot>Live</Chip>}>
          <Row lead={<IconTile icon={MessageCircle} tone="emerald" size="sm" />} title="Inbound WhatsApp" sub="2:14 pm" right={<Chip tone="emerald" icon={CheckCircle2}>Done</Chip>} />
          <Row lead={<IconTile icon={Radar} tone="sky" size="sm" />} title="Intent: Shipping" sub="96% confidence" right={<Chip tone="sky">Before AI</Chip>} active />
          <Row lead={<IconTile icon={Play} tone="violet" size="sm" />} title="Start flow" sub="Order status" right={<Chip tone="sky">Before AI</Chip>} />
          <Row lead={<IconTile icon={Brain} tone="slate" size="sm" />} title="AI Brain" sub="Not needed" right={<Chip tone="slate">Skipped</Chip>} />
        </Panel>
      </Float>
      <Float x={50} y={77} w={42} delay={4} drift>
        <Node icon={Headphones} tone="rose" title="Live Chat takeover wins" sub="Pauses AI on that chat" />
      </Float>
    </Stage>
  );
}

const scenes: SceneMap = {
  '/intent-sub-feature/23.webp': Phrases,
  '/intent-sub-feature/route-without-ai-spend.webp': RouteNoAi,
  '/intent-sub-feature/24.webp': TestConfidence,
  '/intent-sub-feature/34.webp': IntentList,
  '/intent-sub-feature/35.webp': Editor,
  '/intent-sub-feature/live-routing.webp': LiveRouting,
};

export default scenes;
