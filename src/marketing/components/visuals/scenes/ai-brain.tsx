/**
 * AI Brain scenes. v3 storytelling style, see flow-builder.tsx.
 *
 * Square tiles are plain white with one focal element. Wide panels sit on the
 * page mesh with one large white card or phone and at most two satellites.
 * Each scene plays a short sequence instead of a static board.
 * Keys are the image paths in productPages.ts.
 */
import {
  BookOpen,
  FileText,
  Gauge,
  Headphones,
  KeyRound,
  Link2,
  MessageCircle,
  Search,
  Sparkles,
  Target,
  Smile,
  Workflow,
} from 'lucide-react';
import {
  Bubble,
  Btn,
  Chip,
  Cursor,
  Field,
  Float,
  Glow,
  IconTile,
  Meter,
  Panel,
  Phone,
  Reveal,
  Rings,
  Row,
  Stack,
  Stage,
  Stat,
  TypeText,
  Typing,
  type SceneMap,
  type SceneProps,
} from '../kit';

/* ── Hero ──────────────────────────────────────────────────────────────── */

/** A shopper asks, the AI reads store policies on your key, answers, cites. */
function Hero({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={9}>
      <Float x={8} y={30} w={28} at={0}>
        <Panel glass title="AI Brain" icon={KeyRound}>
          <Row title="Your API key" sub="Connected" />
          <Row title="Store knowledge" sub="12 pages, 3 policies" />
        </Panel>
      </Float>
      <Float x={44} y={4} w={34} at={0.2} z={3}>
        <Phone name="Glow Co">
          <Reveal at={0.7}>
            <Bubble from="user" time="14:02">
              <TypeText text="Can I return an opened serum?" at={0.9} />
            </Bubble>
          </Reveal>
          <Reveal at={2.4} until={3.7}>
            <Typing />
          </Reveal>
          <Reveal at={3.8}>
            <Bubble from="biz" time="14:02" read>
              <TypeText text="Opened items can be exchanged within 7 days. Want a pickup?" at={3.9} cps={36} />
            </Bubble>
          </Reveal>
        </Phone>
      </Float>
      <Float x={80} y={30} at={2.3} until={3.8}>
        <Chip icon={Search}>Reading policies</Chip>
      </Float>
      <Float x={80} y={30} at={6}>
        <Chip icon={FileText} tone="emerald" dot>Cited: Return policy</Chip>
      </Float>
    </Stage>
  );
}

/* ── Bento tiles: plain, one focal element ─────────────────────────────── */

/** Store pages and policies become the source for every answer. */
function Knowledge({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Rings x={50} y={50} count={4} gap={10} />
      <Float x={39} y={36} at={0} z={3}>
        <IconTile icon={BookOpen} size="xl" pulse />
      </Float>
      <Float x={8} y={16} at={1.1} drift>
        <Chip icon={FileText}>Return policy</Chip>
      </Float>
      <Float x={46} y={74} at={2.1} drift>
        <Chip icon={Link2}>12 store pages</Chip>
      </Float>
    </Stage>
  );
}

/** Paste your own key, connect, and tokens bill to your provider. */
function Keys({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Glow x={50} y={48} size={22} />
      <Float x={12} y={22} w={76} at={0.2} z={3}>
        <Panel title="Your API key" icon={KeyRound}>
          <Stack gap={0.9}>
            <Field label="Key" value="sk-••••••••••••4f2a" mono />
            <Btn primary pressAt={1.6}>Connect</Btn>
          </Stack>
        </Panel>
      </Float>
      <Cursor
        path={[
          [72, 86, 0.6],
          [50, 55, 1.4],
          [50, 55, 2],
          [62, 80, 3],
        ]}
        clicks={[1.6]}
      />
      <Float x={30} y={78} at={2.3}>
        <Chip tone="emerald" dot>Connected</Chip>
      </Float>
    </Stage>
  );
}

/** Name and tone set once; every greeting sounds like the brand. */
function Persona({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6.5}>
      <Rings x={50} y={56} count={4} gap={9} />
      <Float x={30} y={16} at={0.2}>
        <Chip icon={Smile}>Maya · warm, brief</Chip>
      </Float>
      <Float x={14} y={38} w={72} at={0.9} z={3}>
        <Bubble from="biz" time="10:15" read>
          <TypeText text="Hi! I'm Maya from Glow Co. How can I help today?" at={1.2} cps={32} />
        </Bubble>
      </Float>
      <Float x={34} y={72} at={3.4}>
        <Chip icon={Sparkles}>Quick FAQs on</Chip>
      </Float>
    </Stage>
  );
}

/* ── Wide panels: page mesh, one large card ────────────────────────────── */

/** Connect your key, choose the model, then watch tokens and cost. */
function Settings({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7}>
      <Float x={10} y={10} w={50} at={0.2} z={3}>
        <Panel title="AI settings" icon={Sparkles} right={<Chip tone="emerald" dot>Connected</Chip>}>
          <Stack gap={0.8}>
            <Field label="API key" value="sk-••••••••••••4f2a" mono />
            <Reveal at={1}>
              <Field label="Model" value="Fast · low cost" />
            </Reveal>
            <Reveal at={1.8}>
              <Meter label="Max reply length" value="300 tokens" pct={60} />
            </Reveal>
          </Stack>
        </Panel>
      </Float>
      <Float x={66} y={34} w={26} at={3}>
        <Panel glass title="Usage" icon={Gauge}>
          <Stat label="Tokens this week" value="48,210" />
          <Row title="₹0.10 to ₹0.30" sub="Est. per AI reply" />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Imported pages plus persona: the answer cites policy in the brand voice. */
function KnowledgePersona({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={8} y={12} w={50} at={0.2} z={3}>
        <Panel title="Store knowledge" icon={BookOpen}>
          <Reveal at={0.8}>
            <Row lead={<IconTile icon={FileText} />} title="Return policy" sub="7-day exchange" right={<Chip tone="emerald">Synced</Chip>} />
          </Reveal>
          <Reveal at={1.4}>
            <Row lead={<IconTile icon={FileText} />} title="Shipping policy" sub="2 to 5 days" right={<Chip tone="emerald">Synced</Chip>} />
          </Reveal>
          <Reveal at={2}>
            <Row lead={<IconTile icon={Link2} />} title="Store pages" sub="12 imported" right={<Chip tone="emerald">Synced</Chip>} />
          </Reveal>
        </Panel>
      </Float>
      <Float x={64} y={14} at={2.8}>
        <Chip icon={Smile}>Maya · warm, brief</Chip>
      </Float>
      <Float x={62} y={30} w={32} at={3.4} z={4}>
        <Bubble from="biz" time="14:05" read>
          <TypeText text="Sure! Exchanges are free within 7 days of delivery." at={3.7} cps={34} />
        </Bubble>
      </Float>
    </Stage>
  );
}

/** Intent Detect routes first; a human takeover wins and pauses AI. */
function LiveRouting({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={4} y={20} w={26} at={0.2}>
        <Bubble from="user" time="16:40">
          <TypeText text="Where is my order?" at={0.4} />
        </Bubble>
      </Float>
      <Float x={36} y={12} w={52} at={1.2} z={3}>
        <Panel title="Intent Detect" icon={Target}>
          <Row
            lead={<IconTile icon={MessageCircle} />}
            title="Order status"
            sub="Matched, no model call"
            right={<Chip tone="emerald">96%</Chip>}
            active
          />
          <Reveal at={2.4}>
            <Row lead={<IconTile icon={Workflow} />} title="Flow Builder" sub="Runs the Track order flow" />
          </Reveal>
          <Reveal at={3.6}>
            <Row
              lead={<IconTile icon={Headphones} tone="amber" />}
              title="Live Chat takeover"
              sub="Always wins over AI"
              right={<Chip tone="amber">AI paused</Chip>}
            />
          </Reveal>
        </Panel>
      </Float>
    </Stage>
  );
}

const scenes: SceneMap = {
  '/aiii/ai-brain-hero.webp': Hero,
  '/aiii/25.webp': Knowledge,
  '/aiii/27.webp': Keys,
  '/aiii/26.webp': Persona,
  '/aiii/36.webp': Settings,
  '/aiii/37.webp': KnowledgePersona,
  '/intent-sub-feature/live-routing.webp': LiveRouting,
};

export default scenes;
