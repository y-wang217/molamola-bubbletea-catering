import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/page-intro";
import { CateringOptions } from "@/components/sections/catering-options";
import { HowItWorks } from "@/components/sections/how-it-works";
import { BuildYourBar } from "@/components/sections/build-your-bar";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = { title: "Catering" };

export default function CateringPage() {
  return (
    <>
      <PageIntro
        label="Catering"
        title="Drink Catering, Your Way"
        highlight="Your Way"
        intro="Drop-off cups for the office or a full drink bar for the big day. Every option can be customized to fit your event."
        illustration="bar"
        tone="pink"
      />
      <CateringOptions detailed tabIndex="01" />
      <HowItWorks tabIndex="02" />
      <BuildYourBar tabIndex="03" />
      <FAQ tabIndex="04" />
      <FinalCTA />
    </>
  );
}
