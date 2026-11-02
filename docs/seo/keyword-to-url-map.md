# Keyword-to-URL map

Built from the eight Google Trends exports supplied (South Africa, 3-month window, plus rising queries). Trends scores are **relative interest**, not search volume; this map deliberately does not invent volume, difficulty or CPC figures.

## Rules used

1. One canonical URL per search intent. Keyword variants are supported by headings, tables and FAQs on an existing page rather than new URLs.
2. Month and grant variants reuse the same templates (`/payment-dates/[month]`, `/grants/[grant]`), not separate keyword pages.
3. Time-sensitive developments go to `/news/...` (the Updates blog), never into evergreen grant pages as fake "news".
4. Status pages answer "what does this code mean"; the status-check guide answers "how do I check". These are distinct intents and are cross-linked, not merged.

## Cluster 1 — Payment dates

| Query pattern (Trends) | Primary URL | Supporting URL(s) |
| --- | --- | --- |
| sassa payment dates / payment dates for sassa / sassa payment dates 2026 | `/payment-dates` | `/payment-dates/2026-november`, `/payment-dates/2026-december` |
| sassa payment dates september / october / november 2026 | `/payment-dates/2026-september`, `/2026-october`, `/2026-november` | `/payment-dates` |
| sassa r370 payment dates / srd payment dates | `/grants/srd-r370-grant` (payment section) | `/payment-dates`, `/grants/srd-r370-grant/payment-methods` |
| sassa payment dates for child grant | `/payment-dates/child-support-grant-payment-dates` | `/grants/child-support-grant` |
| sassa old age / pension payment date | `/payment-dates/older-persons-grant-payment-dates` | `/grants/older-person-grant` |
| sassa disability payment date | `/payment-dates/disability-grant-payment-dates` | `/grants/disability-grant` |
| sassa festive season payment dates | `/payment-dates/2026-december` | `/news/sassa-november-2026-payment-dates-revised` |
| sassa grant schedule november election clash | `/news/sassa-november-2026-payment-dates-revised` | `/payment-dates/2026-november` |

## Cluster 2 — Status checking

| Query pattern | Primary URL | Supporting URL(s) |
| --- | --- | --- |
| sassa status check / check sassa status / sassa check status | `/guides/how-to-check-sassa-status` | `/status` |
| sassa status / sassa grant status (meaning) | `/status` | `/status/[code]` |
| srd status check / check srd status / srd status | `/grants/srd-r370-grant/status-check` | `/status/approved`, `/status/declined`, `/status/pending` |
| r350 / r370 status check | `/grants/srd-r370-grant/status-check` | `/grants/srd-r370-grant` |
| sassa appeal status / appeal status check | `/appeals/appeal-status-check` | `/appeals` |
| sassa status check appeal date | `/appeals/appeal-timeline` | `/appeals/appeal-status-check` |
| srd status check using id number | `/guides/how-to-check-sassa-status` | `/grants/srd-r370-grant/status-check` |

The R350 variants are legacy naming for the same payment. They are handled on the R370 page and in the intro copy; no R350-specific URL is created.

## Cluster 3 — Grant information

| Query pattern | Primary URL |
| --- | --- |
| sassa social grant / sassa grant | `/grants` |
| srd grant / sassa r370 grant / sassa 370 grant | `/grants/srd-r370-grant` |
| sassa old age grant | `/grants/older-person-grant` |
| sassa disability grant | `/grants/disability-grant` |
| sassa child grant | `/grants/child-support-grant` |
| foster child / foster care grant | `/grants/foster-care-grant` |
| care dependency grant | `/grants/care-dependency-grant` |
| grant in aid | `/grants/grant-in-aid` |
| war veterans grant | `/grants/war-veterans-grant` |
| sassa grant amounts / increases | `/guides/sassa-grant-amounts` |

## Cluster 4 — Applications

| Query pattern | Primary URL |
| --- | --- |
| sassa application / sassa grant application / sassa online application | `/guides/how-to-apply-sassa-grant` |
| srd application / apply for srd | `/grants/srd-r370-grant` (application section) |
| sassa application documents | `/guides/sassa-documents-checklist` |
| sassa application form download | `/downloads/sassa-application-form` |
| sassa whatsapp application | `/guides/srd-call-centre-kiosk-help` |

## Cluster 5 — Appeals and beneficiary problems

| Query pattern | Primary URL |
| --- | --- |
| sassa appeal / srd appeal | `/appeals` |
| how to appeal a declined grant | `/appeals/how-to-appeal` |
| appeal after UIF / NSFAS / income source | `/appeals/appeal-after-uif`, `/appeals/appeal-after-nsfas`, `/appeals/appeal-after-income-source` |
| appeal documents / appeal timeline / appeal outcomes | `/appeals/appeal-documents`, `/appeals/appeal-timeline`, `/appeals/appeal-outcomes` |
| change sassa cellphone number | `/guides/change-srd-phone-number` |
| change srd banking details | `/banking/update-bank-details` |
| grant verification / grant review | `/grants/srd-r370-grant/monthly-review` |
| payment not reflecting | `/banking/payment-not-reflecting` |
| sassa card / black card switch | `/banking/black-card-swap`, `/banking/sassa-card-replacement` |
| sassa balance check / ussd | `/guides/check-sassa-balance`, `/banking/sassa-ussd-codes` |
| identity theft / sassa scam | `/guides/sassa-scam-alert-guide` |

## Cluster 6 — Editorial (Updates)

These are news intents. They belong on dated articles and must not become evergreen keyword pages.

| Topic | Article URL |
| --- | --- |
| Social grant reviews and verification | `/news/sassa-grant-review-crackdown-2026` |
| November schedule revision / election holiday | `/news/sassa-november-2026-payment-dates-revised` |
| Postbank gold-to-black card migration | `/news/sassa-gold-card-to-black-card-migration` |
| Grant increases 2026 | `/news/social-grant-increases-2026` |
| SRD extension to March 2027 | `/news/srd-r370-grant-extended-to-march-2027` |
| eLife certification | `/news/elife-certification-guide-srd` |
| Scam warnings | `/news/sassa-scam-warning-july-2026` |

## Overlap and cannibalisation decisions

- **`/status` vs `/guides/how-to-check-sassa-status` vs `/grants/srd-r370-grant/status-check`**: meanings, procedure, and SRD-specific procedure. Each has a distinct H1 and internal links to the other two.
- **`/payment-dates` vs month pages**: the hub owns "2026 schedule"; month pages own "<month> 2026 dates". The hub links every month and does not repeat full month detail.
- **`/grants/srd-r370-grant` vs its sub-guides**: the main page owns the grant head term; `status-check`, `payment-methods` and `monthly-review` own long-tail process queries.
- **R350 vs R370**: one page. R350 is acknowledged as the former name in copy and FAQs.

## Gaps deliberately left as content, not URLs

- "SASSA payment dates 2027": create the 2027 months when SASSA publishes them; do not pre-build empty pages.
- Provincial or office-level payment-date pages: office and province hubs already exist; adding per-office date URLs would be doorway content.
- "SASSA news today": handled by the Updates archive, not a keyword page.

## Mapping maintenance

- Re-check this map when a new grant page or Updates category is added.
- Re-check around the 15th–20th of each month when the payment schedule is reviewed.
- Never add a new URL for a query that an existing page already answers.
