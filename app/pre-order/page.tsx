import type { Metadata } from "next";
import { ButtonLink, Check, Container, CtaBand, PageHero } from "@/components/ui";
import { money, preOrderConfig } from "@/lib/pricing";
import { drinks } from "@/lib/menu";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Pre-Order Catering" };

export default function PreOrder() {
  const prices = drinks.map((d) => d.largeOrderPrice);
  const from = Math.min(...prices);
  return (
    <>
      <PageHero eyebrow="🥤 Pre-Order Catering" title="Bubble tea for the whole room, delivered.">
        We make your drinks fresh the day of your event and deliver them sealed, labelled and ready to hand out. No setup, no
        staff to coordinate.
      </PageHero>

      <Container className="mt-16 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold">What&apos;s included</h2>
          <ul className="mt-5 space-y-3">
            <Check>Drinks made fresh the morning of your event</Check>
            <Check>Sealed cups, labelled by flavour, with straws</Check>
            <Check>Mix and match flavours across your order</Check>
            <Check>Optional toppings, packed separately so they stay perfect</Check>
            <Check>Delivered at a time you choose</Check>
          </ul>
        </div>
        <div className="rounded-blob bg-sea-soft p-8">
          <h2 className="font-display text-2xl font-semibold">The basics</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between gap-4 border-b border-sea/15 pb-3">
              <dt className="text-ink/70">Minimum order</dt>
              <dd className="font-semibold">{preOrderConfig.minCups} cups</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-sea/15 pb-3">
              <dt className="text-ink/70">Drinks from</dt>
              <dd className="font-semibold">{money(from)} / cup</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-sea/15 pb-3">
              <dt className="text-ink/70">Big-order savings</dt>
              <dd className="font-semibold">Up to {Math.max(...preOrderConfig.volumeTiers.map((t) => t.discount)) * 100}% off</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-sea/15 pb-3">
              <dt className="text-ink/70">Delivery</dt>
              <dd className="font-semibold">Free within {site.freeDeliveryKm} km</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink/70">Beyond {site.freeDeliveryKm} km</dt>
              <dd className="font-semibold">Courier cost, ~$5–$30</dd>
            </div>
          </dl>
          <div className="mt-8">
            <ButtonLink href="/build?mode=pre-order">Estimate my order</ButtonLink>
          </div>
        </div>
      </Container>

      <Container className="mt-16">
        <h2 className="font-display text-2xl font-semibold">Perfect for</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {["Office lunches", "Birthday parties", "Recitals", "School events", "Baby showers", "Team celebrations", "Farewell parties"].map((t) => (
            <span key={t} className="rounded-full border border-line bg-white px-4 py-2 text-sm">
              {t}
            </span>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm text-ink/60">
          Pre-orders are drop-off only. Want drinks made live in front of your guests? Take a look at the{" "}
          <a href="/bar-setup" className="font-semibold text-sea underline">
            Bar Setup Experience
          </a>
          .
        </p>
      </Container>

      <CtaBand title="How many cups are you thinking?" body="Pick your flavours and count, and we'll show you the range." href="/build?mode=pre-order" label="Build a pre-order" />
    </>
  );
}
