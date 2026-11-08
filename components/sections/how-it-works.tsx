"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { howItWorks } from "@/content/story";
import { TimelineStep } from "@/components/ui/cards";
import { Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";

export function HowItWorks({ tabIndex = "04" }: { tabIndex?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="how-it-works" className="bg-blush-soft/60">
      <Container>
        <SectionHeader tab={{ index: tabIndex, label: "How it works" }} title="How It Works" highlight="Works" align="center" intro="Four easy steps from first message to first sip." />

        <div ref={ref} className="relative mt-16 lg:mt-24">
          {/* desktop: curved hand-drawn line through the four steps */}
          <svg aria-hidden viewBox="0 0 1000 140" preserveAspectRatio="none" className="absolute top-0 left-0 hidden h-32 w-full lg:block" overflow="visible">
            <path d="M125 70 C 190 -10, 310 -10, 375 70 S 560 150, 625 70 S 810 -10, 875 70" fill="none" stroke="#6b4a33" strokeOpacity=".18" strokeWidth={2} strokeDasharray="2 9" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <motion.path
              d="M125 70 C 190 -10, 310 -10, 375 70 S 560 150, 625 70 S 810 -10, 875 70"
              fill="none"
              stroke="#ffa75a"
              strokeWidth={3}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: reduce ? 1 : draw }}
            />
          </svg>
          {/* mobile: dashed spine */}
          <span aria-hidden className="absolute top-12 bottom-12 left-12 border-l-2 border-dashed border-linework/25 lg:hidden" />

          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
            {howItWorks.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.12}>
                <TimelineStep {...s} />
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
