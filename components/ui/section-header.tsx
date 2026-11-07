import type { ReactNode } from "react";
import { HandUnderline, Reveal } from "./motion";

type Props = {
  /** Binder divider tab, e.g. { index: "02", label: "Celebrations" } */
  tab?: { index: string; label: string };
  title: string;
  /** Word or phrase in the title that gets the hand-drawn underline. */
  highlight?: string;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeader({ tab, title, highlight, intro, align = "left", as: Heading = "h2", className = "" }: Props) {
  const centered = align === "center";
  let titleNode: ReactNode = title;
  if (highlight && title.includes(highlight)) {
    const [before, after] = title.split(highlight);
    titleNode = (
      <>
        {before}
        <HandUnderline>{highlight}</HandUnderline>
        {after}
      </>
    );
  }

  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {tab && (
        <p className={`inline-flex items-center gap-2 rounded-t-xl rounded-b-sm border-[1.5px] border-ink bg-paper px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${centered ? "" : ""}`}>
          <span className="text-tangerine-deep">{tab.index}</span>
          <span className="h-3 w-px bg-ink/30" aria-hidden />
          {tab.label}
        </p>
      )}
      <Heading className="mt-5 font-display text-[2.4rem] leading-[1.02] font-extrabold tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.6rem]">
        {titleNode}
      </Heading>
      {intro && <div className={`mt-5 text-lg leading-relaxed text-cocoa text-pretty ${centered ? "mx-auto max-w-xl" : "max-w-xl"}`}>{intro}</div>}
    </Reveal>
  );
}
