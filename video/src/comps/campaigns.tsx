/**
 * Chapter 03 — Campaigns (docs/video/feature-library/ch03_campaigns.md).
 * 03-H is also the home page "Broadcast Campaigns" film (home-campaigns).
 */
import {
  ArrowDataTransferHorizontalIcon, CheckmarkCircle02Icon, ChartIncreaseIcon, LockIcon, Megaphone01Icon,
  Note01Icon, SentIcon, ShoppingBag02Icon, ShoppingCart01Icon, UserGroupIcon, ViewIcon,
} from '@hugeicons/core-free-icons';
import { E, clamp, keys, lerp, prog, spring, useSize } from '../lib/time';
import {
  Backdrop, C, Camera, Card, CardHeader, Chip, Cursor, DateChip, FONT, DISPLAY, Icon, Layer, Pill, SHADOW_LIFT,
  TemplateBubble, Toast, Touch, WaHeader, WaScreen, pop,
} from '../lib/ui';
import { Avatar, Fireworks, KV, KurtaShot, Meter, NightBackdrop, ShopPage, Spark, countUp, inr, rowIn } from '../lib/kit2';
import { LockScreen, PhoneRig, SuccessPage, backdropState, cursorAt, phoneOffset, phoneTouch, screenY } from '../lib/rig';

const T = 1080;
const W = 1920;

/* ================================================================= 03-H */
/** The Diwali broadcast: send → Riya buys on WhatsApp → what it earned. */
export function H({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const bd = backdropState(t, 3.2, 10.6);
  const off = phoneOffset(t, 3.35, 10.55);
  const sendPress = cursorAt(t, [[0.3, 1320, 980], [1.45, 960, CY + 205]], [1.6]);
  const sent = prog(t, 1.8, 2.0);
  const fill = prog(t, 1.95, 3.1, E.move);
  const results = t > 9;
  const rev = countUp(t, 10.9, 184200, 1.4);
  const toast = spring(t, 11.6, 0.65, 0.16);
  const tp = pop(toast);
  const chatIn = prog(t, 4.75, 5.2, E.enter);
  const bubble = spring(t, 4.95, 0.6, 0.15);
  const shop = prog(t, 6.85, 7.35, E.enter);
  const buy = prog(t, 8.55, 8.65) * (1 - prog(t, 8.75, 8.85));
  const done = prog(t, 8.9, 9.25, E.enter);
  const touch = phoneTouch(t, [[4.15, 4.85, 195, 278], [6.0, 6.95, 195, 470], [8.05, 8.95, 195, 446]], off);
  const ctaPress = prog(t, 6.45, 6.55) * (1 - prog(t, 6.65, 6.75));
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <NightBackdrop t={t} w={W} h={h} />
      <Fireworks t={t} w={W} h={h} scale={1.3} />
      <Camera z={keys(t, [[0, 1], [3.0, 1.03], [10.8, 1], [15.5, 1.02]], E.camera)}>
        <Layer x={960} y={CY} s={bd.s * 1.1} o={bd.o} blur={bd.blur}>
          <div style={{ position: 'relative' }}>
            <Card w={1000} pad={40} style={{ boxShadow: '0 0 0 1.5px rgba(255,255,255,0.14), 0 40px 90px -30px rgba(0,0,0,0.6)' }}>
              <CardHeader icon={Megaphone01Icon} title="Diwali sale" size={38} right={
                results ? <Chip tone="emerald" dot size={25}>Sent</Chip>
                  : sent > 0.5 ? <Chip tone="violet" dot size={25} pulse={(t * 1.5) % 1}>Sending</Chip>
                  : <Chip tone="amber" dot size={25}>Ready</Chip>
              } />
              <div style={{ position: 'relative', height: 330 }}>
                {!results ? (
                  <div style={{ position: 'absolute', inset: 0 }}>
                    {[[Note01Icon, 'diwali_offer', 'Marketing template · Approved', <Chip key="m" tone="emerald" icon={CheckmarkCircle02Icon} size={22}>Meta</Chip>], [UserGroupIcon, 'Repeat buyers', '2,418 shoppers · score 60+', null]].map(([icon, a, b, r], i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '20px 22px', borderRadius: 22, boxShadow: `0 0 0 1.5px ${C.line}`, marginBottom: 16 }}>
                        <Icon icon={icon as typeof Note01Icon} size={40} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 33, fontWeight: 600, fontFamily: i === 0 ? "'Geist Mono','SF Mono',ui-monospace,monospace" : FONT, letterSpacing: '-0.015em' }}>{a as string}</div>
                          <div style={{ fontSize: 26, color: C.muted, marginTop: 3 }}>{b as string}</div>
                        </div>
                        {r as never}
                      </div>
                    ))}
                    <div style={{ position: 'relative', height: 76, marginTop: 6 }}>
                      <div style={{ position: 'absolute', inset: 0, opacity: 1 - sent }}><Pill kind="primary" size={30} icon={SentIcon} full press={sendPress.press}>Send to 2,418</Pill></div>
                      <div style={{ position: 'absolute', inset: '6px 0 0', opacity: sent }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 27, marginBottom: 12 }}>
                          <span style={{ color: C.ink2 }}>Delivered</span>
                          <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{inr(Math.round(2418 * fill))} / 2,418</span>
                        </div>
                        <Meter k={fill} h={16} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <div style={{ background: C.sunk, borderRadius: 24, padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: 26, color: C.muted }}>Revenue from this campaign</div>
                        <div style={{ fontFamily: DISPLAY, fontSize: 70, fontWeight: 600, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>₹{inr(Math.round(rev))}</div>
                      </div>
                      <Chip tone="emerald" size={24}>After Meta fees</Chip>
                    </div>
                    <div style={{ marginTop: 10, padding: '0 6px' }}>
                      <KV k="Delivered" v="2,418" size={29} />
                      <KV k="Read" v={inr(Math.round(countUp(t, 11.1, 2071, 1.1)))} size={29} line />
                      <KV k="Orders" v={inr(Math.round(countUp(t, 11.3, 212, 1.0)))} size={29} line bold />
                    </div>
                  </div>
                )}
              </div>
            </Card>
            <div style={{ position: 'absolute', right: 60, top: -96, transform: `scale(${tp.s})`, transformOrigin: '100% 0', opacity: tp.o }}>
              <Toast icon={ShoppingBag02Icon} title="New order · ₹2,499" sub="Riya S. · from Diwali sale" size={31} />
            </div>
          </div>
        </Layer>
        <Cursor x={sendPress.x} y={sendPress.y} press={sendPress.press} o={prog(t, 0.3, 0.55) * (1 - prog(t, 2.2, 2.6))} s={1.8} />
      </Camera>
      <PhoneRig offset={off} time="7:30">
        <LockScreen t={t} time="7:30" date="Sunday, 1 November" bannerAt={3.95} bannerTitle="Mira Ethnic" bannerBody="Riya, the Diwali edit is here. 20% off till Sunday" wall={['#3B1F6E', '#B4436C']} />
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${screenY(chatIn)}px)`, opacity: chatIn > 0 ? 1 : 0 }}>
          <WaScreen>
            <WaHeader name="Mira Ethnic" letter="M" color="#BE185D" />
            <div style={{ position: 'absolute', top: 124, left: 0, right: 0 }}><DateChip /></div>
            <div style={{ position: 'absolute', top: 160, left: 12, opacity: clamp(bubble * 2), transform: `translateY(${lerp(30, 0, bubble)}px) scale(${lerp(0.96, 1, bubble)})`, transformOrigin: '0 0' }}>
              <TemplateBubble media={<KurtaShot />} title="The Diwali edit is here" body="Riya, 20% off festive wear till Sunday. Free shipping on prepaid orders." time="7:30 pm" cta="Shop the edit" ctaPress={ctaPress} />
            </div>
          </WaScreen>
        </div>
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${screenY(shop)}px)`, opacity: shop > 0 ? 1 : 0, zIndex: 12 }}>
          <ShopPage host="miraethnic.in" media={<KurtaShot tag="−20%" />} title="Rani pink silk kurta" price="₹2,499" was="₹3,124" code="DIWALI20" strip="Diwali offer applied · free shipping" cta="Buy now" press={buy} />
          <div style={{ position: 'absolute', inset: 0, opacity: done, zIndex: 3 }}>
            {done > 0 ? (
              <SuccessPage t={t} at={9.0} title="Order placed" order="Happy Diwali, Riya! Order #2211" chip="Tracking updates on WhatsApp" extra={
                <div style={{ margin: '14px 24px 0', display: 'flex', alignItems: 'center', gap: 12, padding: 10, borderRadius: 14, boxShadow: `0 0 0 1px ${C.line}`, textAlign: 'left' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, overflow: 'hidden' }}><KurtaShot /></div>
                  <div style={{ flex: 1, fontSize: 13 }}><b style={{ fontSize: 14 }}>Rani pink silk kurta</b><div style={{ color: C.muted }}>Size M · Prepaid · Free shipping</div></div>
                  <b style={{ fontSize: 15 }}>₹2,499</b>
                </div>
              } />
            ) : null}
          </div>
        </div>
      </PhoneRig>
      {touch ? <Touch {...touch} /> : null}
    </div>
  );
}

/* ================================================================= 03-T1 */
export function T1({ t }: { t: number }) {
  const n = countUp(t, 2.7, 2418, 1.3);
  const live = spring(t, 3.6, 0.5, 0.2);
  const row = (icon: typeof ViewIcon, a: string, b: string, at: number) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 22px', borderRadius: 20, boxShadow: `0 0 0 1.5px ${C.line}`, ...rowIn(t, at) }}>
      <Icon icon={icon} size={36} color={C.violet} />
      <div><div style={{ fontSize: 30, fontWeight: 600 }}>{a}</div><div style={{ fontSize: 24, color: C.muted, marginTop: 3 }}>{b}</div></div>
    </div>
  );
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="lagoon" pattern="grid" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={860}>
          <CardHeader icon={UserGroupIcon} title="New segment" size={34} />
          <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: '0.12em', color: C.muted, marginBottom: 14 }}>SHOPPERS WHO</div>
          {row(ArrowDataTransferHorizontalIcon, 'Ordered 2 or more times', 'Shopify orders', 0.7)}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '12px 0', opacity: prog(t, 1.4, 1.8) }}>
            <span style={{ flex: 1, height: 1.5, background: C.line }} /><Chip size={20}>AND</Chip><span style={{ flex: 1, height: 1.5, background: C.line }} />
          </div>
          {row(ViewIcon, 'Viewed 3+ products', 'Last 30 days · website pixel', 1.8)}
          <div style={{ marginTop: 22, background: C.sunk, borderRadius: 22, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...rowIn(t, 2.5) }}>
            <div>
              <div style={{ fontSize: 25, color: C.muted }}>Repeat buyers</div>
              <div style={{ fontFamily: DISPLAY, fontSize: 60, fontWeight: 600, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{inr(Math.round(n))}</div>
            </div>
            <span style={{ opacity: clamp(live * 2), transform: `scale(${lerp(0.85, 1, live)})` }}><Chip tone="emerald" dot size={24} pulse={(t * 0.8) % 1}>Live</Chip></span>
          </div>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 03-T2 */
export function T2({ t }: { t: number }) {
  const people: [string, string, string, number, string][] = [
    ['Ishaan Gupta', '#7C3AED', 'Cart ₹3,450 · 2h ago', 86, C.emerald],
    ['Sneha Kulkarni', '#DB2777', 'Viewed 6 items', 81, C.violet],
    ['Varun Joshi', '#0284C7', '2 past orders', 64, '#D97706'],
  ];
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="coral" pattern="rings" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <CardHeader icon={ChartIncreaseIcon} title="Top intent" size={34} right={<Chip size={21}>Sorted by score</Chip>} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {people.map(([name, col, sig, score, bar], i) => {
              const at = 0.6 + i * 0.5;
              const k = prog(t, at + 0.2, at + 1.2, E.move);
              return (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '18px 20px', borderRadius: 20, background: i === 0 ? C.sunk : '#fff', boxShadow: `0 0 0 1.5px ${C.line}`, ...rowIn(t, at) }}>
                  <Avatar name={name} color={col} size={62} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 30, fontWeight: 600 }}>{name}</div>
                    <div style={{ fontSize: 24, color: C.muted, marginTop: 2 }}>{sig}</div>
                    <div style={{ marginTop: 10 }}><Meter k={k * score / 100} color={bar} h={10} /></div>
                  </div>
                  <div style={{ fontFamily: DISPLAY, fontSize: 44, fontWeight: 600, width: 80, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{Math.round(score * k)}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 03-T3 */
export function T3({ t }: { t: number }) {
  const wash = prog(t, 3.0, 3.4) * (1 - prog(t, 4.6, 5.4));
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="bloom" pattern="lines" w={T} h={T} />
      <div style={{ position: 'absolute', inset: 0, height: 420 }}><Fireworks t={t} w={T} h={420} starts={[0, 1.1, 2.0]} period={3.4} scale={0.8} light /></div>
      <Layer x={540} y={560}>
        <Card w={860}>
          <CardHeader icon={Megaphone01Icon} title="Diwali sale" size={34} right={<Chip tone="emerald" dot size={22}>Sent</Chip>} />
          <KV k="Revenue" v={`₹${inr(Math.round(countUp(t, 0.6, 186287, 1.4)))}`} size={34} />
          <KV k="Meta fees" v={`− ₹${inr(Math.round(countUp(t, 1.0, 2087, 1.2)))}`} size={34} color={C.rose} line />
          <div style={{ margin: '8px -16px 0', padding: '4px 16px', borderRadius: 18, background: `rgba(5,150,105,${0.08 * wash})` }}>
            <KV k="Net revenue" v={`₹${inr(Math.round(countUp(t, 1.6, 184200, 1.4)))}`} size={40} bold line />
          </div>
          <div style={{ marginTop: 14, fontSize: 23, color: C.muted, opacity: prog(t, 3.0, 3.5) }}>Meta's fee is billed to you directly. TopEdge adds 0% on top.</div>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 03-S1 */
export function S1({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const rows: [typeof ViewIcon, string, string, string][] = [
    [ViewIcon, 'Browsed, no order', '5,906 shoppers', '40+'],
    [ArrowDataTransferHorizontalIcon, 'Repeat buyers', '2,418 shoppers', '60+'],
    [ShoppingCart01Icon, 'Cart abandoners', '1,240 shoppers', '70+'],
  ];
  const cur = cursorAt(t, [[0.3, 1500, h - 120], [1.35, 1180, CY + 112], [2.4, 1180, CY + 112], [2.95, 1352, CY - 182], [4.2, 1352, CY - 182], [5.2, 1650, h + 60]], [1.45, 3.0]);
  const sel = prog(t, 1.45, 1.7);
  const delivery = spring(t, 3.4, 0.6, 0.16);
  const dp = pop(delivery);
  const fill = prog(t, 3.6, 4.9, E.move);
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="dusk" pattern="mesh" w={W} h={h} />
      <Camera z={keys(t, [[0, 1], [1.2, 1.02], [12, 1.02], [13, 1]], E.camera)}>
        <Layer x={960} y={CY - 30} s={1.15}>
          <Card w={980} pad={38}>
            <CardHeader icon={UserGroupIcon} title="Choose audience" size={36} right={<Pill kind="primary" size={24} icon={SentIcon} press={cur.press * prog(t, 2.8, 2.9)}>Send</Pill>} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {rows.map(([icon, a, b, sc], i) => {
                const on = i === 2 ? sel : 0;
                return (
                  <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '20px 22px', borderRadius: 22, background: on ? `rgba(124,58,237,${0.06 * on})` : '#fff', boxShadow: `0 0 0 ${1.5 + on}px ${on ? `rgba(124,58,237,${0.5 * on})` : C.line}` }}>
                    <Icon icon={icon} size={38} color={on ? C.violet : C.ink2} />
                    <div style={{ flex: 1 }}><div style={{ fontSize: 31, fontWeight: 600 }}>{a}</div><div style={{ fontSize: 25, color: C.muted, marginTop: 2 }}>{b} · score {sc}</div></div>
                    {i === 2 ? <span style={{ opacity: on }}><Chip tone="violet" icon={CheckmarkCircle02Icon} size={22}>Selected</Chip></span> : null}
                  </div>
                );
              })}
            </div>
          </Card>
        </Layer>
        <Layer x={960} y={CY + 330} s={dp.s} o={dp.o}>
          <div style={{ width: 760, background: '#fff', borderRadius: 26, padding: '24px 30px', boxShadow: `${SHADOW_LIFT}, inset 0 0 0 1.5px ${C.line}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 29, marginBottom: 14 }}>
              <span style={{ fontWeight: 600 }}>Delivered</span>
              <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{inr(Math.round(1240 * fill))} / 1,240</span>
            </div>
            <Meter k={fill} h={16} />
          </div>
        </Layer>
        <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.3, 0.55) * (1 - prog(t, 4.9, 5.2))} s={1.8} />
      </Camera>
    </div>
  );
}

/* ================================================================= 03-S2 */
export function S2({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const cur = cursorAt(t, [[0.4, 1560, h - 100], [1.8, 1330, CY + 150], [3.4, 1330, CY + 150], [4.4, 1700, h + 60]], [1.9]);
  const shake = t > 2.05 && t < 2.6 ? Math.sin((t - 2.05) * 55) * 7 * (1 - prog(t, 2.05, 2.6)) : 0;
  const tst = spring(t, 2.35, 0.6, 0.16);
  const tp = pop(tst);
  const rows: [string, string, string, boolean][] = [
    ['diwali_offer', 'Marketing', '₹0.8631 per message', true],
    ['order_update', 'Utility', '₹0.115 per message', true],
    ['flash_sale_draft', 'Marketing', 'Not reviewed by Meta', false],
  ];
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="bloom" pattern="dots" w={W} h={h} />
      <Layer x={960} y={CY - 10} s={1.15}>
        <div style={{ position: 'relative' }}>
          <Card w={980} pad={38}>
            <CardHeader icon={Megaphone01Icon} title="Templates" size={36} right={<Chip size={22}>Synced with Meta</Chip>} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {rows.map(([name, cat, fee, ok], i) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '20px 22px', borderRadius: 22, background: ok ? '#fff' : C.sunk, boxShadow: `0 0 0 1.5px ${C.line}`, transform: i === 2 ? `translateX(${shake}px)` : undefined }}>
                  <Icon icon={Note01Icon} size={38} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 30, fontWeight: 600, fontFamily: "'Geist Mono','SF Mono',ui-monospace,monospace", letterSpacing: '-0.02em' }}>{name}</div>
                    <div style={{ fontSize: 25, color: C.muted, marginTop: 2 }}>{cat} · {fee}</div>
                  </div>
                  {ok ? <Chip tone="emerald" icon={CheckmarkCircle02Icon} size={22}>Approved</Chip> : <Pill kind="secondary" size={23} icon={SentIcon} press={cur.press}>Send</Pill>}
                </div>
              ))}
            </div>
          </Card>
          <div style={{ position: 'absolute', right: -24, bottom: -56, transform: `scale(${tp.s})`, transformOrigin: '100% 100%', opacity: tp.o }}>
            <Toast icon={LockIcon} title="Drafts can't send" sub="Submit it to Meta for approval first" size={30} dark />
          </div>
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.4, 0.65) * (1 - prog(t, 4.1, 4.4))} s={1.8} />
    </div>
  );
}

/* ================================================================= 03-S3 */
export function S3({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const tst = spring(t, 2.4, 0.6, 0.16);
  const tp = pop(tst);
  const pts = [12, 18, 15, 26, 31, 29, 44, 52, 49, 66, 74, 92];
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <NightBackdrop t={t} w={W} h={h} />
      <Fireworks t={t} w={W} h={h} starts={[0, 1.0, 1.9, 2.6]} period={3.4} scale={1.2} />
      <Layer x={960} y={CY} s={1.0}>
        <div style={{ position: 'relative' }}>
          <Card w={1180} pad={42} style={{ boxShadow: '0 0 0 1.5px rgba(255,255,255,0.14), 0 40px 90px -30px rgba(0,0,0,0.6)' }}>
            <CardHeader icon={Megaphone01Icon} title="Festive restock" size={36} right={<Chip tone="emerald" dot size={24}>Sent</Chip>} />
            <div style={{ display: 'flex', gap: 36 }}>
              <div style={{ flex: 1.15 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: 27, color: C.muted }}>Net revenue</span><Chip tone="emerald" size={20}>After Meta fees</Chip>
                </div>
                <div style={{ fontFamily: DISPLAY, fontSize: 78, fontWeight: 600, letterSpacing: '-0.035em', fontVariantNumeric: 'tabular-nums', margin: '6px 0 20px' }}>₹{inr(Math.round(countUp(t, 0.6, 392400, 1.4)))}</div>
                <Spark pts={pts} w={560} h={170} k={prog(t, 0.6, 2.1, E.move)} />
              </div>
              <div style={{ flex: 0.85, background: C.sunk, borderRadius: 24, padding: '16px 26px' }}>
                <KV k="Sent" v={inr(Math.round(countUp(t, 1.0, 4000, 1.2)))} size={29} />
                <KV k="Read" v={inr(Math.round(countUp(t, 1.15, 3412, 1.2)))} size={29} line />
                <KV k="Orders" v={inr(Math.round(countUp(t, 1.3, 318, 1.1)))} size={29} line />
                <KV k="Meta fees" v={`₹${inr(Math.round(countUp(t, 1.45, 3452, 1.0)))}`} size={29} line color={C.rose} />
              </div>
            </div>
          </Card>
          <div style={{ position: 'absolute', right: 70, top: -98, transform: `scale(${tp.s})`, transformOrigin: '100% 0', opacity: tp.o }}>
            <Toast icon={ChartIncreaseIcon} title="Best campaign this month" sub="113× return on Meta fees" size={30} />
          </div>
        </div>
      </Layer>
    </div>
  );
}

export const campaigns = {
  '03-H': { w: W, h: 1080, duration: 15, Component: H },
  '03-T1': { w: T, h: T, duration: 7.5, Component: T1 },
  '03-T2': { w: T, h: T, duration: 7.5, Component: T2 },
  '03-T3': { w: T, h: T, duration: 7.5, Component: T3 },
  '03-S1': { w: W, h: 1200, duration: 12.5, Component: S1 },
  '03-S2': { w: W, h: 1200, duration: 12.5, Component: S2 },
  '03-S3': { w: W, h: 1200, duration: 12.5, Component: S3 },
};

