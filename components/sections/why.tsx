import { reasons } from "@/content/story";
import { Illustration } from "@/components/doodles/illustrations";
import { BinderSheet, Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { toneBg } from "@/lib/tones";

export function WhyMolaMola({ tabIndex = "07" }: { tabIndex?: string }) {
  return (
    <Section id="why">
      <Container>
        <BinderSheet tone="bg-powder-soft" className="px-6 py-14 sm:px-14 sm:py-20 lg:px-20">
          <SectionHeader tab={{ index: tabIndex, label: "Why us" }} title="Why MolaMola" highlight="MolaMola" align="center" />
          <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 0.1} className="group text-center">
                <div className={`mx-auto flex h-28 w-28 items-center justify-center rounded-full border-[1.5px] border-ink ${toneBg[r.tone]} transition-transform duration-300 group-hover:-translate-y-1 group-hover:-rotate-6`}>
                  <Illustration kind={r.illustration} className="h-20 w-20" />
                </div>
                <h3 className="mt-5 font-display text-xl font-extrabold tracking-[-0.02em]">{r.title}</h3>
                <p className="mx-auto mt-1.5 max-w-[15rem] text-[15px] leading-relaxed text-cocoa">{r.body}</p>
              </Reveal>
            ))}
          </ul>
        </BinderSheet>
      </Container>
    </Section>
  );
}
