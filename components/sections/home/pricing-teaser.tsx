import { findTier, pricingNote, pricingTeaser } from "@/content/pricing";
import { CTAButton } from "@/components/ui/cta-button";
import { Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { DoodleDecoration } from "@/components/doodles/doodle";

/** Homepage: three simple price indicators read from content/pricing.ts. Full breakdown lives on /pricing. */
export function PricingTeaser() {
  return (
    <Section id="pricing-teaser" className="!pb-10 sm:!pb-14">
      <Container className="max-w-5xl">
        <SectionHeader
          tab={{ index: "06", label: "Pricing" }}
          title="Catering That Fits Your Event"
          highlight="Fits"
          align="center"
          intro={<span className="font-semibold text-ink">Ready-to-Serve · Full Service · Custom Packages</span>}
        />

        <Reveal className="relative mt-12">
          <DoodleDecoration kind="star" className="absolute -top-5 -left-3 h-10 w-10" motion="twinkle" />
          <ul className="grid divide-y-[1.5px] divide-dashed divide-ink/25 rounded-[var(--radius-card)] border-[1.5px] border-ink bg-paper sm:grid-cols-3 sm:divide-x-[1.5px] sm:divide-y-0">
            {pricingTeaser.map((item) => {
              const tier = findTier(item.tierId);
              return (
                <li key={item.label} className="flex items-center justify-between gap-4 px-6 py-5 sm:block sm:px-8 sm:py-8 sm:text-center">
                  <div>
                    <p className="text-[13px] font-bold tracking-[0.14em] uppercase">{item.label}</p>
                    <p className="font-hand text-lg leading-tight text-cocoa">{item.note}</p>
                  </div>
                  <p className="text-right sm:mt-4 sm:text-center">
                    {tier && <span className="block font-hand text-lg leading-none text-cocoa">from</span>}
                    <span className="font-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{tier ? tier.price : item.fallback}</span>
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <p className="text-[15px] text-cocoa">{pricingNote}</p>
          <CTAButton href="/pricing" arrow>
            View Pricing
          </CTAButton>
        </div>
      </Container>
    </Section>
  );
}
