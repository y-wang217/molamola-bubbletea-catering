import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/page-intro";
import { CateringPackages, ServiceComparison } from "@/components/sections/catering/packages";
import { HowItWorks } from "@/components/sections/how-it-works";
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
        intro="Drop-off cups for the office or a full drink bar for the big day. Here's everything each option includes."
        illustration="bar"
        tone="pink"
      />
      <CateringPackages />
      <ServiceComparison />
      <HowItWorks tabIndex="03" />
      <FAQ tabIndex="04" topic="service" />
      <FinalCTA />
    </>
  );
}
