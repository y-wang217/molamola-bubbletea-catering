import Image from "next/image";
import colorLogo from "@/public/brand/molamola-logo-color.png";
import { about } from "@/content/story";
import { Container, Section } from "@/components/ui/layout";
import { Parallax, Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { WatercolorBlob, Wash } from "@/components/ui/decor";
import { Mascot } from "@/components/doodles/mascot";
import { DoodleDecoration, type DoodleKind } from "@/components/doodles/doodle";
import { C } from "@/components/doodles/palette";
import { toneBg } from "@/lib/tones";

export function AboutIntro() {
  return (
    <Section id="about" className="pt-12 sm:pt-16">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-md lg:order-2">
          <WatercolorBlob color={C.pink} spots={C.butter} className="absolute inset-[-6%] h-[112%] w-[112%] opacity-70" seed={6} />
          <Parallax speed={0.4} className="relative">
            <Image src={colorLogo} alt="The MolaMola logo: our fish sipping a drink, with fruit and a chef's hat" priority className="h-auto w-full" sizes="(min-width: 1024px) 28rem, 90vw" />
          </Parallax>
          <DoodleDecoration kind="star" className="absolute top-0 left-2 h-10 w-10" motion="twinkle" />
        </div>
        <div>
          <SectionHeader as="h1" size="lg" tab={{ label: "About us" }} title="Meet MolaMola" highlight="MolaMola" intro={about.intro} />
        </div>
      </Container>
    </Section>
  );
}

const storyIcons: DoodleKind[] = ["heart", "sparkle", "star"];

export function OurStory() {
  return (
    <Section id="story" className="pt-4">
      <Container>
        <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
          {about.story.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 0.12} className="relative md:pt-6">
              <div className="flex items-center gap-3">
                <DoodleDecoration kind={storyIcons[i % storyIcons.length]} className="h-8 w-8" />
                <h2 className="font-hand text-[2.2rem] leading-none">{s.title}</h2>
              </div>
              <p className="mt-4 text-[16.5px] leading-relaxed text-ink/80">{s.body}</p>
              {i < about.story.length - 1 && <span aria-hidden className="absolute top-0 -right-5 bottom-0 hidden border-r-[1.5px] border-dashed border-ink/20 md:block" />}
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export function WhyAFish() {
  return (
    <Wash tone="blue" className="my-10">
      <Container className="grid items-center gap-10 py-16 sm:py-20 md:grid-cols-[0.7fr_1.3fr]">
        <Parallax speed={0.6} className="mx-auto">
          <Mascot className="h-48 w-48 sm:h-60 sm:w-60" float />
        </Parallax>
        <Reveal>
          <h2 className="font-display text-[2.7rem] leading-none font-extrabold tracking-[-0.035em] sm:text-[3.4rem]">{about.fish.title}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">{about.fish.body}</p>
        </Reveal>
      </Container>
    </Wash>
  );
}

export function Team() {
  return (
    <Section id="team">
      <Container>
        <SectionHeader tab={{ label: "The team" }} title="The Two of Us" highlight="Two of Us" align="center" intro="A tiny team that cares a lot about every cup." />
        <ul className="mx-auto mt-14 grid max-w-3xl gap-12 sm:grid-cols-2">
          {about.team.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 0.12} className="text-center">
              <figure className={`mx-auto w-60 bg-white p-3 pb-2 shadow-[0_14px_30px_-18px_rgb(58_44_38/0.55)] ${i % 2 ? "rotate-2" : "-rotate-2"}`}>
                <div className={`dot-grid flex aspect-square items-center justify-center ${toneBg[m.tone]}`}>
                  <span className="rounded-full bg-paper/80 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-cocoa uppercase">photo placeholder</span>
                </div>
                <figcaption className="pt-2 font-hand text-2xl">{m.name}</figcaption>
              </figure>
              <p className="mt-5 text-[13px] font-bold tracking-[0.14em] uppercase">{m.role}</p>
              <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-cocoa">{m.bio}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
