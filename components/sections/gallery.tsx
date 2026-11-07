import { galleryItems } from "@/content/gallery";
import { GalleryCard } from "@/components/ui/gallery-card";
import { CTAButton } from "@/components/ui/cta-button";
import { Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { DoodleDecoration } from "@/components/doodles/doodle";

// Scrapbook offsets so cards don't line up like a grid.
const nudge = ["", "sm:ml-10", "lg:-ml-4", "sm:mr-8", "lg:ml-8", "", "sm:ml-6", "lg:-mr-6"];

export function Gallery({ variant = "preview", asPage = false, tabIndex = "06" }: { variant?: "preview" | "full"; asPage?: boolean; tabIndex?: string }) {
  const items = variant === "full" ? galleryItems : galleryItems.slice(0, 6);
  return (
    <Section id="gallery" className={`overflow-x-clip ${asPage ? "pt-12 sm:pt-16" : ""}`}>
      <Container>
        <div className="relative">
          <SectionHeader
            as={asPage ? "h1" : "h2"}
            tab={{ index: tabIndex, label: "Gallery" }}
            title="Made for Real Moments"
            highlight="Real Moments"
            intro="A peek into our scrapbook: weddings, festivals, birthdays and drink bars we've loved setting up."
          />
          <DoodleDecoration kind="heart" className="absolute top-4 right-2 hidden h-12 w-12 md:block" motion="float" />
        </div>

        <div className="mt-16 columns-1 gap-10 sm:columns-2 lg:columns-3 lg:gap-14">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.1} className={`mb-12 w-[84%] break-inside-avoid sm:mb-14 sm:w-auto ${i % 2 ? "ml-auto sm:ml-0" : ""} ${nudge[i % nudge.length]}`}>
              <GalleryCard item={item} index={i} />
            </Reveal>
          ))}
        </div>

        {variant === "preview" && (
          <Reveal className="mt-6 flex justify-center">
            <CTAButton href="/gallery" variant="secondary" arrow>
              See the full scrapbook
            </CTAButton>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
