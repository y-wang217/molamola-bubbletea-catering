import { pricingAddOns, pricingNote, pricingTiers } from "@/content/pricing";
import { PricingCard } from "@/components/ui/cards";
import { CTAButton } from "@/components/ui/cta-button";
import { BinderSheet, Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Mascot } from "@/components/doodles/mascot";

export function Pricing({ variant = "full", tabIndex = "05", asPage = false }: { variant?: "full" | "compact"; tabIndex?: string; asPage?: boolean }) {
  const compact = variant === "compact";
  return (
    <Section id="pricing" className={asPage ? "pt-12 sm:pt-16" : ""}>
      <Container>
        <SectionHeader
          as={asPage ? "h1" : "h2"}
          tab={{ index: tabIndex, label: "Pricing" }}
          title="Honest Starting Prices"
          highlight="Starting Prices"
          intro="A clear place to start. Your final quote depends on guests, hours and how custom you'd like to go."
        />

        <ul className={`mt-14 grid gap-4 pt-4 sm:gap-6 lg:grid-cols-4 ${compact ? "grid-cols-2" : "sm:grid-cols-2"}`}>
          {pricingTiers.map((t, i) => (
            <Reveal as="li" key={t.id} delay={i * 0.08}>
              <PricingCard tier={t} compact={compact} />
            </Reveal>
          ))}
        </ul>

        {!compact && (
          <div className="mt-16 grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
            <Reveal>
              <BinderSheet className="dot-grid px-6 py-8 sm:px-12 sm:py-10">
                <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em] sm:pl-4">Extras & add-ons</h3>
                <ul className="mt-6 sm:pl-4">
                  {pricingAddOns.map((a) => (
                    <li key={a.label} className="flex items-baseline gap-3 py-2.5 text-[16px]">
                      <span>{a.label}</span>
                      <span aria-hidden className="mb-1 flex-1 border-b-2 border-dotted border-ink/30" />
                      <span className="font-semibold whitespace-nowrap">{a.price}</span>
                    </li>
                  ))}
                </ul>
              </BinderSheet>
            </Reveal>
            <Reveal delay={0.15}>
              <QuoteNote />
            </Reveal>
          </div>
        )}

        {compact && (
          <Reveal className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] border-[1.5px] border-dashed border-ink/40 p-6 sm:flex-row sm:items-center sm:p-8">
            <p className="font-hand text-[1.75rem] leading-tight">{pricingNote}</p>
            <div className="flex flex-wrap gap-3">
              <CTAButton href="/pricing" variant="secondary">
                Full pricing
              </CTAButton>
              <CTAButton href="/contact" arrow>
                Get a Quote
              </CTAButton>
            </div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}

function QuoteNote() {
  return (
    <div className="relative rotate-[1.5deg] rounded-[1.25rem] border-[1.5px] border-ink bg-butter p-7 shadow-[var(--shadow-sticker)]">
      <span aria-hidden className="tape absolute -top-3 left-8 h-6 w-20 -rotate-6 bg-blush/90" />
      <Mascot className="absolute -top-10 -right-2 h-20 w-20 sm:-right-6 rotate-12" float title="" />
      <p className="font-hand text-[1.9rem] leading-tight">{pricingNote}</p>
      <p className="mt-3 text-[15px] text-ink/75">Tell us a bit about your event and we&apos;ll send a quote that fits.</p>
      <CTAButton href="/contact" className="mt-6" arrow>
        Get a Quote
      </CTAButton>
    </div>
  );
}
