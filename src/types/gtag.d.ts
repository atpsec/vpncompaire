// Shared global type declarations for Google Analytics (gtag.js)
// Imported by any module that calls window.gtag(...)

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export {};
