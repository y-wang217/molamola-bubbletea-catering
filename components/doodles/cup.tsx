"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { useEffect, useId } from "react";
import type { ToppingKind } from "@/content/drinks";
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
  label?: string;
  className?: string;
  title?: string;
};

const BOBA: [number, number][] = [
  [78, 266], [94, 268], [110, 269], [126, 268], [142, 265],
  [86, 252], [102, 254], [118, 254], [134, 251], [72, 252], [148, 251], [110, 240],
];
const ALOE: [number, number, number][] = [
  [80, 236, -12], [104, 228, 8], [128, 238, 18], [146, 222, -6], [92, 214, 22],
];

/** Layered takeaway cup. Every layer is driven by a motion value so it can follow scroll or state. */
export function Cup({ layers, liquid = "#d9a77c", toppingKinds = ["boba"], label = "MolaMola", className = "w-full", title = "A MolaMola drink" }: CupProps) {
  const teaY = useTransform(layers.tea, (v) => (1 - v) * 200);
  const iceY = useTransform(layers.ice, (v) => (1 - v) * -90);
  const topY = useTransform(layers.toppings, (v) => (1 - v) * -120);
  const stickerScale = useTransform(layers.sticker, [0, 1], [0.4, 1]);
  const stickerRotate = useTransform(layers.sticker, [0, 1], [-40, -8]);
  const has = (k: ToppingKind) => toppingKinds.includes(k);
  const clipId = `cup-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg viewBox="0 0 220 300" role="img" className={className} overflow="visible">
      <title>{title}</title>
      <defs>
        <clipPath id={clipId}>
          <path d="M39 78 L62 270 Q64 279 73 279 L147 279 Q156 279 158 270 L181 78 Z" />
        </clipPath>
      </defs>

      {/* straw (behind the cup) */}
      <g {...stroke} strokeWidth={3}>
        <path fill={C.pink} d="M114 104 L134 4 L150 7 L130 107 Z" />
        <path fill="none" stroke="#fff" strokeWidth={3} d="M139 18 L132 52" opacity=".7" />
      </g>

      {/* cup body */}
      <path fill={C.paper} opacity=".72" d="M36 74 L60 272 Q62 282 72 282 L148 282 Q158 282 160 272 L184 74 Z" />

      <g clipPath={`url(#${clipId})`}>
        {/* tea + milk rise together */}
        <motion.g style={{ y: teaY }}>
          <path
            d="M0 100 q 27.5 -9 55 0 t 55 0 t 55 0 t 55 0 V 320 H0 Z"
            style={{ fill: liquid, transition: "fill .6s ease" }}
          />
          <motion.g style={{ opacity: layers.milk }} fill="#fff">
            <path d="M48 128 c 22 -10 40 12 64 2 s 40 -14 60 0 l 0 14 c -22 -8 -40 12 -62 4 s -42 -6 -62 -2 Z" fillOpacity=".55" />
            <path d="M60 170 c 18 -8 30 8 50 2 s 34 -10 50 0 l -2 10 c -18 -6 -32 8 -50 2 s -32 -4 -48 0 Z" fillOpacity=".4" />
          </motion.g>
        </motion.g>

        {/* ice */}
        <motion.g style={{ y: iceY, opacity: layers.ice }} {...stroke} strokeWidth={2}>
          <rect x="62" y="104" width="34" height="32" rx="7" fill="#fff" fillOpacity=".55" transform="rotate(-12 79 120)" />
          <rect x="108" y="98" width="34" height="32" rx="7" fill="#fff" fillOpacity=".55" transform="rotate(10 125 114)" />
          <rect x="128" y="138" width="30" height="28" rx="6" fill="#fff" fillOpacity=".5" transform="rotate(-6 143 152)" />
          <path fill="none" stroke="#fff" strokeWidth={2.5} d="M70 112 l8 -2 M114 106 l8 2" />
        </motion.g>

        {/* toppings */}
        <motion.g style={{ y: topY, opacity: layers.toppings }}>
          {has("pudding") && (
            <g {...stroke} strokeWidth={2.2}>
              <rect x="70" y="244" width="80" height="34" rx="12" fill="#f6dc8e" />
              <path fill="#d9a066" d="M74 252 q 36 -12 72 0 q -36 8 -72 0 Z" />
            </g>
          )}
          {has("boba") &&
            BOBA.map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="8" fill={C.boba} stroke={C.ink} strokeWidth={1.6} />
                <circle cx={x - 2.5} cy={y - 2.5} r="2" fill="#fff" opacity=".6" />
              </g>
            ))}
          {has("aloe") &&
            ALOE.map(([x, y, r], i) => (
              <rect key={i} x={x - 7} y={y - 7} width="14" height="14" rx="3.5" fill="#e3f0d2" fillOpacity=".85" stroke={C.ink} strokeWidth={1.5} transform={`rotate(${r} ${x} ${y})`} />
            ))}
          {has("fruit") && (
            <g {...stroke} strokeWidth={2}>
              <path fill="#f49aa6" d="M70 184 c -4 -14 8 -22 18 -16 c 8 6 6 18 -4 22 c -6 2 -12 0 -14 -6 Z" />
              <circle cx="140" cy="196" r="13" fill={C.butter} />
              <circle cx="140" cy="196" r="8.5" fill="#fff6cf" strokeWidth={1.3} />
              <path fill="#f49aa6" d="M112 210 c -6 -10 4 -18 12 -14 c 8 4 6 14 -2 18 c -4 2 -8 0 -10 -4 Z" />
            </g>
          )}
          {has("float") && (
            <path
              {...stroke}
              strokeWidth={2.2}
              fill={C.paper}
              d="M36 78 H184 V112 q -12 10 -24 2 q -12 10 -26 2 q -12 10 -26 2 q -12 10 -26 2 q -12 10 -24 2 q -10 8 -22 0 Z"
            />
          )}
        </motion.g>
      </g>

      {/* outline + glare */}
      <path {...stroke} strokeWidth={3.2} fill="none" d="M36 74 L60 272 Q62 282 72 282 L148 282 Q158 282 160 272 L184 74 Z" />
      <path fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" d="M52 102 L70 252" opacity=".7" />

      {/* lid */}
      <rect {...stroke} strokeWidth={3.2} x="26" y="60" width="168" height="18" rx="9" fill={C.paper} />

      {/* sticker */}
      <motion.g style={{ opacity: layers.sticker, scale: stickerScale, rotate: stickerRotate }}>
        <circle cx="110" cy="190" r="38" fill="#fff" {...stroke} strokeWidth={2.6} />
        <circle cx="110" cy="190" r="31" fill="none" stroke={C.pinkDeep} strokeWidth={1.6} strokeDasharray="3 4" />
        {/* mini fish */}
        <g transform="translate(91 165) scale(.19)" {...stroke} strokeWidth={10}>
          <path fill={C.blueDeep} d="M96 54c-5-20 1-44 15-47 13 1 14 26 8 49Z" />
          <path fill={C.blueDeep} d="M96 146c-5 20 1 44 15 47 13-1 14-26 8-49Z" />
          <path fill={C.blue} d="M150 64c14 1 22 10 18 18 9 3 10 13 3 18 7 5 6 15-3 18 4 8-4 17-18 18Z" />
          <path fill={C.blue} d="M38 100c0-36 30-56 72-55 34 1 52 22 52 55s-18 54-52 55c-42 1-72-19-72-55Z" />
          <circle cx="72" cy="91" r="9" fill={C.ink} stroke="none" />
          <ellipse cx="74" cy="116" rx="10" ry="5" fill={C.pink} stroke="none" />
        </g>
        <text x="110" y="214" textAnchor="middle" fill={C.ink} style={{ fontFamily: "var(--font-hand)", fontSize: label.length > 12 ? 13 : 16, fontWeight: 700 }}>
          {label}
        </text>
      </motion.g>
    </svg>
  );
}
