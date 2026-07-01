import type { MetadataRoute } from "next";
import { grants } from "../lib/data/grants";
import { statuses } from "../lib/data/statuses";
import { appeals } from "../lib/data/appeals";
import { eligibilityGuides } from "../lib/data/eligibility";
import { offices } from "../lib/data/offices";
import { downloadableForms } from "../lib/data/downloads";
import { provinces } from "../lib/data/provinces";
import { guides } from "../lib/data/guides";
import { bankingGuides } from "../lib/data/banking";
import { newsArticles } from "../lib/data/news";
import { paymentMonths } from "../lib/data/paymentDates";
import { loadAllContent } from "../lib/content-loader";

const baseUrl = process.env.APP_URL || "https://sassa-resource.vercel.app";

const staticRoutes = [
  "", "/payment-dates", "/grants", "/status", "/appeals", "/eligibility",
  "/tools", "/offices", "/downloads", "/provinces", "/guides", "/banking",
  "/faq", "/news",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const jsonPages = loadAllContent()
    .filter((p) => p.status === "published")
    .map((p) => ({
      url: `${baseUrl}${p.slug}`,
      lastModified: new Date(p.lastUpdated),
      changeFrequency: (p.classification === "news-article" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: p.classification === "grant-detail" || p.classification === "status-meaning" ? 0.7 : 0.6,
    }));

  const grantRoutes = grants.map((g) => ({
    url: `${baseUrl}/grants/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const statusRoutes = statuses.map((s) => ({
    url: `${baseUrl}/status/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const appealRoutes = appeals.map((a) => ({
    url: `${baseUrl}/appeals/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const eligibilityRoutes = eligibilityGuides.map((e) => ({
    url: `${baseUrl}/eligibility/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const officeRoutes = offices.map((o) => ({
    url: `${baseUrl}/offices/${o.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const downloadRoutes = downloadableForms.map((d) => ({
    url: `${baseUrl}/downloads/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const provinceRoutes = provinces.map((p) => ({
    url: `${baseUrl}/provinces/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const guideRoutes = guides.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const bankingRoutes = bankingGuides.map((b) => ({
    url: `${baseUrl}/banking/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const newsRoutes = newsArticles.map((n) => ({
    url: `${baseUrl}/news/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const paymentDateRoutes = paymentMonths.map((m) => ({
    url: `${baseUrl}/payment-dates/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...routes,
    ...jsonPages,
    ...grantRoutes,
    ...statusRoutes,
    ...appealRoutes,
    ...eligibilityRoutes,
    ...officeRoutes,
    ...downloadRoutes,
    ...provinceRoutes,
    ...guideRoutes,
    ...bankingRoutes,
    ...newsRoutes,
    ...paymentDateRoutes,
  ];
}
