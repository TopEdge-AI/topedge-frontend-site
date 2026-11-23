import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { CatalogPlan } from '../../lib/billingCatalog';
import PartnerDashboardPreview from './PartnerDashboardPreview';

const AUDIENCES = [
  {
    id: 'agencies',
    tab: 'Agencies and freelancers',
    heading: 'Your income grows with your clients.',
    body: 'You build and run Shopify stores. Add TopEdge AI to the stack, keep the client relationship, and earn every month the store stays on a paid plan.',
    points: [
      'Set up cart recovery and COD confirmation before a store launches.',
      'Offer WhatsApp journeys and campaigns as the next growth step for stores you already look after.',
      'Create one link per client, so you can see who signed up from which engagement.',
    ],
  },
  {
    id: 'creators',
    tab: 'Creators and communities',
    heading: 'Share what actually helps your audience.',
    body: 'You teach ecommerce or run a community of sellers. People ask you which tools to run their store on. Now you can answer and earn from it.',
    points: [
      'Make a separate link for each video, post or newsletter.',
      'Use the ready-made messages and screenshots from the partner portal.',
      'The free trial lets your audience try TopEdge AI before they pay.',
    ],
  },
  {
    id: 'consultants',
    tab: 'Shopify consultants and developers',
    heading: 'Recommend the follow-up your stores are missing.',
    body: 'You already fix the store. TopEdge AI adds what happens around each order: cart reminders, COD confirmation and order updates on WhatsApp, on the same customer record as campaigns and live chat.',
    points: [
      'Add it to your handover document or your audit report.',
      'Track each client with their own link.',
      'Get paid every month without sending an invoice.',
    ],
  },
] as const;

/**
 * Section 5: three audiences in an ARIA tab set (arrow keys, Home, End) with
 * the portal preview beside them. Inactive panels stay in the DOM with
 * `hidden`, so their text is in the prerendered HTML.
 */
export default function PartnerAudienceTabs({ plans }: { plans: CatalogPlan[] }) {
  const base = useId();
  const [active, setActiveRaw] = useState(0);
  // No fade on first paint, so the prerendered panel is fully visible.
  const [touched, setTouched] = useState(false);
  const setActive = (i: number) => {
    setTouched(true);
    setActiveRaw(i);
  };
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  const focusTab = (i: number) => {
    const n = (i + AUDIENCES.length) % AUDIENCES.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') focusTab(i + 1);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') focusTab(i - 1);
    else if (e.key === 'Home') focusTab(0);
    else if (e.key === 'End') focusTab(AUDIENCES.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div className="mkt-paud">
      <div className="mkt-paud__main">
        <div className="mkt-paud__tabs" role="tablist" aria-label="Who the program is for">
          {AUDIENCES.map((a, i) => (
            <button
              key={a.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${a.id}`}
              aria-selected={i === active}
              aria-controls={`${base}-panel-${a.id}`}
              tabIndex={i === active ? 0 : -1}
              className={`mkt-paud__tab${i === active ? ' is-on' : ''}`}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {a.tab}
            </button>
          ))}
        </div>

        {AUDIENCES.map((a, i) => (
          <div
            key={a.id}
            role="tabpanel"
            id={`${base}-panel-${a.id}`}
            aria-labelledby={`${base}-tab-${a.id}`}
            hidden={i !== active}
            tabIndex={0}
            className="mkt-paud__panel"
          >
            <motion.div
              key={i === active ? 'on' : 'off'}
              initial={reduceMotion || !touched || i !== active ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="mkt-paud__heading">{a.heading}</h3>
              <p className="mkt-paud__body">{a.body}</p>
              <ul className="mkt-paud__points">
                {a.points.map((p) => (
                  <li key={p}>
                    <Check size={16} strokeWidth={2.4} aria-hidden className="mkt-paud__tick" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="mkt-paud__preview">
        <PartnerDashboardPreview plans={plans} />
      </div>
    </div>
  );
}
