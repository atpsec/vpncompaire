import { FileText, AlertTriangle } from "lucide-react";
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
        › <span className="text-ink-strong">Kullanım Şartları</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <FileText className="size-3" /> Yasal
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Kullanım Şartları
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Son güncelleme: Mayıs 2026
        </p>
      </header>

      <article className="mt-12 prose prose-stone max-w-none">
        <h2>1. Hizmet açıklaması</h2>
        <p>
          {siteConfig.name} (&quot;site&quot;), VPN servislerini bağımsız
          metodoloji ile inceleyen ve karşılaştıran bilgi amaçlı bir web
          sitesidir. Site, kullanıcılara VPN sağlayıcıları hakkında editoryal
          içerik, karşılaştırma ve rehber sunar.
        </p>

        <h2>2. Kabul</h2>
        <p>
          Bu siteyi kullanarak işbu Kullanım Şartları&apos;nı, Gizlilik
          Politikası&apos;nı ve Reklam Açıklaması&apos;nı kabul etmiş
          sayılırsın. Bu şartları kabul etmiyorsan siteyi kullanmamalısın.
        </p>

        <h2>3. İçeriğin amacı ve sorumluluk sınırı</h2>
        <p>Sitedeki tüm içerikler genel bilgi sağlama amaçlıdır. İçerikler:</p>
        <ul>
          <li>Hukuki tavsiye yerine geçmez</li>
          <li>Mali tavsiye yerine geçmez</li>
          <li>Kişiselleştirilmiş güvenlik danışmanlığı değildir</li>
          <li>Bireysel durumlara özel uygunluk garantisi vermez</li>
        </ul>
        <p>
          Önerilerimiz bağımsız test ve genel kanıtlara dayanır; bireysel
          ihtiyacın için spesifik bir kararı vermeden önce kendi durumunu
          değerlendirmen önerilir.
        </p>

        <h2>4. Üçüncü taraf bağlantıları</h2>
        <p>
          Site, VPN sağlayıcılarının kendi sitelerine bağlantı içerir. Bu
          bağlantıların bazıları affiliate (ortaklık) ilişkisi
          çerçevesindedir — detaylar için{" "}
          <Link href="/reklam-aciklamasi">Reklam Açıklaması</Link>{" "}
          sayfasına bak. Bağlantıyı takip ettiğinde dış sitenin kendi
          şartları geçerli olur; o sitelerin içeriği veya hizmetlerinden
          sorumlu değiliz.
        </p>

        <h2>5. Garantilerin sınırlanması</h2>
        <p>
          Site &quot;olduğu gibi&quot; sunulur. İçeriklerin güncelliği,
          doğruluğu, eksiksizliği konusunda azami özen gösteririz; ancak:
        </p>
        <ul>
          <li>
            VPN sağlayıcıların fiyat, özellik veya hizmet politikaları
            haber verilmeksizin değişebilir
          </li>
          <li>Audit raporları ve denetimler güncellenebilir</li>
          <li>
            Streaming uyumluluğu, sağlayıcı blokları nedeniyle anlık
            olarak değişebilir
          </li>
        </ul>
        <p>
          En son durum için ilgili VPN sağlayıcısının kendi sitesini
          doğrulamanı öneririz.
        </p>

        <h2>6. Sorumluluğun sınırlandırılması</h2>
        <p>
          Yürürlükteki mevzuatın izin verdiği azami ölçüde, {siteConfig.name}{" "}
          siteyle ilişkili olarak doğrudan, dolaylı, arızi veya özel zararlar
          için sorumlu tutulamaz. Bu sınırlama, içerikteki bilgilerin
          kullanılmasından doğan zararları da kapsar.
        </p>

        <h2>7. Fikri mülkiyet</h2>
        <p>
          Sitedeki tüm özgün metin, görsel ve tasarım {siteConfig.name}{" "}
          tarafından üretilmiş olup telif hakkıyla korunur. Adil kullanım
          sınırları içinde alıntı yapılabilir; ancak kaynak belirtilmeden
          kopyalama, sistematik yeniden yayın yasaktır.
        </p>
        <p>
          Marka isimleri (NordVPN, Surfshark, ExpressVPN, Proton VPN, PIA,
          CyberGhost, Mullvad vb.) ilgili sahiplerinin tescilli markalarıdır
          ve burada yalnızca tanımlama amaçlı kullanılır.
        </p>

        <h2>8. Yasaklı kullanımlar</h2>
        <p>Site üzerinden veya site içerikleriyle ilgili olarak:</p>
        <ul>
          <li>Otomatik veri sıyırma (scraping) yapmayacaksın</li>
          <li>
            Siteyi normal kullanım dışında hizmet aksaklığına yol açacak
            şekilde sorgulayamayacaksın (DDoS, vb.)
          </li>
          <li>
            Telif hakkı veya marka haklarını ihlal edecek şekilde içerik
            yeniden yayınlamayacaksın
          </li>
        </ul>

        <h2>9. Şartların değişmesi</h2>
        <p>
          Bu şartları zaman zaman güncelleyebiliriz. Önemli değişiklikler
          sayfa üstündeki &quot;Son güncelleme&quot; tarihiyle belirtilir.
          Güncellemeden sonra siteyi kullanmaya devam etmen, güncel şartları
          kabul ettiğin anlamına gelir.
        </p>

        <h2>10. Uygulanacak hukuk</h2>
        <p>
          İşbu şartlar Türkiye Cumhuriyeti yasalarına tabidir. Doğabilecek
          uyuşmazlıklar için Türk mahkemeleri yetkilidir.
        </p>

        <h2>11. İletişim</h2>
        <p>
          Kullanım şartlarıyla ilgili sorularınız için{" "}
          <Link href="/iletisim">iletişim sayfamızdan</Link> bize
          ulaşabilirsin.
        </p>
      </article>

      <Card className="mt-12 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              Bu sayfa hukuki tavsiye yerine geçmez
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              Spesifik bir hukuki durumda profesyonel danışmanlık almak için
              bir avukatla görüşmeni öneririz.
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
        › <span className="text-ink-strong">Terms of use</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <FileText className="size-3" /> Legal
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Terms of use
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Last updated: May 2026
        </p>
      </header>

      <article className="mt-12 prose prose-stone max-w-none">
        <h2>1. Service description</h2>
        <p>
          {siteConfig.name} (&quot;the site&quot;) is an informational website
          that reviews and compares VPN services with an independent
          methodology. The site offers editorial content, comparisons and
          guides about VPN providers.
        </p>

        <h2>2. Acceptance</h2>
        <p>
          By using this site you accept these Terms of Use, the Privacy Policy
          and the Advertising Disclosure. If you do not accept them, you must
          not use the site.
        </p>

        <h2>3. Purpose of the content and limits of responsibility</h2>
        <p>All content on this site is intended as general information. It:</p>
        <ul>
          <li>does not constitute legal advice</li>
          <li>does not constitute financial advice</li>
          <li>is not personalised security consulting</li>
          <li>provides no guarantee of fit for individual situations</li>
        </ul>
        <p>
          Our recommendations rest on independent testing and general evidence;
          before making a specific decision for your situation, you should
          evaluate your own circumstances.
        </p>

        <h2>4. Third-party links</h2>
        <p>
          The site contains links to VPN providers&apos; own websites. Some of
          these links are affiliate (partnership) links — see the{" "}
          <Link href="/reklam-aciklamasi">Advertising Disclosure</Link>. Once
          you follow a link, the external site&apos;s own terms apply; we are
          not responsible for that site&apos;s content or services.
        </p>

        <h2>5. Limitation of warranties</h2>
        <p>
          The site is provided &quot;as is&quot;. We do our best to keep
          content current, accurate and complete, but:
        </p>
        <ul>
          <li>
            Provider pricing, features or service policies may change without
            notice.
          </li>
          <li>Audit reports and audits may be updated.</li>
          <li>
            Streaming compatibility may shift suddenly because of provider
            blocks.
          </li>
        </ul>
        <p>
          For the latest state, we recommend checking the relevant VPN
          provider&apos;s own website.
        </p>

        <h2>6. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by applicable law, {siteConfig.name}{" "}
          is not liable for direct, indirect, incidental or special damages in
          connection with the site. This limitation also covers damages caused
          by use of the information in the content.
        </p>

        <h2>7. Intellectual property</h2>
        <p>
          All original text, imagery and design on the site is produced by{" "}
          {siteConfig.name} and protected by copyright. Quoting is permitted
          within fair-use limits; copying without attribution and systematic
          republication is prohibited.
        </p>
        <p>
          Brand names (NordVPN, Surfshark, ExpressVPN, Proton VPN, PIA,
          CyberGhost, Mullvad, etc.) are the registered trademarks of their
          owners and are used here only for identification.
        </p>

        <h2>8. Prohibited uses</h2>
        <p>Via the site or its content, you may not:</p>
        <ul>
          <li>perform automated data scraping</li>
          <li>
            query the site outside normal use in a way that disrupts service
            (DDoS, etc.)
          </li>
          <li>
            republish content in a way that infringes copyright or trademark
            rights
          </li>
        </ul>

        <h2>9. Changes to the terms</h2>
        <p>
          We may update these terms from time to time. Significant changes are
          indicated by the &quot;Last updated&quot; date at the top of the
          page. Continued use of the site after an update means you accept the
          revised terms.
        </p>

        <h2>10. Governing law</h2>
        <p>
          These terms are governed by the laws of the Republic of Türkiye.
          Turkish courts have jurisdiction over any disputes that may arise.
        </p>

        <h2>11. Contact</h2>
        <p>
          For questions about these terms of use, reach us via the{" "}
          <Link href="/iletisim">contact page</Link>.
        </p>
      </article>

      <Card className="mt-12 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              This page is not legal advice
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              For professional guidance on a specific legal issue, we recommend
              consulting a lawyer.
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
