import { ImageResponse } from "next/og";

export const alt = "vpncompaire — Dürüst VPN Karşılaştırmaları";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          fontFamily: "system-ui",
          position: "relative",
          color: "white",
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              background: "rgba(255, 255, 255, 0.15)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
              border: "2px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            V
          </div>
          <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1 }}>
            vpncompaire
          </span>
        </div>

        {/* Main heading */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Dürüst VPN Karşılaştırmaları
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              opacity: 0.85,
              maxWidth: 900,
            }}
          >
            Gizlilik, streaming ve güvenlik için bağımsız metodolojiyle test
            edilmiş.
          </div>

          {/* Trust signals */}
          <div
            style={{
              display: "flex",
              gap: 32,
              marginTop: 24,
              fontSize: 22,
              opacity: 0.95,
              alignItems: "center",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              ✓ 10 VPN test edildi
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              ✓ Bağımsız denetimler
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              ✓ Şeffaf metodoloji
            </span>
          </div>
        </div>

        {/* Year accent */}
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 80,
            fontSize: 28,
            fontWeight: 700,
            padding: "8px 20px",
            background: "rgba(245, 158, 11, 0.95)",
            color: "#1c1917",
            borderRadius: 999,
          }}
        >
          2026
        </div>
      </div>
    ),
    { ...size },
  );
}
