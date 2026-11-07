"use server";

export type InquiryState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "sent"; name: string }
  | { status: "fallback"; mailto: string | null };

const clean = (v: FormDataEntryValue | null, max = 2000) => String(v ?? "").trim().slice(0, max);

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  // Honeypot: real people never fill this hidden field.
  if (clean(formData.get("company_website"))) return { status: "sent", name: "" };

  const inquiry = {
    name: clean(formData.get("name"), 120),
    email: clean(formData.get("email"), 200),
    phone: clean(formData.get("phone"), 40),
    eventDate: clean(formData.get("eventDate"), 20),
    eventType: clean(formData.get("eventType"), 120),
    location: clean(formData.get("location"), 200),
    guests: clean(formData.get("guests"), 10),
    mode: clean(formData.get("mode"), 20),
    estimate: clean(formData.get("estimate"), 500),
    message: clean(formData.get("message")),
    submittedAt: new Date().toISOString(),
  };

  if (!inquiry.name || !inquiry.email || !inquiry.eventDate) {
    return { status: "error", message: "Please add your name, email and event date." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    return { status: "error", message: "That email address doesn't look quite right." };
  }

  // Any JSON webhook works: Formspree, Zapier, Make, a Google Apps Script that
  // appends to a Sheet, or a Notion integration. Set INQUIRY_WEBHOOK_URL.
  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(inquiry),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      return { status: "sent", name: inquiry.name.split(" ")[0] };
    } catch (err) {
      console.error("Inquiry webhook failed", err);
      // fall through to email fallback so the lead isn't lost
    }
  }

  const to = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  if (!to) return { status: "fallback", mailto: null };

  const body = Object.entries(inquiry)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  const mailto = `mailto:${to}?subject=${encodeURIComponent(`Catering inquiry: ${inquiry.eventDate} (${inquiry.name})`)}&body=${encodeURIComponent(body)}`;
  return { status: "fallback", mailto };
}
