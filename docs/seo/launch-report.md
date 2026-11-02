# SASSA Grant Hub — SEO/AEO audit and launch report

Date: 2 November 2026
Scope: source repository plus a production build served locally at `http://localhost:4321`.
Live inspection: **not possible**. The supplied deployment URL returns a Vercel SSO redirect and `https://sassagranthub.co.za` currently serves a host placeholder certificate (`CN=dan1.host-ww.net`) rather than this site. Findings below are from the repository and the local production build, not from the public deployment.

## 1. Audit baseline

| Check | Result |
| --- | --- |
| Next.js production build | Passed (Next 15.5.19, TypeScript and lint clean) |
| Content validation | 141 files passed, 0 failed, 0 warnings |
| Sitemap URLs | 150 canonical URLs |
| Crawl of every sitemap URL | All 200; one H1 each; no `noindex` |
| Canonical correctness | Every sitemap URL self-canonicalises to its own path |
| Duplicate titles / descriptions | None across sitemap pages |
| Broken links | 2 non-existent grant URLs linked 6 times (all now fixed) |
| Orphan pages | 5 sitemap URLs were linked from nowhere (all now linked) |
| Mobile / performance | Responsive Tailwind layout, static generation, no blocking third-party scripts except optional GA/AdSense |
| Images | `next/image` with explicit dimensions and alt text on hero/blog imagery |

### What was actually wrong

1. **Two internal URLs did not exist and were linked six times.** `/grants/srd-r370-grant-monthly-review` (homepage, main navigation, a guide and a news article) and `/grants/foster-child-grant` (twice in a status page) rendered Next's not-found UI with HTTP 200. They were soft 404s inside the primary SRD cluster.
2. **Five indexable pages had no internal links**: `/appeals/appeal-faqs`, `/eligibility/i-am-a-foster-parent`, `/eligibility/i-am-self-employed`, `/grants/care-dependency-grant/medical-assessment`, `/grants/foster-care-grant/court-order-guide`. They were in the sitemap but unreachable by crawling.
3. **The Updates blog had no publication date.** Articles only had `lastUpdated`, and the schema used `Article` with `datePublished` set to the modified date. There was no visible byline, publication date, or category on article pages.
4. **Sitemap listed the homepage twice** (`/` and no-slash variant).
5. **The priority SRD page contradicted itself** (hero said 68 min read, page metadata 10 min) and its "How to Apply" CTAs linked back to the same page.

## 2. Changes implemented

### Internal links and crawlability
- Corrected `/grants/srd-r370-grant-monthly-review` → `/grants/srd-r370-grant/monthly-review` in the homepage, `TopNavbar`, the status-check guide and the grant-review article.
- Corrected `/grants/foster-child-grant` → `/grants/foster-care-grant` in the existing-grant status page.
- Eligibility hub now lists every published eligibility guide, including guides that exist only as content JSON (fixes the foster-parent and self-employed orphans).
- Added contextual links to the care-dependency medical assessment guide and the foster court-order guide from their parent grant pages, plus `relatedPages` entries.
- Added an appeal FAQ link to the Appeals Centre.
- SRD "How to Apply" CTAs now jump to the on-page application section instead of reloading the same URL; reading time aligned.

### Updates blog (editorial)
- Added `publishedAt` and `topics` to the content schema, with ISO-date validation and a warning when a news article has no publication date.
- Added real publication dates to all 12 Updates articles, taken from each file's first Git commit (not invented).
- Added `newsArticleSchema()` producing `NewsArticle` with `datePublished`, `dateModified`, author, publisher, `articleSection` and `keywords`.
- Article pages now show a visible provenance block: author and role, published date, updated date, and topic labels.
- The Updates archive sorts by publication date and shows "Published … / Updated …" plus topic labels.
- Article Open Graph metadata is now `type: article` with `publishedTime` and `modifiedTime`.
- Removed empty `reviewedBy` arrays from `Article`/`WebPage` schema (invalid/empty values).

### Technical
- Sitemap URLs normalised; homepage listed once; only canonical, indexable URLs.
- Added `/llms.txt` with a concise, attributable site summary, core resources, grant list, recent dated updates, editorial standards and official links for AI answer engines.
- Fixed two broken-link classes and orphan pages described above.

## 3. Updated page inventory (sitemap)

| Section | URLs |
| --- | --- |
| Home | 1 |
| Grants (incl. sub-guides) | 16 |
| Status meanings | 20 |
| Payment dates (hub + 15 months/grant schedules) | 16 |
| Appeals | 13 |
| Eligibility | 12 |
| Guides | 16 |
| Banking | 12 |
| Provinces | 10 |
| Downloads | 8 |
| Offices | 3 |
| Updates (`/news` + 12 articles) | 13 |
| About, contact, policies, FAQ, tools | 10 |
| **Total** | **150** |

## 4. Technical SEO results

- **Build:** `npm run build` passes; content validation runs as `prebuild`.
- **Crawl:** 150/150 sitemap URLs return 200, self-canonical, one H1, indexable.
- **Metadata:** no duplicate titles or meta descriptions among sitemap URLs; title template is `%s | SASSA Grant Hub`.
- **Canonicals:** built from one `APP_URL`-derived origin (`lib/site.ts`); no per-page drift found.
- **Sitemap:** excludes `/search`, `/api/*`; includes only published content; month pages use revision/confirmation dates.
- **Robots:** allows crawling, disallows `/api/`, `/404`, `/500`, declares the sitemap.
- **Redirects:** legacy hosts and retired guide URLs are 301s in `next.config.ts`.
- **Structured data:** Organization + WebSite in the root layout; WebPage, BreadcrumbList, Article/NewsArticle, FAQPage and HowTo on relevant pages. All markup describes visible content.
- **Indexability:** `/search` is `noindex, follow`; no other page is unintentionally blocked.

FAQ rich results: Google now limits FAQ rich results to well-known government and health sites. The site keeps valid `FAQPage` markup because the questions are visible and it helps answer engines, but it should not expect FAQ rich snippets in Google.

## 5. AEO and GEO

Already present and retained:
- Answer-first page openings (hero answer + at-a-glance grant summary + detailed sections).
- Descriptive H2/H3 questions, tables of status codes, step lists, worked means-test examples.
- Sources sections, last-checked dates, named editors, editorial and corrections policies.
- Consistent terminology (SRD R370 / R350 legacy naming explained once).

Added:
- Visible article provenance (author, published, updated, topic).
- `NewsArticle` dates and section.
- `/llms.txt` for machine-readable summaries with attribution and official links.

## 6. Updates blog status

- Archive: `/news`, 12 published articles, individually addressable URLs, sorted by publication date.
- Every article carries publication and modification dates, author, topic labels, sources and internal links to evergreen resources.
- Categories are represented as topics and `articleSection`; no separate thin category URLs were created.
- Editorial cadence is event-driven, not volume-driven. No article was created to fill a quota.

## 7. Remaining blockers before Search Console

These cannot be fixed from the repository:

1. **Canonical domain is not serving this site.** `sassagranthub.co.za` resolves to `102.218.215.41` and presents a hosting placeholder certificate. Every canonical, sitemap URL, `robots.txt` sitemap line and JSON-LD `@id` points at that dead origin. Google cannot index the site correctly until it serves this deployment over valid HTTPS.
2. **The supplied deployment URL is protected by Vercel Authentication** (`302` to `vercel.com/sso-api`). Crawlers and users cannot see it either.
3. **`APP_URL` is `http://localhost:3000` in the local `.env`.** Production builds therefore fall back to `https://sassagranthub.co.za` (with a build warning). This must be set explicitly in the hosting environment.

Required actions, in order:
1. Attach `sassagranthub.co.za` (and optionally `www`) to the Vercel project and point DNS at Vercel; issue the certificate.
2. Disable Vercel Authentication / Deployment Protection for the production deployment.
3. Set `APP_URL=https://sassagranthub.co.za` in the production environment and redeploy.
4. Confirm `https://sassagranthub.co.za/robots.txt`, `/sitemap.xml` and a grant page return 200 with the correct canonical.
5. Verify the domain in Search Console, submit `/sitemap.xml`, and inspect `/`, `/grants/srd-r370-grant`, `/payment-dates`, `/status` and `/news`.
6. Set `GOOGLE_SITE_VERIFICATION` if using the HTML-tag method.

A secondary point: `sassagranttguide.vercel.app` currently 301s to the dead domain. Keep or remove that redirect only after the custom domain is live; until then the old alias is unusable.

## 8. AdSense quality considerations

Strengths:
- Long-form original explanations (grant guides run to thousands of words) rather than templated keyword pages.
- Clear independence disclosure, editorial policy, corrections policy, contact route and named editor.
- No fake government affiliation, no invented payment dates, no manufactured breaking news.
- Sensible ad placement (hub-level units only; no ads inside article body).

Watch items:
- Twelve Updates articles is a small archive for a "news" section; keep quality high and publish only verified developments.
- Some office/province pages are necessarily similar in structure. They are useful locally, but avoid adding many more near-duplicate locations.
- Do not enable AdSense IDs until the account is approved; `ads.txt` correctly stays non-committal.

## 9. Realistic organic outlook

No rankings or traffic are guaranteed.

- **Head terms** ("sassa status check", "sassa payment dates", "srd status") are dominated by sassa.gov.za, large news publishers and established grant portals. Expect a long climb; these are not quick wins.
- **Realistic early wins (3–6 months)** are long-tail, specific intents where the site already has deeper answers: status code meanings, appeal-after-UIF/NSFAS, change SRD phone number, payment not reflecting, care-dependency medical assessment, foster court-order rules, and month-specific payment dates.
- **Recurring demand** comes from monthly payment pages and the Updates schedule-revision article. Those need refreshing around the 15th–20th of each month, not constant new URLs.
- **Biggest upside** is the SRD cluster once indexation is healthy, because the site covers application, status, review, payment methods and appeals in more depth than most competitors.

## 10. Recommended next 30 days

1. Fix hosting/DNS/`APP_URL`, remove deployment protection, verify in Search Console and submit the sitemap.
2. Request indexing for the priority pages only: home, SRD grant, SRD status check, payment dates hub, current month, status hub, appeals hub, Updates archive.
3. Publish the December/January schedule update when SASSA confirms it; revise the November article only if facts change.
4. Add one substantive Updates article on the grant review/verification process if a verified development occurs; otherwise do not publish.
5. Review Search Console queries after 2–3 weeks and strengthen the pages that earn impressions but few clicks (titles/answers), rather than adding URLs.
6. Check Core Web Vitals in the field once traffic exists; image and font strategy is already lean.
7. Re-run the internal-link crawl after any new content is added; keep zero orphan pages.
