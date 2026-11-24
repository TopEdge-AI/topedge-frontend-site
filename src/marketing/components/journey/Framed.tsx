import { Link } from 'react-router-dom';

/**
 * Small pieces the template, festival and journey pages share on the framed
 * layout (styles/frame.css): the visible breadcrumb, the centred section head,
 * and the related-links cells. (Topic blocks as rows live in FramedBlocks.)
 *
 * Nothing here writes copy. Every string is passed in by the page, and the
 * breadcrumb mirrors the BreadcrumbList the page already sends as JSON-LD.
 */

export type Crumb = { name: string; path?: string };

export function FxCrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="fx-crumbs">
        {items.map((c, i) =>
          i < items.length - 1 && c.path ? (
            <li key={c.name}>
              <Link to={c.path}>{c.name}</Link>
            </li>
          ) : (
            <li key={c.name} aria-current="page">
              {c.name}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

/** Same split SectionHeading does: one phrase carries the lilac highlight. */
function withAccent(title: string, accent?: string) {
  if (!accent) return title;
  const i = title.indexOf(accent);
  if (i < 0) return title;
  return (
    <>
      {title.slice(0, i)}
      <span className="mkt-hl">{accent}</span>
      {title.slice(i + accent.length)}
    </>
  );
}

export function FxHead({
  title,
  accent,
  subtitle,
  id,
}: {
  title: string;
  accent?: string;
  subtitle?: string;
  id?: string;
}) {
  return (
    <div className="fx-head">
      <h2 className="fx-head__title" id={id}>
        {withAccent(title, accent)}
      </h2>
      {subtitle && <p className="fx-head__sub">{subtitle}</p>}
    </div>
  );
}

/** Related pages as link cells with a chevron, run to the rails. */
export function FxLinks({ items }: { items: { label: string; href: string }[] }) {
  // Four across by default; five or six links sit in one or two even rows.
  const cols = items.length === 5 ? 5 : items.length === 6 || items.length === 3 ? 3 : 4;
  return (
    <ul className={`fx-cells fx-cells--bleed fx-links fx-links--${cols}`}>
      {items.map((r) => (
        <li key={r.href}>
          <Link to={r.href} className="fx-link">
            {r.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
