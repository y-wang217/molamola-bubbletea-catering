import type { ReactNode } from "react";
import { HandUnderline, Reveal } from "./motion";
import { DoodleDecoration } from "@/components/doodles/doodle";

type Props = {
  /** Small eyebrow, e.g. { index: "02", label: "Catering" } */
  tab?: { index?: string; label: string };
  title: string;
  /** Word or phrase in the title that gets the hand-drawn underline. */
  highlight?: string;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  size?: "md" | "lg";
  /** Little hand-drawn emphasis rays beside the title (use on a few key headings). */
  rays?: boolean;
  className?: string;
};

/** Eyebrow → large title → short supporting line. */
export function SectionHeader({ tab, title, highlight, intro, align = "left", as: Heading = "h2", size = "md", rays = false, className = "" }: Props) {
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
        <p className={`flex items-center gap-2.5 text-[12.5px] font-bold tracking-[0.2em] text-cocoa uppercase ${centered ? "justify-center" : ""}`}>
          {tab.index && <span className="text-tangerine-deep">{tab.index}</span>}
          {tab.index && <span aria-hidden className="h-[1.5px] w-6 rounded bg-ink/25" />}
          {tab.label}
        </p>
      )}
      <Heading
        className={`mt-4 font-display font-extrabold tracking-[-0.035em] text-balance ${
          size === "lg"
            ? "text-[3rem] leading-[0.96] sm:text-[4rem] lg:text-[5rem]"
            : "text-[2.7rem] leading-[0.98] sm:text-[3.4rem] lg:text-[4.25rem]"
        }`}
      >
        {titleNode}
        {rays && <DoodleDecoration kind="rays" className="ml-1 inline-block h-[0.55em] w-[0.55em] -translate-y-[0.7em]" />}
      </Heading>
      {intro && (
        <div className={`mt-5 text-[17px] leading-relaxed text-cocoa text-pretty sm:text-lg ${centered ? "mx-auto max-w-xl" : "max-w-xl"}`}>{intro}</div>
      )}
    </Reveal>
  );
}
