import { Tag, ShieldCheck, AlertTriangle } from "lucide-react";
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
        › <span className="text-ink-strong">Reklam Açıklaması</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <Tag className="size-3" /> Affiliate Disclosure
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Reklam Açıklaması
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Son güncelleme: Mayıs 2026
        </p>
      </header>

      <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <Tag className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">Net açıklama</p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              {siteConfig.name}, incelediği bazı VPN sağlayıcılarıyla{" "}
              <strong>affiliate (ortaklık) ilişkisine sahiptir</strong>.
              Sayfadaki bağlantılardan birini takip edip satın alırsan, bize{" "}
              <strong>komisyon</strong> ödenebilir. Bu komisyon senin
              ödediğin fiyatı değiştirmez ve kullanım deneyimini etkilemez.
            </p>
          </div>
        </div>
      </Card>

      <article className="mt-10 prose prose-stone max-w-none">
        <h2>Gelir modelimiz nasıl çalışıyor?</h2>
        <p>
          {siteConfig.name} reklam göstermez ve kullanıcı verisini satmaz.
          Tek gelir kaynağımız, sayfadaki bağlantılardan birini takip ederek
          bir VPN aboneliği satın alan kullanıcılar için sağlayıcı
          tarafından bize ödenen komisyondur. Bu &quot;cost-per-action&quot;
          modelidir: yalnızca senin için bir abonelik başlatılırsa komisyon
          oluşur, sadece bağlantıya tıkladığın için değil.
        </p>

        <h2>Editoryal bağımsızlık</h2>
        <p>
          Affiliate komisyonu;{" "}
          <strong>
            sıralamamızı, içeriğimizi, değerlendirme puanlarımızı veya
            eleştirilerimizi etkilemez
          </strong>
          . Bu bağımsızlığı korumak için:
        </p>
        <ul>
          <li>
            Editoryal puanlama ve affiliate yönetimi sitemizde ayrı
            kararlardır. Bir sağlayıcı yüksek komisyon teklif ettiği için
            sıralaması yükseltilmez.
          </li>
          <li>
            Affiliate programı bulunmayan sağlayıcıları (örn. Mullvad) da
            sıralamamıza dahil ediyoruz; başka bir sağlayıcı yerine daha
            uygun olduklarında önerebiliriz.
          </li>
          <li>
            Sağlayıcıdan içerik kontrolü veya yayın öncesi onay talep
            etmiyoruz. Hiçbir VPN sağlayıcısı yayınlanmadan önce içeriğimizi
            göremez.
          </li>
          <li>
            Bir sağlayıcı bizden yanlış/yanıltıcı içerik talep ederse
            programı sonlandırırız.
          </li>
        </ul>

        <h2>Hangi markalarla affiliate ilişkimiz var?</h2>
        <p>Bu sayfa düzenli olarak güncellenir. Mevcut durum:</p>
        <ul>
          <li>
            <strong>Affiliate ilişkisi olan:</strong> NordVPN, Surfshark,
            ExpressVPN, Proton VPN, Private Internet Access (PIA),
            CyberGhost, IPVanish, Windscribe, TunnelBear
          </li>
          <li>
            <strong>Affiliate ilişkisi olmayan:</strong> Mullvad (affiliate
            programı yok — yine de gizlilik odaklı kullanıcılar için iyi
            bir seçenek olduğunu düşündüğümüzde öneriyoruz)
          </li>
        </ul>
        <p>Bir markayla ilişkimiz değişirse bu liste güncellenir.</p>

        <h2>Bağlantıları nasıl tanıyabilirsin?</h2>
        <p>Sitemizdeki tüm affiliate bağlantıları:</p>
        <ul>
          <li>
            <code>rel=&quot;sponsored nofollow&quot;</code> özniteliği ile
            işaretlenir (arama motorlarına şeffaflık için).
          </li>
          <li>
            Sayfadaki &quot;Fırsata git&quot;, &quot;Hemen dene&quot;,
            &quot;Siteyi ziyaret et&quot; gibi CTA butonları affiliate
            bağlantıyı içerir.
          </li>
          <li>
            Yakınında veya sayfanın altında bir açıklama notu (örneğin
            &quot;Reklam açıklaması&quot;) bulunur.
          </li>
          <li>
            <code>/go/[slug]</code> formatlı bir yönlendirme URL&apos;si
            üzerinden çalışır. Bu, hangi bağlantıya tıklandığını izlememizi
            sağlar ama kişisel veri toplamaz.
          </li>
        </ul>

        <h2>İçerik nasıl ortaya çıkıyor?</h2>
        <p>İncelemelerimiz aşağıdaki kaynaklara dayalıdır:</p>
        <ul>
          <li>
            <strong>Resmi sağlayıcı verisi:</strong> Sağlayıcının kendi web
            sitesi, gizlilik politikası, fiyat sayfası — &quot;Son
            kontrol&quot; tarihiyle birlikte.
          </li>
          <li>
            <strong>Üçüncü taraf denetim raporları:</strong> Deloitte,
            Cure53, Securitum gibi tanınmış güvenlik firmalarının kamuya
            açık raporları.
          </li>
          <li>
            <strong>Kendi testlerimiz:</strong> Hız, streaming uyumluluğu,
            kill switch davranışı gibi laboratuvar testleri. Metodolojimiz{" "}
            <Link href="/metodoloji">/metodoloji</Link> sayfasında
            açıklanmıştır.
          </li>
          <li>
            <strong>Açık kaynak kod incelemesi:</strong> İstemcileri açık
            kaynak olan sağlayıcılar için GitHub repolarının
            değerlendirilmesi.
          </li>
        </ul>
        <p>
          Bilgi tarihinden sonra değişmiş olabilir; sağlayıcının resmi
          sitesini her zaman doğrulamanı öneririz.
        </p>

        <h2>Yasal dayanak</h2>
        <p>Bu açıklama aşağıdaki düzenlemelere uygun olarak hazırlanmıştır:</p>
        <ul>
          <li>
            <strong>FTC Endorsement Guides (ABD)</strong>: Affiliate
            ilişkisinin görünür ve net açıklanması.
          </li>
          <li>
            <strong>
              Türkiye Cumhuriyeti Tüketicinin Korunması Hakkında Kanun (6502
              sayılı)
            </strong>{" "}
            ve <strong>Ticari Reklam ve Haksız Ticari Uygulamalar
            Yönetmeliği</strong>: Reklam ilişkilerinin tüketiciye
            gösterilmesi.
          </li>
          <li>
            <strong>EU Digital Services Act</strong>: Online platformlar
            için şeffaflık yükümlülükleri.
          </li>
        </ul>

        <h2>Soruların ya da geri bildirim için</h2>
        <p>
          Şeffaflık politikamız, içerik yöntemimiz veya affiliate
          ilişkilerimizle ilgili soruların varsa{" "}
          <Link href="/iletisim">iletişim sayfamızdan</Link> bize
          ulaşabilirsin.
        </p>
      </article>

      <Card className="mt-12 p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="size-5 text-brand-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              Affiliate yokmuş gibi davransak ne olurdu?
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              Aynı önerileri yapardık. Çünkü sıralamamız affiliate komisyon
              oranına göre değil, bağımsız test ve doğrulanabilir kanıta
              göre belirlenir.
            </p>
          </div>
        </div>
      </Card>

      <Card className="mt-6 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">Hatırlatma</p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              Bu sayfa bir{" "}
              <Link href="/yasal-uyari" className="text-brand-700 underline">
                yasal uyarı
              </Link>{" "}
              değildir; içerik garantisi vermez. Sağlayıcı verileri
              değişebilir; satın alma kararı vermeden önce ilgili VPN
              sağlayıcısının resmi sayfasından güncel bilgiyi doğrulamanı
              öneririz.
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
        › <span className="text-ink-strong">Advertising disclosure</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <Tag className="size-3" /> Affiliate disclosure
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Advertising disclosure
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Last updated: May 2026
        </p>
      </header>

      <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <Tag className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">In plain terms</p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              {siteConfig.name} has{" "}
              <strong>affiliate (partnership) relationships</strong> with some
              of the VPN providers we review. If you follow a link on the
              page and make a purchase, we may be paid a{" "}
              <strong>commission</strong>. This commission does not change
              the price you pay and does not affect your experience.
            </p>
          </div>
        </div>
      </Card>

      <article className="mt-10 prose prose-stone max-w-none">
        <h2>How does our revenue model work?</h2>
        <p>
          {siteConfig.name} runs no ads and does not sell user data. Our
          only revenue source is the commission a provider pays us when a
          user follows a link on the page and buys a VPN subscription. This
          is a &quot;cost-per-action&quot; model: a commission is generated
          only when a subscription is actually started for you, not just
          because you clicked a link.
        </p>

        <h2>Editorial independence</h2>
        <p>
          The affiliate commission{" "}
          <strong>
            does not influence our ranking, content, scoring or criticism
          </strong>
          . To preserve this independence:
        </p>
        <ul>
          <li>
            Editorial scoring and affiliate management are separate
            decisions. A provider is not ranked higher because it offers a
            higher commission.
          </li>
          <li>
            We include providers without an affiliate programme (e.g.
            Mullvad); we may recommend them over another provider when they
            are a better fit.
          </li>
          <li>
            We do not ask providers for content control or pre-publish
            approval. No VPN provider sees our content before publication.
          </li>
          <li>
            If a provider asks us for misleading content, we end the
            programme.
          </li>
        </ul>

        <h2>Which brands do we have an affiliate relationship with?</h2>
        <p>This page is updated regularly. Current state:</p>
        <ul>
          <li>
            <strong>Affiliate relationship:</strong> NordVPN, Surfshark,
            ExpressVPN, Proton VPN, Private Internet Access (PIA),
            CyberGhost, IPVanish, Windscribe, TunnelBear
          </li>
          <li>
            <strong>No affiliate relationship:</strong> Mullvad (no
            affiliate programme — we still recommend them when we think
            they are a good fit for privacy-focused users)
          </li>
        </ul>
        <p>If a relationship changes, this list is updated.</p>

        <h2>How can you recognise these links?</h2>
        <p>All affiliate links on our site:</p>
        <ul>
          <li>
            are marked with the <code>rel=&quot;sponsored nofollow&quot;</code>{" "}
            attribute (for transparency with search engines).
          </li>
          <li>
            are used in CTA buttons like &quot;Get deal&quot;, &quot;Try
            now&quot;, &quot;Visit site&quot;.
          </li>
          <li>
            have a disclosure note nearby or at the bottom of the page
            (e.g. &quot;Advertising disclosure&quot;).
          </li>
          <li>
            run through a redirect URL in the form{" "}
            <code>/go/[slug]</code>. This lets us see which link was
            clicked but does not collect personal data.
          </li>
        </ul>

        <h2>How is the content produced?</h2>
        <p>Our reviews are based on the following sources:</p>
        <ul>
          <li>
            <strong>Official provider data:</strong> the provider&apos;s
            website, privacy policy and pricing page — together with a
            &quot;Last checked&quot; date.
          </li>
          <li>
            <strong>Third-party audit reports:</strong> publicly available
            reports from firms like Deloitte, Cure53 or Securitum.
          </li>
          <li>
            <strong>Our own tests:</strong> lab-style tests of speed,
            streaming compatibility and kill-switch behaviour. The
            methodology is described on the{" "}
            <Link href="/metodoloji">methodology page</Link>.
          </li>
          <li>
            <strong>Open-source review:</strong> for providers whose
            clients are open source, we review the GitHub repositories.
          </li>
        </ul>
        <p>
          Information may have changed since publication; we always
          recommend verifying the provider&apos;s official site.
        </p>

        <h2>Legal basis</h2>
        <p>This disclosure is aligned with the following regulations:</p>
        <ul>
          <li>
            <strong>FTC Endorsement Guides (US)</strong>: clear, visible
            disclosure of affiliate relationships.
          </li>
          <li>
            <strong>
              Türkiye&apos;s Consumer Protection Law (no. 6502)
            </strong>{" "}
            and{" "}
            <strong>
              Commercial Advertising and Unfair Commercial Practices
              Regulation
            </strong>
            : disclosure of advertising relationships to the consumer.
          </li>
          <li>
            <strong>EU Digital Services Act</strong>: transparency
            obligations for online platforms.
          </li>
        </ul>

        <h2>For questions or feedback</h2>
        <p>
          If you have questions about our transparency policy, content
          methodology or affiliate relationships, get in touch via the{" "}
          <Link href="/iletisim">contact page</Link>.
        </p>
      </article>

      <Card className="mt-12 p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="size-5 text-brand-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              What if we pretended there was no affiliate?
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              We would make the same recommendations. Our ranking is set by
              independent testing and verifiable evidence, not by commission
              rates.
            </p>
          </div>
        </div>
      </Card>

      <Card className="mt-6 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">Reminder</p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              This page is not a{" "}
              <Link href="/yasal-uyari" className="text-brand-700 underline">
                legal notice
              </Link>{" "}
              and provides no content guarantee. Provider data may change;
              before making a purchase, verify current details on the VPN
              provider&apos;s official page.
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
