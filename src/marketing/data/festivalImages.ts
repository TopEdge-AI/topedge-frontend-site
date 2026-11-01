/**
 * Festival artwork.
 *
 * Each festival points at a drawn scene in `public/marketing/festivals/`, built
 * by `scripts/gen-festival-art.mjs`: a lit background in the festival's own
 * palette with the subject composed around the centre, so the same file works
 * as a 2.4:1 WhatsApp media header, a 16:9 card cover and a square thumbnail.
 *
 * ── Swapping in a photograph ─────────────────────────────────────────────
 * Replace a value below with your own URL. The key must match `catalogName` in
 * festivalTemplates.ts exactly. Local files are better than hotlinks — drop
 * them in `public/marketing/festivals/` and reference them as
 * `/marketing/festivals/<name>.webp`. A hotlink needs a host that serves HTTPS
 * and allows it, should stay under about 100 KB (the build's image-weight check
 * only measures local files), and has to be an image you hold the commercial
 * rights to: these render on public marketing pages, which is exactly where an
 * unlicensed stock photo turns into an invoice.
 *
 * Anything left empty, and any URL that fails to load, falls back to the drawn
 * festival mark at runtime, so a dead link never leaves a blank card.
 */

/** Everything under `public/marketing/festivals/`, keyed by festival slug. */
const scene = (slug: string) => `/marketing/festivals/${slug}.svg`;

export const FESTIVAL_IMAGES: Record<string, string> = {
  "New Year's Day": scene('new-year'),
  'Makar Sankranti / Pongal': scene('makar-sankranti-pongal'),
  'Vasant Panchami': scene('vasant-panchami'),
  'Maha Shivaratri': scene('maha-shivaratri'),
  Holi: scene('holi'),
  'Ugadi / Gudi Padwa': scene('ugadi-gudi-padwa'),
  'Eid-ul-Fitr / Ramzan Eid': scene('eid-ul-fitr'),
  'Rama Navami': scene('rama-navami'),
  'Good Friday': scene('good-friday'),
  Easter: scene('easter'),
  'Akshaya Tritiya': scene('akshaya-tritiya'),
  'Eid-ul-Adha / Bakri Eid': scene('eid-ul-adha'),
  Onam: scene('onam'),
  'Milad-un-Nabi': scene('milad-un-nabi'),
  'Raksha Bandhan': scene('raksha-bandhan'),
  'Krishna Janmashtami': scene('krishna-janmashtami'),
  'Ganesh Chaturthi': scene('ganesh-chaturthi'),
  'Navratri / Durga Puja': scene('navratri-durga-puja'),
  Dussehra: scene('dussehra'),
  'Karwa Chauth': scene('karwa-chauth'),
  Dhanteras: scene('dhanteras'),
  Diwali: scene('diwali'),
  'Bhai Dooj': scene('bhai-dooj'),
  'Chhath Puja': scene('chhath-puja'),
  Christmas: scene('christmas'),
};

/** A usable image URL for a festival, or null to fall back to the drawn mark. */
export function festivalImage(catalogName: string): string | null {
  const url = FESTIVAL_IMAGES[String(catalogName || '').trim()];
  if (!url) return null;
  return /^(https?:\/\/|\/)/i.test(url) ? url : null;
}
