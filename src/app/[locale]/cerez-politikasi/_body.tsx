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
          <Cookie className="size-3" /> Çerezsiz site
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Çerez Politikası
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Son güncelleme: Mayıs 2026
        </p>
      </header>

      <Card className="mt-8 p-6 bg-success-50/60 border-success-200/60">
        <h2 className="text-lg font-semibold text-success-700 flex items-center gap-2">
          <CheckCircle2 className="size-5" /> Kısa cevap: Çerez kullanmıyoruz
        </h2>
        <p className="mt-3 text-ink leading-relaxed text-sm">
          vpncompaire.com sitesi <strong>hiçbir HTTP çerezi (cookie)
          set etmez</strong>. Reklam çerezi, analitik çerezi, tracking
          çerezi yok. Bu sayfa neyi <em>kullandığımızı</em>, neyi{" "}
          <em>kullanmadığımızı</em> ve tarayıcınızda hangi yerel
          depolamaların olduğunu açıklar.
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
          <strong>Hiçbirini.</strong> Aşağıdaki teknolojileri
          kullanıyoruz ama bunlar çerez değil:
        </p>

        <h3>2.1 Plausible Analytics — çerezsiz analitik</h3>
        <p>
          Site trafiğini ölçmek için{" "}
          <a
            href="https://plausible.io/data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Plausible
          </a>{" "}
          kullanıyoruz. Plausible:
        </p>
        <ul>
          <li>
            <strong>Çerez kullanmaz</strong> (kanıt: kendi web
            sitesinde de cookie banner yoktur)
          </li>
          <li>Kişisel veri toplamaz, parmak izi çıkarmaz</li>
          <li>Veriyi AB sınırları içinde tutar (EU-hosted)</li>
          <li>
            Sadece sayfa görüntüleme sayısı, ülke (IP&apos;den, IP saklanmaz),
            cihaz türü ve tarayıcı gibi toplu (agrega) veriler tutar
          </li>
          <li>GDPR, CCPA, PECR ve KVKK uyumludur</li>
        </ul>
        <p>
          Plausible{" "}
          <strong>kendi sunucularına gönderilen veride hiçbir
          tanımlayıcı bilgi olmaz</strong>; bu yüzden çerez veya consent
          banner&apos;a gerek kalmaz.
        </p>

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
                  vpncompaire-theme
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
            </tbody>
          </table>
        </div>
        <p>
          Bu veriler <strong>kesinlikle gerekli</strong> kategorisindedir
          (tercih saklama) — KVKK ve GDPR&apos;a göre kullanıcı onayı{" "}
          <strong>gerektirmez</strong>.
        </p>

        <h3>2.3 Affiliate yönlendirmeleri (3. taraf çerezler)</h3>
        <p>
          <code>/go/[slug]</code> linklerine tıkladığında seni bir VPN
          sağlayıcısına (örn. NordVPN, Surfshark) yönlendiririz.{" "}
          <strong>O sağlayıcı kendi çerezlerini set edebilir</strong>{" "}
          (sözleşmeye göre tıklamayı takip etmek için). Bu çerezler{" "}
          <strong>bizim değil, hedef sitenin çerezleridir</strong>.
        </p>
        <ul>
          <li>
            Yönlendirme sırasında <code>Referrer-Policy: no-referrer</code>{" "}
            başlığı kullanırız (hedef siteye sayfa adresimiz gitmez)
          </li>
          <li>
            Sadece affiliate tracking ID&apos;si UTM parametreleriyle
            iletilir
          </li>
          <li>
            Hedef sitenin çerez politikasını okumak için yönlendirme
            sonrası o sitenin sayfasını ziyaret etmen gerekir
          </li>
        </ul>

        <h2>3. Çerez bannerı neden yok?</h2>
        <p>
          Türkiye (KVKK), AB (GDPR/ePrivacy) ve İngiltere (PECR)
          mevzuatına göre çerez banner&apos;ı{" "}
          <strong>yalnızca gerekli olmayan çerezler için</strong>{" "}
          zorunludur. Biz hiç çerez kullanmadığımız için ve
          localStorage&apos;daki veriler &quot;kesinlikle gerekli&quot;
          kategorisinde olduğu için consent banner&apos;a ihtiyacımız
          yok.
        </p>

        <h2>4. Verileri nasıl silersin?</h2>
        <p>
          Tarayıcına yerleştirdiğimiz tek şey localStorage tercihleridir.
          Silmek istiyorsan:
        </p>
        <ul>
          <li>
            <strong>Chrome/Edge:</strong> Site bilgileri → vpncompaire.com
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
                Affiliate yönlendirmeleri istisna
              </p>
              <p className="mt-1 text-ink-muted">
                Bir VPN sağlayıcısına yönlendirildiğinde, o sitenin kendi
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
          yenilenir. Önemli değişikliklerde anasayfada da banner
          gösterilebilir. Çerez kullanmaya başlarsak{" "}
          <strong>önceden bildirir, onay isteriz</strong>.
        </p>

        <h2>7. İletişim</h2>
        <p>
          Çerez politikamızla ilgili sorun varsa{" "}
          <Link href="/iletisim">iletişim sayfamızdan</Link> bize
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
              href="/gizlilik"
              className="text-brand-700 hover:underline"
            >
              Gizlilik Politikası →
            </Link>
          </li>
          <li>
            <Link
              href="/sartlar"
              className="text-brand-700 hover:underline"
            >
              Kullanım Şartları →
            </Link>
          </li>
          <li>
            <Link
              href="/reklam-aciklamasi"
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
          <Cookie className="size-3" /> Cookie-free site
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Cookie Policy
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Last updated: May 2026
        </p>
      </header>

      <Card className="mt-8 p-6 bg-success-50/60 border-success-200/60">
        <h2 className="text-lg font-semibold text-success-700 flex items-center gap-2">
          <CheckCircle2 className="size-5" /> Short answer: We don&apos;t
          use cookies
        </h2>
        <p className="mt-3 text-ink leading-relaxed text-sm">
          The vpncompaire.com site <strong>sets no HTTP cookies
          whatsoever</strong>. No advertising cookies, no analytics
          cookies, no tracking cookies. This page explains what we{" "}
          <em>do</em> use, what we <em>don&apos;t</em>, and what local
          storage exists in your browser.
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
          <strong>None.</strong> We use the following technologies, but
          they are not cookies:
        </p>

        <h3>2.1 Plausible Analytics — cookieless analytics</h3>
        <p>
          We use{" "}
          <a
            href="https://plausible.io/data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Plausible
          </a>{" "}
          to measure site traffic. Plausible:
        </p>
        <ul>
          <li>
            <strong>Uses no cookies</strong> (proof: their own website has
            no cookie banner either)
          </li>
          <li>Collects no personal data, no fingerprinting</li>
          <li>Hosts data within EU borders (EU-hosted)</li>
          <li>
            Only stores aggregated data like page views, country (from
            IP, IP is not stored), device type, and browser
          </li>
          <li>Compliant with GDPR, CCPA, PECR, and KVKK</li>
        </ul>
        <p>
          Plausible{" "}
          <strong>has no identifying information in the data sent to
          its servers</strong>; therefore no cookies or consent banner
          are needed.
        </p>

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
                  vpncompaire-theme
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
            </tbody>
          </table>
        </div>
        <p>
          This data falls under{" "}
          <strong>strictly necessary</strong> (preference storage) — per
          GDPR and KVKK, user consent is{" "}
          <strong>not required</strong>.
        </p>

        <h3>2.3 Affiliate redirects (third-party cookies)</h3>
        <p>
          When you click a <code>/go/[slug]</code> link, we redirect you
          to a VPN provider (e.g., NordVPN, Surfshark).{" "}
          <strong>That provider may set its own cookies</strong>{" "}
          (contractually, to track the click). Those cookies are{" "}
          <strong>not ours, they belong to the destination site</strong>.
        </p>
        <ul>
          <li>
            During the redirect we use{" "}
            <code>Referrer-Policy: no-referrer</code> (our page URL is
            not sent to the destination)
          </li>
          <li>
            Only the affiliate tracking ID is passed via UTM parameters
          </li>
          <li>
            To read the destination&apos;s cookie policy, visit their
            site after being redirected
          </li>
        </ul>

        <h2>3. Why no cookie banner?</h2>
        <p>
          Under Turkey (KVKK), EU (GDPR/ePrivacy), and UK (PECR)
          regulations, cookie banners are{" "}
          <strong>only mandatory for non-essential cookies</strong>.
          Since we use no cookies and localStorage data is &quot;strictly
          necessary&quot;, no consent banner is required.
        </p>

        <h2>4. How to delete the data</h2>
        <p>
          The only thing we place in your browser are localStorage
          preferences. To delete them:
        </p>
        <ul>
          <li>
            <strong>Chrome/Edge:</strong> Site info → vpncompaire.com →
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
                Affiliate redirects exception
              </p>
              <p className="mt-1 text-ink-muted">
                When redirected to a VPN provider, that site&apos;s
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
          top will be refreshed. Significant changes may also be shown
          via a banner on the homepage. If we ever start using cookies we
          will <strong>notify you and ask for consent</strong>.
        </p>

        <h2>7. Contact</h2>
        <p>
          If you have questions about our cookie policy, reach us via{" "}
          <Link href="/iletisim">our contact page</Link>.
        </p>
      </article>

      <Card className="not-prose mt-12 p-6 bg-surface-subtle/60 border-border">
        <h3 className="text-base font-semibold text-ink-strong flex items-center gap-2">
          <Database className="size-4 text-brand-600" /> Further reading
        </h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link
              href="/gizlilik"
              className="text-brand-700 hover:underline"
            >
              Privacy Policy →
            </Link>
          </li>
          <li>
            <Link
              href="/sartlar"
              className="text-brand-700 hover:underline"
            >
              Terms of Use →
            </Link>
          </li>
          <li>
            <Link
              href="/reklam-aciklamasi"
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
