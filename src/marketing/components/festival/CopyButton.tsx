import { useEffect, useRef, useState } from 'react';
import { copyText } from '../../lib/templateExport';

/**
 * Copy to clipboard, with the state that makes it trustworthy.
 *
 * Three states, not two: idle, copied, and failed. The clipboard API rejects in
 * an insecure context and in a few older mobile browsers, and a button that
 * silently does nothing is worse than one that says so — the visitor's next
 * move is to select the text by hand, and they need to know to do it.
 */
export default function CopyButton({
  text,
  label = 'Copy text',
  className = '',
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <button
      type="button"
      className={`mkt-fcopy${state !== 'idle' ? ` is-${state}` : ''} ${className}`.trim()}
      onClick={async () => {
        const ok = await copyText(text);
        setState(ok ? 'copied' : 'failed');
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setState('idle'), 2200);
      }}
    >
      <span className="mkt-fcopy__icon" aria-hidden>
        {state === 'copied' ? (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
        )}
      </span>
      {state === 'copied' ? 'Copied' : state === 'failed' ? 'Select it manually' : label}
    </button>
  );
}
