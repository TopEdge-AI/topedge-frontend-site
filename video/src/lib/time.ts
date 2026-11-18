/**
 * Time and motion primitives. Every visual value in a composition is a pure
 * function of the current time `t` (seconds), so any frame can be rendered on
 * its own and the output is identical on every run.
 */
import { createContext, useContext } from 'react';

export const FPS = 30;

export const TimeContext = createContext(0);
/** Composition frame size; the same composition can render at several sizes. */
export const SizeContext = createContext({ w: 1920, h: 1200 });
export const useSize = () => useContext(SizeContext);
/** True when the harness supplies the stage and camera (cinematic mode). */
export const CineContext = createContext(false);
/** Current composition time in seconds. */
export const useTime = () => useContext(TimeContext);

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

/** CSS-style cubic-bezier easing (x1, y1, x2, y2) solved by Newton + bisection. */
export function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const e = sx(t) - x;
      const d = dx(t);
      if (Math.abs(e) < 1e-6) return sy(t);
      if (Math.abs(d) < 1e-6) break;
      t -= e / d;
    }
    let lo = 0, hi = 1;
    t = x;
    for (let i = 0; i < 30; i++) {
      const v = sx(t);
      if (Math.abs(v - x) < 1e-6) break;
      if (v < x) lo = t; else hi = t;
      t = (lo + hi) / 2;
    }
    return sy(t);
  };
}

/** Apple-like curves. */
export const E = {
  /** Things arriving: fast start, long soft landing. */
  enter: bezier(0.16, 1, 0.3, 1),
  /** Things leaving: gentle start, quick exit. */
  exit: bezier(0.7, 0, 0.84, 0),
  /** Moves from A to B on screen. */
  move: bezier(0.65, 0, 0.35, 1),
  /** Camera: slow in, very slow out. */
  camera: bezier(0.45, 0, 0.15, 1),
  linear: (x: number) => x,
};

/** 0→1 progress of a window [t0, t1] with easing. */
export const prog = (t: number, t0: number, t1: number, ease: (x: number) => number = E.enter) =>
  ease(clamp((t - t0) / (t1 - t0)));

/** Interpolate across keyframes [[time, value], ...] with one easing per segment. */
export function keys(t: number, frames: [number, number][], ease: (x: number) => number = E.move) {
  if (t <= frames[0][0]) return frames[0][1];
  for (let i = 1; i < frames.length; i++) {
    const [t1, v1] = frames[i];
    const [t0, v0] = frames[i - 1];
    if (t <= t1) return lerp(v0, v1, ease(clamp((t - t0) / (t1 - t0))));
  }
  return frames[frames.length - 1][1];
}

/**
 * Damped spring from 0 to 1 starting at t0 (closed form, deterministic).
 * `bounce` 0 = critically damped; 0.2 = a small, Apple-like overshoot.
 */
export function spring(t: number, t0: number, duration = 0.6, bounce = 0.15) {
  const x = t - t0;
  if (x <= 0) return 0;
  const zeta = 1 - bounce;
  const omega = (2 * Math.PI) / duration;
  if (zeta >= 1) return 1 - Math.exp(-omega * x) * (1 + omega * x);
  const wd = omega * Math.sqrt(1 - zeta * zeta);
  return 1 - Math.exp(-zeta * omega * x) * (Math.cos(wd * x) + ((zeta * omega) / wd) * Math.sin(wd * x));
}

/** Point on a quadratic/cubic Bézier path for cursor travel. */
export function pathPoint(p: [number, number][], k: number): [number, number] {
  let pts = p;
  while (pts.length > 1) {
    const next: [number, number][] = [];
    for (let i = 0; i < pts.length - 1; i++) next.push([lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)]);
    pts = next;
  }
  return pts[0];
}

/** Text typed on at `cps` characters per second from t0. */
export const typed = (text: string, t: number, t0: number, cps = 16) =>
  text.slice(0, Math.max(0, Math.min(text.length, Math.floor((t - t0) * cps))));
