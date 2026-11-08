# MolaMola Drink Illustration System (official standard)

**Status: locked.** This is the official visual standard for every drink, cup, topping and
product illustration on the site. Approved by MolaMola.

Live reference: `/drink-styles` (unlisted page that renders the whole system).

## Rules

1. **Do not redesign** the cup, liquid style, toppings or sticker unless MolaMola explicitly asks
   or something is genuinely broken.
2. **Allowed changes are consistency refinements only:**
   - sticker placement (upright, centred on the cup front)
   - line weight (`w` scaling for small sizes)
   - ingredient proportions and placement
   - topping accuracy (making a topping read more like the real thing)
3. **Every new drink or product uses this system.** Add a `DrinkRecipe` in `content/drinks.ts`
   (layers, streaks, ice, inclusions, top). Do not draw one-off cups.
4. If a new ingredient or top is needed, add it to the existing pieces in
   `components/doodles/drink-art.tsx` in the same style. Then check it on `/drink-styles`.

## Where things live

| What | File |
| --- | --- |
| Recipes, colours, toppings, flavours | `content/drinks.ts` |
| Cup geometry, layers, ingredients, tops, sticker, static `DrinkArt` / `MiniDrink` | `components/doodles/drink-art.tsx` |
| Animated cup (hero, builder, CTA) | `components/doodles/cup.tsx` |
| Topping / flavour / customization icons | `components/doodles/ingredients.tsx` |
| Shared hand-drawn filters + cup clip | `components/doodles/art-defs.tsx` |

## The look (summary)

- Transparent takeaway cup, cute rounded proportions, soft cocoa outline (`#6b4a33`).
- Flat pastel liquid layers with soft blended boundaries and a light surface wash.
- Sticker: white circle, MolaMola fish + stacked "mola mola", upright and centred.
  Small sizes show the fish only.
- Toppings: glossy boba, translucent aloe, custard pudding cubes with caramel top.
  **Creamy Float Topping** is a smooth cream cap with cloud-like drips over the rim.
  Never call it "cheese foam" on the site.
  **Crème Brûlée** is a custard top with a torched caramel surface and no drips.
  Float and brûlée never appear together.
- Reference drinks: Brown Sugar Earl Grey Boba Milk Tea, Strawberry Matcha Latte
  (jam / milk / matcha), Honey Orange Four Season Oolong, Creamy Float, Crème Brûlée Earl Grey.
