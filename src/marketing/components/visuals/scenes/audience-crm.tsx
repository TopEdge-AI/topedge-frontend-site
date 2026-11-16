/**
 * Audience CRM scenes (v7). One shopper record or one segment per scene,
 * filling in as the story plays. Keys are the image paths in productPages.ts.
 */
import {
  Check,
  Eye,
  Filter,
  Link2,
  Mail,
  Megaphone,
  MessageCircle,
  Package,
  Phone as PhoneIcon,
  ShoppingBag,
  ShoppingCart,
  UserCheck,
  Users,
  Workflow,
} from '../icons';
import {
  Attach,
  Avatar,
  Btn,
  Chip,
  Cursor,
  Donut,
  Float,
  IconTile,
  KV,
  Label,
  Meter,
  Panel,
  Reveal,
  Row,
  Stage,
  Stat,
  Swap,
  Toast,
  Toggle,
  type IconType,
  type SceneMap,
  type SceneProps,
} from '../kit';

/** A vertical activity timeline: icon dots joined by a hairline. */
function Event({ icon, title, sub, when, at, tone }: { icon: IconType; title: string; sub: string; when: string; at: number; tone?: 'emerald' | 'amber' | 'sky' }) {
  return (
    <Reveal at={at}>
      <div className="cr-ev" data-tone={tone}>
        <IconTile icon={icon} tone={tone} size="sm" tint />
        <span className="cr-ev__text">
          <b>{title}</b>
          <small>{sub}</small>
        </span>
        <time>{when}</time>
      </div>
    </Reveal>
  );
}

function ProfileHead({ name, sub, chip }: { name: string; sub: string; chip?: string }) {
  return (
    <div className="cr-head">
      <Avatar name={name} />
      <span className="cr-head__text">
        <b>{name}</b>
        <small>{sub}</small>
      </span>
      {chip ? <Chip dot>{chip}</Chip> : null}
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */

/** One shopper's record fills in: numbers, then every touchpoint in order. */
function Hero({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={9}>
      <Float x={24} y={4} w={52}>
        <Panel pad>
          <ProfileHead name="Riya Sharma" sub="+91 98200 11223 · Mumbai" chip="VIP" />
          <div className="cr-stats">
            <Stat label="Orders" value="7" />
            <Stat label="Lifetime spend" value="₹18,420" />
            <div className="cr-stats__score">
              <small>Lead score</small>
              <Meter pct={86} value="86" />
            </div>
          </div>
          <Label>Activity</Label>
          <div className="cr-tl">
            <Event icon={Megaphone} title="Diwali sale" sub="Clicked Shop the edit, then ordered" when="2d" at={0.8} />
            <Event icon={MessageCircle} title="WhatsApp chat" sub="Asked about sizing, answered by AI" when="3d" at={1.5} tone="emerald" />
            <Event icon={Package} title="Order #1187 · ₹2,340" sub="Delivered · Prepaid" when="12d" at={2.2} tone="sky" />
          </div>
          <Attach place="l" at={3.4} dx={1.8} dy={-4}>
            <Toast icon={Link2} title="2 numbers, 1 profile" sub="+91 90040 55667 merged" />
          </Attach>
          <Attach place="r" at={4.4} dx={1.8} dy={5}>
            <Toast icon={Users} tone="emerald" title="In 3 segments" sub="Repeat buyers · VIP · Ethnic wear" />
          </Attach>
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Bento tiles ───────────────────────────────────────────────────────── */

/** Order, chat and campaign stack up on one contact, newest on top. */
function Timeline({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={12} w={80}>
        <Panel>
          <ProfileHead name="Ananya Rao" sub="Customer since 2024" />
          <div className="cr-tl">
            <Event icon={Package} title="Order #1204 · ₹1,890" sub="Paid with UPI" when="now" at={2.2} tone="sky" />
            <Event icon={MessageCircle} title="Replied on WhatsApp" sub="“Is the blue one in M?”" when="1h" at={1.4} tone="emerald" />
            <Event icon={Eye} title="Viewed Linen kurta" sub="3 times · website pixel" when="2h" at={0.6} />
          </div>
        </Panel>
      </Float>
    </Stage>
  );
}

/** A segment built here feeds campaigns and journeys directly. */
function Segments({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={16} w={80}>
        <Panel title="High-intent carts" icon={Filter} right={<Chip tone="emerald" dot>1,240</Chip>}>
          <Label>Used in</Label>
          <Reveal at={0.8}>
            <Row lead={<IconTile icon={Megaphone} />} title="Diwali sale" sub="Campaign · sends 7:30 pm" right={<Toggle />} />
          </Reveal>
          <Reveal at={1.6}>
            <Row lead={<IconTile icon={Workflow} />} title="Cart recovery" sub="Journey · 3 steps" right={<Toggle />} />
          </Reveal>
          <Attach place="b" at={2.6} dy={0.4}>
            <Chip icon={Check}>Updates live as shoppers qualify</Chip>
          </Attach>
        </Panel>
      </Float>
    </Stage>
  );
}

/** A score built from purchase and engagement signals. */
function LeadScoring({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={14} w={80}>
        <Panel>
          <ProfileHead name="Ishaan Gupta" sub="Last seen 2 hours ago" />
          <div className="cr-score">
            <Donut pct={86} size={7.4} tone="emerald">
              <Stat label="" value="86" />
            </Donut>
            <div className="cr-score__kv">
              <KV k={<><ShoppingCart className="cr-i" /> Cart ₹3,450</>} v="+30" />
              <KV k={<><Eye className="cr-i" /> Viewed 6 items</>} v="+24" />
              <KV k={<><Package className="cr-i" /> 3 past orders</>} v="+32" />
            </div>
          </div>
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Showcases ─────────────────────────────────────────────────────────── */

/** A chat from an unknown number merges into the shopper it belongs to. */
function Identity({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={24} y={8} w={52}>
        <Panel>
          <ProfileHead name="Riya Sharma" sub="Customer since 2023 · 7 orders" />
          <Row lead={<IconTile icon={PhoneIcon} />} title="+91 98200 11223" sub="Primary · WhatsApp" />
          <Row lead={<IconTile icon={Mail} />} title="riya.s@example.in" sub="Shopify email" />
          <Reveal at={2.6}>
            <Row
              lead={<IconTile icon={PhoneIcon} tone="emerald" />}
              title="+91 90040 55667"
              sub="Secondary · matched on order #1187"
              right={<Chip tone="emerald" icon={Check}>Merged</Chip>}
              active
            />
          </Reveal>
          <Attach place="l" at={0.6} until={2.4} dx={2} dy={4}>
            <Toast icon={MessageCircle} tone="amber" title="New chat · +91 90040 55667" sub="Unknown number" />
          </Attach>
          <Attach place="br" at={3.4} dx={2} dy={-1}>
            <Toast dark icon={UserCheck} title="1 profile, 1 thread" sub="Chat history moved to Riya" />
          </Attach>
        </Panel>
      </Float>
    </Stage>
  );
}

/** One record, everything in it: numbers, orders, chats and campaigns. */
function Customer360({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={14} y={6} w={72}>
        <Panel>
          <ProfileHead name="Arjun Nair" sub="+91 99300 44112 · Bengaluru" chip="Score 86" />
          <div className="cr-360">
            <div>
              <div className="cr-stats cr-stats--two">
                <Stat label="Orders" value="7" />
                <Stat label="Spent" value="₹18,420" />
              </div>
              <Label>Orders</Label>
              <Row lead={<IconTile icon={ShoppingBag} />} title="#1218 · ₹2,190" sub="Delivered · 2 days ago" />
              <Reveal at={1.4}>
                <Row lead={<IconTile icon={MessageCircle} tone="emerald" />} title="Last chat" sub="Wants a size exchange" active />
              </Reveal>
            </div>
            <div className="cr-360__side">
              <Label>Campaigns</Label>
              <Reveal at={2}>
                <Row title="Diwali sale" sub="Clicked, ordered" right={<Chip tone="emerald">₹2,190</Chip>} />
              </Reveal>
              <Reveal at={2.5}>
                <Row title="New arrivals" sub="Read" right={<Chip>Read</Chip>} />
              </Reveal>
              <Reveal at={3}>
                <Row title="Cart recovery" sub="Journey · step 2" right={<Chip tone="amber" dot>Active</Chip>} />
              </Reveal>
            </div>
          </div>
        </Panel>
      </Float>
    </Stage>
  );
}

/** Rules stack up, the live count follows, save it as a segment. */
function SegmentBuilder({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={20} y={6} w={60}>
        <Panel title="New segment" icon={Filter}>
          <Reveal at={0.6}>
            <Row lead={<IconTile icon={ShoppingBag} />} title="Orders 2 or more" sub="Shopify" />
          </Reveal>
          <Reveal at={1.3}>
            <Row lead={<IconTile icon={Package} />} title="Last order in 60 days" sub="Shopify" />
          </Reveal>
          <Reveal at={2}>
            <Row lead={<IconTile icon={MessageCircle} />} title="Opted in on WhatsApp" sub="Consent recorded" />
          </Reveal>
          <div className="cr-foot">
            <Stat label="Matching shoppers" value="3,126" />
            <span data-cursor="save">
              <Swap at={3.9} a={<Btn primary pressAt={3.6}>Save segment</Btn>} b={<Chip tone="emerald" icon={Check}>Saved</Chip>} />
            </span>
          </div>
          <Attach place="tr" at={4.3} dx={1.6} dy={-0.2}>
            <Toast icon={Megaphone} tone="emerald" title="Ready to message" sub="Campaigns · Journeys" />
          </Attach>
        </Panel>
      </Float>
      <Cursor path={[[70, 98, 2.4], ['save', 3.3], ['save', 3.9], [84, 94, 5]]} clicks={[3.6]} />
    </Stage>
  );
}

const scenes: SceneMap = {
  '/audience-crm-hero.webp': Hero,
  '/audience-crm-sub-feature/16.webp': Timeline,
  '/audience-crm-sub-feature/18.webp': Segments,
  '/audience-crm-sub-feature/17.webp': LeadScoring,
  '/leaadd.webp': Identity,
  '/audience-crm-sub-feature/360.webp': Customer360,
  '/audience-crm-sub-feature/crm-segement.webp': SegmentBuilder,
};

export default scenes;
