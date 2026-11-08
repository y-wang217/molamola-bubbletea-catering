// Pastel "tones" used by data-driven cards. Content files pick a tone by name.
export type Tone = "blue" | "pink" | "butter" | "sage" | "cream";

export const toneBg: Record<Tone, string> = {
  blue: "bg-powder",
  pink: "bg-blush",
  butter: "bg-butter",
  sage: "bg-sage",
  cream: "bg-paper",
};

export const toneSoftBg: Record<Tone, string> = {
  blue: "bg-powder-soft",
  pink: "bg-blush-soft",
  butter: "bg-butter-soft",
  sage: "bg-sage-soft",
  cream: "bg-paper",
};

export const toneHex: Record<Tone, string> = {
  blue: "#cfe8ff",
  pink: "#ffd6e3",
  butter: "#ffe7a3",
  sage: "#d6e8c3",
  cream: "#fffdf7",
};
