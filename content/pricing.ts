// ─────────────────────────────────────────────────────────────
// All pricing lives here. Update numbers in this file only.
// Everything below is placeholder until final pricing is set.
// ─────────────────────────────────────────────────────────────
import type { Tone } from "@/lib/tones";

export type PricingTier = {
  id: string;
  name: string;
  guests: string;
  price: string;
  priceNote: string;
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
    includes: ["Choice of X drinks", "Sealed, labelled cups", "Delivery or pickup"],
    tone: "blue",
  },
  {
    id: "small",
    name: "Small Event",
    guests: "Up to XX guests",
    price: "$XXX",
    priceNote: "starting from",
    includes: ["Full drink bar", "X hours of service", "X drinks + X toppings"],
    tone: "butter",
  },
  {
    id: "medium",
    name: "Medium Event",
    guests: "XX–XX guests",
    price: "$XXX",
    priceNote: "starting from",
    includes: ["Full drink bar", "X hours of service", "X drinks + X toppings", "Printed menu"],
    tone: "pink",
    featured: true,
  },
  {
    id: "large",
    name: "Large Event",
    guests: "100+ guests",
    price: "$XXX",
    priceNote: "starting from",
    includes: ["Full drink bar + extra staff", "X hours of service", "Custom menu + styling"],
    tone: "sage",
  },
];

export const pricingAddOns: { label: string; price: string }[] = [
  { label: "Additional service hours", price: "$XX / hr" },
  { label: "Delivery", price: "$XX" },
  { label: "Travel distance (beyond XX km)", price: "$X / km" },
  { label: "Custom drink development", price: "$XX" },
  { label: "Custom stickers / branding", price: "$XX" },
  { label: "Extra toppings", price: "$X / guest" },
  { label: "Additional staff", price: "$XX / hr" },
];

export const pricingNote = "Every event is different — contact us for a custom quote.";
