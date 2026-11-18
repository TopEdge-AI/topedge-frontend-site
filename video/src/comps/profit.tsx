/**
 * Chapter 11 — Profit & costs (docs/video/feature-library/ch11_profit_costs.md).
 * 11-H doubles as the home "Net Profit After RTO" film. Every figure closes.
 */
import type { CSSProperties, ReactNode } from 'react';
import {
  ArrowDataTransferHorizontalIcon, Calendar03Icon, Layers01Icon, PackageIcon, PercentSquareIcon, Wallet01Icon,
} from '@hugeicons/core-free-icons';
import { SiMeta, SiRazorpay, SiShopify } from 'react-icons/si';
import { E, clamp, keys, lerp, prog, spring, typed, useSize } from '../lib/time';
import { Backdrop, C, Card, CardHeader, Chip, Cursor, DISPLAY, FONT, Icon, Layer, Pill, Toast, pop } from '../lib/ui';
import { Donut, KV, KurtaShot, Spark, countUp, inr, rowIn } from '../lib/kit2';
import { cursorAt } from '../lib/rig';
import { At, Caption, Glass, Kinetic, Lens, Studio, studioInk, type CamKey } from '../lib/cine';

const T = 1080;
const W = 1920;
const GRAD: Record<string, string> = {
  cost: 'linear-gradient(180deg,#CBD5E1,#94A3B8)',
  risk: 'linear-gradient(180deg,#FDA4AF,#E11D48)',
  total: 'linear-gradient(180deg,#A78BFA,#6D28D9)',
  net: 'linear-gradient(180deg,#6EE7B7,#059669)',
};

type Col = { label: string; from: number; to: number; kind: keyof typeof GRAD; at: number; value: string };

/** Waterfall: each bar grows from `from` to `to` (₹), drawn on a 0..max axis. */
function Waterfall({ t, cols, max, h, colW, gap }: { t: number; cols: Col[]; max: number; h: number; colW: number; gap: number }) {
  const y = (v: number) => h - (v / max) * h;
  return (
    <div style={{ position: 'relative', height: h + 60, width: cols.length * (colW + gap) - gap, fontFamily: FONT }}>
      {[0.25, 0.5, 0.75, 1].map((g) => <div key={g} style={{ position: 'absolute', left: 0, right: 0, top: h - g * h, height: 1.5, background: 'rgba(16,24,40,0.06)' }} />)}
      <div style={{ position: 'absolute', left: 0, right: 0, top: h, height: 2, background: 'rgba(16,24,40,0.12)' }} />
      {cols.map((c, i) => {
        const k = prog(t, c.at, c.at + 0.7, E.enter);
        const cur = lerp(c.from, c.to, k);
        const top = y(Math.max(c.from, cur));
        const bot = y(Math.min(c.from, cur));
        const left = i * (colW + gap);
        return (
          <div key={c.label}>
            <div style={{ position: 'absolute', left, width: colW, top, height: Math.max(0, bot - top), borderRadius: 12, background: GRAD[c.kind], opacity: k > 0 ? 1 : 0 }} />
            <div style={{ position: 'absolute', left: left - 20, width: colW + 40, top: top - 46, textAlign: 'center', fontSize: 28, fontWeight: 700, fontVariantNumeric: 'tabular-nums', opacity: prog(t, c.at + 0.3, c.at + 0.7) }}>{c.value}</div>
            <div style={{ position: 'absolute', left: left - 20, width: colW + 40, top: h + 16, textAlign: 'center', fontSize: 24, color: C.muted }}>{c.label}</div>
          </div>
        );
      })}
    </div>
  );
}

const sat = (k: number, node: ReactNode, style: CSSProperties, origin: string) => {
  const p = pop(k);
  return <div style={{ position: 'absolute', transform: `scale(${p.s})`, transformOrigin: origin, opacity: p.o, ...style }}>{node}</div>;
};

/* ================================================================= 11-H */
/** Cinematic: macro on the ₹799 COD order → track along the costs → ₹179. */
export function H({ t }: { t: number }) {
  const { h } = useSize();
  const ink = studioInk('sand');
  const base = 880; // stage floor line in world px
  const scale = 2.25; // px per ₹
  const bars: [string, number, number, keyof typeof GRAD, number, string][] = [
    ['Packing', 0, 13, 'cost', 2.7, '₹13'],
    ['Freight', 13, 98, 'cost', 3.3, '₹85'],
    ['COD fee', 98, 128, 'cost', 3.9, '₹30'],
    ['RTO share', 128, 166, 'risk', 4.5, '₹38'],
    ['Support', 166, 179, 'risk', 5.1, '₹13'],
    ['True cost', 0, 179, 'total', 5.8, '₹179'],
  ];
  const x0 = 860, step = 150, bw = 104;
  const cam: CamKey[] = [
    [0, 520, 470, 2.25, 6, -16, -2],
    [1.7, 540, 480, 1.95, 6, -14, -2],
    [2.7, 930, 660, 1.42, 8, -12, 0],
    [5.2, 1420, 620, 1.38, 6, -8, 0],
    [6.6, 1280, 400, 1.42, 2, -3, 0],
    [8.4, 1080, 520, 1.08, 3, -6, 0],
    [15.5, 1080, 520, 1.12, 2, -4, 0],
  ];
  const big = spring(t, 6.1, 0.7, 0.14);
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Studio t={t} tone="sand" w={W} h={h} spot={[45, 38]} />
      <Lens t={t} w={W} h={h} keys={cam}>
        {/* the order ticket */}
        <At x={520} y={500} z={40}>
          <div style={{ width: 400, borderRadius: 34, background: '#fff', padding: 18, boxShadow: '0 50px 90px -40px rgba(80,50,20,0.45), 0 0 0 1.5px rgba(80,50,20,0.06)' }}>
            <div style={{ height: 250, borderRadius: 22, overflow: 'hidden' }}><KurtaShot /></div>
            <div style={{ padding: '18px 8px 6px' }}>
              <div style={{ fontSize: 30, fontWeight: 600, color: ink.ink }}>Cotton kurta</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontFamily: DISPLAY, fontSize: 56, fontWeight: 600, letterSpacing: '-0.035em', color: ink.ink }}>₹799</span>
                <Chip tone="amber" size={20}>Cash on delivery</Chip>
              </div>
              <div style={{ fontSize: 21, color: C.muted, marginTop: 6 }}>Order #2236</div>
            </div>
          </div>
        </At>
        {/* gridlines + floor */}
        {[50, 100, 150, 200].map((g) => (
          <div key={g} style={{ position: 'absolute', left: x0 - 50, width: step * 6 + 20, top: base - g * scale, height: 1.5, background: 'rgba(80,50,20,0.08)' }} />
        ))}
        <div style={{ position: 'absolute', left: x0 - 50, width: step * 6 + 20, top: base, height: 2.5, background: 'rgba(80,50,20,0.22)' }} />
        {bars.map(([label, from, to, kind, at, v], i) => {
          const k = prog(t, at, at + 0.75, E.enter);
          const cur = lerp(from, to, k);
          const top = base - Math.max(from, cur) * scale;
          const height = Math.abs(cur - from) * scale;
          const left = x0 + i * step - bw / 2;
          const lab = spring(t, at + 0.35, 0.55, 0.2);
          return (
            <div key={label}>
              <div style={{ position: 'absolute', left, top, width: bw, height, borderRadius: 16, background: GRAD[kind], boxShadow: k > 0 ? '0 24px 40px -22px rgba(60,30,10,0.45), inset 0 1.5px 0 rgba(255,255,255,0.45)' : undefined }} />
              <div style={{ position: 'absolute', left: left - 30, width: bw + 60, top: base + 18, textAlign: 'center', fontSize: 23, color: ink.sub, opacity: prog(t, at - 0.2, at + 0.2) }}>{label}</div>
              <At x={left + bw / 2} y={top - 40} z={60} s={lerp(0.8, 1, lab)} o={clamp(lab * 2)}>
                <Glass pad="8px 16px" r={14}><span style={{ fontSize: 26, fontWeight: 700, color: ink.ink, fontVariantNumeric: 'tabular-nums' }}>{v}</span></Glass>
              </At>
            </div>
          );
        })}
        {/* the reveal */}
        <At x={1250} y={250} z={120} o={clamp(big * 1.4)} s={lerp(0.92, 1, big)}>
          <div style={{ textAlign: 'center' }}>
            <Kinetic text="₹179" t={t} at={6.1} size={210} color={ink.ink} />
            <Caption color={ink.sub} size={30} style={{ marginTop: 12, opacity: prog(t, 6.7, 7.2) }}>true cost of one ₹799 COD order</Caption>
            <div style={{ marginTop: 16, opacity: prog(t, 7.2, 7.7) }}><Chip tone="rose" size={22}>2.1× the ₹85 freight you see</Chip></div>
          </div>
        </At>
      </Lens>
    </div>
  );
}

/* ================================================================= 11-T1 */
export function T1({ t }: { t: number }) {
  const cogs = typed('310', t, 0.8, 7);
  const pack = typed('13', t, 1.5, 7);
  const unit = countUp(t, 2.2, 323, 0.8);
  const field = (label: string, v: string, active: boolean) => (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 24, color: C.muted, marginBottom: 8 }}>{label}</div>
      <div style={{ height: 76, borderRadius: 18, boxShadow: `inset 0 0 0 ${active ? 2.5 : 1.5}px ${active ? C.violet : 'rgba(16,24,40,0.12)'}`, display: 'flex', alignItems: 'center', padding: '0 22px', fontSize: 34, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
        ₹ {v}{active && Math.floor(t * 2) % 2 === 0 ? <span style={{ width: 2.5, height: 36, background: C.violet, marginLeft: 3 }} /> : null}
      </div>
    </div>
  );
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="coral" pattern="beams" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingBottom: 22, marginBottom: 26, borderBottom: `1.5px solid ${C.line}` }}>
            <div style={{ width: 74, height: 74, borderRadius: 16, overflow: 'hidden' }}><KurtaShot /></div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 33, fontWeight: 600 }}>Cotton kurta</div><div style={{ fontSize: 24, color: C.muted }}>Sells at ₹799</div></div>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 22, fontWeight: 600, color: '#008060' }}><SiShopify size={26} color="#5E8E3E" />Synced</span>
          </div>
          <div style={{ display: 'flex', gap: 22 }}>
            {field('COGS', cogs, t > 0.6 && t < 1.45)}
            {field('Packaging', pack, t >= 1.45 && t < 2.2)}
          </div>
          <div style={{ marginTop: 26, paddingTop: 20, borderTop: `1.5px solid ${C.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', ...rowIn(t, 2.2) }}>
            <span style={{ fontSize: 30, fontWeight: 600 }}>Unit cost</span>
            <span style={{ fontFamily: DISPLAY, fontSize: 58, fontWeight: 600, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>₹{Math.round(unit)}</span>
          </div>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 11-T2 */
export function T2({ t }: { t: number }) {
  const rows: [ReactNode, string, string, string, number][] = [
    [<SiRazorpay key="r" size={34} color="#0C2451" />, 'Payment gateway', 'Razorpay', '2%', 0.5],
    [<SiShopify key="s" size={34} color="#5E8E3E" />, 'Platform fee', 'Shopify Basic', '₹0', 1.1],
    [<SiMeta key="m" size={34} color="#0866FF" />, 'Ads per order', 'Meta, last 30 days', '₹62', 1.7],
  ];
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="bloom" pattern="grid" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={860}>
          <CardHeader icon={PercentSquareIcon} title="Fees" size={34} right={<Chip size={21}>Pulled in automatically</Chip>} />
          {rows.map(([mark, a, b, v, at]) => (
            <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '20px 22px', borderRadius: 20, boxShadow: `0 0 0 1.5px ${C.line}`, marginBottom: 14, ...rowIn(t, at) }}>
              <span style={{ width: 44, display: 'grid', placeItems: 'center' }}>{mark}</span>
              <div style={{ flex: 1 }}><div style={{ fontSize: 30, fontWeight: 600 }}>{a}</div><div style={{ fontSize: 24, color: C.muted }}>{b}</div></div>
              <b style={{ fontSize: 34, fontVariantNumeric: 'tabular-nums' }}>{v}</b>
            </div>
          ))}
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 11-T3 */
export function T3({ t }: { t: number }) {
  const k = prog(t, 0.5, 1.9, E.enter);
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="dusk" pattern="rings" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <CardHeader icon={ArrowDataTransferHorizontalIcon} title="COD and returns" size={34} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
            <div style={{ textAlign: 'center' }}>
              <Donut k={0.3 * k} value={30 * k} size={230} color={C.rose} />
              <div style={{ fontSize: 23, color: C.muted, marginTop: 8 }}>RTO rate on COD, %</div>
            </div>
            <div style={{ flex: 1 }}>
              <KV k="Forward freight" v={`₹${Math.round(countUp(t, 1.0, 85, 0.8))}`} size={29} />
              <KV k="Return freight" v={`₹${Math.round(countUp(t, 1.3, 40, 0.8))}`} size={29} line />
              <div style={{ ...rowIn(t, 1.9) }}><KV k="Lost per RTO" v={`₹${Math.round(countUp(t, 1.9, 125, 0.7))}`} size={33} line bold color={C.rose} /></div>
            </div>
          </div>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 11-S1 */
export function S1({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const cur = cursorAt(t, [[0.4, 1400, h - 120], [1.0, 1205, CY - 210], [1.7, 1205, CY - 210], [2.6, 1600, h + 60]], [1.05]);
  const sw = prog(t, 1.08, 1.4, E.move) * (1 - prog(t, 12.4, 12.8, E.move));
  const k = prog(t, 1.1, 2.4, E.enter);
  const kpi = lerp(812, 3562, k);
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="rose" pattern="lines" w={W} h={h} />
      <Layer x={960} y={CY} s={1.0}>
        <div style={{ position: 'relative' }}>
          <Card w={1180} pad={42}>
            <CardHeader icon={Wallet01Icon} title="Net profit" size={36} right={
              <span style={{ position: 'relative', display: 'inline-flex', background: '#F0F0F3', borderRadius: 99, padding: 5 }}>
                <span style={{ position: 'absolute', top: 5, bottom: 5, left: 5 + sw * 150, width: 150, borderRadius: 99, background: '#fff', boxShadow: '0 2px 6px rgba(16,24,40,0.15)' }} />
                {['7 days', '30 days', '90 days'].map((p) => <span key={p} style={{ position: 'relative', width: 150, textAlign: 'center', padding: '10px 0', fontSize: 23, fontWeight: 600 }}>{p}</span>)}
              </span>
            } />
            <div style={{ display: 'flex', gap: 34 }}>
              <div style={{ flex: 1.1 }}>
                <div style={{ fontSize: 26, color: C.muted }}>After COGS, COD, RTO and ads</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <span style={{ fontFamily: DISPLAY, fontSize: 84, fontWeight: 600, letterSpacing: '-0.035em', fontVariantNumeric: 'tabular-nums' }}>₹{inr(Math.round(kpi))}</span>
                  <span style={{ opacity: k }}><Chip tone="emerald" size={22}>+8.7% vs prior 30 days</Chip></span>
                </div>
                <div style={{ marginTop: 14 }}><Spark pts={[10, 12, 9, 15, 18, 16, 22, 25, 23, 29, 33, 38]} w={540} h={140} k={prog(t, 1.2, 2.6, E.move)} color={C.emerald} /></div>
              </div>
              <div style={{ flex: 0.9, background: C.sunk, borderRadius: 24, padding: '14px 26px' }}>
                <KV k="Revenue" v={`₹${inr(Math.round(lerp(3720, 16349, k)))}`} size={29} />
                <KV k="Orders" v={String(Math.round(lerp(11, 48, k)))} size={29} line />
                <KV k="AOV" v={`₹${Math.round(lerp(338, 341, k))}`} size={29} line />
                <KV k="Margin" v={`${lerp(21.8, 21.8, k).toFixed(1)}%`} size={29} line bold color={C.emerald} />
              </div>
            </div>
          </Card>
          {sat(spring(t, 2.6, 0.6, 0.16), <Toast icon={Calendar03Icon} title="Every rupee in" sub="Shopify, courier, gateway and Meta" size={29} tone={C.violet} />, { left: 30, bottom: -60 }, '0 100%')}
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.4, 0.65) * (1 - prog(t, 2.3, 2.6))} s={1.8} />
    </div>
  );
}

/* ================================================================= 11-S2 */
export function S2({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const cols: Col[] = [
    { label: 'Revenue', from: 0, to: 16349, kind: 'total', at: 0.8, value: '₹16,349' },
    { label: 'COGS', from: 16349, to: 9809, kind: 'cost', at: 1.5, value: '₹6,540' },
    { label: 'Shipping', from: 9809, to: 7399, kind: 'cost', at: 2.1, value: '₹2,410' },
    { label: 'COD, RTO', from: 7399, to: 5419, kind: 'risk', at: 2.7, value: '₹1,980' },
    { label: 'Ads', from: 5419, to: 3562, kind: 'cost', at: 3.3, value: '₹1,857' },
    { label: 'Net', from: 0, to: 3562, kind: 'net', at: 4.0, value: '₹3,562' },
  ];
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="orchid" pattern="mesh" w={W} h={h} />
      <Layer x={960} y={CY + 10} s={1.0}>
        <div style={{ position: 'relative' }}>
          <Card w={1180} pad={42}>
            <CardHeader icon={Layers01Icon} title="Cost waterfall" size={36} right={<Chip size={23}>Last 30 days</Chip>} />
            <div style={{ paddingTop: 40 }}><Waterfall t={t} cols={cols} max={17500} h={420} colW={130} gap={52} /></div>
          </Card>
          {sat(spring(t, 4.6, 0.6, 0.16), <Toast icon={PackageIcon} title="Biggest cost: COGS" sub="40% of revenue" size={29} tone={C.ink2} />, { right: 30, top: -64 }, '100% 0')}
        </div>
      </Layer>
    </div>
  );
}

/* ================================================================= 11-S3 */
export function S3({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const cur = cursorAt(t, [[0.4, 1450, h - 100], [1.1, 1300, CY - 196], [1.8, 1300, CY - 196], [2.6, 1650, h + 60]], [1.2]);
  const flip = prog(t, 1.25, 1.75, E.move);
  const rowH = 108;
  // initial order: kurta 0, juttis 1, saree 2 → after sort: saree 0, juttis 1, kurta 2
  const rows: [string, string, string, string, 'emerald' | 'rose' | 'neutral', number, number][] = [
    ['Cotton kurta', '24 sold', '₹6,520 profit', '34%', 'emerald', 0, 2],
    ['Block print juttis', '18 sold', '₹2,372 profit', '22%', 'emerald', 1, 1],
    ['Silk saree', '6 sold', '₹1,349 loss', '−9%', 'rose', 2, 0],
  ];
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="ocean" pattern="dots" w={W} h={h} />
      <Layer x={960} y={CY} s={1.1}>
        <div style={{ position: 'relative' }}>
          <Card w={1060} pad={38}>
            <CardHeader icon={PackageIcon} title="Products · Last 90 days" size={34} right={<Pill kind="secondary" size={23} press={cur.press} icon={ArrowDataTransferHorizontalIcon}>Margin</Pill>} />
            <div style={{ position: 'relative', height: rowH * 4 }}>
              {rows.map(([name, sold, profit, m, tone, a, b]) => {
                const y = lerp(a, b, flip) * rowH;
                const active = name === 'Silk saree' ? flip : 0;
                return (
                  <div key={name} style={{ position: 'absolute', left: 0, right: 0, top: y, display: 'flex', alignItems: 'center', gap: 20, padding: '16px 18px', borderRadius: 20, background: active ? `rgba(225,29,72,${0.05 * active})` : '#fff', boxShadow: `0 0 0 ${1.5 + active}px ${active ? `rgba(225,29,72,${0.35 * active})` : C.line}` }}>
                    <div style={{ width: 64, height: 64, borderRadius: 14, overflow: 'hidden' }}><KurtaShot /></div>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 29, fontWeight: 600 }}>{name}</div><div style={{ fontSize: 23, color: C.muted }}>{sold} · {profit}</div></div>
                    <Chip tone={tone} size={23}>{m}</Chip>
                  </div>
                );
              })}
              <div style={{ position: 'absolute', left: 0, right: 0, top: rowH * 3, display: 'flex', alignItems: 'center', gap: 20, padding: '16px 18px', borderRadius: 20, boxShadow: `0 0 0 1.5px ${C.line}`, ...rowIn(t, 2.6) }}>
                <div style={{ width: 64, height: 64, borderRadius: 14, overflow: 'hidden', opacity: 0.7 }}><KurtaShot /></div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 29, fontWeight: 600 }}>Block print top</div><div style={{ fontSize: 23, color: C.muted }}>No COGS yet</div></div>
                <Chip tone="amber" dot size={23}>Add COGS</Chip>
              </div>
            </div>
          </Card>
          {sat(spring(t, 3.2, 0.6, 0.16), <Toast icon={Wallet01Icon} title="Silk saree loses ₹225 an order" sub="RTO on COD is 42%" size={28} dark />, { right: 30, bottom: -60 }, '100% 100%')}
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.4, 0.65) * (1 - prog(t, 2.3, 2.6))} s={1.8} />
    </div>
  );
}

export const profit = {
  '11-H': { w: W, h: 1080, duration: 15, Component: H },
  'home-profit': { w: W, h: 1080, duration: 15, Component: H },
  '11-T1': { w: T, h: T, duration: 7.5, Component: T1 },
  '11-T2': { w: T, h: T, duration: 7.5, Component: T2 },
  '11-T3': { w: T, h: T, duration: 7.5, Component: T3 },
  '11-S1': { w: W, h: 1200, duration: 12.5, Component: S1 },
  '11-S2': { w: W, h: 1200, duration: 12.5, Component: S2 },
  '11-S3': { w: W, h: 1200, duration: 12.5, Component: S3 },
};
