import type { IllustrationKind } from "@/components/doodles/illustrations";
import type { Tone } from "@/lib/tones";

// To use a real photo: add it to /public/gallery and set `image` on the item.
// The hand-drawn frame, tape and caption stay; only the placeholder art is replaced.

export const galleryCategories = ["Weddings", "Festivals", "Private Parties", "Corporate Events", "Catering Setups"] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = {
  id: string;
  caption: string;
  category: GalleryCategory;
  /** Drop a real photo in /public/gallery and set its path here, e.g. "/gallery/blesy-ian.jpg". */
  image?: string;
  alt: string;
  /** Placeholder art shown until `image` is set. */
  placeholder: IllustrationKind;
  tone: Tone;
  /** Show on the homepage "Featured Real Events" strip. */
  featured?: boolean;
  /** Scrapbook placement: tilt in degrees and parallax strength. */
  tilt: number;
  drift: number;
  shape: "square" | "tall" | "wide";
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", featured: true, caption: "Blesy & Ian’s Wedding", category: "Weddings", alt: "Drink bar at a wedding", placeholder: "rings", tone: "pink", tilt: -3, drift: 0.6, shape: "tall" },
  { id: "g2", featured: true, caption: "Japan Festival", category: "Festivals", alt: "Festival drink booth", placeholder: "tent", tone: "sage", tilt: 2.5, drift: 1.2, shape: "square" },
  { id: "g3", featured: true, caption: "Private Birthday Party", category: "Private Parties", alt: "Birthday party drinks", placeholder: "balloons", tone: "butter", tilt: -1.5, drift: 0.9, shape: "wide" },
  { id: "g4", caption: "Team Summer Social", category: "Corporate Events", alt: "Corporate event drinks", placeholder: "briefcase", tone: "blue", tilt: 3, drift: 0.4, shape: "square" },
  { id: "g5", featured: true, caption: "Our drink bar, all set up", category: "Catering Setups", alt: "Full drink bar setup", placeholder: "bar", tone: "cream", tilt: -2.5, drift: 1.1, shape: "tall" },
  { id: "g6", caption: "Baby shower in blush", category: "Private Parties", alt: "Pink drinks at a baby shower", placeholder: "gift", tone: "pink", tilt: 1.5, drift: 0.7, shape: "square" },
  { id: "g7", caption: "Night market pop-up", category: "Festivals", alt: "Night market pop-up", placeholder: "carrier", tone: "butter", tilt: -2, drift: 1.3, shape: "wide" },
  { id: "g8", caption: "Grad day toast", category: "Private Parties", alt: "Graduation drinks", placeholder: "sticker", tone: "sage", tilt: 2, drift: 0.5, shape: "square" },
];
