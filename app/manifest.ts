import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SRD Grant Guide",
    short_name: "SASSA Guide",
    description:
      "Independent guide to every SASSA social grant: eligibility, payment dates, application steps, and appeals.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#131316",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
