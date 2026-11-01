/**
 * A drawn motif per festival.
 *
 * Twenty-five festivals need twenty-five pieces of artwork, and the two obvious
 * routes both fail: stock photography means twenty-five commercial licences and
 * a liability sitting on a public marketing page, and generated imagery means
 * twenty-five chances to put something religiously wrong on a page about a
 * religious festival. Simple drawn geometry sidesteps both. A merchant only
 * needs to recognise which festival a card belongs to at a glance.
 *
 * Ported from `FestivalMark.jsx` in the dashboard so the website and the
 * product show a merchant the same mark for the same festival. Keep the palette
 * and glyph tables in step with that file; the regexes are matched against the
 * catalog's `festivalName`, which is shared.
 */

type PaletteKey = 'amber' | 'rose' | 'violet' | 'emerald' | 'sky' | 'orange' | 'indigo' | 'teal';

const PALETTES: Record<PaletteKey, [string, string]> = {
  amber: ['#fde68a', '#f59e0b'],
  rose: ['#fecdd3', '#f43f5e'],
  violet: ['#ddd6fe', '#8b5cf6'],
  emerald: ['#a7f3d0', '#10b981'],
  sky: ['#bae6fd', '#0ea5e9'],
  orange: ['#fed7aa', '#f97316'],
  indigo: ['#c7d2fe', '#6366f1'],
  teal: ['#99f6e4', '#14b8a6'],
};

type GlyphId =
  | 'lamp' | 'splash' | 'tree' | 'crescent' | 'kite' | 'knot' | 'trident' | 'modak'
  | 'flower' | 'wheat' | 'moon' | 'sun' | 'coin' | 'flute' | 'flag' | 'heart'
  | 'cross' | 'spark';

/** Longest, most specific patterns first. Palette + glyph only. */
const FESTIVALS: [RegExp, PaletteKey, GlyphId][] = [
  [/diwali|deepavali/i, 'amber', 'lamp'],
  [/dhanteras|dhantrayodashi/i, 'amber', 'coin'],
  [/holi/i, 'rose', 'splash'],
  [/christmas|x-?mas/i, 'emerald', 'tree'],
  [/good\s*friday/i, 'indigo', 'cross'],
  [/easter/i, 'violet', 'flower'],
  [/milad|nabi|mawlid/i, 'teal', 'crescent'],
  [/eid|ramadan|ramzan|bakri/i, 'teal', 'crescent'],
  [/makar|sankranti|pongal|kite/i, 'sky', 'kite'],
  [/raksha|rakhi/i, 'rose', 'knot'],
  [/navratri|durga|dussehra|dasara|vijayadashami/i, 'orange', 'trident'],
  [/ganesh|chaturthi/i, 'amber', 'modak'],
  [/onam/i, 'emerald', 'flower'],
  [/baisakhi|vaisakhi|lohri/i, 'orange', 'wheat'],
  [/karva|karwa/i, 'rose', 'moon'],
  [/bhai\s*dooj|bhau\s*beej|bhai\s*phonta/i, 'violet', 'knot'],
  [/chhath/i, 'orange', 'sun'],
  [/akshaya|tritiya/i, 'amber', 'coin'],
  [/gudi|ugadi|vishu|puthandu/i, 'emerald', 'flower'],
  [/janmashtami|krishna/i, 'indigo', 'flute'],
  [/republic|independence/i, 'sky', 'flag'],
  [/new\s*year/i, 'violet', 'spark'],
  [/valentine/i, 'rose', 'heart'],
  [/vasant|basant|panchami|saraswati/i, 'amber', 'flower'],
  [/shivaratri|shivratri|mahashiv/i, 'indigo', 'trident'],
  [/rama\s*navami|ram\s*navami/i, 'amber', 'sun'],
  [/pujo|puja|pooja/i, 'orange', 'trident'],
];

const PALETTE_KEYS = Object.keys(PALETTES) as PaletteKey[];

/**
 * Palette and glyph for a festival name. Anything unmapped hashes its own name
 * to a palette, so a festival added to the catalog later still looks deliberate
 * rather than blank.
 */
export function resolveFestivalVisual(name: string): { palette: PaletteKey; glyph: GlyphId } {
  const n = String(name || '');
  for (const [re, palette, glyph] of FESTIVALS) {
    if (re.test(n)) return { palette, glyph };
  }
  let hash = 0;
  for (let i = 0; i < n.length; i += 1) hash = (hash * 31 + n.charCodeAt(i)) >>> 0;
  return { palette: PALETTE_KEYS[hash % PALETTE_KEYS.length], glyph: 'spark' };
}

function Glyph({ id, stroke }: { id: GlyphId; stroke: string }) {
  const p = {
    stroke,
    strokeWidth: 2.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };
  switch (id) {
    case 'lamp':
      return (<g {...p}><path d="M10 26h20c0 5-4.5 8-10 8s-10-3-10-8Z" /><path d="M20 18c2.4-3 0-6 0-6s-4 3.2-4 6a4 4 0 0 0 8 0" /></g>);
    case 'tree':
      return (<g {...p}><path d="M20 8 12 20h16L20 8Z" /><path d="M20 16l-9 13h18l-9-13Z" /><path d="M20 29v5" /></g>);
    case 'crescent':
      return (<g {...p}><path d="M26 10a11 11 0 1 0 0 20 13 13 0 0 1 0-20Z" /><path d="M29 17l1.4 2.9 3.1.4-2.3 2.2.6 3.1-2.8-1.5-2.8 1.5.6-3.1-2.3-2.2 3.1-.4L29 17Z" /></g>);
    case 'kite':
      return (<g {...p}><path d="M20 7 31 18 20 29 9 18 20 7Z" /><path d="M20 29c0 4-3 5-3 7" /></g>);
    case 'splash':
      return (<g {...p}><circle cx="16" cy="17" r="5" /><circle cx="25" cy="22" r="6" /><path d="M11 29h18" /></g>);
    case 'knot':
      return (<g {...p}><circle cx="20" cy="18" r="5" /><path d="M8 18h7M25 18h7M14 26l4-4M26 26l-4-4" /></g>);
    case 'trident':
      return (<g {...p}><path d="M13 12v6M20 9v9M27 12v6M13 18h14M20 18v14" /></g>);
    case 'modak':
      return (<g {...p}><path d="M20 9c5 6 8 11 8 15a8 8 0 0 1-16 0c0-4 3-9 8-15Z" /></g>);
    case 'flower':
      return (<g {...p}><circle cx="20" cy="20" r="3.5" /><path d="M20 9v4M20 27v4M9 20h4M27 20h4M12.5 12.5l2.8 2.8M24.7 24.7l2.8 2.8M27.5 12.5l-2.8 2.8M15.3 24.7l-2.8 2.8" /></g>);
    case 'wheat':
      return (<g {...p}><path d="M20 32V12" /><path d="M20 14c3-1 5-3 5-5-3 0-5 2-5 5Zm0 0c-3-1-5-3-5-5 3 0 5 2 5 5Zm0 7c3-1 5-3 5-5-3 0-5 2-5 5Zm0 0c-3-1-5-3-5-5 3 0 5 2 5 5Z" /></g>);
    case 'moon':
      return (<g {...p}><path d="M27 11a11 11 0 1 0 0 18 12 12 0 0 1 0-18Z" /></g>);
    case 'sun':
      return (<g {...p}><circle cx="20" cy="20" r="6" /><path d="M20 7v3M20 30v3M7 20h3M30 20h3M11 11l2 2M27 27l2 2M29 11l-2 2M13 27l-2 2" /></g>);
    case 'coin':
      return (<g {...p}><circle cx="20" cy="20" r="9" /><path d="M20 15v10M17.5 17.5h5M17.5 22.5h5" /></g>);
    case 'flute':
      return (<g {...p}><path d="M9 25 31 13" /><circle cx="16" cy="22" r="1.2" fill={stroke} stroke="none" /><circle cx="21" cy="19" r="1.2" fill={stroke} stroke="none" /><circle cx="26" cy="16" r="1.2" fill={stroke} stroke="none" /></g>);
    case 'flag':
      return (<g {...p}><path d="M13 32V9" /><path d="M13 10h15l-3 5 3 5H13" /></g>);
    case 'heart':
      return (<g {...p}><path d="M20 30s-9-5.6-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.4-9 12-9 12Z" /></g>);
    case 'cross':
      return (<g {...p}><path d="M20 8v24M12 16h16" /></g>);
    default:
      return (<g {...p}><path d="M20 8v7M20 25v7M8 20h7M25 20h7M12 12l4.5 4.5M23.5 23.5 28 28M28 12l-4.5 4.5M16.5 23.5 12 28" /></g>);
  }
}

/** The square mark, for chips, list rows and card tags. */
export default function FestivalMark({
  festivalName,
  className = '',
}: {
  festivalName: string;
  className?: string;
}) {
  const { palette, glyph } = resolveFestivalVisual(festivalName);
  const [light, strong] = PALETTES[palette];
  // Unique per render pass, because two marks for different festivals on the
  // same page would otherwise share a gradient id and the second would inherit
  // the first one's colours.
  const gid = `fm-${palette}-${glyph}`;
  return (
    <span className={`mkt-fest-mark ${className}`.trim()} aria-hidden>
      <svg viewBox="0 0 40 40" width="100%" height="100%" role="presentation">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={light} />
            <stop offset="100%" stopColor={strong} stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill={`url(#${gid})`} />
        <Glyph id={glyph} stroke={strong} />
      </svg>
    </span>
  );
}

/**
 * Full-bleed festival artwork: the card cover, the hero plate, and the media
 * header inside a phone preview. Fills the frame rather than floating one icon
 * in flat colour, because a card cover that is mostly empty gradient reads as a
 * placeholder somebody forgot to replace.
 */
export function FestivalArt({
  festivalName,
  className = '',
}: {
  festivalName: string;
  className?: string;
}) {
  const { palette, glyph } = resolveFestivalVisual(festivalName);
  const [light, strong] = PALETTES[palette];
  const id = `fa-${palette}-${glyph}`;
  return (
    <span className={`mkt-fest-art ${className}`.trim()} aria-hidden>
      <svg viewBox="0 0 160 90" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="presentation">
        <defs>
          <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={light} />
            <stop offset="100%" stopColor={strong} stopOpacity="0.78" />
          </linearGradient>
          <pattern id={`${id}-tile`} width="40" height="40" patternUnits="userSpaceOnUse">
            <g transform="scale(0.55) translate(16 16)" opacity="0.2">
              <Glyph id={glyph} stroke="#ffffff" />
            </g>
          </pattern>
        </defs>
        <rect width="160" height="90" fill={`url(#${id}-bg)`} />
        <rect width="160" height="90" fill={`url(#${id}-tile)`} />
        <g transform="translate(60 25)">
          <circle cx="20" cy="20" r="25" fill="#ffffff" opacity="0.92" />
          <Glyph id={glyph} stroke={strong} />
        </g>
      </svg>
    </span>
  );
}
