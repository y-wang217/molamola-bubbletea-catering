import type { Metadata } from "next";
import { Suspense } from "react";
import { InquiryForm } from "@/components/inquiry-form";
import { Container, PageHero } from "@/components/ui";
import { money } from "@/lib/pricing";

export const metadata: Metadata = { title: "Inquire" };

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

async function InquiryWithEstimate({ searchParams }: { searchParams: PageProps<"/inquire">["searchParams"] }) {
  const sp = await searchParams;
  const mode = one(sp.mode);
  const low = Number(one(sp.low));
  const high = Number(one(sp.high));
  const summary = one(sp.summary).slice(0, 400);
  const range = low > 0 && high > 0 ? `${money(low)} – ${money(high)}` : "";
  const estimate = range ? `${range} · ${summary}` : "";

  return (
    <>
      {range && (
        <div className="mb-8 rounded-3xl border border-sea/20 bg-sea-soft p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Your estimate is attached</p>
          <p className="mt-2 font-display text-2xl font-semibold">{range}</p>
          <p className="mt-1 text-sm text-ink/70">{summary}</p>
        </div>
      )}
      <InquiryForm mode={mode === "bar" || mode === "pre-order" ? mode : ""} estimate={estimate} />
    </>
  );
}

export default function Inquire({ searchParams }: PageProps<"/inquire">) {
  return (
    <>
      <PageHero eyebrow="Inquire" title="Let's get your date on the calendar.">
        Tell us a little about your event. We&apos;ll reply within a day with a final quote.
      </PageHero>
      <Container className="mt-12 max-w-3xl">
        <Suspense fallback={<div className="h-[36rem] animate-pulse rounded-blob bg-white" />}>
          <InquiryWithEstimate searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}
