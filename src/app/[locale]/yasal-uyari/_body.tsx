import { AlertTriangle, Scale } from "lucide-react";
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
        › <span className="text-ink-strong">Yasal Uyarı</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <Scale className="size-3" /> Yasal Uyarı
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Yasal Uyarı (Disclaimer)
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Son güncelleme: Mayıs 2026
        </p>
      </header>

      <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              Lütfen önemli: bilgi amaçlı içerik
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              Bu sitedeki tüm içerik genel bilgi amaçlıdır.{" "}
              {siteConfig.name} hukuki, finansal veya siber güvenlik
              garantisi vermez. Bir VPN seçimi veya gizlilik kararı
              vermeden önce kendi durumunu değerlendirmek senin
              sorumluluğundadır.
            </p>
          </div>
        </div>
      </Card>

      <article className="mt-10 prose prose-stone max-w-none">
        <h2>1. Garantilerin reddi</h2>
        <p>
          {siteConfig.name}, sitedeki bilgilerin{" "}
          <strong>doğruluğu, eksiksizliği veya güncelliği</strong>{" "}
          konusunda hiçbir açık veya örtük garanti vermez. İçerik
          &quot;olduğu gibi&quot; sunulur. Site:
        </p>
        <ul>
          <li>
            Belirli bir VPN&apos;in <strong>seni koruyacağını</strong>{" "}
            garanti etmez.
          </li>
          <li>
            Hiçbir VPN&apos;in <strong>tam anonimlik sağladığını</strong>{" "}
            iddia etmez. VPN, gizliliği artıran bir araçtır; anonimliğin
            tek garantisi değildir.
          </li>
          <li>
            Yasal süreçlerde sağlayıcıların{" "}
            <strong>kullanıcı verisini ifşa etmeyeceğini</strong>{" "}
            garanti etmez. Geçmişteki davranış, gelecekteki davranışın
            kanıtı değildir.
          </li>
          <li>
            Streaming uyumluluğunun veya bypass başarısının{" "}
            <strong>kalıcılığını</strong> garanti etmez. Platform
            kontrolleri sürekli değişir.
          </li>
        </ul>

        <h2>2. Sağlayıcı verisinin değişkenliği</h2>
        <p>
          VPN sağlayıcıların aşağıdaki bilgileri, biz fark etmeden veya
          sayfayı güncelleyemeden değişebilir:
        </p>
        <ul>
          <li>Aylık/yıllık fiyatlar ve indirim kampanyaları</li>
          <li>Yenileme dönemi fiyatlandırması</li>
          <li>Para iade süresi ve koşulları</li>
          <li>Sunucu sayısı, ülke listesi, yeni/kaldırılan lokasyonlar</li>
          <li>Eşzamanlı cihaz limiti</li>
          <li>Bağımsız denetim sıklığı ve son denetim tarihi</li>
          <li>Gizlilik politikası ve no-log uygulaması</li>
          <li>Yargı yetkisi (örn. şirket satın alımları, taşınma)</li>
          <li>Desteklenen ödeme yöntemleri</li>
          <li>Streaming platform uyumluluğu</li>
        </ul>
        <p>
          <strong>
            Satın alma kararı vermeden önce, ilgili sağlayıcının resmi
            web sitesinden en güncel bilgileri kontrol etmek senin
            sorumluluğundır.
          </strong>
        </p>

        <h2>3. Hukuki tavsiye değildir</h2>
        <p>
          Sitede yer alan &quot;Türkiye&apos;de VPN yasal mı?&quot; veya
          benzeri rehberler{" "}
          <strong>hukuki tavsiye olarak yorumlanamaz</strong>. Yasalar
          zaman içinde değişir; bireysel durumlar farklılık gösterir.
          Spesifik bir hukuki sorun için bir avukatla görüşmeni
          öneririz.
        </p>

        <h2>4. Finansal tavsiye değildir</h2>
        <p>
          Fiyat karşılaştırmaları ve maliyet hesaplayıcı{" "}
          <strong>finansal tavsiye yerine geçmez</strong>. Bir
          aboneliğin senin için uygun olup olmadığını kendi bütçen ve
          ihtiyacın çerçevesinde değerlendirmek senin
          sorumluluğundadır.
        </p>

        <h2>5. Siber güvenlik garantisi değildir</h2>
        <p>
          VPN, kapsamlı bir siber güvenlik çözümünün yalnızca bir
          parçasıdır. Hiçbir VPN tek başına seni:
        </p>
        <ul>
          <li>Kötü amaçlı yazılımdan korumaz (antivirüs gerekir).</li>
          <li>
            Phishing/sosyal mühendislikten tek başına korumaz (bilinçli
            kullanım gerekir).
          </li>
          <li>
            Tarayıcı parmak izinden veya cookie tabanlı izlemeden
            korumaz.
          </li>
          <li>
            Bilinçli olarak verdiğin kişisel bilgilerin kaybından
            korumaz.
          </li>
          <li>
            Hukuki süreçlerde kimliğinin ortaya çıkmasından kesin
            olarak korumaz.
          </li>
        </ul>

        <h2>6. Üçüncü taraf hizmetleri</h2>
        <p>
          Bağlandığın VPN sağlayıcılarının kendi şartları, gizlilik
          politikaları ve hizmet kalitesi geçerlidir. {siteConfig.name}{" "}
          bu üçüncü tarafların hareketlerinden, fiyat değişikliklerinden,
          servis kesintilerinden veya politika değişikliklerinden
          sorumlu değildir.
        </p>

        <h2>7. Marka adları</h2>
        <p>
          Site içinde geçen marka adları (NordVPN, Surfshark, ExpressVPN,
          Proton VPN, PIA, CyberGhost, Mullvad, IPVanish, Windscribe,
          TunnelBear vb.) ilgili sahiplerinin tescilli markalarıdır ve
          yalnızca ürün tanımlama amacıyla nominatif adil kullanım
          (nominative fair use) çerçevesinde kullanılır.
        </p>

        <h2>8. Reklam ve gelir</h2>
        <p>
          {siteConfig.name} gelirini Google AdSense reklamlarından elde eder.
          VPN sağlayıcılarına giden bağlantılar düz, ticari olmayan
          bağlantılardır; bunlardan komisyon almıyoruz. Detaylar için{" "}
          <Link href="/reklam-aciklamasi">Reklam Açıklaması</Link>{" "}
          sayfasına bak.
        </p>

        <h2>9. Sorumluluğun sınırlandırılması</h2>
        <p>
          Yürürlükteki mevzuatın izin verdiği azami ölçüde,{" "}
          {siteConfig.name} ve yazarları/editörleri, bu sitedeki bilgilere
          dayanarak alınan kararlar sonucunda doğan{" "}
          <strong>doğrudan, dolaylı, arızi veya özel zararlar</strong>{" "}
          için sorumlu tutulamaz.
        </p>

        <h2>10. Nihai karar kullanıcıdadır</h2>
        <p>
          Hangi VPN&apos;i seçeceğin, hangi planı satın alacağın, VPN&apos;i
          nasıl yapılandıracağın ve hangi yasal/teknik bağlamda
          kullanacağın <strong>tamamen senin kararındır</strong>. Bu
          sitenin önerileri başlangıç noktası olarak değerlendirilmeli,
          kesin direktif olarak değil.
        </p>
      </article>

      <RelatedLinksTr />
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
        › <span className="text-ink-strong">Legal notice</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <Scale className="size-3" /> Legal notice
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Legal Notice (Disclaimer)
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Last updated: May 2026
        </p>
      </header>

      <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              Important: informational content
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              All content on this site is general information.{" "}
              {siteConfig.name} provides no legal, financial or
              cybersecurity guarantee. Before making a VPN choice or a
              privacy decision, you are responsible for evaluating your
              own situation.
            </p>
          </div>
        </div>
      </Card>

      <article className="mt-10 prose prose-stone max-w-none">
        <h2>1. Disclaimer of warranties</h2>
        <p>
          {siteConfig.name} makes no express or implied warranty about the{" "}
          <strong>accuracy, completeness or timeliness</strong> of the
          information on this site. Content is provided &quot;as is&quot;.
          The site:
        </p>
        <ul>
          <li>
            does not guarantee that a particular VPN will{" "}
            <strong>protect you</strong>.
          </li>
          <li>
            does not claim that any VPN provides{" "}
            <strong>complete anonymity</strong>. A VPN is a privacy-enhancing
            tool, not the only guarantee of anonymity.
          </li>
          <li>
            does not guarantee that providers will{" "}
            <strong>refuse to disclose user data</strong> in legal proceedings.
            Past behaviour is not evidence of future behaviour.
          </li>
          <li>
            does not guarantee the <strong>persistence</strong> of streaming
            compatibility or successful bypass. Platform controls change
            constantly.
          </li>
        </ul>

        <h2>2. Variability of provider data</h2>
        <p>
          The following information about VPN providers may change without our
          noticing or before we can update a page:
        </p>
        <ul>
          <li>Monthly/yearly pricing and discount promotions</li>
          <li>Renewal-period pricing</li>
          <li>Refund window and terms</li>
          <li>Server count, country list, new/removed locations</li>
          <li>Simultaneous-device limits</li>
          <li>Audit frequency and last-audit date</li>
          <li>Privacy policy and no-log enforcement</li>
          <li>Jurisdiction (e.g. acquisitions, relocations)</li>
          <li>Supported payment methods</li>
          <li>Streaming platform compatibility</li>
        </ul>
        <p>
          <strong>
            Before making a purchase, you are responsible for checking the
            latest information on the provider&apos;s official website.
          </strong>
        </p>

        <h2>3. Not legal advice</h2>
        <p>
          Guides on the site such as &quot;Is VPN legal in Türkiye?&quot;{" "}
          <strong>must not be interpreted as legal advice</strong>. Laws
          change over time; individual situations differ. For a specific legal
          question we recommend consulting a lawyer.
        </p>

        <h2>4. Not financial advice</h2>
        <p>
          Price comparisons and the cost calculator{" "}
          <strong>do not constitute financial advice</strong>. Deciding
          whether a subscription is right for you, within your budget and
          needs, is your responsibility.
        </p>

        <h2>5. Not a cybersecurity guarantee</h2>
        <p>
          A VPN is only one part of a comprehensive cybersecurity setup. No
          VPN alone will:
        </p>
        <ul>
          <li>protect you from malware (you need antivirus).</li>
          <li>
            protect you from phishing/social engineering on its own (mindful
            use is required).
          </li>
          <li>
            protect you from browser fingerprinting or cookie-based tracking.
          </li>
          <li>
            protect you from disclosing personal information you choose to
            share.
          </li>
          <li>
            categorically protect your identity from being revealed in legal
            proceedings.
          </li>
        </ul>

        <h2>6. Third-party services</h2>
        <p>
          The terms, privacy policies and service quality of the VPN providers
          you connect to apply on their side. {siteConfig.name} is not
          responsible for the actions of those third parties, for price
          changes, service outages or policy changes.
        </p>

        <h2>7. Brand names</h2>
        <p>
          Brand names mentioned on the site (NordVPN, Surfshark, ExpressVPN,
          Proton VPN, PIA, CyberGhost, Mullvad, IPVanish, Windscribe,
          TunnelBear, etc.) are registered trademarks of their respective
          owners and are used here only for product identification under
          nominative fair use.
        </p>

        <h2>8. Advertising and revenue</h2>
        <p>
          {siteConfig.name} earns its revenue from Google AdSense ads. Links to
          VPN providers are plain, non-commercial links; we earn no commission
          from them. See the{" "}
          <Link href="/reklam-aciklamasi">Advertising Disclosure</Link> for
          details.
        </p>

        <h2>9. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by applicable law,{" "}
          {siteConfig.name} and its authors/editors are not liable for{" "}
          <strong>direct, indirect, incidental or special damages</strong>{" "}
          arising from decisions based on the information on this site.
        </p>

        <h2>10. The final decision is the reader&apos;s</h2>
        <p>
          Which VPN you choose, which plan you buy, how you configure the VPN
          and in which legal/technical context you use it is{" "}
          <strong>entirely your decision</strong>. The recommendations on this
          site should be treated as a starting point, not as a directive.
        </p>
      </article>

      <RelatedLinksEn />
    </>
  );
}

function RelatedLinksTr() {
  return (
    <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
      <p className="text-sm text-ink-muted">İlgili sayfalar</p>
      <div className="mt-3 flex flex-wrap gap-2 justify-center">
        <Link
          href="/reklam-aciklamasi"
          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
        >
          Reklam açıklaması
        </Link>
        <Link
          href="/sartlar"
          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
        >
          Kullanım şartları
        </Link>
        <Link
          href="/gizlilik"
          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
        >
          Gizlilik politikası
        </Link>
        <Link
          href="/metodoloji"
          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
        >
          Test metodolojimiz
        </Link>
      </div>
    </section>
  );
}

function RelatedLinksEn() {
  return (
    <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
      <p className="text-sm text-ink-muted">Related pages</p>
      <div className="mt-3 flex flex-wrap gap-2 justify-center">
        <Link
          href="/reklam-aciklamasi"
          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
        >
          Advertising disclosure
        </Link>
        <Link
          href="/sartlar"
          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
        >
          Terms of use
        </Link>
        <Link
          href="/gizlilik"
          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
        >
          Privacy policy
        </Link>
        <Link
          href="/metodoloji"
          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
        >
          Our methodology
        </Link>
      </div>
    </section>
  );
}
