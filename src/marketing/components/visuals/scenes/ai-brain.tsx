/**
 * AI Brain scenes. Keys are the image paths in productPages.ts.
 * Bring-your-own-key AI grounded in the store's catalog and policies.
 * Palette: violet hero, then indigo, sky, rose, emerald per scene.
 */
import {
  BookOpen,
  Brain,
  CheckCircle2,
  FileText,
  Globe,
  Hand,
  KeyRound,
  MessageCircle,
  Package,
  ShieldCheck,
  Sparkles,
  Target,
  Truck,
  Wallet,
  Zap,
} from 'lucide-react';
import {
  Bars,
  Btn,
  Bubble,
  Chip,
  Field,
  Float,
  IconTile,
  Node,
  Panel,
  Row,
  Stage,
  Stack,
  Toggle,
  Wires,
  type SceneMap,
  type SceneProps,
} from '../kit';

/** Provider picker: the selected key gets the tone ring. */
function Providers({ active }: { active: 'OpenAI' | 'Claude' | 'Gemini' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5em' }}>
      {(['OpenAI', 'Claude', 'Gemini'] as const).map((p) => (
        <Btn key={p} tone="violet" primary={p === active}>
          {p}
        </Btn>
      ))}
    </div>
  );
}

/** Small label over a stack, used inside panels. */
function Caption({ children }: { children: string }) {
  return (
    <small style={{ display: 'block', margin: '0.2em 0 0.45em', fontSize: '0.9em', fontWeight: 500, color: 'var(--fv-muted)' }}>
      {children}
    </small>
  );
}

/* ── Hero (wide, kept inside the 16:9 crop) ────────────────────────────── */

/** Two of your own keys feeding one brain that answers on WhatsApp. */
function Hero({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet" shape="wide" grid>
      <Wires
        shape="wide"
        tone="violet"
        paths={['M 30 17 C 35 17, 34 22, 39 22', 'M 70 32 C 65 32, 66 27, 61 27']}
      />
      <Float x={4} y={14} w={26} delay={1} rotate={-2} drift>
        <Panel title="Your OpenAI key" icon={KeyRound} tone="emerald">
          <Field label="API key" value="sk-••••••••9xK2" mono />
        </Panel>
      </Float>
      <Float x={39} y={9} w={22} delay={0} z={3}>
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6em', padding: '0.9em 0 0.5em', textAlign: 'center' }}>
            <IconTile icon={Brain} tone="violet" size="xl" pulse />
            <b style={{ fontSize: '2em', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.1 }}>AI Brain</b>
            <small style={{ fontSize: '1em', color: 'var(--fv-muted)' }}>Bring your own keys</small>
            <Chip tone="emerald" dot>Active</Chip>
          </div>
        </Panel>
      </Float>
      <Float x={70} y={38} w={26} delay={2} rotate={2} drift>
        <Panel title="Your Claude key" icon={KeyRound} tone="amber">
          <Field label="API key" value="sk-ant-••••••7Qf1" mono />
        </Panel>
      </Float>
      <Float x={6} y={58} w={30} delay={4}>
        <Panel>
          <Row lead={<IconTile icon={BookOpen} tone="sky" />} title="Catalog + policies" sub="Every reply grounded" />
        </Panel>
      </Float>
      <Float x={39} y={66} w={26} delay={5}>
        <Bubble from="biz" time="14:02" read>Yes, COD is available on your pin code.</Bubble>
      </Float>
      <Float x={70} y={74} delay={6}>
        <Chip tone="violet" icon={Wallet}>Spend stays on your bill</Chip>
      </Float>
    </Stage>
  );
}

/* ── Bento tiles (square, 36em x 36em) ─────────────────────────────────── */

/** Knowledge documents and store policies the AI must cite. */
function Knowledge({ label }: SceneProps) {
  return (
    <Stage label={label} tone="indigo">
      <Float x={7} y={7} w={86} delay={0}>
        <Panel title="Knowledge documents" icon={FileText} tone="indigo" right={<Chip tone="slate">3 docs</Chip>}>
          <Row lead={<IconTile icon={Truck} tone="sky" size="sm" />} title="Shipping & delivery" sub="220 chars" right={<Chip tone="emerald">Active</Chip>} />
          <Row lead={<IconTile icon={Package} tone="violet" size="sm" />} title="Returns & exchanges" sub="240 chars" right={<Chip tone="emerald">Active</Chip>} />
          <Row lead={<IconTile icon={FileText} tone="slate" size="sm" />} title="Ingredient FAQ" sub="78 chars" right={<Chip tone="slate">Draft</Chip>} />
        </Panel>
      </Float>
      <Float x={12} y={60} w={80} delay={3} rotate={-1} drift>
        <Panel title="Store policies" icon={ShieldCheck} tone="emerald">
          <Field label="Returns policy" value="Unopened: return in 7 days" />
        </Panel>
      </Float>
    </Stage>
  );
}

/** BYOK: provider, your key, reply cap; tokens bill to you. */
function Keys({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet">
      <Float x={7} y={7} w={86} delay={0}>
        <Panel title="AI keys" icon={KeyRound} tone="violet" right={<Chip tone="emerald" dot>Connected</Chip>}>
          <Caption>Provider</Caption>
          <Providers active="OpenAI" />
          <div style={{ marginTop: '0.9em', display: 'flex', flexDirection: 'column', gap: '0.8em' }}>
            <Field label="Your OpenAI key" value="sk-••••••••••••9xK2" mono />
            <Field label="Max reply length" value="500 words" />
          </div>
        </Panel>
      </Float>
      <Float x={12} y={73} w={76} delay={3} drift>
        <Panel>
          <Row lead={<IconTile icon={Wallet} tone="emerald" />} title="Tokens on your bill" sub="No per-message AI fee" right={<Chip tone="emerald">BYOK</Chip>} />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Persona: name, tone, and a Quick FAQ answered in that voice. */
function Persona({ label }: SceneProps) {
  return (
    <Stage label={label} tone="rose">
      <Float x={7} y={7} w={86} delay={0}>
        <Panel title="Identity & tone" icon={Sparkles} tone="rose">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8em' }}>
            <Field label="Assistant name" value="Glow assistant" />
            <Field label="Tone" value="Warm, clear, concise" />
          </div>
        </Panel>
      </Float>
      <Float x={8} y={51} delay={2}>
        <Chip tone="rose" icon={MessageCircle}>Quick FAQ</Chip>
      </Float>
      <Float x={8} y={58} w={84} delay={3}>
        <Stack gap={0.7}>
          <Bubble from="user" time="10:14">Do you ship COD?</Bubble>
          <Bubble from="biz" time="10:14" read>Yes, COD is available on most pin codes.</Bubble>
        </Stack>
      </Float>
    </Stage>
  );
}

/* ── Showcases (wide, 64em x 40em) ─────────────────────────────────────── */

/** BYOK settings with usage on the provider bill. */
function Settings({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet" shape="wide">
      <Float x={4} y={12} w={58} delay={0}>
        <Panel title="AI settings" icon={Brain} tone="violet" right={<Chip tone="emerald" dot>Active</Chip>}>
          <Row title="Activate AI for inquiries" sub="Master toggle for AI answers" right={<Toggle tone="violet" />} active />
          <Row title="Model & API key" sub="Your key, your provider" right={<><Chip tone="slate">sk-…9xK2</Chip><Btn tone="violet" primary icon={KeyRound}>Manage</Btn></>} />
          <Row title="Chat model" sub="Pick per budget" right={<Chip tone="violet">Suggested</Chip>} />
          <Row title="Limit reply length" sub="Target words" right={<Chip tone="slate">500 words</Chip>} />
        </Panel>
      </Float>
      <Float x={66} y={16} w={30} delay={2} rotate={1}>
        <Panel title="Usage" icon={Zap} tone="indigo">
          <small style={{ fontSize: '0.95em', color: 'var(--fv-muted)' }}>Est. per AI reply</small>
          <b style={{ display: 'block', fontSize: '1.9em', fontWeight: 600, letterSpacing: '-0.04em' }}>₹0.10 to ₹0.30</b>
          <div style={{ marginTop: '0.8em' }}>
            <Bars tone="indigo" height={4.5} hi={9} values={[30, 42, 36, 50, 46, 58, 52, 66, 60, 74]} />
          </div>
        </Panel>
      </Float>
      <Float x={66} y={70} delay={4} drift>
        <Chip tone="emerald" icon={Wallet}>Billed by your provider</Chip>
      </Float>
    </Stage>
  );
}

/** Knowledge import plus persona, then a cited answer on WhatsApp. */
function KnowledgePersona({ label }: SceneProps) {
  return (
    <Stage label={label} tone="sky" shape="wide">
      <Wires shape="wide" tone="sky" paths={['M 48 33 C 52 33, 50 37, 54 37']} />
      <Float x={4} y={10} w={44} delay={0}>
        <Panel title="Store knowledge" icon={BookOpen} tone="sky">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.6em', marginBottom: '0.5em' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Field label="Import from website" value="yourstore.myshopify.com" />
            </div>
            <Btn tone="sky" primary icon={Globe}>Import</Btn>
          </div>
          <Row lead={<IconTile icon={Truck} tone="sky" size="sm" />} title="Shipping & delivery" sub="Imported page" right={<Chip tone="emerald">Active</Chip>} />
          <Row lead={<IconTile icon={Package} tone="violet" size="sm" />} title="Returns policy" sub="Store policy" right={<Chip tone="emerald">Active</Chip>} />
        </Panel>
      </Float>
      <Float x={54} y={8} w={40} delay={2}>
        <Panel>
          <Row lead={<IconTile icon={Sparkles} tone="rose" />} title="Glow assistant" sub="Warm, clear, concise" right={<Chip tone="rose">Persona</Chip>} />
        </Panel>
      </Float>
      <Float x={54} y={36} w={40} delay={3}>
        <Stack gap={0.7}>
          <Bubble from="user" time="16:20">Can I return an opened serum?</Bubble>
          <Bubble from="biz" time="16:20" read>Opened skincare is not eligible. Unopened items return within 7 days.</Bubble>
        </Stack>
      </Float>
      <Float x={60} y={82} delay={5}>
        <Chip tone="sky" icon={CheckCircle2}>Cited: Returns policy</Chip>
      </Float>
    </Stage>
  );
}

/** Inbound message, Intent Detect, then a flow; takeover still wins. */
function LiveRouting({ label }: SceneProps) {
  return (
    <Stage label={label} tone="indigo" shape="wide">
      <Wires shape="wide" tone="indigo" paths={['M 38 25 C 41 25, 41 18, 44 18']} />
      <Float x={14} y={8} w={24} delay={0}>
        <Bubble from="user" time="2:14 pm">Order kab aayega?</Bubble>
      </Float>
      <Float x={4} y={26} w={34} delay={1}>
        <Panel title="Confidence 96%" icon={Target} tone="violet">
          <Node icon={Truck} tone="sky" title="Shipping" sub="Tag chat · Order status" active />
          <div style={{ marginTop: '0.8em' }}>
            <Btn tone="violet" icon={Zap}>Start Flow · Order status</Btn>
          </div>
        </Panel>
      </Float>
      <Float x={44} y={10} w={52} delay={2}>
        <Panel title="Live routing" icon={Brain} tone="indigo" right={<Chip tone="emerald" dot>Live</Chip>}>
          <Row lead={<IconTile icon={MessageCircle} tone="emerald" size="sm" />} title="Inbound WhatsApp" sub="Received · 2:14 pm" right={<Chip tone="emerald">Done</Chip>} />
          <Row lead={<IconTile icon={Target} tone="violet" size="sm" />} title="Intent · Shipping 96%" sub="Before AI, no tokens" right={<Chip tone="violet">Before AI</Chip>} active />
          <Row lead={<IconTile icon={Zap} tone="amber" size="sm" />} title="Start Flow" sub="Order status" right={<Chip tone="violet">Before AI</Chip>} />
        </Panel>
      </Float>
      <Float x={8} y={74} w={30} delay={4}>
        <Bubble from="biz" time="2:15 pm" read>Order #1042 ships tomorrow.</Bubble>
      </Float>
      <Float x={50} y={74} delay={5} drift>
        <Chip tone="rose" solid icon={Hand}>Live Chat takeover still wins</Chip>
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
