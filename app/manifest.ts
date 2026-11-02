import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SASSA Grant Hub",
    short_name: "Grant Hub",
    description:
      "Independent guidance on SASSA grant statuses, payment dates, applications, eligibility and appeals. Not affiliated with SASSA.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f7f9",
    theme_color: "#102a43",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/main-logo.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
