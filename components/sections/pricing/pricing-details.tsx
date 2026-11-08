import { fullServiceIncludes, pricingAddOnGroups, pricingNote, pricingTiers } from "@/content/pricing";
import { PricingCard } from "@/components/ui/cards";
import { CTAButton } from "@/components/ui/cta-button";
import { BinderSheet, Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Illustration } from "@/components/doodles/illustrations";
import { DoodleDecoration } from "@/components/doodles/doodle";
import { Mascot } from "@/components/doodles/mascot";
import { WatercolorBlob } from "@/components/ui/decor";
import { C } from "@/components/doodles/palette";

/** The full pricing breakdown. This is the only place all tiers + add-ons appear. */
export function PricingTiers() {
  return (
    <Section id="packages" className="pt-12 sm:pt-16">
      <Container>
        <SectionHeader
          as="h1"
          size="lg"
          tab={{ label: "Pricing" }}
          title="Find Your Perfect Setup"
          highlight="Perfect Setup"
          intro="Starting points for every kind of event. Your final quote depends on guests, hours and how custom you'd like to go."
        />
        <p className="mt-10 font-hand text-xl text-cocoa sm:hidden" aria-hidden>
          swipe for more →
        </p>
        <ul className="no-scrollbar -mx-5 mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pt-5 pb-6 sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {pricingTiers.map((t, i) => (
            <Reveal as="li" key={t.id} delay={i * 0.08} className="w-[76vw] max-w-[19rem] shrink-0 snap-center sm:w-auto sm:max-w-none">
              <PricingCard tier={t} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function FullServiceIncludes() {
  return (
    <Section id="included" className="py-12 sm:py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72">
          <WatercolorBlob color={C.blue} spots={C.butter} className="absolute inset-0 h-full w-full" seed={4} />
          <Illustration kind="bar" className="relative h-full w-full p-10" />
        </div>
        <div>
          <SectionHeader tab={{ index: "02", label: "What's included" }} title="Every Full Service Bar Comes With" highlight="Comes With" />
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {fullServiceIncludes.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 0.05} className="flex items-center gap-3 text-[16px]">
                <DoodleDecoration kind="star" className="h-5 w-5 shrink-0" />
                {item}
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

export function PricingAddOns() {
  return (
    <Section id="add-ons" className="pt-8">
      <Container>
        <SectionHeader tab={{ index: "03", label: "Extras" }} title="Extras & Add-ons" highlight="Add-ons" intro="Mix and match these with any package." />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.45fr_0.55fr] lg:items-start">
          <Reveal>
            <BinderSheet className="dot-grid px-6 py-8 sm:px-12 sm:py-10 sm:pl-16">
              <div className="grid gap-10 md:grid-cols-3 md:gap-8">
                {pricingAddOnGroups.map((g) => (
                  <div key={g.title}>
                    <h3 className="font-hand text-[1.7rem] leading-none">{g.title}</h3>
                    <ul className="mt-4">
                      {g.items.map((a) => (
                        <li key={a.label} className="border-b-[1.5px] border-dashed border-linework/20 py-3 text-[15px] last:border-0">
                          <span className="block">{a.label}</span>
                          <span className="font-semibold">{a.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </BinderSheet>
          </Reveal>
          <Reveal delay={0.15}>
            <QuoteNote />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function QuoteNote() {
  return (
    <div className="relative mt-6 rotate-[1.5deg] rounded-[1.25rem] border-[1.5px] border-linework bg-butter p-7 shadow-[var(--shadow-sticker)] lg:mt-0">
      <span aria-hidden className="tape absolute -top-3 left-8 h-6 w-20 -rotate-6 bg-blush/90" />
      <Mascot className="absolute -top-14 -right-2 h-20 w-20 rotate-6 sm:-right-6" hat float title="" />
      <p className="font-hand text-[1.9rem] leading-tight">{pricingNote}</p>
      <p className="mt-3 text-[15px] text-ink/75">Tell us a bit about your event and we&apos;ll send a quote that fits.</p>
      <CTAButton href="/contact" className="mt-6" arrow>
        Get a Quote
      </CTAButton>
    </div>
  );
}
