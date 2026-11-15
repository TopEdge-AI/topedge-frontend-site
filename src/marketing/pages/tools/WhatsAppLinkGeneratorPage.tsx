import ToolPageLayout from '../../components/tools/ToolPageLayout';
import WhatsAppLinkGenerator from '../../components/tools/WhatsAppLinkGenerator';
import type { TopicBlock } from '../../components/topic/TopicBlocks';

const FAQS = [
  {
    question: 'How do I create a WhatsApp link?',
    answer:
      'Pick your country code, type your WhatsApp number, add a message if you want one, and copy the link this generator makes. It is a wa.me link that opens a chat with you in one tap, and it is ready to paste into your bio, emails, ads or website.',
  },
  {
    question: 'What is the wa.me link format?',
    answer:
      'https://wa.me/ followed by your full number in international format, with no plus sign, spaces, brackets, dashes or leading zero. For the Indian number 98765 43210 that is https://wa.me/919876543210. This is the format WhatsApp’s own click to chat help page gives.',
  },
  {
    question: 'How do I make a WhatsApp link with a pre-filled message?',
    answer:
      'Add ?text= and your message to the end of the link, with spaces and symbols URL-encoded, for example https://wa.me/919876543210?text=Hi%21%20I%20want%20to%20place%20an%20order. This generator does the encoding for you: type the message or pick a ready-made one and copy the link. The customer can still edit the text before sending.',
  },
  {
    question: 'What is click to chat on WhatsApp?',
    answer:
      'A wa.me link that opens a WhatsApp chat with you without the customer saving your number first. If it carries a pre-filled message, that text is already typed in the chat box. Click to chat works on phones and on WhatsApp Web.',
  },
  {
    question: 'Is there a free WhatsApp QR code generator?',
    answer:
      'Yes, this page. Enter your number and the QR code appears next to your link, ready to download as a PNG for print or an SVG that stays sharp at any size. Scanning it opens the same chat, with the same pre-filled message.',
  },
  {
    question: 'How do I add a WhatsApp link to my Instagram bio?',
    answer:
      'Copy your wa.me link from this generator and paste it into the links field of your Instagram profile. Add a pre-filled message such as “Hi! I’d like to know more about your products” so you can tell Instagram chats apart from other enquiries.',
  },
  {
    question: 'Why is my WhatsApp link not working?',
    answer:
      'Usually the number is in the wrong format: a plus sign, a leading zero, spaces or dashes, or a missing country code. The link also only opens a chat if the number is registered on WhatsApp. This generator strips spaces and leading zeros and checks the digit count for the country you pick.',
  },
  {
    question: 'Is this WhatsApp link generator free?',
    answer:
      'Yes, completely. There is no sign-up, and it runs in your browser, so the number and message you type are never sent to us.',
  },
  {
    question: 'Where should a Shopify store use the link?',
    answer:
      'On product pages, in the footer, on order confirmation emails, in your Instagram bio, and as a QR code on packaging or invoices. Every place a customer might have a question before or after buying.',
  },
  {
    question: 'Does the chat button slow down my Shopify store?',
    answer:
      'No. The button is a few lines of HTML with an inline icon. It loads no script and no external file, so it has no measurable effect on page speed.',
  },
  {
    question: 'Can I reply to these chats from a shared inbox?',
    answer:
      'Yes, if the number is connected to a WhatsApp Business Platform tool. On TopEdge AI the chat lands in a shared inbox with the customer’s Shopify order shown beside it.',
  },
];

const BLOCKS: TopicBlock[] = [
  {
    kind: 'steps',
    id: 'where',
    h2: 'Where to put the link',
    accent: 'put the link',
    steps: [
      { title: 'Product pages', body: 'A “Questions? Chat with us” link next to the Add to cart button answers doubts before they turn into an abandoned cart.' },
      { title: 'Order confirmation emails', body: 'One link for “where is my order” and address changes, so customers do not have to find your number.' },
      { title: 'Packaging and invoices', body: 'Print the QR code. Scanning it opens a chat for reorders, reviews and support.' },
      { title: 'Instagram bio and ads', body: 'Click-to-chat turns profile visits and ad clicks into conversations you can follow up.' },
      { title: 'Your store’s chat button', body: 'Paste the button code above into your theme so it sits on every page.' },
    ],
  },
  {
    kind: 'callout',
    id: 'automation',
    tone: 'note',
    title: 'Getting more chats than you can answer?',
    body: 'Connect your number to TopEdge AI and every chat lands in one shared inbox with the customer’s Shopify order beside it, plus ready-made replies for order status.',
    link: { label: 'See the Shopify WhatsApp integration', href: '/shopify-whatsapp-integration' },
  },
  {
    kind: 'callout',
    id: 'button-guide',
    tone: 'note',
    title: 'Code button, menu link or app widget?',
    body: 'Three ways to put WhatsApp on your Shopify store, step by step, with what each one costs and what it can and cannot do.',
    link: { label: 'Add a WhatsApp chat button to Shopify', href: '/blog/add-whatsapp-chat-button-shopify' },
  },
];

export default function WhatsAppLinkGeneratorPage() {
  return (
    <ToolPageLayout
      slug="whatsapp-link-generator"
      path="/tools/whatsapp-link-generator"
      seoTitle="WhatsApp Link Generator: Free wa.me Link & QR Code"
      description="Free WhatsApp link generator: create a wa.me click-to-chat link and QR code with a pre-filled message, plus a Shopify chat button. No sign-up."
      keywords="WhatsApp link generator, wa.me link generator, WhatsApp QR code generator, click to chat link, WhatsApp button for Shopify, WhatsApp chat link India"
      name="WhatsApp link generator"
      h1="WhatsApp link generator with free QR code"
      accent="WhatsApp link"
      subtitle="Make a click-to-chat link, a QR code and a chat button for your store. Free, no sign-up."
      privacy="Runs entirely in your browser. Your number and message are never sent to us."
      blocks={BLOCKS}
      faqs={FAQS}
      cta={{
        title: 'Turn those chats into sales',
        subtitle: 'Answer every WhatsApp chat from one inbox, with the Shopify order beside it. Free for 14 days.',
      }}
    >
      <WhatsAppLinkGenerator />
    </ToolPageLayout>
  );
}
