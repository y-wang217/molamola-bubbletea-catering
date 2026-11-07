// Site-wide settings: brand, navigation, socials.
// Swap the placeholder social links before launch.

export const brand = {
  name: "MolaMola",
  tagline: "Dive into flavours",
  description:
    "Custom drink catering for weddings, parties, corporate events, pop-ups and celebrations. Ready-to-serve cups or a full MolaMola drink bar.",
  serviceArea: "Markham, Scarborough & the GTA",
};

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/catering", label: "Catering" },
  { href: "/pricing", label: "Pricing" },
  { href: "/custom-drinks", label: "Custom Drinks" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
] as const;

export const primaryCta = { href: "/contact", label: "Plan Your Event" };

export const footerNav = [
  { href: "/catering", label: "Catering" },
  { href: "/pricing", label: "Pricing" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export type SocialKind = "instagram" | "email" | "whatsapp";

export const socials: { kind: SocialKind; label: string; href: string; handle: string }[] = [
  { kind: "instagram", label: "Instagram", href: "https://instagram.com/", handle: "@molamola (placeholder)" },
  { kind: "email", label: "Email", href: "mailto:hello@example.com", handle: "hello@example.com" },
  { kind: "whatsapp", label: "WhatsApp", href: "https://wa.me/", handle: "Message us" },
];

/** Where "Message MolaMola" buttons go. */
export const messageLink = socials.find((s) => s.kind === "whatsapp")!.href;
