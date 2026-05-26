import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
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
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "VPN ile Birlikte Kullanılacak Güvenlik Araçları (2026) — Tamamlayıcı Stack",
  description:
    "VPN tek başına yetmez. Şifre yöneticisi, şifreli e-posta, antivirüs, tarayıcı genişletmeleri ve 2FA — gerçek bir gizlilik/güvenlik yığını için tamamlayıcı araç önerileri.",
  alternates: { canonical: absoluteUrl("/guvenlik-araclari") },
  openGraph: {
    title: "VPN ile Birlikte Kullanılacak Güvenlik Araçları",
    description:
      "Şifre yöneticisi, şifreli e-posta, antivirüs ve 2FA — VPN'i tamamlayan stack.",
    url: absoluteUrl("/guvenlik-araclari"),
    type: "article",
  },
  keywords: [
    "şifre yöneticisi",
    "şifreli e-posta",
    "2fa uygulaması",
    "açık kaynak antivirüs",
    "ublock origin",
    "bitwarden",
    "proton mail",
    "vpn alternatif yazılım",
  ],
};

type Props = { params: Promise<{ locale: string }> };

type ToolCategory = {
  id: string;
  icon: LucideIcon;
  title: string;
  problem: string;
  tools: {
    name: string;
    summary: string;
    /** Stance / important note */
    note?: string;
    cost: string;
    openSource: boolean;
    url: string;
  }[];
};

const CATEGORIES: ToolCategory[] = [
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
      "Tarayıcı parmak izi, çerezler ve takip pikselleri VPN&apos;in göremediği yerlerden seni izler. Doğru tarayıcı + genişletme kombinasyonu bu takibin büyük kısmını engeller.",
    tools: [
      {
        name: "Firefox + uBlock Origin",
        summary:
          "Açık kaynak tarayıcı + endüstri standardı reklam/izleyici engelleyici. Chrome&apos;un Manifest V3 kısıtlamalarından etkilenmez.",
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
          "Mevcut antivirüsünü değiştirmek için değil, &quot;ikinci görüş&quot; taraması için. Ücretsiz sürüm manuel tarama yapar.",
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
        summary:
          "Uçtan uca şifreli bulut depolama. İsviçre yargı yetkisi.",
        cost: "Ücretsiz 5 GB / Plus &nbsp;",
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
          "Lokal disk/dosya şifreleme. Açık kaynak ve düzenli denetimlerden geçen TrueCrypt&apos;in mirası.",
        cost: "Ücretsiz",
        openSource: true,
        url: "https://www.veracrypt.fr/",
      },
    ],
  },
];

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana sayfa", path: "/" },
          { name: "Güvenlik Araçları", path: "/guvenlik-araclari" },
        ])}
      />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          › <span className="text-ink-strong">Güvenlik Araçları</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Layers className="size-3" /> Tamamlayıcı stack
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            VPN ile birlikte kullanılacak güvenlik araçları
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            VPN, gizlilik yığınının yalnızca bir parçasıdır. Şifre yöneticisi,
            2FA, şifreli e-posta, tarayıcı genişletmeleri ve antivirüs ile
            birleştiğinde anlamlı bir koruma katmanı oluşturur. İşte
            tamamlayıcı araç önerileri.
          </p>
        </header>

        <Card className="mt-8 p-6 bg-brand-50/40">
          <p className="text-sm text-ink leading-relaxed">
            <strong className="text-ink-strong">Önemli not:</strong> Bu sayfa
            VPN sağlayıcıları gibi bağımsız test çerçevemize tabi
            tutulmamıştır; öneriler kamuya açık kaynaklar, denetim raporları
            ve sektör pratiklerine dayalıdır. Araçların güncel özelliklerini
            ve fiyatlarını satın almadan önce kendi resmi sitelerinden
            doğrulamanı öneririz. Bu sayfada{" "}
            <strong>affiliate bağlantısı yer almamaktadır</strong> —
            öneriler tamamen editöryel.
          </p>
        </Card>

        <nav aria-label="Kategoriler" className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
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
          {CATEGORIES.map((cat) => (
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
                        <Badge variant="success">Açık kaynak</Badge>
                      ) : (
                        <Badge variant="outline">Kapalı kaynak</Badge>
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
                        Resmi site
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
          <h2>Tamamlayıcı güvenlik yığını — pratik öneri</h2>
          <p>
            Sıfırdan başlıyorsan, bu sırayla kurman önerilir:
          </p>
          <ol>
            <li>
              <strong>Bir şifre yöneticisi kur</strong> ve mevcut tüm
              parolalarını oraya taşıyıp benzersiz/güçlü parolalara çevir.
              Çoğu kullanıcı için Bitwarden ücretsiz planı yeterlidir.
            </li>
            <li>
              <strong>Kritik hesaplarda (e-posta, bankacılık, sosyal
              medya) 2FA aç.</strong> SMS yerine TOTP uygulaması veya
              donanım anahtarı tercih et.
            </li>
            <li>
              <strong>Tarayıcına uBlock Origin kur.</strong> Tek başına
              alabileceğin en yüksek getirili gizlilik adımıdır.
            </li>
            <li>
              <strong>VPN&apos;i ekle.</strong> Halka açık Wi-Fi, ISP
              gözetimi ve coğrafi bypass için.{" "}
              <Link href="/sana-uygun-vpn">Quiz</Link>&apos;imiz sana uygun
              seçimi bulmaya yardımcı olabilir.
            </li>
            <li>
              <strong>Hassas iletişim için şifreli e-posta düşün.</strong>{" "}
              Tüm e-posta hesaplarını taşımak gerekmeyebilir; banka
              şifre sıfırlama, kripto borsa hesabı gibi kritik akışlar
              için yeterlidir.
            </li>
            <li>
              <strong>Yedeklemeyi şifrele.</strong> Cryptomator veya
              Proton Drive gibi araçlar mevcut bulut depolamanı güvenli
              hale getirir.
            </li>
          </ol>

          <h2>Hangi araçtan kaçınmalı?</h2>
          <ul>
            <li>
              <strong>Tarayıcı yerleşik &quot;parola kaydet&quot;
              özellikleri</strong> — Çoğu işletim sistemi senkronize
              edebilir ama bağımsız bir şifre yöneticisi kadar güvenli
              değildir.
            </li>
            <li>
              <strong>SMS tabanlı 2FA</strong> — SIM-swap saldırılarına
              karşı zayıftır; mümkünse TOTP&apos;ye geç.
            </li>
            <li>
              <strong>Ücretsiz antivirüs reklamları</strong> —
              &quot;Bilgisayarınızda virüs var!&quot; pop-up&apos;ları
              gösteren bedava yazılımlar tipik olarak kendileri zararlı
              yazılım taşır. Microsoft Defender çoğu kullanıcı için
              yeterlidir.
            </li>
            <li>
              <strong>Web tabanlı &quot;ücretsiz proxy&quot;</strong> —
              Trafik şifreli değildir, sahip kim olduğu belirsizdir;
              güvenli VPN yerine geçmez.
            </li>
          </ul>
        </article>

        <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">Sıradaki adım</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/sana-uygun-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              VPN seçimine başla
            </Link>
            <Link
              href="/rehber/vpn-nedir"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              VPN nedir?
            </Link>
            <Link
              href="/rehber/vpn-guvenlik-kontrol-listesi"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              VPN güvenlik kontrol listesi
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
