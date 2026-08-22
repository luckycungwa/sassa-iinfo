export type PageCategory =
  | "banking-guide" | "grant-detail" | "status-meaning" | "appeal-guide"
  | "office-location" | "province-hub" | "eligibility-guide" | "downloadable-form"
  | "how-to-guide" | "news-article" | "faq-page" | "tool-page"
  | "home-page" | "hub-index" | "payment-date";

export interface CategoryTheme {
  accent: string;
  accentLight: string;
  accentDark: string;
  gradientFrom: string;
  gradientTo: string;
  icon: string;
  label: string;
  description: string;
}

export const CATEGORY_THEMES: Record<PageCategory, CategoryTheme> = {
  "banking-guide": {
    accent: "#3b82f6",
    accentLight: "#1e3a5f",
    accentDark: "#60a5fa",
    gradientFrom: "#0f172a",
    gradientTo: "#1e293b",
    icon: "banking",
    label: "Banking Guide",
    description: "Payment methods, bank verification, and account management",
  },
  "grant-detail": {
    accent: "#ffcc00",
    accentLight: "#fff3b3",
    accentDark: "#cc9900",
    gradientFrom: "#1a1a1a",
    gradientTo: "#0a0a0a",
    icon: "grant",
    label: "Grant Guide",
    description: "Eligibility, application, amounts, and requirements",
  },
  "status-meaning": {
    accent: "#22c55e",
    accentLight: "#166534",
    accentDark: "#4ade80",
    gradientFrom: "#052e16",
    gradientTo: "#0a0a0a",
    icon: "status",
    label: "Status Meaning",
    description: "What each SASSA status means and what to do",
  },
  "appeal-guide": {
    accent: "#ef4444",
    accentLight: "#7f1d1d",
    accentDark: "#f87171",
    gradientFrom: "#1a0a0a",
    gradientTo: "#0a0a0a",
    icon: "appeal",
    label: "Appeal Guide",
    description: "How to appeal a declined grant decision",
  },
  "eligibility-guide": {
    accent: "#a855f7",
    accentLight: "#3b0764",
    accentDark: "#c084fc",
    gradientFrom: "#1a0a2e",
    gradientTo: "#0a0a0a",
    icon: "eligibility",
    label: "Eligibility Guide",
    description: "Check if you qualify for SASSA grants",
  },
  "how-to-guide": {
    accent: "#06b6d4",
    accentLight: "#164e63",
    accentDark: "#22d3ee",
    gradientFrom: "#0a1a1e",
    gradientTo: "#0a0a0a",
    icon: "guide",
    label: "How-To Guide",
    description: "Step-by-step instructions for SASSA processes",
  },
  "office-location": {
    accent: "#f97316",
    accentLight: "#7c2d12",
    accentDark: "#fb923c",
    gradientFrom: "#1a0f05",
    gradientTo: "#0a0a0a",
    icon: "office",
    label: "Office Location",
    description: "Find your nearest SASSA office",
  },
  "province-hub": {
    accent: "#14b8a6",
    accentLight: "#134e4a",
    accentDark: "#2dd4bf",
    gradientFrom: "#0a1a18",
    gradientTo: "#0a0a0a",
    icon: "province",
    label: "Province Guide",
    description: "Province-specific SASSA information",
  },
  "payment-date": {
    accent: "#ffcc00",
    accentLight: "#422006",
    accentDark: "#fde047",
    gradientFrom: "#1a1400",
    gradientTo: "#0a0a0a",
    icon: "calendar",
    label: "Payment Date",
    description: "SASSA grant payment schedule",
  },
  "news-article": {
    accent: "#64748b",
    accentLight: "#1e293b",
    accentDark: "#94a3b8",
    gradientFrom: "#0f172a",
    gradientTo: "#0a0a0a",
    icon: "news",
    label: "News",
    description: "Latest SASSA grant updates and announcements",
  },
  "faq-page": {
    accent: "#8b5cf6",
    accentLight: "#2e1065",
    accentDark: "#a78bfa",
    gradientFrom: "#140a1a",
    gradientTo: "#0a0a0a",
    icon: "faq",
    label: "FAQ",
    description: "Frequently asked questions about SASSA",
  },
  "tool-page": {
    accent: "#ec4899",
    accentLight: "#831843",
    accentDark: "#f472b6",
    gradientFrom: "#1a0a14",
    gradientTo: "#0a0a0a",
    icon: "tool",
    label: "Tool",
    description: "Calculators and interactive SASSA tools",
  },
  "downloadable-form": {
    accent: "#84cc16",
    accentLight: "#3f6212",
    accentDark: "#a3e635",
    gradientFrom: "#0a1405",
    gradientTo: "#0a0a0a",
    icon: "download",
    label: "Download",
    description: "SASSA forms and documents",
  },
  "hub-index": {
    accent: "#ffcc00",
    accentLight: "#fff3b3",
    accentDark: "#cc9900",
    gradientFrom: "#1a1a1a",
    gradientTo: "#0a0a0a",
    icon: "hub",
    label: "Resource Hub",
    description: "Browse all SASSA resources",
  },
  "home-page": {
    accent: "#ffcc00",
    accentLight: "#fff3b3",
    accentDark: "#cc9900",
    gradientFrom: "#0a0a0a",
    gradientTo: "#1a1a1a",
    icon: "home",
    label: "Home",
    description: "SASSA Resource Platform",
  },
};
