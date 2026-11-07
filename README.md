# MolaMola · Drink Catering

An interactive catering lookbook for MolaMola, built with Next.js 16 (App Router), Tailwind CSS 4 and Motion.

## Pages

| Route            | What's on it                                                              |
| ---------------- | ------------------------------------------------------------------------- |
| `/`              | Scroll-built hero cup, celebrations, catering options, Build Your Drink Bar, How It Works, pricing, gallery, Why MolaMola, FAQ, final CTA |
| `/catering`      | Both packages in detail, timeline, drink bar builder, FAQ                 |
| `/pricing`       | Pricing tiers, add-ons, custom-quote note                                 |
| `/custom-drinks` | Custom drink ideas + drink bar builder                                    |
| `/gallery`       | Scrapbook / polaroid gallery                                              |
| `/about`         | Meet MolaMola + Why MolaMola                                              |
| `/contact`       | Event inquiry form (validation only, no backend yet)                      |

## Editing content

All words, prices and lists live in `content/`. Components never hard-code repeated content.

| File                        | Controls                                                     |
| --------------------------- | ------------------------------------------------------------ |
| `content/site.ts`           | Brand name, tagline, nav links, footer links, socials         |
| `content/events.ts`         | "What Are You Celebrating?" cards                             |
| `content/packages.ts`       | Ready-to-Serve / Full Service cards                           |
| `content/pricing.ts`        | **All pricing**: tiers, add-ons, quote note                   |
| `content/drinks.ts`         | Drink categories (and cup colours), toppings, customizations |
| `content/custom-drinks.ts`  | Custom drink idea cards                                       |
| `content/gallery.ts`        | Gallery photos, captions, tilt and drift                      |
| `content/faq.ts`            | FAQ questions and answers                                     |
| `content/story.ts`          | How It Works steps, Why MolaMola reasons, About Us copy       |
| `content/inquiry.ts`        | Quote form fields and options                                 |

**Adding real photos:** put images in `public/gallery/` and set `image: "/gallery/your-photo.jpg"` on the item in `content/gallery.ts`. The illustrated placeholder disappears automatically.

**Connecting the form:** `submitInquiry()` in `lib/validate-inquiry.ts` is the single place to send inquiries (API route, Formspree, Google Sheet, etc.).

## Design system

- **Tokens:** colours, fonts, radii, shadows and keyframes are in the `@theme` block of `app/globals.css`.
- **Fonts:** Bricolage Grotesque (display), Figtree (body), Caveat (handwritten notes).
- **Art:** `components/doodles/` holds all hand-drawn SVGs: `DoodleDecoration` (stars, hearts, fruit…), `Illustration` (card spot art), `Mascot` (the sunfish) and `Cup` (the layered drink used in the hero and builder).

### Reusable components

`components/ui/`: `SectionHeader`, `CTAButton`, `FeatureCard`, `DrinkCard`, `CateringPackageCard`, `PricingCard`, `TimelineStep`, `GalleryCard`, `FAQAccordion`, `BinderSheet`, `Reveal`, `Parallax`, `HandUnderline`.

`components/sections/`: one file per page section, composed by the route files in `app/`.

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
