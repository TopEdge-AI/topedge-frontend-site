/**
 * Chapter 07 — AI Brain (docs/video/feature-library/ch07_ai_brain.md).
 * No brain, robot or sparkle icons: the AI is shown only through what it does.
 */
import type { CSSProperties, ReactNode } from 'react';
import {
  Book02Icon, CheckmarkCircle02Icon, DashboardSpeed01Icon, DeliveryTruck01Icon, File01Icon, FlowConnectionIcon,
  HeadsetIcon, Key01Icon, Target02Icon, UserIcon,
} from '@hugeicons/core-free-icons';
import { SiClaude, SiGooglegemini, SiOpenai } from 'react-icons/si';
import { E, clamp, lerp, prog, spring, typed, useSize } from '../lib/time';
import {
  Backdrop, Bubble, C, Card, CardHeader, Chip, Cursor, DateChip, FONT, Icon, Layer, Pill, Toast, WaHeader, WaScreen, pop,
} from '../lib/ui';
import { KV, Meter, countUp, inr, rowIn } from '../lib/kit2';
import { PhoneRig, cursorAt, phoneOffset } from '../lib/rig';

const T = 1080;
const W = 1920;
const MONO = "'Geist Mono','SF Mono',ui-monospace,monospace";
const sat = (k: number, node: ReactNode, style: CSSProperties, origin: string) => {
  const p = pop(k);
  return <div style={{ position: 'absolute', transform: `scale(${p.s})`, transformOrigin: origin, opacity: p.o, zIndex: 30, ...style }}>{node}</div>;
};
const Dots = ({ t }: { t: number }) => (
  <div style={{ marginTop: 8, width: 64, height: 34, borderRadius: 16, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>{[0, 1, 2].map((i) => <span key={i} style={{ width: 7, height: 7, borderRadius: 9, background: '#9AA5AD', opacity: 0.4 + 0.6 * Math.abs(Math.sin(t * 5 + i)) }} />)}</div>
);
const Row = ({ icon, color = C.ink2, a, b, right, style }: { icon: typeof File01Icon; color?: string; a: ReactNode; b: ReactNode; right?: ReactNode; style?: CSSProperties }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '18px 20px', borderRadius: 20, boxShadow: `0 0 0 1.5px ${C.line}`, marginTop: 14, background: '#fff', ...style }}>
    <Icon icon={icon} size={36} color={color} />
    <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 29, fontWeight: 600, whiteSpace: 'nowrap' }}>{a}</div><div style={{ fontSize: 23, color: C.muted, marginTop: 2, whiteSpace: 'nowrap' }}>{b}</div></div>
    {right}
  </div>
);

/* ================================================================= 07-H */
export function H({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const off = phoneOffset(t, -2);
  const q1 = typed('Can I return an opened serum?', t, 0.4, 16);
  const a1 = typed("Opened items can't be returned, but you can exchange them within 7 days of delivery. Want me to book a free pickup?", t, 4.1, 34);
  const q2 = spring(t, 7.6, 0.5, 0.15);
  const a2 = spring(t, 9.7, 0.5, 0.15);
  const scroll = lerp(0, 150, prog(t, 7.4, 8.0, E.move)) + lerp(0, 70, prog(t, 9.6, 10.0, E.move));
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="dusk" pattern="dots" w={W} h={h} />
      <PhoneRig offset={off} time="14:02">
        <WaScreen>
          <WaHeader name="Glow Co" letter="G" color="#C8603F" />
          <div style={{ position: 'absolute', top: 124 - scroll, left: 12, right: 12 }}>
            <DateChip />
            <div style={{ margin: '10px 18px', background: '#FFF6C9', borderRadius: 8, fontSize: 11.5, color: '#54656F', textAlign: 'center', padding: '5px 8px' }}>Messages from this business are secured by Meta.</div>
            {q1 ? <Bubble out time="14:02" read>{q1}</Bubble> : null}
            {t > 2.4 && t < 4.1 ? <Dots t={t} /> : null}
            {a1 ? <div style={{ marginTop: 8 }}><Bubble time="14:02">{a1}</Bubble></div> : null}
            {q2 > 0 ? <div style={{ marginTop: 8, opacity: clamp(q2 * 2) }}><Bubble out time="14:03" read>Yes please, tomorrow works</Bubble></div> : null}
            {t > 8.6 && t < 9.7 ? <Dots t={t} /> : null}
            {a2 > 0 ? <div style={{ marginTop: 8, opacity: clamp(a2 * 2) }}><Bubble time="14:03">Done! Pickup booked for tomorrow, 10 am to 1 pm. 📦</Bubble></div> : null}
          </div>
        </WaScreen>
      </PhoneRig>
      {sat(spring(t, 2.5, 0.55, 0.16) * (1 - prog(t, 3.9, 4.2)), <Toast icon={File01Icon} title="Reading store knowledge" sub="Return policy · Exchange FAQ" size={31} tone={C.violet} />, { left: 180, top: CY - 80 }, '100% 50%')}
      {sat(spring(t, 4.3, 0.55, 0.16), <Toast icon={CheckmarkCircle02Icon} title="Answer cited" sub="Return policy · section 2" size={31} />, { left: 230, top: CY - 80 }, '100% 50%')}
      {sat(spring(t, 10.0, 0.55, 0.16), <Toast icon={DeliveryTruck01Icon} title="Pickup booked" sub="Order #2087 · via Shopify" size={31} />, { left: 1330, top: CY + 120 }, '0 50%')}
    </div>
  );
}

/* ================================================================= 07-T1 */
export function T1({ t }: { t: number }) {
  const rows: [string, string, number][] = [['Return policy', 'glowco.in/policies/refund', 0.3], ['Shipping policy', '2 to 5 days, COD available', 0.9], ['Ingredients FAQ', 'Store page · 18 answers', 1.5]];
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="sunrise" pattern="dots" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <CardHeader icon={Book02Icon} title="Store knowledge" size={34} right={<Chip size={22}>12 pages</Chip>} />
          {rows.map(([a, b, at]) => {
            const k = prog(t, at, at + 1.1, E.move);
            return <Row key={a} icon={File01Icon} a={a} b={b} right={k < 1 ? <div style={{ width: 120 }}><Meter k={k} color={C.violet} h={10} /></div> : <span style={{ opacity: prog(t, at + 1.1, at + 1.3) }}><Chip tone="emerald" icon={CheckmarkCircle02Icon} size={21}>Synced</Chip></span>} />;
          })}
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 07-T2 */
export function T2({ t }: { t: number }) {
  const cur = cursorAt(t, [[1.3, 980, 1000], [1.85, 540, 760], [2.3, 540, 760], [3.0, 1050, 1100]], [1.9]);
  const ok = prog(t, 1.95, 2.2);
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="iris" pattern="beams" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <CardHeader icon={Key01Icon} title="Connect your AI" size={34} />
          <div style={{ display: 'flex', background: '#F0F0F3', borderRadius: 99, padding: 6 }}>
            {[[SiOpenai, 'OpenAI'], [SiClaude, 'Claude'], [SiGooglegemini, 'Gemini']].map(([M, n], i) => {
              const Mk = M as typeof SiOpenai;
              return (
                <span key={n as string} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, height: 60, borderRadius: 99, background: i === 1 ? '#fff' : 'transparent', boxShadow: i === 1 ? '0 2px 6px rgba(16,24,40,0.15)' : 'none', fontSize: 25, fontWeight: 600, color: i === 1 ? C.ink : C.muted }}>
                  <Mk size={26} color={i === 1 ? '#D97757' : '#A1A1AA'} />{n as string}
                </span>
              );
            })}
          </div>
          <div style={{ fontSize: 23, color: C.muted, margin: '22px 0 8px' }}>API key</div>
          <div style={{ height: 70, borderRadius: 18, boxShadow: 'inset 0 0 0 1.5px rgba(16,24,40,0.14)', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 28, fontFamily: MONO }}>{typed('sk-••••••••••••••4f2a', t, 0.6, 22)}</div>
          <div style={{ marginTop: 22, position: 'relative', height: 70 }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 1 - ok }}><Pill kind="primary" size={26} full press={cur.press}>Connect</Pill></div>
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', opacity: ok }}><Chip tone="emerald" icon={CheckmarkCircle02Icon} size={24}>Connected · tokens bill to your account</Chip></div>
          </div>
        </Card>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 1.3, 1.5) * (1 - prog(t, 2.7, 3.0))} s={1.7} />
    </div>
  );
}

/* ================================================================= 07-T3 */
export function T3({ t }: { t: number }) {
  const msg = typed("Hi! I'm Maya from Glow Co. How can I help today?", t, 0.9, 24);
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="mint" pattern="grid" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <CardHeader icon={UserIcon} title="Bot persona" size={34} />
          <div style={{ fontSize: 23, color: C.muted, marginBottom: 8 }}>Name</div>
          <div style={{ height: 66, borderRadius: 18, boxShadow: 'inset 0 0 0 1.5px rgba(16,24,40,0.14)', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 29, fontWeight: 600 }}>Maya</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
            {['Warm', 'Brief', 'Formal'].map((p, i) => <span key={p} style={{ height: 52, padding: '0 22px', borderRadius: 99, display: 'grid', placeItems: 'center', fontSize: 23, fontWeight: 600, background: i < 2 ? C.violetSoft : '#fff', color: i < 2 ? C.violet : C.muted, boxShadow: `0 0 0 1.5px ${i < 2 ? 'rgba(124,58,237,0.35)' : C.line}` }}>{p}</span>)}
          </div>
          <div style={{ marginTop: 22, borderRadius: 20, background: C.waBg, padding: 20, minHeight: 170, backgroundImage: 'radial-gradient(rgba(120,100,70,0.10) 1.2px, transparent 1.6px)', backgroundSize: '26px 26px' }}>
            {msg ? <div style={{ display: 'inline-block', background: '#fff', borderRadius: 20, borderTopLeftRadius: 6, padding: '14px 18px', fontSize: 27, lineHeight: 1.36, maxWidth: 640 }}>{msg}</div> : null}
          </div>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 07-S1 */
export function S1({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="lime" pattern="rings" w={W} h={h} />
      <Layer x={960} y={CY}>
        <div style={{ position: 'relative' }}>
          <Card w={1180} pad={42}>
            <CardHeader icon={Key01Icon} title="AI settings" size={36} right={<Chip tone="emerald" dot size={23}>Connected</Chip>} />
            <div style={{ display: 'flex', gap: 34 }}>
              <div style={{ flex: 1.1 }}>
                <div style={{ fontSize: 23, color: C.muted, marginBottom: 8 }}>API key</div>
                <div style={{ height: 64, borderRadius: 16, boxShadow: 'inset 0 0 0 1.5px rgba(16,24,40,0.14)', display: 'flex', alignItems: 'center', padding: '0 18px', fontSize: 25, fontFamily: MONO }}>sk-••••••••••••4f2a</div>
                <div style={{ display: 'flex', background: '#F0F0F3', borderRadius: 99, padding: 5, marginTop: 20 }}>
                  {['Fast · low cost', 'Balanced', 'Best quality'].map((p, i) => <span key={p} style={{ flex: 1, textAlign: 'center', padding: '12px 0', borderRadius: 99, fontSize: 21, fontWeight: 600, background: i === 0 ? '#fff' : 'transparent', boxShadow: i === 0 ? '0 2px 6px rgba(16,24,40,0.15)' : 'none', color: i === 0 ? C.ink : C.muted }}>{p}</span>)}
                </div>
                <div style={{ marginTop: 24, ...rowIn(t, 1.2) }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 25, marginBottom: 10 }}><span>Max reply length</span><b>300 tokens</b></div>
                  <Meter k={0.6 * prog(t, 1.4, 2.4, E.move)} color={C.violet} h={14} />
                </div>
              </div>
              <div style={{ flex: 0.9, background: C.sunk, borderRadius: 24, padding: '16px 26px' }}>
                <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: '0.12em', color: C.muted }}>THIS WEEK</div>
                <KV k="AI replies" v={inr(Math.round(countUp(t, 0.6, 1612, 1.3)))} size={28} />
                <KV k="Tokens" v={inr(Math.round(countUp(t, 0.7, 48210, 1.3)))} size={28} line />
                <KV k="Per reply" v="₹0.10 to ₹0.30" size={28} line bold />
              </div>
            </div>
          </Card>
          {sat(spring(t, 2.6, 0.6, 0.16), <Toast icon={DashboardSpeed01Icon} title="Billed by your provider" sub="No markup from TopEdge AI" size={29} tone={C.violet} />, { right: 30, bottom: -60 }, '100% 100%')}
        </div>
      </Layer>
    </div>
  );
}

/* ================================================================= 07-S2 */
export function S2({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const used = prog(t, 3.2, 3.6);
  const q = spring(t, 0.6, 0.5, 0.15);
  const a = spring(t, 3.2, 0.5, 0.15);
  const cite = spring(t, 4.8, 0.5, 0.2);
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="lagoon" pattern="lines" w={W} h={h} />
      <Layer x={960} y={CY}>
        <div style={{ width: 1240, borderRadius: 30, background: '#fff', overflow: 'hidden', display: 'flex', boxShadow: '0 40px 90px -40px rgba(20,60,80,0.4), 0 0 0 1.5px rgba(16,24,40,0.06)' }}>
          <div style={{ width: 520, padding: 34, borderRight: `1.5px solid ${C.line}` }}>
            <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: '0.12em', color: C.muted }}>STORE KNOWLEDGE</div>
            <Row icon={File01Icon} color={used ? C.emerald : C.ink2} a="Return policy" b={used > 0.5 ? '7-day exchange · used now' : '7-day exchange'} style={{ background: `rgba(5,150,105,${0.06 * used})`, boxShadow: `0 0 0 ${1.5 + used}px ${used ? 'rgba(5,150,105,0.4)' : C.line}` }} />
            <Row icon={File01Icon} a="Shipping policy" b="2 to 5 days" />
            <Row icon={File01Icon} a="Store pages" b="12 imported" />
          </div>
          <div style={{ flex: 1, background: C.waBg, position: 'relative', minHeight: 560, backgroundImage: 'radial-gradient(rgba(120,100,70,0.10) 1.2px, transparent 1.6px)', backgroundSize: '26px 26px' }}>
            <div style={{ height: 84, background: 'rgba(247,247,247,0.96)', display: 'flex', alignItems: 'center', gap: 14, padding: '0 26px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
              <span style={{ width: 48, height: 48, borderRadius: 99, background: '#C8603F', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 22 }}>M</span>
              <div><div style={{ fontSize: 26, fontWeight: 600 }}>Maya</div><div style={{ fontSize: 20, color: C.muted }}>Test chat</div></div>
            </div>
            <div style={{ padding: 26 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', opacity: clamp(q * 2) }}><div style={{ background: C.waOut, borderRadius: 20, borderTopRightRadius: 6, padding: '14px 18px', fontSize: 27 }}>Can I swap my serum for a bigger size?</div></div>
              {t > 1.8 && t < 3.2 ? <Dots t={t} /> : null}
              {a > 0 ? <div style={{ marginTop: 14, opacity: clamp(a * 2) }}><div style={{ display: 'inline-block', background: '#fff', borderRadius: 20, borderTopLeftRadius: 6, padding: '14px 18px', fontSize: 27, maxWidth: 560 }}>Sure! Exchanges are free within 7 days of delivery.</div></div> : null}
              {cite > 0 ? <div style={{ marginTop: 12, opacity: clamp(cite * 2), transform: `scale(${lerp(0.85, 1, cite)})`, transformOrigin: '0 50%' }}><Chip tone="emerald" icon={File01Icon} size={22}>Source: Return policy</Chip></div> : null}
            </div>
          </div>
        </div>
      </Layer>
    </div>
  );
}

/* ================================================================= 07-S3 */
export function S3({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const human = prog(t, 4.4, 4.8);
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="coral" pattern="mesh" w={W} h={h} />
      <Layer x={960} y={CY} s={1.08}>
        <Card w={1060} pad={38}>
          <CardHeader icon={Target02Icon} title="Routing" size={36} right={<Chip size={22}>Inbound WhatsApp</Chip>} />
          <div style={{ borderRadius: 20, background: C.waBg, padding: 20, backgroundImage: 'radial-gradient(rgba(120,100,70,0.10) 1.2px, transparent 1.6px)', backgroundSize: '26px 26px' }}>
            <div style={{ display: 'inline-block', background: '#fff', borderRadius: 20, borderTopLeftRadius: 6, padding: '14px 18px', fontSize: 28 }}>{human > 0.5 ? 'Can I talk to a person?' : 'Where is my order?'}</div>
          </div>
          <Row icon={Target02Icon} color={C.emerald} a={human > 0.5 ? 'Intent Detect · Human request' : 'Intent Detect · Order status'} b={human > 0.5 ? 'Matched' : '96% match · no model call'} right={<Chip tone="emerald" size={21}>₹0</Chip>} />
          <div style={rowIn(t, 1.4)}><Row icon={FlowConnectionIcon} color={human > 0.5 ? C.muted : C.violet} a={human > 0.5 ? 'AI reply' : 'Flow Builder'} b={human > 0.5 ? 'Skipped' : 'Runs Track order, replies in 1.2 s'} right={human > 0.5 ? <Chip size={21}>Skipped</Chip> : <Chip tone="emerald" icon={CheckmarkCircle02Icon} size={21}>Sent</Chip>} /></div>
          <div style={rowIn(t, 5.2)}><Row icon={HeadsetIcon} color="#D97706" a="Live Chat takeover" b="Priya joined · always wins over AI" right={<Chip tone="amber" size={21}>AI paused</Chip>} style={{ background: 'rgba(217,119,6,0.05)' }} /></div>
        </Card>
      </Layer>
    </div>
  );
}

export const brain = {
  '07-H': { w: W, h: 1080, duration: 15, Component: H },
  '07-T1': { w: T, h: T, duration: 7.5, Component: T1 },
  '07-T2': { w: T, h: T, duration: 7.5, Component: T2 },
  '07-T3': { w: T, h: T, duration: 7.5, Component: T3 },
  '07-S1': { w: W, h: 1200, duration: 12.5, Component: S1 },
  '07-S2': { w: W, h: 1200, duration: 12.5, Component: S2 },
  '07-S3': { w: W, h: 1200, duration: 12.5, Component: S3 },
};

