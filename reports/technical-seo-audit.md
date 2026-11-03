# Technical SEO & Search Engine Understanding Report

**Date:** 4 November 2026  
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
- **Robots.txt:** Correctly allows public crawling of all content directories while blocking administrative endpoints (`/api/*`), internal error routes (`/404`, `/500`), and declaring the sitemap at `https://sassagranthub.co.za/sitemap.xml`.
- **XML Sitemap:** Dynamic sitemap at `/sitemap.xml` generates exactly 150 unique canonical URLs. Excludes non-indexable routes (`/search`) and draft content.
- **HTTP Status Codes:** 150/150 sitemap URLs return clean HTTP 200 status codes in production builds.
- **Trailing Slash Consistency:** Next.js standardizes trailing slash resolution; canonical tags consistently point to the canonical URL format.
- **Search Directive:** The internal search page (`/search`) properly declares `noindex, follow` to prevent duplicate query string indexing.

### B. Canonical Tags & Metadata
- **Canonical Architecture:** Built using the centralized `pageMetadata` helper (`lib/metadata.ts`) referencing `SITE_URL` (`https://sassagranthub.co.za`). No cross-domain canonical leakage or protocol mismatches.
- **Title Tags:** Distinct title tags across all 150 pages following the `%s | SASSA Grant Hub` pattern (or absolute titles for standalone hubs). Zero duplicate titles found.
- **Meta Descriptions:** All pages feature descriptive, human-written meta descriptions summarizing search intent in 120 to 160 characters.
- **Open Graph & Twitter Cards:** Full Open Graph metadata is rendered across all pages, including `og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale` (`en_ZA`), and `og:image` (1200x630 branded card), plus `twitter:card` (`summary_large_image`).
- **Article Provenance:** News and editorial update routes under `/news/[slug]` output `og:type: article`, `article:published_time`, and `article:modified_time`.

### C. Structured Data (JSON-LD) Implementation
Structured data is systematically deployed using standard schema.org vocabularies:
- **Root Layout:** Declares `WebSite` (with `SearchAction` pointing to `/search?q={search_term_string}`) and `Organization` (independent publisher identity).
- **Hub & Content Pages:** Declare `WebPage` and `BreadcrumbList` matching the exact visual breadcrumb hierarchy.
- **Editorial & Guides:** Declare `Article` or `NewsArticle` with verified author provenance, dates, and publisher references.
- **FAQ Sections:** Valid `FAQPage` markup describing visible questions and answers to support answer engines and search accessibility.
- **Validation:** 100% of JSON-LD scripts parse cleanly with zero syntax errors.

### D. Contextual Internal Linking Architecture
- **Hub-and-Spoke Clustering:** Every sub-guide links back to its parent cluster hub (e.g. `/grants/srd-r370-grant/status-check` links to `/grants/srd-r370-grant` and `/status`).
- **Lateral Problem Linking:** Decline and status pages contextually link to the relevant appeal guides, banking guides, or affidavit download templates.
- **Zero Orphan Pages:** All 150 sitemap URLs are reachable through natural internal links from navigation, hubs, or contextual article blocks.
- **Natural Anchor Text:** Links use descriptive, natural language rather than keyword-stuffed strings.

### E. Performance, Core Web Vitals & Accessibility
- **Static Generation:** Next.js pre-renders all 150 pages into optimized static HTML and lightweight JavaScript payloads (First Load JS ~102 kB).
- **Image Optimization:** Uses `next/image` with explicit dimensions, responsive sizing, and descriptive `alt` text for screen readers.
- **Font Optimization:** Next.js font loader (`next/font/google`) hosts Manrope and JetBrains Mono locally with `font-display: swap`, eliminating layout shifts (CLS < 0.05).
- **Color Contrast & WCAG 2.1 AA:** High-contrast color tokens (Slate `#0c1725`, Carbon `#1e293b`, Yellow `#facc15`, Violet `#4f46e5`) ensure readability in daylight conditions on low-cost mobile displays.
- **Interactive Accessibility:** The new **Beneficiary Problem Solver** and interactive tools are keyboard navigable with clear focus states and ARIA attributes.
