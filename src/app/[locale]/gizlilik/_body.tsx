import { Shield, Database, UserCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
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
          Son güncelleme: Mayıs 2026
        </p>
      </header>

      <Card className="mt-8 p-6 bg-success-50/60">
        <h2 className="text-lg font-semibold text-success-700 flex items-center gap-2">
          <Database className="size-5" /> Kısa özet
        </h2>
        <ul className="mt-3 space-y-2 text-ink leading-relaxed text-sm">
          <li>
            <strong>Çerez kullanmıyoruz</strong> — Plausible (gizlilik dostu
            analitik) açık olduğunda dahi çerezsiz çalışır.
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
            <strong>Affiliate tıklamaları</strong> kayda alınmaz; sadece
            VPN sağlayıcısına UTM ile yönlendirme yapılır.
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
          Vercel barındırma altyapımız, standart web sunucu logları olarak
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

        <h3>2.2. Analitik (Plausible)</h3>
        <p>
          Eğer site analitik açıksa, gizlilik dostu Plausible Analytics
          kullanırız. Plausible:
        </p>
        <ul>
          <li>Çerez kullanmaz</li>
          <li>Kişisel veri toplamaz</li>
          <li>IP adresini geçici olarak hash&apos;ler, saklamaz</li>
          <li>Sayfa görüntülenme istatistiklerini agregat olarak gösterir</li>
        </ul>
        <p>
          Plausible verileri, sitemizin performansını değerlendirmek için
          kullanılır. Bireysel kullanıcı takibi yapılmaz.
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
            <strong>Plausible analitik:</strong> KVKK m. 5/2(f) - meşru
            menfaat (siteyi iyileştirme); kişisel veri içermediği için
            KVKK kapsamı dışında.
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
            <strong>Vercel</strong> (web hosting altyapısı) — sunucu
            loglarını işler. Veri işleme sözleşmesi standart koşullarda.
          </li>
          <li>
            <strong>Plausible</strong> (varsa, analitik) — anonim sayfa
            görüntülenme verilerini agregat olarak işler.
          </li>
        </ul>
        <p>
          Affiliate bağlantısına tıkladığında ilgili VPN sağlayıcısına
          yönlendirilirsin; o noktadan sonra sağlayıcının kendi gizlilik
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
          <Link href="/iletisim">iletişim sayfamızdan</Link> bize
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
              <Link href="/iletisim" className="text-brand-700 underline">
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
          Last updated: May 2026
        </p>
      </header>

      <Card className="mt-8 p-6 bg-success-50/60">
        <h2 className="text-lg font-semibold text-success-700 flex items-center gap-2">
          <Database className="size-5" /> Short summary
        </h2>
        <ul className="mt-3 space-y-2 text-ink leading-relaxed text-sm">
          <li>
            <strong>We do not use cookies</strong> — Plausible (privacy-friendly
            analytics) is cookieless even when enabled.
          </li>
          <li>
            <strong>No accounts</strong> — there is no sign-up, no login and no
            password.
          </li>
          <li>
            <strong>No forms</strong> — no form on this site collects personal
            information.
          </li>
          <li>
            <strong>Affiliate clicks</strong> are not stored; we simply redirect
            to the provider with UTM parameters.
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
          Our Vercel hosting infrastructure temporarily keeps standard web
          server logs:
        </p>
        <ul>
          <li>IP address (anonymised)</li>
          <li>Browser type and version (User-Agent)</li>
          <li>Access date/time</li>
          <li>Requested URL</li>
          <li>HTTP response code</li>
        </ul>
        <p>
          These records are kept for 30 days for security, debugging and abuse
          detection, then auto-deleted. They are not used to build personal
          profiles.
        </p>

        <h3>2.2. Analytics (Plausible)</h3>
        <p>
          If analytics is enabled, we use the privacy-friendly Plausible
          Analytics. Plausible:
        </p>
        <ul>
          <li>does not use cookies</li>
          <li>does not collect personal data</li>
          <li>hashes IP addresses transiently and does not store them</li>
          <li>shows pageview stats in aggregate</li>
        </ul>
        <p>
          Plausible data is used to evaluate the site&apos;s performance. No
          individual tracking is performed.
        </p>

        <h3>2.3. Contact email</h3>
        <p>
          If you email us, the contents and address of your message are
          processed solely to respond. After the reply, the message is not
          processed further, but it may be retained for up to 1 year as a
          business record.
        </p>

        <h2>3. Why we process data (legal basis)</h2>
        <ul>
          <li>
            <strong>Server logs:</strong> legitimate interest (security and
            abuse prevention).
          </li>
          <li>
            <strong>Plausible analytics:</strong> legitimate interest
            (improving the site); since no personal data is involved, it is
            outside the scope of personal-data law.
          </li>
          <li>
            <strong>Contact email:</strong> contract/precontract necessity
            (answering your request).
          </li>
        </ul>

        <h2>4. Data sharing</h2>
        <p>
          We do not share your data with third parties. The mandatory technical
          flows involve these service providers:
        </p>
        <ul>
          <li>
            <strong>Vercel</strong> (web hosting) — processes server logs.
            Standard data-processing agreement.
          </li>
          <li>
            <strong>Plausible</strong> (if enabled, analytics) — processes
            anonymous pageview data in aggregate.
          </li>
        </ul>
        <p>
          When you click an affiliate link you are redirected to the VPN
          provider; from that point on the provider&apos;s own privacy policy
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
          <Link href="/iletisim">contact page</Link>.
        </p>

        <h2>6. Data security</h2>
        <p>
          Server traffic is encrypted over HTTPS (TLS 1.3). HTTP headers are
          hardened (HSTS, CSP, X-Frame-Options, etc.). Because we do not use
          cookies, our attack surface for cookie-based exploits is zero.
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
              <Link href="/iletisim" className="text-brand-700 underline">
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
