"use client";

import { motion, MotionConfig, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/** App-wide motion settings. `reducedMotion="user"` honours the OS setting. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fade-up (or slide-in) once when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  from = "up",
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  from?: "up" | "left" | "right";
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const offset = { up: { y: 28 }, left: { x: -36 }, right: { x: 36 } }[from];
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

/** Light parallax for decorative elements. `speed` ~ 0.2–1.5; disabled for reduced motion. */
export function Parallax({ children, speed = 0.5, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60 * speed, -60 * speed]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}

/** Hand-drawn underline that draws itself in when visible. */
export function HandUnderline({ children, color = "#f39a5d", className = "" }: { children: ReactNode; color?: string; className?: string }) {
  return (
    <span className={`relative inline-block whitespace-nowrap ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-[0.18em] left-[-2%] z-0 h-[0.42em] w-[104%]" overflow="visible">
        <motion.path
          d="M3 13 C 40 5, 90 4, 130 8 S 185 14, 197 7"
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.9, delay: 0.25, ease: "easeInOut" }}
        />
      </svg>
    </span>
  );
}
