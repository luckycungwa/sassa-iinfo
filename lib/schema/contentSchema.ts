/**
 * Foundational Content Schema System for SASSA Resource Platform
 * Governs the structured representation of all 5,000+ static-first resource pages.
 * Fully typed, extensible, and optimized for search performance and YMYL (Your Money Your Life) guidelines.
 */

export type PageClassification =
  | "payment-date"
  | "grant-detail"
  | "status-meaning"
  | "appeal-guide"
  | "office-location"
  | "province-hub"
  | "general-resource";

export interface Author {
  name: string;
  role: string;
  credentials?: string; // Critical for E-E-A-T (e.g. "BA Social Work, Ex-SASSA Consultant")
  verified: boolean;
}

export interface SEOMetadata {
  metaTitle: string; // Dynamic page title tag override (max 60 chars)
  metaDescription: string; // Custom organic snippet (120-160 chars)
  keywords: string[];
  canonicalUrl?: string;
  schemaMarkup?: Record<string, any>; // For FAQPage, BreadcrumbList, LocalBusiness, or SocialGrant schemas
}

// Discriminated Union of all possible structured content blocks
export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | ListBlock
  | TableBlock
  | CalloutBlock
  | StepsBlock
  | FAQBlock
  | PaymentDatesBlock
  | OfficeDetailsBlock
  | CustomBlock;

export interface BaseBlock {
  id: string; // Unique within the page to facilitate targeted anchor links
  type: string;
}

export interface HeadingBlock extends BaseBlock {
  type: "heading";
  level: 1 | 2 | 3 | 4;
  text: string;
}

export interface ParagraphBlock extends BaseBlock {
  type: "paragraph";
  text: string;
}

export interface ListBlock extends BaseBlock {
  type: "list";
  ordered: boolean;
  items: string[]; // Supports standard text or inline markdown strings
}

export interface TableBlock extends BaseBlock {
  type: "table";
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface CalloutBlock extends BaseBlock {
  type: "callout";
  intent: "info" | "warning" | "success" | "danger"; // State authority palettes only
  title?: string;
  text: string;
}

export interface StepsBlock extends BaseBlock {
  type: "steps";
  steps: {
    title: string;
    description: string;
  }[];
}

export interface FAQBlock extends BaseBlock {
  type: "faq";
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface PaymentDatesBlock extends BaseBlock {
  type: "payment-dates";
  month: string;
  payouts: {
    category: string; // e.g. "Older Persons Grant", "Disability Grant", "Children's Grants"
    date: string; // e.g. "2026-07-03"
    amount: string; // e.g. "R2,180"
  }[];
}

export interface OfficeDetailsBlock extends BaseBlock {
  type: "office-details";
  branchName: string;
  province: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  contactNumber: string;
  operatingHours: string;
  accessibilityNotes: string; // e.g. "Wheelchair ramp, ground floor access"
}

/**
 * CustomBlock provides future-proof extensibility.
 * If a new block type is introduced tomorrow, old renderers will ignore it 
 * or fallback gracefully, without breaking the typing of existing compilation runs.
 */
export interface CustomBlock extends BaseBlock {
  type: "custom";
  customType: string;
  payload: Record<string, any>;
}

// The core Page representation that sits beneath all UI views
export interface BasePage {
  id: string; // Unique identifier (e.g. "older-person-grant-rules")
  slug: string; // Root-relative path (must be lowercase, leading slash, e.g. "/grants/older-person")
  classification: PageClassification;
  title: string; // Primary human H1 title
  description: string; // Lead paragraph description
  lastUpdated: string; // ISO Date "YYYY-MM-DD"
  version: string; // Semantic versioning "1.x.y" for page content
  author: Author; // Verified author for YMYL compliance
  seo: SEOMetadata;
  contentBlocks: ContentBlock[];
  relatedPages?: string[]; // Slugs of related pages for automated lateral internal linking
}

/**
 * Strategy for Content Versioning & Integrity Validation
 */
export interface SchemaValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateBasePage(page: any): SchemaValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required root properties
  const requiredFields = ["id", "slug", "classification", "title", "description", "lastUpdated", "version", "author", "seo", "contentBlocks"];
  for (const field of requiredFields) {
    if (!page[field]) {
      errors.push(`Validation Failure: Missing root property "${field}"`);
    }
  }

  // Slug rules
  if (page.slug) {
    if (typeof page.slug !== "string") {
      errors.push(`Validation Failure: "slug" must be a string`);
    } else {
      if (!page.slug.startsWith("/")) {
        errors.push(`Slug Mismatch: "${page.slug}" must start with a leading slash ("/")`);
      }
      if (/[A-Z]/.test(page.slug)) {
        errors.push(`SEO Alert: Slug "${page.slug}" contains uppercase letters. All slugs must be entirely lowercase`);
      }
      if (/\s/.test(page.slug)) {
        errors.push(`SEO Alert: Slug "${page.slug}" contains spaces. Use hyphens (-) instead`);
      }
    }
  }

  // Versioning validation
  if (page.version) {
    const semverRegex = /^\d+\.\d+\.\d+$/;
    if (!semverRegex.test(page.version)) {
      errors.push(`Version Mismatch: Content version "${page.version}" is not a valid semver string (e.g. "1.2.0")`);
    }
  }

  // YMYL Author checks
  if (page.author) {
    if (!page.author.name) {
      errors.push(`E-E-A-T Mismatch: Author name is required`);
    }
    if (!page.author.credentials) {
      warnings.push(`E-E-A-T Advisory: No credentials provided for author "${page.author.name}". Highly recommended for YMYL authority`);
    }
    if (page.author.verified !== true) {
      warnings.push(`E-E-A-T Advisory: Author is not verified`);
    }
  }

  // SEO Metadata constraints
  if (page.seo) {
    if (!page.seo.metaTitle) {
      errors.push(`SEO Mismatch: "metaTitle" is required`);
    } else if (page.seo.metaTitle.length > 60) {
      warnings.push(`SEO Advisory: "metaTitle" exceeds optimal length of 60 characters (${page.seo.metaTitle.length} chars)`);
    }

    if (!page.seo.metaDescription) {
      errors.push(`SEO Mismatch: "metaDescription" is required`);
    } else if (page.seo.metaDescription.length < 120 || page.seo.metaDescription.length > 160) {
      warnings.push(`SEO Advisory: "metaDescription" (${page.seo.metaDescription.length} chars) is outside optimal 120-160 range`);
    }
  }

  // Content Block checks
  if (Array.isArray(page.contentBlocks)) {
    if (page.contentBlocks.length === 0) {
      warnings.push(`Content Advisory: "contentBlocks" array is empty. The page contains no body content`);
    }
    page.contentBlocks.forEach((block: any, idx: number) => {
      if (!block.id) {
        errors.push(`Block [Index ${idx}]: Missing block "id"`);
      }
      if (!block.type) {
        errors.push(`Block [Index ${idx}]: Missing block "type"`);
      }
    });
  } else if (page.contentBlocks !== undefined) {
    errors.push(`Validation Failure: "contentBlocks" must be an array`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
