"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { galleryCategories, galleryItems, type GalleryCategory } from "@/content/gallery";
import { GalleryCard } from "@/components/ui/gallery-card";
import { Container, Section } from "@/components/ui/layout";
import { SectionHeader } from "@/components/ui/section-header";
import { DoodleDecoration } from "@/components/doodles/doodle";

const nudge = ["", "lg:mt-10", "lg:-mt-2", "lg:mt-6", "", "lg:mt-12", "lg:mt-2", "lg:-mt-4"];

/** The full event scrapbook with category filters. */
export function Scrapbook() {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const present = galleryCategories.filter((c) => galleryItems.some((g) => g.category === c));
  const items = filter === "All" ? galleryItems : galleryItems.filter((g) => g.category === filter);

  return (
    <Section id="gallery" className="overflow-x-clip pt-12 sm:pt-16">
      <Container>
        <div className="relative">
          <SectionHeader
            as="h1"
            size="lg"
            tab={{ label: "Gallery" }}
            title="Made for Real Moments"
            highlight="Real Moments"
            intro="Our scrapbook of weddings, festivals, birthdays and drink bars we've loved setting up."
          />
          <DoodleDecoration kind="heart" className="absolute top-4 right-2 hidden h-12 w-12 md:block" motion="float" />
        </div>

        <div role="group" aria-label="Filter events" className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {(["All", ...present] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`min-h-11 shrink-0 rounded-full border-[1.5px] px-4 text-[14.5px] font-semibold transition ${
                filter === c ? "border-ink bg-butter shadow-[var(--shadow-sticker)]" : "border-ink/20 bg-paper hover:border-ink/60"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-14">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className={`${i % 2 ? "mt-8 lg:mt-0" : ""} ${nudge[i % nudge.length]}`}
              >
                <GalleryCard item={item} index={i} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </Container>
    </Section>
  );
}
