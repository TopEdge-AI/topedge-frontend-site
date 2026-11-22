import { ReactNode } from 'react';
import '../../styles/aurora.css';
import { cn } from '@/lib/utils';
import type { ProductGlow, ProductPageId } from '../../data/productPages';

export type MeshTint = ProductGlow | 'default';

export type MeshKey = ProductPageId | 'features-index' | 'default';

/**
 * Coded aurora palette per page, in the style of the home hero
 * (/hero-aurora-preview.jpg). Same family everywhere, different light per page.
 * See styles/aurora.css.
 */
export const AURORA_PALETTE: Record<MeshKey, string> = {
  'flow-builder': 'iris',
  'opt-in-tools': 'bloom',
  campaigns: 'dawn',
  'audience-crm': 'lagoon',
  journeys: 'orchid',
  'tracking-pixel': 'mint',
  'ai-brain': 'dusk',
  'meta-manager': 'sunrise',
  'chat-rules': 'orchid',
  warranty: 'mint',
  'profit-loss': 'sunrise',
  'intent-detection': 'lagoon',
  'cod-confirmation': 'mint',
  'features-index': 'iris',
  default: 'iris',
};

/**
 * First-viewport atmosphere: the coded aurora in the page's palette
 * (same language as the home hero, different light per page).
 */
export default function FeatureMeshStage({
  mesh = 'default',
  children,
  className,
  fillViewport = true,
}: {
  mesh?: MeshKey;
  /** @deprecated unused, color comes from the AI mesh image */
  tint?: MeshTint;
  children: ReactNode;
  className?: string;
  fillViewport?: boolean;
}) {
  const palette = AURORA_PALETTE[mesh] ?? AURORA_PALETTE.default;

  return (
    <div
      className={cn(
        'mkt-pf__stage',
        !fillViewport && 'mkt-pf__stage--compact',
        className,
      )}
    >
      <div className="mkt-pf__mesh mkt-pf__mesh--aurora" aria-hidden>
        <div className="aurora" data-palette={palette} data-variant="0" />
      </div>
      <div className="mkt-pf__stage-content">{children}</div>
    </div>
  );
}
