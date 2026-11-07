"use client";

import { useId, type ReactNode } from "react";
import { toneHex, type Tone } from "@/lib/tones";

/**
 * Full-width pastel band with soft hand-drawn wavy edges.
 * Breaks up the page rhythm without boxing content into a card.
 */
export function Wash({ tone, children, className = "", id }: { tone: Tone; children: ReactNode; className?: string; id?: string }) {
  const fill = toneHex[tone];
  return (
    <section id={id} className={`relative ${className}`}>
      <svg aria-hidden viewBox="0 0 1440 40" preserveAspectRatio="none" className="block h-6 w-full sm:h-10">
        <path d="M0 40V22C120 8 240 30 380 20S640 2 790 14 1080 34 1220 18 1380 8 1440 14V40Z" fill={fill} />
      </svg>
      <div style={{ backgroundColor: fill }}>{children}</div>
      <svg aria-hidden viewBox="0 0 1440 40" preserveAspectRatio="none" className="block h-6 w-full sm:h-10">
        <path d="M0 0V18C150 34 300 10 460 20S760 38 900 24 1180 4 1300 18 1410 30 1440 24V0Z" fill={fill} />
      </svg>
    </section>
  );
}

/** Watercolour-style blob with soft uneven edges, like the washes on the MolaMola business cards. */
export function WatercolorBlob({ color, className = "", seed = 3, spots }: { color: string; className?: string; seed?: number; spots?: string }) {
  const id = `wc-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg aria-hidden viewBox="0 0 200 200" className={`pointer-events-none ${className}`} overflow="visible">
      <defs>
        <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed={seed} />
          <feDisplacementMap in="SourceGraphic" scale="16" />
        </filter>
      </defs>
      <g filter={`url(#${id})`}>
        <path fill={color} opacity=".9" d="M100 12c46 0 86 30 88 78 2 50-34 98-90 98S8 152 12 98C16 48 54 12 100 12Z" />
        <path fill="#fff" opacity=".22" d="M70 40c26-10 60-4 74 18-20-6-48-6-74-18Z" />
        {spots && (
          <>
            <circle cx="168" cy="40" r="12" fill={spots} opacity=".7" />
            <circle cx="30" cy="160" r="9" fill={spots} opacity=".6" />
            <circle cx="182" cy="150" r="6" fill={spots} opacity=".55" />
          </>
        )}
      </g>
    </svg>
  );
}
