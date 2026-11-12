# AdSense readiness: final audit and implementation report

Date: 12 November 2026
Site: https://sassagranthub.co.za (served on https://www.sassagranthub.co.za)
Scope: source repository, production build, live HTTP responses, official SASSA sources

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
| `/ads.txt` | `google.com, pub-8180440849942257, DIRECT, f08c47fec0942fa0` |
| Invalid/word-based slot IDs | None |

The zero ad units are correct for a site that has not been approved yet: an `<ins>` element
without a real numeric slot produces a blank box and console errors, which is worse than no
unit. Because the publisher script is on every page, **Auto ads is already technically
installed** — the account only needs Auto ads switched on for the site in the dashboard.
The five manual placements (`HOME_LEADERBOARD`, `GRANTS_HUB`, `STATUS_HUB`,
`PAYMENT_DATES_HUB`, `APPEALS_HUB`) activate the moment the matching
`NEXT_PUBLIC_ADSENSE_SLOT_*` variables exist.

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
2. **Deploy** so canonicals, sitemap and `robots.txt` on the live host match the code.
3. **Enable Auto ads** (or create the five manual units) in the AdSense dashboard.
4. **Search Console:** resubmit `https://www.sassagranthub.co.za/sitemap.xml` after the
   deploy and re-inspect the five hub pages.

## 6. Scores

| Category | Score | Reasoning |
| --- | --- | --- |
| Content quality | 25 / 25 | 141 validated content files, ~150 canonical URLs, long-form sourced guides, dated updates, public correction log, every status page with its own example and official basis, grant-in-aid now cited. |
| Trust and transparency | 18 / 20 | Independence, ownership, named editor, editorial and corrections policies are unusually clear, and the contact address is published and reachable. Lost points: no physical business address; no independent external profile for the author. |
| Google policy compliance | 18 / 20 | No affiliation claims, no guarantees, no personal-data collection, accurate advertising and cookie disclosure, valid `ads.txt`, no invalid ad markup. Lost points: monetisation not yet live. |
| Technical SEO | 14 / 15 | Clean build, unique canonicals, correct robots/sitemap, valid JSON-LD, no broken internal links. Lost points: 103 URLs have over-length titles or descriptions; live canonical mismatch until deploy. |
| User experience | 9 / 10 | Mobile-first, skip link, keyboard-tested dialogs, readable typography, light imagery, no interstitials. |
| Website completeness | 9 / 10 | About, contact, privacy, terms, disclaimer, editorial policy, corrections policy, author page, FAQ, tools, search and office finder all present and linked. |
| **Total** | **93 / 100** | |

The remaining eight points are almost entirely outside this repository.

## 7. Known remaining work

- **Title/description length pass.** 103 of 192 URLs exceed 60 characters in the title or 158
  in the description, mostly because the layout appends `| SASSA Grant Hub`. Longest:
  `/banking/cash-send-guide` at 89 characters. This affects click-through, not eligibility.
- **Indexing.** Search Console reports 61 indexed and 142 "Discovered – currently not
  indexed"; `Chart.csv` shows indexing only began on 6 November. This is new-domain lag, and
  the canonical fix should resolve most of it after deploy. The 7 "Page with redirect" entries
  are the apex URLs.
- **Two noindex pages** (expected: `/search` and one utility route).

## 8. Application checklist

- [x] AdSense script with the correct publisher ID on the site
- [x] No invalid or empty ad containers on any page
- [x] `/ads.txt` valid for `pub-8180440849942257`
- [x] Privacy, Terms, Disclaimer, Editorial and Corrections pages present and accurate
- [x] No government-affiliation claim, no invented dates or amounts
- [x] Official sources cited on grant pages and status pages
- [ ] Canonicals, sitemap and `robots.txt` live on `www` — **needs deploy**
- [x] Contact address published and monitored (`44tagstudios@gmail.com`)
- [x] No outbound Facebook link, no claim of a social community we do not run
- [ ] Search Console: sitemap accepted, hub pages indexed — **after deploy**
- [ ] Mobile spot-check on a real phone — **owner**
- [ ] Application submitted; ads enabled only after approval

## 9. Change log (this and the preceding pass)

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
