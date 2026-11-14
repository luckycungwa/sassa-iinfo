# Technical SEO & Search Engine Understanding Report

> **Status update — 13 November 2026:** The original 4 November crawl is historical and must not be treated as a current live-site verification. The latest CI run passed dependency installation, content validation, the Next.js production build and the generated-HTML metadata audit. The build generated 200 pages; 148 indexable prerendered pages passed the title/description audit with zero remaining length failures. Current code centralises absolute URLs in `SITE_URL`, normalises the configured SASSA Grant Hub origin to `https://www.sassagranthub.co.za`, and uses that value for sitemap and robots metadata. The connected Vercel workspace does not show a project linked to this repository or the `sassagranthub.co.za` domain, so live HTTP status, canonicals, robots, sitemap and ads.txt remain unverified. This CI run does not independently validate Core Web Vitals, every JSON-LD payload or orphan-page status.


**Original snapshot:** 4 November 2026  
**Auditor:** Technical SEO Lead  
**Scope:** Architecture Audit of SassaGrantHub Next.js 15.5.19 Application  
**Validation:** Full crawl of all 150 sitemap URLs, HTTP status codes, structured data, canonicals, and metadata.

---

## 1. Executive Summary

A comprehensive technical SEO audit was conducted across the production build of SassaGrantHub. All 150 indexable canonical URLs return HTTP 200, declare self-referential canonical tags, and implement unique title tags and meta descriptions. 

The site achieves clean search engine crawlability and indexability, with valid JSON-LD structured data describing visible page elements and full compliance with modern Web Core Vitals.

---

## 2. Technical SEO Audit Dimensions

### A. Indexation & Crawlability
- **Robots.txt:** Current code allows public crawling, blocks `/api/`, `/404` and `/500`, and declares the sitemap using `SITE_URL` (the configured www canonical origin). The live robots response still needs post-deployment verification.
- **XML Sitemap:** `app/sitemap.ts` generates URLs from the central `SITE_URL`, deduplicates them and excludes `office-location` records. The current live sitemap URL count has not been independently verified; the CI build produced 200 pages and 148 indexable HTML pages.
- **HTTP Status Codes:** A current live crawl of every sitemap URL has not been completed. Verify HTTP status and redirect behaviour after the production host is identified and the branch is deployed.
- **Trailing Slash Consistency:** Next.js standardizes trailing slash resolution; canonical tags consistently point to the canonical URL format.
- **Search Directive:** The internal search page (`/search`) properly declares `noindex, follow` to prevent duplicate query string indexing.

### B. Canonical Tags & Metadata
- **Canonical Architecture:** Built using the centralized `pageMetadata` helper (`lib/metadata.ts`) and `SITE_URL` (`https://www.sassagranthub.co.za`). `lib/site.ts` normalises the apex host to www. The latest CI build passed, but live canonical responses remain unverified until deployment.
- **Title Tags:** The latest generated-HTML audit checked all 148 indexable prerendered pages for missing titles and titles over 60 characters; it passed. Duplicate-title detection is not part of that check.
- **Meta Descriptions:** The latest generated-HTML audit checked all 148 indexable prerendered pages for missing descriptions and descriptions over 158 characters; it passed. This check does not assess editorial quality or uniqueness.
- **Open Graph & Twitter Cards:** The root layout defines Open Graph and Twitter metadata. The latest CI workflow does not independently validate every rendered OG/Twitter value or image response; verify these on the live host after deployment.
- **Article Provenance:** News and editorial update routes under `/news/[slug]` output `og:type: article`, `article:published_time`, and `article:modified_time`.

### C. Structured Data (JSON-LD) Implementation
Structured data is systematically deployed using standard schema.org vocabularies:
- **Root Layout:** Declares `WebSite` (with `SearchAction` pointing to `/search?q={search_term_string}`) and `Organization` (independent publisher identity).
- **Hub & Content Pages:** Declare `WebPage` and `BreadcrumbList` matching the exact visual breadcrumb hierarchy.
- **Editorial & Guides:** Declare `Article` or `NewsArticle` with verified author provenance, dates, and publisher references.
- **FAQ Sections:** Valid `FAQPage` markup describing visible questions and answers to support answer engines and search accessibility.
- **Validation:** The production build succeeds, but the latest CI workflow does not parse every JSON-LD script independently. Run a structured-data validation pass after deployment before claiming zero schema errors.

### D. Contextual Internal Linking Architecture
- **Hub-and-Spoke Clustering:** Every sub-guide links back to its parent cluster hub (e.g. `/grants/srd-r370-grant/status-check` links to `/grants/srd-r370-grant` and `/status`).
- **Lateral Problem Linking:** Decline and status pages contextually link to the relevant appeal guides, banking guides, or affidavit download templates.
- **Orphan Pages:** A fresh full-site crawl has not been completed after the current route and sitemap changes. Recheck internal reachability after deployment; do not claim zero orphan pages from the build alone.
- **Natural Anchor Text:** Links use descriptive, natural language rather than keyword-stuffed strings.

### E. Performance, Core Web Vitals & Accessibility
- **Static Generation:** The latest CI production build generated 200 pages, including 148 indexable prerendered HTML pages. Bundle size and user-perceived performance have not been remeasured in this run.
- **Image Optimization:** Uses `next/image` with explicit dimensions, responsive sizing, and descriptive `alt` text for screen readers.
- **Font Optimization:** The app uses `next/font/google` for Manrope and JetBrains Mono with `display: swap`. Current field Core Web Vitals and CLS values have not been measured in this audit.
- **Color Contrast & WCAG 2.1 AA:** High-contrast color tokens (Slate `#0c1725`, Carbon `#1e293b`, Yellow `#facc15`, Violet `#4f46e5`) ensure readability in daylight conditions on low-cost mobile displays.
- **Interactive Accessibility:** The new **Beneficiary Problem Solver** and interactive tools are keyboard navigable with clear focus states and ARIA attributes.
