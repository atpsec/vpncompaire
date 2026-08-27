import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoAsset = {
  name: string;
  src: string;
  fit?: "contain" | "cover";
};

/**
 * Provider marks are downloaded from each provider's own public brand or
 * favicon asset. They stay local so a provider changing its CDN cannot break
 * the comparison UI or make visitor browsers contact a third party merely to
 * render a logo.
 */
const LOGOS: Record<string, LogoAsset> = {
  nordvpn: { name: "NordVPN", src: "/provider-logos/nordvpn.svg" },
  surfshark: { name: "Surfshark", src: "/provider-logos/surfshark.png" },
  expressvpn: { name: "ExpressVPN", src: "/provider-logos/expressvpn.svg" },
  "proton-vpn": { name: "Proton VPN", src: "/provider-logos/proton-vpn.svg" },
  pia: { name: "Private Internet Access", src: "/provider-logos/pia.png" },
  cyberghost: { name: "CyberGhost", src: "/provider-logos/cyberghost.png" },
  ipvanish: { name: "IPVanish", src: "/provider-logos/ipvanish.svg" },
  windscribe: { name: "Windscribe", src: "/provider-logos/windscribe.ico" },
  tunnelbear: { name: "TunnelBear", src: "/provider-logos/tunnelbear.png" },
  mullvad: { name: "Mullvad", src: "/provider-logos/mullvad.svg" },
  purevpn: { name: "PureVPN", src: "/provider-logos/purevpn.png" },
  vyprvpn: { name: "VyprVPN", src: "/provider-logos/vyprvpn.png" },
  ivpn: { name: "IVPN", src: "/provider-logos/ivpn.svg" },
  hideme: { name: "hide.me", src: "/provider-logos/hideme.png", fit: "cover" },
  "privado-vpn": { name: "PrivadoVPN", src: "/provider-logos/privado-vpn.png" },
  "hotspot-shield": { name: "Hotspot Shield", src: "/provider-logos/hotspot-shield.png" },
  strongvpn: { name: "StrongVPN", src: "/provider-logos/strongvpn.png" },
  zoogvpn: { name: "ZoogVPN", src: "/provider-logos/zoogvpn.png" },
  "norton-vpn": { name: "Norton VPN", src: "/provider-logos/norton-vpn.png" },
  "mozilla-vpn": { name: "Mozilla VPN", src: "/provider-logos/mozilla-vpn.png" },
  "adguard-vpn": { name: "AdGuard VPN", src: "/provider-logos/adguard-vpn.ico" },
  torguard: { name: "TorGuard", src: "/provider-logos/torguard.ico" },
  airvpn: { name: "AirVPN", src: "/provider-logos/airvpn.ico" },
  privatevpn: { name: "PrivateVPN", src: "/provider-logos/privatevpn.ico" },
  "astrill-vpn": { name: "Astrill VPN", src: "/provider-logos/astrill-vpn.png" },
  "hma-vpn": { name: "HMA VPN", src: "/provider-logos/hma-vpn.png" },
  "turbo-vpn": { name: "Turbo VPN", src: "/provider-logos/turbo-vpn.png" },
  "bitdefender-vpn": { name: "Bitdefender VPN", src: "/provider-logos/bitdefender-vpn.ico" },
  "avast-secureline": { name: "Avast SecureLine VPN", src: "/provider-logos/avast-secureline.svg" },
  "avg-secure-vpn": { name: "AVG Secure VPN", src: "/provider-logos/avg-secure-vpn.ico" },
  "trust-zone": { name: "Trust.Zone", src: "/provider-logos/trust-zone.ico" },
  "vpn-unlimited": { name: "VPN Unlimited", src: "/provider-logos/vpn-unlimited.ico" },
  fastestvpn: { name: "FastestVPN", src: "/provider-logos/fastestvpn.ico" },
  ovpn: { name: "OVPN", src: "/provider-logos/ovpn.ico" },
  "x-vpn": { name: "X-VPN", src: "/provider-logos/x-vpn.ico" },
  browsec: { name: "Browsec VPN", src: "/provider-logos/browsec.ico" },
  "vpn-ac": { name: "VPN.ac", src: "/provider-logos/vpn-ac.ico" },
  azirevpn: { name: "AzireVPN", src: "/provider-logos/azirevpn.ico" },
  "goose-vpn": { name: "GOOSE VPN", src: "/provider-logos/goose-vpn.png" },
  bulletvpn: { name: "BulletVPN", src: "/provider-logos/bulletvpn.svg" },
  clearvpn: { name: "ClearVPN", src: "/provider-logos/clearvpn.png" },
  "planet-vpn": { name: "Planet VPN", src: "/provider-logos/planet-vpn.svg" },
  "malwarebytes-privacy": { name: "Malwarebytes Privacy VPN", src: "/provider-logos/malwarebytes-privacy.ico" },
  "f-secure-vpn": { name: "F-Secure VPN", src: "/provider-logos/f-secure-vpn.ico" },
  "avira-phantom-vpn": { name: "Avira Phantom VPN", src: "/provider-logos/avira-phantom-vpn.ico" },
  "kaspersky-vpn": { name: "Kaspersky VPN", src: "/provider-logos/kaspersky-vpn.ico" },
  nymvpn: { name: "NymVPN", src: "/provider-logos/nymvpn.ico" },
  "mysterium-vpn": { name: "Mysterium VPN", src: "/provider-logos/mysterium-vpn.png" },
  planckvpn: { name: "PlanckVPN", src: "/provider-logos/planckvpn.png" },
};

type Props = {
  slug: string;
  size?: number;
  className?: string;
};

export function VPNLogo({ slug, size = 48, className }: Props) {
  const logo = LOGOS[slug];

  if (!logo) {
    return (
      <span
        aria-label={`${slug.replace(/-/g, " ")} logo unavailable`}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-xl border border-border bg-surface-subtle text-[10px] font-semibold text-ink-subtle",
          className,
        )}
        style={{ width: size, height: size }}
      >
        —
      </span>
    );
  }

  return (
    <Image
      src={logo.src}
      alt={`${logo.name} logo`}
      width={size}
      height={size}
      unoptimized={logo.src.endsWith(".svg") || logo.src.endsWith(".ico")}
      className={cn("shrink-0", logo.fit === "cover" ? "object-cover" : "object-contain", className)}
      style={{ display: "block", width: size, height: size, objectFit: logo.fit ?? "contain" }}
    />
  );
}
