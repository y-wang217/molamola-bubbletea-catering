"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { drinks } from "@/lib/menu";
import { barConfig, estimateBar, estimatePreOrder, money, preOrderConfig, type Estimate } from "@/lib/pricing";
import { Container } from "./ui";

export type Mode = "pre-order" | "bar";

export function Calculator({ initialMode }: { initialMode: Mode | null }) {
  const [mode, setMode] = useState<Mode | null>(initialMode);

  // Pre-order state
  const [cups, setCups] = useState(100);
  const [drinkIds, setDrinkIds] = useState<string[]>(drinks.filter((d) => d.popular).slice(0, 2).map((d) => d.id));
  const [toppings, setToppings] = useState(true);
  const [deliveryId, setDeliveryId] = useState(preOrderConfig.delivery[0].id);

  // Bar state
  const [guests, setGuests] = useState(60);
  const [hours, setHours] = useState(3);
  const [drinkOptions, setDrinkOptions] = useState(3);
  const [toppingOptions, setToppingOptions] = useState(2);
  const [extras, setExtras] = useState<string[]>([]);

  const estimate: Estimate | null = useMemo(() => {
    if (mode === "pre-order") return estimatePreOrder({ cups, drinkIds, toppings, deliveryId });
    if (mode === "bar") return estimateBar({ guests, hours, drinkOptions, toppingOptions, extras });
    return null;
  }, [mode, cups, drinkIds, toppings, deliveryId, guests, hours, drinkOptions, toppingOptions, extras]);

  const summary = useMemo(() => {
    if (mode === "pre-order") {
      const names = drinks.filter((d) => drinkIds.includes(d.id)).map((d) => d.name);
      const delivery = preOrderConfig.delivery.find((d) => d.id === deliveryId)?.label;
      return `Pre-Order: ${cups} cups · ${names.join(", ") || "Popular mix"} · ${toppings ? "with" : "no"} toppings · delivery ${delivery}`;
    }
    if (mode === "bar") {
      const ex = barConfig.extras.filter((e) => extras.includes(e.id)).map((e) => e.label);
      return `Bar Setup: ${guests} guests · ${hours} hrs · ${drinkOptions} drinks · ${toppingOptions} toppings${ex.length ? ` · ${ex.join(", ")}` : ""}`;
    }
    return "";
  }, [mode, cups, drinkIds, toppings, deliveryId, guests, hours, drinkOptions, toppingOptions, extras]);

  const inquireHref = estimate
    ? `/inquire?${new URLSearchParams({ mode: mode!, low: String(estimate.low), high: String(estimate.high), summary }).toString()}`
    : "/inquire";

  const toggle = (list: string[], id: string) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  return (
    <Container className="mt-12">
      <fieldset>
        <legend className="font-display text-2xl font-semibold">1. Pick your style</legend>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <ModeCard active={mode === "pre-order"} onClick={() => setMode("pre-order")} emoji="🥤" title="Pre-Order Catering" body={`Drop-off, ${preOrderConfig.minCups}+ cups`} />
          <ModeCard active={mode === "bar"} onClick={() => setMode("bar")} emoji="🍸" title="Bar Setup Experience" body="Live drink bar at your event" />
        </div>
      </fieldset>

      {mode && estimate && (
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            <h2 className="font-display text-2xl font-semibold">2. Tell us about it</h2>

            {mode === "pre-order" ? (
              <>
                <Question label="How many cups?" hint={`Minimum ${preOrderConfig.minCups}`}>
                  <NumberSlider value={cups} onChange={setCups} min={preOrderConfig.minCups} max={preOrderConfig.maxCupsOnline} step={10} suffix="cups" />
                </Question>

                <Question label="Which flavours?" hint="Pick as many as you like. We'll split cups across them.">
                  <div className="flex flex-wrap gap-2">
                    {drinks.map((d) => (
                      <Chip key={d.id} active={drinkIds.includes(d.id)} onClick={() => setDrinkIds(toggle(drinkIds, d.id))}>
                        {d.name}
                      </Chip>
                    ))}
                  </div>
                </Question>

                <Question label="Add toppings?" hint={`Tapioca pearls and more, +${money(preOrderConfig.toppingPerCup)}/cup`}>
                  <div className="flex gap-2">
                    <Chip active={toppings} onClick={() => setToppings(true)}>
                      Yes please
                    </Chip>
                    <Chip active={!toppings} onClick={() => setToppings(false)}>
                      No toppings
                    </Chip>
                  </div>
                </Question>

                <Question label="How far is your event?" hint="From Finch & Victoria Park, North York">
                  <div className="flex flex-wrap gap-2">
                    {preOrderConfig.delivery.map((d) => (
                      <Chip key={d.id} active={deliveryId === d.id} onClick={() => setDeliveryId(d.id)}>
                        {d.label}
                      </Chip>
                    ))}
                  </div>
                </Question>
              </>
            ) : (
              <>
                <Question label="How many guests?">
                  <NumberSlider value={guests} onChange={setGuests} min={barConfig.limits.minGuests} max={barConfig.limits.maxGuestsOnline} step={5} suffix="guests" />
                </Question>
                <Question label="How long should the bar be open?">
                  <Stepper value={hours} onChange={setHours} min={barConfig.limits.minHours} max={barConfig.limits.maxHours} suffix="hours" />
                </Question>
                <Question label="How many drinks on your menu?" hint="Browse the menu for ideas">
                  <Stepper value={drinkOptions} onChange={setDrinkOptions} min={barConfig.limits.minDrinks} max={barConfig.limits.maxDrinks} suffix="drinks" />
                </Question>
                <Question label="How many toppings?">
                  <Stepper value={toppingOptions} onChange={setToppingOptions} min={barConfig.limits.minToppings} max={barConfig.limits.maxToppings} suffix="toppings" />
                </Question>
                <Question label="Any extras?">
                  <div className="flex flex-wrap gap-2">
                    {barConfig.extras.map((e) => (
                      <Chip key={e.id} active={extras.includes(e.id)} onClick={() => setExtras(toggle(extras, e.id))}>
                        {e.label}
                      </Chip>
                    ))}
                  </div>
                </Question>
              </>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-blob bg-ink p-7 text-foam shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea-soft">Your estimate</p>
              {estimate.needsConversation ? (
                <p className="mt-3 font-display text-3xl font-semibold">Let&apos;s talk</p>
              ) : (
                <p className="mt-3 font-display text-4xl font-semibold" aria-live="polite">
                  {money(estimate.low)} – {money(estimate.high)}
                </p>
              )}
              <p className="mt-1 text-xs text-foam/60">CAD, before tax. An estimate, not a binding quote.</p>

              <ul className="mt-6 space-y-2 border-t border-foam/15 pt-5 text-sm">
                {estimate.lineItems.map((li) => (
                  <li key={li.label} className="flex justify-between gap-4">
                    <span>
                      {li.label}
                      {li.note && <span className="block text-xs text-foam/55">{li.note}</span>}
                    </span>
                    <span className="shrink-0 tabular-nums">{li.amount < 0 ? `−${money(-li.amount)}` : money(li.amount)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-foam/15 pt-5">
                <p className="text-sm font-semibold">Included</p>
                <ul className="mt-2 space-y-1 text-sm text-foam/75">
                  {estimate.inclusions.map((i) => (
                    <li key={i}>✓ {i}</li>
                  ))}
                </ul>
              </div>

              {estimate.notes.length > 0 && (
                <ul className="mt-5 space-y-2 rounded-2xl bg-white/5 p-4 text-xs text-foam/70">
                  {estimate.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              )}

              <Link href={inquireHref} className="mt-7 block rounded-full bg-coral px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-coral-dark">
                Send this estimate to us →
              </Link>
            </div>
          </aside>
        </div>
      )}
    </Container>
  );
}

function ModeCard({ active, onClick, emoji, title, body }: { active: boolean; onClick: () => void; emoji: string; title: string; body: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-4 rounded-3xl border-2 p-6 text-left transition ${
        active ? "border-coral bg-white shadow-md" : "border-line bg-white/60 hover:border-sea/40"
      }`}
    >
      <span className="text-3xl" aria-hidden>
        {emoji}
      </span>
      <span>
        <span className="block font-display text-xl font-semibold">{title}</span>
        <span className="text-sm text-ink/65">{body}</span>
      </span>
    </button>
  );
}

function Question({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-semibold">{label}</p>
      {hint && <p className="text-sm text-ink/60">{hint}</p>}
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        active ? "border-sea bg-sea text-foam" : "border-line bg-white hover:border-sea/50"
      }`}
    >
      {children}
    </button>
  );
}

function NumberSlider({ value, onChange, min, max, step, suffix }: { value: number; onChange: (n: number) => void; min: number; max: number; step: number; suffix: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" aria-label={suffix} />
      <label className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm">
        <input
          type="number"
          min={min}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          onBlur={() => onChange(Math.max(min, value))}
          className="w-16 bg-transparent text-right font-semibold tabular-nums outline-none"
        />
        {suffix}
      </label>
    </div>
  );
}

function Stepper({ value, onChange, min, max, suffix }: { value: number; onChange: (n: number) => void; min: number; max: number; suffix: string }) {
  const btn = "h-10 w-10 rounded-full border border-line bg-white text-lg font-semibold transition hover:border-sea disabled:opacity-30";
  return (
    <div className="flex items-center gap-4">
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Fewer ${suffix}`}>
        −
      </button>
      <span className="min-w-24 text-center font-semibold tabular-nums">
        {value} {suffix}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`More ${suffix}`}>
        +
      </button>
    </div>
  );
}
