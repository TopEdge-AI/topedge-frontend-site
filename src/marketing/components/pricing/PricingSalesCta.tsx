import { ArrowUpRight } from 'lucide-react';
import { SALES_WHATSAPP_URL } from '../../lib/billingCatalog';
import MarketingCtaBand from '../MarketingCtaBand';

/** The pricing pages' closing card: the shared CTA, with one way in (sales on WhatsApp). */
export default function PricingSalesCta() {
  return (
    <MarketingCtaBand
      variant="inline"
      label="Talk to sales"
      eyebrow="Help"
      title="Still deciding? We're here"
      highlight="We're here"
      subtitle="Tell us your order volume on WhatsApp, we'll recommend a plan and help you launch your first recovery flow."
      actions={
        <a className="mkt-btn-primary" href={SALES_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          Talk to sales on WhatsApp <ArrowUpRight size={16} aria-hidden />
        </a>
      }
    />
  );
}
