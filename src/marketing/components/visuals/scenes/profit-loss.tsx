/**
 * Profit & loss scenes (v7). A sample fashion store, Mira Ethnic. Numbers
 * are internally consistent: the ₹799 kurta's true cost is ₹179, and the
 * 30-day waterfall nets ₹3,562 from ₹16,349.
 * Keys are the image paths in productPages.ts.
 */
import type { CSSProperties } from 'react';
import {
  ArrowDownWideNarrow,
  CalendarDays,
  Layers,
  MetaLogo,
  Package,
  Percent,
  RazorpayLogo,
  ShopifyLogo,
  Undo2,
  Wallet,
} from '../icons';
import {
  Attach,
  Btn,
  Chip,
  Cursor,
  Donut,
  Float,
  KV,
  Panel,
  ProductArt,
  Reveal,
  Row,
  Spark,
  Stage,
  Stat,
  Swap,
  Toast,
  TypeText,
  type SceneMap,
  type SceneProps,
} from '../kit';

const vars = (o: Record<string, string | number>) => o as unknown as CSSProperties;

type Bar = {
  name: string;
  amount: string;
  /** Share of the chart height, 0..1, and where the bar starts from the bottom. */
  h: number;
  base: number;
  at: number;
  kind?: 'total' | 'cost' | 'risk' | 'net';
};

/** A floating-bar waterfall. Bars drop in one by one at `at`. */
function Waterfall({ bars, height = 15 }: { bars: Bar[]; height?: number }) {
  return (
    <div className="pl-wf" style={vars({ '--h': `${height}em`, '--n': bars.length })}>
      <div className="pl-wf__plot">
        {bars.map((b) => (
          <div key={b.name} className="pl-wf__col">
            <span
              className="pl-wf__bar"
              data-kind={b.kind ?? 'cost'}
              style={vars({ bottom: `${b.base * 100}%`, height: `${b.h * 100}%`, '--at': `${b.at}s` })}
            >
              <b>{b.amount}</b>
            </span>
          </div>
        ))}
      </div>
      <div className="pl-wf__axis">
        {bars.map((b) => (
          <small key={b.name}>{b.name}</small>
        ))}
      </div>
    </div>
  );
}

function Field({ label, text, at, prefix }: { label: string; text: string; at: number; prefix?: string }) {
  return (
    <div className="fv-field">
      <small>{label}</small>
      <span>
        {prefix ? <em className="pl-prefix">{prefix}</em> : null}
        <TypeText text={text} at={at} />
      </span>
    </div>
  );
}

/* ── Hero: what one ₹799 order really costs ────────────────────────────── */

function TrueCost({ label }: SceneProps) {
  const k = 1 / 179;
  const bars: Bar[] = [
    { name: 'Packing', amount: '₹13', h: 13 * k, base: 0, at: 0.9 },
    { name: 'Freight', amount: '₹85', h: 85 * k, base: 13 * k, at: 1.5 },
    { name: 'COD fee', amount: '₹30', h: 30 * k, base: 98 * k, at: 2.1 },
    { name: 'RTO share', amount: '₹38', h: 38 * k, base: 128 * k, at: 2.8, kind: 'risk' },
    { name: 'Support', amount: '₹13', h: 13 * k, base: 166 * k, at: 3.4, kind: 'risk' },
    { name: 'True cost', amount: '₹179', h: 1, base: 0, at: 4.2, kind: 'total' },
  ];
  return (
    <Stage label={label}
      steps={[[0, 'A ₹799 COD order'], [0.9, 'Every cost added'], [2.8, 'RTO and support'], [4.2, 'True cost ₹179']]} shape="wide" duration={9}>
      <Float x={14} y={4} w={72}>
        <Panel>
          <div className="pl-order">
            <ProductArt kind="kurta" h={3.4} />
            <span>
              <b>Rani pink silk kurta</b>
              <small>Order #2211 · ₹799 · Cash on delivery</small>
            </span>
            <Chip>Per order</Chip>
          </div>
          <Waterfall bars={bars} />
          <Attach place="tl" at={4.8} dx={1.6} dy={8}>
            <Toast dark icon={Wallet} title="True cost ₹179" sub="2.1× the ₹85 freight you see" />
          </Attach>
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Bento tiles: the setup, one step each ─────────────────────────────── */

/** Product costs: type the COGS and packing, the unit cost lands. */
function ProductsCogs({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={12} w={80}>
        <Panel>
          <div className="pl-order">
            <ProductArt kind="kurta" h={3.2} />
            <span>
              <b>Cotton kurta</b>
              <small>Sells at ₹799</small>
            </span>
            <span className="mm-synced"><ShopifyLogo /> Synced</span>
          </div>
          <div className="pl-two">
            <Field label="COGS" prefix="₹" text="310" at={0.8} />
            <Field label="Packaging" prefix="₹" text="13" at={1.5} />
          </div>
          <Reveal at={2.2}>
            <KV k="Unit cost" v="₹323" total />
          </Reveal>
        </Panel>
      </Float>
    </Stage>
  );
}

/** Fees: gateway, platform and ad spend per order, from the tools you use. */
function Fees({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={14} w={80}>
        <Panel title="Fees" icon={Percent}>
          <Reveal at={0.5}>
            <Row lead={<span className="pl-logo"><RazorpayLogo /></span>} title="Payment gateway" sub="Razorpay" right="2%" />
          </Reveal>
          <Reveal at={1.1}>
            <Row lead={<span className="pl-logo"><ShopifyLogo /></span>} title="Platform fee" sub="Shopify Basic" right="₹0" />
          </Reveal>
          <Reveal at={1.7}>
            <Row lead={<span className="pl-logo"><MetaLogo /></span>} title="Ads per order" sub="Meta, last 30 days" right="₹62" />
          </Reveal>
        </Panel>
      </Float>
    </Stage>
  );
}

/** COD and returns: how often COD comes back, and what each return costs. */
function CodReturns({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={14} w={80}>
        <Panel title="COD and returns" icon={Undo2}>
          <div className="cr-score">
            <Donut pct={30} size={7.2} tone="rose">
              <b className="pl-donut">30%</b>
            </Donut>
            <div className="cr-score__kv pl-rto">
              <small>RTO rate on COD</small>
              <KV k="Forward freight" v="₹85" />
              <KV k="Return freight" v="₹40" />
              <KV k="Lost per RTO" v="₹125" total />
            </div>
          </div>
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Showcases ─────────────────────────────────────────────────────────── */

/** Net profit for a period: switch to 30 days and the numbers follow. */
function NetProfit({ label }: SceneProps) {
  return (
    <Stage label={label}
      steps={[[0, 'Pick a period'], [1.1, 'Net profit, 30 days']]} shape="wide" duration={8}>
      <Float x={16} y={6} w={64}>
        <Panel
          title="Net profit"
          icon={Wallet}
          right={
            <div className="ai-seg pl-seg" data-cursor="period">
              <span>7 days</span>
              <Swap at={1.1} a={<span>30 days</span>} b={<span className="is-on">30 days</span>} />
              <span>90 days</span>
            </div>
          }
        >
          <div className="cp-perf">
            <div>
              <Swap at={1.1} a={<Stat label="After COGS, COD, RTO and ads" value="₹812" />} b={<Stat label="After COGS, COD, RTO and ads" value="₹3,562" delta="+8.7% vs prior 30 days" />} />
              <Spark points={[30, 38, 34, 46, 42, 55, 52, 63, 60, 72]} height={5} tone="emerald" />
            </div>
            <div className="cp-perf__kv">
              <KV k="Revenue" v="₹16,349" />
              <KV k="Orders" v="48" />
              <KV k="AOV" v="₹341" />
              <KV k="Margin" v="21.8%" total />
            </div>
          </div>
          <Attach place="bl" at={2.6} dx={-2} dy={-1}>
            <Toast icon={CalendarDays} title="Every rupee in" sub="Shopify, courier, gateway and Meta" />
          </Attach>
        </Panel>
      </Float>
      <Cursor path={[[70, 98, 0.2], ['period', 0.8], ['period', 1.3], [74, 94, 2.4]]} clicks={[1.05]} />
    </Stage>
  );
}

/** Where ₹16,349 of revenue goes, bar by bar, down to ₹3,562 net. */
function CostWaterfall({ label }: SceneProps) {
  const k = 1 / 16349;
  const bars: Bar[] = [
    { name: 'Revenue', amount: '₹16,349', h: 1, base: 0, at: 0.8, kind: 'total' },
    { name: 'COGS', amount: '₹6,540', h: 6540 * k, base: 9809 * k, at: 1.5 },
    { name: 'Shipping', amount: '₹2,410', h: 2410 * k, base: 7399 * k, at: 2.1 },
    { name: 'COD, RTO', amount: '₹1,980', h: 1980 * k, base: 5419 * k, at: 2.7, kind: 'risk' },
    { name: 'Ads', amount: '₹1,857', h: 1857 * k, base: 3562 * k, at: 3.3 },
    { name: 'Net', amount: '₹3,562', h: 3562 * k, base: 0, at: 4, kind: 'net' },
  ];
  return (
    <Stage label={label}
      steps={[[0, 'Revenue'], [1.5, 'Costs step down'], [4, 'Net ₹3,562']]} shape="wide" duration={8.5}>
      <Float x={14} y={4} w={72}>
        <Panel title="Cost waterfall" icon={Layers} right={<Chip>Last 30 days</Chip>}>
          <Waterfall bars={bars} />
          <Attach place="tr" at={4.6} dx={1.6} dy={5}>
            <Toast icon={Package} title="Biggest cost: COGS" sub="40% of revenue" />
          </Attach>
        </Panel>
      </Float>
    </Stage>
  );
}

/** Products by margin: sort, and the loss-maker rises to the top. */
function ProductTable({ label }: SceneProps) {
  const row = (kind: 'kurta' | 'sneaker', title: string, sub: string, m: string, tone: 'emerald' | 'rose', active?: boolean) => (
    <Row lead={<ProductArt kind={kind} h={2.6} />} title={title} sub={sub} right={<Chip tone={tone}>{m}</Chip>} active={active} />
  );
  return (
    <Stage label={label}
      steps={[[0, 'Products by margin'], [1.2, 'Sort'], [1.5, 'Loss-maker on top'], [2.6, 'Missing COGS flagged']]} shape="wide" duration={8}>
      <Float x={16} y={6} w={64}>
        <Panel
          title="Products"
          icon={Package}
          right={
            <span data-cursor="sort">
              <Btn icon={ArrowDownWideNarrow} pressAt={1.2}>
                Margin
              </Btn>
            </span>
          }
        >
          <Swap
            at={1.5}
            a={
              <div>
                {row('kurta', 'Cotton kurta', '24 sold · ₹6,520 profit', '34%', 'emerald')}
                {row('sneaker', 'Block print juttis', '18 sold · ₹2,372 profit', '22%', 'emerald')}
                {row('kurta', 'Silk saree', '6 sold · ₹1,349 loss', '−9%', 'rose')}
              </div>
            }
            b={
              <div>
                {row('kurta', 'Silk saree', '6 sold · ₹1,349 loss', '−9%', 'rose', true)}
                {row('sneaker', 'Block print juttis', '18 sold · ₹2,372 profit', '22%', 'emerald')}
                {row('kurta', 'Cotton kurta', '24 sold · ₹6,520 profit', '34%', 'emerald')}
              </div>
            }
          />
          <Reveal at={2.6}>
            <Row lead={<ProductArt kind="kurta" h={2.6} />} title="Block print top" sub="No COGS yet" right={<Chip tone="amber" dot>Add COGS</Chip>} />
          </Reveal>
          <Attach place="r" at={3.2} dx={3.4} dy={-1}>
            <Toast dark icon={Wallet} title="Silk saree loses ₹225 an order" sub="RTO on COD is 42%" />
          </Attach>
        </Panel>
      </Float>
      <Cursor path={[[80, 98, 0.2], ['sort', 0.9], ['sort', 1.4], [84, 92, 2.4]]} clicks={[1.2]} />
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
