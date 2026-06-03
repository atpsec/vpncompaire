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
          <Tag className="size-3" /> Reklam & Gelir Açıklaması
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Reklam Açıklaması
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Son güncelleme: Haziran 2026
        </p>
      </header>

      <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <Tag className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">Net açıklama</p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              {siteConfig.name}, gelirini{" "}
              <strong>Google AdSense reklamlarından</strong> elde eder.
              Sayfalarda Google tarafından otomatik seçilen reklamlar
              görüntülenebilir. VPN sağlayıcılarına giden bağlantılar ise{" "}
              <strong>düz, ticari olmayan bağlantılardır</strong>: bunlardan
              komisyon almıyoruz ve tıklama takibi yapmıyoruz.
            </p>
          </div>
        </div>
      </Card>

      <article className="mt-10 prose prose-stone max-w-none">
        <h2>Gelir modelimiz nasıl çalışıyor?</h2>
        <p>
          {siteConfig.name} tek gelir kaynağı olarak{" "}
          <strong>Google AdSense</strong> reklamlarını kullanır. Google,
          sayfalarımızda otomatik olarak reklam yerleştirir ve bu reklamların
          gösterimi ya da tıklanması üzerinden bize ödeme yapılır. Bu modelde
          kazanç, ziyaretçi trafiğine ve reklam gösterimine bağlıdır — belirli
          bir VPN&apos;i satın almana bağlı değildir. Kullanıcı verisini
          satmıyoruz.
        </p>

        <h2>VPN bağlantıları komisyon getirmez</h2>
        <p>
          Sitemizdeki &quot;Resmi siteye git&quot; benzeri butonlar, doğrudan
          ilgili VPN sağlayıcısının kendi resmi sitesine gider. Bu bağlantılar:
        </p>
        <ul>
          <li>
            <strong>Affiliate/ortaklık bağlantısı değildir</strong> — hiçbir
            sağlayıcıdan satış komisyonu almıyoruz.
          </li>
          <li>
            <code>rel=&quot;noopener nofollow&quot;</code> ve{" "}
            <code>target=&quot;_blank&quot;</code> ile işaretlenir; yeni
            sekmede markanın resmi sayfasını açar.
          </li>
          <li>
            Bir yönlendirme/izleme katmanından geçmez; hangi bağlantıya
            tıkladığını izlemeyiz.
          </li>
        </ul>

        <h2>Editoryal bağımsızlık</h2>
        <p>
          Reklam geliri;{" "}
          <strong>
            sıralamamızı, içeriğimizi, değerlendirme puanlarımızı veya
            eleştirilerimizi etkilemez
          </strong>
          . Bunu korumak için:
        </p>
        <ul>
          <li>
            Sayfalardaki Google reklamları, içeriğe ve ziyaretçiye göre Google
            tarafından otomatik seçilir. Hangi markanın reklamının
            görüneceğini biz belirlemeyiz; bir reklamın görünmesi o ürünü
            önerdiğimiz anlamına gelmez.
          </li>
          <li>
            Editoryal puanlama, reklam gelirinden tamamen bağımsızdır. Bir
            sağlayıcı bizim sıralamamızı satın alamaz.
          </li>
          <li>
            Sağlayıcıdan içerik kontrolü veya yayın öncesi onay talep
            etmiyoruz. Hiçbir VPN sağlayıcısı yayınlanmadan önce içeriğimizi
            göremez.
          </li>
        </ul>

        <h2>Reklam çerezleri ve kişiselleştirme</h2>
        <p>
          Google AdSense, reklamları kişiselleştirmek için çerez ve benzeri
          teknolojiler kullanabilir. Avrupa Ekonomik Alanı, Birleşik Krallık
          ve İsviçre&apos;deki ziyaretçiler için kişiselleştirilmiş reklam ve
          ölçüm çerezleri yalnızca açık rıza verildiğinde etkinleştirilir.
          Çerez tercihlerini sayfa altındaki onay panelinden yönetebilirsin;
          ayrıntılar için{" "}
          <Link href="/cerez-politikasi">çerez politikamıza</Link> ve{" "}
          <Link href="/gizlilik">gizlilik politikamıza</Link> bakabilirsin.
        </p>

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
            <strong>Google AdSense Program Politikaları</strong>: reklam ve
            içerik şeffaflığı yükümlülükleri.
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
          Şeffaflık politikamız, reklam modelimiz veya içerik yöntemimizle
          ilgili soruların varsa{" "}
          <Link href="/iletisim">iletişim sayfamızdan</Link> bize
          ulaşabilirsin.
        </p>
      </article>

      <Card className="mt-12 p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="size-5 text-brand-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              Reklam gelirimiz olmasaydı ne değişirdi?
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              Aynı önerileri yapardık. Çünkü sıralamamız reklam gelirine göre
              değil, bağımsız test ve doğrulanabilir kanıta göre belirlenir.
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
          <Tag className="size-3" /> Advertising & revenue disclosure
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Advertising disclosure
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Last updated: June 2026
        </p>
      </header>

      <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <Tag className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">In plain terms</p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              {siteConfig.name} earns its revenue from{" "}
              <strong>Google AdSense ads</strong>. Pages may display ads
              automatically selected by Google. Links to VPN providers are{" "}
              <strong>plain, non-commercial links</strong>: we receive no
              commission from them and we do not track your clicks.
            </p>
          </div>
        </div>
      </Card>

      <article className="mt-10 prose prose-stone max-w-none">
        <h2>How does our revenue model work?</h2>
        <p>
          {siteConfig.name} uses <strong>Google AdSense</strong> ads as its
          only revenue source. Google places ads automatically on our pages
          and pays us based on ad impressions or clicks. In this model, our
          revenue depends on visitor traffic and ad delivery — not on whether
          you buy any particular VPN. We do not sell user data.
        </p>

        <h2>VPN links earn no commission</h2>
        <p>
          Buttons like &quot;Visit official site&quot; on our pages link
          directly to the VPN provider&apos;s own official website. These
          links:
        </p>
        <ul>
          <li>
            <strong>are not affiliate/partnership links</strong> — we receive
            no sales commission from any provider.
          </li>
          <li>
            are marked with <code>rel=&quot;noopener nofollow&quot;</code> and{" "}
            <code>target=&quot;_blank&quot;</code>; they open the brand&apos;s
            official page in a new tab.
          </li>
          <li>
            do not pass through any redirect/tracking layer; we do not track
            which link you clicked.
          </li>
        </ul>

        <h2>Editorial independence</h2>
        <p>
          Ad revenue{" "}
          <strong>
            does not influence our ranking, content, scoring or criticism
          </strong>
          . To preserve this:
        </p>
        <ul>
          <li>
            Google ads on our pages are selected automatically by Google based
            on the content and the visitor. We do not decide which brand&apos;s
            ad appears; an ad appearing does not mean we endorse that product.
          </li>
          <li>
            Editorial scoring is entirely independent of ad revenue. A
            provider cannot buy a place in our ranking.
          </li>
          <li>
            We do not ask providers for content control or pre-publish
            approval. No VPN provider sees our content before publication.
          </li>
        </ul>

        <h2>Ad cookies and personalisation</h2>
        <p>
          Google AdSense may use cookies and similar technologies to
          personalise ads. For visitors in the European Economic Area, the
          United Kingdom and Switzerland, personalised advertising and
          measurement cookies are enabled only with explicit consent. You can
          manage your cookie preferences from the consent panel at the bottom
          of the page; for details, see our{" "}
          <Link href="/cerez-politikasi">cookie policy</Link> and{" "}
          <Link href="/gizlilik">privacy policy</Link>.
        </p>

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
            <strong>Google AdSense Program Policies</strong>: transparency
            obligations for ads and content.
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
          If you have questions about our transparency policy, advertising
          model or content methodology, get in touch via the{" "}
          <Link href="/iletisim">contact page</Link>.
        </p>
      </article>

      <Card className="mt-12 p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="size-5 text-brand-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              What would change without our ad revenue?
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              We would make the same recommendations. Our ranking is set by
              independent testing and verifiable evidence, not by ad revenue.
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
