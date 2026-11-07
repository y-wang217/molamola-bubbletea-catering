import type { IllustrationKind } from "@/components/doodles/illustrations";
import type { Tone } from "@/lib/tones";

export type EventType = {
  id: string;
  title: string;
  blurb: string;
  illustration: IllustrationKind;
  tone: Tone;
};

export const eventTypes: EventType[] = [
  {
    id: "weddings",
    title: "Weddings",
    blurb: "Signature drinks in your colours, a bar your guests will talk about.",
    illustration: "rings",
    tone: "pink",
  },
  {
    id: "private-parties",
    title: "Private Parties",
    blurb: "Birthdays, showers, graduations and every excuse in between.",
    illustration: "balloons",
    tone: "butter",
  },
  {
    id: "corporate",
    title: "Corporate Events",
    blurb: "Team days, launches and client events, with your logo on every cup.",
    illustration: "briefcase",
    tone: "blue",
  },
  {
    id: "pop-ups",
    title: "Pop-ups & Festivals",
    blurb: "High-volume service with a booth that draws a line.",
    illustration: "tent",
    tone: "sage",
  },
  {
    id: "something-special",
    title: "Something Special",
    blurb: "Got an idea that doesn't fit a box? Those are our favourite.",
    illustration: "gift",
    tone: "cream",
  },
];
