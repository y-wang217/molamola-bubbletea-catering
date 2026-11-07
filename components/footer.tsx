import Link from "next/link";
import { MolaMark } from "./logo";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-foam">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-sea-soft">
            <MolaMark className="h-9 w-9" />
            <span className="font-display text-2xl font-semibold text-foam">{site.name}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-foam/70">
            Bubble tea catering from {site.serviceOrigin}. Free delivery within {site.freeDeliveryKm} km.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-foam">Explore</p>
          <ul className="mt-3 space-y-2 text-foam/70">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-foam">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-foam">Plan your event</p>
          <ul className="mt-3 space-y-2 text-foam/70">
            <li>
              <Link href="/build" className="hover:text-foam">
                Build an estimate
              </Link>
            </li>
            <li>
              <Link href="/inquire" className="hover:text-foam">
                Send an inquiry
              </Link>
            </li>
            {site.contactEmail && (
              <li>
                <a href={`mailto:${site.contactEmail}`} className="hover:text-foam">
                  {site.contactEmail}
                </a>
              </li>
            )}
            {site.instagram && (
              <li>
                <a href={`https://instagram.com/${site.instagram}`} className="hover:text-foam">
                  @{site.instagram}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-foam/10 py-5 text-center text-xs text-foam/50">
        © {site.name}. Made by Stephanie &amp; Charlie.
      </div>
    </footer>
  );
}
