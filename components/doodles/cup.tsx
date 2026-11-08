"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { useEffect } from "react";
import type { DrinkRecipe, Inclusion, TopCap } from "@/content/drinks";
import { hand } from "./art-defs";
import { CUP_VIEWBOX, CupBack, CupFront, IceCubes, Inclusions, LiquidLayers, StickerArt, Streaks, TopCapArt, type StickerMode } from "./drink-art";
import { C } from "./palette";

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
  recipe: DrinkRecipe;
  /** Toppings added on top of the recipe; they drop in with the "toppings" layer. */
  extras?: Inclusion[];
  /** Override the recipe's top (Creamy Float / Crème Brûlée). Appears with the "toppings" layer. */
  top?: TopCap;
  /** Text for a custom sticker (stickerMode "custom"). */
  label?: string;
  /** Straw colour (e.g. wedding colours). */
  strawColor?: string;
  /** Dashed ring colour on the sticker (e.g. wedding colours). */
  accent?: string;
  stickerMode?: Exclude<StickerMode, "mini" | "none">;
  className?: string;
  title?: string;
};

/**
 * Animated MolaMola cup. Static art (straw, glass, outline, lid) sits on its own layers so the
 * hand-drawn filter is painted once; the drink, ice, toppings, top and sticker animate.
 *
 *   tea      → drink rises into the cup
 *   milk     → brown sugar streaks fade in
 *   ice      → ice drops in
 *   toppings → extra ingredients + top cap drop in
 *   sticker  → MolaMola sticker pops on
 */
export function Cup({
  layers,
  recipe,
  extras = [],
  top,
  label = "mola mola",
  strawColor = C.pink,
  accent = C.pinkDeep,
  stickerMode = "brand",
  className = "w-full",
  title = "A MolaMola drink",
}: CupProps) {
  const teaY = useTransform(layers.tea, (v) => (1 - v) * 185);
  const iceY = useTransform(layers.ice, (v) => (1 - v) * -90);
  const topY = useTransform(layers.toppings, (v) => (1 - v) * -120);
  const capY = useTransform(layers.toppings, (v) => (1 - v) * -36);
  const stickerScale = useTransform(layers.sticker, [0, 1], [0.5, 1]);
  const stickerRotate = useTransform(layers.sticker, [0, 1], [-14, 0]);

  const cap = top ?? recipe.top ?? "none";
  const base = recipe.inclusions ?? [];
  const all = [...base, ...extras];
  const layer = "absolute inset-0 h-full w-full";

  return (
    <div role="img" aria-label={title} className={`relative ${className}`}>
      {/* back: straw + glass (static) */}
      <svg viewBox={CUP_VIEWBOX} aria-hidden className="block h-auto w-full [will-change:transform]" overflow="visible">
        <g filter={hand("cup")}>
          <CupBack straw={strawColor} showStraw={cap === "none"} />
        </g>
      </svg>

      {/* the drink (animated) */}
      <svg viewBox={CUP_VIEWBOX} aria-hidden className={layer} overflow="visible">
        <g clipPath="url(#mm-cup-inside)">
          <motion.g style={{ y: teaY }}>
            <g style={{ transition: "opacity .4s ease" }}>
              <LiquidLayers layers={recipe.layers} />
            </g>
            {recipe.streaks && (
              <motion.g style={{ opacity: layers.milk }}>
                <Streaks />
              </motion.g>
            )}
            <Inclusions show={base} all={all} />
          </motion.g>
          <motion.g style={{ y: topY, opacity: layers.toppings }}>
            <Inclusions show={extras} all={all} />
          </motion.g>
          {recipe.ice && (
            <motion.g style={{ y: iceY, opacity: layers.ice }}>
              <IceCubes />
            </motion.g>
          )}
        </g>
      </svg>

      {/* front: grain, outline, lid (static) */}
      <svg viewBox={CUP_VIEWBOX} aria-hidden className={`${layer} [will-change:transform]`} overflow="visible">
        <g filter={hand("cup")}>
          <CupFront lid={cap === "none"} />
        </g>
      </svg>

      {/* Creamy Float / Crème Brûlée top */}
      {cap !== "none" && (
        <svg viewBox={CUP_VIEWBOX} aria-hidden className={layer} overflow="visible">
          <motion.g style={{ y: capY, opacity: layers.toppings }}>
            <g filter={hand("cup")}>
              <TopCapArt kind={cap} />
            </g>
          </motion.g>
        </svg>
      )}

      {/* sticker: upright, centred on the front */}
      <svg viewBox={CUP_VIEWBOX} aria-hidden className={layer} overflow="visible">
        <motion.g style={{ opacity: layers.sticker, scale: stickerScale, rotate: stickerRotate, transformOrigin: "110px 170px", transformBox: "view-box" }}>
          <StickerArt mode={stickerMode} label={label} accent={accent} />
        </motion.g>
      </svg>
    </div>
  );
}
