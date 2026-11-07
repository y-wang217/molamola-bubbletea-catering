// Mirrors the "Menu Items" database in the Mola Mola Operations Hub (Notion).
// `largeOrderPrice` feeds the pre-order calculator in lib/pricing.ts.

export type MenuCategory = "Milk Tea" | "Fruit Tea" | "Specialty" | "Traditional";

export type Drink = {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  largeOrderPrice: number;
  popular?: boolean;
  seasonal?: boolean;
  hotOnly?: boolean;
};

export const drinks: Drink[] = [
  {
    id: "classic-milk-tea",
    name: "Classic Milk Tea",
    category: "Milk Tea",
    description: "Our most-loved cup. Strong black tea base with whole milk.",
    largeOrderPrice: 7,
    popular: true,
  },
  {
    id: "taro-milk-tea",
    name: "Taro Milk Tea",
    category: "Milk Tea",
    description: "Made with real taro, never powder. Earthy, creamy, a little nutty.",
    largeOrderPrice: 8,
    popular: true,
  },
  {
    id: "honey-milk-tea",
    name: "Honey Milk Tea",
    category: "Milk Tea",
    description: "Black tea and milk sweetened with local honey.",
    largeOrderPrice: 8,
    popular: true,
  },
  {
    id: "mango-green-tea",
    name: "Mango Green Tea",
    category: "Fruit Tea",
    description: "Bright green tea with fresh mango. Fresh fruit, never frozen.",
    largeOrderPrice: 7,
    popular: true,
  },
  {
    id: "strawberry-matcha",
    name: "Strawberry Matcha",
    category: "Specialty",
    description: "Fresh strawberry layered under ceremonial-style matcha and milk.",
    largeOrderPrice: 9,
    seasonal: true,
  },
  {
    id: "cream-cloud-tea",
    name: "Cheesy Cream Cloud Tea",
    category: "Specialty",
    description: "Our signature: salted cream cheese foam floating on chilled tea.",
    largeOrderPrice: 8,
  },
  {
    id: "jasmine-green-tea",
    name: "Jasmine Green Tea",
    category: "Traditional",
    description: "Fragrant and light. A clean palate between bites.",
    largeOrderPrice: 5,
  },
  {
    id: "traditional-oolong",
    name: "Traditional Oolong",
    category: "Traditional",
    description: "For the tea purists. Served hot.",
    largeOrderPrice: 5,
    hotOnly: true,
  },
];

export const toppings = [
  { id: "tapioca", name: "Tapioca pearls", note: "Most requested" },
  { id: "cream-cloud", name: "Cream cloud foam" },
  { id: "fruit-jelly", name: "Fruit jelly" },
  { id: "popping-boba", name: "Popping boba" },
  { id: "pudding", name: "Egg pudding" },
];

export const categoryOrder: MenuCategory[] = ["Milk Tea", "Fruit Tea", "Specialty", "Traditional"];
