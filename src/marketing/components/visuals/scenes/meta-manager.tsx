/**
 * Meta Manager scenes (v7): WhatsApp templates and the Shopify catalog.
 * The hero follows one template from the editor, through Meta review, to a
 * shopper's phone. Keys are the image paths in productPages.ts; one path is
 * reused across hero, bento and showcase, so bySlot picks the right scene.
 * Showcases without an image ('') choose by label.
 */
import type { CSSProperties } from 'react';
import {
  Braces,
  Check,
  Download,
  ExternalLink,
  FileText,
  LayoutTemplate,
  MetaLogo,
  QrCode,
  RefreshCw,
  Send,
  ShopifyLogo,
  Store,
} from '../icons';
import {
  Attach,
  Btn,
  Bubble,
  Chip,
  Cursor,
  Float,
  IconTile,
  IPhone,
  Label,
  Panel,
  ProductArt,
  QR,
  Reveal,
  Row,
  Stage,
  Swap,
  Toast,
  TypeText,
  bySlot,
  type SceneMap,
  type SceneProps,
} from '../kit';

const vars = (o: Record<string, string | number>) => o as unknown as CSSProperties;

/** Draft, In review, Approved: the template lifecycle as a stepper. */
function Lifecycle({ review, approved }: { review: number; approved: number }) {
  return (
    <div className="mm-life" style={vars({ '--r': `${review}s`, '--a': `${approved}s` })}>
      <span className="is-done">Draft</span>
      <i />
      <span className="mm-life__review">In review</span>
      <i className="mm-life__bar" />
      <span className="mm-life__ok">Approved</span>
    </div>
  );
}

/** The template rendered as WhatsApp will show it. */
function TemplatePreview({ at }: { at?: number }) {
  const body = 'Hi Aarav, your hydrating gel is still in your cart. Complete your order and get free shipping today.';
  return (
    <div className="mm-wa">
      <Bubble from="biz" time="18:20" media={<ProductArt kind="serum" h={6.4} />} title="Still thinking it over?" buttons={[{ label: 'Complete order', icon: ExternalLink }]}>
        {at !== undefined ? <TypeText text={body} at={at} cps={48} /> : body}
      </Bubble>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */

/** Write, submit, Meta approves, and the message lands on a real phone. */
function LibraryHero({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={12}>
      <Float x={6} y={6} w={50}>
        <Panel title="cart_recovery_1" icon={FileText} right={<Chip>Marketing</Chip>}>
          <Lifecycle review={2.6} approved={5} />
          <div className="mm-editor">
            <div className="fv-field">
              <small>Body</small>
              <span className="mm-body">
                Hi <em>{'{{first_name}}'}</em>, your <em>{'{{product}}'}</em> is still in your cart.
              </span>
            </div>
            <span data-cursor="submit">
              <Swap at={2.6} a={<Btn primary icon={Send} pressAt={2.3}>Submit to Meta</Btn>} b={<Swap at={5} a={<Chip tone="amber" dot>Waiting for Meta</Chip>} b={<Chip tone="emerald" icon={Check}>Approved · live</Chip>} />} />
            </span>
          </div>
          <Attach place="b" at={5} dy={1.6}>
            <Toast icon={MetaLogo} title="Approved by Meta" sub="Ready for journeys and campaigns" />
          </Attach>
        </Panel>
      </Float>
      <Float x={64} y={0} at={0.2}>
        <IPhone name="Glow Co">
          <Reveal at={6.6}>
            <Bubble
              from="biz"
              time="18:20"
              media={<ProductArt kind="serum" h={6.4} />}
              title="Still thinking it over?"
              buttons={[{ label: 'Complete order', icon: ExternalLink }]}
            >
              Hi Aarav, your hydrating gel is still in your cart.
            </Bubble>
          </Reveal>
          <Reveal at={8.4}>
            <Bubble from="user" time="18:24" read>
              Ordering now, thanks!
            </Bubble>
          </Reveal>
        </IPhone>
      </Float>
      <Cursor path={[[30, 96, 1], ['submit', 2], ['submit', 2.6], [40, 96, 3.6]]} clicks={[2.3]} />
    </Stage>
  );
}

/* ── Bento tiles ───────────────────────────────────────────────────────── */

function LibraryTile({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={14} w={80}>
        <Panel title="Templates" icon={LayoutTemplate} right={<span className="mm-synced"><MetaLogo /> Synced</span>}>
          <Reveal at={0.5}>
            <Row title="order_confirm" sub="Utility · ₹0.115" right={<Chip tone="emerald" icon={Check}>Approved</Chip>} />
          </Reveal>
          <Reveal at={1.1}>
            <Row title="cart_recovery_1" sub="Marketing · ₹0.8631" right={<Chip tone="amber" dot>In review</Chip>} />
          </Reveal>
          <Reveal at={1.7}>
            <Row title="diwali_offer" sub="Promo text in a Utility template" right={<Chip tone="rose">Rejected</Chip>} active />
          </Reveal>
        </Panel>
      </Float>
    </Stage>
  );
}

/** A ready-made cart recovery template, previewed as WhatsApp will show it. */
function Blueprints({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={12} y={8} w={76}>
        <Panel title="Cart recovery blueprint" icon={LayoutTemplate} right={<Chip tone="emerald" dot>Live product</Chip>}>
          <TemplatePreview at={0.6} />
        </Panel>
      </Float>
    </Stage>
  );
}

/** The Shopify catalog synced, and a wa.me QR to open the chat. */
function CatalogTile({ label }: SceneProps) {
  return (
    <Stage label={label} duration={7}>
      <Float x={10} y={12} w={80}>
        <Panel title="Catalog" icon={Store} right={<span className="mm-synced"><ShopifyLogo /> 142 synced</span>}>
          <div className="mm-cat">
            <div className="mm-grid">
              <ProductArt kind="serum" h={4.6} />
              <ProductArt kind="kurta" h={4.6} />
              <ProductArt kind="sneaker" h={4.6} />
              <ProductArt kind="doorbell" h={4.6} />
            </div>
            <div className="mm-qr">
              <QR seed="glowco" size={7.6} />
              <small>Scan to chat</small>
            </div>
          </div>
        </Panel>
      </Float>
    </Stage>
  );
}

/* ── Showcases ─────────────────────────────────────────────────────────── */

/** Sync from Meta: statuses arrive, a rejection explains itself. */
function LibraryShowcase({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8}>
      <Float x={18} y={6} w={60}>
        <Panel
          title="Template library"
          icon={LayoutTemplate}
          right={
            <span data-cursor="sync">
              <Btn icon={RefreshCw} pressAt={1}>
                Sync from Meta
              </Btn>
            </span>
          }
        >
          <Reveal at={1.5}>
            <Row lead={<IconTile icon={FileText} />} title="order_confirm" sub="Utility · English" right={<Chip tone="emerald" icon={Check}>Approved</Chip>} />
          </Reveal>
          <Reveal at={2.1}>
            <Row lead={<IconTile icon={FileText} />} title="cod_to_prepaid" sub="Utility · Hindi" right={<Chip tone="amber" dot>In review</Chip>} />
          </Reveal>
          <Reveal at={2.7}>
            <Row
              lead={<IconTile icon={FileText} tone="rose" />}
              title="diwali_offer"
              sub="Rejected: promotional content in a Utility template"
              right={<Chip tone="rose">Rejected</Chip>}
              active
            />
          </Reveal>
          <Attach place="br" at={3.5} dx={1.6} dy={-1}>
            <Toast icon={MetaLogo} title="3 templates synced" sub="Statuses straight from Meta" />
          </Attach>
        </Panel>
      </Float>
      <Cursor path={[[80, 96, 0.2], ['sync', 0.8], ['sync', 1.3], [80, 92, 2.4]]} clicks={[1]} />
    </Stage>
  );
}

/** Write a template with variables beside a live WhatsApp preview, then submit. */
function Studio({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={9}>
      <Float x={8} y={4} w={84}>
        <Panel title="Template studio" icon={FileText} right={<Chip>Utility</Chip>}>
          <div className="mm-studio">
            <div className="mm-studio__form">
              <div className="fv-field">
                <small>Name</small>
                <span className="is-mono">order_shipped</span>
              </div>
              <div className="fv-field">
                <small>Body</small>
                <span className="mm-body mm-body--tall">
                  <TypeText text="Hi {{1}}, your order {{2}} has shipped and arrives by {{3}}." at={0.6} cps={30} />
                </span>
              </div>
              <Label>Variables</Label>
              <div className="mm-vars">
                <span><Braces /> {'{{1}}'} first_name</span>
                <span><Braces /> {'{{2}}'} order_id</span>
                <span><Braces /> {'{{3}}'} delivery_date</span>
              </div>
              <span data-cursor="submit">
                <Swap at={4.6} a={<Btn primary icon={Send} pressAt={4.3}>Submit to Meta</Btn>} b={<Chip tone="amber" dot>In review at Meta</Chip>} />
              </span>
            </div>
            <div className="mm-wa mm-wa--tall">
              <small className="mm-wa__label">Preview</small>
              <Reveal at={3}>
                <Bubble from="biz" time="11:20" buttons={[{ label: 'Track order', icon: ExternalLink }]}>
                  Hi Rahul, your order #1042 has shipped and arrives by Friday.
                </Bubble>
              </Reveal>
            </div>
          </div>
        </Panel>
      </Float>
      <Cursor path={[[40, 98, 3.4], ['submit', 4], ['submit', 4.6], [50, 96, 5.6]]} clicks={[4.3]} />
    </Stage>
  );
}

/** Refresh the catalog from Shopify, then download a wa.me QR for the store. */
function CatalogShowcase({ label }: SceneProps) {
  return (
    <Stage label={label} shape="wide" duration={8.5}>
      <Float x={10} y={6} w={80}>
        <Panel
          title="Catalog"
          icon={Store}
          right={
            <span data-cursor="refresh">
              <Btn icon={RefreshCw} pressAt={0.9}>
                Refresh from Shopify
              </Btn>
            </span>
          }
        >
          <div className="mm-studio">
            <div>
              <Reveal at={1.4}>
                <Row lead={<ProductArt kind="kurta" h={2.6} />} title="Rani pink silk kurta" sub="In stock · 24" right="₹2,499" />
              </Reveal>
              <Reveal at={1.9}>
                <Row lead={<ProductArt kind="serum" h={2.6} />} title="Hydrating gel serum" sub="In stock · 112" right="₹729" />
              </Reveal>
              <Reveal at={2.4}>
                <Row lead={<ProductArt kind="sneaker" h={2.6} />} title="Cloudrun 2" sub="Low stock · 3" right="₹3,450" />
              </Reveal>
            </div>
            <div className="mm-qrcard">
              <QR seed="store-qr" size={9} />
              <b>wa.me/919820011223</b>
              <small>Opens a chat with your store</small>
              <span data-cursor="png">
                <Btn primary icon={Download} pressAt={4.4}>
                  Download PNG
                </Btn>
              </span>
            </div>
          </div>
          <Attach place="br" at={4.8} dx={1.4} dy={-1.2}>
            <Toast icon={QrCode} tone="emerald" title="store-qr.png saved" sub="Print it on packaging and ads" />
          </Attach>
        </Panel>
      </Float>
      <Cursor path={[[60, 98, 0.2], ['refresh', 0.7], ['refresh', 1.2], ['png', 4.1], ['png', 4.7]]} clicks={[0.9, 4.4]} />
    </Stage>
  );
}

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
