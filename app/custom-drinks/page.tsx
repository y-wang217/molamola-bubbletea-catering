import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/page-intro";
import { BuildYourBar } from "@/components/sections/build-your-bar";
import { CustomIdeas } from "@/components/sections/custom/ideas";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { CTAButton } from "@/components/ui/cta-button";

export const metadata: Metadata = { title: "Custom Drinks" };

export default function CustomDrinksPage() {
  return (
    <>
      <PageIntro
        label="Custom drinks"
        title="Your Event, Your Drink Bar."
        highlight="Your Drink Bar."
        intro="We love creating drinks that only exist for one day. Tell us the feeling, the colours or the story, and we'll build a drink around it."
        illustration="sticker"
        tone="pink"
      >
        <CTAButton href="/contact" arrow>
          Create a Custom Drink
        </CTAButton>
      </PageIntro>
      <BuildYourBar tabIndex="01" />
      <CustomIdeas tabIndex="02" />
      <FAQ tabIndex="03" topic="custom" />
      <FinalCTA />
    </>
  );
}
