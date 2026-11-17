/**
 * Cinematic language: lit studio stages instead of pastel washes, a real
 * camera (macro open, follow the action, wide settle) with 3D parallax, depth
 * layers, depth-of-field, and kinetic numbers.
 */
import type { CSSProperties, ReactNode } from 'react';
import { E, clamp, lerp } from './time';
import { DISPLAY, FONT } from './ui';

export type StudioTone = 'midnight' | 'ink' | 'sand' | 'violet' | 'mint' | 'blush' | 'sky' | 'peach' | 'lilac' | 'aqua' | 'lemon' | 'rose';

type Mesh = { base: [string, string]; lights: [string, string, string]; ink: string; sub: string; dark?: boolean };
/** Soft multi-light gradients, no patterns: base wash + three coloured lights. */
const STUDIO: Record<StudioTone, Mesh> = {
  midnight: { base: ['#0B0A1E', '#120F2A'], lights: ['rgba(139,92,246,0.55)', 'rgba(236,72,153,0.28)', 'rgba(56,189,248,0.22)'], ink: '#FFFFFF', sub: 'rgba(255,255,255,0.62)', dark: true },
  ink: { base: ['#0E1116', '#151A22'], lights: ['rgba(56,189,248,0.40)', 'rgba(16,185,129,0.25)', 'rgba(139,92,246,0.25)'], ink: '#FFFFFF', sub: 'rgba(255,255,255,0.6)', dark: true },
  sand: { base: ['#FBF6EE', '#F3E7D6'], lights: ['#FFD3A1', '#F9BFA8', '#FFEFC2'], ink: '#2A1F14', sub: 'rgba(42,31,20,0.6)' },
  violet: { base: ['#F6F2FF', '#E9E1FF'], lights: ['#C7B2FF', '#F3BDEB', '#B9D3FF'], ink: '#1B1238', sub: 'rgba(27,18,56,0.6)' },
  mint: { base: ['#F1FBF6', '#DEF4EA'], lights: ['#9EEDCB', '#B6E3FF', '#E1F5AE'], ink: '#0D2A21', sub: 'rgba(13,42,33,0.6)' },
  blush: { base: ['#FFF4F4', '#FBE4EA'], lights: ['#FFB8CC', '#FFD3B0', '#E2CCFF'], ink: '#2E1418', sub: 'rgba(46,20,24,0.6)' },
  sky: { base: ['#F1F7FF', '#DDEBFF'], lights: ['#A3CDFF', '#C3BDFF', '#AEEDEE'], ink: '#0E1E33', sub: 'rgba(14,30,51,0.6)' },
  peach: { base: ['#FFF6EF', '#FFE6D6'], lights: ['#FFB98F', '#FFD7A0', '#FFC1C8'], ink: '#2E1A10', sub: 'rgba(46,26,16,0.6)' },
  lilac: { base: ['#FBF4FF', '#F0E2FF'], lights: ['#E3B6FF', '#FFC6E6', '#C4C9FF'], ink: '#231238', sub: 'rgba(35,18,56,0.6)' },
  aqua: { base: ['#F0FCFC', '#D9F3F4'], lights: ['#8FE3E6', '#A9D8FF', '#C8F5D4'], ink: '#0B2A2C', sub: 'rgba(11,42,44,0.6)' },
  lemon: { base: ['#FFFDF0', '#FBF3CF'], lights: ['#FFE58A', '#C9F0A6', '#FFD3A8'], ink: '#2A2610', sub: 'rgba(42,38,16,0.6)' },
  rose: { base: ['#FFF3F6', '#FDE0E8'], lights: ['#FF9FBC', '#FFC8A8', '#F7B8FF'], ink: '#33101C', sub: 'rgba(51,16,28,0.6)' },
};
export const studioInk = (tone: StudioTone) => STUDIO[tone];

/** Lit stage: graded base, three soft coloured lights that drift slowly, a floor shadow. */
export function Studio({ t, tone, w, h, seed = 0 }: { t: number; tone: StudioTone; w: number; h: number; spot?: [number, number]; seed?: number }) {
  const m = STUDIO[tone];
  const r = (i: number) => { const x = Math.sin((seed + 1) * 91.7 + i * 37.3) * 43758.5; return x - Math.floor(x); };
  const pos = [0, 1, 2].map((i) => [10 + r(i) * 80, 8 + r(i + 7) * 80]);
  const d = (i: number) => Math.sin(t * 0.25 + i * 2.1) * 3;
  const blob = (i: number, size: number) => `radial-gradient(${size}% ${size * 1.1}% at ${pos[i][0] + d(i)}% ${pos[i][1] - d(i + 1)}%, ${m.lights[i]} 0%, transparent 70%)`;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: `linear-gradient(${160 + r(9) * 40}deg, ${m.base[0]} 0%, ${m.base[1]} 100%)` }}>
      <div style={{ position: 'absolute', inset: 0, background: [blob(0, 58), blob(1, 50), blob(2, 44)].join(', '), opacity: m.dark ? 1 : 0.95 }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(60% 50% at 50% 42%, ${m.dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.55)'} 0%, transparent 70%)` }} />
      <div style={{ position: 'absolute', left: '-10%', right: '-10%', bottom: '-8%', height: '30%', background: `radial-gradient(50% 60% at 50% 30%, ${m.dark ? 'rgba(0,0,0,0.5)' : 'rgba(40,30,60,0.10)'} 0%, transparent 70%)`, filter: 'blur(10px)', width: w, maxWidth: '120%' }} />
      <div style={{ display: 'none', height: h }} />
    </div>
  );
}

/** Camera key: [time, focusX, focusY, zoom, rotX, rotY, rotZ]. */
export type CamKey = [number, number, number, number, number?, number?, number?];

export function camAt(t: number, keys: CamKey[], ease: (x: number) => number = E.camera) {
  const get = (k: CamKey) => [k[1], k[2], k[3], k[4] ?? 0, k[5] ?? 0, k[6] ?? 0];
  if (t <= keys[0][0]) return get(keys[0]);
  for (let i = 1; i < keys.length; i++) {
    if (t <= keys[i][0]) {
      const a = get(keys[i - 1]), b = get(keys[i]);
      const k = ease(clamp((t - keys[i - 1][0]) / (keys[i][0] - keys[i - 1][0])));
      return a.map((v, j) => lerp(v, b[j], k));
    }
  }
  return get(keys[keys.length - 1]);
}

/**
 * The lens: world coordinates are frame-sized (w×h); the camera centres the
 * focus point, zooms and tilts the world in perspective. Children can sit at
 * depth with <Depth z>. `dof` blurs the whole world (for pull-focus moments).
 */
export function Lens({ t, w, h, keys, children, dof = 0, ease }: { t: number; w: number; h: number; keys: CamKey[]; children: ReactNode; dof?: number; ease?: (x: number) => number }) {
  const [fx, fy, z, rx, ry, rz] = camAt(t, keys, ease);
  return (
    <div style={{ position: 'absolute', inset: 0, perspective: 2200, perspectiveOrigin: '50% 50%', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: w, height: h, transformStyle: 'preserve-3d', transformOrigin: `${fx}px ${fy}px`, transform: `translate(${w / 2 - fx}px, ${h / 2 - fy}px) scale(${z}) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`, filter: dof > 0.3 ? `blur(${dof}px)` : undefined }}>
        {children}
      </div>
    </div>
  );
}

/** Positioned element in world space, optionally lifted toward the camera (parallax). */
export function At({ x, y, z = 0, s = 1, o = 1, blur = 0, rot = 0, children, origin = '50% 50%', style }: { x: number; y: number; z?: number; s?: number; o?: number; blur?: number; rot?: number; children: ReactNode; origin?: string; style?: CSSProperties }) {
  if (o <= 0.001) return null;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transformStyle: 'preserve-3d', transform: `translate(-50%, -50%) translateZ(${z}px) scale(${s}) rotate(${rot}deg)`, transformOrigin: origin, opacity: o, filter: blur > 0.3 ? `blur(${blur}px)` : undefined, ...style }}>
      {children}
    </div>
  );
}

/** Kinetic number / headline: each glyph rises in with a slight stagger. */
export function Kinetic({ text, t, at, size, color, weight = 600, stagger = 0.035, family = DISPLAY, tracking = '-0.045em' }: { text: string; t: number; at: number; size: number; color: string; weight?: number; stagger?: number; family?: string; tracking?: string }) {
  return (
    <span style={{ display: 'inline-flex', fontFamily: family, fontSize: size, fontWeight: weight, letterSpacing: tracking, color, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
      {text.split('').map((ch, i) => {
        const k = E.enter(clamp((t - at - i * stagger) / 0.6));
        return (
          <span key={i} style={{ display: 'inline-block', opacity: k, transform: `translateY(${(1 - k) * size * 0.35}px)`, filter: k < 1 ? `blur(${(1 - k) * 8}px)` : undefined, whiteSpace: 'pre' }}>{ch}</span>
        );
      })}
    </span>
  );
}

/** Small caption that sits on the stage (not in a card). */
export const Caption = ({ children, color, size = 30, style }: { children: ReactNode; color: string; size?: number; style?: CSSProperties }) => (
  <div style={{ fontFamily: FONT, fontSize: size, color, letterSpacing: '-0.005em', ...style }}>{children}</div>
);

/** Frameless glass chip floating on the stage. */
export function Glass({ children, dark, pad = '18px 26px', r = 24, style }: { children: ReactNode; dark?: boolean; pad?: string; r?: number; style?: CSSProperties }) {
  return (
    <div style={{ padding: pad, borderRadius: r, background: dark ? 'rgba(20,18,40,0.72)' : 'rgba(255,255,255,0.78)', boxShadow: dark ? '0 0 0 1.5px rgba(255,255,255,0.10), 0 30px 60px -24px rgba(0,0,0,0.6)' : '0 0 0 1.5px rgba(255,255,255,0.7), 0 30px 60px -28px rgba(30,20,70,0.35)', backdropFilter: 'blur(14px)', fontFamily: FONT, ...style }}>
      {children}
    </div>
  );
}

/**
 * Standard camera track: macro open on `open`, settle wide, push in on each
 * action [x, y, t] (holding ~1.8 s), settle wide for the end and the loop.
 */
export function cineCam(w: number, h: number, dur: number, open: [number, number], acts: [number, number, number][], pushIn?: number): CamKey[] {
  const cx = w / 2, cy = h / 2;
  const square = Math.abs(w - h) < 2;
  const push = pushIn ?? (square ? 1.1 : 1.24);
  const openZ = square ? 1.32 : 1.55;
  // Aim partway from the centre toward each point so the subject stays in frame.
  const ox = lerp(cx, open[0], 0.6), oy = lerp(cy, open[1], 0.6);
  const k: CamKey[] = [[0, ox, oy, openZ, 7, -12, -1.5], [1.4, cx, cy, 1.0, 4, -7, 0]];
  let last = 1.4;
  for (const [ax, ay, ta] of acts) {
    const fx = lerp(cx, ax, 0.55), fy = lerp(cy, ay, 0.55);
    const a = Math.max(last + 0.3, ta - 0.45);
    const b = Math.max(a + 0.6, ta + 1.8);
    k.push([a, fx, fy, push, 3, -4, 0], [b, fx, fy, push, 2, -3, 0]);
    last = b;
  }
  const end = Math.max(last + 0.8, dur - 1.4);
  k.push([end, cx, cy, 1.02, 3, -5, 0], [dur + 0.6, cx, cy, 1.04, 3, -5, 0]);
  return k;
}
