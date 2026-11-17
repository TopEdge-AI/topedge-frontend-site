/**
 * Shared staging for the showcase films: the dashboard-to-phone depth swap,
 * the phone framed big (cropped by the bottom edge so chat text stays legible
 * at website size), the lock screen, banner, in-app checkout and success page.
 */
import type { ReactNode } from 'react';
import { E, clamp, lerp, prog, spring } from './time';
import { Banner, C, CheckCircle, Chip, DISPLAY, FONT, IPhone, PHONE_H, PHONE_W, Pill } from './ui';

export const SW = 1920;
export const SH = 1200;
export const PHONE_SCALE = 2.05;
export const PHONE_TOP = 70;

/** Dashboard layer during an act switch: recedes into soft focus while the phone is up. */
export function backdropState(t: number, swapIn: number, swapBack?: number) {
  const away = prog(t, swapIn, swapIn + 0.8, E.move) * (swapBack !== undefined ? 1 - prog(t, swapBack, swapBack + 0.8, E.move) : 1);
  return { s: lerp(1, 0.86, away), blur: 18 * away, o: lerp(1, 0.4, away), away };
}

/** Phone vertical offset: rises on a spring at `inAt`, sinks away at `outAt`. */
export function phoneOffset(t: number, inAt: number, outAt?: number, pan = 0) {
  const rise = spring(t, inAt, 0.9, 0.12);
  const sink = outAt !== undefined ? prog(t, outAt, outAt + 0.7, E.exit) : 0;
  return lerp(1350, 0, rise) + 1500 * sink - pan;
}

/** World position of a point on the phone screen (logical coords). */
export function phonePoint(lx: number, ly: number, offset: number): [number, number] {
  const left = SW / 2 - ((PHONE_W + 26) * PHONE_SCALE) / 2;
  return [left + (13 + lx) * PHONE_SCALE, PHONE_TOP + offset + (13 + ly) * PHONE_SCALE];
}

export function PhoneRig({ offset, time, children, tilt = 0 }: { offset: number; time: string; children: ReactNode; tilt?: number }) {
  if (offset > 1300) return null;
  const h = (PHONE_H + 26) * PHONE_SCALE;
  return (
    <div style={{ position: 'absolute', left: SW / 2, top: PHONE_TOP + offset + h / 2, transform: `translate(-50%, -50%) scale(${PHONE_SCALE}) rotateX(${tilt}deg)`, zIndex: 20 }}>
      <IPhone time={time}>{children}</IPhone>
    </div>
  );
}

/** iOS lock screen with a banner that drops in at `bannerAt`. */
export function LockScreen({ t, time, date, bannerAt, bannerTitle, bannerBody, wall = ['#C9B8FF', '#FFD6C2'] }: { t: number; time: string; date: string; bannerAt: number; bannerTitle: string; bannerBody: string; wall?: [string, string] }) {
  const b = spring(t, bannerAt, 0.7, 0.18);
  return (
    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(165deg, ${wall[0]} 0%, ${wall[1]} 100%)`, fontFamily: DISPLAY, color: '#fff' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 50% at 30% 20%, rgba(255,255,255,0.45), transparent 70%)' }} />
      <div style={{ position: 'absolute', top: 88, width: '100%', textAlign: 'center', fontSize: 19, fontWeight: 600, opacity: 0.92 }}>{date}</div>
      <div style={{ position: 'absolute', top: 106, width: '100%', textAlign: 'center', fontSize: 92, fontWeight: 600, letterSpacing: '-0.02em', textShadow: '0 2px 18px rgba(80,40,140,0.25)' }}>{time}</div>
      {b > 0 ? (
        <div style={{ position: 'absolute', left: 14, top: lerp(-120, 236, b), opacity: clamp(b * 2) }}>
          <Banner title={bannerTitle} body={bannerBody} />
        </div>
      ) : null}
    </div>
  );
}

/** In-app checkout page (Stride Shoes). pay = press amount on the Pay button. */
export function CheckoutPage({ media, title, price, was, code, name, address, total, pay = 0 }: { media: ReactNode; title: string; price: string; was: string; code: string; name: string; address: string; total: string; pay?: number }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', fontFamily: FONT, color: C.ink }}>
      <div style={{ position: 'absolute', top: 56, left: 0, right: 0, height: 46, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, borderBottom: `1px solid ${C.line}` }}>
        <span style={{ color: C.waLink, fontSize: 16, fontWeight: 600 }}>Done</span>
        <div style={{ flex: 1, height: 32, borderRadius: 9, background: '#F2F2F5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 14, color: C.ink2 }}>
          <svg width="10" height="12" viewBox="0 0 14 17"><rect x="1" y="7" width="12" height="9" rx="2.5" fill={C.ink2} /><path d="M4 7V5a3 3 0 016 0v2" fill="none" stroke={C.ink2} strokeWidth="2" /></svg>
          stride.in/checkout
        </div>
        <span style={{ width: 34 }} />
      </div>
      <div style={{ position: 'absolute', top: 114, left: 16, right: 16, height: 138, borderRadius: 14, overflow: 'hidden' }}>{media}</div>
      <div style={{ position: 'absolute', top: 264, left: 18, right: 18 }}>
        <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.01em' }}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
          <span style={{ fontSize: 22, fontWeight: 700 }}>{price}</span>
          <span style={{ fontSize: 14, color: C.muted, textDecoration: 'line-through' }}>{was}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.emerald, background: C.emeraldSoft, borderRadius: 6, padding: '2px 7px' }}>{code}</span>
        </div>
        <div style={{ marginTop: 10, background: '#F6F6F8', borderRadius: 12, padding: '9px 12px' }}>
          <div style={{ fontSize: 12.5, fontWeight: 600 }}>Deliver to</div>
          <div style={{ fontSize: 12.5, color: C.ink2, marginTop: 2 }}>{name} · {address}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          {['UPI', 'Card', 'COD'].map((m, i) => (
            <span key={m} style={{ flex: 1, height: 34, borderRadius: 99, display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 600, boxShadow: i === 0 ? `0 0 0 2px ${C.ink}` : `0 0 0 1px ${C.line}`, color: i === 0 ? C.ink : C.ink2 }}>{m}</span>
          ))}
        </div>
        <div style={{ marginTop: 12 }}>
          <Pill kind="dark" size={17} press={pay} full>Pay {total}</Pill>
        </div>
      </div>
    </div>
  );
}

export function SuccessPage({ t, at, order, chip }: { t: number; at: number; order: string; chip: string }) {
  const k = prog(t, at, at + 0.9, E.enter);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', fontFamily: FONT, color: C.ink, textAlign: 'center' }}>
      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${lerp(0.7, 1, spring(t, at, 0.6, 0.25))})` }}>
        <CheckCircle size={96} p={k} />
      </div>
      <div style={{ position: 'absolute', top: 268, left: 0, right: 0, opacity: prog(t, at + 0.25, at + 0.7), transform: `translateY(${lerp(10, 0, prog(t, at + 0.25, at + 0.8))}px)` }}>
        <div style={{ fontSize: 25, fontWeight: 700, letterSpacing: '-0.015em' }}>Payment successful</div>
        <div style={{ fontSize: 15, color: C.muted, marginTop: 6 }}>{order}</div>
        <div style={{ marginTop: 16 }}>
          <Chip tone="emerald" size={14}>{chip}</Chip>
        </div>
      </div>
    </div>
  );
}

/** Slide-up for screens inside the phone (0 = hidden below, 1 = in place). */
export const screenY = (k: number) => lerp(PHONE_H, 0, k);
