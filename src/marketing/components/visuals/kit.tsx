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
import {
  BadgeCheck,
  Check,
  CheckCheck,
  ChevronLeft,
  Lock,
  Mic,
  Phone as PhoneIcon,
  Plus,
  Video,
} from './icons';
import { SiWhatsapp } from 'react-icons/si';
import '../../styles/aurora.css';
import '../../styles/feature-visuals.css';
import '../../styles/feature-scenes.css';

export type Tone = 'violet' | 'emerald' | 'sky' | 'amber' | 'rose' | 'indigo' | 'slate';
export type IconType = ComponentType<{ strokeWidth?: number; className?: string }>;

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
/** The enclosing Float's entrance time in ms, so timed children can wait for it. */
const AtContext = createContext(0);
/**
 * Page-level aurora palette for rich (wide) stages (see styles/aurora.css),
 * so every panel on a page shares the hero's light but each composes it differently.
 */
export const MeshContext = createContext<string | undefined>(undefined);
/**
 * Position of the card this stage sits in on the page (bento tiles first,
 * then showcase rows). Each position gets its own palette and pattern, so
 * neighbouring cards never share a background. Undefined for the hero.
 */
export const SceneSlotContext = createContext<number | undefined>(undefined);

/** Aurora palettes (styles/aurora.css), ordered so a stride of 5 spreads hue. */
const PALETTES = ['iris', 'bloom', 'dawn', 'lagoon', 'orchid', 'mint', 'dusk', 'sunrise', 'coral', 'ocean', 'lime', 'rose'];
/** Background patterns (styles/feature-visuals.css), one per card in turn. */
const PATTERNS = ['dots', 'beams', 'grid', 'rings', 'lines', 'mesh'];

const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ');

/** How long a fully revealed scene holds before it replays, and the exit time. */
const HOLD_MS = 8200;
const EXIT_MS = 650;

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
  /**
   * Seconds the scene plays before it settles out and replays (default 8.2).
   * Set it to cover the last `at` / `until` in a storytelling scene plus ~2s.
   */
  duration?: number;
  /**
   * Auto-framing (default true). Turn off for compositions that are meant to
   * bleed off an edge, such as a phone rising from the bottom of a tile.
   */
  fit?: boolean;
  /** Layer behind the cards that is not auto-framed (Fireworks, for one). */
  back?: ReactNode;
  /**
   * The journey, told in captions: [seconds, label] pairs. A caption bar at
   * the bottom of the stage names the step on screen and fills a progress
   * dot per step, so a viewer always knows where in the story they are.
   */
  steps?: [number, string][];
  children: ReactNode;
};

export type Mood = 'plain' | 'violet' | 'ocean' | 'dusk' | 'night';
const MOODS: Mood[] = ['violet', 'ocean', 'dusk'];
const hash = (t: string) => [...t].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/** Breathing room around auto-framed content, as a fraction of each side. */
const FIT_PAD = { square: 0.08, wide: 0.07 } as const;
/**
 * Maximum zoom. Kept close to 1 so product UI reads at real size (about 12px
 * body text) instead of being blown up into cartoon scale.
 */
const FIT_MAX = { square: 1.22, wide: 1.45 } as const;
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Auto-framing. Measures every top-level Float and every attached satellite
 * (in layer space, while the scene is fully laid out and before animations
 * arm), then centres and scales the layer so the whole composition sits in
 * the frame with even margins. Wires live in the same layer, so they stay put.
 */
function useAutoFit(
  stageRef: RefObject<HTMLDivElement>,
  fitRef: RefObject<HTMLDivElement>,
  shape: 'square' | 'wide',
  enabled = true,
  /** Extra room kept free at the bottom (fraction of height), e.g. for step captions. */
  bottom = 0,
) {
  useIsoLayoutEffect(() => {
    const stage = stageRef.current;
    const fit = fitRef.current;
    if (!stage || !fit || !enabled) return;

    // Proportions of the content box, measured while the scene is fully laid
    // out. Once armed, reveals are collapsed and typed text is empty, so
    // resizes reuse these proportions instead of re-measuring.
    let frac: [number, number, number, number] | null = null;

    const apply = (W: number, H: number) => {
      if (!frac) return;
      const [fx0, fy0, fw, fh] = frac;
      // Phones: less margin and a higher zoom ceiling, so product UI reads
      // instead of shrinking to a thumbnail.
      const narrow = W < 560;
      const pad = narrow ? 0.035 : FIT_PAD[shape];
      const max = FIT_MAX[shape] * (narrow ? 1.4 : 1);
      const bw = fw * W;
      const bh = fh * H;
      const availH = H * (1 - 2 * pad - bottom);
      const s = Math.min((W * (1 - 2 * pad)) / bw, availH / bh, max);
      const tx = (W - bw * s) / 2 - fx0 * W * s;
      const ty = H * pad + (availH - bh * s) / 2 - fy0 * H * s;
      fit.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${s.toFixed(4)})`;
    };

    const measure = () => {
      const W = fit.offsetWidth;
      const H = fit.offsetHeight;
      if (!W || !H) return;
      if (frac && stage.classList.contains('is-armed')) {
        apply(W, H);
        return;
      }
      const fr = fit.getBoundingClientRect();
      const k = fr.width / W || 1;
      let x0 = Infinity;
      let y0 = Infinity;
      let x1 = -Infinity;
      let y1 = -Infinity;
      const add = (el: Element) => {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        x0 = Math.min(x0, (r.left - fr.left) / k);
        y0 = Math.min(y0, (r.top - fr.top) / k);
        x1 = Math.max(x1, (r.right - fr.left) / k);
        y1 = Math.max(y1, (r.bottom - fr.top) / k);
      };
      fit.querySelectorAll('.fv-float').forEach((el) => {
        if (el.parentElement?.closest('.fv-float')) return;
        add(el);
        el.querySelectorAll('.fv-float__in > *, .fv-attach').forEach(add);
      });
      if (!Number.isFinite(x0)) return;
      frac = [x0 / W, y0 / H, (x1 - x0) / W, (y1 - y0) / H];
      apply(W, H);
    };

    measure();
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    ro?.observe(stage);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => ro?.disconnect();
  }, [shape, enabled, bottom]);
}

export function Stage({ tone, shape = 'square', mood, duration, fit = true, back, steps, label, children }: StageProps) {
  const mesh = useContext(MeshContext);
  const holdMs = Math.max(4000, (duration ?? HOLD_MS / 1000) * 1000);
  const look: Mood = mood ?? (shape === 'square' ? 'plain' : MOODS[hash(label) % MOODS.length]);
  const accent = useContext(AccentContext) ?? tone ?? 'violet';
  const ref = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(0);
  useAutoFit(ref, fitRef, shape, fit, steps?.length ? 0.1 : 0);

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

    const clear = () => window.clearTimeout(timer);
    const schedule = () => {
      clear();
      if (!visible || hovering) return;
      timer = window.setTimeout(exit, holdMs);
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
      schedule();
    };
    // Hovering pauses the loop on the frame someone is reading.
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      io.disconnect();
      clear();
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [holdMs]);

  // Every stage takes the page aurora. Square tiles use a top-lit composition
  // (variants 0 and 1) because the CSS fades them into the card body below.
  const slot = useContext(SceneSlotContext);
  const base = Math.max(0, PALETTES.indexOf(mesh ?? 'iris'));
  const aurora =
    look === 'night' ? undefined : slot === undefined ? mesh : PALETTES[(base + 1 + slot * 5) % PALETTES.length];
  const variant =
    slot === undefined
      ? shape === 'square'
        ? hash(label) % 2
        : hash(label) % 4
      : shape === 'square'
        ? [0, 4, 1][slot % 3]
        : slot % 4;
  const pattern = look === 'night' ? undefined : PATTERNS[((slot ?? hash(label)) + base) % PATTERNS.length];

  return (
    <div
      ref={ref}
      className={cx('fv', `fv--${shape}`, `fv--${look}`)}
      data-tone={accent}
      role="img"
      aria-label={label}
    >
      <div className="fv__bg" aria-hidden="true">
        {aurora ? <div className="aurora" data-palette={aurora} data-variant={variant} /> : null}
        {pattern ? <div className="fv__pattern" data-pattern={pattern} data-corner={(slot ?? 0) % 4} /> : null}
      </div>
      <PlayContext.Provider value={play}>
        <div className="fv__canvas" aria-hidden="true">
          {back}
          <div ref={fitRef} className="fv__fit">
            {children}
          </div>
          {steps?.length ? <Steps steps={steps} /> : null}
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
  /** Seconds from scene start when this enters (overrides `delay`). */
  at?: number;
  /** Seconds from scene start when this leaves. Pair with a second Float to swap states. */
  until?: number;
  className?: string;
  children: ReactNode;
};

/** Absolutely placed, reveal-animated wrapper. Every scene element sits in one. */
export function Float({ x, y, w, delay = 0, at, until, drift, z, fade, className, children }: FloatProps) {
  const enterMs = at !== undefined ? at * 1000 : delay * 90;
  const style = {
    left: `${x}%`,
    top: `${y}%`,
    width: w ? `${w}%` : undefined,
    zIndex: z,
    '--fv-d': `${enterMs}ms`,
    '--fv-until': until !== undefined ? `${until * 1000}ms` : undefined,
  } as CSSProperties;
  return (
    <div
      className={cx('fv-float', drift && 'fv-float--drift', until !== undefined && 'fv-float--until', fade && `fv-fade--${fade}`, className)}
      style={style}
    >
      <div className="fv-float__px">
        <AtContext.Provider value={enterMs}>
          <div className="fv-float__in">{children}</div>
        </AtContext.Provider>
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
  tint,
}: {
  icon: IconType;
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  pulse?: boolean;
  /** Soft tinted tile (for toasts and status icons). */
  tint?: boolean;
}) {
  const solid = !tint && (pulse || size === 'lg' || size === 'xl');
  return (
    <span
      className={cx('fv-icon', `fv-icon--${size}`, solid && 'fv-icon--solid', tint && 'fv-icon--tint', pulse && 'fv-icon--pulse')}
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

const AVATAR_HUES = [12, 32, 152, 199, 222, 262, 330, 172];

/** Initials avatar. Each name gets its own soft hue, like a real customer list. */
export function Avatar({ name, tone }: { name: string; tone?: Tone }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const h = AVATAR_HUES[hash(name) % AVATAR_HUES.length];
  return (
    <span
      className="fv-avatar"
      data-tone={tone}
      data-hue={tone ? undefined : ''}
      style={tone ? undefined : ({ '--h': h } as CSSProperties)}
    >
      {initials}
    </span>
  );
}

/* ── WhatsApp ──────────────────────────────────────────────────────────── */

/** A WhatsApp quick-reply or CTA button under a bubble. `at` presses it. */
export type BubbleButton = string | { label: string; icon?: IconType; at?: number; cursor?: string };

export function Bubble({
  from = 'biz',
  time,
  read,
  buttons,
  media,
  title,
  footer,
  children,
}: {
  from?: 'biz' | 'user';
  time?: string;
  read?: boolean;
  buttons?: BubbleButton[];
  media?: ReactNode;
  /** Bold first line, as WhatsApp template headers render. */
  title?: string;
  /** Small grey line under the body (template footer). */
  footer?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx('fv-bubble', `fv-bubble--${from}`, Boolean(media) && 'fv-bubble--media')}>
      {media ? <div className="fv-bubble__media">{media}</div> : null}
      {title ? <b className="fv-bubble__title">{title}</b> : null}
      <p>{children}</p>
      {footer ? <small className="fv-bubble__footer">{footer}</small> : null}
      {time ? (
        <span className="fv-bubble__meta">
          {time}
          {from === 'biz' ? read ? <CheckCheck className="is-read" /> : <Check /> : null}
        </span>
      ) : null}
      {buttons?.length ? (
        <div className="fv-bubble__btns">
          {buttons.map((b) => {
            const o = typeof b === 'string' ? { label: b } : b;
            const Icon = o.icon;
            return (
              <span
                key={o.label}
                data-cursor={o.cursor}
                className={o.at !== undefined ? 'is-press' : undefined}
                style={o.at !== undefined ? ({ '--fv-press': `${o.at}s` } as CSSProperties) : undefined}
              >
                {Icon ? <Icon strokeWidth={2.2} /> : null}
                {o.label}
              </span>
            );
          })}
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
  const wait = useContext(AtContext) + 250;
  const [text, setText] = useState(value);

  useEffect(() => {
    const m = value.match(NUM_RE);
    if (!m || play === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
    let start = 0;
    const dur = 1300;
    let raf = 0;
    setText(before + fmt(0) + after);
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 4);
      setText(before + fmt(target * eased) + after);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    const kick = window.setTimeout(() => {
      start = performance.now();
      raf = requestAnimationFrame(tick);
    }, wait);
    return () => {
      window.clearTimeout(kick);
      cancelAnimationFrame(raf);
    };
  }, [play, value, wait]);

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
  pressAt,
  children,
}: {
  tone?: Tone;
  primary?: boolean;
  icon?: IconType;
  /** Seconds from scene start when the button is pressed (scale dip and ripple). */
  pressAt?: number;
  children: ReactNode;
}) {
  return (
    // A primary action is always the brand accent, whatever tone the scene asked for.
    <span
      className={cx('fv-btn', primary && 'fv-btn--primary', pressAt !== undefined && 'fv-btn--press')}
      data-tone={primary ? undefined : tone}
      style={pressAt !== undefined ? ({ '--fv-press': `${pressAt}s` } as CSSProperties) : undefined}
    >
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

/**
 * Pointer. Two modes:
 *   - `x`, `y` (+ `delay`): glides in to that spot and clicks, on a loop.
 *   - `path`: [[x, y, t], ...] in stage percent and seconds from scene start,
 *     with `clicks` (seconds) where it presses. Runs once per scene play, so it
 *     can walk through a story: hover a button, click, move to the next thing.
 */
export function Cursor({
  x = 50,
  y = 50,
  delay = 6,
  path,
  clicks = [],
  touch,
}: {
  x?: number;
  y?: number;
  delay?: number;
  /**
   * Waypoints: [x, y, t] in stage percent, or [name, t] to aim at the element
   * marked data-cursor="name" (resolved from the real layout at play time,
   * so clicks land exactly whatever the auto-framing does).
   */
  path?: ([number, number, number] | [string, number])[];
  clicks?: number[];
  /** A fingertip instead of an arrow, for taps on a phone screen. */
  touch?: boolean;
}) {
  const play = useContext(PlayContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !path?.length || play === 0 || typeof el.animate !== 'function') return;
    const layer = el.parentElement;
    const resolve = (name: string): [number, number] => {
      const target = layer?.querySelector<HTMLElement>(`[data-cursor="${name}"]`);
      if (!layer || !target) return [50, 50];
      let x = 0;
      let y = 0;
      let n: HTMLElement | null = target;
      while (n && n !== layer) {
        x += n.offsetLeft;
        y += n.offsetTop;
        n = n.offsetParent as HTMLElement | null;
      }
      return [
        ((x + target.offsetWidth * 0.5) / layer.offsetWidth) * 100,
        ((y + target.offsetHeight * 0.6) / layer.offsetHeight) * 100,
      ];
    };
    const pts: [number, number, number][] = path.map((p) =>
      typeof p[0] === 'string' ? [...resolve(p[0]), p[1] as number] : (p as [number, number, number]),
    );
    const end = pts[pts.length - 1][2] + 0.6;
    const total = end * 1000;
    const frames: Keyframe[] = [];
    const first = pts[0];
    // Hidden until just before the first waypoint, then fades in on the way.
    frames.push({ left: `${first[0]}%`, top: `${first[1]}%`, opacity: 0, offset: 0 });
    const lead = Math.max(0, first[2] - 0.35) * 1000;
    if (lead > 0) frames.push({ left: `${first[0]}%`, top: `${first[1]}%`, opacity: 0, offset: lead / total });
    pts.forEach(([px, py, t]) => {
      frames.push({
        left: `${px}%`,
        top: `${py}%`,
        opacity: 1,
        offset: Math.min(0.999, (t * 1000) / total),
        easing: 'cubic-bezier(0.45, 0, 0.2, 1)',
      });
    });
    const lastP = pts[pts.length - 1];
    frames.push({ left: `${lastP[0]}%`, top: `${lastP[1]}%`, opacity: 0, offset: 1 });
    frames.sort((a, b) => (a.offset as number) - (b.offset as number));
    const anims: Animation[] = [el.animate(frames, { duration: total, fill: 'forwards' })];
    const svg = el.querySelector('svg');
    const ripple = el.querySelector<HTMLElement>('.fv-cursor__ripple');
    clicks.forEach((c) => {
      if (svg) {
        anims.push(
          svg.animate([{ transform: 'scale(1)' }, { transform: 'scale(0.82)' }, { transform: 'scale(1)' }], {
            duration: 260,
            delay: c * 1000,
            easing: 'ease-out',
          }),
        );
      }
      if (ripple) {
        anims.push(
          ripple.animate(
            [
              { opacity: 0.9, transform: 'scale(0.4)' },
              { opacity: 0, transform: 'scale(2.4)' },
            ],
            { duration: 650, delay: c * 1000, easing: 'ease-out' },
          ),
        );
      }
    });
    return () => anims.forEach((a) => a.cancel());
    // path and clicks are literals in each scene; replaying on `play` is the point.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  if (path?.length) {
    return (
      <div
        ref={ref}
        className={cx('fv-cursor fv-cursor--path', touch && 'fv-cursor--touch')}
        style={{ left: '50%', top: '90%', opacity: 0 }}
      >
        <svg viewBox="0 0 24 24">
          <path d="M4.2 1.6v18.2l4.35-4.15 2.85 6.55 3.1-1.35-2.8-6.45h6.1Z" />
        </svg>
        <span className="fv-cursor__ripple" />
      </div>
    );
  }

  return (
    <div
      className="fv-cursor"
      style={{ left: `${x}%`, top: `${y}%`, '--fv-d': `${delay * 85}ms` } as CSSProperties}
    >
      <svg viewBox="0 0 24 24">
        <path d="M4.2 1.6v18.2l4.35-4.15 2.85 6.55 3.1-1.35-2.8-6.45h6.1Z" />
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

/** Retired (read as generic AI art). Kept as no-ops so old markup compiles. */
export function Rings(_: { x?: number; y?: number; count?: number; gap?: number }) {
  return null;
}
export function Glow(_: { x?: number; y?: number; size?: number }) {
  return null;
}

/* ── Storytelling pieces ───────────────────────────────────────────────── */

/**
 * Text that types itself out, starting `at` seconds into the scene (or when its
 * Float enters). Use inside a Bubble, Field value or anywhere inline.
 */
export function TypeText({ text, at, cps = 22 }: { text: string; at?: number; cps?: number }) {
  const play = useContext(PlayContext);
  const floatAt = useContext(AtContext);
  const [n, setN] = useState(text.length);

  useEffect(() => {
    if (play === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(text.length);
      return;
    }
    setN(0);
    const startMs = at !== undefined ? at * 1000 : floatAt + 350;
    let i = 0;
    let iv = 0;
    const kick = window.setTimeout(() => {
      iv = window.setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) window.clearInterval(iv);
      }, 1000 / cps);
    }, startMs);
    return () => {
      window.clearTimeout(kick);
      window.clearInterval(iv);
    };
  }, [play, text, at, floatAt, cps]);

  return (
    <span className="fv-type">
      <span className="fv-type__ghost" aria-hidden="true">
        {text}
      </span>
      <span className="fv-type__live">
        {text.slice(0, n)}
        {n < text.length ? <i className="fv-type__caret" /> : null}
      </span>
    </span>
  );
}

/**
 * Prize wheel that spins and lands on `land` (slice index), starting `at`
 * seconds into the scene. Slices alternate brand shades; label text is short.
 */
export function SpinWheel({
  slices,
  land = 0,
  at = 1.5,
  spin = 3.4,
  size = 18,
}: {
  slices: string[];
  land?: number;
  at?: number;
  /** Seconds the spin takes to settle. */
  spin?: number;
  /** Diameter in em. */
  size?: number;
}) {
  const n = slices.length;
  const seg = 360 / n;
  const shades = ['var(--t-600)', 'var(--t-100)', 'var(--t-400)', '#ffffff', 'var(--t-700)', 'var(--t-200)'];
  const stops = slices
    .map((_, i) => `${shades[i % shades.length]} ${i * seg}deg ${(i + 1) * seg}deg`)
    .join(', ');
  // Land the middle of slice `land` under the top pointer after 5 full turns.
  const final = 360 * 5 + (360 - (land * seg + seg / 2));
  return (
    <div className="fv-wheel" style={{ width: `${size}em`, height: `${size}em` } as CSSProperties}>
      <span className="fv-wheel__pointer" />
      <div
        className="fv-wheel__disc"
        style={
          {
            background: `conic-gradient(${stops})`,
            '--fv-spin-to': `${final}deg`,
            '--fv-spin-at': `${at}s`,
            '--fv-spin-dur': `${spin}s`,
          } as CSSProperties
        }
      >
        {slices.map((label, i) => (
          <span
            key={label + i}
            className={cx('fv-wheel__label', [0, 2, 4].includes(i % shades.length) && 'is-dark')}
            style={{
              transform: `rotate(${i * seg + seg / 2}deg) translateY(-${size * 0.32}em)${
                i * seg + seg / 2 > 90 && i * seg + seg / 2 < 270 ? ' rotate(180deg)' : ''
              }`,
            }}
          >
            {label}
          </span>
        ))}
      </div>
      <span className="fv-wheel__hub" />
    </div>
  );
}

/** Discount coupon: ticket with notches, big value, code and a copy button. */
export function Coupon({
  value,
  label,
  code,
  copyAt,
}: {
  value: string;
  label?: string;
  code: string;
  /** Seconds from scene start when "Copy" is pressed. */
  copyAt?: number;
}) {
  return (
    <div className="fv-coupon">
      <div className="fv-coupon__main">
        <b>{value}</b>
        {label ? <small>{label}</small> : null}
      </div>
      <div className="fv-coupon__stub">
        <code>{code}</code>
        <Btn primary pressAt={copyAt}>
          Copy
        </Btn>
      </div>
    </div>
  );
}

/**
 * Scratch card: a foil layer that wipes away at `at` seconds, revealing
 * `children` (usually a value and a code).
 */
export function Scratch({ at = 1.6, children }: { at?: number; children: ReactNode }) {
  return (
    <div className="fv-scratch" style={{ '--fv-scratch-at': `${at}s` } as CSSProperties}>
      <div className="fv-scratch__reveal">{children}</div>
      <div className="fv-scratch__foil">
        <span>Scratch to reveal</span>
      </div>
    </div>
  );
}

/** A small celebratory burst at (x, y) percent, `at` seconds into the scene. */
export function Burst({ x, y, at = 2 }: { x: number; y: number; at?: number }) {
  return (
    <div className="fv-burst" style={{ left: `${x}%`, top: `${y}%`, '--fv-burst-at': `${at}s` } as CSSProperties} aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => (
        <i key={i} style={{ '--a': `${(i * 360) / 14}deg`, '--r': `${5 + (i % 3) * 1.6}em` } as CSSProperties} />
      ))}
    </div>
  );
}

/**
 * Timed reveal for content INSIDE a card (chat bubbles in a Phone, rows filling
 * a list). Same `at` / `until` model as Float, but stays in normal flow, so a
 * list grows and a chat scrolls naturally. Collapses its height until it enters.
 */
export function Reveal({ at, until, children }: { at: number; until?: number; children: ReactNode }) {
  return (
    <AtContext.Provider value={at * 1000}>
      <div
        className={cx('fv-reveal', until !== undefined && 'fv-reveal--until')}
        style={{ '--fv-r-at': `${at}s`, '--fv-r-until': until !== undefined ? `${until}s` : undefined } as CSSProperties}
      >
        {children}
      </div>
    </AtContext.Provider>
  );
}

/* ── v7 composition pieces ─────────────────────────────────────────────── */

type Place = 'tr' | 'tl' | 'br' | 'bl' | 't' | 'b' | 'l' | 'r';

/**
 * A satellite pinned to the edge of the card it sits in (put it inside a
 * Panel, IPhone or any positioned card). It pops from its anchor at `at`
 * seconds and can leave at `until`. `dx` / `dy` (em) nudge it outward.
 */
export function Attach({
  place = 'tr',
  at = 0,
  until,
  dx,
  dy,
  children,
}: {
  place?: Place;
  at?: number;
  until?: number;
  dx?: number;
  dy?: number;
  children: ReactNode;
}) {
  return (
    <AtContext.Provider value={at * 1000}>
      <div
        className={cx('fv-attach', until !== undefined && 'fv-attach--until')}
        data-place={place}
        style={
          {
            '--fv-d': `${at * 1000}ms`,
            '--fv-until': until !== undefined ? `${until * 1000}ms` : undefined,
            '--fv-dx': dx !== undefined ? `${dx}em` : undefined,
            '--fv-dy': dy !== undefined ? `${dy}em` : undefined,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </AtContext.Provider>
  );
}

/** Notification card: icon, title, one line. The standard satellite. */
export function Toast({
  icon,
  tone,
  title,
  sub,
  dark,
  right,
}: {
  icon?: IconType;
  tone?: Tone;
  title: ReactNode;
  sub?: ReactNode;
  dark?: boolean;
  right?: ReactNode;
}) {
  return (
    <div className={cx('fv-toast', dark && 'fv-toast--dark')} data-tone={tone}>
      {icon ? <IconTile icon={icon} tone={tone} size="sm" tint /> : null}
      <span className="fv-toast__text">
        <b>{title}</b>
        {sub ? <small>{sub}</small> : null}
      </span>
      {right ? <span className="fv-toast__right">{right}</span> : null}
    </div>
  );
}

/** Two states of the same spot: `a` cross-fades to `b` at `at` seconds. */
export function Swap({ at, a, b }: { at: number; a: ReactNode; b: ReactNode }) {
  return (
    <span className="fv-swap" style={{ '--fv-swap-at': `${at}s` } as CSSProperties}>
      <span className="fv-swap__a">{a}</span>
      <span className="fv-swap__b">{b}</span>
    </span>
  );
}

/** Small uppercase section label inside a card. */
export function Label({ children }: { children: ReactNode }) {
  return <span className="fv-label">{children}</span>;
}

/** Key / value line inside a card. `total` draws the summing rule above it. */
export function KV({ k, v, total, tone }: { k: ReactNode; v: ReactNode; total?: boolean; tone?: Tone }) {
  return (
    <div className={cx('fv-kv', total && 'fv-kv--total')} data-tone={tone}>
      <span>{k}</span>
      <b>{typeof v === 'string' ? <CountUp value={v} /> : v}</b>
    </div>
  );
}

/* ── iPhone + WhatsApp ─────────────────────────────────────────────────── */

/**
 * iPhone with a WhatsApp Business chat open. Children are the conversation
 * (Bubbles in Reveals); the chat is bottom-anchored, so new messages push the
 * older ones up exactly like the app. Put PhoneBanner / PhoneSheet inside too.
 */
export function IPhone({
  name = 'Nova Home',
  logo,
  status = 'Business account',
  time = '9:41',
  children,
  overlay,
}: {
  name?: string;
  /** Brand mark in the chat header. Defaults to the first letter. */
  logo?: ReactNode;
  status?: string;
  time?: string;
  children?: ReactNode;
  /** Layers drawn above the chat (banners, sheets). */
  overlay?: ReactNode;
}) {
  return (
    <div className="fv-iphone">
      <span className="fv-iphone__btn fv-iphone__btn--a" />
      <span className="fv-iphone__btn fv-iphone__btn--b" />
      <span className="fv-iphone__btn fv-iphone__btn--c" />
      <div className="fv-iphone__screen">
        <div className="fv-iphone__status">
          <b>{time}</b>
          <span className="fv-iphone__island" />
          <span className="fv-iphone__sys">
            <i className="fv-sig" />
            <i className="fv-wifi" />
            <i className="fv-bat" />
          </span>
        </div>
        <div className="fv-wa__head">
          <ChevronLeft className="fv-wa__back" strokeWidth={2.4} />
          <span className="fv-wa__dp">{logo ?? name.slice(0, 1)}</span>
          <span className="fv-wa__who">
            <b>
              {name}
              <BadgeCheck className="fv-wa__tick" strokeWidth={2.2} />
            </b>
            <small>{status}</small>
          </span>
          <Video className="fv-wa__ic" strokeWidth={2} />
          <PhoneIcon className="fv-wa__ic" strokeWidth={2} />
        </div>
        <div className="fv-wa__chat">
          <div className="fv-wa__scroll">
            <span className="fv-wa__day">Today</span>
            {children}
          </div>
        </div>
        <div className="fv-wa__input">
          <Plus strokeWidth={2.2} />
          <span>Message</span>
          <Mic strokeWidth={2.2} />
        </div>
        <span className="fv-iphone__home" />
        {overlay}
      </div>
    </div>
  );
}

/** iOS notification banner that drops in at the top of an IPhone. */
export function PhoneBanner({
  at,
  until,
  app = 'WhatsApp',
  title,
  body,
}: {
  at: number;
  until?: number;
  app?: string;
  title: string;
  body: string;
}) {
  return (
    <div
      className={cx('fv-pbanner', until !== undefined && 'fv-pbanner--until')}
      style={{ '--fv-b-at': `${at}s`, '--fv-b-until': until !== undefined ? `${until}s` : undefined } as CSSProperties}
    >
      <span className="fv-pbanner__app">
        <SiWhatsapp />
      </span>
      <span className="fv-pbanner__text">
        <small>
          {app} <em>now</em>
        </small>
        <b>{title}</b>
        <span>{body}</span>
      </span>
    </div>
  );
}

/**
 * A sheet that slides up over the phone screen at `at` (an in-app browser,
 * checkout, order confirmation). `until` slides it away again.
 */
export function PhoneSheet({
  at,
  until,
  url,
  children,
}: {
  at: number;
  until?: number;
  /** Shows a Safari-style address bar, as when a WhatsApp link opens. */
  url?: string;
  children: ReactNode;
}) {
  return (
    <AtContext.Provider value={at * 1000}>
      <div
        className={cx('fv-psheet', until !== undefined && 'fv-psheet--until', url && 'fv-psheet--web')}
        style={{ '--fv-s-at': `${at}s`, '--fv-s-until': until !== undefined ? `${until}s` : undefined } as CSSProperties}
      >
        {url ? (
          <div className="fv-psheet__url">
            <span>Done</span>
            <b>
              <Lock strokeWidth={2.6} />
              {url}
            </b>
            <i />
          </div>
        ) : (
          <span className="fv-psheet__grab" />
        )}
        <div className="fv-psheet__body">{children}</div>
      </div>
    </AtContext.Provider>
  );
}

/* ── Product art (CSS, no photos) ──────────────────────────────────────── */

/**
 * A product shot. Pass `src` for a real product photo (studio shot on a light
 * background works best); otherwise a studio-lit CSS render is drawn:
 * doorbell (Nova Home), serum (Glow Co.), kurta (Mira Ethnic), sneaker
 * (Stride Shoes).
 */
export function ProductArt({
  kind,
  src,
  alt = 'Product photo',
  h = 9,
  tag,
}: {
  kind?: 'doorbell' | 'serum' | 'kurta' | 'sneaker';
  src?: string;
  /** Alt text for a photo (what the product is). */
  alt?: string;
  h?: number;
  /** Small pill in the corner, e.g. "−20%". */
  tag?: string;
}) {
  return (
    <span className={cx('fv-art', kind && `fv-art--${kind}`, src && 'fv-art--photo')} style={{ height: `${h}em` }}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" decoding="async" draggable={false} />
      ) : (
        <i className="fv-art__obj">
          <i />
          <i />
        </i>
      )}
      {tag ? <em className="fv-art__tag">{tag}</em> : null}
    </span>
  );
}

/* ── Fireworks ─────────────────────────────────────────────────────────── */

const FW_COLORS = ['#fbbf24', '#f472b6', '#a78bfa', '#fb923c', '#fde68a', '#f87171'];

/**
 * Fireworks behind the cards: each shell rises on a thin trail, bursts into
 * streaks that fall and fade, and repeats. `shells` are [x%, y%, delay s]
 * in stage percent. Put it first in a Stage so cards sit in front.
 */
export function Fireworks({
  shells,
  every = 2.8,
  at = 0,
}: {
  shells: [number, number, number][];
  /** Seconds between repeats of each shell. */
  every?: number;
  /** Seconds from scene start when the show begins. */
  at?: number;
}) {
  return (
    <div className="fv-fw" aria-hidden="true">
      {shells.map(([x, y, d], k) => {
        const color = FW_COLORS[k % FW_COLORS.length];
        const color2 = FW_COLORS[(k + 2) % FW_COLORS.length];
        return (
          <span
            key={k}
            className="fv-fw__shell"
            style={
              {
                left: `${x}%`,
                top: `${y}%`,
                '--fw-d': `${at + d}s`,
                '--fw-t': `${every}s`,
                '--fw-c': color,
                '--fw-c2': color2,
                '--fw-rise': `${Math.max(6, (100 - y) * 0.3)}em`,
              } as CSSProperties
            }
          >
            <span className="fv-fw__trail" />
            <span className="fv-fw__flash" />
            <span className="fv-fw__burst">
              {Array.from({ length: 18 }, (_, i) => (
                <i
                  key={i}
                  style={{ '--a': `${(i * 360) / 18 + (k % 2) * 10}deg`, '--r': `${4.2 + (i % 3) * 1.1}em` } as CSSProperties}
                />
              ))}
            </span>
          </span>
        );
      })}
    </div>
  );
}

/**
 * Browser window: traffic lights, an address bar and a page body. Use it for
 * storefront moments (a product page, the theme editor, checkout).
 */
export function Browser({
  url = 'novahome.in',
  children,
  className,
}: {
  url?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx('fv-browser', className)}>
      <div className="fv-browser__bar">
        <span className="fv-browser__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="fv-browser__url">
          <Lock strokeWidth={2.6} />
          {url}
        </span>
      </div>
      <div className="fv-browser__body">{children}</div>
    </div>
  );
}

/** Grey placeholder lines for page chrome that is not the point of a scene. */
export function Skeleton({ w = 100, h = 0.7, tone }: { w?: number; h?: number; tone?: boolean }) {
  return <i className={cx('fv-skel', tone && 'fv-skel--tone')} style={{ width: `${w}%`, height: `${h}em` }} />;
}

/* ── Slot-aware scenes ─────────────────────────────────────────────────── */

export type Slot = 'hero' | 'bento' | 'showcase';

/**
 * Some pages reuse one image path in several places (hero, a bento tile, a
 * showcase row). This draws the scene made for the frame it lands in.
 */
export function bySlot(scenes: { hero?: Scene; bento: Scene; showcase: Scene }): Scene {
  return function SlotScene({ label }: SceneProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [slot, setSlot] = useState<Slot | null>(null);
    useIsoLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      if (el.closest('.demo-video-glow__frame')) setSlot('hero');
      else if (el.closest('.mkt-pf__tile-visual')) setSlot('bento');
      else if (el.closest('.mkt-pf__shot.is-wide')) setSlot('showcase');
      else setSlot(el.closest('.mkt-pf__shot') ? 'bento' : 'showcase');
    }, []);
    if (!slot) return <span ref={ref} hidden />;
    const S = slot === 'hero' ? scenes.hero ?? scenes.showcase : scenes[slot];
    return <S label={label} />;
  };
}

/* ── QR code ───────────────────────────────────────────────────────────── */

/**
 * A QR code with real structure (three finder squares, timing rows, data
 * modules from a seeded pattern). Decorative: it does not encode a URL.
 */
export function QR({ seed = 'wa.me', size = 8 }: { seed?: string; size?: number }) {
  const n = 25;
  let h = hash(seed) || 1;
  const rnd = () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 1000) / 1000;
  };
  const finder = (x: number, y: number) => x < 8 && y < 8;
  const inFinder = (x: number, y: number) => finder(x, y) || finder(n - 1 - x, y) || finder(x, n - 1 - y);
  const cells: string[] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (inFinder(x, y)) continue;
      const timing = (x === 6 || y === 6) && (x + y) % 2 === 0;
      if (timing || rnd() > 0.52) cells.push(`M${x} ${y}h1v1h-1z`);
    }
  }
  const eye = (x: number, y: number) =>
    `M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5zM${x + 2} ${y + 2}h3v3h-3z`;
  return (
    <svg className="fv-qr" viewBox={`-2 -2 ${n + 4} ${n + 4}`} style={{ width: `${size}em`, height: `${size}em` }}>
      <rect x="-2" y="-2" width={n + 4} height={n + 4} rx="2" fill="#fff" />
      <path d={cells.join('')} fill="#0b1220" />
      <path d={eye(0, 0) + eye(n - 7, 0) + eye(0, n - 7)} fill="#0b1220" fillRule="evenodd" />
      <rect x={n / 2 - 2.5} y={n / 2 - 2.5} width="5" height="5" rx="1.2" fill="#fff" />
      <rect x={n / 2 - 1.8} y={n / 2 - 1.8} width="3.6" height="3.6" rx="0.9" fill="#25d366" />
    </svg>
  );
}

/* ── Journey captions ──────────────────────────────────────────────────── */

/** Caption bar: one numbered label per step, cross-faded on the scene clock. */
function Steps({ steps }: { steps: [number, string][] }) {
  return (
    <div className="fv-steps" aria-hidden="true">
      <span className="fv-steps__dots">
        {steps.map(([at], i) => (
          <i key={i} style={{ '--s-at': `${at}s` } as CSSProperties} />
        ))}
      </span>
      <span className="fv-steps__labels">
        {steps.map(([at, text], i) => {
          const next = steps[i + 1]?.[0];
          return (
            <span
              key={i}
              className={cx('fv-steps__label', next === undefined && 'is-last')}
              style={{ '--s-at': `${at}s`, '--s-until': next !== undefined ? `${next}s` : undefined } as CSSProperties}
            >
              <b>{i + 1}</b>
              {text}
            </span>
          );
        })}
      </span>
    </div>
  );
}
