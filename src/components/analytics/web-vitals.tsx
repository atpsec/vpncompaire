"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * Sends field performance metrics to the existing consent-aware GA4 channel.
 * The callback is intentionally a no-op until the user has enabled analytics.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    if (typeof window.gtag !== "function") return;

    const value = metric.name === "CLS"
      ? Math.round(metric.value * 1000)
      : Math.round(metric.value);

    window.gtag("event", "web_vital", {
      metric_name: metric.name,
      metric_value: value,
      metric_id: metric.id,
      metric_rating: metric.rating,
      non_interaction: true,
    });
  });

  return null;
}
