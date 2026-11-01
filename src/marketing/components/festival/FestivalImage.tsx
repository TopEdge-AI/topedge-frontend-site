import { useState } from 'react';
import FestivalMark, { FestivalArt } from './FestivalMark';
import { festivalImage } from '../../data/festivalImages';

/**
 * A festival's artwork, full bleed.
 *
 * Every festival ships a drawn scene under `public/marketing/festivals/`, and
 * the map in festivalImages.ts is where a real photograph replaces one. A
 * missing entry renders the drawn mark, and a URL that 404s or gets blocked by
 * a hotlink rule falls back to the same mark at runtime rather than leaving a
 * grey box on a public page.
 */
export default function FestivalImage({
  catalogName,
  className = '',
}: {
  catalogName: string;
  className?: string;
}) {
  const src = festivalImage(catalogName);
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <FestivalArt festivalName={catalogName} className={className} />;
  }

  return (
    <span className={`mkt-fest-photo ${className}`.trim()} aria-hidden>
      <img
        src={src}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

/**
 * The same artwork as a small rounded square, for list rows and card headers.
 *
 * The scenes are composed around their centre precisely so this crop still
 * lands on the subject — a merchant scanning a rail of twenty-five should be
 * able to tell Diwali from Christmas without reading the label. Falls back to
 * the drawn mark, which already fills that box.
 */
export function FestivalThumb({
  catalogName,
  className = '',
}: {
  catalogName: string;
  className?: string;
}) {
  const src = festivalImage(catalogName);
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <FestivalMark festivalName={catalogName} className={className} />;
  }

  return (
    <span className={`mkt-fest-thumb ${className}`.trim()} aria-hidden>
      <img
        src={src}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
