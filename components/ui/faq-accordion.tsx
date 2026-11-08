"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import type { FaqItem } from "@/content/faq";

export function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="divide-y-[1.5px] divide-dashed divide-linework/20 border-y-[1.5px] border-dashed border-linework/20">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <li key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
              >
                <span className="font-display text-lg font-bold tracking-[-0.01em] sm:text-xl">{item.q}</span>
                <span
                  aria-hidden
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-linework text-xl transition duration-300 ${
                    isOpen ? "rotate-45 bg-butter" : "bg-paper group-hover:bg-blush-soft"
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pr-14 pb-6 text-[16px] leading-relaxed text-cocoa">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
