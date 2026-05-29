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
    <html lang="en">
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
            ERROR
          </p>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginTop: 8,
              marginBottom: 12,
            }}
          >
            Something went wrong
          </h1>
          <p style={{ color: "#57534e", lineHeight: 1.6 }}>
            You can retry the page or go back to the homepage.
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
              Error code: {error.digest}
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
              Retry
            </button>
            {/* global-error renders its own <html>/<body> outside the app shell;
                a plain <a> is the safest navigation primitive here. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
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
              Home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
