import Link from "next/link";

export default function GlobalNotFound() {
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
          <p style={{ fontSize: 14, color: "#78716c", letterSpacing: 2 }}>
            404
          </p>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              marginTop: 8,
              marginBottom: 12,
            }}
          >
            Sayfa bulunamadı
          </h1>
          <p style={{ color: "#57534e", lineHeight: 1.6 }}>
            Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              marginTop: 24,
              padding: "12px 24px",
              background: "#2563eb",
              color: "white",
              textDecoration: "none",
              borderRadius: 8,
              fontWeight: 500,
            }}
          >
            Ana sayfaya dön
          </Link>
        </main>
      </body>
    </html>
  );
}
