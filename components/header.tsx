import Link from "next/link";
import { MolaMark } from "./logo";
import { nav, site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-foam/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-sea">
          <MolaMark className="h-8 w-8" />
          <span className="whitespace-nowrap font-display text-xl font-semibold tracking-tight text-ink">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink/75 transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/build"
            className="whitespace-nowrap rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-coral-dark"
          >
            <span className="sm:hidden">Estimate</span>
            <span className="hidden sm:inline">Get an estimate</span>
          </Link>
          <details className="relative md:hidden">
            <summary className="list-none rounded-full border border-line px-3 py-2 text-sm font-medium [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-line bg-white p-2 shadow-lg">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-xl px-3 py-2 text-sm hover:bg-sand">
                  {item.label}
                </Link>
              ))}
              <Link href="/inquire" className="block rounded-xl px-3 py-2 text-sm hover:bg-sand">
                Inquire
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
