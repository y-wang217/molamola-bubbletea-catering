import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet";

const styles: Record<Variant, string> = {
  primary: "bg-tangerine text-ink border-ink shadow-[var(--shadow-sticker)] hover:shadow-[var(--shadow-sticker-lg)] hover:-translate-x-0.5 hover:-translate-y-0.5",
  secondary: "bg-paper text-ink border-ink shadow-[var(--shadow-sticker)] hover:shadow-[var(--shadow-sticker-lg)] hover:-translate-x-0.5 hover:-translate-y-0.5",
  quiet: "border-transparent text-ink underline-offset-4 hover:underline",
};

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 px-5 py-3 sm:px-6 text-[15px] font-bold transition-[transform,box-shadow,background-color] duration-200 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";

export function CTAButton({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  external?: boolean;
}) {
  const content = (
    <>
      {children}
      {arrow && (
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );
  const cls = `${base} ${styles[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

/** Same look, for <button> elements (forms). */
export function buttonClass(variant: Variant = "primary") {
  return `${base} ${styles[variant]} disabled:opacity-60 disabled:pointer-events-none`;
}
