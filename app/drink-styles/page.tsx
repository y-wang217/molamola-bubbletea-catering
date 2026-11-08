import type { Metadata } from "next";
import { drinkCategories, recipes, toppings, type DrinkRecipe } from "@/content/drinks";
import { CUP_VIEWBOX, DrinkArt, MiniDrink } from "@/components/doodles/drink-art";
import { DrinkIcon, ToppingIcon } from "@/components/doodles/ingredients";
import { Container, Section } from "@/components/ui/layout";
import { SectionHeader } from "@/components/ui/section-header";

// Internal reference page for the drink illustration system. Not linked in the nav.
export const metadata: Metadata = { title: "Drink Illustration System", robots: { index: false, follow: false } };

const featured: { name: string; notes: string[]; recipe: DrinkRecipe }[] = [
  { name: "Brown Sugar Earl Grey Boba Milk Tea", notes: ["brown sugar streaks on the wall", "boba at the bottom", "ice"], recipe: recipes.brownSugarEarlGrey },
  { name: "Strawberry Matcha Latte", notes: ["matcha on top", "white milk in the middle", "strawberry jam at the bottom"], recipe: recipes.strawberryMatcha },
  { name: "Honey Orange Four Season Oolong", notes: ["clear golden tea", "orange slices", "ice"], recipe: recipes.honeyOrangeOolong },
  { name: "Creamy Float Topping", notes: ["smooth cream cap", "soft cloud-like drip", "sits over the rim"], recipe: recipes.creamyFloatMilkTea },
  { name: "Crème Brûlée Earl Grey", notes: ["custard top", "caramelised, torched surface", "no drips"], recipe: recipes.cremeBruleeEarlGrey },
];

function BigDrink({ recipe, title }: { recipe: DrinkRecipe; title: string }) {
  return (
    <svg viewBox={CUP_VIEWBOX} role="img" className="h-auto w-full" overflow="visible">
      <title>{title}</title>
      <DrinkArt recipe={recipe} />
    </svg>
  );
}

export default function DrinkStylesPage() {
  return (
    <Section className="pt-12 sm:pt-16">
      <Container>
        <SectionHeader
          as="h1"
          tab={{ label: "Internal reference" }}
          title="Drink Illustration System"
          highlight="Illustration"
          intro="Every cup on the site is drawn from these recipes, so drinks, toppings and stickers look the same everywhere."
        />

        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-5">
          {featured.map((d) => (
            <li key={d.name} className="text-center">
              <div className="mx-auto w-full max-w-[13rem] px-3">
                <BigDrink recipe={d.recipe} title={d.name} />
              </div>
              <p className="mx-auto mt-4 inline-block rounded-2xl bg-butter-soft px-3 py-1.5 font-hand text-[1.35rem] leading-tight">{d.name}</p>
              <ul className="mt-2 space-y-0.5 text-[13px] text-cocoa">
                {d.notes.map((n) => (
                  <li key={n}>· {n}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h2 className="font-display text-2xl font-extrabold">Toppings</h2>
            <ul className="mt-6 flex flex-wrap gap-6">
              {toppings.map((t) => (
                <li key={t.id} className="w-24 text-center">
                  <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-paper">
                    <ToppingIcon kind={t.id} className="h-14 w-14" />
                  </span>
                  <span className="mt-2 block text-[14px] font-semibold">{t.name}</span>
                  <span className="block text-[12px] text-cocoa">{t.note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-extrabold">Small sizes</h2>
            <p className="mt-1 text-[14px] text-cocoa">Builder buttons and catering scenes use the same art with thicker lines.</p>
            <ul className="mt-6 flex flex-wrap gap-5">
              {drinkCategories.map((d) => (
                <li key={d.id} className="text-center">
                  <DrinkIcon drink={d} className="mx-auto h-16 w-12" />
                  <span className="mt-1 block text-[12px] font-semibold">{d.name}</span>
                </li>
              ))}
              <li className="text-center">
                <MiniDrink recipe={recipes.creamyFloatMilkTea} className="mx-auto h-16 w-12" />
                <span className="mt-1 block text-[12px] font-semibold">Float</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
