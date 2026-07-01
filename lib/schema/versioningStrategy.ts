/**
 * Content Versioning & Migration Strategy
 *
 * Governs how content changes over time without breaking existing pages,
 * SEO equity, or internal links.
 */

// ─── Version Schema ──────────────────────────────────────────────────────────
//
// Every BasePage has a `version` field using strict semver (MAJOR.MINOR.PATCH):
//
//   MAJOR — Breaking structural change:
//     - Content block removed or reordered in a way that changes meaning
//     - Slug change (requires 301 redirect)
//     - Field deletion from a domain-specific block
//     Increment: 1.0.0 → 2.0.0
//
//   MINOR — Non-breaking addition:
//     - New content block added to the page
//     - New field added to an existing block (renderer ignores unknown fields)
//     - New FAQ entry appended
//     Increment: 1.0.0 → 1.1.0
//
//   PATCH — Cosmetic or factual correction:
//     - Typo fix in paragraph text
//     - Amount update (grant value change)
//     - Date correction
//     - Link URL update
//     Increment: 1.0.0 → 1.0.1

export interface VersionRecord {
  version: string;
  date: string;
  description: string;
}

// ─── Changelog Convention ────────────────────────────────────────────────────
//
// Each content directory MAY include a _changelog.json that tracks every
// version bump across its pages:
//
//   /content/grants/_changelog.json
//   {
//     "entries": [
//       { "version": "1.0.0", "date": "2026-06-01", "description": "Initial publication of all 8 grant pages" },
//       { "version": "1.1.0", "date": "2026-07-15", "description": "Added SRD R370 grant page" },
//       { "version": "2.0.0", "date": "2026-09-01", "description": "Restructured content blocks to new schema. Old 'details' block split into grant-summary + eligibility-checklist" }
//     ]
//   }
//
// The changelog is NOT used at runtime. It exists for editorial auditing and
// to answer "what changed between deployments".

// ─── Slug Stability & Redirects ──────────────────────────────────────────────
//
// RULE:  Slugs are PERMANENT once published.
//
// If a page MUST be renamed:
//   1. Keep the old JSON file with a redirect block:
//      {
//        ...BasePage,
//        slug: "/grants/older-person",
//        seo: { canonicalUrl: "/grants/older-person-grant", ... },
//        contentBlocks: [
//          { type: "heading", level: 2, text: "This page has moved" },
//          { type: "paragraph", text: "The new page is at ..." }
//        ]
//      }
//   2. Create the new file at the target slug.
//   3. Add a server-side 301 in next.config.ts or middleware.
//   4. Update all internal relatedPages references.
//
// IMPLEMENTATION: next.config.ts rewrites:
//   async redirects() {
//     return [
//       { source: "/grants/older-person", destination: "/grants/older-person-grant", permanent: true },
//     ];
//   }

// ─── Content Block Version Tolerance ─────────────────────────────────────────
//
// The block renderer MUST be forward-compatible:
//
//   function renderBlock(block: ContentBlock) {
//     switch (block.type) {
//       case "paragraph": return <ParagraphBlockRenderer {...block} />;
//       // ... known types
//       default:
//         // Unknown block type — render nothing, log warning in dev
//         if (process.env.NODE_ENV === "development") {
//           console.warn(`Unknown block type: "${(block as any).type}" — skipping`);
//         }
//         return null;
//     }
//   }
//
// This means:
//   - Adding a NEW block type never breaks existing pages
//   - Adding a NEW field to an existing block never breaks the renderer
//     (TypeScript structural typing + spread props)
//   - Removing a field from a block IS breaking (MAJOR version bump)

// ─── Migration Strategy for Existing lib/data/*.ts ───────────────────────────
//
// Current state: 11 bespoke interfaces producing ad-hoc arrays.
// Target state:  All pages are BasePage objects from /content/*.json.
//
// Phase 1 — Adapter (zero risk, instant):
//   Each lib/data/*.ts exports a `toBasePage(item): BasePage` function.
//   Page components call the adapter before passing data to renderers.
//   Validation: adapter internally calls validateBasePage() in dev.
//
// Phase 2 — Coexistence (incremental):
//   New content goes directly into /content/<section>/<slug>.json.
//   Page routes check content-loader first, fall back to lib/data/*.ts.
//   Each deployment converts one section to JSON until all sections are done.
//
// Phase 3 — Retirement (cleanup):
//   Delete all lib/data/*.ts files.
//   Delete all adapter functions.
//   content-loader.ts is the single entry point for all page data.
//   No more bespoke interfaces exist anywhere in the codebase.

export const MIGRATION_PHASES = {
  ADAPTER: "Phase 1 — Adapter layer wrapping existing interfaces",
  COEXISTENCE: "Phase 2 — JSON files + adapters in parallel",
  RETIREMENT: "Phase 3 — Pure /content/*.json, lib/data/*.ts deleted",
} as const;

export type MigrationPhase = keyof typeof MIGRATION_PHASES;
