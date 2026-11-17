/**
 * Chapter 05 — Journeys. Six segments per docs/video/feature-library/ch05_journeys.md.
 * Every value is a function of t (seconds). Each composition renders 0.5 s longer
 * than its segment; the cut folds that tail into the head for a seamless loop.
 */
import type { ReactNode } from 'react';
import {
  CheckmarkCircle02Icon, Clock01Icon, CreditCardIcon, DeliveryTruck01Icon, FlashIcon, FlowConnectionIcon,
  LockIcon, Logout03Icon, Message01Icon, PackageIcon, SentIcon, ShoppingBag02Icon, ShoppingCart01Icon,
  Route01Icon, UserCheck01Icon, ViewIcon, Wallet01Icon,
} from '@hugeicons/core-free-icons';
import { SiMeta } from 'react-icons/si';
import { E, clamp, keys, lerp, pathPoint, prog, spring, typed } from '../lib/time';
import {
  Backdrop, Bubble, C, Camera, Card, CardHeader, CheckCircle, Chip, Cursor, DISPLAY, DateChip, FONT, Icon, Layer, Pill,
  Rail, SHADOW_LIFT, Step, TemplateBubble, Toast, Touch, WaHeader, WaScreen, pop,
} from '../lib/ui';
import { ShirtShot, ShoeShot } from '../lib/products';
import {
  CheckoutPage, LockScreen, PhoneRig, SH, SW, SuccessPage, backdropState, phoneOffset, phonePoint, screenY,
} from '../lib/rig';

const T = 1080;

/* =============================================================== 05-T1 */
/** Drag a Wait step between the trigger and the reminder. */
export function T1({ t }: { t: number }) {
  const S = 30;
  const stepH = 112;
  const open = prog(t, 1.45, 2.2, E.move);
  const grab = prog(t, 1.05, 1.25, E.enter);
  const drop = prog(t, 2.25, 2.45, E.enter);
  const morph = prog(t, 2.3, 2.85, E.enter);
  const drag = prog(t, 1.25, 2.3, E.move);
  // Chip path inside the steps container (left/top of chip), from its parking spot to the slot.
  const [cx, cy] = pathPoint([[520, 392], [640, 250], [120, 180], [0, stepH + 4]], drag);
  const lift = grab * (1 - drop);
  const saved = prog(t, 3.2, 3.6);
  // Cursor in card-inner coords: arrive, grab, drag, release, leave.
  const curIn = prog(t, 0.45, 1.05, E.move);
  const [ax, ay] = pathPoint([[860, 760], [760, 560], [620, 430]], curIn);
  const leave = prog(t, 2.7, 3.7, E.move);
  const [lx, ly] = pathPoint([[cx + 100, cy + 38], [500, 360], [900, 780]], leave);
  const curX = t < 1.25 ? ax : t < 2.6 ? cx + 100 : lx;
  const curY = t < 1.25 ? ay : t < 2.6 ? cy + 38 : ly;
  const press = t < 1.25 ? grab : 1 - prog(t, 2.3, 2.45);
  const bob = Math.sin(t * 2.4) * 4 * (1 - grab);
  const camZ = keys(t, [[0, 1], [1.1, 1], [2.4, 1.035], [6.6, 1.035], [7.8, 1]], E.camera);
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="mint" pattern="lines" w={T} h={T} />
      <Camera z={camZ}>
        <Layer x={540} y={548}>
          <Card w={860}>
            <CardHeader icon={FlowConnectionIcon} title="Cart recovery" size={S + 4} right={
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ opacity: 1 - saved }}><Chip tone="amber" dot size={22}>Editing</Chip></span>
                <span style={{ position: 'absolute', right: 0, top: 0, opacity: saved, transform: `scale(${lerp(0.9, 1, saved)})` }}><Chip tone="emerald" icon={CheckmarkCircle02Icon} size={22}>Saved</Chip></span>
              </span>
            } />
            <div style={{ position: 'relative', height: lerp(stepH * 2 - 10, stepH * 3 - 6, open) }}>
              <Rail x={52} top={40} h={lerp(stepH, stepH * 2, open)} />
              <div style={{ position: 'absolute', left: 0, top: 0 }}>
                <Step icon={ShoppingCart01Icon} title="Cart abandoned" sub="Shopify trigger" size={S} w={792} done={1} />
              </div>
              <div style={{ position: 'absolute', left: 0, top: lerp(stepH + 4, stepH * 2 + 6, open) }}>
                <Step icon={SentIcon} title="Send reminder" sub="cart_reminder · approved" size={S} w={792} />
              </div>
              {/* the new step, revealed as the chip lands */}
              {morph > 0 ? (
                <div style={{ position: 'absolute', left: 0, top: stepH + 4, opacity: morph, transform: `scale(${lerp(0.97, 1, morph)})`, transformOrigin: '0 50%' }}>
                  <Step icon={Clock01Icon} title="Wait 30 minutes" sub={t < 4.4 ? 'Dropped in just now' : 'Then send the reminder'} size={S} w={792} wash={1 - prog(t, 3.2, 4.6)} run={0} />
                </div>
              ) : null}
              {/* the dragged chip */}
              {morph < 1 ? (
                <div style={{ position: 'absolute', left: cx, top: cy + bob, opacity: 1 - morph, transform: `scale(${1 + lift * 0.06}) rotate(${lift * -2.5 * (1 - drag)}deg)`, transformOrigin: '30% 50%', zIndex: 5 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, height: 78, padding: '0 30px 0 22px', borderRadius: 999, background: '#fff', boxShadow: `0 0 0 2.5px ${C.violet}, ${lift > 0.1 ? SHADOW_LIFT : '0 10px 24px -12px rgba(16,24,40,0.3)'}`, fontSize: 30, fontWeight: 600, color: C.ink, whiteSpace: 'nowrap' }}>
                    <Icon icon={Clock01Icon} size={34} color={C.violet} />
                    Wait 30 min
                  </div>
                </div>
              ) : null}
              <Cursor x={curX} y={curY} press={press} o={prog(t, 0.45, 0.7) * (1 - prog(t, 3.4, 3.7))} s={1.7} />
            </div>
          </Card>
        </Layer>
      </Camera>
    </div>
  );
}

/* =============================================================== 05-T2 */
/** Start from a ready-made journey. */
export function T2({ t }: { t: number }) {
  const S = 30;
  const rows: [typeof ShoppingCart01Icon, string, string][] = [
    [ShoppingCart01Icon, 'Cart recovery', '3 steps · recovers 18%'],
    [Wallet01Icon, 'COD confirmation', '2 steps · cuts RTO'],
    [PackageIcon, 'Order confirmed', '1 step'],
    [DeliveryTruck01Icon, 'Shipping updates', '3 steps'],
  ];
  const hover = prog(t, 1.15, 1.35);
  const press = prog(t, 1.55, 1.65) * (1 - prog(t, 1.7, 1.8));
  const added = spring(t, 1.75, 0.5, 0.2);
  const curK = prog(t, 0.4, 1.3, E.move);
  const [cx0, cy0] = pathPoint([[900, 900], [860, 520], [745, 300]], curK);
  const leaveK = prog(t, 2.2, 3.1, E.move);
  const [cx, cy] = t < 2.2 ? [cx0, cy0] : pathPoint([[745, 300], [820, 600], [1000, 980]], leaveK);
  const toast = spring(t, 2.25, 0.6, 0.15);
  const camZ = keys(t, [[0, 1], [0.6, 1], [1.8, 1.05], [6.4, 1.05], [7.8, 1]], E.camera);
  const camY = keys(t, [[0, 0], [0.6, 0], [1.8, 40], [6.4, 40], [7.8, 0]], E.camera);
  const tp = pop(toast);
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="lime" pattern="mesh" w={T} h={T} />
      <Camera z={camZ} y={camY}>
        <Layer x={540} y={520}>
          <Card w={880}>
            <CardHeader icon={Route01Icon} title="Pre-built journeys" size={S + 4} right={<Chip size={22}>12 ready</Chip>} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {rows.map(([icon, title, sub], i) => (
                <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '18px 20px', borderRadius: 20, background: i === 0 ? '#F7F5FC' : '#fff', boxShadow: i === 0 ? `0 0 0 1.5px rgba(124,58,237,${0.18 + 0.4 * hover})` : `0 0 0 1.5px ${C.line}` }}>
                  <Icon icon={icon} size={36} color={i === 0 ? C.violet : C.ink2} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: S, fontWeight: 600, letterSpacing: '-0.012em' }}>{title}</div>
                    <div style={{ fontSize: S * 0.8, color: C.muted, marginTop: 3 }}>{sub}</div>
                  </div>
                  {i === 0 ? (
                    <span style={{ position: 'relative', display: 'inline-block', width: 170, height: 52 }}>
                      <span style={{ position: 'absolute', right: 0, top: 0, opacity: (1 - added) * (1 - hover) }}><Pill kind="secondary" size={24}>Use</Pill></span>
                      <span style={{ position: 'absolute', right: 0, top: 0, opacity: (1 - clamp(added * 1.5)) * hover }}><Pill kind="primary" size={24} press={press}>Use</Pill></span>
                      <span style={{ position: 'absolute', right: 0, top: 4, opacity: clamp(added * 1.5), transform: `scale(${lerp(0.8, 1, added)})`, transformOrigin: '100% 50%' }}><Chip tone="emerald" icon={CheckmarkCircle02Icon} size={22}>Added</Chip></span>
                    </span>
                  ) : (
                    <Pill kind="secondary" size={24}>Use</Pill>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </Layer>
        <Layer x={540} y={900} s={tp.s} o={tp.o}>
          <Toast icon={FlashIcon} title="Cart recovery is ready" sub="3 steps, approved template, live in one click" size={28} tone={C.violet} />
        </Layer>
        <Cursor x={cx + 100} y={cy + 115} press={press} o={prog(t, 0.4, 0.65) * (1 - prog(t, 2.8, 3.1))} s={1.7} />
      </Camera>
    </div>
  );
}

/* =============================================================== 05-T3 */
/** Nothing goes live until Meta approves the template. */
export function T3({ t }: { t: number }) {
  const S = 30;
  const approved = spring(t, 2.2, 0.55, 0.2);
  const ap = clamp(approved * 1.6);
  const goLive = prog(t, 3.75, 3.95);
  const press = prog(t, 3.55, 3.65) * (1 - prog(t, 3.7, 3.8));
  const live = spring(t, 3.8, 0.55, 0.2);
  const meta = spring(t, 2.0, 0.6, 0.18);
  const mp = pop(meta);
  const metaOut = prog(t, 4.6, 5.0);
  const curK = prog(t, 2.6, 3.5, E.move);
  const [cx, cy] = t < 4.0 ? pathPoint([[960, 1000], [820, 900], [560, 880]], curK) : pathPoint([[560, 880], [700, 960], [1020, 1100]], prog(t, 4.0, 4.9, E.move));
  const pulse = (t * 0.9) % 1;
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="lagoon" pattern="dots" w={T} h={T} />
      <Layer x={540} y={548}>
        <Card w={860}>
          <CardHeader icon={SentIcon} title="Send reminder" size={S + 4} right={<Chip size={22}>Step 3</Chip>} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '18px 20px', borderRadius: 20, boxShadow: `0 0 0 1.5px ${C.line}` }}>
            <Icon icon={Message01Icon} size={36} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: S, fontWeight: 600, fontFamily: "'Geist Mono','SF Mono',ui-monospace,monospace", letterSpacing: '-0.02em' }}>cart_reminder_v2</div>
              <div style={{ fontSize: S * 0.8, color: C.muted, marginTop: 3 }}>Marketing template</div>
            </div>
            <span style={{ position: 'relative', width: 200, height: 42, display: 'inline-block' }}>
              <span style={{ position: 'absolute', right: 0, top: 0, opacity: 1 - ap }}><Chip tone="amber" dot pulse={pulse} size={22}>Pending</Chip></span>
              <span style={{ position: 'absolute', right: 0, top: 0, opacity: ap, transform: `scale(${lerp(0.85, 1, approved)})`, transformOrigin: '100% 50%' }}><Chip tone="emerald" icon={CheckmarkCircle02Icon} size={22}>Approved</Chip></span>
            </span>
          </div>
          {/* message preview */}
          <div style={{ marginTop: 20, borderRadius: 22, background: C.waBg, padding: 22, display: 'flex', gap: 20, alignItems: 'center' }}>
            <div style={{ width: 150, height: 112, borderRadius: 14, overflow: 'hidden', flex: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.12)' }}><ShoeShot /></div>
            <div style={{ background: '#fff', borderRadius: 16, padding: '14px 18px', fontSize: 25, lineHeight: 1.35, color: '#111B21', boxShadow: '0 1px 1.5px rgba(0,0,0,0.10)' }}>
              <b>You left something behind</b><br />Here is 10% off for the next hour.
            </div>
          </div>
          <div style={{ marginTop: 24, position: 'relative', height: 66 }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 1 - ap }}><Pill kind="disabled" size={26} icon={LockIcon} full>Can't go live until Meta approves</Pill></div>
            <div style={{ position: 'absolute', inset: 0, opacity: ap * (1 - goLive) }}><Pill kind="primary" size={26} icon={FlashIcon} full press={press}>Go live</Pill></div>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: clamp(live * 1.5), transform: `scale(${lerp(0.85, 1, live)})` }}><Chip tone="emerald" dot pulse={pulse} size={26}>Live · 3 shoppers in journey</Chip></div>
          </div>
        </Card>
      </Layer>
      <Layer x={720} y={262} s={mp.s} o={mp.o * (1 - metaOut)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 26px 16px 18px', borderRadius: 22, whiteSpace: 'nowrap', background: '#fff', boxShadow: `${SHADOW_LIFT}, inset 0 0 0 1.5px ${C.line}`, fontFamily: FONT }}>
          <span style={{ width: 52, height: 52, borderRadius: 14, background: '#EEF3FF', display: 'grid', placeItems: 'center' }}><SiMeta size={30} color="#0866FF" /></span>
          <div>
            <div style={{ fontSize: 27, fontWeight: 600 }}>Approved by Meta</div>
            <div style={{ fontSize: 22, color: C.muted, marginTop: 2 }}>cart_reminder_v2 · just now</div>
          </div>
        </div>
      </Layer>
      <Cursor x={cx} y={cy} press={press} o={prog(t, 2.6, 2.85) * (1 - prog(t, 4.6, 4.9))} s={1.7} />
    </div>
  );
}

/* =============================================================== 05-S1 */
const fmtCountdown = (k: number) => {
  const s = Math.round((1 - k) * 1799);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

/** Cart recovery, end to end: journey runs → WhatsApp → UPI → recovered. */
export function S1({ t }: { t: number }) {
  const S = 36;
  const bd = backdropState(t, 3.7, 10.6);
  const off = phoneOffset(t, 3.85, 10.55);
  const st = (a: number, b: number) => ({ run: prog(t, a, a + 0.25), done: prog(t, b, b + 0.45) });
  const s1 = st(0.3, 1.0), s2 = st(1.0, 2.2), s3 = st(2.2, 3.2), s4 = st(10.9, 11.7);
  const countK = prog(t, 1.2, 2.15, E.linear);
  const chatIn = prog(t, 5.55, 6.0, E.enter);
  const bubble = spring(t, 5.8, 0.6, 0.15);
  const ctaPress = prog(t, 6.95, 7.05) * (1 - prog(t, 7.15, 7.25));
  const checkout = prog(t, 7.3, 7.85, E.enter);
  const pay = prog(t, 8.8, 8.9) * (1 - prog(t, 9.0, 9.1));
  const success = prog(t, 9.15, 9.5, E.enter);
  // fingertip: banner tap 5.4, CTA 7.0, Pay 8.85 (logical phone coords)
  const tap = (at: number) => prog(t, at - 0.08, at) * (1 - prog(t, at + 0.12, at + 0.22));
  const touchPts: [number, number, number, number][] = [[5.0, 5.75, 195, 278], [6.5, 7.45, 195, 450], [8.3, 9.1, 195, 474]];
  let touch: { x: number; y: number; o: number; press: number; ripple: number } | null = null;
  for (const [a, b, lx, ly] of touchPts) {
    if (t >= a && t <= b) {
      const [x, y] = phonePoint(lx, ly, off);
      const at = a + (b - a) * 0.55;
      touch = { x, y, o: prog(t, a, a + 0.2) * (1 - prog(t, b - 0.2, b)), press: tap(at), ripple: prog(t, at, at + 0.5) };
    }
  }
  const toast = spring(t, 11.8, 0.65, 0.16);
  const tp = pop(toast);
  return (
    <div style={{ width: SW, height: SH, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="coral" pattern="beams" w={SW} h={SH} />
      <Camera z={keys(t, [[0, 1], [3.2, 1.025], [11.0, 1.0], [15.5, 1.0]], E.camera)}>
        <Layer x={960} y={600} s={bd.s * 1.12} o={bd.o} blur={bd.blur}>
          <div style={{ position: 'relative' }}>
            <Card w={1040} pad={40}>
              <CardHeader icon={FlowConnectionIcon} title="Cart recovery" size={S + 4} right={<Chip tone="emerald" dot size={25} pulse={(t * 0.8) % 1}>Live</Chip>} />
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 18 }}>
                <Rail x={62} top={50} h={420} />
                <Step icon={ShoppingCart01Icon} title="Cart abandoned" sub="Naina · ₹3,450 · 1 item" size={S} {...s1} />
                <Step icon={Clock01Icon} title="Wait 30 minutes" sub={s2.run > 0 && s2.done < 1 ? <span style={{ fontVariantNumeric: 'tabular-nums' }}>No order yet · {fmtCountdown(countK)} left</span> : 'No order yet'} size={S} {...s2} />
                <Step icon={SentIcon} title="Send reminder" sub="With 10% off for an hour" size={S} {...s3} />
                <Step icon={PackageIcon} title="Order placed" sub={s4.done > 0.5 ? 'Order #3381 · ₹3,105' : 'Journey ends'} size={S} {...s4} />
              </div>
            </Card>
            <div style={{ position: 'absolute', right: -40, bottom: -46, transform: `scale(${tp.s})`, opacity: tp.o, transformOrigin: '100% 100%' }}>
              <Toast icon={Wallet01Icon} title="Recovered ₹3,105" sub="Cart recovery · reminder 1" size={34} />
            </div>
          </div>
        </Layer>
      </Camera>
      <PhoneRig offset={off} time="4:12">
        <LockScreen t={t} time="4:12" date="Tuesday, 17 November" bannerAt={4.55} bannerTitle="Stride Shoes" bannerBody="Naina, your cart is waiting. 10% off for the next hour" />
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${screenY(chatIn)}px)`, opacity: chatIn > 0 ? 1 : 0 }}>
          <WaScreen>
            <WaHeader name="Stride Shoes" letter="S" color="#4F46E5" />
            <div style={{ position: 'absolute', top: 124, left: 0, right: 0 }}><DateChip /></div>
            <div style={{ position: 'absolute', top: 160, left: 12, opacity: clamp(bubble * 2), transform: `translateY(${lerp(30, 0, bubble)}px) scale(${lerp(0.96, 1, bubble)})`, transformOrigin: '0 0' }}>
              <TemplateBubble media={<ShoeShot />} title="You left something behind" body="Naina, your Cloudrun 2 is still in your cart. Here is 10% off for the next hour." time="4:12 pm" cta="Complete order" ctaPress={ctaPress} />
            </div>
          </WaScreen>
        </div>
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${screenY(checkout)}px)`, opacity: checkout > 0 ? 1 : 0, zIndex: 12 }}>
          <CheckoutPage media={<ShoeShot />} title="Cloudrun 2 · UK 6" price="₹3,105" was="₹3,450" code="COMEBACK10" name="Naina Kapoor" address="Indiranagar, Bengaluru 560038" total="₹3,105" pay={pay} />
          <div style={{ position: 'absolute', inset: 0, opacity: success, zIndex: 3 }}>
            {success > 0 ? <SuccessPage t={t} at={9.25} order="Order #3381 · ₹3,105 via UPI" chip="Shipping updates on WhatsApp" /> : null}
          </div>
        </div>
      </PhoneRig>
      {touch ? <Touch {...touch} /> : null}
    </div>
  );
}

/* =============================================================== 05-S2 */
type NodeProps = { icon: typeof Wallet01Icon; title: string; sub: ReactNode; active?: number; done?: number; w?: number };
function FlowNode({ icon, title, sub, active = 0, done = 0, w = 380 }: NodeProps) {
  return (
    <div style={{ width: w, display: 'flex', alignItems: 'center', gap: 18, padding: '20px 22px', borderRadius: 22, background: '#fff', boxShadow: `0 0 0 ${1.5 + active}px ${done > 0.5 ? 'rgba(5,150,105,0.5)' : active > 0 ? `rgba(124,58,237,${0.25 + 0.65 * active})` : C.line}, 0 0 0 ${8 * active * (1 - done)}px rgba(124,58,237,0.10), 0 12px 26px -16px rgba(16,24,40,0.3)`, fontFamily: FONT }}>
      <Icon icon={icon} size={38} color={done > 0.5 ? C.emerald : active > 0.5 ? C.violet : C.ink2} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.012em', whiteSpace: 'nowrap' }}>{title}</div>
        <div style={{ fontSize: 24, color: C.muted, marginTop: 3, whiteSpace: 'nowrap' }}>{sub}</div>
      </div>
      {done > 0 ? <CheckCircle size={40} p={done} /> : null}
    </div>
  );
}

/** COD orders branch to a confirmation; Rahul taps Yes. */
export function S2({ t }: { t: number }) {
  // Canvas card 1180x800 centred. Node anchors in canvas coords.
  const W = 1000, H = 780;
  const K = 1.2; // canvas scale in the world
  const L: [number, number] = [36, 410];
  const R: [number, number][] = [[556, 210], [556, 410], [556, 610]];
  const path = (i: number) => {
    const [x0, y0] = [L[0] + 380, L[1]];
    const [x1, y1] = [R[i][0], R[i][1]];
    return `M ${x0} ${y0} C ${x0 + 120} ${y0}, ${x1 - 140} ${y1}, ${x1} ${y1}`;
  };
  const draw = prog(t, 0.6, 1.5, E.move);
  const codActive = prog(t, 1.4, 1.8);
  const confirmed = prog(t, 4.45, 4.95);
  // Camera: push toward the COD node and the WhatsApp card, then pull back.
  const fx = keys(t, [[0, 960], [1.6, 960], [2.6, 1250], [5.6, 1250], [6.8, 960], [13, 960]], E.camera);
  const fy = keys(t, [[0, 600], [1.6, 600], [2.6, 560], [5.6, 560], [6.8, 600], [13, 600]], E.camera);
  const z = keys(t, [[0, 1], [1.6, 1], [2.6, 1.18], [5.6, 1.18], [6.8, 1], [13, 1]], E.camera);
  const wa = spring(t, 2.5, 0.65, 0.15);
  const wap = pop(wa);
  const waOut = prog(t, 5.7, 6.2);
  const reply = spring(t, 4.35, 0.5, 0.15);
  const sat = spring(t, 4.8, 0.6, 0.18);
  const sp = pop(sat);
  // WhatsApp card lives in world coords right of the COD node.
  const cardX = 1290, cardY = 640;
  const tapAt = 4.2;
  const tch = { x: cardX - 105, y: cardY + 118, o: prog(t, 3.5, 3.7) * (1 - prog(t, 4.6, 4.8)), press: prog(t, tapAt - 0.08, tapAt) * (1 - prog(t, tapAt + 0.12, tapAt + 0.22)), ripple: prog(t, tapAt, tapAt + 0.5) };
  const dotK = prog(t, 0.6, 1.5, E.move);
  return (
    <div style={{ width: SW, height: SH, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="bloom" pattern="grid" w={SW} h={SH} />
      <Camera x={(960 - fx) * z} y={(600 - fy) * z} z={z}>
        <Layer x={960} y={600} s={K}>
          <div style={{ width: W, height: H, borderRadius: 34, background: '#FBFBFD', boxShadow: `0 1px 2px rgba(16,24,40,0.05), 0 30px 70px -40px rgba(40,24,96,0.4), inset 0 0 0 1.5px ${C.line}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(16,24,40,0.12) 1.5px, transparent 2px)', backgroundSize: '34px 34px' }} />
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 86, background: 'rgba(255,255,255,0.92)', borderBottom: `1.5px solid ${C.line}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 34px' }}>
              <Icon icon={FlowConnectionIcon} size={34} color={C.ink} />
              <span style={{ fontSize: 32, fontWeight: 600, flex: 1 }}>Order routing</span>
              <Chip tone="emerald" dot size={22}>Published</Chip>
            </div>
            <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
              {[0, 1, 2].map((i) => <path key={i} d={path(i)} fill="none" stroke="#D3D5DE" strokeWidth={3} />)}
              <path d={path(0)} fill="none" stroke={C.violet} strokeWidth={4.5} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
            </svg>
            {dotK > 0 && dotK < 1 ? (() => {
              const [x0, y0] = [L[0] + 380, L[1]];
              const [x1, y1] = R[0];
              const [px, py] = pathPoint([[x0, y0], [x0 + 120, y0], [x1 - 140, y1], [x1, y1]], dotK);
              return <div style={{ position: 'absolute', left: px - 11, top: py - 11, width: 22, height: 22, borderRadius: 99, background: C.violet, boxShadow: '0 0 0 8px rgba(124,58,237,0.18)' }} />;
            })() : null}
            <div style={{ position: 'absolute', left: L[0], top: L[1] - 52 }}>
              <FlowNode icon={ShoppingBag02Icon} title="Order created" sub="#2204 · ₹1,849 · COD" active={1} w={380} />
            </div>
            <div style={{ position: 'absolute', left: R[0][0], top: R[0][1] - 52 }}>
              <FlowNode icon={Wallet01Icon} title="COD" sub={confirmed > 0.5 ? 'Confirmed · ships today' : codActive > 0.5 ? 'Confirm request sent' : 'Ask to confirm'} active={codActive} done={confirmed} w={404} />
            </div>
            <div style={{ position: 'absolute', left: R[1][0], top: R[1][1] - 52, opacity: lerp(1, 0.55, codActive) }}>
              <FlowNode icon={CreditCardIcon} title="Prepaid" sub="Send thank you" w={404} />
            </div>
            <div style={{ position: 'absolute', left: R[2][0], top: R[2][1] - 52, opacity: lerp(1, 0.55, codActive) }}>
              <FlowNode icon={Message01Icon} title="No reply" sub="Nudge in 4 hours" w={404} />
            </div>
          </div>
        </Layer>
        {/* WhatsApp confirm card */}
        <Layer x={cardX} y={cardY} s={wap.s * lerp(1, 0.94, waOut)} o={wap.o * (1 - waOut)}>
          <div style={{ width: 470, borderRadius: 28, background: C.waBg, padding: 18, boxShadow: `${SHADOW_LIFT}`, fontFamily: FONT }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 99, background: '#BE185D', color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'Georgia, serif', fontSize: 22 }}>M</div>
              <div style={{ fontSize: 22, fontWeight: 600 }}>Mira Ethnic</div>
            </div>
            <div style={{ background: '#fff', borderRadius: 16, borderTopLeftRadius: 5, padding: '14px 16px', fontSize: 23, lineHeight: 1.38, color: '#111B21' }}>
              Hi Rahul, please confirm your COD order <b>#2204</b> for <b>₹1,849</b>.
              <div style={{ textAlign: 'right', fontSize: 16, color: '#667781', marginTop: 4 }}>11:20</div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              {['Yes, confirm', 'Cancel'].map((b, i) => (
                <div key={b} style={{ flex: 1, height: 54, borderRadius: 14, background: i === 0 ? `rgba(255,255,255,${1 - 0.25 * tch.press})` : '#fff', color: C.waLink, fontSize: 22, fontWeight: 600, display: 'grid', placeItems: 'center', boxShadow: '0 1px 1.5px rgba(0,0,0,0.1)' }}>{b}</div>
              ))}
            </div>
            {reply > 0 ? (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10, opacity: clamp(reply * 2), transform: `translateY(${lerp(14, 0, reply)}px)` }}>
                <div style={{ background: C.waOut, borderRadius: 16, borderTopRightRadius: 5, padding: '10px 14px', fontSize: 23, color: '#111B21' }}>Yes, confirm <span style={{ fontSize: 16, color: '#667781' }}>11:21</span></div>
              </div>
            ) : null}
          </div>
        </Layer>
        <Touch {...tch} />
        <Layer x={1300} y={262} s={sp.s} o={sp.o}>
          <Toast icon={UserCheck01Icon} title="Confirmed" sub="Rahul tapped Yes · ships today" size={30} />
        </Layer>
      </Camera>
    </div>
  );
}

/* =============================================================== 05-S3 */
/** Riya leaves when size M is sold out; the journey brings her back when it's in. */
export function S3({ t }: { t: number }) {
  const bd = backdropState(t, 5.2);
  const off = phoneOffset(t, 5.35);
  // cursor over the product page (browser-local coords)
  const curA = prog(t, 0.6, 1.5, E.move);
  const curB = prog(t, 1.6, 2.35, E.move);
  const curC = prog(t, 2.8, 3.7, E.exit);
  let [bx, by] = pathPoint([[1100, 760], [700, 600], [380, 420]], curA);
  if (t > 1.6) [bx, by] = pathPoint([[380, 420], [700, 520], [838, 500]], curB);
  if (t > 2.8) [bx, by] = pathPoint([[838, 500], [900, 300], [980, -120]], curC);
  const click = prog(t, 2.35, 2.42) * (1 - prog(t, 2.5, 2.6));
  const shake = t > 2.4 && t < 2.85 ? Math.sin((t - 2.4) * 60) * 5 * (1 - prog(t, 2.4, 2.85)) : 0;
  const back = spring(t, 1.0, 0.6, 0.18);
  const bp = pop(back);
  const left = spring(t, 4.0, 0.6, 0.18);
  const lp = pop(left);
  const chatIn = prog(t, 6.75, 7.2, E.enter);
  const bubble = spring(t, 7.0, 0.6, 0.15);
  const reply = spring(t, 8.9, 0.55, 0.15);
  const scroll = lerp(0, 130, prog(t, 8.8, 9.3, E.move));
  const order = spring(t, 9.85, 0.65, 0.16);
  const op = pop(order);
  const tapAt = 6.55;
  const [tx, ty] = phonePoint(195, 290, off);
  const touch = { x: tx, y: ty, o: prog(t, 6.15, 6.3) * (1 - prog(t, 6.75, 6.9)), press: prog(t, tapAt - 0.08, tapAt) * (1 - prog(t, tapAt + 0.12, tapAt + 0.22)), ripple: prog(t, tapAt, tapAt + 0.5) };
  const bw = 1200, bh = 820;
  return (
    <div style={{ width: SW, height: SH, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="dusk" pattern="rings" w={SW} h={SH} />
      <Camera z={keys(t, [[0, 1], [4.6, 1.03], [6, 1], [15.5, 1]], E.camera)}>
        <Layer x={960} y={600} s={bd.s} o={bd.o} blur={bd.blur}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: bw, height: bh, borderRadius: 26, overflow: 'hidden', background: '#fff', boxShadow: `${SHADOW_LIFT}, inset 0 0 0 1.5px ${C.line}`, position: 'relative' }}>
              <div style={{ height: 74, background: '#F6F6F8', borderBottom: `1.5px solid ${C.line}`, display: 'flex', alignItems: 'center', padding: '0 26px', gap: 12 }}>
                {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} style={{ width: 16, height: 16, borderRadius: 99, background: c }} />)}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: '50%', height: 42, borderRadius: 12, background: '#EBEBEF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 21, color: C.ink2 }}>miraethnic.in/linen-shirt</div>
                </div>
                <span style={{ width: 72 }} />
              </div>
              <div style={{ position: 'absolute', left: 0, top: 74, width: '52%', bottom: 0, transform: `scale(${1 + 0.03 * prog(t, 0.9, 1.6) * (1 - prog(t, 1.7, 2.3))})` }}>
                <ShirtShot />
              </div>
              <div style={{ position: 'absolute', left: '56%', right: 50, top: 150 }}>
                <div style={{ fontSize: 20, letterSpacing: '0.16em', color: C.faint, fontWeight: 600 }}>MIRA ETHNIC</div>
                <div style={{ fontFamily: DISPLAY, fontSize: 58, fontWeight: 600, letterSpacing: '-0.025em', marginTop: 10 }}>Linen shirt</div>
                <div style={{ fontSize: 38, fontWeight: 600, marginTop: 8 }}>₹1,899</div>
                <div style={{ fontSize: 22, color: C.muted, marginTop: 30, fontWeight: 600 }}>SIZE</div>
                <div style={{ display: 'flex', gap: 14, marginTop: 12 }}>
                  {['S', 'M', 'L', 'XL'].map((s) => (
                    <span key={s} style={{ width: 82, height: 62, borderRadius: 16, display: 'grid', placeItems: 'center', fontSize: 26, fontWeight: 600, position: 'relative', overflow: 'hidden', color: s === 'M' ? C.faint : C.ink, boxShadow: s === 'M' ? `0 0 0 ${1.5 + click}px ${click > 0 ? C.rose : C.line}` : `0 0 0 1.5px ${C.line}`, background: s === 'M' ? 'repeating-linear-gradient(135deg, #F3F3F6 0 6px, #fff 6px 12px)' : '#fff', transform: s === 'M' ? `translateX(${shake}px)` : undefined }}>
                      {s}
                      {s === 'M' ? <span style={{ position: 'absolute', left: 8, right: 8, top: '50%', height: 2, background: C.faint, transform: 'rotate(-28deg)' }} /> : null}
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: 23, color: C.rose, marginTop: 18, fontWeight: 500, opacity: lerp(0.75, 1, prog(t, 2.4, 2.6)) }}>Size M is sold out</div>
                <div style={{ marginTop: 26 }}><Pill kind="secondary" size={25}>Notify me</Pill></div>
              </div>
              <Cursor x={bx} y={by} press={click} o={prog(t, 0.6, 0.85) * (1 - prog(t, 3.4, 3.7))} s={1.7} />
            </div>
            <div style={{ position: 'absolute', right: -30, top: -40, transform: `scale(${bp.s})`, transformOrigin: '100% 0', opacity: bp.o }}>
              <Toast icon={ViewIcon} title="Riya Sharma is back" sub="3rd view this week · intent high" size={30} tone={C.violet} />
            </div>
            <div style={{ position: 'absolute', left: -30, bottom: -44, transform: `scale(${lp.s})`, transformOrigin: '0 100%', opacity: lp.o }}>
              <Toast icon={Logout03Icon} title="Left without buying" sub="Journey started · notify when M is back" size={30} dark />
            </div>
          </div>
        </Layer>
      </Camera>
      <PhoneRig offset={off} time="6:40">
        <LockScreen t={t} time="6:40" date="Friday, 20 November" bannerAt={5.95} bannerTitle="Mira Ethnic" bannerBody="Your size M is back in stock" wall={['#BFD3FF', '#F5C9E6']} />
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${screenY(chatIn)}px)`, opacity: chatIn > 0 ? 1 : 0 }}>
          <WaScreen>
            <WaHeader name="Mira Ethnic" letter="M" color="#BE185D" />
            <div style={{ position: 'absolute', top: 124 - scroll, left: 0, right: 0 }}><DateChip /></div>
            <div style={{ position: 'absolute', top: 160 - scroll, left: 12, opacity: clamp(bubble * 2), transform: `translateY(${lerp(30, 0, bubble)}px) scale(${lerp(0.96, 1, bubble)})`, transformOrigin: '0 0' }}>
              <TemplateBubble media={<ShirtShot />} title="Your size is back" body="Still thinking about the Linen shirt? Size M is back in stock." time="6:40 pm" cta="View shirt" />
            </div>
            {reply > 0 ? (
              <div style={{ position: 'absolute', top: 480 - scroll, right: 12, left: 12, opacity: clamp(reply * 2), transform: `translateY(${lerp(24, 0, reply)}px)` }}>
                <Bubble out time="6:42 pm" read={t > 9.4}>{typed('Ordering it now!', t, 8.9, 40)}</Bubble>
              </div>
            ) : null}
          </WaScreen>
        </div>
      </PhoneRig>
      <Touch {...touch} />
      <Layer x={960} y={1108} s={op.s} o={op.o} z={40}>
        <Toast icon={ShoppingCart01Icon} title="Order #2219 · ₹1,899" sub="Recovered by Return & retarget" size={34} />
      </Layer>
    </div>
  );
}

export const journeys = {
  '05-T1': { w: T, h: T, duration: 7.5, Component: T1 },
  '05-T2': { w: T, h: T, duration: 7.5, Component: T2 },
  '05-T3': { w: T, h: T, duration: 7.5, Component: T3 },
  '05-S1': { w: SW, h: SH, duration: 15, Component: S1 },
  '05-S2': { w: SW, h: SH, duration: 12.5, Component: S2 },
  '05-S3': { w: SW, h: SH, duration: 15, Component: S3 },
};
