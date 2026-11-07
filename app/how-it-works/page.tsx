import type { Metadata } from "next";
import { Container, CtaBand, PageHero } from "@/components/ui";
import { barConfig, preOrderConfig } from "@/lib/pricing";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "How it works" };

const steps = [
  {
    title: "Pick Pre-Order or Bar Setup",
    body: "Pre-order is drop-off: sealed cups, delivered at a set time. Bar setup is the full experience: we bring the bar and make drinks to order during your event.",
  },
  {
    title: "Build your estimate",
    body: "Our calculator asks a few light questions (guests, flavours, hours) and shows an itemized price range right away.",
  },
  {
    title: "Send it our way",
    body: "Your estimate is attached to your inquiry automatically, so we start from the same numbers you saw.",
  },
  {
    title: "We confirm and lock your date",
    body: "We reply within a day with a final quote. A deposit reserves your date.",
  },
  {
    title: "Event day",
    body: "Pre-orders arrive ready to hand out. For bar setups, we arrive early, set up, serve, and leave the space clean.",
  },
];

const faqs = [
  {
    q: "Is the estimate a final price?",
    a: "It's a good-faith range, not a binding quote. Most final quotes land inside it. Unusual venues, long distances or custom requests can move it.",
  },
  {
    q: "What's the minimum order?",
    a: `Pre-orders start at ${preOrderConfig.minCups} cups. Bar setups don't have a cup minimum. They're priced by guests, hours and menu size.`,
  },
  {
    q: "Where do you deliver?",
    a: `We're based near ${site.serviceOrigin}. Delivery is free within ${site.freeDeliveryKm} km. Beyond that we pass through the courier cost, usually $5–$30.`,
  },
  {
    q: "Can I pick up my order?",
    a: "We're a home-based kitchen, so we don't offer pickup. Every order is delivered.",
  },
  {
    q: "How fast can the bar serve my guests?",
    a: `Each drink is made fresh, about ${barConfig.drinksPerHourPerPerson} drinks an hour per bartender. For 80 guests, that's a relaxed first round over a couple of hours, not an instant rush. For bigger crowds we add a second bartender.`,
  },
  {
    q: "Can you do dairy-free or less sweet?",
    a: "Every drink can be made at adjustable sweetness. For dairy-free or other dietary needs, note it in your inquiry and we'll suggest the best options.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <PageHero eyebrow="How it works" title="Clear prices, no back-and-forth.">
        We think you should know roughly what catering costs before you ever talk to us. Here&apos;s the whole process.
      </PageHero>

      <Container className="mt-16">
        <ol className="relative space-y-8 border-l-2 border-sea-soft pl-8">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="absolute -left-[2.85rem] flex h-9 w-9 items-center justify-center rounded-full bg-sea font-display font-semibold text-foam">
                {i + 1}
              </span>
              <h2 className="font-display text-2xl font-semibold">{s.title}</h2>
              <p className="mt-1 max-w-2xl text-ink/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>

      <Container className="mt-20">
        <h2 className="font-display text-3xl font-semibold">Questions</h2>
        <div className="mt-6 divide-y divide-line rounded-3xl border border-line bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-sea transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-ink/75">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>

      <CtaBand title="Ready to see your number?" body="It takes about a minute, and you don't need to give us your email to see it." />
    </>
  );
}
