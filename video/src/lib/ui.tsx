/**
 * Film UI kit. Same design language as the website (white cards, bare
 * Hugeicons, pill buttons, WhatsApp Business on an iPhone), drawn larger and
 * with real depth for video. No CSS transitions or animations: everything is
 * positioned from the composition time by the caller.
 */
import { useContext, type CSSProperties, type ReactNode } from 'react';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import { SiWhatsapp } from 'react-icons/si';
import { CineContext, clamp, lerp } from './time';

export const C = {
  ink: '#1D1D1F',
  ink2: '#424245',
  muted: '#86868B',
  faint: '#AEAEB2',
  line: 'rgba(16,24,40,0.08)',
  sunk: '#F5F5F7',
  violet: '#7C3AED',
  violetSoft: '#F3EEFF',
  emerald: '#059669',
  emeraldSoft: '#E7F8F0',
  amber: '#B45309',
  amberSoft: '#FEF3E2',
  sky: '#0284C7',
  skySoft: '#E6F4FB',
  rose: '#E11D48',
  roseSoft: '#FDECEF',
  wa: '#25D366',
  waOut: '#D9FDD3',
  waBg: '#EFE7DD',
  waLink: '#0A84C6',
};

export const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
export const DISPLAY = "'Inter Display', 'Inter', -apple-system, sans-serif";

/* ------------------------------------------------------------------ world */

export const PALETTES: Record<string, [string, string, string]> = {
  mint: ['#B8F0DA', '#C9E4FF', '#F2E9FF'],
  lime: ['#DDF5B5', '#BFEFE0', '#FFF1C9'],
  lagoon: ['#BDEBF2', '#C8D7FF', '#E3FAF0'],
  coral: ['#FFD2C2', '#FFE6B8', '#F4DDFF'],
  bloom: ['#F8CFEA', '#E2D6FF', '#FFE2D2'],
  dusk: ['#D9CCFF', '#C6DCFF', '#FFD9EC'],
  orchid: ['#EBC8FF', '#FFD0EA', '#D4E0FF'],
  ocean: ['#BFE3FF', '#C9D1FF', '#D2F6EC'],
  dawn: ['#FFD9C9', '#E5D3FF', '#FFF0C2'],
  sunrise: ['#FFE0B0', '#FFC9C9', '#E8DBFF'],
  iris: ['#CFC8FF', '#BFE0FF', '#F6D5FF'],
  rose: ['#FFCFDB', '#F2D4FF', '#FFE6CF'],
};

/** Warm white canvas with slow-drifting soft light and a faint pattern. */
export function Backdrop({ t, palette, pattern, w, h }: { t: number; palette: keyof typeof PALETTES; pattern: 'lines' | 'mesh' | 'dots' | 'beams' | 'grid' | 'rings'; w: number; h: number }) {
  const cine = useContext(CineContext);
  if (cine) return null; // the harness draws the studio stage
  const [a, b, c] = PALETTES[palette] ?? PALETTES.dawn;
  const dx = Math.sin(t * 0.35) * 3;
  const dy = Math.cos(t * 0.28) * 3;
  const pat: Record<string, string> = {
    lines: 'repeating-linear-gradient(115deg, rgba(16,24,40,0.035) 0 1.5px, transparent 1.5px 34px)',
    mesh: 'linear-gradient(rgba(16,24,40,0.03) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(16,24,40,0.03) 1.5px, transparent 1.5px)',
    dots: 'radial-gradient(rgba(16,24,40,0.10) 1.6px, transparent 2px)',
    beams: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.0) 0 70px, rgba(255,255,255,0.55) 70px 72px)',
    grid: 'linear-gradient(rgba(16,24,40,0.035) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(16,24,40,0.035) 1.5px, transparent 1.5px)',
    rings: 'repeating-radial-gradient(circle at 50% 120%, rgba(16,24,40,0.04) 0 1.5px, transparent 1.5px 46px)',
  };
  const size: Record<string, string> = { mesh: '84px 84px', dots: '30px 30px', grid: '56px 56px' };
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F8F7FA', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(48% 52% at ${22 + dx}% ${18 + dy}%, ${a} 0%, transparent 72%), radial-gradient(44% 50% at ${82 - dx}% ${80 - dy}%, ${b} 0%, transparent 72%), radial-gradient(40% 40% at ${78 + dy}% ${16 + dx}%, ${c} 0%, transparent 70%)` }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: pat[pattern], backgroundSize: size[pattern], opacity: 0.9, WebkitMaskImage: 'radial-gradient(70% 70% at 50% 45%, #000 0%, transparent 85%)', maskImage: 'radial-gradient(70% 70% at 50% 45%, #000 0%, transparent 85%)' }} />
      <div style={{ position: 'absolute', left: 0, top: 0, width: w, height: h, boxShadow: 'inset 0 0 220px rgba(255,255,255,0.65)' }} />
    </div>
  );
}

/** Perspective camera around the world. rx/ry in degrees, z = zoom. */
export function Camera({ x = 0, y = 0, z = 1, rx = 0, ry = 0, children }: { x?: number; y?: number; z?: number; rx?: number; ry?: number; children: ReactNode }) {
  return (
    <div style={{ position: 'absolute', inset: 0, perspective: 2600, perspectiveOrigin: '50% 45%' }}>
      <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `translate3d(${x}px, ${y}px, 0) scale(${z}) rotateX(${rx}deg) rotateY(${ry}deg)` }}>
        {children}
      </div>
    </div>
  );
}

/** A positioned layer with depth-of-field (blur) and fade. */
export function Layer({ x, y, s = 1, o = 1, blur = 0, rx = 0, ry = 0, origin = '50% 50%', children, z }: { x: number; y: number; s?: number; o?: number; blur?: number; rx?: number; ry?: number; origin?: string; children: ReactNode; z?: number }) {
  if (o <= 0.001) return null;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) scale(${s}) rotateX(${rx}deg) rotateY(${ry}deg)`, transformOrigin: origin, opacity: o, filter: blur > 0.2 ? `blur(${blur}px)` : undefined, zIndex: z }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ atoms */

export const Icon = ({ icon, size = 30, color = C.ink2, stroke = 1.7 }: { icon: IconSvgElement; size?: number; color?: string; stroke?: number }) => (
  <HugeiconsIcon icon={icon} size={size} color={color} strokeWidth={stroke} style={{ display: 'block', flex: 'none' }} />
);

export const SHADOW = '0 1px 2px rgba(16,24,40,0.05), 0 12px 28px -12px rgba(16,24,40,0.16), 0 40px 80px -40px rgba(40,24,96,0.30)';
export const SHADOW_LIFT = '0 2px 4px rgba(16,24,40,0.06), 0 22px 44px -14px rgba(16,24,40,0.24), 0 60px 110px -40px rgba(40,24,96,0.38)';

export function Card({ w, children, pad = 34, r = 34, style }: { w: number; children: ReactNode; pad?: number; r?: number; style?: CSSProperties }) {
  return (
    <div style={{ width: w, background: '#fff', borderRadius: r, padding: pad, boxShadow: `${SHADOW}, inset 0 0 0 1.5px ${C.line}`, fontFamily: FONT, color: C.ink, ...style }}>
      {children}
    </div>
  );
}

export function CardHeader({ icon, title, right, size = 34 }: { icon: IconSvgElement; title: string; right?: ReactNode; size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.5, paddingBottom: size * 0.7, marginBottom: size * 0.75, borderBottom: `1.5px solid ${C.line}` }}>
      <Icon icon={icon} size={size * 1.05} color={C.ink} />
      <div style={{ fontSize: size, fontWeight: 600, letterSpacing: '-0.015em', flex: 1, whiteSpace: 'nowrap' }}>{title}</div>
      {right}
    </div>
  );
}

type Tone = 'emerald' | 'amber' | 'violet' | 'sky' | 'neutral' | 'rose';
const TONES: Record<Tone, [string, string]> = {
  emerald: [C.emerald, C.emeraldSoft],
  amber: [C.amber, C.amberSoft],
  violet: [C.violet, C.violetSoft],
  sky: [C.sky, C.skySoft],
  neutral: [C.ink2, '#F2F2F5'],
  rose: [C.rose, C.roseSoft],
};

export function Chip({ tone = 'neutral', children, dot, icon, size = 24, pulse = 0 }: { tone?: Tone; children: ReactNode; dot?: boolean; icon?: IconSvgElement; size?: number; pulse?: number }) {
  const [fg, bg] = TONES[tone];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.4, height: size * 1.75, padding: `0 ${size * 0.62}px`, borderRadius: 999, background: bg, color: fg, fontSize: size, fontWeight: 600, whiteSpace: 'nowrap', fontFamily: FONT, letterSpacing: '-0.005em' }}>
      {dot ? (
        <span style={{ position: 'relative', width: size * 0.42, height: size * 0.42, borderRadius: 99, background: fg, boxShadow: `0 0 0 ${size * 0.28 * pulse}px ${fg}${Math.round((1 - pulse) * 60).toString(16).padStart(2, '0')}` }} />
      ) : null}
      {icon ? <Icon icon={icon} size={size * 1.05} color={fg} stroke={2} /> : null}
      {children}
    </span>
  );
}

/** Pill button. press 0..1 = pressed amount. */
export function Pill({ kind = 'primary', children, size = 26, press = 0, icon, full, hover = 0 }: { kind?: 'primary' | 'secondary' | 'dark' | 'disabled'; children: ReactNode; size?: number; press?: number; icon?: IconSvgElement; full?: boolean; hover?: number }) {
  const styles: Record<string, CSSProperties> = {
    primary: { color: '#fff', background: 'linear-gradient(180deg,#8B5CF6,#7C3AED)', boxShadow: '0 0 0 1.5px #6D28D9, inset 0 1.5px 0 rgba(255,255,255,0.35), 0 14px 26px -12px rgba(124,58,237,0.7)' },
    secondary: { color: C.ink, background: '#fff', boxShadow: `0 0 0 1.5px rgba(16,24,40,${0.12 + hover * 0.1}), 0 6px 14px -8px rgba(16,24,40,0.25)` },
    dark: { color: '#fff', background: 'linear-gradient(180deg,#2A2A2E,#111113)', boxShadow: '0 0 0 1.5px #000, inset 0 1.5px 0 rgba(255,255,255,0.18), 0 14px 26px -12px rgba(0,0,0,0.55)' },
    disabled: { color: C.muted, background: '#F2F2F5', boxShadow: `0 0 0 1.5px ${C.line}` },
  };
  const fg = (styles[kind].color as string) ?? C.ink;
  return (
    <span style={{ display: full ? 'flex' : 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: size * 0.4, height: size * 2.15, padding: `0 ${size * 1.05}px`, borderRadius: 999, fontSize: size, fontWeight: 600, fontFamily: FONT, letterSpacing: '-0.01em', whiteSpace: 'nowrap', transform: `scale(${1 - press * 0.04})`, ...styles[kind] }}>
      {icon ? <Icon icon={icon} size={size * 1.05} color={fg} stroke={2} /> : null}
      {children}
    </span>
  );
}

/** Check drawn as a stroke inside a filled circle. p = draw progress. */
export function CheckCircle({ size = 40, p = 1, color = C.emerald }: { size?: number; p?: number; color?: string }) {
  const len = 30;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ display: 'block', flex: 'none' }}>
      <circle cx="20" cy="20" r="19" fill={color} opacity={clamp(p * 3)} transform={`rotate(0)`} />
      <path d="M12.5 20.5 L18 26 L28 14.5" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - clamp(p * 1.4 - 0.25))} />
    </svg>
  );
}

/* -------------------------------------------------------------- journeys */

export type StepState = { run: number; done: number };

/**
 * Journey step on a rail. run 0..1 = running ring in; done 0..1 = finished.
 */
export function Step({ icon, title, sub, run = 0, done = 0, size = 30, wash = 0, w }: { icon: IconSvgElement; title: string; sub: ReactNode; run?: number; done?: number; size?: number; wash?: number; w?: number }) {
  const ringColor = done > 0.5 ? `rgba(5,150,105,${0.35 * done})` : `rgba(124,58,237,${0.9 * run})`;
  const halo = done > 0.5 ? 0 : 7 * run;
  return (
    <div style={{ width: w, display: 'flex', alignItems: 'center', gap: size * 0.62, padding: `${size * 0.62}px ${size * 0.72}px`, borderRadius: size * 0.66, background: wash > 0 ? `rgba(124,58,237,${0.06 * wash})` : '#fff', boxShadow: `0 0 0 1.5px ${run > 0 || done > 0 ? ringColor : C.line}, 0 0 0 ${halo}px rgba(124,58,237,0.10), 0 4px 10px -8px rgba(16,24,40,0.2)` }}>
      <div style={{ width: size * 1.65, height: size * 1.65, display: 'grid', placeItems: 'center' }}>
        <Icon icon={icon} size={size * 1.15} color={done > 0.5 ? C.emerald : run > 0.5 ? C.violet : C.ink2} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: size, fontWeight: 600, letterSpacing: '-0.012em', color: C.ink, whiteSpace: 'nowrap' }}>{title}</div>
        <div style={{ fontSize: size * 0.8, color: C.muted, marginTop: size * 0.12, whiteSpace: 'nowrap' }}>{sub}</div>
      </div>
      <div style={{ width: size * 3.6, display: 'flex', justifyContent: 'flex-end', position: 'relative', height: size * 1.4, alignItems: 'center' }}>
        {done > 0 ? (
          <CheckCircle size={size * 1.35} p={done} />
        ) : run > 0 ? (
          <span style={{ opacity: run }}><Chip tone="violet" size={size * 0.72}>Running</Chip></span>
        ) : null}
      </div>
    </div>
  );
}

/** Dashed vertical rail behind a column of steps. */
export const Rail = ({ h, x, top }: { h: number; x: number; top: number }) => (
  <div style={{ position: 'absolute', left: x, top, width: 0, height: h, borderLeft: '2.5px dashed rgba(124,58,237,0.28)' }} />
);

/* ----------------------------------------------------------------- pointers */

/** macOS arrow cursor. press 0..1. */
export function Cursor({ x, y, press = 0, o = 1, s = 1.6 }: { x: number; y: number; press?: number; o?: number; s?: number }) {
  if (o <= 0) return null;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `scale(${s * (1 - press * 0.12)})`, transformOrigin: '2px 2px', opacity: o, zIndex: 50, filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.28))' }}>
      <svg width="28" height="34" viewBox="0 0 28 34">
        <path d="M2 2 L2 27 L8.2 21.2 L12.6 31.4 L17 29.5 L12.7 19.6 L21.2 19.6 Z" fill="#000" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** Fingertip touch indicator for the phone. press 0..1; ripple 0..1. */
export function Touch({ x, y, o = 1, press = 0, ripple = 0, size = 74 }: { x: number; y: number; o?: number; press?: number; ripple?: number; size?: number }) {
  if (o <= 0) return null;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 0, height: 0, zIndex: 60, opacity: o }}>
      {ripple > 0 && ripple < 1 ? (
        <div style={{ position: 'absolute', left: -size * (0.5 + ripple * 0.6), top: -size * (0.5 + ripple * 0.6), width: size * (1 + ripple * 1.2), height: size * (1 + ripple * 1.2), borderRadius: 999, border: `3px solid rgba(255,255,255,${0.9 * (1 - ripple)})`, boxShadow: `0 0 0 1px rgba(0,0,0,${0.08 * (1 - ripple)})` }} />
      ) : null}
      <div style={{ position: 'absolute', left: -size / 2, top: -size / 2, width: size, height: size, borderRadius: 999, background: 'rgba(255,255,255,0.55)', boxShadow: '0 0 0 2px rgba(255,255,255,0.9), 0 6px 18px rgba(0,0,0,0.22), inset 0 0 12px rgba(0,0,0,0.08)', transform: `scale(${1 - press * 0.18})` }} />
    </div>
  );
}

/* ------------------------------------------------------------------- phone */

export const PHONE_W = 390;
export const PHONE_H = 844;

/** iPhone frame (logical 390x844 screen). */
export function IPhone({ time = '9:41', children, dark = false }: { time?: string; children: ReactNode; dark?: boolean }) {
  return (
    <div style={{ position: 'relative', width: PHONE_W + 26, height: PHONE_H + 26, borderRadius: 66, padding: 13, background: 'linear-gradient(145deg,#3a3a3e,#151517 40%,#2b2b2f)', boxShadow: '0 0 0 1.5px #555, inset 0 0 0 1.5px #000, 0 50px 90px -30px rgba(20,10,60,0.45), 0 22px 40px -20px rgba(0,0,0,0.45)', fontFamily: FONT }}>
      <div style={{ position: 'relative', width: PHONE_W, height: PHONE_H, borderRadius: 54, overflow: 'hidden', background: dark ? '#000' : '#fff' }}>
        {children}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 34px 0 46px', fontSize: 17, fontWeight: 600, color: C.ink, zIndex: 20, pointerEvents: 'none' }}>
          <span>{time}</span>
          <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <svg width="19" height="12" viewBox="0 0 19 12"><rect x="0" y="8" width="3" height="4" rx="1" fill="#111" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="#111" /><rect x="10" y="3" width="3" height="9" rx="1" fill="#111" /><rect x="15" y="0" width="3" height="12" rx="1" fill="#111" /></svg>
            <svg width="17" height="12" viewBox="0 0 17 12"><path d="M8.5 2.2c2.4 0 4.6.9 6.2 2.5l1.2-1.2C13.9 1.6 11.3.5 8.5.5S3.1 1.6 1.1 3.5l1.2 1.2C3.9 3.1 6.1 2.2 8.5 2.2zm0 3.4c1.4 0 2.8.5 3.8 1.5l1.2-1.2C12.2 4.6 10.4 3.9 8.5 3.9S4.8 4.6 3.5 5.9l1.2 1.2c1-1 2.4-1.5 3.8-1.5zm0 3.4c.6 0 1.1.2 1.5.6L8.5 11 7 9.6c.4-.4.9-.6 1.5-.6z" fill="#111" /></svg>
            <svg width="27" height="13" viewBox="0 0 27 13"><rect x="0.5" y="0.5" width="23" height="12" rx="3.5" fill="none" stroke="#999" /><rect x="2" y="2" width="20" height="9" rx="2" fill="#111" /><rect x="24.5" y="4.5" width="2" height="4" rx="1" fill="#999" /></svg>
          </span>
        </div>
        <div style={{ position: 'absolute', left: '50%', top: 11, width: 124, height: 36, marginLeft: -62, borderRadius: 20, background: '#000', zIndex: 21 }} />
        <div style={{ position: 'absolute', left: '50%', bottom: 9, width: 136, height: 5, marginLeft: -68, borderRadius: 3, background: 'rgba(0,0,0,0.85)', zIndex: 21 }} />
      </div>
    </div>
  );
}

export function WaHeader({ name, letter, color }: { name: string; letter: string; color: string }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 112, paddingTop: 56, background: 'rgba(247,247,247,0.96)', borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 10, padding: '56px 16px 0 10px', zIndex: 10 }}>
      <svg width="13" height="22" viewBox="0 0 13 22"><path d="M11 2 L2 11 L11 20" fill="none" stroke={C.waLink} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <div style={{ width: 38, height: 38, borderRadius: 99, background: color, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 17, fontFamily: DISPLAY }}>{letter}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 16.5, fontWeight: 600, color: C.ink }}>
          {name}
          <svg width="15" height="15" viewBox="0 0 24 24"><path d="M12 1l2.6 2.1 3.3-.4.9 3.2 3 1.5-1 3.2 1 3.2-3 1.5-.9 3.2-3.3-.4L12 23l-2.6-2.1-3.3.4-.9-3.2-3-1.5 1-3.2-1-3.2 3-1.5.9-3.2 3.3.4z" fill={C.wa} /><path d="M7.5 12.2l3 3 6-6.2" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div style={{ fontSize: 12.5, color: C.muted }}>Business account</div>
      </div>
      <svg width="24" height="18" viewBox="0 0 24 18" style={{ marginRight: 14 }}><rect x="1" y="2" width="15" height="14" rx="3.5" fill="none" stroke={C.waLink} strokeWidth="2" /><path d="M16 7 L22 3.5 V14.5 L16 11" fill="none" stroke={C.waLink} strokeWidth="2" strokeLinejoin="round" /></svg>
      <svg width="20" height="20" viewBox="0 0 24 24"><path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 013 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" fill="none" stroke={C.waLink} strokeWidth="2" /></svg>
    </div>
  );
}

/** WhatsApp wallpaper + composer. Content is positioned by the caller. */
export function WaScreen({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.waBg }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(120,100,70,0.10) 1.2px, transparent 1.6px), radial-gradient(rgba(120,100,70,0.07) 1px, transparent 1.4px)', backgroundSize: '26px 26px, 26px 26px', backgroundPosition: '0 0, 13px 13px' }} />
      {children}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 84, background: 'rgba(247,247,247,0.97)', borderTop: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 14px' }}>
        <svg width="26" height="26" viewBox="0 0 24 24" style={{ marginTop: 6 }}><path d="M12 5v14M5 12h14" stroke={C.waLink} strokeWidth="2" strokeLinecap="round" /></svg>
        <div style={{ flex: 1, height: 36, borderRadius: 20, background: '#fff', border: '1px solid rgba(0,0,0,0.08)', padding: '0 14px', display: 'flex', alignItems: 'center', fontSize: 15, color: C.faint }}>Message</div>
        <svg width="22" height="26" viewBox="0 0 22 26" style={{ marginTop: 5 }}><rect x="7" y="2" width="8" height="14" rx="4" fill="none" stroke={C.waLink} strokeWidth="2" /><path d="M3 12a8 8 0 0016 0M11 20v4" fill="none" stroke={C.waLink} strokeWidth="2" strokeLinecap="round" /></svg>
      </div>
    </div>
  );
}

export const DateChip = ({ label = 'Today' }: { label?: string }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <span style={{ fontSize: 12.5, fontWeight: 500, color: '#54656F', background: 'rgba(255,255,255,0.92)', borderRadius: 8, padding: '4px 10px', boxShadow: '0 1px 1px rgba(0,0,0,0.06)' }}>{label}</span>
  </div>
);

const Ticks = ({ read }: { read: boolean }) => (
  <svg width="17" height="11" viewBox="0 0 17 11" style={{ marginLeft: 3 }}><path d="M1 6 L4.2 9.2 L10.5 2.2" fill="none" stroke={read ? '#53BDEB' : '#8696A0'} strokeWidth="1.7" strokeLinecap="round" /><path d="M6.3 8.6 L7 9.2 L13.4 2.2" fill="none" stroke={read ? '#53BDEB' : '#8696A0'} strokeWidth="1.7" strokeLinecap="round" /></svg>
);

export function Bubble({ out, children, time, read, maxW = 290 }: { out?: boolean; children: ReactNode; time: string; read?: boolean; maxW?: number }) {
  return (
    <div style={{ display: 'flex', justifyContent: out ? 'flex-end' : 'flex-start' }}>
      <div style={{ maxWidth: maxW, background: out ? C.waOut : '#fff', borderRadius: 14, borderTopRightRadius: out ? 4 : 14, borderTopLeftRadius: out ? 14 : 4, padding: '8px 11px 6px', boxShadow: '0 1px 1.5px rgba(0,0,0,0.10)', fontSize: 16, lineHeight: 1.36, color: '#111B21' }}>
        {children}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: 11.5, color: '#667781', marginTop: 2 }}>
          {time}
          {out ? <Ticks read={!!read} /> : null}
        </div>
      </div>
    </div>
  );
}

/** Business template message with media header and a URL button. */
export function TemplateBubble({ media, title, body, time, cta, ctaPress = 0 }: { media: ReactNode; title: string; body: string; time: string; cta: string; ctaPress?: number }) {
  return (
    <div style={{ width: 300, background: '#fff', borderRadius: 14, borderTopLeftRadius: 4, boxShadow: '0 1px 1.5px rgba(0,0,0,0.10)', overflow: 'hidden', color: '#111B21' }}>
      <div style={{ padding: 4 }}>
        <div style={{ height: 156, borderRadius: 11, overflow: 'hidden' }}>{media}</div>
      </div>
      <div style={{ padding: '6px 11px 4px' }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 15.5, lineHeight: 1.38 }}>{body}</div>
        <div style={{ textAlign: 'right', fontSize: 11.5, color: '#667781', marginTop: 3 }}>{time}</div>
      </div>
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', height: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, color: C.waLink, fontSize: 16, fontWeight: 500, background: `rgba(10,132,198,${0.12 * ctaPress})` }}>
        <svg width="15" height="15" viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" fill="none" stroke={C.waLink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        {cta}
      </div>
    </div>
  );
}

/** iOS notification banner. */
export function Banner({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ width: 362, borderRadius: 24, background: 'rgba(250,250,252,0.93)', boxShadow: '0 12px 30px -8px rgba(0,0,0,0.28), 0 0 0 0.5px rgba(0,0,0,0.06)', padding: '12px 14px', display: 'flex', gap: 11, alignItems: 'center', fontFamily: FONT }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(180deg,#5DE57E,#22B94F)', display: 'grid', placeItems: 'center', flex: 'none' }}>
        <SiWhatsapp size={24} color="#fff" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14.5, fontWeight: 600, color: C.ink }}>
          <span>{title}</span>
          <span style={{ fontWeight: 400, color: C.muted, fontSize: 13 }}>now</span>
        </div>
        <div style={{ fontSize: 14.5, color: C.ink2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{body}</div>
      </div>
    </div>
  );
}

/** Bottom sheet inside the phone. */
export function Sheet({ children, y }: { children: ReactNode; y: number }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, transform: `translateY(${y}px)`, background: '#fff', borderRadius: '26px 26px 0 0', boxShadow: '0 -10px 40px rgba(0,0,0,0.18)', padding: '10px 20px 34px', zIndex: 15 }}>
      <div style={{ width: 40, height: 5, borderRadius: 3, background: '#D1D1D6', margin: '0 auto 14px' }} />
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- satellites */

export function Toast({ icon, title, sub, dark, size = 30, tone = C.emerald }: { icon: IconSvgElement; title: string; sub: string; dark?: boolean; size?: number; tone?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.6, padding: `${size * 0.6}px ${size * 0.9}px ${size * 0.6}px ${size * 0.7}px`, borderRadius: size * 0.8, background: dark ? 'linear-gradient(180deg,#1D2433,#0B1220)' : '#fff', color: dark ? '#fff' : C.ink, boxShadow: dark ? '0 0 0 1.5px rgba(255,255,255,0.08), 0 24px 50px -18px rgba(11,18,32,0.6)' : `${SHADOW_LIFT}, inset 0 0 0 1.5px ${C.line}`, fontFamily: FONT, whiteSpace: 'nowrap' }}>
      <Icon icon={icon} size={size * 1.15} color={dark ? '#fff' : tone} stroke={1.9} />
      <div>
        <div style={{ fontSize: size, fontWeight: 600, letterSpacing: '-0.012em' }}>{title}</div>
        <div style={{ fontSize: size * 0.8, color: dark ? 'rgba(255,255,255,0.65)' : C.muted, marginTop: size * 0.1 }}>{sub}</div>
      </div>
    </div>
  );
}

/** Pop-in scale for satellites from a spring value. */
export const pop = (k: number) => ({ s: lerp(0.86, 1, k), o: clamp(k * 2.2) });

/* ----------------------------------------------------------------- browser */

export function Browser({ w, h, url, children }: { w: number; h: number; url: string; children: ReactNode }) {
  return (
    <div style={{ width: w, height: h, borderRadius: 26, overflow: 'hidden', background: '#fff', boxShadow: `${SHADOW_LIFT}, inset 0 0 0 1.5px ${C.line}`, fontFamily: FONT, position: 'relative' }}>
      <div style={{ height: 74, background: '#F6F6F8', borderBottom: `1.5px solid ${C.line}`, display: 'flex', alignItems: 'center', padding: '0 26px', gap: 12 }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
          <span key={c} style={{ width: 16, height: 16, borderRadius: 99, background: c, boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)' }} />
        ))}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '52%', height: 42, borderRadius: 12, background: '#EBEBEF', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontSize: 21, color: C.ink2 }}>
            <svg width="14" height="17" viewBox="0 0 14 17"><rect x="1" y="7" width="12" height="9" rx="2.5" fill={C.ink2} /><path d="M4 7V5a3 3 0 016 0v2" fill="none" stroke={C.ink2} strokeWidth="2" /></svg>
            {url}
          </div>
        </div>
        <span style={{ width: 72 }} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 74, bottom: 0 }}>{children}</div>
    </div>
  );
}
