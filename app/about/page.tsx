import type { Metadata } from "next";
import { AboutIntro, OurStory, Team, WhyAFish } from "@/components/sections/about";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <OurStory />
      <WhyAFish />
      <Team />
      <FinalCTA />
    </>
  );
}
