// Drink bar building blocks: categories, toppings and customization options.
// `liquid` / `milk` drive the illustrated cup colours in "Build Your Drink Bar".
import type { Tone } from "@/lib/tones";

export type DrinkCategory = {
  id: string;
  name: string;
  example: string;
  liquid: string;
  milk: boolean;
  tone: Tone;
};

export const drinkCategories: DrinkCategory[] = [
  { id: "milk-tea", name: "Milk Tea", example: "Brown sugar, taro, jasmine", liquid: "#d9a77c", milk: true, tone: "butter" },
  { id: "matcha", name: "Matcha", example: "Strawberry matcha, matcha latte", liquid: "#a9c48a", milk: true, tone: "sage" },
  { id: "fruit-tea", name: "Fruit Tea", example: "Mango, lychee, passionfruit", liquid: "#f6b98a", milk: false, tone: "pink" },
  { id: "coffee", name: "Coffee", example: "Vietnamese iced, dirty chai", liquid: "#a77a5c", milk: true, tone: "cream" },
  { id: "seasonal", name: "Seasonal Specials", example: "Rotating menu (placeholder)", liquid: "#e9a3b4", milk: false, tone: "blue" },
];

export type ToppingKind = "boba" | "aloe" | "pudding" | "float" | "fruit";

export const toppings: { id: ToppingKind; name: string; note: string }[] = [
  { id: "boba", name: "Boba", note: "Chewy brown sugar pearls" },
  { id: "aloe", name: "Aloe", note: "Light and refreshing" },
  { id: "pudding", name: "Milk Pudding", note: "Silky, not too sweet" },
  { id: "float", name: "Creamy Float", note: "A cloud on top" },
  { id: "fruit", name: "Fruit", note: "Fresh, seasonal" },
];

export const customizations: { id: string; name: string }[] = [
  { id: "names", name: "Custom drink names" },
  { id: "stickers", name: "Custom cup stickers" },
  { id: "colours", name: "Wedding colours" },
  { id: "theme", name: "Event theme" },
  { id: "menus", name: "Branded menus" },
  { id: "logo", name: "Corporate logo" },
  { id: "signature", name: "Signature drinks" },
];
