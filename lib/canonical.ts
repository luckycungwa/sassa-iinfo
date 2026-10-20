import { SITE_URL } from "./site";

const DEFAULT_LOCALE = "en";

export function canonicalUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

export function localeAlternates(path: string = ""): Record<string, string> {
  return {
    "en-ZA": canonicalUrl(path),
  };
}

export { DEFAULT_LOCALE };
