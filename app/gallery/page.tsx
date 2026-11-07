import type { Metadata } from "next";
import { Scrapbook } from "@/components/sections/gallery/scrapbook";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <Scrapbook />
      <FinalCTA />
    </>
  );
}
