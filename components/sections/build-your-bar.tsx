"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { customizations, drinkCategories, toppings, type ToppingKind } from "@/content/drinks";
import { Cup, useCupLayers } from "@/components/doodles/cup";
import { DoodleDecoration } from "@/components/doodles/doodle";
import { DrinkCard } from "@/components/ui/cards";
import { CTAButton } from "@/components/ui/cta-button";
import { Container, Section } from "@/components/ui/layout";
import { SectionHeader } from "@/components/ui/section-header";

const steps = [
  { n: "01", title: "Pick Your Drinks", body: "Start with a base. Mix categories, or let us build a lineup for your crowd." },
  { n: "02", title: "Pick Your Toppings", body: "The chewy, creamy, fruity part. Choose a few for guests to mix and match." },
  { n: "03", title: "Make It Yours", body: "The details people remember. Names, stickers, colours and menus that match your event." },
];

export function BuildYourBar({ tabIndex = "03" }: { tabIndex?: string }) {
  const [active, setActive] = useState(0);
  const [drinkId, setDrinkId] = useState(drinkCategories[0].id);
  const [picked, setPicked] = useState<ToppingKind[]>(["boba"]);
  const [extras, setExtras] = useState<string[]>(["stickers"]);
  const [label, setLabel] = useState("");

  const drink = drinkCategories.find((d) => d.id === drinkId) ?? drinkCategories[0];
  const layers = useCupLayers({
    tea: 1,
    ice: 1,
    milk: drink.milk ? 1 : 0,
    toppings: active >= 1 && picked.length ? 1 : 0,
    sticker: active >= 2 ? 1 : 0,
  });

  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const stickerText = label.trim() || "MolaMola";

  return (
    <Section id="build" className="overflow-x-clip">
      <Container>
        <SectionHeader
          tab={{ index: tabIndex, label: "Build your bar" }}
          title="Build Your Drink Bar"
          highlight="Drink Bar"
          intro="Three steps from empty cup to your own MolaMola bar. Tap around: the cup follows along."
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* sticky cup panel (top on mobile, right on desktop) */}
          <div className="sticky top-[5.25rem] z-20 lg:order-2 lg:top-28 lg:self-start">
            <div className="dot-grid relative flex items-center gap-4 rounded-[var(--radius-card)] border-[1.5px] border-ink bg-paper p-3 shadow-[var(--shadow-soft)] lg:flex-col lg:gap-6 lg:rounded-[var(--radius-sheet)] lg:p-10">
              <ol aria-label="Progress" className="order-2 flex flex-col gap-1 lg:order-1 lg:w-full lg:flex-row lg:justify-between lg:gap-2">
                {steps.map((s, i) => (
                  <li key={s.n} className={`flex items-center gap-2 text-[13px] font-semibold transition-opacity ${i <= active ? "opacity-100" : "opacity-35"}`}>
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full border-[1.5px] border-ink text-[11px] ${i <= active ? "bg-butter" : "bg-paper"}`}>{i + 1}</span>
                    <span className="hidden sm:inline">{["Drinks", "Toppings", "Details"][i]}</span>
                  </li>
                ))}
              </ol>
              <div className="relative order-1 w-24 shrink-0 sm:w-28 lg:order-2 lg:w-60">
                <Cup layers={layers} liquid={drink.liquid} toppingKinds={picked} label={stickerText} title={`Your ${drink.name} with ${picked.join(", ") || "no toppings"}`} />
                <DoodleDecoration kind="sparkle" className="absolute -top-2 -left-6 hidden h-7 w-7 lg:block" motion="twinkle" />
                <DoodleDecoration kind="heart" className="absolute top-1/3 -right-8 hidden h-7 w-7 lg:block" motion="bob" />
              </div>
              <p aria-live="polite" className="order-3 min-w-0 flex-1 font-hand text-[1.3rem] leading-tight lg:text-center lg:text-[1.55rem]">
                {drink.name}
                {picked.length > 0 && <> + {picked.map((p) => toppings.find((t) => t.id === p)?.name.toLowerCase()).join(", ")}</>}
                {active >= 2 && extras.length > 0 && <span className="block text-cocoa">with {extras.length} custom touch{extras.length > 1 ? "es" : ""} ✶</span>}
              </p>
            </div>
          </div>

          {/* steps */}
          <div className="lg:order-1">
            <Step index={0} onActive={setActive} {...steps[0]}>
              <div className="grid gap-3 sm:grid-cols-2">
                {drinkCategories.map((d) => (
                  <DrinkCard key={d.id} name={d.name} example={d.example} liquid={d.liquid} tone={d.tone} selected={d.id === drinkId} onSelect={() => setDrinkId(d.id)} />
                ))}
              </div>
            </Step>

            <Step index={1} onActive={setActive} {...steps[1]}>
              <div className="flex flex-wrap gap-2.5">
                {toppings.map((t) => (
                  <Chip key={t.id} active={picked.includes(t.id)} onClick={() => setPicked(toggle(picked, t.id))} sub={t.note}>
                    {t.name}
                  </Chip>
                ))}
              </div>
            </Step>

            <Step index={2} onActive={setActive} {...steps[2]}>
              <div className="flex flex-wrap gap-2.5">
                {customizations.map((c) => (
                  <Chip key={c.id} active={extras.includes(c.id)} onClick={() => setExtras(toggle(extras, c.id))}>
                    {c.name}
                  </Chip>
                ))}
              </div>
              <label className="mt-7 block max-w-sm">
                <span className="font-hand text-2xl">write on the sticker →</span>
                <input
                  value={label}
                  onChange={(e) => setLabel(e.target.value.slice(0, 18))}
                  placeholder="e.g. Blesy & Ian"
                  className="mt-2 w-full rounded-2xl border-[1.5px] border-ink bg-paper px-4 py-3 text-[16px] outline-none focus:bg-butter-soft"
                />
              </label>
              <div className="mt-10 flex flex-wrap gap-3">
                <CTAButton href="/custom-drinks" arrow>
                  Create a Custom Drink
                </CTAButton>
                <CTAButton href="/contact" variant="secondary">
                  Plan Your Event
                </CTAButton>
              </div>
            </Step>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Step({ index, n, title, body, onActive, children }: { index: number; n: string; title: string; body: string; onActive: (i: number) => void; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="border-t-[1.5px] border-dashed border-ink/25 py-12 first:border-t-0 first:pt-0 lg:flex lg:min-h-[75vh] lg:flex-col lg:justify-center lg:py-16">
      <p className="font-hand text-2xl text-tangerine-deep">Step {n}</p>
      <h3 className="mt-1 font-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{title}</h3>
      <p className="mt-3 max-w-md text-[16px] leading-relaxed text-cocoa">{body}</p>
      <div className="mt-7">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children, sub }: { active: boolean; onClick: () => void; children: ReactNode; sub?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-11 rounded-2xl border-[1.5px] px-4 py-2.5 text-left text-[15px] font-semibold transition duration-200 ${
        active ? "-rotate-1 border-ink bg-blush shadow-[var(--shadow-sticker)]" : "border-ink/20 bg-paper hover:border-ink/60"
      }`}
    >
      {active && <span aria-hidden>✓ </span>}
      {children}
      {sub && <span className="block text-[12px] font-normal text-cocoa">{sub}</span>}
    </button>
  );
}
