import type { Metadata } from "next";
import { Suspense } from "react";
import { Calculator, type Mode } from "@/components/calculator";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Build your estimate",
  description: "See a price range for bubble tea catering in about a minute.",
};

async function CalculatorFromParams({ searchParams }: { searchParams: PageProps<"/build">["searchParams"] }) {
  const { mode } = await searchParams;
  const initial: Mode | null = mode === "bar" ? "bar" : mode === "pre-order" ? "pre-order" : null;
  return <Calculator initialMode={initial} />;
}

export default function Build({ searchParams }: PageProps<"/build">) {
  return (
    <>
      <PageHero eyebrow="Estimate builder" title="What would catering cost?">
        A few quick questions, an honest price range. Nothing is booked until we&apos;ve talked.
      </PageHero>
      <Suspense fallback={<Calculator initialMode={null} />}>
        <CalculatorFromParams searchParams={searchParams} />
      </Suspense>
    </>
  );
}
