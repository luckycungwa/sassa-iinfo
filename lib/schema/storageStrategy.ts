/**
 * Content Storage Architecture for Static-First 5,000-Page System
 *
 * Each content file is a standalone JSON document conforming to BasePage.
 * No runtime database. No CMS calls. All content is read at build time via
 * `fs.readFileSync` and validated against the schema before the Next.js
 * static export runs.
 */

// ─── Directory Layout ─────────────────────────────────────────────────────────
//
// /content/                         ← root content directory (git-tracked)
//   ├── index.json                  ← home page
//   ├── hub/
//   │   ├── payment-dates.json
//   │   ├── grants.json
//   │   ├── statuses.json
//   │   ├── appeals.json
//   │   ├── offices.json
//   │   ├── provinces.json
//   │   ├── eligibility.json
//   │   ├── downloads.json
//   │   ├── guides.json
//   │   ├── banking.json
//   │   ├── news.json
//   │   ├── faq.json
//   │   └── tools.json
//   ├── payment-dates/
//   │   ├── _index.json             ← optional per-section index
//   │   ├── 2026-07.json
//   │   └── ...
//   ├── grants/
//   │   ├── older-person-grant.json
//   │   ├── disability-grant.json
//   │   ├── child-support-grant.json
//   │   ├── foster-care-grant.json
//   │   ├── care-dependency-grant.json
//   │   ├── war-veterans-grant.json
//   │   ├── grant-in-aid.json
//   │   └── srd-r370-grant.json
//   ├── statuses/
//   │   ├── pending.json
//   │   ├── processing.json
//   │   └── ...
//   ├── appeals/
//   │   ├── how-to-appeal.json
//   │   └── ...
//   ├── offices/
//   │   ├── gp-pretoria-central.json
//   │   └── ...
//   ├── provinces/
//   │   ├── gauteng.json
//   │   ├── western-cape.json
//   │   └── ...
//   ├── guides/
//   │   ├── how-to-apply.json
//   │   └── ...
//   ├── banking/
//   │   ├── payment-methods.json
//   │   └── ...
//   ├── news/
//   │   ├── srd-extended-2027.json
//   │   └── ...
//   ├── downloads/
//   │   ├── application-form.json
//   │   └── ...
//   └── eligibility/
//       ├── i-am-unemployed.json
//       └── ...

// ─── File Naming Convention ──────────────────────────────────────────────────
//
// Rule:      lowercase-kebab-case.json
// Pattern:   /^[a-z0-9]+(-[a-z0-9]+)*\.json$/
// Example:   older-person-grant.json
//
// Exceptions:  _index.json  (reserved for per-directory index data)
//
// _index.json files are NOT pages. They export a hub page — a BasePage whose
// content blocks aggregate links to all pages in that directory.  This keeps
// hub content co-located with its detail pages.

// ─── Build-Time Loading ──────────────────────────────────────────────────────
//
// 1. Pre-build validation script reads every /content/**/*.json (excluding
//    node_modules) and runs validateBasePage() on each.  Script exits non-zero
//    on any error.
//
// 2. A single loader module (lib/content-loader.ts) provides helpers:
//      getAllPages(): BasePage[]                   ← all published pages
//      getPagesByClassification(c): BasePage[]    ← filter by type
//      getPageBySlug(slug): BasePage | undefined   ← single page lookup
//      getRelatedPages(page): BasePage[]           ← related internal links
//
// 3. Next.js generateStaticParams reads getAllPages() at build time.  Each
//    [slug] param is derived from BasePage.slug.
//
// 4. The page component calls getPageBySlug(params.slug) and renders
//    contentBlocks[] through a block renderer switch.

// ─── Migration Path ──────────────────────────────────────────────────────────
//
// Existing lib/data/*.ts files contain 11 bespoke interfaces with overlapping
// fields.  Migration is staged:
//
// Phase 1 — Adapter layer (current state):
//   Each lib/data/*.ts file gains a `toBasePage()` function that wraps its
//   native interface into a BasePage.  Existing page components continue to
//   work unchanged.
//
// Phase 2 — Content files:
//   Writers create new pages as /content/<section>/<slug>.json files.  The
//   adapter layer remains for legacy data.
//
// Phase 3 — Retirement:
//   All content lives in /content/*.json.  lib/data/*.ts is deleted.
//   lib/content-loader.ts becomes the single source of truth.

// ─── Type export (for documentation / tooling) ───────────────────────────────

export interface DirectoryLayout {
  root: "/content";
  sections: {
    home: "index.json";
    hubs: "hub/*.json";
    details: {
      [K in string]: string; // section -> "section/*.json"
    };
  };
}

export const SECTION_DIRECTORIES = [
  "payment-dates",
  "grants",
  "statuses",
  "appeals",
  "offices",
  "provinces",
  "eligibility",
  "downloads",
  "guides",
  "banking",
  "news",
] as const;

export type SectionDirectory = (typeof SECTION_DIRECTORIES)[number];
