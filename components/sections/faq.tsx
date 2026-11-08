import { faqs, faqsFor, type FaqTopic } from "@/content/faq";
import { messageLink } from "@/content/site";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { CTAButton } from "@/components/ui/cta-button";
import { Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Mascot } from "@/components/doodles/mascot";

export function FAQ({ tabIndex, topic, title = "Questions, Answered" }: { tabIndex?: string; topic?: FaqTopic; title?: string }) {
  const items = topic ? faqsFor(topic) : faqs;
  return (
    <Section id="faq">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader tab={{ index: tabIndex, label: "FAQ" }} title={title} highlight="Answered" />
          <Reveal delay={0.15} className="mt-10 hidden rounded-[var(--radius-card)] border-[1.5px] border-linework bg-sage p-6 lg:block">
            <div className="flex items-center gap-4">
              <Mascot className="h-16 w-16 shrink-0" float title="" />
              <p className="font-hand text-[1.6rem] leading-tight">Still curious? We love questions.</p>
            </div>
            <CTAButton href={messageLink} external variant="secondary" className="mt-5">
              Message MolaMola
            </CTAButton>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <FAQAccordion items={items} />
        </Reveal>
      </Container>
    </Section>
  );
}
