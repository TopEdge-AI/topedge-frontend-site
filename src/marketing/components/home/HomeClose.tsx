import MarketingCtaBand from '../MarketingCtaBand';

export default function HomeClose() {
  return (
    <MarketingCtaBand
      title={
        <>
          Recover more carts with{' '}
          <span className="mkt-cta__hl">
            TopEdge <span>AI</span>
          </span>
          <br className="mkt-cta__br" />
          {' '}
          on WhatsApp
        </>
      }
      subtitle="Start a 14-day free trial, connect Shopify in about 30 minutes, and send once Meta approves your templates."
      primaryLabel="Start free"
      secondaryLabel="See pricing"
      secondaryTo="/pricing"
      titleOneLine
    />
  );
}
