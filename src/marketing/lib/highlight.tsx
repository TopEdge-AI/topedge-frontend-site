import type { ReactNode } from 'react';

/**
 * The section-title highlight, applied the same way everywhere.
 *
 * Every section title on the site carries one lilac highlight (`.mkt-hl`) on
 * its closing phrase, the way the pricing, customers and home sections do. Most
 * titles are written without markup, so this picks the phrase: the last two
 * words, which in these titles is nearly always the object or the time frame
 * ("your store", "this week", "three steps"). Where that reads badly, pass the
 * phrase to highlight explicitly.
 *
 * - A title of fewer than three words is returned as it is: there is no plain
 *   lead-in to set the highlight against.
 * - Trailing punctuation goes inside the highlight, so a full stop or question
 *   mark does not float off the end of the pill.
 * - An explicit phrase that is not found in the title is ignored, rather than
 *   rendering a half-matched span.
 */
export function highlightTitle(
  title: string,
  phrase?: string,
  { words = 2, stacked = false }: { words?: number; stacked?: boolean } = {},
): ReactNode {
  const text = title.trim();
  // `stacked` sets the highlighted phrase on its own line under the lead-in, the
  // way the closing CTA card and the review wall set their titles.
  const gap = stacked ? <br /> : ' ';

  if (phrase) {
    const i = text.indexOf(phrase);
    if (i >= 0) {
      return (
        <>
          {stacked ? text.slice(0, i).trimEnd() : text.slice(0, i)}
          {stacked && i > 0 ? gap : null}
          <span className="mkt-hl">{phrase}</span>
          {text.slice(i + phrase.length)}
        </>
      );
    }
  }

  const end = text.match(/[.?!…:]+$/)?.[0] ?? '';
  const body = end ? text.slice(0, -end.length) : text;
  const parts = body.split(/\s+/);
  if (parts.length < 3) return text;
  const n = Math.min(words, parts.length - 1);
  return (
    <>
      {parts.slice(0, -n).join(' ')}
      {gap}
      <span className="mkt-hl">
        {parts.slice(-n).join(' ')}
        {end}
      </span>
    </>
  );
}
