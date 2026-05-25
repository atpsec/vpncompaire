/**
 * Erişilebilirlik: Klavye kullanıcılarının header'ı atlayıp doğrudan
 * ana içeriğe ulaşması için. Görsel olarak gizli; Tab tuşuyla görünür.
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white focus:font-medium focus:shadow-lg"
    >
      Ana içeriğe geç
    </a>
  );
}
