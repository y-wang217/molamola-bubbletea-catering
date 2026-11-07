import type { Metadata } from "next";
import { ButtonLink, Check, Container, CtaBand, PageHero } from "@/components/ui";
import { barConfig } from "@/lib/pricing";

export const metadata: Metadata = { title: "Bar Setup Experience" };

export default function BarSetup() {
  return (
    <>
      <PageHero eyebrow="🍸 Bar Setup Experience" title="A live bubble tea bar, right at your event.">
        We bring the bar, the tea and the toppings, and make every drink to order while your guests watch. It&apos;s a drink
        and a show.
      </PageHero>

      <Container className="mt-16 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold">What&apos;s included</h2>
          <ul className="mt-5 space-y-3">
            <Check>Full drink bar setup and teardown</Check>
            <Check>Our team on site for your whole service window</Check>
            <Check>Your choice of drinks and toppings from our menu</Check>
            <Check>Cups, straws, ice and equipment</Check>
            <Check>We leave the space as clean as we found it</Check>
          </ul>

          <h2 className="mt-10 font-display text-2xl font-semibold">Make it yours</h2>
          <ul className="mt-5 space-y-3">
            {barConfig.extras.map((e) => (
              <Check key={e.id}>{e.label}</Check>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="rounded-blob bg-taro/25 p-8">
            <h2 className="font-display text-2xl font-semibold">You pick the size of it</h2>
            <p className="mt-3 text-ink/75">
              No rigid packages. Choose your guest count, how long you want the bar open, and how many drinks and toppings to
              offer. The estimate updates as you go.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl bg-white/70 p-4">
                <dt className="text-ink/60">Service</dt>
                <dd className="mt-1 font-semibold">
                  {barConfig.limits.minHours}–{barConfig.limits.maxHours} hours
                </dd>
              </div>
              <div className="rounded-2xl bg-white/70 p-4">
                <dt className="text-ink/60">Drink options</dt>
                <dd className="mt-1 font-semibold">
                  {barConfig.limits.minDrinks}–{barConfig.limits.maxDrinks}
                </dd>
              </div>
              <div className="rounded-2xl bg-white/70 p-4">
                <dt className="text-ink/60">Toppings</dt>
                <dd className="mt-1 font-semibold">
                  {barConfig.limits.minToppings}–{barConfig.limits.maxToppings}
                </dd>
              </div>
              <div className="rounded-2xl bg-white/70 p-4">
                <dt className="text-ink/60">Guests</dt>
                <dd className="mt-1 font-semibold">{barConfig.limits.minGuests}+</dd>
              </div>
            </dl>
            <div className="mt-8">
              <ButtonLink href="/build?mode=bar">Design my bar</ButtonLink>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6 text-sm text-ink/75">
            <p className="font-semibold text-ink">A note on pace</p>
            <p className="mt-2">
              Every drink is shaken fresh, about {barConfig.drinksPerHourPerPerson} an hour per bartender. Your guests won&apos;t
              all get a cup in the first ten minutes, and that&apos;s part of the charm: the bar becomes a spot people drift back
              to all night. For bigger crowds we bring an extra pair of hands.
            </p>
          </div>
        </div>
      </Container>

      <CtaBand title="Picture it at your event" body="Weddings, milestone birthdays, corporate parties, cultural celebrations. Let's size it up." href="/build?mode=bar" label="Build a bar estimate" />
    </>
  );
}
