import type { IllustrationKind } from "@/components/doodles/illustrations";
import type { Tone } from "@/lib/tones";

export type CateringPackage = {
  id: string;
  name: string;
  kicker: string;
  description: string;
  features: string[];
  details: { label: string; value: string }[];
  cta: { label: string; href: string };
  illustration: IllustrationKind;
  tone: Tone;
};

export const cateringPackages: CateringPackage[] = [
  {
    id: "ready-to-serve",
    name: "Ready-to-Serve",
    kicker: "Drop-off drinks",
    description: "Prepared drinks ready for pickup or delivery. Great for meetings, parties and casual events.",
    features: ["Minimum order: XX cups", "Delivery or pickup", "Custom drink options", "Simple, tidy packaging"],
    details: [
      { label: "Best for", value: "Meetings, office lunches, casual parties" },
      { label: "Lead time", value: "X days (placeholder)" },
      { label: "Service", value: "No on-site staff" },
    ],
    cta: { label: "View Ready-to-Serve", href: "/catering#ready-to-serve" },
    illustration: "carrier",
    tone: "blue",
  },
  {
    id: "full-service",
    name: "Full Service Drink Bar",
    kicker: "The full experience",
    description: "A complete MolaMola drink bar experience with setup, service and event presentation.",
    features: ["On-site setup", "Drinks made to order", "Friendly staff service", "Custom menu", "Event styling"],
    details: [
      { label: "Best for", value: "Weddings, parties, corporate events" },
      { label: "Service window", value: "X–X hours (placeholder)" },
      { label: "Staff", value: "X team members (placeholder)" },
    ],
    cta: { label: "Explore Full Service", href: "/catering#full-service" },
    illustration: "bar",
    tone: "pink",
  },
];
