"use client";

import { motion } from "motion/react";
import { galleryItems } from "@/content/gallery";
import { GalleryCard } from "@/components/ui/gallery-card";
import { CTAButton } from "@/components/ui/cta-button";
import { Wash } from "@/components/ui/decor";
import { Container } from "@/components/ui/layout";
import { SectionHeader } from "@/components/ui/section-header";

const offset = ["lg:mt-0", "lg:mt-16", "lg:-mt-4", "lg:mt-10"];

/** Homepage: a few featured polaroids. Full scrapbook lives on /gallery. */
export function FeaturedEvents() {
  const featured = galleryItems.filter((g) => g.featured).slice(0, 4);
  return (
    <Wash tone="pink" className="my-10 overflow-x-clip">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            tab={{ index: "05", label: "Real events" }}
            title="Made for Real Moments"
            highlight="Real Moments"
            intro="A few favourites from our scrapbook."
          />
          <CTAButton href="/gallery" variant="secondary" arrow className="self-start lg:self-auto">
            See Our Events
          </CTAButton>
        </div>

        <ul className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pt-6 pb-10 sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-16 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0">
          {featured.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: -24, rotate: i % 2 ? 6 : -6 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ type: "spring", stiffness: 140, damping: 16, delay: i * 0.1 }}
              className={`w-[68vw] max-w-[17rem] shrink-0 snap-center lg:w-auto lg:max-w-none ${offset[i]}`}
            >
              <GalleryCard item={item} index={i} />
            </motion.li>
          ))}
        </ul>
      </Container>
    </Wash>
  );
}
