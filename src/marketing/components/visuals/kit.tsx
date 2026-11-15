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
 * 1em is about 10px at the size the page shows it, so type at 1.1em to 1.4em
 * reads like real UI. Position children with <Float x y w> in PERCENT of the
 * stage; size everything inside in em. See scenes/flow-builder.tsx.
 */
import {
  useEffect,
  useRef,
  type CSSProperties,
  type ComponentType,
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

const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ');

/* ── Stage ─────────────────────────────────────────────────────────────── */

type StageProps = SceneProps & {
  tone?: Tone;
  /** 'square' for bento tiles, 'wide' for showcases and heroes. */
  shape?: 'square' | 'wide';
  /** Show the faint dot grid (canvas-style scenes). */
  grid?: boolean;
  children: ReactNode;
};

/**
 * The gradient backdrop plus the in-view trigger. Children stay hidden until the
 * stage scrolls into view, then rise in on their own delays. With reduced motion
 * (or no IntersectionObserver) everything is simply visible.
 */
export function Stage({ tone = 'violet', shape = 'square', grid, label, children }: StageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    el.classList.add('is-armed');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add('is-in');
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cx('fv', `fv--${shape}`, grid && 'fv--grid')}
      data-tone={tone}
      role="img"
      aria-label={label}
    >
      <div className="fv__bg" aria-hidden="true">
        <span className="fv__orb fv__orb--a" />
        <span className="fv__orb fv__orb--b" />
        <span className="fv__orb fv__orb--c" />
      </div>
      <div className="fv__canvas" aria-hidden="true">
        {children}
      </div>
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
  /** Degrees of tilt. Keep within -4..4. */
  rotate?: number;
  /** Gentle idle bob once revealed. */
  drift?: boolean;
  z?: number;
  className?: string;
  children: ReactNode;
};

/** Absolutely placed, reveal-animated wrapper. Every scene element sits in one. */
export function Float({ x, y, w, delay = 0, rotate, drift, z, className, children }: FloatProps) {
  const style = {
    left: `${x}%`,
    top: `${y}%`,
    width: w ? `${w}%` : undefined,
    zIndex: z,
    '--fv-d': `${delay * 90}ms`,
    '--fv-r': rotate ? `${rotate}deg` : undefined,
  } as CSSProperties;
  return (
    <div className={cx('fv-float', drift && 'fv-float--drift', className)} style={style}>
      <div className="fv-float__in">{children}</div>
    </div>
  );
}

/**
 * Connector lines behind the cards. Coordinates are percent of stage WIDTH on
 * both axes: the square stage is 100 x 100, the wide stage is 100 x 62.5.
 * Each path is an SVG path string, e.g. "M 20 30 C 35 30, 35 50, 50 50".
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
  /** Animate a travelling dash along each wire. */
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
          <path className="fv-wires__dash" d={d} style={{ animationDelay: `${i * 0.35}s` }} />
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
  tone = 'violet',
  right,
  pad = true,
  className,
  children,
}: {
  title?: string;
  icon?: IconType;
  tone?: Tone;
  /** Header right slot (a Chip, a Toggle, a count). */
  right?: ReactNode;
  pad?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cx('fv-panel', !pad && 'fv-panel--flush', className)}>
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

/** Glossy gradient icon tile. The "realistic icon" of the system. */
export function IconTile({
  icon: Icon,
  tone = 'violet',
  size = 'md',
  pulse,
}: {
  icon: IconType;
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Soft ring pulse, for the one element the scene is about. */
  pulse?: boolean;
}) {
  return (
    <span className={cx('fv-icon', `fv-icon--${size}`, pulse && 'fv-icon--pulse')} data-tone={tone}>
      <Icon strokeWidth={2.2} />
    </span>
  );
}

/** Small pill. `dot` adds a status dot, `solid` fills it. */
export function Chip({
  tone = 'violet',
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
      {Icon ? <Icon strokeWidth={2.4} /> : null}
      {children}
    </span>
  );
}

/** Flow/journey node: icon tile, title, one line of detail. */
export function Node({
  icon,
  tone = 'violet',
  title,
  sub,
  active,
}: {
  icon: IconType;
  tone?: Tone;
  title: string;
  sub?: string;
  /** Highlight ring: the step currently running. */
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

/** Initials avatar on a soft gradient. */
export function Avatar({ name, tone = 'violet' }: { name: string; tone?: Tone }) {
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

/**
 * WhatsApp message bubble. `from="biz"` is the store (green, right), "user" is
 * the shopper (white, left). `buttons` renders quick-reply rows under the text,
 * `media` a header block (pass a gradient thumbnail or icon).
 */
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
          {from === 'biz' ? read ? <CheckCheck /> : <Check /> : null}
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

/** Phone body with a WhatsApp chat header. Children are the chat (Bubbles). */
export function Phone({ name = 'Your store', children }: { name?: string; children: ReactNode }) {
  return (
    <div className="fv-phone">
      <div className="fv-phone__bar">
        <span className="fv-phone__dp" />
        <span className="fv-phone__name">
          <b>{name}</b>
          <small>Business account</small>
        </span>
      </div>
      <div className="fv-phone__chat">{children}</div>
    </div>
  );
}

/** Vertical stack with a gap, for bubbles and rows. */
export function Stack({ gap = 0.7, children }: { gap?: number; children: ReactNode }) {
  return (
    <div className="fv-stack" style={{ gap: `${gap}em` }}>
      {children}
    </div>
  );
}

/* ── Data ──────────────────────────────────────────────────────────────── */

/** KPI block: label, big value, optional delta chip. */
export function Stat({
  label,
  value,
  delta,
  tone = 'emerald',
}: {
  label: string;
  value: string;
  /** e.g. "+18%". Rendered in `tone`. */
  delta?: string;
  tone?: Tone;
}) {
  return (
    <div className="fv-stat">
      <small>{label}</small>
      <b>{value}</b>
      {delta ? (
        <span className="fv-stat__delta" data-tone={tone}>
          {delta}
        </span>
      ) : null}
    </div>
  );
}

/** Bar chart. Values 0..100; `hi` is the index drawn in full tone. Bars grow in. */
export function Bars({
  values,
  hi,
  tone = 'violet',
  height = 8,
}: {
  values: number[];
  hi?: number;
  tone?: Tone;
  /** Chart height in em. */
  height?: number;
}) {
  return (
    <div className="fv-bars" data-tone={tone} style={{ height: `${height}em` }}>
      {values.map((v, i) => (
        <i
          key={i}
          className={i === hi ? 'is-hi' : undefined}
          style={{ height: `${v}%`, animationDelay: `calc(var(--fv-d, 0ms) + ${200 + i * 60}ms)` }}
        />
      ))}
    </div>
  );
}

/** Area sparkline. Points 0..100 (higher is up). Draws itself in. */
export function Spark({
  points,
  tone = 'violet',
  height = 7,
}: {
  points: number[];
  tone?: Tone;
  height?: number;
}) {
  const step = 100 / (points.length - 1);
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${40 - (p / 100) * 36 - 2}`).join(' ');
  return (
    <svg
      className="fv-spark"
      data-tone={tone}
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      style={{ height: `${height}em` }}
    >
      <path className="fv-spark__area" d={`${line} L 100 40 L 0 40 Z`} />
      <path className="fv-spark__line" d={line} />
    </svg>
  );
}

/** Progress ring with a centred label. */
export function Donut({
  pct,
  tone = 'violet',
  size = 9,
  children,
}: {
  pct: number;
  tone?: Tone;
  /** Diameter in em. */
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
  tone = 'violet',
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

/** Button-shaped label. `primary` fills it with the tone. */
export function Btn({
  tone = 'violet',
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
    <span className={cx('fv-btn', primary && 'fv-btn--primary')} data-tone={tone}>
      {Icon ? <Icon strokeWidth={2.4} /> : null}
      {children}
    </span>
  );
}

/** Text field mock: label over a value. */
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
      style={{ left: `${x}%`, top: `${y}%`, '--fv-d': `${delay * 90}ms` } as CSSProperties}
    >
      <svg viewBox="0 0 24 24">
        <path d="M5 3l14 7.5-6.2 1.8L10.5 19z" />
      </svg>
    </div>
  );
}

/** Soft gradient block standing in for a product photo. */
export function Thumb({ tone = 'violet', icon: Icon, h = 6 }: { tone?: Tone; icon?: IconType; h?: number }) {
  return (
    <span className="fv-thumb" data-tone={tone} style={{ height: `${h}em` }}>
      {Icon ? <Icon strokeWidth={1.8} /> : null}
    </span>
  );
}
