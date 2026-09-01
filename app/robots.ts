import type { MetadataRoute } from "next";

const baseUrl = process.env.APP_URL || "https://srdgrantguide.co.za";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/404", "/500"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
