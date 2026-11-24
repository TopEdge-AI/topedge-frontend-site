import { Link } from 'react-router-dom';
import { Compass, Link2, Receipt, ShoppingCart, Truck } from 'lucide-react';
import type { FreeTool } from '../../data/freeTools';
import '../../styles/tools.css';

const ICONS = {
  compass: Compass,
  truck: Truck,
  cart: ShoppingCart,
  link: Link2,
  receipt: Receipt,
};

/**
 * One tool as a link cell: the whole cell is the link. It sits in an
 * `.fx-cells` grid, so it carries no border, radius or shadow of its own.
 */
export function ToolCard({ tool }: { tool: FreeTool }) {
  const Icon = ICONS[tool.icon];
  return (
    <Link to={tool.href} className={`mkt-tool-card${tool.feature ? ' is-feature' : ''}`}>
      <span className="mkt-tool-card__tag">
        <Icon size={16} strokeWidth={2} aria-hidden />
        Free · {tool.tag}
      </span>
      <span className="mkt-tool-card__title">{tool.title}</span>
      <span className="mkt-tool-card__body">{tool.body}</span>
      <span className="mkt-tool-card__cta">Open the tool</span>
    </Link>
  );
}

export default function ToolCards({ tools }: { tools: FreeTool[] }) {
  return (
    <ul className="mkt-toolpage__tools fx-cells">
      {tools.map((t) => (
        <li key={t.slug}>
          <ToolCard tool={t} />
        </li>
      ))}
    </ul>
  );
}
