/**
 * Opt-in Tools scenes, v3 storytelling style (see flow-builder.tsx).
 *
 * Square tiles: plain white, one focal element, at most two small pieces.
 * Wide panels: page mesh backdrop, one large white card, one or two satellites.
 * Each scene plays a short story with `at` timings, then replays.
 * Keys are the image paths in productPages.ts.
 */
import { Clock, Gift, MessageCircle, MousePointerClick, ShoppingCart, Sparkles, Users } from 'lucide-react';
import {
  Avatar,
  Btn,
  Bubble,
  Burst,
  Chip,
  Coupon,
  Cursor,
  Field,
  Float,
  Glow,
  IconTile,
  Panel,
  Reveal,
  Rings,
  Row,
  Scratch,
  SpinWheel,
  Stack,
  Stage,
  Stat,
  Toggle,
  TypeText,
  type SceneMap,
  type SceneProps,
} from '../kit';

/* ── Bento tiles: plain, one focal element ─────────────────────────────── */

/** Every signup lands on one consented list: a new subscriber slides in on top. */
function SubscriberList({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Glow x={50} y={56} size={22} />
      <Float x={12} y={22} w={76} delay={0} z={3} fade="bottom">
        <Panel title="Subscribers" icon={Users}>
          <Reveal at={1.2}>
            <Row
              lead={<Avatar name="Ananya Rao" />}
              title="Ananya Rao"
              sub="Spin to win · just now"
              right={<Chip tone="emerald" dot>Opted in</Chip>}
              active
            />
          </Reveal>
          <Row
            lead={<Avatar name="Kabir Shah" />}
            title="Kabir Shah"
            sub="Welcome popup · 9m"
            right={<Chip tone="emerald" dot>Opted in</Chip>}
          />
          <Row
            lead={<Avatar name="Meera Pillai" />}
            title="Meera Pillai"
            sub="Widget · 21m"
            right={<Chip tone="emerald" dot>Opted in</Chip>}
          />
          <Row
            lead={<Avatar name="Rohan Das" />}
            title="Rohan Das"
            sub="Pulse Drop · 1h"
            right={<Chip tone="emerald" dot>Opted in</Chip>}
          />
        </Panel>
      </Float>
      <Float x={35} y={10} at={2}>
        <Chip icon={Users}>+38 today</Chip>
      </Float>
    </Stage>
  );
}

/** When, where and to whom the popup shows. */
function Triggers({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Glow x={50} y={50} size={22} />
      <Float x={13} y={22} w={74} delay={0} z={3}>
        <Panel title="Show popup when">
          <Row lead={<IconTile icon={MousePointerClick} />} title="Exit intent" right={<Toggle />} active />
          <Row lead={<IconTile icon={Clock} />} title="After 8 seconds" right={<Toggle />} />
          <Row lead={<IconTile icon={ShoppingCart} />} title="Add to cart" right={<Toggle on={false} />} />
        </Panel>
      </Float>
      <Float x={30} y={76} at={2.4}>
        <Chip dot>On product pages</Chip>
      </Float>
      <Cursor
        path={[
          [62, 88, 0.3],
          [76, 44, 1.2],
          [70, 82, 2.4],
        ]}
        clicks={[1.35]}
      />
    </Stage>
  );
}

/** A floating chat button: tap it, leave a number, WhatsApp opens. */
function Widget({ label }: SceneProps) {
  return (
    <Stage label={label} duration={6}>
      <Rings x={64} y={66} count={4} gap={9} />
      <Float x={54} y={52} delay={0} z={3}>
        <IconTile icon={MessageCircle} size="xl" pulse />
      </Float>
      <Float x={8} y={20} w={60} at={1.7}>
        <Bubble from="biz">Get order updates on WhatsApp?</Bubble>
      </Float>
      <Float x={10} y={74} at={3.2}>
        <Chip tone="emerald" dot>Number saved</Chip>
      </Float>
      <Cursor
        path={[
          [30, 92, 0.3],
          [66, 66, 1.1],
        ]}
        clicks={[1.25]}
      />
    </Stage>
  );
}

/* ── Wide panels: one large card, a satellite or two ───────────────────── */

/** VIP drop: copy the code, claim on WhatsApp, the claim joins the list. */
function PulseDrop({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7}>
      <Float x={34} y={12} w={52} delay={0} z={3}>
        <Panel title="VIP drop is live" icon={Sparkles}>
          <Stack gap={0.9}>
            <Coupon value="15% off" label="Members only" code="VIPDROP15" copyAt={1.6} />
            <Btn primary icon={MessageCircle} pressAt={3}>
              Claim on WhatsApp
            </Btn>
          </Stack>
        </Panel>
      </Float>
      <Burst x={60} y={52} at={3.1} />
      <Float x={6} y={34} w={24} at={3.6}>
        <Panel glass title="Just claimed" icon={Users}>
          <Row title="Kavya Iyer" sub="Added to list" />
        </Panel>
      </Float>
      <Cursor
        path={[
          [88, 80, 0.3],
          [76, 36, 1.4],
          [62, 54, 2.8],
        ]}
        clicks={[1.55, 2.95]}
      />
    </Stage>
  );
}

/** Welcome popup: the number types in, Continue, opted in. */
function WelcomePopup({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={6.5}>
      <Float x={6} y={26} w={26} delay={0}>
        <Panel glass title="Layout">
          <Row title="Centre modal" sub="Selected" />
          <Row title="Slide-in" sub="Bottom right" />
          <Row title="Bottom bar" sub="Full width" />
        </Panel>
      </Float>
      <Float x={38} y={14} w={50} delay={2} z={3}>
        <Panel title="Welcome! 10% off" icon={Gift}>
          <Stack gap={0.9}>
            <div className="fv-field">
              <small>WhatsApp number</small>
              <TypeText text="+91 98765 43210" at={1} cps={16} />
            </div>
            <Btn primary pressAt={2.9}>
              Continue
            </Btn>
          </Stack>
        </Panel>
      </Float>
      <Float x={40} y={47} at={3.4}>
        <Chip tone="emerald" dot>Opted in</Chip>
      </Float>
      <Cursor
        path={[
          [90, 86, 0.6],
          [64, 54, 2.7],
        ]}
        clicks={[2.85]}
      />
    </Stage>
  );
}

/** Spin to win: press Spin, the wheel lands, the coupon drops in. */
function Spin({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={7}>
      <Float x={10} y={6} w={38} delay={0} z={3}>
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.4em', paddingTop: '1em' }}>
            <SpinWheel
              slices={['10% off', 'Free ship', '₹200 off', 'Try again', '15% off', '5% off']}
              land={0}
              at={1.1}
              spin={2.5}
              size={18}
            />
            <Btn primary pressAt={1}>
              Spin
            </Btn>
          </div>
        </Panel>
      </Float>
      <Burst x={29} y={36} at={3.6} />
      <Float x={54} y={30} w={36} at={3.8}>
        <Coupon value="10% off" label="+91 98765 43210" code="SPIN-7KQ2" />
      </Float>
      <Float x={58} y={66} at={4.4}>
        <Chip dot>Consent recorded</Chip>
      </Float>
      <Cursor
        path={[
          [44, 92, 0.2],
          [30, 63, 0.85],
          [40, 90, 2],
        ]}
        clicks={[0.95]}
      />
    </Stage>
  );
}

/** Mystery discount: scratch the foil, the code appears, consent is kept. */
function Mystery({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={6.5}>
      <Float x={30} y={10} w={46} delay={0} z={3}>
        <Panel title="Mystery discount" icon={Gift}>
          <Stack gap={0.9}>
            <Scratch at={1.4}>
              <Stat label="You unlocked" value="20% off" delta="Code MYST-20" />
            </Scratch>
            <Field label="WhatsApp number" value="+91 99887 66554" />
          </Stack>
        </Panel>
      </Float>
      <Burst x={53} y={36} at={2.7} />
      <Float x={56} y={52} at={3.3} z={4}>
        <Chip tone="emerald" dot>Added with consent</Chip>
      </Float>
      <Cursor
        path={[
          [40, 30, 1.1],
          [66, 34, 1.7],
          [44, 44, 2.2],
          [68, 46, 2.7],
        ]}
        clicks={[]}
      />
    </Stage>
  );
}

const scenes: SceneMap = {
  '/opt-in-sub-feature/10.webp': SubscriberList,
  '/opt-in-sub-feature/11.webp': Triggers,
  '/opt-in-sub-feature/12.webp': Widget,
  '/opt-in-sub-feature/16.webp': PulseDrop,
  '/opt-in-sub-feature/17.webp': WelcomePopup,
  '/opt-in-sub-feature/18.webp': Spin,
  '/opt-in-sub-feature/19.webp': Mystery,
};

export default scenes;
