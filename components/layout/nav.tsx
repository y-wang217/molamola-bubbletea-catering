"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { mainNav, primaryCta, socials } from "@/content/site";
import { Logo } from "./logo";
import { DoodleDecoration } from "@/components/doodles/doodle";
import { CTAButton } from "@/components/ui/cta-button";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the menu after navigating.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border-[1.5px] border-linework bg-paper/90 py-1.5 pr-2 pl-4 backdrop-blur-md sm:pl-6">
        <Logo className="h-10 w-auto sm:h-11" />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-[14.5px] font-semibold transition-colors ${
                    isActive(item.href) ? "bg-butter" : "hover:bg-blush-soft"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <CTAButton href={primaryCta.href} className="min-h-11 py-2">
              {primaryCta.label}
            </CTAButton>
          </span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-11 items-center gap-2 rounded-full border-[1.5px] border-linework bg-paper px-4 text-[14.5px] font-semibold xl:hidden"
          >
            <span aria-hidden className="flex flex-col gap-1">
              <span className="block h-[2px] w-4 rounded bg-ink" />
              <span className="block h-[2px] w-3 rounded bg-ink" />
            </span>
            Menu
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="dot-grid fixed inset-0 z-50 flex flex-col overflow-y-auto bg-cream px-6 pt-5 pb-10"
          >
            <div className="flex items-center justify-between">
              <Logo className="h-10 w-auto" />
              <button type="button" onClick={() => setOpen(false)} className="h-11 rounded-full border-[1.5px] border-linework bg-paper px-4 text-[14.5px] font-semibold">
                Close ✕
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-10">
              <ul className="space-y-1">
                {mainNav.map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-2 font-display text-[2.1rem] font-extrabold tracking-[-0.03em]"
                    >
                      {item.label}
                      {isActive(item.href) && <DoodleDecoration kind="star" className="h-7 w-7" />}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto pt-10">
              <CTAButton href={primaryCta.href} className="w-full" arrow>
                {primaryCta.label}
              </CTAButton>
              <div className="mt-6 flex justify-center gap-6 text-[15px] font-semibold">
                {socials.map((s) => (
                  <a key={s.kind} href={s.href} className="underline-offset-4 hover:underline">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
