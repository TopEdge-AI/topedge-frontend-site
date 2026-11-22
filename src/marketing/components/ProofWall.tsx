import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import clsx from 'clsx';
import { SiMeta, SiWhatsapp } from 'react-icons/si';
import raw from '../data/socialProof.json';
import { TRUSTPILOT_QUOTES } from '../data/socialProof';
import { ProductHuntMark } from './ProductHuntProof';
import '../styles/proof-wall.css';

/*
 * Review wall, ported from the dashboard sign-in panel (chatbot-dashboard-frontend,
 * src/components/auth/AuthProofWall.jsx) at the owner's request, 22 Nov 2026.
 *
 * Every non-filler tile is real: a published Trustpilot or Product Hunt review
 * (verbatim, from socialProof.json), a live merchant's logo, or a platform we are
 * listed on. Reviewers get an illustrated character, never a stock face. Hover or
 * focus a tile and one card glides to it; every review text is also in the DOM as
 * the tile's accessible label, so crawlers read it without hovering.
 */

const TP_GREEN = '#00b67a';
const STAR_PATH = 'M12 1.6l3.1 7.2 7.8.6-5.9 5.1 1.8 7.6L12 18l-6.8 4.1 1.8-7.6L1.1 9.4l7.8-.6z';
const CARD_W = 264;

type Review = { source: 'trustpilot' | 'productHunt'; author: string; text: string };
type Tile =
  | { id: string; kind: 'filler' }
  | { id: string; kind: 'review'; source: Review['source']; label: string; quote: string; tone: string }
  | { id: string; kind: 'customer'; label: string; logo: string; wide?: boolean }
  | { id: string; kind: 'platform'; label: string; detail: string; href?: string; icon: ReactNode; tone?: string };

const WALL_LOGOS = [
  { name: 'Delitech Smart Home', logo: '/trust/delitech-color.png' },
  { name: 'Apex Light', logo: '/trust/apex-color.png' },
  { name: 'ajeeb', logo: '/trust/ajeeb-black.png' },
  { name: 'Ecom', logo: '/trust/ecom-black.png' },
  { name: 'Oleez Online', logo: '/trust/oleez-black.png' },
];

function TrustpilotStar({ size = 14, color = TP_GREEN }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <path d={STAR_PATH} fill={color} />
    </svg>
  );
}

function ShopifyBag({ size = 20 }: { size?: number }) {
  return (
    <img src="/brand/shopify-mark.webp" alt="Shopify" width={size} height={size} style={{ objectFit: 'contain' }} />
  );
}

/** Same hash as the dashboard's characterAvatar util, local SVGs only (no CDN). */
function avatarFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return `/avatars/character-0${(Math.abs(h) % 5) + 1}.svg`;
}

function Avatar({ seed, size }: { seed: string; size: number }) {
  return (
    <img
      className="mkt-pwall-avatar"
      src={avatarFor(seed)}
      alt={`${seed}, reviewer`}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      style={{ width: size, height: size, borderRadius: 999 }}
    />
  );
}

function buildTiles(): Tile[] {
  const extra = ((raw as { reviews?: Review[] }).reviews ?? []) as Review[];
  const all: Review[] = [
    ...TRUSTPILOT_QUOTES.map((q) => ({ source: 'trustpilot' as const, author: q.author, text: q.text })),
    ...extra,
  ];
  const reviewers: Tile[] = all.map((q, i) => ({
    id: `review-${i}`,
    kind: 'review',
    source: q.source,
    label: q.author,
    quote: q.text,
    tone: ['violet', 'peach', 'mint'][i % 3],
  }));
  const customers: Tile[] = WALL_LOGOS.map((c, i) => ({ id: `customer-${i}`, kind: 'customer', label: c.name, logo: c.logo, wide: true }));
  const shopify: Tile = { id: 'shopify', kind: 'platform', label: 'Shopify App Store', detail: 'Available on the Shopify App Store', icon: <ShopifyBag /> };
  const whatsapp: Tile = { id: 'wa', kind: 'platform', label: 'WhatsApp Business Platform', detail: 'Sends through the official WhatsApp Cloud API', icon: <SiWhatsapp size={20} color="#25D366" aria-hidden /> };
  const meta: Tile = { id: 'meta', kind: 'platform', label: 'Meta Business Partner', detail: 'Approved Meta Business Partner', icon: <SiMeta size={20} color="#0866FF" aria-hidden /> };

  let f = 0;
  const filler = (): Tile => ({ id: `f-${f++}`, kind: 'filler' });
  const R = (n: number) => reviewers[n] || filler();
  const C = (n: number) => customers[n] || filler();
  // 7 columns x 6 rows; the outer ring fades. Same layout as the sign-in wall.
  return [
    filler(), R(3), filler(), R(7), filler(), R(9), filler(),
    filler(), R(0), C(0), R(4), filler(), filler(),
    R(5), shopify, filler(), C(1), R(1), filler(),
    filler(), C(2), filler(), R(2), whatsapp, R(8),
    filler(), C(3), meta, C(4), filler(),
    filler(), filler(), R(6), filler(), filler(), filler(), filler(),
  ];
}

function PopCard({ tile }: { tile: Exclude<Tile, { kind: 'filler' }> }) {
  if (tile.kind === 'review') {
    return (
      <>
        <div className="mkt-pwall-card__head">
          <Avatar seed={tile.label} size={32} />
          <div className="min-w-0">
            <p className="mkt-pwall-card__name">{tile.label}</p>
            <p className="mkt-pwall-card__src">
              {tile.source === 'productHunt' ? (
                <>
                  <ProductHuntMark size={11} /> Product Hunt review
                </>
              ) : (
                <>
                  <TrustpilotStar size={11} /> Verified Trustpilot review
                </>
              )}
            </p>
          </div>
        </div>
        <blockquote className="mkt-pwall-card__quote">“{tile.quote}”</blockquote>
      </>
    );
  }
  if (tile.kind === 'customer') {
    return (
      <div className="mkt-pwall-card__head">
        <span className="mkt-pwall-card__logo" aria-hidden>
          <img src={tile.logo} alt={`${tile.label} logo`} />
        </span>
        <div className="min-w-0">
          <p className="mkt-pwall-card__name">{tile.label}</p>
          <p className="mkt-pwall-card__src">Shopify brand on TopEdge AI</p>
        </div>
      </div>
    );
  }
  return (
    <div className="mkt-pwall-card__head">
      <span className="mkt-pwall-card__logo" aria-hidden>
        {tile.icon}
      </span>
      <div className="min-w-0">
        <p className="mkt-pwall-card__name">{tile.label}</p>
        <p className="mkt-pwall-card__src">{tile.detail}</p>
      </div>
    </div>
  );
}

export default function ProofWall({ title, highlight, sub }: { title: string; highlight?: string; sub?: string }) {
  const tiles = useMemo(buildTiles, []);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number; arrow: number; below: boolean } | null>(null);

  const place = useCallback(() => {
    const wrap = wrapRef.current;
    const el = activeId ? tileRefs.current[activeId] : null;
    if (!wrap || !el) return;
    const w = wrap.getBoundingClientRect();
    const t = el.getBoundingClientRect();
    const cardH = cardRef.current?.offsetHeight || 120;
    const centerX = t.left - w.left + t.width / 2;
    const below = t.top - w.top + t.height / 2 < w.height / 2;
    const x = Math.min(Math.max(centerX - CARD_W / 2, 4), w.width - CARD_W - 4);
    const y = below ? t.bottom - w.top + 8 : t.top - w.top - cardH - 8;
    setPos({ x, y, arrow: Math.min(Math.max(centerX - x, 16), CARD_W - 16), below });
  }, [activeId]);

  useLayoutEffect(() => {
    place();
  }, [place]);

  useEffect(() => {
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [place]);

  const active = (tiles.find((t) => t.id === activeId && t.kind !== 'filler') as Exclude<Tile, { kind: 'filler' }> | undefined) ?? null;

  return (
    <section className="mkt-pwall-section" aria-labelledby="mkt-pwall-heading">
      <h2 id="mkt-pwall-heading" className="mkt-pwall-section__title">
        {title}
        {highlight ? (
          <>
            <br />
            <span className="mkt-pwall-section__hl">{highlight}</span>
          </>
        ) : null}
      </h2>
      {sub ? <p className="mkt-pwall-section__sub">{sub}</p> : null}
      <div
        ref={wrapRef}
        className={clsx('mkt-pwall', activeId && 'mkt-pwall--focus')}
        onMouseLeave={() => setActiveId(null)}
      >
        <ul className="mkt-pwall__grid" aria-label="Reviews, customers and platforms">
          {tiles.map((tile) => {
            if (tile.kind === 'filler') {
              return <li key={tile.id} className="mkt-pwall-tile mkt-pwall-tile--filler" aria-hidden />;
            }
            const isOn = tile.id === activeId;
            const content =
              tile.kind === 'review' ? (
                <>
                  <Avatar seed={tile.label} size={46} />
                  <span className="mkt-pwall-tile__badge" aria-hidden>
                    {tile.source === 'productHunt' ? <ProductHuntMark size={10} /> : <TrustpilotStar size={9} />}
                  </span>
                </>
              ) : tile.kind === 'customer' ? (
                <img src={tile.logo} alt={`${tile.label} logo`} loading="lazy" decoding="async" data-tone="dark" />
              ) : (
                tile.icon
              );
            const label =
              tile.kind === 'review'
                ? `Review by ${tile.label}: ${tile.quote}`
                : tile.kind === 'customer'
                  ? `${tile.label}, Shopify brand on TopEdge AI`
                  : `${tile.label}: ${tile.detail}`;
            return (
              <li key={tile.id} className={clsx(tile.kind === 'customer' && 'mkt-pwall__cell--wide')}>
                <button
                  ref={(el) => {
                    tileRefs.current[tile.id] = el;
                  }}
                  type="button"
                  className={clsx(
                    'mkt-pwall-tile',
                    `mkt-pwall-tile--${tile.kind}`,
                    'tone' in tile && tile.tone && `mkt-pwall-tile--${tile.tone}`,
                    isOn && 'is-on',
                  )}
                  aria-label={label}
                  aria-describedby={isOn ? 'mkt-pwall-card' : undefined}
                  onMouseEnter={() => setActiveId(tile.id)}
                  onFocus={() => setActiveId(tile.id)}
                  onBlur={() => setActiveId(null)}
                >
                  {content}
                </button>
              </li>
            );
          })}
        </ul>

        <div
          ref={cardRef}
          id="mkt-pwall-card"
          role="tooltip"
          aria-hidden={active ? undefined : true}
          className={clsx('mkt-pwall-card', active && pos && 'is-shown', pos?.below ? 'is-below' : 'is-above')}
          style={
            {
              transform: pos ? `translate(${pos.x}px, ${pos.y}px)` : undefined,
              '--arrow-x': `${pos?.arrow ?? CARD_W / 2}px`,
            } as CSSProperties
          }
        >
          {active ? <PopCard tile={active} /> : null}
        </div>
      </div>
    </section>
  );
}
