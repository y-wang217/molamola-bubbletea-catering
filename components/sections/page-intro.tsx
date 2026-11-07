import type { ReactNode } from "react";
import { Illustration, type IllustrationKind } from "@/components/doodles/illustrations";
import { DoodleDecoration } from "@/components/doodles/doodle";
import { Container } from "@/components/ui/layout";
import { Parallax } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { toneBg, type Tone } from "@/lib/tones";

/** Opening "divider page" for inner pages. */
export function PageIntro({
  label,
  title,
  highlight,
  intro,
  illustration,
  tone = "blue",
}: {
  label: string;
  title: string;
  highlight?: string;
  intro?: ReactNode;
  illustration: IllustrationKind;
  tone?: Tone;
}) {
  return (
    <div className="relative overflow-x-clip pt-16 pb-6 sm:pt-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr]">
        <SectionHeader as="h1" tab={{ index: "MolaMola", label }} title={title} highlight={highlight} intro={intro} />
        <div className="relative mx-auto hidden h-64 w-64 md:block">
          <div aria-hidden className={`absolute inset-0 rounded-[44%_56%_52%_48%/50%_46%_54%_50%] border-[1.5px] border-ink ${toneBg[tone]}`} />
          <Parallax speed={0.6} className="relative flex h-full items-center justify-center">
            <Illustration kind={illustration} className="h-44 w-44 animate-float" />
          </Parallax>
          <DoodleDecoration kind="sparkle" className="absolute -top-2 right-2 h-8 w-8" motion="twinkle" />
          <DoodleDecoration kind="boba" className="absolute bottom-0 -left-4 h-10 w-10" motion="bob" />
        </div>
      </Container>
    </div>
  );
}
