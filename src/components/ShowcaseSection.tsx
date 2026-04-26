import ShowcaseCarousel from "./ShowcaseCarousel";
import { showcaseItems } from "../data/showcaseItems";

export default function ShowcaseSection() {
  return (
    <section className="showcase">
      <h2 className="showcase-section-title">Technical Highlights</h2>
      <ShowcaseCarousel items={showcaseItems} />
    </section>
  );
}
