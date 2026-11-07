import type { Metadata } from "next";
import { Container, CtaBand, PageHero } from "@/components/ui";
import { categoryOrder, drinks, toppings } from "@/lib/menu";

export const metadata: Metadata = { title: "Menu" };

const tones: Record<string, string> = {
  "Milk Tea": "bg-sand",
  "Fruit Tea": "bg-mango/20",
  Specialty: "bg-taro/25",
  Traditional: "bg-sea-soft",
};

export default function Menu() {
  return (
    <>
      <PageHero eyebrow="Menu" title="Unexpected flavours, made from the real thing.">
        Real taro, never powder. Fresh fruit, never frozen. Every drink can be made at your preferred sweetness.
      </PageHero>

      <Container className="mt-16 space-y-14">
        {categoryOrder.map((cat) => {
          const items = drinks.filter((d) => d.category === cat);
          if (!items.length) return null;
          return (
            <section key={cat}>
              <h2 className="font-display text-3xl font-semibold">{cat}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((d) => (
                  <article key={d.id} className={`rounded-3xl p-6 ${tones[cat]}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-xl font-semibold">{d.name}</h3>
                      {d.popular && <span className="rounded-full bg-coral px-2 py-0.5 text-[11px] font-semibold text-white">Popular</span>}
                      {d.seasonal && <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-pearl">Seasonal</span>}
                      {d.hotOnly && <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-pearl">Hot</span>}
                    </div>
                    <p className="mt-2 text-sm text-ink/75">{d.description}</p>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <section>
          <h2 className="font-display text-3xl font-semibold">Toppings</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {toppings.map((t) => (
              <span key={t.id} className="rounded-full border border-line bg-white px-4 py-2 text-sm">
                {t.name}
                {t.note && <span className="ml-2 text-xs text-sea">· {t.note}</span>}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink/60">
            Seasonal drinks depend on what&apos;s fresh. Want something off-menu for your event? A custom signature drink is
            available with any bar setup.
          </p>
        </section>
      </Container>

      <CtaBand title="Found your favourites?" body="Pick them in the calculator and see your price range instantly." />
    </>
  );
}
