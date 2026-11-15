/**
 * Feature visual kit: coded, animated product scenes that replace dashboard
 * screenshots on the feature pages.
 *
 * Everything is drawn in HTML/CSS/SVG, so it is sharp at any size, weighs a few
 * KB and themes from one palette. A scene is authored on a fixed em grid and the
 * stage scales the whole thing with its own width (container query units):
 *
 *   square stage : 36em x 36em   (bento tiles)
 *   wide stage   : 64em x 40em   (showcase rows and heroes)
 *
 * 1em is about 10px at the size the page shows it. Position children with
 * <Float x y w> in PERCENT of the stage; size everything inside in em.
 *
 * Motion model (all CSS, driven by classes the Stage toggles):
 *   1. enter  : floats rise in on their own `delay` when the stage scrolls in
 *   2. hold   : ambient loops run (live dots, travelling wires, typing, cursor)
 *   3. exit   : after ~8s everything settles out, then the sequence plays again
 *   Hover pauses the loop, adds pointer parallax (layers move by depth), a soft
 *   spotlight, and lifts the card under the pointer. Reduced motion shows the
 *   final frame only.
 *
 * Colour model: one brand accent per stage (AccentContext, violet by default).
 * Components without an explicit `tone` inherit it, so a scene stays one hue
 * with semantic colours (emerald = live/ok, amber = pending, rose = failed)
 * used only where they mean something.
 */
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ComponentType,
  type RefObject,
  type ReactNode,
} from 'react';
import { Check, CheckCheck, type LucideProps } from 'lucide-react';
import '../../styles/feature-visuals.css';

export type Tone = 'violet' | 'emerald' | 'sky' | 'amber' | 'rose' | 'indigo' | 'slate';
export type IconType = ComponentType<LucideProps>;

/** Props every scene receives from the page. */
export type SceneProps = {
  /** Accessible description (the old screenshot alt text). */
  label: string;
};
export type Scene = ComponentType<SceneProps>;
/** One module per feature page: image path (as written in productPages.ts) to scene. */
export type SceneMap = Record<string, Scene>;

/** Page-level accent. Overrides each scene's own backdrop tone. */
export const AccentContext = createContext<Tone | undefined>(undefined);
/** Increments every time the stage plays its entrance (count-ups key off it). */
const PlayContext = createContext(0);

const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ');

/** How long a fully revealed scene holds before it replays, and the exit time. */
const HOLD_MS = 8200;
const EXIT_MS = 620;

/* ── Stage ─────────────────────────────────────────────────────────────── */

type StageProps = SceneProps & {
  tone?: Tone;
  /** 'square' for bento tiles, 'wide' for showcases and heroes. */
  shape?: 'square' | 'wide';
  /** Kept for API compatibility; the dotted grid was retired. */
  grid?: boolean;
  /**
   * Backdrop. 'plain' is a white card surface (bento tiles, Graceview style);
   * 'violet' | 'ocean' | 'dusk' are rich glass-gradient panels (Instantly
   * style). Defaults: square stages are plain, wide stages pick a gradient
   * from the label so neighbouring panels differ.
   */
  mood?: Mood;
  children: ReactNode;
};

export type Mood = 'plain' | 'violet' | 'ocean' | 'dusk';
const MOODS: Mood[] = ['violet', 'ocean', 'dusk'];
const hash = (t: string) => [...t].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/** Breathing room around auto-framed content, as a fraction of each side. */
const FIT_PAD = { square: 0.1, wide: 0.09 } as const;
const FIT_MAX = 1.7;
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Auto-framing. Scenes are placed by hand in percent, and many leave a band of
 * empty stage or sit off-centre. This measures the untransformed layout boxes
 * of the top-level floats, then centres and scales the whole layer so the
 * content fills the frame with even margins (zooming in up to FIT_MAX, or out
 * if something overflows). Wires live in the same layer, so they stay attached.
 */
function useAutoFit(
  stageRef: RefObject<HTMLDivElement>,
  fitRef: RefObject<HTMLDivElement>,
  shape: 'square' | 'wide',
) {
  useIsoLayoutEffect(() => {
    const stage = stageRef.current;
    const fit = fitRef.current;
    if (!stage || !fit) return;

    const measure = () => {
      const W = fit.offsetWidth;
      const H = fit.offsetHeight;
      if (!W || !H) return;
      let x0 = Infinity;
      let y0 = Infinity;
      let x1 = -Infinity;
      let y1 = -Infinity;
      fit.querySelectorAll<HTMLElement>('.fv-float').forEach((el) => {
        if (el.parentElement?.closest('.fv-float')) return;
        const inner = el.firstElementChild as HTMLElement | null;
        const w = Math.max(el.offsetWidth, inner?.scrollWidth ?? 0);
        const h = Math.max(el.offsetHeight, inner?.scrollHeight ?? 0);
        x0 = Math.min(x0, el.offsetLeft);
        y0 = Math.min(y0, el.offsetTop);
        x1 = Math.max(x1, el.offsetLeft + w);
        y1 = Math.max(y1, el.offsetTop + h);
      });
      if (!Number.isFinite(x0)) return;
      const pad = FIT_PAD[shape];
      const bw = x1 - x0;
      const bh = y1 - y0;
      const s = Math.min((W * (1 - 2 * pad)) / bw, (H * (1 - 2 * pad)) / bh, FIT_MAX);
      const tx = (W - bw * s) / 2 - x0 * s;
      const ty = (H - bh * s) / 2 - y0 * s;
      fit.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${s.toFixed(4)})`;
    };

    measure();
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    ro?.observe(stage);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => ro?.disconnect();
  }, [shape]);
}

export function Stage({ tone, shape = 'square', mood, label, children }: StageProps) {
  const look: Mood = mood ?? (shape === 'square' ? 'plain' : MOODS[hash(label) % MOODS.length]);
  const accent = useContext(AccentContext) ?? tone ?? 'violet';
  const ref = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(0);
  useAutoFit(ref, fitRef, shape);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setPlay(1);
      return;
    }

    el.classList.add('is-armed');
    let visible = false;
    let hovering = false;
    let phase: 'idle' | 'in' | 'out' = 'idle';
    let timer = 0;
    let raf = 0;

    const clear = () => window.clearTimeout(timer);
    const schedule = () => {
      clear();
      if (!visible || hovering) return;
      timer = window.setTimeout(exit, HOLD_MS);
    };
    const enter = () => {
      clear();
      el.classList.remove('is-in', 'is-out');
      void el.offsetWidth; // restart every CSS animation keyed to .is-in
      el.classList.add('is-in');
      phase = 'in';
      setPlay((p) => p + 1);
      schedule();
    };
    const exit = () => {
      if (!visible || hovering || document.hidden) return schedule();
      el.classList.add('is-out');
      phase = 'out';
      timer = window.setTimeout(enter, EXIT_MS);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) {
          if (phase === 'idle') enter();
          else if (phase === 'out') enter();
          else schedule();
        } else {
          clear();
          if (phase === 'out') {
            el.classList.remove('is-out');
            phase = 'in';
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);

    const onEnter = () => {
      hovering = true;
      clear();
      if (phase === 'out') enter();
      el.classList.add('is-hover');
    };
    const onLeave = () => {
      hovering = false;
      el.classList.remove('is-hover');
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
      schedule();
    };
    const onMove = (ev: PointerEvent) => {
      if (ev.pointerType !== 'mouse') return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width;
        const py = (ev.clientY - r.top) / r.height;
        el.style.setProperty('--mx', (px * 2 - 1).toFixed(3));
        el.style.setProperty('--my', (py * 2 - 1).toFixed(3));
        el.style.setProperty('--px', `${(px * 100).toFixed(1)}%`);
        el.style.setProperty('--py', `${(py * 100).toFixed(1)}%`);
      });
    };
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointermove', onMove);

    return () => {
      io.disconnect();
      clear();
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cx('fv', `fv--${shape}`, `fv--${look}`, look !== 'plain' && 'fv--rich')}
      data-tone={accent}
      role="img"
      aria-label={label}
    >
      <div className="fv__bg" aria-hidden="true">
        <span className="fv__aura" />
        <span className="fv__aura fv__aura--b" />
        <span className="fv__spot" />
      </div>
      <PlayContext.Provider value={play}>
        <div className="fv__canvas" aria-hidden="true">
          <div ref={fitRef} className="fv__fit">
            {children}
          </div>
        </div>
      </PlayContext.Provider>
    </div>
  );
}

/* ── Placement ─────────────────────────────────────────────────────────── */

type FloatProps = {
  /** Left edge, percent of stage width. */
  x: number;
  /** Top edge, percent of stage height. */
  y: number;
  /** Width, percent of stage width. Omit to size to content. */
  w?: number;
  /** Reveal order in steps of ~90ms (0, 1, 2, ...). */
  delay?: number;
  /** Kept for API compatibility; cards now sit square for a calmer layout. */
  rotate?: number;
  /** Gentle idle bob once revealed. */
  drift?: boolean;
  /** Stacking order. Higher layers also move further on hover parallax. */
  z?: number;
  /** Fade this element out toward an edge, so long lists dissolve instead of ending. */
  fade?: 'bottom' | 'right' | 'left' | 'x';
  className?: string;
  children: ReactNode;
};

/** Absolutely placed, reveal-animated wrapper. Every scene element sits in one. */
export function Float({ x, y, w, delay = 0, drift, z, fade, className, children }: FloatProps) {
  const depth = z ? Math.min(z, 5) * 0.5 + 0.5 : 0.6 + (delay % 4) * 0.35;
  const style = {
    left: `${x}%`,
    top: `${y}%`,
    width: w ? `${w}%` : undefined,
    zIndex: z,
    '--fv-d': `${delay * 85}ms`,
    '--fv-depth': depth.toFixed(2),
  } as CSSProperties;
  return (
    <div className={cx('fv-float', drift && 'fv-float--drift', fade && `fv-fade--${fade}`, className)} style={style}>
      <div className="fv-float__px">
        <div className="fv-float__in">{children}</div>
      </div>
    </div>
  );
}

/**
 * Connector lines behind the cards. Coordinates are percent of stage WIDTH on
 * both axes: the square stage is 100 x 100, the wide stage is 100 x 62.5.
 */
export function Wires({
  paths,
  shape = 'square',
  tone,
  flow = true,
}: {
  paths: string[];
  shape?: 'square' | 'wide';
  tone?: Tone;
  /** Animate a travelling pulse along each wire. */
  flow?: boolean;
}) {
  return (
    <svg
      className={cx('fv-wires', flow && 'fv-wires--flow')}
      data-tone={tone}
      viewBox={shape === 'wide' ? '0 0 100 62.5' : '0 0 100 100'}
      preserveAspectRatio="none"
    >
      {paths.map((d, i) => (
        <g key={i}>
          <path className="fv-wires__base" d={d} />
          <path className="fv-wires__dash" d={d} style={{ animationDelay: `${i * 0.45}s` }} />
        </g>
      ))}
    </svg>
  );
}

/* ── Surfaces ──────────────────────────────────────────────────────────── */

/** White product card. `title` renders a small header row with an optional icon. */
export function Panel({
  title,
  icon,
  tone,
  right,
  pad = true,
  glass,
  className,
  children,
}: {
  title?: string;
  icon?: IconType;
  tone?: Tone;
  right?: ReactNode;
  pad?: boolean;
  /** Frosted card for rich backdrops: translucent white, blurred, white text. */
  glass?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cx('fv-panel', !pad && 'fv-panel--flush', glass && 'fv-panel--glass', className)}>
      {title ? (
        <div className="fv-panel__head">
          {icon ? <IconTile icon={icon} tone={tone} size="sm" /> : null}
          <span className="fv-panel__title">{title}</span>
          {right ? <span className="fv-panel__right">{right}</span> : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}

/**
 * Icon in a squircle. Small and medium tiles are quiet (white, hairline, tinted
 * glyph); large, extra-large and pulsing tiles are the scene's focal point and
 * get the filled accent treatment.
 */
export function IconTile({
  icon: Icon,
  tone,
  size = 'md',
  pulse,
}: {
  icon: IconType;
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  pulse?: boolean;
}) {
  const solid = pulse || size === 'lg' || size === 'xl';
  return (
    <span
      className={cx('fv-icon', `fv-icon--${size}`, solid && 'fv-icon--solid', pulse && 'fv-icon--pulse')}
      data-tone={tone}
    >
      <Icon strokeWidth={solid ? 2 : 1.9} />
    </span>
  );
}

/** Small pill. `dot` adds a live status dot, `solid` makes it a dark pill. */
export function Chip({
  tone,
  icon: Icon,
  dot,
  solid,
  children,
}: {
  tone?: Tone;
  icon?: IconType;
  dot?: boolean;
  solid?: boolean;
  children: ReactNode;
}) {
  return (
    <span className={cx('fv-chip', solid && 'fv-chip--solid')} data-tone={tone}>
      {dot ? <i className="fv-chip__dot" /> : null}
      {Icon ? <Icon strokeWidth={2.2} /> : null}
      {children}
    </span>
  );
}

/** Flow/journey node: icon tile, title, one line of detail. */
export function Node({
  icon,
  tone,
  title,
  sub,
  active,
}: {
  icon: IconType;
  tone?: Tone;
  title: string;
  sub?: string;
  active?: boolean;
}) {
  return (
    <div className={cx('fv-node', active && 'fv-node--active')} data-tone={tone}>
      <IconTile icon={icon} tone={tone} size="md" />
      <span className="fv-node__text">
        <b>{title}</b>
        {sub ? <small>{sub}</small> : null}
      </span>
    </div>
  );
}

/** List row: leading avatar or icon, two lines, right slot. */
export function Row({
  lead,
  title,
  sub,
  right,
  active,
}: {
  lead?: ReactNode;
  title: string;
  sub?: string;
  right?: ReactNode;
  active?: boolean;
}) {
  return (
    <div className={cx('fv-row', active && 'fv-row--active')}>
      {lead}
      <span className="fv-row__text">
        <b>{title}</b>
        {sub ? <small>{sub}</small> : null}
      </span>
      {right ? <span className="fv-row__right">{right}</span> : null}
    </div>
  );
}

/** Initials avatar. */
export function Avatar({ name, tone }: { name: string; tone?: Tone }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <span className="fv-avatar" data-tone={tone}>
      {initials}
    </span>
  );
}

/* ── WhatsApp ──────────────────────────────────────────────────────────── */

export function Bubble({
  from = 'biz',
  time,
  read,
  buttons,
  media,
  children,
}: {
  from?: 'biz' | 'user';
  time?: string;
  read?: boolean;
  buttons?: string[];
  media?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={cx('fv-bubble', `fv-bubble--${from}`)}>
      {media ? <div className="fv-bubble__media">{media}</div> : null}
      <p>{children}</p>
      {time ? (
        <span className="fv-bubble__meta">
          {time}
          {from === 'biz' ? read ? <CheckCheck className="is-read" /> : <Check /> : null}
        </span>
      ) : null}
      {buttons?.length ? (
        <div className="fv-bubble__btns">
          {buttons.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** Three bouncing dots: the bot or agent is replying. */
export function Typing({ from = 'biz' }: { from?: 'biz' | 'user' }) {
  return (
    <div className={cx('fv-bubble', `fv-bubble--${from}`, 'fv-typing')}>
      <i />
      <i />
      <i />
    </div>
  );
}

/** Phone with a WhatsApp chat header. Children are the chat (Bubbles). */
export function Phone({ name = 'Your store', children }: { name?: string; children: ReactNode }) {
  return (
    <div className="fv-phone">
      <div className="fv-phone__screen">
        <div className="fv-phone__bar">
          <span className="fv-phone__dp">{name.slice(0, 1).toUpperCase()}</span>
          <span className="fv-phone__name">
            <b>{name}</b>
            <small>online</small>
          </span>
        </div>
        <div className="fv-phone__chat">{children}</div>
      </div>
    </div>
  );
}

export function Stack({ gap = 0.7, children }: { gap?: number; children: ReactNode }) {
  return (
    <div className="fv-stack" style={{ gap: `${gap}em` }}>
      {children}
    </div>
  );
}

/* ── Data ──────────────────────────────────────────────────────────────── */

const NUM_RE = /\d[\d,]*(?:\.\d+)?/;

/**
 * Counts the first number in `value` up from zero each time the stage plays,
 * keeping the original prefix, suffix, decimals and Indian digit grouping.
 */
function CountUp({ value }: { value: string }) {
  const play = useContext(PlayContext);
  const [text, setText] = useState(value);

  useEffect(() => {
    const m = value.match(NUM_RE);
    if (!m || play === 0) {
      setText(value);
      return;
    }
    const raw = m[0];
    const target = Number(raw.replace(/,/g, ''));
    const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
    const grouped = raw.includes(',');
    const fmt = (n: number) =>
      grouped
        ? n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals);
    const before = value.slice(0, m.index);
    const after = value.slice((m.index ?? 0) + raw.length);
    const start = performance.now();
    const dur = 1300;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 4);
      setText(before + fmt(target * eased) + after);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, value]);

  return <>{text}</>;
}

/** KPI block: label, big value (counts up), optional delta chip. */
export function Stat({
  label,
  value,
  delta,
  tone = 'emerald',
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: Tone;
}) {
  return (
    <div className="fv-stat">
      <small>{label}</small>
      <b>
        <CountUp value={value} />
      </b>
      {delta ? (
        <span className="fv-stat__delta" data-tone={tone}>
          {delta}
        </span>
      ) : null}
    </div>
  );
}

/** Bar chart. Values 0..100; `hi` is the index drawn in the accent. Bars grow in. */
export function Bars({
  values,
  hi,
  tone,
  height = 8,
}: {
  values: number[];
  hi?: number;
  tone?: Tone;
  height?: number;
}) {
  return (
    <div className="fv-bars" data-tone={tone} style={{ height: `${height}em` }}>
      {values.map((v, i) => (
        <i
          key={i}
          className={i === hi ? 'is-hi' : undefined}
          style={{ height: `${v}%`, animationDelay: `calc(var(--fv-d, 0ms) + ${220 + i * 55}ms)` }}
        />
      ))}
    </div>
  );
}

/** Area sparkline. Points 0..100 (higher is up). Wipes in left to right. */
export function Spark({
  points,
  tone,
  height = 7,
}: {
  points: number[];
  tone?: Tone;
  height?: number;
}) {
  const id = useRef(`fvs${Math.random().toString(36).slice(2, 8)}`).current;
  const step = 100 / (points.length - 1);
  const pts = points.map((p, i) => [i * step, 40 - (p / 100) * 34 - 3] as const);
  // Smooth the line with a Catmull-Rom to Bezier pass.
  let line = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    line += ` C ${c1[0].toFixed(2)} ${c1[1].toFixed(2)}, ${c2[0].toFixed(2)} ${c2[1].toFixed(2)}, ${p2[0]} ${p2[1]}`;
  }
  const last = pts[pts.length - 1];
  return (
    <svg
      className="fv-spark"
      data-tone={tone}
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      style={{ height: `${height}em` }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className="fv-spark__stop-a" />
          <stop offset="100%" className="fv-spark__stop-b" />
        </linearGradient>
      </defs>
      <path className="fv-spark__area" d={`${line} L 100 40 L 0 40 Z`} fill={`url(#${id})`} />
      <path className="fv-spark__line" d={line} />
      <circle className="fv-spark__dot" cx={last[0]} cy={last[1]} r="1.6" />
    </svg>
  );
}

/** Progress ring with a centred label. */
export function Donut({
  pct,
  tone,
  size = 9,
  children,
}: {
  pct: number;
  tone?: Tone;
  size?: number;
  children?: ReactNode;
}) {
  return (
    <div className="fv-donut" data-tone={tone} style={{ width: `${size}em`, height: `${size}em` }}>
      <svg viewBox="0 0 36 36">
        <circle className="fv-donut__track" cx="18" cy="18" r="15.5" />
        <circle
          className="fv-donut__val"
          cx="18"
          cy="18"
          r="15.5"
          pathLength={100}
          style={{ '--fv-pct': pct } as CSSProperties}
        />
      </svg>
      <span>{children ?? `${pct}%`}</span>
    </div>
  );
}

/** Horizontal meter with an optional label row. Fills in. */
export function Meter({
  pct,
  tone,
  label,
  value,
}: {
  pct: number;
  tone?: Tone;
  label?: string;
  value?: string;
}) {
  return (
    <div className="fv-meter" data-tone={tone}>
      {label ? (
        <span className="fv-meter__row">
          <small>{label}</small>
          {value ? <b>{value}</b> : null}
        </span>
      ) : null}
      <span className="fv-meter__track">
        <i style={{ width: `${pct}%` }} />
      </span>
    </div>
  );
}

/* ── Controls ──────────────────────────────────────────────────────────── */

export function Toggle({ on = true, tone = 'emerald' }: { on?: boolean; tone?: Tone }) {
  return <span className={cx('fv-toggle', on && 'is-on')} data-tone={tone} />;
}

export function Btn({
  tone,
  primary,
  icon: Icon,
  children,
}: {
  tone?: Tone;
  primary?: boolean;
  icon?: IconType;
  children: ReactNode;
}) {
  return (
    // A primary action is always the brand accent, whatever tone the scene asked for.
    <span className={cx('fv-btn', primary && 'fv-btn--primary')} data-tone={primary ? undefined : tone}>
      {Icon ? <Icon strokeWidth={2.2} /> : null}
      {children}
    </span>
  );
}

export function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="fv-field">
      <small>{label}</small>
      <span className={mono ? 'is-mono' : undefined}>{value}</span>
    </div>
  );
}

/** Pointer that glides in and "clicks". Place it over the thing being pressed. */
export function Cursor({ x, y, delay = 6 }: { x: number; y: number; delay?: number }) {
  return (
    <div
      className="fv-cursor"
      style={{ left: `${x}%`, top: `${y}%`, '--fv-d': `${delay * 85}ms` } as CSSProperties}
    >
      <svg viewBox="0 0 24 24">
        <path d="M5.5 3.2 18.6 10c.6.3.5 1.2-.1 1.4l-5.3 1.6-2.4 5.1c-.3.6-1.2.6-1.4-.1L5 4.1c-.2-.6.4-1.2.9-.9Z" />
      </svg>
      <span className="fv-cursor__ripple" />
    </div>
  );
}

/** Soft gradient block standing in for a product photo. */
export function Thumb({ tone, icon: Icon, h = 6 }: { tone?: Tone; icon?: IconType; h?: number }) {
  return (
    <span className="fv-thumb" data-tone={tone} style={{ height: `${h}em` }}>
      {Icon ? <Icon strokeWidth={1.6} /> : null}
    </span>
  );
}

/* ── Quiet illustration helpers (Graceview-style bento visuals) ────────── */

/**
 * Concentric hairline rings centred on (x, y) percent of the stage. Sits behind
 * a focal element to give it a sense of place without any pattern noise.
 */
export function Rings({ x = 50, y = 50, count = 4, gap = 8 }: { x?: number; y?: number; count?: number; gap?: number }) {
  return (
    <div className="fv-rings" style={{ left: `${x}%`, top: `${y}%` } as CSSProperties} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <i key={i} style={{ width: `${(i + 1) * gap}em`, height: `${(i + 1) * gap}em`, animationDelay: `${i * 0.6}s` }} />
      ))}
    </div>
  );
}

/** Soft accent glow puddle behind a focal element. */
export function Glow({ x = 50, y = 50, size = 18 }: { x?: number; y?: number; size?: number }) {
  return <div className="fv-glow" style={{ left: `${x}%`, top: `${y}%`, width: `${size}em`, height: `${size}em` }} aria-hidden="true" />;
}
