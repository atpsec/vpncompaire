import {
  siNordvpn,
  siSurfshark,
  siExpressvpn,
  siProtonvpn,
  siPrivateinternetaccess,
  siMullvad,
} from "simple-icons";
import { cn } from "@/lib/utils";

type IconData = { title: string; hex: string; path: string };

// Brand marks via simple-icons (CC0-licensed) for the major brands.
const BRANDS: Record<string, { icon: IconData; tile: string }> = {
  nordvpn: { icon: siNordvpn, tile: "#4687FF" },
  surfshark: { icon: siSurfshark, tile: "#1EBFBF" },
  expressvpn: { icon: siExpressvpn, tile: "#DA3940" },
  "proton-vpn": { icon: siProtonvpn, tile: "#6D4AFF" },
  pia: { icon: siPrivateinternetaccess, tile: "#1E811F" },
  mullvad: { icon: siMullvad, tile: "#FFCD46" },
};

const CYBERGHOST_PATH =
  "M12 3c-3.866 0-7 3.134-7 7v9.5c0 .55.45.95.97.78l2.03-.67 1.96.65a.5.5 0 0 0 .32 0l1.97-.66 1.97.66a.5.5 0 0 0 .32 0l1.96-.66 2.03.66c.52.17.97-.23.97-.78V10c0-3.866-3.134-7-7-7zm-2 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm4 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z";

type LetterMark = {
  text: string;
  tile: string;
  fg: string;
  ariaLabel: string;
};

// Letter-tile fallback for brands not in simple-icons.
const LETTER_MARKS: Record<string, LetterMark> = {
  ipvanish: {
    text: "IP",
    tile: "#FFA300",
    fg: "#1a1300",
    ariaLabel: "IPVanish logo",
  },
  windscribe: {
    text: "W",
    tile: "#1AC8DB",
    fg: "#06222a",
    ariaLabel: "Windscribe logo",
  },
  tunnelbear: {
    text: "T",
    tile: "#A47148",
    fg: "#ffffff",
    ariaLabel: "TunnelBear logo",
  },
  "atlas-vpn": {
    text: "A",
    tile: "#2563EB",
    fg: "#ffffff",
    ariaLabel: "Atlas VPN logo",
  },
  purevpn: {
    text: "P",
    tile: "#F97316",
    fg: "#1a0a00",
    ariaLabel: "PureVPN logo",
  },
  vyprvpn: {
    text: "V",
    tile: "#0D9488",
    fg: "#ffffff",
    ariaLabel: "VyprVPN logo",
  },
  ivpn: {
    text: "IV",
    tile: "#1E293B",
    fg: "#ffffff",
    ariaLabel: "IVPN logo",
  },
  hideme: {
    text: "H",
    tile: "#059669",
    fg: "#ffffff",
    ariaLabel: "hide.me logo",
  },
  "privado-vpn": {
    text: "Pr",
    tile: "#7C3AED",
    fg: "#ffffff",
    ariaLabel: "PrivadoVPN logo",
  },
  "hotspot-shield": {
    text: "HS",
    tile: "#EF4444",
    fg: "#ffffff",
    ariaLabel: "Hotspot Shield logo",
  },
  strongvpn: {
    text: "S",
    tile: "#0369A1",
    fg: "#ffffff",
    ariaLabel: "StrongVPN logo",
  },
  zoogvpn: {
    text: "Z",
    tile: "#DB2777",
    fg: "#ffffff",
    ariaLabel: "ZoogVPN logo",
  },
  "norton-vpn": {
    text: "N",
    tile: "#FBBF24",
    fg: "#1a1300",
    ariaLabel: "Norton VPN logo",
  },
};

type Props = {
  slug: string;
  size?: number;
  className?: string;
};

export function VPNLogo({ slug, size = 48, className }: Props) {
  if (slug === "cyberghost") {
    return <CyberGhostMark size={size} className={className} />;
  }

  const letter = LETTER_MARKS[slug];
  if (letter) {
    return <LetterTile size={size} mark={letter} className={className} />;
  }

  const brand = BRANDS[slug];
  if (!brand) return null;

  const radius = Math.round(size * 0.22);
  const padding = Math.round(size * 0.22);
  const iconSize = size - padding * 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`${brand.icon.title} logo`}
      className={cn("shrink-0", className)}
      style={{ display: "block" }}
    >
      <rect
        x="0"
        y="0"
        width={size}
        height={size}
        rx={radius}
        ry={radius}
        fill={brand.tile}
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
      <g transform={`translate(${padding}, ${padding}) scale(${iconSize / 24})`}>
        <path d={brand.icon.path} fill="#ffffff" />
      </g>
    </svg>
  );
}

function LetterTile({
  size,
  mark,
  className,
}: {
  size: number;
  mark: LetterMark;
  className?: string;
}) {
  const radius = Math.round(size * 0.22);
  const fontSize = Math.round(size * (mark.text.length > 1 ? 0.36 : 0.5));
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={mark.ariaLabel}
      className={cn("shrink-0", className)}
      style={{ display: "block" }}
    >
      <rect
        x="0"
        y="0"
        width={size}
        height={size}
        rx={radius}
        ry={radius}
        fill={mark.tile}
      />
      <rect
        x="0.5"
        y="0.5"
        width={size - 1}
        height={size - 1}
        rx={radius - 0.5}
        ry={radius - 0.5}
        fill="none"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize={fontSize}
        fontWeight={800}
        fill={mark.fg}
        letterSpacing="-0.04em"
      >
        {mark.text}
      </text>
    </svg>
  );
}

function CyberGhostMark({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  const radius = Math.round(size * 0.22);
  const padding = Math.round(size * 0.18);
  const iconSize = size - padding * 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="CyberGhost VPN logo"
      className={cn("shrink-0", className)}
      style={{ display: "block" }}
    >
      <rect x="0" y="0" width={size} height={size} rx={radius} ry={radius} fill="#FFE100" />
      <rect
        x="0.5"
        y="0.5"
        width={size - 1}
        height={size - 1}
        rx={radius - 0.5}
        ry={radius - 0.5}
        fill="none"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
      />
      <g transform={`translate(${padding}, ${padding}) scale(${iconSize / 24})`}>
        <path d={CYBERGHOST_PATH} fill="#1a1a00" />
      </g>
    </svg>
  );
}
