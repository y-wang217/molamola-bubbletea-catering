import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">{children}</p>;
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="border-b border-line/70 bg-sand/60">
      <Container className="py-14 sm:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>
        {children && <div className="mt-5 max-w-2xl text-lg text-ink/75">{children}</div>}
      </Container>
    </section>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
}) {
  const styles = {
    primary: "bg-coral text-white hover:bg-coral-dark shadow-sm",
    secondary: "border border-ink/20 text-ink hover:bg-white",
    light: "bg-foam text-ink hover:bg-white",
  }[variant];
  return (
    <Link href={href} className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${styles}`}>
      {children}
    </Link>
  );
}

export function Check({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sea-soft text-xs text-sea">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

export function CtaBand({ title, body, href = "/build", label = "Build your estimate" }: { title: string; body: string; href?: string; label?: string }) {
  return (
    <Container className="mt-20">
      <div className="bubbles relative overflow-hidden rounded-blob bg-sea px-6 py-12 text-foam sm:px-12">
        <h2 className="max-w-xl font-display text-3xl font-semibold">{title}</h2>
        <p className="mt-3 max-w-xl text-foam/80">{body}</p>
        <div className="mt-6">
          <ButtonLink href={href} variant="light">
            {label}
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
