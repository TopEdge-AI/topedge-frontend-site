/**
 * Journeys scenes (v7). Journeys are shown as they run: a step lights up,
 * the shopper's phone gets the message, they act, the result lands.
 * Keys are the image paths in productPages.ts.
 */
import type { CSSProperties } from 'react';
import {
  Check,
  Clock,
  CreditCard,
  ExternalLink,
  Eye,
  Lock,
  MessageCircle,
  MousePointer2,
  Package,
  Send,
  ShoppingCart,
  Truck,
  Wallet,
  Workflow,
  Zap,
} from '../icons';
import {
  Attach,
  Browser,
  Btn,
  Bubble,
  Chip,
  Cursor,
  Float,
  IconTile,
  IPhone,
  Node,
  Panel,
  PhoneBanner,
  PhoneSheet,
  ProductArt,
  Reveal,
  Row,
  Stage,
  Swap,
  Toast,
  Wires,
  type IconType,
  type SceneMap,
  type SceneProps,
} from '../kit';
import '../../../styles/optin-scenes.css';

const SHIRT = '/marketing/journeys/product-linen-shirt.webp';
const vars = (o: Record<string, string | number>) => o as unknown as CSSProperties;

/**
 * One step of a running journey, in a vertical rail. It is idle, then lights
 * up at `on` (and stays done after `off`).
 */
function Step({ icon, title, sub, on, off, add }: { icon: IconType; title: string; sub: string; on?: number; off?: number; add?: number }) {
  const body = (
    <div
      className="jr-step"
      style={vars({ '--on': `${on ?? 99}s`, '--off': `${off ?? 99}s` })}
      data-live={on !== undefined ? '' : undefined}
    >
      <span className="jr-step__dot">
        <IconTile icon={icon} size="sm" />
      </span>
      <span className="jr-step__text">
        <b>{title}</b>
        <small>{sub}</small>
      </span>
      {on !== undefined ? (
        <span className="jr-step__state">
          <i className="jr-run">Running</i>
          <i className="jr-done">
            <Check strokeWidth={3} />
          </i>
        </span>
      ) : null}
    </div>
  );
  return add !== undefined ? <Reveal at={add}>{body}</Reveal> : body;
}

/* ── Bento tiles ───────────────────────────────────────────────────────── */

/** Drop a wait step between the trigger and the send. */
function Builder({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={12} w={80}>
        <Panel title="Cart recovery" icon={Workflow} right={<Chip tone="amber" dot>Editing</Chip>}>
          <div className="jr-rail">
            <Step icon={ShoppingCart} title="Cart abandoned" sub="Shopify trigger" />
            <Step icon={Clock} title="Wait 30 minutes" sub="Dropped in just now" add={1.5} />
            <Step icon={Send} title="Send reminder" sub="cart_reminder · approved" />
          </div>
          <Attach place="r" at={0.4} until={1.5} dx={1} dy={-1.2}>
            <div className="jr-drag">
              <IconTile icon={Clock} size="sm" />
              Wait
            </div>
          </Attach>
        </Panel>
      </Float>
      <Cursor path={[[94, 38, 0.3], [94, 38, 0.6], [56, 48, 1.4], [70, 92, 2.6]]} clicks={[0.6, 1.45]} />
    </Stage>
  );
}

/** Pre-built journeys, ready to use: pick one and it is created. */
function Library({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={14} w={80}>
        <Panel title="Pre-built journeys" icon={Workflow}>
          <Row
            lead={<IconTile icon={ShoppingCart} />}
            title="Cart recovery"
            sub="3 steps · 18% recover"
            right={
              <span data-cursor="use">
                <Swap at={1.9} a={<Btn primary pressAt={1.6}>Use</Btn>} b={<Chip tone="emerald" icon={Check}>Added</Chip>} />
              </span>
            }
            active
          />
          <Row lead={<IconTile icon={Wallet} />} title="COD confirmation" sub="2 steps" right={<Btn>Use</Btn>} />
          <Row lead={<IconTile icon={Package} />} title="Order confirmed" sub="1 step" right={<Btn>Use</Btn>} />
          <Row lead={<IconTile icon={Truck} />} title="Shipping updates" sub="3 steps" right={<Btn>Use</Btn>} />
        </Panel>
      </Float>
      <Cursor path={[[50, 96, 0.4], ['use', 1.3], ['use', 1.9], [64, 94, 3]]} clicks={[1.6]} />
    </Stage>
  );
}

/** A pending template blocks go-live; once Meta approves, it publishes. */
function Gating({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7.5}>
      <Float x={10} y={16} w={80}>
        <Panel title="Send reminder" icon={Send}>
          <Row
            lead={<IconTile icon={MessageCircle} />}
            title="cart_reminder_v2"
            sub="Marketing template"
            right={<Swap at={2.2} a={<Chip tone="amber" dot>Pending</Chip>} b={<Chip tone="emerald" icon={Check}>Approved</Chip>} />}
          />
          <div className="jr-gate" data-cursor="live">
            <Swap
              at={2.4}
              a={
                <span className="jr-gate__locked">
                  <Lock strokeWidth={2.4} /> Can't go live until Meta approves
                </span>
              }
              b={
                <Swap
                  at={3.9}
                  a={
                    <Btn primary icon={Zap} pressAt={3.6}>
                      Go live
                    </Btn>
                  }
                  b={<Chip tone="emerald" dot>Live · 3 shoppers in journey</Chip>}
                />
              }
            />
          </div>
        </Panel>
      </Float>
      <Cursor path={[[70, 98, 2.4], ['live', 3.3], ['live', 3.9], [70, 96, 5]]} clicks={[3.6]} />
    </Stage>
  );
}

/* ── Showcases ─────────────────────────────────────────────────────────── */

/**
 * Cart recovery as three acts. 1: the journey runs on the dashboard.
 * 2: the store slides away and the shopper's phone takes the stage: the
 * reminder lands, they tap, pay. 3: back to the dashboard, cart recovered.
 */
function AbandonedCart({ label }: SceneProps) {
  const cartPanel = (done: number) => (
    <Panel title="Cart recovery" icon={Workflow} right={<Chip tone="emerald" dot>Live</Chip>}>
      <div className="jr-rail">
        <Step icon={ShoppingCart} title="Cart abandoned" sub="Riya · ₹3,450 · 2 items" on={done ? done : 0.3} off={done ? done : 1} />
        <Step icon={Clock} title="Wait 30 minutes" sub="No order yet" on={done ? done : 1} off={done ? done : 2.2} />
        <Step icon={Send} title="Send reminder" sub="With 10% off for an hour" on={done ? done : 2.2} off={done ? done : 3.2} />
        <Step icon={Wallet} title="Order placed" sub="Journey ends" on={done ? done + 0.3 : undefined} off={done ? done + 0.8 : undefined} />
      </div>
    </Panel>
  );
  return (
    <Stage label={label} shape="wide" duration={14}>
      {/* Act 1: the journey fires */}
      <Float x={28} y={20} w={44} until={3.7} act="out">
        {cartPanel(0)}
      </Float>

      {/* Act 2: the shopper's phone */}
      <Float x={34.1} y={4.6} at={3.9} until={10.6} act="both">
        <IPhone
          name="Stride Shoes"
          status="Business account"
          overlay={
            <>
              <PhoneBanner at={4.5} until={5.7} title="Stride Shoes" body="Riya, your cart is waiting. 10% off for the next hour" />
              <PhoneSheet at={7.4} url="stride.in/checkout">
                <ProductArt kind="sneaker" h={8.5} />
                <h5 className="fv-shop__title">Cloudrun 2 · UK 6</h5>
                <div className="fv-shop__price">
                  <b>₹3,105</b>
                  <s>₹3,450</s>
                  <em>COMEBACK10</em>
                </div>
                <div className="jr-addr">
                  <b>Deliver to</b>
                  <span>Riya Sharma · Andheri West, Mumbai 400058</span>
                </div>
                <div className="jr-pay">
                  <span className="is-on">
                    <CreditCard strokeWidth={2.2} /> UPI
                  </span>
                  <span>Card</span>
                  <span>COD</span>
                </div>
                <span className="fv-shop__cta is-press" data-cursor="pay" style={vars({ '--fv-press': '8.8s' })}>
                  Pay ₹3,105
                </span>
              </PhoneSheet>
              <PhoneSheet at={9.2}>
                <div className="fv-shop__done">
                  <span className="fv-shop__check" style={vars({ '--fv-check-at': '9.5s' })}>
                    <Check strokeWidth={3} />
                  </span>
                  <h5>Payment successful</h5>
                  <p>Order #3381 · ₹3,105 via UPI</p>
                  <span className="oi-order__wa">Shipping updates on WhatsApp</span>
                </div>
              </PhoneSheet>
            </>
          }
        >
          <Reveal at={5.1}>
            <Bubble
              from="biz"
              time="4:12 pm"
              media={<ProductArt kind="sneaker" h={6.5} />}
              title="You left something behind"
              buttons={[{ label: 'Complete order', icon: ExternalLink, at: 6.9, cursor: 'complete' }]}
            >
              Riya, your Cloudrun 2 is still in your cart. Here is 10% off for the next hour.
            </Bubble>
          </Reveal>
        </IPhone>
      </Float>

      {/* Act 3: back on the dashboard, recovered */}
      <Float x={28} y={20} w={44} at={10.8} act="in">
        {cartPanel(10.9)}
        <Attach place="br" at={11.8} dx={1.6} dy={-1}>
          <Toast icon={Wallet} tone="emerald" title="Recovered ₹3,105" sub="Cart recovery · reminder 1" />
        </Attach>
      </Float>
      <Cursor touch path={[['complete', 6.6], ['complete', 7.2], ['pay', 8.5], ['pay', 9.1]]} clicks={[6.9, 8.8]} />
    </Stage>
  );
}

/** Branch on payment method: COD, prepaid and quiet buyers split. */
function Routes({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Wires
        shape="wide"
        paths={['M 36 31 C 44 31, 43 13.5, 51 13.5', 'M 36 31 L 51 31', 'M 36 31 C 44 31, 43 48.5, 51 48.5']}
      />
      <Float x={8} y={42} w={28}>
        <Node icon={Package} title="Order created" sub="#1042 · ₹2,499 · COD" active />
      </Float>
      <Float x={51} y={14} w={32}>
        <Swap at={2} a={<Node icon={Wallet} title="COD" sub="Ask to confirm" />} b={<Node icon={Wallet} title="COD" sub="Confirm request sent" active />} />
        <Attach place="r" at={3.4} dx={1.4}>
          <Toast icon={Check} tone="emerald" title="Confirmed" sub="Shopper tapped Yes" />
        </Attach>
      </Float>
      <Float x={51} y={42} w={32} at={0.4}>
        <Node icon={CreditCard} title="Prepaid" sub="Send thank you" />
      </Float>
      <Float x={51} y={70} w={32} at={0.8}>
        <Node icon={MessageCircle} title="No reply" sub="Nudge in 4 hours" />
      </Float>
    </Stage>
  );
}

/**
 * Return and retarget, in two acts. 1: a known shopper is back on the
 * product page, finds their size sold out and leaves. 2: the store slides
 * away and their phone takes the stage: the size is back, they order.
 */
function Retarget({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={12}>
      {/* Act 1: the storefront */}
      <Float x={14} y={26} w={72} until={5.2} act="out">
        <Browser url="miraethnic.in/linen-shirt">
          <div className="oi-store jr-pdp">
            <ProductArt src={SHIRT} alt="Linen shirt" h={11} />
            <div className="oi-store__info">
              <small className="jr-pdp-brand">MIRA ETHNIC</small>
              <b className="jr-pdp-title">Linen shirt</b>
              <span className="jr-pdp-price">₹1,899</span>
              <div className="jr-sizes">
                <span>S</span>
                <span className="is-out" data-cursor="size-m">M</span>
                <span>L</span>
                <span>XL</span>
              </div>
              <small className="jr-pdp-note">Size M is sold out</small>
              <span className="jr-pdp-btn">Notify me</span>
            </div>
          </div>
        </Browser>
        <Attach place="tr" at={1} dx={1.6} dy={1}>
          <Toast icon={Eye} title="Riya Sharma is back" sub="3rd view · intent high" />
        </Attach>
        <Attach place="bl" at={4} dx={1.6} dy={-1}>
          <Toast dark icon={MousePointer2} title="Left without buying" sub="Journey started · Wait 20 min" />
        </Attach>
      </Float>

      {/* Act 2: WhatsApp on her phone */}
      <Float x={34.1} y={4.6} at={5.4} act="in">
        <IPhone name="Mira Ethnic" overlay={<PhoneBanner at={6} until={7.2} title="Mira Ethnic" body="Your size M is back in stock" />}>
          <Reveal at={6.6}>
            <Bubble
              from="biz"
              time="6:40 pm"
              media={<ProductArt src={SHIRT} alt="Linen shirt" h={7} />}
              buttons={[{ label: 'View shirt', icon: ExternalLink, at: 8.4, cursor: 'view' }]}
            >
              Still thinking about the Linen shirt? Your size M is back in stock.
            </Bubble>
          </Reveal>
          <Reveal at={9.1}>
            <Bubble from="user" time="6:42 pm" read>
              Ordering it now!
            </Bubble>
          </Reveal>
        </IPhone>
        <Attach place="r" at={9.8} dx={7.5} dy={6}>
          <Toast icon={ShoppingCart} tone="emerald" title="Order ₹1,899" sub="From Return & retarget" />
        </Attach>
      </Float>
      <Cursor path={[[36, 96, 0.4], [34, 50, 1.4], ['size-m', 2.2], ['size-m', 2.8], [60, 2, 3.8]]} clicks={[2.4]} />
      <Cursor touch path={[['view', 8.1], ['view', 8.7]]} clicks={[8.4]} />
    </Stage>
  );
}

const scenes: SceneMap = {
  '/journey-sub-feature/4.webp': Builder,
  '/journey-sub-feature/5.webp': Library,
  '/journey-sub-feature/6.webp': Gating,
  '/journey-sub-feature/10.webp': AbandonedCart,
  '/journey-sub-feature/11.webp': Routes,
  '/journey-sub-feature/12.webp': Retarget,
};

export default scenes;
