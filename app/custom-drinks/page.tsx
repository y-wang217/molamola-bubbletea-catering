import type { Metadata } from "next";
import { CustomDrinks } from "@/components/sections/custom-drinks";
import { BuildYourBar } from "@/components/sections/build-your-bar";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = { title: "Custom Drinks" };

export default function CustomDrinksPage() {
  return (
    <>
      <CustomDrinks asPage tabIndex="01" />
      <BuildYourBar tabIndex="02" />
      <FinalCTA />
    </>
  );
}
