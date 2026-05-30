import {
  KeyRound,
  Mail,
  Shield,
  Eye,
  Smartphone,
  HardDrive,
  Layers,
  ExternalLink,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Tool = {
  name: string;
  summary: string;
  note?: string;
  cost: string;
  openSource: boolean;
  url: string;
};

type Category = {
  id: string;
  icon: LucideIcon;
  title: string;
  problem: string;
  tools: Tool[];
};

type Strings = {
  breadcrumbHome: string;
  breadcrumbHere: string;
  badge: string;
  h1: string;
  lede: string;
  importantTitle: string;
  importantBody: string;
  importantNoAffiliate: string;
  navLabel: string;
  openSource: string;
  closedSource: string;
  officialSite: string;
  articleH2: string;
  articleIntro: string;
  steps: { bold: string; rest: string }[];
  avoidH2: string;
  avoidItems: { bold: string; rest: string }[];
  nextStep: string;
  nextLinks: { label: string; href: string }[];
};

const TR_CATEGORIES: Category[] = [
  {
    id: "password-manager",
    icon: KeyRound,
    title: "Şifre yöneticisi",
    problem:
      "VPN, parolanı korumaz. Aynı parolayı birden çok sitede kullanmak hâlâ en yaygın hesap ele geçirme nedenidir (Verizon DBIR 2024). Her hesap için benzersiz, güçlü ve hatırlanması gerekmeyen parolalar üretip saklamak için bir şifre yöneticisi gereklidir.",
    tools: [
      {
        name: "Bitwarden",
        summary:
          "Açık kaynak, kendi sunucunda çalıştırılabilen şifre yöneticisi. Ücretsiz plan çoğu kullanıcı için yeterlidir.",
        note: "Sağlayıcı raporlarına göre düzenli üçüncü taraf denetimleri yayınlanmaktadır.",
        cost: "Ücretsiz / $10/yıl Premium",
        openSource: true,
        url: "https://bitwarden.com/",
      },
      {
        name: "1Password",
        summary:
          "Ticari ürün, aile/iş planlarında öne çıkan kullanıcı deneyimi. Açık kaynak değildir ancak güvenlik denetimleri kamuya açık.",
        cost: "$2.99/ay (bireysel)",
        openSource: false,
        url: "https://1password.com/",
      },
      {
        name: "KeePassXC",
        summary:
          "Lokal, açık kaynak, çevrimdışı çalışan şifre yöneticisi. Bulut senkronizasyon istemeyen kullanıcılar için.",
        cost: "Ücretsiz",
        openSource: true,
        url: "https://keepassxc.org/",
      },
    ],
  },
  {
    id: "2fa",
    icon: Smartphone,
    title: "İki faktörlü kimlik doğrulama (2FA)",
    problem:
      "Parolan ele geçse bile 2FA varsa hesabına giriş yapılamaz. SMS tabanlı 2FA SIM-swap saldırılarına karşı zayıftır; TOTP (uygulama tabanlı) veya donanım anahtarı tercih edilmelidir.",
    tools: [
      {
        name: "Aegis Authenticator (Android)",
        summary:
          "Açık kaynak TOTP uygulaması. Şifrelenmiş yedekleme, biyometrik kilit.",
        cost: "Ücretsiz",
        openSource: true,
        url: "https://getaegis.app/",
      },
      {
        name: "2FAS (iOS / Android)",
        summary:
          "Açık kaynak, çapraz platform TOTP uygulaması. iCloud yedek opsiyonu.",
        cost: "Ücretsiz",
        openSource: true,
        url: "https://2fas.com/",
      },
      {
        name: "YubiKey (donanım anahtarı)",
        summary:
          "Fiziksel USB anahtar. En güçlü 2FA biçimi; kritik hesaplar (e-posta, bankacılık) için önerilir.",
        cost: "$25-$70 (tek sefer)",
        openSource: false,
        url: "https://www.yubico.com/",
      },
    ],
  },
  {
    id: "email",
    icon: Mail,
    title: "Şifreli e-posta",
    problem:
      "Gmail, Outlook ve benzeri sağlayıcılar e-postalarını sunucularında okur (içerik tarama, reklam, AI eğitimi). Hassas iletişim için uçtan uca şifreli e-posta önerilir.",
    tools: [
      {
        name: "Proton Mail",
        summary:
          "İsviçre merkezli, açık kaynak istemciler, uçtan uca şifreli e-posta. Ücretsiz plan 1 GB ile başlar.",
        note: "Aynı şirket Proton VPN, Proton Drive ve Proton Pass da sunmaktadır.",
        cost: "Ücretsiz / €4/ay",
        openSource: true,
        url: "https://proton.me/mail",
      },
      {
        name: "Tutanota",
        summary:
          "Almanya merkezli, açık kaynak e-posta. Hesap kayıt sırasında telefon numarası istemez.",
        cost: "Ücretsiz / €3/ay",
        openSource: true,
        url: "https://tutanota.com/",
      },
    ],
  },
  {
    id: "browser",
    icon: Eye,
    title: "Tarayıcı ve genişletmeler",
    problem:
      "Tarayıcı parmak izi, çerezler ve takip pikselleri VPN'in göremediği yerlerden seni izler. Doğru tarayıcı + genişletme kombinasyonu bu takibin büyük kısmını engeller.",
    tools: [
      {
        name: "Firefox + uBlock Origin",
        summary:
          "Açık kaynak tarayıcı + endüstri standardı reklam/izleyici engelleyici. Chrome'un Manifest V3 kısıtlamalarından etkilenmez.",
        cost: "Ücretsiz",
        openSource: true,
        url: "https://www.mozilla.org/firefox/",
      },
      {
        name: "Brave",
        summary:
          "Chromium tabanlı, yerleşik reklam/izleyici engelleme, opsiyonel Tor entegrasyonu.",
        note: "Şirket içi reklam ağı modeli vardır; rahatsız ediyorsa kapatılabilir.",
        cost: "Ücretsiz",
        openSource: true,
        url: "https://brave.com/",
      },
      {
        name: "uBlock Origin (uzantı)",
        summary:
          "Firefox, Chrome (MV2), Edge için. Tek başına en etkili tarayıcı gizlilik aracı sayılabilir.",
        cost: "Ücretsiz",
        openSource: true,
        url: "https://github.com/gorhill/uBlock",
      },
      {
        name: "Privacy Badger (EFF)",
        summary:
          "Electronic Frontier Foundation tarafından geliştirilen, davranışsal izleyici engelleme uzantısı.",
        cost: "Ücretsiz",
        openSource: true,
        url: "https://privacybadger.org/",
      },
    ],
  },
  {
    id: "antivirus",
    icon: Shield,
    title: "Antivirüs / zararlı yazılım koruması",
    problem:
      "VPN, zararlı yazılım indirilmesini engellemez. İndirilen dosyalar, e-posta ekleri ve phishing siteleri için ayrı bir koruma katmanı önerilir.",
    tools: [
      {
        name: "Microsoft Defender (Windows yerleşik)",
        summary:
          "Windows 10/11 ile gelen, AV-TEST raporlarında üst sıralarda yer alan ücretsiz çözüm. Çoğu kullanıcı için yeterlidir.",
        cost: "Ücretsiz (yerleşik)",
        openSource: false,
        url: "https://www.microsoft.com/security/business/endpoint-security/microsoft-defender-endpoint",
      },
      {
        name: "ClamAV (Linux / komut satırı)",
        summary:
          "Açık kaynak, çoğunlukla sunucu tarafı dosya taraması için. Linux ev kullanıcıları için da yararlıdır.",
        cost: "Ücretsiz",
        openSource: true,
        url: "https://www.clamav.net/",
      },
      {
        name: "Malwarebytes (ek tarama)",
        summary:
          "Mevcut antivirüsünü değiştirmek için değil, \"ikinci görüş\" taraması için. Ücretsiz sürüm manuel tarama yapar.",
        cost: "Ücretsiz / $39.99/yıl",
        openSource: false,
        url: "https://www.malwarebytes.com/",
      },
    ],
  },
  {
    id: "storage",
    icon: HardDrive,
    title: "Şifreli depolama / yedekleme",
    problem:
      "Google Drive, OneDrive ve iCloud içeriklerini sunucularında okuyabilir. Hassas dosyalar için uçtan uca şifreli bulut depolama veya lokal şifreleme önerilir.",
    tools: [
      {
        name: "Proton Drive",
        summary: "Uçtan uca şifreli bulut depolama. İsviçre yargı yetkisi.",
        cost: "Ücretsiz 5 GB / Plus",
        openSource: true,
        url: "https://proton.me/drive",
      },
      {
        name: "Cryptomator",
        summary:
          "Mevcut bulut depolamanı (Google Drive, Dropbox vb.) şifreli kasaya çevirir. Açık kaynak.",
        cost: "Ücretsiz (masaüstü) / Mobil ücretli",
        openSource: true,
        url: "https://cryptomator.org/",
      },
      {
        name: "Veracrypt",
        summary:
          "Lokal disk/dosya şifreleme. Açık kaynak ve düzenli denetimlerden geçen TrueCrypt'in mirası.",
        cost: "Ücretsiz",
        openSource: true,
        url: "https://www.veracrypt.fr/",
      },
    ],
  },
];

const EN_CATEGORIES: Category[] = [
  {
    id: "password-manager",
    icon: KeyRound,
    title: "Password manager",
    problem:
      "A VPN doesn't protect your password. Reusing the same password across sites is still the most common cause of account takeover (Verizon DBIR 2024). You need a password manager to generate and store a unique, strong password per account that you don't have to remember.",
    tools: [
      {
        name: "Bitwarden",
        summary:
          "Open-source password manager that can be self-hosted. The free plan is enough for most users.",
        note: "Per provider reports, regular third-party audits are published.",
        cost: "Free / $10/year Premium",
        openSource: true,
        url: "https://bitwarden.com/",
      },
      {
        name: "1Password",
        summary:
          "A commercial product with a polished UX on family/team plans. Not open source, but security audits are public.",
        cost: "$2.99/month (individual)",
        openSource: false,
        url: "https://1password.com/",
      },
      {
        name: "KeePassXC",
        summary:
          "Local, open source, offline password manager — for users who don't want cloud sync.",
        cost: "Free",
        openSource: true,
        url: "https://keepassxc.org/",
      },
    ],
  },
  {
    id: "2fa",
    icon: Smartphone,
    title: "Two-factor authentication (2FA)",
    problem:
      "Even if your password is stolen, 2FA prevents account access. SMS-based 2FA is weak against SIM-swap attacks; prefer TOTP (app-based) or a hardware key.",
    tools: [
      {
        name: "Aegis Authenticator (Android)",
        summary:
          "Open-source TOTP app. Encrypted backups, biometric lock.",
        cost: "Free",
        openSource: true,
        url: "https://getaegis.app/",
      },
      {
        name: "2FAS (iOS / Android)",
        summary:
          "Open-source, cross-platform TOTP app. iCloud backup option.",
        cost: "Free",
        openSource: true,
        url: "https://2fas.com/",
      },
      {
        name: "YubiKey (hardware key)",
        summary:
          "A physical USB key. The strongest form of 2FA; recommended for critical accounts (email, banking).",
        cost: "$25-$70 (one-time)",
        openSource: false,
        url: "https://www.yubico.com/",
      },
    ],
  },
  {
    id: "email",
    icon: Mail,
    title: "Encrypted email",
    problem:
      "Gmail, Outlook and similar providers read your email on their servers (content scanning, ads, AI training). For sensitive communication, prefer end-to-end encrypted email.",
    tools: [
      {
        name: "Proton Mail",
        summary:
          "Swiss-based, open-source clients, end-to-end encrypted email. The free plan starts at 1 GB.",
        note: "The same company also offers Proton VPN, Proton Drive and Proton Pass.",
        cost: "Free / €4/month",
        openSource: true,
        url: "https://proton.me/mail",
      },
      {
        name: "Tutanota",
        summary:
          "German-based, open-source email. Sign-up does not require a phone number.",
        cost: "Free / €3/month",
        openSource: true,
        url: "https://tutanota.com/",
      },
    ],
  },
  {
    id: "browser",
    icon: Eye,
    title: "Browser and extensions",
    problem:
      "Browser fingerprinting, cookies and tracking pixels follow you in places a VPN can't see. The right browser + extension combo blocks most of that tracking.",
    tools: [
      {
        name: "Firefox + uBlock Origin",
        summary:
          "Open-source browser + the industry-standard ad/tracker blocker. Not affected by Chrome's Manifest V3 restrictions.",
        cost: "Free",
        openSource: true,
        url: "https://www.mozilla.org/firefox/",
      },
      {
        name: "Brave",
        summary:
          "Chromium-based with built-in ad/tracker blocking and optional Tor integration.",
        note: "There's an in-house ad-network model; it can be turned off if you don't want it.",
        cost: "Free",
        openSource: true,
        url: "https://brave.com/",
      },
      {
        name: "uBlock Origin (extension)",
        summary:
          "For Firefox, Chrome (MV2) and Edge. Arguably the single most effective browser privacy tool.",
        cost: "Free",
        openSource: true,
        url: "https://github.com/gorhill/uBlock",
      },
      {
        name: "Privacy Badger (EFF)",
        summary:
          "A behavioural tracker-blocker built by the Electronic Frontier Foundation.",
        cost: "Free",
        openSource: true,
        url: "https://privacybadger.org/",
      },
    ],
  },
  {
    id: "antivirus",
    icon: Shield,
    title: "Antivirus / malware protection",
    problem:
      "A VPN doesn't stop malware from being downloaded. You need a separate layer of protection for downloaded files, email attachments and phishing sites.",
    tools: [
      {
        name: "Microsoft Defender (built into Windows)",
        summary:
          "Ships with Windows 10/11 and consistently ranks well in AV-TEST reports. Enough for most users.",
        cost: "Free (built-in)",
        openSource: false,
        url: "https://www.microsoft.com/security/business/endpoint-security/microsoft-defender-endpoint",
      },
      {
        name: "ClamAV (Linux / CLI)",
        summary:
          "Open-source, mostly used for server-side file scanning. Also useful for Linux home users.",
        cost: "Free",
        openSource: true,
        url: "https://www.clamav.net/",
      },
      {
        name: "Malwarebytes (second-opinion scan)",
        summary:
          "Not a replacement for your AV, but a \"second opinion\" scan. The free version scans manually.",
        cost: "Free / $39.99/year",
        openSource: false,
        url: "https://www.malwarebytes.com/",
      },
    ],
  },
  {
    id: "storage",
    icon: HardDrive,
    title: "Encrypted storage / backup",
    problem:
      "Google Drive, OneDrive and iCloud can read your content on their servers. For sensitive files, prefer end-to-end encrypted cloud storage or local encryption.",
    tools: [
      {
        name: "Proton Drive",
        summary: "End-to-end encrypted cloud storage. Swiss jurisdiction.",
        cost: "Free 5 GB / Plus",
        openSource: true,
        url: "https://proton.me/drive",
      },
      {
        name: "Cryptomator",
        summary:
          "Turns your existing cloud storage (Google Drive, Dropbox, etc.) into an encrypted vault. Open source.",
        cost: "Free (desktop) / paid on mobile",
        openSource: true,
        url: "https://cryptomator.org/",
      },
      {
        name: "Veracrypt",
        summary:
          "Local disk/file encryption. Open source, the heir to TrueCrypt with regular audits.",
        cost: "Free",
        openSource: true,
        url: "https://www.veracrypt.fr/",
      },
    ],
  },
];

const TR_STRINGS: Strings = {
  breadcrumbHome: "Ana sayfa",
  breadcrumbHere: "Güvenlik Araçları",
  badge: "Tamamlayıcı stack",
  h1: "VPN ile birlikte kullanılacak güvenlik araçları",
  lede: "VPN, gizlilik yığınının yalnızca bir parçasıdır. Şifre yöneticisi, 2FA, şifreli e-posta, tarayıcı genişletmeleri ve antivirüs ile birleştiğinde anlamlı bir koruma katmanı oluşturur. İşte tamamlayıcı araç önerileri.",
  importantTitle: "Önemli not:",
  importantBody:
    " Bu sayfa VPN sağlayıcıları gibi bağımsız test çerçevemize tabi tutulmamıştır; öneriler kamuya açık kaynaklar, denetim raporları ve sektör pratiklerine dayalıdır. Araçların güncel özelliklerini ve fiyatlarını satın almadan önce kendi resmi sitelerinden doğrulamanı öneririz. Bu sayfada ",
  importantNoAffiliate: "affiliate bağlantısı yer almamaktadır",
  navLabel: "Kategoriler",
  openSource: "Açık kaynak",
  closedSource: "Kapalı kaynak",
  officialSite: "Resmi site",
  articleH2: "Tamamlayıcı güvenlik yığını — pratik öneri",
  articleIntro: "Sıfırdan başlıyorsan, bu sırayla kurman önerilir:",
  steps: [
    {
      bold: "Bir şifre yöneticisi kur",
      rest: " ve mevcut tüm parolalarını oraya taşıyıp benzersiz/güçlü parolalara çevir. Çoğu kullanıcı için Bitwarden ücretsiz planı yeterlidir.",
    },
    {
      bold: "Kritik hesaplarda (e-posta, bankacılık, sosyal medya) 2FA aç.",
      rest: " SMS yerine TOTP uygulaması veya donanım anahtarı tercih et.",
    },
    {
      bold: "Tarayıcına uBlock Origin kur.",
      rest: " Tek başına alabileceğin en yüksek getirili gizlilik adımıdır.",
    },
    {
      bold: "VPN'i ekle.",
      rest: " Halka açık Wi-Fi, ISP gözetimi ve coğrafi bypass için. Quiz'imiz sana uygun seçimi bulmaya yardımcı olabilir.",
    },
    {
      bold: "Hassas iletişim için şifreli e-posta düşün.",
      rest: " Tüm e-posta hesaplarını taşımak gerekmeyebilir; banka şifre sıfırlama, kripto borsa hesabı gibi kritik akışlar için yeterlidir.",
    },
    {
      bold: "Yedeklemeyi şifrele.",
      rest: " Cryptomator veya Proton Drive gibi araçlar mevcut bulut depolamanı güvenli hale getirir.",
    },
  ],
  avoidH2: "Hangi araçtan kaçınmalı?",
  avoidItems: [
    {
      bold: "Tarayıcı yerleşik \"parola kaydet\" özellikleri",
      rest: " — Çoğu işletim sistemi senkronize edebilir ama bağımsız bir şifre yöneticisi kadar güvenli değildir.",
    },
    {
      bold: "SMS tabanlı 2FA",
      rest: " — SIM-swap saldırılarına karşı zayıftır; mümkünse TOTP'ye geç.",
    },
    {
      bold: "Ücretsiz antivirüs reklamları",
      rest: " — \"Bilgisayarınızda virüs var!\" pop-up'ları gösteren bedava yazılımlar tipik olarak kendileri zararlı yazılım taşır. Microsoft Defender çoğu kullanıcı için yeterlidir.",
    },
    {
      bold: "Web tabanlı \"ücretsiz proxy\"",
      rest: " — Trafik şifreli değildir, sahip kim olduğu belirsizdir; güvenli VPN yerine geçmez.",
    },
  ],
  nextStep: "Sıradaki adım",
  nextLinks: [
    { label: "VPN seçimine başla", href: "/sana-uygun-vpn" },
    { label: "VPN nedir?", href: "/rehber/vpn-nedir" },
    {
      label: "VPN güvenlik kontrol listesi",
      href: "/rehber/vpn-guvenlik-kontrol-listesi",
    },
  ],
};

const EN_STRINGS: Strings = {
  breadcrumbHome: "Home",
  breadcrumbHere: "Security Tools",
  badge: "Complementary stack",
  h1: "Security tools to use alongside a VPN",
  lede: "A VPN is only part of a privacy stack. Combined with a password manager, 2FA, encrypted email, browser extensions and an antivirus, it forms a meaningful layer of protection. Here are the complementary picks.",
  importantTitle: "Important note:",
  importantBody:
    " This page isn't subject to our independent VPN-testing framework; the picks are based on public sources, audit reports and industry practice. Verify current features and pricing on each tool's official site before buying. This page contains ",
  importantNoAffiliate: "no affiliate links",
  navLabel: "Categories",
  openSource: "Open source",
  closedSource: "Closed source",
  officialSite: "Official site",
  articleH2: "Complementary security stack — practical recommendation",
  articleIntro: "If you're starting from scratch, set them up in this order:",
  steps: [
    {
      bold: "Install a password manager",
      rest: " and move all your existing passwords into it, then change them to unique/strong ones. Bitwarden's free plan is enough for most users.",
    },
    {
      bold: "Turn on 2FA on critical accounts (email, banking, social media).",
      rest: " Prefer a TOTP app or hardware key over SMS.",
    },
    {
      bold: "Install uBlock Origin in your browser.",
      rest: " On its own, it's the highest-impact privacy step you can take.",
    },
    {
      bold: "Add a VPN.",
      rest: " For public Wi-Fi, ISP surveillance and geo-bypass. Our quiz can help you find the right pick.",
    },
    {
      bold: "Consider encrypted email for sensitive communication.",
      rest: " You don't have to move all your inboxes; it's enough for critical flows like bank password resets and crypto-exchange accounts.",
    },
    {
      bold: "Encrypt your backups.",
      rest: " Tools like Cryptomator or Proton Drive keep your existing cloud storage safe.",
    },
  ],
  avoidH2: "What to avoid",
  avoidItems: [
    {
      bold: "Browsers' built-in \"save password\" features",
      rest: " — most operating systems can sync them, but they're not as safe as a dedicated password manager.",
    },
    {
      bold: "SMS-based 2FA",
      rest: " — weak against SIM-swap attacks; move to TOTP when you can.",
    },
    {
      bold: "Free antivirus ads",
      rest: " — \"You have a virus!\" pop-up freebies typically carry malware themselves. Microsoft Defender is enough for most users.",
    },
    {
      bold: "Web-based \"free proxies\"",
      rest: " — traffic isn't encrypted and ownership is unclear; not a substitute for a real VPN.",
    },
  ],
  nextStep: "Next step",
  nextLinks: [
    { label: "Start picking a VPN", href: "/sana-uygun-vpn" },
    { label: "What is a VPN?", href: "/rehber/vpn-nedir" },
    {
      label: "VPN security checklist",
      href: "/rehber/vpn-guvenlik-kontrol-listesi",
    },
  ],
};

export function getSecurityContent(locale: string) {
  const isEn = locale === "en";
  return {
    strings: isEn ? EN_STRINGS : TR_STRINGS,
    categories: isEn ? EN_CATEGORIES : TR_CATEGORIES,
  };
}

export function SecurityToolsBody({ locale }: { locale: string }) {
  const { strings, categories } = getSecurityContent(locale);
  return (
    <>
      <p className="text-sm text-ink-muted">
        <Link href="/" className="hover:text-ink">
          {strings.breadcrumbHome}
        </Link>{" "}
        › <span className="text-ink-strong">{strings.breadcrumbHere}</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <Layers className="size-3" /> {strings.badge}
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          {strings.h1}
        </h1>
        <p className="mt-4 text-lg text-ink-muted">{strings.lede}</p>
      </header>

      <Card className="mt-8 p-6 bg-brand-50/40">
        <p className="text-sm text-ink leading-relaxed">
          <strong className="text-ink-strong">{strings.importantTitle}</strong>
          {strings.importantBody}
          <strong>{strings.importantNoAffiliate}</strong>.
        </p>
      </Card>

      <nav aria-label={strings.navLabel} className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
          >
            <cat.icon className="size-3.5 text-brand-600" />
            {cat.title}
          </a>
        ))}
      </nav>

      <div className="mt-12 space-y-12">
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-20">
            <div className="flex items-start gap-3">
              <div className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 shrink-0">
                <cat.icon className="size-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-ink-strong">
                  {cat.title}
                </h2>
                <p className="mt-1 text-sm text-ink-muted leading-relaxed">
                  {cat.problem}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {cat.tools.map((tool) => (
                <Card key={tool.name} className="p-5 flex flex-col">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h3 className="font-semibold text-ink-strong">
                      {tool.name}
                    </h3>
                    {tool.openSource ? (
                      <Badge variant="success">{strings.openSource}</Badge>
                    ) : (
                      <Badge variant="outline">{strings.closedSource}</Badge>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-ink leading-relaxed">
                    {tool.summary}
                  </p>
                  {tool.note ? (
                    <p className="mt-2 text-xs text-ink-muted italic">
                      {tool.note}
                    </p>
                  ) : null}
                  <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-ink-muted">
                      {tool.cost}
                    </span>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:underline"
                    >
                      {strings.officialSite}
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      <article className="mt-16 prose prose-stone max-w-none">
        <h2>{strings.articleH2}</h2>
        <p>{strings.articleIntro}</p>
        <ol>
          {strings.steps.map((s) => (
            <li key={s.bold}>
              <strong>{s.bold}</strong>
              {s.rest}
            </li>
          ))}
        </ol>

        <h2>{strings.avoidH2}</h2>
        <ul>
          {strings.avoidItems.map((s) => (
            <li key={s.bold}>
              <strong>{s.bold}</strong>
              {s.rest}
            </li>
          ))}
        </ul>
      </article>

      <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
        <p className="text-sm text-ink-muted">{strings.nextStep}</p>
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          {strings.nextLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
