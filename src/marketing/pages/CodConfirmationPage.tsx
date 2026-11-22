import ProductFeaturePage from './ProductFeaturePage';

/*
 * /features/cod-confirmation (owner, 22 Nov 2026): the same feature template as
 * every other product page (launch film hero, bento tiles, journey showcase,
 * cost table, steps, FAQ). Content lives in productPages.ts under
 * 'cod-confirmation'. Kept as its own lazy chunk so check-chunk-failure keeps
 * testing it by name.
 */
export default function CodConfirmationPage() {
  return <ProductFeaturePage pageId="cod-confirmation" />;
}
