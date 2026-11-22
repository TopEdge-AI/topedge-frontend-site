import { useLayoutEffect, useMemo, useRef } from 'react';
import { faqAnswerParagraphs } from '../data/faqHtml';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MarketingSEO, { canonicalUrlForPath } from '../marketing/components/MarketingSEO';
import MarketingPage from '../marketing/components/MarketingPage';
import { SITE_URL } from '../marketing/data/marketingSeo';
import { ORG_REF, authorJsonLd, breadcrumbJsonLd, DEFAULT_AUTHOR, TEAM } from '../marketing/data/pageSeo';
import { blogPosts } from '../data/blogPosts';
import { filterMarketingBlogPosts, relatedBlogPosts } from '../marketing/data/blog';
import { groupForCategory } from '../marketing/data/blogCategories';
import type { BlogPost as BlogPostModel } from '../types/blog';
import {
  articleDateModifiedIso,
  articleDatePublishedIso,
} from '../marketing/data/contentDates';
import {
  bindBlogTables,
  enhanceBlogHtml,
  extractToc,
  splitNumericRanges,
} from '../marketing/lib/blogHtml';
import { bindCalculators } from '../marketing/lib/blogCalculators';
import SummarizeWithAI from '../marketing/components/blog/SummarizeWithAI';
import BlogEndCta from '../marketing/components/blog/BlogEndCta';
import BlogToc from '../marketing/components/blog/BlogToc';
import '../marketing/styles/blog.css';
import '../marketing/styles/calculator.css';

const allBlogPosts = filterMarketingBlogPosts([...blogPosts] as BlogPostModel[]);

function Chevron() {
  return (
    <svg className="mkt-blog-crumbs__sep" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = allBlogPosts.find((p) => p.slug === slug);
  const contentHtml = useMemo(
    () => enhanceBlogHtml(post?.content || '', post?.inlineImages ?? []),
    [post?.content, post?.inlineImages],
  );
  const toc = useMemo(() => extractToc(contentHtml), [contentHtml]);
  const proseRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!proseRef.current) return undefined;
    const unbindTables = bindBlogTables(proseRef.current);
    // Calculators render their own table, outside the responsive table pass.
    const unbindCalcs = bindCalculators(proseRef.current);
    return () => {
      unbindCalcs();
      unbindTables();
    };
  }, [contentHtml]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const canonical = canonicalUrlForPath(`/blog/${post.slug}`);
  const related = relatedBlogPosts(post, allBlogPosts);
  const imageAbs = post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`;
  const datePublished = articleDatePublishedIso(post.date);
  const dateModified = articleDateModifiedIso({ updated: post.updated });
  // Posts tagged with the generic brand name are bylined to the founder; a
  // post can carry another team member's name via `author`.
  const authorName = post.author in TEAM ? post.author : DEFAULT_AUTHOR;
  // `updated` already feeds the article's dateModified for structured data but
  // was never shown to the reader. It is only worth showing when it is
  // genuinely later than the publication date: on a post revised the same week
  // it was written the two dates are the same, and printing both reads as a
  // mistake rather than as a freshness signal.
  const showUpdated = Boolean(post.updated && new Date(post.updated) > new Date(post.date));
  const group = groupForCategory(post.category);

  return (
    <>
      <MarketingSEO
        // Keyword-first. MarketingSEO appends " | TopEdge AI" unless the post
        // title already names the brand, so the query terms lead the snippet.
        title={post.title}
        description={post.description}
        keywords={post.keywords?.join(', ')}
        image={imageAbs}
        imageAlt={post.imageAlt || post.title}
        path={`/blog/${post.slug}`}
        type="article"
        articlePublished={datePublished}
        articleModified={dateModified}
        articleAuthor={authorName}
        articleSection={post.category}
        faqSchema={post.faqs}
        // Mirrors the visible trail exactly: Home > Blog > Category. A post
        // with no category group ends on its own title instead.
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            group
              ? { name: group.label, path: `/blog/category/${group.slug}` }
              : { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            '@id': `${canonical}#article`,
            inLanguage: 'en-IN',
            headline: post.title,
            description: post.description,
            image: imageAbs,
            datePublished,
            dateModified,
            author: authorJsonLd(authorName),
            publisher: ORG_REF,
            isPartOf: { '@type': 'Blog', '@id': `${SITE_URL}/blog`, name: 'TopEdge AI Playbooks', url: `${SITE_URL}/blog` },
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
            url: canonical,
            keywords: post.keywords?.join(', '),
          })}
        </script>
        {/*
          Listicles also publish their ranking as an ItemList. BlogPosting
          alone tells a machine the page is an article; it does not tell it the
          page is a ranked shortlist, which is the thing an AI answer to
          "best <x> app" wants to lift. Only posts that actually rank things
          carry `itemList`, so nothing else emits an empty list.
        */}
        {post.itemList?.length ? (
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              '@id': `${canonical}#itemlist`,
              name: post.title,
              description: post.description,
              itemListOrder: 'https://schema.org/ItemListOrderDescending',
              numberOfItems: post.itemList.length,
              itemListElement: post.itemList.map((item, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: item.name,
                ...(item.description ? { description: item.description } : {}),
                ...(item.url ? { url: item.url } : {}),
                // No nested SoftwareApplication. Google's Software App rich
                // result requires aggregateRating or review plus offers, and we
                // hold honest ratings for none of these apps, so the nested
                // entity failed validation on all 10 listicles (Ahrefs Site
                // Audit and Search Console, 7 Nov 2026). A plain ListItem with
                // name, url and description is valid and claims nothing extra.
              })),
            })}
          </script>
        ) : null}
      </Helmet>

      <MarketingPage className="mkt-blog-article !bg-transparent">
        {/*
          The hero is a contained card with the cover beside the title rather
          than a full-bleed violet wash with the image stacked under it. The
          page background is flat now: a radial violet gradient behind an
          article is decoration the reader has to look past, and it made every
          post read as a landing page instead of something to sit and read.
        */}
        <header className="mkt-blog-hero">
          <div className="marketing-container mkt-blog-shell">
            <div className="mkt-blog-hero__card">
              <div className="mkt-blog-hero__text">
                {/*
                  Blog SOP section 4 (22 Nov 2026): plain chevron trail, no
                  capsules, and no category pill under it. The category is the
                  last crumb, so a second copy above the H1 was noise.
                */}
                <nav className="mkt-blog-crumbs" aria-label="Breadcrumb">
                  <ol>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Chevron />
                      <Link to="/blog">Blog</Link>
                    </li>
                    {group ? (
                      <li>
                        <Chevron />
                        <Link to={`/blog/category/${group.slug}`} className="mkt-blog-crumbs__current">
                          {group.label}
                        </Link>
                      </li>
                    ) : null}
                  </ol>
                </nav>

                <h1 className="mkt-blog-title">{post.title}</h1>
                <p className="mkt-blog-lede">{post.description}</p>

                <div className="mkt-blog-meta">
                  <Link to="/about" rel="author">
                    {authorName}
                  </Link>
                  <span className="mkt-blog-meta__dot" aria-hidden />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="mkt-blog-meta__dot" aria-hidden />
                  <span className="mkt-blog-meta__read">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {post.readTime} read
                  </span>
                  {showUpdated ? (
                    <span className="mkt-blog-meta__updated">
                      Updated <time dateTime={post.updated}>{formatDate(post.updated as string)}</time>
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="mkt-blog-hero__media">
                <picture>
                  {post.imageWebp ? <source type="image/webp" srcSet={post.imageWebp} /> : null}
                  <img
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    width={1200}
                    height={675}
                    loading="eager"
                    decoding="async"
                  />
                </picture>
              </div>
            </div>

          </div>
        </header>

        <div className="marketing-container mkt-blog-shell">
          {/*
            Three siblings, in the order a phone should read them: the summary,
            then the contents list, then the article. On desktop the grid moves
            the contents into the right-hand column, which the single centred
            prose column used to leave empty, and keeps it sticky beside the
            body. DOM order is the mobile order, so the summary has to come
            first here: with the contents list first, a reader on a phone met
            eleven links before the three lines that answer the question.
          */}
          <div className="mkt-blog-layout">
            <SummarizeWithAI url={canonical} title={post.title} />
            {post.summary?.length ? (
              <aside className="mkt-blog-summary" aria-labelledby="blog-summary-heading">
                <h2 id="blog-summary-heading" className="mkt-blog-summary__label">
                  Read this first
                </h2>
                <ul className="mkt-blog-summary__list">
                  {post.summary.map((line) => (
                    <li key={line}>
                      {splitNumericRanges(line).map((part, i) =>
                        part.range ? (
                          <span key={i} className="mkt-nowrap">
                            {part.text}
                          </span>
                        ) : (
                          part.text
                        ),
                      )}
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}

            {/* Hand-written contents lists inside posts are stripped in enhanceBlogHtml, so this is the only one. */}
            {toc.length >= 3 ? <BlogToc items={toc.filter((t) => t.level === 2)} /> : null}

            <div className="mkt-blog-body-wrap">
              <div
                ref={proseRef}
                className="mkt-blog-prose"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

            {post.faqs?.length && !(post.content || '').includes('mkt-blog-faq') ? (
              <section className="mkt-blog-faq-block" aria-labelledby="blog-faq-heading">
                <h2 id="blog-faq-heading" className="mkt-blog-faq-block__title">
                  Common questions
                </h2>
                <div className="mkt-blog-faq">
                  {post.faqs.map((f) => (
                    // Always open (owner, 22 Nov 2026): every answer visible.
                    <div key={f.question} className="mkt-blog-faq__item">
                      <h3 className="mkt-blog-faq__q">{f.question}</h3>
                      <div className="mkt-blog-faq__a">
                        {faqAnswerParagraphs(f.answer).map((paragraph, p) => (
                          <p key={p}>
                            {splitNumericRanges(paragraph).map((part, i) =>
                              part.range ? (
                                <span key={i} className="mkt-nowrap">
                                  {part.text}
                                </span>
                              ) : (
                                part.text
                              ),
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <BlogEndCta url={canonical} title={post.title} slug={post.slug} />
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mkt-blog-related" aria-labelledby="related-heading">
            <div className="marketing-container mkt-blog-shell">
              <h2 id="related-heading" className="mkt-blog-related__title">
                Related playbooks
              </h2>
              <div className="mkt-blog-related__grid">
                {related.map((r) => (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className="mkt-blog-related__card">
                    <div className="mkt-blog-related__thumb">
                      <picture>
                        {r.imageWebp ? <source type="image/webp" srcSet={r.imageWebp} /> : null}
                        <img
                          src={r.image}
                          alt={r.imageAlt || r.title}
                          width={400}
                          height={225}
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                    </div>
                    <div className="mkt-blog-related__card-body">
                      <span className="mkt-blog-related__card-cat">{r.category}</span>
                      <span className="mkt-blog-related__card-title">{r.title}</span>
                      <span className="mkt-blog-related__card-meta">
                        {formatDate(r.date)} · {r.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </MarketingPage>
    </>
  );
}
