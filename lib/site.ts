/**
 * Canonical site URL, resolved once from APP_URL.
 *
 * Every absolute URL on the site (canonicals, sitemap, robots.txt, JSON-LD,
 * Open Graph) must be built from this value so the domain can never drift
 * between files. APP_URL has no trailing slash in production; one is stripped
 * here so joins stay predictable.
 */
const FALLBACK_URL = "https://sassagranthub.co.za";

const configuredUrl = process.env.APP_URL?.trim();
const isLocalUrl = configuredUrl ? /localhost|127\.0\.0\.1/i.test(configuredUrl) : false;

/**
 * Localhost is valid in development but must never leak into a production
 * build. If APP_URL is missing or points at loopback in production, fall back
 * to the canonical domain instead of publishing localhost canonicals.
 */
const usableUrl =
  configuredUrl && !(process.env.NODE_ENV === "production" && isLocalUrl)
    ? configuredUrl
    : undefined;

export const SITE_URL = (usableUrl || FALLBACK_URL).replace(/\/+$/, "");

export const SITE_FALLBACK_USED = !usableUrl;

export const SITE_NAME = "SASSA Grant Hub";

export const SITE_DESCRIPTION =
  "Independent South African resource for SASSA grant statuses, payment dates, applications, eligibility and appeals. Understand what your status means and where to get official help.";

export const SITE_TAGLINE = "Check Your SASSA Status. Understand Your Next Step.";

export const SITE_OPERATOR = "44tagstudios";

export const SITE_OPERATOR_URL = "https://44tagstudios.co.za";

export const SITE_EDITOR = "Lucky Cungwa";

export const SITE_EDITOR_URL = "/about/lucky-cungwa";

/** Official services visitors are sent to for personal or account actions. */
export const OFFICIAL_LINKS = {
  sassa: "https://www.sassa.gov.za/",
  srd: "https://srd.sassa.gov.za/",
  appeals: "https://srd.dsd.gov.za/",
  dsd: "https://www.dsd.gov.za/",
  gov: "https://www.gov.za/",
  sanews: "https://www.sanews.gov.za/",
  helpline: "0800 60 10 11",
} as const;

/**
 * Hosts that must permanently redirect to the canonical origin after migration.
 * www.sassagranthub.co.za is intentionally absent: the apex/www redirect is
 * handled at the Vercel edge, and duplicating it in the app causes a loop.
 */
export const LEGACY_HOSTS = [
  "sassagranttguide.vercel.app",
  "sassagrantguide.co.za",
  "www.sassagrantguide.co.za",
] as const;
