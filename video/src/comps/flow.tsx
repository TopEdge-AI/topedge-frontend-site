/**
 * Chapter 01 — Flow Builder (docs/video/feature-library/ch01_flow_builder.md).
 * 01-S3 doubles as the home "Flow Builder + Shopify Tools" film.
 */
import type { CSSProperties, ReactNode } from 'react';
import {
  CheckmarkCircle02Icon, FlashIcon, FlowConnectionIcon, Folder01Icon, Message01Icon, PackageIcon, Store01Icon, WebhookIcon,
} from '@hugeicons/core-free-icons';
import { SiShopify } from 'react-icons/si';
import { E, clamp, lerp, pathPoint, prog, spring, typed, useSize } from '../lib/time';
import {
  Backdrop, Bubble, C, Card, CardHeader, CheckCircle, Chip, Cursor, DateChip, FONT, Icon, Layer, Pill, Toast, Touch, WaHeader, WaScreen, pop,
} from '../lib/ui';
import { Toggle, rowIn } from '../lib/kit2';
import { PhoneRig, cursorAt, phoneOffset, phoneTouch } from '../lib/rig';

const T = 1080;
const W = 1920;
const MONO = "'Geist Mono','SF Mono',ui-monospace,monospace";
const sat = (k: number, node: ReactNode, style: CSSProperties, origin: string) => {
  const p = pop(k);
  return <div style={{ position: 'absolute', transform: `scale(${p.s})`, transformOrigin: origin, opacity: p.o, zIndex: 30, ...style }}>{node}</div>;
};
const SysLine = ({ children, o = 1, color = C.emerald, icon }: { children: ReactNode; o?: number; color?: string; icon?: ReactNode }) => (
  <div style={{ display: 'flex', justifyContent: 'center', opacity: o, transform: `translateY(${lerp(10, 0, o)}px)` }}>
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.95)', borderRadius: 14, padding: '9px 16px', fontSize: 22, color: C.ink2, boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}>
      {icon ?? <span style={{ width: 9, height: 9, borderRadius: 99, background: color }} />}{children}
    </span>
  </div>
);
const WaPanel = ({ children, h }: { children: ReactNode; h: number }) => (
  <div style={{ height: h, borderRadius: 22, background: C.waBg, padding: 20, position: 'relative', overflow: 'hidden', backgroundImage: 'radial-gradient(rgba(120,100,70,0.10) 1.2px, transparent 1.6px)', backgroundSize: '26px 26px' }}>{children}</div>
);
const Big = ({ out, children, time, read }: { out?: boolean; children: ReactNode; time: string; read?: boolean }) => (
  <div style={{ display: 'flex', justifyContent: out ? 'flex-end' : 'flex-start' }}>
    <div style={{ maxWidth: 560, background: out ? C.waOut : '#fff', borderRadius: 20, borderTopLeftRadius: out ? 20 : 6, borderTopRightRadius: out ? 6 : 20, padding: '14px 18px 10px', fontSize: 27, lineHeight: 1.36, color: '#111B21', boxShadow: '0 1px 1.5px rgba(0,0,0,0.1)' }}>
      {children}
      <div style={{ textAlign: 'right', fontSize: 17, color: '#667781', marginTop: 4 }}>{time}{out ? <span style={{ color: read ? '#53BDEB' : '#8696A0', marginLeft: 6 }}>✓✓</span> : null}</div>
    </div>
  </div>
);

/* ================================================================= 01-T1 */
export function T1({ t }: { t: number }) {
  const q = typed('Where is my order?', t, 0.6, 14);
  const sys = prog(t, 2.0, 2.4);
  const ans = spring(t, 3.2, 0.55, 0.15);
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="bloom" pattern="dots" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <CardHeader icon={FlashIcon} title="Order status bot" size={34} right={<Chip tone="emerald" dot size={22} pulse={(t * 0.8) % 1}>Live</Chip>} />
          <WaPanel h={520}>
            <DateChip label="Today" />
            <div style={{ marginTop: 18, opacity: q ? 1 : 0 }}><Big time="11:02">{q || ' '}</Big></div>
            <div style={{ marginTop: 18 }}><SysLine o={sys} icon={<SiShopify size={22} color="#5E8E3E" />}>Fetch order · <b>#2204 found</b></SysLine></div>
            <div style={{ marginTop: 18, opacity: clamp(ans * 2), transform: `translateY(${lerp(20, 0, ans)}px)` }}>
              <Big out time="11:02" read={t > 4.4}>#2204 is out for delivery and arrives today by 6 pm.<div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', marginTop: 10, paddingTop: 10, textAlign: 'center', color: C.waLink, fontWeight: 500 }}>↗ Track parcel</div></Big>
            </div>
          </WaPanel>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 01-T2 */
export function T2({ t }: { t: number }) {
  const q = typed('Can I talk to a person?', t, 0.5, 15);
  const swap = prog(t, 2.0, 2.4);
  const s1 = prog(t, 2.2, 2.6), s2 = prog(t, 3.0, 3.4);
  const ans = spring(t, 4.0, 0.55, 0.15);
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="dusk" pattern="beams" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <CardHeader icon={Message01Icon} title="Rahul Mehta" size={34} right={
            <span style={{ position: 'relative', display: 'inline-block', width: 200, height: 40 }}>
              <span style={{ position: 'absolute', right: 0, opacity: 1 - swap }}><Chip tone="emerald" dot size={22}>Bot</Chip></span>
              <span style={{ position: 'absolute', right: 0, opacity: swap, transform: `scale(${lerp(0.85, 1, swap)})` }}><Chip tone="amber" dot size={22}>Live Chat</Chip></span>
            </span>
          } />
          <WaPanel h={540}>
            <div style={{ opacity: q ? 1 : 0 }}><Big time="11:04">{q || ' '}</Big></div>
            <div style={{ marginTop: 16 }}><SysLine o={s1} color="#D97706">Bot paused · opened in Live Chat</SysLine></div>
            <div style={{ marginTop: 12 }}><SysLine o={s2}><b>Priya</b> joined · sees order #2204</SysLine></div>
            <div style={{ marginTop: 16, opacity: clamp(ans * 2), transform: `translateY(${lerp(20, 0, ans)}px)` }}><Big out time="11:05" read>Hi Rahul, Priya here. How can I help with #2204?</Big></div>
          </WaPanel>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 01-T3 */
export function T3({ t }: { t: number }) {
  const rows: [string, string, number][] = [
    ['fulfillments/create', '#2204 · Delhivery · just now', 2.0],
    ['orders/create', '#2205 · ₹1,890 · 4 s ago', 0.8],
    ['checkouts/update', `Cart ₹3,450 · ${t > 2.0 ? 11 : 9} s ago`, -1],
  ];
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="rose" pattern="grid" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <CardHeader icon={WebhookIcon} title="Shopify webhooks" size={34} right={<Chip tone="emerald" dot size={22} pulse={(t * 1.1) % 1}>Listening</Chip>} />
          <div style={{ position: 'relative', height: 3 * 112 }}>
            {rows.map(([topic, sub, at], i) => {
              const push = rows.slice(0, i).reduce((acc, r) => acc + prog(t, r[2], r[2] + 0.5, E.move), 0);
              return (
                <div key={topic} style={{ position: 'absolute', left: 0, right: 0, top: push * 112, display: 'flex', alignItems: 'center', gap: 18, padding: '18px 18px', borderRadius: 20, background: i === 0 ? `rgba(124,58,237,${0.05 * (1 - prog(t, 4.5, 6))})` : 'transparent', ...(at > 0 ? rowIn(t, at) : {}) }}>
                  <SiShopify size={34} color="#5E8E3E" />
                  <div style={{ flex: 1 }}><div style={{ fontSize: 28, fontWeight: 600, fontFamily: MONO, letterSpacing: '-0.02em' }}>{topic}</div><div style={{ fontSize: 23, color: C.muted }}>{sub}</div></div>
                  <span style={{ fontFamily: MONO, fontSize: 22, fontWeight: 700, color: C.emerald, background: C.emeraldSoft, borderRadius: 10, padding: '6px 12px' }}>200</span>
                </div>
              );
            })}
          </div>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 01-S1 */
export function S1({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const cur = cursorAt(t, [[0.5, 1700, h - 80], [2.0, 1420, CY + 118], [2.4, 1420, CY + 118], [3.9, 1400, CY - 222], [4.6, 1400, CY - 222], [6.0, 1750, h + 80]], [2.2, 4.0]);
  const on = prog(t, 2.25, 2.5, E.move);
  const pub = prog(t, 4.4, 4.6);
  const tst = spring(t, 4.6, 0.6, 0.16) * (1 - prog(t, 12.1, 12.4));
  const flows: [string, string, number][] = [['Welcome menu', 'Runs on first message', 1], ['Order status bot', 'Fetches Shopify orders', 1], ['Returns and FAQ', 'New flow · 6 steps', on]];
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="orchid" pattern="rings" w={W} h={h} />
      <Layer x={960} y={CY} s={1.05}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 1240, borderRadius: 30, background: '#fff', overflow: 'hidden', display: 'flex', boxShadow: '0 40px 90px -40px rgba(40,24,96,0.4), 0 0 0 1.5px rgba(16,24,40,0.06)' }}>
            <div style={{ width: 330, background: C.sunk, padding: 30 }}>
              <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: '0.12em', color: C.muted, marginBottom: 16 }}>FOLDERS</div>
              {[['Support', '4 flows', true], ['Sales', '3 flows', false], ['COD', '2 flows', false]].map(([a, b, sel]) => (
                <div key={a as string} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 16px', borderRadius: 16, background: sel ? '#fff' : 'transparent', boxShadow: sel ? '0 2px 8px -4px rgba(16,24,40,0.2)' : 'none', marginBottom: 8 }}>
                  <Icon icon={Folder01Icon} size={30} color={sel ? C.violet : C.ink2} />
                  <div><div style={{ fontSize: 26, fontWeight: 600 }}>{a as string}</div><div style={{ fontSize: 21, color: C.muted }}>{b as string}</div></div>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, padding: 34 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
                <div style={{ flex: 1 }}><div style={{ fontSize: 32, fontWeight: 600 }}>Support</div><div style={{ fontSize: 22, color: C.muted }}>Runs on inbound WhatsApp</div></div>
                <span style={{ position: 'relative', width: 200, height: 56 }}>
                  <span style={{ position: 'absolute', right: 0, opacity: 1 - pub }}><Pill kind="primary" size={23} icon={FlashIcon} press={cur.press * prog(t, 3.9, 4.0)}>Publish</Pill></span>
                  <span style={{ position: 'absolute', right: 0, top: 8, opacity: pub }}><Chip tone="emerald" icon={CheckmarkCircle02Icon} size={22}>Published</Chip></span>
                </span>
              </div>
              {flows.map(([a, b, k], i) => (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '18px 20px', borderRadius: 20, background: i === 2 ? `rgba(124,58,237,${0.05 * (1 - prog(t, 7, 9))})` : '#fff', boxShadow: `0 0 0 1.5px ${C.line}`, marginBottom: 12 }}>
                  <Icon icon={FlowConnectionIcon} size={32} color={k > 0.5 ? C.violet : C.ink2} />
                  <div style={{ flex: 1 }}><div style={{ fontSize: 28, fontWeight: 600 }}>{a}</div><div style={{ fontSize: 22, color: C.muted }}>{b}</div></div>
                  <Toggle on={k} />
                </div>
              ))}
            </div>
          </div>
          {sat(tst, <Toast icon={FlashIcon} title="Live for the next message" sub="3 flows active in Support" size={29} dark />, { right: -30, bottom: -54 }, '100% 100%')}
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.5, 0.75) * (1 - prog(t, 5.6, 6.0))} s={1.8} />
    </div>
  );
}

/* ================================================================= 01-S2 */
export function S2({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const Wc = 1240, Hc = 760;
  const L: [number, number] = [70, 380];
  const R: [string, string, ReactNode][] = [
    ['BUTTON · TRACK ORDER', 'Fetch order · Shopify', <SiShopify key="s" size={30} color="#5E8E3E" />],
    ['BUTTON · BROWSE', 'Send catalog · 5 collections', <Icon key="b" icon={Store01Icon} size={30} />],
    ['BUTTON · TALK TO US', 'Open Live Chat · Support', <Icon key="c" icon={Message01Icon} size={30} />],
  ];
  const ys = [190, 380, 570];
  const x1 = 700;
  const path = (i: number) => `M ${L[0] + 400} ${L[1]} C ${L[0] + 520} ${L[1]}, ${x1 - 140} ${ys[i]}, ${x1} ${ys[i]}`;
  const draw = prog(t, 2.5, 3.3, E.move);
  const ring = prog(t, 3.3, 3.7);
  const breathe = (i: number) => 1 + 0.012 * Math.sin(clamp((t - 0.5 - i * 0.07) / 2) * Math.PI);
  const tst = spring(t, 4.0, 0.6, 0.16);
  const pulse = t > 8 && t < 9.2 ? 0.7 + 0.3 * Math.cos((t - 8) / 1.2 * Math.PI * 2) : 1;
  const dot = draw > 0 && draw < 1 ? pathPoint([[L[0] + 400, L[1]], [L[0] + 520, L[1]], [x1 - 140, ys[0]], [x1, ys[0]]], draw) : null;
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="ocean" pattern="lines" w={W} h={h} />
      <Layer x={960} y={CY}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: Wc, height: Hc, borderRadius: 30, background: '#FBFBFD', position: 'relative', overflow: 'hidden', boxShadow: '0 40px 90px -40px rgba(30,40,100,0.4), 0 0 0 1.5px rgba(16,24,40,0.06)' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(16,24,40,0.12) 1.5px, transparent 2px)', backgroundSize: '30px 30px' }} />
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 80, background: 'rgba(255,255,255,0.94)', borderBottom: `1.5px solid ${C.line}`, display: 'flex', alignItems: 'center', gap: 14, padding: '0 30px' }}>
              <Icon icon={FlowConnectionIcon} size={32} color={C.ink} /><span style={{ fontSize: 30, fontWeight: 600, flex: 1 }}>Welcome menu</span>
              <Chip tone="emerald" dot size={21}>Published</Chip><Chip size={21}>100%</Chip>
            </div>
            <svg width={Wc} height={Hc} style={{ position: 'absolute', inset: 0 }}>
              {[0, 1, 2].map((i) => <path key={i} d={path(i)} fill="none" stroke="#D3D5DE" strokeWidth={3} />)}
              <path d={path(0)} fill="none" stroke={C.violet} strokeWidth={5} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} opacity={pulse} />
            </svg>
            {dot ? <div style={{ position: 'absolute', left: dot[0] - 11, top: dot[1] - 11, width: 22, height: 22, borderRadius: 99, background: C.violet, boxShadow: '0 0 0 8px rgba(124,58,237,0.18)' }} /> : null}
            <div style={{ position: 'absolute', left: L[0], top: L[1] - 56, width: 400, transform: `scale(${breathe(0)})`, background: '#fff', borderRadius: 22, padding: '20px 22px', boxShadow: `0 0 0 1.5px ${C.line}, 0 12px 26px -16px rgba(16,24,40,0.3)` }}>
              <div style={{ fontSize: 18, letterSpacing: '0.12em', color: C.violet, fontWeight: 700 }}>TRIGGER</div>
              <div style={{ fontSize: 29, fontWeight: 600, marginTop: 4 }}>Welcome</div><div style={{ fontSize: 22, color: C.muted }}>Any first message</div>
            </div>
            {R.map(([k, v, icon], i) => {
              const act = i === 0 ? ring : 0;
              return (
                <div key={k} style={{ position: 'absolute', left: x1, top: ys[i] - 56, width: 470, transform: `scale(${breathe(i + 1)})`, background: '#fff', borderRadius: 22, padding: '18px 22px', display: 'flex', gap: 16, alignItems: 'center', boxShadow: `0 0 0 ${1.5 + act}px ${act ? `rgba(124,58,237,${0.4 + 0.5 * act})` : C.line}, 0 0 0 ${8 * act}px rgba(124,58,237,0.10), 0 12px 26px -16px rgba(16,24,40,0.3)` }}>
                  {icon}
                  <div><div style={{ fontSize: 17, letterSpacing: '0.1em', color: C.muted, fontWeight: 700 }}>{k}</div><div style={{ fontSize: 26, fontWeight: 600, marginTop: 3 }}>{v}</div></div>
                </div>
              );
            })}
          </div>
          {sat(tst, <Toast icon={PackageIcon} title="Rahul tapped Track order" sub="#2204 sent in 1.2 s" size={29} />, { right: 30, top: -60 }, '100% 100%')}
        </div>
      </Layer>
    </div>
  );
}

/* ================================================================= 01-S3 */
export function S3({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const off = phoneOffset(t, -2, 6.2);
  const tapped = prog(t, 2.6, 2.75);
  const typing = t > 3.5 && t < 4.8;
  const answer = spring(t, 4.8, 0.55, 0.15);
  const panel = spring(t, 6.6, 0.75, 0.12);
  const rows: [string, string, number][] = [['Welcome', 'Menu with 3 buttons', 7.1], ['Track order', 'Button tapped', 7.4], ['Fetch order', 'Answered in 1.2 s', 7.7]];
  const cur = cursorAt(t, [[7.6, 1500, h - 80], [8.5, 960, CY + 250], [9.2, 960, CY + 250], [10, 1500, h + 80]], [8.6]);
  const pub = prog(t, 8.65, 8.85);
  const touch = phoneTouch(t, [[1.2, 2.95, 110, 420]], off);
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="dawn" pattern="mesh" w={W} h={h} />
      <PhoneRig offset={off} time="9:41">
        <WaScreen>
          <WaHeader name="Your store · Test mode" letter="T" color="#7C3AED" />
          <div style={{ position: 'absolute', top: 124, left: 0, right: 0 }}><DateChip /></div>
          <div style={{ position: 'absolute', top: 160, left: 12, right: 12 }}>
            <Bubble time="9:41">Hi! How can we help today?</Bubble>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6, width: 250 }}>
              {['Track order', 'Browse', 'Talk to us'].map((b, i) => (
                <div key={b} style={{ height: 40, borderRadius: 10, background: i === 0 ? `rgba(255,255,255,${1 - 0.25 * tapped})` : '#fff', display: 'grid', placeItems: 'center', color: C.waLink, fontSize: 15.5, fontWeight: 500, boxShadow: '0 1px 1.5px rgba(0,0,0,0.1)' }}>{b}</div>
              ))}
            </div>
            {t > 2.75 ? <div style={{ marginTop: 10, ...rowIn(t, 2.75, 0.4) }}><Bubble out time="9:41" read>Track order</Bubble></div> : null}
            {typing ? <div style={{ marginTop: 8, width: 64, height: 34, borderRadius: 16, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>{[0, 1, 2].map((i) => <span key={i} style={{ width: 7, height: 7, borderRadius: 9, background: '#9AA5AD', opacity: 0.4 + 0.6 * Math.abs(Math.sin(t * 5 + i)) }} />)}</div> : null}
            {answer > 0 ? <div style={{ marginTop: 8, opacity: clamp(answer * 2), transform: `translateY(${lerp(16, 0, answer)}px)` }}><Bubble time="9:41">#2204 is out for delivery today. <span style={{ color: C.waLink }}>Track parcel</span></Bubble></div> : null}
          </div>
        </WaScreen>
      </PhoneRig>
      {touch ? <Touch {...touch} /> : null}
      <Layer x={960} y={CY} s={lerp(0.9, 1.1, panel)} o={clamp(panel * 1.6)}>
        <Card w={900} pad={38}>
          <CardHeader icon={FlowConnectionIcon} title="Test Flow" size={34} right={<Chip size={22}>Simulator</Chip>} />
          {rows.map(([a, b, at]) => (
            <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '16px 6px', borderBottom: `1.5px solid ${C.line}`, ...rowIn(t, at) }}>
              <CheckCircle size={40} p={prog(t, at + 0.1, at + 0.6)} />
              <div style={{ flex: 1 }}><div style={{ fontSize: 28, fontWeight: 600 }}>{a}</div><div style={{ fontSize: 22, color: C.muted }}>{b}</div></div>
              <Chip tone="emerald" size={20}>Pass</Chip>
            </div>
          ))}
          <div style={{ marginTop: 24, position: 'relative', height: 66 }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 1 - pub }}><Pill kind="primary" size={25} icon={FlashIcon} full press={cur.press}>Publish flow</Pill></div>
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', opacity: pub }}><Chip tone="emerald" icon={CheckmarkCircle02Icon} size={26}>Live for the next message</Chip></div>
          </div>
        </Card>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 7.6, 7.85) * (1 - prog(t, 9.6, 10))} s={1.8} />
    </div>
  );
}

export const flow = {
  '01-T1': { w: T, h: T, duration: 7.5, Component: T1 },
  '01-T2': { w: T, h: T, duration: 7.5, Component: T2 },
  '01-T3': { w: T, h: T, duration: 7.5, Component: T3 },
  '01-S1': { w: W, h: 1200, duration: 12.5, Component: S1 },
  '01-S2': { w: W, h: 1200, duration: 12.5, Component: S2 },
  '01-S3': { w: W, h: 1200, duration: 12.5, Component: S3 },
  'home-flow': { w: W, h: 1080, duration: 12.5, Component: S3 },
};
