/**
 * One renderer for every FAQ on the blog.
 *
 * There were two of these: a `faqHtml` copied into each post data file, which
 * inlines the block into `content`, and a separate JSX path in BlogPost.tsx for
 * posts that do not inline it. Both emitted the whole answer as a single
 * paragraph, so a 90-word answer arrived as one unbroken block. The owner
 * flagged it as unreadable on 3 Nov 2026 and he was right: the longest answer
 * on the blog runs to 11 lines with nowhere for the eye to rest.
 *
 * Rewriting 36 posts' worth of answers by hand was not the fix. The fix is
 * that a long answer is split into two or three paragraphs here, at sentence
 * boundaries, so every FAQ on the blog improves at once and new ones cannot
 * regress. An answer that already carries its own markup is passed through
 * untouched, which is the escape hatch for the cases where the writer wants a
 * list.
 *
 * The `faqs` array itself is unchanged, so FAQPage schema still receives the
 * answer as one clean string. Only the reading experience changes.
 */

export type Faq = { question: string; answer: string };

/** Answers that already carry block markup are the author's own layout. */
const HAS_BLOCK_MARKUP = /<(p|ul|ol|div|h[2-6])\b/i;

/**
 * Sentence boundary: a full stop, question or exclamation mark, then space,
 * then something that can open a sentence.
 *
 * The lookahead is what keeps `₹0.8631`, `$0.50`, `2.4%` and `1 to 20%` in one
 * piece, because a decimal point is followed by a digit rather than by a
 * capital, and this blog is full of them.
 */
const SENTENCE_BREAK = /(?<=[.!?])\s+(?=[A-Z₹$"'(])/;

/** Start a new paragraph once the current one passes this many characters. */
const PARAGRAPH_TARGET = 180;

/** Below this, an answer is already one readable chunk. */
const SPLIT_THRESHOLD = 260;

/** A trailing paragraph shorter than this is orphaned, so it rejoins the one before. */
const ORPHAN = 90;

/** An answer as paragraphs: one string per paragraph, in order. */
export function faqAnswerParagraphs(answer: string): string[] {
  const text = answer.trim();
  if (text.length <= SPLIT_THRESHOLD) return [text];

  const sentences = text.split(SENTENCE_BREAK);
  if (sentences.length < 3) return [text];

  const paragraphs: string[] = [];
  let current = '';
  for (const sentence of sentences) {
    current = current ? `${current} ${sentence}` : sentence;
    if (current.length >= PARAGRAPH_TARGET) {
      paragraphs.push(current);
      current = '';
    }
  }
  if (current) paragraphs.push(current);

  if (paragraphs.length > 1 && paragraphs[paragraphs.length - 1].length < ORPHAN) {
    const tail = paragraphs.pop() as string;
    paragraphs[paragraphs.length - 1] += ` ${tail}`;
  }

  return paragraphs;
}

function escapeHtml(value: string): string {
  return value.replace(/&(?!(?:[a-z]+|#\d+);)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** The answer as HTML paragraphs, or untouched if it carries its own markup. */
export function faqAnswerHtml(answer: string): string {
  if (HAS_BLOCK_MARKUP.test(answer)) return answer;
  return faqAnswerParagraphs(answer)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join('\n');
}

/**
 * The whole FAQ block, open plain HTML.
 *
 * Open, not an accordion: answer engines do not click, and a collapsed answer
 * is a hidden answer.
 */
export function faqHtml(faqs: Faq[], heading = 'Frequently asked questions'): string {
  const items = faqs
    .map(
      (f) =>
        `<div class="mkt-blog-faq__item">\n<h3 class="mkt-blog-faq__q">${escapeHtml(f.question)}</h3>\n${faqAnswerHtml(f.answer)}\n</div>`,
    )
    .join('\n');
  return `<h2>${escapeHtml(heading)}</h2>\n<div class="mkt-blog-faq">\n${items}\n</div>`;
}
