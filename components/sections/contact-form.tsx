"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState, type FormEvent } from "react";
import { inquiryFields, type InquiryField } from "@/content/inquiry";
import { submitInquiry, validateField, validateInquiry, type InquiryErrors, type InquiryValues } from "@/lib/validate-inquiry";
import { buttonClass } from "@/components/ui/cta-button";
import { Mascot } from "@/components/doodles/mascot";
import { DoodleDecoration } from "@/components/doodles/doodle";

const input =
  "mt-2 w-full min-h-12 rounded-2xl border-[1.5px] border-linework/25 bg-paper px-4 py-3 text-[16px] outline-none transition placeholder:text-cocoa/60 hover:border-linework/50 focus:border-linework focus:bg-white aria-[invalid=true]:border-tangerine-deep";

const initialValues = (): InquiryValues => Object.fromEntries(inquiryFields.map((f) => [f.name, f.type === "chips" ? [] : ""]));

export function ContactForm() {
  const [values, setValues] = useState<InquiryValues>(initialValues);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  const set = (name: string, value: string | string[]) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) {
      const field = inquiryFields.find((f) => f.name === name)!;
      setErrors((e) => ({ ...e, [name]: validateField(field, value) }));
    }
  };

  const onBlur = (field: InquiryField) => setErrors((e) => ({ ...e, [field.name]: validateField(field, values[field.name]) }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateInquiry(inquiryFields, values);
    setErrors(found);
    const first = inquiryFields.find((f) => found[f.name]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first.name}"]`)?.focus();
      return;
    }
    setStatus("sending");
    await submitInquiry(values);
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center px-6 py-16 text-center">
        <Mascot className="h-32 w-32" float />
        <h2 className="mt-6 font-display text-4xl font-extrabold tracking-[-0.03em]">Inquiry sent!</h2>
        <p className="mt-3 max-w-sm text-lg text-cocoa">Thanks{typeof values.name === "string" && values.name ? `, ${values.name.split(" ")[0]}` : ""}! We&apos;ll be in touch within X business days.</p>
        <button type="button" className={`${buttonClass("secondary")} mt-8`} onClick={() => (setValues(initialValues()), setStatus("idle"))}>
          Send another
        </button>
      </motion.div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-x-5 gap-y-6 sm:grid-cols-2" aria-describedby={errorCount ? `${uid}-summary` : undefined}>
      {inquiryFields.map((f) => {
        const id = `${uid}-${f.name}`;
        const err = errors[f.name];
        const describedBy = [f.hint && `${id}-hint`, err && `${id}-error`].filter(Boolean).join(" ") || undefined;
        const common = { id, name: f.name, "aria-invalid": !!err, "aria-describedby": describedBy, "data-field": f.name };
        const val = values[f.name];
        const label = (
          <>
            {f.label}
            {f.required ? <span className="text-tangerine-deep"> *</span> : <span className="font-normal text-cocoa"> (optional)</span>}
          </>
        );

        let control: React.ReactNode;
        if (f.type === "select") {
          control = (
            <div className="relative">
              <select {...common} value={val as string} onChange={(e) => set(f.name, e.target.value)} onBlur={() => onBlur(f)} className={`${input} appearance-none pr-11`}>
                <option value="">Choose one…</option>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <svg viewBox="0 0 20 20" aria-hidden className="pointer-events-none absolute top-1/2 right-4 mt-1 h-5 w-5 -translate-y-1/2">
                <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          );
        } else if (f.type === "textarea") {
          control = <textarea {...common} rows={5} value={val as string} placeholder={f.placeholder} onChange={(e) => set(f.name, e.target.value)} onBlur={() => onBlur(f)} className={`${input} resize-y`} />;
        } else if (f.type === "cards" || f.type === "chips") {
          const multi = f.type === "chips";
          const selected = multi ? (val as string[]) : [val as string];
          control = (
            <div role={multi ? "group" : "radiogroup"} aria-labelledby={`${id}-label`} aria-describedby={describedBy} className={`mt-2 flex flex-wrap gap-2.5 ${multi ? "" : "sm:grid sm:grid-cols-3"}`}>
              {f.options?.map((o, i) => {
                const on = selected.includes(o);
                return (
                  <button
                    key={o}
                    type="button"
                    role={multi ? undefined : "radio"}
                    aria-checked={multi ? undefined : on}
                    aria-pressed={multi ? on : undefined}
                    data-field={i === 0 ? f.name : undefined}
                    onClick={() => {
                      const next = multi ? (on ? selected.filter((x) => x !== o) : [...selected, o]) : o;
                      set(f.name, next);
                      if (!multi) setErrors((e) => ({ ...e, [f.name]: undefined }));
                    }}
                    className={`min-h-12 rounded-2xl border-[1.5px] px-4 py-3 text-[15px] font-semibold transition duration-200 ${
                      on ? "border-linework bg-blush shadow-[var(--shadow-sticker)]" : "border-linework/25 bg-paper hover:border-linework/60"
                    } ${multi ? "" : "w-full text-left sm:text-center"}`}
                  >
                    {on && <span aria-hidden>✓ </span>}
                    {o}
                  </button>
                );
              })}
            </div>
          );
        } else {
          control = (
            <input
              {...common}
              type={f.type}
              inputMode={f.type === "number" ? "numeric" : undefined}
              min={f.type === "number" ? 1 : undefined}
              autoComplete={f.autoComplete}
              placeholder={f.placeholder}
              value={val as string}
              onChange={(e) => set(f.name, e.target.value)}
              onBlur={() => onBlur(f)}
              className={input}
            />
          );
        }

        const isGroup = f.type === "cards" || f.type === "chips";
        return (
          <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
            {isGroup ? (
              <p id={`${id}-label`} className="text-[15px] font-semibold">
                {label}
              </p>
            ) : (
              <label htmlFor={id} className="text-[15px] font-semibold">
                {label}
              </label>
            )}
            {f.hint && (
              <p id={`${id}-hint`} className="font-hand text-lg leading-none text-cocoa">
                {f.hint}
              </p>
            )}
            {control}
            <AnimatePresence>
              {err && (
                <motion.p id={`${id}-error`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 flex items-center gap-1.5 text-[14px] font-semibold text-tangerine-deep">
                  <span aria-hidden>✶</span> {err}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      <div className="flex flex-col items-start gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${uid}-summary`} role="status" className="text-[14px] text-cocoa">
          {errorCount ? `Almost! ${errorCount} field${errorCount > 1 ? "s need" : " needs"} a look.` : "We reply within X business days."}
        </p>
        <button type="submit" disabled={status === "sending"} className={`${buttonClass("primary")} w-full sm:w-auto`}>
          {status === "sending" ? "Sending…" : "Send Inquiry"}
          <DoodleDecoration kind="heart" className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
