import { Shield, Database, UserCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site";

export function TrBody() {
  return (
    <>
      <p className="text-sm text-ink-muted">
        <Link href="/" className="hover:text-ink">
          Ana sayfa
        </Link>{" "}
        › <span className="text-ink-strong">Gizlilik Politikası</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <Shield className="size-3" /> KVKK uyumlu
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Gizlilik Politikası
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Son güncelleme: Haziran 2026
        </p>
      </header>

      <Card className="mt-8 p-6 bg-success-50/60">
        <h2 className="text-lg font-semibold text-success-700 flex items-center gap-2">
          <Database className="size-5" /> Kısa özet
        </h2>
        <ul className="mt-3 space-y-2 text-ink leading-relaxed text-sm">
          <li>
            <strong>Analitik çerezler yalnızca onayınızla</strong> — Google
            Analytics yalnızca çerez banner&apos;ından onay verdiğinizde
            devreye girer. Dil tercihiniz için tek bir zorunlu çerez
            (NEXT_LOCALE) kullanılır.
          </li>
          <li>
            <strong>Hesap sistemi yok</strong> — kayıt olmuyorsun, login
            yok, parola yok.
          </li>
          <li>
            <strong>Form yok</strong> — kişisel bilgi toplayan herhangi
            bir form bulunmuyor.
          </li>
          <li>
            <strong>VPN sağlayıcı bağlantıları</strong> kayda alınmaz; düz
            bağlantıyla doğrudan sağlayıcının resmi sitesine gidersin, tıklama
            takibi yapılmaz.
          </li>
          <li>
            <strong>İletişim için</strong> bize gönderdiğin e-posta sadece
            yanıtlamak için kullanılır.
          </li>
        </ul>
      </Card>

      <article className="mt-12 prose prose-stone max-w-none">
        <h2>1. Veri sorumlusu</h2>
        <p>
          Bu politika, {siteConfig.name} (&quot;biz&quot;,
          &quot;sitemiz&quot;) tarafından sunulan{" "}
          <Link href="/">{siteConfig.url}</Link> internet sitesinin kullanımı
          sırasında işlenen kişisel verilere ilişkindir. 6698 sayılı Kişisel
          Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca veri
          sorumlusu sıfatıyla hareket ediyoruz.
        </p>

        <h2>2. Hangi verileri işliyoruz?</h2>

        <h3>2.1. Otomatik teknik veriler (sunucu logları)</h3>
        <p>
          Hostinger barındırma altyapımız, standart web sunucu logları olarak
          şunları geçici tutar:
        </p>
        <ul>
          <li>IP adresi (anonimleştirilmiş)</li>
          <li>Tarayıcı türü ve sürümü (User-Agent)</li>
          <li>Erişim tarihi/saati</li>
          <li>İstek yapılan URL</li>
          <li>HTTP yanıt kodu</li>
        </ul>
        <p>
          Bu veriler güvenlik, hata ayıklama ve kötüye kullanım tespiti
          için 30 gün boyunca tutulur ve sonra otomatik silinir. Şahsi
          profil oluşturmak için kullanılmaz.
        </p>

        <h3>2.2. Analitik (Google Analytics)</h3>
        <p>
          Site trafiğini ölçmek için Google Analytics 4 kullanırız. Google
          Consent Mode v2 ile çalışır:
        </p>
        <ul>
          <li>
            Çerez banner&apos;ından onay vermeden önce analitik çerez{" "}
            <strong>yazılmaz</strong> (kimliksiz toplu ping)
          </li>
          <li>
            &quot;Kabul et&quot; dediğinizde <code>_ga</code> çerezleri set
            edilir; &quot;Reddet&quot; derseniz hiç yazılmaz
          </li>
          <li>Sayfa görüntülenme, yaklaşık konum, cihaz ve tarayıcı (agregat)</li>
          <li>Veri işleyici Google LLC&apos;dir; veriler ABD&apos;ye aktarılabilir</li>
        </ul>
        <p>
          Analitik veriler sitenin performansını değerlendirmek için
          kullanılır. Detaylar için{" "}
          <Link href="/cookie-policy">Çerez Politikası</Link>.
        </p>

        <h3>2.3. İletişim e-postası</h3>
        <p>
          Bize e-posta gönderirsen, e-postanın içeriği ve adresi, sorunu
          yanıtlamak amacıyla işlenir. Yanıttan sonra otomatik olarak
          işlenmez; ancak iş kaydı olarak 1 yıl saklanabilir.
        </p>

        <h2>3. Verileri neden işliyoruz? (Hukuki sebep)</h2>
        <ul>
          <li>
            <strong>Sunucu logları:</strong> KVKK m. 5/2(f) - meşru
            menfaat (güvenlik ve kötüye kullanım engelleme).
          </li>
          <li>
            <strong>Google Analytics analitik:</strong> KVKK m. 5/1 ve
            GDPR m. 6/1(a) - açık rıza (çerez banner&apos;ından onay).
            Onay vermezseniz işlenmez.
          </li>
          <li>
            <strong>İletişim e-postası:</strong> KVKK m. 5/2(c) - sözleşme
            kurulması/ifası (talebine yanıt verme).
          </li>
        </ul>

        <h2>4. Verilerin paylaşımı</h2>
        <p>
          Verilerini üçüncü taraflarla paylaşmıyoruz. Aşağıdaki teknik
          servis sağlayıcıları ile zorunlu işlem akışları:
        </p>
        <ul>
          <li>
            <strong>Hostinger</strong> (web hosting altyapısı) — sunucu
            loglarını işler. Veri işleme sözleşmesi standart koşullarda.
          </li>
          <li>
            <strong>Google</strong> (onay verdiyseniz, analitik) — anonim
            sayfa görüntülenme verilerini işler; veriler ABD&apos;ye
            aktarılabilir (Google&apos;ın standart sözleşme hükümleri).
          </li>
        </ul>
        <p>
          Sayfalarımızda Google AdSense reklamları gösterilir; AdSense,
          reklamları sunmak ve ölçmek için çerez kullanabilir (ayrıntılar{" "}
          <Link href="/cookie-policy">çerez politikamızda</Link>). Bir VPN
          sağlayıcısının bağlantısına tıkladığında doğrudan sağlayıcının resmi
          sitesine gidersin; o noktadan sonra sağlayıcının kendi gizlilik
          politikası geçerli olur.
        </p>

        <h2>5. KVKK kapsamındaki haklarınız</h2>
        <p>
          KVKK m. 11 uyarınca aşağıdaki haklarınız vardır:
        </p>
        <ul>
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme</li>
          <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>Yurt içinde ve yurt dışında aktarıldığı üçüncü kişileri öğrenme</li>
          <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
          <li>Silinmesini veya yok edilmesini isteme</li>
          <li>Otomatik analiz sonucuna itiraz etme</li>
          <li>Zararın giderilmesini talep etme</li>
        </ul>
        <p>
          Bu hakları kullanmak için{" "}
          <Link href="/contact">iletişim sayfamızdan</Link> bize
          ulaşabilirsiniz.
        </p>

        <h2>6. Veri güvenliği</h2>
        <p>
          Sunucu trafiği HTTPS üzerinden şifrelidir (TLS 1.3). HTTP
          başlıkları sertleştirilmiştir (HSTS, CSP, X-Frame-Options vb.).
          Çerez kullanmadığımız için çerez tabanlı saldırılara karşı
          yüzey alanımız yoktur.
        </p>

        <h2>7. Politikanın güncellenmesi</h2>
        <p>
          Bu politikayı zaman zaman güncelleyebiliriz. Önemli değişiklikler
          sayfa üstündeki &quot;Son güncelleme&quot; tarihiyle belirtilir.
        </p>
      </article>

      <Card className="mt-12 p-6 bg-brand-50/40">
        <div className="flex items-start gap-3">
          <UserCheck className="size-5 text-brand-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              Verilerimle ilgili bir talebim var
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              KVKK kapsamındaki haklarını kullanmak veya gizlilik
              politikasıyla ilgili soru sormak için{" "}
              <Link href="/contact" className="text-brand-700 underline">
                iletişim sayfamızdan
              </Link>{" "}
              bize ulaşabilirsin.
            </p>
          </div>
        </div>
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
        › <span className="text-ink-strong">Privacy policy</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <Shield className="size-3" /> GDPR-aligned
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Privacy policy
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Last updated: 27 August 2026
        </p>
      </header>

      <Card className="mt-8 p-6 bg-success-50/60">
        <h2 className="text-lg font-semibold text-success-700 flex items-center gap-2">
          <Database className="size-5" /> Short summary
        </h2>
        <ul className="mt-3 space-y-2 text-ink leading-relaxed text-sm">
          <li>
            <strong>Analytics cookies only with your consent</strong> —
            Google Analytics activates only when you accept on the cookie
            banner. A single strictly necessary cookie (NEXT_LOCALE) stores
            your language.
          </li>
          <li>
            <strong>No accounts</strong> — there is no sign-up, no login and no
            password.
          </li>
          <li>
            <strong>Interactive tools are purpose-limited</strong> — diagnostic
            inputs are processed only to return the requested result. The
            email and VPN/IP tools use the server-side services described
            below.
          </li>
          <li>
            <strong>VPN provider links</strong> may contain a standard referral
            parameter. We do not use those clicks to build reader profiles;
            the destination provider receives the normal request and applies
            its own privacy policy.
          </li>
          <li>
            <strong>Email to us</strong> is used only to respond to your message.
          </li>
        </ul>
      </Card>

      <article className="mt-12 prose prose-stone max-w-none">
        <h2>1. Data controller</h2>
        <p>
          This policy covers personal data processed when you use{" "}
          <Link href="/">{siteConfig.url}</Link>, operated by {siteConfig.name}{" "}
          (&quot;we&quot;, &quot;our site&quot;). We act as the data controller
          under the relevant data-protection laws (including Türkiye&apos;s
          KVKK and, where applicable, the EU GDPR).
        </p>

        <h2>2. What data we process</h2>

        <h3>2.1. Automatic technical data (server logs)</h3>
        <p>
          Our Hostinger hosting infrastructure may process standard web server
          logs needed to deliver and protect the site:
        </p>
        <ul>
          <li>IP address</li>
          <li>Browser type and version (User-Agent)</li>
          <li>Access date/time</li>
          <li>Requested URL</li>
          <li>HTTP response code</li>
        </ul>
        <p>
          Hostinger controls the infrastructure-level retention and security
          settings for these records. VPN Advisor does not use server logs to
          build advertising or behavioural profiles.
        </p>

        <h3>2.2. Analytics (Google Analytics)</h3>
        <p>
          We use Google Analytics 4 to measure site traffic, running with
          Google Consent Mode v2:
        </p>
        <ul>
          <li>
            before you consent on the cookie banner, analytics storage remains
            denied; the Google tag may send cookieless Consent Mode signals
          </li>
          <li>
            on &quot;Accept&quot; the <code>_ga</code> cookies are set; on
            &quot;Decline&quot; none are set
          </li>
          <li>aggregated page views, approximate location, device and browser</li>
          <li>the processor is Google LLC; data may be transferred to the US</li>
        </ul>
        <p>
          Analytics data is used to evaluate the site&apos;s performance. See
          the <Link href="/cookie-policy">Cookie Policy</Link> for details.
        </p>

        <h3>2.3. Contact email</h3>
        <p>
          If you email us, the contents and address of your message are
          processed solely to respond. After the reply, the message is not
          processed further, but it may be retained for up to 1 year as a
          business record.
        </p>

        <h3>2.4. Interactive diagnostic tools</h3>
        <p>
          Tool results are returned with no-store response headers and are not
          intentionally saved in a VPN Advisor account or database. Some checks
          require limited server-side or third-party processing:
        </p>
        <ul>
          <li>
            <strong>Email Security Check:</strong> the full address is sent to
            our server for validation. The domain is queried for live MX, SPF
            and DMARC records. A breach lookup is sent server-to-server to Have
            I Been Pwned when configured, otherwise to XposedOrNot. We return a
            masked address and do not intentionally retain the submitted
            address or result.
          </li>
          <li>
            <strong>VPN/IP Diagnostic:</strong> the public IP already visible
            to the site may be sent to ipapi.is for network, ASN, approximate
            location and VPN/proxy classification. VPN Advisor does not
            intentionally retain the lookup result.
          </li>
          <li>
            <strong>Browser diagnostics:</strong> DNS and speed checks contact
            Cloudflare endpoints as disclosed on the relevant tool page.
            WebRTC checks run in the browser. Each result describes a limited
            signal, not a security certification.
          </li>
        </ul>
        <p>
          Do not submit an email address unless you agree to that limited data
          flow. The relevant third party&apos;s privacy terms also apply to its
          processing.
        </p>

        <h2>3. Why we process data (legal basis)</h2>
        <ul>
          <li>
            <strong>Server logs:</strong> legitimate interest (security and
            abuse prevention).
          </li>
          <li>
            <strong>Google Analytics storage:</strong> consent (GDPR Art.
            6(1)(a) and KVKK explicit consent via the cookie banner). Storage
            remains denied unless you accept; limited cookieless Consent Mode
            signals may still be sent.
          </li>
          <li>
            <strong>Contact email:</strong> contract/precontract necessity
            (answering your request).
          </li>
          <li>
            <strong>Diagnostics:</strong> your request to run the selected tool
            and our legitimate interest in preventing abuse and returning a
            reliable result.
          </li>
        </ul>

        <h2>4. Data sharing</h2>
        <p>
          We do not sell personal data. Delivering the site and requested tools
          involves these service providers:
        </p>
        <ul>
          <li>
            <strong>Hostinger</strong> (web hosting) — processes server logs.
            Standard data-processing agreement.
          </li>
          <li>
            <strong>Google</strong> — processes consent-state signals and, if
            you accept analytics storage, measurement data. Data may be
            transferred to the US under Google&apos;s published safeguards.
          </li>
          <li>
            <strong>Google AdSense</strong> — serves and measures advertising
            according to your consent choices and Google&apos;s policies.
          </li>
          <li>
            <strong>Have I Been Pwned or XposedOrNot</strong> — receives the
            submitted email address only when you run the breach check.
          </li>
          <li>
            <strong>ipapi.is</strong> — receives the public IP when the VPN/IP
            diagnostic requests network classification.
          </li>
          <li>
            <strong>Cloudflare</strong> — provides endpoints used by the DNS and
            speed diagnostics.
          </li>
        </ul>
        <p>
          Our pages display Google AdSense ads; AdSense may use cookies to
          serve and measure ads (details in our{" "}
          <Link href="/cookie-policy">cookie policy</Link>). When you click
          a VPN provider link you go directly to the provider&apos;s official
          site; from that point on the provider&apos;s own privacy policy
          applies.
        </p>

        <h2>5. Your rights</h2>
        <p>
          Under applicable data-protection law you have rights including:
        </p>
        <ul>
          <li>Knowing whether your personal data is being processed</li>
          <li>Requesting information about the processing</li>
          <li>
            Learning the purpose of the processing and whether the data is used
            for that purpose
          </li>
          <li>
            Learning which third parties (domestic or abroad) the data is
            transferred to
          </li>
          <li>Requesting correction of incomplete or inaccurate processing</li>
          <li>Requesting deletion or destruction of the data</li>
          <li>Objecting to automated analysis outcomes</li>
          <li>Requesting compensation for harm</li>
        </ul>
        <p>
          To exercise these rights, reach us via the{" "}
          <Link href="/contact">contact page</Link>.
        </p>

        <h2>6. Data security</h2>
        <p>
          Server traffic is protected with HTTPS. HTTP headers include HSTS,
          Content Security Policy, frame restrictions and MIME-sniffing
          protection. Strictly necessary preference storage and consent-based
          Google cookies may be used as described in the Cookie Policy; no
          security control can reduce risk to zero.
        </p>

        <h2>7. Policy updates</h2>
        <p>
          We may update this policy from time to time. Significant changes are
          indicated by the &quot;Last updated&quot; date at the top of the
          page.
        </p>
      </article>

      <Card className="mt-12 p-6 bg-brand-50/40">
        <div className="flex items-start gap-3">
          <UserCheck className="size-5 text-brand-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              I have a request about my data
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              To exercise your rights or ask a question about this privacy
              policy, reach out via the{" "}
              <Link href="/contact" className="text-brand-700 underline">
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
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
        › <span className="text-ink-strong">Datenschutzerklärung</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <Shield className="size-3" /> DSGVO-konform
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Datenschutzerklärung
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Zuletzt aktualisiert: Juni 2026
        </p>
      </header>

      <Card className="mt-8 p-6 bg-success-50/60">
        <h2 className="text-lg font-semibold text-success-700 flex items-center gap-2">
          <Database className="size-5" /> Kurzfassung
        </h2>
        <ul className="mt-3 space-y-2 text-ink leading-relaxed text-sm">
          <li>
            <strong>Analyse-Cookies nur mit Ihrer Einwilligung</strong> —
            Google Analytics wird erst aktiviert, wenn Sie im Cookie-Banner
            zustimmen. Ein einziges unbedingt erforderliches Cookie
            (NEXT_LOCALE) speichert Ihre Sprache.
          </li>
          <li>
            <strong>Keine Konten</strong> — keine Registrierung, kein Login
            und kein Passwort.
          </li>
          <li>
            <strong>Keine Formulare</strong> — kein Formular auf dieser
            Website erhebt personenbezogene Daten.
          </li>
          <li>
            <strong>VPN-Anbieter-Links</strong> werden nicht gespeichert; ein
            einfacher Link führt Sie direkt zur offiziellen Website des
            Anbieters, ohne Klick-Tracking.
          </li>
          <li>
            <strong>E-Mails an uns</strong> werden nur zur Beantwortung Ihrer
            Nachricht verwendet.
          </li>
        </ul>
      </Card>

      <article className="mt-12 prose prose-stone max-w-none">
        <h2>1. Verantwortlicher</h2>
        <p>
          Diese Erklärung betrifft personenbezogene Daten, die bei der Nutzung
          von <Link href="/">{siteConfig.url}</Link> verarbeitet werden,
          betrieben von {siteConfig.name} (&quot;wir&quot;, &quot;unsere
          Website&quot;). Wir handeln als Verantwortlicher im Sinne der
          einschlägigen Datenschutzgesetze (einschließlich des türkischen
          KVKK und, soweit anwendbar, der EU-DSGVO).
        </p>

        <h2>2. Welche Daten wir verarbeiten</h2>

        <h3>2.1. Automatische technische Daten (Server-Logs)</h3>
        <p>
          Unsere Hostinger-Hosting-Infrastruktur speichert vorübergehend
          standardmäßige Webserver-Logs:
        </p>
        <ul>
          <li>IP-Adresse (anonymisiert)</li>
          <li>Browsertyp und -version (User-Agent)</li>
          <li>Datum/Uhrzeit des Zugriffs</li>
          <li>Aufgerufene URL</li>
          <li>HTTP-Antwortcode</li>
        </ul>
        <p>
          Diese Einträge werden 30 Tage lang für Sicherheit, Fehlerbehebung
          und Missbrauchserkennung aufbewahrt und danach automatisch gelöscht.
          Sie werden nicht zur Erstellung persönlicher Profile verwendet.
        </p>

        <h3>2.2. Analyse (Google Analytics)</h3>
        <p>
          Wir nutzen Google Analytics 4 zur Messung des Website-Traffics mit
          Google Consent Mode v2:
        </p>
        <ul>
          <li>
            vor Ihrer Einwilligung im Cookie-Banner wird kein Analyse-Cookie
            gesetzt (nur anonyme aggregierte Pings)
          </li>
          <li>
            bei &quot;Akzeptieren&quot; werden die <code>_ga</code>-Cookies
            gesetzt; bei &quot;Ablehnen&quot; werden keine gesetzt
          </li>
          <li>
            aggregierte Seitenaufrufe, ungefähre Region, Gerät und Browser
          </li>
          <li>
            Auftragsverarbeiter ist Google LLC; Daten können in die USA
            übermittelt werden
          </li>
        </ul>
        <p>
          Analysedaten dienen der Bewertung der Website-Performance. Details
          finden Sie in der{" "}
          <Link href="/cookie-policy">Cookie-Richtlinie</Link>.
        </p>

        <h3>2.3. Kontakt-E-Mail</h3>
        <p>
          Wenn Sie uns eine E-Mail senden, werden Inhalt und Adresse Ihrer
          Nachricht ausschließlich zur Beantwortung verarbeitet. Nach der
          Antwort erfolgt keine weitere Verarbeitung; die Nachricht kann
          jedoch bis zu 1 Jahr als Geschäftsunterlage aufbewahrt werden.
        </p>

        <h2>3. Warum wir Daten verarbeiten (Rechtsgrundlage)</h2>
        <ul>
          <li>
            <strong>Server-Logs:</strong> berechtigtes Interesse (Sicherheit
            und Missbrauchsprävention).
          </li>
          <li>
            <strong>Google Analytics:</strong> Einwilligung (DSGVO Art. 6
            Abs. 1 lit. a und ausdrückliche Einwilligung nach KVKK über das
            Cookie-Banner). Ohne Zustimmung keine Verarbeitung.
          </li>
          <li>
            <strong>Kontakt-E-Mail:</strong> Vertrag/Vorvertrag (Beantwortung
            Ihrer Anfrage).
          </li>
        </ul>

        <h2>4. Weitergabe von Daten</h2>
        <p>
          Wir geben Ihre Daten nicht an Dritte weiter. Die erforderlichen
          technischen Abläufe betreffen diese Dienstleister:
        </p>
        <ul>
          <li>
            <strong>Hostinger</strong> (Webhosting) — verarbeitet Server-Logs.
            Standard-Auftragsverarbeitungsvertrag.
          </li>
          <li>
            <strong>Google</strong> (bei Einwilligung, Analyse) — verarbeitet
            anonyme Seitenaufrufdaten in aggregierter Form; Daten können in
            die USA übermittelt werden (Standardvertragsklauseln von Google).
          </li>
        </ul>
        <p>
          Auf unseren Seiten werden Google-AdSense-Anzeigen ausgeliefert;
          AdSense kann Cookies zum Ausliefern und Messen von Anzeigen
          verwenden (Details in unserer{" "}
          <Link href="/cookie-policy">Cookie-Richtlinie</Link>). Wenn Sie
          auf einen VPN-Anbieter-Link klicken, gelangen Sie direkt zur
          offiziellen Website des Anbieters; ab diesem Zeitpunkt gilt dessen
          eigene Datenschutzerklärung.
        </p>

        <h2>5. Ihre Rechte</h2>
        <p>
          Nach geltendem Datenschutzrecht haben Sie unter anderem folgende
          Rechte:
        </p>
        <ul>
          <li>
            Auskunft darüber, ob Ihre personenbezogenen Daten verarbeitet
            werden
          </li>
          <li>Informationen über die Verarbeitung anzufordern</li>
          <li>
            den Zweck der Verarbeitung und die zweckgemäße Nutzung zu erfahren
          </li>
          <li>
            zu erfahren, an welche Dritten (im In- oder Ausland) Daten
            übermittelt werden
          </li>
          <li>
            Berichtigung unvollständiger oder unrichtiger Daten zu verlangen
          </li>
          <li>Löschung oder Vernichtung der Daten zu verlangen</li>
          <li>Widerspruch gegen automatisierte Analyseergebnisse</li>
          <li>Schadensersatz bei entstandenem Schaden zu verlangen</li>
        </ul>
        <p>
          Zur Ausübung dieser Rechte erreichen Sie uns über die{" "}
          <Link href="/contact">Kontaktseite</Link>.
        </p>

        <h2>6. Datensicherheit</h2>
        <p>
          Der Server-Traffic ist über HTTPS (TLS 1.3) verschlüsselt.
          HTTP-Header sind gehärtet (HSTS, CSP, X-Frame-Options usw.). Da
          wir keine Cookies ohne Einwilligung setzen, ist unsere Angriffsfläche
          für cookiebasierte Angriffe minimal.
        </p>

        <h2>7. Aktualisierungen dieser Erklärung</h2>
        <p>
          Wir können diese Erklärung von Zeit zu Zeit aktualisieren.
          Wesentliche Änderungen werden durch das Datum &quot;Zuletzt
          aktualisiert&quot; oben auf der Seite kenntlich gemacht.
        </p>
      </article>

      <Card className="mt-12 p-6 bg-brand-50/40">
        <div className="flex items-start gap-3">
          <UserCheck className="size-5 text-brand-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              Ich habe eine Anfrage zu meinen Daten
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              Um Ihre Rechte auszuüben oder eine Frage zu dieser
              Datenschutzerklärung zu stellen, wenden Sie sich über die{" "}
              <Link href="/contact" className="text-brand-700 underline">
                Kontaktseite
              </Link>{" "}
              an uns.
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
