/**
 * Shared "MolaMola hand" for every illustration: slightly wobbly ink linework, flat colour.
 * A very light paper grain (mm-grain) is used only inside drinks. Defined once in the layout.
 *
 * Filters work in each SVG's own units, so there is one per art scale:
 *   mm-hand-doodle  → 40-unit doodles
 *   mm-hand-icon    → ~56-unit ingredient icons
 *   mm-hand-illo    → 120-unit spot illustrations
 *   mm-hand-cup     → 220×300 cup
 *   mm-hand-fish    → 700-unit mascot (very subtle, keeps the character clean)
 *   mm-grain        → soft paper grain for drink fills (clip it to a shape)
 *
 * Usage: <g filter={hand("illo")}>…</g>
 */
const scales = {
  doodle: { wobbleFreq: 0.14, wobble: 0.9 },
  icon: { wobbleFreq: 0.1, wobble: 1.1 },
  illo: { wobbleFreq: 0.05, wobble: 1.8 },
  cup: { wobbleFreq: 0.03, wobble: 1.8 },
  fish: { wobbleFreq: 0.008, wobble: 3.5 },
} as const;

export type HandScale = keyof typeof scales;
export const hand = (scale: HandScale) => `url(#mm-hand-${scale})`;

export function ArtDefs() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} focusable="false">
      <defs>
        {Object.entries(scales).map(([name, s]) => (
          <filter key={name} id={`mm-hand-${name}`} x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
            {/* wobble the lines a touch; lines stay solid like ink, no texture on them */}
            <feTurbulence type="fractalNoise" baseFrequency={s.wobbleFreq} numOctaves={2} seed={4} result="wob" />
            <feDisplacementMap in="SourceGraphic" in2="wob" scale={s.wobble} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        ))}
        <filter id="mm-grain" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency={0.9} numOctaves={2} seed={12} result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 0.99  0 0 0 0 0.96  0 0 0 -2.2 1.2" result="flecks" />
          <feComposite in="flecks" in2="SourceAlpha" operator="in" result="grain" />
          <feComponentTransfer in="grain">
            <feFuncA type="linear" slope={0.16} />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
