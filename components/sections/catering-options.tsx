import { cateringPackages } from "@/content/packages";
import { CateringPackageCard } from "@/components/ui/cards";
import { Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";

export function CateringOptions({ detailed = false, tabIndex = "02" }: { detailed?: boolean; tabIndex?: string }) {
  return (
    <Section id="catering-options" className="bg-paper/60">
      <Container>
        <SectionHeader
          tab={{ index: tabIndex, label: "Catering" }}
          title="Catering Made Simple"
          highlight="Simple"
          intro="Two ways to bring MolaMola to your event. Pick the one that fits, and we'll handle the rest."
        />
        <div className={`mt-14 grid gap-8 lg:mt-16 ${detailed ? "" : "lg:grid-cols-2"}`}>
          {cateringPackages.map((pkg, i) => (
            <Reveal key={pkg.id} from={detailed ? "up" : i === 0 ? "left" : "right"} delay={i * 0.1}>
              <CateringPackageCard pkg={pkg} detailed={detailed} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
