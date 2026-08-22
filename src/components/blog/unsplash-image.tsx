import Image from "next/image";
import { getBlogImage } from "@/lib/unsplash";
import { getTranslations } from "next-intl/server";

type UnsplashImageProps = {
  coverImage: string;
  position?: "hero" | "mid" | "end";
  seed?: string;
  alt?: string;
  className?: string;
  preload?: boolean;
};

export async function UnsplashImage({
  coverImage,
  position = "hero",
  seed,
  alt,
  className = "",
  preload = false,
}: UnsplashImageProps) {
  const t = await getTranslations("blog");
  const image = getBlogImage(coverImage, position, seed);
  const isHero = position === "hero";
  const width = isHero ? 1200 : 800;
  const height = isHero ? 630 : 450;

  return (
    <figure className={className}>
      <div className="relative overflow-hidden rounded-2xl bg-surface-subtle">
        <Image
          src={image.url}
          alt={alt || image.alt}
          width={width}
          height={height}
          className="h-auto w-full object-cover"
          sizes={isHero ? "(max-width: 768px) 100vw, 1200px" : "(max-width: 768px) 100vw, 800px"}
          preload={preload}
          loading={preload ? undefined : "lazy"}
        />
      </div>
      <figcaption className="mt-2 text-xs text-ink-subtle">
        {t("photoBy")}{" "}
        <a
          href={image.photographerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-ink-muted"
        >
          {image.photographer}
        </a>{" "}
        {t("onUnsplash")}
      </figcaption>
    </figure>
  );
}
