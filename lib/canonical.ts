const DEFAULT_LOCALE = "en";

export function canonicalUrl(path: string = "", locale?: string): string {
  const baseUrl = process.env.APP_URL || "https://srdgrantguide.co.za";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (locale && locale !== DEFAULT_LOCALE) {
    const suffix = cleanPath === "/" ? "" : cleanPath;
    return `${baseUrl}/${locale}${suffix}`;
  }
  return `${baseUrl}${cleanPath}`;
}

export function localeAlternates(path: string = ""): Record<string, string> {
  return {
    "en-ZA": canonicalUrl(path),
    "zu-ZA": canonicalUrl(path, "zu"),
    "xh-ZA": canonicalUrl(path, "xh"),
    "af-ZA": canonicalUrl(path, "af"),
  };
}