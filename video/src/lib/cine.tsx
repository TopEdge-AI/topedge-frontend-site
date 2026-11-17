/**
 * Cinematic language: lit studio stages instead of pastel washes, a real
 * camera (macro open, follow the action, wide settle) with 3D parallax, depth
 * layers, depth-of-field, and kinetic numbers.
 */
import type { CSSProperties, ReactNode } from 'react';
import { E, clamp, lerp } from './time';
import { DISPLAY, FONT } from './ui';

export type StudioTone = 'midnight' | 'sand' | 'violet' | 'mint' | 'blush' | 'ink' | 'sky';

const STUDIO: Record<StudioTone, { base: string; light: string; floor: string; ink: string; sub: string }> = {
  midnight: { base: 'linear-gradient(180deg,#0B0A1E 0%,#14112E 60%,#0A0918 100%)', light: 'rgba(139,92,246,0.42)', floor: 'rgba(0,0,0,0.55)', ink: '#FFFFFF', sub: 'rgba(255,255,255,0.62)' },
  ink: { base: 'linear-gradient(180deg,#0E1116 0%,#171B22 60%,#0B0D11 100%)', light: 'rgba(56,189,248,0.30)', floor: 'rgba(0,0,0,0.6)', ink: '#FFFFFF', sub: 'rgba(255,255,255,0.6)' },
  sand: { base: 'linear-gradient(180deg,#F6EEE3 0%,#EFE2D0 60%,#E6D4BD 100%)', light: 'rgba(255,255,255,0.85)', floor: 'rgba(120,80,30,0.22)', ink: '#2A1F14', sub: 'rgba(42,31,20,0.6)' },
  violet: { base: 'linear-gradient(180deg,#EDE7FF 0%,#DDD2FF 60%,#CBBDFB 100%)', light: 'rgba(255,255,255,0.9)', floor: 'rgba(60,30,140,0.22)', ink: '#1B1238', sub: 'rgba(27,18,56,0.6)' },
  mint: { base: 'linear-gradient(180deg,#E6F7F0 0%,#D2F0E4 60%,#BFE6D6 100%)', light: 'rgba(255,255,255,0.9)', floor: 'rgba(10,80,60,0.2)', ink: '#0D2A21', sub: 'rgba(13,42,33,0.6)' },
  blush: { base: 'linear-gradient(180deg,#FCECEC 0%,#F8DCDD 60%,#F0C8CC 100%)', light: 'rgba(255,255,255,0.9)', floor: 'rgba(120,30,50,0.2)', ink: '#2E1418', sub: 'rgba(46,20,24,0.6)' },
  sky: { base: 'linear-gradient(180deg,#E8F3FF 0%,#D4E8FF 60%,#BFD9F8 100%)', light: 'rgba(255,255,255,0.9)', floor: 'rgba(20,60,120,0.2)', ink: '#0E1E33', sub: 'rgba(14,30,51,0.6)' },
};
export const studioInk = (tone: StudioTone) => STUDIO[tone];

/** Lit studio: graded backdrop, a soft key light that drifts, a floor shadow and fine grain. */
export function Studio({ t, tone, w, h, spot = [50, 42] }: { t: number; tone: StudioTone; w: number; h: number; spot?: [number, number] }) {
  const s = STUDIO[tone];
  const dx = Math.sin(t * 0.3) * 2.5;
  return (
    <div style={{ position: 'absolute', inset: 0, background: s.base, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(42% 46% at ${spot[0] + dx}% ${spot[1]}%, ${s.light} 0%, transparent 70%)` }} />
      <div style={{ position: 'absolute', left: '-10%', right: '-10%', bottom: '-6%', height: '34%', background: `radial-gradient(50% 60% at 50% 30%, ${s.floor} 0%, transparent 70%)`, filter: 'blur(10px)' }} />
      <div style={{ position: 'absolute', inset: 0, width: w, height: h, opacity: 0.05, backgroundImage: 'radial-gradient(rgba(0,0,0,0.9) 0.6px, transparent 0.9px)', backgroundSize: '3px 3px' }} />
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
export function cineCam(w: number, h: number, dur: number, open: [number, number], acts: [number, number, number][], push = 1.24): CamKey[] {
  const cx = w / 2, cy = h / 2;
  // Aim partway from the centre toward each point so the subject stays in frame.
  const ox = lerp(cx, open[0], 0.6), oy = lerp(cy, open[1], 0.6);
  const k: CamKey[] = [[0, ox, oy, 1.55, 7, -12, -1.5], [1.4, cx, cy, 1.0, 4, -7, 0]];
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
