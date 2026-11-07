"use client";

import { motion } from "motion/react";
import { about, reasons } from "@/content/story";
import { Illustration } from "@/components/doodles/illustrations";
import { Mascot } from "@/components/doodles/mascot";
import { CTAButton } from "@/components/ui/cta-button";
import { WatercolorBlob } from "@/components/ui/decor";
import { Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { toneHex } from "@/lib/tones";

/** Open, floating reasons joined by a hand-drawn line, plus a short "meet us" note. */
export function WhyMolaMola() {
  return (
    <Section id="why">
      <Container>
        <SectionHeader tab={{ index: "04", label: "Why us" }} title="Why MolaMola" highlight="MolaMola" align="center" />

        <div className="relative mt-16 lg:mt-20">
          {/* hand-drawn connecting line (desktop) */}
          <svg aria-hidden viewBox="0 0 1000 120" preserveAspectRatio="none" className="absolute top-8 left-0 hidden h-28 w-full lg:block" overflow="visible">
            <motion.path
              d="M60 70 C 160 -10, 280 130, 380 60 S 600 -10, 640 70 S 860 140, 950 40"
              fill="none"
              stroke="#3a2c26"
              strokeOpacity=".35"
              strokeWidth={2}
              strokeDasharray="1 9"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </svg>

          <ul className="relative grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-8">
            {reasons.map((r, i) => (
              <motion.li
                key={r.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ type: "spring", stiffness: 180, damping: 15, delay: i * 0.12 }}
                className={`group text-center ${i % 2 ? "lg:mt-16" : ""}`}
              >
                <div className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32">
                  <WatercolorBlob color={toneHex[r.tone]} className="absolute inset-0 h-full w-full" seed={i + 3} />
                  <Illustration kind={r.illustration} className="relative h-full w-full p-4 transition-transform duration-300 group-hover:-rotate-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-extrabold tracking-[-0.02em] sm:text-[1.4rem]">{r.title}</h3>
                <p className="mx-auto mt-1.5 max-w-[14rem] text-[15px] leading-relaxed text-cocoa">{r.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>

        <Reveal className="mx-auto mt-20 flex max-w-2xl flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <Mascot className="h-28 w-28 shrink-0" float />
          <div>
            <p className="font-hand text-[1.9rem] leading-none">hi, we&apos;re MolaMola!</p>
            <p className="mt-2 text-[16px] leading-relaxed text-ink/80">{about.short}</p>
            <CTAButton href="/about" variant="secondary" className="mt-5" arrow>
              Meet MolaMola
            </CTAButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
