"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { GalleryItem } from "@/content/gallery";
import { Illustration } from "@/components/doodles/illustrations";
import { DoodleDecoration } from "@/components/doodles/doodle";
import { toneBg } from "@/lib/tones";

const aspect = { square: "aspect-square", tall: "aspect-[4/5]", wide: "aspect-[5/4]" };
const tapeTone = ["bg-blush/80", "bg-butter/85", "bg-powder/85", "bg-sage/85"];

/** Polaroid with washi tape, a handwritten caption and gentle parallax drift. */
export function GalleryCard({ item, index = 0 }: { item: GalleryItem; index?: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40 * item.drift, -40 * item.drift]);

  return (
    <motion.figure
      ref={ref}
      style={reduce ? undefined : { y }}
      initial={false}
      animate={{ rotate: item.tilt, scale: 1 }}
      whileHover={{ rotate: 0, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="relative mx-auto w-full max-w-sm bg-white p-3 pb-2 shadow-[0_14px_30px_-18px_rgb(107_74_51/0.45),0_2px_4px_rgb(107_74_51/0.08)]"
    >
      <span aria-hidden className={`tape absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 ${index % 2 ? "rotate-3" : "-rotate-2"} ${tapeTone[index % tapeTone.length]}`} />
      <div className={`relative ${aspect[item.shape]} overflow-hidden ${toneBg[item.tone]}`}>
        {item.image ? (
          <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-paper/50" role="img" aria-label={`${item.alt} (photo coming soon)`}>
            <Illustration kind={item.placeholder} className="art-sketch h-1/2 w-1/2" />
            <span className="font-hand text-lg leading-none text-cocoa">photo coming soon</span>
          </div>
        )}
        {index % 3 === 0 && <DoodleDecoration kind="heart" className="absolute right-3 bottom-3 h-7 w-7" motion="bob" delay={index * 0.3} />}
      </div>
      <figcaption className="px-1 pt-2.5 pb-1 text-center font-hand text-[1.45rem] leading-tight">{item.caption}</figcaption>
    </motion.figure>
  );
}
