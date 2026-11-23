import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { PrimaryButton, GhostButton } from './ui';
import { highlightTitle } from '../lib/highlight';

/**
 * The closing call to action, the same card on every page: dithered violet at
 * both edges fading out toward the middle, a centred two-line title with the
 * second line highlighted, one grey line, then the buttons.
 *
 * A plain-string `title` gets its closing phrase highlighted on its own line
 * (`highlight` picks the phrase; the last two words by default). Pass `actions`
 * to replace the default Start free / secondary pair and `meta` for the small
 * line under the buttons; /partners uses both.
 */
export default function MarketingCtaBand({
  eyebrow,
  title,
  subtitle,
  primaryLabel = 'Start free',
  primaryTo = '/signup',
  primaryHref,
  secondaryLabel,
  secondaryTo,
  secondaryHref,
  highlight,
  actions,
  meta,
  label = 'Start free',
  variant = 'page',
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  secondaryHref?: string;
  /** Phrase in a plain-string `title` to carry the lilac highlight; defaults to the last two words. */
  highlight?: string;
  /** Replaces the default buttons. */
  actions?: ReactNode;
  /** A small line under the buttons. */
  meta?: ReactNode;
  /** Accessible name of the section. */
  label?: string;
  /** `inline` sits inside a content column (a blog post, a pricing page) instead of spanning the page. */
  variant?: 'page' | 'inline';
  /** Extra content under the buttons, such as a published review. */
  children?: ReactNode;
}) {
  const arrow = <ArrowRight size={16} aria-hidden />;

  return (
    <section className={variant === 'inline' ? 'mkt-cta mkt-cta--inline' : 'mkt-cta'} aria-label={label}>
      <div className="mkt-cta__card">
        <div className="mkt-cta__inner">
          {eyebrow ? <p className="mkt-cta__eyebrow">{eyebrow}</p> : null}
          <h2 className="mkt-cta__title">
            {typeof title === 'string' ? highlightTitle(title, highlight, { stacked: true }) : title}
          </h2>
          {subtitle ? <p className="mkt-cta__sub">{subtitle}</p> : null}
          <div className="mkt-cta__actions">
            {actions ?? (
              <>
                {primaryHref ? (
                  <PrimaryButton href={primaryHref} className="mkt-cta__primary">
                    {primaryLabel} {arrow}
                  </PrimaryButton>
                ) : (
                  <PrimaryButton to={primaryTo} className="mkt-cta__primary">
                    {primaryLabel} {arrow}
                  </PrimaryButton>
                )}
                {secondaryLabel && (secondaryHref || secondaryTo) ? (
                  secondaryHref ? (
                    <GhostButton href={secondaryHref} className="mkt-cta__secondary">
                      {secondaryLabel}
                    </GhostButton>
                  ) : (
                    <GhostButton to={secondaryTo!} className="mkt-cta__secondary">
                      {secondaryLabel}
                    </GhostButton>
                  )
                ) : null}
              </>
            )}
          </div>
          {meta ? <p className="mkt-cta__meta">{meta}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
