/**
 * Run `fn` once the page has loaded AND the main thread is idle.
 *
 * Why. GA4, the Google Ads tag and PostHog (with its recorder and surveys
 * bundles) already waited for `load`, but on a mid-range phone `load` fires
 * while React is still mounting the route. Lighthouse on 7 Nov 2026 measured
 * third-party code blocking the main thread for 600 to 730 ms on /pricing and
 * /tools/whatsapp-link-generator. Waiting for idle (capped at `maxWaitMs` so
 * analytics still loads on a busy page) moves that work behind the page's own.
 *
 * Nothing is lost by waiting: the gtag stub queues every call in dataLayer, and
 * PostHog's named events go through window.posthog once it is ready.
 */
export function afterLoadIdle(fn: () => void, maxWaitMs = 4000): void {
  if (typeof window === 'undefined') return;
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    fn();
  };
  const schedule = () => {
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
      .requestIdleCallback;
    if (ric) ric(run, { timeout: maxWaitMs });
    else window.setTimeout(run, 1500);
  };
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
}
