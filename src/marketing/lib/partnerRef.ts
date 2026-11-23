/**
 * Partner referral capture (TopEdge AI Partner Program).
 *
 * Contract: topedge-partners/docs/integration-contracts.md section 4.
 *
 * A partner link looks like `https://topedgeai.com/pricing?via=acme&vl=main`.
 * When a page loads with a valid `via`, this stores
 * `te_ref = { c, l, ts, lp }` in localStorage and in a first-party cookie on
 * `.topedgeai.com` for 90 days, and sends one click beacon to the partner API.
 *
 * Rules that matter:
 * - Last partner click wins: a new valid `via` replaces the stored value.
 * - UTMs, gclid and `ref` never touch it (that is `te_attr`, lib/attribution.ts).
 * - An invalid or missing `via` changes nothing and sends nothing.
 * - Nothing here may throw into the page.
 *
 * The same rules run on the static landing pages in scripts/lp/attribution.js.
 */

const KEY = 'te_ref';
const MAX_AGE_S = 60 * 60 * 24 * 90;
const CODE_RE = /^[a-z0-9-]{3,24}$/;
const SLUG_RE = /^[a-z0-9-]{1,32}$/;

export type PartnerRef = { c: string; l: string; ts: string; lp: string };

const PARTNERS_API = String(
  (import.meta.env.VITE_PARTNERS_API_URL as string | undefined) || 'https://partners-api.topedgeai.com',
).replace(/\/+$/, '');

let beaconSent = false;

/** Same sanitising as attribution.ts (no markup characters, 200 chars), then lowercase. */
function clean(v: unknown): string {
  return String(v ?? '')
    .replace(/[<>"'`]/g, '')
    .trim()
    .slice(0, 200)
    .toLowerCase();
}

function fromParams(search: string): { code: string; slug: string } | null {
  const p = new URLSearchParams(search);
  const code = clean(p.get('via'));
  if (!CODE_RE.test(code)) return null;
  const slug = clean(p.get('vl'));
  return { code, slug: SLUG_RE.test(slug) ? slug : '' };
}

function valid(raw: string | null | undefined): PartnerRef | null {
  if (!raw) return null;
  try {
    const o = JSON.parse(raw) as Record<string, unknown>;
    const c = clean(o.c);
    const ts = String(o.ts || '');
    const t = Date.parse(ts);
    if (!CODE_RE.test(c) || !Number.isFinite(t) || Date.now() - t > MAX_AGE_S * 1000) return null;
    const l = clean(o.l);
    return { c, l: SLUG_RE.test(l) ? l : '', ts, lp: String(o.lp || '').slice(0, 200) };
  } catch {
    return null;
  }
}

/** The stored partner referral, or null when absent, malformed or older than 90 days. */
export function readPartnerRef(): PartnerRef | null {
  try {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(KEY);
    } catch {
      /* storage blocked */
    }
    const fromStore = valid(raw);
    if (fromStore) return fromStore;
    const m = document.cookie.match(/(?:^|;\s*)te_ref=([^;]*)/);
    return m ? valid(decodeURIComponent(m[1])) : null;
  } catch {
    return null;
  }
}

/** Call once per page load, before React renders. */
export function capturePartnerRef(): void {
  try {
    const found = fromParams(window.location.search);
    if (!found) return;
    const ref: PartnerRef = {
      c: found.code,
      l: found.slug,
      ts: new Date().toISOString(),
      lp: window.location.pathname.slice(0, 200),
    };
    const json = JSON.stringify(ref);
    try {
      window.localStorage.setItem(KEY, json);
    } catch {
      /* storage blocked */
    }
    const host = window.location.hostname;
    const onSite = host === 'topedgeai.com' || host.endsWith('.topedgeai.com');
    const secure = window.location.protocol === 'https:';
    document.cookie =
      `${KEY}=${encodeURIComponent(json)}; Path=/; Max-Age=${MAX_AGE_S}; SameSite=Lax` +
      (onSite ? '; Domain=.topedgeai.com' : '') +
      (secure ? '; Secure' : '');
    if (!beaconSent && typeof navigator.sendBeacon === 'function') {
      beaconSent = true;
      navigator.sendBeacon(
        `${PARTNERS_API}/v1/public/click`,
        new Blob([JSON.stringify({ code: found.code, slug: found.slug })], { type: 'text/plain' }),
      );
    }
  } catch {
    /* referral capture must never break the page */
  }
}

/** `via` and `vl` to forward to the dashboard sign-up: the current URL first, then te_ref. */
export function partnerRefQuery(search = ''): Record<string, string> {
  try {
    const now = fromParams(search);
    if (now) return now.slug ? { via: now.code, vl: now.slug } : { via: now.code };
    const ref = readPartnerRef();
    if (!ref) return {};
    return ref.l ? { via: ref.c, vl: ref.l } : { via: ref.c };
  } catch {
    return {};
  }
}
