# AdSense readiness: final audit and implementation report

Date: 13 November 2026
Site: https://sassagranthub.co.za (served on https://www.sassagranthub.co.za)
Scope: source repository, production build, live HTTP responses, official SASSA sources

## 0.1 Current implementation status — 13 November 2026

This section supersedes older readiness statements below where they conflict.

- Work is on PR #2, branch `fix/adsense-readiness-cleanup-2026-11-13`. The PR is open and remains unmerged; no production deployment has been made.
- Metadata was rewritten across 107 content records, seven downloadable-form pages, the main content hubs and the three province pages identified by the generated-HTML audit.
- The first full CI run generated 200 pages, including 148 indexable prerendered pages. It passed content validation and the Next.js production build, then exposed 23 title/description overages.
- Those 23 specific hub, download and province metadata fields have been corrected.
- The latest CI run on commit `6b1ec9a252b19c24a281d3675347656484a1eee1` is **green**: dependency installation, content validation, production build and generated-HTML metadata audit all passed. The audit checked all 148 indexable prerendered pages with zero remaining title/description length failures.
- The publisher ID supplied by the site owner is `pub-8180440849942257`. The `/ads.txt` route now emits the seller record only when `NEXT_PUBLIC_ADSENSE_ID` is configured. CI supplies `ca-pub-8180440849942257`; the production Vercel environment and live `/ads.txt` response have not been verified.
- A web-based check of the live `ads.txt`, `robots.txt` and sitemap could not retrieve those endpoints in this session. Their live state is therefore unconfirmed.
- The Vercel team connected to this session has no Git-linked project for `luckycungwa/sassa-iinfo`, and its visible project/domain inventory does not include `sassagranthub.co.za`. The production project may be under another Vercel team/account or another host; this connection cannot verify or change its environment variables.

## 0. Honest framing

AdSense has no scoring system and no one can promise a specific approval probability.
What follows is an evidence-based audit: every defect I could find in the repository,
whether it was fixed, and the small number of items that live outside the code
(hosting settings, a mailbox, a Facebook page name). The score in section 6 is my
assessment against Google's published review criteria, not a Google metric.

## 1. Brand check

There is **no trace of "SASSA HelpHub" or "SASSA Help Hub"** in this project:

- No match in source, content, `public/`, configuration or reports.
- No match in any commit in the repository history.
- The brand has always been **SASSA Grant Hub**, operated by **44tagstudios**, edited by **Lucky Cungwa**.
- `lib/site.ts` is the single source of the name and canonical origin, so no page can drift to another brand.

One external signal does exist, and it is not in the code: Search Console shows the query
`sassahelphub` with 1 impression at position 9. Nothing in this project produces that query,
so the association belongs to some other site Google groups with the topic; it is not
something this codebase can create or remove. Earlier drafts linked a Facebook page that is
not ours. Every outbound Facebook link has now been removed, along with a floating button
that described that page as "our Facebook community", so the site no longer implies
ownership of, or affiliation with, any social account.

Two legacy-brand remnants are intentional: `sassagrantguide.co.za` and
`sassagranttguide.vercel.app` are 301'd to the current domain in `next.config.ts`.
`checksassastatus.co.za` appears in `MIGRATION.md` only as a rejected candidate name.

## 2. Canonical host — fixed in code, pending deploy

`https://sassagranthub.co.za/` returns **308 → https://www.sassagranthub.co.za/**, so `www`
is the host users land on. The canonical origin is now **`https://www.sassagranthub.co.za`**,
and `lib/site.ts` rewrites an `APP_URL` that still points at the apex, so a stale hosting
variable cannot reintroduce the mismatch.

Verified in the production build:

- `<link rel="canonical">`, `og:url` and the JSON-LD `@id` all use the `www` origin.
- `sitemap.xml` contains 150 URLs, all on `www`; `robots.txt` advertises the `www` sitemap.
- Built HTML contains zero apex URLs.
- Proven resilient: `APP_URL="https://sassagranthub.co.za" npm run build` still emits `www`.

**Still required:** deploy. The live site continues to serve apex canonicals until then.

## 3. On-page and ad-code state

| Check | Result |
| --- | --- |
| AdSense script on pages | Present on 191 of 192 built pages, with `client=ca-pub-8180440849942257` |
| `<ins class="adsbygoogle">` units | **0 pages** — all five slot variables are unset |
| `/ads.txt` | Route emits `google.com, pub-8180440849942257, DIRECT, f08c47fec0942fa0` only when `NEXT_PUBLIC_ADSENSE_ID` is configured; production response not yet verified |
| Invalid/word-based slot IDs | None |

The zero ad units are intentional before approval: an `<ins>` element without a real numeric
slot can create blank space and console errors. The publisher ID is now environment-driven;
the CI build receives `ca-pub-8180440849942257`, while the production Vercel variable has not
been inspected. Do not assume Auto ads is live until the publisher script is confirmed on the
deployed site and Auto ads is enabled in the AdSense dashboard. Keep the five manual slot
variables blank until the account is approved and real numeric slot IDs exist.

## 4. Facts verified against official SASSA sources

### COVID-19 SRD (R370)

- November 2026 payment dates: **Monday 23 and Wednesday 25 November 2026** — corroborated by
  the official November 2026 poster and IOL reporting on 11 November 2026.
- Extension: **to 31 March 2028**, subject to formal implementation.
- Updated in 14 places, including `lib/data/srd.ts`, `lib/data/paymentDates.ts`, the November
  payment-date page, and `content/news/srd-r370-grant-extended-to-2028.json` (renamed from
  the `…-march-2027` slug, with a 308 redirect and sitemap updated).
- The site does **not** publish invented dates for January–March 2027. No official schedule
  for those months exists yet; third-party assertions were deliberately excluded.

### Grant-in-Aid

Re-checked against `sassa.gov.za`, the SASSA Services Portal and `gov.za`:

- R580 a month, paid on top of the primary grant.
- Requires an existing **Older Person, Disability or War Veterans** grant, plus a need for
  regular attendance by another person for activities of daily living due to physical or
  mental disability, and not being cared for in a state-subsidised institution.
- It cannot stand alone: if the primary grant lapses, the Grant-in-Aid lapses with it.
- The application form is completed in the presence of a SASSA officer; a family member or
  friend may apply on the applicant's behalf if they cannot travel.
- The medical or assessment report must be **less than three months old**.
- No separate means test is listed in the official requirements — the primary grant's test applies.

Corrections made to `/grants/grant-in-aid` (version 1.1.0, `lastUpdated` 2026-11-12):

- "one of the **four** qualifying primary grants" corrected to three, matching the rest of the page.
- A duplicated FAQ ("Do I need to prove I pay my caregiver?") removed.
- Seven FAQs added from the recurring reader questions: caregiver employment, online
  application, whether SASSA pays the caregiver, report age, Older Person Grant alone,
  withdrawing the top-up, and home verification.
- A **Sources** block added with the four official pages and the date they were checked.

## 5. Owner-only items (cannot be fixed in the repository)

1. **Confirm `44tagstudios@gmail.com` receives mail.** It is now the published contact
   route on `/contact`. A Gmail address is accepted by AdSense; the address only has to
   exist and be monitored.
2. **Confirm the production hosting project.** The Vercel workspace connected to this session does not show a project linked to `sassa-iinfo` or the `sassagranthub.co.za` domain. Identify the actual project/team or host, set `APP_URL` and `NEXT_PUBLIC_ADSENSE_ID` there, then deploy so live canonicals, sitemap, `robots.txt` and `/ads.txt` match the code.
3. **Enable Auto ads** (or create the five manual units) in the AdSense dashboard.
4. **Search Console:** resubmit `https://www.sassagranthub.co.za/sitemap.xml` after the
   deploy and re-inspect the five hub pages.

## 6. Readiness decision

The earlier internal **93/100** estimate is withdrawn as an application decision signal. It was
not a Google score and predates the generated-HTML metadata audit. The application decision
must be based on a clean final build and metadata audit, live canonical/sitemap/robots checks,
a live `/ads.txt` check, and the owner-only checks in section 5. No approval probability is
claimed.

## 7. Known remaining work

- **Metadata length pass.** The older report counted 103 URLs with over-length titles or
  descriptions. The current generated-HTML audit checked 148 indexable pages and now passes
  with zero missing or over-length titles/descriptions.
- **Indexing.** The last recorded Search Console snapshot showed 61 indexed and 142
  "Discovered – currently not indexed". Recheck after deployment and sitemap resubmission;
  do not assume the canonical change alone will resolve the remaining discovered URLs.
  The seven "Page with redirect" entries in that snapshot were apex URLs.
- **Two noindex pages** (expected: `/search` and one utility route).

## 8. Application checklist

- [x] CI production build includes the confirmed publisher ID when configured; live deployment still needs verification
- [x] No invalid or empty ad containers on any page
- [ ] Live `/ads.txt` returns the confirmed seller record after `NEXT_PUBLIC_ADSENSE_ID` is set in Vercel
- [x] Privacy, Terms, Disclaimer, Editorial and Corrections pages present and accurate
- [x] No government-affiliation claim, no invented dates or amounts
- [x] Official sources cited on grant pages and status pages
- [ ] In the actual production hosting project, set `APP_URL=https://www.sassagranthub.co.za` and `NEXT_PUBLIC_ADSENSE_ID=ca-pub-8180440849942257`, deploy, then verify live canonicals, sitemap, `robots.txt` and `/ads.txt` on `www`
- [ ] Confirm `44tagstudios@gmail.com` receives mail and is monitored
- [x] No outbound Facebook link, no claim of a social community we do not run
- [ ] Search Console: sitemap accepted, hub pages indexed — **after deploy**
- [ ] Mobile spot-check on a real phone — **owner**
- [ ] Application submitted; ads enabled only after approval

## 9. Change log (this and the preceding pass)

### 13 November 2026 follow-up
- Reworked metadata across 107 content records, seven download pages, eight hub pages and the affected province metadata.
- Added a GitHub Actions quality gate for dependency installation, content validation, production build and generated-HTML metadata audit.
- First CI run identified 23 remaining metadata overages after content validation and production build passed. All 23 were corrected. Latest CI run passed content validation, production build and the generated-HTML metadata audit across 148 indexable pages.
- Made `/ads.txt` publisher output environment-driven and updated `.env.example` with the application-stage configuration guidance.

```
 M lib/site.ts                                   canonical origin → www, APP_URL normalisation
 M next.config.ts                                legacy hosts → www; SRD article 301
 M lib/data/srd.ts                               November SRD 23 & 25 Nov; exact display label
 M lib/data/paymentDates.ts                      data date 12 Nov 2026; November notes
 M lib/data/grants.ts, lib/data/faq.ts           2027 → 31 March 2028
 M content/grants/srd-r370-grant.json            2027 → 2028 (3 places)
 M content/eligibility/i-am-unemployed.json      2027 → 2028
 M content/payment-dates/2026-november.json      regenerated dates table and FAQs
 M content/news/…-extended-to-2028.json          renamed, retitled, version 1.1.0
 M content/grants/grant-in-aid.json              accuracy fixes, 7 FAQs, sources, v1.1.0
 M content/statuses/*.json (19 files)            worked example + official basis
 M app/(site)/contact/page.tsx                   publisher email; removed third-party Facebook card
 D components/WhatsAppButton.tsx                 floating button pointing at a page we do not own
 M app/(site)/editorial-policy/page.tsx          removed claim of a Facebook community
 M app/(site)/privacy/page.tsx                   removed non-existent AI disclosure
 M app/(site)/terms/page.tsx                     fixed publisher name
 M components/ads/AdUnit.tsx                     require numeric slot
 M lib/ads.ts                                    single source for slot IDs
 M README.md, MIGRATION.md, .env.example         canonical origin and slot variables
 D public/Ads.txt, public/apple-icon - Copy.png  duplicates
```
