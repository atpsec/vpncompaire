import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

type OgLocale = "tr" | "en" | "de";

const CONTENT: Record<
  OgLocale,
  { title: string; subtitle: string; signals: [string, string, string] }
> = {
  tr: {
    title: "Bağımsız VPN karşılaştırmaları",
    subtitle:
      "Resmi kaynaklar · Bağımsız denetim kayıtları · Şeffaf metodoloji.",
    signals: ["Kaynak temelli profiller", "Denetim kayıtları", "Şeffaf metodoloji"],
  },
  en: {
    title: "Independent VPN comparisons",
    subtitle:
      "Official sources · Independent audit records · Transparent methodology.",
    signals: ["Source-based profiles", "Audit records", "Transparent methodology"],
  },
  de: {
    title: "Unabhängige VPN-Vergleiche",
    subtitle:
      "Offizielle Quellen · Unabhängige Prüfberichte · Transparente Methodik.",
    signals: ["Quellenbasierte Profile", "Prüfberichte", "Transparente Methodik"],
  },
};

function asOgLocale(raw: string | null): OgLocale {
  if (raw === "en" || raw === "de") return raw;
  return "tr";
}

export async function GET(request: Request) {
  const locale = asOgLocale(new URL(request.url).searchParams.get("locale"));
  const content = CONTENT[locale];

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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
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
            {content.title}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              opacity: 0.85,
              maxWidth: 900,
            }}
          >
            {content.subtitle}
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
            {content.signals.map((signal) => (
              <span
                key={signal}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: "#fbbf24",
                    display: "flex",
                  }}
                />
                {signal}
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
    size,
  );
}
