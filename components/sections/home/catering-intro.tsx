import Link from "next/link";
import { cateringPackages } from "@/content/packages";
import { Illustration } from "@/components/doodles/illustrations";
import { CTAButton } from "@/components/ui/cta-button";
import { Wash } from "@/components/ui/decor";
import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { toneBg } from "@/lib/tones";

/** Homepage teaser: the two service types, one line each. Full detail lives on /catering. */
export function CateringIntro() {
  return (
    <Wash tone="blue" className="my-10">
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeader
            tab={{ index: "02", label: "Catering" }}
            title="Catering Made Simple"
            highlight="Simple"
            intro="Two easy ways to bring MolaMola to your event: drinks dropped off ready to enjoy, or a full drink bar with us behind it."
          />
          <Reveal delay={0.15} className="mt-8">
            <CTAButton href="/catering" arrow>
              Explore Catering
            </CTAButton>
          </Reveal>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {cateringPackages.map((pkg, i) => (
            <Reveal as="li" key={pkg.id} from="right" delay={0.1 + i * 0.12}>
              <Link
                href={pkg.cta.href}
                className={`group flex items-center gap-4 rounded-[var(--radius-card)] border-[1.5px] border-ink bg-paper p-4 transition-transform duration-300 hover:-translate-y-1 sm:block sm:p-5 ${
                  i % 2 ? "sm:mt-10 sm:rotate-[1.2deg]" : "sm:-rotate-[1.2deg]"
                }`}
              >
                <div className={`dot-grid flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.25rem] sm:h-40 sm:w-auto ${toneBg[pkg.tone]}`}>
                  <Illustration kind={pkg.illustration} className="h-20 w-20 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105 sm:h-32 sm:w-32" />
                </div>
                <div>
                  <p className="font-hand text-xl leading-none text-cocoa sm:mt-4">{pkg.kicker}</p>
                  <h3 className="mt-1 font-display text-2xl font-extrabold tracking-[-0.02em]">{pkg.name}</h3>
                  <p className="mt-2 hidden text-[15px] leading-relaxed text-ink/75 sm:block">{pkg.description}</p>
                  <p className="mt-2 text-[14px] font-bold sm:mt-4">
                    Learn more <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Wash>
  );
}
