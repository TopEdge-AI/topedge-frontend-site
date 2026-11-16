/**
 * Opt-in Tools scenes (v7).
 *
 * The showcases recreate the real TopEdge AI storefront popups for a sample
 * store, "Nova Home", and follow the shopper the whole way: popup, WhatsApp
 * on their phone, the link, checkout, order placed. Bento tiles show one
 * product card each with a short story inside it.
 * Keys are the image paths in productPages.ts.
 */
import type { CSSProperties } from 'react';
import {
  BadgeCheck,
  Check,
  Clock,
  Copy,
  ExternalLink,
  Gift,
  Hand,
  Home,
  MessageCircle,
  MousePointerClick,
  Percent,
  ScrollText,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Tag,
  Truck,
  UserPlus,
  Users,
} from '../icons';
import {
  Attach,
  Avatar,
  Browser,
  Bubble,
  Burst,
  Chip,
  Cursor,
  Float,
  IconTile,
  IPhone,
  Panel,
  PhoneBanner,
  PhoneSheet,
  ProductArt,
  Reveal,
  Row,
  Skeleton,
  Stage,
  Swap,
  Toast,
  Toggle,
  TypeText,
  type IconType,
  type SceneMap,
  type SceneProps,
} from '../kit';
import '../../../styles/optin-scenes.css';

const sec = (n: number) => `${n}s`;
const vars = (o: Record<string, string | number>) => o as unknown as CSSProperties;

/* ── Shared storefront pieces ──────────────────────────────────────────── */

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

/** The Nova Home mark, used as the WhatsApp profile photo. */
function NovaDp() {
  return (
    <span className="oi-dp">
      <Home strokeWidth={2.4} />
    </span>
  );
}

/* ── Bento tiles ───────────────────────────────────────────────────────── */

/** Every signup lands on one consented list: a new subscriber slides in on top. */
function SubscriberList({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={14} w={80}>
        <Panel title="Subscribers" icon={Users} right={<Chip tone="emerald" dot>Live</Chip>}>
          <Reveal at={1.1}>
            <Row
              lead={<Avatar name="Ananya Rao" />}
              title="Ananya Rao"
              sub="Spin to win · just now"
              right={<Chip tone="emerald" icon={Check}>Opted in</Chip>}
            />
          </Reveal>
          <Row lead={<Avatar name="Kabir Shah" tone="sky" />} title="Kabir Shah" sub="Welcome popup · 9m" right={<Chip tone="emerald" icon={Check}>Opted in</Chip>} />
          <Row lead={<Avatar name="Meera Pillai" tone="amber" />} title="Meera Pillai" sub="Chat widget · 21m" right={<Chip tone="emerald" icon={Check}>Opted in</Chip>} />
          <Row lead={<Avatar name="Rohan Das" tone="rose" />} title="Rohan Das" sub="Pulse Drop · 1h" right={<Chip tone="emerald" icon={Check}>Opted in</Chip>} />
          <Attach place="tr" at={1.8} dx={0.6} dy={-0.6}>
            <Toast icon={UserPlus} tone="emerald" title="+38 today" sub="All with consent" />
          </Attach>
        </Panel>
      </Float>
    </Stage>
  );
}

/** When, where and to whom the popup shows: the rules switch on one by one. */
function Triggers({ label }: SceneProps) {
  const row = (icon: IconType, title: string, sub: string, at: number, cursor?: string) => (
    <Row
      lead={<IconTile icon={icon} />}
      title={title}
      sub={sub}
      right={
        <span data-cursor={cursor} style={vars({ '--fv-toggle-at': sec(at) })}>
          <Toggle tone="violet" />
        </span>
      }
    />
  );
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={16} w={80}>
        <Panel title="Show popup when" icon={Sparkles}>
          {row(MousePointerClick, 'Exit intent', 'Cursor leaves the tab', 0.9, 'exit')}
          {row(Clock, 'After 8 seconds', 'On any product page', 1.7, 'delay')}
          {row(ScrollText, 'Scrolled 50%', 'Collection pages', 2.5, 'scroll')}
          <Attach place="b" at={3.3} dy={0.2}>
            <Chip tone="emerald" dot>Live on 3 pages</Chip>
          </Attach>
        </Panel>
      </Float>
      <Cursor path={[[70, 98, 0.4], ['exit', 0.8], ['delay', 1.6], ['scroll', 2.4], [64, 96, 3.4]]} clicks={[0.9, 1.7, 2.5]} />
    </Stage>
  );
}

/** A floating chat button on the store: tap it, leave a number, WhatsApp opens. */
function Widget({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7.5}>
      <Float x={7} y={10} w={86}>
        <Browser url="novahome.in/doorbell">
          <div className="oi-store">
            <ProductArt kind="doorbell" h={8.5} />
            <div className="oi-store__info">
              <Skeleton w={80} h={0.8} />
              <Skeleton w={55} h={0.6} />
              <Skeleton w={40} h={1.6} tone />
            </div>
          </div>
          <span className="oi-fab" data-cursor="fab">
            <MessageCircle strokeWidth={2.4} />
          </span>
          <Attach place="br" at={1.6} dx={-0.4} dy={-7.6}>
            <div className="oi-widget">
              <b>Chat with Nova Home</b>
              <small>Order updates and offers on WhatsApp</small>
              <PhoneField at={2.2} number="98200 11223" />
              <Swap
                at={4}
                a={<span className="oi-cta oi-cta--wa">Continue on WhatsApp</span>}
                b={
                  <span className="oi-cta oi-cta--done">
                    <Check strokeWidth={3} /> Number saved
                  </span>
                }
              />
            </div>
          </Attach>
        </Browser>
      </Float>
      <Cursor path={[[40, 98, 0.3], ['fab', 1.1], ['fab', 1.4], [70, 96, 2.6]]} clicks={[1.25]} />
    </Stage>
  );
}

/* ── Showcases: the real popups, followed all the way to an order ──────── */

/**
 * The full journey: number and consent in the welcome popup, the code
 * arrives on WhatsApp, the shopper taps Shop now, checks out with the code
 * applied and the order lands, attributed to the popup.
 */
function WelcomePopup({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={14}>
      {/* Act 1: the popup on the storefront */}
      <Float x={29} y={0} w={42} until={4.9}>
        <div className="oi-pop oi-pop--banner">
          <span className="oi-close">✕</span>
          <div className="oi-banner">
            <small>New</small>
            <b>Smart Doorbell Ultra, our best yet.</b>
            <span>Shop now</span>
            <i className="oi-banner__device" />
          </div>
          <div className="oi-body">
            <Logo />
            <div className="oi-stack">
              <div className="oi-x oi-x--hide" style={vars({ '--show': sec(0), '--hide': sec(4) })}>
                <h4 className="oi-title">Get 10% OFF your first order</h4>
                <p className="oi-sub">Enter your WhatsApp number to unlock it.</p>
              </div>
              <div className="oi-x" style={vars({ '--show': sec(4.1) })}>
                <h4 className="oi-title">You are in!</h4>
                <p className="oi-sub">Check WhatsApp for your code.</p>
              </div>
            </div>
            <PhoneField at={0.8} />
            <Consent tick={2.7} />
            <span className="oi-cta" data-cursor="unlock" style={vars({ '--press': sec(3.5), width: '100%' })}>
              Unlock 10% off
            </span>
            <Powered />
          </div>
        </div>
      </Float>

      {/* Act 2 to 4: the shopper's phone */}
      <Float x={35} y={0} at={5.1}>
        <IPhone
          name="Nova Home"
          logo={<NovaDp />}
          overlay={
            <>
              <PhoneBanner at={5.6} until={7.2} title="Nova Home" body="Your 10% off code is here: WELCOME10" />
              <PhoneSheet at={9} url="novahome.in">
                <ProductArt kind="doorbell" h={10.5} tag="−10%" />
                <h5 className="fv-shop__title">Smart Doorbell Ultra</h5>
                <div className="fv-shop__price">
                  <b>₹4,049</b>
                  <s>₹4,499</s>
                  <em>WELCOME10</em>
                </div>
                <span className="fv-shop__applied">
                  <Tag strokeWidth={2.4} /> Code applied from WhatsApp
                </span>
                <span className="fv-shop__cta is-press" data-cursor="buy" style={vars({ '--fv-press': sec(10.6) })}>
                  <ShoppingBag strokeWidth={2.2} /> Buy now · COD
                </span>
              </PhoneSheet>
              <PhoneSheet at={11.1}>
                <div className="fv-shop__done">
                  <span className="fv-shop__check" style={vars({ '--fv-check-at': sec(11.5) })}>
                    <Check strokeWidth={3} />
                  </span>
                  <h5>Order placed</h5>
                  <p>Thank you, Aditi! Order #1042</p>
                  <div className="oi-order">
                    <ProductArt kind="doorbell" h={3.2} />
                    <span>
                      <b>Smart Doorbell Ultra</b>
                      <small>Qty 1 · Cash on delivery</small>
                    </span>
                    <b>₹4,049</b>
                  </div>
                  <span className="oi-order__wa">
                    <MessageCircle strokeWidth={2.4} /> Tracking updates on WhatsApp
                  </span>
                </div>
              </PhoneSheet>
            </>
          }
        >
          <span className="oi-sys">Messages from this business are secured by Meta.</span>
          <Reveal at={6.5}>
            <Bubble
              from="biz"
              time="11:02"
              media={<ProductArt kind="doorbell" h={7.5} />}
              title="Welcome to Nova Home"
              footer="Reply STOP to opt out"
              buttons={[{ label: 'Shop now', icon: ExternalLink, at: 8.5, cursor: 'shop' }]}
            >
              Here is 10% off your first order. Use code <b>WELCOME10</b> at checkout.
            </Bubble>
          </Reveal>
        </IPhone>
        <Attach place="l" at={7.4} dx={6.5} dy={-6}>
          <Toast icon={BadgeCheck} tone="emerald" title="New subscriber" sub="Consent saved · Welcome popup" />
        </Attach>
        <Attach place="r" at={11.8} dx={6.5} dy={6}>
          <Toast icon={ShoppingBag} title="₹4,049 order" sub="Attributed to Welcome popup" />
        </Attach>
      </Float>
      <Cursor path={[[60, 98, 0.3], ['tick-2.7', 2.4], ['tick-2.7', 2.9], ['unlock', 3.3], ['unlock', 3.9]]} clicks={[2.7, 3.5]} />
      <Cursor touch path={[['shop', 8.2], ['shop', 8.8], ['buy', 10.3], ['buy', 10.9]]} clicks={[8.5, 10.6]} />
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
    <Stage label={label} shape="wide" duration={10}>
      <Float x={18} y={6} w={64} until={5.4}>
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
              <span className="oi-x oi-x--hide" style={vars({ '--show': sec(0), '--hide': sec(1.25) })}>
                <span className="oi-cta" data-cursor="spin" style={vars({ '--press': sec(1) })}>
                  Spin now
                </span>
              </span>
              <span className="oi-x oi-x--hide" style={vars({ '--show': sec(1.3), '--hide': sec(3.8) })}>
                <span className="oi-cta oi-cta--muted">Spinning...</span>
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
      <Float x={32} y={4} w={36} at={5.9}>
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
            <CodeTicket code="OFF5" copyAt={7.4} />
          </div>
          <p className="oi-sub" style={{ fontSize: '0.78em' }}>
            Apply it at checkout to claim your savings.
          </p>
          <Powered />
          <Burst x={50} y={14} at={6.1} />
          <Attach place="br" at={8} dx={2.4} dy={-3}>
            <Toast icon={MessageCircle} tone="emerald" title="Code sent on WhatsApp" sub="+91 93130 45439" />
          </Attach>
        </div>
      </Float>
      <Cursor
        path={[[62, 98, 0.2], ['spin', 0.85], ['spin', 1.4], ['tick-4.3', 4.1], ['tick-4.3', 4.6], ['copy-OFF5-7.4', 7.1], ['copy-OFF5-7.4', 7.8]]}
        clicks={[1, 4.3, 7.4]}
      />
    </Stage>
  );
}

/** Scratch & Win: the foil scratches away, 5% off, number in, the code rises up. */
function Mystery({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={10}>
      <Float x={32} y={2} w={36}>
        <div className="oi-pop">
          <span className="oi-close">✕</span>
          <Logo />
          <div className="oi-stack">
            <div className="oi-x oi-x--hide" style={vars({ '--show': sec(0), '--hide': sec(2.9) })}>
              <h4 className="oi-title">Scratch &amp; Win</h4>
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
            <CodeTicket code="OFF5" copyAt={7.4} rise={5.9} />
            <Burst x={50} y={45} at={2.6} />
          </div>
          <div className="oi-x" style={vars({ '--show': sec(3.2) })}>
            <Consent tick={3.9} />
            <PhoneField at={4.3} number="93130 45439" />
          </div>
          <Powered />
          <Attach place="r" at={8} dx={2.6}>
            <Toast icon={MessageCircle} tone="emerald" title="OFF5 sent on WhatsApp" sub="Consent saved" />
          </Attach>
        </div>
      </Float>
      <Cursor
        path={[[64, 98, 0.3], ['scratch-a', 1.0], ['scratch-b', 1.4], ['scratch-c', 1.8], ['scratch-d', 2.2], ['scratch-e', 2.6], ['tick-3.9', 3.6], ['tick-3.9', 4.1], ['copy-OFF5-7.4', 7.0], ['copy-OFF5-7.4', 7.7]]}
        clicks={[3.9, 7.4]}
      />
    </Stage>
  );
}

/** Pulse Drop: tap the glowing orb, the same card turns into the unlocked offer. */
function PulseDrop({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={9}>
      <Float x={33} y={4} w={34}>
        <div className="oi-pop">
          <span className="oi-close">✕</span>
          <div className="oi-stack">
            <div className="oi-x oi-x--hide" style={vars({ '--show': sec(0), '--hide': sec(2.2) })}>
              <h4 className="oi-title">Your glow drop is ready</h4>
              <p className="oi-sub">Tap once to reveal your offer.</p>
              <div className="oi-orb" data-cursor="orb" style={vars({ '--tap': sec(1.5) })} />
              <div className="oi-tap">Tap to open</div>
            </div>
            <div className="oi-x" style={vars({ '--show': sec(2.4) })}>
              <p className="oi-kicker">Offer unlocked</p>
              <h4 className="oi-title">Free shipping, locked in</h4>
              <p className="oi-sub">Claim it on WhatsApp so it never gets lost.</p>
              <div className="oi-coupon-v">
                <i>OFFER</i>
                <div>
                  <small>CODE</small>
                  <b>FREESHIP</b>
                </div>
              </div>
              <span className="oi-cta oi-cta--wa" data-cursor="claim" style={vars({ '--press': sec(4.4), width: '100%' })}>
                <MessageCircle strokeWidth={2.4} /> Claim on WhatsApp
              </span>
            </div>
          </div>
          <Powered />
          <Burst x={50} y={40} at={2.3} />
          <Attach place="br" at={5} dx={2.6} dy={-4}>
            <Toast icon={ShoppingCart} tone="emerald" title="Claimed on WhatsApp" sub="Added to subscriber list" />
          </Attach>
        </div>
      </Float>
      <Cursor path={[[60, 98, 0.4], ['orb', 1.2], ['orb', 1.8], ['claim', 4.1], ['claim', 4.8]]} clicks={[1.5, 4.4]} />
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
