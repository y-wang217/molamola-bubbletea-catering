import type { CustomizationId, DrinkCategory, FlavourId, ToppingKind } from "@/content/drinks";
import { hand } from "./art-defs";
import { MiniDrink } from "./drink-art";
import { MascotArt } from "./mascot";
import { C, stroke } from "./palette";

const s = { ...stroke, strokeWidth: 2.2 };

/** A small MolaMola drink for each drink category, drawn from its recipe. */
export function DrinkIcon({ drink, className = "h-16 w-12" }: { drink: Pick<DrinkCategory, "recipe">; className?: string }) {
  return <MiniDrink recipe={drink.recipe} className={className} />;
}

/** Illustrated topping icons. */
export function ToppingIcon({ kind, className = "h-14 w-14" }: { kind: ToppingKind; className?: string }) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden overflow="visible">
      <g {...s} filter={hand("icon")}>
        {toppingArt[kind]}
      </g>
    </svg>
  );
}

const toppingArt: Record<ToppingKind, React.ReactNode> = {
  // glossy tapioca pearls in a little heap
  boba: (
    <>
      {[
        [17, 38],
        [28, 40],
        [39, 38],
        [22, 28],
        [34, 28],
        [28, 18],
      ].map(([x, y]) => (
        <g key={`${x}${y}`}>
          <circle cx={x} cy={y} r="6.4" fill="#4b2d20" />
          <ellipse cx={x - 2.2} cy={y - 2.6} rx="1.9" ry="1.3" fill="#fff" stroke="none" opacity=".6" />
        </g>
      ))}
    </>
  ),
  // soft pale-green translucent cubes
  aloe: (
    <>
      <rect x="9" y="24" width="17" height="17" rx="4.5" fill="#e3f1cf" fillOpacity=".9" transform="rotate(-10 17 32)" />
      <rect x="27" y="14" width="17" height="17" rx="4.5" fill="#e3f1cf" fillOpacity=".9" transform="rotate(12 35 22)" />
      <rect x="27" y="33" width="15" height="15" rx="4" fill="#d5e9bd" fillOpacity=".9" transform="rotate(-4 34 40)" />
      <path stroke="#fff" strokeWidth="2.4" d="M14 29h4M32 18h4" />
    </>
  ),
  // custard pudding cubes with a caramel top
  pudding: (
    <>
      {[
        [17, 32, -6],
        [36, 30, 7],
        [27, 44, 2],
      ].map(([x, y, r]) => (
        <g key={`${x}${y}`} transform={`rotate(${r} ${x} ${y})`}>
          <rect x={x - 9} y={y - 8} width="18" height="15" rx="4.5" fill="#f9dc8a" />
          <path d={`M${x - 7} ${y - 5}h14`} stroke="#d99a55" strokeWidth="3.4" />
        </g>
      ))}
    </>
  ),
  // smooth cream cap with a soft cloud-like drip
  float: (
    <>
      <path fill="#d9b48f" d="M14 36h28l-2.4 14q-.5 2-2.5 2H18.9q-2 0-2.5-2Z" />
      <path
        fill="#fff8ea"
        d="M10 30c0-10 8-16 18-16s18 6 18 16v4q0 4-3.5 4-3.5 0-3.5 4.5t-3.5 4.5q-3.5 0-3.5-4.5V39q0-1.5-3-1.5H25q-3 0-3 2.5 0 6-3.5 6T15 40q0-2.5-2.5-2.5Q10 37.5 10 34Z"
      />
      <path fill="none" stroke="#fff" strokeWidth="2.6" d="M17 22q4-4 10-4" />
    </>
  ),
  // custard top with a torched, caramelised surface
  brulee: (
    <>
      <path fill="#d9b48f" d="M13 34h30l-2.6 14q-.4 2-2.4 2H18q-2 0-2.4-2Z" />
      <path fill="#fae7b6" d="M10 28q0-6 6-6h24q6 0 6 6v4q0 5-5 5H15q-5 0-5-5Z" />
      <path fill="#dc9140" d="M11 25q2-7 17-7t17 7q-8 4-17 4t-17-4Z" />
      <g fill="#a85b20" stroke="none">
        <ellipse cx="22" cy="24" rx="4" ry="1.6" />
        <ellipse cx="35" cy="22" rx="3.4" ry="1.4" />
      </g>
      <path fill="none" stroke="#fff" strokeWidth="1.8" opacity=".7" d="M17 21q6-2.5 12-2.5" />
    </>
  ),
  // strawberry + orange slice
  fruit: (
    <>
      <path fill="#ec6475" d="M20 46c-8-4-12-12-11-19 .6-4 4-6 11-6s10.4 2 11 6c1 7-3 15-11 19Z" />
      <path fill={C.sageDeep} d="M14 21c2-4 4-5 6-4.6 2.4-.4 4.6.6 6.6 4.6-2.4 1.6-4.4 1-6.6-.4-2.2 1.4-4.4 2-6 .4Z" />
      <g fill="#ffe6a6" stroke="none">
        <ellipse cx="16" cy="29" rx="1.2" ry="1.7" />
        <ellipse cx="23" cy="28" rx="1.2" ry="1.7" />
        <ellipse cx="20" cy="36" rx="1.2" ry="1.7" />
      </g>
      <path fill="#ffad4a" d="M28 42a12 12 0 0 1 24 0Z" />
      <path fill="#ffe0a3" stroke="none" d="M31.5 42a8.5 8.5 0 0 1 17 0Z" />
      <path strokeWidth={1.3} stroke="#f6a542" d="M40 42v-8M40 42l-6-6M40 42l6-6" />
    </>
  ),
};

/** Illustrated icons for "Make It Yours" options. */
export function CustomIcon({ id, className = "h-14 w-14", accent = C.pinkDeep }: { id: CustomizationId; className?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden overflow="visible">
      <g {...s} filter={hand("icon")}>
        {id === "sticker" && (
          <>
            <circle cx="28" cy="28" r="20" fill="#fff" />
            <circle cx="28" cy="28" r="15.5" fill="none" stroke={accent} strokeWidth={1.6} strokeDasharray="2.5 3" />
            <g transform="translate(17.5 16.5) scale(.031)">
              <MascotArt tone="color" bubbles={false} />
            </g>
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
      <g {...s} filter={hand("icon")}>
        {flavourArt[id]}
      </g>
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
