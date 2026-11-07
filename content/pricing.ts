// ─────────────────────────────────────────────────────────────
// All pricing lives here. Update numbers in this file only.
// The homepage teaser reads from these same tiers, so prices
// never need updating in two places.
// Everything below is placeholder until final pricing is set.
// ─────────────────────────────────────────────────────────────
import type { Tone } from "@/lib/tones";

export type PricingTier = {
  id: string;
  name: string;
  guests: string;
  price: string;
  priceNote: string;
  blurb: string;
  includes: string[];
  tone: Tone;
  featured?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "ready-to-serve",
    name: "Ready-to-Serve",
    guests: "Min. XX cups",
    price: "$XX",
    priceNote: "starting from",
    blurb: "Drop-off drinks, sealed and labelled.",
    includes: ["Choice of X drinks", "Sealed, labelled cups", "Delivery or pickup", "Straws + napkins"],
    tone: "blue",
  },
  {
    id: "small",
    name: "Small Event",
    guests: "Up to XX guests",
    price: "$XXX",
    priceNote: "starting from",
    blurb: "A cozy drink bar for intimate parties.",
    includes: ["Full drink bar setup", "X hours of service", "X drinks + X toppings", "1 bartender"],
    tone: "butter",
  },
  {
    id: "medium",
    name: "Medium Event",
    guests: "XX–XX guests",
    price: "$XXX",
    priceNote: "starting from",
    blurb: "Our most popular setup for weddings and parties.",
    includes: ["Full drink bar setup", "X hours of service", "X drinks + X toppings", "Printed menu", "2 bartenders"],
    tone: "pink",
    featured: true,
  },
  {
    id: "large",
    name: "Large Event",
    guests: "100+ guests",
    price: "$XXX",
    priceNote: "starting from",
    blurb: "Multiple stations so the line keeps moving.",
    includes: ["Full drink bar + extra station", "X hours of service", "Custom menu + styling", "3+ bartenders"],
    tone: "sage",
  },
];

/** Homepage teaser: points at tiers above instead of repeating numbers. */
export const pricingTeaser: { label: string; tierId?: string; fallback?: string; note: string }[] = [
  { label: "Ready-to-Serve", tierId: "ready-to-serve", note: "drop-off cups" },
  { label: "Full Service", tierId: "small", note: "live drink bar" },
  { label: "Custom Packages", fallback: "Let's talk", note: "built around you" },
];

/** What every Full Service drink bar comes with. */
export const fullServiceIncludes: string[] = [
  "Setup and teardown",
  "Drinks made fresh to order",
  "Friendly MolaMola bartenders",
  "Cups, straws, ice and napkins",
  "Menu sign for your guests",
  "Cleanup when we leave",
];

export const pricingAddOnGroups: { title: string; items: { label: string; price: string }[] }[] = [
  {
    title: "Delivery & travel",
    items: [
      { label: "Delivery (Ready-to-Serve)", price: "$XX" },
      { label: "Travel beyond XX km", price: "$X / km" },
    ],
  },
  {
    title: "Time & staff",
    items: [
      { label: "Additional service hours", price: "$XX / hr" },
      { label: "Additional staff", price: "$XX / hr" },
    ],
  },
  {
    title: "Make it yours",
    items: [
      { label: "Custom drink development", price: "$XX" },
      { label: "Custom stickers / branding", price: "$XX" },
      { label: "Extra toppings", price: "$X / guest" },
    ],
  },
];

export const pricingNote = "Every event is different — contact us for a custom quote.";

export const findTier = (id?: string) => pricingTiers.find((t) => t.id === id);
