/**
 * Second kit: night stage + fireworks, odometer numbers, meters, key-value rows,
 * sparklines, avatars, and the generic product-page sheet used in phone acts.
 */
import type { CSSProperties, ReactNode } from 'react';
import { E, clamp, lerp, prog } from './time';
import { C, DISPLAY, FONT, Pill } from './ui';

/* ------------------------------------------------------------ night stage */

const rand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export function NightBackdrop({ t, w, h }: { t: number; w: number; h: number }) {
  const stars = Array.from({ length: 90 }, (_, i) => ({ x: rand(i) * w, y: rand(i + 400) * h * 0.85, r: 0.8 + rand(i + 800) * 1.6, p: rand(i + 1200) * 4 }));
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#0D0A26 0%,#0A0820 100%)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 50% at 50% 110%, rgba(124,58,237,0.35), transparent 70%), radial-gradient(40% 40% at 15% 0%, rgba(244,114,182,0.12), transparent 70%)' }} />
      <svg width={w} height={h} style={{ position: 'absolute', inset: 0 }}>
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={0.25 + 0.5 * (0.5 + 0.5 * Math.sin(((t + s.p) / 4) * Math.PI * 2))} />
        ))}
      </svg>
    </div>
  );
}

const FW_COLORS = ['#FBBF24', '#F472B6', '#A78BFA', '#FB923C', '#FDE68A'];

/** Deterministic firework shells: rise on a thin trail, burst into falling streaks. */
export function Fireworks({ t, w, h, starts = [0, 0.8, 1.6, 2.3, 2.9], period = 3.2, scale = 1, light = false }: { t: number; w: number; h: number; starts?: number[]; period?: number; scale?: number; light?: boolean }) {
  const els: ReactNode[] = [];
  const cycles = [Math.floor(t / period) - 1, Math.floor(t / period)];
  cycles.forEach((cyc) => {
    starts.forEach((s0, i) => {
      const seed = cyc * 13 + i * 7 + 3;
      const t0 = cyc * period + s0;
      const age = t - t0;
      if (age < 0 || age > 2.6) return;
      const x = (0.12 + rand(seed) * 0.76) * w;
      const y = (0.12 + rand(seed + 1) * 0.3) * h;
      const col = FW_COLORS[Math.abs(seed) % FW_COLORS.length];
      const rise = 0.7;
      if (age < rise) {
        const k = E.enter(age / rise);
        const cy = lerp(h * 1.05, y, k);
        els.push(<line key={`r${seed}`} x1={x} y1={cy} x2={x} y2={cy + 90 * scale * (1 - k * 0.6)} stroke={col} strokeWidth={2.2 * scale} strokeLinecap="round" opacity={0.7} />);
        return;
      }
      const b = (age - rise) / 1.9;
      const fade = 1 - clamp(b);
      const R = 170 * scale * E.enter(clamp(b * 1.6));
      for (let k = 0; k < 18; k++) {
        const a = (k / 18) * Math.PI * 2 + rand(seed + k) * 0.2;
        const g = 60 * scale * b * b;
        const x2 = x + Math.cos(a) * R;
        const y2 = y + Math.sin(a) * R + g;
        const x1 = x + Math.cos(a) * R * 0.62;
        const y1 = y + Math.sin(a) * R * 0.62 + g * 0.8;
        els.push(<line key={`s${seed}-${k}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} strokeWidth={2.4 * scale} strokeLinecap="round" opacity={fade * (light ? 0.55 : 0.95)} />);
      }
      if (b < 0.25) els.push(<circle key={`f${seed}`} cx={x} cy={y} r={24 * scale * (1 - b * 4)} fill={col} opacity={0.5 * (1 - b * 4)} />);
    });
  });
  return (
    <svg width={w} height={h} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {els}
    </svg>
  );
}

/* ---------------------------------------------------------------- numbers */

export const inr = (n: number, d = 0) => n.toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });

/** Number that counts up from 0 between t0 and t0+dur (ease-out quart). */
export const countUp = (t: number, t0: number, value: number, dur = 1.3) => value * (1 - Math.pow(1 - clamp((t - t0) / dur), 4));

export function Meter({ k, color = C.emerald, h = 14, track = '#EEF0F4' }: { k: number; color?: string; h?: number; track?: string }) {
  return (
    <div style={{ height: h, borderRadius: 99, background: track, overflow: 'hidden' }}>
      <div style={{ width: `${clamp(k) * 100}%`, height: '100%', borderRadius: 99, background: color }} />
    </div>
  );
}

export function KV({ k, v, bold, size = 30, color = C.ink, line }: { k: ReactNode; v: ReactNode; bold?: boolean; size?: number; color?: string; line?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: `${size * 0.42}px 0`, borderTop: line ? `1.5px solid ${C.line}` : undefined, fontSize: size, fontFamily: FONT }}>
      <span style={{ color: bold ? C.ink : C.ink2, fontWeight: bold ? 600 : 400 }}>{k}</span>
      <span style={{ fontWeight: bold ? 700 : 600, color, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>{v}</span>
    </div>
  );
}

export function Avatar({ name, color, size = 56 }: { name: string; color: string; size?: number }) {
  const ini = name.split(' ').map((p) => p[0]).join('').slice(0, 2);
  return (
    <span style={{ width: size, height: size, borderRadius: 99, background: `${color}22`, color, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: size * 0.38, flex: 'none', fontFamily: FONT }}>{ini}</span>
  );
}

/** Area sparkline drawn left→right by k. */
export function Spark({ pts, w, h, k, color = C.violet }: { pts: number[]; w: number; h: number; k: number; color?: string }) {
  const max = Math.max(...pts), min = Math.min(...pts);
  const xy = pts.map((p, i) => [(i / (pts.length - 1)) * w, h - ((p - min) / (max - min || 1)) * (h - 8) - 4] as const);
  const d = xy.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const end = xy[Math.min(xy.length - 1, Math.floor(k * (xy.length - 1) + 0.0001))];
  return (
    <svg width={w} height={h} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="sparkfill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} stopOpacity="0.22" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient>
        <clipPath id="sparkclip"><rect x="0" y="-10" width={w * clamp(k)} height={h + 20} /></clipPath>
      </defs>
      <g clipPath="url(#sparkclip)">
        <path d={`${d} L${w} ${h} L0 ${h} Z`} fill="url(#sparkfill)" />
        <path d={d} fill="none" stroke={color} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
      </g>
      {k > 0.02 ? <circle cx={end[0]} cy={end[1]} r={7} fill="#fff" stroke={color} strokeWidth={4} /> : null}
    </svg>
  );
}

/** Row that slides in at `at` (used for inserted rows). */
export const rowIn = (t: number, at: number, dur = 0.5) => {
  const k = prog(t, at, at + dur, E.enter);
  return { opacity: k, transform: `translateY(${lerp(16, 0, k)}px)` } as const;
};

/* --------------------------------------------------------------- products */

/** Rani pink silk kurta on a saffron studio backdrop (SVG render). */
export function KurtaShot({ tag }: { tag?: string }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'radial-gradient(90% 90% at 50% 25%, #FFE7C2 0%, #FBC77E 60%, #F2A955 100%)' }}>
      <svg viewBox="0 0 300 220" style={{ position: 'absolute', inset: '4% 8%', width: '84%', height: '92%' }} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="silk" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F472B6" />
            <stop offset="0.45" stopColor="#DB2777" />
            <stop offset="1" stopColor="#9D174D" />
          </linearGradient>
          <linearGradient id="sheenk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="0.5" stopColor="#fff" stopOpacity="0.28" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        </defs>
        <ellipse cx="150" cy="212" rx="70" ry="6" fill="#7C2D12" opacity="0.18" />
        <path d="M120 18 L135 12 C140 22 160 22 165 12 L180 18 L222 44 L238 96 L212 104 L200 74 L204 206 L96 206 L100 74 L88 104 L62 96 L78 44 Z" fill="url(#silk)" />
        <path d="M135 12 C140 22 160 22 165 12 L160 60 L150 70 L140 60 Z" fill="#FBBF24" opacity="0.85" />
        <path d="M150 22 L150 120" stroke="#FDE68A" strokeWidth="2" strokeDasharray="3 5" />
        <path d="M96 196 L204 196" stroke="#FBBF24" strokeWidth="7" />
        <path d="M98 184 L202 184" stroke="#FDE68A" strokeWidth="2" strokeDasharray="2 4" />
        <path d="M70 92 L86 98 M228 92 L212 98" stroke="#FBBF24" strokeWidth="5" />
        <path d="M110 40 C130 90 120 150 112 200" stroke="url(#sheenk)" strokeWidth="26" fill="none" />
      </svg>
      {tag ? <span style={{ position: 'absolute', left: 10, top: 10, background: C.rose, color: '#fff', fontWeight: 700, fontSize: 13, borderRadius: 7, padding: '3px 7px', fontFamily: FONT }}>{tag}</span> : null}
    </div>
  );
}

/** In-app shop page inside the phone (390 logical width). */
export function ShopPage({ host, media, title, price, was, code, strip, cta, press = 0 }: { host: string; media: ReactNode; title: string; price: string; was: string; code: string; strip: string; cta: string; press?: number }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', fontFamily: FONT, color: C.ink }}>
      <div style={{ position: 'absolute', top: 56, left: 0, right: 0, height: 46, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, borderBottom: `1px solid ${C.line}` }}>
        <span style={{ color: C.waLink, fontSize: 16, fontWeight: 600 }}>Done</span>
        <div style={{ flex: 1, height: 32, borderRadius: 9, background: '#F2F2F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: C.ink2 }}>{host}</div>
        <span style={{ width: 34 }} />
      </div>
      <div style={{ position: 'absolute', top: 112, left: 16, right: 16, height: 176, borderRadius: 14, overflow: 'hidden' }}>{media}</div>
      <div style={{ position: 'absolute', top: 300, left: 18, right: 18 }}>
        <div style={{ fontFamily: DISPLAY, fontSize: 21, fontWeight: 700, letterSpacing: '-0.015em' }}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
          <span style={{ fontSize: 22, fontWeight: 700 }}>{price}</span>
          <span style={{ fontSize: 14, color: C.muted, textDecoration: 'line-through' }}>{was}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.emerald, background: C.emeraldSoft, borderRadius: 6, padding: '2px 7px' }}>{code}</span>
        </div>
        <div style={{ marginTop: 12, background: '#FFF7E6', color: '#92400E', borderRadius: 10, padding: '8px 12px', fontSize: 13.5, fontWeight: 600 }}>{strip}</div>
        <div style={{ marginTop: 14 }}><Pill kind="dark" size={17} press={press} full>{cta}</Pill></div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- controls */

export function Toggle({ on, size = 1 }: { on: number; size?: number }) {
  const w = 64 * size, h = 38 * size, k = 30 * size;
  return (
    <span style={{ position: 'relative', width: w, height: h, borderRadius: 99, background: on > 0.5 ? C.violet : '#D9D9E0', display: 'inline-block', flex: 'none', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.12)' }}>
      <span style={{ position: 'absolute', top: (h - k) / 2, left: lerp((h - k) / 2, w - k - (h - k) / 2, clamp(on)), width: k, height: k, borderRadius: 99, background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
    </span>
  );
}

export function Donut({ k, value, size = 220, color = C.emerald, stroke = 22 }: { k: number; value: number; size?: number; color?: string; stroke?: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEF0F4" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - clamp(k))} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontSize: size * 0.3, fontWeight: 600, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{Math.round(value)}</div>
    </div>
  );
}

/** Profile header: avatar · name · sub · optional right chip. */
export function ProfileHead({ name, sub, color, right, size = 1 }: { name: string; sub: string; color: string; right?: ReactNode; size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 * size, paddingBottom: 22 * size, marginBottom: 22 * size, borderBottom: `1.5px solid ${C.line}`, fontFamily: FONT }}>
      <Avatar name={name} color={color} size={72 * size} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 36 * size, fontWeight: 600, letterSpacing: '-0.015em' }}>{name}</div>
        <div style={{ fontSize: 25 * size, color: C.muted, marginTop: 3 }}>{sub}</div>
      </div>
      {right}
    </div>
  );
}

/** Timeline event row on a rail: icon disc · title · sub · time. */
export function EventRow({ icon, tone = C.ink2, title, sub, time, size = 1, wash = 0, style }: { icon: ReactNode; tone?: string; title: ReactNode; sub: ReactNode; time?: string; size?: number; wash?: number; style?: CSSProperties }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 * size, padding: `${14 * size}px ${16 * size}px`, borderRadius: 20 * size, background: wash ? `rgba(124,58,237,${0.06 * wash})` : 'transparent', fontFamily: FONT, ...style }}>
      <span style={{ width: 58 * size, height: 58 * size, borderRadius: 99, background: '#fff', boxShadow: `0 0 0 1.5px ${C.line}, 0 4px 10px -6px rgba(16,24,40,0.25)`, display: 'grid', placeItems: 'center', flex: 'none', color: tone }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 29 * size, fontWeight: 600, whiteSpace: 'nowrap' }}>{title}</div>
        <div style={{ fontSize: 24 * size, color: C.muted, marginTop: 2, whiteSpace: 'nowrap' }}>{sub}</div>
      </div>
      {time ? <span style={{ fontSize: 23 * size, color: C.faint }}>{time}</span> : null}
    </div>
  );
}
