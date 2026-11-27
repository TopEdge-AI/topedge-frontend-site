import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isStaticLandingPath } from '../routes';
import MarketingPage from '../components/MarketingPage';
import MarketingSEO from '../components/MarketingSEO';
import '../styles/not-found.css';

export default function NotFoundPage() {
  const { pathname } = useLocation();

  // A client-side link to a static landing page has no React route and lands
  // here. Load the real page from the server. If that reload lands here again
  // within 10 seconds (the static file is missing), stop, so it never loops.
  useEffect(() => {
    if (!isStaticLandingPath(pathname)) return;
    const key = `te-static-reload:${pathname}`;
    try {
      const last = Number(sessionStorage.getItem(key) || 0);
      if (Date.now() - last < 10_000) return;
      sessionStorage.setItem(key, String(Date.now()));
    } catch {
      return;
    }
    window.location.reload();
  }, [pathname]);

  return (
    <MarketingPage className="mkt-nf fx">
      <MarketingSEO
        title="Page not found"
        description="This TopEdge AI page does not exist. Head to the home page for the WhatsApp app for Shopify India, or open pricing, features or the docs."
        path="/404"
        noIndex
      />
      <div className="fx-shell mkt-nf__shell">
        <section className="mkt-nf__row">
          <div className="fx-card mkt-nf__block">
            <p className="fx-eyebrow mkt-nf__code">404</p>
            <h1 className="mkt-nf__title">
              Page <span className="mkt-hl">not found</span>
            </h1>
            <p className="mkt-nf__sub">Let’s get you back to the main TopEdge AI story.</p>
            <div className="mkt-nf__actions">
              <Link to="/" className="mkt-btn-primary">
                Go home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MarketingPage>
  );
}
