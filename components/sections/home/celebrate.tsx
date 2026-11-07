import Link from "next/link";
import { eventTypes } from "@/content/events";
import { FeatureCard } from "@/components/ui/cards";
import { Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { DoodleDecoration } from "@/components/doodles/doodle";

// Desktop placement for the scrapbook grid (12 cols). Order matches content/events.ts.
const placement = [
  "lg:col-span-5 lg:row-span-2",
  "lg:col-span-4",
  "lg:col-span-3 lg:translate-y-8",
  "lg:col-span-4",
  "lg:col-span-3 lg:translate-y-8",
];

export function Celebrate() {
  return (
    <Section id="celebrate">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader tab={{ index: "01", label: "Celebrations" }} title="What Are You Celebrating?" highlight="Celebrating?" />
          <DoodleDecoration kind="star" className="hidden h-14 w-14 lg:block" motion="twinkle" />
        </div>

        <p className="mt-8 font-hand text-2xl text-cocoa lg:hidden" aria-hidden>
          swipe for more →
        </p>
        <ul className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-14 lg:grid lg:auto-rows-[minmax(17rem,auto)] lg:grid-cols-12 lg:gap-6 lg:overflow-visible lg:px-0">
          {eventTypes.map((e, i) => (
            <Reveal as="li" key={e.id} delay={i * 0.08} className={`w-[78vw] max-w-[22rem] shrink-0 snap-start sm:w-[44vw] lg:w-auto lg:max-w-none ${placement[i] ?? "lg:col-span-4"}`}>
              <FeatureCard
                title={e.title}
                body={e.blurb}
                illustration={e.illustration}
                tone={e.tone}
                size={i === 0 ? "lg" : "md"}
                className="min-h-[22rem] lg:min-h-0"
                footer={
                  <Link href="/contact" className="mt-5 inline-flex items-center gap-1 self-start font-hand text-[1.45rem] leading-none underline decoration-[1.5px] underline-offset-4">
                    plan this →
                  </Link>
                }
              />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
