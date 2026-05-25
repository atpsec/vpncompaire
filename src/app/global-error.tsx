"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[global-error]", error);
    }
  }, [error]);

  return (
    <html lang="tr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          background: "#fafaf9",
          color: "#1c1917",
        }}
      >
        <main style={{ textAlign: "center", padding: "2rem", maxWidth: 480 }}>
          <p style={{ fontSize: 14, color: "#dc2626", letterSpacing: 2 }}>
            HATA
          </p>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginTop: 8,
              marginBottom: 12,
            }}
          >
            Beklenmedik bir hata oluştu
          </h1>
          <p style={{ color: "#57534e", lineHeight: 1.6 }}>
            Sayfayı yenileyebilir veya ana sayfaya dönebilirsin.
          </p>
          {error.digest && (
            <p
              style={{
                fontSize: 12,
                fontFamily: "ui-monospace, monospace",
                color: "#a8a29e",
                marginTop: 8,
              }}
            >
              Hata kodu: {error.digest}
            </p>
          )}
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              marginTop: 24,
            }}
          >
            <button
              onClick={reset}
              style={{
                padding: "12px 24px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Sayfayı yenile
            </button>
            <a
              href="/"
              style={{
                padding: "12px 24px",
                background: "white",
                color: "#1c1917",
                border: "1px solid #e7e5e4",
                borderRadius: 8,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Ana sayfa
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
