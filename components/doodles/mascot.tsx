import { C } from "./palette";

/**
 * The MolaMola fish, drawn to match the brand logo: round body, front-facing dot eyes,
 * kissy "ε" mouth, little wing fins, one tall dorsal fin, scalloped tail and bubbles.
 * Coordinates live in a 700×730 space so the line weight matches the logo.
 */
export function MascotArt({ tone = "color", bubbles = true }: { tone?: "color" | "line"; bubbles?: boolean }) {
  const body = tone === "color" ? C.mascotBody : "#fff";
  const fin = tone === "color" ? C.mascotFin : "#fff";
  const wing = tone === "color" ? C.mascotWing : "#fff";
  return (
    <g stroke={C.ink} strokeWidth={15} strokeLinecap="round" strokeLinejoin="round">
      {/* dorsal fin (behind body) */}
      <path fill={fin} d="M452 168C468 116 494 62 524 40c20-12 31 2 28 32-2 34-4 70-2 108Z" />
      {/* body + scalloped tail + bottom fin */}
      <path
        fill={body}
        d="M175 205C260 152 420 142 520 166c50 12 90 42 105 79Q662 268 640 300Q676 330 650 360Q682 392 648 420Q672 452 632 478Q650 515 600 530Q600 565 560 565C530 570 500 572 485 576C470 620 470 680 450 690C430 698 410 650 398 578C330 580 230 580 175 545C110 500 95 420 105 340C112 280 135 235 175 205Z"
      />
      {/* tail line */}
      <path fill="none" strokeWidth={11} d="M556 260C576 332 569 440 529 515" />
      {/* left wing */}
      <path fill={wing} d="M108 335C80 315 45 318 42 345c-2 15 10 23 18 25-15 8-15 28 2 30-10 12 0 30 20 25 10 5 20 7 28 5" />
      <path fill="none" strokeWidth={10} d="M62 371c10 2 18 3 26 0M64 400c9 2 17 1 25-3" />
      {/* right wing (on the body) */}
      <path
        fill={wing}
        d="M380 398c2-36 32-72 66-75 25-1 30 22 10 33 22 4 20 30-3 30 18 10 10 33-14 27-8 20-33 28-48 18"
      />
      {/* eyes */}
      <circle cx="172" cy="318" r="27" fill={C.ink} stroke="none" />
      <circle cx="292" cy="326" r="27" fill={C.ink} stroke="none" />
      {/* blush */}
      <ellipse cx="132" cy="368" rx="16" ry="8" fill={tone === "color" ? C.pink : "#fff"} strokeWidth={6} />
      <ellipse cx="334" cy="374" rx="16" ry="8" fill={tone === "color" ? C.pink : "#fff"} strokeWidth={6} />
      {/* kissy mouth */}
      <path fill="none" strokeWidth={11} d="M224 371c-17 0-17 20-4 21-15 2-13 26 7 22" />
      {bubbles && (
        <g fill="none" strokeWidth={8}>
          <circle cx="104" cy="208" r="13" />
          <circle cx="116" cy="160" r="6" />
        </g>
      )}
    </g>
  );
}

export function Mascot({
  className = "h-32 w-32",
  float = false,
  tone = "color",
  bubbles = true,
  title = "The MolaMola fish",
}: {
  className?: string;
  float?: boolean;
  tone?: "color" | "line";
  bubbles?: boolean;
  title?: string;
}) {
  return (
    <svg
      viewBox="20 10 680 700"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={`${float ? "animate-float" : ""} ${className}`}
      overflow="visible"
    >
      {title && <title>{title}</title>}
      <MascotArt tone={tone} bubbles={bubbles} />
    </svg>
  );
}
