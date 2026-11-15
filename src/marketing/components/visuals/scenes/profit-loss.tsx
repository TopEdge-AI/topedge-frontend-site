/**
 * Profit & costs scenes: setup wizard, true cost per order and net profit after
 * COGS, COD, RTO and ads. Per-order figures are the ₹799 kurta worked example
 * from this page's proofTable; store-level figures are the product's sample
 * dataset. Keys are the image paths in productPages.ts.
 */
import type { CSSProperties, ReactNode } from 'react';
import {
  Banknote,
  BarChart3,
  Calculator,
  CheckCircle2,
  Droplet,
  Droplets,
  IndianRupee,
  Lightbulb,
  Lock,
  Megaphone,
  Package,
  Receipt,
  ShieldAlert,
  ShoppingBag,
  Sparkles,
  Sun,
  Truck,
  Undo2,
  type LucideProps,
} from 'lucide-react';
import type { ComponentType } from 'react';
import {
  Btn,
  Chip,
  Donut,
  Field,
  Float,
  IconTile,
  Meter,
  Node,
  Panel,
  Row,
  Spark,
  Stage,
  Stat,
  Toggle,
  type SceneMap,
  type SceneProps,
  type Tone,
} from '../kit';

/* ── Local bits ────────────────────────────────────────────────────────── */

const muted = '#5a6474';
const grid2: CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7em' };

const STEPS: { name: string; icon: ComponentType<LucideProps> }[] = [
  { name: 'Products', icon: Package },
  { name: 'Fees', icon: Receipt },
  { name: 'COD & returns', icon: Truck },
];

/** Setup wizard progress: done steps green, current step solid. */
function Steps({ at }: { at: 0 | 1 | 2 }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45em',
        padding: '0.45em',
        borderRadius: '99em',
        background: '#fff',
        boxShadow: '0 0 0 1px rgba(15,23,42,0.07), 0 0.8em 1.6em -0.9em rgba(30,20,80,0.25)',
      }}
    >
      {STEPS.map((s, i) => (
        <span key={s.name} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45em' }}>
          {i > 0 ? (
            <i style={{ width: '0.9em', height: 2, borderRadius: 2, background: i <= at ? '#34d399' : '#e2e8f0' }} />
          ) : null}
          {i < at ? (
            <Chip tone="emerald" icon={CheckCircle2}>{s.name}</Chip>
          ) : i === at ? (
            <Chip tone="violet" solid icon={s.icon}>{s.name}</Chip>
          ) : (
            <Chip tone="slate" icon={s.icon}>{s.name}</Chip>
          )}
        </span>
      ))}
    </div>
  );
}

/** Small ₹ input cell. */
function Money({ v, unit = '₹', after }: { v: string; unit?: string; after?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3em',
        minWidth: '4.4em',
        padding: '0.35em 0.6em',
        borderRadius: '0.6em',
        fontSize: '0.95em',
        background: '#fff',
        boxShadow: '0 0 0 1px rgba(15,23,42,0.1) inset',
      }}
    >
      {after ? null : <small style={{ color: muted, fontWeight: 500 }}>{unit}</small>}
      {v}
      {after ? <small style={{ color: muted, fontWeight: 500 }}>{unit}</small> : null}
    </span>
  );
}

type Col = { label: string; value: number; base: number; text: string; tone: Tone };

/** Waterfall chart. Bars grow in with the kit's bar animation. */
function Waterfall({ cols, max, height = 12 }: { cols: Col[]; max: number; height?: number }) {
  return (
    <div style={{ display: 'flex', gap: '0.55em', paddingTop: '1.6em' }}>
      {cols.map((c, i) => (
        <div key={c.label} style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="fv-bars" data-tone={c.tone} style={{ position: 'relative', width: '100%', height: `${height}em` }}>
            <i
              className="is-hi"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: `${(c.base / max) * 100}%`,
                height: `${(c.value / max) * 100}%`,
                minHeight: '0.4em',
                borderRadius: '0.35em',
                animationDelay: `calc(var(--fv-d, 0ms) + ${250 + i * 90}ms)`,
              }}
            />
            <b
              style={{
                position: 'absolute',
                left: '50%',
                bottom: `calc(${((c.base + c.value) / max) * 100}% + 0.35em)`,
                transform: 'translateX(-50%)',
                fontSize: '0.88em',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                color: 'var(--t-700)',
              }}
            >
              {c.text}
            </b>
          </div>
          <small style={{ marginTop: '0.55em', fontSize: '0.82em', color: muted, whiteSpace: 'nowrap' }}>{c.label}</small>
        </div>
      ))}
    </div>
  );
}

/** Period switcher. */
function Periods({ on = '30d' }: { on?: string }) {
  return (
    <span style={{ display: 'inline-flex', gap: '0.2em', padding: '0.25em', borderRadius: '0.8em', background: '#f1f5f9' }}>
      {['Today', '7d', '30d', '90d', 'All'].map((p) => (
        <span
          key={p}
          style={{
            padding: '0.25em 0.6em',
            borderRadius: '0.6em',
            fontSize: '0.88em',
            fontWeight: 600,
            color: p === on ? '#0c1222' : muted,
            background: p === on ? '#fff' : 'transparent',
            boxShadow: p === on ? '0 1px 2px rgba(15,23,42,0.12)' : 'none',
          }}
        >
          {p}
        </span>
      ))}
    </span>
  );
}

function Pct({ children, tone = 'emerald' }: { children: ReactNode; tone?: Tone }) {
  return <Chip tone={tone}>{children}</Chip>;
}

/* ── Hero (wide, 64em x 40em) ──────────────────────────────────────────── */

/** True cost of one ₹799 order, built up line by line. */
function TrueCost({ label }: SceneProps) {
  const cols: Col[] = [
    { label: 'Packing', value: 13, base: 0, text: '₹13', tone: 'amber' },
    { label: 'Freight', value: 85, base: 13, text: '₹85', tone: 'amber' },
    { label: 'COD fee', value: 30, base: 98, text: '₹30', tone: 'amber' },
    { label: 'Visible', value: 128, base: 0, text: '₹128', tone: 'slate' },
    { label: 'RTO', value: 38, base: 128, text: '₹38', tone: 'rose' },
    { label: 'Support', value: 13, base: 166, text: '₹13', tone: 'rose' },
    { label: 'True cost', value: 179, base: 0, text: '₹179', tone: 'rose' },
  ];
  return (
    <Stage label={label} tone="amber" shape="wide">
      <Float x={4} y={9} w={60} delay={0} z={3}>
        <Panel title="Where ₹799 went" icon={BarChart3} tone="amber" right={<Chip tone="amber" icon={ShoppingBag}>One kurta order</Chip>}>
          <Waterfall cols={cols} max={179} height={16} />
        </Panel>
      </Float>
      <Float x={68} y={8} w={28} delay={2} rotate={2} drift>
        <Panel>
          <Stat label="True cost per order" value="₹179" delta="Over 2x the ₹85 freight" tone="rose" />
        </Panel>
      </Float>
      <Float x={67} y={43} w={30} delay={4}>
        <Panel title="Key findings" icon={Lightbulb} tone="violet">
          <Row lead={<IconTile icon={Undo2} tone="rose" size="sm" />} title="RTO adds ₹38" sub="30% x ₹125 per return" />
          <Row lead={<IconTile icon={Package} tone="amber" size="sm" />} title="300g billed at 1 kg" sub="Volumetric weight" />
        </Panel>
      </Float>
      <Float x={8} y={86} delay={6}>
        <Chip tone="amber" solid icon={Receipt}>Invoice shows ₹128, you pay ₹179</Chip>
      </Float>
    </Stage>
  );
}

/* ── Bento tiles (square, 36em x 36em) ─────────────────────────────────── */

/** Step 1: Shopify products with COGS and packaging. */
function ProductsCogs({ label }: SceneProps) {
  const head: CSSProperties = { fontSize: '0.82em', fontWeight: 600, color: muted, minWidth: '5.3em', textAlign: 'left' };
  return (
    <Stage label={label} tone="violet">
      <Float x={6} y={6} delay={0}>
        <Steps at={0} />
      </Float>
      <Float x={5} y={22} w={90} delay={2} z={3}>
        <Panel title="Products" icon={Package} tone="violet" right={<><span style={head}>COGS</span><span style={head}>Packing</span></>}>
          <Row lead={<IconTile icon={Droplet} tone="amber" size="sm" />} title="Vitamin C Serum" sub="₹1,499 · 68% margin" right={<><Money v="480" /><Money v="45" /></>} active />
          <Row lead={<IconTile icon={Droplets} tone="sky" size="sm" />} title="Moisturizer" sub="₹899 · 69% margin" right={<><Money v="280" /><Money v="35" /></>} />
          <Row lead={<IconTile icon={Sparkles} tone="violet" size="sm" />} title="Niacinamide Toner" sub="₹699 · 70% margin" right={<><Money v="210" /><Money v="30" /></>} />
          <Row lead={<IconTile icon={Sun} tone="emerald" size="sm" />} title="SPF 50 Sunscreen" sub="₹799 · 69% margin" right={<><Money v="250" /><Money v="30" /></>} />
        </Panel>
      </Float>
      <Float x={6} y={86} delay={4}>
        <Chip tone="slate" icon={Lock}>Prices locked from Shopify</Chip>
      </Float>
      <Float x={67} y={85} delay={5}>
        <Btn primary tone="violet">Continue</Btn>
      </Float>
    </Stage>
  );
}

/** Step 2: fees and marketing. */
function Fees({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet">
      <Float x={6} y={6} delay={0}>
        <Steps at={1} />
      </Float>
      <Float x={5} y={22} w={90} delay={2} z={3}>
        <Panel title="Fees & marketing" icon={Receipt} tone="violet">
          <div style={grid2}>
            <Field label="Marketing (CAC)" value="₹100 per order" />
            <Field label="Gateway fee" value="2%" />
            <Field label="Shopify fee" value="0.5%" />
            <Field label="Fixed per order" value="₹13" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6em', marginTop: '0.9em', fontSize: '1em', fontWeight: 600 }}>
            GST on charts
            <Toggle tone="violet" />
            <span style={{ marginLeft: 'auto' }}>
              <Chip tone="violet">GST 18%</Chip>
            </span>
          </div>
        </Panel>
      </Float>
      <Float x={13} y={83} delay={5} drift>
        <Chip tone="amber" solid icon={Megaphone}>CAC: ₹10,000 ÷ 100 orders</Chip>
      </Float>
    </Stage>
  );
}

/** Step 3: COD and returns, the lines that eat D2C margin. */
function CodReturns({ label }: SceneProps) {
  return (
    <Stage label={label} tone="rose">
      <Float x={6} y={6} delay={0}>
        <Steps at={2} />
      </Float>
      <Float x={5} y={21} w={90} delay={2} z={3}>
        <Panel title="COD & returns" icon={Truck} tone="rose" right={<><Chip tone="emerald" dot>COD on</Chip><Toggle /></>}>
          <div style={grid2}>
            <Field label="COD RTO rate" value="30%" />
            <Field label="Loss per return" value="₹125" />
            <Field label="Delivery per order" value="₹85" />
            <Field label="COD fee" value="₹30" />
          </div>
        </Panel>
      </Float>
      <Float x={9} y={64} w={82} delay={4} drift>
        <Node icon={Undo2} tone="rose" title="₹38 RTO on every order" sub="30% RTO x ₹125 per return" active />
      </Float>
      <Float x={25} y={85} delay={6}>
        <Btn primary tone="violet" icon={Calculator}>Calculate my profits</Btn>
      </Float>
    </Stage>
  );
}

/* ── Showcases (wide, 64em x 40em) ─────────────────────────────────────── */

/** Net profit hero: status, true net vs prior period, supporting KPIs. */
function NetProfit({ label }: SceneProps) {
  return (
    <Stage label={label} tone="emerald" shape="wide">
      <Float x={4} y={6} delay={0}>
        <Periods on="30d" />
      </Float>
      <Float x={4} y={17} w={48} delay={1} z={3}>
        <Panel title="True net profit" icon={IndianRupee} tone="emerald" right={<Chip tone="emerald" dot>Profitable · 30d</Chip>}>
          <Stat label="After COGS, COD, RTO and ads" value="₹3,562" delta="+8.7% vs prior period" />
          <div style={{ marginTop: '0.9em' }}>
            <Spark points={[30, 38, 34, 46, 42, 55, 52, 63, 60, 72]} tone="emerald" height={9} />
          </div>
        </Panel>
      </Float>
      <Float x={56} y={17} w={40} delay={3} rotate={1}>
        <Panel title="This period" icon={BarChart3} tone="sky">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1em 1em' }}>
            <Stat label="Revenue" value="₹16,349" delta="+6.4%" />
            <Stat label="Orders" value="48" />
            <div>
              <Stat label="Margin" value="21.8%" />
              <div style={{ marginTop: '0.5em' }}>
                <Meter pct={22} tone="emerald" />
              </div>
            </div>
            <Stat label="AOV" value="₹341" />
          </div>
        </Panel>
      </Float>
      <Float x={58} y={78} w={36} delay={5} drift>
        <Node icon={ShieldAlert} tone="amber" title="Or: Setup needed" sub="Until every cost is in" />
      </Float>
    </Stage>
  );
}

/** Store-level waterfall from revenue to net profit, with findings. */
function CostWaterfall({ label }: SceneProps) {
  const cols: Col[] = [
    { label: 'Revenue', value: 16.3, base: 0, text: '₹16.3K', tone: 'indigo' },
    { label: 'COGS', value: 8.7, base: 7.6, text: '-₹8.7K', tone: 'rose' },
    { label: 'Delivery', value: 2.5, base: 5.1, text: '-₹2.5K', tone: 'rose' },
    { label: 'Fees', value: 0.6, base: 4.5, text: '-₹572', tone: 'amber' },
    { label: 'RTO', value: 0.3, base: 4.2, text: '-₹272', tone: 'amber' },
    { label: 'Ads', value: 0.4, base: 3.8, text: '-₹400', tone: 'amber' },
    { label: 'Other', value: 0.39, base: 3.41, text: '-₹390', tone: 'slate' },
    { label: 'Net', value: 3.6, base: 0, text: '₹3.6K', tone: 'emerald' },
  ];
  return (
    <Stage label={label} tone="amber" shape="wide">
      <Float x={4} y={10} w={57} delay={0} z={3}>
        <Panel title="Where your money went" icon={BarChart3} tone="amber" right={<Periods on="30d" />}>
          <Waterfall cols={cols} max={16.3} height={17} />
        </Panel>
      </Float>
      <Float x={65} y={10} w={31} delay={2}>
        <Panel title="Key findings" icon={Lightbulb} tone="violet">
          <Row lead={<IconTile icon={ShoppingBag} tone="rose" size="sm" />} title="Top cost: COGS" sub="Over half of revenue" />
          <Row lead={<IconTile icon={Undo2} tone="amber" size="sm" />} title="RTO cost ₹272" sub="This period, estimated" />
          <Row lead={<IconTile icon={Banknote} tone="emerald" size="sm" />} title="COD share 64%" sub="Of orders this period" />
        </Panel>
      </Float>
      <Float x={66} y={64} w={30} delay={4} drift>
        <Node icon={IndianRupee} tone="emerald" title="Net profit ₹3,562" sub="21.8% of revenue" active />
      </Float>
    </Stage>
  );
}

/** Product table: profit and margin per SKU, missing COGS last. */
function ProductTable({ label }: SceneProps) {
  const profit = (v: string, pct: number, label: string) => (
    <span style={{ display: 'flex', alignItems: 'center', gap: '0.8em' }}>
      <b style={{ color: '#047857', minWidth: '3.6em', textAlign: 'right' }}>{v}</b>
      <span style={{ width: '6em' }}>
        <Meter pct={pct} tone="violet" />
      </span>
      <small style={{ minWidth: '2.8em', color: muted, fontWeight: 600 }}>{label}</small>
    </span>
  );
  return (
    <Stage label={label} tone="violet" shape="wide">
      <Float x={4} y={10} w={64} delay={0} z={3}>
        <Panel title="Products" icon={Package} tone="violet" right={<Chip tone="slate">Profit, high to low</Chip>}>
          <Row lead={<IconTile icon={Droplet} tone="amber" size="sm" />} title="Vitamin C Serum" sub="₹6,200 revenue · 12 sold" right={profit('₹2,800', 90, '45.2%')} active />
          <Row lead={<IconTile icon={Droplets} tone="sky" size="sm" />} title="Moisturizer" sub="₹4,100 revenue · 9 sold" right={profit('₹1,800', 87, '43.9%')} />
          <Row lead={<IconTile icon={Sparkles} tone="violet" size="sm" />} title="Niacinamide Toner" sub="₹2,800 revenue · 7 sold" right={profit('₹1,200', 85, '42.9%')} />
          <Row lead={<IconTile icon={Sun} tone="emerald" size="sm" />} title="SPF 50 Sunscreen" sub="₹2,100 revenue · 5 sold" right={profit('₹900', 85, '42.9%')} />
          <Row lead={<IconTile icon={ShieldAlert} tone="slate" size="sm" />} title="Under Eye Gel" sub="No cost data yet" right={<Pct tone="amber">COGS missing</Pct>} />
        </Panel>
      </Float>
      <Float x={72} y={10} w={24} delay={2} rotate={2} drift>
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6em' }}>
            <Donut pct={45} tone="violet" size={8}>45%</Donut>
            <span style={{ fontSize: '0.95em', fontWeight: 600 }}>Best margin SKU</span>
          </div>
        </Panel>
      </Float>
      <Float x={71} y={56} w={26} delay={4}>
        <Node icon={ShieldAlert} tone="amber" title="1 SKU needs COGS" sub="Sinks to the bottom" />
      </Float>
      <Float x={6} y={85} delay={6}>
        <Chip tone="violet" solid icon={IndianRupee}>Revenue, cost, profit per SKU</Chip>
      </Float>
    </Stage>
  );
}

const scenes: SceneMap = {
  '/pnl/39.webp': TrueCost,
  '/pnl/28.webp': ProductsCogs,
  '/pnl/29.webp': Fees,
  '/pnl/30.webp': CodReturns,
  '/pnl/40.webp': NetProfit,
  '/pnl/41.webp': CostWaterfall,
  '/pnl/42.webp': ProductTable,
};

export default scenes;
