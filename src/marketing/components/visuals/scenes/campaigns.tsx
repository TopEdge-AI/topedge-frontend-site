/**
 * Campaigns scenes (v7). One product card per scene, a story inside it.
 * The hero follows a Diwali broadcast end to end: send, the shopper's
 * WhatsApp, the tap, checkout, and the revenue it earned, under fireworks.
 * Keys are the image paths in productPages.ts.
 */
import type { CSSProperties } from 'react';
import {
  Check,
  ExternalLink,
  Eye,
  Lock,
  Megaphone,
  Repeat,
  Send,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Tag,
  TrendingUp,
  Users,
} from '../icons';
import {
  Attach,
  Avatar,
  Btn,
  Bubble,
  Chip,
  Cursor,
  Fireworks,
  Float,
  IconTile,
  IPhone,
  KV,
  Label,
  Meter,
  Panel,
  PhoneBanner,
  PhoneSheet,
  ProductArt,
  Reveal,
  Row,
  Spark,
  Stage,
  Stat,
  Swap,
  Toast,
  type SceneMap,
  type SceneProps,
} from '../kit';
import '../../../styles/optin-scenes.css';

const vars = (o: Record<string, string | number>) => o as unknown as CSSProperties;

function BrandDp() {
  return (
    <span className="oi-dp oi-dp--rose">
      <Sparkles strokeWidth={2.4} />
    </span>
  );
}

/* ── Hero: the Diwali broadcast, end to end ────────────────────────────── */

function Hero({ label }: SceneProps) {
  return (
    <Stage
      label={label}
      steps={[[0, 'Pick audience and template'], [1.6, 'Send to 2,418 shoppers'], [2.8, 'Lands on WhatsApp'], [5.4, 'Shopper taps Shop the edit'], [7.6, 'Buys with the Diwali offer'], [9.6, 'Revenue after Meta fees']]}
      shape="wide"
      mood="night"
      duration={13}
      back={
        <Fireworks
          at={0.4}
          every={3.2}
          shells={[
            [10, 26, 0],
            [90, 20, 0.8],
            [24, 70, 1.6],
            [78, 72, 2.3],
            [52, 12, 2.9],
          ]}
        />
      }
    >
      <Float x={12} y={16} w={38}>
        <Panel title="Diwali sale" icon={Megaphone} right={<Swap at={2} a={<Chip tone="amber" dot>Ready</Chip>} b={<Chip tone="emerald" dot>Sending</Chip>} />}>
          <Row lead={<IconTile icon={Sparkles} />} title="diwali_offer" sub="Marketing template · Approved" right={<Chip tone="emerald" icon={Check}>Meta</Chip>} />
          <Row lead={<IconTile icon={Users} />} title="Repeat buyers" sub="2,418 shoppers · score 60+" />
          <div className="cp-send">
            <Swap
              at={1.9}
              a={
                <span data-cursor="send">
                  <Btn primary icon={Send} pressAt={1.6}>
                    Send to 2,418
                  </Btn>
                </span>
              }
              b={<Meter pct={100} label="Delivered" value="2,418 / 2,418" tone="emerald" />}
            />
          </div>
          <Reveal at={9.6}>
            <div className="cp-earned">
              <Stat label="Revenue from this campaign" value="₹1,84,200" delta="+212 orders · after Meta fees" />
            </div>
          </Reveal>
          <Attach place="tr" at={9} dx={1.6} dy={-0.6}>
            <Toast icon={ShoppingBag} tone="emerald" title="New order · ₹2,499" sub="Riya S. · from Diwali sale" />
          </Attach>
        </Panel>
      </Float>
      <Float x={56} y={0} at={0.2}>
        <IPhone
          name="Mira Ethnic"
          logo={<BrandDp />}
          time="7:30"
          overlay={
            <>
              <PhoneBanner at={2.8} until={4.2} title="Mira Ethnic" body="Riya, the Diwali edit is here. 20% off till Sunday" />
              <PhoneSheet at={6} url="miraethnic.in">
                <ProductArt kind="kurta" h={10} tag="−20%" />
                <h5 className="fv-shop__title">Rani pink silk kurta</h5>
                <div className="fv-shop__price">
                  <b>₹2,499</b>
                  <s>₹3,124</s>
                  <em>DIWALI20</em>
                </div>
                <span className="fv-shop__applied">
                  <Tag strokeWidth={2.4} /> Diwali offer applied
                </span>
                <span className="fv-shop__cta is-press" data-cursor="buy" style={vars({ '--fv-press': '7.6s' })}>
                  <ShoppingBag strokeWidth={2.2} /> Buy now
                </span>
              </PhoneSheet>
              <PhoneSheet at={8.1}>
                <div className="fv-shop__done">
                  <span className="fv-shop__check" style={vars({ '--fv-check-at': '8.5s' })}>
                    <Check strokeWidth={3} />
                  </span>
                  <h5>Order placed</h5>
                  <p>Happy Diwali, Riya! Order #2211</p>
                  <div className="oi-order">
                    <ProductArt kind="kurta" h={3.2} />
                    <span>
                      <b>Rani pink silk kurta</b>
                      <small>Size M · Prepaid · Free shipping</small>
                    </span>
                    <b>₹2,499</b>
                  </div>
                  <span className="oi-order__wa">Tracking updates on WhatsApp</span>
                </div>
              </PhoneSheet>
            </>
          }
        >
          <Reveal at={3.4}>
            <Bubble
              from="biz"
              time="7:30 pm"
              media={<ProductArt kind="kurta" h={7} />}
              title="The Diwali edit is here ✨"
              buttons={[{ label: 'Shop the edit', icon: ExternalLink, at: 5.4, cursor: 'shop' }]}
            >
              Riya, 20% off festive wear till Sunday. Free shipping on prepaid orders.
            </Bubble>
          </Reveal>
        </IPhone>
      </Float>
      <Cursor path={[[30, 96, 0.3], ['send', 1.3], ['send', 1.9], [34, 96, 2.6]]} clicks={[1.6]} />
      <Cursor touch path={[['shop', 5.1], ['shop', 5.7], ['buy', 7.3], ['buy', 7.9]]} clicks={[5.4, 7.6]} />
    </Stage>
  );
}

/* ── Bento tiles ───────────────────────────────────────────────────────── */

/** Two behaviour rules become one live segment; the count lands. */
function Segments({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={14} w={80}>
        <Panel title="New segment" icon={Users}>
          <Label>Shoppers who</Label>
          <Reveal at={0.7}>
            <Row lead={<IconTile icon={Repeat} />} title="Ordered 2 or more times" sub="Shopify orders" />
          </Reveal>
          <Reveal at={1.4}>
            <div className="cp-and">
              <span>AND</span>
            </div>
          </Reveal>
          <Reveal at={1.8}>
            <Row lead={<IconTile icon={Eye} />} title="Viewed 3+ products" sub="Last 30 days · pixel" />
          </Reveal>
          <Reveal at={2.6}>
            <div className="cp-total">
              <Stat label="Repeat buyers" value="2,418" />
              <Chip tone="emerald" dot>Live</Chip>
            </div>
          </Reveal>
        </Panel>
      </Float>
    </Stage>
  );
}

/** Shoppers rank themselves by intent, highest first. */
function LeadScoring({ label }: SceneProps) {
  const row = (name: string, sub: string, score: number, tone: 'emerald' | 'violet' | 'amber', at: number) => (
    <Reveal at={at}>
      <Row
        lead={<Avatar name={name} tone={tone === 'violet' ? undefined : tone} />}
        title={name}
        sub={sub}
        right={
          <span className="cp-score" data-tone={tone}>
            <i style={vars({ '--w': score / 100 })} />
            <b>{score}</b>
          </span>
        }
      />
    </Reveal>
  );
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={16} w={80}>
        <Panel title="Top intent" icon={TrendingUp} right={<Chip>Sorted by score</Chip>}>
          {row('Ishaan Gupta', 'Cart ₹3,450 · 2h ago', 92, 'emerald', 0.6)}
          {row('Sneha Kulkarni', 'Viewed 6 items', 81, 'violet', 1.1)}
          {row('Vikram Joshi', '2 past orders', 64, 'amber', 1.6)}
        </Panel>
      </Float>
    </Stage>
  );
}

/** The ₹ number left after Meta fees, under a little Diwali sky. */
function NetReport({ label }: SceneProps) {
  return (
    <Stage
      label={label}
      duration={7.5}
      back={<Fireworks at={1.2} every={3} shells={[[14, 22, 0], [84, 16, 0.9], [50, 8, 1.8]]} />}
    >
      <Float x={12} y={24} w={76}>
        <Panel title="Diwali sale" icon={Megaphone} right={<Chip tone="emerald" dot>Sent</Chip>}>
          <KV k="Revenue" v="₹1,44,718" />
          <KV k="Meta fees" v="− ₹2,158" />
          <KV k="Net revenue" v="₹1,42,560" total />
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Showcases ─────────────────────────────────────────────────────────── */

/** Pick a scored segment, press Send, delivery fills up. */
function AudienceBuilder({ label }: SceneProps) {
  return (
    <Stage label={label}
      steps={[[0, 'Scored segments'], [1.45, 'Pick cart abandoners'], [3, 'Send'], [3.4, 'Delivered to 1,240']]} shape="wide" duration={8}>
      <Float x={20} y={8} w={60}>
        <Panel
          title="Choose audience"
          icon={Users}
          right={
            <span data-cursor="send">
              <Btn primary icon={Send} pressAt={3}>
                Send
              </Btn>
            </span>
          }
        >
          <Row lead={<IconTile icon={Eye} />} title="Browsed, no order" sub="5,906 shoppers · score 40+" />
          <Row lead={<IconTile icon={Repeat} />} title="Repeat buyers" sub="2,418 shoppers · score 60+" />
          <div data-cursor="cart">
            <Swap
              at={1.5}
              a={<Row lead={<IconTile icon={ShoppingCart} />} title="Cart abandoners" sub="1,240 shoppers · score 70+" />}
              b={
                <Row
                  lead={<IconTile icon={ShoppingCart} />}
                  title="Cart abandoners"
                  sub="1,240 shoppers · score 70+"
                  right={<Chip icon={Check}>Selected</Chip>}
                  active
                />
              }
            />
          </div>
          <Attach place="b" at={3.4} dy={0.6}>
            <div className="cp-sending">
              <Meter pct={100} label="Delivered" value="1,240 / 1,240" tone="emerald" />
            </div>
          </Attach>
        </Panel>
      </Float>
      <Cursor path={[[70, 98, 0.3], ['cart', 1.2], ['cart', 1.7], ['send', 2.7], ['send', 3.3], [80, 92, 4.4]]} clicks={[1.45, 3]} />
    </Stage>
  );
}

/** Approved templates send; a draft is stopped at the gate. */
function TemplateLock({ label }: SceneProps) {
  return (
    <Stage label={label}
      steps={[[0, 'Approved templates send'], [1.9, 'A draft is tried'], [2.3, 'Blocked until Meta approves']]} shape="wide" duration={8}>
      <Float x={20} y={8} w={60}>
        <Panel title="Templates" icon={Megaphone}>
          <Row title="diwali_offer" sub="Marketing · ₹0.8631 per message" right={<Chip tone="emerald" icon={Check}>Approved</Chip>} />
          <Row title="order_update" sub="Utility · ₹0.115 per message" right={<Chip tone="emerald" icon={Check}>Approved</Chip>} />
          <div className="fv-shake" style={vars({ '--fv-shake-at': '2.1s' })}>
            <Row
              title="flash_sale_draft"
              sub="Marketing · not reviewed by Meta"
              right={
                <span data-cursor="draft">
                  <Btn icon={Send} pressAt={1.9}>
                    Send
                  </Btn>
                </span>
              }
              active
            />
          </div>
          <Attach place="br" at={2.3} dx={1.6} dy={-0.4}>
            <Toast dark icon={Lock} title="Drafts can't send" sub="Submit it to Meta for approval first" />
          </Attach>
        </Panel>
      </Float>
      <Cursor path={[[30, 98, 0.4], ['draft', 1.6], ['draft', 2.3], [70, 96, 3.6]]} clicks={[1.9]} />
    </Stage>
  );
}

/** One campaign: net revenue counts up and the curve draws, under fireworks. */
function Performance({ label }: SceneProps) {
  return (
    <Stage
      label={label}
      steps={[[0, 'Campaign sent'], [1, 'Net revenue counts in'], [2.4, 'Return on Meta fees']]}
      shape="wide"
      mood="night"
      duration={8}
      back={<Fireworks at={0.6} every={3.4} shells={[[10, 24, 0], [88, 22, 1], [16, 74, 1.9], [84, 76, 2.6]]} />}
    >
      <Float x={22} y={8} w={56}>
        <Panel title="Diwali sale" icon={Megaphone} right={<Chip tone="emerald" dot>Sent</Chip>}>
          <div className="cp-perf">
            <div>
              <Stat label="Net revenue" value="₹3,92,400" delta="After Meta fees" />
              <Spark points={[10, 16, 22, 30, 42, 50, 64, 76, 88]} height={5.5} />
            </div>
            <div className="cp-perf__kv">
              <KV k="Sent" v="4,000" />
              <KV k="Read" v="3,412" />
              <KV k="Orders" v="212" />
              <KV k="Meta fees" v="₹3,452" />
            </div>
          </div>
          <Attach place="tr" at={2.4} dx={1.4} dy={0.4}>
            <Toast icon={TrendingUp} tone="emerald" title="Best campaign this month" sub="113× return on Meta fees" />
          </Attach>
        </Panel>
      </Float>
    </Stage>
  );
}

const scenes: SceneMap = {
  '/campaignn.webp': Hero,
  '/campaign-sub-feature/13.webp': Segments,
  '/campaign-sub-feature/14.webp': LeadScoring,
  '/campaign-sub-feature/15.webp': NetReport,
  '/campaign-sub-feature/21.webp': AudienceBuilder,
  '/campaign-sub-feature/22.webp': TemplateLock,
  '/campaign-sub-feature/20.webp': Performance,
};

export default scenes;
