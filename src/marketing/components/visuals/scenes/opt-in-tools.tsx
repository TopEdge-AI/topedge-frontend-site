/* eslint-disable react-refresh/only-export-components -- a scene module exports its SceneMap by design. */
/**
 * Opt-in Tools scenes. Every capture path writes the same consented audience.
 * Keys are the image paths in productPages.ts.
 */
import type { CSSProperties, ReactNode } from 'react';
import {
  Calendar,
  Check,
  Clock,
  Eye,
  Filter,
  Gift,
  Hand,
  LayoutTemplate,
  MessageCircle,
  MousePointer,
  Palette,
  Phone as PhoneIcon,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  UserPlus,
  Users,
  Volume2,
} from 'lucide-react';
import {
  Avatar,
  Btn,
  Bubble,
  Chip,
  Cursor,
  Field,
  Float,
  IconTile,
  Panel,
  Row,
  Stage,
  Thumb,
  Toggle,
  Wires,
  type SceneMap,
  type SceneProps,
  type Tone,
} from '../kit';

/* ── Local helpers ─────────────────────────────────────────────────────── */

const center: CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' };

/** Popup headline + one muted line. */
function Heading({ title, sub, size = 1.5 }: { title: string; sub?: string; size?: number }) {
  return (
    <div style={{ ...center, gap: '0.35em' }}>
      <b style={{ fontSize: `${size}em`, fontWeight: 650, letterSpacing: '-0.03em', lineHeight: 1.15 }}>{title}</b>
      {sub ? <small style={{ fontSize: '1em', color: 'var(--fv-muted)', lineHeight: 1.35 }}>{sub}</small> : null}
    </div>
  );
}

/** Key / value line for summaries. */
function KV({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45em 0.2em', fontSize: '1em' }}>
      <small style={{ color: 'var(--fv-muted)', fontSize: '0.95em' }}>{k}</small>
      <b style={{ fontWeight: 600 }}>{v}</b>
    </div>
  );
}

/** Coupon ticket: perforated stub, code, copy button. */
function Coupon({ code, tone = 'violet', label = 'Code' }: { code: string; tone?: Tone; label?: string }) {
  return (
    <div
      data-tone={tone}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.8em',
        padding: '0.55em 0.6em 0.55em 0',
        borderRadius: '0.8em',
        background: 'linear-gradient(90deg, var(--t-50), #fff)',
        boxShadow: '0 0 0 1px color-mix(in srgb, var(--t-500) 25%, transparent) inset',
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          alignSelf: 'stretch',
          display: 'grid',
          placeItems: 'center',
          width: '2.2em',
          margin: '-0.55em 0',
          color: '#fff',
          fontSize: '0.75em',
          fontWeight: 700,
          letterSpacing: '0.12em',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          background: 'linear-gradient(160deg, var(--t-500), var(--t-700))',
        }}
      >
        OFFER
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1, flex: 1 }}>
        <small style={{ fontSize: '0.75em', fontWeight: 600, color: 'var(--fv-muted)', letterSpacing: '0.08em' }}>
          {label.toUpperCase()}
        </small>
        <b style={{ fontSize: '1.45em', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: 'var(--t-700)', letterSpacing: '0.04em' }}>
          {code}
        </b>
      </span>
      <Btn tone={tone} primary>
        Copy
      </Btn>
    </div>
  );
}

/** Ticked consent line under a phone field. */
function Consent({ tone = 'emerald', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <div data-tone={tone} style={{ display: 'flex', gap: '0.5em', alignItems: 'flex-start', fontSize: '0.9em', color: 'var(--fv-muted)', textAlign: 'left', lineHeight: 1.35 }}>
      <span
        style={{
          flex: 'none',
          display: 'grid',
          placeItems: 'center',
          width: '1.35em',
          height: '1.35em',
          borderRadius: '0.35em',
          color: '#fff',
          background: 'linear-gradient(160deg, var(--t-400), var(--t-600))',
        }}
      >
        <Check strokeWidth={3} style={{ width: '0.9em', height: '0.9em' }} />
      </span>
      {children}
    </div>
  );
}

/** Blurred storefront behind a popup. */
function Storefront({ url = 'yourstore.in' }: { url?: string }) {
  const line = (w: string) => <i style={{ display: 'block', height: '0.55em', width: w, borderRadius: 99, background: 'rgba(15,23,42,0.08)' }} />;
  return (
    <div className="fv-panel" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35em', padding: '0.65em 0.8em', background: 'rgba(15,23,42,0.03)', borderBottom: '1px solid var(--fv-line)' }}>
        {['#fb7185', '#fbbf24', '#34d399'].map((c) => (
          <i key={c} style={{ width: '0.6em', height: '0.6em', borderRadius: '50%', background: c }} />
        ))}
        <span style={{ marginLeft: '0.6em', padding: '0.2em 0.8em', borderRadius: 99, fontSize: '0.85em', color: 'var(--fv-muted)', background: '#fff', boxShadow: '0 0 0 1px var(--fv-line)' }}>
          {url}
        </span>
      </div>
      <div style={{ padding: '1em', display: 'flex', flexDirection: 'column', gap: '0.8em', filter: 'blur(0.06em)', opacity: 0.9 }}>
        {line('45%')}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.7em' }}>
          <Thumb tone="rose" icon={ShoppingBag} h={6.5} />
          <Thumb tone="amber" h={6.5} />
          <Thumb tone="sky" h={6.5} />
        </div>
        {line('70%')}
        {line('40%')}
      </div>
    </div>
  );
}

/* ── Bento tiles (square, 36em x 36em) ─────────────────────────────────── */

/** Subscriber list: consent, source tool, one WhatsApp-ready audience. */
function SubscriberList({ label }: SceneProps) {
  return (
    <Stage label={label} tone="rose">
      <Float x={7} y={5} w={86} delay={0}>
        <Panel title="Subscribers" icon={Users} tone="rose" right={<Chip tone="emerald" dot>1,102 opted in</Chip>}>
          <div style={{ display: 'flex', gap: '0.4em', marginBottom: '0.5em' }}>
            <Chip tone="rose" icon={Filter}>Tool: All tools</Chip>
            <Chip tone="slate" icon={Calendar}>Date: All dates</Chip>
          </div>
          <Row lead={<Avatar name="Ananya Rao" tone="rose" />} title="Ananya Rao" sub="+91 98765 43210" right={<Chip tone="violet">Popup</Chip>} />
          <Row lead={<Avatar name="Rahul Mehta" tone="amber" />} title="Rahul Mehta" sub="+91 98111 22233" right={<Chip tone="amber">Spin wheel</Chip>} />
          <Row lead={<Avatar name="Neha Gupta" tone="violet" />} title="Neha Gupta" sub="+91 99001 12233" right={<Chip tone="rose">Pulse Drop</Chip>} active />
          <Row lead={<Avatar name="Kavita Reddy" tone="emerald" />} title="Kavita Reddy" sub="+91 99445 56677" right={<Chip tone="emerald">Widget</Chip>} />
        </Panel>
      </Float>
      <Float x={16} y={73} w={78} delay={4} rotate={-1.5} drift z={3}>
        <Panel>
          <Row
            lead={<IconTile icon={ShieldCheck} tone="emerald" />}
            title="Consent logged"
            sub="Pulse Drop · 11:42 am"
            right={<Chip tone="emerald" dot>Opt-in</Chip>}
          />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Triggers: when, where, who, with a live summary. */
function Triggers({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet">
      <Float x={7} y={6} w={86} delay={0}>
        <Panel title="Triggers" icon={SlidersHorizontal} tone="violet" right={<Chip tone="slate">Design</Chip>}>
          <div style={{ display: 'flex', gap: '0.4em', marginBottom: '0.7em' }}>
            <Chip tone="violet" solid>When</Chip>
            <Chip tone="slate">Where</Chip>
            <Chip tone="slate">Who</Chip>
            <Chip tone="slate">Frequency</Chip>
          </div>
          <Row lead={<IconTile icon={Clock} tone="slate" size="sm" />} title="After delay" sub="5 seconds on page" />
          <Row lead={<IconTile icon={MousePointer} tone="violet" size="sm" />} title="Scroll depth reached" sub="50% of the page" right={<Chip tone="violet" icon={Check}>Selected</Chip>} active />
          <Row lead={<IconTile icon={ShoppingCart} tone="slate" size="sm" />} title="After add to cart" sub="ATC event" />
        </Panel>
      </Float>
      <Float x={6} y={72} delay={3}>
        <Chip tone="violet" icon={Smartphone}>Desktop + mobile</Chip>
      </Float>
      <Float x={6} y={81} delay={4}>
        <Chip tone="slate" icon={Calendar}>Asia/Kolkata</Chip>
      </Float>
      <Float x={45} y={58} w={49} delay={5} rotate={2} drift z={3}>
        <Panel title="Live summary" icon={Eye} tone="sky">
          <KV k="When" v="Scroll 50%" />
          <KV k="Pages" v="Home, PDP, cart" />
          <KV k="Visitors" v="New visitors" />
          <KV k="Frequency" v="Once a session" />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Storefront chat widget with optional phone capture, then wa.me. */
function Widget({ label }: SceneProps) {
  return (
    <Stage label={label} tone="emerald">
      <Float x={5} y={6} w={64} delay={0} rotate={-2}>
        <Storefront />
      </Float>
      <Float x={5} y={63} delay={4}>
        <Chip tone="emerald" icon={PhoneIcon}>Phone capture on</Chip>
      </Float>
      <Float x={5} y={88} delay={6}>
        <Chip tone="slate">One live widget per store</Chip>
      </Float>
      <Float x={37} y={29} w={58} delay={2} z={3}>
        <div className="fv-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6em', padding: '0.8em 0.95em', color: '#fff', background: 'linear-gradient(160deg, #0f8f74, #075e54)' }}>
            <IconTile icon={MessageCircle} tone="emerald" size="sm" />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <b style={{ fontSize: '1.05em', fontWeight: 600 }}>Your store</b>
              <small style={{ fontSize: '0.82em', opacity: 0.8 }}>Replies in a few minutes</small>
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75em', padding: '0.9em' }}>
            <Bubble from="biz">Need help picking a size? We are on WhatsApp.</Bubble>
            <Field label="Your WhatsApp number" value="+91 98765 43210" />
            <Btn tone="emerald" primary icon={MessageCircle}>
              Continue on WhatsApp
            </Btn>
          </div>
        </div>
      </Float>
      <Float x={60} y={86} delay={5} z={4}>
        <Btn tone="emerald" primary icon={MessageCircle}>
          Chat with us
        </Btn>
      </Float>
    </Stage>
  );
}

/* ── Showcases (wide, 64em x 40em) ─────────────────────────────────────── */

/** Pulse Drop: orb reveal, coupon, claim lands on the list. */
function PulseDrop({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet" shape="wide">
      <Wires shape="wide" tone="violet" paths={['M 64 20 C 67 20, 65 16, 68 16']} />
      <Float x={5} y={9} w={32} delay={0} rotate={-3}>
        <Panel>
          <div style={{ ...center, gap: '1.1em', padding: '0.4em 0.2em 0.2em' }}>
            <Heading title="Your drop is ready" sub="Tap once to reveal your offer, then claim on WhatsApp." size={1.45} />
            <span
              style={{
                width: '9em',
                height: '9em',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 32% 28%, #e9ddff 0%, #a78bfa 28%, #7c3aed 62%, #3b0f8a 100%)',
                boxShadow: '0 0 0 0.6em rgba(139,92,246,0.12), 0 0 0 1.3em rgba(139,92,246,0.06), 0 1.6em 2.4em -0.8em rgba(76,29,149,0.6)',
              }}
            />
            <small style={{ fontSize: '1em', fontWeight: 600, color: 'var(--t-700)' }}>Tap to open</small>
          </div>
        </Panel>
      </Float>
      <Float x={36} y={20} w={30} delay={2} rotate={2} z={3}>
        <Panel>
          <div style={{ ...center, gap: '0.2em', marginBottom: '1em' }}>
            <small style={{ fontSize: '0.95em', fontWeight: 600, color: 'var(--t-600)' }}>Offer unlocked</small>
            <b style={{ fontSize: '1.6em', fontWeight: 650, letterSpacing: '-0.03em' }}>Locked in</b>
          </div>
          <Coupon code="FREESHIP" />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
            <Btn tone="emerald" primary icon={MessageCircle}>
              Claim on WhatsApp
            </Btn>
          </div>
        </Panel>
      </Float>
      <Float x={68} y={11} w={29} delay={4} drift>
        <Panel title="Subscriber list" icon={UserPlus} tone="rose">
          <Row lead={<Avatar name="Ishita Bose" tone="violet" />} title="Ishita Bose" sub="Just now" active />
          <Row lead={<Avatar name="Dev Patel" tone="sky" />} title="Dev Patel" sub="2 min ago" />
        </Panel>
      </Float>
      <Float x={71} y={52} delay={5}>
        <Chip tone="rose" icon={Check}>Source: Pulse Drop</Chip>
      </Float>
      <Float x={8} y={76} delay={6}>
        <Chip tone="violet" solid icon={Sparkles}>Always-win prize feel</Chip>
      </Float>
      <Float x={37} y={76} delay={7}>
        <Chip tone="slate" icon={Volume2}>Soft sounds</Chip>
      </Float>
      <Cursor x={56} y={57} delay={7} />
    </Stage>
  );
}

/** Welcome popup: discount, phone, consent, layout and brand colours. */
function WelcomePopup({ label }: SceneProps) {
  const swatch = (c: string, on?: boolean) => (
    <i
      key={c}
      style={{
        width: '1.9em',
        height: '1.9em',
        borderRadius: '50%',
        background: c,
        boxShadow: on ? '0 0 0 0.18em #fff, 0 0 0 0.32em #e11d48' : '0 0 0 1px rgba(15,23,42,0.08) inset',
      }}
    />
  );
  return (
    <Stage label={label} tone="rose" shape="wide">
      <Float x={4} y={14} w={26} delay={1} rotate={-2}>
        <Panel title="Layout" icon={LayoutTemplate} tone="rose">
          <Row title="Standard" sub="Centred card" />
          <Row title="Image side" sub="Photo on the left" />
          <Row title="Image top" sub="Banner header" right={<Chip tone="rose" icon={Check}>On</Chip>} active />
        </Panel>
      </Float>
      <Float x={34} y={5} w={32} delay={0} z={3}>
        <div className="fv-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <Thumb tone="amber" icon={ShoppingBag} h={6.5} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85em', padding: '1.1em 1.2em 1.2em' }}>
            <Heading title="10% off your first order" sub="Enter your number to unlock your code." size={1.4} />
            <Field label="WhatsApp number" value="+91 98765 43210" />
            <Consent tone="rose">I agree to WhatsApp offers and order updates.</Consent>
            <Btn tone="rose" primary>
              Unlock my code
            </Btn>
          </div>
        </div>
      </Float>
      <Float x={70} y={10} w={26} delay={2} rotate={2}>
        <Panel title="Brand colours" icon={Palette} tone="amber">
          <div style={{ display: 'flex', gap: '0.55em', marginBottom: '1em' }}>
            {swatch('#e11d48', true)}
            {swatch('#f59e0b')}
            {swatch('#0f172a')}
            {swatch('#10b981')}
            {swatch('#f8fafc')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <small style={{ fontSize: '1em', color: 'var(--fv-muted)' }}>Live preview</small>
            <Toggle tone="rose" />
          </div>
        </Panel>
      </Float>
      <Float x={66} y={62} w={31} delay={4} drift>
        <Panel>
          <Row lead={<IconTile icon={UserPlus} tone="emerald" />} title="Joined list" sub="Source: Popup" right={<Chip tone="emerald" dot>Opt-in</Chip>} />
        </Panel>
      </Float>
      <Float x={6} y={78} delay={5}>
        <Chip tone="rose" icon={Smartphone}>Desktop + mobile preview</Chip>
      </Float>
      <Cursor x={61} y={63} delay={6} />
    </Stage>
  );
}

/** Spin to win: weighted slices, Shopify codes, consent on every spin. */
function SpinWheel({ label }: SceneProps) {
  const slices = ['#f59e0b', '#fde68a', '#fb7185', '#fef3c7', '#10b981', '#fde68a', '#8b5cf6', '#fef3c7'];
  const n = slices.length;
  const arc = (i: number) => {
    const a0 = (i / n) * Math.PI * 2 - Math.PI / 2;
    const a1 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2;
    const p = (a: number) => `${50 + 46 * Math.cos(a)} ${50 + 46 * Math.sin(a)}`;
    return `M 50 50 L ${p(a0)} A 46 46 0 0 1 ${p(a1)} Z`;
  };
  return (
    <Stage label={label} tone="amber" shape="wide">
      <Float x={4} y={12} delay={0} drift>
        <div style={{ position: 'relative', width: '23em', height: '23em' }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 1.2em 1.6em rgba(180,83,9,0.35))', transform: 'rotate(-12deg)' }}>
            <circle cx="50" cy="50" r="49" fill="#fff" />
            {slices.map((c, i) => (
              <path key={i} d={arc(i)} fill={c} stroke="#fff" strokeWidth="0.8" />
            ))}
            <circle cx="50" cy="50" r="11" fill="#fff" />
            <circle cx="50" cy="50" r="7.5" fill="url(#fvSpinHub)" />
            <defs>
              <linearGradient id="fvSpinHub" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fbbf24" />
                <stop offset="1" stopColor="#b45309" />
              </linearGradient>
            </defs>
          </svg>
          <span
            style={{
              position: 'absolute',
              top: '-0.6em',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '1em solid transparent',
              borderRight: '1em solid transparent',
              borderTop: '1.8em solid #0c1222',
              filter: 'drop-shadow(0 0.2em 0.3em rgba(0,0,0,0.3))',
            }}
          />
        </div>
      </Float>
      <Float x={41} y={14} w={28} delay={2} z={3}>
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9em' }}>
            <Heading title="Spin and unlock" sub="Spin once, then claim on WhatsApp." size={1.45} />
            <Field label="WhatsApp number" value="+91 98190 45678" />
            <Consent tone="amber">Send me offers on WhatsApp.</Consent>
            <Btn tone="amber" primary>
              Spin now
            </Btn>
          </div>
        </Panel>
      </Float>
      <Float x={70} y={8} w={27} delay={3} rotate={2}>
        <Panel title="Prize slices" icon={Gift} tone="amber">
          <Row title="10% off" sub="Unique Shopify code" right={<Chip tone="amber">40%</Chip>} />
          <Row title="Free shipping" sub="Fixed code" right={<Chip tone="amber">35%</Chip>} />
          <Row title="Try again" sub="Lose slice" right={<Chip tone="slate">25%</Chip>} />
        </Panel>
      </Float>
      <Float x={42} y={73} w={40} delay={5} drift z={4}>
        <Panel>
          <Row
            lead={<IconTile icon={Gift} tone="emerald" />}
            title="You won 10% off"
            sub="Code SPIN10 · consent saved"
            right={<Chip tone="emerald" dot>Win</Chip>}
          />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Mystery discount: scratch to reveal, then claim with phone and consent. */
function Mystery({ label }: SceneProps) {
  return (
    <Stage label={label} tone="indigo" shape="wide">
      <Float x={5} y={8} w={31} delay={0} rotate={-2}>
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
            <Heading title="Scratch and unlock" sub="Scratch the foil, then claim on WhatsApp." size={1.45} />
            <div
              style={{
                position: 'relative',
                height: '13em',
                borderRadius: '1em',
                overflow: 'hidden',
                background: 'repeating-linear-gradient(135deg, #cbd5e1 0 0.25em, #e2e8f0 0.25em 0.5em)',
                boxShadow: '0 0 0 1px rgba(15,23,42,0.08) inset',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: '12%',
                  top: '18%',
                  width: '76%',
                  height: '64%',
                  borderRadius: '42% 58% 46% 54% / 55% 40% 60% 45%',
                  display: 'grid',
                  placeItems: 'center',
                  background: 'radial-gradient(circle at 40% 30%, #fff, #eef2ff)',
                  boxShadow: '0 0 0 0.3em rgba(255,255,255,0.6)',
                }}
              >
                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4em' }}>
                  <IconTile icon={Gift} tone="indigo" size="lg" />
                  <b style={{ fontSize: '1.15em', color: 'var(--t-700)' }}>Prize unlocked</b>
                </span>
              </span>
            </div>
          </div>
        </Panel>
      </Float>
      <Float x={40} y={16} w={29} delay={2} rotate={2} z={3}>
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9em' }}>
            <Heading title="You unlocked a prize" size={1.4} />
            <Coupon code="SHIP99" tone="indigo" label="₹99 credit" />
            <Field label="WhatsApp number" value="+91 98345 67890" />
            <Consent tone="indigo">Send me offers on WhatsApp.</Consent>
            <Btn tone="emerald" primary icon={MessageCircle}>
              Claim on WhatsApp
            </Btn>
          </div>
        </Panel>
      </Float>
      <Float x={6} y={82} delay={6}>
        <Chip tone="emerald" icon={ShieldCheck}>Phone + consent captured</Chip>
      </Float>
      <Float x={73} y={14} delay={4}>
        <Chip tone="indigo" icon={Hand}>Tap-and-hold reveal</Chip>
      </Float>
      <Wires shape="wide" tone="indigo" paths={['M 69 30 C 74 30, 76 36, 82 38']} />
      <Float x={72} y={60} w={25} delay={5} drift>
        <Panel title="Segment" icon={Users} tone="rose">
          <Row title="Prize winners" sub="Spin or mystery win" right={<Chip tone="rose">86</Chip>} />
        </Panel>
      </Float>
    </Stage>
  );
}

const scenes: SceneMap = {
  '/opt-in-sub-feature/10.webp': SubscriberList,
  '/opt-in-sub-feature/11.webp': Triggers,
  '/opt-in-sub-feature/12.webp': Widget,
  '/opt-in-sub-feature/16.webp': PulseDrop,
  '/opt-in-sub-feature/17.webp': WelcomePopup,
  '/opt-in-sub-feature/18.webp': SpinWheel,
  '/opt-in-sub-feature/19.webp': Mystery,
};

export default scenes;
