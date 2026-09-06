import { Card } from "@/components/ui/card";
import { Link } from "@/i18n/routing";

type SupportedLocale = "en" | "tr" | "de";
type Variant = "use-case" | "guide" | "device";

type Copy = {
  eyebrow: string;
  title: string;
  intro: string;
  steps: ReadonlyArray<{ title: string; body: string }>;
  note: string;
  methodology: string;
  evidence: string;
};

const COPY: Record<Variant, Record<SupportedLocale, Copy>> = {
  "use-case": {
    en: {
      eyebrow: "A practical decision framework",
      title: "Choose for the job, then verify the evidence",
      intro:
        "A VPN that fits streaming may not fit travel, privacy or gaming. Use the scenario first and treat provider claims as inputs to check, not as a universal verdict.",
      steps: [
        { title: "Define the job", body: "Start with your device, location, threat model and the service you need to use." },
        { title: "Check the record", body: "Look for a dated source, audit scope and clearly labelled provider-reported fields." },
        { title: "Test your context", body: "Confirm performance, access and renewal terms on your own connection before committing." },
      ],
      note: "There is no single best VPN for every person or situation.",
      methodology: "Read the methodology",
      evidence: "Open the evidence ledger",
    },
    tr: {
      eyebrow: "Pratik karar çerçevesi",
      title: "Önce kullanım amacını belirle, sonra kanıtı kontrol et",
      intro:
        "Streaming için uygun bir VPN seyahat, gizlilik veya oyun için aynı sonucu vermeyebilir. Senaryodan başlayın; sağlayıcı beyanlarını kesin hüküm değil, kontrol edilmesi gereken bilgi olarak değerlendirin.",
      steps: [
        { title: "İhtiyacı tanımla", body: "Cihaz, konum, tehdit modeli ve kullanmak istediğiniz hizmetle başlayın." },
        { title: "Kaydı kontrol et", body: "Tarihli kaynağı, denetim kapsamını ve sağlayıcı beyanlarını ayırın." },
        { title: "Kendi bağlamında test et", body: "Satın almadan önce hız, erişim ve yenileme koşullarını kendi bağlantınızda doğrulayın." },
      ],
      note: "Her kişi ve senaryo için tek bir en iyi VPN yoktur.",
      methodology: "Metodolojiyi incele",
      evidence: "Kanıt defterini aç",
    },
    de: {
      eyebrow: "Praktischer Entscheidungsrahmen",
      title: "Nach Zweck auswählen, dann die Quellen prüfen",
      intro:
        "Ein VPN für Streaming muss nicht für Reisen, Datenschutz oder Gaming passen. Beginnen Sie mit dem Szenario und behandeln Sie Anbieterangaben als zu prüfende Informationen.",
      steps: [
        { title: "Zweck bestimmen", body: "Beginnen Sie mit Gerät, Standort, Bedrohungsmodell und gewünschtem Dienst." },
        { title: "Quellen prüfen", body: "Achten Sie auf ein Datum, den Auditumfang und klar gekennzeichnete Anbieterangaben." },
        { title: "Im eigenen Kontext testen", body: "Prüfen Sie Leistung, Zugriff und Verlängerungspreise vor dem Kauf selbst." },
      ],
      note: "Es gibt nicht für jede Person und jedes Szenario ein einziges bestes VPN.",
      methodology: "Methodik lesen",
      evidence: "Evidenzregister öffnen",
    },
  },
  guide: {
    en: {
      eyebrow: "How to use the library",
      title: "Learn the concept, then apply it to your situation",
      intro:
        "The guides explain the trade-offs behind VPN decisions. Follow the basics first, then use the scenario guides and tools to check what matters on your devices.",
      steps: [
        { title: "Build the basics", body: "Understand encryption, DNS, protocols and the limits of what a VPN can hide." },
        { title: "Narrow the scenario", body: "Choose a guide for travel, family, work, gaming, streaming or life abroad." },
        { title: "Verify before buying", body: "Compare dated sources, refund terms and provider documentation before choosing a plan." },
      ],
      note: "A guide should leave you able to make the decision yourself.",
      methodology: "See the source method",
      evidence: "Inspect the evidence ledger",
    },
    tr: {
      eyebrow: "Kütüphane nasıl kullanılmalı",
      title: "Önce kavramı öğren, sonra kendi durumuna uygula",
      intro:
        "Rehberler VPN kararlarının arkasındaki ödünleşimleri açıklar. Önce temelleri öğrenin, ardından senaryo rehberleri ve araçlarla kendi cihazınızı kontrol edin.",
      steps: [
        { title: "Temeli kur", body: "Şifreleme, DNS, protokoller ve VPN'in gizleyemeyeceği şeyleri öğrenin." },
        { title: "Senaryoyu daralt", body: "Seyahat, aile, iş, oyun, streaming veya yurt dışı için ilgili rehberi seçin." },
        { title: "Satın almadan doğrula", body: "Plan seçmeden önce tarihli kaynakları, iade şartlarını ve sağlayıcı belgelerini karşılaştırın." },
      ],
      note: "İyi bir rehber, kararı kendiniz verebilmenizi sağlamalıdır.",
      methodology: "Kaynak metodunu gör",
      evidence: "Kanıt defterini incele",
    },
    de: {
      eyebrow: "So nutzt du die Ratgeber",
      title: "Konzept verstehen, dann auf die eigene Situation anwenden",
      intro:
        "Die Ratgeber erklären die Abwägungen hinter VPN-Entscheidungen. Beginnen Sie mit den Grundlagen und prüfen Sie danach Ihr Gerät mit Szenario-Ratgebern und Tools.",
      steps: [
        { title: "Grundlagen aufbauen", body: "Verstehen Sie Verschlüsselung, DNS, Protokolle und die Grenzen eines VPN." },
        { title: "Szenario eingrenzen", body: "Wählen Sie Reisen, Familie, Arbeit, Gaming, Streaming oder Ausland." },
        { title: "Vor dem Kauf prüfen", body: "Vergleichen Sie Quellen, Erstattungsbedingungen und Anbieterunterlagen." },
      ],
      note: "Ein guter Ratgeber befähigt Sie, die Entscheidung selbst zu treffen.",
      methodology: "Quellenmethode ansehen",
      evidence: "Evidenzregister prüfen",
    },
  },
  device: {
    en: {
      eyebrow: "Device-first checklist",
      title: "The right setup depends on the device",
      intro:
        "A native app, browser setting or router setup can produce very different trade-offs. Pick the device path first so the provider comparison answers the real problem.",
      steps: [
        { title: "Identify the path", body: "Check whether your device supports a native app, manual profile or router-level setup." },
        { title: "Check the constraints", body: "Look at simultaneous devices, battery impact, protocol support and account limits." },
        { title: "Confirm the outcome", body: "Run a leak check and verify speed or access after installation on the target device." },
      ],
      note: "Device compatibility is a requirement, not a quality score.",
      methodology: "Read the methodology",
      evidence: "Check the evidence ledger",
    },
    tr: {
      eyebrow: "Cihaz odaklı kontrol listesi",
      title: "Doğru kurulum cihazına göre değişir",
      intro:
        "Yerel uygulama, tarayıcı ayarı ve router kurulumu farklı ödünleşimler yaratır. Önce cihaz yolunu seçin; sağlayıcı karşılaştırması gerçek sorunu yanıtlasın.",
      steps: [
        { title: "Kurulum yolunu bul", body: "Cihazın uygulama, manuel profil veya router kurulumu destekleyip desteklemediğini kontrol edin." },
        { title: "Kısıtları kontrol et", body: "Eşzamanlı cihaz, pil etkisi, protokol ve hesap sınırlarına bakın." },
        { title: "Sonucu doğrula", body: "Kurulumdan sonra hedef cihazda sızıntı testi, hız veya erişim kontrolü yapın." },
      ],
      note: "Cihaz uyumluluğu kalite puanı değil, ön koşuldur.",
      methodology: "Metodolojiyi incele",
      evidence: "Kanıt defterini kontrol et",
    },
    de: {
      eyebrow: "Geräte-Checkliste",
      title: "Die passende Einrichtung hängt vom Gerät ab",
      intro:
        "Native App, Browsereinstellung und Router-Setup haben unterschiedliche Abwägungen. Wählen Sie zuerst den Geräteweg, damit der Vergleich das echte Problem beantwortet.",
      steps: [
        { title: "Weg bestimmen", body: "Prüfen Sie App-, manuelle Profil- oder Router-Unterstützung Ihres Geräts." },
        { title: "Grenzen prüfen", body: "Achten Sie auf Gerätezahl, Akku, Protokolle und Kontolimits." },
        { title: "Ergebnis bestätigen", body: "Führen Sie nach der Einrichtung einen Leak-, Geschwindigkeits- oder Zugriffstest durch." },
      ],
      note: "Gerätekompatibilität ist eine Voraussetzung, kein Qualitätsscore.",
      methodology: "Methodik lesen",
      evidence: "Evidenzregister prüfen",
    },
  },
};

export function DecisionFramework({
  locale,
  variant,
}: {
  locale: SupportedLocale;
  variant: Variant;
}) {
  const copy = COPY[variant][locale] ?? COPY[variant].en;

  return (
    <section
      className="mt-16 rounded-2xl border border-brand-200 bg-brand-50/40 p-6 sm:p-8 dark:border-brand-800/60 dark:bg-brand-950/20"
      aria-labelledby={`${variant}-decision-framework`}
    >
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
          {copy.eyebrow}
        </p>
        <h2
          id={`${variant}-decision-framework`}
          className="mt-3 text-2xl font-bold tracking-tight text-ink-strong sm:text-3xl"
        >
          {copy.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
          {copy.intro}
        </p>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {copy.steps.map((step, index) => (
          <Card key={step.title} className="p-5 dark:bg-surface-subtle">
            <span className="flex size-8 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-200">
              {index + 1}
            </span>
            <h3 className="mt-4 font-semibold text-ink-strong">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
          </Card>
        ))}
      </div>

      <div className="mt-7 flex flex-col gap-3 border-t border-brand-200/80 pt-5 text-sm dark:border-brand-800/60 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-ink-muted">{copy.note}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-semibold text-brand-700 dark:text-brand-300">
          <Link href="/methodology" className="hover:underline">
            {copy.methodology}
          </Link>
          <Link href="/research/evidence-ledger" className="hover:underline">
            {copy.evidence}
          </Link>
        </div>
      </div>
    </section>
  );
}
