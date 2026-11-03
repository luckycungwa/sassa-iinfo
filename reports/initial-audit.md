# SassaGrantHub Initial Audit Baseline Report

**Website:** [https://sassagranthub.co.za](https://sassagranthub.co.za)  
**Date of Audit:** 4 November 2026  
**Auditor:** Technical SEO & Editorial Architecture Lead  
**Scope:** Complete Next.js repository inspection, 150 sitemap URLs, content files, components, routing, schema, metadata, and accessibility.

---

## 1. Executive Summary

This audit assesses the baseline technical, editorial, and structural foundation of SassaGrantHub before the November 2026 transformation. 

The website currently contains 150 indexable canonical routes organized across seven content pillars: Grants, Statuses, Payment Dates, Appeals, Eligibility, Guides, and Banking. The underlying Next.js 15.5.19 application compiles cleanly, and static page generation produces 200 total pages.

While the technical architecture is modern and fast, the site faced three core strategic deficiencies that prevented it from dominating competitors like grantza.org.za and sassagrants.co.za:
1. Status explanations were largely descriptive rather than diagnostic. Like competitors, they explained what a code meant, but lacked a distinct breakdown of root causes, practical verification checks, and structured next steps.
2. The interactive tools suite had useful calculators, but lacked a dedicated **Beneficiary Problem-Solving Centre** where a beneficiary in distress could select their real-world issue (such as "Approved without pay date" or "Bank verification stuck") and receive immediate, private, client-side triage.
3. Documentation registers for factual claims and primary editorial sources were informal, making source verification difficult to track systematically.

---

## 2. Technical Infrastructure Baseline

| Dimension | Baseline Status | Notes |
| :--- | :--- | :--- |
| **Framework** | Next.js 15.5.19 (App Router) | React 19.2.3, TypeScript 5.9.3 |
| **Styling** | Tailwind CSS v4.3.2 | CSS-first configuration, WCAG-compliant tokens |
| **Sitemap** | 150 canonical URLs | Dynamically generated at `/sitemap.xml` |
| **Indexability** | 100% crawlable | Zero unintended `noindex` tags; robots.txt active |
| **Build State** | Passing | 141 content JSON files validated against schema |
| **Canonicals** | Self-canonicalizing | Built from single `SITE_URL` origin (`https://sassagranthub.co.za`) |
| **Mobile UX** | Responsive | Mobile-first layout with responsive tables and navigation |

---

## 3. Content Inventory and URL Reconciliations

The 150 published sitemap URLs are distributed as follows:

| Section | Route Pattern | Count | Primary User Intent |
| :--- | :--- | :--- | :--- |
| **Homepage** | `/` | 1 | Hub entry, immediate navigation, trust signals |
| **Grants Hub & Detail** | `/grants`, `/grants/*` | 16 | Grant criteria, amounts, eligibility, application |
| **Status Centre** | `/status`, `/status/*` | 20 | Meaning of codes (Pending, Approved, Declined, etc.) |
| **Payment Dates** | `/payment-dates`, `/payment-dates/*` | 16 | Monthly schedules, grant-specific pay days |
| **Appeals Centre** | `/appeals`, `/appeals/*` | 13 | 90-day ITSAA appeal process, reasons, evidence |
| **Eligibility Guides** | `/eligibility`, `/eligibility/*` | 12 | Persona guides (caregiver, unemployed, student, etc.) |
| **Practical Guides** | `/guides`, `/guides/*` | 16 | Step-by-step walkthroughs (status check, phone number) |
| **Banking & Cards** | `/banking`, `/banking/*` | 12 | Bank verification, Postbank cards, Cash Send |
| **Downloads & Forms** | `/downloads`, `/downloads/*` | 8 | Downloadable forms, checklists, affidavits |
| **Offices & Provinces**| `/provinces/*`, `/offices/*` | 13 | Branch locations, physical queue guidance |
| **Editorial Updates** | `/news`, `/news/*` | 13 | Dated developments, policy changes, schedule revisions |
| **Trust & Policies** | `/about`, `/contact`, `/terms`, etc. | 10 | Transparency, editorial policy, corrections |

### SEO Equity Protection Audit
- **Zero URL deletions:** All 150 public URLs must be preserved to prevent 404 errors or loss of historical indexing.
- **Zero unnecessary redirects:** Internal links route directly to canonical paths without redirect chains.
- **Identified soft-404 risks:** Two previously identified internal path typos (`/grants/srd-r370-grant-monthly-review` and `/grants/foster-child-grant`) were verified as resolved in earlier commits.

---

## 4. Key Gaps Identified for Remediation

1. **Problem-Solving Gap:** Competitors treat statuses as static definitions. When beneficiaries search "SASSA approved no pay date" or "Alternative income source detected", they need immediate diagnosis: root causes, bank checks, and step-by-step action plans.
2. **Interactive Utility Gap:** The site lacked an integrated Beneficiary Problem Solver component that diagnoses issues without harvesting personal data.
3. **Structured Source Traceability:** Factual claims needed an explicit registry linking every grant amount, threshold, and date to official government gazettes and primary records.
4. **Editorial Voice Alignment:** Copy needed auditing against `the-humanizer.md` to ensure zero AI texture, zero corporate jargon, and an authentic, calm, supportive tone.
