import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat, Figtree } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/ui/motion";
import { brand } from "@/content/site";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const body = Figtree({ variable: "--font-figtree", subsets: ["latin"] });
const hand = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: { default: `${brand.name} · Drink Catering for Your Moment`, template: `%s · ${brand.name}` },
  description: brand.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${hand.variable} antialiased`}>
      <body className="min-h-screen font-sans text-[16px]">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2">
          Skip to content
        </a>
        <MotionProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
