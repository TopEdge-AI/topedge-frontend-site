/**
 * Home-page launch films, part 2 (16:9, 1920x1080, 12 s loops): Flow Builder,
 * intent detection, unified identity, segmentation, net profit.
 */
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import {
  AiBrain01Icon, BubbleChatIcon, CheckmarkCircle02Icon, DeliveryTruck01Icon, FilterHorizontalIcon, InstagramIcon, Mail01Icon,
  PackageIcon, SentIcon, ShoppingBag01Icon, SmartPhone01Icon, UserCircleIcon, ZapIcon,
} from '@hugeicons/core-free-icons';
import { E, clamp, lerp, prog, spring } from '../lib/time';
import { Bubble, DISPLAY, DateChip, FONT, WaHeader, WaScreen } from '../lib/ui';
import { inr } from '../lib/kit2';
import {
  Caption, FanIn, Figure, GlassIcon, GlassPill, GRAD, Hand, L, Obj, Panel, Phone3D, Ping, Ring, Space, Stage, Tag, Words,
  handAt, orbit, track, win,
} from '../lib/launch';

const W = 1920;
const H = 1080;
const rnd = (i: number, s = 1) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v); };
const Ic = ({ icon, size = 30, color = '#fff' }: { icon: IconSvgElement; size?: number; color?: string }) => <HugeiconsIcon icon={icon} size={size} color={color} strokeWidth={1.9} />;

/* ================================================================== FLOW */
const NODES: [string, string, IconSvgElement][] = [
  ['Message in', '"where is my order?"', BubbleChatIcon],
  ['Understand', 'Order status', AiBrain01Icon],
  ['Shopify', 'Find order #2204', ShoppingBag01Icon],
  ['Reply', 'Live tracking', SentIcon],
];
export function LaunchFlow({ t }: { t: number }) {
  const deep = track(t, [[0, 1], [4.0, 1], [4.6, 0], [7.8, 0], [8.4, 1]]);
  const s1 = win(t, 0.1, 4.4, 0.5);
  const asm = prog(t, 0.4, 2.4, E.move);
  const pulse = prog(t, 2.6, 3.9, E.linear);
  const s2 = win(t, 4.2, 8.2, 0.6);
  const steps = ['Ordered', 'Packed', 'Shipped', 'Out for delivery'];
  const s3 = win(t, 8.0, 11.6, 0.6);
  const rise = spring(t, 8.0, 1.3, 0.08);
  const q = spring(t, 8.7, 0.6, 0.2), a = spring(t, 9.6, 0.7, 0.2);
  const nx = (i: number) => 330 + i * 420;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: FONT }}>
      <Stage t={t} w={W} h={H} deep={deep} />
      <Space w={W} h={H} cam={{ s: lerp(0.96, 1.04, prog(t, 0, 4.2, E.move)) }}>
        {/* shot 1: exploded nodes assemble into a flow */}
        {s1 > 0 ? <div style={{ position: 'absolute', left: 0, top: 0, opacity: s1 * prog(t, 2.0, 2.5) }}>
          <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
            {[0, 1, 2].map((i) => {
              const x0 = nx(i) + 170, x1 = nx(i + 1) - 170;
              const pk = clamp(pulse * 3 - i);
              return (
                <g key={i}>
                  <line x1={x0} y1={540} x2={x1} y2={540} stroke="rgba(196,181,253,0.5)" strokeWidth="3" strokeDasharray="8 8" />
                  {pk > 0 && pk < 1 ? <circle cx={lerp(x0, x1, pk)} cy={540} r="11" fill="#fff" style={{ filter: 'drop-shadow(0 0 10px #A78BFA)' }} /> : null}
                </g>
              );
            })}
          </svg>
        </div> : null}
        {NODES.map(([title, sub, icon], i) => {
          const sx = 960 + (rnd(i, 7) - 0.5) * 1500, sy = 540 + (rnd(i, 8) - 0.5) * 760, sz = -600 + rnd(i, 9) * 900;
          const lit = clamp(pulse * 3 - i + 1) * (i === 0 ? 1 : 1);
          return (
            <Obj key={title} x={lerp(sx, nx(i), asm)} y={lerp(sy, 540, asm)} z={lerp(sz, 0, asm) + prog(t, 3.9, 4.5, E.exit) * (i === 2 ? 900 : -300)} rx={lerp(rnd(i, 1) * 50 - 25, 0, asm)} ry={lerp(rnd(i, 2) * 70 - 35, 0, asm)} rz={lerp(rnd(i, 3) * 30 - 15, 0, asm)} o={s1 * prog(t, 0.1 + i * 0.1, 0.6 + i * 0.1) * (i === 2 ? 1 : 1 - prog(t, 3.9, 4.3))} dof={0.008}>
              <Panel dark w={340} r={28} pad={26} glow={pulse > 0 ? clamp(pulse * 3 - i + 0.2) * (1 - clamp(pulse * 3 - i - 0.8)) + (i === 3 && pulse >= 1 ? 0.6 : 0) : 0}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ width: 62, height: 62, borderRadius: 18, background: lit > 0 ? GRAD : 'rgba(167,139,250,0.2)', display: 'grid', placeItems: 'center', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)' }}><Ic icon={icon} size={32} /></span>
                  <div><div style={{ fontSize: 28, fontWeight: 700 }}>{title}</div><div style={{ fontSize: 20, color: L.deepMute, whiteSpace: 'nowrap' }}>{sub}</div></div>
                </div>
              </Panel>
            </Obj>
          );
        })}
        {/* shot 2: the live Shopify order */}
        <Obj x={960} y={540} rx={lerp(20, 12, prog(t, 4.2, 8))} ry={lerp(-18, -6, prog(t, 4.2, 8))} rz={1.5} z={lerp(-500, 0, prog(t, 4.2, 5.2, E.enter)) + prog(t, 7.6, 8.2, E.exit) * 600} o={s2} mb={prog(t, 7.6, 8.2) * 8}>
          <Panel w={1180} r={32} pad={44}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
              <GlassIcon icon={ShoppingBag01Icon} size={84} tone="linear-gradient(140deg,#86EFAC,#16A34A)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: DISPLAY, fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em' }}>Order #2204</div>
                <div style={{ fontSize: 23, color: L.mute }}>Silk kurta set · ₹3,105 · Prepaid</div>
              </div>
              <Tag tone={L.violet} icon={DeliveryTruck01Icon} size={24}>Arriving today, 6 pm</Tag>
            </div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', marginTop: 54, padding: '0 30px' }}>
              <div style={{ position: 'absolute', left: 70, right: 70, top: 26, height: 6, borderRadius: 6, background: 'rgba(124,58,237,0.12)' }} />
              <div style={{ position: 'absolute', left: 70, top: 26, height: 6, borderRadius: 6, background: GRAD, width: `${prog(t, 5.0, 6.8, E.move) * 87}%` }} />
              {steps.map((st, i) => {
                const on = prog(t, 5.0 + i * 0.55, 5.35 + i * 0.55);
                const live = i === 3 && on > 0.5;
                return (
                  <div key={st} style={{ position: 'relative', display: 'grid', justifyItems: 'center', gap: 14, width: 200 }}>
                    <div style={{ width: 58, height: 58, borderRadius: 99, background: on > 0.5 ? GRAD : '#fff', boxShadow: on > 0.5 ? `0 0 0 ${live ? 8 + Math.sin(t * 6) * 4 : 0}px rgba(139,92,246,0.18), 0 10px 20px -6px rgba(76,29,149,0.5)` : 'inset 0 0 0 2px rgba(124,58,237,0.2)', display: 'grid', placeItems: 'center', transform: `scale(${lerp(0.85, 1, on)})` }}>
                      <Ic icon={i === 3 ? DeliveryTruck01Icon : i === 0 ? CheckmarkCircle02Icon : PackageIcon} size={28} color={on > 0.5 ? '#fff' : '#C4B5FD'} />
                    </div>
                    <div style={{ fontSize: 23, fontWeight: 600, color: on > 0.5 ? L.ink : L.mute, whiteSpace: 'nowrap' }}>{st}</div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </Obj>
        <Obj x={1440} y={250} z={200} o={s2 * prog(t, 6.6, 7.1)}><Tag tone="#16A34A" icon={ZapIcon}>Read live from Shopify</Tag></Obj>
        {/* shot 3: the answer on WhatsApp */}
        <Phone3D x={960} y={lerp(1350, 545, rise)} rx={lerp(28, 5, rise)} ry={lerp(-32, -12, rise) + prog(t, 9, 11.5, E.move) * 18} rz={lerp(5, 0, rise)} s={1.06} o={s3}>
          <WaScreen>
            <WaHeader name="Rangrez Studio" letter="R" color="#7C3AED" />
            <div style={{ position: 'absolute', top: 128, left: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <DateChip />
              <div style={{ opacity: clamp(q * 1.6), transform: `translateY(${(1 - q) * 30}px)` }}><Bubble out read time="5:12 pm">where is my order?</Bubble></div>
              <div style={{ opacity: clamp(a * 1.6), transform: `translateY(${(1 - a) * 40}px)` }}>
                <Bubble time="5:12 pm" maxW={300}>
                  <div style={{ fontWeight: 700 }}>Order #2204 is out for delivery</div>
                  <div style={{ marginTop: 3 }}>Arriving today by 6 pm with Delhivery.</div>
                  <div style={{ marginTop: 8, borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: 8, color: '#0A84C6', fontWeight: 500, textAlign: 'center' }}>Track order</div>
                </Bubble>
              </div>
            </div>
          </WaScreen>
        </Phone3D>
        <Obj x={560} y={430} z={200} o={s3 * prog(t, 10.0, 10.5)}><Tag dark tone={L.wa} size={26}>Answered in 1.2 s</Tag></Obj>
        <Obj x={1380} y={700} z={200} o={s3 * prog(t, 10.3, 10.8)}><Tag dark tone="#A78BFA" size={26}>No agent needed</Tag></Obj>
      </Space>
    </div>
  );
}

/* ================================================================ INTENT */
const MSGS = ['order kidhar hai?', 'parcel kab aayega', 'where is my order', 'tracking link bhejo', 'abhi tak nahi aaya', 'kab tak deliver hoga?', 'order status kya hai', 'delivery date?', 'mera parcel kaha hai', 'still not received'];
export function LaunchIntent({ t }: { t: number }) {
  const deep = track(t, [[0, 1], [6.6, 1], [7.2, 0], [11.0, 0], [11.6, 1]]);
  const s1 = win(t, 0.0, 6.9, 0.5);
  const conv = prog(t, 3.8, 5.0, E.move);
  const chip = spring(t, 4.8, 0.8, 0.25);
  const s3 = win(t, 6.8, 11.5, 0.6);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: FONT }}>
      <Stage t={t} w={W} h={H} deep={deep} />
      <Space w={W} h={H} cam={{ s: lerp(1, 1.05, prog(t, 0, 6.8, E.move)), rz: Math.sin(t * 0.3) * 0.6 }}>
        {MSGS.map((m, i) => {
          const a = (i / MSGS.length) * Math.PI * 2 + 0.4;
          const fly = ((t * 0.28 + rnd(i, 3)) % 1);
          const z0 = lerp(-1300, 500, fly);
          const r0x = 560 + rnd(i, 4) * 200, r0y = 300 + rnd(i, 5) * 80;
          const x = lerp(960 + Math.cos(a) * r0x, 960, conv), y = lerp(520 + Math.sin(a) * r0y, 520, conv);
          const z = lerp(z0, 0, conv);
          return (
            <Obj key={m} x={x} y={y} z={z} s={lerp(1, 0.4, conv)} o={s1 * (1 - conv) * clamp(fly * 6) * clamp((1 - fly) * 5 + conv) * prog(t, i * 0.08, i * 0.08 + 0.5)} dof={0.006}>
              <div style={{ padding: '16px 22px', borderRadius: 22, borderTopLeftRadius: 6, background: '#fff', color: '#111B21', fontSize: 30, fontWeight: 500, whiteSpace: 'nowrap', boxShadow: '0 20px 50px -14px rgba(0,0,0,0.55)' }}>{m}</div>
            </Obj>
          );
        })}
        {s1 > 0 && conv > 0 && conv < 1 ? <div style={{ position: 'absolute', left: 0, top: 0, opacity: (1 - conv) * s1 }}><FanIn from={MSGS.slice(0, 8).map((_, i) => { const a = (i / MSGS.length) * Math.PI * 2 + 0.4; return [960 + Math.cos(a) * 640, 520 + Math.sin(a) * 330] as [number, number]; })} to={[960, 520]} k={prog(t, 3.5, 4.4)} /></div> : null}
        <Obj x={960} y={520} z={100} o={s1 * clamp(chip * 1.5)} s={lerp(0.6, 1, chip)}>
          <div style={{ display: 'grid', justifyItems: 'center', gap: 22 }}>
            <GlassPill solid size={40} glow={0.6} icon={<Ic icon={DeliveryTruck01Icon} size={42} />}>Order status</GlassPill>
            <div style={{ display: 'flex', gap: 14 }}>
              <Tag dark size={24} tone={L.green}>96% sure</Tag>
              <Tag dark size={24} tone="#A78BFA">10 ways of asking, 1 intent</Tag>
            </div>
          </div>
        </Obj>
        {/* payoff */}
        <Obj x={960} y={450} z={lerp(-300, 0, prog(t, 6.8, 7.7, E.enter))} o={s3}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 40 }}>
            <Words t={t} at={7.2} parts={[['40'], ['ms', 'a']]} size={190} weight={700} gap={0.2} />
          </div>
        </Obj>
        <Obj x={960} y={610} o={s3 * prog(t, 7.8, 8.3)}><Caption>to understand Hinglish, slang and typos</Caption></Obj>
        <Obj x={960} y={710} o={s3 * prog(t, 8.6, 9.1)} s={lerp(0.85, 1, spring(t, 8.6, 0.6, 0.3))}><Tag tone={L.violet} icon={ZapIcon} size={26}>₹0 AI cost for everyday questions</Tag></Obj>
      </Space>
    </div>
  );
}

/* ============================================================== IDENTITY */
const FRAGS: [string, IconSvgElement][] = [
  ['+91 90000 12345', SmartPhone01Icon], ['riya.s@example.in', Mail01Icon], ['@riya.styles', InstagramIcon],
  ['Order #2160', ShoppingBag01Icon], ['+91 90000 12399', SmartPhone01Icon], ['Chat · sizing', BubbleChatIcon],
];
export function LaunchIdentity({ t }: { t: number }) {
  const deep = track(t, [[0, 1], [6.0, 1], [6.6, 0], [11.0, 0], [11.6, 1]]);
  const s1 = win(t, 0.0, 6.4, 0.5);
  const spread = spring(t, 0.2, 1.4, 0.1);
  const pull = prog(t, 3.4, 4.6, E.move);
  const fill = prog(t, 4.4, 5.0, E.enter);
  const s2 = win(t, 6.2, 11.5, 0.6);
  const rows: [string, string, string][] = [['Diwali order · ₹4,950', 'Delivered', '2 Nov'], ['WhatsApp · sizing help', 'Resolved', '28 Oct'], ['Instagram DM · new drop', 'Clicked', '12 Oct'], ['First order · ₹1,499', 'Delivered', '3 Aug']];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: FONT }}>
      <Stage t={t} w={W} h={H} deep={deep} />
      <Space w={W} h={H} cam={{ s: lerp(1, 1.06, prog(t, 0, 6, E.move)), rx: 6 }}>
        <Obj x={960} y={540} z={-40} o={s1 * (1 - pull)}><div style={{ transform: `scale(${spread})` }}><Ring rx={640} ry={250} k={spread} /></div></Obj>
        {FRAGS.map(([label, icon], i) => {
          const p = orbit(i, FRAGS.length, t, 640 * spread, 250 * spread, 0.2, 0.3);
          return (
            <Obj key={label} x={960 + p.x * (1 - pull)} y={540 + p.y * (1 - pull)} z={(p.depth - 0.5) * 420 * (1 - pull)} s={p.s * lerp(1, 0.3, pull)} o={s1 * prog(t, 0.3 + i * 0.12, 0.8 + i * 0.12) * (1 - prog(t, 4.2, 4.6))} dof={0.006}>
              <Tag dark size={26} icon={icon}>{label}</Tag>
            </Obj>
          );
        })}
        <Obj x={960} y={540} z={60} o={s1} s={lerp(0.6, 1, spring(t, 0.2, 1, 0.2)) * (1 + Math.sin(clamp((t - 4.4) / 0.6) * Math.PI) * 0.08)}>
          <div style={{ position: 'relative', width: 230, height: 230, borderRadius: 999, display: 'grid', placeItems: 'center', background: fill > 0 ? GRAD : 'rgba(167,139,250,0.14)', boxShadow: `inset 0 0 0 2px rgba(196,181,253,0.5), 0 0 ${40 + fill * 80}px rgba(139,92,246,${0.3 + fill * 0.4})` }}>
            <svg width="250" height="250" style={{ position: 'absolute', left: -10, top: -10 }}><circle cx="125" cy="125" r="120" fill="none" stroke="#DDD6FE" strokeWidth="4" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - pull} transform="rotate(-90 125 125)" /></svg>
            {fill > 0.3 ? <span style={{ fontFamily: DISPLAY, fontSize: 84, fontWeight: 700, color: '#fff', opacity: fill }}>RS</span> : <Ic icon={UserCircleIcon} size={110} color="#C4B5FD" />}
          </div>
        </Obj>
        <Obj x={960} y={760} z={60} o={s1 * prog(t, 4.9, 5.3)}><Caption dark size={34}>One shopper, not six</Caption></Obj>

        {/* profile */}
        <Obj x={960} y={540} rx={lerp(16, 8, prog(t, 6.2, 11))} ry={lerp(-16, -4, prog(t, 6.2, 11))} rz={1} z={lerp(-500, 0, prog(t, 6.2, 7.2, E.enter))} o={s2}>
          <Panel w={1240} r={34} pad={46}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
              <div style={{ width: 120, height: 120, borderRadius: 99, background: GRAD, color: '#fff', display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontSize: 48, fontWeight: 700, boxShadow: '0 16px 30px -10px rgba(76,29,149,0.5)' }}>RS</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span style={{ fontFamily: DISPLAY, fontSize: 48, fontWeight: 700, letterSpacing: '-0.03em' }}>Riya Sharma</span><span style={{ padding: '6px 14px', borderRadius: 12, background: '#FEF3C7', color: '#92400E', fontWeight: 700, fontSize: 21 }}>VIP</span></div>
                <div style={{ fontSize: 23, color: L.mute }}>2 numbers · email · Instagram · Pune</div>
              </div>
              <div style={{ textAlign: 'right' }}><div style={{ fontFamily: DISPLAY, fontSize: 54, fontWeight: 700, letterSpacing: '-0.04em', color: L.violet }}>₹{inr(Math.round(18420 * prog(t, 7.0, 8.2, E.move)))}</div><div style={{ fontSize: 21, color: L.mute }}>lifetime value · 7 orders</div></div>
            </div>
            <div style={{ marginTop: 34, display: 'grid', gap: 12 }}>
              {rows.map(([a, b, c], i) => {
                const k = prog(t, 7.4 + i * 0.3, 7.9 + i * 0.3, E.enter);
                return (
                  <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '16px 22px', borderRadius: 18, background: '#F7F4FF', opacity: k, transform: `translateY(${(1 - k) * 20}px)` }}>
                    <span style={{ width: 14, height: 14, borderRadius: 9, background: i === 0 ? L.violet : '#C4B5FD' }} />
                    <span style={{ flex: 1, fontSize: 25, fontWeight: 600 }}>{a}</span>
                    <span style={{ fontSize: 21, fontWeight: 600, color: '#15803D', background: '#DCFCE7', padding: '4px 12px', borderRadius: 10 }}>{b}</span>
                    <span style={{ width: 90, textAlign: 'right', fontSize: 21, color: L.mute }}>{c}</span>
                  </div>
                );
              })}
            </div>
          </Panel>
        </Obj>
      </Space>
    </div>
  );
}

/* ============================================================== SEGMENTS */
const PEOPLE: [string, number, number, string][] = [
  ['Riya Sharma', 7, 18420, 'Pune'], ['Aarav Shah', 1, 1299, 'Surat'], ['Meera Iyer', 4, 9640, 'Chennai'], ['Kabir Khan', 0, 0, 'Delhi'],
  ['Ananya Rao', 3, 6210, 'Bengaluru'], ['Vikram Joshi', 1, 799, 'Jaipur'], ['Sara Thomas', 5, 12780, 'Kochi'], ['Rohan Das', 2, 1580, 'Kolkata'],
];
const FILTERS: [string, (p: (typeof PEOPLE)[number]) => boolean][] = [
  ['Ordered 2+ times', (p) => p[1] >= 2], ['Spent over ₹2,000', (p) => p[2] > 2000], ['Active in 60 days', (p) => p[0] !== 'Rohan Das'],
];
export function LaunchSegments({ t }: { t: number }) {
  const deep = track(t, [[0, 0], [6.7, 0], [7.3, 1], [10.9, 1], [11.5, 0]]);
  const s1 = win(t, 0.1, 7.0, 0.6);
  const fAt = [3.0, 4.0, 5.0];
  const count = [8904, 4120, 3388, 3126];
  const stage = fAt.filter((a) => t > a + 0.3).length;
  const shown = Math.round(lerp(count[Math.max(0, stage - 1)] ?? 8904, count[stage], stage === 0 ? 0 : prog(t, fAt[stage - 1] + 0.3, fAt[stage - 1] + 0.9, E.move)));
  const s2 = win(t, 6.9, 11.3, 0.6);
  const press = 9.0;
  const hand = handAt(t, [[7.8, 1500, 1000], [8.8, 970, 690], [9.6, 1180, 900]], [press]);
  const burst = prog(t, press + 0.1, press + 1.6, E.enter);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: FONT }}>
      <Stage t={t} w={W} h={H} deep={deep} />
      <Space w={W} h={H}>
        <Obj x={960} y={600} rx={16} ry={-9} rz={1.5} z={lerp(-200, 0, spring(t, 0.1, 1.2, 0.05)) + prog(t, 6.4, 7.0, E.exit) * 500} o={s1} mb={prog(t, 6.4, 7) * 6} flat>
          <Panel w={1300} r={32} pad={34}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '0 10px 18px' }}>
              <span style={{ fontFamily: DISPLAY, fontSize: 64, fontWeight: 700, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums', color: L.violet }}>{inr(shown)}</span>
              <span style={{ fontSize: 26, color: L.mute }}>shoppers</span>
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              {PEOPLE.map((p, i) => {
                const fails = FILTERS.findIndex(([, f], fi) => t > fAt[fi] + 0.1 && !f(p));
                const out = fails >= 0 ? prog(t, fAt[fails] + 0.1, fAt[fails] + 0.6, E.exit) : 0;
                const keep = FILTERS.every(([, f]) => f(p));
                const glow = keep ? prog(t, 5.6, 6.0) : 0;
                const tag = p[1] >= 4 ? ['Hot', '#FCE7F3', '#BE185D'] : p[1] >= 2 ? ['Warm', '#FEF3C7', '#92400E'] : ['Cold', '#E0F2FE', '#0369A1'];
                return (
                  <div key={p[0]} style={{ display: 'flex', alignItems: 'center', gap: 20, height: 62, padding: '0 20px', borderRadius: 16, background: glow ? `rgba(237,233,254,${glow})` : '#FAF9FF', boxShadow: glow ? `inset 0 0 0 2px rgba(139,92,246,${glow * 0.6})` : 'none', opacity: lerp(1, 0.12, out), filter: out ? `blur(${out * 3}px)` : undefined, transform: `translateX(${out * 40}px)` }}>
                    <span style={{ width: 42, height: 42, borderRadius: 99, background: `hsl(${(i * 47) % 360} 70% 88%)`, color: `hsl(${(i * 47) % 360} 50% 35%)`, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 17 }}>{p[0].split(' ').map((w) => w[0]).join('')}</span>
                    <span style={{ width: 260, fontSize: 24, fontWeight: 600 }}>{p[0]}</span>
                    <span style={{ width: 120, fontSize: 21, fontWeight: 600, padding: '4px 12px', borderRadius: 10, background: tag[1], color: tag[2], textAlign: 'center' }}>{tag[0]}</span>
                    <span style={{ width: 150, fontSize: 22, color: L.ink2 }}>{p[1]} orders</span>
                    <span style={{ width: 160, fontSize: 22, color: L.ink2 }}>₹{inr(p[2])}</span>
                    <span style={{ fontSize: 22, color: L.mute }}>{p[3]}</span>
                  </div>
                );
              })}
            </div>
          </Panel>
        </Obj>
        {FILTERS.map(([label], i) => (
          <Obj key={label} x={520 + i * 440} y={lerp(-60, 170, spring(t, fAt[i] - 0.4, 0.7, 0.25))} z={160} o={s1 * prog(t, fAt[i] - 0.4, fAt[i] - 0.1)}>
            <GlassPill solid size={26} icon={<Ic icon={FilterHorizontalIcon} size={28} />}>{label}</GlassPill>
          </Obj>
        ))}
        {/* deep: the segment becomes one action */}
        <Obj x={960} y={430} z={lerp(-400, 0, prog(t, 6.9, 7.8, E.enter))} o={s2}>
          <div style={{ textAlign: 'center' }}><Figure value="3,126" size={180} dark /><Caption dark>repeat buyers, ready for the Diwali drop</Caption></div>
        </Obj>
        <Obj x={960} y={690} z={40} o={s2 * prog(t, 7.9, 8.3)} s={lerp(0.85, 1, spring(t, 7.9, 0.6, 0.3))}>
          <GlassPill dark size={32} solid={t > press} glow={prog(t, press, press + 0.4)} press={prog(t, press - 0.1, press) * (1 - prog(t, press + 0.1, press + 0.25))} icon={<Ic icon={SentIcon} size={32} />}>Send campaign</GlassPill>
        </Obj>
        {burst > 0 && burst < 1 ? Array.from({ length: 28 }, (_, i) => {
          const a = (i / 28) * Math.PI * 2, r = lerp(40, 900, burst);
          return <Obj key={i} x={960 + Math.cos(a) * r} y={690 + Math.sin(a) * r * 0.55} z={lerp(0, 300, burst)} o={s2 * (1 - burst)}><div style={{ width: 16, height: 16, borderRadius: 9, background: '#DDD6FE', boxShadow: '0 0 18px #A78BFA' }} /></Obj>;
        }) : null}
      </Space>
      <Ping t={t} at={press} x={970} y={690} dark />
      <Hand x={hand.x} y={hand.y} press={hand.press} o={win(t, 7.8, 9.6, 0.3)} />
    </div>
  );
}

/* ================================================================ PROFIT */
const COSTS: [string, number, string][] = [['Product cost', 320, '#A78BFA'], ['Ads', 140, '#818CF8'], ['Shipping', 85, '#38BDF8'], ['RTO share', 38, '#F472B6'], ['COD fee', 30, '#FBBF24']];
export function LaunchProfit({ t }: { t: number }) {
  const deep = track(t, [[0, 0], [7.0, 0], [7.6, 1], [11.0, 1], [11.6, 0]]);
  const s1 = win(t, 0.1, 7.3, 0.5);
  const coinIn = spring(t, 0.1, 1.2, 0.15);
  const at = (i: number) => 2.4 + i * 0.7;
  const left = 799 - COSTS.reduce((a, [, v], i) => a + v * prog(t, at(i), at(i) + 0.5, E.move), 0);
  const s2 = win(t, 7.1, 11.5, 0.6);
  const bar = prog(t, 7.6, 8.8, E.move);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: FONT }}>
      <Stage t={t} w={W} h={H} deep={deep} />
      <Space w={W} h={H}>
        <Obj x={700} y={260} o={s1 * (1 - prog(t, 2.0, 2.5))}><Words t={t} at={0.5} parts={[['One'], ['order', 'a']]} size={70} /></Obj>
        {/* the coin */}
        <Obj x={lerp(960, 700, prog(t, 1.9, 2.6, E.move))} y={560} z={lerp(-300, 0, coinIn) + prog(t, 6.8, 7.4, E.exit) * 700} o={s1} mb={prog(t, 6.8, 7.4) * 8}>
          <div style={{ transform: `scaleX(${0.94 + Math.cos(t * 0.9) * 0.06})`, width: 420, height: 420, borderRadius: 999, background: 'radial-gradient(circle at 35% 28%, #EDE9FE 0%, #A78BFA 38%, #6D28D9 78%, #4C1D95 100%)', boxShadow: 'inset 0 0 0 10px rgba(255,255,255,0.18), inset 0 -18px 40px rgba(46,16,101,0.45), 0 40px 80px -24px rgba(76,29,149,0.6)', display: 'grid', placeItems: 'center' }}>
            <div style={{ textAlign: 'center', color: '#fff' }}>
              <div style={{ fontFamily: DISPLAY, fontSize: 120, fontWeight: 700, letterSpacing: '-0.05em', fontVariantNumeric: 'tabular-nums', textShadow: '0 6px 20px rgba(46,16,101,0.5)' }}>₹{Math.round(left)}</div>
              <div style={{ fontSize: 26, fontWeight: 600, opacity: 0.85 }}>{t < at(0) ? 'order value' : 'left for you'}</div>
            </div>
          </div>
        </Obj>
        {/* slices fly off into a column */}
        {COSTS.map(([label, v, col], i) => {
          const k = prog(t, at(i) - 0.1, at(i) + 0.6, E.move);
          const x = lerp(700, 1340, k), y = lerp(560, 300 + i * 118, k) - Math.sin(k * Math.PI) * 120;
          return (
            <Obj key={label} x={x} y={y} z={Math.sin(k * Math.PI) * 300} rz={(1 - k) * 25} s={lerp(0.4, 1, k)} o={s1 * clamp(k * 4)} mb={Math.sin(k * Math.PI) * 6}>
              <div style={{ width: 520, display: 'flex', alignItems: 'center', gap: 18, padding: '18px 24px', borderRadius: 22, background: '#fff', boxShadow: '0 0 0 1px rgba(124,58,237,0.1), 0 24px 50px -20px rgba(76,29,149,0.4)' }}>
                <span style={{ width: 18, height: 52, borderRadius: 6, background: col }} />
                <span style={{ flex: 1, fontSize: 28, fontWeight: 600, color: L.ink }}>{label}</span>
                <span style={{ fontFamily: DISPLAY, fontSize: 34, fontWeight: 700, color: '#BE123C' }}>−₹{v}</span>
              </div>
            </Obj>
          );
        })}
        {/* deep: what you kept */}
        <Obj x={960} y={400} z={lerp(-400, 0, prog(t, 7.1, 8.0, E.enter))} o={s2}>
          <div style={{ textAlign: 'center' }}><Figure value={`₹${Math.round(lerp(0, 186, bar))}`} size={200} dark /><Caption dark>kept from a ₹799 order, after every cost</Caption></div>
        </Obj>
        <Obj x={960} y={680} o={s2}>
          <div style={{ width: 1100, height: 56, borderRadius: 18, overflow: 'hidden', display: 'flex', boxShadow: 'inset 0 0 0 1.5px rgba(196,181,253,0.3)', background: 'rgba(255,255,255,0.06)' }}>
            {COSTS.map(([label, v, col]) => <div key={label} style={{ width: `${(v / 799) * 100 * bar}%`, background: col, opacity: 0.85, borderRight: '2px solid rgba(11,8,32,0.5)' }} />)}
            <div style={{ width: `${(186 / 799) * 100 * bar}%`, background: 'linear-gradient(90deg,#4ADE80,#22C55E)', boxShadow: `0 0 ${30 * bar}px rgba(34,197,94,0.6)` }} />
          </div>
        </Obj>
        <Obj x={960} y={780} o={s2 * prog(t, 8.8, 9.3)}>
          <div style={{ display: 'flex', gap: 28 }}>
            {COSTS.map(([label, , col]) => <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 21, color: L.deepMute, whiteSpace: 'nowrap' }}><span style={{ width: 12, height: 12, borderRadius: 4, background: col }} />{label}</span>)}
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 21, color: '#BBF7D0', fontWeight: 600 }}><span style={{ width: 12, height: 12, borderRadius: 4, background: '#22C55E' }} />Kept</span>
          </div>
        </Obj>
      </Space>
    </div>
  );
}

export const launch2 = {
  'L-flow': { w: W, h: H, duration: 12, Component: LaunchFlow },
  'L-intent': { w: W, h: H, duration: 12, Component: LaunchIntent },
  'L-identity': { w: W, h: H, duration: 12, Component: LaunchIdentity },
  'L-segments': { w: W, h: H, duration: 12, Component: LaunchSegments },
  'L-profit': { w: W, h: H, duration: 12, Component: LaunchProfit },
};
