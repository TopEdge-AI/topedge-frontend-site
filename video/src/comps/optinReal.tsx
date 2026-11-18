/**
 * L-optin, third cut: the opt-in widgets exactly as the product ships them
 * (from the merchant's live storefront recordings), in the store's own brand:
 *   welcome pop-up → prize reel ("spin") → scratch & win → WhatsApp widget
 * each ending on the gold coupon ticket, then the subscriber payoff.
 */
import type { CSSProperties, ReactNode } from 'react';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import {
  BrowserIcon, BubbleChatIcon, Copy01Icon, DeliveryTruck01Icon, DiscountTag01Icon, GiftIcon, PercentIcon, Tap01Icon,
  Ticket01Icon, Tick02Icon,
} from '@hugeicons/core-free-icons';
import { SiWhatsapp } from 'react-icons/si';
import { E, clamp, lerp, prog, spring, typed } from '../lib/time';
import { DISPLAY, FONT, Touch } from '../lib/ui';
import { KurtaShot, inr } from '../lib/kit2';
import { BrowserWin, Caption, Figure, GlassIcon, GRAD, Hand, L, Obj, Space, Stage, track, useLayout, win } from '../lib/launch';

const W = 1920;
const H = 1080;
/** The store's brand (the widget takes the merchant's colours). */
const B = { ink: '#0F3D2E', mid: '#155E45', soft: '#E7F2EC', gold1: '#F6E7B0', gold2: '#D9B45A', gold3: '#A67C2E' };
const Ic = ({ icon, size = 22, color = '#fff', stroke = 1.9 }: { icon: IconSvgElement; size?: number; color?: string; stroke?: number }) => <HugeiconsIcon icon={icon} size={size} color={color} strokeWidth={stroke} />;
const tapK = (t: number, at: number) => prog(t, at - 0.1, at) * (1 - prog(t, at + 0.15, at + 0.3));
const fade = (t: number, a: number, d = 0.35): CSSProperties => ({ opacity: prog(t, a, a + d), transform: `translateY(${(1 - prog(t, a, a + d * 1.4, E.enter)) * 14}px)` });

/* ------------------------------------------------------------ widget kit */
const Brand = ({ size = 1 }: { size?: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 * size }}>
    <span style={{ width: 40 * size, height: 40 * size, borderRadius: 11 * size, background: B.ink, display: 'grid', placeItems: 'center' }}>
      <svg width={24 * size} height={24 * size} viewBox="0 0 24 24"><path d="M4 20V9l8-5 8 5v11" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" /><path d="M9 20v-6h6v6" fill="none" stroke="#fff" strokeWidth="2" /></svg>
    </span>
    <div style={{ lineHeight: 1 }}>
      <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 26 * size, letterSpacing: '0.02em', color: B.ink }}>RANGREZ</div>
      <div style={{ fontSize: 9.5 * size, letterSpacing: '0.62em', color: B.mid, marginTop: 3 * size, fontWeight: 600 }}>HANDLOOM</div>
    </div>
  </div>
);
const Powered = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontSize: 13, color: '#8A8F98', marginTop: 14 }}>
    <span style={{ width: 13, height: 13, borderRadius: 9, background: GRAD }} />Powered by TopEdge AI
  </div>
);
const Modal = ({ w, children, style }: { w: number; children: ReactNode; style?: CSSProperties }) => (
  <div style={{ position: 'relative', width: w, borderRadius: 28, background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 40px 90px -30px rgba(15,30,25,0.45)', fontFamily: FONT, color: '#111827', ...style }}>
    <span style={{ position: 'absolute', right: 18, top: 16, width: 30, height: 30, borderRadius: 99, background: '#F3F4F6', display: 'grid', placeItems: 'center', color: '#9CA3AF', fontSize: 18 }}>×</span>
    {children}
  </div>
);
const Consent = ({ on }: { on: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14.5, color: '#6B7280', textAlign: 'left' }}>
    <span style={{ width: 20, height: 20, borderRadius: 6, flex: 'none', background: on ? B.mid : '#fff', boxShadow: on ? 'none' : 'inset 0 0 0 1.5px #D1D5DB', display: 'grid', placeItems: 'center' }}>{on ? <Ic icon={Tick02Icon} size={14} stroke={2.6} /> : null}</span>
    I agree to receive offers and order updates on WhatsApp.
  </div>
);
const Phone = ({ v, focus }: { v: string; focus?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', height: 56, borderRadius: 14, background: '#F7F8F9', boxShadow: `inset 0 0 0 ${focus ? 2 : 1}px ${focus ? B.mid : '#E5E7EB'}`, fontSize: 19, overflow: 'hidden' }}>
    <span style={{ padding: '0 16px', fontWeight: 600, color: '#374151', borderRight: '1px solid #E5E7EB', height: '100%', display: 'grid', placeItems: 'center' }}>+91</span>
    <span style={{ padding: '0 16px', fontWeight: 600, color: v ? '#111827' : '#9CA3AF', letterSpacing: '0.02em' }}>{v || '10-digit mobile'}</span>
  </div>
);
const Btn = ({ children, press = 0, dark, w }: { children: ReactNode; press?: number; dark?: boolean; w?: number | string }) => (
  <div style={{ height: 58, width: w ?? '100%', borderRadius: 40, background: dark ? '#111' : B.mid, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 19, fontWeight: 600, transform: `scale(${1 - press * 0.04})`, boxShadow: '0 10px 20px -10px rgba(15,61,46,0.6)' }}>{children}</div>
);
/** Gold coupon ticket with notched edges. */
function Ticket({ code, k = 1, w = 400 }: { code: string; k?: number; w?: number }) {
  const notch = 'radial-gradient(circle at 0 50%, transparent 13px, #000 14px) left / 51% 100% no-repeat, radial-gradient(circle at 100% 50%, transparent 13px, #000 14px) right / 51% 100% no-repeat';
  return (
    <div style={{ width: w, padding: '24px 26px 22px', borderRadius: 20, background: `linear-gradient(135deg,${B.gold1} 0%,#EED48A 40%,${B.gold1} 60%,${B.gold2} 100%)`, boxShadow: '0 20px 40px -18px rgba(166,124,46,0.7), inset 0 0 0 2px rgba(255,255,255,0.5)', WebkitMask: notch, mask: notch, textAlign: 'center', transform: `scale(${lerp(0.85, 1, k)})`, opacity: clamp(k * 2) }}>
      <div style={{ fontSize: 14, letterSpacing: '0.42em', fontWeight: 700, color: '#6B5320' }}>YOUR CODE</div>
      <div style={{ fontFamily: DISPLAY, fontSize: 48, fontWeight: 800, letterSpacing: '0.12em', color: '#141414', margin: '6px 0 14px' }}>{code}</div>
      <Btn dark><Ic icon={Copy01Icon} size={20} />Copy code</Btn>
    </div>
  );
}
function Congrats({ t, at, won, code }: { t: number; at: number; won: string; code: string }) {
  const k = spring(t, at, 0.7, 0.25);
  return (
    <div style={{ padding: '34px 40px 26px', textAlign: 'center', position: 'relative' }}>
      <div style={{ width: 74, height: 74, margin: '0 auto', borderRadius: 99, background: '#ECFDF3', boxShadow: '0 0 0 8px #F6FEF9', display: 'grid', placeItems: 'center', transform: `scale(${k})` }}><Ic icon={Tick02Icon} size={38} color="#16A34A" stroke={2.4} /></div>
      <div style={{ fontFamily: DISPLAY, fontSize: 34, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 16, ...fade(t, at + 0.1) }}>Congratulations!</div>
      <div style={{ fontSize: 18, color: '#6B7280', marginTop: 4, ...fade(t, at + 0.2) }}>Boom! You won <b style={{ color: B.gold3 }}>{won}</b></div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}><Ticket code={code} k={spring(t, at + 0.3, 0.7, 0.25)} /></div>
      <Powered />
      {/* gold flecks */}
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2, d = prog(t, at, at + 1.4, E.enter) * (150 + (i % 3) * 40);
        return <span key={i} style={{ position: 'absolute', left: '50%', top: 70, width: 10, height: 5, borderRadius: 2, background: i % 2 ? B.gold2 : '#F2C94C', transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d * 0.7}px) rotate(${a * 90}deg)`, opacity: 1 - prog(t, at + 0.9, at + 1.6) }} />;
      })}
    </div>
  );
}

/* --------------------------------------------------------------- the reel */
const PRIZES: [string, IconSvgElement, string][] = [['10% off', PercentIcon, '#F87171'], ['Free shipping', DeliveryTruck01Icon, '#60A5FA'], ['15% off', DiscountTag01Icon, B.mid], ['Free gift', GiftIcon, '#A78BFA'], ['5% off', PercentIcon, '#34D399'], ['₹200 off', Ticket01Icon, '#F59E0B'], ['20% off', DiscountTag01Icon, '#F472B6']];
function Reel({ pos, landed }: { pos: number; landed: boolean }) {
  const IH = 78, n = PRIZES.length;
  const speed = 0;
  return (
    <div style={{ position: 'relative', width: 330, height: 400, overflow: 'hidden' }}>
      {/* ruler */}
      {Array.from({ length: 15 }, (_, i) => <span key={i} style={{ position: 'absolute', left: 4, top: 26 + i * 25, width: i % 2 ? 12 : 20, height: 2, borderRadius: 2, background: '#D1D5DB' }} />)}
      <svg width="40" height="20" viewBox="0 0 40 20" style={{ position: 'absolute', left: 30, top: 190 }}><path d="M0 10 H30 M24 3 L33 10 L24 17" fill="none" stroke={B.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
      {Array.from({ length: 9 }, (_, j) => {
        const base = Math.floor(pos) - 4 + j;
        const d = base - pos; // distance from the arrow, in items
        const idx = ((base % n) + n) % n;
        const [label, icon, col] = PRIZES[idx];
        const sel = landed && Math.abs(d) < 0.5;
        const o = clamp(1 - Math.abs(d) / 2.6);
        return (
          <div key={j} style={{ position: 'absolute', left: 84 + Math.abs(d) * Math.abs(d) * 4, top: 200 - 31 + d * IH, opacity: o, transform: `scale(${1 - Math.abs(d) * 0.05})`, transformOrigin: '0 50%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, height: 62, padding: '0 22px 0 10px', minWidth: sel ? 220 : 196, borderRadius: 40, background: '#fff', boxShadow: sel ? `0 0 0 2.5px ${B.ink}, 0 14px 30px -12px rgba(15,61,46,0.45)` : '0 0 0 1px #EEF0F2, 0 8px 18px -12px rgba(0,0,0,0.2)', fontSize: 20, fontWeight: sel ? 700 : 600, color: sel ? '#0B1F17' : '#374151', whiteSpace: 'nowrap' }}>
              <span style={{ width: 42, height: 42, borderRadius: 99, background: sel ? B.ink : col, opacity: sel ? 1 : 0.9, display: 'grid', placeItems: 'center' }}><Ic icon={icon} size={22} /></span>{label}
            </div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#fff 0%,rgba(255,255,255,0) 22%,rgba(255,255,255,0) 78%,#fff 100%)', pointerEvents: 'none' }} />
      {speed}
    </div>
  );
}

/* --------------------------------------------------------- scratch & win */
const SCR: [number, number][] = [[60, 120], [250, 90], [70, 190], [260, 170], [60, 260], [250, 240], [80, 320], [240, 320]];
const SCRL = SCR.slice(1).reduce((a, p, i) => [...a, a[a.length - 1] + Math.hypot(p[0] - SCR[i][0], p[1] - SCR[i][1])], [0]);
const scrAt = (k: number): [number, number] => {
  const d = clamp(k) * SCRL[SCRL.length - 1];
  for (let i = 1; i < SCR.length; i++) if (d <= SCRL[i]) { const f = (d - SCRL[i - 1]) / (SCRL[i] - SCRL[i - 1]); return [lerp(SCR[i - 1][0], SCR[i][0], f), lerp(SCR[i - 1][1], SCR[i][1], f)]; }
  return SCR[SCR.length - 1];
};
function Prize({ t }: { t: number }) {
  return (
    <div style={{ position: 'absolute', inset: 0, borderRadius: 22, overflow: 'hidden', background: 'radial-gradient(120% 90% at 50% 40%, #5B4318 0%, #2A1F0C 55%, #17110A 100%)', textAlign: 'center', boxShadow: 'inset 0 0 0 2px rgba(217,180,90,0.5)' }}>
      <div style={{ position: 'absolute', inset: '-40%', background: 'repeating-conic-gradient(from 0deg, rgba(246,231,176,0.10) 0deg 6deg, transparent 6deg 18deg)', transform: `rotate(${t * 8}deg)` }} />
      {Array.from({ length: 8 }, (_, i) => <span key={i} style={{ position: 'absolute', left: `${12 + ((i * 37) % 76)}%`, top: `${10 + ((i * 53) % 80)}%`, color: '#F6E7B0', fontSize: 10 + (i % 3) * 5, opacity: 0.4 + 0.5 * Math.abs(Math.sin(t * 2 + i)) }}>✦</span>)}
      <div style={{ position: 'relative', marginTop: 120, fontSize: 21, fontWeight: 600, color: '#E9D8A6' }}>Woahh!</div>
      <div style={{ position: 'relative', fontFamily: DISPLAY, fontSize: 92, fontWeight: 800, lineHeight: 1, background: `linear-gradient(180deg,#FFF4C8,${B.gold2} 60%,${B.gold3})`, WebkitBackgroundClip: 'text', color: 'transparent' }}>5%</div>
      <div style={{ position: 'relative', fontSize: 18, letterSpacing: '0.4em', color: '#E9D8A6', fontWeight: 700, marginTop: 6 }}>OFF</div>
    </div>
  );
}
function Foil({ k }: { k: number }) {
  const path = `M${SCR.map((p) => p.join(' ')).join(' L')}`;
  return (
    <svg width="310" height="400" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <linearGradient id="gfoil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F3D98B" /><stop offset="0.35" stopColor="#C9A04A" /><stop offset="0.55" stopColor="#F5E2A0" /><stop offset="1" stopColor="#A9802F" /></linearGradient>
        <pattern id="brush" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 6 L6 0" stroke="rgba(255,255,255,0.18)" strokeWidth="1" /></pattern>
        <mask id="scratch"><rect width="310" height="400" fill="#fff" /><path d={path} fill="none" stroke="#000" strokeWidth="96" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - k} /></mask>
      </defs>
      <g mask="url(#scratch)" opacity={1 - clamp((k - 0.9) * 10)}>
        <rect width="310" height="400" rx="22" fill="url(#gfoil)" />
        <rect width="310" height="400" rx="22" fill="url(#brush)" />
        <path d="M80 0 H230 L218 34 H92 Z" fill="#8A6A26" />
        <text x="155" y="23" textAnchor="middle" fontFamily="Inter" fontWeight="700" fontSize="15" fill="#F6E7B0">Congratulations!</text>
        <g transform="translate(155 160)"><circle r="34" fill="rgba(255,255,255,0.25)" /><path d="M-6 14 V-12 a6 6 0 0 1 12 0 V2 l10 2 a6 6 0 0 1 5 7 l-3 14 H-2 l-12 -12 a5 5 0 0 1 7 -7 z" fill="none" stroke="#5A4313" strokeWidth="3" strokeLinejoin="round" /></g>
        <text x="155" y="250" textAnchor="middle" fontFamily="Inter" fontWeight="700" fontSize="22" letterSpacing="3" fill="#5A4313">SCRATCH &amp;</text>
        <text x="155" y="306" textAnchor="middle" fontFamily="Inter" fontWeight="900" fontSize="60" letterSpacing="2" fill="#4A370F">WIN</text>
      </g>
    </svg>
  );
}

/* ================================================================ OPT-IN */
const TOOLS: [string, string, IconSvgElement][] = [['Welcome pop-up', '6.8% sign-up', BrowserIcon], ['Spin to win', '11.2% sign-up', GiftIcon], ['Scratch & win', '9.4% sign-up', Ticket01Icon], ['WhatsApp widget', '4.1% sign-up', BubbleChatIcon]];
export function LaunchOptin({ t }: { t: number }) {
  const lay = useLayout();
  const N = !lay.base;
  const deep = track(t, [[0, 0], [13.4, 0], [14.0, 1], [15.4, 1], [15.95, 0]]);
  const s1 = win(t, 0.1, 13.8, 0.5);
  const T = [0.3, 3.2, 7.0, 10.6, 13.6]; // tool windows
  const tool = t < T[1] ? 0 : t < T[2] ? 1 : t < T[3] ? 2 : 3;
  const inT = (i: number) => win(t, T[i], T[i + 1], 0.4);
  const bw = 1240, bh = 760;
  const wz = win(t, T[3] + 0.1, T[4] - 0.2, 0.6);
  const push = 1 + 0.07 * (inT(0) + inT(1) + inT(2)) + 0.32 * wz;
  const m = N ? 0.84 : 1;
  const camX = 400 * m * push * wz, camY = 150 * m * push * wz;
  const dim = Math.max(inT(0), inT(1), inT(2));

  // 1 welcome pop-up
  const n1 = typed('98765 43210', t, 1.0, 12), c1 = t > 0.9, p1 = 2.0, won1 = t > p1 + 0.1;
  // 2 reel
  const sp = 3.7, land = 5.3;
  const reelPos = 2 + prog(t, sp, land, (x) => 1 - Math.pow(1 - x, 3.2)) * (PRIZES.length * 3 + 0); // lands back on index 2 (15% off)
  const landed = t > land;
  const n2 = typed('98765 43210', t, 5.55, 14), c2 = t > 5.45, p2 = 6.35, won2 = t > p2 + 0.1;
  // 3 scratch
  const sk = prog(t, 7.6, 8.9, E.linear), fp = scrAt(sk);
  const n3 = typed('98765 43210', t, 9.25, 14), p3 = 9.95, won3 = t > p3 + 0.1;
  // 4 widget
  const fab = spring(t, T[3] + 0.1, 0.7, 0.35), open = spring(t, 11.4, 0.8, 0.12);
  const p4 = 11.25, p5 = 12.5;
  // payoff
  const s2 = win(t, 13.6, 15.95, 0.5);
  const subs = Math.round(1289 * prog(t, 14.1, 15.0, E.move));

  // hand, window-local
  let hand: [number, number, number] | null = null;
  if (t > 1.3 && t < 2.5) hand = [lerp(1000, 620, prog(t, 1.3, 1.9, E.move)), lerp(700, 560, prog(t, 1.3, 1.9, E.move)), tapK(t, p1)];
  else if (t > 3.2 && t < 4.0) hand = [lerp(1000, 850, prog(t, 3.2, 3.6, E.move)), lerp(700, 470, prog(t, 3.2, 3.6, E.move)), tapK(t, sp)];
  else if (t > 5.9 && t < 6.7) hand = [lerp(1000, 850, prog(t, 5.9, 6.25, E.move)), lerp(700, 575, prog(t, 5.9, 6.25, E.move)), tapK(t, p2)];
  else if (t > 9.5 && t < 10.3) hand = [lerp(900, 620, prog(t, 9.5, 9.85, E.move)), lerp(720, 655, prog(t, 9.5, 9.85, E.move)), tapK(t, p3)];
  else if (t > 10.7 && t < 12.9) hand = [lerp(lerp(800, 1160, prog(t, 10.7, 11.15, E.move)), 1000, prog(t, 12.0, 12.4, E.move)), lerp(lerp(500, 668, prog(t, 10.7, 11.15, E.move)), 512, prog(t, 12.0, 12.4, E.move)), Math.max(tapK(t, p4), tapK(t, p5))];

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: FONT }}>
      <Stage t={t} deep={deep} />
      <Space cam={{ s: push, x: camX, y: camY }}>
        <Obj x={960} y={575} rx={lerp(12, 6, prog(t, 0, 13))} ry={lerp(-9, -3, prog(t, 0, 13)) + Math.sin(t * 0.4) * 1.2} z={lerp(-250, 0, spring(t, 0, 1.2, 0.05)) + prog(t, 13.3, 13.9, E.exit) * 900} o={s1} mb={prog(t, 13.3, 13.9) * 8} ms={N ? 0.84 : 1} flat>
          <BrowserWin w={bw} h={bh} url="rangrez.in/festive">
            <div style={{ height: 70, display: 'flex', alignItems: 'center', gap: 36, padding: '0 40px', borderBottom: '1px solid rgba(20,15,46,0.06)', fontSize: 19, color: '#4B5563', fontWeight: 500 }}>
              <Brand size={0.8} /><span style={{ marginLeft: 20 }}>New in</span><span>Kurtas</span><span>Sarees</span><span>Festive</span>
            </div>
            <div style={{ display: 'flex', gap: 36, padding: '30px 40px' }}>
              <div style={{ width: 520, height: 540, borderRadius: 24, overflow: 'hidden' }}><KurtaShot /></div>
              <div style={{ flex: 1, paddingTop: 30 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: B.mid, letterSpacing: '0.1em' }}>DIWALI EDIT</div>
                <div style={{ fontFamily: DISPLAY, fontSize: 50, fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginTop: 8 }}>Festive silk kurta</div>
                <div style={{ fontSize: 30, fontWeight: 600, marginTop: 12 }}>₹3,450</div>
                <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>{['S', 'M', 'L', 'XL'].map((z) => <span key={z} style={{ width: 62, height: 54, borderRadius: 14, display: 'grid', placeItems: 'center', fontSize: 20, fontWeight: 600, boxShadow: 'inset 0 0 0 1.5px #E5E7EB' }}>{z}</span>)}</div>
                <div style={{ marginTop: 30, height: 72, borderRadius: 40, background: '#111', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 22, fontWeight: 600, width: 440 }}>Add to cart</div>
              </div>
            </div>
            <div style={{ position: 'absolute', inset: 0, background: `rgba(10,20,16,${0.42 * dim})`, backdropFilter: dim > 0.01 ? `blur(${dim * 3}px)` : undefined }} />

            {/* 1 · welcome pop-up */}
            {inT(0) > 0 ? (
              <div style={{ position: 'absolute', left: 300, top: 80, opacity: clamp(inT(0) * 2), transform: `translateY(${(1 - spring(t, T[0], 0.7, 0.2)) * 40}px) scale(${lerp(0.95, 1, inT(0))})` }}>
                <Modal w={640}>
                  {!won1 ? (
                    <div style={{ display: 'flex' }}>
                      <div style={{ width: 230, borderRadius: '28px 0 0 28px', overflow: 'hidden' }}><KurtaShot /></div>
                      <div style={{ flex: 1, padding: '34px 34px 22px', textAlign: 'center' }}>
                        <Brand size={0.75} />
                        <div style={{ fontFamily: DISPLAY, fontSize: 31, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 18, lineHeight: 1.1 }}>Get 10% off your first order</div>
                        <div style={{ fontSize: 16, color: '#6B7280', marginTop: 8 }}>Your code arrives on WhatsApp.</div>
                        <div style={{ marginTop: 18 }}><Consent on={c1} /></div>
                        <div style={{ marginTop: 12 }}><Phone v={n1} focus={t > 1.0} /></div>
                        <div style={{ marginTop: 12 }}><Btn press={tapK(t, p1)}>Unlock 10% off</Btn></div>
                        <Powered />
                      </div>
                    </div>
                  ) : <Congrats t={t} at={p1 + 0.1} won="10% off" code="WELCOME10" />}
                </Modal>
              </div>
            ) : null}

            {/* 2 · spin to win (prize reel) */}
            {inT(1) > 0 ? (
              <div style={{ position: 'absolute', left: won2 ? 360 : 190, top: won2 ? 30 : 110, opacity: clamp(inT(1) * 2), transform: `scale(${lerp(0.95, 1, inT(1))})` }}>
                <Modal w={won2 ? 520 : 860}>
                  {!won2 ? (
                    <div style={{ display: 'flex', alignItems: 'center', padding: '20px 40px 20px 20px' }}>
                      <Reel pos={reelPos} landed={landed} />
                      <div style={{ flex: 1, padding: '10px 0 10px 20px', textAlign: 'center' }}>
                        <Brand size={0.8} />
                        <div style={{ fontFamily: DISPLAY, fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 18, lineHeight: 1.1 }}>Unlock your Diwali discount</div>
                        <div style={{ fontSize: 16.5, color: '#6B7280', marginTop: 8 }}>Spin to win up to 20% off or free shipping.</div>
                        {!landed ? (
                          <div style={{ marginTop: 26 }}><Btn press={tapK(t, sp)}>{t > sp ? 'Spinning…' : 'Spin to win'}</Btn></div>
                        ) : (
                          <div style={{ marginTop: 16, display: 'grid', gap: 10, ...fade(t, land) }}>
                            <Consent on={c2} />
                            <Phone v={n2} focus />
                            <Btn press={tapK(t, p2)}>Claim 15% off</Btn>
                          </div>
                        )}
                        <Powered />
                      </div>
                    </div>
                  ) : <Congrats t={t} at={p2 + 0.1} won="15% off" code="FEST15" />}
                </Modal>
              </div>
            ) : null}

            {/* 3 · scratch & win */}
            {inT(2) > 0 ? (
              <div style={{ position: 'absolute', left: 390, top: 20, opacity: clamp(inT(2) * 2), transform: `scale(${lerp(0.95, 1, inT(2))})` }}>
                <Modal w={460}>
                  <div style={{ padding: '30px 30px 18px', textAlign: 'center' }}>
                    <Brand size={0.75} />
                    <div style={{ fontFamily: DISPLAY, fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 14 }}>{won3 ? 'Hurray! You unlocked a prize' : sk >= 1 ? 'Nice! Unlock your code' : 'Scratch & Win ✦'}</div>
                    <div style={{ fontSize: 15.5, color: '#6B7280', marginTop: 6 }}>{won3 ? 'Your coupon is on the card.' : sk >= 1 ? 'Add your WhatsApp number to get it.' : 'Scratch the foil, then claim at checkout.'}</div>
                    <div style={{ position: 'relative', width: 310, height: 400, margin: '18px auto 0', transform: `scale(${won3 ? 0.9 : sk >= 1 ? lerp(1, 0.66, prog(t, 8.9, 9.2, E.move)) : 1})`, transformOrigin: '50% 0' }}>
                      <Prize t={t} />
                      <Foil k={sk} />
                      {won3 ? <div style={{ position: 'absolute', left: 18, right: 18, bottom: 18 }}><Ticket code="OFF5" w={274} k={spring(t, p3 + 0.15, 0.7, 0.25)} /></div> : null}
                      {t > 7.4 && t < 9.0 ? <Touch x={fp[0]} y={fp[1]} size={56} press={0.6} o={win(t, 7.4, 9.0, 0.2)} /> : null}
                    </div>
                    {sk >= 1 && !won3 ? <div style={{ display: 'grid', gap: 10, marginTop: -130, ...fade(t, 9.1) }}><Consent on={t > 9.1} /><Phone v={n3} focus /><Btn press={tapK(t, p3)}>Get my code</Btn></div> : null}
                    <Powered />
                  </div>
                </Modal>
              </div>
            ) : null}

            {/* 4 · WhatsApp widget */}
            {t > T[3] ? (
              <>
                <div style={{ position: 'absolute', right: 28, bottom: 120, width: 440, transformOrigin: '100% 100%', transform: `scale(${open})`, opacity: clamp(open * 2) }}>
                  <div style={{ borderRadius: 26, overflow: 'hidden', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05), 0 40px 80px -24px rgba(0,0,0,0.4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '20px 22px', background: `linear-gradient(135deg,${B.ink},${B.mid})`, color: '#fff' }}>
                      <span style={{ width: 50, height: 50, borderRadius: 99, background: '#fff', display: 'grid', placeItems: 'center' }}><Brand size={0.0001} /><span style={{ fontFamily: DISPLAY, fontWeight: 800, color: B.ink, fontSize: 22 }}>R</span></span>
                      <div style={{ flex: 1 }}><div style={{ fontSize: 20, fontWeight: 700 }}>Rangrez Handloom</div><div style={{ fontSize: 14.5, opacity: 0.85, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 9, background: '#4ADE80' }} />Replies instantly</div></div>
                    </div>
                    <div style={{ padding: 20, background: '#F7F5F0' }}>
                      <div style={{ ...fade(t, 11.6), background: '#fff', borderRadius: 16, borderTopLeftRadius: 4, padding: '12px 16px', fontSize: 17, color: '#111B21', maxWidth: 340, boxShadow: '0 1px 1px rgba(0,0,0,0.06)' }}>Namaste! How can we help today?</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                        {['Diwali offers', 'Track my order', 'Size help'].map((q, i) => <span key={q} style={{ ...fade(t, 11.8 + i * 0.1), padding: '9px 14px', borderRadius: 20, fontSize: 15.5, fontWeight: 600, color: B.mid, background: i === 0 && t > p5 ? B.soft : '#fff', boxShadow: `inset 0 0 0 1.5px ${i === 0 && t > p5 ? B.mid : '#D9E7DF'}` }}>{q}</span>)}
                      </div>
                      <div style={{ ...fade(t, 12.0), marginTop: 14 }}><Consent on={t > p5} /></div>
                      <div style={{ ...fade(t, 12.15), marginTop: 14, height: 54, borderRadius: 30, background: '#25D366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 18, fontWeight: 700 }}><SiWhatsapp size={22} />Continue on WhatsApp</div>
                      <Powered />
                    </div>
                  </div>
                </div>
                <div style={{ position: 'absolute', right: 28, bottom: 28, width: 76, height: 76, borderRadius: 99, background: '#25D366', display: 'grid', placeItems: 'center', boxShadow: `0 16px 30px -8px rgba(22,163,74,0.6), 0 0 0 ${(Math.sin(t * 5) + 1) * 7}px rgba(37,211,102,0.16)`, transform: `scale(${fab})` }}>
                  {open > 0.5 ? <span style={{ color: '#fff', fontSize: 34, lineHeight: 1 }}>×</span> : <SiWhatsapp size={40} color="#fff" />}
                </div>
              </>
            ) : null}
            {hand ? <Hand x={hand[0]} y={hand[1]} press={hand[2]} raw s={1.3} /> : null}
          </BrowserWin>
        </Obj>

        {/* payoff */}
        {TOOLS.map(([name, , ic], i) => {
          const a = [Math.PI, -Math.PI * 0.75, -Math.PI * 0.25, 0][i];
          const k = prog(t, 14.3 + i * 0.08, 14.9 + i * 0.08, E.move);
          return <Obj key={name} x={960 + Math.cos(a) * 520 * (1 - k)} y={430 + Math.sin(a) * 260 * (1 - k)} s={lerp(1, 0.3, k)} o={s2 * prog(t, 13.8 + i * 0.1, 14.2 + i * 0.1) * (1 - k)}><GlassIcon icon={ic} size={110} /></Obj>;
        })}
        <Obj x={960} y={430} z={40} o={s2} s={lerp(0.6, 1, spring(t, 13.7, 0.9, 0.2)) * (1 + Math.sin(clamp((t - 14.9) / 0.4) * Math.PI) * 0.1)}>
          <GlassIcon size={150} tone="linear-gradient(140deg,#4ADE80,#16A34A 60%,#15803D)" node={<SiWhatsapp size={78} color="#fff" />} />
        </Obj>
        <Obj x={960} y={650} o={s2 * prog(t, 14.0, 14.4)}><Figure value={`+${inr(subs)}`} size={150} dark /></Obj>
        <Obj x={960} y={770} o={s2 * prog(t, 14.3, 14.7)}><Caption dark>WhatsApp subscribers this week, consent saved for each</Caption></Obj>
      </Space>
      <div style={{ position: 'absolute', left: 0, right: 0, top: N ? 34 : 40, display: 'flex', justifyContent: 'center', gap: 12, opacity: s1 * prog(t, 0.6, 1.0), zIndex: 5000, fontFamily: FONT }}>
        {TOOLS.map(([name, rate, ic], i) => {
          const on = i === tool;
          return (
            <div key={name} style={{ display: N && !on ? 'none' : 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', borderRadius: 18, background: on ? '#111' : 'rgba(255,255,255,0.9)', color: on ? '#fff' : '#4B5563', fontSize: 20, fontWeight: 600, whiteSpace: 'nowrap', boxShadow: on ? '0 14px 30px -12px rgba(0,0,0,0.5)' : '0 0 0 1px rgba(17,24,39,0.08)', transform: `scale(${on ? 1.05 : 1})` }}>
              <Ic icon={ic} size={22} color={on ? '#fff' : '#6B7280'} />{name}{on ? <span style={{ opacity: 0.7, fontWeight: 500 }}>· {rate}</span> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
void [Tap01Icon, L];
export const optinReal = { 'L-optin': { w: W, h: H, duration: 16, Component: LaunchOptin } };
