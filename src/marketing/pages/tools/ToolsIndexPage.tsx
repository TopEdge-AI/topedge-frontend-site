import { Link } from 'react-router-dom';
import MarketingSEO from '../../components/MarketingSEO';
import MarketingPage from '../../components/MarketingPage';
import MarketingCtaBand from '../../components/MarketingCtaBand';
import TrustBand from '../../components/journey/TrustBand';
import { ToolCard } from '../../components/tools/ToolCards';
import { ToolHero } from '../../components/tools/ToolFrame';
import { FREE_TOOLS, TOOLS_PATH } from '../../data/freeTools';
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  webPageJsonLd,
} from '../../data/pageSeo';
import '../../styles/tools.css';

const DESCRIPTION =
  'Free tools for Shopify stores in India: a WhatsApp tool quiz, RTO and cart recovery calculators, and a WhatsApp link and QR code generator.';

export default function ToolsIndexPage() {
  const [feature, ...rest] = FREE_TOOLS;
  return (
    <>
      <MarketingSEO
        title="Free Tools for Shopify Stores in India | TopEdge AI"
        description={DESCRIPTION}
        keywords="free Shopify tools, RTO calculator, cart recovery calculator, WhatsApp link generator, best WhatsApp tool for Shopify, ecommerce tools India"
        path={TOOLS_PATH}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({ name: 'Free tools for Shopify stores', description: DESCRIPTION, path: TOOLS_PATH }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Free tools', path: TOOLS_PATH },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Free tools for Shopify stores',
            itemListElement: FREE_TOOLS.map((t, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: t.title,
              url: `https://topedgeai.com${t.href}`,
            })),
          },
        ]}
      />
      <MarketingPage className="mkt-toolpage mkt-toolpage--hub fx">
        <div className="fx-shell">
          <ToolHero
            crumbs={[{ name: 'Free tools' }]}
            title="Free tools for Shopify stores"
            accent="Free tools"
            subtitle="Free calculators and generators for Indian Shopify stores, covering RTO cost, abandoned cart recovery and WhatsApp links, with no sign-up."
          />

          <div className="mkt-toolpage__hub">
            <ul className="mkt-toolpage__tools fx-cells">
              <li className="is-feature">
                <ToolCard tool={feature} />
              </li>
              {rest.map((t) => (
                <li key={t.slug}>
                  <ToolCard tool={t} />
                </li>
              ))}
            </ul>
            <p className="mkt-tool__privacy">
              No sign-up, no email, nothing to install.{' '}
              <Link to="/contact" className="font-medium text-[#7C3AED] hover:underline">
                Suggest a tool
              </Link>
            </p>
          </div>

          <section className="mkt-toolpage__sec mkt-toolpage__sec--trust fx-sec">
            <TrustBand title="Made by the team behind TopEdge AI, used by Shopify brands" />
          </section>

          <MarketingCtaBand
            title="When you are ready to automate it"
            subtitle="COD confirmation, cart recovery and order updates on WhatsApp for your Shopify store. Free for 14 days."
            primaryLabel="Start free"
            secondaryLabel="See pricing"
            secondaryTo="/pricing"
          />
        </div>
      </MarketingPage>
    </>
  );
}
