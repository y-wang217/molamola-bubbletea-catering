export type FaqTopic = "booking" | "pricing" | "service" | "custom";
export type FaqItem = { q: string; a: string; topics: FaqTopic[] };

export const faqsFor = (topic: FaqTopic) => faqs.filter((f) => f.topics.includes(topic));

export const faqs: FaqItem[] = [
  { q: "How far in advance should I book?", a: "Placeholder: we recommend X–X weeks ahead for most events, and X months for weddings and peak-season weekends.", topics: ["booking", "pricing"] },
  { q: "What areas do you deliver to?", a: "Placeholder: we're based in Markham and Scarborough and serve the GTA. Delivery is free within XX km; beyond that a travel fee applies.", topics: ["service", "pricing"] },
  { q: "What is the minimum order?", a: "Placeholder: Ready-to-Serve orders start at XX cups. Full Service Drink Bars start at XX guests.", topics: ["pricing", "service"] },
  { q: "Can I customize drinks?", a: "Yes! We can tweak sweetness, flavours and colours, or create a brand-new signature drink just for your event.", topics: ["custom"] },
  { q: "Can you create custom cup stickers?", a: "Absolutely. Names, dates, logos, monograms or doodles. Send us your idea and we'll design it.", topics: ["custom"] },
  { q: "Do you provide staff?", a: "Full Service Drink Bars include our team on site for setup, service and cleanup. Ready-to-Serve orders are drop-off.", topics: ["service"] },
  { q: "Can you cater outdoor events?", a: "Placeholder: yes, with access to shade and a flat surface. We'll talk through power and setup details beforehand.", topics: ["service"] },
  { q: "Can you accommodate large events?", a: "Placeholder: yes. For 100+ guests we add extra staff and stations so the line keeps moving.", topics: ["service", "pricing"] },
  { q: "Do you offer alcoholic drink service?", a: "Placeholder: not at this time. We focus on non-alcoholic drinks, and can work alongside your venue's bar.", topics: ["service"] },
];
