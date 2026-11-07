"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitInquiry, type InquiryState } from "@/app/inquire/actions";

const field = "mt-1 w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none transition focus:border-sea focus:ring-2 focus:ring-sea/20";

export function InquiryForm({ mode, estimate }: { mode: string; estimate: string }) {
  const [state, action, pending] = useActionState<InquiryState, FormData>(submitInquiry, { status: "idle" });

  if (state.status === "sent") {
    return (
      <div className="rounded-blob bg-white p-10 text-center shadow-sm">
        <p className="text-4xl" aria-hidden>
          🧋
        </p>
        <h2 className="mt-4 font-display text-3xl font-semibold">Thanks{state.name ? `, ${state.name}` : ""}!</h2>
        <p className="mt-2 text-ink/70">We got your inquiry and will be in touch within a day.</p>
        <Link href="/menu" className="mt-6 inline-block text-sm font-semibold text-sea hover:underline">
          Browse the menu while you wait →
        </Link>
      </div>
    );
  }

  if (state.status === "fallback") {
    return (
      <div className="rounded-blob bg-white p-10 text-center shadow-sm">
        <h2 className="font-display text-2xl font-semibold">Almost there</h2>
        {state.mailto ? (
          <>
            <p className="mt-2 text-ink/70">Our online form is taking a break. Tap below to send your details by email instead.</p>
            <a href={state.mailto} className="mt-6 inline-block rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white hover:bg-coral-dark">
              Email us your inquiry
            </a>
          </>
        ) : (
          <p className="mt-2 text-ink/70">Inquiries aren&apos;t connected yet. Please message us on social media for now.</p>
        )}
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-5 rounded-blob bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-10">
      <input type="hidden" name="estimate" value={estimate} />
      <div className="hidden" aria-hidden>
        <label>
          Leave this empty
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="text-sm font-semibold">
        Your name *
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="text-sm font-semibold">
        Email *
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="text-sm font-semibold">
        Phone
        <input name="phone" type="tel" autoComplete="tel" className={field} />
      </label>
      <label className="text-sm font-semibold">
        Event date *
        <input name="eventDate" type="date" required className={field} />
      </label>
      <label className="text-sm font-semibold">
        Catering style
        <select name="mode" defaultValue={mode} className={field}>
          <option value="">Not sure yet</option>
          <option value="pre-order">Pre-Order Catering</option>
          <option value="bar">Bar Setup Experience</option>
        </select>
      </label>
      <label className="text-sm font-semibold">
        Approx. guests
        <input name="guests" type="number" min={1} inputMode="numeric" className={field} />
      </label>
      <label className="text-sm font-semibold">
        Type of event
        <input name="eventType" placeholder="Birthday, office party, wedding…" className={field} />
      </label>
      <label className="text-sm font-semibold">
        Venue or neighbourhood
        <input name="location" placeholder="e.g. Markham, Yonge & Eglinton" className={field} />
      </label>
      <label className="text-sm font-semibold sm:col-span-2">
        Anything else?
        <textarea name="message" rows={4} placeholder="Favourite flavours, dietary needs, timing, theme…" className={field} />
      </label>

      {state.status === "error" && <p className="text-sm font-semibold text-coral-dark sm:col-span-2">{state.message}</p>}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white transition hover:bg-coral-dark disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Sending…" : "Send inquiry"}
        </button>
        <p className="mt-3 text-xs text-ink/55">We only use your details to plan your event.</p>
      </div>
    </form>
  );
}
