/**
 * Meta Manager scenes. Keys are the image paths in productPages.ts.
 * WhatsApp template approval, Journey blueprints, catalog and wa.me QR.
 * Palette: indigo hero, then emerald, amber, violet, sky per scene.
 *
 * This page reuses one image path for the hero, a bento tile and a showcase,
 * and leaves two showcase images empty (''). A scene only receives its label,
 * so the shared keys pick a layout from the frame they are mounted in, and the
 * '' key picks studio or catalog from the label.
 */
import { useLayoutEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  Braces,
  CreditCard,
  Download,
  FileText,
  LayoutTemplate,
  Mail,
  Package,
  QrCode,
  RefreshCw,
  Send,
  Shirt,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  Watch,
  Zap,
} from 'lucide-react';
import {
  Btn,
  Bubble,
  Chip,
  Field,
  Float,
  IconTile,
  Node,
  Panel,
  Phone,
  Row,
  Stage,
  Thumb,
  Wires,
  type Scene,
  type SceneMap,
  type SceneProps,
  type Tone,
} from '../kit';

/* ── Local pieces ──────────────────────────────────────────────────────── */

type Slot = 'hero' | 'bento' | 'showcase';

/** Render one of three scenes depending on the frame this path is shown in. */
function bySlot(scenes: Record<Slot, Scene>): Scene {
  return function SlotScene({ label }: SceneProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [slot, setSlot] = useState<Slot | null>(null);
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      if (el.closest('.demo-video-glow__frame')) setSlot('hero');
      else if (el.closest('.mkt-pf__shot') && !el.closest('.is-wide')) setSlot('bento');
      else setSlot('showcase');
    }, []);
    if (!slot) return <span ref={ref} hidden />;
    const S = scenes[slot];
    return <S label={label} />;
  };
}

type Status = 'Approved' | 'Pending' | 'Rejected' | 'Draft';
const STATUS_TONE: Record<Status, Tone> = {
  Approved: 'emerald',
  Pending: 'amber',
  Rejected: 'rose',
  Draft: 'slate',
};

function StatusChip({ s }: { s: Status }) {
  return (
    <Chip tone={STATUS_TONE[s]} dot>
      {s}
    </Chip>
  );
}

/** Deterministic QR-style matrix: three finder squares plus seeded modules. */
function Qr({ size = 11 }: { size?: number }) {
  const n = 21;
  const finder = (x: number, y: number) => {
    const inBox = (ox: number, oy: number) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7;
    for (const [ox, oy] of [[0, 0], [14, 0], [0, 14]]) {
      if (inBox(ox, oy)) {
        const dx = x - ox;
        const dy = y - oy;
        const ring = dx === 0 || dx === 6 || dy === 0 || dy === 6;
        const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
        return ring || core ? 1 : 0;
      }
      if (x >= ox - 1 && x <= ox + 7 && y >= oy - 1 && y <= oy + 7) return 0;
    }
    return -1;
  };
  const cells: [number, number][] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const f = finder(x, y);
      const on = f === -1 ? ((x * 7 + y * 13 + ((x * y) % 5)) * 2654435761) % 7 < 3 : f === 1;
      if (on) cells.push([x, y]);
    }
  }
  return (
    <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} style={{ width: `${size}em`, height: `${size}em`, display: 'block', borderRadius: '0.6em', background: '#fff' }}>
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} rx={0.18} fill="#0c1222" />
      ))}
    </svg>
  );
}

/** Product row lead: a small gradient thumbnail. */
function ProductThumb({ tone, icon }: { tone: Tone; icon: typeof Shirt }) {
  return (
    <span style={{ width: '3em', flex: 'none' }}>
      <Thumb tone={tone} icon={icon} h={3} />
    </span>
  );
}

/* ── Template library (hero, bento, showcase) ──────────────────────────── */

/** Hero: library with statuses and an approved template on a phone. */
function LibraryHero({ label }: SceneProps) {
  return (
    <Stage label={label} tone="indigo" shape="wide">
      <Wires shape="wide" tone="indigo" paths={['M 60 15.5 C 62 15.5, 62 15.5, 64.5 15.5']} />
      <Float x={4} y={9} w={56} delay={0}>
        <Panel title="Template library" icon={LayoutTemplate} tone="indigo" right={<Btn icon={RefreshCw}>Sync from Meta</Btn>}>
          <Row lead={<IconTile icon={ShoppingCart} tone="amber" size="sm" />} title="cart_recovery_1" sub="Marketing" right={<StatusChip s="Approved" />} active />
          <Row lead={<IconTile icon={CreditCard} tone="sky" size="sm" />} title="cod_confirm" sub="Utility" right={<StatusChip s="Approved" />} />
          <Row lead={<IconTile icon={Package} tone="violet" size="sm" />} title="order_shipped" sub="Utility" right={<StatusChip s="Pending" />} />
          <Row lead={<IconTile icon={Sparkles} tone="rose" size="sm" />} title="festive_sale_v2" sub="Marketing" right={<StatusChip s="Rejected" />} />
        </Panel>
      </Float>
      <Float x={64.5} y={7} w={31} delay={2} z={3} drift>
        <Phone name="Your store">
          <Bubble from="biz" time="11:02" read buttons={['Complete order']}>
            Hi Riya, your cart is saved. Your linen shirt is still in stock.
          </Bubble>
          <Bubble from="user">Complete order</Bubble>
        </Phone>
      </Float>
      <Float x={8} y={76} delay={4}>
        <Chip tone="emerald" solid icon={ShieldCheck}>Only APPROVED copy sends</Chip>
      </Float>
    </Stage>
  );
}

/** Bento: one list, four statuses, the rejection reason on the row. */
function LibraryTile({ label }: SceneProps) {
  return (
    <Stage label={label} tone="indigo">
      <Float x={7} y={7} w={86} delay={0}>
        <Panel title="Templates" icon={LayoutTemplate} tone="indigo" right={<Chip tone="slate">4</Chip>}>
          <Row title="cart_recovery_1" sub="Marketing" right={<StatusChip s="Approved" />} />
          <Row title="order_shipped" sub="Utility" right={<StatusChip s="Pending" />} />
          <Row title="welcome_optin" sub="Marketing" right={<StatusChip s="Draft" />} />
          <Row title="festive_sale_v2" sub="Marketing" right={<StatusChip s="Rejected" />} active />
        </Panel>
      </Float>
      <Float x={10} y={66} w={80} delay={3} rotate={-1} drift z={3}>
        <Panel>
          <Row lead={<IconTile icon={AlertTriangle} tone="rose" />} title="Rejected by Meta" sub="Reason shown on the row" right={<Btn tone="rose" primary>Resubmit</Btn>} />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Showcase: status counts, a synced list and a row being fixed. */
function LibraryShowcase({ label }: SceneProps) {
  const counts: [Status, string][] = [
    ['Draft', '2'],
    ['Pending', '1'],
    ['Approved', '12'],
    ['Rejected', '1'],
  ];
  return (
    <Stage label={label} tone="emerald" shape="wide">
      <Float x={4} y={13} w={60} delay={0}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8em' }}>
          {counts.map(([s, v]) => (
            <Panel key={s}>
              <small style={{ fontSize: '0.95em', color: 'var(--fv-muted)', fontWeight: 500 }}>{s}</small>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <b style={{ fontSize: '2em', fontWeight: 600, letterSpacing: '-0.04em' }}>{v}</b>
                <span data-tone={STATUS_TONE[s]} style={{ width: '0.7em', height: '0.7em', borderRadius: '50%', background: 'var(--t-500)', boxShadow: '0 0 0 0.25em var(--t-100)' }} />
              </div>
            </Panel>
          ))}
        </div>
      </Float>
      <Float x={4} y={39} w={60} delay={2}>
        <Panel title="Library" icon={LayoutTemplate} tone="emerald" right={<Chip tone="emerald" dot>Synced from Meta</Chip>}>
          <Row lead={<IconTile icon={CreditCard} tone="sky" size="sm" />} title="cod_confirm" sub="Utility · en" right={<StatusChip s="Approved" />} />
          <Row lead={<IconTile icon={ShoppingCart} tone="amber" size="sm" />} title="cart_recovery_2" sub="Marketing · en" right={<StatusChip s="Pending" />} />
          <Row lead={<IconTile icon={Sparkles} tone="rose" size="sm" />} title="festive_sale_v2" sub="Marketing · hi" right={<StatusChip s="Rejected" />} active />
        </Panel>
      </Float>
      <Float x={68} y={45} w={28} delay={4} rotate={2} drift z={3}>
        <Panel title="Rejected" icon={AlertTriangle} tone="rose">
          <p style={{ margin: 0, fontSize: '1em', color: 'var(--fv-muted)', lineHeight: 1.4 }}>Read Meta's reason on the row, edit the copy, submit again.</p>
          <div style={{ marginTop: '0.8em' }}>
            <Btn tone="emerald" primary icon={Send}>Fix and resubmit</Btn>
          </div>
        </Panel>
      </Float>
      <Float x={70} y={19} delay={5}>
        <Chip tone="slate" icon={RefreshCw}>Synced 2 min ago</Chip>
      </Float>
    </Stage>
  );
}

/* ── Other bento tiles (square) ────────────────────────────────────────── */

/** Journey blueprints: cart, COD and order packs with live product headers. */
function Blueprints({ label }: SceneProps) {
  return (
    <Stage label={label} tone="amber" grid>
      <Float x={7} y={7} w={86} delay={0}>
        <Panel title="Blueprints" icon={Zap} tone="amber" right={<Chip tone="slate">Journeys</Chip>}>
          <Row lead={<IconTile icon={ShoppingCart} tone="amber" />} title="Cart recovery" sub="3 WhatsApp + email" right={<Chip tone="emerald" dot>Ready</Chip>} active />
          <Row lead={<IconTile icon={CreditCard} tone="violet" />} title="COD to prepaid" sub="Growth and Scale" right={<Chip tone="violet">Plan</Chip>} />
          <Row lead={<IconTile icon={Package} tone="sky" />} title="Order confirmed" sub="Utility template" right={<Chip tone="emerald" dot>Ready</Chip>} />
        </Panel>
      </Float>
      <Float x={16} y={61} w={68} delay={3} rotate={-1} drift>
        <Bubble from="biz" time="18:40" media={<Thumb tone="amber" icon={Shirt} h={4.6} />}>
          Your linen shirt is waiting, Riya.
        </Bubble>
      </Float>
      <Float x={52} y={56} delay={5} z={3}>
        <Chip tone="amber" solid icon={Mail}>Live product header</Chip>
      </Float>
    </Stage>
  );
}

/** Catalog import plus a downloadable wa.me QR. */
function CatalogTile({ label }: SceneProps) {
  return (
    <Stage label={label} tone="sky">
      <Float x={7} y={7} w={62} delay={0}>
        <Panel title="Catalog" icon={Store} tone="sky" right={<Btn icon={RefreshCw}>Refresh</Btn>}>
          <Row lead={<ProductThumb tone="sky" icon={Shirt} />} title="Linen shirt" sub="₹1,299" />
          <Row lead={<ProductThumb tone="violet" icon={Watch} />} title="Smart watch" sub="₹4,999" />
        </Panel>
      </Float>
      <Float x={50} y={52} w={43} delay={3} rotate={2} drift z={3}>
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.7em' }}>
            <Qr size={10} />
            <Btn tone="sky" primary icon={Download}>Download PNG</Btn>
          </div>
        </Panel>
      </Float>
      <Float x={5} y={57} w={42} delay={5}>
        <Panel>
          <Row lead={<IconTile icon={QrCode} tone="indigo" size="sm" />} title="wa.me QR" sub="Opens a chat" />
        </Panel>
      </Float>
      <Float x={7} y={80} delay={6}>
        <Chip tone="emerald" dot>Synced from Shopify</Chip>
      </Float>
    </Stage>
  );
}

/* ── Showcases without screenshots (wide) ──────────────────────────────── */

/** Template studio: named variables, category and rate, live preview. */
function Studio({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet" shape="wide">
      <Wires shape="wide" tone="violet" paths={['M 62 35 L 62 41.25', 'M 77 44.4 L 81 44.4']} />
      <Float x={4} y={8} w={36} delay={0}>
        <Panel title="New template" icon={FileText} tone="violet">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8em' }}>
            <Field label="Name" value="cod_confirm_v2" mono />
            <div>
              <small style={{ display: 'block', marginBottom: '0.4em', fontSize: '0.9em', fontWeight: 500, color: 'var(--fv-muted)' }}>Variables</small>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4em' }}>
                <Chip tone="violet" icon={Braces}>{'{{first_name}} → {{1}}'}</Chip>
                <Chip tone="violet" icon={Braces}>{'{{order_id}} → {{2}}'}</Chip>
              </div>
            </div>
          </div>
        </Panel>
      </Float>
      <Float x={4} y={58} w={36} delay={2}>
        <Panel title="Category" icon={ShieldCheck} tone="emerald" right={<Chip tone="slate">India, per msg</Chip>}>
          <Row title="Utility" sub="Order, COD, shipping" right={<Chip tone="emerald">₹0.115</Chip>} active />
          <Row title="Marketing" sub="Promos, cart offers" right={<Chip tone="slate">₹0.8631</Chip>} />
        </Panel>
      </Float>
      <Float x={47} y={8} w={30} delay={3} z={3}>
        <Phone name="Your store">
          <Bubble from="biz" time="11:20" read buttons={['Confirm order', 'Cancel']}>
            Hi Riya, please confirm your COD order #1042 for ₹1,299.
          </Bubble>
        </Phone>
      </Float>
      <Float x={47} y={66} w={30} delay={5}>
        <Node icon={Send} tone="indigo" title="Submit to Meta" sub="Minutes to 24h" active />
      </Float>
      <Float x={81} y={68.6} delay={7} drift>
        <Chip tone="emerald" solid dot>Approved</Chip>
      </Float>
    </Stage>
  );
}

/** Catalog and QR codes. */
function CatalogShowcase({ label }: SceneProps) {
  return (
    <Stage label={label} tone="sky" shape="wide">
      <Wires shape="wide" tone="sky" paths={['M 67 34 L 67 41']} />
      <Float x={4} y={10} w={46} delay={0}>
        <Panel title="WhatsApp catalog" icon={Store} tone="sky" right={<Btn icon={RefreshCw}>Refresh</Btn>}>
          <Row lead={<ProductThumb tone="sky" icon={Shirt} />} title="Linen shirt, sky blue" sub="In stock" right={<b>₹1,299</b>} />
          <Row lead={<ProductThumb tone="violet" icon={Watch} />} title="Smart watch S7" sub="In stock" right={<b>₹4,999</b>} />
          <Row lead={<ProductThumb tone="amber" icon={Package} />} title="Gift box" sub="2 left" right={<b>₹899</b>} />
        </Panel>
      </Float>
      <Float x={6} y={64} delay={2}>
        <Chip tone="emerald" dot>Imported from Shopify</Chip>
      </Float>
      <Float x={56} y={8} w={22} delay={3} rotate={-2} drift>
        <Panel title="QR codes" icon={QrCode} tone="indigo">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8em' }}>
            <Qr size={10} />
            <Btn tone="indigo" primary icon={Download}>Download PNG</Btn>
          </div>
        </Panel>
      </Float>
      <Float x={60} y={66} w={36} delay={5}>
        <Bubble from="biz" time="09:12" read media={<Thumb tone="sky" icon={Shirt} h={3.6} />}>
          Linen shirt, sky blue · ₹1,299
        </Bubble>
      </Float>
      <Float x={80} y={30} delay={6}>
        <Node icon={Store} tone="sky" title="Scan opens" sub="Chat or catalog" />
      </Float>
    </Stage>
  );
}

/** Both empty-image showcases share the '' key; the label tells them apart. */
function EmptyShowcase({ label }: SceneProps) {
  return /catalog|qr/i.test(label) ? <CatalogShowcase label={label} /> : <Studio label={label} />;
}

const scenes: SceneMap = {
  '/marketing/customers/customers-outcome-template.png': bySlot({
    hero: LibraryHero,
    bento: LibraryTile,
    showcase: LibraryShowcase,
  }),
  '/campaignn.webp': Blueprints,
  '/marketing/features/shopify-whatsapp.webp': CatalogTile,
  '': EmptyShowcase,
};

export default scenes;
