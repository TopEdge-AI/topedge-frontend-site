/**
 * Warranty scenes, v3 storytelling style (see flow-builder.tsx).
 *
 * Every warranty visual is a wide panel: one large white card on the page
 * mesh, at most one or two satellites, and a short story told with `at` and
 * `until`. Keys are the image paths in productPages.ts.
 */
import {
  Inbox,
  KeyRound,
  MessageCircle,
  Package,
  Plus,
  QrCode,
  ShieldCheck,
  ShieldPlus,
  UserCheck,
} from 'lucide-react';
import {
  Avatar,
  Btn,
  Burst,
  Chip,
  Cursor,
  Float,
  IconTile,
  Node,
  Panel,
  Reveal,
  Row,
  Stack,
  Stage,
  TypeText,
  type SceneMap,
  type SceneProps,
} from '../kit';

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

/** Hero: the buyer scans the box QR, types the OTP, and the warranty is live. */
function Register({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={3} y={32} w={25} at={0.2}>
        <Panel glass title="Box QR scanned" icon={QrCode}>
          <Row title="Air purifier X2" sub="Serial AP2-48213" />
        </Panel>
      </Float>
      <Float x={32} y={18} w={52} at={0.8} until={3.7} z={3}>
        <Panel
          title="Register warranty"
          icon={KeyRound}
          right={
            <Btn primary pressAt={3.2}>
              Verify
            </Btn>
          }
        >
          <Stack gap={0.8}>
            <Row lead={<Avatar name="Vikram Nair" />} title="Vikram Nair" sub="OTP sent on WhatsApp" />
            <TypedField label="Enter OTP" text="4 8 2 1 9 3" at={1.5} />
          </Stack>
        </Panel>
      </Float>
      <Float x={32} y={18} w={52} at={3.8} z={3}>
        <Panel
          title="Warranty record"
          icon={ShieldCheck}
          right={
            <Chip tone="emerald" dot>
              Registered
            </Chip>
          }
        >
          <Row lead={<Avatar name="Vikram Nair" />} title="Vikram Nair" sub="Order #1144 · 12 Sept" />
          <Row
            lead={<IconTile icon={Package} />}
            title="Air purifier X2"
            sub="12 month cover"
            right={<Chip>11 months left</Chip>}
            active
          />
        </Panel>
      </Float>
      <Burst x={77} y={24} at={4} />
      <Cursor
        path={[
          [70, 92, 0.9],
          [78, 23, 2.9],
          [78, 23, 3.6],
        ]}
        clicks={[3.2]}
      />
    </Stage>
  );
}

/** Hub list: create a record and it joins the list with its status badge. */
function HubList({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={32} y={14} w={56} at={0.2} z={3}>
        <Panel
          title="Warranty hub"
          icon={ShieldCheck}
          right={
            <Btn primary icon={Plus} pressAt={1.5}>
              New record
            </Btn>
          }
        >
          <Reveal at={3.9}>
            <Row
              lead={<Avatar name="Kavya Iyer" />}
              title="Kavya Iyer"
              sub="Air fryer · #1150"
              right={
                <Chip tone="emerald" dot>
                  Active
                </Chip>
              }
              active
            />
          </Reveal>
          <Row
            lead={<Avatar name="Rahul Mehta" />}
            title="Rahul Mehta"
            sub="Mixer grinder · #1098"
            right={
              <Chip tone="amber" dot>
                Claim open
              </Chip>
            }
          />
          <Row
            lead={<Avatar name="Arjun Kapoor" />}
            title="Arjun Kapoor"
            sub="Smart TV 43in · #1120"
            right={<Chip>Registered</Chip>}
          />
        </Panel>
      </Float>
      <Float x={3} y={30} w={26} at={1.8} until={3.8}>
        <Panel glass title="New record" icon={ShieldPlus}>
          <Stack gap={0.7}>
            <TypedField label="Customer" text="Kavya Iyer" at={2.1} />
            <TypedField label="Support contact" text="Priya Sharma" at={2.7} />
          </Stack>
        </Panel>
      </Float>
      <Cursor
        path={[
          [92, 80, 0.4],
          [79, 19, 1.3],
          [79, 19, 1.9],
          [62, 70, 3.2],
        ]}
        clicks={[1.5]}
      />
    </Stage>
  );
}

/** Unassigned queue: a record waits until a teammate takes it. */
function Unassigned({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={6} y={14} w={54} at={0.2} z={3}>
        <Panel
          title="Unassigned"
          icon={Inbox}
          right={
            <Chip tone="amber" dot>
              3 waiting
            </Chip>
          }
        >
          <Row
            lead={<IconTile icon={Package} />}
            title="#1041 · Moksh Patel"
            sub="Water purifier · 13 Sept"
            right={<Btn>Assign</Btn>}
          />
          <Row
            lead={<IconTile icon={Package} />}
            title="#1040 · Kavya Iyer"
            sub="Air fryer · 11 Sept"
            right={
              <Btn primary pressAt={1.6}>
                Assign
              </Btn>
            }
            active
          />
          <Row
            lead={<IconTile icon={Package} />}
            title="#1039 · Rohan Das"
            sub="Smart bulbs · 11 Sept"
            right={<Btn>Assign</Btn>}
          />
        </Panel>
      </Float>
      <Float x={63} y={30} w={30} at={1.9} until={3.6}>
        <Panel glass title="Assign to" icon={UserCheck}>
          <Row lead={<Avatar name="Priya Sharma" />} title="Priya Sharma" sub="Support" />
          <Row lead={<Avatar name="Karan Joshi" />} title="Karan Joshi" sub="Operations" />
        </Panel>
      </Float>
      <Float x={63} y={42} w={30} at={3.8} z={4}>
        <Node icon={UserCheck} tone="emerald" title="Priya took #1040" sub="Assigned just now" active />
      </Float>
      <Cursor
        path={[
          [80, 92, 0.4],
          [53, 37, 1.4],
          [76, 44, 2.8],
          [76, 44, 3.6],
        ]}
        clicks={[1.6, 3]}
      />
    </Stage>
  );
}

/** Manual assign: you pick the order and the teammate, not a bot. */
function ManualAssign({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={3} y={32} w={26} at={0.2}>
        <Panel glass title="New claim" icon={MessageCircle}>
          <Row title="Rohan Das" sub="Air fryer stopped heating" />
        </Panel>
      </Float>
      <Float x={33} y={12} w={52} at={0.6} z={3}>
        <Panel
          title="Assign warranty"
          icon={ShieldPlus}
          right={
            <Btn primary icon={UserCheck} pressAt={3.6}>
              Assign
            </Btn>
          }
        >
          <Stack gap={0.8}>
            <TypedField label="Shopify order" text="#1066 · Rohan Das" at={1.1} />
            <TypedField label="Product" text="Air fryer 4L · 12 months" at={1.9} />
            <TypedField label="Teammate" text="Priya Sharma" at={2.7} />
          </Stack>
        </Panel>
      </Float>
      <Float x={58} y={84} at={4}>
        <Chip tone="emerald" dot>
          Assigned to Priya
        </Chip>
      </Float>
      <Cursor
        path={[
          [72, 94, 0.8],
          [78, 17, 3.3],
          [78, 17, 4],
        ]}
        clicks={[3.6]}
      />
    </Stage>
  );
}

const scenes: SceneMap = {
  '/warranty-sub-feature/manual-assign.webp': Register,
  '/warranty-sub-feature/27.webp': HubList,
  '/warranty-sub-feature/unassigned.webp': Unassigned,
  '/warranty-sub-feature/2212.webp': ManualAssign,
};

export default scenes;
