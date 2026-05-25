import { siApple, siAndroid, siSamsung, siLg } from "simple-icons";
import { cn } from "@/lib/utils";

type DeviceType = "android" | "iphone" | "ipad" | "smart-tv";

type Props = {
  type: DeviceType;
  size?: number;
  className?: string;
};

const APPLE_PATH = siApple.path;
const ANDROID_PATH = siAndroid.path;
const SAMSUNG_PATH = siSamsung.path;
const LG_PATH = siLg.path;

export function DeviceIcon({ type, size = 56, className }: Props) {
  switch (type) {
    case "iphone":
      return <AppleTile size={size} bg="#000000" className={className} />;
    case "ipad":
      return <AppleTile size={size} bg="#3a3a3c" className={className} />;
    case "android":
      return <AndroidTile size={size} className={className} />;
    case "smart-tv":
      return <SmartTVTile size={size} className={className} />;
    default:
      return null;
  }
}

function Tile({
  size,
  bg,
  className,
  children,
  ariaLabel,
}: {
  size: number;
  bg: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel: string;
}) {
  const radius = Math.round(size * 0.22);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={ariaLabel}
      className={cn("shrink-0", className)}
      style={{ display: "block" }}
    >
      <rect x="0" y="0" width={size} height={size} rx={radius} ry={radius} fill={bg} />
      <rect
        x="0.5"
        y="0.5"
        width={size - 1}
        height={size - 1}
        rx={radius - 0.5}
        ry={radius - 0.5}
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
      />
      {children}
    </svg>
  );
}

function AppleTile({
  size,
  bg,
  className,
}: {
  size: number;
  bg: string;
  className?: string;
}) {
  const pad = Math.round(size * 0.24);
  const inner = size - pad * 2;
  return (
    <Tile size={size} bg={bg} className={className} ariaLabel="Apple cihaz">
      <g transform={`translate(${pad}, ${pad}) scale(${inner / 24})`}>
        <path d={APPLE_PATH} fill="#ffffff" />
      </g>
    </Tile>
  );
}

function AndroidTile({ size, className }: { size: number; className?: string }) {
  const pad = Math.round(size * 0.18);
  const inner = size - pad * 2;
  return (
    <Tile size={size} bg="#3DDC84" className={className} ariaLabel="Android cihaz">
      <g transform={`translate(${pad}, ${pad}) scale(${inner / 24})`}>
        <path d={ANDROID_PATH} fill="#ffffff" />
      </g>
    </Tile>
  );
}

function SmartTVTile({ size, className }: { size: number; className?: string }) {
  const radius = Math.round(size * 0.22);
  const innerPad = Math.round(size * 0.12);
  const tvW = size - innerPad * 2;
  const tvH = Math.round(tvW * 0.62);
  const tvX = innerPad;
  const tvY = innerPad + Math.round(size * 0.06);
  const tvR = Math.round(tvW * 0.06);
  const stripeH = Math.max(2, Math.round(size * 0.04));
  const standW = Math.round(tvW * 0.3);
  const standY = tvY + tvH + Math.round(size * 0.02);

  // Tiny brand marks on the screen
  const brandSize = Math.max(8, Math.round(tvH * 0.42));
  const brandPad = Math.round(tvW * 0.08);
  const brandY = tvY + (tvH - brandSize) / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Smart TV (Samsung, LG, Android TV, Apple TV)"
      className={cn("shrink-0", className)}
      style={{ display: "block" }}
    >
      <rect x="0" y="0" width={size} height={size} rx={radius} ry={radius} fill="#1c1917" />
      <rect
        x="0.5"
        y="0.5"
        width={size - 1}
        height={size - 1}
        rx={radius - 0.5}
        ry={radius - 0.5}
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
      />
      {/* TV body */}
      <rect
        x={tvX}
        y={tvY}
        width={tvW}
        height={tvH}
        rx={tvR}
        ry={tvR}
        fill="#0c0a09"
        stroke="rgba(255,255,255,0.16)"
      />
      {/* Brand marks on screen */}
      <BrandMini
        path={SAMSUNG_PATH}
        cx={tvX + brandPad + brandSize / 2}
        cy={brandY + brandSize / 2}
        s={brandSize / 24}
        fill="#1428A0"
      />
      <BrandMini
        path={LG_PATH}
        cx={tvX + brandPad + brandSize + (tvW - brandPad * 2 - brandSize * 4) / 3 + brandSize / 2}
        cy={brandY + brandSize / 2}
        s={brandSize / 24}
        fill="#A50034"
      />
      <BrandMini
        path={ANDROID_PATH}
        cx={tvX + tvW - brandPad - brandSize - (tvW - brandPad * 2 - brandSize * 4) / 3 - brandSize / 2}
        cy={brandY + brandSize / 2}
        s={brandSize / 24}
        fill="#3DDC84"
      />
      <BrandMini
        path={APPLE_PATH}
        cx={tvX + tvW - brandPad - brandSize / 2}
        cy={brandY + brandSize / 2}
        s={brandSize / 24}
        fill="#ffffff"
      />
      {/* Stand */}
      <rect
        x={(size - standW) / 2}
        y={standY}
        width={standW}
        height={stripeH}
        rx={1}
        fill="rgba(255,255,255,0.4)"
      />
    </svg>
  );
}

function BrandMini({
  path,
  cx,
  cy,
  s,
  fill,
}: {
  path: string;
  cx: number;
  cy: number;
  s: number;
  fill: string;
}) {
  return (
    <g transform={`translate(${cx - 12 * s}, ${cy - 12 * s}) scale(${s})`}>
      <path d={path} fill={fill} />
    </g>
  );
}
