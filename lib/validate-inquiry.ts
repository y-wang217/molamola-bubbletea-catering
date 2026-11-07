import type { InquiryField } from "@/content/inquiry";

export type InquiryValues = Record<string, string | string[]>;
export type InquiryErrors = Partial<Record<string, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validates one field. Returns an error message, or undefined when valid. */
export function validateField(field: InquiryField, value: string | string[] | undefined, today = new Date()): string | undefined {
  const empty = value === undefined || (Array.isArray(value) ? value.length === 0 : value.trim() === "");
  if (empty) return field.required ? `Please add your ${field.label.toLowerCase()}.` : undefined;
  if (Array.isArray(value)) return undefined;

  const v = value.trim();
  switch (field.type) {
    case "email":
      return EMAIL.test(v) ? undefined : "That email doesn't look quite right.";
    case "tel":
      return v.replace(/\D/g, "").length >= 10 ? undefined : "Please include area code (10 digits).";
    case "number": {
      const n = Number(v);
      return Number.isInteger(n) && n > 0 ? undefined : "Please enter a whole number.";
    }
    case "date": {
      const d = new Date(`${v}T12:00:00`);
      const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      return Number.isNaN(d.getTime()) || d < start ? "Please pick a date in the future." : undefined;
    }
    default:
      return undefined;
  }
}

export function validateInquiry(fields: InquiryField[], values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  for (const f of fields) {
    const msg = validateField(f, values[f.name]);
    if (msg) errors[f.name] = msg;
  }
  return errors;
}

/**
 * Where a valid inquiry goes. No backend yet: connect this to an API route,
 * Formspree, a Google Sheet, etc. when ready.
 */
export async function submitInquiry(values: InquiryValues): Promise<void> {
  if (process.env.NODE_ENV !== "production") console.info("Inquiry (not sent, no backend yet):", values);
  await new Promise((r) => setTimeout(r, 600));
}
