import { Hero } from "@/components/sections/hero";
import { Celebrate } from "@/components/sections/celebrate";
import { CateringOptions } from "@/components/sections/catering-options";
import { BuildYourBar } from "@/components/sections/build-your-bar";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { Gallery } from "@/components/sections/gallery";
import { WhyMolaMola } from "@/components/sections/why";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Celebrate />
      <CateringOptions tabIndex="02" />
      <BuildYourBar tabIndex="03" />
      <HowItWorks tabIndex="04" />
      <Pricing variant="compact" tabIndex="05" />
      <Gallery variant="preview" tabIndex="06" />
      <WhyMolaMola tabIndex="07" />
      <FAQ tabIndex="08" limit={5} />
      <FinalCTA />
    </>
  );
}
