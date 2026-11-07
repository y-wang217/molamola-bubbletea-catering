import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { WhyMolaMola } from "@/components/sections/why";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <About asPage tabIndex="01" />
      <WhyMolaMola tabIndex="02" />
      <FinalCTA />
    </>
  );
}
