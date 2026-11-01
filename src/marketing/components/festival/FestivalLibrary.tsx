import { useMemo, useState } from 'react';
import FestivalTemplateCard from './FestivalTemplateCard';
import { downloadTemplatesCsv } from '../../lib/templateExport';
import {
  FESTIVALS,
  FESTIVAL_LIBRARY,
  FESTIVAL_STAGES,
  FESTIVAL_TEMPLATE_COUNT,
  type FestivalStageId,
} from '../../data/festivalTemplates';

/** How many cards reveal at a time. Four full rows on desktop, and a first
 *  screen on a phone that is scrollable rather than endless. */
const PAGE = 12;

/**
 * The whole library on one page, filterable.
 *
 * Three filters, because those are the three questions a merchant arrives with:
 * which festival, which message in the sequence, and — when they are hunting
 * for a phrase they remember — a search across the actual body copy.
 *
 * Cards reveal in batches rather than all hundred at once. A hundred WhatsApp
 * previews is a hundred drawn phone frames, and on a mid-range Android the
 * difference between rendering twenty-four and rendering a hundred is the
 * difference between a page that responds to the first filter tap and one that
 * does not. The count is always shown in full, so nothing looks hidden, and
 * each template also lives on its festival's own page.
 */
export default function FestivalLibrary() {
  const [festivalSlug, setFestivalSlug] = useState('all');
  const [stage, setStage] = useState<FestivalStageId | 'all'>('all');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(PAGE);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FESTIVAL_LIBRARY.filter((item) => {
      if (festivalSlug !== 'all' && item.festival.slug !== festivalSlug) return false;
      if (stage !== 'all' && item.row.stage !== stage) return false;
      if (!q) return true;
      return [
        item.row.internalName,
        item.row.metaName,
        item.row.body,
        item.row.buttonLabel,
        item.festival.name,
        item.festival.shortName,
        item.stage.label,
      ]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [festivalSlug, stage, query]);

  const shown = results.slice(0, limit);
  const reset = () => setLimit(PAGE);

  return (
    <div className="mkt-flib">
      <div className="mkt-flib__controls">
        <div className="mkt-flib__row">
          <label className="mkt-flib__field">
            <span className="mkt-flib__label">Festival</span>
            <select
              className="mkt-flib__select"
              value={festivalSlug}
              onChange={(e) => {
                setFestivalSlug(e.target.value);
                reset();
              }}
            >
              <option value="all">All 25 festivals</option>
              {FESTIVALS.map((f) => (
                <option key={f.slug} value={f.slug}>
                  {f.name}
                </option>
              ))}
            </select>
          </label>

          <label className="mkt-flib__field mkt-flib__field--search">
            <span className="mkt-flib__label">Search the copy</span>
            <span className="mkt-flib__search">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m16.5 16.5 4 4" />
              </svg>
              <input
                type="search"
                className="mkt-flib__input"
                placeholder="gifting, discount code, early access…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  reset();
                }}
              />
            </span>
          </label>
        </div>

        <div className="mkt-flib__stages" role="tablist" aria-label="Filter by campaign stage">
          <button
            type="button"
            role="tab"
            aria-selected={stage === 'all'}
            className={`mkt-flib__chip${stage === 'all' ? ' is-active' : ''}`}
            onClick={() => {
              setStage('all');
              reset();
            }}
          >
            Every stage
            <span className="mkt-flib__count">{FESTIVAL_TEMPLATE_COUNT}</span>
          </button>
          {FESTIVAL_STAGES.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={stage === s.id}
              className={`mkt-flib__chip${stage === s.id ? ' is-active' : ''}`}
              onClick={() => {
                setStage(s.id);
                reset();
              }}
            >
              {s.label}
              <span className="mkt-flib__count">
                {FESTIVAL_LIBRARY.filter((i) => i.row.stage === s.id).length}
              </span>
            </button>
          ))}
        </div>

        <div className="mkt-flib__foot">
          <p className="mkt-flib__status" role="status">
            {results.length === FESTIVAL_TEMPLATE_COUNT
              ? `All ${FESTIVAL_TEMPLATE_COUNT} templates`
              : `${results.length} of ${FESTIVAL_TEMPLATE_COUNT} templates`}
            {shown.length < results.length ? ` · showing ${shown.length}` : ''}
          </p>

          {/* Downloads what is filtered, not always all hundred — the filter is
              how someone narrows to the set they actually want. */}
          <button
            type="button"
            className="mkt-flib__download"
            disabled={results.length === 0}
            onClick={() =>
              downloadTemplatesCsv(
                results,
                results.length === FESTIVAL_TEMPLATE_COUNT
                  ? 'whatsapp-festival-templates.csv'
                  : 'whatsapp-templates-selection.csv',
              )
            }
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 4v11m0 0 4-4m-4 4-4-4" />
              <path d="M4 19h16" />
            </svg>
            Download {results.length === FESTIVAL_TEMPLATE_COUNT ? 'all' : results.length} as CSV
          </button>
        </div>
      </div>

      {results.length === 0 ? (
        <p className="mkt-flib__empty">
          Nothing matches that. Try a festival name, or a phrase like “gift” or “discount code”.
        </p>
      ) : (
        <>
          <ul className="mkt-flib__grid">
            {shown.map((item) => (
              <li key={item.id}>
                <FestivalTemplateCard item={item} />
              </li>
            ))}
          </ul>

          {shown.length < results.length && (
            <div className="mkt-flib__more">
              <button
                type="button"
                className="mkt-flib__more-btn"
                onClick={() => setLimit((n) => n + PAGE)}
              >
                Show {Math.min(PAGE, results.length - shown.length)} more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
