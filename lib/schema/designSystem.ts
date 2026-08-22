export interface SpacingScale {
  scale: Record<string, string>;
  rule: string;
}

export interface TypographyTokens {
  families: {
    primary: string;
    mono: string;
  };
  sizes: Record<string, string>;
  lineHeights: Record<string, string>;
}

export interface ColorPalette {
  canvas: string;
  surface: string;
  surfaceDim: string;
  ink: string;
  muted: string;
  border: string;
  gold: string;
  goldDark: string;
  states: {
    approved: string;
    pending: string;
    declined: string;
    neutral: string;
  };
}

export const DESIGN_TOKENS = {
  spacing: {
    scale: {
      none: "0px",
      xs: "4px",
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "24px",
      xxl: "32px",
      huge: "48px",
    },
    rule: "Only use these locked values. Do NOT use arbitrary margin/padding values (e.g. m-[15px]) as this creates layout inconsistency.",
  },

  typography: {
    families: {
      primary: "'Hanken Grotesk', sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    sizes: {
      meta: "10px",
      caption: "12px",
      body: "14px",
      subhead: "16px",
      headMinor: "20px",
      headMajor: "24px",
      display: "36px",
    },
    lineHeights: {
      tight: "1.15",
      normal: "1.5",
      relaxed: "1.7",
    }
  },

  colors: {
    canvas: "#0a0a0a",
    surface: "#1a1a1a",
    surfaceDim: "#2a2a2a",
    ink: "#ffffff",
    muted: "#a0a0a0",
    border: "#333333",
    gold: "#ffcc00",
    goldDark: "#cc9900",
    states: {
      approved: "#22c55e",
      pending: "#eab308",
      declined: "#ef4444",
      neutral: "#6b7280",
    }
  },

  borders: {
    width: "1px",
    style: "solid",
    radius: {
      none: "0px",
      sharp: "4px",
      standard: "12px",
      pill: "9999px",
    },
    shadow: "MINIMAL USE - Shadows reserved for dropdown menus and sticky headers only. Cards use borders for elevation.",
  }
};

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
      "rounded-lg",
      "font-bold text-xs",
      "transition",
      "bg-gold text-black hover:bg-gold-dark",
      "bg-surface border border-border text-ink hover:bg-surface-dim",
    ],
    forbiddenProperties: [
      "shadow-* (shadows are forbidden on buttons)",
      "bg-gradient-* (gradients are forbidden)",
      "text-lg (keep sizes discrete)",
    ],
    spacingRules: "Standard size is px-4 py-2.5. Touch targets must be at least 44px.",
    accessibilityRequirements: "Contrast ratio of text vs button background must be >= 4.5:1.",
  },
  Card: {
    name: "Card",
    allowedProperties: [
      "bg-surface border border-border rounded-xl p-5",
      "bg-surface border border-border rounded-lg p-4",
    ],
    forbiddenProperties: [
      "shadow-* (borders for elevation, not shadows)",
      "rounded-3xl / rounded-2xl (use rounded-xl or rounded-lg standard)",
    ],
    spacingRules: "Paddings are strictly 16px (mobile) and 24px (desktop).",
    accessibilityRequirements: "Borders must clearly separate card components from the page background.",
  },
  StatusBadge: {
    name: "StatusBadge",
    allowedProperties: [
      "px-2.5 py-1 text-xs font-bold rounded-full font-mono uppercase tracking-wide",
    ],
    forbiddenProperties: [
      "pulsing animations",
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
      "px-4 sm:px-6 lg:px-8",
    ],
    forbiddenProperties: [
      "w-screen",
      "m-0 (do not omit standard gutters)",
    ],
    spacingRules: "Responsive padding: 16px (mobile), 24px (tablet), 32px (desktop).",
    accessibilityRequirements: "Must provide skip-to-content mechanism.",
  }
};

export const STORE_RECOMMENDATIONS = {
  rootDirectory: "/content",
  subdirectories: {
    "payment-dates": "/content/payment-dates/",
    "grants": "/content/grants/",
    "statuses": "/content/statuses/",
    "appeals": "/content/appeals/",
    "offices": "/content/offices/",
    "province-hubs": "/content/provinces/",
  },
  fileNamingConvention: "All files must be named using lowercase-kebab-case.json",
  buildIntegration: "During next.js build, dynamic routes pre-fetch and statically parse JSON files.",
};
