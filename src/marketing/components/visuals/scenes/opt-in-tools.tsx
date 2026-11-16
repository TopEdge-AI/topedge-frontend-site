/**
 * Opt-in Tools scenes, v3 storytelling style (see flow-builder.tsx).
 *
 * Square tiles: plain white, one focal element, at most two small pieces.
 * Wide panels: page mesh backdrop, one large white card, one or two satellites.
 * Each scene plays a short story with `at` timings, then replays.
 * Keys are the image paths in productPages.ts.
 */
import type { CSSProperties } from 'react';
import {
  Check,
  Clock,
  Copy,
  Gift,
  Hand,
  Home,
  MessageCircle,
  MousePointerClick,
  Percent,
  ShoppingCart,

  Truck,
  Users,
} from 'lucide-react';
import {
  Avatar,
  Bubble,
  Burst,
  Chip,
  Cursor,
  Float,
  Glow,
  IconTile,
  Panel,
  Reveal,
  Rings,
  Row,
  Stage,
  Toggle,
  TypeText,
  type IconType,
  type SceneMap,
  type SceneProps,
} from '../kit';
import '../../../styles/optin-scenes.css';

/* ── Bento tiles: plain, one focal element ─────────────────────────────── */

/** Every signup lands on one consented list: a new subscriber slides in on top. */
function SubscriberList({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Glow x={50} y={56} size={22} />
      <Float x={12} y={22} w={76} delay={0} z={3} fade="bottom">
        <Panel title="Subscribers" icon={Users}>
          <Reveal at={1.2}>
            <Row
              lead={<Avatar name="Ananya Rao" />}
              title="Ananya Rao"
              sub="Spin to win · just now"
              right={<Chip tone="emerald" dot>Opted in</Chip>}
              active
            />
          </Reveal>
          <Row
            lead={<Avatar name="Kabir Shah" />}
            title="Kabir Shah"
            sub="Welcome popup · 9m"
            right={<Chip tone="emerald" dot>Opted in</Chip>}
          />
          <Row
            lead={<Avatar name="Meera Pillai" />}
            title="Meera Pillai"
            sub="Widget · 21m"
            right={<Chip tone="emerald" dot>Opted in</Chip>}
          />
          <Row
            lead={<Avatar name="Rohan Das" />}
            title="Rohan Das"
            sub="Pulse Drop · 1h"
            right={<Chip tone="emerald" dot>Opted in</Chip>}
          />
        </Panel>
      </Float>
      <Float x={35} y={10} at={2}>
        <Chip icon={Users}>+38 today</Chip>
      </Float>
    </Stage>
  );
}

/** When, where and to whom the popup shows. */
function Triggers({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Glow x={50} y={50} size={22} />
      <Float x={13} y={22} w={74} delay={0} z={3}>
        <Panel title="Show popup when">
          <Row lead={<IconTile icon={MousePointerClick} />} title="Exit intent" right={<Toggle />} active />
          <Row lead={<IconTile icon={Clock} />} title="After 8 seconds" right={<Toggle />} />
          <Row lead={<IconTile icon={ShoppingCart} />} title="Add to cart" right={<Toggle on={false} />} />
        </Panel>
      </Float>
      <Float x={30} y={76} at={2.4}>
        <Chip dot>On product pages</Chip>
      </Float>
      <Cursor
        path={[
          [62, 88, 0.3],
          [76, 44, 1.2],
          [70, 82, 2.4],
        ]}
        clicks={[1.35]}
      />
    </Stage>
  );
}

/** A floating chat button: tap it, leave a number, WhatsApp opens. */
function Widget({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Rings x={64} y={66} count={4} gap={9} />
      <Float x={54} y={52} delay={0} z={3}>
        <IconTile icon={MessageCircle} size="xl" pulse />
      </Float>
      <Float x={8} y={20} w={60} at={1.7}>
        <Bubble from="biz">Get order updates on WhatsApp?</Bubble>
      </Float>
      <Float x={10} y={74} at={3.2}>
        <Chip tone="emerald" dot>Number saved</Chip>
      </Float>
      <Cursor
        path={[
          [30, 92, 0.3],
          [66, 66, 1.1],
        ]}
        clicks={[1.25]}
      />
    </Stage>
  );
}

/* ── Wide panels: the real storefront popups, animated ──────────────────── */
/*
 * These recreate the actual TopEdge AI opt-in popups (Scratch & Win, the spin
 * reel, Pulse Drop, the welcome popup) with a sample store, "Nova Home".
 * Timings are seconds from scene start, passed as CSS variables; see
 * styles/optin-scenes.css.
 */

const sec = (n: number) => `${n}s`;
const vars = (o: Record<string, string | number>) => o as unknown as CSSProperties;

function Logo() {
  return (
    <span className="oi-logo">
      <span className="oi-logo__mark">
        <Home strokeWidth={2.4} />
      </span>
      <span className="oi-logo__word">
        <b>NOVA</b>
        <small>HOME</small>
      </span>
    </span>
  );
}

function Powered() {
  return (
    <span className="oi-powered">
      <i />
      Powered by TopEdge AI
    </span>
  );
}

function Consent({ tick, text = 'I agree to receive order updates and offers on WhatsApp.' }: { tick: number; text?: string }) {
  return (
    <span className="oi-consent">
      <span className="oi-box" data-cursor={`tick-${tick}`} style={vars({ '--tick': sec(tick) })} />
      <span>{text}</span>
    </span>
  );
}

function PhoneField({ at, number = '98765 43210' }: { at: number; number?: string }) {
  return (
    <span className="oi-phone">
      <b>+91</b>
      <span>
        <TypeText text={number} at={at} cps={14} />
      </span>
    </span>
  );
}

function CodeTicket({ code, copyAt, rise }: { code: string; copyAt: number; rise?: number }) {
  return (
    <div
      className={rise !== undefined ? 'oi-ticket oi-ticket--rise' : 'oi-ticket'}
      style={rise !== undefined ? vars({ '--show': sec(rise) }) : undefined}
    >
      <small>YOUR CODE</small>
      <b>{code}</b>
      <span className="oi-copy" data-cursor={`copy-${code}-${copyAt}`} style={vars({ '--press': sec(copyAt) })}>
        <Copy strokeWidth={2.4} />
        Copy code
      </span>
    </div>
  );
}

/** Pulse Drop: tap the glowing orb, the offer unlocks, the code is copied. */
function PulseDrop({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={14} y={8} w={34} at={0} z={2}>
        <div className="oi-pop" style={{ transform: 'rotate(-3deg)' }}>
          <span className="oi-close">✕</span>
          <h4 className="oi-title">Your glow drop is ready</h4>
          <p className="oi-sub">Tap once to reveal your offer, then claim it on WhatsApp.</p>
          <div className="oi-orb" data-cursor="orb" style={vars({ '--tap': sec(1.6) })} />
          <div className="oi-tap">Tap to open</div>
          <Powered />
        </div>
      </Float>
      <Float x={46} y={20} w={40} at={2.4} z={3}>
        <div className="oi-pop" style={{ transform: 'rotate(2.5deg)' }}>
          <span className="oi-close">✕</span>
          <p className="oi-sub" style={{ color: '#7c3aed', fontWeight: 700, marginTop: 0 }}>
            Offer unlocked
          </p>
          <h4 className="oi-title">Locked in</h4>
          <p className="oi-sub">Your coupon code</p>
          <div className="oi-coupon-v">
            <i>OFFER</i>
            <div>
              <small>CODE</small>
              <b>FREESHIP</b>
            </div>
            <span>
              <span className="oi-cta oi-cta--violet" data-cursor="copy" style={vars({ '--press': sec(4.2), marginTop: 0, padding: '0.5em 1em' })}>
                Copy
              </span>
            </span>
          </div>
          <Powered />
        </div>
      </Float>
      <Burst x={66} y={40} at={2.6} />
      <Float x={52} y={86} at={4.6}>
        <Chip solid icon={MessageCircle}>Claimed on WhatsApp</Chip>
      </Float>
      <Cursor path={[[44, 96, 0.6], ['orb', 1.4], ['orb', 1.9], ['copy', 3.9], ['copy', 4.6]]} clicks={[1.6, 4.2]} />
    </Stage>
  );
}

/** Welcome popup: the number types in, consent ticks, the code arrives on WhatsApp. */
function WelcomePopup({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8.5}>
      <Float x={22} y={4} w={38} at={0} z={3}>
        <div className="oi-pop oi-pop--banner">
          <div className="oi-banner">
            <small>New</small>
            <b>Smart Doorbell Ultra, our best yet.</b>
            <span>Shop now</span>
            <i className="oi-banner__device" />
          </div>
          <div className="oi-body">
            <Logo />
            <div className="oi-stack">
              <div className="oi-x oi-x--hide" style={vars({ '--show': sec(0.3), '--hide': sec(4.4) })}>
                <h4 className="oi-title">Get 10% OFF your first order</h4>
                <p className="oi-sub">Enter your number to unlock your code.</p>
              </div>
              <div className="oi-x" style={vars({ '--show': sec(4.6) })}>
                <h4 className="oi-title">You are in!</h4>
                <p className="oi-sub">Your code is on its way to WhatsApp.</p>
              </div>
            </div>
            <PhoneField at={1.1} />
            <Consent tick={3.1} />
            <span className="oi-cta" data-cursor="unlock" style={vars({ '--press': sec(3.8), width: '100%' })}>
              Unlock 10% off
            </span>
            <Powered />
          </div>
        </div>
      </Float>
      <Float x={64} y={44} w={26} at={5.2}>
        <Bubble from="biz" time="11:02" read>
          Here is your 10% off code: <b>WELCOME10</b>
        </Bubble>
      </Float>
      <Cursor path={[[44, 98, 0.4], ['tick-3.1', 2.8], ['tick-3.1', 3.3], ['unlock', 3.6], ['unlock', 4.2]]} clicks={[3.1, 3.8]} />
    </Stage>
  );
}

/** Spin reel: Spin, the reel rolls and lands on 5% off, number in, code won. */
function Spin({ label }: SceneProps) {
  const prizes: [string, string, IconType][] = [
    ['Free SD card', '#94a3b8', Gift],
    ['10% off', '#f43f5e', Percent],
    ['Free shipping', '#10b981', Truck],
    ['5% off', '#14532d', Percent],
    ['Free bracket', '#0ea5e9', Gift],
    ['Free SD card', '#94a3b8', Gift],
    ['10% off', '#f43f5e', Percent],
    ['5% off', '#14532d', Percent],
    ['Free bracket', '#0ea5e9', Gift],
  ];
  // Each pill is ~2.9em tall with gap; land the 8th (index 7, "5% off") on the arrow.
  const step = 2.95;
  return (
    <Stage label={label} shape="wide" duration={9}>
      <Float x={14} y={10} w={64} at={0} z={3} until={5.6}>
        <div className="oi-pop oi-pop--row">
          <span className="oi-close">✕</span>
          <div className="oi-reel">
            <span className="oi-ticks" />
            <span className="oi-reel__arrow" />
            <div
              className="oi-reel__track"
              style={vars({
                '--from': `${-2.5 * step}em`,
                '--land': `${-(7 + 0.5) * step}em`,
                '--spin': sec(1.2),
                '--spin-dur': sec(2.6),
              })}
            >
              {prizes.map(([t, c, Icon], i) => (
                <span key={`${t}-${i}`} className={i === 7 ? 'oi-prize is-win' : 'oi-prize'} style={vars({ '--c': c })}>
                  <i>
                    <Icon strokeWidth={2.6} />
                  </i>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <Logo />
            <h4 className="oi-title">Unlock your store discount</h4>
            <p className="oi-sub">Spin to win up to 10% off or free shipping.</p>
            <div className="oi-stack">
              <span className="oi-x oi-x--hide" style={vars({ '--show': sec(0.2), '--hide': sec(1.25) })}>
                <span className="oi-cta" data-cursor="spin" style={vars({ '--press': sec(1) })}>
                  Spin now
                </span>
              </span>
              <span className="oi-x oi-x--hide" style={vars({ '--show': sec(1.3), '--hide': sec(3.8) })}>
                <span className="oi-cta">Spinning...</span>
              </span>
              <span className="oi-x" style={vars({ '--show': sec(3.9) })}>
                <Consent tick={4.3} text="I agree to the Privacy Policy and Terms." />
                <PhoneField at={4.6} number="93130 45439" />
              </span>
            </div>
            <Powered />
          </div>
        </div>
      </Float>
      <Float x={30} y={6} w={40} at={5.8} z={3}>
        <div className="oi-pop">
          <span className="oi-close">✕</span>
          <div className="oi-success">
            <Check strokeWidth={3} />
          </div>
          <h4 className="oi-title">Congratulations!</h4>
          <p className="oi-sub">
            Boom! You won <span className="oi-won">5% off</span>
          </p>
          <div style={{ marginTop: '1em' }}>
            <CodeTicket code="OFF5" copyAt={7.2} />
          </div>
          <p className="oi-sub" style={{ fontSize: '0.78em' }}>
            Apply it at checkout to claim your savings.
          </p>
          <Powered />
        </div>
      </Float>
      <Burst x={50} y={22} at={6} />
      <Cursor path={[[60, 98, 0.2], ['spin', 0.85], ['spin', 1.4], ['tick-4.3', 4.1], ['tick-4.3', 4.6], ['copy-OFF5-7.2', 6.9], ['copy-OFF5-7.2', 7.6]]} clicks={[1, 4.3, 7.2]} />
    </Stage>
  );
}

/** Scratch & Win: the foil scratches away, 5% off, number in, the code rises up. */
function Mystery({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={9}>
      <Float x={31} y={2} w={38} at={0} z={3}>
        <div className="oi-pop">
          <span className="oi-close">✕</span>
          <Logo />
          <div className="oi-stack">
            <div className="oi-x oi-x--hide" style={vars({ '--show': sec(0.2), '--hide': sec(2.9) })}>
              <h4 className="oi-title">
                Scratch &amp; Win
              </h4>
              <p className="oi-sub">Scratch the foil, then claim it at checkout.</p>
            </div>
            <div className="oi-x oi-x--hide" style={vars({ '--show': sec(3), '--hide': sec(5.6) })}>
              <h4 className="oi-title">Nice! Unlock your code</h4>
              <p className="oi-sub">Add your WhatsApp number to get it.</p>
            </div>
            <div className="oi-x" style={vars({ '--show': sec(5.7) })}>
              <h4 className="oi-title">Hooray! You unlocked a prize</h4>
              <p className="oi-sub">Your coupon is on the card.</p>
            </div>
          </div>
          <div className="oi-card">
            <div className="oi-dark">
              <small>Woahh!</small>
              <b>5%</b>
              <em>OFF</em>
            </div>
            <i data-cursor="scratch-a" style={{ position: 'absolute', left: '22%', top: '20%' }} />
            <i data-cursor="scratch-b" style={{ position: 'absolute', left: '76%', top: '34%' }} />
            <i data-cursor="scratch-c" style={{ position: 'absolute', left: '20%', top: '50%' }} />
            <i data-cursor="scratch-d" style={{ position: 'absolute', left: '78%', top: '64%' }} />
            <i data-cursor="scratch-e" style={{ position: 'absolute', left: '30%', top: '80%' }} />
            <div className="oi-foil" style={vars({ '--scratch': sec(1.1) })}>
              {Array.from({ length: 6 }, (_, k) => (
                <i key={k} style={vars({ '--k': k })} />
              ))}
            </div>
            <div className="oi-foil__label" style={vars({ '--scratch': sec(1.1) })}>
              <Hand strokeWidth={1.6} />
              <b>
                SCRATCH
                <br />
                TO WIN
              </b>
            </div>
            <span className="oi-ribbon oi-x oi-x--hide" style={vars({ '--show': sec(0), '--hide': sec(1.2) })}>
              Congratulations!
            </span>
            <CodeTicket code="OFF5" copyAt={7.4} rise={5.9} />
          </div>
          <div className="oi-x" style={vars({ '--show': sec(3.2) })}>
            <Consent tick={3.9} />
            <PhoneField at={4.3} number="93130 45439" />
          </div>
          <Powered />
        </div>
      </Float>
      <Burst x={50} y={40} at={2.6} />
      <Burst x={50} y={56} at={6.1} />
      <Cursor
        path={[[64, 98, 0.3], ['scratch-a', 1.0], ['scratch-b', 1.4], ['scratch-c', 1.8], ['scratch-d', 2.2], ['scratch-e', 2.6], ['tick-3.9', 3.6], ['tick-3.9', 4.1], ['copy-OFF5-7.4', 7.0], ['copy-OFF5-7.4', 7.7]]}
        clicks={[3.9, 7.4]}
      />
    </Stage>
  );
}

const scenes: SceneMap = {
  '/opt-in-sub-feature/10.webp': SubscriberList,
  '/opt-in-sub-feature/11.webp': Triggers,
  '/opt-in-sub-feature/12.webp': Widget,
  '/opt-in-sub-feature/16.webp': PulseDrop,
  '/opt-in-sub-feature/17.webp': WelcomePopup,
  '/opt-in-sub-feature/18.webp': Spin,
  '/opt-in-sub-feature/19.webp': Mystery,
};

export default scenes;
