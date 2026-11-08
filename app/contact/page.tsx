import type { Metadata } from "next";
import { socials } from "@/content/site";
import { ContactForm } from "@/components/sections/contact-form";
import { BinderSheet, Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Mascot } from "@/components/doodles/mascot";

export const metadata: Metadata = { title: "Get a Quote" };

const next = [
  "We read every inquiry and reply within X business days.",
  "We'll suggest a drink lineup and send a quote.",
  "A deposit locks in your date. Then the fun part starts.",
];

export default function ContactPage() {
  return (
    <Section className="pt-12 sm:pt-16">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader
            as="h1"
            tab={{ index: "MolaMola", label: "Get a quote" }}
            title="Let’s Plan Your Event"
            highlight="Your Event"
            intro="Tell us what you're celebrating. The more you share, the better we can tailor your drinks."
          />
          <Reveal delay={0.1}>
            <ol className="mt-10 space-y-4">
              {next.map((t, i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-linework bg-butter font-display text-sm font-extrabold">{i + 1}</span>
                  <p className="pt-1.5 text-[16px] text-ink/80">{t}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex items-center gap-4 rounded-[var(--radius-card)] border-[1.5px] border-dashed border-linework/40 p-5">
              <Mascot className="h-14 w-14 shrink-0" float title="" />
              <p className="text-[15px]">
                <span className="font-hand text-2xl leading-none">Prefer to chat?</span>
                <br />
                {socials.map((s, i) => (
                  <span key={s.kind}>
                    {i > 0 && " · "}
                    <a href={s.href} className="font-semibold underline underline-offset-4">
                      {s.label}
                    </a>
                  </span>
                ))}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <BinderSheet className="px-5 py-8 sm:px-12 sm:py-12 sm:pl-16">
            <ContactForm />
          </BinderSheet>
        </Reveal>
      </Container>
    </Section>
  );
}
