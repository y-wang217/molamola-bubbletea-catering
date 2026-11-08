import { hand } from "./art-defs";
import { MascotArt } from "./mascot";
import { CUP_VIEWBOX, DrinkArt } from "./drink-art";
import { recipes, type DrinkRecipe } from "@/content/drinks";
import { C, stroke } from "./palette";

export type IllustrationKind =
  | "rings"
  | "balloons"
  | "briefcase"
  | "tent"
  | "gift"
  | "carrier"
  | "bar"
  | "leaf"
  | "palette"
  | "sticker"
  | "menu"
  | "letter"
  | "cup"
  | "heart";

/**
 * MolaMola spot illustrations: loose cocoa linework, flat pastel fills, a little paper grain.
 * Drawn simply on purpose, like doodles from the catering binder.
 */
export function Illustration({ kind, className = "h-24 w-24", title }: { kind: IllustrationKind; className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} overflow="visible">
      {title && <title>{title}</title>}
      <g filter={hand("illo")} {...stroke} strokeWidth={2.6}>
        {art[kind]}
      </g>
    </svg>
  );
}

/** A little MolaMola drink inside an illustration, drawn from a recipe (same art as everywhere else). */
const MiniCup = ({ x, y, s = 1, recipe = recipes.brownSugarEarlGrey }: { x: number; y: number; s?: number; recipe?: DrinkRecipe }) => (
  <svg x={x - 6.2 * s} y={y - 15.4 * s} width={42.4 * s} height={55.9 * s} viewBox={CUP_VIEWBOX} overflow="visible">
    <g stroke="none">
      <DrinkArt recipe={recipe} sticker="mini" w={4.2 / s} detail="mini" />
    </g>
  </svg>
);

const Sparkle = ({ x, y, s = 1, fill = C.butter }: { x: number; y: number; s?: number; fill?: string }) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} fill={fill} strokeWidth={2} d="M0-9c.7 5.6 2 7 7.5 9-5.5 2-6.8 3.4-7.5 9-.7-5.6-2-7-7.5-9 5.5-2 6.8-3.4 7.5-9Z" />
);

const art: Record<IllustrationKind, React.ReactNode> = {
  // Weddings: a loose pair of rings, a small heart and a flower.
  rings: (
    <>
      <path fill="none" strokeWidth={3.2} d="M66 72c1 13-9 23-22 23S20 85 21 72s11-22 23-22 21 9 22 22Z" />
      <path fill="none" strokeWidth={3.2} d="M98 75c-1 13-11 22-24 21s-22-12-21-24 12-21 24-20 22 11 21 23Z" />
      <path fill={C.blue} d="M38 50l6-9 6 9-6 5Z" />
      <path fill={C.pink} d="M60 34c-4-6-13-4-12 3 1 4 6 7 12 11 6-4 11-7 12-11 1-7-8-9-12-3Z" />
      <g fill={C.pink}>
        <circle cx="96" cy="32" r="4.6" />
        <circle cx="103" cy="38" r="4.6" />
        <circle cx="99" cy="46" r="4.6" />
        <circle cx="90" cy="45" r="4.6" />
        <circle cx="89" cy="37" r="4.6" />
      </g>
      <circle cx="96" cy="40" r="3.2" fill={C.butter} />
    </>
  ),
  // Private parties: balloons with loose strings.
  balloons: (
    <g transform="translate(60 58) scale(1.18) translate(-60 -58)">
      <path fill="none" strokeWidth={2} d="M44 62c4 12-3 22 14 36M76 56c-3 14 4 24-14 42M60 70c1 10 3 18-1 28" />
      <ellipse cx="44" cy="42" rx="16" ry="20" fill={C.pinkDeep} transform="rotate(-8 44 42)" />
      <ellipse cx="76" cy="36" rx="16" ry="20" fill={C.butterDeep} transform="rotate(7 76 36)" />
      <ellipse cx="60" cy="52" rx="14" ry="18" fill={C.blueDeep} />
      <path fill={C.pinkDeep} strokeWidth={1.8} d="M41 61l5 1-3 4Z" />
      <path fill={C.butterDeep} strokeWidth={1.8} d="M73 55l5 1-3 4Z" />
      <path fill={C.blueDeep} strokeWidth={1.8} d="M57 69l5 1-3 4Z" />
      <path fill={C.tangerine} strokeWidth={2} d="M52 98q6-5 12 0-6 5-12 0Z" />
    </g>
  ),
  // Corporate: a simple laptop with a drink beside it.
  briefcase: (
    <>
      <path fill="#fff6e4" d="M22 40q0-4 4-4h52q4 0 4 4v34H22Z" />
      <path fill={C.blueDeep} stroke="none" opacity=".55" d="M28 42h48v26H28Z" />
      <path fill="none" strokeWidth={2} d="M34 52h20M34 60h28" />
      <path fill="#fff6e4" d="M14 74h76l-5 9H19Z" />
      <MiniCup x={88} y={60} s={0.78} recipe={recipes.strawberryMatcha} />
    </>
  ),
  // Pop-ups & festivals: a tiny canopy booth with bunting.
  tent: (
    <>
      <path fill="none" strokeWidth={2} d="M10 16q50 18 100 0" />
      <path fill={C.pink} strokeWidth={2} d="M22 20l6 11 5-9Z" />
      <path fill={C.butter} strokeWidth={2} d="M44 25l5 11 6-10Z" />
      <path fill={C.sage} strokeWidth={2} d="M66 26l5 11 5-11Z" />
      <path fill={C.blue} strokeWidth={2} d="M88 22l5 10 6-12Z" />
      <path fill="none" d="M28 56v44M92 56v44" />
      <path fill={C.pink} d="M18 56l12-16h60l12 16Z" />
      <path fill="#fff6e4" stroke="none" d="M42 40h12l-4 16H38ZM66 40h12l4 16H70Z" />
      <path fill="#fff6e4" d="M18 56q7 8 14 0q7 8 14 0q7 8 14 0q7 8 14 0q7 8 14 0q7 8 14 0Z" />
      <path fill="#fff6e4" d="M24 78h72v22H24Z" />
      <MiniCup x={44} y={60} s={0.5} />
      <MiniCup x={62} y={61} s={0.48} recipe={recipes.honeyOrangeOolong} />
    </>
  ),
  // Something special: a gift and a sparkle.
  gift: (
    <>
      <path fill={C.pink} d="M58 42c-7-14-22-12-20-3 1 5 9 4 20 3ZM62 42c7-14 22-12 20-3-1 5-9 4-20 3Z" />
      <path fill={C.sage} d="M28 56h64v44q0 3-3 3H31q-3 0-3-3Z" />
      <path fill={C.sage} d="M24 44h72v14H24Z" />
      <path fill={C.pink} d="M54 44h12v59H54Z" />
      <Sparkle x={100} y={28} s={1.1} />
      <Sparkle x={18} y={34} s={0.6} fill={C.blue} />
    </>
  ),
  // Ready-to-Serve: MolaMola cups in a kraft carrier.
  carrier: (
    <>
      <MiniCup x={18} y={46} />
      <MiniCup x={45} y={40} s={1.05} recipe={recipes.strawberryMatcha} />
      <MiniCup x={74} y={46} recipe={recipes.honeyOrangeOolong} />
      <path fill="#e8c99d" d="M10 74h100l-7 30H17Z" />
      <path fill="none" strokeWidth={2} d="M24 84h72" opacity=".6" />
      <circle cx="60" cy="94" r="4" fill="#fff" strokeWidth={1.8} />
    </>
  ),
  // Full Service: a little drink counter with a fish sign.
  bar: (
    <>
      <path fill="none" d="M24 30v38M96 30v38" />
      <path fill={C.pink} d="M14 30l9-14h74l9 14Z" />
      <path fill="#fff6e4" stroke="none" d="M38 16h12l-3 14H35ZM70 16h12l3 14H73Z" />
      <path fill="#fff6e4" d="M14 30q6 8 12 0q6 8 12 0q6 8 12 0q6 8 12 0q6 8 12 0q6 8 12 0q6 8 12 0q6 8 12 0Z" />
      <MiniCup x={32} y={47} s={0.6} />
      <MiniCup x={52} y={45} s={0.64} recipe={recipes.strawberryMatcha} />
      <MiniCup x={73} y={47} s={0.6} recipe={recipes.honeyOrangeOolong} />
      <path fill={C.blue} d="M14 68h92v36q0 3-3 3H17q-3 0-3-3Z" />
      <circle cx="60" cy="87" r="12" fill="#fff" />
      <g transform="translate(51.5 78.5) scale(.025)">
        <MascotArt tone="line" bubbles={false} />
      </g>
    </>
  ),
  leaf: (
    <>
      <path fill={C.sage} d="M24 96C20 56 50 24 98 22c2 44-28 76-74 74Z" />
      <path fill="none" d="M24 96c16-22 36-44 58-58M44 74l-2-14M57 62l12 1M67 52l-2-11" />
      <circle cx="88" cy="84" r="8" fill={C.tangerine} />
      <circle cx="76" cy="95" r="6.5" fill={C.pinkDeep} />
    </>
  ),
  palette: (
    <>
      <path fill="#fff6e4" d="M60 18c26 0 46 16 46 38 0 14-12 14-20 12-8-2-12 6-8 14 4 10-4 20-18 20-26 0-44-18-44-42s18-42 44-42Z" />
      <circle cx="38" cy="50" r="7" fill={C.pinkDeep} />
      <circle cx="56" cy="35" r="7" fill={C.butterDeep} />
      <circle cx="78" cy="42" r="7" fill={C.blueDeep} />
      <circle cx="38" cy="74" r="7" fill={C.sageDeep} />
    </>
  ),
  // A die-cut cup sticker with the fish from the logo.
  sticker: (
    <g transform="rotate(-8 60 60)">
      <path fill="#fff" d="M60 20c23 0 40 17 40 40s-17 40-40 40-40-17-40-40 17-40 40-40Z" />
      <path fill={C.cream} d="M89 87c-8 6-6-10-18-6 6-10 14-6 18 6Z" />
      <g transform="translate(41 37) scale(.055)">
        <MascotArt tone="color" bubbles={false} />
      </g>
      <path fill="none" stroke={C.pinkDeep} strokeWidth={2} d="M42 82q18 8 36 0" />
    </g>
  ),
  menu: (
    <>
      <path fill="none" d="M34 104l14-84M86 104L72 20" />
      <rect x="28" y="22" width="64" height="72" rx="6" fill="#fff6e4" />
      <path fill="none" stroke={C.tangerine} d="M40 36c6-4 10 4 16 0s10 4 16 0 6 2 8 0" />
      <path fill="none" strokeWidth={2} d="M40 52h28M40 62h36M40 72h24M40 82h30" />
    </>
  ),
  letter: (
    <>
      <path fill={C.blue} d="M18 36q0-3 3-3h78q3 0 3 3v54q0 3-3 3H21q-3 0-3-3Z" />
      <path fill="none" d="M19 38l41 30 41-30" />
      <path fill={C.pink} d="M60 74c-4-5-12-3-11 3 1 3 6 6 11 9 5-3 10-6 11-9 1-6-7-8-11-3Z" />
    </>
  ),
  cup: <MiniCup x={36} y={34} s={1.6} />,
  heart: (
    <>
      <path fill={C.pink} d="M60 100C34 84 16 68 18 46c1-14 12-22 24-21 8 1 14 6 18 12 4-6 10-11 18-12 12-1 24 8 24 22 0 22-18 37-42 53Z" />
      <Sparkle x={100} y={22} s={0.8} />
    </>
  ),
};
