import { about } from "@/content/story";
import { Container, Section } from "@/components/ui/layout";
import { Parallax, Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Mascot } from "@/components/doodles/mascot";
import { DoodleDecoration } from "@/components/doodles/doodle";
import { toneBg } from "@/lib/tones";

const tilt = ["-rotate-1", "rotate-1", "rotate-[0.6deg]", "-rotate-[0.8deg]"];

export function About({ asPage = false, tabIndex = "07" }: { asPage?: boolean; tabIndex?: string }) {
  return (
    <Section id="about" className={asPage ? "pt-12 sm:pt-16" : ""}>
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* mascot + brand photo placeholder */}
          <div className="relative mx-auto w-full max-w-md">
            <div aria-hidden className="absolute inset-[6%] rounded-[46%_54%_50%_50%/52%_44%_56%_48%] bg-blush" />
            <Parallax speed={0.5} className="relative flex justify-center pt-6">
              <Mascot className="h-64 w-64 sm:h-80 sm:w-80" float />
            </Parallax>
            <Reveal from="right" delay={0.2} className="absolute -right-2 -bottom-12 w-40 rotate-6 bg-white p-2.5 pb-1 shadow-[0_14px_30px_-18px_rgb(58_44_38/0.55)] sm:w-48">
              <div className="dot-grid flex aspect-square items-center justify-center bg-butter-soft text-center text-[11px] font-semibold tracking-wide text-cocoa uppercase">
                brand photo
                <br />
                placeholder
              </div>
              <p className="py-1 text-center font-hand text-xl">hi from us!</p>
            </Reveal>
            <DoodleDecoration kind="star" className="absolute top-2 left-2 h-10 w-10" motion="twinkle" />
            <DoodleDecoration kind="drop" className="absolute top-1/3 -left-4 h-8 w-8" motion="bob" />
          </div>

          <div>
            <SectionHeader as={asPage ? "h1" : "h2"} tab={{ index: tabIndex, label: "About us" }} title="Meet MolaMola" highlight="MolaMola" intro={about.intro} />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {about.blocks.map((b, i) => (
                <Reveal as="li" key={b.id} delay={i * 0.08}>
                  <article className={`h-full rounded-[1.25rem] border-[1.5px] border-ink ${toneBg[b.tone]} p-6 ${tilt[i % tilt.length]}`}>
                    <h3 className="font-hand text-[1.9rem] leading-none">{b.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{b.body}</p>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
