// Drink bar building blocks: recipes, categories, toppings and customization options.
// Every illustrated cup on the site is drawn from a DrinkRecipe, so drinks look the same everywhere.
import type { Tone } from "@/lib/tones";

/** One liquid layer, bottom → top. `to` = where the layer ends (0 = cup bottom, 1 = drink surface). */
export type DrinkLayer = { color: string; to: number; texture?: "jam" };

/** Things floating or sitting in the drink. */
export type Inclusion = "boba" | "aloe" | "pudding" | "strawberry" | "mango" | "orange" | "taro" | "grape";

/** What sits on top of the drink. "float" = Creamy Float Topping, "brulee" = Crème Brûlée top. */
export type TopCap = "none" | "float" | "brulee";

export type DrinkRecipe = {
  layers: DrinkLayer[];
  /** Brown sugar streaks on the inside wall. */
  streaks?: boolean;
  ice?: boolean;
  inclusions?: Inclusion[];
  top?: TopCap;
};

// Shared colours so drinks stay consistent.
export const drinkColors = {
  milkTea: "#ddb48d",
  earlGrey: "#d4a780",
  milk: "#fbf3e3",
  matcha: "#b3cf8f",
  jam: "#ea7a88",
  oolong: "#f7cd78",
  coffee: "#a8784f",
  latteMilk: "#f2e0c6",
  grape: "#c9a2dc",
  taroMilk: "#dcc6ea",
  mangoMilk: "#ffe08f",
  strawberryMilk: "#f7c2cb",
};

/** Reference drinks (used on the site and on the /drink-styles preview page). */
export const recipes = {
  brownSugarEarlGrey: { layers: [{ color: drinkColors.earlGrey, to: 1 }], streaks: true, ice: true, inclusions: ["boba"] },
  strawberryMatcha: {
    layers: [
      { color: drinkColors.jam, to: 0.26, texture: "jam" },
      { color: drinkColors.milk, to: 0.58 },
      { color: drinkColors.matcha, to: 1 },
    ],
    ice: true,
  },
  honeyOrangeOolong: { layers: [{ color: drinkColors.oolong, to: 1 }], ice: true, inclusions: ["orange"] },
  creamyFloatMilkTea: { layers: [{ color: drinkColors.milkTea, to: 1 }], ice: true, top: "float" },
  cremeBruleeEarlGrey: { layers: [{ color: drinkColors.earlGrey, to: 1 }], inclusions: ["boba"], top: "brulee" },
  dirtyLatte: {
    layers: [
      { color: drinkColors.latteMilk, to: 0.5 },
      { color: drinkColors.coffee, to: 1 },
    ],
    ice: true,
  },
  grapeSeasonal: { layers: [{ color: drinkColors.grape, to: 1 }], ice: true, inclusions: ["grape"] },
} satisfies Record<string, DrinkRecipe>;

export type DrinkCategory = {
  id: string;
  name: string;
  example: string;
  recipe: DrinkRecipe;
  /** What "Fruit" adds for this drink when no fruit flavour is picked. */
  fruit: Inclusion;
  tone: Tone;
};

export const drinkCategories: DrinkCategory[] = [
  { id: "milk-tea", name: "Milk Tea", example: "Brown sugar Earl Grey, taro", recipe: { ...recipes.brownSugarEarlGrey, inclusions: [] }, fruit: "strawberry", tone: "butter" },
  { id: "matcha", name: "Matcha", example: "Strawberry matcha latte", recipe: recipes.strawberryMatcha, fruit: "strawberry", tone: "sage" },
  { id: "fruit-tea", name: "Fruit Tea", example: "Honey orange four season oolong", recipe: recipes.honeyOrangeOolong, fruit: "orange", tone: "pink" },
  { id: "coffee", name: "Coffee", example: "Dirty latte, Vietnamese iced", recipe: recipes.dirtyLatte, fruit: "strawberry", tone: "cream" },
  { id: "seasonal", name: "Seasonal", example: "Rotating specials", recipe: recipes.grapeSeasonal, fruit: "grape", tone: "blue" },
];

export type ToppingKind = "boba" | "aloe" | "pudding" | "float" | "brulee" | "fruit";

export const toppings: { id: ToppingKind; name: string; note: string }[] = [
  { id: "boba", name: "Boba", note: "Chewy brown sugar pearls" },
  { id: "aloe", name: "Aloe", note: "Light and refreshing" },
  { id: "pudding", name: "Milk Pudding", note: "Silky, not too sweet" },
  { id: "float", name: "Creamy Float", note: "Smooth cream cap" },
  { id: "brulee", name: "Crème Brûlée", note: "Torched custard top" },
  { id: "fruit", name: "Fruit", note: "Fresh, seasonal" },
];

export type CustomizationId = "sticker" | "colours" | "branding" | "names" | "menu" | "theme";

export const customizations: { id: CustomizationId; name: string; note: string }[] = [
  { id: "sticker", name: "Custom cup sticker", note: "Names, dates, doodles" },
  { id: "colours", name: "Wedding colours", note: "Match your palette" },
  { id: "branding", name: "Corporate branding", note: "Your logo on every cup" },
  { id: "names", name: "Custom drink names", note: "“The Blesy”, anyone?" },
  { id: "menu", name: "Custom menu", note: "A sign for your bar" },
  { id: "theme", name: "Event theme", note: "Props and little details" },
];

/** Palette choices for "Wedding colours" (straw + sticker ring). */
export const colourSwatches: { name: string; hex: string }[] = [
  { name: "Blush", hex: "#f6a9c0" },
  { name: "Powder blue", hex: "#9ccaf2" },
  { name: "Butter", hex: "#ffd26b" },
  { name: "Sage", hex: "#a9cb8c" },
  { name: "Peach", hex: "#ffb366" },
];

export type FlavourId = "original" | "strawberry" | "mango" | "orange" | "lychee" | "grape" | "lime";

/** "Choose a flavour" options. `tint` is blended into the drink colour in the builder preview. */
export const flavours: { id: FlavourId; name: string; tint?: string }[] = [
  { id: "original", name: "Original" },
  { id: "strawberry", name: "Strawberry", tint: "#f7a3b5" },
  { id: "mango", name: "Mango", tint: "#ffc24d" },
  { id: "orange", name: "Orange", tint: "#ffa65c" },
  { id: "lychee", name: "Lychee", tint: "#f9dde6" },
  { id: "grape", name: "Grape", tint: "#b99ad8" },
  { id: "lime", name: "Lime", tint: "#bfe08a" },
];
