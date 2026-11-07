"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { Cup, type CupLayers } from "@/components/doodles/cup";
import { DoodleArrow, DoodleDecoration, type DoodleKind } from "@/components/doodles/doodle";
import { CTAButton } from "@/components/ui/cta-button";
import { Container } from "@/components/ui/layout";

const hero = {
  eyebrow: "Drink catering for events",
  headline: ["Drinks", "Made", "for", "Your", "Moment."],
  copy: "Custom drink catering for weddings, parties, corporate events, pop-ups and celebrations.",
  primary: { href: "/contact", label: "Plan Your Event" },
  secondary: { href: "/catering", label: "Explore Catering" },
};

// Scroll progress → when each word / cup layer comes in.
const WORD_IN: ([number, number] | null)[] = [null, null, [0.12, 0.28], [0.3, 0.46], [0.5, 0.68]];

const notes: { text: string; at: [number, number]; className: string; flip?: boolean; arrow: string }[] = [
  { text: "fresh-brewed tea", at: [0.12, 0.24], className: "right-[calc(100%-1rem)] top-[50%]", arrow: "rotate-[-10deg]" },
  { text: "lots of ice!", at: [0.34, 0.44], className: "left-[calc(100%-1.5rem)] top-[24%]", flip: true, arrow: "rotate-[-14deg]" },
  { text: "brown sugar boba", at: [0.5, 0.6], className: "right-[calc(100%-2rem)] top-[80%]", arrow: "rotate-[-30deg]" },
  { text: "your sticker here", at: [0.66, 0.76], className: "left-[calc(100%-1rem)] top-[58%]", flip: true, arrow: "rotate-[6deg]" },
];

const sparkles: { kind: DoodleKind; className: string; at: number }[] = [
  { kind: "star", className: "left-[2%] top-[14%] h-10 w-10", at: 0.76 },
  { kind: "heart", className: "right-[0%] top-[6%] h-9 w-9", at: 0.79 },
  { kind: "sparkle", className: "right-[10%] bottom-[18%] h-8 w-8", at: 0.82 },
  { kind: "boba", className: "left-[6%] bottom-[8%] h-10 w-10", at: 0.84 },
  { kind: "flower", className: "right-[-4%] top-[40%] h-8 w-8", at: 0.86 },
  { kind: "sparkle", className: "left-[-6%] top-[40%] h-6 w-6", at: 0.88 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const finished = useMotionValue(1);
  const p = reduce ? finished : scrollYProgress;

  const layers: CupLayers = {
    tea: useTransform(p, [0.04, 0.3], [0, 1], { clamp: true }),
    milk: useTransform(p, [0.18, 0.34], [0, 1]),
    ice: useTransform(p, [0.32, 0.46], [0, 1]),
    toppings: useTransform(p, [0.48, 0.62], [0, 1]),
    sticker: useTransform(p, [0.64, 0.76], [0, 1]),
  };
  const hintOpacity = useTransform(p, [0, 0.08], [1, 0]);
  const blobY = useTransform(p, [0, 1], [0, -60]);
  const cupScale = useTransform(p, [0, 1], [0.94, 1]);

  return (
    <section ref={ref} aria-label="Introduction" className="relative motion-safe:h-[280vh]">
      <div className="flex items-start overflow-hidden py-6 motion-safe:sticky motion-safe:top-0 motion-safe:h-svh motion-safe:py-0 lg:items-center">
        <BackgroundDoodles progress={p} />
        <Container className="relative grid w-full items-center gap-5 pt-24 pb-6 sm:pt-28 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pt-16">
          {/* copy */}
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-paper px-3.5 py-1.5 text-[13px] font-semibold">
              <DoodleDecoration kind="sparkle" className="h-4 w-4" />
              {hero.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-[2.75rem] leading-[0.95] sm:mt-5 font-extrabold tracking-[-0.045em] sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]">
              {hero.headline.map((word, i) => (
                <Word key={word} progress={p} range={WORD_IN[i]} underline={i === hero.headline.length - 1}>
                  {word}
                </Word>
              ))}
            </h1>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-cocoa sm:mt-5 sm:text-lg">{hero.copy}</p>
            <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
              <CTAButton href={hero.primary.href} arrow>
                {hero.primary.label}
              </CTAButton>
              <CTAButton href={hero.secondary.href} variant="secondary">
                {hero.secondary.label}
              </CTAButton>
            </div>
          </div>

          {/* cup */}
          <div className="relative mx-auto w-[min(44vw,26svh)] sm:w-[min(17rem,30svh)] lg:w-[min(23rem,52svh)] xl:w-[min(25rem,56svh)]">
            <motion.div aria-hidden style={{ y: blobY }} className="absolute inset-[-8%_-18%_-4%_-18%] -z-0 rounded-[48%_52%_44%_56%/55%_45%_55%_45%] bg-powder-soft" />
            <motion.div style={{ scale: cupScale }} className="relative">
              <Cup layers={layers} liquid="#d9a77c" toppingKinds={["boba"]} title="A MolaMola milk tea filling up as you scroll" />
            </motion.div>

            {sparkles.map((s, i) => (
              <Sparkle key={i} progress={p} at={s.at} kind={s.kind} className={s.className} />
            ))}

            {notes.map((n) => (
              <Note key={n.text} progress={p} at={n.at} className={n.className} flip={n.flip} arrow={n.arrow}>
                {n.text}
              </Note>
            ))}

            <motion.p aria-hidden style={{ opacity: hintOpacity }} className="absolute -bottom-2 left-1/2 hidden -translate-x-1/2 translate-y-full items-center gap-1 font-hand text-xl whitespace-nowrap text-cocoa sm:flex">
              scroll to fill the cup <span className="inline-block motion-safe:animate-bob">↓</span>
            </motion.p>
          </div>
        </Container>
      </div>
    </section>
  );
}

function Word({ children, progress, range, underline }: { children: ReactNode; progress: MotionValue<number>; range: [number, number] | null; underline?: boolean }) {
  const opacity = useTransform(progress, range ?? [0, 1], range ? [0.16, 1] : [1, 1]);
  const y = useTransform(progress, range ?? [0, 1], range ? [10, 0] : [0, 0]);
  const draw = useTransform(progress, [0.72, 0.9], [0, 1]);
  return (
    <motion.span style={{ opacity, y }} className="relative mr-[0.22em] inline-block last:mr-0">
      <span className="relative z-10">{children}</span>
      {underline && (
        <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden className="absolute -bottom-[0.06em] left-0 z-0 h-[0.32em] w-[96%]" overflow="visible">
          <motion.path d="M3 13 C 40 5, 90 4, 130 8 S 185 14, 197 7" fill="none" stroke="#f39a5d" strokeWidth={7} strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ pathLength: draw }} />
        </svg>
      )}
    </motion.span>
  );
}

function Note({ children, progress, at, className, flip, arrow }: { children: ReactNode; progress: MotionValue<number>; at: [number, number]; className: string; flip?: boolean; arrow: string }) {
  const opacity = useTransform(progress, at, [0, 1]);
  const x = useTransform(progress, at, [flip ? 12 : -12, 0]);
  return (
    <motion.div aria-hidden style={{ opacity, x }} className={`absolute hidden whitespace-nowrap xl:block ${className} ${flip ? "text-left" : "text-right"}`}>
      <p className="font-hand text-[1.35rem] leading-none 2xl:text-[1.6rem]">{children}</p>
      <DoodleArrow flip={flip} className={`mt-1 h-8 w-16 ${flip ? "mr-auto" : "ml-auto"} ${arrow}`} />
    </motion.div>
  );
}

function Sparkle({ progress, at, kind, className }: { progress: MotionValue<number>; at: number; kind: DoodleKind; className: string }) {
  const scale = useTransform(progress, [at, at + 0.06], [0, 1]);
  return (
    <motion.div aria-hidden style={{ scale }} className={`absolute ${className}`}>
      <DoodleDecoration kind={kind} className="h-full w-full" motion="twinkle" delay={at * 4} />
    </motion.div>
  );
}

function BackgroundDoodles({ progress }: { progress: MotionValue<number> }) {
  const slow = useTransform(progress, [0, 1], [0, -80]);
  const fast = useTransform(progress, [0, 1], [0, -160]);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div style={{ y: slow }} className="absolute top-[18%] left-[-6%] h-72 w-72 rounded-full bg-butter-soft blur-[2px]" />
      <motion.div style={{ y: fast }} className="absolute right-[6%] bottom-[6%] h-40 w-40 rounded-full bg-blush-soft" />
      <motion.div style={{ y: fast }} className="absolute top-[22%] left-[44%] hidden lg:block">
        <DoodleDecoration kind="squiggle" className="h-10 w-16" />
      </motion.div>
      <motion.div style={{ y: slow }} className="absolute bottom-[7%] left-[42%] hidden lg:block">
        <DoodleDecoration kind="lemon" className="h-12 w-12" motion="float" />
      </motion.div>
      <motion.div style={{ y: slow }} className="absolute top-[34%] right-[3%] hidden md:block">
        <DoodleDecoration kind="strawberry" className="h-12 w-12" motion="float" delay={1.5} />
      </motion.div>
    </div>
  );
}
