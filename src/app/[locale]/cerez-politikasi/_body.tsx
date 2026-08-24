import { Cookie, CheckCircle2, AlertCircle, Database } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TrBody() {
  return (
    <>
      <p className="text-sm text-ink-muted">
        <Link href="/" className="hover:text-ink">
          Ana sayfa
        </Link>{" "}
        › <span className="text-ink-strong">Çerez Politikası</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <Cookie className="size-3" /> Onaya dayalı çerez
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Çerez Politikası
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Son güncelleme: Haziran 2026
        </p>
      </header>

      <Card className="mt-8 p-6 bg-success-50/60 border-success-200/60">
        <h2 className="text-lg font-semibold text-success-700 flex items-center gap-2">
          <CheckCircle2 className="size-5" /> Kısa cevap: Analitik çerezler
          yalnızca onayınızla
        </h2>
        <p className="mt-3 text-ink leading-relaxed text-sm">
          vpnadvisor.net <strong>zorunlu olmayan hiçbir çerezi siz
          onaylamadan yazmaz</strong>. Trafiği ölçmek için Google Analytics
          kullanırız; bu yalnızca çerez banner&apos;ından{" "}
          <strong>&quot;Kabul et&quot;</strong> dediğinizde devreye girer.
          Ayrıca dil tercihinizi hatırlamak için tek bir{" "}
          <strong>zorunlu (fonksiyonel) çerez</strong> kullanırız. Bu sayfa
          hepsini açıklar.
        </p>
      </Card>

      <article className="mt-12 prose prose-stone max-w-none dark:prose-invert">
        <h2>1. Çerez nedir?</h2>
        <p>
          Çerez, ziyaret ettiğin web sitesinin tarayıcına yerleştirdiği
          küçük bir metin dosyasıdır. Genellikle oturum bilgisi tutmak,
          reklam göstermek veya kullanıcı davranışını izlemek için
          kullanılır.{" "}
          <strong>
            Birinci taraf çerezler (siteye ait) ve üçüncü taraf çerezler
            (reklam, analitik vb.) olarak ikiye ayrılır.
          </strong>
        </p>

        <h2>2. Hangi çerezleri kullanıyoruz?</h2>
        <p>
          İki tür çerez söz konusu: dil tercihini hatırlayan tek bir{" "}
          <strong>zorunlu (fonksiyonel)</strong> çerez ve yalnızca onayınızla
          devreye giren <strong>analitik</strong> çerezler.
        </p>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="min-w-full border border-border text-sm">
            <thead className="bg-surface-subtle">
              <tr>
                <th className="border border-border px-3 py-2 text-left">
                  Çerez
                </th>
                <th className="border border-border px-3 py-2 text-left">
                  Tür
                </th>
                <th className="border border-border px-3 py-2 text-left">
                  Amaç
                </th>
                <th className="border border-border px-3 py-2 text-left">
                  Süre
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-3 py-2 font-mono text-xs">
                  NEXT_LOCALE
                </td>
                <td className="border border-border px-3 py-2">
                  Zorunlu / fonksiyonel
                </td>
                <td className="border border-border px-3 py-2">
                  Dil tercihinizi (TR/EN) hatırlar
                </td>
                <td className="border border-border px-3 py-2">1 yıl</td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-mono text-xs">
                  _ga, _ga_*
                </td>
                <td className="border border-border px-3 py-2">
                  Analitik (onaya bağlı)
                </td>
                <td className="border border-border px-3 py-2">
                  Google Analytics — ziyaretçi sayımı
                </td>
                <td className="border border-border px-3 py-2">~2 yıl</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>2.1 Google Analytics — onaya dayalı analitik</h3>
        <p>
          Site trafiğini ölçmek için{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Analytics 4
          </a>{" "}
          kullanırız. Çalışma şekli:
        </p>
        <ul>
          <li>
            <strong>Google Consent Mode v2</strong> ile çalışır: onay
            vermeden önce analitik depolama <strong>&quot;denied&quot;</strong>{" "}
            durumdadır; bu modda GA <strong>çerez yazmaz</strong>, yalnızca
            kimliksiz toplu ping gönderir.
          </li>
          <li>
            Çerez banner&apos;ından <strong>&quot;Kabul et&quot;</strong>{" "}
            dediğinizde <code>_ga</code> çerezleri set edilir ve normal
            ölçüm başlar. <strong>&quot;Reddet&quot;</strong> derseniz hiçbir
            analitik çerez yazılmaz.
          </li>
          <li>
            Sayfa görüntüleme, yaklaşık konum (IP&apos;den, IP saklanmaz),
            cihaz ve tarayıcı gibi toplu veriler toplanır.
          </li>
          <li>
            Veri işleyici <strong>Google LLC</strong>&apos;dir; veriler AB
            dışına (ABD) aktarılabilir. Tercihinizi istediğiniz zaman
            tarayıcı verilerini silerek geri alabilirsiniz.
          </li>
        </ul>

        <h3>2.2 LocalStorage — yerel tarayıcı tercihleri</h3>
        <p>
          Tarayıcının yerel depolama alanı (localStorage) çerezden farklı
          bir teknolojidir. Veri sadece <strong>senin tarayıcında
          kalır</strong>, sunucumuza hiç gönderilmez. Bizim
          kullandıklarımız:
        </p>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="min-w-full border border-border text-sm">
            <thead className="bg-surface-subtle">
              <tr>
                <th className="border border-border px-3 py-2 text-left">
                  Anahtar
                </th>
                <th className="border border-border px-3 py-2 text-left">
                  Amaç
                </th>
                <th className="border border-border px-3 py-2 text-left">
                  Süre
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-3 py-2 font-mono text-xs">
                  vpnadvisor-theme
                </td>
                <td className="border border-border px-3 py-2">
                  Açık/koyu tema tercihin
                </td>
                <td className="border border-border px-3 py-2">
                  Sen silene kadar
                </td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-mono text-xs">
                  ip-security-banner-dismissed
                </td>
                <td className="border border-border px-3 py-2">
                  IP güvenlik banner&apos;ını &quot;kapat&quot;
                  dediğin bilgi
                </td>
                <td className="border border-border px-3 py-2">
                  Sen silene kadar
                </td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-mono text-xs">
                  vpnadvisor:consent
                </td>
                <td className="border border-border px-3 py-2">
                  Çerez onay tercihin (kabul / reddet)
                </td>
                <td className="border border-border px-3 py-2">
                  Sen silene kadar
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Bu veriler <strong>kesinlikle gerekli</strong> kategorisindedir
          (tercih saklama) — KVKK ve GDPR&apos;a göre kullanıcı onayı{" "}
          <strong>gerektirmez</strong>.
        </p>

        <h3>2.3 Reklam çerezleri (Google AdSense)</h3>
        <p>
          Sayfalarımızda <strong>Google AdSense</strong> reklamları
          gösterilir. Google ve iş ortakları, reklamları sunmak,
          kişiselleştirmek ve ölçmek için çerez ve benzeri teknolojiler
          kullanabilir. Bunlar <strong>bizim değil, üçüncü taraf (Google)
          çerezleridir</strong>.
        </p>
        <ul>
          <li>
            Avrupa Ekonomik Alanı, Birleşik Krallık ve İsviçre ziyaretçileri
            için kişiselleştirilmiş reklam ve ölçüm çerezleri yalnızca{" "}
            <strong>açık onay verdiğinde</strong> etkinleştirilir (Google
            Consent Mode v2)
          </li>
          <li>
            Onay vermezsen Google sınırlı veya kişiselleştirilmemiş reklam
            sunabilir
          </li>
          <li>
            VPN sağlayıcısının bağlantısına tıkladığında doğrudan o
            sağlayıcının resmi sitesine gidersin; bizim koyduğumuz bir izleme
            çerezi yoktur, hedef sitenin kendi çerezleri geçerli olur
          </li>
        </ul>

        <h2>3. Çerez onayı (banner)</h2>
        <p>
          Türkiye (KVKK), AB (GDPR/ePrivacy) ve İngiltere (PECR)
          mevzuatına göre <strong>gerekli olmayan çerezler için</strong>{" "}
          açık onay gerekir. Bu yüzden analitik (Google Analytics) ve reklam
          (Google AdSense) çerezleri için bir{" "}
          <strong>çerez onay banner&apos;ı</strong> gösteririz; siz
          &quot;Kabul et&quot; demeden bu çerezler yazılmaz.
          Dil tercihini tutan <code>NEXT_LOCALE</code> çerezi ise
          &quot;kesinlikle gerekli&quot; kategorisindedir ve onay gerektirmez.
          Seçiminiz tarayıcınızda saklanır; tarayıcı verilerinizi silerek
          banner&apos;ı tekrar görebilir ve tercihinizi değiştirebilirsiniz.
        </p>

        <h2>4. Verileri nasıl silersin?</h2>
        <p>
          Tarayıcına yerleştirdiğimiz şeyler: dil tercihi çerezi
          (<code>NEXT_LOCALE</code>), onay verdiysen Google Analytics ve
          Google AdSense reklam çerezleri ve birkaç localStorage tercihi.
          Hepsini silmek için:
        </p>
        <ul>
          <li>
            <strong>Chrome/Edge:</strong> Site bilgileri → vpnadvisor.net
            → Depolanan veriyi temizle
          </li>
          <li>
            <strong>Firefox:</strong> Ayarlar → Gizlilik → Çerezler ve
            site verileri → Verileri yönet
          </li>
          <li>
            <strong>Safari:</strong> Tercihler → Gizlilik → Web sitesi
            verilerini yönet
          </li>
          <li>
            <strong>Mobile (Android/iOS):</strong> Tarayıcı ayarları →
            Site verileri
          </li>
        </ul>

        <h2>5. Üçüncü taraf hizmetler</h2>
        <Card className="not-prose p-5 bg-accent-50/40 border-accent-200/60 my-6">
          <div className="flex gap-3">
            <AlertCircle className="size-5 text-accent-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-ink-strong">
                Dış bağlantılar istisna
              </p>
              <p className="mt-1 text-ink-muted">
                Bir VPN sağlayıcısının sitesine gittiğinde, o sitenin kendi
                çerez politikası geçerli olur. NordVPN, Surfshark,
                ExpressVPN ve diğerlerinin politikalarını ilgili
                sitelerinden okuyabilirsin.
              </p>
            </div>
          </div>
        </Card>

        <h2>6. Politika değişiklikleri</h2>
        <p>
          Bu sayfa değişirse en üstte &quot;Son güncelleme&quot; tarihi
          yenilenir. Yeni bir izleme teknolojisi eklersek{" "}
          <strong>çerez banner&apos;ı üzerinden önceden bildirir, onay
          isteriz</strong>.
        </p>

        <h2>7. İletişim</h2>
        <p>
          Çerez politikamızla ilgili sorun varsa{" "}
          <Link href="/contact">iletişim sayfamızdan</Link> bize
          ulaşabilirsin.
        </p>
      </article>

      <Card className="not-prose mt-12 p-6 bg-surface-subtle/60 border-border">
        <h3 className="text-base font-semibold text-ink-strong flex items-center gap-2">
          <Database className="size-4 text-brand-600" /> Daha fazla okuma
        </h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link
              href="/privacy-policy"
              className="text-brand-700 hover:underline"
            >
              Gizlilik Politikası →
            </Link>
          </li>
          <li>
            <Link
              href="/terms"
              className="text-brand-700 hover:underline"
            >
              Kullanım Şartları →
            </Link>
          </li>
          <li>
            <Link
              href="/affiliate-disclosure"
              className="text-brand-700 hover:underline"
            >
              Reklam Açıklaması →
            </Link>
          </li>
        </ul>
      </Card>
    </>
  );
}

export function EnBody() {
  return (
    <>
      <p className="text-sm text-ink-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>{" "}
        › <span className="text-ink-strong">Cookie Policy</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <Cookie className="size-3" /> Consent-based cookies
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Cookie Policy
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Last updated: June 2026
        </p>
      </header>

      <Card className="mt-8 p-6 bg-success-50/60 border-success-200/60">
        <h2 className="text-lg font-semibold text-success-700 flex items-center gap-2">
          <CheckCircle2 className="size-5" /> Short answer: analytics cookies
          only with your consent
        </h2>
        <p className="mt-3 text-ink leading-relaxed text-sm">
          vpnadvisor.net <strong>sets no non-essential cookie without your
          consent</strong>. We use Google Analytics to measure traffic, but
          it only activates when you click{" "}
          <strong>&quot;Accept&quot;</strong> on the cookie banner. We also
          use a single <strong>strictly necessary (functional) cookie</strong>{" "}
          to remember your language. This page explains all of them.
        </p>
      </Card>

      <article className="mt-12 prose prose-stone max-w-none dark:prose-invert">
        <h2>1. What is a cookie?</h2>
        <p>
          A cookie is a small text file placed on your browser by a
          website you visit. They&apos;re commonly used to maintain
          sessions, show advertisements, or track user behavior.{" "}
          <strong>
            They split into first-party (site-owned) and third-party
            (advertising, analytics) categories.
          </strong>
        </p>

        <h2>2. Which cookies do we use?</h2>
        <p>
          Two kinds: a single <strong>strictly necessary (functional)</strong>{" "}
          cookie that remembers your language, and{" "}
          <strong>analytics</strong> cookies that only activate with your
          consent.
        </p>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="min-w-full border border-border text-sm">
            <thead className="bg-surface-subtle">
              <tr>
                <th className="border border-border px-3 py-2 text-left">
                  Cookie
                </th>
                <th className="border border-border px-3 py-2 text-left">
                  Type
                </th>
                <th className="border border-border px-3 py-2 text-left">
                  Purpose
                </th>
                <th className="border border-border px-3 py-2 text-left">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-3 py-2 font-mono text-xs">
                  NEXT_LOCALE
                </td>
                <td className="border border-border px-3 py-2">
                  Strictly necessary / functional
                </td>
                <td className="border border-border px-3 py-2">
                  Remembers your language (TR/EN)
                </td>
                <td className="border border-border px-3 py-2">1 year</td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-mono text-xs">
                  _ga, _ga_*
                </td>
                <td className="border border-border px-3 py-2">
                  Analytics (consent-based)
                </td>
                <td className="border border-border px-3 py-2">
                  Google Analytics — visitor counting
                </td>
                <td className="border border-border px-3 py-2">~2 years</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>2.1 Google Analytics — consent-based analytics</h3>
        <p>
          We use{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Analytics 4
          </a>{" "}
          to measure site traffic. How it works:
        </p>
        <ul>
          <li>
            It runs with <strong>Google Consent Mode v2</strong>: before you
            consent, analytics storage is{" "}
            <strong>&quot;denied&quot;</strong> — in this mode GA{" "}
            <strong>sets no cookies</strong> and only sends anonymous
            aggregated pings.
          </li>
          <li>
            When you click <strong>&quot;Accept&quot;</strong> on the cookie
            banner, the <code>_ga</code> cookies are set and normal
            measurement begins. If you click{" "}
            <strong>&quot;Decline&quot;</strong>, no analytics cookie is set.
          </li>
          <li>
            Aggregated data such as page views, approximate location (from
            IP, IP not stored), device, and browser is collected.
          </li>
          <li>
            The data processor is <strong>Google LLC</strong>; data may be
            transferred outside the EU (to the US). You can withdraw consent
            anytime by clearing your browser data.
          </li>
        </ul>

        <h3>2.2 LocalStorage — local browser preferences</h3>
        <p>
          The browser&apos;s local storage area (localStorage) is a
          different technology from cookies. Data{" "}
          <strong>stays only in your browser</strong> and is never sent
          to our server. What we use:
        </p>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="min-w-full border border-border text-sm">
            <thead className="bg-surface-subtle">
              <tr>
                <th className="border border-border px-3 py-2 text-left">
                  Key
                </th>
                <th className="border border-border px-3 py-2 text-left">
                  Purpose
                </th>
                <th className="border border-border px-3 py-2 text-left">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-3 py-2 font-mono text-xs">
                  vpnadvisor-theme
                </td>
                <td className="border border-border px-3 py-2">
                  Your light/dark theme preference
                </td>
                <td className="border border-border px-3 py-2">
                  Until you delete it
                </td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-mono text-xs">
                  ip-security-banner-dismissed
                </td>
                <td className="border border-border px-3 py-2">
                  That you dismissed the IP security banner
                </td>
                <td className="border border-border px-3 py-2">
                  Until you delete it
                </td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-mono text-xs">
                  vpnadvisor:consent
                </td>
                <td className="border border-border px-3 py-2">
                  Your cookie consent choice (accept / decline)
                </td>
                <td className="border border-border px-3 py-2">
                  Until you delete it
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          This data falls under{" "}
          <strong>strictly necessary</strong> (preference storage) — per
          GDPR and KVKK, user consent is{" "}
          <strong>not required</strong>.
        </p>

        <h3>2.3 Advertising cookies (Google AdSense)</h3>
        <p>
          Our pages display <strong>Google AdSense</strong> ads. Google and
          its partners may use cookies and similar technologies to serve,
          personalise and measure ads. These are{" "}
          <strong>not ours, they are third-party (Google) cookies</strong>.
        </p>
        <ul>
          <li>
            For visitors in the European Economic Area, the United Kingdom and
            Switzerland, personalised advertising and measurement cookies are
            enabled <strong>only with explicit consent</strong> (Google
            Consent Mode v2)
          </li>
          <li>
            Without consent, Google may serve limited or non-personalised ads
          </li>
          <li>
            When you click a VPN provider link you go directly to the
            provider&apos;s official site; we set no tracking cookie of our
            own, and the destination site&apos;s own cookies apply
          </li>
        </ul>

        <h2>3. Cookie consent (banner)</h2>
        <p>
          Under Turkey (KVKK), EU (GDPR/ePrivacy), and UK (PECR)
          regulations, <strong>non-essential cookies require explicit
          consent</strong>. That is why we show a{" "}
          <strong>cookie consent banner</strong> for analytics (Google
          Analytics) and advertising (Google AdSense) cookies; they are not
          set until you click &quot;Accept&quot;. The <code>NEXT_LOCALE</code> language cookie is
          &quot;strictly necessary&quot; and needs no consent. Your choice is
          stored in your browser; clear your browser data to see the banner
          again and change your preference.
        </p>

        <h2>4. How to delete the data</h2>
        <p>
          What we place in your browser: a language cookie
          (<code>NEXT_LOCALE</code>), Google Analytics and Google AdSense ad
          cookies if you consented, and a few localStorage preferences. To
          delete all of them:
        </p>
        <ul>
          <li>
            <strong>Chrome/Edge:</strong> Site info → vpnadvisor.net →
            Clear stored data
          </li>
          <li>
            <strong>Firefox:</strong> Settings → Privacy → Cookies and
            site data → Manage data
          </li>
          <li>
            <strong>Safari:</strong> Preferences → Privacy → Manage
            website data
          </li>
          <li>
            <strong>Mobile (Android/iOS):</strong> Browser settings →
            Site data
          </li>
        </ul>

        <h2>5. Third-party services</h2>
        <Card className="not-prose p-5 bg-accent-50/40 border-accent-200/60 my-6">
          <div className="flex gap-3">
            <AlertCircle className="size-5 text-accent-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-ink-strong">
                External links exception
              </p>
              <p className="mt-1 text-ink-muted">
                When you visit a VPN provider&apos;s site, that site&apos;s
                cookie policy applies. Read NordVPN&apos;s, Surfshark&apos;s,
                ExpressVPN&apos;s and other providers&apos; policies on
                their respective sites.
              </p>
            </div>
          </div>
        </Card>

        <h2>6. Policy changes</h2>
        <p>
          If this page changes, the &quot;Last updated&quot; date at the
          top will be refreshed. If we add a new tracking technology we
          will <strong>notify you and ask for consent via the cookie
          banner</strong>.
        </p>

        <h2>7. Contact</h2>
        <p>
          If you have questions about our cookie policy, reach us via{" "}
          <Link href="/contact">our contact page</Link>.
        </p>
      </article>

      <Card className="not-prose mt-12 p-6 bg-surface-subtle/60 border-border">
        <h3 className="text-base font-semibold text-ink-strong flex items-center gap-2">
          <Database className="size-4 text-brand-600" /> Further reading
        </h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link
              href="/privacy-policy"
              className="text-brand-700 hover:underline"
            >
              Privacy Policy →
            </Link>
          </li>
          <li>
            <Link
              href="/terms"
              className="text-brand-700 hover:underline"
            >
              Terms of Use →
            </Link>
          </li>
          <li>
            <Link
              href="/affiliate-disclosure"
              className="text-brand-700 hover:underline"
            >
              Advertising Disclosure →
            </Link>
          </li>
        </ul>
      </Card>
    </>
  );
}

export function DeBody() {
  return (
    <>
      <p className="text-sm text-ink-muted">
        <Link href="/" className="hover:text-ink">
          Startseite
        </Link>{" "}
        › <span className="text-ink-strong">Cookie-Richtlinie</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <Cookie className="size-3" /> Einwilligungsbasierte Cookies
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Cookie-Richtlinie
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Zuletzt aktualisiert: Juni 2026
        </p>
      </header>

      <Card className="mt-8 p-6 bg-success-50/60 border-success-200/60">
        <h2 className="text-lg font-semibold text-success-700 flex items-center gap-2">
          <CheckCircle2 className="size-5" /> Kurzantwort: Analyse-Cookies nur
          mit Ihrer Einwilligung
        </h2>
        <p className="mt-3 text-ink leading-relaxed text-sm">
          vpnadvisor.net <strong>setzt ohne Ihre Einwilligung keine
          nicht-essentiellen Cookies</strong>. Wir nutzen Google Analytics zur
          Traffic-Messung; dies wird erst aktiviert, wenn Sie im Cookie-Banner
          auf <strong>&quot;Akzeptieren&quot;</strong> klicken. Zusätzlich
          verwenden wir ein einziges{" "}
          <strong>unbedingt erforderliches (funktionales) Cookie</strong>, um
          Ihre Sprache zu speichern. Diese Seite erklärt alle Details.
        </p>
      </Card>

      <article className="mt-12 prose prose-stone max-w-none dark:prose-invert">
        <h2>1. Was ist ein Cookie?</h2>
        <p>
          Ein Cookie ist eine kleine Textdatei, die eine von Ihnen besuchte
          Website in Ihrem Browser speichert. Cookies werden häufig genutzt,
          um Sitzungen aufrechtzuerhalten, Werbung anzuzeigen oder
          Nutzerverhalten zu verfolgen.{" "}
          <strong>
            Sie unterscheiden sich in First-Party-Cookies (der Website) und
            Third-Party-Cookies (Werbung, Analyse usw.).
          </strong>
        </p>

        <h2>2. Welche Cookies verwenden wir?</h2>
        <p>
          Zwei Arten: ein einziges{" "}
          <strong>unbedingt erforderliches (funktionales)</strong> Cookie zur
          Speicherung Ihrer Sprache und <strong>Analyse-Cookies</strong>, die
          nur mit Ihrer Einwilligung aktiviert werden.
        </p>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="min-w-full border border-border text-sm">
            <thead className="bg-surface-subtle">
              <tr>
                <th className="border border-border px-3 py-2 text-left">
                  Cookie
                </th>
                <th className="border border-border px-3 py-2 text-left">
                  Typ
                </th>
                <th className="border border-border px-3 py-2 text-left">
                  Zweck
                </th>
                <th className="border border-border px-3 py-2 text-left">
                  Dauer
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-3 py-2 font-mono text-xs">
                  NEXT_LOCALE
                </td>
                <td className="border border-border px-3 py-2">
                  Unbedingt erforderlich / funktional
                </td>
                <td className="border border-border px-3 py-2">
                  Speichert Ihre Sprache (TR/EN/DE)
                </td>
                <td className="border border-border px-3 py-2">1 Jahr</td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-mono text-xs">
                  _ga, _ga_*
                </td>
                <td className="border border-border px-3 py-2">
                  Analyse (einwilligungsbasiert)
                </td>
                <td className="border border-border px-3 py-2">
                  Google Analytics — Besucherzählung
                </td>
                <td className="border border-border px-3 py-2">~2 Jahre</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>2.1 Google Analytics — einwilligungsbasierte Analyse</h3>
        <p>
          Wir nutzen{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Analytics 4
          </a>{" "}
          zur Messung des Website-Traffics. So funktioniert es:
        </p>
        <ul>
          <li>
            Es läuft mit <strong>Google Consent Mode v2</strong>: vor Ihrer
            Einwilligung ist die Analyse-Speicherung{" "}
            <strong>&quot;denied&quot;</strong> — in diesem Modus setzt GA{" "}
            <strong>keine Cookies</strong> und sendet nur anonyme aggregierte
            Pings.
          </li>
          <li>
            Wenn Sie im Cookie-Banner auf{" "}
            <strong>&quot;Akzeptieren&quot;</strong> klicken, werden die{" "}
            <code>_ga</code>-Cookies gesetzt und die normale Messung beginnt.
            Bei <strong>&quot;Ablehnen&quot;</strong> wird kein Analyse-Cookie
            gesetzt.
          </li>
          <li>
            Aggregierte Daten wie Seitenaufrufe, ungefähre Region (aus der IP,
            IP wird nicht gespeichert), Gerät und Browser werden erhoben.
          </li>
          <li>
            Auftragsverarbeiter ist <strong>Google LLC</strong>; Daten können
            außerhalb der EU (in die USA) übermittelt werden. Sie können Ihre
            Einwilligung jederzeit durch Löschen der Browserdaten widerrufen.
          </li>
        </ul>

        <h3>2.2 LocalStorage — lokale Browsereinstellungen</h3>
        <p>
          Der lokale Speicher (localStorage) des Browsers ist eine andere
          Technologie als Cookies. Daten{" "}
          <strong>bleiben nur in Ihrem Browser</strong> und werden nie an
          unseren Server gesendet. Was wir nutzen:
        </p>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="min-w-full border border-border text-sm">
            <thead className="bg-surface-subtle">
              <tr>
                <th className="border border-border px-3 py-2 text-left">
                  Schlüssel
                </th>
                <th className="border border-border px-3 py-2 text-left">
                  Zweck
                </th>
                <th className="border border-border px-3 py-2 text-left">
                  Dauer
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-3 py-2 font-mono text-xs">
                  vpnadvisor-theme
                </td>
                <td className="border border-border px-3 py-2">
                  Ihre Hell-/Dunkelmodus-Einstellung
                </td>
                <td className="border border-border px-3 py-2">
                  Bis Sie sie löschen
                </td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-mono text-xs">
                  ip-security-banner-dismissed
                </td>
                <td className="border border-border px-3 py-2">
                  Dass Sie das IP-Sicherheitsbanner geschlossen haben
                </td>
                <td className="border border-border px-3 py-2">
                  Bis Sie sie löschen
                </td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-mono text-xs">
                  vpnadvisor:consent
                </td>
                <td className="border border-border px-3 py-2">
                  Ihre Cookie-Einwilligung (akzeptieren / ablehnen)
                </td>
                <td className="border border-border px-3 py-2">
                  Bis Sie sie löschen
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Diese Daten fallen unter{" "}
          <strong>unbedingt erforderlich</strong> (Speicherung von
          Einstellungen) — nach DSGVO und KVKK ist dafür{" "}
          <strong>keine Einwilligung erforderlich</strong>.
        </p>

        <h3>2.3 Werbe-Cookies (Google AdSense)</h3>
        <p>
          Auf unseren Seiten werden <strong>Google-AdSense</strong>-Anzeigen
          ausgeliefert. Google und Partner können Cookies und ähnliche
          Technologien nutzen, um Anzeigen auszuliefern, zu personalisieren
          und zu messen. Dies sind{" "}
          <strong>keine Cookies von uns, sondern Drittanbieter-Cookies
          (Google)</strong>.
        </p>
        <ul>
          <li>
            Für Besucher im Europäischen Wirtschaftsraum, im Vereinigten
            Königreich und in der Schweiz werden personalisierte Werbe- und
            Mess-Cookies <strong>nur mit ausdrücklicher Einwilligung</strong>{" "}
            aktiviert (Google Consent Mode v2)
          </li>
          <li>
            Ohne Einwilligung kann Google eingeschränkte oder nicht
            personalisierte Anzeigen ausliefern
          </li>
          <li>
            Wenn Sie auf einen VPN-Anbieter-Link klicken, gelangen Sie direkt
            zur offiziellen Website des Anbieters; wir setzen kein eigenes
            Tracking-Cookie, es gelten die Cookies der Zielwebsite
          </li>
        </ul>

        <h2>3. Cookie-Einwilligung (Banner)</h2>
        <p>
          Nach den Vorschriften der Türkei (KVKK), der EU (DSGVO/ePrivacy) und
          des Vereinigten Königreichs (PECR){" "}
          <strong>erfordern nicht-essentielle Cookies eine ausdrückliche
          Einwilligung</strong>. Deshalb zeigen wir ein{" "}
          <strong>Cookie-Einwilligungsbanner</strong> für Analyse- (Google
          Analytics) und Werbe-Cookies (Google AdSense); sie werden erst
          gesetzt, wenn Sie auf &quot;Akzeptieren&quot; klicken. Das{" "}
          <code>NEXT_LOCALE</code>-Sprachcookie ist &quot;unbedingt
          erforderlich&quot; und benötigt keine Einwilligung. Ihre Wahl wird
          in Ihrem Browser gespeichert; löschen Sie Ihre Browserdaten, um das
          Banner erneut zu sehen und Ihre Einstellung zu ändern.
        </p>

        <h2>4. Wie löschen Sie die Daten?</h2>
        <p>
          Was wir in Ihrem Browser speichern: ein Sprachcookie
          (<code>NEXT_LOCALE</code>), Google-Analytics- und Google-AdSense-Werbe-
          Cookies, sofern Sie zugestimmt haben, sowie einige localStorage-
          Einstellungen. So löschen Sie alles:
        </p>
        <ul>
          <li>
            <strong>Chrome/Edge:</strong> Website-Informationen →
            vpnadvisor.net → Gespeicherte Daten löschen
          </li>
          <li>
            <strong>Firefox:</strong> Einstellungen → Datenschutz → Cookies und
            Website-Daten → Daten verwalten
          </li>
          <li>
            <strong>Safari:</strong> Einstellungen → Datenschutz →
            Website-Daten verwalten
          </li>
          <li>
            <strong>Mobil (Android/iOS):</strong> Browser-Einstellungen →
            Website-Daten
          </li>
        </ul>

        <h2>5. Drittanbieter-Dienste</h2>
        <Card className="not-prose p-5 bg-accent-50/40 border-accent-200/60 my-6">
          <div className="flex gap-3">
            <AlertCircle className="size-5 text-accent-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-ink-strong">
                Ausnahme bei externen Links
              </p>
              <p className="mt-1 text-ink-muted">
                Wenn Sie die Website eines VPN-Anbieters besuchen, gilt dessen
                eigene Cookie-Richtlinie. Lesen Sie die Richtlinien von
                NordVPN, Surfshark, ExpressVPN und anderen Anbietern auf deren
                jeweiligen Websites.
              </p>
            </div>
          </div>
        </Card>

        <h2>6. Änderungen dieser Richtlinie</h2>
        <p>
          Bei Änderungen dieser Seite wird das Datum &quot;Zuletzt
          aktualisiert&quot; oben aktualisiert. Wenn wir eine neue
          Tracking-Technologie hinzufügen,{" "}
          <strong>informieren wir Sie vorab und holen Ihre Einwilligung über
          das Cookie-Banner ein</strong>.
        </p>

        <h2>7. Kontakt</h2>
        <p>
          Bei Fragen zu unserer Cookie-Richtlinie erreichen Sie uns über{" "}
          <Link href="/contact">unsere Kontaktseite</Link>.
        </p>
      </article>

      <Card className="not-prose mt-12 p-6 bg-surface-subtle/60 border-border">
        <h3 className="text-base font-semibold text-ink-strong flex items-center gap-2">
          <Database className="size-4 text-brand-600" /> Weiterführende Links
        </h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link
              href="/privacy-policy"
              className="text-brand-700 hover:underline"
            >
              Datenschutzerklärung →
            </Link>
          </li>
          <li>
            <Link
              href="/terms"
              className="text-brand-700 hover:underline"
            >
              Nutzungsbedingungen →
            </Link>
          </li>
          <li>
            <Link
              href="/affiliate-disclosure"
              className="text-brand-700 hover:underline"
            >
              Werbehinweis →
            </Link>
          </li>
        </ul>
      </Card>
    </>
  );
}
