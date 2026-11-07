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

/** Spot illustrations for cards. Hand-drawn style: cocoa outlines, pastel fills. */
export function Illustration({ kind, className = "h-24 w-24", title }: { kind: IllustrationKind; className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} overflow="visible">
      {title && <title>{title}</title>}
      <g {...stroke}>{art[kind]}</g>
    </svg>
  );
}

const MiniCup = ({ x, y, s = 1, fill = C.butterDeep }: { x: number; y: number; s?: number; fill?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path fill={C.pink} d="M12 -14 l4 -14 l5 1.4 l-4 14 Z" />
    <path fill={C.paper} d="M0 0 h30 l-4 34 q-.5 3 -3.5 3 h-15 q-3 0 -3.5 -3 Z" />
    <path fill={fill} stroke="none" d="M2.2 9 h25.6 l-2.8 24.6 q-.4 2.4 -3 2.4 h-14 q-2.6 0 -3 -2.4 Z" />
    <path fill="none" d="M0 0 h30 l-4 34 q-.5 3 -3.5 3 h-15 q-3 0 -3.5 -3 Z" />
    <rect x="-2" y="-4" width="34" height="6" rx="3" fill={C.paper} />
    <g fill={C.boba} stroke="none">
      <circle cx="10" cy="31" r="2.6" />
      <circle cx="16" cy="32" r="2.6" />
      <circle cx="21.5" cy="30.5" r="2.6" />
    </g>
  </g>
);

const art: Record<IllustrationKind, React.ReactNode> = {
  rings: (
    <>
      <path fill={C.pink} d="M60 26c-5-6-15-3-13 5 1 4 7 8 13 12 6-4 12-8 13-12 2-8-8-11-13-5Z" />
      <circle cx="47" cy="74" r="23" fill="none" strokeWidth={4} stroke={C.butterDeep} />
      <circle cx="47" cy="74" r="23" fill="none" />
      <circle cx="73" cy="74" r="23" fill="none" strokeWidth={4} stroke={C.butterDeep} />
      <circle cx="73" cy="74" r="23" fill="none" />
      <path fill={C.blue} d="M41 51l6-8 6 8-6 6Z" />
      <path fill="none" d="M95 40l4-4M100 48h5M88 34l1-6" />
    </>
  ),
  balloons: (
    <>
      <path fill="none" d="M44 62c4 14-4 22 2 34M76 56c-4 14 6 22-4 40M60 70c0 10 4 16 0 26" />
      <ellipse cx="44" cy="42" rx="17" ry="21" fill={C.pink} />
      <ellipse cx="76" cy="36" rx="17" ry="21" fill={C.butter} />
      <ellipse cx="60" cy="52" rx="15" ry="19" fill={C.blue} />
      <path fill={C.pink} d="M41 62h6l-3 4Z" />
      <path fill={C.butter} d="M73 56h6l-3 4Z" />
      <path fill={C.blue} d="M57 70h6l-3 4Z" />
      <path fill="none" stroke="#fff" strokeWidth={3} d="M37 33c1-4 4-7 7-8M69 27c1-4 4-7 7-8" />
      <path fill={C.paper} d="M50 96h20l-3 10H53Z" />
    </>
  ),
  briefcase: (
    <>
      <path fill="none" d="M46 46v-8q0-6 6-6h16q6 0 6 6v8" />
      <rect x="20" y="46" width="80" height="54" rx="10" fill={C.blue} />
      <path fill="none" d="M20 68h80" />
      <rect x="53" y="62" width="14" height="12" rx="3" fill={C.butter} />
      <g transform="translate(82 18) rotate(10)">
        <path fill={C.pink} d="M8 -10 l3 -10 l4 1 l-3 10 Z" />
        <path fill={C.paper} d="M0 0 h22 l-3 24 h-16 Z" />
        <path fill={C.sageDeep} stroke="none" d="M2 7 h18 l-2 15 h-14 Z" />
        <path fill="none" d="M0 0 h22 l-3 24 h-16 Z" />
      </g>
    </>
  ),
  tent: (
    <>
      <path fill="none" d="M6 14c30 16 78 16 108 0" />
      <path fill={C.pink} d="M16 18l7 14 6-12Z" />
      <path fill={C.butter} d="M38 23l6 13 7-12Z" />
      <path fill={C.sage} d="M62 24l6 13 6-13Z" />
      <path fill={C.blue} d="M85 22l6 12 7-14Z" />
      <path fill="none" d="M28 58v46M92 58v46" />
      <rect x="22" y="78" width="76" height="26" rx="4" fill={C.paper} />
      <path fill={C.sage} d="M18 58l42-20 42 20Z" />
      <path fill={C.paper} d="M18 58q7 9 14 0q7 9 14 0q7 9 14 0q7 9 14 0q7 9 14 0q7 9 14 0Z" />
      <path fill="none" d="M34 90h18M60 90h26" />
    </>
  ),
  gift: (
    <>
      <path fill={C.pink} d="M60 40c-8-14-24-12-22-2 1 5 10 4 22 2ZM60 40c8-14 24-12 22-2-1 5-10 4-22 2Z" />
      <rect x="26" y="56" width="68" height="46" rx="5" fill={C.sage} />
      <rect x="22" y="40" width="76" height="18" rx="5" fill={C.sage} />
      <path fill={C.pink} d="M53 40h14v62H53Z" />
      <path fill="none" d="M100 28l5-5M104 38h6M94 22v-6" />
    </>
  ),
  carrier: (
    <>
      <MiniCup x={20} y={44} s={1} fill={C.butterDeep} />
      <MiniCup x={46} y={38} s={1.05} fill={C.pinkDeep} />
      <MiniCup x={74} y={44} s={1} fill={C.sageDeep} />
      <path fill={C.butter} d="M12 74h96l-8 28H20Z" />
      <path fill="none" d="M30 86h60" />
    </>
  ),
  bar: (
    <>
      <path fill="none" d="M24 30v38M96 30v38" />
      <path fill={C.pink} d="M16 30l8-14h72l8 14Z" />
      <path fill={C.paper} d="M16 30q5.7 8 11.4 0q5.7 8 11.4 0q5.7 8 11.4 0q5.7 8 11.4 0q5.7 8 11.4 0q5.7 8 11.4 0q5.7 8 11.4 0Z" />
      <MiniCup x={34} y={46} s={0.62} fill={C.butterDeep} />
      <MiniCup x={53} y={44} s={0.68} fill={C.sageDeep} />
      <MiniCup x={73} y={46} s={0.62} fill={C.pinkDeep} />
      <rect x="16" y="68" width="88" height="38" rx="6" fill={C.blue} />
      <circle cx="60" cy="87" r="11" fill={C.paper} />
      <path fill="none" d="M55 87c2-4 7-4 10 0-3 4-8 4-10 0Z" />
    </>
  ),
  leaf: (
    <>
      <path fill={C.sage} d="M24 96C20 56 50 24 98 22c2 44-28 76-74 74Z" />
      <path fill="none" d="M24 96c16-22 36-44 58-58M44 74l-2-16M56 62l12 2M66 52l-2-12" />
      <circle cx="88" cy="82" r="8" fill={C.tangerine} />
      <circle cx="76" cy="94" r="7" fill={C.pinkDeep} />
    </>
  ),
  palette: (
    <>
      <path fill={C.paper} d="M60 18c26 0 46 16 46 38 0 14-12 14-20 12-8-2-12 6-8 14 4 10-4 20-18 20-26 0-44-18-44-42s18-42 44-42Z" />
      <circle cx="38" cy="50" r="7" fill={C.pink} />
      <circle cx="56" cy="36" r="7" fill={C.butter} />
      <circle cx="78" cy="42" r="7" fill={C.blue} />
      <circle cx="38" cy="74" r="7" fill={C.sage} />
      <circle cx="62" cy="84" r="5" fill="none" />
    </>
  ),
  sticker: (
    <g transform="rotate(-8 60 60)">
      <circle cx="60" cy="60" r="40" fill={C.butter} />
      <path fill={C.paper} d="M88 88c-8 6-6-10-18-6 6-10 14-6 18 6Z" />
      <path fill={C.pink} d="M60 38c2 0 3 8 5 11 2 3 11 3 12 5 1 2-6 6-7 10-1 3 3 12 1 13-1 1-8-4-11-4s-10 5-11 4c-2-1 2-10 1-13-1-4-8-8-7-10 1-2 10-2 12-5 2-3 3-11 5-11Z" />
    </g>
  ),
  menu: (
    <>
      <path fill="none" d="M34 104l14-84M86 104L72 20" />
      <rect x="28" y="22" width="64" height="72" rx="6" fill={C.paper} />
      <path fill="none" stroke={C.tangerine} d="M40 36c6-4 10 4 16 0s10 4 16 0 6 2 8 0" />
      <path fill="none" d="M40 52h28M40 62h36M40 72h24M40 82h30" />
      <circle cx="80" cy="52" r="2" fill={C.ink} stroke="none" />
      <circle cx="82" cy="72" r="2" fill={C.ink} stroke="none" />
    </>
  ),
  letter: (
    <>
      <rect x="18" y="34" width="84" height="58" rx="6" fill={C.blue} />
      <path fill={C.blueDeep} d="M18 40l42 30 42-30" />
      <path fill={C.pink} d="M60 74c-4-5-12-3-11 3 1 3 6 6 11 9 5-3 10-6 11-9 1-6-7-8-11-3Z" />
      <path fill="none" d="M96 22l5-6M104 30h7M90 18v-7" />
    </>
  ),
  cup: <MiniCup x={36} y={34} s={1.6} fill={C.butterDeep} />,
  heart: (
    <>
      <path fill={C.pink} d="M60 100C34 84 16 68 18 46c1-14 12-22 24-21 8 1 14 6 18 12 4-6 10-11 18-12 12-1 24 8 24 22 0 22-18 37-42 53Z" />
      <path fill="none" stroke="#fff" strokeWidth={4} d="M32 44c1-6 5-9 10-9" />
      <path fill="none" d="M100 20l4-6M106 30h7M14 22l-4-5" />
    </>
  ),
};
