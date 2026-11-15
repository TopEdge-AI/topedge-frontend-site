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
      subtitle="Connect Shopify in about 30 minutes. Meta template review is the only wait. 14-day free trial."
      primaryLabel="Start free"
      secondaryLabel="See pricing"
      secondaryTo="/pricing"
      titleOneLine
    />
  );
}
