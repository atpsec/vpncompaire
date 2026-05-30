import Image from "next/image";
import { getUnsplashImageUrl, getUnsplashAttribution } from "@/lib/unsplash";
import { useTranslations } from "next-intl";

type UnsplashImageProps = {
  keyword: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export function UnsplashImage({
  keyword,
  alt,
  width = 1200,
  height = 630,
  className = "",
}: UnsplashImageProps) {
  const t = useTranslations("blog");
  const imageUrl = getUnsplashImageUrl(keyword, width, height);
  const attribution = getUnsplashAttribution(keyword);

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          className="object-cover"
          unoptimized
        />
      </div>
      <p className="mt-2 text-xs text-ink-subtle">
        {t("photoBy")}{" "}
        <a
          href={attribution.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-ink-muted"
        >
          {attribution.text}
        </a>{" "}
        {t("onUnsplash")}
      </p>
    </div>
  );
}
