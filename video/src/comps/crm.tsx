/**
 * Chapter 04 — Audience CRM (docs/video/feature-library/ch04_audience_crm.md).
 * 04-H doubles as the home "Unified Customer Identity" film; 04-S3 as home "Segmentation".
 */
import {
  CheckmarkCircle02Icon, FilterHorizontalIcon, FlowConnectionIcon, Link01Icon, Mail01Icon, Megaphone01Icon,
  Message01Icon, PackageIcon, ShoppingBag02Icon, ShoppingCart01Icon, SmartPhone01Icon, UserCheck01Icon, UserGroupIcon, ViewIcon,
} from '@hugeicons/core-free-icons';
import type { CSSProperties, ReactNode } from 'react';
import { E, clamp, keys, prog, spring, useSize } from '../lib/time';
import { Backdrop, C, Camera, Card, CardHeader, Chip, Cursor, DISPLAY, FONT, Icon, Layer, Pill, Toast, pop } from '../lib/ui';
import { Donut, EventRow, Meter, ProfileHead, Toggle, countUp, inr, rowIn } from '../lib/kit2';
import { cursorAt } from '../lib/rig';

const T = 1080;
const W = 1920;
const ic = (icon: typeof ViewIcon, color: string = C.ink2, size = 30) => <Icon icon={icon} size={size} color={color} />;

function Stat({ label, value, size = 1 }: { label: string; value: string; size?: number }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 24 * size, color: C.muted }}>{label}</div>
      <div style={{ fontFamily: DISPLAY, fontSize: 52 * size, fontWeight: 600, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>{value}</div>
    </div>
  );
}

/* ================================================================= 04-H */
export function H({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const left = spring(t, 3.4, 0.6, 0.16), right = spring(t, 4.4, 0.6, 0.16);
  const lp = pop(left), rp = pop(right);
  const score = countUp(t, 0.5, 88, 1.3);
  const diwaliWash = prog(t, 9.0, 9.4) * (1 - prog(t, 10.2, 11));
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="lagoon" pattern="dots" w={W} h={h} />
      <Camera z={keys(t, [[0, 1], [5, 1.03], [15.5, 1]], E.camera)}>
        <Layer x={960} y={CY} s={1.1}>
          <div style={{ position: 'relative' }}>
            <Card w={1080} pad={40}>
              <ProfileHead name="Riya Sharma" sub="+91 90000 12345 · Mumbai" color="#BE185D" right={<Chip tone="violet" dot size={24}>VIP</Chip>} />
              <div style={{ display: 'flex', gap: 30, alignItems: 'flex-end' }}>
                <Stat label="Orders" value={String(Math.round(countUp(t, 0.5, 7, 1.0)))} />
                <Stat label="Lifetime spend" value={`₹${inr(Math.round(countUp(t, 0.5, 18420, 1.3)))}`} />
                <div style={{ flex: 1.2 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: C.muted }}><span>Lead score</span><b style={{ color: C.ink, fontSize: 30 }}>{Math.round(score)}</b></div>
                  <div style={{ marginTop: 16 }}><Meter k={score / 100} color={C.violet} h={14} /></div>
                </div>
              </div>
              <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: '0.12em', color: C.muted, margin: '30px 0 8px' }}>ACTIVITY</div>
              <div style={{ position: 'relative', height: 268 }}>
                <div style={{ position: 'absolute', left: 45, top: 20, bottom: 20, borderLeft: `2px solid ${C.line}` }} />
                {[
                  [Megaphone01Icon, C.violet, 'Diwali sale', 'Clicked Shop the edit, then ordered #2211', '2d', 2.2],
                  [Message01Icon, C.emerald, 'WhatsApp chat', 'Asked about sizing, answered by AI', '3d', 1.5],
                  [PackageIcon, C.sky, 'Order #2160 · ₹2,340', 'Delivered · Prepaid', '12d', 0.8],
                ].map(([icon, col, a, b, tm, at], i) => {
                  // newest on top: later rows push the earlier ones down
                  const push = [2.2, 1.5, 0.8].slice(0, i).reduce((acc, x) => acc + prog(t, x, x + 0.5, E.move), 0);
                  return (
                    <div key={a as string} style={{ position: 'absolute', left: 0, right: 0, top: push * 88, ...rowIn(t, at as number) }}>
                      <EventRow icon={ic(icon as typeof ViewIcon, col as string)} title={a as string} sub={b as string} time={tm as string} wash={i === 0 ? diwaliWash : 0} />
                    </div>
                  );
                })}
              </div>
            </Card>
            <div style={{ position: 'absolute', left: 30, top: -82, transform: `scale(${lp.s})`, transformOrigin: '0 100%', opacity: lp.o }}>
              <Toast icon={Link01Icon} title="2 numbers, 1 profile" sub="+91 90000 12399 merged" size={29} tone={C.violet} />
            </div>
            <div style={{ position: 'absolute', right: 30, bottom: -60, transform: `scale(${rp.s})`, transformOrigin: '100% 100%', opacity: rp.o }}>
              <Toast icon={UserGroupIcon} title="In 3 segments" sub="Repeat buyers · VIP · Ethnic wear" size={29} />
            </div>
          </div>
        </Layer>
      </Camera>
    </div>
  );
}

/* ================================================================= 04-T1 */
export function T1({ t }: { t: number }) {
  const ev: [typeof ViewIcon, string, string, string, string, number][] = [
    [PackageIcon, C.sky, 'Order #2198 · ₹1,890', 'Paid with UPI', 'now', 2.2],
    [Message01Icon, C.emerald, 'Replied on WhatsApp', '“Is the blue one in M?”', '1h', 1.4],
    [ViewIcon, C.violet, 'Viewed Linen kurta', '3 times · website pixel', '2h', 0.6],
  ];
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="orchid" pattern="rings" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <ProfileHead name="Ananya Rao" sub="Customer since 2024" color="#0284C7" size={0.9} />
          <div style={{ position: 'relative', height: 300 }}>
            <div style={{ position: 'absolute', left: 45, top: 20, bottom: 20, borderLeft: `2px solid ${C.line}` }} />
            {ev.map(([icon, col, a, b, tm, at], i) => {
              const push = ev.slice(0, i).reduce((acc, e) => acc + prog(t, e[5], e[5] + 0.5, E.move), 0);
              return (
                <div key={a} style={{ position: 'absolute', left: 0, right: 0, top: push * 96, ...rowIn(t, at) }}>
                  <EventRow icon={ic(icon, col)} title={a} sub={b} time={tm} size={1.02} />
                </div>
              );
            })}
          </div>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 04-T2 */
export function T2({ t }: { t: number }) {
  const chip = spring(t, 2.6, 0.55, 0.18);
  const cp = pop(chip);
  const row = (icon: typeof ViewIcon, a: string, b: string, at: number) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 22px', borderRadius: 20, boxShadow: `0 0 0 1.5px ${C.line}`, marginBottom: 14, ...rowIn(t, at) }}>
      <Icon icon={icon} size={36} />
      <div style={{ flex: 1 }}><div style={{ fontSize: 30, fontWeight: 600 }}>{a}</div><div style={{ fontSize: 24, color: C.muted, marginTop: 2 }}>{b}</div></div>
      <Toggle on={prog(t, at + 0.35, at + 0.6, E.move)} />
    </div>
  );
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="ocean" pattern="lines" w={T} h={T} />
      <Layer x={540} y={500}>
        <Card w={860}>
          <CardHeader icon={FilterHorizontalIcon} title="High-intent carts" size={34} right={<Chip tone="violet" dot size={22}>1,240</Chip>} />
          <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: '0.12em', color: C.muted, marginBottom: 14 }}>USED IN</div>
          {row(Megaphone01Icon, 'Diwali sale', 'Campaign · sends 7:30 pm', 0.8)}
          {row(FlowConnectionIcon, 'Cart recovery', 'Journey · 3 steps', 1.6)}
        </Card>
      </Layer>
      <Layer x={540} y={850} s={cp.s} o={cp.o}>
        <Chip tone="emerald" icon={CheckmarkCircle02Icon} size={27}>Updates live as shoppers qualify</Chip>
      </Layer>
    </div>
  );
}

/* ================================================================= 04-T3 */
export function T3({ t }: { t: number }) {
  const sig: [typeof ViewIcon, string, number, number][] = [
    [ShoppingCart01Icon, 'Cart ₹3,450', 30, 0.5],
    [ViewIcon, 'Viewed 6 items', 24, 1.2],
    [PackageIcon, '3 past orders', 32, 1.9],
  ];
  const total = sig.reduce((acc, [, , p, at]) => acc + p * prog(t, at + 0.2, at + 0.8, E.move), 0);
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="dawn" pattern="mesh" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <ProfileHead name="Ishaan Gupta" sub="Last seen 2 hours ago" color="#7C3AED" size={0.9} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
            <Donut k={total / 100} value={total} size={250} />
            <div style={{ flex: 1 }}>
              {sig.map(([icon, a, p, at], i) => (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderTop: i ? `1.5px solid ${C.line}` : undefined, ...rowIn(t, at) }}>
                  <Icon icon={icon} size={32} />
                  <span style={{ flex: 1, fontSize: 28 }}>{a}</span>
                  <b style={{ fontSize: 30, color: C.emerald }}>+{p}</b>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 04-S1 */
export function S1({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const unk = spring(t, 0.6, 0.6, 0.16) * (1 - prog(t, 2.3, 2.6));
  const up = pop(unk);
  const merged = spring(t, 2.6, 0.6, 0.18);
  const dark = spring(t, 3.4, 0.6, 0.16);
  const dp = pop(dark);
  const row = (icon: typeof ViewIcon, a: string, b: string, right?: ReactNode, active = 0, style?: CSSProperties) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '20px 22px', borderRadius: 22, background: active ? `rgba(5,150,105,${0.06 * active})` : '#fff', boxShadow: `0 0 0 ${1.5 + active}px ${active ? `rgba(5,150,105,${0.45 * active})` : C.line}`, marginBottom: 14, ...style }}>
      <Icon icon={icon} size={36} color={active ? C.emerald : C.ink2} />
      <div style={{ flex: 1 }}><div style={{ fontSize: 31, fontWeight: 600 }}>{a}</div><div style={{ fontSize: 25, color: C.muted, marginTop: 2 }}>{b}</div></div>
      {right}
    </div>
  );
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="sunrise" pattern="dots" w={W} h={h} />
      <Layer x={960} y={CY} s={1.12}>
        <div style={{ position: 'relative' }}>
          <Card w={980} pad={38}>
            <ProfileHead name="Riya Sharma" sub="Customer since 2023 · 7 orders" color="#BE185D" size={0.95} />
            {row(SmartPhone01Icon, '+91 90000 12345', 'Primary · WhatsApp')}
            {row(Mail01Icon, 'riya.s@example.in', 'Shopify email')}
            <div style={{ ...rowIn(t, 2.6) }}>
              {row(SmartPhone01Icon, '+91 90000 12399', 'Secondary · matched on order #2160', <span style={{ opacity: clamp(merged * 2) }}><Chip tone="emerald" icon={CheckmarkCircle02Icon} size={22}>Merged</Chip></span>, prog(t, 2.6, 3.0) * (1 - prog(t, 6, 7)))}
            </div>
          </Card>
          <div style={{ position: 'absolute', left: 40, top: -78, transform: `scale(${up.s})`, transformOrigin: '0 100%', opacity: up.o }}>
            <Toast icon={Message01Icon} title="New chat · +91 90000 12399" sub="Unknown number" size={28} tone="#D97706" />
          </div>
          <div style={{ position: 'absolute', right: -40, bottom: -60, transform: `scale(${dp.s})`, transformOrigin: '100% 100%', opacity: dp.o }}>
            <Toast icon={UserCheck01Icon} title="1 profile, 1 thread" sub="Chat history moved to Riya" size={28} dark />
          </div>
        </div>
      </Layer>
    </div>
  );
}

/* ================================================================= 04-S2 */
export function S2({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const camp: [string, string, ReactNode, number][] = [
    ['Diwali sale', 'Clicked, ordered', <Chip key="a" tone="emerald" size={20}>₹2,190</Chip>, 2.0],
    ['New arrivals', 'Read', <Chip key="b" size={20}>Read</Chip>, 2.5],
    ['Cart recovery', 'Journey · step 2', <Chip key="c" tone="amber" dot size={20}>Active</Chip>, 3.0],
  ];
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="iris" pattern="beams" w={W} h={h} />
      <Layer x={960} y={CY} s={1.0}>
        <Card w={1180} pad={40}>
          <ProfileHead name="Arjun Nair" sub="+91 90000 12351 · Bengaluru" color="#0F766E" right={<Chip tone="violet" size={24}>Score 84</Chip>} />
          <div style={{ display: 'flex', gap: 30 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 20 }}>
                <Stat label="Orders" value={String(Math.round(countUp(t, 0.4, 5, 1.0)))} size={0.95} />
                <Stat label="Spent" value={`₹${inr(Math.round(countUp(t, 0.4, 12960, 1.3)))}`} size={0.95} />
              </div>
              <div style={{ marginTop: 18 }}>
                <EventRow icon={ic(ShoppingBag02Icon, C.sky)} title="#2185 · ₹2,190" sub="Delivered · 2 days ago" style={rowIn(t, 0.9)} />
                <EventRow icon={ic(Message01Icon, C.emerald)} title="Last chat" sub="Wants a size exchange" wash={prog(t, 1.4, 1.8) * (1 - prog(t, 5, 6))} style={rowIn(t, 1.4)} />
              </div>
            </div>
            <div style={{ flex: 1, background: C.sunk, borderRadius: 24, padding: '20px 24px' }}>
              <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: '0.12em', color: C.muted, marginBottom: 8 }}>CAMPAIGNS</div>
              {camp.map(([a, b, chip, at], i) => (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderTop: i ? `1.5px solid ${C.line}` : undefined, ...rowIn(t, at) }}>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 28, fontWeight: 600 }}>{a}</div><div style={{ fontSize: 23, color: C.muted }}>{b}</div></div>
                  {chip}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 04-S3 */
export function S3({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const rules: [typeof ViewIcon, string, string, number][] = [
    [ShoppingBag02Icon, 'Orders 2 or more', 'Shopify', 0.6],
    [PackageIcon, 'Last order in 60 days', 'Shopify', 1.3],
    [Message01Icon, 'Opted in on WhatsApp', 'Consent recorded', 2.0],
  ];
  const count = keys(t, [[0.6, 0], [1.1, 8904], [1.3, 8904], [1.8, 4812], [2.0, 4812], [2.5, 3126]], E.enter);
  const cur = cursorAt(t, [[2.4, 1500, h - 100], [3.45, 1300, CY + 250], [4.4, 1300, CY + 250], [5.2, 1680, h + 60]], [3.6]);
  const saved = prog(t, 3.65, 3.85);
  const tst = spring(t, 4.3, 0.6, 0.16);
  const tp = pop(tst);
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="mint" pattern="grid" w={W} h={h} />
      <Layer x={960} y={CY} s={1.08}>
        <div style={{ position: 'relative' }}>
          <Card w={1000} pad={38}>
            <CardHeader icon={FilterHorizontalIcon} title="New segment" size={36} />
            <div style={{ height: 3 * 112 }}>
              {rules.map(([icon, a, b, at]) => (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '18px 22px', borderRadius: 22, boxShadow: `0 0 0 1.5px ${C.line}`, marginBottom: 14, ...rowIn(t, at) }}>
                  <Icon icon={icon} size={36} color={C.violet} />
                  <div style={{ flex: 1 }}><div style={{ fontSize: 30, fontWeight: 600 }}>{a}</div><div style={{ fontSize: 24, color: C.muted, marginTop: 2 }}>{b}</div></div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C.sunk, borderRadius: 22, padding: '18px 24px', marginTop: 8 }}>
              <div>
                <div style={{ fontSize: 24, color: C.muted }}>Matching shoppers</div>
                <div style={{ fontFamily: DISPLAY, fontSize: 56, fontWeight: 600, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{inr(Math.round(count))}</div>
              </div>
              <span style={{ position: 'relative', width: 260, height: 64, display: 'inline-block' }}>
                <span style={{ position: 'absolute', right: 0, top: 0, opacity: 1 - saved }}><Pill kind="primary" size={25} press={cur.press}>Save segment</Pill></span>
                <span style={{ position: 'absolute', right: 0, top: 8, opacity: saved }}><Chip tone="emerald" icon={CheckmarkCircle02Icon} size={24}>Saved</Chip></span>
              </span>
            </div>
          </Card>
          <div style={{ position: 'absolute', right: -40, top: -64, transform: `scale(${tp.s})`, transformOrigin: '100% 0', opacity: tp.o }}>
            <Toast icon={Megaphone01Icon} title="Ready to message" sub="Campaigns · Journeys" size={29} />
          </div>
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 2.4, 2.65) * (1 - prog(t, 4.9, 5.2))} s={1.8} />
    </div>
  );
}

export const crm = {
  '04-H': { w: W, h: 1080, duration: 15, Component: H },
  'home-identity': { w: W, h: 1080, duration: 15, Component: H },
  '04-T1': { w: T, h: T, duration: 7.5, Component: T1 },
  '04-T2': { w: T, h: T, duration: 7.5, Component: T2 },
  '04-T3': { w: T, h: T, duration: 7.5, Component: T3 },
  '04-S1': { w: W, h: 1200, duration: 12.5, Component: S1 },
  '04-S2': { w: W, h: 1200, duration: 12.5, Component: S2 },
  '04-S3': { w: W, h: 1200, duration: 12.5, Component: S3 },
  'home-segments': { w: W, h: 1080, duration: 12.5, Component: S3 },
};
