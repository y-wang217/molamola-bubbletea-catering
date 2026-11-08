import Link from "next/link";
import { brand, footerNav, socials, type SocialKind } from "@/content/site";
import { Logo } from "./logo";
import { DoodleDecoration } from "@/components/doodles/doodle";
import { Container } from "@/components/ui/layout";

const socialIcon: Record<SocialKind, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
      <path d="M9 9.5c.3 2 2.5 4.3 4.5 4.6l1-1.1 2 .9c-.3 1.2-1.2 1.9-2.4 1.8C11 15.4 8.4 12.8 8.1 10c-.1-1.2.6-2.1 1.8-2.4l.9 2z" />
    </svg>
  ),
};

export function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden border-t-[1.5px] border-linework bg-powder">
      <DoodleDecoration kind="boba" className="absolute top-10 right-[8%] h-12 w-12 opacity-80" motion="bob" />
      <DoodleDecoration kind="star" className="absolute bottom-24 left-[46%] hidden h-8 w-8 md:block" motion="twinkle" />
      <Container className="relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <Logo className="h-20 w-auto sm:h-24" href={null} />
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ink/75">
            Drinks-first catering for weddings, parties and events across {brand.serviceArea}.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-bold tracking-[0.16em] uppercase">Explore</p>
          <ul className="mt-4 space-y-2.5 text-[16px] font-semibold">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-bold tracking-[0.16em] uppercase">Say hi</p>
          <ul className="mt-4 space-y-3">
            {socials.map((s) => (
              <li key={s.kind}>
                <a href={s.href} className="group inline-flex items-center gap-3 text-[16px] font-semibold">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-linework bg-paper transition-transform group-hover:-rotate-12">
                    {socialIcon[s.kind]}
                  </span>
                  <span>
                    {s.label}
                    <span className="block text-[13px] font-normal text-ink/60">{s.handle}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t-[1.5px] border-dashed border-linework/25">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-[13px] text-ink/60 sm:flex-row">
          <p>© {brand.name}. Made with lots of ice.</p>
          <p className="font-hand text-lg">see you at the drink bar ✶</p>
        </Container>
      </div>
    </footer>
  );
}
