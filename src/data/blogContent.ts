/**
 * Blog data for the pages (finding H7, 24 Nov 2026 audit).
 *
 * `blogIndex` carries every post's card fields only. A post's body (content,
 * FAQs, summary, item list, inline images) is its own small chunk, loaded by
 * slug, so a reader of one post no longer downloads every post. The source of
 * truth is still src/data/blogPosts.ts; the split happens in the blog-split
 * plugin in vite.config.ts. Build scripts keep reading blogPosts.ts directly.
 */
import { blogBodies as rawBodies, blogIndex as rawIndex } from 'virtual:blog-index';
import type { BlogPost } from '../types/blog';

type BlogBody = Pick<BlogPost, 'content' | 'faqs' | 'summary' | 'itemList' | 'inlineImages' | 'faqHeading'>;
/** A post without its body: what the blog index, archives and related posts need. */
export type BlogPostCard = Omit<BlogPost, keyof BlogBody>;

export const blogIndex = rawIndex as BlogPostCard[];
const blogBodies = rawBodies as Record<string, () => Promise<{ default: BlogBody }>>;

const bodies = new Map<string, BlogBody>();
const pending = new Map<string, Promise<void>>();
const failed = new Map<string, unknown>();

/** Start loading a post body. Safe to call more than once; unknown slugs do nothing. */
export function preloadBlogBody(slug: string): Promise<void> | undefined {
  if (bodies.has(slug)) return Promise.resolve();
  const existing = pending.get(slug);
  if (existing) return existing;
  const loader = blogBodies[slug];
  if (!loader) return undefined;
  const p = loader().then(
    (mod) => {
      bodies.set(slug, mod.default);
      pending.delete(slug);
    },
    (err) => {
      failed.set(slug, err);
      pending.delete(slug);
    },
  );
  pending.set(slug, p);
  return p;
}

/**
 * The full post for a slug, for a component inside <Suspense>. Returns undefined
 * for a slug that does not exist. While the body chunk is loading it throws the
 * load promise (Suspense shows its fallback); if the chunk failed it throws the
 * error, so AppErrorBoundary restores the prerendered page.
 */
export function readBlogPost(slug: string | undefined): BlogPost | undefined {
  if (!slug) return undefined;
  const card = blogIndex.find((p) => p.slug === slug);
  if (!card) return undefined;
  const body = bodies.get(slug);
  if (body) return { ...card, ...body } as BlogPost;
  if (failed.has(slug)) throw failed.get(slug);
  throw preloadBlogBody(slug);
}
