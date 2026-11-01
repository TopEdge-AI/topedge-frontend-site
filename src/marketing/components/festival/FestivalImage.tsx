import { useState } from 'react';
import { FestivalArt } from './FestivalMark';
import { festivalImage } from '../../data/festivalImages';

/**
 * A festival's picture, with the drawn mark behind it.
 *
 * Photography is better than geometry when there is a photo to use, and there
 * will not always be one: the catalog covers twenty-five festivals and the
 * image map ships empty, so every slot has to look deliberate while it waits.
 * A missing URL renders the drawn mark, and a URL that 404s or gets blocked by
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
