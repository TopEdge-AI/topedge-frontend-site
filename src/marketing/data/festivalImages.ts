/**
 * Festival photography.
 *
 * ── How to add an image ──────────────────────────────────────────────────
 * Paste a direct image URL next to the festival name below. The key must match
 * `catalogName` in festivalTemplates.ts exactly. Anything left empty falls back
 * to the drawn festival mark, and a URL that fails to load falls back to the
 * same thing, so a dead link never leaves a blank card.
 *
 * You can also drop files into `public/marketing/festivals/<slug>.webp` and
 * reference them as `/marketing/festivals/<slug>.webp` — a local file is faster
 * than a hotlink, survives the other host going down, and is the better option
 * for anything you will keep.
 *
 * ── Before you paste one ─────────────────────────────────────────────────
 * Use a host that serves HTTPS and allows hotlinking, keep each image under
 * about 100 KB (the build's image-weight check only measures local files, so
 * nothing will catch a 2 MB hotlink for you), and make sure you hold the
 * commercial rights. These render on public marketing pages, which is exactly
 * where an unlicensed stock photo turns into an invoice.
 *
 * Landscape crops work best: the slot renders at roughly 2.4:1 inside the
 * WhatsApp header and 16:9 on a card cover.
 */
export const FESTIVAL_IMAGES: Record<string, string> = {
  "New Year's Day": '',
  'Makar Sankranti / Pongal': '',
  'Vasant Panchami': '',
  'Maha Shivaratri': '',
  Holi: '',
  'Ugadi / Gudi Padwa': '',
  'Eid-ul-Fitr / Ramzan Eid': '',
  'Rama Navami': '',
  'Good Friday': '',
  Easter: '',
  'Akshaya Tritiya': '',
  'Eid-ul-Adha / Bakri Eid': '',
  Onam: '',
  'Milad-un-Nabi': '',
  'Raksha Bandhan': '',
  'Krishna Janmashtami': '',
  'Ganesh Chaturthi': '',
  'Navratri / Durga Puja': '',
  Dussehra: '',
  'Karwa Chauth': '',
  Dhanteras: '',
  Diwali: '',
  'Bhai Dooj': '',
  'Chhath Puja': '',
  Christmas: '',
};

/** A usable image URL for a festival, or null to fall back to the drawn mark. */
export function festivalImage(catalogName: string): string | null {
  const url = FESTIVAL_IMAGES[String(catalogName || '').trim()];
  if (!url) return null;
  return /^(https?:\/\/|\/)/i.test(url) ? url : null;
}
