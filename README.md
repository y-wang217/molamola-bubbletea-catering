# MolaMola · Drink Catering

An interactive catering lookbook for MolaMola, built with Next.js 16 (App Router), Tailwind CSS 4 and Motion.

## Site structure

**Homepage = curated overview. Each dedicated page = the full information.** The homepage never repeats a full page; it previews each topic and links deeper.

| Route            | What's on it                                                              |
| ---------------- | ------------------------------------------------------------------------- |
| `/`              | Hero (scroll-filled cup) → What Are You Celebrating? → catering intro → drink bar preview → Why MolaMola + short intro → featured events → pricing teaser → final CTA |
| `/catering`      | Both services in full, comparison table, How It Works timeline, service FAQ |
| `/pricing`       | All tiers, what every Full Service bar includes, grouped add-ons, quote note, pricing FAQ |
| `/custom-drinks` | Interactive Build Your Drink Bar, custom drink ideas, custom FAQ          |
| `/gallery`       | Full scrapbook with category filters                                      |
| `/about`         | Logo + intro, our story, why a fish, the team                             |
| `/contact`       | Event inquiry form (validation only, no backend yet)                      |

## Editing content

All words, prices and lists live in `content/`. Components never hard-code repeated content.

| File                        | Controls                                                     |
| --------------------------- | ------------------------------------------------------------ |
| `content/site.ts`           | Brand name, tagline, nav links, footer links, socials         |
| `content/events.ts`         | "What Are You Celebrating?" cards                             |
| `content/packages.ts`       | Ready-to-Serve / Full Service cards                           |
| `content/pricing.ts`        | **All pricing**: tiers, homepage teaser, inclusions, add-ons  |
| `content/drinks.ts`         | Drink categories (and cup colours), toppings, customizations |
| `content/custom-drinks.ts`  | Custom drink idea cards                                       |
| `content/gallery.ts`        | Gallery photos, captions, `featured` (homepage), tilt, drift  |
| `content/faq.ts`            | FAQ questions, answers and topics (each page shows its topic) |
| `content/story.ts`          | How It Works steps, Why MolaMola reasons, About Us copy       |
| `content/inquiry.ts`        | Quote form fields and options                                 |

**Adding real photos:** put images in `public/gallery/` and set `image: "/gallery/your-photo.jpg"` on the item in `content/gallery.ts`. The illustrated placeholder disappears automatically.

**Connecting the form:** `submitInquiry()` in `lib/validate-inquiry.ts` is the single place to send inquiries (API route, Formspree, Google Sheet, etc.).

## Design system

- **Tokens:** colours, fonts, radii, shadows and keyframes are in the `@theme` block of `app/globals.css`.
- **Fonts:** Bricolage Grotesque (display), Figtree (body), Caveat (handwritten notes).
- **Logo:** the real MolaMola logo files live in `public/brand/` (nav, footer, About). Replace the PNGs to update.
- **Art:** `components/doodles/` holds all hand-drawn SVGs: `DoodleDecoration` (stars, hearts, fruit…), `Illustration` (card spot art), `Mascot` (the sunfish, drawn to match the logo), `ingredients` (drink, topping and customization icons) and `Cup` (the layered drink used in the hero and builder).

### Reusable components

`components/ui/`: `SectionHeader`, `CTAButton`, `FeatureCard`, `DrinkCard`, `CateringPackageCard`, `PricingCard`, `TimelineStep`, `GalleryCard`, `FAQAccordion`, `BinderSheet`, `Reveal`, `Parallax`, `HandUnderline`.

`components/sections/`: page sections, grouped by page (`home/`, `catering/`, `pricing/`, `custom/`, `gallery/`), composed by the route files in `app/`.

## Motion & accessibility

- Scroll-linked: hero cup fill + headline reveal, How It Works line drawing, gallery and doodle parallax.
- On view: fade-up / slide-in sections, hand-drawn underlines.
- `prefers-reduced-motion` is respected everywhere: Motion runs with `reducedMotion="user"`, scroll scenes jump to their finished state, and CSS idle animations are disabled.

## Develop

```bash
npm install
npm run dev
```

```bash
npm run lint && npm run build
```
