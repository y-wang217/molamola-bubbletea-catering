import type { CustomizationId, DrinkCategory, FlavourId, ToppingKind } from "@/content/drinks";
import { C, stroke } from "./palette";

const s = { ...stroke, strokeWidth: 2.2 };

/** A small illustrated cup for each drink category. */
export function DrinkIcon({ drink, className = "h-16 w-12" }: { drink: Pick<DrinkCategory, "liquid" | "milk" | "garnish">; className?: string }) {
  const { liquid, milk, garnish } = drink;
  return (
    <svg viewBox="0 0 48 64" className={className} aria-hidden overflow="visible">
      <path {...s} fill={C.pink} d="M27 2l-3 18h4.5l3-18Z" />
      <path fill={C.paper} d="M7 16h34l-4 42q-.5 4-4.5 4h-17q-4 0-4.5-4Z" />
      <clipPath id={`clip-${garnish}`}>
        <path d="M8.5 20h31l-3.6 38q-.4 2.8-3.4 2.8h-17q-3 0-3.4-2.8Z" />
      </clipPath>
      <g clipPath={`url(#clip-${garnish})`}>
        <rect x="0" y={garnish === "foam" ? 26 : 22} width="48" height="42" fill={liquid} />
        {garnish === "layer" && <rect x="0" y="44" width="48" height="20" fill="#fbf3e2" />}
        {garnish === "foam" && <path fill="#fbf3e2" d="M0 20h48v8q-4 3-8 0t-8 0-8 0-8 0-8 0-8 0Z" />}
        {milk && garnish !== "layer" && <path fill="#fff" fillOpacity=".5" d="M6 34q8-4 16 0t18 0v5q-9 4-18 0t-16 1Z" />}
        {garnish === "boba" && (
          <g fill={C.boba}>
            <circle cx="16" cy="56" r="3.4" />
            <circle cx="24" cy="57" r="3.4" />
            <circle cx="32" cy="56" r="3.4" />
            <circle cx="20" cy="51" r="3.4" />
            <circle cx="28" cy="51" r="3.4" />
          </g>
        )}
        {garnish === "citrus" && (
          <g {...s} strokeWidth={1.6}>
            <circle cx="20" cy="42" r="7" fill={C.butter} />
            <circle cx="20" cy="42" r="4.3" fill="#fff6cf" />
          </g>
        )}
      </g>
      <path {...s} fill="none" d="M7 16h34l-4 42q-.5 4-4.5 4h-17q-4 0-4.5-4Z" />
      <rect {...s} x="4" y="13" width="40" height="6" rx="3" fill={C.paper} />
      {garnish === "citrus" && <path {...s} strokeWidth={1.8} fill={C.butterDeep} d="M36 13a7 7 0 0 1 10-6" />}
      {garnish === "sparkle" && (
        <path {...s} strokeWidth={1.6} fill={C.butter} d="M41 3c.5 4 1.5 5.5 6 6.5-4.5 1-5.5 2.5-6 6.5-.5-4-1.5-5.5-6-6.5 4.5-1 5.5-2.5 6-6.5Z" />
      )}
      <path stroke="#fff" strokeWidth="2.4" strokeLinecap="round" d="M12 24l3 30" opacity=".7" />
    </svg>
  );
}

/** Illustrated topping icons. */
export function ToppingIcon({ kind, className = "h-14 w-14" }: { kind: ToppingKind; className?: string }) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden overflow="visible">
      <g {...s}>{toppingArt[kind]}</g>
    </svg>
  );
}

const toppingArt: Record<ToppingKind, React.ReactNode> = {
  boba: (
    <>
      <path fill={C.paper} d="M8 30h40q0 18-20 18T8 30Z" />
      {[
        [17, 28],
        [27, 26],
        [37, 28],
        [22, 19],
        [32, 19],
        [27, 12],
      ].map(([x, y]) => (
        <g key={`${x}${y}`}>
          <circle cx={x} cy={y} r="5.2" fill={C.boba} />
          <circle cx={x - 1.6} cy={y - 1.6} r="1.3" fill="#fff" stroke="none" opacity=".6" />
        </g>
      ))}
    </>
  ),
  aloe: (
    <>
      <rect x="9" y="22" width="18" height="18" rx="4" fill="#e3f0d2" transform="rotate(-10 18 31)" />
      <rect x="26" y="14" width="18" height="18" rx="4" fill="#e3f0d2" transform="rotate(12 35 23)" />
      <rect x="25" y="32" width="15" height="15" rx="3.5" fill="#d4e8bd" transform="rotate(-4 32 39)" />
      <path fill="none" stroke="#fff" strokeWidth="2.2" d="M13 27l4-1M30 18l4 1" />
    </>
  ),
  pudding: (
    <>
      <path fill="#f6dc8e" d="M12 44l4-24q12-5 24 0l4 24q-16 5-32 0Z" />
      <path fill="#d9a066" d="M16 20q12-6 24 0-2 6-12 6t-12-6Z" />
      <path fill="none" d="M10 46q18 5 36 0" />
    </>
  ),
  float: (
    <>
      <path fill={C.paper} d="M10 34c-6 0-6-9 0-9 0-8 9-11 13-6 3-7 14-7 15 1 7-1 9 8 3 10 3 6-3 9-8 6-4 4-11 4-14 0-4 3-10 1-9-2Z" />
      <path fill="none" d="M20 26q4-3 8 0" opacity=".6" />
      <circle cx="40" cy="14" r="3" fill={C.pink} />
    </>
  ),
  fruit: (
    <>
      <path fill="#f49aa6" d="M20 46c-8-4-12-12-11-19 .6-4 4-6 11-6s10.4 2 11 6c1 7-3 15-11 19Z" />
      <path fill={C.sageDeep} d="M14 21c2-4 4-5 6-4.6 2.4-.4 4.6.6 6.6 4.6-2.4 1.6-4.4 1-6.6-.4-2.2 1.4-4.4 2-6 .4Z" />
      <g fill={C.ink} stroke="none">
        <circle cx="16" cy="29" r="1" />
        <circle cx="23" cy="28" r="1" />
        <circle cx="20" cy="35" r="1" />
      </g>
      <circle cx="38" cy="34" r="11" fill={C.butter} />
      <circle cx="38" cy="34" r="7" fill="#fff6cf" strokeWidth={1.5} />
      <path strokeWidth={1.5} d="M38 27v14M31 34h14" />
    </>
  ),
};

/** Illustrated icons for "Make It Yours" options. */
export function CustomIcon({ id, className = "h-14 w-14", accent = C.pinkDeep }: { id: CustomizationId; className?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden overflow="visible">
      <g {...s}>
        {id === "sticker" && (
          <>
            <circle cx="28" cy="28" r="20" fill="#fff" />
            <circle cx="28" cy="28" r="15" fill="none" stroke={accent} strokeWidth={1.6} strokeDasharray="2.5 3" />
            <path fill={C.pink} d="M28 36c-6-4-9-7-9-11 0-3 2-5 4.5-5 2 0 3.4 1.2 4.5 2.6 1.1-1.4 2.5-2.6 4.5-2.6 2.5 0 4.5 2 4.5 5 0 4-3 7-9 11Z" />
            <path fill={C.cream} d="M42 40c-4 3-3-5-9-3 3-5 7-3 9 3Z" />
          </>
        )}
        {id === "colours" && (
          <>
            <circle cx="18" cy="22" r="10" fill={C.pinkDeep} />
            <circle cx="36" cy="20" r="10" fill={C.blueDeep} />
            <circle cx="22" cy="38" r="10" fill={C.butterDeep} />
            <circle cx="38" cy="37" r="10" fill={C.sageDeep} />
          </>
        )}
        {id === "branding" && (
          <>
            <rect x="8" y="12" width="40" height="32" rx="8" fill={C.blue} />
            <text x="28" y="33" textAnchor="middle" fill={C.ink} stroke="none" style={{ font: "800 11px var(--font-display)" }}>
              LOGO
            </text>
            <path fill={C.butter} d="M44 6c.7 4 1.7 5 6 6-4.3 1-5.3 2-6 6-.7-4-1.7-5-6-6 4.3-1 5.3-2 6-6Z" />
          </>
        )}
        {id === "names" && (
          <>
            <path fill="none" d="M10 8c6 4 8 10 10 14" />
            <path fill={C.butter} d="M16 22l28-6 6 24-28 6Z" />
            <circle cx="21" cy="26" r="2.2" fill={C.cream} />
            <path fill="none" strokeWidth={1.8} d="M27 30l14-3M29 36l10-2" />
          </>
        )}
        {id === "menu" && (
          <>
            <path fill="none" d="M16 52l6-40M40 52l-6-40" />
            <rect x="12" y="10" width="32" height="34" rx="4" fill={C.paper} />
            <path fill="none" stroke={C.tangerine} d="M18 18c3-2 5 2 8 0s5 2 8 0 3 1 4 0" />
            <path fill="none" strokeWidth={1.8} d="M18 26h16M18 32h20M18 38h12" />
          </>
        )}
        {id === "theme" && (
          <>
            <path fill="none" d="M22 36c1 8-3 10 0 16" />
            <ellipse cx="22" cy="22" rx="11" ry="14" fill={C.pink} />
            <path fill={C.pink} d="M19.5 36h5l-2.5 3Z" />
            <path fill={C.butter} d="M42 18c1 6 2.5 7.5 9 9-6.5 1.5-8 3-9 9-1-6-2.5-7.5-9-9 6.5-1.5 8-3 9-9Z" />
            <circle cx="40" cy="44" r="2.5" fill={C.blueDeep} />
          </>
        )}
      </g>
    </svg>
  );
}

/** Fruit icons for "Choose a flavour". */
export function FlavourIcon({ id, className = "h-12 w-12" }: { id: FlavourId; className?: string }) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden overflow="visible">
      <g {...s}>{flavourArt[id]}</g>
    </svg>
  );
}

const flavourArt: Record<FlavourId, React.ReactNode> = {
  original: (
    <>
      <path fill={C.sage} d="M12 44C10 24 24 10 46 10c1 22-12 36-34 34Z" />
      <path fill="none" d="M12 44c8-11 17-20 28-27M24 34l-1-8M31 27l7 1" />
    </>
  ),
  strawberry: (
    <>
      <path fill="#f49aa6" d="M28 48c-10-5-16-15-15-24 .8-5 5-8 15-8s14.2 3 15 8c1 9-5 19-15 24Z" />
      <path fill={C.sageDeep} d="M19 16c3-5 6-6.5 9-6 3-.5 6 1 9 6-3 2-6 1.5-9-.5-3 2-6 2.5-9 .5Z" />
      <g fill={C.ink} stroke="none">
        <circle cx="22" cy="25" r="1.2" />
        <circle cx="30" cy="23" r="1.2" />
        <circle cx="35" cy="30" r="1.2" />
        <circle cx="25" cy="33" r="1.2" />
        <circle cx="29" cy="40" r="1.2" />
      </g>
    </>
  ),
  mango: (
    <>
      <path fill="#ffc24d" d="M14 34c0-14 10-24 22-24 8 0 12 6 12 14 0 14-12 24-24 24-6 0-10-6-10-14Z" />
      <path fill="#ffa33a" stroke="none" d="M20 40c4 2 10 1 15-3-6 6-13 7-15 3Z" opacity=".6" />
      <path fill={C.sageDeep} d="M36 10c2-6 8-8 12-6-2 5-6 7-12 6Z" />
    </>
  ),
  orange: (
    <>
      <circle cx="28" cy="28" r="19" fill={C.tangerine} />
      <circle cx="28" cy="28" r="13.5" fill="#ffe1bd" strokeWidth={1.8} />
      <path strokeWidth={1.8} d="M28 14.5v27M14.5 28h27M18.5 18.5l19 19M37.5 18.5l-19 19" />
    </>
  ),
  lychee: (
    <>
      <circle cx="24" cy="30" r="15" fill="#f4a3b4" />
      <path fill="none" strokeWidth={1.5} d="M14 24l4 2M20 18l2 4M28 18l-1 4M33 24l-4 2M16 34l4-1" opacity=".7" />
      <circle cx="36" cy="32" r="11" fill="#fbf4ee" />
      <ellipse cx="38" cy="33" rx="3" ry="4" fill="#d9b79c" strokeWidth={1.5} />
    </>
  ),
  grape: (
    <>
      <path fill="none" d="M28 14c0-4 2-7 5-8" />
      <path fill={C.sageDeep} d="M30 12c4-4 10-4 13 0-4 3-9 3-13 0Z" />
      {[
        [20, 22],
        [30, 21],
        [25, 30],
        [35, 30],
        [16, 31],
        [21, 39],
        [31, 39],
        [26, 47],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="#b99ad8" />
      ))}
    </>
  ),
  lime: (
    <>
      <circle cx="28" cy="28" r="19" fill="#9fcf6a" />
      <circle cx="28" cy="28" r="13.5" fill="#e6f5c8" strokeWidth={1.8} />
      <path strokeWidth={1.8} d="M28 14.5v27M14.5 28h27M18.5 18.5l19 19M37.5 18.5l-19 19" />
    </>
  ),
};
