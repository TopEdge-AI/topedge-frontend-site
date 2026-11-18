/**
 * Flow Builder scenes (v7). Flows shown working: a real canvas, live
 * Shopify reads, a human taking over, and a simulator run on a phone.
 * Keys are the image paths in productPages.ts.
 */
import type { CSSProperties, ReactNode } from 'react';
import {
  Bot,
  Check,
  ExternalLink,
  Folder,
  List,
  MessageCircle,
  Package,
  Play,
  ShopifyLogo,
  User,
  UserCheck,
  Webhook,
  Zap,
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
  type IconType,
  type SceneMap,
  type SceneProps,
} from '../kit';

const vars = (o: Record<string, string | number>) => o as unknown as CSSProperties;

function Sys({ icon: Icon, children, tone }: { icon: IconType; children: ReactNode; tone?: 'emerald' | 'amber' }) {
  return (
    <span className="ch-sys" data-tone={tone}>
      <Icon />
      {children}
    </span>
  );
}

/* ── Bento tiles ───────────────────────────────────────────────────────── */

/** A shopper asks; the flow reads Shopify live; the answer comes back. */
function ShopifyTools({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7.5}>
      <Float x={10} y={10} w={80}>
        <Panel title="Order status bot" icon={Zap} right={<Chip tone="emerald" dot>Live</Chip>}>
          <div className="ch-msg fb-chat">
            <Stack gap={0.5}>
              <Bubble from="user" time="11:02">
                <TypeText text="Where is my order?" at={0.3} cps={20} />
              </Bubble>
              <Reveal at={1.4}>
                <Sys icon={ShopifyLogo}>
                  Fetch order · <b>#1042 found</b>
                </Sys>
              </Reveal>
              <Reveal at={2.4}>
                <Bubble from="biz" time="11:02" read buttons={[{ label: 'Track parcel', icon: ExternalLink }]}>
                  #1042 is out for delivery and arrives today by 6 pm.
                </Bubble>
              </Reveal>
            </Stack>
          </div>
        </Panel>
      </Float>
    </Stage>
  );
}

/** The shopper asks for a human; the bot pauses; Priya picks it up with context. */
function Handoff({ label }: SceneProps) {
  return (
    <Stage label={label} duration={8}>
      <Float x={10} y={10} w={80}>
        <Panel title="Rahul Mehta" icon={MessageCircle} right={<Swap at={1.6} a={<Chip tone="emerald" dot>Bot</Chip>} b={<Chip tone="amber" dot>Live Chat</Chip>} />}>
          <div className="ch-msg fb-chat">
            <Stack gap={0.5}>
              <Bubble from="user" time="11:04">
                <TypeText text="Can I talk to a person?" at={0.3} cps={20} />
              </Bubble>
              <Reveal at={1.6}>
                <Sys icon={Bot} tone="amber">
                  Bot paused · opened in Live Chat
                </Sys>
              </Reveal>
              <Reveal at={2.4}>
                <Sys icon={UserCheck} tone="emerald">
                  <b>Priya</b> joined · sees order #1042
                </Sys>
              </Reveal>
              <Reveal at={3.3}>
                <Bubble from="biz" time="11:05" read>
                  Hi Rahul, Priya here. How can I help with #1042?
                </Bubble>
              </Reveal>
            </Stack>
          </div>
        </Panel>
      </Float>
    </Stage>
  );
}

/** Store events land in real time, so answers use current data. */
function WebhookSync({ label }: SceneProps) {
  const ev = (topic: string, sub: string, at: number) => (
    <Reveal at={at}>
      <Row lead={<span className="pl-logo"><ShopifyLogo /></span>} title={topic} sub={sub} right={<span className="fb-ok">200</span>} />
    </Reveal>
  );
  return (
    <Stage label={label} duration={7.5}>
      <Float x={10} y={12} w={80}>
        <Panel title="Shopify webhooks" icon={Webhook} right={<Chip tone="emerald" dot>Listening</Chip>}>
          {ev('fulfillments/create', '#1042 · Delhivery · just now', 2.2)}
          {ev('orders/create', '#1043 · ₹1,890 · 4s ago', 1.3)}
          {ev('checkouts/update', 'Cart ₹3,450 · 9s ago', 0.4)}
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Showcases ─────────────────────────────────────────────────────────── */

/** Folders and flows; a new flow is switched on and published. */
function FlowList({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={10} y={6} w={80}>
        <Panel pad={false} className="ch-inbox fb-list">
          <div className="ch-list">
            <div className="ch-list__head">
              <b>Folders</b>
            </div>
            <Row lead={<IconTile icon={Folder} size="sm" />} title="Support" sub="4 flows" active />
            <Row lead={<IconTile icon={Folder} size="sm" />} title="Sales" sub="3 flows" />
            <Row lead={<IconTile icon={Folder} size="sm" />} title="COD" sub="2 flows" />
          </div>
          <div className="fb-flows">
            <div className="ch-thread__head">
              <span>
                <b>Support</b>
                <small>Runs on inbound WhatsApp</small>
              </span>
              <span data-cursor="publish" className="ch-take">
                <Swap at={3.2} a={<Btn primary icon={Zap} pressAt={2.9}>Publish</Btn>} b={<Chip tone="emerald" icon={Check}>Published</Chip>} />
              </span>
            </div>
            <div className="fb-flows__body">
              <Row lead={<IconTile icon={MessageCircle} />} title="Welcome menu" sub="First message of any chat" right={<Toggle />} />
              <Row lead={<IconTile icon={Package} />} title="Order status bot" sub="Reads live from Shopify" right={<Toggle />} />
              <Row
                lead={<IconTile icon={List} />}
                title="Returns and FAQ"
                sub="New flow · 6 steps"
                right={
                  <span data-cursor="toggle" style={vars({ '--fv-toggle-at': '1.6s' })}>
                    <Toggle />
                  </span>
                }
                active
              />
            </div>
          </div>
          <Attach place="br" at={3.6} dx={1.6} dy={-1}>
            <Toast dark icon={Zap} title="Live for the next message" sub="3 flows active in Support" />
          </Attach>
        </Panel>
      </Float>
      <Cursor path={[[70, 98, 0.4], ['toggle', 1.3], ['toggle', 1.8], ['publish', 2.6], ['publish', 3.2], [86, 94, 4.2]]} clicks={[1.6, 2.9]} />
    </Stage>
  );
}

/** The canvas: the welcome menu branches; a shopper taps Track order; the path lights. */
function Canvas({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8.5}>
      <Float x={4} y={4} w={92}>
        <div className="fb-canvas">
          <div className="fb-canvas__bar">
            <b>Welcome menu</b>
            <Chip tone="emerald" dot>Published</Chip>
            <span className="fb-canvas__zoom">100%</span>
          </div>
          <div className="fb-canvas__plot">
            <svg className="fb-links" viewBox="0 0 100 60" preserveAspectRatio="none">
              <path d="M 34 30 C 42 30, 42 11, 52 11" />
              <path d="M 34 30 L 52 30" />
              <path d="M 34 30 C 42 30, 42 49, 52 49" />
              <path className="fb-links__hot" d="M 34 30 C 42 30, 42 11, 52 11" />
            </svg>
            <div className="fb-node" style={vars({ left: '6%', top: '50%' })}>
              <span className="fb-node__kind">Trigger</span>
              <Row lead={<IconTile icon={MessageCircle} tone="emerald" />} title="Welcome" sub="Any first message" />
            </div>
            <div className="fb-node fb-node--hot" style={vars({ left: '52%', top: '18%', '--hot': '3s' })}>
              <span className="fb-node__kind">Button · Track order</span>
              <Row lead={<IconTile icon={Package} />} title="Fetch order" sub="Shopify · latest order" right={<ShopifyLogo />} />
            </div>
            <div className="fb-node" style={vars({ left: '52%', top: '50%' })}>
              <span className="fb-node__kind">Button · Browse</span>
              <Row lead={<IconTile icon={List} />} title="Send catalog" sub="5 collections" />
            </div>
            <div className="fb-node" style={vars({ left: '52%', top: '82%' })}>
              <span className="fb-node__kind">Button · Talk to us</span>
              <Row lead={<IconTile icon={User} />} title="Open Live Chat" sub="Support team" />
            </div>
          </div>
          <Attach place="tr" at={3.3} dx={-1} dy={6}>
            <Toast icon={Package} tone="emerald" title="Rahul tapped Track order" sub="#1042 sent in 1.2 s" />
          </Attach>
        </div>
      </Float>
    </Stage>
  );
}

/** Test Flow: the simulator taps through on a phone, and every step passes. */
function Simulator({ label }: SceneProps) {
  const step = (title: string, sub: string, at: number) => (
    <Reveal at={at}>
      <Row lead={<span className="fb-pass"><Check /></span>} title={title} sub={sub} right={<Chip tone="emerald">Pass</Chip>} />
    </Reveal>
  );
  return (
    <Stage label={label} shape="wide" duration={11}>
      {/* Act 1: the simulator plays the flow on a test phone */}
      <Float x={34.1} y={4.6} until={6.2} act="out">
        <IPhone name="Your store" status="Test mode">
          <Reveal at={0.6}>
            <Bubble from="biz" time="11:06" buttons={[{ label: 'Track order', at: 2.6, cursor: 'track' }, 'Browse', 'Talk to us']}>
              Hi! How can we help today?
            </Bubble>
          </Reveal>
          <Reveal at={2.9}>
            <Bubble from="user" time="11:06" read>
              Track order
            </Bubble>
          </Reveal>
          <Reveal at={3.5} until={4.8}>
            <Typing />
          </Reveal>
          <Reveal at={4.9}>
            <Bubble from="biz" time="11:06">
              #1042 is out for delivery today.
            </Bubble>
          </Reveal>
        </IPhone>
      </Float>

      {/* Act 2: the report, then publish */}
      <Float x={29} y={20} w={42} at={6.4} act="in">
        <Panel title="Test Flow" icon={Play} right={<Chip>Simulator</Chip>}>
          {step('Welcome', 'Menu with 3 buttons', 6.9)}
          {step('Track order', 'Button tapped', 7.2)}
          {step('Fetch order', 'Answered in 1.2 s', 7.5)}
          <div className="cp-send" data-cursor="publish">
            <Swap at={8.9} a={<Btn primary icon={Zap} pressAt={8.6}>Publish flow</Btn>} b={<Chip tone="emerald" icon={Check}>Live for the next message</Chip>} />
          </div>
        </Panel>
      </Float>
      <Cursor touch path={[['track', 2.3], ['track', 2.9]]} clicks={[2.6]} />
      <Cursor path={[[56, 98, 7.8], ['publish', 8.3], ['publish', 8.9], [62, 96, 9.8]]} clicks={[8.6]} />
    </Stage>
  );
}

const scenes: SceneMap = {
  '/flow-sub-feature/7.webp': ShopifyTools,
  '/flow-sub-feature/9.webp': Handoff,
  '/flow-sub-feature/8.webp': WebhookSync,
  '/flow-sub-feature/14.webp': FlowList,
  '/flow-sub-feature/15.webp': Canvas,
  '/flow-sub-feature/13.webp': Simulator,
};

export default scenes;
