/**
 * Intent detection scenes, v3 storytelling style (see flow-builder.tsx).
 *
 * Bento tiles are plain with one focal element; wide panels sit on the page
 * mesh with one large card. Each scene tells one short story. The page hero
 * is a video, so there is no hero scene here. Keys are the image paths in
 * productPages.ts.
 */
import {
  FlaskConical,
  GitBranch,
  Headphones,
  IndianRupee,
  MessageCircle,
  Plus,
  ShoppingBag,
  Sparkles,
  Truck,
  UserCheck,
  Workflow,
} from 'lucide-react';
import {
  Btn,
  Bubble,
  Chip,
  Cursor,
  Donut,
  Float,
  Glow,
  IconTile,
  Node,
  Panel,
  Reveal,
  Rings,
  Row,
  Stack,
  Stage,
  Toggle,
  TypeText,
  Wires,
  type SceneMap,
  type SceneProps,
} from '../kit';

/** An input field whose value types itself in. */
function TypedField({ label, text, at }: { label: string; text: string; at: number }) {
  return (
    // TypeText's own span is the input box, so the typed value sits flush in it.
    <div className="fv-field">
      <small>{label}</small>
      <TypeText text={text} at={at} />
    </div>
  );
}

/* ── Bento tiles ───────────────────────────────────────────────────────── */

/** Three ways of asking, Hinglish included, all land on one intent. */
function Phrases({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Rings x={50} y={56} count={4} gap={9} />
      <Wires paths={['M 50 30 L 50 44']} />
      <Float x={16} y={12} w={68} at={0.2} until={2.3}>
        <Bubble from="user">
          <TypeText text="parcel kab aayega?" at={0.4} />
        </Bubble>
      </Float>
      <Float x={16} y={12} w={68} at={2.4} until={4.4}>
        <Bubble from="user">
          <TypeText text="order kidhar hai bhai" at={2.6} />
        </Bubble>
      </Float>
      <Float x={16} y={12} w={68} at={4.5}>
        <Bubble from="user">
          <TypeText text="where is my order" at={4.7} />
        </Bubble>
      </Float>
      <Float x={18} y={44} w={64} at={1.2} z={3}>
        <Node icon={Truck} title="Shipping" sub="Matched · 8 phrases" active />
      </Float>
      <Float x={32} y={74} at={1.8}>
        <Chip icon={Sparkles}>Hinglish included</Chip>
      </Float>
    </Stage>
  );
}

/** A matched intent starts its flow, and the model is never called. */
function RouteNoAi({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6.5}>
      <Rings x={50} y={48} count={4} gap={10} />
      <Float x={39} y={34} at={0} z={3}>
        <IconTile icon={GitBranch} size="xl" pulse />
      </Float>
      <Float x={10} y={16} at={1} drift>
        <Chip icon={Workflow}>Returns flow started</Chip>
      </Float>
      <Float x={40} y={72} at={2.2} drift>
        <Chip tone="emerald" dot>
          ₹0 AI tokens
        </Chip>
      </Float>
    </Stage>
  );
}

/** Type a test phrase, press Test, read the matched intent and its score. */
function TestConfidence({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Glow x={50} y={60} size={20} />
      <Float x={10} y={8} w={80} at={0.2} z={3}>
        <Panel
          title="Test intent"
          icon={FlaskConical}
          right={
            <Btn primary pressAt={1.9}>
              Test
            </Btn>
          }
        >
          <TypedField label="Phrase" text="kab tak aayega?" at={0.6} />
        </Panel>
      </Float>
      <Float x={35} y={45} at={2.2}>
        <Donut pct={94} tone="emerald" size={11} />
      </Float>
      <Float x={32} y={88} at={3}>
        <Chip tone="emerald" dot>
          Matched: Shipping
        </Chip>
      </Float>
      <Cursor
        path={[
          [86, 70, 0.6],
          [81, 15, 1.6],
          [81, 15, 2.2],
          [90, 40, 3],
        ]}
        clicks={[1.9]}
      />
    </Stage>
  );
}

/* ── Wide panels ───────────────────────────────────────────────────────── */

/** Add a new intent with a Hinglish phrase; it joins the list, Active. */
function IntentList({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={32} y={14} w={56} at={0.2} z={3}>
        <Panel
          title="Intents"
          right={
            <Btn primary icon={Plus} pressAt={1.4}>
              New intent
            </Btn>
          }
        >
          <Row
            lead={<IconTile icon={Truck} />}
            title="Shipping"
            sub="8 phrases · Start flow"
            right={<Toggle />}
          />
          <Row
            lead={<IconTile icon={IndianRupee} />}
            title="COD confirm"
            sub="5 phrases · Send reply"
            right={<Toggle />}
          />
          <Reveal at={3.9}>
            <Row
              lead={<IconTile icon={Headphones} />}
              title="Talk to human"
              sub="4 phrases · Assign agent"
              right={<Toggle />}
              active
            />
          </Reveal>
        </Panel>
      </Float>
      <Float x={3} y={28} w={27} at={1.7} until={3.7}>
        <Panel glass title="New intent" icon={Plus}>
          <Stack gap={0.7}>
            <TypedField label="Name" text="Talk to human" at={2} />
            <TypedField label="Phrase" text="agent se baat karni hai" at={2.6} />
          </Stack>
        </Panel>
      </Float>
      <Cursor
        path={[
          [92, 82, 0.3],
          [79, 19, 1.2],
          [79, 19, 1.8],
          [64, 74, 3],
        ]}
        clicks={[1.4]}
      />
    </Stage>
  );
}

/** Pick the action: start a flow, choose which one, and it is set. */
function Editor({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={32} y={12} w={54} at={0.2} z={3}>
        <Panel
          title="Shipping"
          icon={Truck}
          right={
            <Chip tone="emerald" dot>
              Active
            </Chip>
          }
        >
          <Row lead={<IconTile icon={MessageCircle} />} title="Reply text" sub="Send a saved answer" />
          <Row lead={<IconTile icon={Workflow} />} title="Start a flow" sub="Hand over to a flow" active />
          <Row lead={<IconTile icon={UserCheck} />} title="Assign agent" sub="Or escalate to a team" />
        </Panel>
      </Float>
      <Float x={3} y={30} w={25} at={1.9} until={3.7}>
        <Panel glass title="Pick a flow" icon={Workflow}>
          <Row title="Order status bot" sub="Reads live from Shopify" />
          <Row title="Returns flow" sub="Pickup and refund" />
        </Panel>
      </Float>
      <Float x={3} y={38} w={25} at={3.9}>
        <Node icon={Workflow} tone="emerald" title="Order status bot" sub="Starts on every match" active />
      </Float>
      <Cursor
        path={[
          [80, 92, 0.3],
          [60, 35, 1.4],
          [60, 35, 1.9],
          [15, 43, 2.9],
          [15, 43, 3.6],
        ]}
        clicks={[1.6, 3.1]}
      />
    </Stage>
  );
}

/** A message types in, the intent matches, the flow runs, no AI is spent. */
function LiveRouting({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8.5}>
      <Float x={4} y={22} w={26} at={0.2}>
        <Bubble from="user" time="11:02">
          <TypeText text="order kab aayega?" at={0.5} />
        </Bubble>
      </Float>
      <Float x={6} y={40} at={1.8}>
        <Chip solid icon={Sparkles}>
          Shipping · 94%
        </Chip>
      </Float>
      <Float x={36} y={12} w={52} at={2.6} z={3}>
        <Panel
          title="Order status bot"
          icon={Workflow}
          right={
            <Chip tone="emerald" dot>
              Running
            </Chip>
          }
        >
          <Reveal at={3.2}>
            <Row lead={<IconTile icon={ShoppingBag} />} title="Fetch order #1042" sub="Live from Shopify" />
          </Reveal>
          <Reveal at={3.8}>
            <Row lead={<IconTile icon={Truck} />} title="Send tracking link" sub="Out for delivery today" />
          </Reveal>
        </Panel>
      </Float>
      <Float x={66} y={50} at={4.6}>
        <Chip tone="emerald" dot>
          ₹0 AI tokens
        </Chip>
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
