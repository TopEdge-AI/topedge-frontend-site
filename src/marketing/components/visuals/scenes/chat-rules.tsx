/**
 * Chat rules scenes (v7). Shown inside a realistic Live Chat inbox: a
 * message arrives, a rule matches, the chat lands with the right person.
 * Keys are the image paths in productPages.ts; reused paths go through
 * bySlot, and the image-less showcase ('') is the rule builder.
 */
import type { ReactNode } from 'react';
import {
  Bot,
  Check,
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
} from '../icons';
import {
  Attach,
  Avatar,
  Btn,
  Bubble,
  Chip,
  Cursor,
  Float,
  IconTile,
  Label,
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
  bySlot,
  type SceneMap,
  type SceneProps,
} from '../kit';

/** System line inside a conversation: "Assigned to Arjun by rule ...". */
function Sys({ icon, children, tone }: { icon: typeof Tag; children: ReactNode; tone?: 'emerald' | 'amber' }) {
  const Icon = icon;
  return (
    <span className="ch-sys" data-tone={tone}>
      <Icon />
      {children}
    </span>
  );
}

/** One conversation in the inbox list. */
function Convo({ name, last, when, unread, active, assignee }: { name: string; last: string; when: string; unread?: number; active?: boolean; assignee?: ReactNode }) {
  return (
    <div className={active ? 'ch-convo is-active' : 'ch-convo'}>
      <Avatar name={name} />
      <span className="ch-convo__text">
        <b>
          {name}
          <time>{when}</time>
        </b>
        <small>{last}</small>
      </span>
      {assignee ?? (unread ? <i className="ch-unread">{unread}</i> : null)}
    </div>
  );
}

/* ── Hero / showcase: routing in the inbox ─────────────────────────────── */

function RoutingHero({ label }: SceneProps) {
  return (
    <Stage label={label}
      steps={[[0, 'Message arrives'], [1.8, 'Rule matches'], [3.2, 'Assigned to Ops'], [5.7, 'Agent replies']]} shape="wide" duration={9}>
      <Float x={6} y={6} w={88}>
        <Panel pad={false} className="ch-inbox">
          <div className="ch-list">
            <div className="ch-list__head">
              <b>Live Chat</b>
              <Chip>All teams</Chip>
            </div>
            <Reveal at={0.6}>
              <Convo
                name="Rahul Mehta"
                last="Can I cancel my COD order?"
                when="now"
                active
                assignee={<Swap at={3.4} a={<i className="ch-unread">1</i>} b={<span className="ch-who"><Avatar name="Arjun Rao" /></span>} />}
              />
            </Reveal>
            <Convo name="Ananya Iyer" last="Thanks, received it!" when="2m" />
            <Convo name="Kabir Shah" last="Is the M size back?" when="9m" unread={2} />
            <Convo name="Meera Pillai" last="Refund status?" when="14m" />
          </div>
          <div className="ch-thread">
            <div className="ch-thread__head">
              <Avatar name="Rahul Mehta" />
              <span>
                <b>Rahul Mehta</b>
                <small>+91 98200 11223 · Order #1042 · COD</small>
              </span>
            </div>
            <div className="ch-thread__body">
              <Stack gap={0.55}>
                <Reveal at={0.8}>
                  <Bubble from="user" time="12:08">
                    Can I cancel my COD order?
                  </Bubble>
                </Reveal>
                <Reveal at={1.8}>
                  <Sys icon={Tag}>
                    Rule matched: <b>COD, cancel</b>
                  </Sys>
                </Reveal>
                <Reveal at={3.2}>
                  <Sys icon={UserCheck} tone="emerald">
                    Assigned to <b>Arjun · Ops team</b>
                  </Sys>
                </Reveal>
                <Reveal at={4.4} until={5.6}>
                  <Typing />
                </Reveal>
                <Reveal at={5.7}>
                  <Bubble from="biz" time="12:09" read>
                    Hi Rahul, Arjun here. I've cancelled #1042 for you. Anything else?
                  </Bubble>
                </Reveal>
              </Stack>
            </div>
          </div>
          <Attach place="tr" at={1.9} until={3.3} dx={-6} dy={2.4}>
            <Toast dark icon={Workflow} title="Rule: COD, cancel" sub="Assign to Ops team" />
          </Attach>
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Bento tiles ───────────────────────────────────────────────────────── */

/** A keyword in a Hinglish message matches a rule and routes the chat. */
function KeywordRule({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={12} w={80}>
        <Panel title="Rule · COD, cancel" icon={Tag} right={<Toggle />}>
          <div className="ch-msg">
            <Bubble from="user" time="12:08">
              <span className="ch-hl">COD</span> <span className="ch-hl ch-hl--2">cancel</span> karna hai
            </Bubble>
          </div>
          <Reveal at={1.6}>
            <Row lead={<IconTile icon={Target} tone="emerald" />} title="2 keywords matched" sub="COD · cancel" />
          </Reveal>
          <Reveal at={2.4}>
            <Row lead={<Avatar name="Arjun Rao" />} title="Assigned to Ops team" sub="Arjun picks it up" right={<Chip tone="emerald" icon={Check}>Routed</Chip>} />
          </Reveal>
        </Panel>
      </Float>
    </Stage>
  );
}

/** "Can I talk to a person?" opens straight in Support with context. */
function IntentHandoff({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={12} w={80}>
        <Panel title="Support" icon={Headphones} right={<Chip tone="emerald" dot>Priya online</Chip>}>
          <div className="ch-msg">
            <Stack gap={0.5}>
              <Bubble from="user" time="16:40">
                Can I talk to a person please?
              </Bubble>
              <Reveal at={1.2}>
                <Sys icon={Target}>
                  Intent: <b>human agent</b> · bot paused
                </Sys>
              </Reveal>
              <Reveal at={2.2}>
                <Bubble from="biz" time="16:40" read>
                  Hi, I'm Priya. I can see order #2087, how can I help?
                </Bubble>
              </Reveal>
            </Stack>
          </div>
        </Panel>
      </Float>
    </Stage>
  );
}

/** Filters an agent actually lives in: mine, open, needs help. */
function AssignFilters({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={14} w={80}>
        <Panel title="Live Chat" icon={Inbox}>
          <Row lead={<Avatar name="Arjun Rao" />} title="Assigned to me" sub="COD confirms" right={<span className="ch-count">4</span>} active />
          <Row lead={<IconTile icon={MessageCircle} />} title="Open" sub="All teams" right={<span className="ch-count">12</span>} />
          <Reveal at={1.4}>
            <Row lead={<IconTile icon={Hand} tone="amber" />} title="Needs help" sub="Escalated by a rule" right={<Chip tone="amber">2</Chip>} />
          </Reveal>
          <Row lead={<IconTile icon={Crown} />} title="VIP" sub="Tagged by Shopify" right={<span className="ch-count">3</span>} />
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Showcases ─────────────────────────────────────────────────────────── */

/** An agent takes control: AI and flows pause on this chat, rules keep routing. */
function Takeover({ label }: SceneProps) {
  return (
    <Stage label={label}
      steps={[[0, 'AI replies'], [2.2, 'Agent takes control'], [2.8, 'AI and flows pause'], [4.2, 'Agent replies']]} shape="wide" duration={9.5}>
      <Float x={14} y={6} w={72}>
        <Panel pad={false} className="ch-inbox ch-inbox--one">
          <div className="ch-thread">
            <div className="ch-thread__head">
              <Avatar name="Rahul Mehta" />
              <span>
                <b>Rahul Mehta</b>
                <small>Order #1042 · Out for delivery</small>
              </span>
              <span className="ch-take" data-cursor="take">
                <Swap
                  at={2.5}
                  a={<Btn primary icon={Hand} pressAt={2.2}>Take control</Btn>}
                  b={<Chip tone="amber" icon={PauseCircle}>AI and flows paused</Chip>}
                />
              </span>
            </div>
            <div className="ch-thread__body">
              <Stack gap={0.55}>
                <Bubble from="user" time="12:10">
                  The courier never called me.
                </Bubble>
                <Reveal at={0.9}>
                  <Bubble from="biz" time="12:10">
                    <span className="ch-ai"><Bot /> AI</span> Sorry about that! Let me check with the courier.
                  </Bubble>
                </Reveal>
                <Reveal at={2.8}>
                  <Sys icon={UserCheck} tone="amber">
                    <b>Priya</b> took control · AI replies paused on this chat
                  </Sys>
                </Reveal>
                <Reveal at={4.2}>
                  <Bubble from="biz" time="12:11" read>
                    <TypeText text="Hi Rahul, Priya here. I've called the courier, they'll reach you by 4 pm." at={4.3} cps={40} />
                  </Bubble>
                </Reveal>
              </Stack>
            </div>
          </div>
          <Attach place="r" at={3.2} dx={3} dy={-2}>
            <Toast icon={Workflow} tone="emerald" title="Chat rules still on" sub="Routing and tags keep working" />
          </Attach>
        </Panel>
      </Float>
      <Cursor path={[[70, 98, 1.2], ['take', 1.9], ['take', 2.5], [80, 96, 3.6]]} clicks={[2.2]} />
    </Stage>
  );
}

/** Queues fill up and each chat lands with the right person. */
function QueueAssign({ label }: SceneProps) {
  const who = (at: number, name: string) => (
    <Swap at={at} a={<Chip>Unassigned</Chip>} b={<span className="ch-who ch-who--named"><Avatar name={name} />{name.split(' ')[0]}</span>} />
  );
  return (
    <Stage label={label}
      steps={[[0, 'Chats queue by team'], [1, 'Right agent, automatically'], [3, 'Escalations flagged']]} shape="wide" duration={8}>
      <Float x={16} y={6} w={64}>
        <Panel title="Queues" icon={Inbox} right={<Chip>3 agents online</Chip>}>
          <Label>Ops</Label>
          <Row lead={<Avatar name="Rahul Mehta" />} title="COD confirm · #1042" sub="Keyword: COD" right={who(1, 'Arjun Rao')} />
          <Label>VIP</Label>
          <Row lead={<Avatar name="Ananya Iyer" />} title="Exchange request" sub="Tag: VIP" right={who(2, 'Priya Nair')} />
          <Label>Support</Label>
          <Row lead={<Avatar name="Kabir Shah" />} title="Damaged item" sub="Photo attached" right={<Swap at={3} a={<Chip>Unassigned</Chip>} b={<Chip tone="amber" icon={Hand}>Needs help</Chip>} />} active />
          <Attach place="br" at={3.6} dx={1.6} dy={-1}>
            <Toast icon={UserCheck} tone="emerald" title="Average pickup 42s" sub="Today, all queues" />
          </Attach>
        </Panel>
      </Float>
    </Stage>
  );
}

/** Build a rule: when the message has these words, assign and pause the bot. */
function RuleBuilder({ label }: SceneProps) {
  return (
    <Stage label={label}
      steps={[[0, 'Keywords'], [2, 'Actions'], [3.9, 'Publish']]} shape="wide" duration={8.5}>
      <Float x={18} y={6} w={60}>
        <Panel title="New rule" icon={Workflow}>
          <Label>When a message contains</Label>
          <div className="ch-keys">
            <span>refund</span>
            <Reveal at={0.8}>
              <span>return</span>
            </Reveal>
            <Reveal at={1.4}>
              <span>paisa wapas</span>
            </Reveal>
          </div>
          <Label>Then</Label>
          <Reveal at={2}>
            <Row lead={<IconTile icon={UserCheck} />} title="Assign to Support" sub="Round robin · 3 agents" />
          </Reveal>
          <Reveal at={2.6}>
            <Row lead={<IconTile icon={PauseCircle} />} title="Pause the bot" sub="Until an agent replies" right={<Toggle />} />
          </Reveal>
          <div className="ch-publish" data-cursor="publish">
            <Swap at={4.2} a={<Btn primary icon={Zap} pressAt={3.9}>Publish rule</Btn>} b={<Chip tone="emerald" dot>Rule live · applies to new chats</Chip>} />
          </div>
        </Panel>
      </Float>
      <Cursor path={[[70, 98, 3], ['publish', 3.6], ['publish', 4.2], [70, 96, 5.2]]} clicks={[3.9]} />
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
