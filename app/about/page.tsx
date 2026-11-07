import type { Metadata } from "next";
import { Container, CtaBand, PageHero } from "@/components/ui";
import { MolaMark } from "@/components/logo";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="Hi! We're Stephanie and Charlie.">
        The duo behind Mola Mola. We make bubble tea that mixes the weird with the wonderful, because the best flavours are
        often found where you least expect them.
      </PageHero>

      <Container className="mt-16 grid items-start gap-12 md:grid-cols-[1fr_1.4fr]">
        <div className="flex aspect-square items-center justify-center rounded-blob bg-sea text-sea-soft">
          <MolaMark className="h-1/2 w-1/2" />
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-ink/80">
          <h2 className="font-display text-3xl font-semibold text-ink">Why “Mola Mola”?</h2>
          <p>
            The mola mola, or ocean sunfish, is the gentle giant of the sea: big, round, a little odd, and impossible not to
            smile at. That&apos;s the energy we want in every cup.
          </p>
          <p>
            Stephanie is a long-time market vendor with years of experience overseas, now bringing that craft to Toronto. She
            runs the drinks: every recipe, every pour. Charlie handles everything around them: planning, logistics, and making
            sure your event runs smoothly.
          </p>
          <p>
            We started at Toronto&apos;s markets, fusing unexpected cultural flavours with playful presentation. Our cream
            cloud teas, real-taro milk teas and fresh-fruit teas found their fans one cup at a time. Catering lets us bring
            that same joy to your people, all at once.
          </p>
          <p className="text-base text-ink/60">Based near {site.serviceOrigin}. Serving the Greater Toronto Area.</p>
        </div>
      </Container>

      <CtaBand title="Let's make something fun for your event" body="Start with an estimate. It only takes a minute." />
    </>
  );
}
