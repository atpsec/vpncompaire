/**
 * Inline script injected into <head> to set the theme BEFORE first paint.
 * Prevents flash-of-unstyled-content (FOUC) on initial load.
 *
 * Reads `vpnadvisor-theme` from localStorage:
 *   - "dark"   → add .dark class
 *   - "light"  → no class
 *   - missing or "system" → follow prefers-color-scheme
 */
const themeInitScript = `(function(){try{var t=localStorage.getItem('vpnadvisor-theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export function ThemeScript() {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
    />
  );
}
