// Drink bar building blocks: categories, toppings and customization options.
// `liquid`, `milk` and `garnish` drive the illustrated cups.
import type { Tone } from "@/lib/tones";

export type Garnish = "boba" | "layer" | "citrus" | "foam" | "sparkle";

export type DrinkCategory = {
  id: string;
  name: string;
  example: string;
  liquid: string;
  milk: boolean;
  garnish: Garnish;
  tone: Tone;
};

export const drinkCategories: DrinkCategory[] = [
  { id: "milk-tea", name: "Milk Tea", example: "Brown sugar, taro, jasmine", liquid: "#d9a77c", milk: true, garnish: "boba", tone: "butter" },
  { id: "matcha", name: "Matcha", example: "Strawberry matcha, latte", liquid: "#a9c48a", milk: true, garnish: "layer", tone: "sage" },
  { id: "fruit-tea", name: "Fruit Tea", example: "Mango, lychee, passionfruit", liquid: "#f6b98a", milk: false, garnish: "citrus", tone: "pink" },
  { id: "coffee", name: "Coffee", example: "Vietnamese iced, dirty chai", liquid: "#a77a5c", milk: true, garnish: "foam", tone: "cream" },
  { id: "seasonal", name: "Seasonal", example: "Rotating specials", liquid: "#e9a3b4", milk: false, garnish: "sparkle", tone: "blue" },
];

export type ToppingKind = "boba" | "aloe" | "pudding" | "float" | "fruit";

export const toppings: { id: ToppingKind; name: string; note: string }[] = [
  { id: "boba", name: "Boba", note: "Chewy brown sugar pearls" },
  { id: "aloe", name: "Aloe", note: "Light and refreshing" },
  { id: "pudding", name: "Milk Pudding", note: "Silky, not too sweet" },
  { id: "float", name: "Creamy Float", note: "A cloud on top" },
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
export const colourSwatches = ["#ee9fb0", "#94bddc", "#f5cf62", "#a5c08a", "#f39a5d"];
