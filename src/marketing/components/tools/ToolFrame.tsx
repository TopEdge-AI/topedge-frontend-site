import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SOURCES } from '@/data/sources';
import ProofBadges from '../ProofBadges';
import FaqAccordion from '../topic/FaqAccordion';
import type { TopicBlock } from '../topic/TopicBlocks';
import { highlightTitle } from '../../lib/highlight';
import { otherTools } from '../../data/freeTools';
import { ToolCard } from './ToolCards';
import '../../styles/tools.css';

/**
 * The framed rows every free tool page is built from (docs/DESIGN-SYSTEM.md):
 * the hero with its breadcrumb, the explainer blocks as cell rows, the FAQ
 * row and the "more free tools" row. The tool itself sits between the hero
 * and the blocks, in the page that owns it.
 */

type Crumb = { name: string; to?: string };

/** Splits the H1 on its accent phrase; the text itself is never changed. */
function withAccent(title: string, accent?: string) {
  if (!accent) return title;
  const i = title.indexOf(accent);
  if (i < 0) return title;
  return (
    <>
      {title.slice(0, i)}
      <span className="mkt-toolpage__hl">{accent}</span>
      {title.slice(i + accent.length)}
    </>
  );
}

/**
 * Hero row. The breadcrumb mirrors the page's BreadcrumbList: Home, then
 * `crumbs` in order, the last one being the current page.
 */
export function ToolHero({
  crumbs,
  title,
  accent,
  subtitle,
}: {
  crumbs: Crumb[];
  title: string;
  accent?: string;
  subtitle: string;
}) {
  return (
    <header className="mkt-toolpage__hero">
      <nav aria-label="Breadcrumb">
        <ol className="fx-crumbs">
          <li>
            <Link to="/">Home</Link>
          </li>
          {crumbs.map((c, i) =>
            i === crumbs.length - 1 || !c.to ? (
              <li key={c.name} aria-current={i === crumbs.length - 1 ? 'page' : undefined}>
                {c.name}
              </li>
            ) : (
              <li key={c.name}>
                <Link to={c.to}>{c.name}</Link>
              </li>
            ),
          )}
        </ol>
      </nav>
      <h1 className="mkt-toolpage__title">{withAccent(title, accent)}</h1>
      <p className="mkt-toolpage__sub">{subtitle}</p>
      <div className="mkt-toolpage__trust">
        <ProofBadges compact />
      </div>
    </header>
  );
}

/** Centred section head with the one lilac highlight. */
export function ToolHead({ id, title, accent, sub }: { id?: string; title: string; accent?: string; sub?: string }) {
  return (
    <div className="fx-head">
      <h2 id={id} className="fx-head__title">
        {highlightTitle(title, accent)}
      </h2>
      {sub ? <p className="fx-head__sub">{sub}</p> : null}
    </div>
  );
}

/** `**word**` and `[label](/path)` inside callout copy, as TopicBlocks renders them. */
function renderInline(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(\/[^)\s]*\))/g).map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\((\/[^)\s]*)\)$/);
    if (link) {
      return (
        <Link key={i} to={link[2]}>
          {link[1]}
        </Link>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

type Callout = Extract<TopicBlock, { kind: 'callout' }>;

function CalloutRow({ items }: { items: Callout[] }) {
  return (
    <div className={`mkt-toolpage__notes fx-cells fx-cells--${Math.min(items.length, 2)}`} data-count={items.length}>
      {items.map((c) => (
        <aside key={c.id} id={c.id} className="mkt-toolpage__note">
          <div className="mkt-toolpage__note-copy">
            <p className="mkt-toolpage__note-title">{c.title}</p>
            <p className="mkt-toolpage__note-body">{renderInline(c.body)}</p>
          </div>
          {c.link ? (
            <a className="mkt-toolpage__more" href={c.link.href}>
              {c.link.label}
            </a>
          ) : null}
        </aside>
      ))}
    </div>
  );
}

function BlockRow({ block }: { block: Exclude<TopicBlock, Callout> }) {
  switch (block.kind) {
    case 'figures':
      return (
        <section id={block.id} className="mkt-toolpage__sec fx-sec" data-kind={block.kind}>
          <ToolHead title={block.h2} accent={block.accent} sub={block.intro} />
          <ul className="mkt-toolpage__figs fx-cells fx-cells--bleed">
            {block.figures.map((f) => {
              const s = SOURCES[f.source];
              return (
                <li key={f.label} className="fx-stat">
                  <p className="fx-stat__fig">{f.value}</p>
                  <p className="fx-stat__label">{f.label}</p>
                  <p className="mkt-toolpage__cite">
                    {s.publisher},{' '}
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                    . Read {s.verified}.
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      );

    case 'steps':
      return (
        <section id={block.id} className="mkt-toolpage__sec fx-sec" data-kind={block.kind}>
          <ToolHead title={block.h2} accent={block.accent} sub={block.intro} />
          <ol className="mkt-toolpage__steps fx-cells fx-cells--bleed" data-count={block.steps.length}>
            {block.steps.map((s, i) => (
              <li key={s.title} className="fx-step">
                <span className="fx-step__num" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="fx-step__title">{s.title}</h3>
                <p className="fx-step__copy">{s.body}</p>
                {s.meta ? <span className="mkt-toolpage__step-meta">{s.meta}</span> : null}
              </li>
            ))}
          </ol>
        </section>
      );

    case 'checklist':
      return (
        <section id={block.id} className="mkt-toolpage__sec fx-sec" data-kind={block.kind}>
          <ToolHead title={block.h2} accent={block.accent} sub={block.intro} />
          <div className="mkt-toolpage__check fx-cells fx-cells--2 fx-cells--bleed">
            <div className="mkt-toolpage__check-col is-do">
              <p className="mkt-toolpage__check-head">{block.doLabel ?? 'Do this'}</p>
              <ul>
                {block.doItems.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="mkt-toolpage__check-col is-dont">
              <p className="mkt-toolpage__check-head">{block.dontLabel ?? 'Avoid this'}</p>
              <ul>
                {block.dontItems.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      );

    case 'prose': {
      const paras = Array.isArray(block.body) ? block.body : [block.body];
      return (
        <section id={block.id} className="mkt-toolpage__sec fx-sec" data-kind={block.kind}>
          <ToolHead title={block.h2} accent={block.accent} />
          <div className="mkt-toolpage__prose">
            {paras.map((p, i) => (
              <p key={i}>{renderInline(p)}</p>
            ))}
          </div>
        </section>
      );
    }

    default:
      return null;
  }
}

/**
 * The explainer under a tool, one framed row per block. Callouts that follow
 * each other share one row of cells instead of stacking as separate cards.
 */
export function ToolBlocks({ blocks }: { blocks: TopicBlock[] }) {
  const rows: (Exclude<TopicBlock, Callout> | Callout[])[] = [];
  for (const b of blocks) {
    if (b.kind === 'callout') {
      const last = rows[rows.length - 1];
      if (Array.isArray(last)) last.push(b);
      else rows.push([b]);
    } else {
      rows.push(b);
    }
  }
  return (
    <>
      {rows.map((row) =>
        Array.isArray(row) ? (
          <CalloutRow key={row[0].id} items={row} />
        ) : (
          <BlockRow key={row.id} block={row} />
        ),
      )}
    </>
  );
}

/** FAQ row: the shared accordion under a centred head. `children` sit under it. */
export function ToolFaqRow({
  faqs,
  children,
}: {
  faqs: { question: string; answer: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="mkt-toolpage__sec mkt-toolpage__sec--faq fx-sec">
      <ToolHead title="Questions teams ask" accent="teams ask" />
      <FaqAccordion items={faqs} />
      {children}
    </section>
  );
}

/** The other free tools, as link cells. */
export function MoreToolsRow({ slug }: { slug: string }) {
  return (
    <section className="mkt-toolpage__sec fx-sec">
      <ToolHead title="More free tools" accent="free tools" />
      <ul className="mkt-toolpage__tools fx-cells fx-cells--bleed">
        {otherTools(slug)
          .slice(0, 3)
          .map((t) => (
            <li key={t.slug}>
              <ToolCard tool={t} />
            </li>
          ))}
      </ul>
    </section>
  );
}
