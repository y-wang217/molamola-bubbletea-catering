import type { Metadata } from "next";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <>
      <Pricing variant="full" asPage tabIndex="01" />
      <FAQ tabIndex="02" limit={5} />
      <FinalCTA />
    </>
  );
}
