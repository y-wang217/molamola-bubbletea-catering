import type { Metadata } from "next";
import { FullServiceIncludes, PricingAddOns, PricingTiers } from "@/components/sections/pricing/pricing-details";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <>
      <PricingTiers />
      <FullServiceIncludes />
      <PricingAddOns />
      <FAQ tabIndex="04" topic="pricing" />
      <FinalCTA />
    </>
  );
}
