/**
 * Documentation content schema. Plain data, no JSX.
 *
 * The content lives in `content/docs.json` (the only copy of the docs). It is
 * read by the page renderer here and, in plain Node, by scripts/marketing-urls.mjs
 * (prerender + sitemap URLs), scripts/generate-sitemap.mjs (lastmod) and
 * scripts/generate-llms.mjs (llms.txt). Nothing in it may depend on React.
 *
 * Inline markup inside every `string` field is the restricted subset parsed by
 * `inline.ts`: **bold**, `code`, [label](/path).
 */

export type DocGroupId = 'start' | 'guides' | 'reference' | 'platform' | 'help';

export type DocCalloutTone = 'info' | 'tip' | 'warning' | 'success';

/**
 * A highlight drawn over a screenshot. All four numbers are percentages of the
 * image, so a mark stays on its target at every width. With `w` and `h` it is a
 * box around a control; without them it is a pin at a point. Marks are numbered
 * in order, and each `label` is repeated in the list under the image.
 */
export type DocMark = {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  /** Where the tag sits against the box. Default 'top'. */
  place?: 'top' | 'bottom';
  /** Which edge of the box the tag lines up with. Default 'left'. */
  align?: 'left' | 'right';
};

export type DocStep = {
  title: string;
  body: string;
  /** Secondary line: a caveat or a "what you should see" note. */
  note?: string;
  /** Screenshot for this step, shown under its text. Needs `alt`. */
  shot?: string;
  alt?: string;
  marks?: DocMark[];
};

/** A question-style link on the docs home: "How do I ...?" */
export type DocTask = { question: string; href: string; note?: string };

export type DocTroubleshootCase = {
  /** What the merchant literally sees: a banner, a status, an empty table. */
  symptom: string;
  fixes: string[];
};

export type DocFaq = { question: string; answer: string };

export type DocRelatedLink = { label: string; href: string; note?: string };

export type DocBlock =
  | { kind: 'answer'; text: string }
  | { kind: 'h2'; id: string; text: string }
  | { kind: 'h3'; id: string; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'list'; ordered?: boolean; items: string[] }
  | { kind: 'prereqs'; items: string[] }
  | {
      kind: 'steps';
      /** Set to emit HowTo JSON-LD for this block. */
      howToName?: string;
      totalTimeMinutes?: number;
      steps: DocStep[];
    }
  | { kind: 'table'; caption?: string; columns: string[]; rows: string[][] }
  | { kind: 'definitions'; items: { term: string; definition: string }[] }
  | { kind: 'callout'; tone: DocCalloutTone; title?: string; body: string }
  | { kind: 'verify'; items: string[] }
  | { kind: 'troubleshoot'; cases: DocTroubleshootCase[] }
  | { kind: 'code'; language: string; code: string; caption?: string }
  | { kind: 'diagram'; name: string; title: string; caption?: string }
  | { kind: 'related'; links: DocRelatedLink[] }
  /** Plan caps rendered from the billing catalog, never written into content. */
  | { kind: 'planLimits' }
  /**
   * A dashboard screenshot. Served from /docs/img/<shot>.webp; its size comes from
   * public/docs/img/shots.json. An id missing from that manifest renders nothing.
   */
  | { kind: 'image'; shot: string; alt: string; caption?: string; marks?: DocMark[] }
  /** Question-style links to the pages people look for first. */
  | { kind: 'tasks'; title?: string; items: DocTask[] };

export type DocArticle = {
  /** Path after `/docs`. Empty string is the docs home. No leading slash. */
  slug: string;
  path: string;
  group: DocGroupId;
  navLabel: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  keywords: string[];
  /** ISO date. Drives dateModified, the visible "Updated" line and sitemap lastmod. */
  updated: string;
  /** Dashboard deep link; the renderer prefixes https://dash.topedgeai.com. */
  dashboard?: { route: string; label: string };
  faqs?: DocFaq[];
  blocks: DocBlock[];
};

export type DocGroup = {
  id: DocGroupId;
  label: string;
  blurb: string;
  slugs: string[];
};

export type DocsContent = {
  groups: DocGroup[];
  articles: DocArticle[];
};
