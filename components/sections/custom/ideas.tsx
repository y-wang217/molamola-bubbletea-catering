import { customDrinkIdeas } from "@/content/custom-drinks";
import { Illustration } from "@/components/doodles/illustrations";
import { CTAButton } from "@/components/ui/cta-button";
import { WatercolorBlob } from "@/components/ui/decor";
import { Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { toneHex } from "@/lib/tones";

/** Custom drink ideas as an open lookbook spread (no boxes). */
export function CustomIdeas({ tabIndex = "03" }: { tabIndex?: string }) {
  return (
    <Section id="ideas">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            tab={{ index: tabIndex, label: "Ideas we love" }}
            title="Made Just for You"
            highlight="for You"
            intro="A few ways couples, companies and party hosts have made their drink bar their own."
          />
          <CTAButton href="/contact" arrow className="self-start lg:self-auto">
            Create a Custom Drink
          </CTAButton>
        </div>

        <ul className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {customDrinkIdeas.map((idea, i) => (
            <Reveal as="li" key={idea.id} delay={(i % 3) * 0.1} className={`group ${i % 3 === 1 ? "lg:mt-12" : ""}`}>
              <div className="relative h-36 w-36">
                <WatercolorBlob color={toneHex[idea.tone]} className="absolute inset-0 h-full w-full" seed={i + 2} />
                <Illustration kind={idea.illustration} className="relative h-full w-full p-5 transition-transform duration-300 group-hover:-rotate-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-extrabold tracking-[-0.02em]">{idea.title}</h3>
              <p className="mt-2 max-w-sm text-[16px] leading-relaxed text-cocoa">{idea.description}</p>
              <p className="mt-3 font-hand text-[1.45rem] leading-tight">e.g. {idea.example}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
