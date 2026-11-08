"use client";

import { messageLink } from "@/content/site";
import { Cup, useCupLayers } from "@/components/doodles/cup";
import { Mascot } from "@/components/doodles/mascot";
import { DoodleDecoration } from "@/components/doodles/doodle";
import { CTAButton } from "@/components/ui/cta-button";
import { Container, Section } from "@/components/ui/layout";
import { Parallax, Reveal, HandUnderline } from "@/components/ui/motion";

export function FinalCTA() {
  const full = useCupLayers({ tea: 1, milk: 0, ice: 1, toppings: 1, sticker: 1 });
  return (
    <Section id="final-cta" className="pt-10">
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-sheet)] border-[1.5px] border-linework bg-butter px-6 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24">
          <div aria-hidden className="dot-grid absolute inset-0 opacity-60" />
          <DoodleDecoration kind="star" className="absolute top-8 left-[44%] h-9 w-9" motion="twinkle" />
          <DoodleDecoration kind="heart" className="absolute bottom-10 left-[8%] hidden h-9 w-9 lg:block" motion="bob" />
          <DoodleDecoration kind="sparkle" className="absolute top-12 right-[8%] h-8 w-8" motion="twinkle" delay={1} />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
            <Reveal>
              <h2 className="font-display text-[2.6rem] leading-[0.98] font-extrabold tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
                Let&apos;s Make Something <HandUnderline color="#6b4a33">Delicious</HandUnderline> Together.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/80">Tell us about your event and we&apos;ll help create a drink experience that fits it.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <CTAButton href="/contact" arrow>
                  Get a Catering Quote
                </CTAButton>
                <CTAButton href={messageLink} external variant="secondary">
                  Message MolaMola
                </CTAButton>
              </div>
            </Reveal>

            <div className="relative mx-auto flex w-full max-w-[26rem] items-end justify-center">
              <Parallax speed={0.8} className="relative z-10 -mr-8 mb-8 w-[52%]">
                <Mascot className="h-auto w-full -scale-x-100" hat expression="wink" float title="The MolaMola fish, winking" />
              </Parallax>
              <Parallax speed={0.3} className="w-[54%]">
                <Cup layers={full} liquid="#f6b98a" toppingKinds={["boba", "fruit"]} label="for you!" title="A finished MolaMola drink" />
              </Parallax>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
