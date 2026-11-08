/**
 * MolaMola drink artwork. Every cup on the site (hero, builder, mini icons, catering scenes)
 * is drawn from these pieces, in one 220×290 coordinate space, from a DrinkRecipe.
 *
 * Style: transparent takeaway cup with cute rounded proportions, soft cocoa outline, flat pastel
 * layers with soft edges, simple hand-drawn ingredients, and an upright MolaMola sticker centred
 * on the front.
 */
import type { CSSProperties } from "react";
import type { DrinkLayer, DrinkRecipe, Inclusion, TopCap } from "@/content/drinks";
import { CUP_INSIDE, hand } from "./art-defs";
export { CUP_INSIDE };
import { MascotArt } from "./mascot";
import { C } from "./palette";

export const CUP_VIEWBOX = "0 0 220 290";

// Cup geometry: wide mouth, softly rounded bottom.
export const CUP_BODY = "M32 80C37 150 45 215 52 244Q57 272 86 272L134 272Q163 272 168 244C175 215 183 150 188 80Z";
const CUP_OUTLINE = "M32 80C37 150 45 215 52 244Q57 272 86 272L134 272Q163 272 168 244C175 215 183 150 188 80";
const LID = "M22 70Q20 86 36 86L184 86Q200 86 198 70Q197 58 184 58L36 58Q23 58 22 70Z";
const STRAW = "M116 100L134 4Q143 0 151 5L134 102Z";

const SURFACE = 100; // y of the drink surface
const BOTTOM = 266; // y of the inside bottom
const yAt = (f: number) => BOTTOM - (BOTTOM - SURFACE) * f;

/** Inside wall x positions at height y (approximate, used to place ingredients). */
function insideX(y: number): [number, number] {
  if (y <= 242) {
    const t = (y - 84) / (242 - 84);
    return [37 + t * 20, 183 - t * 20];
  }
  const d = 30 * ((y - 242) / 24) ** 2;
  return [57 + d, 163 - d];
}

const INK = C.ink;
const line = (w: number, width = 3.2) => ({ stroke: INK, strokeWidth: width * w, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });

/* ───────────────────────── back: straw + glass ───────────────────────── */

export function CupBack({ straw = C.pink, showStraw = true, w = 1 }: { straw?: string; showStraw?: boolean; w?: number }) {
  return (
    <g>
      {showStraw && (
        <g>
          <path d={STRAW} {...line(w, 2.8)} style={{ fill: straw, transition: "fill .5s ease" }} />
          <path d="M139 14L130 58" stroke="#fff" strokeWidth={3 * Math.min(w, 1.6)} strokeLinecap="round" opacity=".55" fill="none" />
        </g>
      )}
      <path d={CUP_BODY} fill="#fffdf8" opacity=".6" />
    </g>
  );
}

/* ───────────────────────── liquid ───────────────────────── */

const wave = (y: number) => `M-5 ${y}q28-5 56 0t56 0t56 0t56 0`;

function LayerShape({ layer, y }: { layer: DrinkLayer; y: number }) {
  if (layer.texture === "jam") {
    let d = `M-5 ${y}`;
    for (let i = 0; i < 12; i++) d += "q9.5-9 19 0";
    return (
      <g>
        <path d={`${d}V300H-5Z`} fill={layer.color} />
        {/* fruit bits + seeds */}
        <g fill="#d64e62">
          <ellipse cx="78" cy={y + 18} rx="9" ry="6" />
          <ellipse cx="128" cy={y + 24} rx="11" ry="6.5" />
          <ellipse cx="102" cy={y + 34} rx="8" ry="5" />
        </g>
        <g fill="#ffe6a6">
          {[
            [66, 12],
            [92, 20],
            [116, 14],
            [146, 20],
            [84, 30],
            [136, 34],
            [110, 26],
          ].map(([x, dy]) => (
            <ellipse key={`${x}-${dy}`} cx={x} cy={y + dy} rx="1.6" ry="2.2" />
          ))}
        </g>
      </g>
    );
  }
  return <path d={`${wave(y)}V300H-5Z`} fill={layer.color} />;
}

/** Liquid layers, bottom → top, with soft watercolour-like boundaries. Unclipped: wrap in the cup clip. */
export function LiquidLayers({ layers }: { layers: DrinkLayer[] }) {
  const ordered = [...layers].sort((a, b) => b.to - a.to); // paint the tallest first
  const top = yAt(Math.max(...layers.map((l) => l.to)));
  return (
    <g>
      {ordered.map((l, i) => (
        <LayerShape key={i} layer={l} y={yAt(l.to)} />
      ))}
      {/* soft blend line where one layer meets another */}
      {layers
        .filter((l) => l.to < 1 && l.texture !== "jam")
        .map((l, i) => (
          <path key={`b${i}`} d={wave(yAt(l.to))} fill="none" stroke="#fff" strokeWidth="4" opacity=".4" />
        ))}
      {/* light wash at the surface */}
      <path d={`${wave(top)}v12q-28 5-56 0t-56 0-56 0-56 0Z`} fill="#fff" opacity=".28" />
    </g>
  );
}

/** Brown sugar streaks running down the inside wall. */
export function Streaks({ detail = "full" }: { detail?: "full" | "mini" }) {
  const sugar = "#9a5528";
  return (
    <g fill="none" stroke={sugar} strokeLinecap="round">
      <path d="M44 104C47 130 40 152 48 174C54 194 46 216 57 238" strokeWidth="8" opacity=".5" />
      <path d="M176 104C172 128 180 152 172 176C166 198 174 216 163 240" strokeWidth="8" opacity=".5" />
      {detail === "full" && (
        <>
          <path d="M56 106C60 126 53 146 61 162" strokeWidth="3.5" opacity=".55" />
          <path d="M165 108C161 128 168 142 161 158" strokeWidth="3.5" opacity=".55" />
          <path d="M94 104C90 124 98 140 92 162" strokeWidth="3" opacity=".3" />
          <path d="M132 106C136 126 128 146 134 168" strokeWidth="3" opacity=".3" />
        </>
      )}
    </g>
  );
}

export function IceCubes({ detail = "full", w = 1 }: { detail?: "full" | "mini"; w?: number }) {
  const cubes: [number, number, number][] =
    detail === "full"
      ? [
          [72, 116, -12],
          [124, 110, 10],
          [152, 142, -6],
        ]
      : [
          [80, 116, -12],
          [134, 118, 10],
        ];
  return (
    <g>
      {cubes.map(([x, y, r]) => (
        <g key={`${x}-${y}`} transform={`rotate(${r} ${x} ${y})`}>
          <rect x={x - 15} y={y - 14} width="30" height="28" rx="8" fill="#ffffff" fillOpacity=".55" stroke={INK} strokeOpacity=".4" strokeWidth={1.8 * w} />
          <path d={`M${x - 9} ${y - 7}l7-1`} stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
}

/* ───────────────────────── ingredients ───────────────────────── */

const BOTTOM_KINDS: Inclusion[] = ["boba", "pudding", "strawberry", "mango", "taro"];
const SLOT_ROWS = [[254, 238], [219], [203]];
const SIZE: Record<string, number> = { boba: 9, pudding: 10, strawberry: 9, mango: 8, taro: 8 };

function rowXs(y: number, r: number, gap: number) {
  const [l, rr] = insideX(y);
  const left = l + r + 2;
  const right = rr - r - 2;
  const n = Math.max(1, Math.floor((right - left) / (2 * r + gap)) + 1);
  const step = n > 1 ? (right - left) / (n - 1) : 0;
  return Array.from({ length: n }, (_, i) => (n > 1 ? left + i * step : (left + right) / 2));
}

function Piece({ kind, x, y, w, i }: { kind: Inclusion; x: number; y: number; w: number; i: number }) {
  const sw = 1.6 * w;
  const jitter = ((i * 37) % 7) - 3;
  switch (kind) {
    case "boba":
      return (
        <g>
          <circle cx={x} cy={y} r="9" fill="#4b2d20" stroke={INK} strokeWidth={sw} />
          <ellipse cx={x - 3} cy={y - 3.6} rx="2.6" ry="1.8" fill="#fff" opacity=".55" />
        </g>
      );
    case "pudding":
      return (
        <g transform={`rotate(${jitter * 2} ${x} ${y})`}>
          <rect x={x - 10} y={y - 8} width="20" height="16" rx="4.5" fill="#f9dc8a" stroke={INK} strokeWidth={sw} />
          <path d={`M${x - 8} ${y - 5.5}h16`} stroke="#d99a55" strokeWidth="3.4" strokeLinecap="round" />
        </g>
      );
    case "strawberry":
      return (
        <g transform={`rotate(${jitter * 6} ${x} ${y})`}>
          <path d={`M${x} ${y + 9}c-8-3-11-9-10-14 .6-3 4-4.5 10-4.5s9.4 1.5 10 4.5c1 5-2 11-10 14Z`} fill="#ec6475" stroke={INK} strokeWidth={sw} />
          <g fill="#ffe6a6">
            <ellipse cx={x - 4} cy={y - 2} rx="1.1" ry="1.6" />
            <ellipse cx={x + 3} cy={y - 3} rx="1.1" ry="1.6" />
            <ellipse cx={x} cy={y + 3} rx="1.1" ry="1.6" />
          </g>
        </g>
      );
    case "mango":
      return (
        <g transform={`rotate(${jitter * 4} ${x} ${y})`}>
          <rect x={x - 8} y={y - 8} width="16" height="16" rx="4.5" fill="#ffc63f" stroke={INK} strokeWidth={sw} />
          <path d={`M${x - 4} ${y - 4}h4`} stroke="#ffe7a0" strokeWidth="2.6" strokeLinecap="round" />
        </g>
      );
    case "taro":
      return (
        <g transform={`rotate(${jitter * 4} ${x} ${y})`}>
          <rect x={x - 8} y={y - 8} width="16" height="16" rx="4.5" fill="#c3a3df" stroke={INK} strokeWidth={sw} />
          <path d={`M${x - 4} ${y - 4}h4`} stroke="#e6d6f3" strokeWidth="2.6" strokeLinecap="round" />
        </g>
      );
    case "aloe":
      return (
        <g transform={`rotate(${jitter * 5} ${x} ${y})`}>
          <rect x={x - 7} y={y - 7} width="14" height="14" rx="4" fill="#e3f1cf" fillOpacity=".85" stroke={INK} strokeOpacity=".6" strokeWidth={sw} />
          <path d={`M${x - 3.5} ${y - 3.5}h3`} stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      );
    case "grape":
      return (
        <g>
          <circle cx={x} cy={y} r="6.5" fill="#9d6fc3" stroke={INK} strokeWidth={sw} />
          <ellipse cx={x - 2} cy={y - 2.4} rx="1.8" ry="1.2" fill="#fff" opacity=".55" />
        </g>
      );
    default:
      return null;
  }
}

function OrangeSlice({ x, y, r, w }: { x: number; y: number; r: number; w: number }) {
  const spokes = [0, 60, 120, 180, 240, 300].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return `M${x} ${y}L${(x + Math.cos(rad) * 13).toFixed(1)} ${(y + Math.sin(rad) * 13).toFixed(1)}`;
  });
  return (
    <g transform={`rotate(${r} ${x} ${y})`}>
      <ellipse cx={x} cy={y} rx="19" ry="17" fill="#ffad4a" stroke={INK} strokeWidth={1.8 * w} />
      <ellipse cx={x} cy={y} rx="14.5" ry="13" fill="#ffe0a3" />
      <path d={spokes.join("")} stroke="#f6a542" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

/**
 * Draw ingredients. `all` is every inclusion in the drink (base + toppings) so bottom
 * ingredients stack in a stable order; `show` is the subset to draw in this layer.
 */
export function Inclusions({ show, all, w = 1 }: { show: Inclusion[]; all?: Inclusion[]; w?: number }) {
  const every = [...new Set(all ?? show)];
  const bottom = every.filter((k) => BOTTOM_KINDS.includes(k));
  let i = 0;
  return (
    <g>
      {bottom.map((kind, slot) =>
        show.includes(kind)
          ? (SLOT_ROWS[slot] ?? SLOT_ROWS[2]).flatMap((y, row) =>
              rowXs(y, SIZE[kind], kind === "boba" ? 1.5 : 5).map((x, n) => {
                i++;
                const dy = ((n * 13 + row * 7) % 5) - 2;
                return <Piece key={`${kind}-${row}-${n}`} kind={kind} x={x} y={y + dy} w={w} i={i} />;
              }),
            )
          : null,
      )}
      {show.includes("aloe") &&
        [
          [60, 196],
          [160, 186],
          [70, 220],
          [150, 216],
          [62, 172],
        ].map(([x, y], n) => <Piece key={`aloe-${n}`} kind="aloe" x={x} y={y} w={w} i={n} />)}
      {show.includes("grape") &&
        [
          [62, 200],
          [156, 190],
          [74, 226],
          [146, 224],
          [110, 236],
          [64, 176],
        ].map(([x, y], n) => <Piece key={`grape-${n}`} kind="grape" x={x} y={y} w={w} i={n} />)}
      {show.includes("orange") && (
        <>
          <OrangeSlice x={66} y={146} r={-18} w={w} />
          <OrangeSlice x={154} y={226} r={22} w={w} />
          <OrangeSlice x={72} y={232} r={8} w={w} />
        </>
      )}
    </g>
  );
}

/* ───────────────────────── front: grain, outline, lid ───────────────────────── */

export function CupFront({ lid = true, w = 1, grain = true }: { lid?: boolean; w?: number; grain?: boolean }) {
  return (
    <g>
      {grain && <rect x="30" y="70" width="160" height="210" fill="#fff" clipPath="url(#mm-cup-inside)" filter="url(#mm-grain)" />}
      {/* soft glass highlight */}
      <path d="M50 104C53 150 59 204 66 238" stroke="#fff" strokeWidth={6} strokeLinecap="round" opacity=".45" fill="none" />
      <path d={CUP_OUTLINE} fill="none" {...line(w)} />
      {lid && (
        <g>
          <path d={LID} fill="#fffaf0" {...line(w)} />
          <path d="M34 66Q110 70 186 66" fill="none" stroke={INK} strokeOpacity=".35" strokeWidth={1.6 * w} strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

/* ───────────────────────── tops ───────────────────────── */

/** Creamy Float Topping (smooth cream cap with cloud-like drips) or Crème Brûlée top. */
export function TopCapArt({ kind, w = 1 }: { kind: TopCap; w?: number }) {
  if (kind === "float")
    return (
      <g>
        <path
          d="M26 80C24 58 58 40 110 40C162 40 196 58 194 80L194 86Q194 96 186 96Q178 96 177 106Q176 118 169 118Q162 118 162 106Q162 98 152 98L122 98Q114 98 114 108Q114 126 106 126Q98 126 98 108Q98 98 90 98L70 98Q62 98 62 106Q62 114 56 114Q50 114 50 106Q50 98 40 98Q26 98 26 88Z"
          fill="#fff8ea"
          {...line(w)}
        />
        <path d="M38 88Q110 98 182 88" fill="none" stroke="#ecdcbd" strokeWidth="5" strokeLinecap="round" opacity=".9" />
        <path d="M58 58Q78 47 104 46" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".9" />
      </g>
    );
  if (kind === "brulee")
    return (
      <g>
        <path d="M24 82C22 66 52 56 110 56C168 56 198 66 196 82Q196 102 178 102L42 102Q24 102 24 82Z" fill="#fae7b6" {...line(w)} />
        <path d="M36 96Q110 104 184 96" fill="none" stroke="#ead08f" strokeWidth="4" strokeLinecap="round" />
        <path d="M28 76C30 60 68 50 110 50C152 50 190 60 192 76C168 86 52 86 28 76Z" fill="#dc9140" {...line(w, 2.6)} />
        {/* torched spots */}
        <g fill="#a85b20" opacity=".85">
          <ellipse cx="70" cy="70" rx="11" ry="4" />
          <ellipse cx="120" cy="63" rx="14" ry="4.5" />
          <ellipse cx="152" cy="72" rx="9" ry="3.4" />
        </g>
        <g fill="#7b3f17">
          <ellipse cx="96" cy="74" rx="6" ry="2.4" />
          <ellipse cx="172" cy="67" rx="4" ry="1.8" />
          <ellipse cx="48" cy="72" rx="4" ry="1.6" />
        </g>
        <ellipse cx="88" cy="60" rx="12" ry="3" fill="#f4b964" />
        <path d="M60 61Q86 53 112 54" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" opacity=".6" />
      </g>
    );
  return null;
}

/* ───────────────────────── sticker ───────────────────────── */

export type StickerMode = "brand" | "custom" | "logo" | "mini" | "none";

/** Upright sticker centred on the front of the cup. Derived from the MolaMola logo: fish + "mola mola". */
export function StickerArt({
  mode = "brand",
  label = "mola mola",
  accent = C.pinkDeep,
  w = 1,
}: {
  mode?: StickerMode;
  label?: string;
  accent?: string;
  w?: number;
}) {
  if (mode === "none") return null;
  const ring = Math.min(w, 2.2);
  const cx = 110;
  const cy = 172;
  const accentStyle: CSSProperties = { stroke: accent, transition: "stroke .5s ease" };
  return (
    <g>
      <circle cx={cx} cy={cy} r={mode === "mini" ? 34 : 40} fill="#fff" stroke={INK} strokeWidth={2.4 * ring} />
      {mode !== "mini" && <circle cx={cx} cy={cy} r="35" fill="none" strokeWidth="1.6" strokeDasharray="3 4" style={accentStyle} />}
      {mode === "logo" ? (
        <g>
          <rect x={cx - 21} y={cy - 15} width="42" height="30" rx="9" fill={C.blue} stroke={INK} strokeWidth="2" />
          <text x={cx} y={cy + 4} textAnchor="middle" fill={INK} style={{ font: "800 11px var(--font-display)", letterSpacing: "0.04em" }}>
            LOGO
          </text>
        </g>
      ) : mode === "mini" ? (
        <g transform={`translate(${cx - 360 * 0.075} ${cy - 360 * 0.075}) scale(.075)`}>
          <MascotArt bubbles={false} />
        </g>
      ) : (
        <>
          <g transform={`translate(${cx - 360 * 0.05} ${cy - 13 - 350 * 0.05}) scale(.05)`}>
            <MascotArt bubbles={false} />
          </g>
          {mode === "brand" ? (
            <text fill={INK} style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: 14 }}>
              <tspan x={cx - 9} y={cy + 16} textAnchor="middle">
                mola
              </tspan>
              <tspan x={cx + 9} y={cy + 28} textAnchor="middle">
                mola
              </tspan>
            </text>
          ) : (
            <text x={cx} y={cy + 23} textAnchor="middle" fill={INK} style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: label.length > 10 ? 11.5 : 14 }}>
              {label}
            </text>
          )}
        </>
      )}
    </g>
  );
}

/* ───────────────────────── static drink ───────────────────────── */

/**
 * A complete, static MolaMola drink. Use for icons, previews and illustrations.
 * `w` thickens outlines for small sizes (≈2.4 for 44px icons, ≈4.5 inside 120-unit illustrations).
 */
export function DrinkArt({
  recipe,
  extras = [],
  sticker = "brand",
  w = 1,
  detail = "full",
  straw = C.pink,
}: {
  recipe: DrinkRecipe;
  extras?: Inclusion[];
  sticker?: StickerMode;
  w?: number;
  detail?: "full" | "mini";
  straw?: string;
}) {
  const top = recipe.top ?? "none";
  const all = [...(recipe.inclusions ?? []), ...extras];
  return (
    <g filter={hand("cup")}>
      <CupBack straw={straw} showStraw={top === "none"} w={w} />
      <g clipPath="url(#mm-cup-inside)">
        <LiquidLayers layers={recipe.layers} />
        {recipe.streaks && <Streaks detail={detail} />}
        <Inclusions show={all} all={all} w={w} />
        {recipe.ice && <IceCubes detail={detail} w={w} />}
      </g>
      <CupFront lid={top === "none"} w={w} grain={detail === "full"} />
      <TopCapArt kind={top} w={w} />
      <StickerArt mode={sticker} w={w} />
    </g>
  );
}

/** Standalone SVG wrapper around DrinkArt. */
export function MiniDrink({
  recipe,
  extras,
  className = "h-16 w-12",
  sticker = "mini",
  w = 2.4,
  title,
}: {
  recipe: DrinkRecipe;
  extras?: Inclusion[];
  className?: string;
  sticker?: StickerMode;
  w?: number;
  title?: string;
}) {
  return (
    <svg viewBox={CUP_VIEWBOX} className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} overflow="visible">
      {title && <title>{title}</title>}
      <DrinkArt recipe={recipe} extras={extras} sticker={sticker} w={w} detail={w > 1.5 ? "mini" : "full"} />
    </svg>
  );
}
