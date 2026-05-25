import { cn } from "@/lib/utils";

type Mark = {
  bg: string;
  fg: string;
  text: string;
  weight?: number;
  size?: number;
};

const MARKS: Record<string, Mark> = {
  nordvpn: { bg: "#4687FF", fg: "#ffffff", text: "N", weight: 800 },
  surfshark: { bg: "#0FD0C4", fg: "#0a1f3a", text: "S", weight: 800 },
  expressvpn: { bg: "#DA3940", fg: "#ffffff", text: "E", weight: 800 },
  "proton-vpn": { bg: "#6D4AFF", fg: "#ffffff", text: "P", weight: 800 },
  pia: { bg: "#5DD466", fg: "#0c2b14", text: "P", weight: 800 },
  cyberghost: { bg: "#FFE100", fg: "#1a1a00", text: "C", weight: 800 },
  mullvad: { bg: "#FF5722", fg: "#ffffff", text: "M", weight: 800 },
};

type Props = {
  slug: string;
  size?: number;
  className?: string;
};

export function VPNLogo({ slug, size = 48, className }: Props) {
  const mark = MARKS[slug];
  if (!mark) return null;

  const fontSize = Math.round(size * 0.55);
  const radius = Math.round(size * 0.22);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label={`${slug} logo`}
      className={cn("shrink-0", className)}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={`g-${slug}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={mark.bg} stopOpacity="1" />
          <stop offset="100%" stopColor={mark.bg} stopOpacity="0.82" />
        </linearGradient>
      </defs>
      <rect
        x="0"
        y="0"
        width={size}
        height={size}
        rx={radius}
        ry={radius}
        fill={`url(#g-${slug})`}
      />
      <rect
        x="0.5"
        y="0.5"
        width={size - 1}
        height={size - 1}
        rx={radius - 0.5}
        ry={radius - 0.5}
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize={fontSize}
        fontWeight={mark.weight ?? 800}
        fill={mark.fg}
        letterSpacing="-0.04em"
      >
        {mark.text}
      </text>
    </svg>
  );
}
