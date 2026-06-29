/**
 * Design Enforcement System (DES) for SASSA Resource Platform
 * Governs the visual integrity, typography, colors, and layout rules.
 * Implements strict rules to eliminate design drift and SaaS-style UI elements.
 */

export interface SpacingScale {
  scale: Record<string, string>;
  rule: string;
}

export interface TypographyTokens {
  families: {
    primary: string; // Switzer / Inter (sans-serif)
    mono: string; // JetBrains Mono (data-heavy)
  };
  sizes: Record<string, string>;
  lineHeights: Record<string, string>;
}

export interface ColorPalette {
  brand: {
    emeraldDark: string; // State Authority Primary
    emeraldLight: string;
    emeraldSubtle: string;
  };
  accents: {
    gold: string; // South African Payout Accent
    goldSubtle: string;
  };
  neutrals: {
    charcoal: string; // Primary Body Text
    slateDark: string;
    slateLight: string;
    white: string;
  };
  states: {
    approved: string;
    pending: string;
    declined: string;
    neutral: string;
  };
}

export const DESIGN_TOKENS = {
  // Spacing scale is locked to finite, non-extensible values
  spacing: {
    scale: {
      none: "0px",
      xs: "4px",    // micro spacing
      sm: "8px",    // inline elements
      md: "12px",   // card items padding
      lg: "16px",   // standard component padding
      xl: "24px",   // section inner margins
      xxl: "32px",  // container block margin
      huge: "48px", // page section gutters
    },
    rule: "Only use these locked values. Do NOT use arbitrary margin/padding values (e.g. m-[15px]) as this creates layout inconsistency.",
  },

  // Typography scale is strictly curated for editorial readability
  typography: {
    families: {
      primary: "'Inter', sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    sizes: {
      meta: "10px",      // status codes, timestamps
      caption: "12px",   // tables, form helps
      body: "14px",      // optimal readable body copy
      subhead: "16px",   // card headers, subsection guides
      headMinor: "20px", // h3
      headMajor: "24px", // h2
      display: "36px",   // h1 page title
    },
    lineHeights: {
      tight: "1.15",
      normal: "1.5",
      relaxed: "1.7", // Mandatory for multi-line body paragraphs
    }
  },

  // Color Palette mapped directly from South African State Authority colors
  colors: {
    brand: {
      emeraldDark: "#064e3b",  // deep state green (slate-900 / green-900)
      emeraldLight: "#047857", // emerald-700
      emeraldSubtle: "#ecfdf5", // emerald-50
    },
    accents: {
      gold: "#fbbf24",       // warm payout gold (amber-400)
      goldSubtle: "#fef3c7", // amber-50
    },
    neutrals: {
      charcoal: "#0f172a",   // deep eye-safe navy/gray (slate-900)
      slateDark: "#475569",  // slate-600
      slateLight: "#f1f5f9", // slate-100
      white: "#ffffff",
    },
    states: {
      approved: "#047857",       // solid green
      pending: "#d97706",        // warm amber
      declined: "#b91c1c",       // deep state red
      neutral: "#475569",        // slate-600
    }
  },

  // Border & Corner Radius Rules
  borders: {
    width: "1px",
    style: "solid",
    radius: {
      none: "0px",
      sharp: "4px",    // for tables and strict borders
      standard: "12px", // for cards and action buttons
      pill: "9999px",   // for status badges only
    },
    shadow: "FULLY FORBIDDEN - Shadows are forbidden across the platform to avoid SaaS-like over-embellished patterns. Rely on neat solid borders and subtle fill variations for elevation.",
  }
};

/**
 * Component Contracts - Strict schemas defining allowed and forbidden styles
 */
export interface ComponentContract {
  name: string;
  allowedProperties: string[];
  forbiddenProperties: string[];
  spacingRules: string;
  accessibilityRequirements: string;
}

export const COMPONENT_CONTRACTS: Record<string, ComponentContract> = {
  Button: {
    name: "Button",
    allowedProperties: [
      "px-4 py-2.5",
      "rounded-xl",
      "font-bold text-xs",
      "transition duration-200",
      "bg-emerald-800 text-white hover:bg-emerald-900", // Primary
      "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50", // Secondary
    ],
    forbiddenProperties: [
      "shadow-* (shadows are forbidden)",
      "bg-gradient-* (gradients are forbidden)",
      "uppercase / tracking-widest (no SaaS-style buttons)",
      "text-lg (do not blow up buttons, keep sizes discrete)",
    ],
    spacingRules: "Standard size is px-4 py-2.5. Touch targets must be at least 44px (e.g. min-h-[44px] on mobile).",
    accessibilityRequirements: "Contrast ratio of text vs button background must be >= 4.5:1. Primary white-on-emerald is 6.8:1.",
  },
  Card: {
    name: "Card",
    allowedProperties: [
      "bg-white border border-slate-100 rounded-3xl p-5 md:p-6",
      "bg-slate-50/50 border border-slate-100 p-4 rounded-2xl",
    ],
    forbiddenProperties: [
      "shadow-* (no shadows allowed)",
      "hover:translate-y-* / hover:scale-* (no playful spring animation cards, remain administrative)",
      "rounded-none / rounded-sm (keep curves friendly but institutional)",
    ],
    spacingRules: "Paddings are strictly 16px (sm:p-4) on small screens and 24px (md:p-6) on desktop.",
    accessibilityRequirements: "Borders must clearly separate card components from the page background (off-white bg with solid borders).",
  },
  StatusBadge: {
    name: "StatusBadge",
    allowedProperties: [
      "px-2.5 py-1 text-[10px] font-bold rounded-full font-mono uppercase tracking-wide",
      "bg-emerald-50 text-emerald-800 border border-emerald-100", // Approved
      "bg-amber-50 text-amber-800 border border-amber-100", // Pending
      "bg-red-50 text-red-800 border border-red-100", // Declined
      "bg-slate-100 text-slate-800 border border-slate-200", // Neutral/Other
    ],
    forbiddenProperties: [
      "pulsing animations (no unrequested telemetry flashing)",
      "rounded-lg (status badges must be pill-shaped)",
      "text-sm (do not blow up metadata labels)",
    ],
    spacingRules: "Internal padding locked to px-2.5 py-1.",
    accessibilityRequirements: "Ensure high-contrast backgrounds for all alert text.",
  },
  PageLayout: {
    name: "PageLayout",
    allowedProperties: [
      "max-w-7xl mx-auto w-full",
      "p-4 sm:p-6 lg:p-8",
    ],
    forbiddenProperties: [
      "w-screen",
      "m-0 (do not omit standard gutters)",
    ],
    spacingRules: "Responsive padding: 16px (mobile), 24px (tablet), 32px (desktop).",
    accessibilityRequirements: "Must provide a clear skip-to-content mechanism or natural logical tab indexes for screen readers.",
  }
};

/**
 * Strategy for Content Storage and Static-First Structure
 */
export const STORE_RECOMMENDATIONS = {
  rootDirectory: "/content",
  subdirectories: {
    "payment-dates": "/content/payment-dates/  --> JSON and Markdown files storing monthly national payout dates",
    "grants": "/content/grants/        --> Markdown files documenting eligibility, amount, means test, and forms",
    "statuses": "/content/statuses/      --> Markdown files with frontmatter explaining SASSA status code remedies",
    "appeals": "/content/appeals/       --> Legal and procedural manuals for appeals to ITSAA",
    "offices": "/content/offices/       --> Regional office branch directories, hours, accessibility parameters",
    "province-hubs": "/content/provinces/     --> Regional SEO authority templates for South African provinces",
  },
  fileNamingConvention: "All files must be named using lowercase-kebab-case.json or lowercase-kebab-case.md to maintain static indexing parity.",
  buildIntegration: "During next.js static export (npm run build), dynamic routes like /grants/[slug] pre-fetch and statically parse these files using standard Node.js filesystem APIs (fs.readFileSync) and frontmatter compilation.",
};
