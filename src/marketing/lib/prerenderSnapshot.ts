/**
 * Keep the prerendered page on screen when a lazy route chunk fails to load.
 *
 * Why this exists. Every marketing URL ships as prerendered HTML, but main.tsx
 * mounts with createRoot, which throws that HTML away and renders from scratch.
 * The route component is a React.lazy chunk. If that chunk 404s (an HTML file
 * fetched before a deploy asking for a chunk the deploy removed, or Google's
 * renderer replaying cached HTML days later), AppErrorBoundary used to replace a
 * 2,000-word page with nine words: "Something went wrong. The page failed to
 * load." Reproduced with Playwright on 5 Nov 2026. Four URLs sat in Search
 * Console as Soft 404 at the time, including /tools/whatsapp-link-generator.
 *
 * The fix is to copy #root's prerendered markup before React touches it, and let
 * the error boundary put it back. Links in it are plain <a href>, so the page
 * stays readable and navigable even with no JS. scripts/check-chunk-failure.mjs
 * blocks the lazy chunks in a real browser and fails the build if this regresses.
 */

let snapshotHtml = '';
let snapshotPath = '';
/** Just the page body inside Layout's role="main" wrapper (no navbar). */
let mainSnapshotHtml = '';

const normalise = (p: string): string => (p.length > 1 ? p.replace(/\/+$/, '') : p);

/** Call once, before createRoot().render(). A no-op on an empty (dev) root. */
export function capturePrerenderSnapshot(root: HTMLElement | null): void {
  if (!root) return;
  const html = root.innerHTML;
  // Prerender waits for an <h1> on every route, so a root without one is the bare
  // SPA shell (dev server, or a URL that was never prerendered): nothing to keep.
  if (!/<h1[\s>]/i.test(html)) return;
  snapshotHtml = html;
  snapshotPath = normalise(window.location.pathname);
  const main = root.querySelector('[role="main"]');
  if (main) {
    const copy = main.cloneNode(true) as HTMLElement;
    // react-hot-toast's container is rendered by React next to the fallback;
    // drop the prerendered copy so the page never holds two.
    copy.querySelectorAll('[style*="z-index: 9999"]').forEach((n) => n.remove());
    mainSnapshotHtml = copy.innerHTML;
  }
}

/**
 * The prerendered body of the page now on screen, for the Suspense fallback on
 * the first render.
 *
 * Why. createRoot clears the prerendered DOM, the route is a React.lazy chunk,
 * so the first render suspends and used to show a 150 KB loader GIF until the
 * chunk arrived, then drew the page a second time. Measured 7 Nov 2026 with
 * Playwright: the page painted at ~0.3 s from HTML, was removed, and the redraw
 * cost CLS 0.158 on /features/cod-confirmation (Lighthouse, production). Showing
 * the same markup as the fallback keeps the layout still while JS loads. After a
 * client-side navigation the path differs, so this returns '' and the normal
 * loader shows.
 */
export function getPrerenderMainSnapshot(): string {
  if (!mainSnapshotHtml) return '';
  return normalise(window.location.pathname) === snapshotPath ? mainSnapshotHtml : '';
}

/**
 * The prerendered markup for the URL now on screen, or '' when there is none.
 * After a client-side navigation the snapshot belongs to a different page, so it
 * is withheld rather than shown under the wrong URL.
 */
export function getPrerenderSnapshot(): string {
  if (!snapshotHtml) return '';
  return normalise(window.location.pathname) === snapshotPath ? snapshotHtml : '';
}

/** True for the errors browsers and Vite raise when a code-split chunk is missing. */
export function isChunkLoadError(error: unknown): boolean {
  const msg = String((error as { message?: unknown })?.message ?? error ?? '');
  return /dynamically imported module|Importing a module script failed|Unable to preload CSS|Loading (CSS )?chunk [\w-]+ failed/i.test(
    msg,
  );
}

/**
 * Reload once to fetch the current deploy's HTML. Only used after a client-side
 * navigation, where there is no snapshot for the new URL. Guarded per path for a
 * minute so a chunk that is genuinely broken cannot cause a reload loop.
 */
export function reloadOnceForChunkError(): boolean {
  try {
    const key = `topedge:chunk-reload:${normalise(window.location.pathname)}`;
    const last = Number(window.sessionStorage.getItem(key) || 0);
    if (Date.now() - last < 60_000) return false;
    window.sessionStorage.setItem(key, String(Date.now()));
    window.location.reload();
    return true;
  } catch {
    return false;
  }
}
