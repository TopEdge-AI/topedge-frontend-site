import ProofWall from '../ProofWall';
import ProofBadges from '../ProofBadges';

/**
 * Home testimonials: the same review wall as /customers. Real faces and logos
 * only (published Trustpilot and Product Hunt reviews, live merchants,
 * platforms we are listed on); hover or focus a tile to read it. The review
 * scores sit under the heading so the wall below them can be checked.
 */
export default function HomeTestimonials() {
  return (
    <ProofWall
      title="Trusted by founders"
      highlight="we work with"
      sub="Hover any face or logo to read the published review or the brand behind it."
    >
      <ProofBadges compact />
    </ProofWall>
  );
}
