# Mola Mola · Bubble Tea Catering

Website for Mola Mola's catering service. Next.js 16 (App Router) + Tailwind CSS 4.

The site follows the "guided transparency" brief from the Catering Launch Plan: customers pick
**Pre-Order** or **Bar Setup**, answer a few light questions in the calculator, see an
itemized **price range**, and send it to us with the estimate attached.

## Routes

| Route           | What it is                                                     |
| --------------- | -------------------------------------------------------------- |
| `/`             | Home: hero, two service modes, how it works, favourites        |
| `/how-it-works` | Process + FAQ                                                  |
| `/pre-order`    | Pre-Order Catering details                                     |
| `/bar-setup`    | Bar Setup Experience details                                   |
| `/menu`         | Drinks and toppings                                            |
| `/build`        | Estimate calculator (`?mode=pre-order` or `?mode=bar`)         |
| `/inquire`      | Inquiry form, pre-filled with the estimate from `/build`       |
| `/about`        | Stephanie & Charlie                                            |

## Where to change things

- **Prices** → `lib/pricing.ts`. Every number the calculator uses lives here. The current values
  are **drafts**, tuned so a typical Standard bar lands around $1,000 and a Premium around $2,000.
  Replace them when final pricing is locked.
- **Menu** → `lib/menu.ts` (mirrors the Notion *Menu Items* database; `largeOrderPrice` feeds
  pre-order estimates).
- **Brand colours / fonts** → `app/globals.css` (`@theme` block) and `app/layout.tsx`.
- **Contact details** → environment variables below.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable                       | Purpose                                                                 |
| ------------------------------ | ----------------------------------------------------------------------- |
| `INQUIRY_WEBHOOK_URL`          | Where inquiries are POSTed as JSON (Formspree, Zapier, Make, Apps Script → Google Sheet, etc.) |
| `NEXT_PUBLIC_CONTACT_EMAIL`    | Shown in the footer and used as an email fallback if the webhook fails  |
| `NEXT_PUBLIC_INSTAGRAM_HANDLE` | Footer link (handle without `@`)                                        |

With no webhook configured, the form falls back to a pre-filled `mailto:` link. With neither
set, it tells the visitor inquiries aren't connected yet, so set at least one before launch.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build && npm run lint
```

## Deploy

Push to GitHub and import the repo into Vercel. Add the environment variables in the Vercel
project settings.
