/**
 * Home-page films designed for the home stage (16:9, shown at ~920 px wide):
 * fewer, larger elements, everything inside a safe frame so the gentle camera
 * never crops the subject.
 *   home-optin      — every opt-in tool, live on one storefront, with sign-up rates
 *   home-campaigns  — compose → shopper buys on WhatsApp → funnel → net revenue
 */
import type { CSSProperties, ReactNode } from 'react';
import {
  CheckmarkCircle02Icon, Clock01Icon, Megaphone01Icon, Note01Icon, SentIcon, UserAdd01Icon, UserGroupIcon, Wallet01Icon,
} from '@hugeicons/core-free-icons';
import { SiMeta, SiWhatsapp } from 'react-icons/si';
import { E, clamp, lerp, prog, spring, typed } from '../lib/time';
import {
  C, Card, CardHeader, CheckCircle, Chip, Cursor, DateChip, DISPLAY, FONT, IPhone, Icon, Layer, PHONE_W, PHONE_H, Pill,
  TemplateBubble, Toast, Touch, WaHeader, WaScreen, pop,
} from '../lib/ui';
import { Fireworks, KurtaShot, NightBackdrop, ShopPage, countUp, inr } from '../lib/kit2';
import { DoorbellShot } from '../lib/products';
import { SuccessPage, cursorAt } from '../lib/rig';

const W = 1920;
const H = 1080;
const GREEN = 'linear-gradient(180deg,#166534,#0F3D22)';
const GOLD = 'linear-gradient(100deg,#F7E2A3 0%,#E8C46A 38%,#F9E7B5 62%,#D9AD4F 100%)';
const win = (t: number, a: number, b: number, f = 0.35) => prog(t, a, a + f) * (1 - prog(t, b - f, b));

/* ----------------------------------------------------------- small atoms */
const Field = ({ v, focus }: { v: string; focus?: boolean }) => (
  <div style={{ display: 'flex', height: 52, borderRadius: 13, overflow: 'hidden', boxShadow: `inset 0 0 0 ${focus ? 2 : 1.5}px ${focus ? '#166534' : 'rgba(16,24,40,0.14)'}`, fontSize: 20 }}>
    <span style={{ width: 66, display: 'grid', placeItems: 'center', background: '#F3F4F6', color: C.ink2, fontWeight: 600 }}>+91</span>
    <span style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 14px', fontWeight: 600 }}>{v || <span style={{ color: C.faint, fontWeight: 400 }}>WhatsApp number</span>}</span>
  </div>
);
const Tick = ({ on, text }: { on: boolean; text: string }) => (
  <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 15, color: C.ink2, marginTop: 10 }}>
    <span style={{ width: 20, height: 20, borderRadius: 6, background: on ? '#16A34A' : '#fff', boxShadow: on ? 'none' : 'inset 0 0 0 1.5px rgba(16,24,40,0.25)', display: 'grid', placeItems: 'center' }}>
      {on ? <svg width="12" height="12" viewBox="0 0 16 16"><path d="M3 8.5l3 3 7-7" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" /></svg> : null}
    </span>{text}
  </div>
);
const GBtn = ({ children, press = 0, wa }: { children: ReactNode; press?: number; wa?: boolean }) => (
  <div style={{ height: 52, borderRadius: 999, background: GREEN, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 18, fontWeight: 700, marginTop: 12, transform: `scale(${1 - 0.04 * press})` }}>{wa ? <SiWhatsapp size={20} /> : null}{children}</div>
);
const Ticket = ({ code }: { code: string }) => (
  <div style={{ position: 'relative', borderRadius: 14, background: GOLD, padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div><div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#7A5A12', fontWeight: 700 }}>YOUR CODE</div><div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '0.12em', color: '#3D2A05' }}>{code}</div></div>
    <span style={{ height: 36, padding: '0 14px', borderRadius: 99, background: '#111', color: '#fff', fontSize: 14, fontWeight: 600, display: 'grid', placeItems: 'center' }}>Copy code</span>
  </div>
);
const Popup = ({ children, w = 460, style }: { children: ReactNode; w?: number; style?: CSSProperties }) => (
  <div style={{ width: w, background: '#fff', borderRadius: 24, padding: 26, boxShadow: '0 40px 80px -30px rgba(10,30,20,0.5), 0 0 0 1px rgba(16,24,40,0.06)', textAlign: 'center', fontFamily: FONT, ...style }}>{children}</div>
);
const Brand = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, color: '#059669', fontWeight: 800, fontSize: 14, letterSpacing: '0.08em', lineHeight: 1 }}>
    <svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 11 12 3l9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" fill="#059669" /></svg>NOVA HOME
  </div>
);
const Title = ({ a, b }: { a: string; b: string }) => (
  <><div style={{ fontFamily: DISPLAY, fontSize: 28, fontWeight: 700, marginTop: 12, lineHeight: 1.15 }}>{a}</div><div style={{ fontSize: 16, color: C.muted, marginTop: 4 }}>{b}</div></>
);

/* ============================================================ home-optin */
const TOOLS: [string, string, string][] = [
  ['Welcome popup', '9.4% of visitors sign up', '#7C3AED'],
  ['Spin to win', '14.2% sign up', '#E11D48'],
  ['Scratch card', '12.8% sign up', '#D97706'],
  ['Pulse Drop', '11.1% sign up', '#0284C7'],
  ['WhatsApp widget', 'On every page', '#16A34A'],
];
const BEATS = [0.4, 3.2, 6.0, 8.8, 11.6, 14.4]; // each tool's window

export function HomeOptin({ t }: { t: number }) {
  const active = BEATS.findIndex((b, i) => t >= b && t < BEATS[i + 1]);
  const subs = 1284 + BEATS.slice(1).filter((b) => t >= b - 0.4).length;
  const final = prog(t, 14.4, 14.9);
  // browser window geometry (world px)
  const BX = 1180, BY = 560, BW = 1160, BHt = 760;
  const sl = (i: number) => win(t, BEATS[i], BEATS[i + 1]);
  const p = (i: number) => clamp((t - BEATS[i]) / (BEATS[i + 1] - BEATS[i]));
  // per-tool cursors / fingertips, in world coords
  const cur = cursorAt(t, [
    [0.4, 1500, 980], [1.0, 1250, 600], [1.9, 1250, 600], [2.15, 1035, 660], [2.4, 1180, 720], [2.9, 1500, 1000],
    [3.3, 1480, 980], [3.6, 1180, 712], [5.6, 1180, 712], [6.0, 1460, 1000],
    [6.2, 1460, 980], [6.4, 1100, 470], [6.65, 1260, 520], [6.9, 1100, 580], [7.15, 1260, 640], [7.4, 1180, 700], [8.6, 1450, 1000],
    [8.9, 1450, 980], [9.4, 1180, 560], [11.4, 1460, 1000],
    [11.7, 1460, 980], [12.2, 1660, 890], [12.6, 1660, 890], [13.1, 1300, 760], [13.6, 1300, 760], [14.2, 1460, 1000],
  ], [2.15, 2.4, 3.6, 9.4, 12.3, 13.2]);
  return (
    <div style={{ width: W, height: H, position: 'relative', fontFamily: FONT }}>
      {/* tool rail */}
      <Layer x={330} y={540} s={1.06}>
        <div style={{ width: 430, background: '#fff', borderRadius: 30, padding: '26px 22px', boxShadow: '0 30px 70px -36px rgba(10,40,30,0.45), 0 0 0 1px rgba(16,24,40,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 6px 16px', borderBottom: `1.5px solid ${C.line}`, marginBottom: 12 }}>
            <Icon icon={UserAdd01Icon} size={30} color={C.ink} /><span style={{ fontSize: 26, fontWeight: 600, flex: 1 }}>Opt-in tools</span>
            <Chip tone="emerald" dot size={18} pulse={(t * 0.8) % 1}>Live</Chip>
          </div>
          {TOOLS.map(([n, stat, col], i) => {
            const on = active === i ? 1 : 0;
            const done = (active > i || final > 0.5) && active !== i;
            return (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 12px', borderRadius: 18, marginTop: 4, background: on ? `${col}12` : 'transparent', boxShadow: on ? `0 0 0 2px ${col}55` : 'none' }}>
                <span style={{ width: 12, height: 12, borderRadius: 99, background: col, boxShadow: on ? `0 0 0 6px ${col}22` : 'none' }} />
                <div style={{ flex: 1 }}><div style={{ fontSize: 23, fontWeight: 600 }}>{n}</div><div style={{ fontSize: 17, color: C.muted, marginTop: 2 }}>{stat}</div></div>
                {done ? <CheckCircle size={28} p={1} /> : null}
              </div>
            );
          })}
        </div>
      </Layer>
      {/* storefront */}
      <Layer x={BX} y={BY}>
        <div style={{ width: BW, height: BHt, borderRadius: 26, overflow: 'hidden', background: '#fff', boxShadow: '0 40px 90px -40px rgba(10,40,30,0.5), 0 0 0 1px rgba(16,24,40,0.06)', position: 'relative' }}>
          <div style={{ height: 58, background: '#F6F6F8', borderBottom: `1.5px solid ${C.line}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 9 }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} style={{ width: 13, height: 13, borderRadius: 99, background: c }} />)}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}><div style={{ width: '44%', height: 34, borderRadius: 10, background: '#EBEBEF', display: 'grid', placeItems: 'center', fontSize: 17, color: C.ink2 }}>novahome.in/doorbell</div></div>
          </div>
          <div style={{ position: 'absolute', left: 0, top: 58, width: '54%', bottom: 0 }}><DoorbellShot /></div>
          <div style={{ position: 'absolute', left: '58%', right: 40, top: 140 }}>
            <div style={{ fontSize: 15, letterSpacing: '0.16em', color: C.faint, fontWeight: 600 }}>NOVA HOME</div>
            <div style={{ fontFamily: DISPLAY, fontSize: 40, fontWeight: 600, marginTop: 8, lineHeight: 1.1 }}>Smart Doorbell Ultra</div>
            <div style={{ fontSize: 30, fontWeight: 600, marginTop: 10 }}>₹4,499</div>
            <div style={{ height: 52, borderRadius: 99, background: '#111', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 19, fontWeight: 600, marginTop: 24 }}>Add to cart</div>
          </div>
          {/* dim behind popups */}
          <div style={{ position: 'absolute', inset: '58px 0 0', background: 'rgba(15,23,42,0.32)', opacity: Math.max(sl(0), sl(1), sl(2), sl(3)) }} />
          {/* 1 welcome popup */}
          <div style={{ position: 'absolute', left: '50%', top: 410, transform: `translate(-50%,-50%) scale(${1.28 * lerp(0.94, 1, sl(0))})`, opacity: sl(0) }}>
            <Popup>
              <Brand />
              <Title a={p(0) > 0.75 ? 'You are in!' : 'Get 10% off your first order'} b={p(0) > 0.75 ? 'Your code is on WhatsApp.' : 'Enter your WhatsApp number to unlock it.'} />
              <div style={{ marginTop: 16, textAlign: 'left' }}><Field v={typed('90000 12347', t, 0.9, 10)} focus={t > 0.8 && t < 2.1} /><Tick on={t > 2.15} text="Send me offers on WhatsApp" /></div>
              <GBtn press={cur.press * prog(t, 2.3, 2.35)}>Unlock 10% off</GBtn>
            </Popup>
          </div>
          {/* 2 spin to win */}
          <div style={{ position: 'absolute', left: '50%', top: 410, transform: `translate(-50%,-50%) scale(${1.22 * lerp(0.94, 1, sl(1))})`, opacity: sl(1) }}>
            <Popup w={520}>
              <Brand /><Title a={t > 5.0 ? 'You won 10% off!' : 'Spin to win'} b="Up to 10% off or free shipping" />
              <div style={{ position: 'relative', height: 200, marginTop: 14, overflow: 'hidden', borderRadius: 16, background: '#F8FAF9', WebkitMaskImage: 'linear-gradient(180deg,transparent,#000 25%,#000 75%,transparent)', maskImage: 'linear-gradient(180deg,transparent,#000 25%,#000 75%,transparent)' }}>
                {Array.from({ length: 30 }, (_, i) => {
                  const pr = [['Free shipping', '#059669'], ['10% off', '#E11D48'], ['5% off', '#166534'], ['Free SD card', '#9CA3AF']][i % 4];
                  const pos = lerp(0, 4 * 5 + 1, prog(t, 3.65, 5.0, (x) => 1 - Math.pow(1 - x, 3)));
                  const y = 100 + (i - pos) * 56;
                  if (y < -40 || y > 240) return null;
                  const landed = t > 5.0 && i === 21;
                  return <div key={i} style={{ position: 'absolute', left: 60, right: 30, top: y - 22, height: 44, borderRadius: 99, background: '#fff', display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', fontSize: 17, fontWeight: 600, boxShadow: landed ? '0 0 0 2.5px #166534' : '0 0 0 1px rgba(16,24,40,0.08)' }}><span style={{ width: 20, height: 20, borderRadius: 99, background: pr[1] }} />{pr[0]}</div>;
                })}
                <div style={{ position: 'absolute', left: 22, top: 84, fontSize: 26, color: '#16A34A', fontWeight: 800 }}>→</div>
              </div>
              <GBtn press={cur.press * prog(t, 3.5, 3.55)}>{t > 3.6 ? (t > 5.0 ? 'Code sent on WhatsApp' : 'Spinning…') : 'Spin now'}</GBtn>
            </Popup>
          </div>
          {/* 3 scratch card */}
          <div style={{ position: 'absolute', left: '50%', top: 410, transform: `translate(-50%,-50%) scale(${1.22 * lerp(0.94, 1, sl(2))})`, opacity: sl(2) }}>
            <Popup w={420}>
              <Brand /><Title a={t > 7.6 ? 'Woahh! 5% off' : 'Scratch & win'} b="Scratch the foil to reveal your prize" />
              <div style={{ position: 'relative', height: 230, marginTop: 14, borderRadius: 18, overflow: 'hidden', background: 'radial-gradient(circle at 50% 40%, #3A2A10, #120C04 70%)' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#F9E7B5', fontFamily: DISPLAY }}><div><div style={{ fontSize: 72, fontWeight: 800 }}>5%</div><div style={{ fontSize: 22, fontWeight: 700 }}>OFF</div></div></div>
                {Array.from({ length: 5 }, (_, i) => <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: i * 46, height: 47, background: GOLD, clipPath: `inset(0 0 0 ${prog(t, 6.4 + i * 0.22, 6.8 + i * 0.22, E.move) * 100}%)` }} />)}
              </div>
              <div style={{ marginTop: 12, opacity: prog(t, 7.6, 7.9) }}><Ticket code="OFF5" /></div>
            </Popup>
          </div>
          {/* 4 pulse drop */}
          <div style={{ position: 'absolute', left: '50%', top: 410, transform: `translate(-50%,-50%) scale(${1.22 * lerp(0.94, 1, sl(3))})`, opacity: sl(3) }}>
            <Popup w={440}>
              <Brand /><Title a={t > 9.6 ? 'Free shipping, locked in' : 'Your glow drop is ready'} b={t > 9.6 ? 'Claim it on WhatsApp' : 'Tap once to reveal'} />
              <div style={{ height: 210, display: 'grid', placeItems: 'center' }}>
                {t < 9.6 ? (
                  <div style={{ position: 'relative', width: 150, height: 150 }}>
                    <span style={{ position: 'absolute', inset: -22 * ((t * 0.6) % 1), borderRadius: 99, border: `2px solid rgba(124,58,237,${0.5 * (1 - ((t * 0.6) % 1))})` }} />
                    <span style={{ position: 'absolute', inset: 0, borderRadius: 99, background: 'radial-gradient(circle at 38% 30%, #D8C8FF, #9B6BFF 35%, #6D28D9 70%, #3B1287)', boxShadow: '0 24px 50px -18px rgba(109,40,217,0.7)', transform: `scale(${1 - 0.1 * cur.press * prog(t, 9.3, 9.35)})` }} />
                  </div>
                ) : (
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', borderRadius: 14, overflow: 'hidden', boxShadow: '0 0 0 2px #7C3AED' }}><span style={{ width: 110, display: 'grid', placeItems: 'center', background: '#7C3AED', color: '#fff', fontWeight: 700, fontSize: 14, letterSpacing: '0.14em' }}>OFFER</span><span style={{ flex: 1, padding: '14px 0', fontSize: 28, fontWeight: 800, letterSpacing: '0.12em', color: '#3B1287' }}>FREESHIP</span></div>
                    <GBtn wa>Claim on WhatsApp</GBtn>
                  </div>
                )}
              </div>
            </Popup>
          </div>
          {/* 5 widget */}
          <div style={{ position: 'absolute', right: 120, bottom: 110, width: 460, opacity: sl(4) * prog(t, 12.4, 12.8), transform: `scale(${lerp(0.9, 1, prog(t, 12.4, 12.8, E.enter))})`, transformOrigin: '100% 100%' }}>
            <div style={{ background: '#fff', borderRadius: 22, padding: 22, boxShadow: '0 30px 60px -20px rgba(16,24,40,0.4), 0 0 0 1px rgba(16,24,40,0.06)' }}>
              <div style={{ fontSize: 21, fontWeight: 700 }}>Chat with Nova Home</div>
              <div style={{ fontSize: 15, color: C.muted, margin: '2px 0 12px' }}>Order updates and offers on WhatsApp</div>
              <Field v={typed('90000 11223', t, 12.7, 14)} focus={t > 12.6 && t < 13.2} />
              <GBtn wa press={cur.press * prog(t, 13.1, 13.15)}>{t > 13.3 ? 'Number saved' : 'Continue on WhatsApp'}</GBtn>
            </div>
          </div>
          <div style={{ position: 'absolute', right: 30, bottom: 30, width: 72, height: 72, borderRadius: 99, background: '#25D366', display: 'grid', placeItems: 'center', boxShadow: '0 12px 24px -8px rgba(37,211,102,0.7)' }}><SiWhatsapp size={38} color="#fff" /></div>
        </div>
      </Layer>
      {/* live subscriber counter */}
      <Layer x={1600} y={140}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px 16px 18px', borderRadius: 22, background: '#fff', boxShadow: '0 22px 44px -18px rgba(16,24,40,0.3), 0 0 0 1px rgba(16,24,40,0.06)', whiteSpace: 'nowrap' }}>
          <Icon icon={UserGroupIcon} size={32} color={C.emerald} />
          <div><div style={{ fontSize: 17, color: C.muted }}>Subscribers today</div><div style={{ fontFamily: DISPLAY, fontSize: 36, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{inr(subs)} <span style={{ fontSize: 18, color: C.emerald }}>+{subs - 1284}</span></div></div>
        </div>
      </Layer>
      <Layer x={1180} y={1010} s={pop(spring(t, 14.6, 0.6, 0.16)).s} o={pop(spring(t, 14.6, 0.6, 0.16)).o}>
        <Toast icon={CheckmarkCircle02Icon} title="Every sign-up has consent on record" sub="Synced to your WhatsApp list and Shopify" size={26} />
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={(t < 14.2 ? 1 : 1 - prog(t, 14.2, 14.5)) * prog(t, 0.4, 0.7)} s={1.5} />
    </div>
  );
}

/* ========================================================= home-campaigns */
const phonePt = (X: number, Y: number, s: number, lx: number, ly: number): [number, number] => [X - ((PHONE_W + 26) * s) / 2 + (13 + lx) * s, Y - ((PHONE_H + 26) * s) / 2 + (13 + ly) * s];

export function HomeCampaigns({ t }: { t: number }) {
  const PX = 1440, PY = 540, PS = 1.12;
  const sent = prog(t, 2.3, 2.5);
  const results = prog(t, 7.0, 7.6);
  const bubble = spring(t, 2.9, 0.6, 0.15);
  const shop = prog(t, 4.4, 4.9, E.enter);
  const done = prog(t, 5.9, 6.2, E.enter);
  const cur = cursorAt(t, [[0.6, 1000, 1000], [2.1, 500, 838], [2.6, 500, 838], [3.2, 900, 1100]], [2.25]);
  const tap1: [number, number] = phonePt(PX, PY, PS, 195, 470);
  const tap2: [number, number] = phonePt(PX, PY, PS, 195, 446);
  const touch = t > 3.6 && t < 4.5 ? { x: tap1[0], y: tap1[1], o: win(t, 3.6, 4.5, 0.2), press: prog(t, 4.0, 4.08) * (1 - prog(t, 4.18, 4.26)), ripple: prog(t, 4.08, 4.6) }
    : t > 5.1 && t < 6.0 ? { x: tap2[0], y: tap2[1], o: win(t, 5.1, 6.0, 0.2), press: prog(t, 5.5, 5.58) * (1 - prog(t, 5.68, 5.76)), ripple: prog(t, 5.58, 6.1) } : null;
  const funnel: [string, number, string][] = [['Sent', 2418, '#A78BFA'], ['Delivered', 2406, '#8B5CF6'], ['Read', 2071, '#7C3AED'], ['Clicked', 640, '#6D28D9'], ['Orders', 212, '#059669']];
  const rev = countUp(t, 10.2, 184200, 1.6);
  const row = (icon: typeof Note01Icon, a: string, b: ReactNode, right: ReactNode, at: number) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', borderRadius: 18, boxShadow: `0 0 0 1.5px ${C.line}`, marginTop: 12, opacity: prog(t, at, at + 0.4), transform: `translateY(${lerp(10, 0, prog(t, at, at + 0.4, E.enter))}px)` }}>
      <Icon icon={icon} size={28} color={C.ink2} />
      <div style={{ flex: 1 }}><div style={{ fontSize: 15, color: C.muted }}>{a}</div><div style={{ fontSize: 22, fontWeight: 600, marginTop: 2 }}>{b}</div></div>
      {right}
    </div>
  );
  return (
    <div style={{ width: W, height: H, position: 'relative', fontFamily: FONT }}>
      <NightBackdrop t={t} w={W} h={H} />
      <Fireworks t={t} w={W} h={H} starts={[0.6, 2.2]} period={4.2} scale={1.0} light />
      {/* composer → results */}
      <Layer x={570} y={540} s={1.12}>
        <div style={{ position: 'relative', width: 720, height: 740 }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 1 - results, transform: `scale(${lerp(1, 0.97, results)})` }}>
            <Card w={720} pad={30} style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.12), 0 40px 90px -30px rgba(0,0,0,0.6)' }}>
              <CardHeader icon={Megaphone01Icon} title="Diwali sale" size={30} right={sent > 0.5 ? <Chip tone="violet" dot size={19} pulse={(t * 1.4) % 1}>Sending</Chip> : <Chip tone="amber" dot size={19}>Ready</Chip>} />
              {row(UserGroupIcon, 'Audience', 'Repeat buyers · 2,418', <Chip size={17}>Score 60+</Chip>, 0.3)}
              {row(Note01Icon, 'Template', <span style={{ fontFamily: "'Geist Mono',ui-monospace,monospace" }}>diwali_offer</span>, <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 600, color: '#0866FF' }}><SiMeta size={18} />Approved</span>, 0.6)}
              {row(Clock01Icon, 'Schedule', 'Today, 7:30 pm', null, 0.9)}
              {row(Wallet01Icon, 'Meta fees, estimated', '₹2,087 · ₹0.8631 per message', <Chip tone="emerald" size={16}>0% markup</Chip>, 1.2)}
              <div style={{ marginTop: 20 }}><Pill kind="primary" size={22} icon={SentIcon} full press={cur.press}>{sent > 0.5 ? 'Sent to 2,418 shoppers' : 'Send to 2,418'}</Pill></div>
            </Card>
          </div>
          <div style={{ position: 'absolute', inset: 0, opacity: results, transform: `scale(${lerp(0.97, 1, results)})` }}>
            <Card w={720} pad={30} style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.12), 0 40px 90px -30px rgba(0,0,0,0.6)' }}>
              <CardHeader icon={Megaphone01Icon} title="Diwali sale · results" size={30} right={<Chip tone="emerald" dot size={19}>Sent</Chip>} />
              {funnel.map(([n, v, col], i) => {
                const k = prog(t, 7.6 + i * 0.35, 8.5 + i * 0.35, E.move);
                return (
                  <div key={n} style={{ marginTop: i ? 14 : 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 19, marginBottom: 6 }}><span style={{ color: C.ink2 }}>{n}</span><b style={{ fontVariantNumeric: 'tabular-nums' }}>{inr(Math.round(v * k))}</b></div>
                    <div style={{ height: 22, borderRadius: 8, background: '#F1F0F6' }}><div style={{ width: `${(v / 2418) * 100 * k}%`, minWidth: k > 0 ? 8 : 0, height: '100%', borderRadius: 8, background: col }} /></div>
                  </div>
                );
              })}
              <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1.5px solid ${C.line}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', opacity: prog(t, 10.0, 10.4) }}>
                <div>
                  <div style={{ fontSize: 17, color: C.muted }}>Revenue, after Meta fees</div>
                  <div style={{ fontFamily: DISPLAY, fontSize: 64, fontWeight: 700, letterSpacing: '-0.035em', fontVariantNumeric: 'tabular-nums', lineHeight: 1.05 }}>₹{inr(Math.round(rev))}</div>
                </div>
                <span style={{ opacity: prog(t, 11.6, 12.0) }}><Chip tone="emerald" size={20}>88× return on fees</Chip></span>
              </div>
            </Card>
          </div>
        </div>
      </Layer>
      {/* the shopper's phone */}
      <div style={{ position: 'absolute', left: PX, top: PY, transform: `translate(-50%,-50%) scale(${PS})`, zIndex: 10 }}>
        <IPhone time="7:30">
          <WaScreen>
            <WaHeader name="Mira Ethnic" letter="M" color="#BE185D" />
            <div style={{ position: 'absolute', top: 124, left: 0, right: 0 }}><DateChip /></div>
            {bubble > 0 ? (
              <div style={{ position: 'absolute', top: 160, left: 12, opacity: clamp(bubble * 2), transform: `translateY(${lerp(30, 0, bubble)}px)` }}>
                <TemplateBubble media={<KurtaShot />} title="The Diwali edit is here" body="Riya, 20% off festive wear till Sunday. Free shipping on prepaid orders." time="7:30 pm" cta="Shop the edit" ctaPress={prog(t, 4.0, 4.08) * (1 - prog(t, 4.18, 4.26))} />
              </div>
            ) : (
              <div style={{ position: 'absolute', top: 300, left: 0, right: 0, textAlign: 'center', fontSize: 14, color: '#667781' }}>Waiting for the broadcast…</div>
            )}
          </WaScreen>
          <div style={{ position: 'absolute', inset: 0, transform: `translateY(${lerp(PHONE_H, 0, shop)}px)`, opacity: shop > 0 ? 1 : 0, zIndex: 12 }}>
            <ShopPage host="miraethnic.in" media={<KurtaShot tag="−20%" />} title="Rani pink silk kurta" price="₹2,499" was="₹3,124" code="DIWALI20" strip="Diwali offer applied · free shipping" cta="Buy now" press={prog(t, 5.5, 5.58) * (1 - prog(t, 5.68, 5.76))} />
            <div style={{ position: 'absolute', inset: 0, opacity: done, zIndex: 3 }}>{done > 0 ? <SuccessPage t={t} at={6.0} title="Order placed" order="Happy Diwali, Riya! Order #2211" chip="Tracking updates on WhatsApp" /> : null}</div>
          </div>
        </IPhone>
      </div>
      {touch ? <Touch {...touch} size={60} /> : null}
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.6, 0.9) * (1 - prog(t, 2.8, 3.2))} s={1.5} />
    </div>
  );
}

export const home = {
  'home-optin': { w: W, h: H, duration: 16, Component: HomeOptin },
  'home-campaigns': { w: W, h: H, duration: 14, Component: HomeCampaigns },
};
