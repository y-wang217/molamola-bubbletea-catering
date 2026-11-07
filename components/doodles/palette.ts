// Raw colours for SVG art (Tailwind classes can't reach inside every path).
export const C = {
  ink: "#3a2c26",
  paper: "#fffaf0",
  cream: "#fbf5ea",
  blue: "#bcd7ec",
  blueDeep: "#94bddc",
  pink: "#f7c8d2",
  pinkDeep: "#ee9fb0",
  butter: "#fbe49c",
  butterDeep: "#f5cf62",
  sage: "#c8d9b4",
  sageDeep: "#a5c08a",
  tangerine: "#f39a5d",
  boba: "#5b3b2c",
} as const;

export const stroke = {
  stroke: C.ink,
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
