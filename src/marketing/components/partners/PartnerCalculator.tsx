import { useCallback, useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Check, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import PriceRoll from '../pricing/PriceRoll';
import { inrAmountFromLabel, type CatalogPlan } from '../../lib/billingCatalog';
import {
  CALC_DEFAULT_CLIENTS,
  CALC_DEFAULT_PLAN,
  CALC_MAX_CLIENTS,
  CALC_MIN_CLIENTS,
  formatInr,
  monthlyCommission,
  priceBeforeGst,
  nextTierFor,
  pct,
  tierFor,
} from '../../data/partners';

const DEBOUNCE_MS = 250;
const MONTHS = 12;

function clientsLabel(n: number) {
  return `${n} ${n === 1 ? 'client' : 'clients'}`;
}

/**
 * "You earn" card in the hero.
 *
 * The first render is the default (5 clients on Growth), so the prerendered
 * HTML carries real default figures. The bars show what you have earned in
 * total by the end of each month of year one, at a steady client count.
 */
export default function PartnerCalculator({ plans }: { plans: CatalogPlan[] }) {
  const sliderId = useId();
  const planGroup = useId();
  const [clients, setClients] = useState(CALC_DEFAULT_CLIENTS);
  const [settled, setSettled] = useState(CALC_DEFAULT_CLIENTS);
  const [planSlug, setPlanSlug] = useState(CALC_DEFAULT_PLAN);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const drag = useRef<{ id: number; startX: number; startClients: number; moved: boolean } | null>(null);
  const swallowClick = useRef(false);

  useEffect(() => {
    if (clients === settled) return;
    const t = window.setTimeout(() => setSettled(clients), DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [clients, settled]);

  const plan = plans.find((p) => p.slug === planSlug) ?? plans[0];
  const price = Number(inrAmountFromLabel(plan?.monthlyPriceLabel || '')) || 0;
  const monthly = monthlyCommission(settled, price);
  const rate = pct(tierFor(settled).tier.rateBp);
  const next = nextTierFor(settled);
  const monthlyLabel = formatInr(Math.round(monthly));
  const yearLabel = formatInr(Math.round(monthly * MONTHS));
  const fill = ((clients - CALC_MIN_CLIENTS) / (CALC_MAX_CLIENTS - CALC_MIN_CLIENTS)) * 100;
  const set = useCallback(
    (n: number) => setClients(Math.min(CALC_MAX_CLIENTS, Math.max(CALC_MIN_CLIENTS, Math.round(n)))),
    [],
  );

  /** Pixels the stepper can travel: the track, less the stepper, the end label and the gutters (see the CSS). */
  const travel = () => {
    const track = trackRef.current;
    const step = stepRef.current;
    const label = labelRef.current;
    if (!track || !step || !label) return 0;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return Math.max(1, track.clientWidth - step.offsetWidth - label.offsetWidth - 0.9 * rem);
  };

  const fromDelta = (startClients: number, dx: number) =>
    startClients + (dx / travel()) * (CALC_MAX_CLIENTS - CALC_MIN_CLIENTS);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const track = trackRef.current;
    const step = stepRef.current;
    const label = labelRef.current;
    if (!track || !step || !label) return;
    const target = e.target as HTMLElement;
    // The arrows still step by one on a plain click; they only turn into a drag once the pointer moves.
    if (target.closest('button')) {
      drag.current = { id: e.pointerId, startX: e.clientX, startClients: clients, moved: false };
      return;
    }
    const rect = track.getBoundingClientRect();
    if (e.clientX >= label.getBoundingClientRect().left) return; // the end label is not part of the slider
    let startClients = clients;
    if (!step.contains(target)) {
      // A click on the bare track moves the stepper there, centred under the pointer.
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const x = e.clientX - rect.left - track.clientLeft - step.offsetWidth / 2 - 0.3 * rem;
      startClients = CALC_MIN_CLIENTS + (x / travel()) * (CALC_MAX_CLIENTS - CALC_MIN_CLIENTS);
      startClients = Math.min(CALC_MAX_CLIENTS, Math.max(CALC_MIN_CLIENTS, Math.round(startClients)));
      set(startClients);
    }
    track.setPointerCapture(e.pointerId);
    drag.current = { id: e.pointerId, startX: e.clientX, startClients, moved: true };
    setDragging(true);
    e.preventDefault();
    track.querySelector<HTMLInputElement>('input[type="range"]')?.focus({ preventScroll: true });
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < 4) return;
      d.moved = true;
      swallowClick.current = true;
      trackRef.current?.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    set(fromDelta(d.startClients, dx));
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    setDragging(false);
    const track = trackRef.current;
    if (track?.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
    // A drag that started on an arrow must not also count as a click on it.
    window.setTimeout(() => {
      swallowClick.current = false;
    }, 0);
  };

  const stepBy = (n: number) => {
    if (swallowClick.current) return;
    set(clients + n);
  };

  return (
    <div className="pk-calc" role="group" aria-labelledby={`${sliderId}-title`}>
      <div className="pk-calc__head">
        <h2 className="pk-calc__label" id={`${sliderId}-title`}>
          You earn
        </h2>
        <span className="pk-calc__rate">{rate} recurring commission</span>
      </div>

      <p className="pk-calc__amount" aria-live="polite" aria-atomic="true">
        <span aria-hidden>
          <PriceRoll value={monthlyLabel} size="lg" replayKey={`${settled}-${plan?.slug}`} />
        </span>
        <span className="sr-only">{monthlyLabel} a month</span>
        <span className="pk-calc__per" aria-hidden>
          /mo
        </span>
      </p>

      <div className="pk-calc__bars" aria-hidden>
        {Array.from({ length: MONTHS }, (_, i) => (
          <span key={i} className="pk-calc__bar" style={{ height: `${8 + ((i + 1) / MONTHS) * 92}%` }} />
        ))}
      </div>
      <div className="pk-calc__axis">
        <span>Month 1: {monthlyLabel}</span>
        <strong>{yearLabel} in year one</strong>
      </div>

      <fieldset className="pk-calc__plans">
        <legend className="sr-only">Plan your clients are on</legend>
        {plans.map((p) => {
          const on = p.slug === plan?.slug;
          return (
            <label key={p.slug} className={`pk-calc__plan${on ? ' is-on' : ''}`}>
              <input
                type="radio"
                name={planGroup}
                value={p.slug}
                checked={on}
                onChange={() => {
                  setPlanSlug(p.slug);
                  setSettled(clients);
                }}
              />
              <span className="pk-calc__check" aria-hidden>
                {on ? <Check size={12} strokeWidth={3} /> : null}
              </span>
              <span className="pk-calc__plan-name">{p.displayName}</span>
              <span className="pk-calc__plan-price">{p.monthlyPriceLabel}/mo</span>
            </label>
          );
        })}
      </fieldset>

      <div
        ref={trackRef}
        className={`pk-calc__track${dragging ? ' is-dragging' : ''}`}
        style={{ ['--p' as string]: String(fill / 100) }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <span className="pk-calc__fill" aria-hidden />
        <input
          id={sliderId}
          type="range"
          className="pk-calc__range"
          min={CALC_MIN_CLIENTS}
          max={CALC_MAX_CLIENTS}
          step={1}
          value={clients}
          aria-label="Paying clients"
          aria-valuetext={clientsLabel(clients)}
          onChange={(e) => set(Number(e.target.value))}
        />
        <span ref={stepRef} className="pk-calc__stepper">
          <button type="button" onClick={() => stepBy(-1)} aria-label="One client fewer">
            <ChevronLeft size={14} />
          </button>
          <output htmlFor={sliderId}>{clients}</output>
          <button type="button" onClick={() => stepBy(1)} aria-label="One client more">
            <ChevronRight size={14} />
          </button>
        </span>
        <span ref={labelRef} className="pk-calc__clients-label" aria-hidden>
          Paying clients
        </span>
      </div>

      <p className="pk-calc__note">
        <Info size={14} aria-hidden />
        <span>
          {clientsLabel(settled)} on {plan?.displayName} at {formatInr(price)}/mo incl. GST; commission is on {formatInr(Math.round(priceBeforeGst(price)))} before GST.
          {next ? ` At ${next.minClients} clients your rate becomes ${pct(next.rateBp)}.` : ''} Example figures.
        </span>
      </p>
    </div>
  );
}
