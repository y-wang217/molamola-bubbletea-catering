"use client";

import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { customizations, drinkCategories, toppings } from "@/content/drinks";
import { Cup, type CupLayers } from "@/components/doodles/cup";
import { CustomIcon, DrinkIcon, ToppingIcon } from "@/components/doodles/ingredients";
import { DoodleDecoration } from "@/components/doodles/doodle";
import { C } from "@/components/doodles/palette";
import { CTAButton } from "@/components/ui/cta-button";
import { WatercolorBlob } from "@/components/ui/decor";
import { Container, Section } from "@/components/ui/layout";
import { SectionHeader } from "@/components/ui/section-header";
import { useReducedMotionSafe } from "@/components/ui/motion";

/**
 * Homepage preview of custom drinks: as you scroll past, the cup goes
 * tea base → toppings → sticker. Not interactive; the full builder lives on /custom-drinks.
 */
export function DrinkJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const done = useMotionValue(1);
  const p = reduce ? done : scrollYProgress;
  const [scrollStage, setStage] = useState(0);
  const stage = reduce ? 3 : scrollStage;
  useMotionValueEvent(p, "change", (v) => setStage(v < 0.12 ? 0 : v < 0.42 ? 1 : v < 0.66 ? 2 : 3));

  const layers: CupLayers = {
    tea: useTransform(p, [0.08, 0.35], [0, 1]),
    milk: useTransform(p, [0.2, 0.38], [0, 1]),
    ice: useTransform(p, [0.25, 0.4], [0, 1]),
    toppings: useTransform(p, [0.42, 0.62], [0, 1]),
    sticker: useTransform(p, [0.66, 0.86], [0, 1]),
  };

  return (
    <Section id="drink-journey" className="overflow-x-clip">
      <Container>
        <SectionHeader
          tab={{ index: "03", label: "Custom drinks" }}
          title="Build Your Drink Bar"
          rays
          highlight="Drink Bar"
          align="center"
          intro="Pick the drinks, pick the toppings, then make it yours. Every MolaMola bar is put together around your event."
        />

        <div ref={ref} className="relative mt-14 grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-14">
          <Step n="01" title="Pick your drinks" active={stage >= 1} className="lg:order-1 lg:text-right">
            <IconRow align="right">
              {drinkCategories.map((d, i) => (
                <Pop key={d.id} show={stage >= 1} delay={i * 0.06} label={d.name}>
                  <DrinkIcon drink={d} className="h-14 w-11" />
                </Pop>
              ))}
            </IconRow>
          </Step>

          <div className="relative order-first mx-auto w-44 sm:w-52 lg:order-2 lg:w-64">
            <WatercolorBlob color={C.pink} spots={C.butter} className="absolute inset-[-22%] h-[144%] w-[144%] opacity-55" seed={5} />
            <div className="relative">
              <Cup layers={layers} liquid={drinkCategories[1].liquid} toppingKinds={["boba", "float"]} title="A cup being built step by step" />
            </div>
            <motion.div style={{ opacity: layers.sticker }} className="absolute -top-4 -right-6">
              <DoodleDecoration kind="sparkle" className="h-9 w-9" motion="twinkle" />
            </motion.div>
          </div>

          <div className="space-y-10 lg:order-3">
            <Step n="02" title="Pick your toppings" active={stage >= 2}>
              <IconRow>
                {toppings.map((t, i) => (
                  <Pop key={t.id} show={stage >= 2} delay={i * 0.06} label={t.name}>
                    <ToppingIcon kind={t.id} className="h-12 w-12" />
                  </Pop>
                ))}
              </IconRow>
            </Step>
            <Step n="03" title="Make it yours" active={stage >= 3}>
              <IconRow>
                {customizations.slice(0, 4).map((c, i) => (
                  <Pop key={c.id} show={stage >= 3} delay={i * 0.06} label={c.name.replace("Custom ", "")}>
                    <CustomIcon id={c.id} className="h-12 w-12" />
                  </Pop>
                ))}
              </IconRow>
            </Step>
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <CTAButton href="/custom-drinks" arrow>
            Explore Custom Drinks
          </CTAButton>
        </div>
      </Container>
    </Section>
  );
}

function Step({ n, title, active, children, className = "" }: { n: string; title: string; active: boolean; children: ReactNode; className?: string }) {
  return (
    <div className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-40"} ${className}`}>
      <p className="font-hand text-2xl leading-none text-tangerine-deep">Step {n}</p>
      <h3 className="mt-1 font-display text-2xl font-extrabold tracking-[-0.02em] sm:text-[1.75rem]">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function IconRow({ children, align = "left" }: { children: ReactNode; align?: "left" | "right" }) {
  return (
    <div
      className={`no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 ${
        align === "right" ? "lg:justify-end" : ""
      }`}
    >
      {children}
    </div>
  );
}

function Pop({ show, delay, label, children }: { show: boolean; delay: number; label: string; children: ReactNode }) {
  return (
    <motion.div
      initial={false}
      animate={show ? { scale: 1, y: 0, opacity: 1 } : { scale: 0.85, y: 6, opacity: 0.55 }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay: show ? delay : 0 }}
      className="flex w-[4.5rem] shrink-0 flex-col items-center text-center"
    >
      <span className="flex h-16 items-end">{children}</span>
      <span className="mt-1 text-[12px] leading-tight font-semibold text-cocoa">{label}</span>
    </motion.div>
  );
}
