import type { MetadataRoute } from "next";
import { grants } from "../lib/data/grants";
import { statuses } from "../lib/data/statuses";
import { appeals } from "../lib/data/appeals";
import { eligibilityGuides } from "../lib/data/eligibility";
import { downloadableForms } from "../lib/data/downloads";
import { provinces } from "../lib/data/provinces";
import { guides } from "../lib/data/guides";
import { bankingGuides } from "../lib/data/banking";
import { newsArticles } from "../lib/data/news";
import { paymentMonths } from "../lib/data/paymentDates";
import { loadAllContent, getLocalizedSlugs } from "../lib/content-loader";

const baseUrl = process.env.APP_URL || "https://srdgrantguide.co.za";

const staticRoutes = [
  { path: "", priority: 1.0, changefreq: "weekly" as const },
  { path: "/grants", priority: 0.9, changefreq: "weekly" as const },
  { path: "/status", priority: 0.9, changefreq: "weekly" as const },
  { path: "/payment-dates", priority: 0.9, changefreq: "weekly" as const },
  { path: "/appeals", priority: 0.8, changefreq: "weekly" as const },
  { path: "/eligibility", priority: 0.8, changefreq: "monthly" as const },
  { path: "/tools", priority: 0.7, changefreq: "monthly" as const },
  { path: "/offices", priority: 0.7, changefreq: "monthly" as const },
  { path: "/downloads", priority: 0.6, changefreq: "monthly" as const },
  { path: "/provinces", priority: 0.7, changefreq: "monthly" as const },
  { path: "/guides", priority: 0.7, changefreq: "monthly" as const },
  { path: "/banking", priority: 0.7, changefreq: "monthly" as const },
  { path: "/faq", priority: 0.8, changefreq: "weekly" as const },
  { path: "/news", priority: 0.7, changefreq: "weekly" as const },
  { path: "/about", priority: 0.5, changefreq: "monthly" as const },
  { path: "/about/lucky-cungwa", priority: 0.5, changefreq: "yearly" as const },
  { path: "/contact", priority: 0.5, changefreq: "monthly" as const },
  { path: "/privacy", priority: 0.3, changefreq: "yearly" as const },
  { path: "/terms", priority: 0.3, changefreq: "yearly" as const },
  { path: "/disclaimer", priority: 0.3, changefreq: "yearly" as const },
  { path: "/editorial-policy", priority: 0.4, changefreq: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const allContent = loadAllContent();
  const latestContentDate = allContent.reduce(
    (max, p) => (p.lastUpdated > max ? p.lastUpdated : max),
    "2026-08-23"
  );

  const routes = staticRoutes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: new Date(latestContentDate),
    changeFrequency: r.changefreq,
    priority: r.priority,
  }));

  const jsonPages = allContent
    .filter((p) => p.status === "published")
    .map((p) => ({
      url: `${baseUrl}${p.slug}`,
      lastModified: new Date(p.lastUpdated),
      changeFrequency: (p.classification === "news-article" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: p.slug === "/banking/black-card-swap" ? 0.9 : p.classification === "grant-detail" || p.classification === "status-meaning" ? 0.8 : 0.6,
    }));

  const localizedPages = (["zu", "xh", "af"] as const).flatMap((locale) =>
    getLocalizedSlugs(locale).map((slug) => {
      const en = allContent.find((p) => p.slug === slug);
      return {
        url: `${baseUrl}/${locale}${slug}`,
        lastModified: new Date(en?.lastUpdated || latestContentDate),
        changeFrequency: (en?.classification === "news-article" ? "weekly" : "monthly") as "weekly" | "monthly",
        priority: slug === "/banking/black-card-swap" ? 0.9 : en?.classification === "grant-detail" || en?.classification === "status-meaning" ? 0.8 : 0.6,
      };
    })
  );

  const grantRoutes = grants.map((g) => ({
    url: `${baseUrl}/grants/${g.slug}`,
    lastModified: new Date(latestContentDate),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const statusRoutes = statuses.map((s) => ({
    url: `${baseUrl}/status/${s.slug}`,
    lastModified: new Date(latestContentDate),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const appealRoutes = appeals.map((a) => ({
    url: `${baseUrl}/appeals/${a.slug}`,
    lastModified: new Date(latestContentDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const eligibilityRoutes = eligibilityGuides.map((e) => ({
    url: `${baseUrl}/eligibility/${e.slug}`,
    lastModified: new Date(latestContentDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const downloadRoutes = downloadableForms.map((d) => ({
    url: `${baseUrl}/downloads/${d.slug}`,
    lastModified: new Date(latestContentDate),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const provinceRoutes = provinces.map((p) => ({
    url: `${baseUrl}/provinces/${p.slug}`,
    lastModified: new Date(latestContentDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const guideRoutes = guides.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: new Date(latestContentDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const bankingRoutes = bankingGuides.map((b) => ({
    url: `${baseUrl}/banking/${b.slug}`,
    lastModified: new Date(latestContentDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const newsRoutes = newsArticles.map((n) => ({
    url: `${baseUrl}/news/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const paymentDateRoutes = paymentMonths.map((m) => ({
    url: `${baseUrl}/payment-dates/${m.slug}`,
    lastModified: new Date(latestContentDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const allRoutes = [
    ...routes,
    ...jsonPages,
    ...localizedPages,
    ...grantRoutes,
    ...statusRoutes,
    ...appealRoutes,
    ...eligibilityRoutes,
    ...downloadRoutes,
    ...provinceRoutes,
    ...guideRoutes,
    ...bankingRoutes,
    ...newsRoutes,
    ...paymentDateRoutes,
  ];

  const seen = new Set<string>();
  return allRoutes.filter((r) => {
    if (seen.has(r.url)) return false;
    seen.add(r.url);
    return true;
  });
}
