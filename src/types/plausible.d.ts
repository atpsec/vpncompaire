// Shared global type declarations for window.plausible
// Imported by any module that calls window.plausible(...)

type PlausibleProps = Record<string, string | number | boolean>;
type PlausibleFn = (
  event: string,
  options?: { props?: PlausibleProps }
) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

export {};
