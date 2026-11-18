/**
 * Chapter 06 — Website pixel (docs/video/feature-library/ch06_website_pixel.md).
 * 06-H doubles as the home "Website Tracking Pixel" film.
 */
import type { CSSProperties, ReactNode } from 'react';
import {
  CheckmarkCircle02Icon, CodeIcon, CreditCardIcon, CursorPointer01Icon, FingerPrintIcon, FlashIcon, Logout03Icon,
  PackageIcon, PulseRectangle01Icon, Route01Icon, SentIcon, ShoppingCart01Icon, UserGroupIcon, ViewIcon,
} from '@hugeicons/core-free-icons';
import { E, clamp, keys, lerp, prog, spring, useSize } from '../lib/time';
import {
  Backdrop, C, Camera, Card, CardHeader, CheckCircle, Chip, Cursor, DISPLAY, DateChip, FONT, Icon, Layer, Pill, SHADOW_LIFT,
  TemplateBubble, Toast, Touch, WaHeader, WaScreen, pop,
} from '../lib/ui';
import { Avatar, EventRow, Meter, Spark, Toggle, countUp, inr, rowIn } from '../lib/kit2';
import { SerumShot } from '../lib/products';
import { LockScreen, PhoneRig, SuccessPage, backdropState, cursorAt, phoneOffset, phoneTouch, screenY } from '../lib/rig';

const T = 1080;
const W = 1920;
const ic = (icon: typeof ViewIcon, color: string = C.ink2, size = 30) => <Icon icon={icon} size={size} color={color} />;

/* ================================================================= 06-H */
export function H({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const bd = backdropState(t, 5.0);
  const browserGone = prog(t, 9.8, 10.3);
  const off = phoneOffset(t, 5.15, 10.15);
  const cur = cursorAt(t, [[0.3, 900, 900], [1.2, 560, 430], [2.0, 1110, 600], [2.9, 1110, 600], [3.9, 1300, -80]], [2.3]);
  const added = prog(t, 2.35, 2.5);
  const zoom = 1 + 0.03 * prog(t, 0.6, 1.2) * (1 - prog(t, 1.6, 2.2));
  const s1 = spring(t, 0.8, 0.55, 0.16) * (1 - prog(t, 2.3, 2.55));
  const s2 = spring(t, 2.6, 0.55, 0.16) * (1 - prog(t, 4.6, 4.9));
  const s3 = spring(t, 4.0, 0.55, 0.16);
  const chatIn = prog(t, 6.3, 6.75, E.enter);
  const bubble = spring(t, 6.5, 0.6, 0.15);
  const success = prog(t, 8.1, 8.45, E.enter);
  const ctaPress = prog(t, 7.85, 7.95) * (1 - prog(t, 8.05, 8.15));
  const touch = phoneTouch(t, [[5.6, 6.35, 195, 278], [7.3, 8.25, 195, 450]], off);
  const prof = spring(t, 10.35, 0.75, 0.12);
  const events: [typeof ViewIcon, string, string, string, string, number][] = [
    [ViewIcon, C.ink2, 'Product view', 'Hydrating gel serum', '12:20', 10.5],
    [ShoppingCart01Icon, C.sky, 'Add to cart', '₹729 · 1 item', '12:21', 10.7],
    [Logout03Icon, '#D97706', 'Left the store', 'No checkout', '12:21', 10.9],
    [SentIcon, C.violet, 'Cart recovery sent', 'WhatsApp · +91 90000 12349', '12:31', 11.1],
    [PackageIcon, C.emerald, 'Order placed', '₹729 · Recovered from WhatsApp', '12:34', 11.3],
  ];
  const bw = 1240, bh = 720;
  const sat = (k: number, node: ReactNode, style: CSSProperties, origin: string) => {
    const p = pop(k);
    return <div style={{ position: 'absolute', transform: `scale(${p.s})`, transformOrigin: origin, opacity: p.o, ...style }}>{node}</div>;
  };
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="mint" pattern="dots" w={W} h={h} />
      <Camera z={keys(t, [[0, 1], [4.6, 1.03], [6, 1], [15.5, 1]], E.camera)}>
        <Layer x={960} y={CY} s={bd.s} o={bd.o * (1 - browserGone)} blur={bd.blur}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: bw, height: bh, borderRadius: 26, overflow: 'hidden', background: '#fff', boxShadow: `${SHADOW_LIFT}, inset 0 0 0 1.5px ${C.line}`, position: 'relative' }}>
              <div style={{ height: 70, background: '#F6F6F8', borderBottom: `1.5px solid ${C.line}`, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 11 }}>
                {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} style={{ width: 15, height: 15, borderRadius: 99, background: c }} />)}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}><div style={{ width: '48%', height: 40, borderRadius: 12, background: '#EBEBEF', display: 'grid', placeItems: 'center', fontSize: 20, color: C.ink2 }}>glowco.in/hydrating-gel</div></div>
                <span style={{ width: 70 }} />
              </div>
              <div style={{ position: 'absolute', left: 0, top: 70, width: '52%', bottom: 0, overflow: 'hidden' }}><div style={{ width: '100%', height: '100%', transform: `scale(${zoom})` }}><SerumShot /></div></div>
              <div style={{ position: 'absolute', left: '57%', right: 50, top: 170 }}>
                <div style={{ fontSize: 20, letterSpacing: '0.16em', color: C.faint, fontWeight: 600 }}>GLOW CO</div>
                <div style={{ fontFamily: DISPLAY, fontSize: 52, fontWeight: 600, letterSpacing: '-0.025em', marginTop: 10, lineHeight: 1.08 }}>Hydrating gel serum</div>
                <div style={{ fontSize: 25, color: C.muted, marginTop: 10 }}>30 ml · Niacinamide + HA</div>
                <div style={{ fontSize: 40, fontWeight: 600, marginTop: 14 }}>₹729</div>
                <div style={{ marginTop: 30, position: 'relative', height: 70 }}>
                  <div style={{ position: 'absolute', inset: 0, opacity: 1 - added }}><Pill kind="dark" size={26} full press={cur.press}>Add to cart</Pill></div>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: added }}><Chip tone="emerald" icon={CheckmarkCircle02Icon} size={26}>Added to cart</Chip></div>
                </div>
              </div>
              <Cursor x={cur.x - (960 - bw / 2)} y={cur.y - (CY - bh / 2)} press={cur.press} o={prog(t, 0.3, 0.55) * (1 - prog(t, 3.5, 3.9))} s={1.8} />
            </div>
            {sat(s1, <Toast icon={ViewIcon} title="Product view" sub="Pixel · Aarav Shah" size={29} tone={C.violet} />, { right: -40, top: -50 }, '100% 0')}
            {sat(s2, <Toast icon={ShoppingCart01Icon} title="Add to cart · ₹729" sub="Pixel · intent high" size={29} tone={C.sky} />, { right: -40, top: -50 }, '100% 0')}
            {sat(s3, <Toast icon={Logout03Icon} title="Left without checkout" sub="Cart recovery starts" size={29} dark />, { left: -30, bottom: -52 }, '0 100%')}
          </div>
        </Layer>
        <Layer x={960} y={CY} s={lerp(0.92, 1.08, prof)} o={clamp(prof * 1.6)}>
          <Card w={1060} pad={38}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, paddingBottom: 20, marginBottom: 14, borderBottom: `1.5px solid ${C.line}` }}>
              <span style={{ width: 66, height: 66, borderRadius: 99, background: C.violetSoft, display: 'grid', placeItems: 'center' }}><Icon icon={FingerPrintIcon} size={36} color={C.violet} /></span>
              <div style={{ flex: 1, fontSize: 36, fontWeight: 600 }}>Aarav Shah</div>
              <Chip tone="emerald" dot size={24} pulse={(t * 0.8) % 1}>Pixel live</Chip>
            </div>
            {events.map(([icon, col, a, b, tm, at], i) => (
              <EventRow key={a} icon={ic(icon, col)} title={a} sub={b} time={tm} size={0.98} wash={i === 4 ? prog(t, at, at + 0.4) * 0.9 : 0} style={rowIn(t, at, 0.45)} />
            ))}
          </Card>
        </Layer>
      </Camera>
      <PhoneRig offset={off} time="12:31">
        <LockScreen t={t} time="12:31" date="Wednesday, 18 November" bannerAt={5.75} bannerTitle="Glow Co" bannerBody="Aarav, your hydrating gel is still in your cart" wall={['#FFD3C4', '#C9B8FF']} />
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${screenY(chatIn)}px)`, opacity: chatIn > 0 ? 1 : 0 }}>
          <WaScreen>
            <WaHeader name="Glow Co" letter="G" color="#C8603F" />
            <div style={{ position: 'absolute', top: 124, left: 0, right: 0 }}><DateChip /></div>
            <div style={{ position: 'absolute', top: 160, left: 12, opacity: clamp(bubble * 2), transform: `translateY(${lerp(30, 0, bubble)}px) scale(${lerp(0.96, 1, bubble)})`, transformOrigin: '0 0' }}>
              <TemplateBubble media={<SerumShot />} title="Still thinking it over?" body="Hi Aarav, your hydrating gel is still in your cart. Free shipping if you check out today." time="12:31" cta="Complete checkout" ctaPress={ctaPress} />
            </div>
          </WaScreen>
        </div>
        <div style={{ position: 'absolute', inset: 0, opacity: success, zIndex: 12 }}>
          {success > 0 ? <SuccessPage t={t} at={8.25} title="Order placed" order="Hydrating gel serum · ₹729" chip="Updates on WhatsApp" /> : null}
        </div>
      </PhoneRig>
      {touch ? <Touch {...touch} /> : null}
    </div>
  );
}

/* ================================================================= 06-T1 */
export function T1({ t }: { t: number }) {
  const cur = cursorAt(t, [[0.3, 900, 960], [1.0, 815, 470], [1.6, 815, 470], [2.6, 1000, 1100]], [1.1]);
  const on = prog(t, 1.15, 1.45, E.move);
  const chip = spring(t, 2.0, 0.55, 0.18);
  const cp = pop(chip);
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="dusk" pattern="mesh" w={T} h={T} />
      <Layer x={540} y={500}>
        <Card w={880}>
          <CardHeader icon={CodeIcon} title="App embeds" size={34} right={<span style={{ fontSize: 24, fontWeight: 600, color: '#008060' }}>Theme editor</span>} />
          {[['TopEdge AI pixel', 'Tracks views, carts and checkouts', on, 1], ['Product reviews', 'Another app', 0, 0.45]].map(([a, b, k, o], i) => (
            <div key={a as string} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '22px 22px', borderRadius: 20, background: i === 0 ? C.sunk : '#fff', boxShadow: `0 0 0 1.5px ${C.line}`, marginBottom: 14, opacity: o as number }}>
              <Icon icon={i === 0 ? PulseRectangle01Icon : ViewIcon} size={36} color={i === 0 ? C.violet : C.ink2} />
              <div style={{ flex: 1 }}><div style={{ fontSize: 30, fontWeight: 600 }}>{a as string}</div><div style={{ fontSize: 24, color: C.muted, marginTop: 2 }}>{b as string}</div></div>
              <Toggle on={k as number} size={1.15} />
            </div>
          ))}
        </Card>
      </Layer>
      <Layer x={540} y={810} s={cp.s} o={cp.o}><Chip tone="emerald" dot size={28} pulse={(t * 0.8) % 1}>Pixel live · first event in 4s</Chip></Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.3, 0.55) * (1 - prog(t, 2.2, 2.5))} s={1.7} />
    </div>
  );
}

/* ================================================================= 06-T2 */
export function T2({ t }: { t: number }) {
  const rows: [typeof ViewIcon, string, string, string, string, number][] = [
    [CreditCardIcon, C.emerald, 'Checkout started', 'Mumbai · ₹1,458', 'now', 2.4],
    [ShoppingCart01Icon, C.sky, 'Add to cart', 'Delhi · Vitamin C serum', 'now', 1.5],
    [ViewIcon, C.ink2, 'Product view', 'Pune · Hydrating gel', '4s', 0.6],
    [CursorPointer01Icon, C.ink2, 'Collection click', 'Jaipur · Sunscreen', '9s', -1],
  ];
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="rose" pattern="dots" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <CardHeader icon={PulseRectangle01Icon} title="Live events" size={34} right={<Chip tone="emerald" dot size={22} pulse={(t * 1.2) % 1}>Streaming</Chip>} />
          <div style={{ position: 'relative', height: 4 * 96 }}>
            {rows.map(([icon, col, a, b, tm, at], i) => {
              const push = rows.slice(0, i).reduce((acc, r) => acc + prog(t, r[5], r[5] + 0.5, E.move), 0);
              return (
                <div key={a} style={{ position: 'absolute', left: 0, right: 0, top: push * 96, ...(at > 0 ? rowIn(t, at) : {}) }}>
                  <EventRow icon={ic(icon, col)} title={a} sub={b} time={tm} />
                </div>
              );
            })}
          </div>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 06-T3 */
export function T3({ t }: { t: number }) {
  const m: [string, number, number, string, number][] = [
    ['Product view', 3120, 1, C.violet, 0.4],
    ['Add to cart', 640, 0.21, C.rose, 0.9],
    ['Checkout', 286, 0.09, C.violet, 1.4],
  ];
  const pill = spring(t, 1.9, 0.55, 0.18);
  const pp = pop(pill);
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="orchid" pattern="beams" w={T} h={T} />
      <Layer x={540} y={520}>
        <Card w={880}>
          <CardHeader icon={Route01Icon} title="Shopper journey" size={34} right={<Chip size={22}>Last 7 days</Chip>} />
          {m.map(([a, n, k, col, at]) => {
            const f = prog(t, at, at + 0.9, E.move);
            return (
              <div key={a} style={{ marginBottom: 26 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                  <span style={{ fontSize: 29, fontWeight: 600 }}>{a}</span>
                  <span style={{ fontSize: 29, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{inr(Math.round(n * f))} <span style={{ color: C.muted, fontWeight: 500, fontSize: 24 }}>{Math.round(k * 100 * f)}%</span></span>
                </div>
                <Meter k={k * f} color={col} h={18} />
              </div>
            );
          })}
        </Card>
      </Layer>
      <Layer x={540} y={860} s={pp.s} o={pp.o}><Chip tone="rose" size={27}>−79% drop after product view</Chip></Layer>
    </div>
  );
}

/* ================================================================= 06-S1 */
export function S1({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const rows: [typeof ViewIcon, string, string, string, string, number][] = [
    [ShoppingCart01Icon, C.sky, '+91 90000 12361', 'Added to cart · Vitamin C serum · ₹849', 'now', 2.6],
    [ViewIcon, C.violet, '+91 90000 12360', 'Viewed hydrating gel 3 times', '1m', 1.5],
    [ViewIcon, C.ink2, 'Anonymous visitor', 'Scrolled 80% · sunscreen page', '2m', -1],
  ];
  const tst = spring(t, 3.6, 0.6, 0.16);
  const tp = pop(tst);
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="ocean" pattern="grid" w={W} h={h} />
      <Layer x={960} y={CY} s={1.15}>
        <div style={{ position: 'relative' }}>
          <Card w={980} pad={38}>
            <CardHeader icon={PulseRectangle01Icon} title="Live intent feed" size={36} right={<Chip tone="emerald" dot size={23} pulse={(t * 1.1) % 1}>Live</Chip>} />
            <div style={{ position: 'relative', height: 3 * 98 }}>
              {rows.map(([icon, col, a, b, tm, at], i) => {
                const push = rows.slice(0, i).reduce((acc, r) => acc + prog(t, r[5], r[5] + 0.5, E.move), 0);
                return (
                  <div key={a} style={{ position: 'absolute', left: 0, right: 0, top: push * 98, ...(at > 0 ? rowIn(t, at) : {}) }}>
                    <EventRow icon={ic(icon, col)} title={a} sub={b} time={tm} wash={i === 0 ? prog(t, 2.6, 3.0) * (1 - prog(t, 6, 7)) : 0} />
                  </div>
                );
              })}
            </div>
          </Card>
          <div style={{ position: 'absolute', right: -30, bottom: -60, transform: `scale(${tp.s})`, transformOrigin: '100% 100%', opacity: tp.o }}>
            <Toast icon={FlashIcon} title="Cart recovery queued" sub="Sends in 20 min while intent is warm" size={29} dark />
          </div>
        </div>
      </Layer>
    </div>
  );
}

/* ================================================================= 06-S2 */
export function S2({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const match = prog(t, 2.6, 3.1);
  const sat = spring(t, 3.4, 0.6, 0.16);
  const sp = pop(sat);
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="dawn" pattern="rings" w={W} h={h} />
      <Layer x={960} y={CY} s={1.15}>
        <div style={{ position: 'relative' }}>
          <Card w={980} pad={38}>
            <div style={{ position: 'relative', height: 110, borderBottom: `1.5px solid ${C.line}`, marginBottom: 18 }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 18, opacity: 1 - match }}>
                <span style={{ width: 70, height: 70, borderRadius: 99, background: '#F0F0F3', display: 'grid', placeItems: 'center' }}><Icon icon={FingerPrintIcon} size={38} color={C.muted} /></span>
                <div style={{ flex: 1 }}><div style={{ fontSize: 34, fontWeight: 600 }}>Visitor 8f2a</div><div style={{ fontSize: 24, color: C.muted }}>Anonymous · no number yet</div></div>
                <Chip size={22}>Unknown</Chip>
              </div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 18, opacity: match, transform: `translateY(${lerp(10, 0, match)}px)` }}>
                <Avatar name="Dev Malhotra" color="#0F766E" size={70} />
                <div style={{ flex: 1 }}><div style={{ fontSize: 34, fontWeight: 600 }}>Dev Malhotra</div><div style={{ fontSize: 24, color: C.muted }}>+91 90000 12350 · opted in</div></div>
                <Chip tone="emerald" icon={CheckmarkCircle02Icon} size={22}>Matched</Chip>
              </div>
            </div>
            <EventRow icon={ic(ViewIcon)} title="Viewed Vitamin C serum" sub="3 times this week" time="Mon" />
            <EventRow icon={ic(ShoppingCart01Icon, C.sky)} title="Added to cart" sub="₹849 · 1 item" time="Tue" />
            <EventRow icon={ic(CreditCardIcon, C.emerald)} title="Checkout started" sub="Entered +91 90000 12350" time="now" wash={prog(t, 1.6, 2.0) * (1 - prog(t, 6, 7))} style={rowIn(t, 1.6)} />
          </Card>
          <div style={{ position: 'absolute', right: -40, top: -64, transform: `scale(${sp.s})`, transformOrigin: '100% 0', opacity: sp.o }}>
            <Toast icon={UserGroupIcon} title="History attached" sub="3 views and 1 cart, on one profile" size={29} />
          </div>
        </div>
      </Layer>
    </div>
  );
}

/* ================================================================= 06-S3 */
export function S3({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const checks = ['Theme embed on', 'Cart events', 'Checkout events', 'Numbers matched'];
  const tst = spring(t, 2.8, 0.6, 0.16);
  const tp = pop(tst);
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="sunrise" pattern="lines" w={W} h={h} />
      <Layer x={960} y={CY} s={1.0}>
        <div style={{ position: 'relative' }}>
          <Card w={1180} pad={42}>
            <CardHeader icon={PulseRectangle01Icon} title="Pixel health" size={36} right={<Chip tone="emerald" dot size={24}>Healthy</Chip>} />
            <div style={{ display: 'flex', gap: 34 }}>
              <div style={{ flex: 1.1 }}>
                <div style={{ fontSize: 27, color: C.muted }}>Events today</div>
                <div style={{ fontFamily: DISPLAY, fontSize: 80, fontWeight: 600, letterSpacing: '-0.035em', fontVariantNumeric: 'tabular-nums' }}>{inr(Math.round(countUp(t, 0.4, 1284, 1.4)))}</div>
                <Chip size={21}>Last event 2 min ago</Chip>
                <div style={{ marginTop: 20 }}><Spark pts={[8, 14, 11, 19, 24, 21, 30, 36, 33, 44, 52, 61]} w={520} h={140} k={prog(t, 0.4, 2.0, E.move)} color={C.emerald} /></div>
              </div>
              <div style={{ flex: 0.9, background: C.sunk, borderRadius: 24, padding: '18px 26px' }}>
                {checks.map((c, i) => (
                  <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderTop: i ? `1.5px solid ${C.line}` : undefined, ...rowIn(t, 0.6 + i * 0.4) }}>
                    <CheckCircle size={38} p={prog(t, 0.75 + i * 0.4, 1.3 + i * 0.4)} />
                    <span style={{ fontSize: 29 }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <div style={{ position: 'absolute', right: 30, bottom: -64, transform: `scale(${tp.s})`, transformOrigin: '100% 100%', opacity: tp.o }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
              <Toast icon={UserGroupIcon} title="Viewed 3×, no buy" sub="412 shoppers · ready to message" size={29} />
            </div>
          </div>
        </div>
      </Layer>
    </div>
  );
}

export const pixel = {
  '06-H': { w: W, h: 1080, duration: 15, Component: H },
  'home-pixel': { w: W, h: 1080, duration: 15, Component: H },
  '06-T1': { w: T, h: T, duration: 7.5, Component: T1 },
  '06-T2': { w: T, h: T, duration: 7.5, Component: T2 },
  '06-T3': { w: T, h: T, duration: 7.5, Component: T3 },
  '06-S1': { w: W, h: 1200, duration: 12.5, Component: S1 },
  '06-S2': { w: W, h: 1200, duration: 12.5, Component: S2 },
  '06-S3': { w: W, h: 1200, duration: 12.5, Component: S3 },
};
