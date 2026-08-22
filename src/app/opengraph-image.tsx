import { ImageResponse } from "next/og";
import { getLocale } from "next-intl/server";

export const alt = "VPN Advisor — Independent VPN comparisons";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type OgLocale = "tr" | "en" | "de";

const CONTENT: Record<
  OgLocale,
  { title: string; subtitle: string; signals: [string, string, string] }
> = {
  tr: {
    title: "Bağımsız VPN karşılaştırmaları",
    subtitle:
      "Gönüllü inceleme projesi · Şeffaf metodoloji · Bağımsız değerlendirmeler.",
    signals: ["Kaynak temelli profiller", "Bağımsız denetimler", "Şeffaf metodoloji"],
  },
  en: {
    title: "Independent VPN comparisons",
    subtitle:
      "Volunteer review project · Transparent methodology · Independent assessments.",
    signals: ["Source-based profiles", "Independent audits", "Transparent methodology"],
  },
  de: {
    title: "Unabhängige VPN-Vergleiche",
    subtitle:
      "Freiwilliges Review-Projekt · Transparente Methodik · Unabhängige Bewertungen.",
    signals: [
      "Quellenbasierte Profile",
      "Unabhängige Audits",
      "Transparente Methodik",
    ],
  },
};

function asOgLocale(raw: string): OgLocale {
  if (raw === "en" || raw === "de") return raw;
  return "tr";
}

export default async function OGImage() {
  const raw = await getLocale();
  const locale = asOgLocale(raw);
  const c = CONTENT[locale];

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
            VPN Advisor
          </span>
        </div>

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
            {c.title}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              opacity: 0.85,
              maxWidth: 900,
            }}
          >
            {c.subtitle}
          </div>

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
            {c.signals.map((signal) => (
              <span
                key={signal}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                ✓ {signal}
              </span>
            ))}
          </div>
        </div>

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
