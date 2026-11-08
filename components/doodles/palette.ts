// Raw colours for SVG art (Tailwind classes can't reach inside every path).
export const C = {
  ink: "#6b4a33", // cocoa brown linework (style board)
  paper: "#fffdf7",
  cream: "#fff9ee",
  blue: "#cfe8ff",
  blueDeep: "#9ccaf2",
  pink: "#ffd6e3",
  pinkDeep: "#f6a9c0",
  butter: "#ffe7a3",
  butterDeep: "#ffd26b",
  sage: "#d6e8c3",
  sageDeep: "#a9cb8c",
  tangerine: "#ffb366",
  boba: "#5b3b2c",
  // mascot: powder-blue family between the logo and the style board
  mascotBody: "#c9e2f8",
  mascotFin: "#93c3ec",
  mascotWing: "#b0d4f4",
} as const;

export const stroke = {
  stroke: C.ink,
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
