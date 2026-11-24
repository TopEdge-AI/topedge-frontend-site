import type { ReactNode } from 'react';
import { Lock } from 'lucide-react';
import MarketingSEO from '../MarketingSEO';
import MarketingPage from '../MarketingPage';
import MarketingCtaBand from '../MarketingCtaBand';
import type { TopicBlock } from '../topic/TopicBlocks';
import { MoreToolsRow, ToolBlocks, ToolFaqRow, ToolHero } from './ToolFrame';
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from '../../data/pageSeo';
import '../../styles/tools.css';

/** One free tool page: hero, the tool itself, the explainer, FAQ, more tools. */
export default function ToolPageLayout({
  slug,
  path,
  seoTitle,
  description,
  keywords,
  name,
  h1,
  accent,
  subtitle,
  privacy,
  blocks,
  faqs,
  cta,
  children,
}: {
  slug: string;
  path: string;
  seoTitle: string;
  description: string;
  keywords: string;
  /** Short name for the breadcrumb and structured data. */
  name: string;
  h1: string;
  accent?: string;
  subtitle: string;
  /** Shown under the tool: what happens to what the visitor types. */
  privacy: string;
  blocks: TopicBlock[];
  faqs: { question: string; answer: string }[];
  cta: { title: string; subtitle: string };
  children: ReactNode;
}) {
  return (
    <>
      <MarketingSEO
        title={seoTitle}
        description={description}
        keywords={keywords}
        path={path}
        noSuffix
        faqSchema={faqs}
        jsonLd={[
          organizationJsonLd(),
          softwareApplicationJsonLd(),
          webPageJsonLd({ name, description, path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Free tools', path: '/tools' },
            { name, path },
          ]),
        ]}
      />
      <MarketingPage className="mkt-toolpage fx">
        <div className="fx-shell">
          <ToolHero
            crumbs={[{ name: 'Free tools', to: '/tools' }, { name }]}
            title={h1}
            accent={accent}
            subtitle={subtitle}
          />

          {/* The tool is the star: a split row, inputs on white, the live
              answer on the lilac half. */}
          <div className="mkt-toolpage__tool mkt-tool">
            {children}
            <p className="mkt-tool__privacy">
              <Lock size={14} strokeWidth={2.2} aria-hidden />
              {privacy}
            </p>
          </div>

          <ToolBlocks blocks={blocks} />
          <ToolFaqRow faqs={faqs} />
          <MoreToolsRow slug={slug} />

          <MarketingCtaBand
            title={cta.title}
            subtitle={cta.subtitle}
            primaryLabel="Start free"
            secondaryLabel="See pricing"
            secondaryTo="/pricing"
          />
        </div>
      </MarketingPage>
    </>
  );
}
