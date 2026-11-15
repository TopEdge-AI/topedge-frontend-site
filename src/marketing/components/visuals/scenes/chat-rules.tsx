/**
 * Chat rules scenes. Keys are the image paths in productPages.ts.
 * Keyword, intent and tag rules that route, assign and escalate chats.
 * Palette: amber hero, then violet, sky, emerald, rose, indigo per scene.
 *
 * Two image paths are reused across a bento tile and a wide frame, and the
 * rule builder showcase has no image (''). A scene only receives its label,
 * so the shared keys pick a layout from the frame they are mounted in.
 */
import { useLayoutEffect, useRef, useState } from 'react';
import {
  Bot,
  Clock,
  CreditCard,
  Crown,
  Filter,
  GitFork,
  Hand,
  Headphones,
  Inbox,
  MessageCircle,
  PauseCircle,
  Tag,
  Target,
  Undo2,
  UserCheck,
  Workflow,
  Zap,
} from 'lucide-react';
import {
  Avatar,
  Btn,
  Bubble,
  Chip,
  Float,
  IconTile,
  Node,
  Panel,
  Row,
  Stack,
  Stage,
  Toggle,
  Wires,
  type Scene,
  type SceneMap,
  type SceneProps,
} from '../kit';

/* ── Local pieces ──────────────────────────────────────────────────────── */

type Slot = 'hero' | 'bento' | 'showcase';

/** Render one of the given scenes depending on the frame this path is shown in. */
function bySlot(scenes: { hero?: Scene; bento: Scene; showcase: Scene }): Scene {
  return function SlotScene({ label }: SceneProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [slot, setSlot] = useState<Slot | null>(null);
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      if (el.closest('.demo-video-glow__frame')) setSlot('hero');
      else if (el.closest('.mkt-pf__shot') && !el.closest('.is-wide')) setSlot('bento');
      else setSlot('showcase');
    }, []);
    if (!slot) return <span ref={ref} hidden />;
    const S = slot === 'hero' ? scenes.hero ?? scenes.showcase : scenes[slot];
    return <S label={label} />;
  };
}

/** Small label above a group inside a panel. */
function Caption({ children }: { children: string }) {
  return (
    <small style={{ display: 'block', margin: '0.1em 0 0.5em', fontSize: '0.9em', fontWeight: 600, letterSpacing: '0.02em', color: 'var(--fv-muted)' }}>
      {children}
    </small>
  );
}

/* ── Hero (wide, kept inside the 16:9 crop) ────────────────────────────── */

/** Incoming chats pass the rules and land in the right queue. */
function RoutingHero({ label }: SceneProps) {
  return (
    <Stage label={label} tone="amber" shape="wide" grid>
      <Wires
        shape="wide"
        tone="amber"
        paths={[
          'M 33 11 C 38 11, 38 25, 43.5 25',
          'M 33 25 L 43.5 25',
          'M 33 39 C 38 39, 38 25, 43.5 25',
          'M 56.5 25 C 61 25, 61 10.5, 66 10.5',
          'M 56.5 25 L 66 25',
          'M 56.5 25 C 61 25, 61 39.5, 66 39.5',
        ]}
      />
      <Float x={4} y={10} w={29} delay={0}>
        <Bubble from="user" time="11:02">Is cash on delivery okay?</Bubble>
      </Float>
      <Float x={4} y={33} w={29} delay={1}>
        <Bubble from="user" time="11:03">I want a refund for #1042</Bubble>
      </Float>
      <Float x={4} y={55} w={29} delay={2}>
        <Bubble from="user" time="11:03">Ordering again, 5th time!</Bubble>
      </Float>
      <Float x={43.5} y={29} delay={3}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6em', width: '8.3em' }}>
          <IconTile icon={GitFork} tone="amber" size="xl" pulse />
          <Chip tone="amber">Chat rules</Chip>
        </div>
      </Float>
      <Float x={66} y={10} w={30} delay={4}>
        <Node icon={CreditCard} tone="sky" title="COD ops" sub="Priya · 4 open" />
      </Float>
      <Float x={66} y={33} w={30} delay={5}>
        <Node icon={Undo2} tone="rose" title="Refunds" sub="Arjun · 2 open" active />
      </Float>
      <Float x={66} y={56} w={30} delay={6}>
        <Node icon={Crown} tone="violet" title="VIP" sub="Neha · skips the line" />
      </Float>
      <Float x={36} y={76} delay={7}>
        <Chip tone="slate" icon={Inbox}>Live Chat stays calm at peak</Chip>
      </Float>
    </Stage>
  );
}

/* ── Bento tiles (square, 36em x 36em) ─────────────────────────────────── */

/** Keyword rule: COD phrases go to the ops queue. */
function KeywordRule({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet">
      <Wires tone="violet" paths={['M 50 25 L 50 33']} />
      <Float x={8} y={8} w={70} delay={0}>
        <Bubble from="user" time="10:41">Is cash on delivery available?</Bubble>
      </Float>
      <Float x={7} y={33} w={86} delay={2}>
        <Panel title="Rule: COD" icon={Tag} tone="violet" right={<Toggle tone="violet" />}>
          <Caption>IF MESSAGE CONTAINS</Caption>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4em', marginBottom: '0.9em' }}>
            <Chip tone="violet">COD</Chip>
            <Chip tone="violet">cash on delivery</Chip>
            <Chip tone="violet">pay later</Chip>
          </div>
          <Caption>THEN ASSIGN TO</Caption>
          <Row lead={<Avatar name="Priya Shah" tone="sky" />} title="COD ops queue" sub="Priya, Rahul" right={<Chip tone="emerald" dot>Live</Chip>} active />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Intent handoff: escalation opens the right agent queue with history. */
function IntentHandoff({ label }: SceneProps) {
  return (
    <Stage label={label} tone="sky" grid>
      <Wires tone="sky" paths={['M 50 23 L 50 31', 'M 50 44 L 50 53']} />
      <Float x={18} y={8} w={70} delay={0}>
        <Bubble from="user" time="15:08">Can I talk to a human please?</Bubble>
      </Float>
      <Float x={18} y={31} w={64} delay={2}>
        <Node icon={Target} tone="sky" title="Handoff intent" sub="Confidence 94%" active />
      </Float>
      <Float x={7} y={53} w={86} delay={4}>
        <Panel title="Support queue" icon={Headphones} tone="emerald" right={<Chip tone="emerald" dot>Opened</Chip>}>
          <Row lead={<Avatar name="Kabir Rao" tone="violet" />} title="Kabir Rao" sub="Thread history intact" right={<Chip tone="sky">Handoff</Chip>} />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Live Chat filters that match the published rules. */
function AssignFilters({ label }: SceneProps) {
  return (
    <Stage label={label} tone="emerald">
      <Float x={7} y={7} w={86} delay={0}>
        <Panel title="Live Chat" icon={Inbox} tone="emerald" right={<Chip tone="slate" icon={Filter}>Filters</Chip>}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4em', marginBottom: '0.7em' }}>
            <Chip tone="emerald" solid>Assigned to me 4</Chip>
            <Chip tone="slate">Open 12</Chip>
            <Chip tone="rose">Needs help 2</Chip>
          </div>
          <Row lead={<Avatar name="Riya Sharma" tone="sky" />} title="Riya Sharma" sub="Will I pay on delivery?" right={<Chip tone="sky">COD</Chip>} active />
          <Row lead={<Avatar name="Vikram Singh" tone="violet" />} title="Vikram Singh" sub="Size exchange please" right={<Chip tone="violet">VIP</Chip>} />
          <Row lead={<Avatar name="Megha Patel" tone="amber" />} title="Megha Patel" sub="Refund not received" right={<Chip tone="rose">Refund</Chip>} />
        </Panel>
      </Float>
      <Float x={18} y={78} delay={4} drift>
        <Chip tone="emerald" icon={UserCheck}>Same queues as your rules</Chip>
      </Float>
    </Stage>
  );
}

/* ── Showcases (wide, 64em x 40em) ─────────────────────────────────────── */

/** Rule builder: triggers on the left, actions on the right. */
function RuleBuilder({ label }: SceneProps) {
  return (
    <Stage label={label} tone="indigo" shape="wide" grid>
      <Wires shape="wide" tone="indigo" paths={['M 46 27 C 50 27, 50 27, 54 27']} />
      <Float x={4} y={8} delay={0}>
        <Chip tone="indigo" icon={Workflow}>Rule: Refunds</Chip>
      </Float>
      <Float x={77} y={7} delay={1}>
        <Btn tone="indigo" primary icon={Zap}>Publish rule</Btn>
      </Float>
      <Float x={4} y={20} w={42} delay={2}>
        <Panel title="When" icon={Filter} tone="amber">
          <Row lead={<IconTile icon={MessageCircle} tone="amber" size="sm" />} title="Keyword" sub="refund, return, money back" />
          <Row lead={<IconTile icon={Target} tone="sky" size="sm" />} title="Intent" sub="Refund request" />
          <Row lead={<IconTile icon={Tag} tone="violet" size="sm" />} title="Tag" sub="VIP" right={<Chip tone="slate">OR</Chip>} />
        </Panel>
      </Float>
      <Float x={54} y={20} w={42} delay={4}>
        <Panel title="Then" icon={Zap} tone="emerald">
          <Row lead={<IconTile icon={UserCheck} tone="emerald" size="sm" />} title="Assign" sub="Refunds queue" right={<Chip tone="emerald">Arjun</Chip>} active />
          <Row lead={<IconTile icon={Clock} tone="rose" size="sm" />} title="Escalate" sub="If no reply in 15 min" />
          <Row lead={<IconTile icon={PauseCircle} tone="slate" size="sm" />} title="Pause bot" sub="Agent replies only" right={<Toggle tone="emerald" />} />
        </Panel>
      </Float>
      <Float x={36} y={80} delay={6}>
        <Chip tone="slate">No code, no redeploy</Chip>
      </Float>
    </Stage>
  );
}

/** Queue assignment: inbox filters plus routed threads with owners. */
function QueueAssign({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet" shape="wide">
      <Float x={4} y={12} w={26} delay={0} rotate={-1}>
        <Panel title="Filters" icon={Filter} tone="violet">
          <Row title="Assigned to me" right={<Chip tone="violet">4</Chip>} active />
          <Row title="Needs help" right={<Chip tone="rose">2</Chip>} />
          <Row title="COD queue" right={<Chip tone="sky">6</Chip>} />
          <Row title="VIP" right={<Chip tone="amber">3</Chip>} />
        </Panel>
      </Float>
      <Float x={33} y={9} w={63} delay={2} z={3}>
        <Panel title="Assigned to me" icon={Inbox} tone="emerald" right={<Chip tone="emerald" dot>Routed by rules</Chip>}>
          <Row lead={<Avatar name="Riya Sharma" tone="sky" />} title="Riya Sharma" sub="COD order #1043 · ₹1,359" right={<><Chip tone="sky">COD</Chip><Avatar name="Priya" tone="emerald" /></>} active />
          <Row lead={<Avatar name="Ankit Kumar" tone="amber" />} title="Ankit Kumar" sub="12 orders · VIP" right={<><Chip tone="amber" icon={Crown}>VIP</Chip><Avatar name="Neha" tone="violet" /></>} />
          <Row lead={<Avatar name="Pooja Sehgal" tone="rose" />} title="Pooja Sehgal" sub="Refund for #1038" right={<><Chip tone="rose">Refund</Chip><Avatar name="Arjun" tone="sky" /></>} />
        </Panel>
      </Float>
      <Float x={40} y={70} delay={5} drift>
        <Chip tone="violet" solid icon={Zap}>COD confirms land with ops</Chip>
      </Float>
    </Stage>
  );
}

/** Takeover: agent takes control, AI and flows pause until release. */
function Takeover({ label }: SceneProps) {
  return (
    <Stage label={label} tone="rose" shape="wide">
      <Float x={5} y={8} w={44} delay={0}>
        <Stack gap={0.7}>
          <Bubble from="user" time="12:10">My parcel shows delivered but I did not get it.</Bubble>
          <Bubble from="biz" time="12:10" read>Sorry about that! Let me check order #1042.</Bubble>
        </Stack>
      </Float>
      <Float x={12} y={45} delay={2}>
        <Chip tone="rose" solid icon={Hand}>Priya took control</Chip>
      </Float>
      <Float x={5} y={56} w={44} delay={3}>
        <Bubble from="biz" time="12:11" read>Hi, Priya here. I have raised it with the courier now.</Bubble>
      </Float>
      <Float x={56} y={14} w={40} delay={4} z={3}>
        <Panel title="Automation" icon={Bot} tone="rose" right={<Chip tone="amber" dot>Paused</Chip>}>
          <Row lead={<IconTile icon={Bot} tone="violet" size="sm" />} title="AI replies" sub="Paused on this thread" right={<Toggle on={false} />} />
          <Row lead={<IconTile icon={Workflow} tone="sky" size="sm" />} title="Flow Builder" sub="Paused on this thread" right={<Toggle on={false} />} />
          <Row lead={<IconTile icon={GitFork} tone="emerald" size="sm" />} title="Chat rules" sub="Still routing" right={<Toggle tone="emerald" />} />
          <div style={{ marginTop: '0.7em' }}>
            <Btn tone="rose" primary icon={Undo2}>Release to bot</Btn>
          </div>
        </Panel>
      </Float>
    </Stage>
  );
}

const scenes: SceneMap = {
  '/marketing/solutions/sol-fashion-inbox.webp': bySlot({
    hero: RoutingHero,
    bento: KeywordRule,
    showcase: RoutingHero,
  }),
  '/marketing/features/intent-detection-lead.webp': IntentHandoff,
  '/marketing/customers/customers-outcome-inbox.webp': bySlot({
    bento: AssignFilters,
    showcase: Takeover,
  }),
  '/marketing/solutions/sol-fashion-inbox-saas.jpg': QueueAssign,
  '': RuleBuilder,
};

export default scenes;
