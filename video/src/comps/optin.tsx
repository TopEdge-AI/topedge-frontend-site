/**
 * Chapter 02 — Opt-in tools (docs/video/feature-library/ch02_opt_in_tools.md).
 * 02-S2 doubles as the home "Website Opt-in Tools" film.
 */
import type { CSSProperties, ReactNode } from 'react';
import {
  CheckmarkCircle02Icon, Clock01Icon, Copy01Icon, Cursor01Icon, ScrollIcon, ShoppingCart01Icon, UserAdd01Icon, UserGroupIcon,
} from '@hugeicons/core-free-icons';
import { SiWhatsapp } from 'react-icons/si';
import { E, clamp, lerp, prog, spring, typed, useSize } from '../lib/time';
import {
  Backdrop, C, Card, CardHeader, CheckCircle, Chip, Cursor, DateChip, DISPLAY, FONT, Icon, Layer, TemplateBubble, Toast, Touch,
  WaHeader, WaScreen, pop,
} from '../lib/ui';
import { Avatar, ShopPage, Toggle, rowIn } from '../lib/kit2';
import { DoorbellShot } from '../lib/products';
import { LockScreen, PhoneRig, SuccessPage, backdropState, cursorAt, phoneOffset, phoneTouch, screenY } from '../lib/rig';

const T = 1080;
const W = 1920;
const GREEN = 'linear-gradient(180deg,#166534,#0F3D22)';
const GOLD = 'linear-gradient(100deg,#F7E2A3 0%,#E8C46A 38%,#F9E7B5 62%,#D9AD4F 100%)';

/* ------------------------------------------------------------ popup atoms */
const NovaLogo = ({ s = 1 }: { s?: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 * s, color: '#059669', fontWeight: 800, fontSize: 18 * s, letterSpacing: '0.08em', lineHeight: 1 }}>
    <svg width={30 * s} height={30 * s} viewBox="0 0 24 24"><path d="M3 11 12 3l9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" fill="#059669" /></svg>
    <span>NOVA<br />HOME</span>
  </div>
);
const Powered = ({ s = 1 }: { s?: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 * s, fontSize: 16 * s, color: C.muted, marginTop: 16 * s }}>
    <span style={{ width: 8 * s, height: 8 * s, borderRadius: 99, background: C.violet }} />Powered by TopEdge AI
  </div>
);
function PhoneField({ value, s = 1, caret }: { value: string; s?: number; caret?: boolean }) {
  return (
    <div style={{ display: 'flex', height: 66 * s, borderRadius: 16 * s, boxShadow: `inset 0 0 0 ${caret ? 2.5 : 1.5}px ${caret ? '#166534' : 'rgba(16,24,40,0.14)'}`, overflow: 'hidden', fontSize: 26 * s, fontFamily: FONT }}>
      <span style={{ width: 86 * s, display: 'grid', placeItems: 'center', background: '#F3F4F6', color: C.ink2, fontWeight: 600 }}>+91</span>
      <span style={{ flex: 1, display: 'flex', alignItems: 'center', padding: `0 ${18 * s}px`, fontWeight: 600, letterSpacing: '0.02em', color: C.ink }}>
        {value || <span style={{ color: C.faint, fontWeight: 400 }}>WhatsApp number</span>}
        {caret ? <span style={{ width: 2.5 * s, height: 30 * s, background: '#166534', marginLeft: 2 }} /> : null}
      </span>
    </div>
  );
}
const Consent = ({ on, text, s = 1 }: { on: number; text: string; s?: number }) => (
  <div style={{ display: 'flex', gap: 12 * s, alignItems: 'flex-start', fontSize: 18 * s, color: C.ink2, marginTop: 14 * s, lineHeight: 1.35 }}>
    <span style={{ width: 26 * s, height: 26 * s, borderRadius: 7 * s, flex: 'none', background: on > 0.5 ? '#16A34A' : '#fff', boxShadow: on > 0.5 ? 'none' : 'inset 0 0 0 1.5px rgba(16,24,40,0.25)', display: 'grid', placeItems: 'center', transform: `scale(${1 + 0.15 * Math.sin(on * Math.PI)})` }}>
      {on > 0.5 ? <svg width={16 * s} height={16 * s} viewBox="0 0 16 16"><path d="M3 8.5l3 3 7-7" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg> : null}
    </span>
    {text}
  </div>
);
const GreenPill = ({ children, press = 0, s = 1, wa }: { children: ReactNode; press?: number; s?: number; wa?: boolean }) => (
  <div style={{ height: 64 * s, borderRadius: 999, background: GREEN, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 * s, fontSize: 23 * s, fontWeight: 700, marginTop: 16 * s, transform: `scale(${1 - press * 0.04})`, boxShadow: '0 14px 26px -12px rgba(15,61,34,0.7), inset 0 1.5px 0 rgba(255,255,255,0.2)' }}>
    {wa ? <SiWhatsapp size={24 * s} /> : null}{children}
  </div>
);
function GoldTicket({ code, s = 1, copied = 0, press = 0 }: { code: string; s?: number; copied?: number; press?: number }) {
  return (
    <div style={{ position: 'relative', borderRadius: 18 * s, background: GOLD, padding: `${18 * s}px ${26 * s}px`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 12px 30px -14px rgba(150,100,20,0.6)' }}>
      <span style={{ position: 'absolute', left: -12 * s, top: '50%', width: 24 * s, height: 24 * s, marginTop: -12 * s, borderRadius: 99, background: '#fff' }} />
      <span style={{ position: 'absolute', right: -12 * s, top: '50%', width: 24 * s, height: 24 * s, marginTop: -12 * s, borderRadius: 99, background: '#fff' }} />
      <div>
        <div style={{ fontSize: 14 * s, letterSpacing: '0.2em', color: '#7A5A12', fontWeight: 700 }}>YOUR CODE</div>
        <div style={{ fontSize: 36 * s, fontWeight: 800, letterSpacing: '0.12em', color: '#3D2A05' }}>{code}</div>
      </div>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 * s, height: 46 * s, padding: `0 ${18 * s}px`, borderRadius: 99, background: '#111', color: '#fff', fontSize: 18 * s, fontWeight: 600, transform: `scale(${1 - press * 0.05})` }}>
        <Icon icon={copied > 0.5 ? CheckmarkCircle02Icon : Copy01Icon} size={20 * s} color="#fff" />{copied > 0.5 ? 'Copied' : 'Copy code'}
      </span>
    </div>
  );
}
const Popup = ({ w, children, style }: { w: number; children: ReactNode; style?: CSSProperties }) => (
  <div style={{ width: w, background: '#fff', borderRadius: 30, padding: 34, position: 'relative', boxShadow: '0 50px 100px -40px rgba(10,40,30,0.45), 0 0 0 1.5px rgba(16,24,40,0.05)', fontFamily: FONT, color: C.ink, ...style }}>
    <span style={{ position: 'absolute', right: 20, top: 20, width: 40, height: 40, borderRadius: 99, background: '#F3F4F6', display: 'grid', placeItems: 'center', color: C.muted, fontSize: 24 }}>×</span>
    {children}
  </div>
);
const sat = (k: number, node: ReactNode, style: CSSProperties, origin: string) => {
  const p = pop(k);
  return <div style={{ position: 'absolute', transform: `scale(${p.s})`, transformOrigin: origin, opacity: p.o, zIndex: 40, ...style }}>{node}</div>;
};
const xfade = (t: number, a: number, b = a + 0.35) => prog(t, a, b);

/* ================================================================= 02-T1 */
export function T1({ t }: { t: number }) {
  const rows: [string, string, string, string, number][] = [
    ['Ananya Rao', '#0284C7', 'Spin to win', 'just now', 1.1],
    ['Kabir Shah', '#7C3AED', 'Welcome popup', '9m', -1],
    ['Meera Pillai', '#DB2777', 'Chat widget', '21m', -1],
    ['Rohan Das', '#D97706', 'Pulse Drop', '1h', -1],
  ];
  const ins = prog(t, 1.1, 1.6, E.move);
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="dawn" pattern="beams" w={T} h={T} />
      <Layer x={540} y={560}>
        <div style={{ position: 'relative' }}>
          <Card w={880}>
            <CardHeader icon={UserGroupIcon} title="Subscribers" size={34} right={<Chip tone="emerald" dot size={22} pulse={(t * 0.8) % 1}>Live</Chip>} />
            <div style={{ position: 'relative', height: 3 * 104 + 104 * ins }}>
              {rows.map(([n, col, src, tm, at], i) => (
                <div key={n} style={{ position: 'absolute', left: 0, right: 0, top: i === 0 ? 0 : (i - 1 + ins) * 104, display: 'flex', alignItems: 'center', gap: 18, padding: '14px 16px', borderRadius: 18, background: i === 0 ? `rgba(5,150,105,${0.07 * (1 - prog(t, 2.2, 4.2))})` : 'transparent', ...(at > 0 ? rowIn(t, at) : {}) }}>
                  <Avatar name={n} color={col} size={60} />
                  <div style={{ flex: 1 }}><div style={{ fontSize: 29, fontWeight: 600 }}>{n}</div><div style={{ fontSize: 23, color: C.muted }}>{src} · {tm}</div></div>
                  <Chip tone="emerald" icon={CheckmarkCircle02Icon} size={20}>Opted in</Chip>
                </div>
              ))}
            </div>
          </Card>
          {sat(spring(t, 1.9, 0.55, 0.18), <Toast icon={UserAdd01Icon} title="+38 today" sub="All with consent" size={28} />, { right: -20, top: -70 }, '100% 100%')}
        </div>
      </Layer>
    </div>
  );
}

/* ================================================================= 02-T2 */
export function T2({ t }: { t: number }) {
  const rows: [typeof Clock01Icon, string, string, number][] = [
    [Cursor01Icon, 'Exit intent', 'Cursor leaves the tab', 0.9],
    [Clock01Icon, 'After 8 seconds', 'On any product page', 1.7],
    [ScrollIcon, 'Scrolled 50%', 'Collection pages', 2.5],
  ];
  const cur = cursorAt(t, [[0.2, 980, 1000], [0.85, 905, 390], [1.65, 905, 506], [2.45, 905, 622], [3.3, 1060, 1100]], [0.9, 1.7, 2.5]);
  const live = spring(t, 3.3, 0.55, 0.18);
  const lp = pop(live);
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="sunrise" pattern="grid" w={T} h={T} />
      <Layer x={540} y={500}>
        <Card w={880}>
          <CardHeader icon={Clock01Icon} title="Show popup when" size={34} />
          {rows.map(([icon, a, b, at]) => (
            <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '18px 20px', borderRadius: 20, boxShadow: `0 0 0 1.5px ${C.line}`, marginBottom: 14 }}>
              <Icon icon={icon} size={36} />
              <div style={{ flex: 1 }}><div style={{ fontSize: 30, fontWeight: 600 }}>{a}</div><div style={{ fontSize: 24, color: C.muted }}>{b}</div></div>
              <Toggle on={prog(t, at + 0.02, at + 0.3, E.move)} size={1.1} />
            </div>
          ))}
        </Card>
      </Layer>
      <Layer x={540} y={880} s={lp.s} o={lp.o}><Chip tone="emerald" dot size={28} pulse={(t * 0.8) % 1}>Live on 3 pages</Chip></Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.2, 0.45) * (1 - prog(t, 3.0, 3.3))} s={1.7} />
    </div>
  );
}

/* ================================================================= 02-T3 */
export function T3({ t }: { t: number }) {
  const cur = cursorAt(t, [[0.3, 500, 700], [1.15, 905, 905], [3.6, 905, 905], [3.95, 740, 762], [4.6, 1100, 1100]], [1.25, 4.05]);
  const card = spring(t, 1.6, 0.55, 0.16) * (1 - prog(t, 7.0, 7.4));
  const cp = pop(card);
  const num = typed('90000 11223', t, 2.2, 9);
  const saved = prog(t, 4.1, 4.4);
  const ring = (t % 2) / 2;
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="iris" pattern="rings" w={T} h={T} />
      <Layer x={540} y={540}>
        <div style={{ width: 900, height: 820, borderRadius: 28, overflow: 'hidden', background: '#fff', boxShadow: '0 40px 90px -40px rgba(30,20,80,0.4), 0 0 0 1.5px rgba(16,24,40,0.06)', position: 'relative' }}>
          <div style={{ height: 66, background: '#F6F6F8', borderBottom: `1.5px solid ${C.line}`, display: 'flex', alignItems: 'center', padding: '0 22px', gap: 10 }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} style={{ width: 14, height: 14, borderRadius: 99, background: c }} />)}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}><div style={{ width: '56%', height: 38, borderRadius: 11, background: '#EBEBEF', display: 'grid', placeItems: 'center', fontSize: 19, color: C.ink2 }}>novahome.in/doorbell</div></div>
          </div>
          <div style={{ position: 'absolute', left: 0, top: 66, width: '55%', height: 380 }}><DoorbellShot /></div>
          <div style={{ position: 'absolute', left: '60%', right: 40, top: 130 }}>
            <div style={{ fontFamily: DISPLAY, fontSize: 38, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Smart Doorbell Ultra</div>
            <div style={{ fontSize: 30, fontWeight: 600, marginTop: 14 }}>₹4,499</div>
            <div style={{ height: 16, width: '80%', background: '#F0F0F3', borderRadius: 8, marginTop: 26 }} />
            <div style={{ height: 16, width: '60%', background: '#F0F0F3', borderRadius: 8, marginTop: 12 }} />
          </div>
          {/* widget */}
          <div style={{ position: 'absolute', right: 130, bottom: 120, width: 520, transform: `scale(${cp.s})`, transformOrigin: '100% 100%', opacity: cp.o, background: '#fff', borderRadius: 24, padding: 26, boxShadow: '0 30px 60px -20px rgba(16,24,40,0.35), 0 0 0 1.5px rgba(16,24,40,0.06)' }}>
            <div style={{ fontSize: 27, fontWeight: 700 }}>Chat with Nova Home</div>
            <div style={{ fontSize: 20, color: C.muted, margin: '4px 0 16px' }}>Order updates and offers on WhatsApp</div>
            <PhoneField value={num} s={0.85} caret={t > 2.1 && t < 3.6} />
            <div style={{ position: 'relative', height: 70 }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 1 - saved }}><GreenPill s={0.85} wa press={cur.press * prog(t, 3.9, 4.0)}>Continue on WhatsApp</GreenPill></div>
              <div style={{ position: 'absolute', inset: '18px 0 0', display: 'flex', justifyContent: 'center', opacity: saved }}><Chip tone="emerald" icon={CheckmarkCircle02Icon} size={22}>Number saved</Chip></div>
            </div>
          </div>
          <div style={{ position: 'absolute', right: 34, bottom: 34, width: 84, height: 84 }}>
            <span style={{ position: 'absolute', inset: -14 * ring, borderRadius: 99, border: `3px solid rgba(37,211,102,${0.6 * (1 - ring)})` }} />
            <span style={{ position: 'absolute', inset: 0, borderRadius: 99, background: '#25D366', display: 'grid', placeItems: 'center', boxShadow: '0 12px 24px -8px rgba(37,211,102,0.7)', transform: `scale(${1 - 0.06 * cur.press * prog(t, 1.1, 1.2)})` }}><SiWhatsapp size={44} color="#fff" /></span>
          </div>
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.3, 0.55) * (1 - prog(t, 4.4, 4.7))} s={1.7} />
    </div>
  );
}

/* ================================================================= 02-S1 */
export function S1({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const cur = cursorAt(t, [[0.4, 1400, h - 100], [1.4, 960, CY + 10], [3.6, 960, CY + 10], [4.3, 960, CY + 228], [5.4, 1400, h + 60]], [1.5, 4.4]);
  const tap = prog(t, 1.5, 1.6) * (1 - prog(t, 1.7, 2.1));
  const unlocked = xfade(t, 2.2, 2.6);
  const ring = ((t * 0.55) % 1);
  const tst = spring(t, 5.0, 0.6, 0.16);
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="mint" pattern="lines" w={W} h={h} />
      <Layer x={960} y={CY} s={1.1}>
        <div style={{ position: 'relative' }}>
          <Popup w={760} style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', height: 520 }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 1 - unlocked }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}><NovaLogo /></div>
                <div style={{ fontFamily: DISPLAY, fontSize: 40, fontWeight: 700, marginTop: 22 }}>Your glow drop is ready</div>
                <div style={{ fontSize: 23, color: C.muted, marginTop: 6 }}>Tap once to reveal your offer.</div>
                <div style={{ position: 'relative', width: 200, height: 200, margin: '34px auto 18px' }}>
                  <span style={{ position: 'absolute', inset: -30 * ring, borderRadius: 99, border: `2px solid rgba(124,58,237,${0.55 * (1 - ring)})` }} />
                  <span style={{ position: 'absolute', inset: 0, borderRadius: 99, background: 'radial-gradient(circle at 38% 30%, #D8C8FF 0%, #9B6BFF 35%, #6D28D9 70%, #3B1287 100%)', boxShadow: '0 30px 60px -20px rgba(109,40,217,0.7)', transform: `scale(${1 - 0.1 * tap + 0.08 * Math.sin(prog(t, 1.6, 2.1) * Math.PI)})` }} />
                  <span style={{ position: 'absolute', left: 46, top: 30, width: 60, height: 32, borderRadius: 99, background: 'rgba(255,255,255,0.45)', filter: 'blur(6px)' }} />
                </div>
                <div style={{ fontSize: 24, color: C.violet, fontWeight: 600 }}>Tap to open</div>
              </div>
              <div style={{ position: 'absolute', inset: 0, opacity: unlocked, transform: `translateY(${lerp(14, 0, unlocked)}px)` }}>
                <div style={{ fontSize: 20, color: C.violet, fontWeight: 700, letterSpacing: '0.12em' }}>OFFER UNLOCKED</div>
                <div style={{ fontFamily: DISPLAY, fontSize: 44, fontWeight: 700, marginTop: 14 }}>Free shipping, locked in</div>
                <div style={{ fontSize: 23, color: C.muted, marginTop: 8 }}>Claim it on WhatsApp so it never gets lost.</div>
                <div style={{ display: 'flex', borderRadius: 18, overflow: 'hidden', margin: '30px 30px 0', boxShadow: '0 0 0 2px #7C3AED' }}>
                  <span style={{ width: 150, display: 'grid', placeItems: 'center', background: '#7C3AED', color: '#fff', fontWeight: 700, fontSize: 18, letterSpacing: '0.14em' }}>OFFER</span>
                  <span style={{ flex: 1, padding: '18px 0', fontSize: 38, fontWeight: 800, letterSpacing: '0.12em', color: '#3B1287' }}>FREESHIP</span>
                </div>
                <div style={{ margin: '0 30px' }}><GreenPill wa press={cur.press * prog(t, 4.3, 4.35)}>Claim on WhatsApp</GreenPill></div>
              </div>
            </div>
            <Powered />
          </Popup>
          {sat(tst, <Toast icon={ShoppingCart01Icon} title="Claimed on WhatsApp" sub="Added to subscriber list" size={29} />, { right: -60, bottom: -50 }, '100% 100%')}
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.4, 0.65) * (1 - prog(t, 5.0, 5.4))} s={1.8} />
    </div>
  );
}

/* ================================================================= 02-S2 */
export function S2({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const bd = backdropState(t, 4.9);
  const off = phoneOffset(t, 5.05);
  const num = typed('90000 12347', t, 0.8, 7.5);
  const cur = cursorAt(t, [[0.3, 1500, h - 120], [0.75, 1180, CY + 120], [2.4, 1180, CY + 120], [2.7, 640, CY + 192], [3.4, 960, CY + 282], [4.4, 1500, h + 80]], [2.75, 3.5]);
  const tick = prog(t, 2.75, 2.85);
  const done = xfade(t, 4.0, 4.4);
  const chatIn = prog(t, 6.55, 7.0, E.enter);
  const bubble = spring(t, 6.75, 0.6, 0.15);
  const shop = prog(t, 8.95, 9.45, E.enter);
  const buy = prog(t, 10.55, 10.65) * (1 - prog(t, 10.75, 10.85));
  const success = prog(t, 11.05, 11.4, E.enter);
  const ctaPress = prog(t, 8.45, 8.55) * (1 - prog(t, 8.65, 8.75));
  const touch = phoneTouch(t, [[6.0, 6.7, 195, 278], [7.95, 8.85, 195, 494], [10.05, 10.95, 195, 446]], off);
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="lime" pattern="mesh" w={W} h={h} />
      <Layer x={960} y={CY} s={bd.s} o={bd.o} blur={bd.blur}>
        <Popup w={900} style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ height: 250, position: 'relative' }}>
            <DoorbellShot />
            <div style={{ position: 'absolute', left: 30, top: 34, maxWidth: 380 }}>
              <span style={{ background: '#111', color: '#fff', borderRadius: 99, padding: '4px 12px', fontSize: 16, fontWeight: 700 }}>New</span>
              <div style={{ fontFamily: DISPLAY, fontSize: 32, fontWeight: 700, marginTop: 12, lineHeight: 1.12 }}>Smart Doorbell Ultra, our best yet.</div>
              <span style={{ display: 'inline-block', marginTop: 12, background: '#F97316', color: '#fff', borderRadius: 8, padding: '4px 10px', fontSize: 16, fontWeight: 700 }}>Shop now</span>
            </div>
          </div>
          <div style={{ padding: '28px 40px 30px' }}>
            <NovaLogo s={0.85} />
            <div style={{ position: 'relative', height: 96, marginTop: 14 }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 1 - done }}>
                <div style={{ fontFamily: DISPLAY, fontSize: 38, fontWeight: 700 }}>Get 10% OFF your first order</div>
                <div style={{ fontSize: 22, color: C.muted, marginTop: 4 }}>Enter your WhatsApp number to unlock it.</div>
              </div>
              <div style={{ position: 'absolute', inset: 0, opacity: done }}>
                <div style={{ fontFamily: DISPLAY, fontSize: 38, fontWeight: 700 }}>You are in!</div>
                <div style={{ fontSize: 22, color: C.muted, marginTop: 4 }}>Check WhatsApp for your code.</div>
              </div>
            </div>
            <PhoneField value={num} caret={t > 0.7 && t < 2.5} />
            <Consent on={tick} text="I agree to receive order updates and offers on WhatsApp." />
            <GreenPill press={cur.press * prog(t, 3.3, 3.4)}>Unlock 10% off</GreenPill>
            <Powered />
          </div>
        </Popup>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.3, 0.55) * (1 - prog(t, 4.1, 4.4))} s={1.8} />
      <PhoneRig offset={off} time="11:02">
        <LockScreen t={t} time="11:02" date="Thursday, 19 November" bannerAt={5.6} bannerTitle="Nova Home" bannerBody="Your 10% off code is here: WELCOME10" wall={['#BDEBDA', '#C9D6FF']} />
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${screenY(chatIn)}px)`, opacity: chatIn > 0 ? 1 : 0 }}>
          <WaScreen>
            <WaHeader name="Nova Home" letter="N" color="#059669" />
            <div style={{ position: 'absolute', top: 122, left: 0, right: 0 }}><DateChip /></div>
            <div style={{ position: 'absolute', top: 152, left: 30, right: 30, background: '#FFF6C9', borderRadius: 8, fontSize: 11.5, color: '#54656F', textAlign: 'center', padding: '5px 8px' }}>Messages from this business are secured by Meta.</div>
            <div style={{ position: 'absolute', top: 186, left: 12, opacity: clamp(bubble * 2), transform: `translateY(${lerp(30, 0, bubble)}px) scale(${lerp(0.96, 1, bubble)})`, transformOrigin: '0 0' }}>
              <TemplateBubble media={<DoorbellShot />} title="Welcome to Nova Home" body="Here is 10% off your first order. Use code WELCOME10 at checkout." time="11:02" cta="Shop now" ctaPress={ctaPress} />
            </div>
          </WaScreen>
        </div>
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${screenY(shop)}px)`, opacity: shop > 0 ? 1 : 0, zIndex: 12 }}>
          <ShopPage host="novahome.in" media={<DoorbellShot tag="−10%" />} title="Smart Doorbell Ultra" price="₹4,049" was="₹4,499" code="WELCOME10" strip="Code applied from WhatsApp" cta="Buy now · COD" press={buy} />
          <div style={{ position: 'absolute', inset: 0, opacity: success, zIndex: 3 }}>
            {success > 0 ? <SuccessPage t={t} at={11.15} title="Order placed" order="Thank you, Aditi! Order #1042" chip="Tracking updates on WhatsApp" /> : null}
          </div>
        </div>
      </PhoneRig>
      {touch ? <Touch {...touch} /> : null}
      {sat(spring(t, 11.8, 0.6, 0.16), <Toast icon={UserAdd01Icon} title="New subscriber" sub="Consent saved · Welcome popup" size={30} />, { left: 250, top: CY - 150 }, '100% 50%')}
      {sat(spring(t, 12.2, 0.6, 0.16), <Toast icon={ShoppingCart01Icon} title="₹4,049 order" sub="Attributed to Welcome popup" size={30} />, { left: 1340, top: CY + 120 }, '0 50%')}
    </div>
  );
}

/* ================================================================= 02-S3 */
const PRIZES: [string, string][] = [['Free SD card', '#9CA3AF'], ['10% off', '#E11D48'], ['Free shipping', '#059669'], ['5% off', '#166534'], ['Free bracket', '#0284C7']];
export function S3({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const cur = cursorAt(t, [[0.3, 1500, h - 100], [0.95, 1250, CY + 110], [1.2, 1250, CY + 110], [4.2, 1105, CY + 4], [4.5, 1105, CY + 4], [7.3, 1105, CY + 152], [8.0, 1500, h + 60]], [1.0, 4.3, 7.4]);
  const spinning = t >= 1.0 && t < 3.8;
  // reel: index offset decelerating to land on "5% off" (index 3 in a long strip)
  const target = 5 * 6 + 3;
  const k = prog(t, 1.15, 3.8, (x) => 1 - Math.pow(1 - x, 3.2));
  const pos = lerp(0, target, k);
  const won = xfade(t, 5.4, 5.9);
  const winCard = spring(t, 5.9, 0.7, 0.16);
  const wp = pop(winCard);
  const num = typed('90000 12352', t, 4.6, 9);
  const copied = prog(t, 7.45, 7.5);
  const tst = spring(t, 8.0, 0.6, 0.16);
  const rowH = 86;
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="lagoon" pattern="dots" w={W} h={h} />
      <Layer x={960} y={CY} o={1 - won} s={lerp(1, 0.96, won)}>
        <Popup w={1180} style={{ display: 'flex', gap: 40, padding: 40 }}>
          <div style={{ position: 'relative', width: 520, height: 470, overflow: 'hidden', borderRadius: 20, background: '#F8FAF9', WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 22%, #000 78%, transparent 100%)', maskImage: 'linear-gradient(180deg, transparent 0%, #000 22%, #000 78%, transparent 100%)' }}>
            <div style={{ position: 'absolute', left: 30, top: 235 - rowH / 2, fontSize: 40, color: '#16A34A', fontWeight: 800 }}>→</div>
            {Array.from({ length: 50 }, (_, i) => {
              const [name, col] = PRIZES[i % 5];
              const y = 235 + (i - pos) * rowH;
              if (y < -60 || y > 530) return null;
              const landed = !spinning && t > 3.8 && i === target;
              return (
                <div key={i} style={{ position: 'absolute', left: 90, right: 30, top: y - 32, height: 64, borderRadius: 99, background: '#fff', display: 'flex', alignItems: 'center', gap: 14, padding: '0 16px', boxShadow: landed ? '0 0 0 3px #166534' : '0 0 0 1.5px rgba(16,24,40,0.08)', fontSize: 24, fontWeight: 600, filter: spinning && k < 0.85 ? `blur(${(1 - k) * 2.5}px)` : undefined }}>
                  <span style={{ width: 30, height: 30, borderRadius: 99, background: col }} />{name}
                </div>
              );
            })}
          </div>
          <div style={{ flex: 1, paddingTop: 10 }}>
            <NovaLogo />
            <div style={{ fontFamily: DISPLAY, fontSize: 40, fontWeight: 700, marginTop: 22 }}>Unlock your store discount</div>
            <div style={{ fontSize: 23, color: C.muted, marginTop: 6 }}>Spin to win up to 10% off or free shipping.</div>
            {t < 3.9 ? (
              <div style={{ marginTop: 40, height: 70, borderRadius: 99, display: 'grid', placeItems: 'center', fontSize: 25, fontWeight: 700, color: t >= 1.0 ? C.muted : '#fff', background: t >= 1.0 ? '#E5E7EB' : GREEN, transform: `scale(${1 - cur.press * 0.04})` }}>{t >= 1.0 ? 'Spinning…' : 'Spin now'}</div>
            ) : (
              <div style={{ marginTop: 26, opacity: prog(t, 3.9, 4.2) }}>
                <Consent on={prog(t, 4.3, 4.4)} text="I agree to the Privacy Policy and Terms." />
                <div style={{ marginTop: 16 }}><PhoneField value={num} caret={t > 4.5 && t < 5.6} /></div>
              </div>
            )}
            <Powered />
          </div>
        </Popup>
      </Layer>
      <Layer x={960} y={CY} s={wp.s} o={wp.o}>
        <div style={{ position: 'relative' }}>
          <Popup w={720} style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}><span style={{ width: 92, height: 92, borderRadius: 99, background: '#DCFCE7', display: 'grid', placeItems: 'center' }}><CheckCircle size={58} p={prog(t, 6.0, 6.8)} color="#16A34A" /></span></div>
            <div style={{ fontFamily: DISPLAY, fontSize: 42, fontWeight: 700, marginTop: 18 }}>Congratulations!</div>
            <div style={{ fontSize: 26, marginTop: 6 }}>Boom! You won <b style={{ color: '#8A5A00' }}>5% off</b></div>
            <div style={{ margin: '26px 20px 0' }}><GoldTicket code="OFF5" copied={copied} press={cur.press * prog(t, 7.3, 7.35)} /></div>
            <div style={{ fontSize: 19, color: C.muted, marginTop: 16 }}>Apply it at checkout to claim your savings.</div>
            <Powered />
          </Popup>
          {sat(tst, <Toast icon={CheckmarkCircle02Icon} title="Code sent on WhatsApp" sub="+91 90000 12352" size={29} tone="#16A34A" />, { right: -80, bottom: -50 }, '100% 100%')}
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.3, 0.55) * (1 - prog(t, 7.8, 8.1))} s={1.8} />
    </div>
  );
}

/* ================================================================= 02-S4 */
export function S4({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const zig: [number, number, number][] = [[1.0, 880, CY - 200], [1.35, 1060, CY - 120], [1.7, 880, CY - 30], [2.05, 1060, CY + 60], [2.4, 880, CY + 140], [2.6, 1060, CY + 180]];
  const cur = cursorAt(t, [[0.3, 1500, h - 100], ...zig, [3.6, 1060, CY + 180], [3.85, 815, CY + 210], [4.0, 815, CY + 210], [7.3, 1080, CY + 340], [8.0, 1500, h + 60]], [3.9, 7.4]);
  const strip = (i: number) => prog(t, 1.0 + i * 0.22, 1.42 + i * 0.22, E.move);
  const shimmer = prog(t, 2.6, 3.0);
  const phase = t < 3.0 ? 0 : t < 5.7 ? 1 : 2;
  const num = typed('90000 12352', t, 4.0, 9);
  const ticket = prog(t, 5.7, 6.4, E.enter);
  const copied = prog(t, 7.45, 7.5);
  const tst = spring(t, 8.0, 0.6, 0.16);
  const titles = [['Scratch & Win', 'Scratch the foil, then claim it at checkout.'], ['Nice! Unlock your code', 'Add your WhatsApp number to get it.'], ['Hurray! You unlocked a prize', 'Your coupon is on the card.']];
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="coral" pattern="beams" w={W} h={h} />
      <Layer x={960} y={CY} s={1.0}>
        <div style={{ position: 'relative' }}>
          <Popup w={640} style={{ textAlign: 'center', padding: '34px 40px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}><NovaLogo s={0.85} /></div>
            <div style={{ fontFamily: DISPLAY, fontSize: 36, fontWeight: 700, marginTop: 14 }}>{titles[phase][0]}</div>
            <div style={{ fontSize: 20, color: C.muted, marginTop: 4 }}>{titles[phase][1]}</div>
            <div style={{ position: 'relative', width: 300, height: 360, margin: '20px auto 0', borderRadius: 22, overflow: 'hidden', background: 'radial-gradient(circle at 50% 40%, #3A2A10 0%, #120C04 70%)' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'repeating-conic-gradient(from 0deg at 50% 45%, rgba(255,210,120,0.12) 0 8deg, transparent 8deg 20deg)' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#F9E7B5', fontFamily: DISPLAY }}>
                <div><div style={{ fontSize: 30 }}>Woahh!</div><div style={{ fontSize: 96, fontWeight: 800, backgroundImage: `linear-gradient(100deg, #F9E7B5 ${shimmer * 100 - 20}%, #fff ${shimmer * 100}%, #E8C46A ${shimmer * 100 + 20}%)`, WebkitBackgroundClip: 'text', color: 'transparent' }}>5%</div><div style={{ fontSize: 30, fontWeight: 700 }}>OFF</div></div>
              </div>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: i * 60, height: 61, background: GOLD, clipPath: `inset(0 0 0 ${strip(i) * 100}%)` }}>
                  {i === 2 ? <div style={{ textAlign: 'center', paddingTop: 16, fontSize: 21, fontWeight: 800, letterSpacing: '0.14em', color: '#6B4A0A' }}>SCRATCH TO WIN</div> : null}
                </div>
              ))}
              {ticket > 0 ? (
                <div style={{ position: 'absolute', left: 16, right: 16, bottom: lerp(-120, 16, ticket), opacity: ticket }}><GoldTicket code="OFF5" s={0.68} copied={copied} press={cur.press * prog(t, 7.3, 7.35)} /></div>
              ) : null}
            </div>
            {phase === 1 ? (
              <div style={{ marginTop: 16 }}>
                <Consent on={prog(t, 3.9, 4.0)} text="I agree to receive offers on WhatsApp." s={0.9} />
                <div style={{ marginTop: 12 }}><PhoneField value={num} s={0.85} caret={t > 3.95 && t < 5.4} /></div>
              </div>
            ) : (
              <div style={{ fontSize: 20, color: '#9A6B00', fontWeight: 700, marginTop: 16 }}>Congratulations!</div>
            )}
            <Powered s={0.9} />
          </Popup>
          {sat(tst, <Toast icon={CheckmarkCircle02Icon} title="OFF5 sent on WhatsApp" sub="Consent saved" size={29} tone="#16A34A" />, { right: -230, top: 300 }, '0 50%')}
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.3, 0.55) * (1 - prog(t, 7.8, 8.1))} s={1.8} />
    </div>
  );
}

export const optin = {
  '02-T1': { w: T, h: T, duration: 7.5, Component: T1 },
  '02-T2': { w: T, h: T, duration: 7.5, Component: T2 },
  '02-T3': { w: T, h: T, duration: 7.5, Component: T3 },
  '02-S1': { w: W, h: 1200, duration: 12.5, Component: S1 },
  '02-S2': { w: W, h: 1200, duration: 15, Component: S2 },
  '02-S3': { w: W, h: 1200, duration: 12.5, Component: S3 },
  '02-S4': { w: W, h: 1200, duration: 12.5, Component: S4 },
};
