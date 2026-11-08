import type { ReactNode } from "react";
import type { CateringPackage } from "@/content/packages";
import type { PricingTier } from "@/content/pricing";
import { Illustration, type IllustrationKind } from "@/components/doodles/illustrations";
import { DoodleDecoration } from "@/components/doodles/doodle";
import { toneBg, toneSoftBg, type Tone } from "@/lib/tones";
import { CTAButton } from "./cta-button";

const lift =
  "transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[var(--shadow-soft)] motion-safe:hover:rotate-[-0.6deg]";

/** Big illustrated card: celebrations, custom drink ideas, reasons. */
export function FeatureCard({
  title,
  body,
  illustration,
  tone,
  footer,
  size = "md",
  className = "",
}: {
  title: string;
  body: string;
  illustration: IllustrationKind;
  tone: Tone;
  footer?: ReactNode;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <article className={`group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border-[1.5px] border-linework ${toneBg[tone]} p-6 sm:p-7 ${lift} ${className}`}>
      <DoodleDecoration
        kind="sparkle"
        className="absolute top-5 right-5 h-5 w-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-twinkle"
      />
      <div className={`${size === "lg" ? "h-36 w-36 sm:h-44 sm:w-44" : "h-24 w-24"} origin-bottom group-hover:animate-wiggle`}>
        <Illustration kind={illustration} className="h-full w-full" />
      </div>
      <h3 className={`mt-auto pt-6 font-display font-extrabold tracking-[-0.02em] ${size === "lg" ? "text-3xl" : "text-2xl"}`}>{title}</h3>
      <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-ink/75">{body}</p>
      {footer}
    </article>
  );
}

/** Ready-to-Serve / Full Service card. `detailed` adds the details table (Catering page). */
export function CateringPackageCard({ pkg, detailed = false }: { pkg: CateringPackage; detailed?: boolean }) {
  return (
    <article
      id={detailed ? pkg.id : undefined}
      className={`group relative grid h-full scroll-mt-28 overflow-hidden rounded-[var(--radius-sheet)] border-[1.5px] border-linework ${toneSoftBg[pkg.tone]} ${detailed ? "lg:grid-cols-[1fr_1.1fr]" : ""}`}
    >
      <div className={`relative flex items-center justify-center ${toneBg[pkg.tone]} dot-grid px-8 pt-10 pb-6 ${detailed ? "lg:py-16" : ""}`}>
        <span className="absolute top-5 left-5 rounded-full border-[1.5px] border-linework bg-paper px-3 py-1 font-hand text-lg leading-none">{pkg.kicker}</span>
        <Illustration kind={pkg.illustration} className="h-44 w-44 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105 sm:h-56 sm:w-56" />
      </div>
      <div className="flex flex-col p-7 sm:p-9">
        <h3 className="font-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{pkg.name}</h3>
        <p className="mt-3 max-w-md text-[16px] leading-relaxed text-ink/75">{pkg.description}</p>
        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[15px]">
              <DoodleDecoration kind="star" className="mt-0.5 h-4 w-4 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        {detailed && (
          <dl className="mt-8 divide-y divide-dashed divide-linework/20 border-y border-dashed border-linework/20 text-[15px]">
            {pkg.details.map((d) => (
              <div key={d.label} className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-3">
                <dt className="text-cocoa">{d.label}</dt>
                <dd className="font-semibold">{d.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-auto pt-8">
          <CTAButton href={detailed ? "/contact" : pkg.cta.href} variant={detailed ? "primary" : "secondary"} arrow>
            {detailed ? "Get a Quote" : pkg.cta.label}
          </CTAButton>
        </div>
      </div>
    </article>
  );
}

export function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-[var(--radius-card)] border-[1.5px] border-linework ${toneBg[tier.tone]} p-6 ${lift} ${
        tier.featured ? "shadow-[var(--shadow-sticker-lg)]" : ""
      }`}
    >
      {tier.featured && (
        <>
          <DoodleDecoration kind="crown" className="absolute -top-5 -left-3 h-10 w-10 -rotate-12" />
          <span className="absolute -top-4 right-5 rotate-3 rounded-full border-[1.5px] border-linework bg-paper px-3 py-0.5 font-hand text-lg">most booked!</span>
        </>
      )}
      <p className="text-xs font-bold tracking-[0.16em] uppercase">{tier.name}</p>
      <p className="mt-1 text-[14px] text-ink/70">{tier.guests}</p>
      <div className="mt-5 border-t-[1.5px] border-dashed border-linework/30 pt-5">
        <p className="font-hand text-xl leading-none text-ink/70">{tier.priceNote}</p>
        <p className="font-display text-5xl font-extrabold tracking-[-0.04em]">{tier.price}</p>
        <p className="mt-2 text-[14px] leading-snug text-ink/75">{tier.blurb}</p>
      </div>
      <ul className="mt-5 space-y-2 text-[14px]">
        {tier.includes.map((i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden>✶</span>
            {i}
          </li>
        ))}
      </ul>
    </article>
  );
}

/** One step of "How It Works". */
export function TimelineStep({ n, title, body, illustration, tone }: { n: string; title: string; body: string; illustration: IllustrationKind; tone: Tone }) {
  return (
    <div className="group relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
      <div className={`relative z-10 flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-[1.5px] border-linework ${toneBg[tone]} transition-transform duration-300 group-hover:-rotate-6 lg:h-32 lg:w-32`}>
        <Illustration kind={illustration} className="h-16 w-16 lg:h-20 lg:w-20" />
        <span className="absolute -top-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-linework bg-paper font-display text-sm font-extrabold">{n}</span>
      </div>
      <div className="pt-2 lg:pt-4">
        <h3 className="font-display text-xl font-extrabold tracking-[-0.02em] lg:text-2xl">{title}</h3>
        <p className="mt-1.5 max-w-xs text-[15px] leading-relaxed text-cocoa lg:mx-auto">{body}</p>
      </div>
    </div>
  );
}
