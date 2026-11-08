"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { Cup, type CupLayers } from "@/components/doodles/cup";
import { DoodleArrow, DoodleDecoration, type DoodleKind } from "@/components/doodles/doodle";
import { Mascot } from "@/components/doodles/mascot";
import { C } from "@/components/doodles/palette";
import { CTAButton } from "@/components/ui/cta-button";
import { WatercolorBlob } from "@/components/ui/decor";
import { Container } from "@/components/ui/layout";

const hero = {
  eyebrow: "Drink catering for events",
  headline: ["Drinks", "Made", "for", "Your", "Moment."],
  copy: "Custom drink catering for weddings, parties, corporate events, pop-ups and celebrations.",
  primary: { href: "/contact", label: "Plan Your Event" },
  secondary: { href: "/catering", label: "Explore Catering" },
};

// Scroll progress → when each word / cup layer comes in. Kept short so it plays with a light scroll.
const WORD_IN: ([number, number] | null)[] = [null, null, [0.08, 0.24], [0.26, 0.42], [0.44, 0.6]];

const notes: { text: string; at: [number, number]; className: string; flip?: boolean; arrow: string; icon: DoodleKind }[] = [
  { text: "fresh-brewed tea", at: [0.08, 0.2], className: "right-[calc(100%-1rem)] top-[50%]", arrow: "rotate-[-10deg]", icon: "drop" },
  { text: "lots of ice!", at: [0.3, 0.4], className: "left-[calc(100%-1.5rem)] top-[24%]", flip: true, arrow: "rotate-[-14deg]", icon: "sparkle" },
  { text: "brown sugar boba", at: [0.44, 0.54], className: "right-[calc(100%-2rem)] top-[80%]", arrow: "rotate-[-30deg]", icon: "boba" },
  { text: "our little sticker", at: [0.58, 0.68], className: "left-[calc(100%-1rem)] top-[44%]", flip: true, arrow: "rotate-[6deg]", icon: "heart" },
];

const sparkles: { kind: DoodleKind; className: string; at: number }[] = [
  { kind: "star", className: "left-[2%] top-[14%] h-10 w-10", at: 0.7 },
  { kind: "heart", className: "right-[0%] top-[6%] h-9 w-9", at: 0.73 },
  { kind: "sparkle", className: "left-[4%] bottom-[22%] h-8 w-8", at: 0.76 },
  { kind: "flower", className: "left-[-8%] top-[30%] h-8 w-8", at: 0.8 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const finished = useMotionValue(1);
  const p = reduce ? finished : scrollYProgress;

  const layers: CupLayers = {
    tea: useTransform(p, [0.02, 0.25], [0, 1]),
    milk: useTransform(p, [0.14, 0.3], [0, 1]),
    ice: useTransform(p, [0.28, 0.42], [0, 1]),
    toppings: useTransform(p, [0.42, 0.56], [0, 1]),
    sticker: useTransform(p, [0.56, 0.7], [0, 1]),
  };
  const hintOpacity = useTransform(p, [0, 0.08], [1, 0]);
  const blobY = useTransform(p, [0, 1], [0, -40]);
  const cupScale = useTransform(p, [0, 1], [0.95, 1]);
  const fishX = useTransform(p, [0.66, 0.8], [-50, 0]);
  const fishOpacity = useTransform(p, [0.66, 0.76], [0, 1]);

  return (
    <section ref={ref} aria-label="Introduction" className="relative motion-safe:h-[210vh]">
      <div className="flex items-start overflow-hidden py-6 motion-safe:sticky motion-safe:top-0 motion-safe:h-svh motion-safe:py-0 lg:items-center">
        <BackgroundDoodles progress={p} />
        <Container className="relative grid w-full items-center gap-5 pt-24 pb-6 sm:pt-28 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pt-16">
          {/* copy */}
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-linework/70 bg-paper px-3.5 py-1.5 text-[13px] font-semibold">
              <DoodleDecoration kind="sparkle" className="h-4 w-4" />
              {hero.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-[2.75rem] leading-[0.95] font-extrabold tracking-[-0.045em] sm:mt-5 sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]">
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
            <motion.div aria-hidden style={{ y: blobY }} className="absolute inset-[-14%_-26%_-6%_-26%]">
              <WatercolorBlob color={C.blue} spots={C.butter} className="h-full w-full opacity-70" seed={7} />
            </motion.div>
            <Bubbles />
            {/* the fish peeks out from behind the cup once it's finished */}
            <motion.div aria-hidden style={{ x: fishX, opacity: fishOpacity }} className="absolute -right-[22%] bottom-[4%] w-[46%]">
              <Mascot className="h-auto w-full -scale-x-100 rotate-[8deg]" hat float title="" />
            </motion.div>
            <motion.div style={{ scale: cupScale }} className="relative">
              <Cup layers={layers} liquid="#d9a77c" toppingKinds={["boba"]} title="A MolaMola milk tea filling up as you scroll" />
            </motion.div>


            {sparkles.map((s, i) => (
              <Sparkle key={i} progress={p} at={s.at} kind={s.kind} className={s.className} />
            ))}

            {notes.map((n) => (
              <Note key={n.text} progress={p} {...n}>
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
  const opacity = useTransform(progress, range ?? [0, 1], range ? [0.18, 1] : [1, 1]);
  const y = useTransform(progress, range ?? [0, 1], range ? [10, 0] : [0, 0]);
  const draw = useTransform(progress, [0.62, 0.8], [0, 1]);
  return (
    <motion.span style={{ opacity, y }} className="relative mr-[0.22em] inline-block last:mr-0">
      <span className="relative z-10">{children}</span>
      {underline && (
        <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden className="absolute -bottom-[0.06em] left-0 z-0 h-[0.32em] w-[96%]" overflow="visible">
          <motion.path d="M3 13 C 40 5, 90 4, 130 8 S 185 14, 197 7" fill="none" stroke="#ffa75a" strokeWidth={7} strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ pathLength: draw }} />
        </svg>
      )}
    </motion.span>
  );
}

function Note({
  children,
  progress,
  at,
  className,
  flip,
  arrow,
  icon,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  at: [number, number];
  className: string;
  flip?: boolean;
  arrow: string;
  icon: DoodleKind;
}) {
  const opacity = useTransform(progress, at, [0, 1]);
  const x = useTransform(progress, at, [flip ? 12 : -12, 0]);
  return (
    <motion.div aria-hidden style={{ opacity, x }} className={`absolute hidden whitespace-nowrap xl:block ${className} ${flip ? "text-left" : "text-right"}`}>
      <p className={`flex items-center gap-1.5 font-hand text-[1.4rem] leading-none 2xl:text-[1.6rem] ${flip ? "" : "justify-end"}`}>
        <DoodleDecoration kind={icon} className="h-5 w-5" />
        {children}
      </p>
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

/** Little bubbles drifting up beside the cup, like the ones in the logo. */
function Bubbles() {
  return (
    <div aria-hidden className="pointer-events-none absolute top-[6%] -left-[6%] h-1/2 w-10">
      {[
        { size: 14, left: 8, delay: 0 },
        { size: 8, left: 22, delay: 1.6 },
        { size: 11, left: 2, delay: 3.1 },
      ].map((b, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full border-2 border-linework/70 motion-safe:animate-rise"
          style={{ width: b.size, height: b.size, left: b.left, animationDelay: `${b.delay}s` }}
        />
      ))}
    </div>
  );
}

function BackgroundDoodles({ progress }: { progress: MotionValue<number> }) {
  const slow = useTransform(progress, [0, 1], [0, -60]);
  const fast = useTransform(progress, [0, 1], [0, -120]);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div style={{ y: slow }} className="absolute top-[14%] left-[-8%] h-80 w-80">
        <WatercolorBlob color={C.butter} className="h-full w-full opacity-45" seed={2} />
      </motion.div>
      <motion.div style={{ y: fast }} className="absolute right-[4%] bottom-[2%] h-44 w-44">
        <WatercolorBlob color={C.pink} className="h-full w-full opacity-50" seed={11} />
      </motion.div>
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
