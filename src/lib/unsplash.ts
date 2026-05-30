export function getUnsplashImageUrl(
  keyword: string,
  width = 1200,
  height = 630
): string {
  return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(keyword)}`;
}

export function getUnsplashAttribution(keyword: string) {
  return {
    text: "Unsplash contributors",
    url: `https://unsplash.com/s/photos/${encodeURIComponent(keyword)}`,
  };
}
