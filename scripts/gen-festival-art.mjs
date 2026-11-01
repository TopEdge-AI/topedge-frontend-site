/**
 * Generates the festival scene artwork under public/marketing/festivals/.
 *
 * One 320x180 SVG per festival: a lit background in the festival's own palette,
 * scattered motifs, and a drawn scene in the middle. Landscape, because the
 * slot is a WhatsApp media header (2.4:1) and a card cover (16:9), and composed
 * around the centre so a square crop still lands on the subject.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const OUT = resolve(process.argv[2] || 'public/marketing/festivals');
mkdirSync(OUT, { recursive: true });

const W = 320;
const H = 180;

/* ── helpers ──────────────────────────────────────────────────────────── */

const rnd = (seed) => {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
};

const hash = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

/** Soft out-of-focus lights, the thing that makes a flat fill read as a scene. */
function bokeh(seed, tint = '#ffffff', count = 16) {
  const r = rnd(seed);
  let out = '';
  for (let i = 0; i < count; i += 1) {
    const cx = r() * W;
    const cy = r() * H;
    const rad = 2 + r() * 9;
    const op = (0.08 + r() * 0.3).toFixed(2);
    out += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rad.toFixed(1)}" fill="${tint}" opacity="${op}"/>`;
  }
  return out;
}

/** A string of hanging festoon lights across the top. */
function festoon(colors, seed) {
  const r = rnd(seed);
  let out = `<path d="M-6 16 Q 80 46 160 22 T 326 30" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.4"/>`;
  for (let i = 0; i <= 11; i += 1) {
    const t = i / 11;
    const x = -6 + t * 332;
    const y = 22 + Math.sin(t * Math.PI * 2.1) * 12 + 8;
    const c = colors[i % colors.length];
    out += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x.toFixed(1)}" y2="${(y + 7).toFixed(1)}" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1"/>`;
    out += `<circle cx="${x.toFixed(1)}" cy="${(y + 10).toFixed(1)}" r="${(2.6 + r() * 0.8).toFixed(1)}" fill="${c}" opacity="0.95"/>`;
  }
  return out;
}

/** Scattered petals / confetti drifting over the scene. */
function petals(colors, seed, count = 22) {
  const r = rnd(seed);
  let out = '';
  for (let i = 0; i < count; i += 1) {
    const x = r() * W;
    const y = r() * H;
    const s = 2 + r() * 3;
    const rot = (r() * 360).toFixed(0);
    const c = colors[i % colors.length];
    out += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${s.toFixed(1)}" ry="${(s * 0.52).toFixed(1)}" fill="${c}" opacity="${(0.35 + r() * 0.45).toFixed(2)}" transform="rotate(${rot} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }
  return out;
}

/** A warm radial halo, used behind every flame and every lit subject. */
function glow(cx, cy, r, color, op = 0.55) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${op}" filter="url(#blur)"/>`;
}

/** Oil-lamp flame, teardrop with a hot core. */
function flame(cx, cy, s = 1) {
  return `<g transform="translate(${cx} ${cy}) scale(${s})">
    ${glow(0, -4, 13, '#fbbf24', 0.6)}
    <path d="M0 -17 C 7 -8 7 -2 4.4 1.6 C 2.6 4.1 -2.6 4.1 -4.4 1.6 C -7 -2 -7 -8 0 -17Z" fill="#f59e0b"/>
    <path d="M0 -12 C 4 -6 4 -2 2.4 0.4 C 1.4 1.8 -1.4 1.8 -2.4 0.4 C -4 -2 -4 -6 0 -12Z" fill="#fde68a"/>
  </g>`;
}

/** A terracotta diya, the clay bowl plus its flame. */
function diya(cx, cy, s = 1, clay = '#b45309', clayDark = '#7c2d12') {
  return `<g transform="translate(${cx} ${cy}) scale(${s})">
    ${flame(0, -5)}
    <path d="M-20 0 C -20 11 -11 17 0 17 C 11 17 20 11 20 0Z" fill="${clay}"/>
    <path d="M-20 0 C -20 4 -11 7 0 7 C 11 7 20 4 20 0Z" fill="${clayDark}" opacity="0.65"/>
    <ellipse cx="0" cy="0" rx="20" ry="4.6" fill="${clay}" opacity="0.95"/>
    <ellipse cx="0" cy="0" rx="13" ry="2.9" fill="#fcd34d"/>
  </g>`;
}

/** Concentric rangoli rosette. */
function rangoli(cx, cy, s, colors) {
  const petalsOut = [];
  for (let i = 0; i < 12; i += 1) {
    const a = (i / 12) * Math.PI * 2;
    const x = Math.cos(a) * 26;
    const y = Math.sin(a) * 26;
    petalsOut.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="7" ry="4.2" fill="${colors[i % colors.length]}" opacity="0.9" transform="rotate(${((a * 180) / Math.PI).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`);
  }
  const inner = [];
  for (let i = 0; i < 8; i += 1) {
    const a = (i / 8) * Math.PI * 2 + 0.4;
    const x = Math.cos(a) * 14;
    const y = Math.sin(a) * 14;
    inner.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.4" fill="${colors[(i + 2) % colors.length]}" opacity="0.95"/>`);
  }
  return `<g transform="translate(${cx} ${cy}) scale(${s})">
    <circle r="34" fill="#ffffff" opacity="0.18"/>
    ${petalsOut.join('')}
    ${inner.join('')}
    <circle r="7.5" fill="#fffbeb"/>
    <circle r="4" fill="${colors[0]}"/>
  </g>`;
}

/** Marigold garland swag. */
function garland(colors, y = 12) {
  const out = [];
  for (let i = 0; i <= 26; i += 1) {
    const t = i / 26;
    const x = -8 + t * 336;
    const yy = y + Math.sin(t * Math.PI) * 26;
    const r = 4.2 + (i % 3) * 0.7;
    out.push(`<circle cx="${x.toFixed(1)}" cy="${yy.toFixed(1)}" r="${r}" fill="${colors[i % colors.length]}" opacity="0.92"/>`);
    out.push(`<circle cx="${(x - 1).toFixed(1)}" cy="${(yy - 1.2).toFixed(1)}" r="${(r * 0.45).toFixed(1)}" fill="#ffffff" opacity="0.32"/>`);
  }
  return out.join('');
}

/** Lotus, used wherever the scene wants something seated and calm. */
function lotus(cx, cy, s, outer, inner) {
  const ps = [];
  for (let i = -3; i <= 3; i += 1) {
    const rot = i * 23;
    ps.push(`<path d="M0 0 C -9 -14 -4 -28 0 -34 C 4 -28 9 -14 0 0Z" fill="${i % 2 ? outer : inner}" opacity="${i === 0 ? 1 : 0.9}" transform="rotate(${rot})"/>`);
  }
  return `<g transform="translate(${cx} ${cy}) scale(${s})">${ps.join('')}<ellipse cx="0" cy="1" rx="13" ry="4.5" fill="#fff7ed" opacity="0.9"/></g>`;
}

/* ── scenes ───────────────────────────────────────────────────────────── */

const SCENES = {
  diwali: (c) => `
    ${festoon(['#fbbf24', '#fb7185', '#a78bfa', '#34d399'], 11)}
    ${bokeh(21, '#fde68a', 22)}
    <g opacity="0.9">
      ${rangoli(160, 118, 0.62, ['#f97316', '#fbbf24', '#ec4899', '#a78bfa'])}
    </g>
    ${diya(96, 96, 0.92)}
    ${diya(160, 78, 1.18)}
    ${diya(224, 96, 0.92)}
    ${petals(['#fbbf24', '#f97316'], 7, 14)}`,

  dhanteras: (c) => `
    ${bokeh(33, '#fde68a', 24)}
    ${garland(['#f59e0b', '#fbbf24', '#fb923c'], 8)}
    <g transform="translate(160 108)">
      ${glow(0, 0, 50, '#fbbf24', 0.5)}
      <ellipse cx="0" cy="44" rx="92" ry="12" fill="#92400e" opacity="0.3"/>
      <g>
        ${[[-56, 40], [-56, 33], [-56, 26], [-48, 19]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="19" ry="6.4" fill="#fbbf24" stroke="#b45309" stroke-width="1.2"/>`).join('')}
        ${[[58, 41], [58, 34], [52, 27]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="17" ry="5.8" fill="#fcd34d" stroke="#b45309" stroke-width="1.2"/>`).join('')}
      </g>
      <g transform="translate(0 -2)">
        <path d="M-30 6 C -34 26 -20 42 0 42 C 20 42 34 26 30 6Z" fill="#fcd34d"/>
        <path d="M-30 6 C -32 20 -20 32 0 32 C 20 32 32 20 30 6Z" fill="#f59e0b" opacity="0.5"/>
        <ellipse cx="0" cy="6" rx="30" ry="8" fill="#fde68a"/>
        <path d="M-15 6 V-8 h30 V6Z" fill="#f59e0b"/>
        <ellipse cx="0" cy="-8" rx="15" ry="5" fill="#fcd34d"/>
        <ellipse cx="0" cy="-8" rx="22" ry="6" fill="#d97706" opacity="0.85"/>
        <path d="M-9 -12 q 9 -14 18 0" fill="none" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/>
        <circle cx="0" cy="-26" r="9" fill="#a16207"/>
        <circle cx="0" cy="-26" r="5" fill="#fde68a"/>
        <path d="M-24 18 q 24 10 48 0" fill="none" stroke="#b45309" stroke-width="2.4" opacity="0.7"/>
      </g>
      ${diya(-84, 6, 0.6)}
      ${diya(84, 6, 0.6)}
    </g>`,

  holi: (c) => {
    const cols = ['#ec4899', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ef4444'];
    const r = rnd(5);
    let arcs = '';
    for (let i = 0; i < 5; i += 1) {
      const x0 = 24 + i * 68;
      const c0 = cols[i % cols.length];
      arcs += `<path d="M${x0} 164 Q ${x0 + 18} ${70 + i * 9} ${x0 + 56} ${34 + i * 7}" fill="none" stroke="${c0}" stroke-width="${(5 - i * 0.5).toFixed(1)}" stroke-linecap="round" opacity="0.5"/>`;
    }
    let specks = '';
    for (let i = 0; i < 34; i += 1) {
      specks += `<circle cx="${(r() * W).toFixed(0)}" cy="${(r() * 140).toFixed(0)}" r="${(1.2 + r() * 2.6).toFixed(1)}" fill="${cols[i % cols.length]}" opacity="${(0.5 + r() * 0.45).toFixed(2)}"/>`;
    }
    const pile = (x, y, w, col) => `<g><path d="M${-w} 0 Q 0 ${-w * 0.8} ${w} 0Z" fill="${col}" transform="translate(${x} ${y})"/><ellipse cx="${x}" cy="${y}" rx="${w}" ry="${(w * 0.22).toFixed(1)}" fill="${col}"/><path d="M${x - w * 0.4} ${y - w * 0.3} q ${w * 0.4} ${-w * 0.25} ${w * 0.8} 0" fill="none" stroke="#ffffff" stroke-width="1.4" opacity="0.4"/></g>`;
    return `${arcs}${specks}
    <g transform="translate(160 150)">
      <ellipse cx="0" cy="8" rx="128" ry="14" fill="#ffffff" opacity="0.22"/>
      ${pile(-92, 2, 22, '#ec4899')}
      ${pile(-46, 4, 26, '#f59e0b')}
      ${pile(2, 1, 30, '#22c55e')}
      ${pile(52, 4, 25, '#3b82f6')}
      ${pile(98, 2, 21, '#a855f7')}
    </g>
    <g transform="translate(160 76)">
      ${glow(0, 0, 44, '#ffffff', 0.35)}
      <path d="M-22 26 h44 l-5 -14 h-34Z" fill="#fff7ed"/>
      <path d="M-18 12 q 18 -12 36 0" fill="none" stroke="#f97316" stroke-width="3" stroke-linecap="round"/>
      <path d="M-13 12 Q 0 -22 13 12Z" fill="#ec4899" opacity="0.85"/>
      ${[[-34, -6, '#22c55e'], [34, -10, '#f59e0b'], [-16, -30, '#3b82f6'], [18, -34, '#a855f7'], [0, -48, '#ef4444']].map(([x, y, col]) => `<circle cx="${x}" cy="${y}" r="${7 - Math.abs(y) / 16}" fill="${col}" opacity="0.92"/>`).join('')}
    </g>`;
  },

  christmas: (c) => {
    const r = rnd(44);
    let snow = '';
    for (let i = 0; i < 40; i += 1) {
      snow += `<circle cx="${(r() * W).toFixed(0)}" cy="${(r() * H).toFixed(0)}" r="${(0.9 + r() * 1.8).toFixed(1)}" fill="#ffffff" opacity="${(0.4 + r() * 0.5).toFixed(2)}"/>`;
    }
    return `${snow}
    <path d="M0 150 Q 60 132 120 150 T 240 150 T 320 142 V180 H0Z" fill="#ffffff" opacity="0.9"/>
    <g transform="translate(160 104)">
      ${glow(0, -10, 50, '#fde68a', 0.4)}
      <rect x="-7" y="36" width="14" height="14" rx="2" fill="#92400e"/>
      <path d="M0 -54 L26 -16 H-26Z" fill="#15803d"/>
      <path d="M0 -36 L34 8 H-34Z" fill="#16a34a"/>
      <path d="M0 -14 L42 38 H-42Z" fill="#22c55e"/>
      ${[[-20, 24], [14, 30], [-6, 6], [22, 16], [-26, 34], [6, -8], [-14, -4]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="3.4" fill="${['#ef4444', '#fbbf24', '#f472b6', '#60a5fa'][i % 4]}"/>`).join('')}
      <path d="M0 -62 l4.2 8.6 9.5 1.4-6.9 6.7 1.7 9.4L0 -40.3l-8.5 4.4 1.7-9.4-6.9-6.7 9.5-1.4Z" fill="#fde047"/>
      <rect x="-54" y="44" width="24" height="18" rx="3" fill="#ef4444"/><rect x="-44" y="44" width="4" height="18" fill="#fde68a"/>
      <rect x="32" y="48" width="20" height="14" rx="3" fill="#60a5fa"/><rect x="40" y="48" width="4" height="14" fill="#ffffff"/>
    </g>`;
  },

  crescent: (c, opts = {}) => `
    ${bokeh(61, '#ffffff', 20)}
    ${[[40, 34, 1.4], [268, 44, 1.1], [92, 24, 0.9], [232, 22, 1.2]].map(([x, y, s]) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -6 l1.7 3.5 3.9.6-2.8 2.7.7 3.8L0 2.8l-3.5 1.8.7-3.8-2.8-2.7 3.9-.6Z" fill="#fde68a" opacity="0.9"/>`).join('')}
    <g transform="translate(160 100)">
      ${glow(0, -16, 44, '#fef3c7', 0.4)}
      <path d="M14 -52 A 34 34 0 1 0 14 16 A 27 27 0 1 1 14 -52Z" fill="#fde68a"/>
      <path d="M34 -40 l3.2 6.6 7.3 1-5.3 5.1 1.3 7.2-6.5-3.4-6.5 3.4 1.3-7.2-5.3-5.1 7.3-1Z" fill="#fcd34d"/>
      <g transform="translate(0 50)">
        <path d="M-96 22 V2 h192 v20Z" fill="${opts.wall || '#0f766e'}" opacity="0.85"/>
        <path d="M-52 2 V-14 a16 16 0 0 1 32 0 V2Z" fill="${opts.wall || '#0f766e'}"/>
        <path d="M20 2 V-14 a16 16 0 0 1 32 0 V2Z" fill="${opts.wall || '#0f766e'}"/>
        <path d="M-20 2 V-30 a20 20 0 0 1 40 0 V2Z" fill="${opts.dome || '#115e59'}"/>
        <path d="M0 -50 v-9 M-5 -55 h10" stroke="#fcd34d" stroke-width="2.6" stroke-linecap="round"/>
        <rect x="-82" y="-24" width="7" height="26" rx="3.5" fill="${opts.dome || '#115e59'}"/>
        <rect x="75" y="-24" width="7" height="26" rx="3.5" fill="${opts.dome || '#115e59'}"/>
      </g>
      <g transform="translate(-96 -6)">${lanternShape('#fbbf24')}</g>
      <g transform="translate(96 -14) scale(0.82)">${lanternShape('#fcd34d')}</g>
    </g>`,

  kites: (c) => {
    const kite = (x, y, s, rot, a, b, tail) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
      <path d="M0 -22 L17 0 L0 24 L-17 0Z" fill="${a}"/>
      <path d="M0 -22 L17 0 L0 0Z" fill="${b}" opacity="0.95"/>
      <path d="M0 0 L-17 0 L0 24Z" fill="${b}" opacity="0.6"/>
      <path d="M0 -22 V24 M-17 0 H17" stroke="#ffffff" stroke-width="1" opacity="0.7"/>
      <path d="M0 24 q 8 10 -2 18 q -9 8 1 18" fill="none" stroke="${tail}" stroke-width="1.8" stroke-linecap="round"/>
    </g>`;
    return `${bokeh(77, '#ffffff', 18)}
    <circle cx="258" cy="42" r="26" fill="#fde68a" opacity="0.85"/>
    <circle cx="258" cy="42" r="38" fill="#fde68a" opacity="0.3" filter="url(#blur)"/>
    ${kite(78, 62, 1.15, -16, '#ef4444', '#fbbf24', '#f472b6')}
    ${kite(160, 96, 1.45, 12, '#8b5cf6', '#22d3ee', '#fbbf24')}
    ${kite(242, 110, 0.95, -24, '#22c55e', '#fde047', '#60a5fa')}
    ${kite(36, 128, 0.7, 20, '#f97316', '#fda4af', '#a78bfa')}
    <path d="M0 170 Q 80 158 160 166 T 320 158 V180 H0Z" fill="#ffffff" opacity="0.35"/>`;
  },

  rakhi: (c) => `
    ${bokeh(88, '#ffffff', 18)}
    ${petals(['#fb7185', '#fbbf24', '#f472b6'], 4, 18)}
    <g transform="translate(160 94)">
      ${glow(0, 0, 48, '#fda4af', 0.45)}
      <path d="M-110 6 q 48 -34 92 -4" fill="none" stroke="#e11d48" stroke-width="6" stroke-linecap="round" opacity="0.9"/>
      <path d="M110 6 q -48 -34 -92 -4" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linecap="round" opacity="0.9"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i / 8) * Math.PI * 2;
        return `<ellipse cx="${(Math.cos(a) * 22).toFixed(1)}" cy="${(Math.sin(a) * 22).toFixed(1)}" rx="11" ry="7" fill="${i % 2 ? '#fb7185' : '#fbbf24'}" transform="rotate(${((a * 180) / Math.PI).toFixed(0)} ${(Math.cos(a) * 22).toFixed(1)} ${(Math.sin(a) * 22).toFixed(1)})"/>`;
      }).join('')}
      <circle r="16" fill="#fff1f2"/>
      <circle r="10" fill="#e11d48"/>
      <circle r="4.5" fill="#fde68a"/>
      <path d="M-11 28 q 4 16 -4 28" stroke="#e11d48" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M11 28 q -4 16 4 28" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="-15" cy="58" r="3.2" fill="#fbbf24"/><circle cx="15" cy="58" r="3.2" fill="#e11d48"/>
    </g>`,

  trident: (c, opts = {}) => `
    ${bokeh(99, '#fed7aa', 20)}
    ${garland(['#f97316', '#fbbf24', '#fb923c'], 6)}
    <g transform="translate(160 104)">
      ${glow(0, -10, 46, '#fdba74', 0.5)}
      <path d="M-30 -36 V-6 M0 -48 V-6 M30 -36 V-6" stroke="${opts.metal || '#b45309'}" stroke-width="7" stroke-linecap="round"/>
      <path d="M-30 -42 l5 8 h-10Z M0 -56 l5.5 9 h-11Z M30 -42 l5 8 h-10Z" fill="${opts.metal || '#b45309'}"/>
      <path d="M-36 -6 H36 a6 6 0 0 1 0 12 H-36 a6 6 0 0 1 0 -12Z" fill="${opts.metal || '#b45309'}"/>
      <rect x="-4.5" y="6" width="9" height="48" rx="4" fill="#92400e"/>
      ${lotus(0, 60, 0.6, '#f97316', '#fbbf24')}
      ${diya(-78, 36, 0.62)}
      ${diya(78, 36, 0.62)}
    </g>`,

  modak: (c) => `
    ${bokeh(111, '#fde68a', 20)}
    ${garland(['#f59e0b', '#ef4444', '#fbbf24'], 6)}
    <g transform="translate(160 110)">
      ${glow(0, -6, 50, '#fcd34d', 0.5)}
      <ellipse cx="0" cy="46" rx="92" ry="12" fill="#b45309" opacity="0.26"/>
      <ellipse cx="0" cy="40" rx="68" ry="15" fill="#16a34a"/>
      <ellipse cx="0" cy="36" rx="68" ry="15" fill="#22c55e"/>
      <ellipse cx="0" cy="36" rx="52" ry="10" fill="#86efac" opacity="0.6"/>
      <g transform="translate(0 2)">
        <path d="M-32 30 C -32 10 -20 -6 0 -6 C 20 -6 32 10 32 30Z" fill="#fcd34d"/>
        <path d="M-32 30 C -32 18 -18 10 0 10 C 18 10 32 18 32 30Z" fill="#f59e0b" opacity="0.45"/>
        ${[-24, -12, 0, 12, 24].map((x) => `<path d="M${x} 30 C ${x * 0.5} 8 ${x * 0.28} -2 0 -6" fill="none" stroke="#d97706" stroke-width="1.8" opacity="0.75"/>`).join('')}
        <ellipse cx="0" cy="30" rx="36" ry="8" fill="#f59e0b"/>
        <path d="M0 -6 C 4 -16 0 -24 0 -24 C 0 -24 -4 -16 0 -6Z" fill="#d97706"/>
        <circle cx="0" cy="-26" r="4" fill="#ef4444"/>
      </g>
      ${[[-44, 24], [44, 24]].map(([x, y]) => `<g transform="translate(${x} ${y}) scale(0.5)"><path d="M-32 30 C -32 10 -20 -6 0 -6 C 20 -6 32 10 32 30Z" fill="#fde68a"/><ellipse cx="0" cy="30" rx="36" ry="8" fill="#fbbf24"/></g>`).join('')}
      ${diya(-84, 10, 0.56)}
      ${diya(84, 10, 0.56)}
    </g>`,

  effigy: (c) => `
    ${bokeh(90, '#fecaca', 20)}
    <g transform="translate(160 104)">
      ${glow(0, 30, 62, '#f97316', 0.55)}
      <ellipse cx="0" cy="58" rx="104" ry="13" fill="#7f1d1d" opacity="0.32"/>
      <g>
        <rect x="-9" y="-16" width="18" height="52" rx="5" fill="#7c2d12"/>
        <path d="M-44 -6 H44" stroke="#7c2d12" stroke-width="9" stroke-linecap="round"/>
        <path d="M-9 36 l-16 22 M9 36 l16 22" stroke="#7c2d12" stroke-width="9" stroke-linecap="round"/>
        <circle cy="-30" r="15" fill="#92400e"/>
        ${[-30, -15, 0, 15, 30].map((dx, i) => `<circle cx="${dx}" cy="${-38 - (2 - Math.abs(i - 2)) * 5}" r="9" fill="#b45309" opacity="0.95"/>`).join('')}
        <path d="M-52 -6 l-8 -14 M52 -6 l8 -14" stroke="#a16207" stroke-width="5" stroke-linecap="round"/>
      </g>
      ${flame(-28, 46, 1.25)}
      ${flame(0, 56, 1.7)}
      ${flame(28, 46, 1.25)}
      ${flame(-56, 54, 0.85)}
      ${flame(56, 54, 0.85)}
      ${Array.from({ length: 12 }, (_, i) => {
        const r = rnd(500 + i);
        return `<circle cx="${(-80 + r() * 160).toFixed(0)}" cy="${(-20 + r() * 50).toFixed(0)}" r="${(1 + r() * 2).toFixed(1)}" fill="#fcd34d" opacity="${(0.5 + r() * 0.5).toFixed(2)}"/>`;
      }).join('')}
    </g>`,

  pookalam: (c) => `
    ${bokeh(122, '#ffffff', 18)}
    ${[[62, 56, 0.5], [258, 60, 0.46]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})">${lotus(0, 0, 1, '#fbbf24', '#fde68a')}</g>`).join('')}
    ${rangoli(160, 100, 1.08, ['#f59e0b', '#ffffff', '#22c55e', '#ef4444', '#fbbf24'])}
    <g transform="translate(160 100)">
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
        const a = (i / 16) * Math.PI * 2;
        return `<circle cx="${(Math.cos(a) * 46).toFixed(1)}" cy="${(Math.sin(a) * 46).toFixed(1)}" r="4.4" fill="${['#f97316', '#fde047', '#ffffff', '#ef4444'][i % 4]}" opacity="0.95"/>`;
      }).join('')}
    </g>
    ${petals(['#fbbf24', '#ffffff', '#22c55e'], 12, 18)}`,

  cross: (c) => `
    ${bokeh(133, '#e0e7ff', 16)}
    <g transform="translate(160 96)">
      ${glow(0, -6, 54, '#c7d2fe', 0.45)}
      ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M0 -6 L${(Math.cos((i / 8) * Math.PI * 2) * 86).toFixed(1)} ${(Math.sin((i / 8) * Math.PI * 2) * 86 - 6).toFixed(1)}" stroke="#ffffff" stroke-opacity="0.16" stroke-width="7"/>`).join('')}
      <rect x="-7" y="-58" width="14" height="112" rx="4" fill="#78350f"/>
      <rect x="-40" y="-26" width="80" height="14" rx="4" fill="#92400e"/>
      <path d="M-7 -58 h14 v18 h-14Z" fill="#92400e" opacity="0.6"/>
      <g transform="translate(0 -48)">
        <circle r="17" fill="none" stroke="#a16207" stroke-width="4"/>
        <circle r="17" fill="none" stroke="#ca8a04" stroke-width="1.6" stroke-dasharray="3 5"/>
      </g>
    </g>
    <path d="M0 160 Q 90 146 180 158 T 320 150 V180 H0Z" fill="#1e1b4b" opacity="0.18"/>`,

  easter: (c) => `
    ${bokeh(144, '#ffffff', 20)}
    ${petals(['#f9a8d4', '#fde68a', '#a7f3d0'], 6, 22)}
    <g transform="translate(160 104)">
      ${glow(0, -4, 48, '#fbcfe8', 0.45)}
      <ellipse cx="0" cy="48" rx="86" ry="12" fill="#34d399" opacity="0.3"/>
      <g transform="translate(-44 10) rotate(-9)">
        <ellipse rx="22" ry="29" fill="#f472b6"/>
        <path d="M-22 -4 q 11 7 22 0 t 22 0" fill="none" stroke="#ffffff" stroke-width="3.4" opacity="0.85"/>
        <path d="M-20 10 q 10 6 20 0 t 20 0" fill="none" stroke="#fde68a" stroke-width="3.4"/>
      </g>
      <g transform="translate(6 -2) rotate(6)">
        <ellipse rx="26" ry="34" fill="#60a5fa"/>
        <circle cx="-8" cy="-10" r="4" fill="#ffffff" opacity="0.9"/><circle cx="7" cy="2" r="4" fill="#fde68a"/><circle cx="-4" cy="14" r="4" fill="#f9a8d4"/>
      </g>
      <g transform="translate(52 14) rotate(12)">
        <ellipse rx="20" ry="26" fill="#fbbf24"/>
        <path d="M-19 0 h38 M-16 -11 h32" stroke="#ffffff" stroke-width="3" opacity="0.8"/>
      </g>
      ${lotus(-96, 28, 0.42, '#ffffff', '#fde68a')}
      ${lotus(96, 28, 0.42, '#ffffff', '#f9a8d4')}
    </g>`,

  coins: (c) => `
    ${bokeh(155, '#fde68a', 24)}
    ${garland(['#fbbf24', '#f59e0b'], 6)}
    <g transform="translate(160 112)">
      ${glow(0, -4, 54, '#fcd34d', 0.5)}
      <ellipse cx="0" cy="40" rx="100" ry="13" fill="#92400e" opacity="0.26"/>
      <g>
        ${[[-62, 34], [-62, 27], [-62, 20], [-58, 13]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="18" ry="6" fill="#fbbf24" stroke="#b45309" stroke-width="1.2"/>`).join('')}
        ${[[64, 35], [64, 28], [60, 21], [62, 14], [60, 7]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="17" ry="5.6" fill="#fcd34d" stroke="#b45309" stroke-width="1.2"/>`).join('')}
      </g>
      <g transform="translate(0 6)">
        <path d="M-40 28 l8 -16 h64 l8 16Z" fill="#fbbf24" stroke="#b45309" stroke-width="1.6"/>
        <path d="M-32 12 l7 -14 h50 l7 14Z" fill="#fcd34d" stroke="#b45309" stroke-width="1.6"/>
        <path d="M-24 -2 l7 -14 h34 l7 14Z" fill="#fde68a" stroke="#b45309" stroke-width="1.6"/>
        <path d="M-14 -8 h28" stroke="#d97706" stroke-width="2" opacity="0.8"/>
      </g>
      <g transform="translate(0 -56)">
        <circle r="17" fill="#fbbf24" stroke="#b45309" stroke-width="2.4"/>
        <circle r="11" fill="#fde68a"/>
        <path d="M-6 -4 q 6 9 12 0" fill="none" stroke="#b45309" stroke-width="2" stroke-linecap="round"/>
        <circle cy="-6" r="2.6" fill="#b45309"/>
      </g>
      ${diya(-92, -2, 0.56)}
      ${diya(92, -2, 0.56)}
    </g>`,

  flute: (c) => `
    ${bokeh(166, '#c7d2fe', 20)}
    ${petals(['#fbbf24', '#a78bfa', '#60a5fa'], 8, 18)}
    <g transform="translate(160 100)">
      ${glow(0, -6, 48, '#a5b4fc', 0.45)}
      <g transform="translate(0 -46)">
        <path d="M0 -14 C 10 -14 16 -6 16 2 C 16 12 8 18 0 18 C -8 18 -16 12 -16 2 C -16 -6 -10 -14 0 -14Z" fill="#60a5fa" opacity="0.9"/>
        <path d="M0 -28 C 7 -24 9 -16 6 -12 C 3 -9 -3 -9 -6 -12 C -9 -16 -7 -24 0 -28Z" fill="#22d3ee"/>
        <circle cx="0" cy="-20" r="4.4" fill="#fde68a"/>
      </g>
      <path d="M-66 30 L66 -12" stroke="#b45309" stroke-width="9" stroke-linecap="round"/>
      <path d="M-66 30 L66 -12" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
      ${[-36, -14, 8, 30].map((x) => `<circle cx="${x}" cy="${(9 - (x + 66) * 0.318).toFixed(1)}" r="2.2" fill="#78350f"/>`).join('')}
      <g transform="translate(-74 26)"><circle r="7" fill="#fde68a" opacity="0.8"/></g>
      ${lotus(0, 66, 0.52, '#a78bfa', '#c4b5fd')}
    </g>`,

  veena: (c) => `
    ${bokeh(177, '#fef3c7', 20)}
    ${petals(['#fde68a', '#fbbf24', '#ffffff'], 9, 20)}
    <g transform="translate(160 102)">
      ${glow(0, 0, 50, '#fde68a', 0.5)}
      ${lotus(0, 52, 0.95, '#fbbf24', '#fde68a')}
      <g transform="translate(0 -8)">
        <circle cx="-26" cy="16" r="26" fill="#b45309"/>
        <circle cx="-26" cy="16" r="18" fill="#92400e"/>
        <circle cx="-26" cy="16" r="7" fill="#fcd34d"/>
        <path d="M-10 6 L62 -34" stroke="#92400e" stroke-width="10" stroke-linecap="round"/>
        <path d="M-10 6 L62 -34" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
        <circle cx="66" cy="-38" r="11" fill="#b45309"/>
        ${[0, 1, 2, 3].map((i) => `<path d="M${-14 + i * 2} ${10 + i * 1.6} L${60 + i * 1.4} ${-30 + i * 1.6}" stroke="#fde68a" stroke-width="0.9" opacity="0.9"/>`).join('')}
      </g>
    </g>`,

  shiva: (c) => `
    ${bokeh(188, '#c7d2fe', 18)}
    <g transform="translate(160 104)">
      ${glow(0, -8, 52, '#a5b4fc', 0.45)}
      <path d="M44 -58 A 22 22 0 1 0 44 -18 A 17 17 0 1 1 44 -58Z" fill="#e0e7ff" opacity="0.95"/>
      <ellipse cx="0" cy="48" rx="76" ry="13" fill="#312e81" opacity="0.28"/>
      <ellipse cx="0" cy="42" rx="52" ry="15" fill="#4338ca"/>
      <ellipse cx="0" cy="36" rx="52" ry="15" fill="#6366f1"/>
      <path d="M-20 36 C -20 2 -14 -18 0 -18 C 14 -18 20 2 20 36Z" fill="#818cf8"/>
      <path d="M-20 36 C -20 14 -13 0 0 0 C 13 0 20 14 20 36Z" fill="#a5b4fc" opacity="0.7"/>
      <path d="M-24 18 q 24 10 48 0" fill="none" stroke="#fde68a" stroke-width="3.4" stroke-linecap="round"/>
      <path d="M-24 26 q 24 10 48 0" fill="none" stroke="#fde68a" stroke-width="2.4" stroke-linecap="round" opacity="0.7"/>
      ${[-66, 66].map((x) => `<g transform="translate(${x} 10)"><path d="M-9 -22 V6 M0 -30 V6 M9 -22 V6" stroke="#c7d2fe" stroke-width="3.4" stroke-linecap="round"/><path d="M-13 6 H13" stroke="#c7d2fe" stroke-width="3.4" stroke-linecap="round"/></g>`).join('')}
      ${petals(['#ffffff', '#c7d2fe'], 2, 10)}
    </g>`,

  bow: (c) => `
    ${bokeh(199, '#fde68a', 20)}
    ${garland(['#f59e0b', '#fbbf24', '#fb923c'], 6)}
    <g transform="translate(160 102)">
      ${glow(0, 0, 50, '#fcd34d', 0.5)}
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => `<path d="M0 0 L${(Math.cos((i / 12) * Math.PI * 2) * 84).toFixed(1)} ${(Math.sin((i / 12) * Math.PI * 2) * 84).toFixed(1)}" stroke="#fde68a" stroke-opacity="0.22" stroke-width="6"/>`).join('')}
      <path d="M-28 -50 C 18 -32 18 32 -28 50" fill="none" stroke="#b45309" stroke-width="8" stroke-linecap="round"/>
      <path d="M-28 -50 L-28 50" stroke="#fde68a" stroke-width="2.4"/>
      <path d="M-28 0 H52" stroke="#92400e" stroke-width="5" stroke-linecap="round"/>
      <path d="M52 0 l-13 -8 v16Z" fill="#fcd34d"/>
      <circle cx="0" cy="-66" r="13" fill="#fde68a" opacity="0.9"/>
      ${lotus(0, 62, 0.5, '#f97316', '#fbbf24')}
    </g>`,

  fireworks: (c) => {
    const burst = (x, y, s, col, col2) => `<g transform="translate(${x} ${y}) scale(${s})">
      ${glow(0, 0, 30, col, 0.35)}
      ${Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const r1 = 10;
        const r2 = 30 + (i % 3) * 5;
        return `<line x1="${(Math.cos(a) * r1).toFixed(1)}" y1="${(Math.sin(a) * r1).toFixed(1)}" x2="${(Math.cos(a) * r2).toFixed(1)}" y2="${(Math.sin(a) * r2).toFixed(1)}" stroke="${i % 2 ? col : col2}" stroke-width="2.4" stroke-linecap="round"/><circle cx="${(Math.cos(a) * r2).toFixed(1)}" cy="${(Math.sin(a) * r2).toFixed(1)}" r="2.2" fill="${col2}"/>`;
      }).join('')}
      <circle r="5" fill="#ffffff" opacity="0.95"/>
    </g>`;
    return `${bokeh(210, '#ffffff', 26)}
    ${burst(88, 62, 0.95, '#a78bfa', '#fde68a')}
    ${burst(232, 54, 0.8, '#f472b6', '#ffffff')}
    ${burst(160, 102, 1.25, '#fbbf24', '#c4b5fd')}
    ${burst(44, 122, 0.55, '#34d399', '#fde68a')}
    ${burst(276, 120, 0.6, '#60a5fa', '#ffffff')}
    <path d="M0 162 Q 50 150 92 160 L 100 180 H0Z" fill="#312e81" opacity="0.25"/>
    <path d="M320 164 Q 272 150 228 162 L 220 180 H320Z" fill="#312e81" opacity="0.25"/>`;
  },

  sunwater: (c) => `
    ${bokeh(221, '#fed7aa', 16)}
    <circle cx="160" cy="76" r="42" fill="#fb923c"/>
    <circle cx="160" cy="76" r="58" fill="#fdba74" opacity="0.4" filter="url(#blur)"/>
    ${Array.from({ length: 16 }, (_, i) => {
      const a = (i / 16) * Math.PI * 2;
      return `<line x1="${(160 + Math.cos(a) * 48).toFixed(1)}" y1="${(76 + Math.sin(a) * 48).toFixed(1)}" x2="${(160 + Math.cos(a) * 66).toFixed(1)}" y2="${(76 + Math.sin(a) * 66).toFixed(1)}" stroke="#fdba74" stroke-width="3.4" stroke-linecap="round" opacity="0.8"/>`;
    }).join('')}
    <path d="M0 118 H320 V180 H0Z" fill="#0ea5e9" opacity="0.55"/>
    ${Array.from({ length: 7 }, (_, i) => `<path d="M${-10 + i * 54} ${128 + i * 7} q 16 -6 32 0 t 32 0" fill="none" stroke="#ffffff" stroke-width="1.8" opacity="0.5"/>`).join('')}
    <ellipse cx="160" cy="126" rx="34" ry="7" fill="#fdba74" opacity="0.7"/>
    <g transform="translate(160 134)">
      <path d="M-30 0 q 30 -12 60 0 q -30 10 -60 0Z" fill="#a16207"/>
      <path d="M-22 -2 q 22 -9 44 0" fill="none" stroke="#fde68a" stroke-width="2"/>
      ${diya(-14, -6, 0.42)}
      ${diya(14, -6, 0.42)}
    </g>
    ${[[62, 150, 0.5], [258, 152, 0.5]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})">${lotus(0, 0, 1, '#f9a8d4', '#fbcfe8')}</g>`).join('')}`,

  thali: (c) => `
    ${bokeh(232, '#ddd6fe', 20)}
    ${petals(['#c4b5fd', '#fbbf24', '#f9a8d4'], 11, 18)}
    <g transform="translate(160 106)">
      ${glow(0, 0, 48, '#c4b5fd', 0.45)}
      <ellipse cx="0" cy="40" rx="80" ry="12" fill="#5b21b6" opacity="0.22"/>
      <ellipse cx="0" cy="18" rx="66" ry="22" fill="#a78bfa"/>
      <ellipse cx="0" cy="14" rx="66" ry="22" fill="#c4b5fd"/>
      <ellipse cx="0" cy="14" rx="52" ry="16" fill="#ede9fe"/>
      <g transform="translate(-30 12)"><circle r="9" fill="#ef4444"/><circle r="4" fill="#fecaca"/></g>
      <g transform="translate(0 10)"><circle r="9" fill="#fbbf24"/><circle r="4" fill="#fef3c7"/></g>
      <g transform="translate(30 12)"><circle r="9" fill="#22c55e" opacity="0.9"/><circle r="4" fill="#bbf7d0"/></g>
      ${diya(-54, -4, 0.5)}
      ${diya(54, -4, 0.5)}
      <g transform="translate(0 -40)">
        <path d="M-16 10 q 16 -26 32 0" fill="none" stroke="#7c3aed" stroke-width="3.4" stroke-linecap="round"/>
        <circle cx="0" cy="-6" r="6" fill="#ef4444"/>
      </g>
    </g>`,

  gudi: (c) => `
    ${bokeh(243, '#bbf7d0', 18)}
    ${garland(['#f59e0b', '#22c55e', '#fbbf24'], 6)}
    <g transform="translate(160 104)">
      ${glow(0, -10, 46, '#86efac', 0.4)}
      <rect x="-4" y="-56" width="8" height="106" rx="4" fill="#92400e"/>
      <path d="M4 -52 q 44 4 50 30 q -34 10 -50 -6Z" fill="#f97316"/>
      <path d="M4 -52 q 44 4 50 30 q -34 10 -50 -6Z" fill="none" stroke="#fde68a" stroke-width="2"/>
      <path d="M4 -24 q 36 6 44 22" fill="none" stroke="#fde68a" stroke-width="2" opacity="0.7"/>
      <g transform="translate(0 -62)">
        <path d="M-15 10 C -15 -4 -8 -14 0 -14 C 8 -14 15 -4 15 10Z" fill="#fbbf24"/>
        <ellipse cx="0" cy="10" rx="17" ry="4" fill="#d97706"/>
        <path d="M0 -14 v-7" stroke="#b45309" stroke-width="3" stroke-linecap="round"/>
      </g>
      ${[-16, 0, 16].map((x, i) => `<circle cx="${x}" cy="${-30 + i * 4}" r="3.4" fill="#f59e0b" opacity="0.9"/>`).join('')}
      <path d="M-34 -44 q 34 -10 68 0" fill="none" stroke="#22c55e" stroke-width="3.4" stroke-linecap="round"/>
      ${lotus(0, 56, 0.5, '#22c55e', '#86efac')}
    </g>`,

  moonsieve: (c) => `
    ${bokeh(254, '#fecdd3', 20)}
    ${Array.from({ length: 20 }, (_, i) => {
      const r = rnd(300 + i);
      return `<circle cx="${(r() * W).toFixed(0)}" cy="${(r() * 110).toFixed(0)}" r="${(0.8 + r() * 1.4).toFixed(1)}" fill="#ffffff" opacity="${(0.4 + r() * 0.5).toFixed(2)}"/>`;
    }).join('')}
    <g transform="translate(206 62)">
      ${glow(0, 0, 36, '#fef3c7', 0.5)}
      <circle r="26" fill="#fef3c7"/>
      <circle cx="-8" cy="-6" r="5" fill="#fde68a" opacity="0.8"/><circle cx="7" cy="8" r="4" fill="#fde68a" opacity="0.7"/>
    </g>
    <g transform="translate(130 110)">
      ${glow(0, 0, 44, '#fda4af', 0.4)}
      <circle r="46" fill="none" stroke="#b45309" stroke-width="7"/>
      <circle r="42" fill="#fff1f2" opacity="0.32"/>
      ${Array.from({ length: 9 }, (_, i) => `<line x1="-40" y1="${-36 + i * 9}" x2="40" y2="${-36 + i * 9}" stroke="#fda4af" stroke-width="1.2" opacity="0.8"/><line x1="${-36 + i * 9}" y1="-40" x2="${-36 + i * 9}" y2="40" stroke="#fda4af" stroke-width="1.2" opacity="0.8"/>`).join('')}
      <circle r="46" fill="none" stroke="#92400e" stroke-width="2.4" stroke-dasharray="4 6"/>
    </g>
    ${diya(254, 134, 0.62)}`,

  mosque: (c) => `
    ${bokeh(265, '#99f6e4', 18)}
    <path d="M24 32 A 20 20 0 1 0 24 70 A 15 15 0 1 1 24 32Z" fill="#fde68a" opacity="0.9"/>
    ${[[70, 28], [262, 36], [296, 70], [112, 20]].map(([x, y]) => `<path transform="translate(${x} ${y})" d="M0 -5 l1.4 2.9 3.2.5-2.3 2.2.6 3.1L0 2.3l-2.9 1.4.6-3.1-2.3-2.2 3.2-.5Z" fill="#fde68a" opacity="0.85"/>`).join('')}
    <g transform="translate(160 118)">
      ${glow(0, -24, 54, '#5eead4', 0.35)}
      <path d="M-110 44 V8 h220 v36Z" fill="#0f766e"/>
      <path d="M-110 8 h220" stroke="#5eead4" stroke-width="2" opacity="0.6"/>
      <path d="M-60 -26 a 26 20 0 0 1 52 0 Z" fill="#14b8a6"/>
      <path d="M8 -26 a 26 20 0 0 1 52 0 Z" fill="#14b8a6"/>
      <rect x="-60" y="-26" width="52" height="34" fill="#115e59"/>
      <rect x="8" y="-26" width="52" height="34" fill="#115e59"/>
      <path d="M-30 -44 a 30 26 0 0 1 60 0 Z" fill="#2dd4bf"/>
      <rect x="-30" y="-44" width="60" height="52" fill="#0d9488"/>
      <path d="M0 -74 v-12 M-6 -80 h12" stroke="#fde68a" stroke-width="3" stroke-linecap="round"/>
      <path d="M0 -70 a 10 10 0 0 1 0 -14" fill="none" stroke="#fde68a" stroke-width="3"/>
      <rect x="-96" y="-34" width="12" height="42" rx="6" fill="#0d9488"/>
      <rect x="84" y="-34" width="12" height="42" rx="6" fill="#0d9488"/>
      <path d="M-11 8 V-10 a11 11 0 0 1 22 0 V8Z" fill="#fde68a" opacity="0.9"/>
      ${[[-46, -2], [46, -2]].map(([x, y]) => `<path d="M${x - 8} ${y + 10} V${y - 2} a8 8 0 0 1 16 0 V${y + 10}Z" fill="#5eead4" opacity="0.8"/>`).join('')}
    </g>`,

  lanterns: (c) => `
    ${bokeh(276, '#99f6e4', 20)}
    <path d="M276 30 A 18 18 0 1 0 276 64 A 13.5 13.5 0 1 1 276 30Z" fill="#fde68a" opacity="0.9"/>
    <g transform="translate(160 96)">
      ${glow(0, 0, 54, '#fcd34d', 0.4)}
      <g transform="translate(0 -4) scale(1.5)">${lanternShape('#fbbf24')}</g>
      <g transform="translate(-78 -18) scale(1.05)">${lanternShape('#fcd34d')}</g>
      <g transform="translate(78 -10) scale(0.9)">${lanternShape('#fde68a')}</g>
      <g transform="translate(-40 34) scale(0.65)">${lanternShape('#fbbf24')}</g>
      <g transform="translate(44 40) scale(0.6)">${lanternShape('#fcd34d')}</g>
    </g>
    ${petals(['#fde68a', '#5eead4'], 13, 14)}`,
};

/** A hanging festive lantern, drawn around its own origin. */
function lanternShape(body) {
  return `<g>
    <path d="M0 -34 v8" stroke="#fde68a" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M-9 -26 h18 l-2 4 h-14Z" fill="#b45309"/>
    <path d="M-11 -22 h22 l-3 28 h-16Z" fill="${body}"/>
    <path d="M-11 -22 h22 l-3 28 h-16Z" fill="#ffffff" opacity="0.18"/>
    <path d="M-7 -18 h14 l-2 20 h-10Z" fill="#fff7ed" opacity="0.6"/>
    <path d="M-8 6 h16 l-2 5 h-12Z" fill="#b45309"/>
    <path d="M0 11 v7" stroke="#b45309" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="0" cy="20" r="2.4" fill="#b45309"/>
  </g>`;
}

/* ── the catalogue ────────────────────────────────────────────────────── */

/** slug → [scene, sky-top, sky-bottom, scene options]. */
const FESTIVALS = [
  ['new-year', 'fireworks', '#1e1b4b', '#4c1d95'],
  ['makar-sankranti-pongal', 'kites', '#0ea5e9', '#7dd3fc'],
  ['vasant-panchami', 'veena', '#fbbf24', '#fef3c7'],
  ['maha-shivaratri', 'shiva', '#1e1b4b', '#4338ca'],
  ['holi', 'holi', '#8b5cf6', '#f472b6'],
  ['ugadi-gudi-padwa', 'gudi', '#15803d', '#86efac'],
  ['eid-ul-fitr', 'crescent', '#0f766e', '#2dd4bf', { wall: '#0f766e', dome: '#115e59' }],
  ['rama-navami', 'bow', '#d97706', '#fcd34d'],
  ['good-friday', 'cross', '#312e81', '#6366f1'],
  ['easter', 'easter', '#a855f7', '#f9a8d4'],
  ['akshaya-tritiya', 'coins', '#b45309', '#fcd34d'],
  ['eid-ul-adha', 'mosque', '#115e59', '#5eead4'],
  ['onam', 'pookalam', '#047857', '#6ee7b7'],
  ['milad-un-nabi', 'lanterns', '#134e4a', '#14b8a6'],
  ['raksha-bandhan', 'rakhi', '#e11d48', '#fda4af'],
  ['krishna-janmashtami', 'flute', '#3730a3', '#818cf8'],
  ['ganesh-chaturthi', 'modak', '#c2410c', '#fdba74'],
  ['navratri-durga-puja', 'trident', '#ea580c', '#fdba74', { metal: '#b45309' }],
  ['dussehra', 'effigy', '#7f1d1d', '#f87171'],
  ['karwa-chauth', 'moonsieve', '#9f1239', '#fb7185'],
  ['dhanteras', 'dhanteras', '#92400e', '#fcd34d'],
  ['diwali', 'diwali', '#7c2d12', '#f59e0b'],
  ['bhai-dooj', 'thali', '#6d28d9', '#c4b5fd'],
  ['chhath-puja', 'sunwater', '#c2410c', '#fdba74'],
  ['christmas', 'christmas', '#064e3b', '#10b981'],
];

for (const [slug, scene, top, bottom, opts] of FESTIVALS) {
  const seed = hash(slug);
  const body = SCENES[scene](slug, opts || {});
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="">
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0.35" y2="1">
<stop offset="0%" stop-color="${top}"/><stop offset="100%" stop-color="${bottom}"/>
</linearGradient>
<radialGradient id="vig" cx="0.5" cy="0.46" r="0.72">
<stop offset="55%" stop-color="#000000" stop-opacity="0"/><stop offset="100%" stop-color="#000000" stop-opacity="0.22"/>
</radialGradient>
<filter id="blur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#sky)"/>
${bokeh(seed, '#ffffff', 10)}
${body}
<rect width="${W}" height="${H}" fill="url(#vig)"/>
</svg>`;
  writeFileSync(resolve(OUT, `${slug}.svg`), svg.replace(/\n\s*\n/g, '\n'), 'utf8');
}

console.log(`wrote ${FESTIVALS.length} festival scenes to ${OUT}`);
