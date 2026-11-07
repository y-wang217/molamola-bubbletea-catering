import { C, stroke } from "./palette";

/**
 * The MolaMola fish (an ocean sunfish): round body, tall fins, scalloped tail.
 * `float` adds a gentle idle bob (auto-disabled for reduced motion).
 */
export function Mascot({ className = "h-32 w-32", float = false, title = "MolaMola the sunfish" }: { className?: string; float?: boolean; title?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={`${float ? "animate-float" : ""} ${className}`}
      overflow="visible"
    >
      {title && <title>{title}</title>}
      <g {...stroke} strokeWidth={3.2}>
        {/* fins */}
        <path fill={C.blueDeep} d="M96 54c-5-20 1-44 15-47 13 1 14 26 8 49Z" />
        <path fill={C.blueDeep} d="M96 146c-5 20 1 44 15 47 13-1 14-26 8-49Z" />
        {/* tail (clavus) */}
        <path fill={C.blue} d="M150 64c14 1 22 10 18 18 9 3 10 13 3 18 7 5 6 15-3 18 4 8-4 17-18 18Z" />
        {/* body */}
        <path fill={C.blue} d="M38 100c0-36 30-56 72-55 34 1 52 22 52 55s-18 54-52 55c-42 1-72-19-72-55Z" />
        {/* belly shine */}
        <path fill="none" stroke="#fff" strokeWidth={4} d="M60 66c8-8 20-12 32-12" opacity=".8" />
        {/* spots */}
        <g fill={C.blueDeep} stroke="none">
          <circle cx="122" cy="74" r="4" />
          <circle cx="138" cy="92" r="3" />
          <circle cx="128" cy="128" r="3.5" />
        </g>
        {/* pectoral fin */}
        <path fill={C.paper} d="M98 104c10-12 26-10 28 1-7 9-20 12-28-1Z" />
        {/* eye */}
        <circle cx="70" cy="90" r="11" fill={C.paper} />
        <circle cx="72" cy="91" r="6" fill={C.ink} stroke="none" />
        <circle cx="69.5" cy="88" r="2" fill="#fff" stroke="none" />
        {/* blush + smile */}
        <ellipse cx="74" cy="114" rx="9" ry="4.5" fill={C.pink} stroke="none" />
        <path fill="none" d="M47 106c4 5 9 5 12 0" />
      </g>
    </svg>
  );
}
