import type { ReactNode } from "react";

/** Page width + gutters. */
export function Container({ children, className = "", wide = false }: { children: ReactNode; className?: string; wide?: boolean }) {
  return <div className={`mx-auto w-full ${wide ? "max-w-[88rem]" : "max-w-7xl"} px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

/** Vertical rhythm for page sections. */
export function Section({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`relative py-24 sm:py-32 ${className}`}>
      {children}
    </section>
  );
}

/**
 * A binder page: paper sheet with punched holes down the left edge.
 * Use for sections that should feel like a page in the catering lookbook.
 */
export function BinderSheet({ children, className = "", tone = "bg-paper", holes = true }: { children: ReactNode; className?: string; tone?: string; holes?: boolean }) {
  return (
    <div className={`relative rounded-[var(--radius-sheet)] border-[1.5px] border-ink/15 ${tone} shadow-[var(--shadow-soft)] ${className}`}>
      {holes && (
        <div aria-hidden className="pointer-events-none absolute top-0 bottom-0 left-4 hidden flex-col justify-evenly sm:flex">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-4 w-4 rounded-full border-[1.5px] border-ink/20 bg-cream shadow-[inset_1px_1px_2px_rgb(58_44_38/0.2)]" />
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
