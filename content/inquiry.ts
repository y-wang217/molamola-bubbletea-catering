// Quote form fields. Add, remove or reorder fields here; the form renders from this list.
import { drinkCategories } from "./drinks";
import { eventTypes } from "./events";

export type FieldType = "text" | "email" | "tel" | "date" | "number" | "select" | "cards" | "chips" | "textarea";

export type InquiryField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  options?: string[];
  /** Half-width on desktop. */
  half?: boolean;
  autoComplete?: string;
};

export const inquiryFields: InquiryField[] = [
  { name: "name", label: "Name", type: "text", required: true, half: true, autoComplete: "name", placeholder: "Your name" },
  { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email", placeholder: "you@email.com" },
  { name: "phone", label: "Phone", type: "tel", half: true, autoComplete: "tel", placeholder: "Optional" },
  { name: "eventType", label: "Event type", type: "select", required: true, half: true, options: eventTypes.map((e) => e.title) },
  { name: "eventDate", label: "Event date", type: "date", required: true, half: true },
  { name: "eventLocation", label: "Event location", type: "text", half: true, placeholder: "Venue or neighbourhood" },
  { name: "guests", label: "Estimated guest count", type: "number", required: true, half: true, placeholder: "e.g. 80" },
  { name: "budget", label: "Budget range", type: "select", half: true, options: ["Under $XXX", "$XXX – $X,XXX", "$X,XXX – $X,XXX", "$X,XXX+", "Not sure yet"] },
  { name: "cateringType", label: "Catering type", type: "cards", required: true, options: ["Ready-to-Serve", "Full Service Drink Bar", "Not sure yet"] },
  { name: "drinks", label: "Drinks interested in", type: "chips", hint: "Pick as many as you like", options: drinkCategories.map((d) => d.name) },
  { name: "message", label: "Message / event details", type: "textarea", placeholder: "Theme, colours, timing, anything you're dreaming up…" },
];
