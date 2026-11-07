import type { CSSProperties } from "react";
import { C, stroke } from "./palette";

export type DoodleKind =
  | "star"
  | "sparkle"
  | "heart"
  | "squiggle"
  | "swirl"
  | "boba"
  | "strawberry"
  | "lemon"
  | "flower"
  | "cloud"
  | "drop";

type Props = {
  kind: DoodleKind;
  className?: string;
  color?: string;
  /** Gentle idle animation. Disabled automatically for reduced motion (see globals.css). */
  motion?: "float" | "bob" | "twinkle" | "none";
  delay?: number;
  style?: CSSProperties;
};

const anim = { float: "animate-float", bob: "animate-bob", twinkle: "animate-twinkle", none: "" };

/** Small hand-drawn decorations. Purely decorative, hidden from assistive tech. */
export function DoodleDecoration({ kind, className = "h-8 w-8", color, motion = "none", delay = 0, style }: Props) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={`pointer-events-none ${anim[motion]} ${className}`}
      style={{ animationDelay: `${delay}s`, ...style }}
      overflow="visible"
    >
      <Shape kind={kind} color={color} />
    </svg>
  );
}

function Shape({ kind, color }: { kind: DoodleKind; color?: string }) {
  switch (kind) {
    case "star":
      return (
        <path
          {...stroke}
          fill={color ?? C.butter}
          d="M20 4.5c1.2 0 2 4.6 3.4 7.3 1.4 2.4 7.6 2.2 8.2 3.3.5 1.2-4.2 4.4-5.1 6.9-.8 2.4 2.1 8.6 1.2 9.4-1 .8-5.8-3-7.7-3s-6.7 3.8-7.7 3c-.9-.8 2-7 1.2-9.4-.9-2.5-5.6-5.7-5.1-6.9.6-1.1 6.8-.9 8.2-3.3C18 9.1 18.8 4.5 20 4.5Z"
        />
      );
    case "sparkle":
      return (
        <path
          {...stroke}
          fill={color ?? C.tangerine}
          d="M20 3c.9 8.6 2.6 13.4 15.5 17-12.9 3.6-14.6 8.4-15.5 17-.9-8.6-2.6-13.4-15.5-17C17.4 16.4 19.1 11.6 20 3Z"
        />
      );
    case "heart":
      return (
        <path
          {...stroke}
          fill={color ?? C.pink}
          d="M20 34.5C11 28.6 4.6 22.8 5.1 15.4 5.5 10 9.6 6.8 13.8 7.2c3 .3 5 2.3 6.2 4.6 1.3-2.4 3.4-4.4 6.4-4.6 4.4-.3 8.4 3.2 8.4 8.5 0 7.2-6.3 13-14.8 18.8Z"
        />
      );
    case "squiggle":
      return <path {...stroke} fill="none" stroke={color ?? C.ink} d="M2 22c4-8 8-8 10 0s6 8 9 0 7-8 9 0 6 6 8-2" />;
    case "swirl":
      return (
        <path
          {...stroke}
          fill="none"
          stroke={color ?? C.ink}
          d="M20 20c0-2 2.6-2.4 3.5-.6 1.3 2.6-1.4 5.6-4.4 5.2-4.4-.6-5.6-6.2-2.6-9.4 4-4.2 11.4-2.4 12.8 3.4 1.8 7.4-6 12.8-12.8 11"
        />
      );
    case "boba":
      return (
        <g {...stroke} strokeWidth={2}>
          <circle cx="13" cy="24" r="7" fill={color ?? C.boba} />
          <circle cx="27" cy="26" r="6" fill={color ?? C.boba} />
          <circle cx="21" cy="13" r="6" fill={color ?? C.boba} />
          <circle cx="11" cy="21.5" r="1.6" fill="#fff" stroke="none" opacity=".75" />
          <circle cx="25.3" cy="23.6" r="1.4" fill="#fff" stroke="none" opacity=".75" />
          <circle cx="19.3" cy="10.8" r="1.4" fill="#fff" stroke="none" opacity=".75" />
        </g>
      );
    case "strawberry":
      return (
        <g {...stroke}>
          <path fill={color ?? "#f49aa6"} d="M20 36c-7-4-12-11-11-18 .5-4 4-6 11-6s10.5 2 11 6c1 7-4 14-11 18Z" />
          <path fill={C.sageDeep} d="M13 12c2-4 4.5-5 7-4.5 2.5-.5 5 .5 7 4.5-2.4 1.6-4.6 1-7-.4-2.4 1.4-4.6 2-7 .4Z" />
          <g fill={C.ink} stroke="none">
            <circle cx="15" cy="19" r="1" />
            <circle cx="22" cy="18" r="1" />
            <circle cx="26" cy="23" r="1" />
            <circle cx="18" cy="25" r="1" />
            <circle cx="21" cy="30" r="1" />
          </g>
        </g>
      );
    case "lemon":
      return (
        <g {...stroke}>
          <circle cx="20" cy="20" r="15" fill={color ?? C.butter} />
          <circle cx="20" cy="20" r="10.5" fill="#fff6cf" strokeWidth={1.6} />
          <path strokeWidth={1.6} d="M20 9.5v21M9.5 20h21M12.6 12.6l14.8 14.8M27.4 12.6 12.6 27.4" />
        </g>
      );
    case "flower":
      return (
        <g {...stroke} fill={color ?? C.pink}>
          <circle cx="20" cy="9" r="6.5" />
          <circle cx="30.5" cy="17" r="6.5" />
          <circle cx="26.5" cy="29.5" r="6.5" />
          <circle cx="13.5" cy="29.5" r="6.5" />
          <circle cx="9.5" cy="17" r="6.5" />
          <circle cx="20" cy="20" r="5.5" fill={C.butter} />
        </g>
      );
    case "cloud":
      return (
        <path
          {...stroke}
          fill={color ?? C.paper}
          d="M9 30c-4.4 0-6.6-5.6-3-8.4-.8-5 4.8-8 8.6-5.2 1.6-5.6 9.6-6.4 12-.6 4.4-1.4 8.6 2.2 7.6 6.6 3.6 1.6 2.8 7.6-1.6 7.6H9Z"
        />
      );
    case "drop":
      return <path {...stroke} fill={color ?? C.blue} d="M20 4c6 8.4 11 14.4 11 20.4a11 11 0 0 1-22 0C9 18.4 14 12.4 20 4Z" />;
  }
}

/** Hand-drawn arrow, used for annotations. Draws left → right by default. */
export function DoodleArrow({ className = "h-10 w-20", flip = false, color = C.ink }: { className?: string; flip?: boolean; color?: string }) {
  return (
    <svg viewBox="0 0 80 50" aria-hidden="true" className={`pointer-events-none ${className}`} style={flip ? { transform: "scaleX(-1)" } : undefined} overflow="visible">
      <path {...stroke} stroke={color} fill="none" d="M4 10c14 26 38 32 66 26" />
      <path {...stroke} stroke={color} fill="none" d="M60 27l11 9-12 6" />
    </svg>
  );
}
