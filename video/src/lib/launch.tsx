/**
 * Launch kit: the motion language of premium SaaS launch films, in TopEdge violet.
 *   - two stages, Air (lavender white, soft horizon glow) and Deep (indigo night, radial bloom),
 *     cross-dissolved inside a film so scenes alternate light / dark
 *   - word-by-word blur-in type (used sparingly: one short line per film at most)
 *   - glossy glass icons, glass pills and glass panels
 *   - a 3D space: objects carry x/y/z and rotations, far objects defocus
 *   - payoffs: counting ribbon bar → Done tick with confetti, sparkle wipes,
 *     fan-in light lines, orbit hubs
 * Every value is a pure function of t, like the rest of the film kit.
 */
import type { CSSProperties, ReactNode } from 'react';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import { E, clamp, lerp, prog, spring, useSize } from './time';
import { DISPLAY, FONT, IPhone, PHONE_H, PHONE_W, Touch } from './ui';

export const L = {
  violet: '#7C3AED',
  violet2: '#8B5CF6',
  indigo: '#4F46E5',
  lav: '#E4D4FF',
  lav2: '#F3EDFF',
  air: '#F7F5FD',
  ink: '#140F2E',
  ink2: '#4A4468',
  mute: '#8A84A6',
  deep: '#0B0820',
  deepInk: '#F1ECFF',
  deepMute: 'rgba(225,214,255,0.62)',
  green: '#22C55E',
  wa: '#25D366',
};
export const GRAD = 'linear-gradient(135deg,#A78BFA 0%,#7C3AED 48%,#4F46E5 100%)';
export const GRAD_SOFT = 'linear-gradient(135deg,#C4B5FD 0%,#8B5CF6 55%,#6366F1 100%)';

/** Smooth window: 0 before a, ramps to 1, holds, ramps back to 0 at b. */
export const win = (t: number, a: number, b: number, f = 0.45) => prog(t, a, a + f, E.enter) * (1 - prog(t, b - f, b, E.exit));
/** Value travels between keys with the camera curve. */
export const ease3 = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export function track(t: number, k: [number, number][], ease = ease3) {
  if (t <= k[0][0]) return k[0][1];
  for (let i = 1; i < k.length; i++) if (t <= k[i][0]) return lerp(k[i - 1][1], k[i][1], ease(clamp((t - k[i - 1][0]) / (k[i][0] - k[i - 1][0]))));
  return k[k.length - 1][1];
}
const rnd = (i: number, s = 1) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v); };

/* ---------------------------------------------------------------- layout */

/**
 * Films are authored on a 1920x1080 world. On other canvases (the 4:5 phone cut,
 * the 4:3 hero cut) positions are re-mapped around the centre: horizontal
 * offsets squeeze to fit the narrower frame, vertical ones spread, and objects
 * keep their pixel size, so on a phone everything reads ~1.8x larger.
 */
export function layoutFor(w: number, h: number) {
  const base = w === 1920 && h === 1080;
  const kx = w / 1920;
  const ky = h > w ? (h / 1080) * 0.92 : h / 1080;
  const narrow = clamp((1920 - w) / 840);
  return {
    w, h, base, portrait: h > w, narrow,
    x: (x: number) => (base ? x : w / 2 + (x - 960) * kx),
    y: (y: number) => (base ? y : h / 2 + (y - 540) * ky),
    rx: (r: number) => r * kx,
    ry: (r: number) => r * ky,
    /** per-object shrink for wide things on narrow canvases */
    ms: (m: number) => lerp(1, m, narrow),
  };
}
export const useLayout = () => { const { w, h } = useSize(); return layoutFor(w, h); };
/** Pick a value by canvas: desktop value, portrait (phone) value. */
export const usePortrait = () => useLayout().portrait;

/* --------------------------------------------------------------- stages */

/** deep 0 = Air (light), 1 = Deep (night). Cross-dissolve by animating `deep`. */
export function Stage({ t, deep, bloom = [0.5, 0.48] }: { t: number; w?: number; h?: number; deep: number; bloom?: [number, number] }) {
  const { w, h } = useSize();
  const d1 = Math.sin(t * 0.31) * 4, d2 = Math.cos(t * 0.23) * 4;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Air */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg,#FBFAFF 0%,${L.air} 46%,#ECE4FF 78%,#D9C9FF 100%)` }} />
      <div style={{ position: 'absolute', left: `${-10 + d1}%`, top: '-30%', width: '70%', height: '90%', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(196,181,253,0.38), transparent)' }} />
      <div style={{ position: 'absolute', right: `${-12 + d2}%`, top: '-20%', width: '60%', height: '80%', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(165,180,252,0.30), transparent)' }} />
      <div style={{ position: 'absolute', left: '-20%', right: '-20%', bottom: '-48%', height: '80%', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(139,92,246,0.34), rgba(167,139,250,0.12) 60%, transparent)' }} />
      {/* Deep */}
      <div style={{ position: 'absolute', inset: 0, opacity: clamp(deep * 3), WebkitMaskImage: deep >= 0.999 ? undefined : `radial-gradient(circle at ${bloom[0] * 100}% ${bloom[1] * 100}%, #000 ${deep * 78}%, transparent ${deep * 78 + 22}%)`, maskImage: deep >= 0.999 ? undefined : `radial-gradient(circle at ${bloom[0] * 100}% ${bloom[1] * 100}%, #000 ${deep * 78}%, transparent ${deep * 78 + 22}%)` }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(70% 80% at ${bloom[0] * 100}% ${bloom[1] * 100}%, #3B1F93 0%, #1C1155 38%, ${L.deep} 78%)` }} />
        <div style={{ position: 'absolute', left: `${18 + d2}%`, top: `${8 + d1}%`, width: '64%', height: '84%', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(124,58,237,0.42), transparent)' }} />
        <div style={{ position: 'absolute', left: '50%', top: '50%', width: h * 1.5, height: h * 1.5, marginLeft: -h * 0.75, marginTop: -h * 0.75, borderRadius: '50%', boxShadow: 'inset 0 0 0 1.5px rgba(196,181,253,0.10), 0 0 120px rgba(124,58,237,0.18)', transform: `rotate(${t * 6}deg)` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(4,2,14,0.7) 100%)' }} />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- space */

/** 3D world with perspective; camera pans/zooms/tilts the whole world. */
export function Space({ cam = {}, children, persp = 1800 }: { w?: number; h?: number; cam?: { x?: number; y?: number; s?: number; rx?: number; ry?: number; rz?: number }; children: ReactNode; persp?: number }) {
  const { x = 0, y = 0, s = 1, rx = 0, ry = 0, rz = 0 } = cam;
  const { w, h } = useSize();
  return (
    <div style={{ position: 'absolute', inset: 0, perspective: persp, perspectiveOrigin: '50% 50%' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: w, height: h, transformStyle: 'preserve-3d', transformOrigin: '50% 50%', transform: `translate(${-x}px,${-y}px) scale(${s}) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)` }}>
        {children}
      </div>
    </div>
  );
}

/** A thing in the space, centred on (x, y). Depth blur grows with |z| (focus at z=0) and motion blur with `mb`. */
export function Obj({ x: x0, y: y0, z = 0, rx = 0, ry = 0, rz = 0, s: s0 = 1, o = 1, blur, dof = 0.012, mb = 0, ms = 1, children, style, flat }: { x: number; y: number; z?: number; rx?: number; ry?: number; rz?: number; s?: number; o?: number; blur?: number; dof?: number; mb?: number; ms?: number; children: ReactNode; style?: CSSProperties; flat?: boolean }) {
  const lay = useLayout();
  if (o <= 0.002) return null;
  const x = lay.x(x0), y = lay.y(y0), s = s0 * lay.ms(ms);
  const b = Math.min(18, (blur ?? Math.abs(z) * dof) + mb);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 0, height: 0, transformStyle: flat ? 'flat' : 'preserve-3d', transform: `translateZ(${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${s})`, zIndex: Math.round(1000 + z) }}>
      <div style={{ position: 'absolute', left: 0, top: 0, transform: 'translate(-50%,-50%)', opacity: clamp(o), filter: b > 0.25 ? `blur(${b.toFixed(2)}px)` : undefined, ...style }}>{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ type */

/**
 * Word-by-word blur-in line. parts: [text, tone] where tone 'a' = accent gradient,
 * 'm' = muted, default = ink. `out` fades the whole line out (blur up).
 */
export function Words({ t, at, out, parts, size = 64, dark, stagger = 0.13, weight = 600, gap = 0.26 }: { t: number; at: number; out?: number; parts: [string, ('a' | 'm' | 'i')?][]; size?: number; dark?: boolean; stagger?: number; weight?: number; gap?: number }) {
  const ko = out == null ? 0 : prog(t, out, out + 0.5, E.exit);
  return (
    <div style={{ display: 'flex', gap: `0 ${size * gap}px`, flexWrap: 'nowrap', whiteSpace: 'nowrap', alignItems: 'baseline', fontFamily: DISPLAY, fontSize: size, fontWeight: weight, letterSpacing: '-0.035em', lineHeight: 1.05 }}>
      {parts.map(([w, tone], i) => {
        const k = prog(t, at + i * stagger, at + i * stagger + 0.7, E.enter);
        const color = tone === 'a' ? undefined : tone === 'm' ? (dark ? L.deepMute : L.mute) : dark ? L.deepInk : L.ink;
        const grad: CSSProperties = tone === 'a' ? { background: dark ? 'linear-gradient(100deg,#DDD6FE,#A78BFA 60%,#818CF8)' : 'linear-gradient(100deg,#8B5CF6,#6D28D9 55%,#4F46E5)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } : {};
        return (
          <span key={i} style={{ display: 'inline-block', color, ...grad, opacity: k * (1 - ko), filter: `blur(${(1 - k) * 14 + ko * 12}px)`, transform: `translateY(${(1 - k) * size * 0.35 - ko * size * 0.25}px) scale(${lerp(0.92, 1, k)})` }}>{w}</span>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------------- glass */

/** Glossy app-icon style tile, the hero object of a shot. */
export function GlassIcon({ icon, node, size = 150, tone = GRAD, shine = 0 }: { icon?: IconSvgElement; node?: ReactNode; size?: number; tone?: string; shine?: number }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, borderRadius: size * 0.27, background: tone, boxShadow: `0 ${size * 0.22}px ${size * 0.42}px -${size * 0.12}px rgba(76,29,149,0.55), inset 0 1.5px 0 rgba(255,255,255,0.55), inset 0 -${size * 0.06}px ${size * 0.14}px rgba(49,18,120,0.35)`, display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '-10%', top: '-55%', width: '120%', height: '95%', borderRadius: '50%', background: 'linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0.05))' }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, width: '35%', left: `${lerp(-60, 140, shine)}%`, background: 'linear-gradient(100deg,transparent,rgba(255,255,255,0.45),transparent)', transform: 'skewX(-18deg)' }} />
      <div style={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
        {node ?? (icon ? <HugeiconsIcon icon={icon} size={size * 0.46} color="#fff" strokeWidth={1.8} /> : null)}
      </div>
    </div>
  );
}

/** Frosted panel. dark = for the Deep stage. */
export function Panel({ children, w, h, r = 28, dark, pad = 0, style, glow = 0 }: { children?: ReactNode; w?: number; h?: number; r?: number; dark?: boolean; pad?: number | string; style?: CSSProperties; glow?: number }) {
  const s: CSSProperties = dark
    ? { background: 'linear-gradient(160deg,rgba(76,52,170,0.55),rgba(30,18,84,0.72))', boxShadow: `inset 0 0 0 1.5px rgba(196,181,253,${0.28 + glow * 0.4}), inset 0 1.5px 0 rgba(255,255,255,0.18), 0 30px 80px -20px rgba(0,0,0,0.6), 0 0 ${60 * glow}px rgba(139,92,246,${0.6 * glow})`, color: L.deepInk }
    : { background: 'linear-gradient(170deg,rgba(255,255,255,0.97),rgba(250,248,255,0.92))', boxShadow: `inset 0 0 0 1.5px rgba(255,255,255,0.9), 0 0 0 1px rgba(124,58,237,${0.10 + glow * 0.4}), 0 2px 4px rgba(40,20,90,0.05), 0 30px 70px -24px rgba(76,29,149,0.30), 0 0 ${60 * glow}px rgba(139,92,246,${0.45 * glow})`, color: L.ink };
  return <div style={{ position: 'relative', width: w, height: h, borderRadius: r, padding: pad, fontFamily: FONT, boxSizing: 'border-box', ...s, ...style }}>{children}</div>;
}

/** Glass pill button / label. press 0..1, glow 0..1 */
export function GlassPill({ children, dark, size = 30, press = 0, glow = 0, solid, icon }: { children: ReactNode; dark?: boolean; size?: number; press?: number; glow?: number; solid?: boolean; icon?: ReactNode }) {
  const bg = solid ? GRAD : dark ? 'linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05))' : 'linear-gradient(180deg,#fff,#F6F2FF)';
  const color = solid ? '#fff' : dark ? L.deepInk : L.ink;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.4, height: size * 2.1, padding: `0 ${size * 0.95}px`, borderRadius: 999, background: bg, color, fontFamily: FONT, fontWeight: 600, fontSize: size, letterSpacing: '-0.01em', whiteSpace: 'nowrap', transform: `scale(${1 - press * 0.06})`, boxShadow: `${solid ? 'inset 0 1px 0 rgba(255,255,255,0.35),' : ''} inset 0 0 0 1.5px ${dark ? 'rgba(196,181,253,0.45)' : 'rgba(124,58,237,0.16)'}, 0 14px 36px -12px rgba(76,29,149,${solid ? 0.6 : 0.3}), 0 0 ${50 * glow}px rgba(167,139,250,${0.75 * glow})` }}>
      {icon}
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- payoffs */

/** Gradient bar that sweeps in like a ribbon and fills to k. */
export function Ribbon({ k, w = 900, h = 46, dark, appear = 1 }: { k: number; w?: number; h?: number; dark?: boolean; appear?: number }) {
  return (
    <div style={{ position: 'relative', width: w, height: h, borderRadius: h, background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(124,58,237,0.08)', boxShadow: dark ? 'inset 0 0 0 1px rgba(196,181,253,0.2)' : 'inset 0 0 0 1px rgba(124,58,237,0.08)', clipPath: `inset(0 ${(1 - appear) * 100}% 0 0 round ${h}px)` }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${clamp(k) * 100}%`, borderRadius: h, background: 'linear-gradient(90deg,#C4B5FD 0%,#8B5CF6 45%,#4F46E5 80%,#818CF8 100%)', boxShadow: '0 12px 34px -8px rgba(99,62,233,0.65), inset 0 1.5px 0 rgba(255,255,255,0.45)' }} />
    </div>
  );
}

/** Circle draws on, tick strokes in. */
export function DoneTick({ k, size = 150, dark, color = L.violet }: { k: number; size?: number; dark?: boolean; color?: string }) {
  const c = 2 * Math.PI * 46;
  const a = clamp(k / 0.6), b = clamp((k - 0.45) / 0.55);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible', filter: `drop-shadow(0 12px 24px rgba(124,58,237,${dark ? 0.6 : 0.35}))` }}>
      <circle cx="50" cy="50" r="46" fill={dark ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.9)'} opacity={a} />
      <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeWidth="3.2" strokeDasharray={c} strokeDashoffset={c * (1 - a)} transform="rotate(-90 50 50)" strokeLinecap="round" />
      <path d="M31 51 L44 63 L70 37" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="60" strokeDashoffset={60 * (1 - b)} />
    </svg>
  );
}

/** Confetti burst from a point; shards tumble in 3D and fall. */
export function Confetti({ t, at, x: x0, y: y0, n = 46, spread = 900, colors = ['#8B5CF6', '#C4B5FD', '#4F46E5', '#F472B6', '#38BDF8', '#FBBF24'] }: { t: number; at: number; x: number; y: number; n?: number; spread?: number; colors?: string[] }) {
  const lay = useLayout();
  const x = lay.x(x0), y = lay.y(y0);
  const dt = t - at;
  if (dt < 0 || dt > 3.2) return null;
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const ang = rnd(i, 2) * Math.PI * 2, sp = spread * (0.35 + rnd(i, 3) * 0.65);
        const drag = 1 - Math.exp(-dt * 2.6);
        const px = x + Math.cos(ang) * sp * drag * 0.62;
        const py = y + Math.sin(ang) * sp * drag * 0.42 + 160 * dt * dt;
        const spin = dt * (6 + rnd(i, 4) * 8);
        const wv = 12 + rnd(i, 5) * 14, hv = 7 + rnd(i, 6) * 8;
        return <div key={i} style={{ position: 'absolute', left: px, top: py, width: wv, height: hv, borderRadius: 2, background: colors[i % colors.length], opacity: clamp(1.4 - dt * 0.5), transform: `rotate(${spin * 57}deg) scaleX(${Math.cos(spin * 1.7)})` }} />;
      })}
    </>
  );
}

/** Four-point sparkle star. */
export function Sparkle({ size = 120, color = 'url(#spk)', rot = 0 }: { size?: number; color?: string; rot?: number }) {
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" style={{ overflow: 'visible', transform: `rotate(${rot}deg)`, filter: 'drop-shadow(0 10px 22px rgba(124,58,237,0.45))' }}>
      <defs><linearGradient id="spk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#C4B5FD" /><stop offset="0.5" stopColor="#8B5CF6" /><stop offset="1" stopColor="#4F46E5" /></linearGradient></defs>
      <path d="M0 -50 C6 -10 10 -6 50 0 C10 6 6 10 0 50 C-6 10 -10 6 -50 0 C-10 -6 -6 -10 0 -50 Z" fill={color} />
    </svg>
  );
}

/** Sparkle transition: a star grows at (x, y), spins and collapses, masking a scene change at `at`. */
export function SparkleWipe({ t, at, x, y, max = 2600 }: { t: number; at: number; x: number; y: number; max?: number }) {
  const k = prog(t, at - 0.55, at, E.exit), k2 = prog(t, at, at + 0.6, E.enter);
  if (k <= 0 || k2 >= 1) return null;
  const s = k2 > 0 ? lerp(max, 0, k2) : lerp(20, max, k);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 0, height: 0, zIndex: 3000 }}>
      <div style={{ position: 'absolute', left: -s / 2, top: -s / 2 }}><Sparkle size={s} rot={(k + k2) * 90} /></div>
    </div>
  );
}

/** Curved light lines from many sources into one target, drawn on then pulsing. */
export function FanIn({ from: from0, to: to0, k, pulse = 0, dark = true, color }: { from: [number, number][]; to: [number, number]; k: number; pulse?: number; dark?: boolean; color?: string }) {
  const lay = useLayout();
  const from = from0.map(([a, b]) => [lay.x(a), lay.y(b)] as [number, number]);
  const to: [number, number] = [lay.x(to0[0]), lay.y(to0[1])];
  const col = color ?? (dark ? '#C4B5FD' : '#8B5CF6');
  return (
    <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }} width="1" height="1">
      <defs><filter id="fglow"><feGaussianBlur stdDeviation="3" /></filter></defs>
      {from.map(([x, y], i) => {
        const d = `M${x} ${y} C${lerp(x, to[0], 0.55)} ${y} ${lerp(x, to[0], 0.45)} ${to[1]} ${to[0]} ${to[1]}`;
        const kk = clamp(k * 1.25 - i * (0.25 / Math.max(1, from.length)));
        const pk = (pulse + i * 0.17) % 1;
        return (
          <g key={i}>
            <path d={d} fill="none" stroke={col} strokeOpacity={0.55} strokeWidth="2" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - kk} />
            <path d={d} fill="none" stroke={col} strokeWidth="6" filter="url(#fglow)" strokeOpacity={0.35 * kk} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - kk} />
            {pulse > 0 && kk >= 1 ? <path d={d} fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" pathLength={1} strokeDasharray="0.06 1" strokeDashoffset={-pk} /> : null}
          </g>
        );
      })}
    </svg>
  );
}

/** Ellipse orbit position for item i of n at time t (depth 0 = back, 1 = front). */
export function orbit(i: number, n: number, t: number, rx: number, ry: number, speed = 0.18, phase = 0) {
  const a = phase + (i / n) * Math.PI * 2 + t * speed;
  const depth = (Math.sin(a) + 1) / 2;
  return { x: Math.cos(a) * rx, y: Math.sin(a) * ry, depth, s: lerp(0.78, 1.08, depth) };
}

/** Thin glowing ring (for orbit hubs and the deep stage). */
export const Ring = ({ rx: rx0, ry: ry0, o = 1, dark = true, k = 1 }: { rx: number; ry: number; o?: number; dark?: boolean; k?: number }) => {
  const lay = useLayout();
  const rx = lay.rx(rx0), ry = lay.ry(ry0);
  return (
  <svg style={{ position: 'absolute', left: -rx - 4, top: -ry - 4, overflow: 'visible', opacity: o }} width={rx * 2 + 8} height={ry * 2 + 8}>
    <ellipse cx={rx + 4} cy={ry + 4} rx={rx} ry={ry} fill="none" stroke={dark ? 'rgba(196,181,253,0.38)' : 'rgba(124,58,237,0.22)'} strokeWidth="1.6" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - k} />
  </svg>
  );
};

/** Hand cursor like launch films use (pointer finger). */
export function Hand({ x: x0, y: y0, press = 0, o = 1, s = 1.25 }: { x: number; y: number; press?: number; o?: number; s?: number }) {
  const lay = useLayout();
  const x = lay.x(x0), y = lay.y(y0);
  if (o <= 0) return null;
  return (
    <div style={{ position: 'absolute', left: x - 14 * s, top: y - 4 * s, opacity: o, transform: `scale(${s * (1 - press * 0.12)})`, transformOrigin: '14px 4px', zIndex: 4000, filter: 'drop-shadow(0 6px 10px rgba(30,10,80,0.35))' }}>
      <svg width="40" height="46" viewBox="0 0 40 46">
        <path d="M14 3.5c-2 0-3.5 1.6-3.5 3.5v17.5l-3-3c-1.5-1.5-3.8-1.5-5.2 0-1.3 1.3-1.4 3.4-.2 4.9l9.4 11.6c2.2 2.8 5.6 4.5 9.2 4.5h5.3c5.7 0 10.3-4.6 10.3-10.3V20c0-1.9-1.6-3.5-3.5-3.5S29.3 18 29.3 20v-1.6c0-1.9-1.6-3.5-3.5-3.5s-3.5 1.6-3.5 3.5V17c0-1.9-1.6-3.5-3.5-3.5S17.5 15 17.5 17V7c0-1.9-1.6-3.5-3.5-3.5z" fill="#fff" stroke="#1B1340" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M22.3 18v8M29.3 20v6M17.5 17v9" stroke="#1B1340" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/** Press pulse ring at a click. */
export function Ping({ t, at, x: x0, y: y0, dark }: { t: number; at: number; x: number; y: number; dark?: boolean }) {
  const lay = useLayout();
  const x = lay.x(x0), y = lay.y(y0);
  const k = prog(t, at, at + 0.7, E.enter);
  if (k <= 0 || k >= 1) return null;
  const s = lerp(20, 130, k);
  return <div style={{ position: 'absolute', left: x - s / 2, top: y - s / 2, width: s, height: s, borderRadius: 999, border: `3px solid ${dark ? 'rgba(221,214,254,' : 'rgba(124,58,237,'}${0.7 * (1 - k)})`, zIndex: 3999 }} />;
}

/** Cursor travel helper: waypoints [t, x, y], presses at times. */
export function handAt(t: number, way: [number, number, number][], presses: number[] = []) {
  let x = way[0][1], y = way[0][2];
  for (let i = 1; i < way.length; i++) {
    const [t0, x0, y0] = way[i - 1], [t1, x1, y1] = way[i];
    if (t >= t1) { x = x1; y = y1; continue; }
    if (t > t0) { const k = ease3(clamp((t - t0) / (t1 - t0))); x = lerp(x0, x1, k) + Math.sin(k * Math.PI) * (y1 - y0) * 0.1; y = lerp(y0, y1, k) - Math.sin(k * Math.PI) * 30; }
    break;
  }
  let press = 0;
  for (const p of presses) press = Math.max(press, prog(t, p - 0.1, p) * (1 - prog(t, p + 0.08, p + 0.22)));
  return { x, y, press };
}

/** Motion-blur amount from a 1D track's speed (px/s) — pass to Obj mb. */
export function speedBlur(t: number, k: [number, number][], scale = 0.006) {
  const v = Math.abs(track(t + 1 / 60, k) - track(t - 1 / 60, k)) * 30;
  return Math.min(14, v * scale);
}

export { spring, lerp, clamp, prog, E };

/* --------------------------------------------------------- shared pieces */

/** iPhone placed in the 3D space; (x, y) is the phone centre. */
export function Phone3D({ x, y, z = 0, rx = 0, ry = 0, rz = 0, s = 1, o = 1, mb = 0, children }: { x: number; y: number; z?: number; rx?: number; ry?: number; rz?: number; s?: number; o?: number; mb?: number; children: ReactNode }) {
  return (
    <Obj x={x} y={y} z={z} rx={rx} ry={ry} rz={rz} s={s} o={o} mb={mb} dof={0.004}>
      <IPhone>{children}</IPhone>
    </Obj>
  );
}
/** Screen point (lx, ly) of an upright phone centred at (x, y) with scale s → stage point. */
export const onPhone = (x: number, y: number, s: number, lx: number, ly: number) => ({ cx: x, cy: y, dx: (lx - PHONE_W / 2) * s, dy: (ly - PHONE_H / 2) * s });

/** Big gradient figure (numbers). */
export function Figure({ value, size = 170, dark }: { value: string; size?: number; dark?: boolean }) {
  return (
    <div style={{ fontFamily: DISPLAY, fontSize: size, fontWeight: 700, letterSpacing: '-0.055em', lineHeight: 1, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums', background: dark ? 'linear-gradient(180deg,#FFFFFF 20%,#C4B5FD)' : 'linear-gradient(180deg,#2E1A72 10%,#6D28D9 70%,#7C3AED)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingBottom: size * 0.06 }}>{value}</div>
  );
}
export const Caption = ({ children, dark, size = 30 }: { children: ReactNode; dark?: boolean; size?: number }) => (
  <div style={{ fontFamily: FONT, fontSize: size, fontWeight: 500, color: dark ? L.deepMute : L.mute, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>{children}</div>
);

/** Small glass label with an icon dot, for satellites around a hero. */
export function Tag({ children, dark, tone = L.violet, size = 22, icon }: { children: ReactNode; dark?: boolean; tone?: string; size?: number; icon?: IconSvgElement }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.5, padding: `${size * 0.55}px ${size * 0.9}px`, borderRadius: size * 0.9, fontFamily: FONT, fontWeight: 600, fontSize: size, whiteSpace: 'nowrap', color: dark ? L.deepInk : L.ink, background: dark ? 'linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))' : 'rgba(255,255,255,0.96)', boxShadow: dark ? 'inset 0 0 0 1.5px rgba(196,181,253,0.35), 0 18px 40px -16px rgba(0,0,0,0.6)' : '0 0 0 1px rgba(124,58,237,0.10), 0 18px 40px -16px rgba(76,29,149,0.35)' }}>
      {icon ? <span style={{ width: size * 1.6, height: size * 1.6, borderRadius: size * 0.45, background: tone, display: 'grid', placeItems: 'center' }}><HugeiconsIcon icon={icon} size={size} color="#fff" strokeWidth={2} /></span> : <span style={{ width: size * 0.45, height: size * 0.45, borderRadius: 99, background: tone, boxShadow: `0 0 ${size * 0.6}px ${tone}` }} />}
      {children}
    </div>
  );
}

/** A parcel: a CSS cube with its own perspective; ry/rx in degrees. */
export function Parcel({ size = 280, rx = -18, ry = 35, stamp = 0, stampS = 1 }: { size?: number; rx?: number; ry?: number; stamp?: number; stampS?: number }) {
  const h = size / 2;
  const face = (tf: string, bg: string, child?: ReactNode) => (
    <div style={{ position: 'absolute', left: -h, top: -h, width: size, height: size, background: bg, transform: tf, boxShadow: 'inset 0 0 0 1px rgba(120,72,30,0.25)', backfaceVisibility: 'hidden' }}>{child}</div>
  );
  const tape = <div style={{ position: 'absolute', left: '42%', width: '16%', top: 0, bottom: 0, background: 'rgba(255,240,210,0.55)' }} />;
  return (
    <div style={{ perspective: 1400, width: size * 1.6, height: size * 1.6, display: 'grid', placeItems: 'center' }}>
      <div style={{ position: 'relative', width: 0, height: 0, transformStyle: 'preserve-3d', transform: `rotateX(${rx}deg) rotateY(${ry}deg)` }}>
        {face(`translateZ(${h}px)`, 'linear-gradient(160deg,#E2B07A,#C98E55)', <>
          {tape}
          <div style={{ position: 'absolute', left: '12%', top: '58%', padding: '6px 12px', background: '#fff', borderRadius: 6, fontFamily: FONT, fontWeight: 700, fontSize: size * 0.07, color: '#5B3A1A' }}>COD · ₹1,849</div>
          {stamp > 0 ? <div style={{ position: 'absolute', left: '50%', top: '30%', transform: `translate(-50%,-50%) rotate(-14deg) scale(${stampS})`, opacity: stamp, padding: `${size * 0.03}px ${size * 0.07}px`, border: `${size * 0.022}px solid #7C3AED`, borderRadius: size * 0.04, color: '#7C3AED', fontFamily: DISPLAY, fontWeight: 800, fontSize: size * 0.16, letterSpacing: '0.04em', background: 'rgba(255,255,255,0.75)' }}>PAID</div> : null}
        </>)}
        {face(`rotateY(180deg) translateZ(${h}px)`, '#B7804A')}
        {face(`rotateY(90deg) translateZ(${h}px)`, 'linear-gradient(160deg,#C8935B,#A86F3B)', tape)}
        {face(`rotateY(-90deg) translateZ(${h}px)`, 'linear-gradient(160deg,#D9A56C,#B87C44)', tape)}
        {face(`rotateX(90deg) translateZ(${h}px)`, 'linear-gradient(160deg,#F0C690,#DDAA6E)', <div style={{ position: 'absolute', top: '42%', height: '16%', left: 0, right: 0, background: 'rgba(255,240,210,0.6)' }} />)}
        {face(`rotateX(-90deg) translateZ(${h}px)`, '#8F5E30')}
      </div>
    </div>
  );
}

/** Fingertip (ui Touch) at a world point. */
export function TouchAt({ cx, cy, dx, dy, ...rest }: { cx: number; cy: number; dx: number; dy: number; o?: number; press?: number; ripple?: number; size?: number }) {
  const lay = useLayout();
  return <Touch x={lay.x(cx) + dx} y={lay.y(cy) + dy} {...rest} />;
}
