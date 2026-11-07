import { getPrerenderMainSnapshot } from '../lib/prerenderSnapshot';

/**
 * Route/Suspense fallback.
 *
 * On the first load of a prerendered URL it shows that URL's own prerendered
 * body (see getPrerenderMainSnapshot), so the page does not blank out and redraw
 * while the route chunk loads. Everywhere else, the full-viewport brand loader.
 */
export default function MarketingPageLoader() {
  const snapshot = getPrerenderMainSnapshot();
  if (snapshot) {
    return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: snapshot }} />;
  }
  return (
    <div
      className="mkt-page-loader flex w-full items-center justify-center bg-white"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <img
        src="/topedge-loader.gif"
        alt="Loading TopEdge"
        width={88}
        height={88}
        className="h-[5.5rem] w-[5.5rem] object-contain"
        decoding="async"
      />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
