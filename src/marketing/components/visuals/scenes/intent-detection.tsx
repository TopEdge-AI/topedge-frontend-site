/**
 * Intent detection scenes (v7). Real shopper phrasing, Hinglish included,
 * matched to intents without spending AI tokens.
 * Keys are the image paths in productPages.ts.
 */
import type { CSSProperties } from 'react';
import {
  Check,
  ExternalLink,
  FlaskConical,
  GitBranch,
  Headphones,
  IndianRupee,
  Plus,
  Target,
  Truck,
  Undo2,
  Workflow,
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
  Toggle,
  TypeText,
  Typing,
  type SceneMap,
  type SceneProps,
} from '../kit';

const vars = (o: Record<string, string | number>) => o as unknown as CSSProperties;

function Field({ label, text, at, cps }: { label: string; text: string; at: number; cps?: number }) {
  return (
    <div className="fv-field">
      <small>{label}</small>
      <span>
        <TypeText text={text} at={at} cps={cps} />
      </span>
    </div>
  );
}

/* ── Bento tiles ───────────────────────────────────────────────────────── */

/** Three ways to ask the same thing; every one lands on Shipping. */
function Phrases({ label }: SceneProps) {
  const msg = (t: string, at: number) => (
    <Bubble from="user">
      <TypeText text={t} at={at} cps={20} />
    </Bubble>
  );
  return (
    <Stage label={label} duration={8}>
      <Float x={10} y={12} w={80}>
        <Panel title="Intent · Shipping" icon={Truck} right={<Chip>8 phrases</Chip>}>
          <div className="ch-msg in-msg">
            <Swap at={2.6} a={msg('parcel kab aayega?', 0.3)} b={msg('order kidhar hai bhai', 2.8)} />
          </div>
          <div className="in-match">
            <Swap
              at={2.6}
              a={
                <Reveal at={1.4}>
                  <Row lead={<IconTile icon={Target} tone="emerald" />} title="Matched: Shipping" sub="“kab aayega” ≈ “when will it arrive”" right={<Chip tone="emerald">96%</Chip>} />
                </Reveal>
              }
              b={
                <Reveal at={4.1}>
                  <Row lead={<IconTile icon={Target} tone="emerald" />} title="Matched: Shipping" sub="“kidhar hai” ≈ “where is”" right={<Chip tone="emerald">93%</Chip>} />
                </Reveal>
              }
            />
          </div>
        </Panel>
      </Float>
    </Stage>
  );
}

/** A matched intent starts a flow directly: no model call, no token cost. */
function RouteNoAi({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={12} w={80}>
        <Panel title="Routing" icon={GitBranch}>
          <div className="ch-msg in-msg">
            <Bubble from="user">
              <TypeText text="return karna hai" at={0.3} cps={20} />
            </Bubble>
          </div>
          <Reveal at={1.3}>
            <Row lead={<IconTile icon={Undo2} />} title="Intent: Returns" sub="Matched by phrase" right={<Chip tone="emerald">94%</Chip>} />
          </Reveal>
          <Reveal at={2}>
            <Row lead={<IconTile icon={Workflow} />} title="Returns flow started" sub="Asks for order and reason" right={<Chip tone="emerald" icon={Check}>Sent</Chip>} />
          </Reveal>
          <Reveal at={2.7}>
            <KV k="AI tokens used" v="₹0" total />
          </Reveal>
        </Panel>
      </Float>
    </Stage>
  );
}

/** Type a phrase, press Test, see the confidence before it goes live. */
function TestConfidence({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={14} w={80}>
        <Panel title="Test an intent" icon={FlaskConical}>
          <div className="in-test">
            <Field label="Shopper says" text="kab tak aayega?" at={0.5} cps={18} />
            <span data-cursor="test">
              <Btn primary pressAt={1.7}>
                Test
              </Btn>
            </span>
          </div>
          <Reveal at={2}>
            <div className="in-result">
              <Meter label="Shipping" value="94%" pct={94} tone="emerald" />
              <Meter label="COD confirm" value="4%" pct={4} />
              <Meter label="Returns" value="2%" pct={2} />
            </div>
          </Reveal>
        </Panel>
      </Float>
      <Cursor path={[[70, 98, 0.8], ['test', 1.4], ['test', 1.9], [76, 94, 2.8]]} clicks={[1.7]} />
    </Stage>
  );
}

/* ── Showcases ─────────────────────────────────────────────────────────── */

/** The intent list; a new one is added in place and switched on. */
function IntentList({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8.5}>
      <Float x={18} y={6} w={60}>
        <Panel
          title="Intents"
          icon={Target}
          right={
            <span data-cursor="new">
              <Btn primary icon={Plus} pressAt={1.2}>
                New intent
              </Btn>
            </span>
          }
        >
          <Row lead={<IconTile icon={Truck} />} title="Shipping" sub="8 phrases · Start flow: Track order" right={<Toggle />} />
          <Row lead={<IconTile icon={IndianRupee} />} title="COD confirm" sub="5 phrases · Send reply" right={<Toggle />} />
          <Row lead={<IconTile icon={Undo2} />} title="Returns" sub="6 phrases · Start flow: Returns" right={<Toggle />} />
          <Reveal at={4.2}>
            <Row lead={<IconTile icon={Headphones} />} title="Talk to human" sub="4 phrases · Assign to Support" right={<span style={vars({ '--fv-toggle-at': '4.8s' })}><Toggle /></span>} active />
          </Reveal>
          <Attach place="tr" at={1.5} until={4} dx={1.2} dy={8}>
            <div className="wr-new">
              <b>New intent</b>
              <Stack gap={0.6}>
                <Field label="Name" text="Talk to human" at={1.9} />
                <Field label="Phrase" text="agent se baat karni hai" at={2.6} cps={26} />
              </Stack>
            </div>
          </Attach>
        </Panel>
      </Float>
      <Cursor path={[[80, 98, 0.2], ['new', 0.9], ['new', 1.4], [86, 90, 2.6]]} clicks={[1.2]} />
    </Stage>
  );
}

/** Edit an intent: phrases in English and Hinglish, and what it does. */
function Editor({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8.5}>
      <Float x={16} y={4} w={64}>
        <Panel title="Edit intent · Shipping" icon={Truck} right={<Chip tone="emerald" dot>Live</Chip>}>
          <Label>Shopper phrases</Label>
          <div className="ch-keys">
            <span>where is my order</span>
            <span>parcel kab aayega</span>
            <span>tracking link</span>
            <Reveal at={1}>
              <span>order kidhar hai</span>
            </Reveal>
            <Reveal at={1.7}>
              <span>delivery kab hogi</span>
            </Reveal>
          </div>
          <Label>Then</Label>
          <Row lead={<IconTile icon={Workflow} />} title="Start flow: Track order" sub="Reads the order from Shopify" />
          <Row lead={<IconTile icon={Headphones} />} title="If no order found" sub="Assign to Support" />
          <div className="ch-publish" data-cursor="save">
            <Swap at={3.6} a={<Btn primary pressAt={3.3}>Save intent</Btn>} b={<Chip tone="emerald" icon={Check}>Saved · 10 phrases</Chip>} />
          </div>
        </Panel>
      </Float>
      <Cursor path={[[70, 98, 2.4], ['save', 3], ['save', 3.6], [74, 96, 4.6]]} clicks={[3.3]} />
    </Stage>
  );
}

/** Live: a Hinglish message on WhatsApp, matched instantly, the flow answers. */
function LiveRouting({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={10}>
      <Float x={38} y={0}>
        <IPhone name="Mira Ethnic">
          <Reveal at={0.4}>
            <Bubble from="user" time="16:40" read>
              <TypeText text="order kidhar hai bhai?" at={0.6} cps={18} />
            </Bubble>
          </Reveal>
          <Reveal at={2.4} until={3.2}>
            <Typing />
          </Reveal>
          <Reveal at={3.3}>
            <Bubble from="biz" time="16:40" buttons={[{ label: 'Track order', icon: ExternalLink, at: 5.6, cursor: 'track' }]}>
              Hi Riya! Order #2211 is out for delivery and will reach you by 6 pm today.
            </Bubble>
          </Reveal>
        </IPhone>
        <Attach place="l" at={2} dx={8} dy={-4}>
          <Toast icon={Target} tone="emerald" title="Intent: Shipping · 93%" sub="Matched in 40 ms · no AI call" />
        </Attach>
        <Attach place="r" at={3.4} dx={8} dy={2}>
          <Toast icon={Workflow} title="Track order flow" sub="Read #2211 live from Shopify" />
        </Attach>
      </Float>
      <Cursor touch path={[['track', 5.3], ['track', 5.9]]} clicks={[5.6]} />
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
