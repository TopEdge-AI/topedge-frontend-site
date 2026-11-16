/**
 * Chat rules scenes. v3 storytelling style, see flow-builder.tsx.
 * Keyword, intent and tag rules that route, assign and escalate chats.
 *
 * Two image paths are reused across a bento tile and a wide frame, and the
 * rule builder showcase has no image (''). A scene only receives its label,
 * so the shared keys pick a layout from the frame they are mounted in.
 */
import { useLayoutEffect, useRef, useState } from 'react';
import {
  Crown,
  Hand,
  Headphones,
  Inbox,
  MessageCircle,
  PauseCircle,
  Tag,
  Target,
  UserCheck,
  Workflow,
  Zap,
} from 'lucide-react';
import {
  Avatar,
  Btn,
  Bubble,
  Chip,
  Cursor,
  Field,
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
  type Scene,
  type SceneMap,
  type SceneProps,
} from '../kit';

/* ── Frame detection ───────────────────────────────────────────────────── */

type Slot = 'hero' | 'bento' | 'showcase';

/**
 * Render one of the given scenes depending on the frame this path is shown
 * in: the hero glow frame, a bento tile visual, or the wide showcase tab panel.
 */
function bySlot(scenes: { hero?: Scene; bento: Scene; showcase: Scene }): Scene {
  return function SlotScene({ label }: SceneProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [slot, setSlot] = useState<Slot | null>(null);
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      if (el.closest('.demo-video-glow__frame')) setSlot('hero');
      else if (el.closest('.mkt-pf__tile-visual')) setSlot('bento');
      else if (el.closest('.pfx-tabs__panel, .mkt-pf__shot.is-wide')) setSlot('showcase');
      else setSlot(el.closest('.mkt-pf__shot') ? 'bento' : 'showcase');
    }, []);
    if (!slot) return <span ref={ref} hidden />;
    const S = slot === 'hero' ? scenes.hero ?? scenes.showcase : scenes[slot];
    return <S label={label} />;
  };
}

/* ── Hero ──────────────────────────────────────────────────────────────── */

/** A message with "COD" arrives, the rule matches, the chat lands with Arjun. */
function RoutingHero({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8.5}>
      <Float x={4} y={22} w={26} at={0.2}>
        <Bubble from="user" time="12:08">
          <TypeText text="Can I cancel my COD order?" at={0.5} />
        </Bubble>
      </Float>
      <Float x={36} y={14} w={50} at={1.3} z={3}>
        <Panel title="Chat rules" icon={Workflow}>
          <Row lead={<IconTile icon={Tag} />} title="refund, return" sub="Assign to Support" right={<Toggle />} />
          <Row
            lead={<IconTile icon={Tag} />}
            title="COD, cancel"
            sub="Assign to Ops team"
            right={<Chip tone="emerald" dot>Matched</Chip>}
            active
          />
          <Row lead={<IconTile icon={Crown} />} title="Tag: VIP" sub="Assign to Priya" right={<Toggle />} />
        </Panel>
      </Float>
      <Float x={44} y={62} w={34} at={3.8} z={4}>
        <Node icon={UserCheck} tone="emerald" title="Assigned to Arjun" sub="Ops team · Live Chat" active />
      </Float>
    </Stage>
  );
}

/* ── Bento tiles: plain, one focal element ─────────────────────────────── */

/** A COD phrase matches a keyword rule and goes to Ops. */
function KeywordRule({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6.5}>
      <Rings x={50} y={52} count={4} gap={9} />
      <Wires paths={['M 50 32 L 50 42', 'M 50 63 L 50 72']} />
      <Float x={22} y={12} w={60} at={0.2}>
        <Bubble from="user" time="12:08">
          <TypeText text="COD cancel karna hai" at={0.5} />
        </Bubble>
      </Float>
      <Float x={14} y={42} w={72} at={1.8} z={3}>
        <Node icon={Tag} title="Keyword: COD" sub="Assign to Ops team" active />
      </Float>
      <Float x={30} y={72} at={3.2}>
        <Chip tone="emerald" dot>Assigned to Ops</Chip>
      </Float>
    </Stage>
  );
}

/** An escalation intent opens the right queue with history intact. */
function IntentHandoff({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Rings x={50} y={48} count={4} gap={10} />
      <Float x={39} y={34} at={0} z={3}>
        <IconTile icon={Headphones} size="xl" pulse />
      </Float>
      <Float x={8} y={14} at={1} drift>
        <Chip icon={Target}>Intent: human agent</Chip>
      </Float>
      <Float x={36} y={74} at={2.2} drift>
        <Chip tone="emerald" dot>Opened in Support</Chip>
      </Float>
    </Stage>
  );
}

/** Live Chat filters fill up as rules assign threads. */
function AssignFilters({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Glow x={50} y={50} size={22} />
      <Float x={10} y={20} w={80} at={0.2} z={3}>
        <Panel title="Live Chat" icon={Inbox}>
          <Reveal at={0.7}>
            <Row lead={<Avatar name="Arjun Rao" />} title="Assigned to me" sub="COD confirms" right="4" active />
          </Reveal>
          <Reveal at={1.4}>
            <Row lead={<IconTile icon={MessageCircle} />} title="Open" sub="All teams" right="12" />
          </Reveal>
          <Reveal at={2.1}>
            <Row lead={<IconTile icon={Hand} tone="amber" />} title="Needs help" sub="Escalated by rules" right={<Chip tone="amber">2</Chip>} />
          </Reveal>
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Wide panels: page mesh, one large card ────────────────────────────── */

/** Priya takes control: AI and flows pause, rules keep routing. */
function Takeover({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8.5}>
      <Float x={4} y={20} w={26} at={0.2}>
        <Bubble from="user" time="12:10">
          <TypeText text="The courier never called me." at={0.5} />
        </Bubble>
      </Float>
      <Float x={34} y={12} w={50} at={0.9} z={3}>
        <Panel title="Rahul Mehta" icon={MessageCircle} right={<Btn primary icon={Hand} pressAt={2.2}>Take control</Btn>}>
          <Reveal at={2.8}>
            <Row lead={<IconTile icon={PauseCircle} tone="amber" />} title="AI replies" sub="Paused on this chat" right={<Chip tone="amber">Paused</Chip>} />
          </Reveal>
          <Reveal at={3.3}>
            <Row lead={<IconTile icon={PauseCircle} tone="amber" />} title="Flows" sub="Paused on this chat" right={<Chip tone="amber">Paused</Chip>} />
          </Reveal>
          <Reveal at={3.8}>
            <Row lead={<IconTile icon={Workflow} tone="emerald" />} title="Chat rules" sub="Still routing" right={<Chip tone="emerald">On</Chip>} />
          </Reveal>
        </Panel>
      </Float>
      <Cursor
        path={[
          [90, 80, 1.2],
          [76, 17, 2],
          [76, 17, 2.6],
          [94, 50, 3.6],
        ]}
        clicks={[2.2]}
      />
      <Float x={56} y={62} w={30} at={5}>
        <Bubble from="biz" time="12:11" read>
          Hi, Priya here. Calling the courier now.
        </Bubble>
      </Float>
    </Stage>
  );
}

/** COD and VIP threads land with the right teammate. */
function QueueAssign({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7.5}>
      <Float x={10} y={12} w={52} at={0.2} z={3}>
        <Panel title="Queues" icon={Inbox}>
          <Reveal at={0.8}>
            <Row lead={<Avatar name="Arjun Rao" />} title="COD confirm" sub="Assigned to Arjun" right={<Chip tone="emerald">Assigned</Chip>} />
          </Reveal>
          <Reveal at={1.8}>
            <Row lead={<Avatar name="Priya Nair" />} title="VIP · Ananya" sub="Assigned to Priya" right={<Chip tone="emerald">Assigned</Chip>} />
          </Reveal>
          <Reveal at={2.8}>
            <Row lead={<IconTile icon={Hand} tone="amber" />} title="Damaged item" sub="Waiting for a teammate" right={<Chip tone="amber">Needs help</Chip>} />
          </Reveal>
        </Panel>
      </Float>
      <Float x={68} y={40} w={26} at={3.8}>
        <Panel glass title="My filters" icon={UserCheck}>
          <Row title="Assigned to me" sub="4 chats" />
          <Row title="Needs help" sub="2 chats" />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Pick a trigger, set the action, publish: the rule is live. */
function RuleBuilder({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={6} y={30} w={24} at={0}>
        <Panel glass title="Triggers" icon={Zap}>
          <Row title="Keyword" sub="refund, COD, human" />
          <Row title="Intent" sub="From AI Brain" />
          <Row title="Tag" sub="VIP, wholesale" />
        </Panel>
      </Float>
      <Float x={36} y={12} w={48} at={0.4} z={3}>
        <Panel title="New rule" icon={Workflow}>
          <Stack gap={0.8}>
            <Field label="When message has" value="refund, return" />
            <Reveal at={1.4}>
              <Field label="Then" value="Assign to Support, pause bot" />
            </Reveal>
            <Btn primary icon={Zap} pressAt={3}>Publish rule</Btn>
          </Stack>
        </Panel>
      </Float>
      <Cursor
        path={[
          [80, 82, 1.8],
          [60, 48, 2.8],
          [60, 48, 3.4],
          [74, 66, 4.4],
        ]}
        clicks={[3]}
      />
      <Float x={54} y={58} at={3.6}>
        <Chip tone="emerald" dot>Rule live</Chip>
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
