/**
 * Foundational Content Schema — Base Layer for all 5,000+ pages
 *
 * Every page on the platform produces a `BasePage` object. There is no other
 * page-level type. Domain-specific data lives in structured `ContentBlock`
 * variants or the `seo.schemaMarkup` bag.
 */

// ─── Page Classification ─────────────────────────────────────────────────────

export type PageClassification =
  | "payment-date"
  | "grant-detail"
  | "status-meaning"
  | "appeal-guide"
  | "office-location"
  | "province-hub"
  | "eligibility-guide"
  | "downloadable-form"
  | "how-to-guide"
  | "banking-guide"
  | "news-article"
  | "faq-page"
  | "tool-page"
  | "home-page"
  | "hub-index";

export type ContentStatus = "draft" | "published" | "archived";

// ─── Author (E-E-A-T) ────────────────────────────────────────────────────────

export interface Author {
  name: string;
  role: string;
  credentials?: string;
  verified: boolean;
}

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl?: string;
  schemaMarkup?: Record<string, unknown>;
}

// ─── Base Block (all content blocks extend this) ──────────────────────────────

export interface BaseBlock {
  id: string;
  type: string;
}

// ─── Semantic Content Blocks ──────────────────────────────────────────────────

export interface HeadingBlock extends BaseBlock {
  type: "heading";
  level: 2 | 3 | 4;
  text: string;
}

export interface ParagraphBlock extends BaseBlock {
  type: "paragraph";
  text: string;
}

export interface ListBlock extends BaseBlock {
  type: "list";
  ordered: boolean;
  items: string[];
}

export interface TableBlock extends BaseBlock {
  type: "table";
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface CalloutBlock extends BaseBlock {
  type: "callout";
  intent: "info" | "warning" | "success" | "danger";
  title?: string;
  text: string;
}

export interface StepsBlock extends BaseBlock {
  type: "steps";
  steps: { title: string; description: string }[];
}

export interface FAQBlock extends BaseBlock {
  type: "faq";
  faqs: { question: string; answer: string }[];
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export interface DividerBlock extends BaseBlock {
  type: "divider";
}

export interface QuoteBlock extends BaseBlock {
  type: "quote";
  text: string;
  attribution?: string;
}

export interface CodeBlock extends BaseBlock {
  type: "code";
  language: string;
  code: string;
}

export interface LinkGridBlock extends BaseBlock {
  type: "link-grid";
  links: { title: string; href: string; description?: string }[];
}

// ─── Domain-Specific Content Blocks ───────────────────────────────────────────

export interface GrantSummaryBlock extends BaseBlock {
  type: "grant-summary";
  amount: string;
  frequency: string;
  targetGroup: string;
}

export interface PaymentDatesBlock extends BaseBlock {
  type: "payment-dates";
  month: string;
  payouts: { category: string; date: string; amount: string }[];
}

export interface OfficeDetailsBlock extends BaseBlock {
  type: "office-details";
  branchName: string;
  province: string;
  city: string;
  address: string;
  coordinates?: { lat: number; lng: number };
  contactNumber: string;
  operatingHours: string;
  servicesOffered: string[];
  accessibilityNotes: string;
}

export interface StatusReferenceBlock extends BaseBlock {
  type: "status-reference";
  statusName: string;
  explanation: string;
  whyItHappens: string[];
  howLongItLasts: string;
  whatYouShouldDo: string[];
  relatedStatuses: { name: string; slug: string }[];
}

export interface DocumentChecklistBlock extends BaseBlock {
  type: "document-checklist";
  documents: { label: string; required: boolean; notes?: string }[];
}

export interface EligibilityChecklistBlock extends BaseBlock {
  type: "eligibility-checklist";
  checklist: string[];
  restrictions: string[];
  recommendedGrants: { name: string; slug: string; amount: string }[];
}

export interface AppealProcedureBlock extends BaseBlock {
  type: "appeal-procedure";
  steps: string[];
  timeline: string;
  documents: string[];
  commonReasons: string[];
  outcomes: string[];
}

export interface ProvinceOverviewBlock extends BaseBlock {
  type: "province-overview";
  capital: string;
  regionalOfficeAddress: string;
  regionalOfficePhone: string;
  collectionInfo: string;
}

export interface DownloadBlock extends BaseBlock {
  type: "download";
  title: string;
  purpose: string;
  howToFill: string[];
  approxSize: string;
}

export interface NewsMetaBlock extends BaseBlock {
  type: "news-meta";
  date: string;
  tags: string[];
}

// ─── Custom Block (future-extensibility safety valve) ─────────────────────────

export interface CustomBlock extends BaseBlock {
  type: "custom";
  customType: string;
  payload: Record<string, unknown>;
}

// ─── Content Block Union ──────────────────────────────────────────────────────

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | ListBlock
  | TableBlock
  | CalloutBlock
  | StepsBlock
  | FAQBlock
  | ImageBlock
  | DividerBlock
  | QuoteBlock
  | CodeBlock
  | LinkGridBlock
  | GrantSummaryBlock
  | PaymentDatesBlock
  | OfficeDetailsBlock
  | StatusReferenceBlock
  | DocumentChecklistBlock
  | EligibilityChecklistBlock
  | AppealProcedureBlock
  | ProvinceOverviewBlock
  | DownloadBlock
  | NewsMetaBlock
  | CustomBlock;

// ─── BasePage — The Single Page Type ──────────────────────────────────────────

export interface BasePage {
  id: string;
  slug: string;
  classification: PageClassification;
  title: string;
  description: string;
  lastUpdated: string;
  version: string;
  status: ContentStatus;
  author: Author;
  seo: SEOMetadata;
  contentBlocks: ContentBlock[];
  relatedPages?: { title: string; slug: string }[];
}

// ─── Validation ───────────────────────────────────────────────────────────────

export interface SchemaValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

const VALID_CLASSIFICATIONS: PageClassification[] = [
  "payment-date", "grant-detail", "status-meaning", "appeal-guide",
  "office-location", "province-hub", "eligibility-guide", "downloadable-form",
  "how-to-guide", "banking-guide", "news-article", "faq-page",
  "tool-page", "home-page", "hub-index",
];

export function validateBasePage(page: unknown): SchemaValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!page || typeof page !== "object") {
    return { isValid: false, errors: ["Root must be a non-null object"], warnings: [] };
  }

  const p = page as Record<string, unknown>;

  // Required root fields
  const required = ["id", "slug", "classification", "title", "description", "lastUpdated", "version", "status", "author", "seo", "contentBlocks"];
  for (const field of required) {
    if (p[field] === undefined || p[field] === null) {
      errors.push(`Missing required root property "${field}"`);
    }
  }

  // Classification
  if (p.classification && !VALID_CLASSIFICATIONS.includes(p.classification as PageClassification)) {
    errors.push(`Invalid classification "${String(p.classification)}". Must be one of: ${VALID_CLASSIFICATIONS.join(", ")}`);
  }

  // Slug rules
  if (typeof p.slug === "string") {
    if (!p.slug.startsWith("/")) errors.push(`Slug "${p.slug}" must start with "/"`);
    if (/[A-Z]/.test(p.slug as string)) errors.push(`Slug "${p.slug}" contains uppercase letters`);
    if (/\s/.test(p.slug as string)) errors.push(`Slug "${p.slug}" contains spaces`);
  }

  // Version (strict semver)
  if (typeof p.version === "string" && !/^\d+\.\d+\.\d+$/.test(p.version)) {
    errors.push(`Version "${p.version}" is not valid semver (e.g. "1.2.0")`);
  }

  // Status
  if (p.status && !["draft", "published", "archived"].includes(p.status as string)) {
    errors.push(`Status must be "draft", "published", or "archived"`);
  }

  // Author
  if (p.author && typeof p.author === "object") {
    const a = p.author as Record<string, unknown>;
    if (!a.name) errors.push(`Author "name" is required`);
    if (!a.credentials) warnings.push(`Author "${String(a.name ?? "unknown")}" has no credentials — recommended for YMYL`);
    if (a.verified !== true) warnings.push(`Author "${String(a.name ?? "unknown")}" is not verified`);
  }

  // SEO
  if (p.seo && typeof p.seo === "object") {
    const s = p.seo as Record<string, unknown>;
    if (!s.metaTitle) errors.push(`SEO "metaTitle" is required`);
    else if (String(s.metaTitle).length > 60) warnings.push(`SEO "metaTitle" exceeds 60 chars (${String(s.metaTitle).length})`);
    if (!s.metaDescription) errors.push(`SEO "metaDescription" is required`);
    else {
      const len = String(s.metaDescription).length;
      if (len < 120 || len > 160) warnings.push(`SEO "metaDescription" (${len} chars) outside optimal 120-160 range`);
    }
  }

  // Content blocks
  if (Array.isArray(p.contentBlocks)) {
    if (p.contentBlocks.length === 0) warnings.push(`"contentBlocks" array is empty`);
    p.contentBlocks.forEach((block: unknown, idx: number) => {
      const b = block as Record<string, unknown>;
      if (!b.id) errors.push(`Block [${idx}] missing "id"`);
      if (!b.type) errors.push(`Block [${idx}] missing "type"`);
    });
  } else if (p.contentBlocks !== undefined) {
    errors.push(`"contentBlocks" must be an array`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
