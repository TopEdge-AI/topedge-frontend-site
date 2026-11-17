/**
 * Launch films, round 2: the stories behind four features, told end to end.
 *   L-journeys  three journeys running live: cart reminder, COD confirmation, welcome
 *   L-pixel     watch a visitor live, they leave, we know them when they return, reminder converts
 *   L-profit    sales pour in but profit is unknown; every cost source flows in; real net profit
 * These replace the first versions of L-optin, L-pixel and L-profit.
 */
import type { ReactNode } from 'react';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import {
  BrowserIcon, BubbleChatIcon, Calculator01Icon, Calendar03Icon, CheckmarkCircle02Icon, Clock01Icon, CreditCardIcon,
  DeliveryTruck01Icon, EyeIcon, FlashIcon, GiftIcon, InstagramIcon, Location01Icon, MetaIcon, PackageIcon, SentIcon,
  ShoppingBag01Icon, ShoppingCart01Icon, SmartPhone01Icon, Ticket01Icon, TruckReturnIcon, UserAdd01Icon, UserCheck01Icon,
} from '@hugeicons/core-free-icons';
import { SiWhatsapp } from 'react-icons/si';
import { E, clamp, lerp, prog, spring, typed } from '../lib/time';
import { Bubble, Cursor, DISPLAY, DateChip, FONT, TemplateBubble, Touch, WaHeader, WaScreen } from '../lib/ui';
import { KurtaShot, inr } from '../lib/kit2';
import { ShirtShot } from '../lib/products';
import { SuccessPage } from '../lib/rig';
import {
  BrowserWin, Caption, Confetti, DoneTick, FanIn, Figure, GlassIcon, GRAD, Hand, L, Obj, Panel, Phone3D, Space, Stage, Tag,
  Words, track, useLayout, win,
} from '../lib/launch';

const W = 1920;
const H = 1080;
const Ic = ({ icon, size = 30, color = '#fff' }: { icon: IconSvgElement; size?: number; color?: string }) => <HugeiconsIcon icon={icon} size={size} color={color} strokeWidth={1.9} />;
const tapK = (t: number, at: number) => prog(t, at - 0.1, at) * (1 - prog(t, at + 0.15, at + 0.3));
const rise = (t: number, at: number, d = 0.6) => ({ opacity: clamp(spring(t, at, d, 0.2) * 1.6), transform: `translateY(${(1 - spring(t, at, d, 0.2)) * 24}px)` });
const Chat = ({ name = 'Rangrez Studio', children }: { name?: string; children: ReactNode }) => (
  <WaScreen>
    <WaHeader name={name} letter="R" color="#7C3AED" />
    <div style={{ position: 'absolute', top: 128, left: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <DateChip />
      {children}
    </div>
  </WaScreen>
);
/** WhatsApp message with reply buttons. */
const ButtonsBubble = ({ title, body, time, buttons, press = -1, k = 0 }: { title: string; body: string; time: string; buttons: string[]; press?: number; k?: number }) => (
  <div style={{ width: 300, background: '#fff', borderRadius: 14, borderTopLeftRadius: 4, boxShadow: '0 1px 1.5px rgba(0,0,0,0.1)', overflow: 'hidden', color: '#111B21', fontFamily: FONT }}>
    <div style={{ padding: '10px 12px 6px' }}>
      <div style={{ fontWeight: 700, fontSize: 16 }}>{title}</div>
      <div style={{ fontSize: 15.5, lineHeight: 1.38, marginTop: 4 }}>{body}</div>
      <div style={{ textAlign: 'right', fontSize: 11.5, color: '#667781', marginTop: 3 }}>{time}</div>
    </div>
    {buttons.map((b, i) => <div key={b} style={{ borderTop: '1px solid rgba(0,0,0,0.07)', height: 44, display: 'grid', placeItems: 'center', color: '#0A84C6', fontSize: 15.5, fontWeight: 500, background: i === press ? `rgba(10,132,198,${0.14 * k})` : undefined }}>{b}</div>)}
  </div>
);

/* ============================================================== JOURNEYS */
type Lane = { trig: string; trigSub: string; icon: IconSvgElement; steps: [string, string, IconSvgElement][]; end: string; col: string };
const LANES: Lane[] = [
  { trig: 'Cart abandoned', trigSub: 'Shopify checkout', icon: ShoppingCart01Icon, steps: [['Wait 30 min', 'then check', Clock01Icon], ['Send reminder', 'kurta + 10% off', SiWhatsappIcon()], ['Paid?', 'yes → stop', CheckmarkCircle02Icon]], end: '₹3,105 recovered', col: '#F472B6' },
  { trig: 'COD order placed', trigSub: 'order #2231 · ₹1,849', icon: PackageIcon, steps: [['Confirm order', 'or pay by UPI', SiWhatsappIcon()], ['Reply?', 'confirm / prepaid', BubbleChatIcon], ['Tag & ship', 'prepaid saves ₹50', DeliveryTruck01Icon]], end: 'Confirmed · prepaid', col: '#FBBF24' },
  { trig: 'Opted in on website', trigSub: 'spin wheel · 15% off', icon: UserAdd01Icon, steps: [['Welcome', 'code WELCOME15', SiWhatsappIcon()], ['Wait 3 days', 'no order yet', Clock01Icon], ['Bestsellers', 'top 3 picks', GiftIcon]], end: 'First order ₹2,499', col: '#38BDF8' },
];
function SiWhatsappIcon(): IconSvgElement { return SentIcon; }
function Node({ title, sub, icon, lit, count, trigger, col }: { title: string; sub: string; icon: IconSvgElement; lit: number; count?: number; trigger?: boolean; col: string }) {
  return (
    <div style={{ position: 'relative', width: 270, padding: '18px 20px', borderRadius: 22, background: '#fff', fontFamily: FONT, boxShadow: `0 0 0 ${trigger ? 2 : 1}px ${trigger ? col : 'rgba(124,58,237,0.12)'}, 0 18px 36px -20px rgba(76,29,149,0.35), 0 0 ${40 * lit}px rgba(139,92,246,${0.55 * lit})` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ width: 52, height: 52, borderRadius: 15, background: trigger ? col : lit > 0.3 ? GRAD : '#F1EDFB', display: 'grid', placeItems: 'center', flex: 'none' }}><Ic icon={icon} size={27} color={trigger || lit > 0.3 ? '#fff' : '#8B5CF6'} /></span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: L.ink, whiteSpace: 'nowrap' }}>{title}</div>
          <div style={{ fontSize: 17, color: L.mute, whiteSpace: 'nowrap' }}>{sub}</div>
        </div>
      </div>
      {count != null ? <span style={{ position: 'absolute', right: -12, top: -12, minWidth: 40, height: 34, padding: '0 10px', borderRadius: 18, background: L.ink, color: '#fff', fontSize: 17, fontWeight: 700, display: 'grid', placeItems: 'center', fontVariantNumeric: 'tabular-nums' }}>{count}</span> : null}
    </div>
  );
}
export function LaunchJourneys({ t }: { t: number }) {
  const lay = useLayout();
  const N = !lay.base;
  const deep = track(t, [[0, 0], [4.9, 0], [5.5, 1], [9.0, 1], [9.6, 0]]);
  const s1 = win(t, 0.1, 5.2, 0.5);
  const NX = [30, 370, 710, 1050], LY = [70, 300, 530];
  const cw = 1380, ch = 680;
  const s2 = win(t, 5.0, 9.4, 0.6);
  const s3 = win(t, 9.3, 11.6, 0.5);
  // shoppers travelling along each lane: [lane, start]
  const riders: [number, number][] = [[0, 1.4], [1, 1.9], [2, 2.4], [0, 3.0], [1, 3.4], [2, 3.8]];
  const nodeLit = (lane: number, step: number) => riders.filter(([l]) => l === lane).reduce((m, [, st]) => { const pos = (t - st) / 0.5; return Math.max(m, clamp(1 - Math.abs(pos - step) * 1.4)); }, 0);
  const counts = (lane: number, step: number) => Math.max(0, [128, 96, 210][lane] - step * [22, 9, 31][lane] + riders.filter(([l, st]) => l === lane && t > st + step * 0.5).length);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: FONT }}>
      <Stage t={t} deep={deep} />
      <Space cam={{ s: lerp(1.0, 1.06, prog(t, 0, 5, E.move)), ry: Math.sin(t * 0.3) * 1 }}>
        {/* shot 1: the journey canvas, three lanes running at once */}
        <Obj x={960} y={570} rx={lerp(22, 12, prog(t, 0, 5))} rz={lerp(-5, -2, prog(t, 0, 5))} z={lerp(-250, 0, spring(t, 0, 1.3, 0.05)) + prog(t, 4.6, 5.2, E.exit) * 900} o={s1} mb={prog(t, 4.6, 5.2) * 8} ms={N ? 0.76 : 1} flat>
          <div style={{ position: 'relative', width: cw, height: ch, borderRadius: 34, background: 'rgba(255,255,255,0.72)', boxShadow: '0 0 0 1px rgba(124,58,237,0.12), 0 40px 90px -40px rgba(76,29,149,0.45)', backgroundImage: 'radial-gradient(rgba(124,58,237,0.13) 1.6px, transparent 1.8px)', backgroundSize: '28px 28px' }}>
            <svg width={cw} height={ch} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
              {LANES.map((ln, li) => [0, 1, 2].map((si) => {
                const x0 = NX[si] + 270, x1 = NX[si + 1], y = LY[li] + 45;
                const k = prog(t, 0.6 + li * 0.25 + si * 0.15, 1.1 + li * 0.25 + si * 0.15);
                return <line key={`${li}${si}`} x1={x0} y1={y} x2={lerp(x0, x1, k)} y2={y} stroke={ln.col} strokeWidth="3" strokeDasharray="7 7" strokeOpacity={0.8} />;
              }))}
              {riders.map(([li, st], i) => {
                const pos = (t - st) / 0.5; // node index along the lane
                if (pos < 0 || pos > 3) return null;
                const si = Math.min(2, Math.floor(pos)), f = pos - si;
                const x = lerp(NX[si] + 135, NX[si + 1] + 135, E.move(f));
                return <g key={i} transform={`translate(${x} ${LY[li] + 45})`}><circle r="22" fill={LANES[li].col} opacity="0.25" /><circle r="13" fill="#fff" stroke={LANES[li].col} strokeWidth="4" /></g>;
              })}
            </svg>
            {LANES.map((ln, li) => (
              <div key={ln.trig}>
                {[0, 1, 2, 3].map((si) => {
                  const appear = spring(t, 0.3 + li * 0.25 + si * 0.15, 0.7, 0.2);
                  const st = si === 0 ? null : ln.steps[si - 1];
                  return (
                    <div key={si} style={{ position: 'absolute', left: NX[si], top: LY[li], opacity: clamp(appear * 1.5), transform: `translateY(${(1 - appear) * 30}px) scale(${lerp(0.9, 1, appear)})` }}>
                      {si === 0 ? <Node trigger title={ln.trig} sub={ln.trigSub} icon={ln.icon} lit={nodeLit(li, 0)} col={ln.col} count={counts(li, 0)} /> : <Node title={st![0]} sub={st![1]} icon={st![2]} lit={nodeLit(li, si)} col={ln.col} count={counts(li, si)} />}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </Obj>
        <Obj x={960} y={N ? 140 : 120} z={160} o={s1 * prog(t, 1.0, 1.5)}><Tag tone={L.green} size={24}>3 journeys live · running on their own</Tag></Obj>

        {/* shot 2: what each shopper received */}
        {LANES.map((ln, i) => {
          const p = i - 1;
          const tap = 6.6 + i * 0.5;
          const msg = i === 0
            ? <TemplateBubble media={<KurtaShot tag="10% off" />} title="Still thinking it over?" body="Your silk kurta is saved. Finish in the next hour and 10% comes off." time="7:42 pm" cta="Complete order" ctaPress={tapK(t, tap)} />
            : i === 1
              ? <ButtonsBubble title="Confirm order #2231" body="Silk kurta set, ₹1,849 cash on delivery. Pay now by UPI and it's ₹1,799." time="2:14 pm" buttons={['Pay ₹1,799 by UPI', 'Confirm cash on delivery']} press={0} k={tapK(t, tap)} />
              : <ButtonsBubble title="Welcome to Rangrez!" body="Here's 15% off your first order: WELCOME15. Valid for 7 days." time="11:05 am" buttons={['Shop bestsellers']} press={0} k={tapK(t, tap)} />;
          return (
            <Phone3D key={i} x={960 + p * 470} y={lerp(1300, 560, spring(t, 5.0 + i * 0.12, 1.3, 0.08)) + Math.abs(p) * 40} z={-Math.abs(p) * 200} ry={-p * 26 + Math.sin(t * 0.5 + i) * 2} rx={6} rz={p * 3} s={0.84} o={s2}>
              {t < tap + 0.45 ? <Chat><div style={rise(t, 5.5 + i * 0.25)}>{msg}</div></Chat> : <SuccessPage t={t} at={tap + 0.5} order={['Order #2204 · ₹3,105', 'Order #2231 · ₹1,799', 'Order #2240 · ₹2,499'][i]} chip={['Recovered', 'Prepaid, ₹50 saved', 'First order'][i]} title={['Payment successful', 'Paid by UPI', 'Order placed'][i]} />}
            </Phone3D>
          );
        })}
        {LANES.map((ln, i) => (
          <Obj key={ln.trig} x={960 + (i - 1) * 470} y={N ? 140 : 150} z={180} o={s2 * prog(t, 5.6 + i * 0.2, 6.0 + i * 0.2)}>
            <Tag dark tone={ln.col} size={N ? 20 : 24}>{['Cart reminder', 'COD confirmation', 'Welcome series'][i]}</Tag>
          </Obj>
        ))}

        {/* shot 3: what the journeys did today */}
        {[['₹1,24,600', 'recovered from carts', ShoppingCart01Icon, '#F472B6'], ['312', 'COD orders confirmed', PackageIcon, '#FBBF24'], ['1,289', 'shoppers welcomed', UserAdd01Icon, '#38BDF8']].map(([v, l, ic, col], i) => {
          const k = spring(t, 9.5 + i * 0.18, 0.8, 0.2);
          return (
            <Obj key={l as string} x={N ? 960 : 960 + (i - 1) * 560} y={N ? 360 + i * 230 : 540} z={lerp(-300, 0, k)} ry={N ? 0 : (1 - i) * 10} o={s3 * clamp(k * 1.5)}>
              <Panel w={520} r={32} pad={38}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                  <span style={{ width: 80, height: 80, borderRadius: 20, background: col as string, display: 'grid', placeItems: 'center', flex: 'none' }}><Ic icon={ic as IconSvgElement} size={36} /></span>
                  <div><div style={{ fontFamily: DISPLAY, fontSize: 62, fontWeight: 700, letterSpacing: '-0.04em', color: L.ink }}>{v as string}</div><div style={{ fontSize: 24, color: L.mute, whiteSpace: 'nowrap' }}>{l as string}</div></div>
                </div>
              </Panel>
            </Obj>
          );
        })}
      </Space>
    </div>
  );
}

/* ================================================================= PIXEL */
const EVENTS: [number, string, string, IconSvgElement][] = [
  [0.5, 'Landed', 'Instagram ad · Diwali edit', InstagramIcon],
  [1.1, 'Viewed', 'Linen shirt · ₹1,299', EyeIcon],
  [2.0, 'Read reviews', 'scrolled 74%', BrowserIcon],
  [3.1, 'Picked size', 'M', CheckmarkCircle02Icon],
  [3.7, 'Added to cart', 'Linen shirt M · ₹1,299', ShoppingCart01Icon],
];
export function LaunchPixel({ t }: { t: number }) {
  const lay = useLayout();
  const N = !lay.base, P = lay.portrait;
  const deep = track(t, [[0, 0], [4.9, 0], [5.5, 1], [8.3, 1], [8.9, 0]]);
  const s1 = win(t, 0.1, 5.2, 0.5);
  const scroll = (prog(t, 1.5, 2.2, E.move) - prog(t, 2.55, 2.95, E.move)) * 360;
  // cursor in page coords
  const cur: [number, number][] = [[620, 560], [250, 260], [470, 480], [520, 430], [590, 212], [700, 300]];
  const ct = [0.2, 1.0, 1.9, 2.6, 3.1, 3.7];
  let cx = cur[0][0], cy = cur[0][1];
  for (let i = 1; i < cur.length; i++) { const k = prog(t, ct[i - 1] + 0.1, ct[i], E.move); if (t > ct[i - 1]) { cx = lerp(cur[i - 1][0], cur[i][0], k); cy = lerp(cur[i - 1][1], cur[i][1], k); } }
  const trail = Array.from({ length: 14 }, (_, i) => t - i * 0.06).filter((tt) => tt > 0.2).map((tt) => { let x = cur[0][0], y = cur[0][1]; for (let i = 1; i < cur.length; i++) { const k = prog(tt, ct[i - 1] + 0.1, ct[i], E.move); if (tt > ct[i - 1]) { x = lerp(cur[i - 1][0], cur[i][0], k); y = lerp(cur[i - 1][1], cur[i][1], k); } } return [x, y]; });
  const added = t > 3.7;
  const s2 = win(t, 5.0, 8.6, 0.5);
  const leave = prog(t, 4.6, 5.2, E.exit);
  const later = spring(t, 6.0, 0.7, 0.2);
  const match = prog(t, 6.7, 7.4, E.move);
  const known = t > 7.3;
  const s3 = win(t, 8.4, 11.6, 0.6);
  const ph = spring(t, 8.4, 1.3, 0.08);
  const m1 = 9.0, m2 = 9.9;
  const bx = N ? 960 : 800, by = N ? (P ? 400 : 560) : 560;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: FONT }}>
      <Stage t={t} deep={deep} />
      <Space cam={{ s: lerp(1, 1.05, prog(t, 0, 5, E.move)) }}>
        {/* shot 1: watching the visit live */}
        <Obj x={bx} y={by} rx={8} ry={N ? -4 : 10} z={lerp(-200, 0, spring(t, 0, 1.2, 0.05)) - leave * 900} o={s1} mb={leave * 10} ms={N ? 0.7 : 1} flat>
          <BrowserWin w={1000} h={720} url="rangrez.in/linen-shirt">
            <div style={{ transform: `translateY(${-scroll}px)` }}>
              <div style={{ display: 'flex', gap: 30, padding: 34 }}>
                <div style={{ width: 430, height: 470, borderRadius: 22, overflow: 'hidden' }}><ShirtShot /></div>
                <div style={{ flex: 1, paddingTop: 20 }}>
                  <div style={{ fontFamily: DISPLAY, fontSize: 40, fontWeight: 700, letterSpacing: '-0.03em' }}>Linen shirt</div>
                  <div style={{ fontSize: 28, fontWeight: 600, marginTop: 10 }}>₹1,299</div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 26 }}>{['S', 'M', 'L', 'XL'].map((z) => <span key={z} style={{ width: 56, height: 50, borderRadius: 12, display: 'grid', placeItems: 'center', fontSize: 19, fontWeight: 600, background: z === 'M' && t > 3.1 ? L.violet : '#fff', color: z === 'M' && t > 3.1 ? '#fff' : L.ink, boxShadow: 'inset 0 0 0 1.5px rgba(20,15,46,0.14)' }}>{z}</span>)}</div>
                  <div style={{ marginTop: 24, height: 66, borderRadius: 36, background: added ? '#16A34A' : '#14102E', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 21, fontWeight: 600, transform: `scale(${1 - tapK(t, 3.7) * 0.05})` }}>{added ? 'Added to cart ✓' : 'Add to cart'}</div>
                </div>
              </div>
              <div style={{ padding: '10px 34px' }}>
                <div style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 700 }}>Reviews · 4.8 ★</div>
                {['“Fabric is soft and breathable, true to size.”', '“Wore it to a wedding, got so many compliments.”', '“Second one I have ordered. Fits perfectly.”'].map((r) => <div key={r} style={{ marginTop: 14, padding: '16px 20px', borderRadius: 16, background: '#F7F4FF', fontSize: 20, color: L.ink2 }}>{r}</div>)}
              </div>
            </div>
            <svg width="1000" height="666" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
              <polyline points={trail.map((p) => p.join(',')).join(' ')} fill="none" stroke="#8B5CF6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
            </svg>
            <Cursor x={cx} y={cy} press={tapK(t, 3.1) + tapK(t, 3.7)} s={1.5} />
          </BrowserWin>
        </Obj>
        <Obj x={N ? 960 : 1530} y={N ? (P ? 940 : 820) : 520} z={100} o={s1 * prog(t, 0.3, 0.8)} ms={N ? 0.8 : 1} ry={N ? 0 : -12}>
          <Panel w={500} r={28} pad={26}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 14, height: 14, borderRadius: 9, background: '#EF4444', boxShadow: `0 0 0 ${4 + Math.sin(t * 6) * 3}px rgba(239,68,68,0.2)` }} />
              <span style={{ fontSize: 22, fontWeight: 700 }}>Live visitor</span>
              <span style={{ marginLeft: 'auto', fontSize: 18, color: L.mute, display: 'flex', alignItems: 'center', gap: 6 }}><Ic icon={Location01Icon} size={18} color={L.mute} />Pune · iPhone</span>
            </div>
            <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
              {EVENTS.filter(([at]) => !N || t > at).slice(N ? -3 : 0).map(([at, a, b, ic]) => (
                <div key={a + b} style={{ ...rise(t, at, 0.5), display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 14, background: '#F7F4FF' }}>
                  <span style={{ width: 38, height: 38, borderRadius: 11, background: GRAD, display: 'grid', placeItems: 'center' }}><Ic icon={ic} size={20} /></span>
                  <div style={{ fontSize: 19, fontWeight: 600 }}>{a}<span style={{ fontWeight: 400, color: L.mute }}> · {b}</span></div>
                </div>
              ))}
            </div>
          </Panel>
        </Obj>
        <Obj x={N ? 960 : 800} y={N ? 70 : 110} z={180} o={s1 * prog(t, 4.2, 4.6) * (1 - leave)}><Tag tone="#F87171" size={24}>Left without paying</Tag></Obj>

        {/* shot 2: two days later, we already know them */}
        <Obj x={960} y={250} z={60} o={s2 * clamp(later * 2)} s={lerp(0.8, 1, later)}><Tag dark icon={Calendar03Icon} size={26}>2 days later · new visit from Instagram</Tag></Obj>
        <Obj x={960} y={560} z={lerp(-300, 0, prog(t, 5.6, 6.4, E.enter))} o={s2} ms={0.9}>
          <Panel dark w={720} r={34} pad={38} glow={known ? 0.6 : 0}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
              <div style={{ position: 'relative', width: 130, height: 130, flex: 'none' }}>
                <svg width="130" height="130" style={{ position: 'absolute', inset: 0, transform: `rotate(${t * 220}deg)`, opacity: known ? 0 : 1 }}><circle cx="65" cy="65" r="60" fill="none" stroke="#C4B5FD" strokeWidth="4" strokeDasharray="40 30" /></svg>
                <div style={{ position: 'absolute', inset: 10, borderRadius: 99, background: known ? GRAD : 'rgba(167,139,250,0.18)', display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontSize: 40, fontWeight: 700, color: '#fff', transform: `scale(${known ? spring(t, 7.3, 0.5, 0.35) : 1})` }}>{known ? 'AS' : <Ic icon={UserCheck01Icon} size={50} color="#C4B5FD" />}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 34, fontWeight: 700 }}>{known ? 'Welcome back, Aarav' : 'Anonymous visitor'}</div>
                <div style={{ fontSize: 21, color: L.deepMute, marginTop: 4 }}>{known ? '2nd visit · +91 90000 12345 · WhatsApp opted in' : `matching device and session… ${Math.round(match * 100)}%`}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
              {['Linen shirt M in cart', '₹1,299 open', 'Viewed reviews', 'Came from Instagram'].map((c, i) => <span key={c} style={{ padding: '9px 16px', borderRadius: 13, fontSize: 19, fontWeight: 600, background: i === 0 ? 'rgba(244,114,182,0.22)' : 'rgba(167,139,250,0.18)', color: i === 0 ? '#FBCFE8' : '#DDD6FE', opacity: known ? prog(t, 7.4 + i * 0.15, 7.7 + i * 0.15) : 0 }}>{c}</span>)}
            </div>
          </Panel>
        </Obj>

        {/* shot 3: the reminder converts */}
        <Phone3D x={N ? 960 : 760} y={lerp(1350, 545, ph)} rx={lerp(28, 5, ph)} ry={lerp(-32, -12, ph) + prog(t, 9, 11.4, E.move) * 16} s={1.04} o={s3}>
          {t < 10.85 ? (
            <Chat>
              <div style={rise(t, m1)}><TemplateBubble media={<ShirtShot />} title="Still thinking it over, Aarav?" body="Your linen shirt in M is still in your cart, and only 3 are left." time="8:05 pm" cta="Complete order" ctaPress={tapK(t, 10.4)} /></div>
              <div style={rise(t, m2)}><Bubble out read time="8:06 pm">ordering now 🙌</Bubble></div>
            </Chat>
          ) : <SuccessPage t={t} at={10.9} order="Order #2251 · ₹1,299" chip="Recovered" title="Order placed" />}
        </Phone3D>
        <Obj x={N ? 960 : 1330} y={N ? 70 : 430} z={200} o={s3 * prog(t, 9.2, 9.7)}><Tag tone={L.violet} icon={EyeIcon} size={26}>Sent because we saw the cart</Tag></Obj>
        <Obj x={N ? 960 : 1330} y={N ? 1015 : 600} z={200} o={s3 * prog(t, 11.0, 11.4)}><Tag tone={L.green} icon={ShoppingBag01Icon} size={26}>Order placed · ₹1,299</Tag></Obj>
      </Space>
    </div>
  );
}

/* ================================================================ PROFIT */
const ORDERS: [string, number, string][] = [['#2231', 1849, 'COD'], ['#2232', 799, 'Prepaid'], ['#2233', 3450, 'Prepaid'], ['#2234', 1299, 'COD'], ['#2235', 2499, 'Prepaid'], ['#2236', 949, 'COD'], ['#2237', 1799, 'Prepaid']];
const SOURCES: [string, string, IconSvgElement, string][] = [
  ['Shopify', 'orders + product cost', ShoppingBag01Icon, '#16A34A'],
  ['Meta Ads', 'ad spend by day', MetaIcon, '#4F7CF7'],
  ['Courier', 'shipping + RTO', DeliveryTruck01Icon, '#F59E0B'],
  ['Payments', 'gateway + COD fees', CreditCardIcon, '#EC4899'],
];
const FALL: [string, number, string][] = [['Revenue', 482300, '#8B5CF6'], ['Product cost', -192900, '#A78BFA'], ['Ads', -96500, '#818CF8'], ['Shipping', -41000, '#38BDF8'], ['RTO', -31200, '#F472B6'], ['Fees', -24240, '#FBBF24'], ['Net profit', 96460, '#22C55E']];
export function LaunchProfit({ t }: { t: number }) {
  const lay = useLayout();
  const N = !lay.base;
  const deep = track(t, [[0, 0], [3.8, 0], [4.4, 1], [8.4, 1], [9.0, 0]]);
  const s1 = win(t, 0.1, 4.1, 0.5);
  const rev = Math.round(482300 * prog(t, 0.4, 3.2, (x) => 1 - Math.pow(1 - x, 2)));
  const s2 = win(t, 3.9, 6.2, 0.5);
  const fan = prog(t, 4.6, 5.6, E.move);
  const s3 = win(t, 5.9, 8.8, 0.5);
  const s4 = win(t, 8.6, 11.6, 0.6);
  const net = Math.round(96460 * prog(t, 9.0, 10.0, E.move));
  // waterfall geometry
  const bw = N ? 92 : 120, gap = N ? 26 : 40, chartH = 420, scale = chartH / 482300;
  let run = 0;
  const bars = FALL.map(([l, v, c], i) => {
    const last = i === FALL.length - 1;
    const top = last ? v : i === 0 ? v : run;
    const from = last ? 0 : i === 0 ? 0 : run + v;
    if (!last) run = i === 0 ? v : run + v;
    return { l, v, c, lo: Math.min(from, top), hi: Math.max(from, top), at: 6.0 + i * 0.24 };
  });
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: FONT }}>
      <Stage t={t} deep={deep} />
      <Space cam={{ s: lerp(1, 1.04, prog(t, 0, 4, E.move)) }}>
        {/* shot 1: sales pour in, profit unknown */}
        {ORDERS.map(([id, v, kind], i) => {
          const at = 0.3 + i * 0.42;
          const k = prog(t, at, at + 2.6, E.linear);
          if (k <= 0 || k >= 1) return null;
          return (
            <Obj key={id} x={N ? 960 + (i % 2 ? 180 : -180) : 1440} y={lerp(1000, 120, k)} z={-80 + (i % 3) * 60} o={s1 * clamp(k * 6) * clamp((1 - k) * 4)} ms={N ? 0.85 : 1}>
              <div style={{ width: 400, display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderRadius: 20, background: '#fff', boxShadow: '0 0 0 1px rgba(124,58,237,0.1), 0 20px 40px -18px rgba(76,29,149,0.4)' }}>
                <span style={{ width: 50, height: 50, borderRadius: 14, background: '#16A34A', display: 'grid', placeItems: 'center', flex: 'none' }}><Ic icon={ShoppingBag01Icon} size={26} /></span>
                <div style={{ flex: 1 }}><div style={{ fontSize: 21, fontWeight: 700 }}>New order {id}</div><div style={{ fontSize: 17, color: L.mute }}>{kind}</div></div>
                <span style={{ fontFamily: DISPLAY, fontSize: 26, fontWeight: 700, color: '#15803D' }}>+₹{inr(v)}</span>
              </div>
            </Obj>
          );
        })}
        <Obj x={N ? 960 : 700} y={N ? 380 : 400} z={60} o={s1}>
          <div style={{ textAlign: N ? 'center' : 'left' }}>
            <Caption>Revenue this month</Caption>
            <Figure value={`₹${inr(rev)}`} size={N ? 130 : 150} />
          </div>
        </Obj>
        <Obj x={N ? 960 : 700} y={N ? 590 : 620} z={60} o={s1 * prog(t, 1.6, 2.1)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 30px', borderRadius: 26, background: '#fff', boxShadow: '0 0 0 1px rgba(124,58,237,0.12), 0 20px 50px -20px rgba(76,29,149,0.4)' }}>
            <span style={{ fontSize: 30, fontWeight: 600, color: L.ink2 }}>Profit</span>
            <span style={{ fontFamily: DISPLAY, fontSize: 64, fontWeight: 800, color: '#E11D48', transform: `scale(${1 + Math.sin(t * 5) * 0.06})`, display: 'inline-block' }}>?</span>
            <span style={{ fontSize: 22, color: L.mute, whiteSpace: 'nowrap' }}>after ads, RTO, COD fees…</span>
          </div>
        </Obj>

        {/* shot 2: every cost source flows in */}
        {SOURCES.map(([n, sub, ic, col], i) => (
          <Obj key={n} x={N ? 960 + (i % 2 ? 230 : -230) : 520} y={N ? 250 + Math.floor(i / 2) * 150 : 290 + i * 165} z={0} o={s2 * prog(t, 4.0 + i * 0.12, 4.4 + i * 0.12)} ms={N ? 0.8 : 1}>
            <Panel dark w={420} r={24} pad="18px 22px">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ width: 56, height: 56, borderRadius: 16, background: col, display: 'grid', placeItems: 'center' }}><Ic icon={ic} size={30} /></span>
                <div><div style={{ fontSize: 26, fontWeight: 700 }}>{n}</div><div style={{ fontSize: 19, color: L.deepMute }}>{sub}</div></div>
              </div>
            </Panel>
          </Obj>
        ))}
        {s2 > 0 ? <div style={{ position: 'absolute', left: 0, top: 0, opacity: s2 }}><FanIn from={SOURCES.map((_, i) => (N ? [960 + (i % 2 ? 230 : -230), 250 + Math.floor(i / 2) * 150 + 50] : [735, 290 + i * 165]) as [number, number])} to={N ? [960, 760] : [1250, 540]} k={fan} pulse={t > 5.6 ? (t - 5.6) * 0.9 : 0} /></div> : null}
        <Obj x={N ? 960 : 1380} y={N ? 820 : 540} z={60} o={s2 * prog(t, 5.0, 5.4)} s={lerp(0.7, 1, spring(t, 5.0, 0.8, 0.25))}>
          <div style={{ display: 'grid', justifyItems: 'center', gap: 14 }}><GlassIcon icon={Calculator01Icon} size={170} shine={(t * 0.6) % 1} /><div style={{ color: L.deepInk, fontSize: 26, fontWeight: 600, whiteSpace: 'nowrap' }}>Every cost, per order</div></div>
        </Obj>

        {/* shot 3: the waterfall */}
        <Obj x={960} y={560} z={lerp(-300, 0, prog(t, 5.9, 6.7, E.enter))} o={s3} ms={N ? 0.92 : 1}>
          <div style={{ position: 'relative', width: FALL.length * (bw + gap), height: chartH + 140 }}>
            {bars.map((b, i) => {
              const k = prog(t, b.at, b.at + 0.5, E.enter);
              const y0 = chartH - b.hi * scale, h = (b.hi - b.lo) * scale;
              return (
                <div key={b.l} style={{ position: 'absolute', left: i * (bw + gap), top: 0, width: bw, height: chartH + 140 }}>
                  <div style={{ position: 'absolute', left: 0, right: 0, top: y0 + (b.v < 0 ? 0 : h * (1 - k)), height: Math.max(4, h * k), borderRadius: 12, background: b.c, boxShadow: i === FALL.length - 1 ? `0 0 ${40 * k}px rgba(34,197,94,0.7)` : 'inset 0 1px 0 rgba(255,255,255,0.35)' }} />
                  <div style={{ position: 'absolute', left: -20, right: -20, top: y0 - 40, textAlign: 'center', fontSize: N ? 18 : 21, fontWeight: 700, color: b.v < 0 ? '#FDA4AF' : '#fff', opacity: k, whiteSpace: 'nowrap' }}>{b.v < 0 ? '−' : ''}₹{Math.abs(b.v) >= 100000 ? `${(Math.abs(b.v) / 100000).toFixed(2)}L` : `${(Math.abs(b.v) / 1000).toFixed(1)}k`}</div>
                  <div style={{ position: 'absolute', left: -24, right: -24, top: chartH + 18, textAlign: 'center', fontSize: N ? 17 : 19, color: L.deepMute, opacity: k, whiteSpace: 'nowrap' }}>{b.l}</div>
                </div>
              );
            })}
          </div>
        </Obj>

        {/* shot 4: the real number */}
        <Obj x={960} y={420} z={lerp(-400, 0, prog(t, 8.6, 9.4, E.enter))} o={s4}>
          <div style={{ textAlign: 'center' }}><Caption>Net profit this month</Caption><Figure value={`₹${inr(net)}`} size={190} /></div>
        </Obj>
        <Obj x={960} y={650} o={s4 * prog(t, 9.6, 10.0)}>
          <div style={{ display: N ? 'grid' : 'flex', gap: 14, justifyItems: 'center' }}>
            <Tag tone={L.green} size={26}>20% margin</Tag><Tag tone={L.violet} size={26}>₹186 per order</Tag><Tag tone="#F472B6" icon={TruckReturnIcon} size={26}>RTO counted</Tag>
          </div>
        </Obj>
        <Obj x={960} y={N ? 860 : 760} o={s4 * prog(t, 10.2, 10.6)}><Caption size={26}>calculated from every order, ad and courier bill</Caption></Obj>
      </Space>
    </div>
  );
}

export const launch4 = {
  'L-journeys': { w: W, h: H, duration: 12, Component: LaunchJourneys },
  'L-pixel': { w: W, h: H, duration: 12, Component: LaunchPixel },
  'L-profit': { w: W, h: H, duration: 12, Component: LaunchProfit },
};
void [FlashIcon, SmartPhone01Icon, Words, Confetti];
