/**
 * Profit & costs scenes, v3 storytelling style (see flow-builder.tsx).
 *
 * Per-order numbers come from the ₹799 kurta proof table on the page (₹13
 * packing, ₹85 freight, ₹30 COD, ₹38 RTO, ₹13 support, ₹179 true cost).
 * Store-level sample figures (₹16,349 revenue, 48 orders, ₹3,562 net) appear
 * only where a store KPI is the point. Keys are the image paths in
 * productPages.ts.
 */
import type { CSSProperties } from 'react';
import { ArrowDownWideNarrow, Boxes, CalendarDays, Check, Layers, Percent, Shirt, Undo2, Wallet } from 'lucide-react';
import {
  Bars,
  Btn,
  Chip,
  Cursor,
  Donut,
  Float,
  Glow,
  IconTile,
  Panel,
  Reveal,
  Rings,
  Row,
  Spark,
  Stack,
  Stage,
  Stat,
  TypeText,
  type SceneMap,
  type SceneProps,
  type Tone,
} from '../kit';

/* ── Shared pieces ─────────────────────────────────────────────────────── */

/** An input field whose value types itself in. */
function TypedField({ label, text, at }: { label: string; text: string; at: number }) {
  return (
    // TypeText's own span is the input box, so the typed value sits flush in it.
    <div className="fv-field">
      <small>{label}</small>
      <TypeText text={text} at={at} />
    </div>
  );
}

type Step = {
  /** Caption under the column. */
  name: string;
  /** Amount shown above the bar once it lands. */
  amount: string;
  /** Bar height and bottom offset, in em. */
  h: number;
  base: number;
  /** Seconds into the scene when the bar drops in. */
  at: number;
  hi?: boolean;
  tone?: Tone;
};

/** Floating-bar waterfall: each step drops in on its own beat. */
function Waterfall({ steps, height = 19 }: { steps: Step[]; height?: number }) {
  const grid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
    textAlign: 'center',
  };
  return (
    <div>
      <div style={{ ...grid, alignItems: 'stretch', height: `${height}em` }}>
        {steps.map((s) => (
          <div
            key={s.name}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: '0.35em' }}
          >
            <Reveal at={s.at + 0.35}>
              <span className="fv-meter__row">
                <b>{s.amount}</b>
              </span>
            </Reveal>
            <div style={{ width: '62%', marginBottom: `${s.base}em`, '--fv-d': `${s.at * 1000}ms` } as CSSProperties}>
              <Bars values={[100]} hi={s.hi ? 0 : undefined} tone={s.tone} height={s.h} />
            </div>
          </div>
        ))}
      </div>
      <div className="fv-stat" style={{ ...grid, marginTop: '0.7em' }}>
        {steps.map((s) => (
          <small key={s.name}>{s.name}</small>
        ))}
      </div>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */

/** One ₹799 kurta: each cost drops in, then the true cost lands. */
function TrueCost({ label }: SceneProps) {
  // 16em of bar per ₹179.
  const k = 16 / 179;
  const steps: Step[] = [
    { name: 'Packing', amount: '₹13', h: 13 * k, base: 0, at: 0.8 },
    { name: 'Freight', amount: '₹85', h: 85 * k, base: 13 * k, at: 1.4 },
    { name: 'COD fee', amount: '₹30', h: 30 * k, base: 98 * k, at: 2 },
    { name: 'RTO', amount: '₹38', h: 38 * k, base: 128 * k, at: 2.8, hi: true, tone: 'rose' },
    { name: 'Support', amount: '₹13', h: 13 * k, base: 166 * k, at: 3.4, hi: true, tone: 'rose' },
    { name: 'True cost', amount: '₹179', h: 16, base: 0, at: 4.2, hi: true },
  ];
  return (
    <Stage label={label} shape="wide" duration={8.5}>
      <Float x={32} y={8} w={56} at={0.2} z={3}>
        <Panel title="₹799 kurta order" icon={Shirt} right={<Chip>Per order</Chip>}>
          <Waterfall steps={steps} />
        </Panel>
      </Float>
      <Float x={3} y={36} w={26} at={4.8}>
        <Panel glass>
          <Stat label="True cost per order" value="₹179" delta="2.1x the ₹85 freight" tone="rose" />
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Bento tiles: setup wizard, one step each ──────────────────────────── */

/** Type COGS and packing for a product; the unit cost is saved. */
function ProductsCogs({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6.5}>
      <Rings x={50} y={48} count={4} gap={9} />
      <Float x={15} y={20} w={70} at={0.2} z={3}>
        <Panel title="Cotton kurta" icon={Shirt} right={<Chip>₹799</Chip>}>
          <Stack gap={0.7}>
            <TypedField label="COGS" text="₹310" at={0.9} />
            <TypedField label="Packaging" text="₹13" at={1.6} />
          </Stack>
        </Panel>
      </Float>
      <Float x={36} y={76} at={2.4}>
        <Chip tone="emerald" icon={Check}>
          Unit cost ₹323
        </Chip>
      </Float>
    </Stage>
  );
}

/** Fees attach to the order one by one. */
function Fees({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6.5}>
      <Rings x={50} y={48} count={4} gap={10} />
      <Float x={39} y={34} at={0} z={3}>
        <IconTile icon={Percent} size="xl" pulse />
      </Float>
      <Float x={8} y={18} at={1} drift>
        <Chip dot>Gateway 2%</Chip>
      </Float>
      <Float x={46} y={72} at={2} drift>
        <Chip dot>Ads ₹62 / order</Chip>
      </Float>
    </Stage>
  );
}

/** The RTO rate fills in, then the loss on each refused parcel. */
function CodReturns({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6.5}>
      <Glow x={50} y={48} size={20} />
      <Float x={37} y={10} at={0.2}>
        <Chip>RTO on COD orders</Chip>
      </Float>
      <Float x={33} y={25} at={0.6} z={3}>
        <Donut pct={30} tone="rose" size={12} />
      </Float>
      <Float x={36} y={74} at={2.2}>
        <Chip tone="rose" icon={Undo2}>
          ₹125 lost per RTO
        </Chip>
      </Float>
    </Stage>
  );
}

/* ── Wide panels ───────────────────────────────────────────────────────── */

/** Pick a period; true net profit counts up with revenue and margin. */
function NetProfit({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={3} y={32} w={24} at={0}>
        <Panel glass title="Period" icon={CalendarDays}>
          <Row title="Last 7 days" />
          <Row title="Last 30 days" active />
        </Panel>
      </Float>
      <Float x={31} y={10} w={56} at={1.3} z={3}>
        <Panel title="Net profit" icon={Wallet} right={<Chip>Last 30 days</Chip>}>
          <Stat label="After COGS, COD, RTO, ads" value="₹3,562" delta="+8.7% vs prior" />
          <Spark points={[30, 38, 34, 46, 42, 55, 52, 63, 60, 72]} height={6} />
          <Reveal at={2.8}>
            <Row title="Revenue" sub="48 orders · AOV ₹341" right="₹16,349" />
          </Reveal>
          <Reveal at={3.3}>
            <Row title="Margin" sub="Net over revenue" right="21.8%" />
          </Reveal>
        </Panel>
      </Float>
      <Cursor
        path={[
          [22, 92, 0.2],
          [14, 50, 0.8],
          [14, 50, 1.3],
          [24, 80, 2.2],
        ]}
        clicks={[1]}
      />
    </Stage>
  );
}

/** Store waterfall: revenue, each cost hangs down, net profit is what is left. */
function CostWaterfall({ label }: SceneProps) {
  // 16em of bar per ₹16,349 of revenue.
  const k = 16 / 16349;
  const steps: Step[] = [
    { name: 'Revenue', amount: '₹16,349', h: 16, base: 0, at: 0.8, hi: true },
    { name: 'COGS', amount: '₹6,540', h: 6540 * k, base: 9809 * k, at: 1.5 },
    { name: 'Shipping', amount: '₹2,410', h: 2410 * k, base: 7399 * k, at: 2.1 },
    { name: 'COD, RTO', amount: '₹1,980', h: 1980 * k, base: 5419 * k, at: 2.7, hi: true, tone: 'rose' },
    { name: 'Ads', amount: '₹1,857', h: 1857 * k, base: 3562 * k, at: 3.3 },
    { name: 'Net', amount: '₹3,562', h: 3562 * k, base: 0, at: 4, hi: true, tone: 'emerald' },
  ];
  return (
    <Stage label={label} shape="wide" duration={8.5}>
      <Float x={6} y={8} w={60} at={0.2} z={3}>
        <Panel title="Cost waterfall" icon={Layers} right={<Chip>Last 30 days</Chip>}>
          <Waterfall steps={steps} />
        </Panel>
      </Float>
      <Float x={69} y={32} w={26} at={4.6}>
        <Panel glass title="Biggest cost" icon={Boxes}>
          <Row title="COGS ₹6,540" sub="40% of revenue" />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Sort by margin: losses show in rose, a product missing COGS sinks last. */
function ProductTable({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={20} y={8} w={60} at={0.2} z={3}>
        <Panel
          title="Products"
          icon={Boxes}
          right={
            <Btn icon={ArrowDownWideNarrow} pressAt={1.2}>
              Margin
            </Btn>
          }
        >
          <Reveal at={1.6}>
            <Row
              lead={<IconTile icon={Shirt} />}
              title="Cotton kurta"
              sub="24 sold · ₹6,520 profit"
              right={<Chip tone="emerald">34%</Chip>}
            />
          </Reveal>
          <Reveal at={2}>
            <Row
              lead={<IconTile icon={Shirt} />}
              title="Linen dupatta"
              sub="18 sold · ₹2,372 profit"
              right={<Chip tone="emerald">22%</Chip>}
            />
          </Reveal>
          <Reveal at={2.4}>
            <Row
              lead={<IconTile icon={Shirt} />}
              title="Silk saree"
              sub="6 sold · ₹1,349 loss"
              right={<Chip tone="rose">-9%</Chip>}
              active
            />
          </Reveal>
        </Panel>
      </Float>
      <Float x={20} y={49} w={60} at={3.2} fade="bottom">
        <Panel>
          <Row
            lead={<IconTile icon={Shirt} />}
            title="Block print top"
            sub="No COGS yet"
            right={
              <Chip tone="amber" dot>
                Add COGS
              </Chip>
            }
          />
        </Panel>
      </Float>
      <Cursor
        path={[
          [92, 80, 0.3],
          [73, 13, 1],
          [73, 13, 1.6],
          [88, 50, 2.6],
        ]}
        clicks={[1.2]}
      />
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
