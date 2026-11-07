import { Hero } from "@/components/sections/hero";
import { Celebrate } from "@/components/sections/home/celebrate";
import { CateringIntro } from "@/components/sections/home/catering-intro";
import { DrinkJourney } from "@/components/sections/home/drink-journey";
import { WhyMolaMola } from "@/components/sections/home/why";
import { FeaturedEvents } from "@/components/sections/home/featured-events";
import { PricingTeaser } from "@/components/sections/home/pricing-teaser";
import { FinalCTA } from "@/components/sections/final-cta";

// Homepage = curated overview. Each section previews a topic and links to its page for the full story.
export default function Home() {
  return (
    <>
      <Hero />
      <Celebrate />
      <CateringIntro />
      <DrinkJourney />
      <WhyMolaMola />
      <FeaturedEvents />
      <PricingTeaser />
      <FinalCTA />
    </>
  );
}
