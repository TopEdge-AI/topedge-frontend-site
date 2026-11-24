import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BillingCycle } from '../../lib/billingCatalog';

const CYCLES: { id: BillingCycle; label: string; save?: boolean }[] = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'yearly', label: 'Yearly', save: true },
];

export default function CycleToggle({
  value,
  onChange,
}: {
  value: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pill, setPill] = useState({ left: 0, width: 0 });

  const measure = useCallback(() => {
    const btn = btnRefs.current[value];
    const wrap = wrapRef.current;
    if (!btn || !wrap) return;
    const wrapRect = wrap.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setPill({
      // The pill is positioned inside the border, the rects are measured outside it.
      left: btnRect.left - wrapRect.left - wrap.clientLeft,
      width: btnRect.width,
    });
  }, [value]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    // The pill is positioned from measured button boxes. Those boxes change
    // when the web font swaps in after first paint, which no resize event
    // reports, so watch the control itself and re-measure once fonts settle.
    const wrap = wrapRef.current;
    const observer =
      wrap && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => measure()) : null;
    if (observer && wrap) observer.observe(wrap);
    let alive = true;
    document.fonts?.ready
      .then(() => {
        if (alive) measure();
      })
      .catch(() => {});
    return () => {
      alive = false;
      window.removeEventListener('resize', measure);
      observer?.disconnect();
    };
  }, [measure]);

  return (
    <div className="mkt-cycle-wrap">
      <div className="mkt-cycle" role="tablist" aria-label="Billing cycle" ref={wrapRef}>
        <span
          className="mkt-cycle__pill"
          aria-hidden
          style={{
            transform: `translateX(${pill.left}px)`,
            width: pill.width || undefined,
            opacity: pill.width ? 1 : 0,
            transition:
              'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), width 0.28s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.15s ease',
          }}
        />
        {CYCLES.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={value === c.id}
            ref={(el) => {
              btnRefs.current[c.id] = el;
            }}
            className={`mkt-cycle__btn${value === c.id ? ' is-on' : ''}`}
            onClick={() => onChange(c.id)}
          >
            {c.label}
            {c.save ? <span className="mkt-cycle__chip">Save</span> : null}
          </button>
        ))}
      </div>
    </div>
  );
}
