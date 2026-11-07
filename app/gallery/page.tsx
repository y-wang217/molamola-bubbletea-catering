import type { Metadata } from "next";
import { Gallery } from "@/components/sections/gallery";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <Gallery variant="full" asPage tabIndex="01" />
      <FinalCTA />
    </>
  );
}
