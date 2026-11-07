import Link from "next/link";
import { ButtonLink, Check, Container, CtaBand, Eyebrow } from "@/components/ui";
import { MolaMark } from "@/components/logo";
import { drinks } from "@/lib/menu";
import { preOrderConfig } from "@/lib/pricing";
import { site } from "@/lib/site";

const modes = [
  {
    href: "/pre-order",
    emoji: "🥤",
    title: "Pre-Order Catering",
    pitch: "Bulk drinks made fresh the day of, delivered to your door. Simple, no setup.",
    points: [`From ${preOrderConfig.minCups} cups`, `Free delivery within ${site.freeDeliveryKm} km`, "Great for offices, parties, recitals"],
    tone: "bg-sea-soft",
  },
  {
    href: "/bar-setup",
    emoji: "🍸",
    title: "Bar Setup Experience",
    pitch: "A live bubble tea bar at your event. We set up, pour to order, and clean up.",
    points: ["Drinks made fresh on site", "Choose your menu and toppings", "Weddings, birthdays, corporate events"],
    tone: "bg-taro/30",
  },
];

const steps = [
  { n: "1", title: "Pick a style", body: "Drop-off pre-order, or a live drink bar." },
  { n: "2", title: "Answer a few questions", body: "Guests, flavours, hours. Takes about a minute." },
  { n: "3", title: "See your price range", body: "An honest estimate with everything itemized. No “contact us for a quote.”" },
  { n: "4", title: "Lock in your date", body: "Send it to us and we'll confirm within a day." },
];

export default function Home() {
  const popular = drinks.filter((d) => d.popular);
  return (
    <>
      <section className="bubbles relative overflow-hidden bg-ink text-foam">
        <Container className="grid items-center gap-12 py-20 sm:py-28 md:grid-cols-[1.3fr_1fr]">
          <div>
            <Eyebrow>
              <span className="text-sea-soft">Bubble tea catering · Toronto</span>
            </Eyebrow>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Make a splash at your next event.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-foam/80">
              Fresh-fruit teas, real-taro milk teas and our signature cream cloud tea, delivered by the cup or poured live at
              your own drink bar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/build">See what it costs</ButtonLink>
              <Link href="/how-it-works" className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-foam hover:bg-white/10">
                How it works →
              </Link>
            </div>
          </div>
          <div className="relative mx-auto hidden aspect-square w-full max-w-sm md:block">
            <div className="absolute inset-0 rounded-full bg-sea/60 blur-2xl" />
            <div className="relative flex h-full items-center justify-center rounded-full border border-foam/10 bg-sea/40">
              <MolaMark className="h-2/3 w-2/3 text-sea-soft" />
            </div>
          </div>
        </Container>
      </section>

      <Container className="mt-20">
        <Eyebrow>Two ways to cater</Eyebrow>
        <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Choose your style first. We&apos;ll handle the rest.</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {modes.map((m) => (
            <Link key={m.href} href={m.href} className={`group rounded-blob ${m.tone} p-8 transition hover:-translate-y-0.5 hover:shadow-lg`}>
              <span className="text-4xl" aria-hidden>
                {m.emoji}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold">{m.title}</h3>
              <p className="mt-2 text-ink/75">{m.pitch}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {m.points.map((p) => (
                  <Check key={p}>{p}</Check>
                ))}
              </ul>
              <p className="mt-6 text-sm font-semibold text-sea group-hover:underline">Learn more →</p>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="mt-24">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">A real price in about a minute.</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="rounded-3xl border border-line bg-white p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coral font-display text-lg font-semibold text-white">{s.n}</span>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-ink/70">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>

      <Container className="mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Crowd favourites</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">What people come back for</h2>
          </div>
          <Link href="/menu" className="text-sm font-semibold text-sea hover:underline">
            Full menu →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((d) => (
            <div key={d.id} className="rounded-3xl bg-sand p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-pearl/70">{d.category}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">{d.name}</h3>
              <p className="mt-2 text-sm text-ink/70">{d.description}</p>
            </div>
          ))}
        </div>
      </Container>

      <CtaBand
        title="Hosting something?"
        body="Tell us your guest count and flavours, and we'll show you a price range on the spot. No email required to look."
      />
    </>
  );
}
