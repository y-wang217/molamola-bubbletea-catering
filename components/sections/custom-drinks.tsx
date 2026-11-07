import { customDrinkIdeas } from "@/content/custom-drinks";
import { FeatureCard } from "@/components/ui/cards";
import { CTAButton } from "@/components/ui/cta-button";
import { Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";

export function CustomDrinks({ asPage = false, tabIndex = "04" }: { asPage?: boolean; tabIndex?: string }) {
  return (
    <Section id="custom-drinks" className={asPage ? "pt-12 sm:pt-16" : ""}>
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            as={asPage ? "h1" : "h2"}
            tab={{ index: tabIndex, label: "Custom drinks" }}
            title="Your Event, Your Drink Bar."
            highlight="Your Drink Bar."
            intro="We love creating drinks that only exist for one day. Tell us the feeling, the colours or the story, and we'll build a drink around it."
          />
          <Reveal delay={0.2} className="shrink-0">
            <CTAButton href="/contact" arrow>
              Create a Custom Drink
            </CTAButton>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {customDrinkIdeas.map((idea, i) => (
            <Reveal as="li" key={idea.id} delay={(i % 3) * 0.1} className={i % 3 === 1 ? "lg:translate-y-10" : ""}>
              <FeatureCard
                title={idea.title}
                body={idea.description}
                illustration={idea.illustration}
                tone={idea.tone}
                footer={<p className="mt-5 border-t-[1.5px] border-dashed border-ink/25 pt-4 font-hand text-[1.4rem] leading-tight">e.g. {idea.example}</p>}
              />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
