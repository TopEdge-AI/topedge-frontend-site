/**
 * AI Brain scenes (v7). A sample skincare store, Glow Co., with its bot
 * persona Maya. The hero shows a real support exchange on the shopper's
 * phone, with the policy the answer came from.
 * Keys are the image paths in productPages.ts.
 */
import type { CSSProperties } from 'react';
import {
  BookOpen,
  Check,
  FileText,
  Gauge,
  Headphones,
  KeyRound,
  Link2,
  MessageCircle,
  Search,
  Sparkles,
  Target,
  Truck,
  Workflow,
  AnthropicLogo,
  GeminiLogo,
  OpenAILogo,
} from '../icons';
import {
  Attach,
  Btn,
  Bubble,
  Chip,
  Cursor,
  Float,
  IconTile,
  IPhone,
  KV,
  Label,
  Meter,
  Panel,
  Reveal,
  Row,
  Stack,
  Stage,
  Swap,
  Toast,
  TypeText,
  Typing,
  type SceneMap,
  type SceneProps,
} from '../kit';

const vars = (o: Record<string, string | number>) => o as unknown as CSSProperties;

function GlowDp() {
  return <span className="ai-dp">G</span>;
}

/** A policy document importing: progress, then Synced. */
function Doc({ title, sub, at }: { title: string; sub: string; at: number }) {
  return (
    <Row
      lead={<IconTile icon={FileText} />}
      title={title}
      sub={sub}
      right={
        <Swap
          at={at}
          a={<span className="ai-sync"><i style={vars({ '--d': `${at - 1.1}s` })} /></span>}
          b={<Chip tone="emerald" icon={Check}>Synced</Chip>}
        />
      }
    />
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */

/** A shopper asks a policy question; Maya reads the policy, answers, books it. */
function Hero({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={13}>
      <Float x={38} y={0}>
        <IPhone name="Glow Co" logo={<GlowDp />} status="Typically replies instantly">
          <Reveal at={0.4}>
            <Bubble from="user" time="14:02" read>
              <TypeText text="Can I return an opened serum?" at={0.6} cps={20} />
            </Bubble>
          </Reveal>
          <Reveal at={2.4} until={4}>
            <Typing />
          </Reveal>
          <Reveal at={4.1}>
            <Bubble from="biz" time="14:02">
              <TypeText text="Opened items can't be returned, but you can exchange them within 7 days of delivery. Want me to book a free pickup?" at={4.2} cps={46} />
            </Bubble>
          </Reveal>
          <Reveal at={7.6}>
            <Bubble from="user" time="14:03" read>
              Yes please, tomorrow works
            </Bubble>
          </Reveal>
          <Reveal at={8.6} until={9.6}>
            <Typing />
          </Reveal>
          <Reveal at={9.7}>
            <Bubble from="biz" time="14:03">
              Done! Pickup booked for tomorrow, 10 am to 1 pm. 📦
            </Bubble>
          </Reveal>
        </IPhone>
        <Attach place="l" at={2.4} until={4} dx={7.5} dy={-2}>
          <Toast icon={Search} title="Reading store knowledge" sub="Return policy · Exchange FAQ" />
        </Attach>
        <Attach place="l" at={4.3} dx={7.5} dy={-2}>
          <Toast icon={FileText} tone="emerald" title="Answer cited" sub="Return policy · section 2" />
        </Attach>
        <Attach place="r" at={10} dx={7.5} dy={4}>
          <Toast icon={Truck} tone="emerald" title="Pickup booked" sub="Order #2087 · via Shopify" />
        </Attach>
      </Float>
    </Stage>
  );
}

/* ── Bento tiles ───────────────────────────────────────────────────────── */

/** Store pages and policies import and stay synced as the source of answers. */
function Knowledge({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={14} w={80}>
        <Panel title="Store knowledge" icon={BookOpen} right={<Chip>12 pages</Chip>}>
          <Doc title="Return policy" sub="glowco.in/policies/refund" at={1.4} />
          <Doc title="Shipping policy" sub="2 to 5 days, COD available" at={2} />
          <Doc title="Ingredients FAQ" sub="Store page · 18 answers" at={2.6} />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Bring your own key: paste it, connect, tokens bill to your provider. */
function Keys({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={14} w={80}>
        <Panel title="Connect your AI" icon={KeyRound}>
          <div className="ai-seg">
            <span>
              <OpenAILogo /> OpenAI
            </span>
            <span className="is-on">
              <AnthropicLogo /> Claude
            </span>
            <span>
              <GeminiLogo /> Gemini
            </span>
          </div>
          <Stack gap={0.8}>
            <div className="fv-field">
              <small>API key</small>
              <span className="is-mono">
                <TypeText text="sk-••••••••••••••4f2a" at={0.6} cps={30} />
              </span>
            </div>
            <span data-cursor="connect">
              <Swap
                at={2.2}
                a={
                  <Btn primary pressAt={1.9}>
                    Connect
                  </Btn>
                }
                b={<Chip tone="emerald" icon={Check}>Connected · tokens bill to your account</Chip>}
              />
            </span>
          </Stack>
        </Panel>
      </Float>
      <Cursor path={[[70, 98, 1], ['connect', 1.7], ['connect', 2.2], [70, 96, 3.2]]} clicks={[1.9]} />
    </Stage>
  );
}

/** Name, tone and a live preview of how the bot will sound. */
function Persona({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7.5}>
      <Float x={10} y={12} w={80}>
        <Panel title="Bot persona" icon={Sparkles}>
          <div className="ai-persona">
            <div className="fv-field">
              <small>Name</small>
              <span>Maya</span>
            </div>
            <div className="ai-tones">
              <span className="is-on">Warm</span>
              <span className="is-on">Brief</span>
              <span>Formal</span>
            </div>
          </div>
          <div className="ai-preview">
            <Reveal at={0.9}>
              <Bubble from="biz" time="10:15">
                <TypeText text="Hi! I'm Maya from Glow Co. How can I help today?" at={1.1} cps={32} />
              </Bubble>
            </Reveal>
          </div>
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Showcases ─────────────────────────────────────────────────────────── */

/** Key, model and reply length on one side; what it costs on the other. */
function Settings({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={14} y={6} w={66}>
        <Panel title="AI settings" icon={Sparkles} right={<Chip tone="emerald" dot>Connected</Chip>}>
          <div className="cp-perf">
            <Stack gap={0.85}>
              <div className="fv-field">
                <small>API key</small>
                <span className="is-mono">sk-••••••••••••4f2a</span>
              </div>
              <div className="fv-field">
                <small>Model</small>
                <div className="ai-seg ai-seg--fill">
                  <span className="ai-seg__slide">Fast · low cost</span>
                  <span>Balanced</span>
                  <span>Best quality</span>
                </div>
              </div>
              <Reveal at={1.2}>
                <Meter label="Max reply length" value="300 tokens" pct={60} />
              </Reveal>
            </Stack>
            <div className="cp-perf__kv">
              <Label>This week</Label>
              <KV k="AI replies" v="1,612" />
              <KV k="Tokens" v="48,210" />
              <KV k="Per reply" v="₹0.10 to ₹0.30" />
            </div>
          </div>
          <Attach place="br" at={2.6} dx={1.6} dy={-0.8}>
            <Toast icon={Gauge} title="Billed by your provider" sub="No markup from TopEdge AI" />
          </Attach>
        </Panel>
      </Float>
    </Stage>
  );
}

/** Knowledge on the left; a test chat on the right cites the row it used. */
function KnowledgePersona({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={10} y={8} w={74}>
        <Panel>
          <div className="ai-split">
            <div>
              <Label>Store knowledge</Label>
              <Swap
                at={3.2}
                a={<Row lead={<IconTile icon={FileText} />} title="Return policy" sub="7-day exchange" />}
                b={<Row lead={<IconTile icon={FileText} tone="emerald" />} title="Return policy" sub="7-day exchange · used now" active />}
              />
              <Row lead={<IconTile icon={FileText} />} title="Shipping policy" sub="2 to 5 days" />
              <Row lead={<IconTile icon={Link2} />} title="Store pages" sub="12 imported" />
            </div>
            <div className="ai-chat">
              <div className="ai-chat__head">
                <GlowDp />
                <b>Maya</b>
                <small>Test chat</small>
              </div>
              <Stack gap={0.5}>
                <Reveal at={0.6}>
                  <Bubble from="user">Can I swap my serum for a bigger size?</Bubble>
                </Reveal>
                <Reveal at={1.8} until={3.1}>
                  <Typing />
                </Reveal>
                <Reveal at={3.2}>
                  <Bubble from="biz" time="14:05">
                    <TypeText text="Sure! Exchanges are free within 7 days of delivery." at={3.3} cps={34} />
                  </Bubble>
                </Reveal>
                <Reveal at={4.8}>
                  <span className="ai-cite">
                    <FileText strokeWidth={2.2} /> Source: Return policy
                  </span>
                </Reveal>
              </Stack>
            </div>
          </div>
        </Panel>
      </Float>
    </Stage>
  );
}

/** Messages route before AI spends a token: intent first, flows next, humans always win. */
function LiveRouting({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={9}>
      <Float x={18} y={6} w={60}>
        <Panel title="Routing" icon={Target} right={<Chip>Inbound WhatsApp</Chip>}>
          <div className="ai-msg">
            <Swap at={4.4} a={<Bubble from="user">Where is my order?</Bubble>} b={<Bubble from="user">Can I talk to a person?</Bubble>} />
          </div>
          <Swap
            at={4.4}
            a={<Row lead={<IconTile icon={Target} tone="emerald" />} title="Intent Detect · Order status" sub="96% match · no model call" right={<Chip tone="emerald">₹0</Chip>} active />}
            b={<Row lead={<IconTile icon={Target} />} title="Intent Detect · Human request" sub="Matched" />}
          />
          <Swap
            at={4.4}
            a={
              <Reveal at={1.4}>
                <Row lead={<IconTile icon={Workflow} />} title="Flow Builder" sub="Runs Track order, replies in 1.2s" right={<Chip tone="emerald" icon={Check}>Sent</Chip>} />
              </Reveal>
            }
            b={<Row lead={<IconTile icon={MessageCircle} />} title="AI reply" sub="Skipped" />}
          />
          <Reveal at={5.2}>
            <Row lead={<IconTile icon={Headphones} tone="amber" />} title="Live Chat takeover" sub="Priya joined · always wins over AI" right={<Chip tone="amber">AI paused</Chip>} active />
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
