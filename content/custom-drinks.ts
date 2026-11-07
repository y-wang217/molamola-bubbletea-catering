import type { IllustrationKind } from "@/components/doodles/illustrations";
import type { Tone } from "@/lib/tones";

export type CustomDrinkIdea = {
  id: string;
  title: string;
  description: string;
  example: string;
  illustration: IllustrationKind;
  tone: Tone;
};

export const customDrinkIdeas: CustomDrinkIdea[] = [
  {
    id: "wedding",
    title: "Signature Wedding Drinks",
    description: "One drink for each of you, named and flavoured your way.",
    example: "“The Blesy” — lychee rose milk tea",
    illustration: "rings",
    tone: "pink",
  },
  {
    id: "corporate",
    title: "Corporate Branded Drinks",
    description: "Colours, names and cups that match your brand.",
    example: "“Q4 Kickoff Cooler” — citrus green tea",
    illustration: "briefcase",
    tone: "blue",
  },
  {
    id: "seasonal",
    title: "Seasonal Drinks",
    description: "Built around what's fresh and what the season feels like.",
    example: "“First Frost” — chestnut milk tea",
    illustration: "leaf",
    tone: "sage",
  },
  {
    id: "colours",
    title: "Custom Colours",
    description: "Layered drinks matched to your palette, from blush to butter.",
    example: "Butterfly pea ombré in your theme colour",
    illustration: "palette",
    tone: "butter",
  },
  {
    id: "stickers",
    title: "Custom Stickers",
    description: "Names, dates, logos or doodles on every single cup.",
    example: "“Mia turns 30!” with a hand-drawn crown",
    illustration: "sticker",
    tone: "cream",
  },
  {
    id: "menus",
    title: "Custom Menus",
    description: "A printed or chalk-style menu that fits right into your setup.",
    example: "A-frame menu with your monogram",
    illustration: "menu",
    tone: "pink",
  },
];
