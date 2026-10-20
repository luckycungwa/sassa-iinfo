/**
 * Canonical site URL, resolved once from APP_URL.
 *
 * Every absolute URL on the site (canonicals, sitemap, robots.txt, JSON-LD,
 * Open Graph) must be built from this value so the domain can never drift
 * between files. APP_URL has no trailing slash in production; one is stripped
 * here so joins stay predictable.
 */
const FALLBACK_URL = "https://sassagrantguide.co.za";

export const SITE_URL = (process.env.APP_URL?.trim() || FALLBACK_URL).replace(/\/+$/, "");

export const SITE_FALLBACK_USED = !process.env.APP_URL?.trim();

export const SITE_NAME = "SASSA Grant Guide";
