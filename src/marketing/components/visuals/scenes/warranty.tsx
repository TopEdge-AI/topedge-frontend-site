/**
 * Warranty scenes: hub list, unassigned queue and manual assign, all tied to
 * the Shopify order. Keys are the image paths in productPages.ts.
 */
import type { CSSProperties, ReactNode } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Droplet,
  Droplets,
  Headphones,
  Hourglass,
  Inbox,
  KeyRound,
  Layers,
  Package,
  Plus,
  Search,
  ShieldCheck,
  ShieldPlus,
  ShoppingBag,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import {
  Avatar,
  Btn,
  Chip,
  Cursor,
  Donut,
  Field,
  Float,
  IconTile,
  Node,
  Panel,
  Row,
  Stage,
  Stat,
  Toggle,
  Wires,
  type SceneMap,
  type SceneProps,
} from '../kit';

/* ── Local bits ────────────────────────────────────────────────────────── */

const subList: CSSProperties = {
  margin: '0.1em 0 0.35em 1.6em',
  padding: '0.3em 0.4em',
  borderRadius: '0.9em',
  background: 'rgba(15, 23, 42, 0.025)',
  boxShadow: '0 0 0 1px rgba(15, 23, 42, 0.05) inset',
};

/** Monospace SKU tag. */
function Sku({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        padding: '0.2em 0.5em',
        borderRadius: '0.45em',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: '0.8em',
        fontWeight: 600,
        color: '#5a6474',
        background: '#f1f5f9',
        boxShadow: '0 0 0 1px rgba(15, 23, 42, 0.06) inset',
      }}
    >
      {children}
    </span>
  );
}

const grid2: CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7em' };

/* ── Hero (wide, 64em x 40em) ──────────────────────────────────────────── */

/** Hub with one customer expanded: products, SKUs and coverage left. */
function HubExpanded({ label }: SceneProps) {
  return (
    <Stage label={label} tone="emerald" shape="wide">
      <Wires shape="wide" tone="emerald" paths={['M 66 17.5 C 70 17.5, 70 11, 74 11', 'M 66 26 C 70 26, 70 37.5, 74 37.5']} />
      <Float x={5} y={9} w={61} delay={0} z={3}>
        <Panel
          title="Warranty hub"
          icon={ShieldCheck}
          tone="emerald"
          right={<Chip tone="slate" icon={Search}>Name, phone, order</Chip>}
        >
          <Row
            lead={<Avatar name="Vikram Nair" tone="emerald" />}
            title="Vikram Nair"
            sub="#GS-1144 · 12 Sept 2026"
            right={<Chip tone="emerald">3 products</Chip>}
            active
          />
          <div style={subList}>
            <Row
              lead={<IconTile icon={Droplet} tone="amber" size="sm" />}
              title="Vitamin C Serum 30ml"
              sub="1 year cover"
              right={<><Sku>VIT-C-30</Sku><Chip tone="emerald" dot>11 mo left</Chip></>}
            />
            <Row
              lead={<IconTile icon={Droplets} tone="sky" size="sm" />}
              title="Niacinamide Toner"
              sub="6 months cover"
              right={<><Sku>NIA-TONER</Sku><Chip tone="emerald" dot>6 mo left</Chip></>}
            />
          </div>
          <Row
            lead={<Avatar name="Arjun Kapoor" tone="violet" />}
            title="Arjun Kapoor"
            sub="#GS-1120 · Retinol Night Cream"
            right={<Chip tone="emerald" dot>Active</Chip>}
          />
          <Row
            lead={<Avatar name="Ananya Rao" tone="sky" />}
            title="Ananya Rao"
            sub="#GS-1042 · Vitamin C Serum"
            right={<Chip tone="emerald" dot>Active</Chip>}
          />
        </Panel>
      </Float>
      <Float x={74} y={8} w={22} delay={3} rotate={2} drift>
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6em' }}>
            <Donut pct={92} tone="emerald" size={8}>11 mo</Donut>
            <span style={{ fontSize: '0.95em', fontWeight: 600, textAlign: 'center' }}>Coverage left</span>
          </div>
        </Panel>
      </Float>
      <Float x={71} y={52} w={26} delay={4}>
        <Node icon={KeyRound} tone="violet" title="WhatsApp OTP" sub="Buyer registered" active />
      </Float>
      <Float x={36} y={86} delay={6}>
        <Chip tone="emerald" solid icon={ShoppingBag}>Tied to Shopify order</Chip>
      </Float>
    </Stage>
  );
}

/* ── Showcases (wide, 64em x 40em) ─────────────────────────────────────── */

/** Hub list with status badges, a warranty batch and the support contact. */
function HubList({ label }: SceneProps) {
  return (
    <Stage label={label} tone="emerald" shape="wide">
      <Float x={4} y={11} w={58} delay={0} z={3}>
        <Panel
          title="Warranty hub"
          icon={ShieldCheck}
          tone="emerald"
          right={<Btn primary tone="emerald" icon={Plus}>New record</Btn>}
        >
          <Row lead={<Avatar name="Neha Gupta" tone="emerald" />} title="Neha Gupta" sub="Vitamin C Serum · #GS-1012" right={<Chip tone="emerald" dot>Active</Chip>} />
          <Row lead={<Avatar name="Rahul Mehta" tone="amber" />} title="Rahul Mehta" sub="Hydrating Moisturizer · #GS-1098" right={<Chip tone="amber" dot>Claim open</Chip>} active />
          <Row lead={<Avatar name="Arjun Kapoor" tone="sky" />} title="Arjun Kapoor" sub="Retinol Night Cream · #GS-1120" right={<Chip tone="sky" dot>Registered</Chip>} />
          <Row lead={<Avatar name="Ananya Rao" tone="slate" />} title="Ananya Rao" sub="Niacinamide Toner · #GS-0987" right={<Chip tone="slate">Expired</Chip>} />
        </Panel>
      </Float>
      <Float x={66} y={7} w={30} delay={2} rotate={2} drift>
        <Panel title="Summer batch" icon={Layers} tone="violet">
          <div style={grid2}>
            <Field label="Valid from" value="20/09/2026" />
            <Field label="Valid until" value="20/09/2028" />
          </div>
          <div style={{ marginTop: '0.6em' }}>
            <Row lead={<IconTile icon={Droplet} tone="amber" size="sm" />} title="Vitamin C" right={<Chip tone="violet">12 mo</Chip>} />
            <Row lead={<IconTile icon={Sparkles} tone="sky" size="sm" />} title="Face Mist" right={<Chip tone="violet">18 mo</Chip>} />
          </div>
        </Panel>
      </Float>
      <Float x={8} y={84} delay={5}>
        <Chip tone="emerald" icon={ShieldCheck}>Status on every record</Chip>
      </Float>
      <Float x={64} y={73} w={32} delay={4}>
        <Panel>
          <Row
            lead={<IconTile icon={Headphones} tone="sky" />}
            title="Support contact"
            sub="Shown on every record"
            right={<Toggle tone="emerald" />}
          />
        </Panel>
      </Float>
    </Stage>
  );
}

/** Unassigned queue: nothing leaves until someone owns it. */
function Unassigned({ label }: SceneProps) {
  const assign = <Btn primary tone="violet">Assign</Btn>;
  return (
    <Stage label={label} tone="violet" shape="wide">
      <Wires shape="wide" tone="violet" paths={['M 66 21 C 69 21, 68 32.5, 71 32.5']} />
      <Float x={4} y={9} w={62} delay={0} z={3}>
        <Panel
          title="Warranty records"
          icon={Inbox}
          tone="violet"
          right={<><Chip tone="slate">Live</Chip><Chip tone="violet" solid>Unassigned</Chip></>}
        >
          <Row lead={<IconTile icon={Package} tone="slate" size="sm" />} title="#1041 · Moksh Patel" sub="1 item · 13/09/2026" right={<><Chip tone="rose">Unassigned</Chip>{assign}</>} />
          <Row lead={<IconTile icon={Package} tone="violet" size="sm" />} title="#1040 · Kavya Iyer" sub="1 item · 11/09/2026" right={<><Chip tone="rose">Unassigned</Chip>{assign}</>} active />
          <Row lead={<IconTile icon={Package} tone="slate" size="sm" />} title="#1039 · Rohan Das" sub="2 items · 11/09/2026" right={<><Chip tone="rose">Unassigned</Chip>{assign}</>} />
          <Row lead={<IconTile icon={Package} tone="slate" size="sm" />} title="#1038 · Sneha Reddy" sub="1 item · 31/08/2026" right={<><Chip tone="rose">Unassigned</Chip>{assign}</>} />
          <Row lead={<IconTile icon={Package} tone="slate" size="sm" />} title="#1037 · Aman Verma" sub="1 item · 31/08/2026" right={<><Chip tone="rose">Unassigned</Chip>{assign}</>} />
        </Panel>
      </Float>
      <Float x={71} y={10} w={25} delay={2} rotate={-2}>
        <Panel>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8em' }}>
            <IconTile icon={Hourglass} tone="amber" size="lg" />
            <Stat label="Need an owner" value="5" />
          </div>
        </Panel>
      </Float>
      <Float x={71} y={48} w={26} delay={4} drift>
        <Node icon={UserCheck} tone="emerald" title="Priya took #1040" sub="Assigned just now" active />
      </Float>
      <Float x={8} y={85} delay={6}>
        <Chip tone="violet" icon={Inbox}>Stays here until owned</Chip>
      </Float>
      <Cursor x={60} y={36} delay={6} />
    </Stage>
  );
}

/** Manual assign: you pick the order, the product and the owner. */
function ManualAssign({ label }: SceneProps) {
  return (
    <Stage label={label} tone="violet" shape="wide">
      <Wires
        shape="wide"
        tone="violet"
        paths={['M 57 13 C 61 13, 60 9.5, 64 9.5', 'M 57 26 C 61 26, 60 27.5, 64 27.5']}
      />
      <Float x={5} y={10} w={52} delay={0} z={3}>
        <Panel title="Assign warranty" icon={ShieldPlus} tone="violet">
          <div style={grid2}>
            <Field label="Customer" value="Moksh Patel" />
            <Field label="Order reference" value="#1066" mono />
          </div>
          <div style={{ margin: '0.7em 0', borderRadius: '0.9em', boxShadow: '0 0 0 1px rgba(15, 23, 42, 0.08) inset' }}>
            <Row
              lead={<IconTile icon={Droplet} tone="amber" />}
              title="Vitamin C Serum 30ml"
              sub="From order #1066"
              right={<Btn>Browse</Btn>}
            />
          </div>
          <div style={grid2}>
            <Field label="Purchase date" value="20/09/2026" />
            <Field label="Warranty (months)" value="12" />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
              marginTop: '0.7em',
              padding: '0.55em 0.7em',
              borderRadius: '0.8em',
              background: '#f5f3ff',
              fontSize: '0.95em',
              fontWeight: 600,
            }}
          >
            <Chip tone="violet" icon={CalendarDays}>12 months</Chip>
            <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.35em', color: '#5a6474' }}>
              20 Sept 2026
              <ArrowRight style={{ width: '1em', height: '1em' }} />
              20 Sept 2027
            </span>
          </div>
        </Panel>
      </Float>
      <Float x={64} y={9} w={31} delay={2}>
        <Node icon={ShoppingBag} tone="emerald" title="Shopify order #1066" sub="Paid · 1 item" />
      </Float>
      <Float x={64} y={38} w={31} delay={3} drift>
        <Panel title="Owner" icon={UserCheck} tone="violet">
          <Row lead={<Avatar name="Priya Sharma" tone="violet" />} title="Priya Sharma" sub="Support" right={<Chip tone="emerald" dot>Picked</Chip>} active />
          <Row lead={<Avatar name="Karan Joshi" tone="sky" />} title="Karan Joshi" sub="Operations" />
        </Panel>
      </Float>
      <Float x={66} y={81} delay={5}>
        <Chip tone="violet" solid icon={UserCheck}>You pick, not the bot</Chip>
      </Float>
    </Stage>
  );
}

const scenes: SceneMap = {
  '/warranty-sub-feature/manual-assign.webp': HubExpanded,
  '/warranty-sub-feature/27.webp': HubList,
  '/warranty-sub-feature/unassigned.webp': Unassigned,
  '/warranty-sub-feature/2212.webp': ManualAssign,
};

export default scenes;
