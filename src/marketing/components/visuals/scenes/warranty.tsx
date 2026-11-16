/**
 * Warranty scenes (v7). A sample appliance brand, Aura Home. The hero
 * follows a buyer from the QR on the box to a registered warranty on
 * WhatsApp; the showcases are the team's hub, queue and claim desk.
 * Keys are the image paths in productPages.ts.
 */
import type { CSSProperties, ReactNode } from 'react';
import {
  Check,
  Inbox,
  MessageCircle,
  Plus,
  ShieldCheck,
  ShieldPlus,
  UserCheck,
} from '../icons';
import {
  Attach,
  Avatar,
  Btn,
  Bubble,
  Chip,
  Cursor,
  Float,
  IPhone,
  Label,
  Panel,
  QR,
  Reveal,
  Row,
  Stack,
  Stage,
  Swap,
  Toast,
  TypeText,
  type SceneMap,
  type SceneProps,
} from '../kit';

const vars = (o: Record<string, string | number>) => o as unknown as CSSProperties;

function AuraDp() {
  return <span className="wr-dp">A</span>;
}

/** The warranty card WhatsApp sends once registration is done. */
function WarrantyCard() {
  return (
    <div className="wr-card">
      <span className="wr-card__shield">
        <ShieldCheck />
      </span>
      <span className="wr-card__text">
        <small>WARRANTY ACTIVE</small>
        <b>Air purifier X2</b>
        <span>Serial AP2-48213 · till 12 Sept 2027</span>
      </span>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="fv-field">
      <small>{label}</small>
      <span>{children}</span>
    </div>
  );
}

/* ── Hero: from the box to a registered warranty ───────────────────────── */

function Register({ label }: SceneProps) {
  return (
    <Stage label={label}
      steps={[[0, 'Scan the QR on the box'], [2.4, 'WhatsApp opens with the serial'], [3.6, 'Purchase found'], [5.6, 'Buyer confirms'], [7.6, 'Warranty card sent'], [9.4, 'Record created']]} shape="wide" duration={12}>
      <Float x={8} y={10} w={38}>
        <div className="wr-box">
          <div className="wr-box__top">
            <b>aura</b>
            <small>Air purifier X2</small>
          </div>
          <div className="wr-box__sticker" data-cursor="qr">
            <QR seed="AP2-48213" size={7} />
            <span>
              <b>Register your warranty</b>
              <small>Scan with your phone camera</small>
            </span>
            <i className="wr-scan" />
          </div>
          <span className="wr-box__serial">S/N AP2-48213</span>
        </div>
        <Attach place="br" at={9.4} dx={1.2} dy={-2}>
          <Toast icon={ShieldCheck} tone="emerald" title="Record created" sub="Warranty hub · Vikram Nair" />
        </Attach>
      </Float>
      <Float x={60} y={0} at={1.6}>
        <IPhone name="Aura Home" logo={<AuraDp />} time="18:04">
          <Reveal at={2.4}>
            <Bubble from="user" time="18:04" read>
              Hi! I want to register my warranty. Serial AP2-48213
            </Bubble>
          </Reveal>
          <Reveal at={3.6}>
            <Bubble from="biz" time="18:04" buttons={[{ label: 'Yes, register it', at: 5.6, cursor: 'yes' }]}>
              Found it, Vikram. Air purifier X2 from order #1144, delivered 12 Sept. Register this one?
            </Bubble>
          </Reveal>
          <Reveal at={6.6}>
            <Bubble from="user" time="18:05" read>
              Yes, register it
            </Bubble>
          </Reveal>
          <Reveal at={7.6}>
            <Bubble from="biz" time="18:05" media={<WarrantyCard />}>
              You're covered for 24 months. Reply CLAIM here any time you need help.
            </Bubble>
          </Reveal>
        </IPhone>
      </Float>
      <Cursor touch path={[['qr', 0.6], ['qr', 1.3], ['yes', 5.3], ['yes', 5.9]]} clicks={[0.9, 5.6]} />
    </Stage>
  );
}

/* ── Showcases ─────────────────────────────────────────────────────────── */

/** The hub: every registration and claim, and a new record added by hand. */
function HubList({ label }: SceneProps) {
  return (
    <Stage label={label}
      steps={[[0, 'Every warranty in one hub'], [1.2, 'Add a record'], [4.2, 'Saved and active']]} shape="wide" duration={9}>
      <Float x={14} y={6} w={66}>
        <Panel
          title="Warranty hub"
          icon={ShieldCheck}
          right={
            <span data-cursor="new">
              <Btn primary icon={Plus} pressAt={1.2}>
                New record
              </Btn>
            </span>
          }
        >
          <Reveal at={4.2}>
            <Row lead={<Avatar name="Kavya Iyer" />} title="Kavya Iyer" sub="Air fryer 4L · #1150 · 24 months" right={<Chip tone="emerald" dot>Active</Chip>} />
          </Reveal>
          <Row lead={<Avatar name="Rahul Mehta" />} title="Rahul Mehta" sub="Mixer grinder · #1098" right={<Chip tone="amber" dot>Claim open</Chip>} />
          <Row lead={<Avatar name="Arjun Kapoor" />} title="Arjun Kapoor" sub="Smart TV 43in · #1120" right={<Chip tone="emerald" dot>Active</Chip>} />
          <Row lead={<Avatar name="Sneha Kulkarni" />} title="Sneha Kulkarni" sub="Air purifier X2 · #1144" right={<Chip>Expires in 30 days</Chip>} />
          <Attach place="tr" at={1.5} until={4} dx={1.4} dy={7}>
            <div className="wr-new">
              <b>New record</b>
              <Stack gap={0.6}>
                <Field label="Customer">
                  <TypeText text="Kavya Iyer" at={1.9} />
                </Field>
                <Field label="Product">
                  <TypeText text="Air fryer 4L · 24 months" at={2.5} cps={30} />
                </Field>
              </Stack>
              <span className="wr-save" style={vars({ '--fv-press': '3.6s' })}>
                <Btn primary pressAt={3.6}>Save</Btn>
              </span>
            </div>
          </Attach>
        </Panel>
      </Float>
      <Cursor path={[[80, 98, 0.2], ['new', 0.9], ['new', 1.4], [84, 72, 3.4], [84, 72, 3.8]]} clicks={[1.2, 3.6]} />
    </Stage>
  );
}

/** Unassigned registrations wait in a queue until a teammate takes them. */
function Unassigned({ label }: SceneProps) {
  return (
    <Stage label={label}
      steps={[[0, 'Waiting registrations'], [1.6, 'Assign'], [2.3, 'Priya takes it']]} shape="wide" duration={8}>
      <Float x={16} y={6} w={64}>
        <Panel title="Unassigned" icon={Inbox} right={<Swap at={2.4} a={<Chip tone="amber" dot>3 waiting</Chip>} b={<Chip tone="amber" dot>2 waiting</Chip>} />}>
          <Row lead={<Avatar name="Moksh Patel" />} title="#1041 · Moksh Patel" sub="Water purifier · 13 Sept" right={<Btn>Assign</Btn>} />
          <Row
            lead={<Avatar name="Kavya Iyer" />}
            title="#1040 · Kavya Iyer"
            sub="Air fryer · 11 Sept"
            right={
              <span data-cursor="assign">
                <Swap
                  at={2.3}
                  a={<Btn primary pressAt={1.6}>Assign</Btn>}
                  b={
                    <span className="ch-who ch-who--named">
                      <Avatar name="Priya Sharma" />
                      Priya
                    </span>
                  }
                />
              </span>
            }
            active
          />
          <Row lead={<Avatar name="Rohan Das" />} title="#1039 · Rohan Das" sub="Smart bulbs · 11 Sept" right={<Btn>Assign</Btn>} />
          <Attach place="r" at={1.8} until={2.3} dx={-6} dy={-1}>
            <div className="wr-pick">
              <Label>Assign to</Label>
              <Row lead={<Avatar name="Priya Sharma" />} title="Priya Sharma" sub="Support" active />
              <Row lead={<Avatar name="Karan Joshi" />} title="Karan Joshi" sub="Operations" />
            </div>
          </Attach>
          <Attach place="br" at={2.8} dx={1.6} dy={-1}>
            <Toast icon={UserCheck} tone="emerald" title="Priya took #1040" sub="Kavya gets a WhatsApp update" />
          </Attach>
        </Panel>
      </Float>
      <Cursor path={[[80, 98, 0.4], ['assign', 1.3], ['assign', 1.8], ['assign', 2.1], [86, 90, 3.4]]} clicks={[1.6, 2.1]} />
    </Stage>
  );
}

/** A claim comes in on WhatsApp; the team links the order and assigns it. */
function ManualAssign({ label }: SceneProps) {
  return (
    <Stage label={label}
      steps={[[0, 'Claim arrives on WhatsApp'], [1.4, 'Link the order'], [3.9, 'Assign a teammate'], [4.6, 'Customer notified']]} shape="wide" duration={9}>
      <Float x={10} y={6} w={80}>
        <Panel title="New claim" icon={ShieldPlus} right={<Chip tone="amber" dot>Open</Chip>}>
          <div className="mm-studio">
            <div className="ch-msg wr-claim">
              <Stack gap={0.5}>
                <Bubble from="user" time="10:12">
                  CLAIM, my air fryer stopped heating 😕
                </Bubble>
                <Reveal at={0.8}>
                  <Bubble from="biz" time="10:12" read>
                    Sorry about that, Rohan. Our team is on it, you'll hear back today.
                  </Bubble>
                </Reveal>
              </Stack>
            </div>
            <Stack gap={0.7}>
              <Field label="Shopify order">
                <TypeText text="#1066 · Rohan Das" at={1.4} />
              </Field>
              <Field label="Product">
                <TypeText text="Air fryer 4L · 9 months left" at={2.1} cps={30} />
              </Field>
              <Field label="Teammate">
                <TypeText text="Priya Sharma" at={2.9} />
              </Field>
              <span data-cursor="assign" className="wr-save">
                <Swap at={4.2} a={<Btn primary icon={UserCheck} pressAt={3.9}>Assign claim</Btn>} b={<Chip tone="emerald" icon={Check}>Assigned to Priya</Chip>} />
              </span>
            </Stack>
          </div>
          <Attach place="br" at={4.6} dx={1.6} dy={-1}>
            <Toast icon={MessageCircle} tone="emerald" title="Rohan notified" sub="Claim #W-208 on WhatsApp" />
          </Attach>
        </Panel>
      </Float>
      <Cursor path={[[70, 98, 3], ['assign', 3.6], ['assign', 4.2], [80, 96, 5.2]]} clicks={[3.9]} />
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
