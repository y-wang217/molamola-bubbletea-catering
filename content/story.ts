// How It Works, Why MolaMola and About Us content.
import type { IllustrationKind } from "@/components/doodles/illustrations";
import type { Tone } from "@/lib/tones";

export const howItWorks: { n: string; title: string; body: string; illustration: IllustrationKind; tone: Tone }[] = [
  { n: "01", title: "Tell us about your event", body: "Date, guests, vibe. A quick form or a message is all it takes.", illustration: "letter", tone: "blue" },
  { n: "02", title: "Choose your drinks", body: "Pick from our menu or let us suggest a lineup for your crowd.", illustration: "cup", tone: "pink" },
  { n: "03", title: "Customize the details", body: "Stickers, names, colours, menus. The fun part.", illustration: "sticker", tone: "butter" },
  { n: "04", title: "We bring the drink bar to you", body: "We set up, serve and clean up. You enjoy your event.", illustration: "bar", tone: "sage" },
];

export const reasons: { title: string; body: string; illustration: IllustrationKind; tone: Tone }[] = [
  { title: "Custom Drinks", body: "Menus created around your event, not pulled off a shelf.", illustration: "cup", tone: "pink" },
  { title: "Event Styling", body: "A drink bar that looks like it belongs at your party.", illustration: "bar", tone: "blue" },
  { title: "Small Details Matter", body: "Custom stickers, names and menus on every cup.", illustration: "sticker", tone: "butter" },
  { title: "Made for Your Event", body: "Not a one-size-fits-all catering package.", illustration: "heart", tone: "sage" },
];

export const about = {
  /** Short intro used on the homepage. */
  short: "We're a small, drinks-first catering team from Markham and Scarborough. Fun flavours, custom details, and a little fish who loves a good party.",
  intro:
    "MolaMola is a small, drinks-focused catering business built around fun flavours, custom events, and making drink moments people remember.",
  story: [
    {
      id: "founders",
      title: "Our story",
      body: "Placeholder founder story. Who we are, how we met, and how a love of markets, late-night tea runs and hosting friends turned into MolaMola.",
    },
    {
      id: "brand",
      title: "The MolaMola way",
      body: "Placeholder brand story. We mix the unexpected with the familiar: real ingredients, playful flavours, and presentation that makes people stop and take a photo.",
    },
    {
      id: "approach",
      title: "How we cater",
      body: "Placeholder approach. Small team, big care. We plan every menu around your event, show up early, and leave the space spotless.",
    },
  ],
  fish: {
    title: "Why a fish?",
    body: "The mola mola (ocean sunfish) is the gentle giant of the sea: round, a little odd, and impossible not to smile at. That's the feeling we want in every cup.",
  },
  team: [
    { name: "Stephanie", role: "Designer / Mixologist", bio: "Placeholder bio. The mind behind every recipe and every sticker.", tone: "pink" as Tone },
    { name: "Charlie", role: "Sales / Marketing", bio: "Placeholder bio. Your first hello, and the one making sure the day runs smoothly.", tone: "blue" as Tone },
  ],
};
