export const site = {
  name: "Mola Mola",
  tagline: "Bubble tea catering for events worth remembering",
  description:
    "Fresh-fruit teas, real-taro milk teas and cream cloud specials, delivered by the cup or poured live at a drink bar. Bubble tea catering across Toronto from North York.",
  serviceOrigin: "Finch & Victoria Park, North York",
  freeDeliveryKm: 15,
  // Set these in .env.local (see README). Left empty on purpose so nothing fake ships.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? "",
};

export const nav = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pre-order", label: "Pre-order" },
  { href: "/bar-setup", label: "Bar setup" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
] as const;
