import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "SASSA Grant Hub — independent South African grant information",
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  /** Skip the "| SASSA Grant Hub" template for titles that already read as full titles. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  /** Optional shorter copy for social cards when the meta description is long. */
  socialDescription?: string;
};

/**
 * Builds a complete metadata object for a page.
 *
 * Next.js shallow-merges metadata: a page that sets `openGraph` replaces the
 * layout's entire object, which silently drops `og:image` and `og:url`. Every
 * route must therefore go through this helper rather than declaring a partial
 * `openGraph` block.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex = false,
  socialDescription,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const social = socialDescription ?? description;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: { "en-ZA": url },
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      locale: "en_ZA",
      siteName: SITE_NAME,
      url,
      title,
      description: social,
      images: [OG_IMAGE],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: social,
      images: [OG_IMAGE.url],
    },
  };
}
