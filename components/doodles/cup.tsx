"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { useEffect, useId } from "react";
import type { ToppingKind } from "@/content/drinks";
import { hand } from "./art-defs";
import { MascotArt } from "./mascot";
import { C, stroke } from "./palette";

export type CupLayerKey = "tea" | "milk" | "ice" | "toppings" | "sticker";
export type CupLayers = Record<CupLayerKey, MotionValue<number>>;

/**
 * Motion values for each cup layer (0 = hidden, 1 = fully in), springing to `targets`
 * whenever they change. Reduced motion jumps straight to the target.
 */
export function useCupLayers(targets: Partial<Record<CupLayerKey, number>>): CupLayers {
  const reduce = useReducedMotion();
  const layers: CupLayers = {
    tea: useMotionValue(targets.tea ?? 0),
    milk: useMotionValue(targets.milk ?? 0),
    ice: useMotionValue(targets.ice ?? 0),
    toppings: useMotionValue(targets.toppings ?? 0),
    sticker: useMotionValue(targets.sticker ?? 0),
  };
  const key = JSON.stringify(targets);
  useEffect(() => {
    const controls = (Object.keys(layers) as CupLayerKey[]).map((k) => {
      const to = targets[k] ?? 0;
      if (reduce) {
        layers[k].set(to);
        return null;
      }
      return animate(layers[k], to, { type: "spring", stiffness: 90, damping: 16 });
    });
    return () => controls.forEach((c) => c?.stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, reduce]);
  return layers;
}

type CupProps = {
  layers: CupLayers;
  liquid?: string;
  toppingKinds?: ToppingKind[];
  /** Text for a custom sticker (only used when stickerMode is "custom"). */
  label?: string;
  /** Straw colour (e.g. wedding colours). */
  strawColor?: string;
  /** Outline colour of the sticker (e.g. wedding colours). */
  accent?: string;
  /**
   * "brand"  = the real MolaMola colour logo as the cup sticker (default)
   * "custom" = a custom name sticker with the line-art fish from the logo
   * "logo"   = corporate logo placeholder
   */
  stickerMode?: "brand" | "custom" | "logo" | "mascot";
  className?: string;
  title?: string;
};

// Hand-placed, slightly uneven, like they were dropped in.
const BOBA: [number, number][] = [
  [77, 265], [93, 268], [109, 266], [125, 269], [141, 264],
  [85, 252], [101, 253], [117, 251], [133, 254], [148, 249], [70, 250], [109, 239],
];
const ALOE: [number, number, number][] = [
  [80, 236, -12], [104, 228, 8], [128, 238, 18], [146, 222, -6], [92, 214, 22],
];

// Gently uneven cup shape (drawn, not ruled).
const CUP_OUTLINE = "M36 74C43 140 51 210 60 268Q62 281 74 281L147 282Q157 281 159 269C168 210 176 142 184 74";
const CUP_BODY = "M36 74C43 140 51 210 60 268Q62 281 74 281L147 282Q157 281 159 269C168 210 176 142 184 74Z";
const CUP_INSIDE = "M40 79C47 142 55 210 63 266Q65 277 75 277L146 278Q154 277 156 266C164 210 172 144 180 79Z";
const LID = "M27 63Q26 76 37 77L185 76Q195 75 194 63Q193 55 183 56L37 57Q27 57 27 63Z";

/**
 * Layered takeaway cup in the MolaMola hand-drawn style. Every layer is driven by a motion
 * value so it can follow scroll or state. Static art (straw, cup, outline, lid, grain) sits
 * on its own layers so the hand-drawn filter is painted once, not on every animation frame.
 */
export function Cup({
  layers,
  liquid = "#d9a77c",
  toppingKinds = ["boba"],
  label = "mola mola",
  strawColor = C.pink,
  accent = C.pinkDeep,
  stickerMode = "brand",
  className = "w-full",
  title = "A MolaMola drink",
}: CupProps) {
  const teaY = useTransform(layers.tea, (v) => (1 - v) * 205);
  const iceY = useTransform(layers.ice, (v) => (1 - v) * -90);
  const topY = useTransform(layers.toppings, (v) => (1 - v) * -120);
  const stickerScale = useTransform(layers.sticker, [0, 1], [0.4, 1]);
  const stickerRotate = useTransform(layers.sticker, [0, 1], [-40, -7]);
  const has = (k: ToppingKind) => toppingKinds.includes(k);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const mode = stickerMode === "mascot" ? "brand" : stickerMode;
  const layer = "absolute inset-0 h-full w-full";

  return (
    <div role="img" aria-label={title} className={`relative ${className}`}>
      {/* back: straw + cup body (static, hand-drawn filter) */}
      <svg viewBox="0 0 220 300" aria-hidden className="block h-auto w-full [will-change:transform]" overflow="visible">
        <g filter={hand("cup")} {...stroke} strokeWidth={3}>
          <path d="M113 104 L132 4 Q141 1 149 6 L129 107 Z" style={{ fill: strawColor, transition: "fill .5s ease" }} />
          <path fill={C.paper} stroke="none" opacity=".8" d={CUP_BODY} />
        </g>
      </svg>

      {/* middle: the drink itself (animated) */}
      <svg viewBox="0 0 220 300" aria-hidden className={layer} overflow="visible">
        <defs>
          <clipPath id={`in-${uid}`}>
            <path d={CUP_INSIDE} />
          </clipPath>
        </defs>
        <g clipPath={`url(#in-${uid})`}>
          <motion.g style={{ y: teaY }}>
            <path d="M0 98q30-8 58-1t58 0 58-1 58 2V330H0Z" style={{ fill: liquid, transition: "fill .6s ease" }} />
            {/* soft lighter band at the top, like a watercolour wash */}
            <path d="M0 98q30-8 58-1t58 0 58-1 58 2v26q-30 6-58 1t-58 0-58 1-58-2Z" fill="#fff" opacity=".22" />
            <motion.path style={{ opacity: layers.milk }} fill="#fff" fillOpacity=".38" d="M46 150c22-9 38 9 62 2s40-12 62-1v13c-22-8-40 10-62 3s-40-6-62 0Z" />
          </motion.g>

          <motion.g style={{ y: iceY, opacity: layers.ice }} {...stroke} strokeWidth={2}>
            <rect x="62" y="104" width="33" height="31" rx="8" fill="#e6f3ff" fillOpacity=".85" transform="rotate(-12 79 120)" />
            <rect x="108" y="98" width="33" height="31" rx="8" fill="#e6f3ff" fillOpacity=".85" transform="rotate(9 125 114)" />
            <rect x="128" y="138" width="29" height="27" rx="7" fill="#e6f3ff" fillOpacity=".8" transform="rotate(-6 143 152)" />
          </motion.g>

          <motion.g style={{ y: topY, opacity: layers.toppings }}>
            {has("pudding") && (
              <g {...stroke} strokeWidth={2.2}>
                <rect x="70" y="244" width="80" height="34" rx="13" fill="#f8e09a" />
                <path fill="#dca56c" d="M74 252q36-12 72 0q-36 8-72 0Z" />
              </g>
            )}
            {has("boba") &&
              BOBA.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="7.6" fill={C.boba} stroke={C.ink} strokeWidth={1.4} />)}
            {has("aloe") &&
              ALOE.map(([x, y, r], i) => (
                <rect key={i} x={x - 7} y={y - 7} width="14" height="14" rx="4" fill="#e4f1d4" fillOpacity=".9" stroke={C.ink} strokeWidth={1.4} transform={`rotate(${r} ${x} ${y})`} />
              ))}
            {has("fruit") && (
              <g {...stroke} strokeWidth={2}>
                <path fill="#f6a3b0" d="M70 184c-4-14 8-22 18-16 8 6 6 18-4 22-6 2-12 0-14-6Z" />
                <circle cx="140" cy="196" r="13" fill={C.butter} />
                <path fill="none" strokeWidth={1.4} d="M140 185v22M129 196h22" />
                <path fill="#f6a3b0" d="M112 210c-6-10 4-18 12-14 8 4 6 14-2 18-4 2-8 0-10-4Z" />
              </g>
            )}
            {has("float") && (
              <path {...stroke} strokeWidth={2.2} fill={C.paper} d="M36 78H184V110q-12 10-24 2q-12 10-26 2q-12 10-26 2q-12 10-26 2q-12 10-24 2q-10 8-22 0Z" />
            )}
          </motion.g>
        </g>
      </svg>

      {/* top: outline, lid and paper grain (static, hand-drawn filter) */}
      <svg viewBox="0 0 220 300" aria-hidden className={`${layer} [will-change:transform]`} overflow="visible">
        <defs>
          <clipPath id={`grain-${uid}`}>
            <path d={CUP_INSIDE} />
          </clipPath>
        </defs>
        <rect x="30" y="70" width="160" height="215" fill="#fff" clipPath={`url(#grain-${uid})`} filter="url(#mm-grain)" />
        <g filter={hand("cup")} {...stroke} strokeWidth={3.2}>
          <path fill="none" d={CUP_OUTLINE} />
          <path fill="#fff6e4" d={LID} />
          <path fill="none" strokeWidth={1.6} opacity=".5" d="M40 66q72 3 140-1" />
        </g>
      </svg>

      {/* sticker */}
      <svg viewBox="0 0 220 300" aria-hidden className={layer} overflow="visible">
        <motion.g style={{ opacity: layers.sticker, scale: stickerScale, rotate: stickerRotate }}>
          {mode === "brand" ? (
            <>
              <path
                fill="#fff"
                d="M110 152c24 0 43 17 43 39s-19 40-43 40-43-17-43-40 19-39 43-39Z"
                stroke={C.ink}
                strokeWidth={2.2}
                style={{ stroke: accent === C.pinkDeep ? C.ink : accent, transition: "stroke .5s ease" }}
              />
              <image href="/brand/molamola-sticker.png" x="72" y="160" width="76" height="64" preserveAspectRatio="xMidYMid meet" />
            </>
          ) : (
            <>
              <circle cx="110" cy="190" r="38" fill="#fff" {...stroke} strokeWidth={2.4} />
              <circle cx="110" cy="190" r="31" fill="none" strokeWidth={1.6} strokeDasharray="3 4" style={{ stroke: accent, transition: "stroke .5s ease" }} />
              {mode === "custom" ? (
                <>
                  <g transform="translate(91 157) scale(.055)">
                    <MascotArt tone="line" bubbles={false} />
                  </g>
                  <text x="110" y="214" textAnchor="middle" fill={C.ink} style={{ fontFamily: "var(--font-hand)", fontSize: label.length > 12 ? 13 : 16, fontWeight: 700 }}>
                    {label}
                  </text>
                </>
              ) : (
                <g>
                  <rect x="88" y="173" width="44" height="34" rx="9" fill={C.blue} {...stroke} strokeWidth={2} />
                  <text x="110" y="195" textAnchor="middle" fill={C.ink} style={{ font: "800 11px var(--font-display)", letterSpacing: "0.04em" }}>
                    LOGO
                  </text>
                </g>
              )}
            </>
          )}
        </motion.g>
      </svg>
    </div>
  );
}
