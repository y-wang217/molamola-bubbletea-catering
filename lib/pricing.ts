// ─────────────────────────────────────────────────────────────────────────────
// ALL catering pricing lives here. Components never hard-code a number.
//
// ⚠️  DRAFT NUMBERS. Pricing is not finalized (see "Catering Launch Plan 2026"
//     open questions in Notion). Bar-setup constants were tuned so the
//     internal anchors land where the plan puts them:
//       Standard ≈ $1,000  (4 hrs · 3 drinks · 3 toppings · 80 guests)
//       Premium  ≈ $2,000  (5–6 hrs · 6–7 drinks · 4–5 toppings · 100 guests + extras)
//     Swap in the final numbers from Stephanie's binder when they lock.
// ─────────────────────────────────────────────────────────────────────────────

import { drinks } from "./menu";

export const preOrderConfig = {
  minCups: 50,
  maxCupsOnline: 600, // above this, the calculator asks them to talk to us
  toppingPerCup: 1, // matches "Large Order Price" for tapioca in Notion
  // Volume discount applied to the drink subtotal (TODO: confirm 50+/100+/200+ tiers)
  volumeTiers: [
    { minCups: 200, discount: 0.1 },
    { minCups: 100, discount: 0.05 },
    { minCups: 50, discount: 0 },
  ],
  // Delivery bands from Finch & Victoria Park. Beyond 15 km is a passthrough Uber cost.
  delivery: [
    { id: "free", label: "Within 15 km", low: 0, high: 0 },
    { id: "near", label: "15–25 km", low: 5, high: 15 },
    { id: "far", label: "25–40 km", low: 15, high: 30 },
  ],
  rangeSpread: 0.08, // ± shown to the customer
};

export const barConfig = {
  // What the base fee covers
  base: { fee: 700, hours: 3, drinks: 3, toppings: 2, guests: 50 },
  perExtraHour: 125,
  perExtraDrink: 75,
  perExtraTopping: 40,
  perExtraGuest: 5, // 51–100 guests
  overCapGuests: 100,
  perGuestOverCap: 8, // TODO: per-guest vs next-tier is still an open question
  helper: { fromGuests: 120, perHour: 40 }, // TODO: confirm helper threshold
  extras: [
    { id: "customDrink", label: "Custom signature drink", price: 150 },
    { id: "stickers", label: "Custom cup stickers", price: 150 },
    { id: "menuDisplay", label: "Printed menu display", price: 75 },
  ],
  limits: { minHours: 2, maxHours: 8, minDrinks: 2, maxDrinks: 7, minToppings: 1, maxToppings: 5, minGuests: 20, maxGuestsOnline: 250 },
  drinksPerHourPerPerson: 30,
  baseStaff: 2, // Stephanie on drinks, Charlie on comms/logistics
  rangeSpread: 0.1,
};

export type LineItem = { label: string; amount: number; note?: string };

export type Estimate = {
  low: number;
  high: number;
  lineItems: LineItem[];
  inclusions: string[];
  notes: string[];
  needsConversation: boolean;
};

const roundTo = (n: number, step: number) => Math.round(n / step) * step;

function spread(total: number, pct: number, step: number) {
  return { low: roundTo(total * (1 - pct), step), high: roundTo(total * (1 + pct), step) };
}

// ── Pre-order ────────────────────────────────────────────────────────────────

export type PreOrderInput = {
  cups: number;
  drinkIds: string[];
  toppings: boolean;
  deliveryId: string;
};

export function estimatePreOrder(input: PreOrderInput): Estimate {
  const cfg = preOrderConfig;
  const selected = drinks.filter((d) => input.drinkIds.includes(d.id));
  const pool = selected.length ? selected : drinks.filter((d) => d.popular);
  const avgPrice = pool.reduce((s, d) => s + d.largeOrderPrice, 0) / pool.length;
  const cups = Math.max(cfg.minCups, Math.round(input.cups));

  const drinkSubtotal = cups * avgPrice;
  const tier = cfg.volumeTiers.find((t) => cups >= t.minCups) ?? cfg.volumeTiers.at(-1)!;
  const discount = drinkSubtotal * tier.discount;
  const toppingTotal = input.toppings ? cups * cfg.toppingPerCup : 0;
  const delivery = cfg.delivery.find((d) => d.id === input.deliveryId) ?? cfg.delivery[0];

  const lineItems: LineItem[] = [
    {
      label: `${cups} drinks`,
      amount: drinkSubtotal,
      note: `${pool.length} flavour${pool.length === 1 ? "" : "s"}, avg $${avgPrice.toFixed(2)}/cup`,
    },
  ];
  if (discount > 0) lineItems.push({ label: `Volume discount (${tier.discount * 100}%)`, amount: -discount });
  if (toppingTotal) lineItems.push({ label: "Toppings", amount: toppingTotal, note: `$${cfg.toppingPerCup}/cup` });
  lineItems.push({
    label: `Delivery · ${delivery.label}`,
    amount: (delivery.low + delivery.high) / 2,
    note: delivery.high === 0 ? "Free" : `Uber passthrough, ~$${delivery.low}–$${delivery.high}`,
  });

  const core = drinkSubtotal - discount + toppingTotal;
  const range = spread(core, cfg.rangeSpread, 5);

  return {
    low: range.low + delivery.low,
    high: range.high + delivery.high,
    lineItems,
    inclusions: [
      "Drinks made fresh the day of your event",
      "Sealed, labelled cups with straws",
      "Delivered to your venue at a set time",
    ],
    notes: [
      `Minimum order is ${cfg.minCups} cups.`,
      "Drop-off only. No on-site service with pre-orders.",
    ],
    needsConversation: input.cups > cfg.maxCupsOnline,
  };
}

// ── Bar setup ────────────────────────────────────────────────────────────────

export type BarInput = {
  guests: number;
  hours: number;
  drinkOptions: number;
  toppingOptions: number;
  extras: string[];
};

export function estimateBar(input: BarInput): Estimate {
  const cfg = barConfig;
  const { base } = cfg;
  const lineItems: LineItem[] = [
    {
      label: "Drink bar base",
      amount: base.fee,
      note: `Setup, teardown, ${base.hours} hrs, ${base.drinks} drinks, ${base.toppings} toppings, up to ${base.guests} guests`,
    },
  ];

  const extraHours = Math.max(0, input.hours - base.hours);
  if (extraHours) lineItems.push({ label: `+${extraHours} hr service`, amount: extraHours * cfg.perExtraHour });

  const extraDrinks = Math.max(0, input.drinkOptions - base.drinks);
  if (extraDrinks) lineItems.push({ label: `+${extraDrinks} drink option${extraDrinks > 1 ? "s" : ""}`, amount: extraDrinks * cfg.perExtraDrink });

  const extraToppings = Math.max(0, input.toppingOptions - base.toppings);
  if (extraToppings) lineItems.push({ label: `+${extraToppings} topping${extraToppings > 1 ? "s" : ""}`, amount: extraToppings * cfg.perExtraTopping });

  const midGuests = Math.max(0, Math.min(input.guests, cfg.overCapGuests) - base.guests);
  if (midGuests) lineItems.push({ label: `Guests ${base.guests + 1}–${Math.min(input.guests, cfg.overCapGuests)}`, amount: midGuests * cfg.perExtraGuest });

  const overCap = Math.max(0, input.guests - cfg.overCapGuests);
  if (overCap) lineItems.push({ label: `Guests over ${cfg.overCapGuests}`, amount: overCap * cfg.perGuestOverCap });

  const needsHelper = input.guests >= cfg.helper.fromGuests;
  if (needsHelper) lineItems.push({ label: "Extra bartender", amount: input.hours * cfg.helper.perHour, note: "Keeps the line moving" });

  for (const extra of cfg.extras) {
    if (input.extras.includes(extra.id)) lineItems.push({ label: extra.label, amount: extra.price });
  }

  const total = lineItems.reduce((s, li) => s + li.amount, 0);
  const range = spread(total, cfg.rangeSpread, 25);

  const staff = cfg.baseStaff + (needsHelper ? 1 : 0);
  // Stephanie is the drink maker; a helper adds a second pair of hands on drinks.
  const makers = needsHelper ? 2 : 1;
  const perHour = cfg.drinksPerHourPerPerson * makers;
  const roundMinutes = Math.round((input.guests / perHour) * 60);

  return {
    ...range,
    lineItems,
    inclusions: [
      `${staff} Mola Mola team members on site`,
      "Bar setup, equipment, cups and straws",
      "Drinks made to order for the whole service window",
      "Full teardown and cleanup",
    ],
    notes: [
      `We make about ${perHour} drinks an hour, so serving everyone once takes about ${roundMinutes} minutes. Most events find that pace feels natural, not slow.`,
    ],
    needsConversation: input.guests > cfg.limits.maxGuestsOnline,
  };
}

export const money = (n: number) =>
  n.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
