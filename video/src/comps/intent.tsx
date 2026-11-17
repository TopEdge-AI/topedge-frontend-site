/**
 * Chapter 12 — Intent detection (docs/video/feature-library/ch12_intent_detection.md),
 * plus the home "COD Confirmation and Prepaid" film (home-cod).
 * 12-S3 doubles as the home "Real-time Intent Detection" film.
 */
import type { CSSProperties, ReactNode } from 'react';
import {
  CheckmarkCircle02Icon, CreditCardIcon, FlowConnectionIcon, GitBranchIcon, HeadsetIcon, PackageIcon, Search01Icon, Target02Icon,
  TruckDeliveryIcon, Wallet01Icon, ArrowDataTransferHorizontalIcon,
} from '@hugeicons/core-free-icons';
import { E, clamp, lerp, prog, spring, typed, useSize } from '../lib/time';
import {
  Backdrop, Bubble, C, Card, CardHeader, Chip, Cursor, DateChip, DISPLAY, FONT, Icon, Layer, Pill, Toast, Touch, WaHeader, WaScreen, pop,
} from '../lib/ui';
import { Meter, Toggle, rowIn } from '../lib/kit2';
import { PhoneRig, SuccessPage, backdropState, cursorAt, phoneOffset, phoneTouch, screenY } from '../lib/rig';

const T = 1080;
const W = 1920;
const sat = (k: number, node: ReactNode, style: CSSProperties, origin: string) => {
  const p = pop(k);
  return <div style={{ position: 'absolute', transform: `scale(${p.s})`, transformOrigin: origin, opacity: p.o, zIndex: 30, ...style }}>{node}</div>;
};
const Phrase = ({ children, k = 1 }: { children: ReactNode; k?: number }) => (
  <span style={{ display: 'inline-flex', height: 52, alignItems: 'center', padding: '0 20px', borderRadius: 99, background: '#E6F4FB', boxShadow: '0 0 0 1.5px rgba(2,132,199,0.22)', color: '#0369A1', fontSize: 24, fontWeight: 600, opacity: clamp(k * 2), transform: `scale(${lerp(0.85, 1, k)})` }}>{children}</span>
);
const Strip = ({ children }: { children: ReactNode }) => (
  <div style={{ borderRadius: 20, background: C.waBg, padding: 20, minHeight: 110, backgroundImage: 'radial-gradient(rgba(120,100,70,0.10) 1.2px, transparent 1.6px)', backgroundSize: '26px 26px' }}>{children}</div>
);
const BigIn = ({ text }: { text: string }) => (
  <div style={{ display: 'inline-block', background: '#fff', borderRadius: 20, borderTopLeftRadius: 6, padding: '14px 20px', fontSize: 30, color: '#111B21', boxShadow: '0 1px 1.5px rgba(0,0,0,0.1)', minHeight: 62 }}>{text || ' '}</div>
);
const Row = ({ icon, color = C.ink2, a, b, right, style }: { icon: typeof PackageIcon; color?: string; a: ReactNode; b: ReactNode; right?: ReactNode; style?: CSSProperties }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '18px 20px', borderRadius: 20, boxShadow: `0 0 0 1.5px ${C.line}`, marginTop: 14, background: '#fff', ...style }}>
    <Icon icon={icon} size={36} color={color} />
    <div style={{ flex: 1 }}><div style={{ fontSize: 29, fontWeight: 600 }}>{a}</div><div style={{ fontSize: 23, color: C.muted, marginTop: 2 }}>{b}</div></div>
    {right}
  </div>
);

/* ================================================================= 12-T1 */
export function T1({ t }: { t: number }) {
  const second = t >= 2.6;
  const q = second ? typed('order kidhar hai bhai', t, 2.6, 22) : typed('parcel kab aayega?', t, 0.3, 18);
  const m = second ? spring(t, 3.4, 0.5, 0.18) : spring(t, 1.4, 0.5, 0.18) * (1 - prog(t, 2.4, 2.6));
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="orchid" pattern="rings" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <CardHeader icon={TruckDeliveryIcon} title="Intent · Shipping" size={34} right={<Chip size={22}>8 phrases</Chip>} />
          <Strip><BigIn text={q} /></Strip>
          <div style={{ opacity: clamp(m * 2), transform: `translateY(${lerp(14, 0, m)}px)` }}>
            <Row icon={Target02Icon} color={C.emerald} a="Matched: Shipping" b={second ? '“kidhar hai” ≈ “where is”' : '“kab aayega” ≈ “when will it arrive”'} right={<Chip tone="emerald" size={22}>{second ? '93%' : '96%'}</Chip>} />
          </div>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 12-T2 */
export function T2({ t }: { t: number }) {
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="ocean" pattern="lines" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <CardHeader icon={GitBranchIcon} title="Routing" size={34} />
          <Strip><BigIn text={typed('return karna hai', t, 0.3, 18)} /></Strip>
          <div style={rowIn(t, 1.3)}><Row icon={ArrowDataTransferHorizontalIcon} color={C.violet} a="Intent: Returns" b="Matched by phrase" right={<Chip tone="violet" size={22}>94%</Chip>} /></div>
          <div style={rowIn(t, 2.0)}><Row icon={FlowConnectionIcon} color={C.emerald} a="Returns flow started" b="Asks for order and reason" right={<Chip tone="emerald" icon={CheckmarkCircle02Icon} size={22}>Sent</Chip>} /></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 20, paddingTop: 16, borderTop: `1.5px solid ${C.line}`, ...rowIn(t, 2.7) }}>
            <span style={{ fontSize: 30, fontWeight: 600 }}>AI tokens used</span>
            <span style={{ fontFamily: DISPLAY, fontSize: 56, fontWeight: 600, color: C.emerald }}>₹0</span>
          </div>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 12-T3 */
export function T3({ t }: { t: number }) {
  const cur = cursorAt(t, [[0.4, 980, 1000], [1.6, 830, 400], [2.2, 830, 400], [3.0, 1050, 1100]], [1.7]);
  const res: [string, number, string][] = [['Shipping', 0.94, C.emerald], ['COD confirm', 0.04, C.muted], ['Returns', 0.02, C.muted]];
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="dawn" pattern="mesh" w={T} h={T} />
      <Layer x={540} y={520}>
        <Card w={880}>
          <CardHeader icon={Search01Icon} title="Test an intent" size={34} />
          <div style={{ fontSize: 23, color: C.muted, marginBottom: 8 }}>Shopper says</div>
          <div style={{ display: 'flex', gap: 14 }}>
            <div style={{ flex: 1, height: 70, borderRadius: 18, boxShadow: `inset 0 0 0 ${t < 1.5 ? 2.5 : 1.5}px ${t < 1.5 ? C.violet : 'rgba(16,24,40,0.14)'}`, display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 29 }}>{typed('kab tak aayega?', t, 0.5, 16)}</div>
            <Pill kind="primary" size={25} press={cur.press}>Test</Pill>
          </div>
          <div style={{ marginTop: 22, background: C.sunk, borderRadius: 22, padding: '18px 24px', ...rowIn(t, 2.0) }}>
            {res.map(([n, v, col], i) => {
              const k = prog(t, 2.1 + i * 0.15, 3.1 + i * 0.15, E.move);
              return (
                <div key={n} style={{ marginBottom: i < 2 ? 18 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 27, marginBottom: 8 }}><span style={{ fontWeight: i === 0 ? 700 : 500 }}>{n}</span><b style={{ fontVariantNumeric: 'tabular-nums' }}>{Math.round(v * 100 * k)}%</b></div>
                  <Meter k={v * k} color={col} h={i === 0 ? 16 : 10} />
                </div>
              );
            })}
          </div>
        </Card>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.4, 0.65) * (1 - prog(t, 2.6, 3.0))} s={1.7} />
    </div>
  );
}

/* ================================================================= 12-S1 */
export function S1({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const cur = cursorAt(t, [[0.4, 1600, h - 80], [1.1, 1330, CY - 215], [1.5, 1330, CY - 215], [5.2, 1650, h + 80]], [1.2]);
  const card = spring(t, 1.5, 0.6, 0.16) * (1 - prog(t, 3.9, 4.2));
  const rows: [typeof TruckDeliveryIcon, string, string, string][] = [
    [TruckDeliveryIcon, 'Shipping', '8 phrases', 'Start flow: Track order'],
    [Wallet01Icon, 'COD confirm', '5 phrases', 'Send reply'],
    [ArrowDataTransferHorizontalIcon, 'Returns', '6 phrases', 'Start flow: Returns'],
  ];
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="sunrise" pattern="dots" w={W} h={h} />
      <Layer x={960} y={CY} s={1.08}>
        <div style={{ position: 'relative' }}>
          <Card w={1060} pad={38}>
            <CardHeader icon={Target02Icon} title="Intents" size={36} right={<Pill kind="primary" size={23} press={cur.press}>+ New intent</Pill>} />
            {rows.map(([icon, a, b, c]) => (
              <Row key={a} icon={icon} a={a} b={`${b} · ${c}`} right={<Toggle on={1} />} />
            ))}
            <div style={rowIn(t, 4.0)}>
              <Row icon={HeadsetIcon} color={C.violet} a="Talk to human" b="4 phrases · Assign to Support" right={<Toggle on={prog(t, 4.6, 4.9, E.move)} />} style={{ background: `rgba(124,58,237,${0.05 * (1 - prog(t, 7, 9))})` }} />
            </div>
          </Card>
          {sat(card, (
            <div style={{ width: 560, background: '#fff', borderRadius: 26, padding: 28, boxShadow: '0 30px 70px -24px rgba(16,24,40,0.4), 0 0 0 1.5px rgba(16,24,40,0.06)' }}>
              <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>New intent</div>
              {[['Name', typed('Talk to human', t, 1.9, 16)], ['Phrase', typed('agent se baat karni hai', t, 2.6, 18)]].map(([l, v]) => (
                <div key={l} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 21, color: C.muted, marginBottom: 6 }}>{l}</div>
                  <div style={{ height: 60, borderRadius: 14, boxShadow: 'inset 0 0 0 1.5px rgba(16,24,40,0.14)', display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: 25 }}>{v}</div>
                </div>
              ))}
            </div>
          ), { right: -60, top: -40 }, '100% 0')}
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.4, 0.65) * (1 - prog(t, 1.8, 2.2))} s={1.8} />
    </div>
  );
}

/* ================================================================= 12-S2 */
export function S2({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const cur = cursorAt(t, [[2.2, 1600, h - 80], [3.2, 1300, CY + 300], [3.7, 1300, CY + 300], [4.6, 1650, h + 80]], [3.3]);
  const saved = prog(t, 3.35, 3.6);
  const phrases: [string, number][] = [['where is my order', -1], ['parcel kab aayega', -1], ['tracking link', -1], ['order kidhar hai', 1.0], ['delivery kab hogi', 1.7]];
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="iris" pattern="beams" w={W} h={h} />
      <Layer x={960} y={CY} s={1.05}>
        <Card w={1120} pad={40}>
          <CardHeader icon={TruckDeliveryIcon} title="Edit intent · Shipping" size={36} right={<Chip tone="emerald" dot size={23}>Live</Chip>} />
          <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: '0.12em', color: C.muted, marginBottom: 14 }}>SHOPPER PHRASES</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {phrases.map(([p, at]) => <Phrase key={p} k={at < 0 ? 1 : spring(t, at, 0.5, 0.2)}>{p}</Phrase>)}
          </div>
          <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: '0.12em', color: C.muted, margin: '26px 0 0' }}>THEN</div>
          <Row icon={FlowConnectionIcon} color={C.violet} a="Start flow: Track order" b="Reads the order from Shopify" />
          <Row icon={HeadsetIcon} a="If no order found" b="Assign to Support" />
          <div style={{ marginTop: 22, position: 'relative', height: 66 }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 1 - saved }}><Pill kind="primary" size={25} full press={cur.press}>Save intent</Pill></div>
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', opacity: saved }}><Chip tone="emerald" icon={CheckmarkCircle02Icon} size={26}>Saved · 10 phrases</Chip></div>
          </div>
        </Card>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 2.2, 2.45) * (1 - prog(t, 4.2, 4.6))} s={1.8} />
    </div>
  );
}

/* ================================================================= 12-S3 */
export function S3({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const off = phoneOffset(t, -2);
  const q = typed('order kidhar hai bhai?', t, 0.4, 16);
  const typing = t > 2.4 && t < 3.3;
  const ans = spring(t, 3.3, 0.55, 0.15);
  const press = prog(t, 5.55, 5.65) * (1 - prog(t, 5.75, 5.85));
  const touch = phoneTouch(t, [[5.0, 6.0, 195, 470]], off);
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="mint" pattern="grid" w={W} h={h} />
      <PhoneRig offset={off} time="16:40">
        <WaScreen>
          <WaHeader name="Mira Ethnic" letter="M" color="#BE185D" />
          <div style={{ position: 'absolute', top: 124, left: 0, right: 0 }}><DateChip /></div>
          <div style={{ position: 'absolute', top: 154, left: 30, right: 30, background: '#FFF6C9', borderRadius: 8, fontSize: 11.5, color: '#54656F', textAlign: 'center', padding: '5px 8px' }}>Messages from this business are secured by Meta.</div>
          <div style={{ position: 'absolute', top: 196, left: 12, right: 12 }}>
            {q ? <Bubble out time="16:40" read={t > 2.0}>{q}</Bubble> : null}
            {typing ? <div style={{ marginTop: 8, width: 64, height: 34, borderRadius: 16, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>{[0, 1, 2].map((i) => <span key={i} style={{ width: 7, height: 7, borderRadius: 9, background: '#9AA5AD', opacity: 0.4 + 0.6 * Math.abs(Math.sin(t * 5 + i)) }} />)}</div> : null}
            {ans > 0 ? (
              <div style={{ marginTop: 10, opacity: clamp(ans * 2), transform: `translateY(${lerp(16, 0, ans)}px)` }}>
                <div style={{ width: 290, background: '#fff', borderRadius: 14, borderTopLeftRadius: 4, boxShadow: '0 1px 1.5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                  <div style={{ padding: '9px 11px 6px', fontSize: 15.5, lineHeight: 1.38, color: '#111B21' }}>Hi Rahul! Order #2204 is out for delivery and will reach you by 6 pm today.<div style={{ textAlign: 'right', fontSize: 11.5, color: '#667781' }}>16:40</div></div>
                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', height: 44, display: 'grid', placeItems: 'center', color: C.waLink, fontSize: 15.5, fontWeight: 500, background: `rgba(10,132,198,${0.14 * press})` }}>↗ Track order</div>
                </div>
              </div>
            ) : null}
          </div>
        </WaScreen>
      </PhoneRig>
      {touch ? <Touch {...touch} /> : null}
      {sat(spring(t, 2.0, 0.6, 0.16), <Toast icon={Target02Icon} title="Intent: Shipping · 93%" sub="Matched in 40 ms · no AI call" size={31} />, { left: 230, top: CY - 120 }, '100% 50%')}
      {sat(spring(t, 3.4, 0.6, 0.16), <Toast icon={FlowConnectionIcon} title="Track order flow" sub="Read #2204 live from Shopify" size={31} tone={C.violet} />, { left: 1310, top: CY + 60 }, '0 50%')}
    </div>
  );
}

/* ============================================================ home-cod */
/** COD order → WhatsApp confirmation → switch to prepaid → RTO risk gone. */
export function COD({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const bd = backdropState(t, 2.6, 9.8);
  const off = phoneOffset(t, 2.75, 9.75);
  const bubble = spring(t, 3.9, 0.6, 0.15);
  const pay = prog(t, 6.0, 6.5, E.enter);
  const payPress = prog(t, 7.6, 7.7) * (1 - prog(t, 7.8, 7.9));
  const done = prog(t, 8.0, 8.35, E.enter);
  const touch = phoneTouch(t, [[4.9, 5.85, 195, 448], [7.1, 8.0, 195, 446]], off);
  const prepaid = t > 9.6;
  const swap = prog(t, 10.6, 11.0);
  const tst = spring(t, 11.2, 0.6, 0.16);
  const tp = pop(tst);
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="dawn" pattern="lines" w={W} h={h} />
      <Layer x={960} y={CY} s={bd.s * 1.1} o={bd.o} blur={bd.blur}>
        <div style={{ position: 'relative' }}>
          <Card w={1100} pad={38}>
            <CardHeader icon={PackageIcon} title="Orders · Today" size={34} right={<Chip tone="emerald" dot size={22}>Auto-confirm on WhatsApp</Chip>} />
            {[
              ['#2204', 'Rahul Mehta · Pune', '₹1,849', prepaid],
              ['#2203', 'Ananya Iyer · Jaipur', '₹2,290', true],
              ['#2202', 'Kabir Shah · Surat', '₹999', true],
            ].map(([id, who, amt, ok], i) => (
              <div key={id as string} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '18px 20px', borderRadius: 20, marginTop: i ? 12 : 0, background: i === 0 ? `rgba(124,58,237,${0.05 + 0.04 * swap})` : '#fff', boxShadow: `0 0 0 1.5px ${i === 0 ? 'rgba(124,58,237,0.3)' : C.line}` }}>
                <div style={{ width: 110, fontFamily: "'Geist Mono',ui-monospace,monospace", fontSize: 27, fontWeight: 600 }}>{id as string}</div>
                <div style={{ flex: 1, fontSize: 27 }}>{who as string}</div>
                <div style={{ width: 130, fontSize: 28, fontWeight: 600 }}>{i === 0 && prepaid ? '₹1,799' : (amt as string)}</div>
                <span style={{ width: 250, display: 'flex', justifyContent: 'flex-end' }}>
                  {i === 0 && !prepaid ? <Chip tone="amber" dot size={21} pulse={(t * 1.2) % 1}>COD · confirming</Chip>
                    : i === 0 ? <span style={{ opacity: swap, transform: `scale(${lerp(0.85, 1, swap)})` }}><Chip tone="emerald" icon={CheckmarkCircle02Icon} size={21}>Prepaid · UPI</Chip></span>
                    : ok ? <Chip tone="emerald" icon={CheckmarkCircle02Icon} size={21}>Confirmed</Chip> : null}
                </span>
              </div>
            ))}
          </Card>
          <div style={{ position: 'absolute', right: 20, bottom: -70, transform: `scale(${tp.s})`, transformOrigin: '100% 100%', opacity: tp.o }}>
            <Toast icon={CreditCardIcon} title="COD switched to prepaid" sub="RTO risk removed · ₹180 return cost avoided" size={30} />
          </div>
        </div>
      </Layer>
      <PhoneRig offset={off} time="11:20">
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${screenY(1)}px)` }}>
          <WaScreen>
            <WaHeader name="Mira Ethnic" letter="M" color="#BE185D" />
            <div style={{ position: 'absolute', top: 124, left: 0, right: 0 }}><DateChip /></div>
            <div style={{ position: 'absolute', top: 160, left: 12, opacity: clamp(bubble * 2), transform: `translateY(${lerp(30, 0, bubble)}px)` }}>
              <div style={{ width: 300, background: '#fff', borderRadius: 14, borderTopLeftRadius: 4, boxShadow: '0 1px 1.5px rgba(0,0,0,0.1)', overflow: 'hidden', color: '#111B21' }}>
                <div style={{ padding: '10px 12px 6px' }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>Confirm your COD order</div>
                  <div style={{ fontSize: 15.5, lineHeight: 1.38, marginTop: 4 }}>Hi Rahul, order #2204 for ₹1,849 is ready to ship. Pay now by UPI and save ₹50.</div>
                  <div style={{ textAlign: 'right', fontSize: 11.5, color: '#667781', marginTop: 3 }}>11:20</div>
                </div>
                {['Pay ₹1,799 by UPI', 'Confirm COD order'].map((b, i) => (
                  <div key={b} style={{ borderTop: '1px solid rgba(0,0,0,0.07)', height: 44, display: 'grid', placeItems: 'center', color: C.waLink, fontSize: 15.5, fontWeight: 500, background: i === 0 ? `rgba(10,132,198,${0.14 * prog(t, 5.4, 5.5) * (1 - prog(t, 5.6, 5.8))})` : '#fff' }}>{i === 0 ? '₹ ' : '✓ '}{b}</div>
                ))}
              </div>
            </div>
          </WaScreen>
        </div>
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${screenY(pay)}px)`, opacity: pay > 0 ? 1 : 0, zIndex: 12, background: '#fff', fontFamily: FONT }}>
          <div style={{ position: 'absolute', top: 70, left: 0, right: 0, textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: C.muted }}>Paying Mira Ethnic</div>
            <div style={{ fontFamily: DISPLAY, fontSize: 52, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 4 }}>₹1,799</div>
            <div style={{ fontSize: 13.5, color: C.emerald, fontWeight: 600 }}>₹50 off for paying now</div>
          </div>
          <div style={{ position: 'absolute', top: 220, left: 20, right: 20 }}>
            {['GPay', 'PhonePe', 'Paytm'].map((u, i) => (
              <div key={u} style={{ height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12, marginBottom: 10, boxShadow: i === 0 ? `0 0 0 2px ${C.ink}` : `0 0 0 1px ${C.line}`, fontSize: 16, fontWeight: 600 }}>
                <span style={{ width: 26, height: 26, borderRadius: 8, background: ['#4285F4', '#5F259F', '#00BAF2'][i] }} />{u}
              </div>
            ))}
            <div style={{ marginTop: 12 }}><Pill kind="dark" size={17} full press={payPress}>Pay ₹1,799</Pill></div>
          </div>
          <div style={{ position: 'absolute', inset: 0, opacity: done, zIndex: 3 }}>
            {done > 0 ? <SuccessPage t={t} at={8.1} order="Order #2204 · ₹1,799 via UPI" chip="Ships today · updates on WhatsApp" /> : null}
          </div>
        </div>
      </PhoneRig>
      {touch ? <Touch {...touch} /> : null}
    </div>
  );
}

export const intent = {
  '12-T1': { w: T, h: T, duration: 7.5, Component: T1 },
  '12-T2': { w: T, h: T, duration: 7.5, Component: T2 },
  '12-T3': { w: T, h: T, duration: 7.5, Component: T3 },
  '12-S1': { w: W, h: 1200, duration: 12.5, Component: S1 },
  '12-S2': { w: W, h: 1200, duration: 12.5, Component: S2 },
  '12-S3': { w: W, h: 1200, duration: 15, Component: S3 },
  'home-intent': { w: W, h: 1080, duration: 12.5, Component: S3 },
  'home-cod': { w: W, h: 1080, duration: 13, Component: COD },
};
