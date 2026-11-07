import type { ReactNode } from "react";
import { Illustration, type IllustrationKind } from "@/components/doodles/illustrations";
import { DoodleDecoration } from "@/components/doodles/doodle";
import { C } from "@/components/doodles/palette";
import { WatercolorBlob } from "@/components/ui/decor";
import { Container } from "@/components/ui/layout";
import { Parallax } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { toneHex, type Tone } from "@/lib/tones";

/** Opening "divider page" for inner pages. */
export function PageIntro({
  label,
  title,
  highlight,
  intro,
  illustration,
  tone = "blue",
  children,
}: {
  label: string;
  title: string;
  highlight?: string;
  intro?: ReactNode;
  illustration: IllustrationKind;
  tone?: Tone;
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-x-clip pt-16 pb-4 sm:pt-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr]">
        <div>
          <SectionHeader as="h1" size="lg" tab={{ label }} title={title} highlight={highlight} intro={intro} />
          {children && <div className="mt-8">{children}</div>}
        </div>
        <div className="relative mx-auto hidden h-72 w-72 md:block">
          <WatercolorBlob color={toneHex[tone]} spots={C.butter} className="absolute inset-0 h-full w-full" seed={8} />
          <Parallax speed={0.6} className="relative flex h-full items-center justify-center">
            <Illustration kind={illustration} className="h-48 w-48 animate-float" />
          </Parallax>
          <DoodleDecoration kind="sparkle" className="absolute -top-2 right-4 h-8 w-8" motion="twinkle" />
        </div>
      </Container>
    </div>
  );
}
