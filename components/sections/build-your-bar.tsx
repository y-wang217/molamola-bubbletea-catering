"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  colourSwatches,
  customizations,
  drinkCategories,
  flavours,
  toppings,
  type CustomizationId,
  type DrinkRecipe,
  type FlavourId,
  type Inclusion,
  type ToppingKind,
} from "@/content/drinks";
import { Cup, useCupLayers } from "@/components/doodles/cup";
import { CustomIcon, DrinkIcon, FlavourIcon, ToppingIcon } from "@/components/doodles/ingredients";
import { DoodleDecoration } from "@/components/doodles/doodle";
import { Mascot } from "@/components/doodles/mascot";
import { C } from "@/components/doodles/palette";
import { CTAButton } from "@/components/ui/cta-button";
import { WatercolorBlob } from "@/components/ui/decor";
import { Container, Section } from "@/components/ui/layout";
import { SectionHeader } from "@/components/ui/section-header";
import { toneHex } from "@/lib/tones";
import { mixHex } from "@/lib/color";

const steps = [
  { n: "01", short: "Drinks", title: "Pick Your Drinks", body: "Start with a base, then pick a flavour. Mix a few, or let us build a lineup for your crowd." },
  { n: "02", short: "Toppings", title: "Pick Your Toppings", body: "The chewy, creamy, fruity part. Choose a few for guests to mix and match." },
  { n: "03", short: "Details", title: "Make It Yours", body: "The details people remember. Watch the cup change as you pick." },
];

/** Full interactive drink bar builder (Custom Drinks page). */
export function BuildYourBar({ tabIndex = "02" }: { tabIndex?: string }) {
  const [active, setActive] = useState(0);
  const [drinkId, setDrinkId] = useState(drinkCategories[0].id);
  const [picked, setPicked] = useState<ToppingKind[]>(["boba"]);
  const [extras, setExtras] = useState<CustomizationId[]>(["sticker"]);
  const [stickerText, setStickerText] = useState("");
  const [drinkName, setDrinkName] = useState("");
  const [swatch, setSwatch] = useState(colourSwatches[0].hex);
  const [flavourId, setFlavourId] = useState<FlavourId>("original");
  // The little fish beside the cup hops and smiles whenever something is picked.
  const [cheer, setCheer] = useState(0);
  const [happy, setHappy] = useState(false);
  const happyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const react = () => {
    setCheer((c) => c + 1);
    setHappy(true);
    clearTimeout(happyTimer.current);
    happyTimer.current = setTimeout(() => setHappy(false), 1000);
  };

  const drink = drinkCategories.find((d) => d.id === drinkId) ?? drinkCategories[0];
  const flavour = flavours.find((f) => f.id === flavourId) ?? flavours[0];
  // The flavour tints the top layer of the drink; "Fruit" adds fruit that matches the flavour.
  const recipe: DrinkRecipe = flavour.tint
    ? {
        ...drink.recipe,
        layers: drink.recipe.layers.map((l, i, all) => (i === all.length - 1 ? { ...l, color: mixHex(l.color, flavour.tint!, 0.5) } : l)),
      }
    : drink.recipe;
  const fruitByFlavour: Partial<Record<FlavourId, Inclusion>> = { strawberry: "strawberry", mango: "mango", orange: "orange", grape: "grape" };
  const base = drink.recipe.inclusions ?? [];
  const toppingExtras = picked
    .map((t): Inclusion | null => (t === "fruit" ? (fruitByFlavour[flavourId] ?? drink.fruit) : t === "float" || t === "brulee" ? null : t))
    .filter((t): t is Inclusion => !!t && !base.includes(t));
  const topCap = picked.includes("brulee") ? "brulee" : picked.includes("float") ? "float" : "none";
  const drinkLabel = flavour.tint ? `${flavour.name} ${drink.name}` : drink.name;
  const has = (id: CustomizationId) => extras.includes(id);
  // The cup gets its sticker in step 3: the real MolaMola logo by default, or a custom/branded one.
  const showSticker = active >= 2;
  const layers = useCupLayers({
    tea: 1,
    ice: 1,
    milk: 1,
    toppings: active >= 1 && (toppingExtras.length > 0 || topCap !== "none") ? 1 : 0,
    sticker: showSticker ? 1 : 0,
  });

  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  // Creamy Float and Crème Brûlée both sit on top, so picking one swaps out the other.
  const toggleTopping = (list: ToppingKind[], v: ToppingKind) => {
    const next = toggle(list, v);
    if (!list.includes(v) && (v === "float" || v === "brulee")) return next.filter((x) => x !== (v === "float" ? "brulee" : "float"));
    return next;
  };
  const label = stickerText.trim() || "mola mola";
  const name = drinkName.trim() || "The Blesy";
  const colourOn = active >= 2 && has("colours");

  return (
    <Section id="build" className="overflow-x-clip">
      <Container>
        <SectionHeader
          tab={{ index: tabIndex, label: "Build your bar" }}
          title="Build Your Drink Bar"
          rays
          highlight="Drink Bar"
          intro="Three steps from empty cup to your own MolaMola bar. Tap around: the cup follows along."
        />

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          {/* stage: sticky on top (mobile) / right (desktop) */}
          <div className="sticky top-[5.25rem] z-20 lg:order-2 lg:top-28 lg:self-start">
            <div className="relative flex items-center gap-4 rounded-[var(--radius-card)] border-[1.5px] border-linework/15 bg-paper/95 p-3 backdrop-blur lg:flex-col lg:gap-6 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
              <ol aria-label="Progress" className="order-2 flex flex-col gap-1 lg:order-1 lg:flex-row lg:gap-6">
                {steps.map((s, i) => (
                  <li key={s.n} className={`flex items-center gap-2 text-[13px] font-semibold transition-opacity ${i <= active ? "opacity-100" : "opacity-35"}`}>
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full border-[1.5px] border-linework text-[11px] ${i <= active ? "bg-butter" : "bg-paper"}`}>{i + 1}</span>
                    <span className="hidden sm:inline">{s.short}</span>
                  </li>
                ))}
              </ol>

              <div className="relative order-1 w-24 shrink-0 sm:w-28 lg:order-2 lg:w-64">
                <WatercolorBlob color={toneHex[drink.tone]} spots={C.butter} className="absolute inset-[-30%] hidden h-[160%] w-[160%] opacity-70 lg:block" seed={9} />
                <div className="relative">
                  <Cup
                    layers={layers}
                    recipe={recipe}
                    extras={toppingExtras}
                    top={topCap}
                    label={label}
                    strawColor={colourOn ? swatch : C.pink}
                    accent={colourOn ? swatch : C.pinkDeep}
                    stickerMode={has("branding") ? "logo" : has("sticker") && stickerText.trim() ? "custom" : "brand"}
                    title={`Your ${drinkLabel} with ${picked.join(", ") || "no toppings"}`}
                  />
                </div>

                <motion.div
                  key={cheer}
                  aria-hidden
                  initial={false}
                  animate={cheer ? { y: [0, -16, 0], rotate: [0, -6, 0] } : undefined}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute -right-[34%] -bottom-[2%] hidden w-24 lg:block"
                >
                  <Mascot className="h-auto w-full" expression={happy ? "happy" : "default"} bubbles={false} title="" />
                </motion.div>

                {/* desktop-only extras that appear around the cup */}
                <AnimatePresence>
                  {active >= 2 && has("names") && (
                    <motion.div
                      key="tag"
                      initial={{ opacity: 0, rotate: -30, y: -10 }}
                      animate={{ opacity: 1, rotate: -8, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-[2%] -right-[30%] hidden origin-top-left rounded-lg border-[1.5px] border-linework bg-butter px-3 py-1.5 font-hand text-xl whitespace-nowrap shadow-[var(--shadow-sticker)] lg:block"
                    >
                      {name}
                    </motion.div>
                  )}
                  {active >= 2 && has("menu") && (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, x: -20, rotate: 0 }}
                      animate={{ opacity: 1, x: 0, rotate: -5 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-[2%] -left-[46%] hidden w-32 rounded-xl border-[1.5px] border-linework bg-paper p-3 shadow-[var(--shadow-soft)] lg:block"
                    >
                      <p className="text-center font-hand text-lg leading-none text-tangerine-deep">menu</p>
                      <p className="mt-2 text-[11px] leading-tight font-bold">{has("names") ? name : drinkLabel}</p>
                      <p className="text-[10px] leading-tight text-cocoa">{picked.map((p) => toppings.find((t) => t.id === p)?.name).join(" · ") || "no toppings"}</p>
                      <div className="mt-2 space-y-1">
                        <span className="block h-[2px] w-full rounded bg-linework/15" />
                        <span className="block h-[2px] w-2/3 rounded bg-linework/15" />
                      </div>
                    </motion.div>
                  )}
                  {active >= 2 && has("theme") && (
                    <motion.div key="theme" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none absolute inset-0 hidden lg:block">
                      <DoodleDecoration kind="star" className="absolute -top-6 -left-8 h-9 w-9" motion="twinkle" />
                      <DoodleDecoration kind="heart" className="absolute top-1/3 -right-12 h-8 w-8" motion="bob" />
                      <DoodleDecoration kind="flower" className="absolute top-[18%] -left-12 h-8 w-8" motion="float" />
                      <DoodleDecoration kind="sparkle" className="absolute top-1/2 -left-10 h-7 w-7" motion="twinkle" delay={1} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p aria-live="polite" className="order-3 min-w-0 flex-1 font-hand text-[1.3rem] leading-tight lg:text-center lg:text-[1.6rem]">
                {active >= 2 && has("names") ? `"${name}"` : drinkLabel}
                {picked.length > 0 && active >= 1 && <> + {picked.map((p) => toppings.find((t) => t.id === p)?.name.toLowerCase()).join(", ")}</>}
              </p>
            </div>
          </div>

          {/* steps */}
          <div className="lg:order-1">
            <Step index={0} onActive={setActive} {...steps[0]}>
              <TokenRow label="Drinks" radio>
                {drinkCategories.map((d) => (
                  <Token key={d.id} label={d.name} sub={d.example} selected={d.id === drinkId} tone={toneHex[d.tone]} onClick={() => (setDrinkId(d.id), react())} radio>
                    <DrinkIcon drink={d} className="h-14 w-11" />
                  </Token>
                ))}
              </TokenRow>
              <p className="mt-8 font-hand text-2xl">choose a flavour →</p>
              <div role="radiogroup" aria-label="Flavour" className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
                {flavours.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    role="radio"
                    aria-checked={flavourId === f.id}
                    onClick={() => (setFlavourId(f.id), react())}
                    className={`flex min-h-12 shrink-0 items-center gap-2 rounded-2xl border-[1.5px] py-1.5 pr-4 pl-2 text-[14px] font-semibold transition ${
                      flavourId === f.id ? "-rotate-1 border-linework bg-blush shadow-[var(--shadow-sticker)]" : "border-linework/20 bg-paper hover:border-linework/60"
                    }`}
                  >
                    <FlavourIcon id={f.id} className="h-8 w-8" />
                    {flavourId === f.id && <span aria-hidden>✓</span>}
                    {f.name}
                  </button>
                ))}
              </div>
            </Step>

            <Step index={1} onActive={setActive} {...steps[1]}>
              <TokenRow label="Toppings">
                {toppings.map((t) => (
                  <Token key={t.id} label={t.name} sub={t.note} selected={picked.includes(t.id)} tone={C.pink} onClick={() => (setPicked(toggleTopping(picked, t.id)), react())}>
                    <ToppingIcon kind={t.id} className="h-12 w-12" />
                  </Token>
                ))}
              </TokenRow>
            </Step>

            <Step index={2} onActive={setActive} {...steps[2]}>
              <TokenRow label="Custom details">
                {customizations.map((c) => (
                  <Token key={c.id} label={c.name} sub={c.note} selected={has(c.id)} tone={C.butter} onClick={() => (setExtras(toggle(extras, c.id)), react())}>
                    <CustomIcon id={c.id} className="h-12 w-12" accent={colourOn ? swatch : C.pinkDeep} />
                  </Token>
                ))}
              </TokenRow>

              <div className="mt-8 grid max-w-lg gap-5">
                {has("sticker") && (
                  <Field label="write on the sticker →">
                    <input value={stickerText} onChange={(e) => setStickerText(e.target.value.slice(0, 16))} placeholder="e.g. Blesy & Ian" className={inputCls} />
                  </Field>
                )}
                {has("names") && (
                  <Field label="name your drink →">
                    <input value={drinkName} onChange={(e) => setDrinkName(e.target.value.slice(0, 20))} placeholder="e.g. The Blesy" className={inputCls} />
                  </Field>
                )}
                {has("colours") && (
                  <Field label="pick your colour →">
                    <div role="radiogroup" aria-label="Event colour" className="mt-2 flex gap-3">
                      {colourSwatches.map((c) => (
                        <button
                          key={c.hex}
                          type="button"
                          role="radio"
                          aria-checked={swatch === c.hex}
                          aria-label={c.name}
                          title={c.name}
                          onClick={() => setSwatch(c.hex)}
                          className={`h-10 w-10 rounded-full border-[1.5px] border-linework transition-transform ${swatch === c.hex ? "scale-110 shadow-[var(--shadow-sticker)]" : "hover:scale-105"}`}
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </Field>
                )}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <CTAButton href="/contact" arrow>
                  Create a Custom Drink
                </CTAButton>
              </div>
            </Step>
          </div>
        </div>
      </Container>
    </Section>
  );
}

const inputCls = "mt-2 w-full min-h-12 rounded-2xl border-[1.5px] border-linework/40 bg-paper px-4 py-3 text-[16px] outline-none focus:border-linework focus:bg-white";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="font-hand text-2xl">{label}</span>
      {children}
    </label>
  );
}

function Step({ index, n, title, body, onActive, children }: { index: number; n: string; title: string; body: string; onActive: (i: number) => void; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="py-12 first:pt-2 lg:flex lg:min-h-[72vh] lg:flex-col lg:justify-center lg:py-16">
      <p className="font-hand text-2xl text-tangerine-deep">Step {n}</p>
      <h3 className="mt-1 font-display text-3xl font-extrabold tracking-[-0.03em] sm:text-[2.6rem]">{title}</h3>
      <p className="mt-3 max-w-md text-[16px] leading-relaxed text-cocoa">{body}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

/** Horizontal swipe row on mobile, wrapping row on desktop. */
function TokenRow({ children, label, radio }: { children: ReactNode; label: string; radio?: boolean }) {
  return <div role={radio ? "radiogroup" : "group"} aria-label={label} className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pt-2 pb-3 sm:mx-0 sm:flex-wrap sm:gap-2.5 sm:overflow-visible sm:px-0">{children}</div>;
}

function Token({
  label,
  sub,
  selected,
  tone,
  onClick,
  radio,
  children,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  tone: string;
  onClick: () => void;
  radio?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      role={radio ? "radio" : undefined}
      aria-checked={radio ? selected : undefined}
      aria-pressed={radio ? undefined : selected}
      title={sub}
      className="group flex w-[5.4rem] shrink-0 flex-col items-center text-center"
    >
      <span
        className={`relative flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full border-[1.5px] transition duration-200 ${
          selected ? "-rotate-3 border-linework shadow-[var(--shadow-sticker)]" : "border-linework/15 bg-paper group-hover:-translate-y-0.5 group-hover:border-linework/50"
        }`}
        style={selected ? { backgroundColor: tone } : undefined}
      >
        <span className="transition-transform duration-300 group-hover:scale-110">{children}</span>
        {selected && (
          <span aria-hidden className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-[1.5px] border-linework bg-paper text-[12px] font-bold">
            ✓
          </span>
        )}
      </span>
      <span className="mt-2 text-[13px] leading-tight font-semibold">{label}</span>
    </button>
  );
}
