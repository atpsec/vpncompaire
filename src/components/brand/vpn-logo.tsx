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

// Brand mark colors used for the tile background. We keep the official
// brand hex but render the mark itself in white for a uniform comparison-card
// look (matches how editorial sites like PCMag/Tom's Guide present logos).
const BRANDS: Record<string, { icon: IconData; tile: string }> = {
  nordvpn: { icon: siNordvpn, tile: "#4687FF" },
  surfshark: { icon: siSurfshark, tile: "#1EBFBF" },
  expressvpn: { icon: siExpressvpn, tile: "#DA3940" },
  "proton-vpn": { icon: siProtonvpn, tile: "#6D4AFF" },
  pia: { icon: siPrivateinternetaccess, tile: "#1E811F" },
  mullvad: { icon: siMullvad, tile: "#FFCD46" },
};

// CyberGhost is not in simple-icons; rendered as a small ghost mark.
const CYBERGHOST_PATH =
  "M12 3c-3.866 0-7 3.134-7 7v9.5c0 .55.45.95.97.78l2.03-.67 1.96.65a.5.5 0 0 0 .32 0l1.97-.66 1.97.66a.5.5 0 0 0 .32 0l1.96-.66 2.03.66c.52.17.97-.23.97-.78V10c0-3.866-3.134-7-7-7zm-2 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm4 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z";

type Props = {
  slug: string;
  size?: number;
  className?: string;
};

export function VPNLogo({ slug, size = 48, className }: Props) {
  if (slug === "cyberghost") {
    return (
      <CyberGhostMark size={size} className={className} />
    );
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
      aria-label={`${brand.icon.title} logosu`}
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

function CyberGhostMark({ size, className }: { size: number; className?: string }) {
  const radius = Math.round(size * 0.22);
  const padding = Math.round(size * 0.18);
  const iconSize = size - padding * 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="CyberGhost VPN logosu"
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
