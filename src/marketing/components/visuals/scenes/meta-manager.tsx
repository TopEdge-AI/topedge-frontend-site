/**
 * Meta Manager scenes. v3 storytelling style, see flow-builder.tsx.
 * WhatsApp template approval, Journey blueprints, catalog and wa.me QR.
 *
 * This page reuses one image path for the hero, a bento tile and a showcase,
 * and leaves two showcase images empty (''). A scene only receives its label,
 * so the shared key picks a layout from the frame it is mounted in, and the
 * '' key picks studio or catalog from the label.
 */
import { useLayoutEffect, useRef, useState } from 'react';
import {
  Braces,
  Download,
  FileText,
  LayoutTemplate,
  Package,
  QrCode,
  RefreshCw,
  Send,
  ShieldCheck,
  Shirt,
  Store,
  Watch,
} from 'lucide-react';
import {
  Btn,
  Bubble,
  Burst,
  Chip,
  Cursor,
  Field,
  Float,
  Glow,
  IconTile,
  Panel,
  Reveal,
  Rings,
  Row,
  Stack,
  Stage,
  Thumb,
  type Scene,
  type SceneMap,
  type SceneProps,
} from '../kit';

/* ── Frame detection ───────────────────────────────────────────────────── */

type Slot = 'hero' | 'bento' | 'showcase';

/**
 * Render one of three scenes depending on the frame this path is shown in:
 * the hero glow frame, a bento tile visual, or the wide showcase tab panel.
 */
function bySlot(scenes: Record<Slot, Scene>): Scene {
  return function SlotScene({ label }: SceneProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [slot, setSlot] = useState<Slot | null>(null);
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      if (el.closest('.demo-video-glow__frame')) setSlot('hero');
      else if (el.closest('.mkt-pf__tile-visual')) setSlot('bento');
      else if (el.closest('.pfx-tabs__panel, .mkt-pf__shot.is-wide')) setSlot('showcase');
      else setSlot(el.closest('.mkt-pf__shot') ? 'bento' : 'showcase');
    }, []);
    if (!slot) return <span ref={ref} hidden />;
    const S = scenes[slot];
    return <S label={label} />;
  };
}

/* ── Hero ──────────────────────────────────────────────────────────────── */

/** A template goes Draft, In review, Approved, then it sends. */
function LibraryHero({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={9}>
      <Float x={4} y={30} w={23} at={0}>
        <Panel glass title="Meta rates" icon={ShieldCheck}>
          <Row title="Marketing" sub="₹0.8631 per message" />
          <Row title="Utility" sub="₹0.115 per message" />
        </Panel>
      </Float>
      <Float x={30} y={16} w={44} at={0.3} z={3}>
        <Panel title="cart_recovery_1" icon={FileText} right={<Chip>Marketing</Chip>}>
          <Row lead={<IconTile icon={Braces} />} title="Body" sub="Hi {{first_name}}, still keen?" />
          <Reveal at={0.9} until={2.1}>
            <Row lead={<IconTile icon={FileText} />} title="Draft" sub="Saved, not submitted" right={<Chip>Draft</Chip>} />
          </Reveal>
          <Reveal at={2.5} until={3.9}>
            <Row
              lead={<IconTile icon={Send} tone="amber" />}
              title="Submitted"
              sub="Meta is reviewing"
              right={<Chip tone="amber" dot>In review</Chip>}
            />
          </Reveal>
          <Reveal at={4.3}>
            <Row
              lead={<IconTile icon={ShieldCheck} tone="emerald" />}
              title="Approved"
              sub="Ready for journeys"
              right={<Chip tone="emerald" dot>Approved</Chip>}
              active
            />
          </Reveal>
        </Panel>
      </Float>
      <Burst x={68} y={38} at={4.5} />
      <Float x={77} y={40} w={22} at={5.6} z={4}>
        <Bubble from="biz" time="18:20" read>
          Hi Aarav, your serum is still in your cart.
        </Bubble>
      </Float>
    </Stage>
  );
}

/* ── Bento tiles: plain, one focal element ─────────────────────────────── */

/** Draft, pending, approved and rejected in one list, with the reason. */
function LibraryTile({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Glow x={50} y={50} size={22} />
      <Float x={8} y={20} w={84} at={0.2} z={3}>
        <Panel title="Templates" icon={LayoutTemplate}>
          <Reveal at={0.6}>
            <Row title="order_confirm" sub="Utility" right={<Chip tone="emerald">Approved</Chip>} />
          </Reveal>
          <Reveal at={1.3}>
            <Row title="cart_recovery_1" sub="Marketing" right={<Chip tone="amber">Pending</Chip>} />
          </Reveal>
          <Reveal at={2}>
            <Row title="diwali_offer" sub="Promo text in Utility" right={<Chip tone="rose">Rejected</Chip>} active />
          </Reveal>
        </Panel>
      </Float>
    </Stage>
  );
}

/** A blueprint arrives prefilled with a live product header. */
function Blueprints({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6.5}>
      <Rings x={50} y={54} count={4} gap={10} />
      <Float x={32} y={8} at={0.2}>
        <Chip icon={LayoutTemplate}>Cart recovery</Chip>
      </Float>
      <Float x={20} y={22} w={60} at={0.8} z={3}>
        <Bubble from="biz" time="18:20" read media={<Thumb icon={Package} h={6} />} buttons={['Complete order']}>
          Hi {'{{first_name}}'}, your serum is waiting.
        </Bubble>
      </Float>
      <Float x={28} y={86} at={2.6}>
        <Chip tone="emerald" dot>Live product header</Chip>
      </Float>
    </Stage>
  );
}

/** Catalog synced, then the wa.me QR downloads. */
function CatalogTile({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Rings x={50} y={48} count={4} gap={10} />
      <Float x={39} y={34} at={0} z={3}>
        <IconTile icon={QrCode} size="xl" pulse />
      </Float>
      <Float x={8} y={14} at={1.1} drift>
        <Chip tone="emerald" dot>142 products synced</Chip>
      </Float>
      <Float x={44} y={74} at={2.2} drift>
        <Chip icon={Download}>QR as PNG</Chip>
      </Float>
    </Stage>
  );
}

/* ── Wide panels: page mesh, one large card ────────────────────────────── */

/** Sync from Meta pulls templates made elsewhere, each with its status. */
function LibraryShowcase({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7.5}>
      <Float x={18} y={10} w={56} at={0.2} z={3}>
        <Panel
          title="Template library"
          icon={LayoutTemplate}
          right={<Btn icon={RefreshCw} pressAt={1}>Sync from Meta</Btn>}
        >
          <Reveal at={1.5}>
            <Row lead={<IconTile icon={FileText} />} title="order_confirm" sub="Utility · synced" right={<Chip tone="emerald">Approved</Chip>} />
          </Reveal>
          <Reveal at={2.1}>
            <Row lead={<IconTile icon={FileText} />} title="cod_to_prepaid" sub="Utility · synced" right={<Chip tone="amber">Pending</Chip>} />
          </Reveal>
          <Reveal at={2.7}>
            <Row
              lead={<IconTile icon={FileText} />}
              title="diwali_offer"
              sub="Reason: promo in Utility"
              right={<Chip tone="rose">Rejected</Chip>}
              active
            />
          </Reveal>
        </Panel>
      </Float>
      <Cursor
        path={[
          [86, 70, 0.3],
          [64, 15, 0.9],
          [64, 15, 1.4],
          [80, 62, 2.6],
        ]}
        clicks={[1]}
      />
      <Float x={50} y={62} at={3.6}>
        <Chip tone="emerald" dot>3 synced from Meta</Chip>
      </Float>
    </Stage>
  );
}

/** Named variables map to Meta slots on submit; it goes to review. */
function Studio({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={10} y={10} w={48} at={0.2} z={3}>
        <Panel title="Template studio" icon={FileText} right={<Chip>Utility</Chip>}>
          <Stack gap={0.8}>
            <Field label="Name" value="order_shipped" mono />
            <Field label="Body" value="Hi {{first_name}}, {{order_id}} shipped" />
            <Btn primary icon={Send} pressAt={3.4}>Submit to Meta</Btn>
          </Stack>
        </Panel>
      </Float>
      <Float x={64} y={18} w={28} at={1.4}>
        <Panel glass title="Variables" icon={Braces}>
          <Row title="first_name" sub="Maps to {{1}}" />
          <Row title="order_id" sub="Maps to {{2}}" />
        </Panel>
      </Float>
      <Cursor
        path={[
          [52, 82, 2.2],
          [34, 45, 3.2],
          [34, 45, 3.8],
          [48, 72, 4.8],
        ]}
        clicks={[3.4]}
      />
      <Float x={66} y={54} at={4.2}>
        <Chip tone="amber" dot>In review at Meta</Chip>
      </Float>
    </Stage>
  );
}

/** Refresh the catalog, then download the wa.me QR for the storefront. */
function CatalogShowcase({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7.5}>
      <Float x={8} y={12} w={52} at={0.2} z={3}>
        <Panel title="Catalog" icon={Store} right={<Btn icon={RefreshCw} pressAt={1}>Refresh</Btn>}>
          <Reveal at={1.5}>
            <Row lead={<IconTile icon={Shirt} />} title="Linen kurta" sub="In stock" right="₹1,499" />
          </Reveal>
          <Reveal at={2}>
            <Row lead={<IconTile icon={Watch} />} title="Analog watch" sub="In stock" right="₹2,299" />
          </Reveal>
          <Reveal at={2.5}>
            <Row lead={<IconTile icon={Package} />} title="Gift box" sub="Low stock" right="₹799" />
          </Reveal>
        </Panel>
      </Float>
      <Float x={66} y={22} w={26} at={3.2}>
        <Panel title="wa.me QR" icon={QrCode}>
          <Stack gap={0.9}>
            <Row title="Scan opens chat" sub="Storefront or ads" />
            <Btn primary icon={Download} pressAt={4.6}>Download PNG</Btn>
          </Stack>
        </Panel>
      </Float>
      <Cursor
        path={[
          [92, 88, 3.6],
          [79, 46, 4.4],
          [79, 46, 5],
          [90, 80, 6],
        ]}
        clicks={[4.6]}
      />
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
