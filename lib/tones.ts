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
  blue: "#bcd7ec",
  pink: "#f7c8d2",
  butter: "#fbe49c",
  sage: "#c8d9b4",
  cream: "#fffaf0",
};
