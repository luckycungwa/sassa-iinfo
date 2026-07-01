/**
 * Sitemap Expansion — additional pages to reach 500+ total.
 * Follows same format as sitemap-plan.ts.
 */

type PageEntry = [url: string, keyword: string, intent: string, prio: string, traffic: string, schema: string, parent: string];

// ─── EXPANDED GRANT PAGES (walkthroughs, means-test per grant) ───────────────

export const grantExpanded: PageEntry[] = [
  // Application walkthroughs per grant
  ["/grants/srd-r370-grant/application-walkthrough", "SRD application process step by step", "I", "P4", "VH", "B,A", "/grants/srd-r370-grant"],
  ["/grants/child-support-grant/application-walkthrough", "child support grant application process", "I", "P3", "M", "B,A", "/grants/child-support-grant"],
  ["/grants/disability-grant/application-walkthrough", "disability grant application process", "I", "P3", "M", "B,A", "/grants/disability-grant"],
  ["/grants/foster-care-grant/application-walkthrough", "foster care grant application process", "I", "P2", "L", "B,A", "/grants/foster-care-grant"],
  ["/grants/care-dependency-grant/application-walkthrough", "care dependency grant application process", "I", "P2", "L", "B,A", "/grants/care-dependency-grant"],
  ["/grants/grant-in-aid/application-walkthrough", "grant in aid application process", "I", "P2", "L", "B,A", "/grants/grant-in-aid"],
  ["/grants/war-veterans-grant/application-walkthrough", "war veterans grant application process", "I", "P1", "VL", "B,A", "/grants/war-veterans-grant"],

  // Means test per grant
  ["/grants/srd-r370-grant/means-test", "SRD means test threshold", "I", "P4", "H", "B", "/grants/srd-r370-grant"],
  ["/grants/older-person-grant/means-test", "older person grant means test", "I", "P3", "M", "B", "/grants/older-person-grant"],
  ["/grants/disability-grant/means-test", "disability grant means test", "I", "P3", "M", "B", "/grants/disability-grant"],
  ["/grants/child-support-grant/means-test", "child support grant means test", "I", "P3", "M", "B", "/grants/child-support-grant"],

  // Before/after guides
  ["/grants/before-you-apply", "before applying for SASSA grant", "I", "P3", "H", "B,A", "/grants"],
  ["/grants/after-approval", "after SASSA grant approval what next", "I", "P3", "H", "B,A", "/grants"],
  ["/grants/understanding-payment-cycles", "SASSA payment cycles explained", "I", "P3", "M", "B,A", "/grants"],
];

// ─── EXPANDED STATUSES ───────────────────────────────────────────────────────

export const statusExpanded: PageEntry[] = [
  ["/status/declined-underage", "SASSA declined underage", "I", "P2", "L", "B,F", "/status"],
  ["/status/declined-overseas", "SASSA declined overseas", "I", "P1", "VL", "B,F", "/status"],
  ["/status/declined-no-response", "SASSA no response from applicant", "I", "P2", "M", "B,F", "/status"],
  ["/status/how-to-check-status-any-grant", "how to check SASSA grant status all types", "I", "P4", "H", "B,H", "/status"],
  ["/status/understanding-sassa-codes", "SASSA status codes explained", "I", "P3", "M", "B", "/status"],
  ["/status/status-change-notification", "SASSA status change notification", "I", "P2", "M", "B,F", "/status"],
];

// ─── EXPANDED APPEALS ────────────────────────────────────────────────────────

export const appealExpanded: PageEntry[] = [
  ["/appeals/appeal-for-war-veterans", "war veterans grant appeal", "T", "P1", "VL", "B", "/appeals"],
  ["/appeals/appeal-for-grant-in-aid", "grant in aid appeal", "T", "P2", "L", "B", "/appeals"],
  ["/appeals/appeal-template-letter", "SASSA appeal template letter", "T", "P3", "M", "B", "/appeals"],
  ["/appeals/appeal-after-means-test", "appeal after means test failed", "T", "P3", "M", "B,H", "/appeals"],
  ["/appeals/appeal-after-identity-failure", "appeal after identity verification failed", "T", "P3", "M", "B,H", "/appeals"],
  ["/appeals/appeal-after-bank-verification-failure", "appeal after bank verification failed", "T", "P3", "H", "B,H", "/appeals"],
  ["/appeals/multiple-month-appeal-guide", "appeal multiple months SRD", "T", "P3", "H", "B,H", "/appeals"],
];

// ─── EXPANDED ELIGIBILITY ────────────────────────────────────────────────────

export const eligibilityExpanded: PageEntry[] = [
  ["/eligibility/i-am-a-single-father", "SASSA grant for single fathers", "I", "P2", "M", "B,F", "/eligibility"],
  ["/eligibility/i-am-a-child-headed-household", "SASSA grant for child headed households", "I", "P2", "L", "B,F", "/eligibility"],
  ["/eligibility/i-am-hiv-positive", "SASSA grant for HIV positive", "I", "P2", "M", "B,F", "/eligibility"],
  ["/eligibility/i-have-a-terminally-ill-family-member", "SASSA grant for terminally ill caregiver", "I", "P2", "M", "B,F", "/eligibility"],
  ["/eligibility/i-live-in-a-rural-area", "SASSA grant rural areas", "I", "P2", "M", "B,F", "/eligibility"],
  ["/eligibility/i-was-retrenched", "SASSA grant after retrenchment", "I", "P3", "H", "B,F", "/eligibility"],
  ["/eligibility/i-am-a-seasonal-worker", "SASSA grant for seasonal workers", "I", "P2", "M", "B,F", "/eligibility"],
  ["/eligibility/i-am-on-community-service", "SASSA grant for community service workers", "I", "P2", "L", "B,F", "/eligibility"],
];

// ─── EXPANDED PAYMENT PAGES (historical + comparative) ────────────────────────

export const paymentExpanded: PageEntry[] = [
  ["/payment-dates/2024-archive", "SASSA payment dates 2024", "I", "P1", "L", "B,C", "/payment-dates"],
  ["/payment-dates/2023-archive", "SASSA payment dates 2023", "I", "P1", "VL", "B,C", "/payment-dates"],
  ["/payment-dates/2027-january", "SASSA payment dates January 2027", "I", "P2", "M", "B", "/payment-dates"],
  ["/payment-dates/2027-february", "SASSA payment dates February 2027", "I", "P1", "L", "B", "/payment-dates"],
  ["/payment-dates/2027-march", "SASSA payment dates March 2027", "I", "P1", "L", "B", "/payment-dates"],
  ["/payment-dates/yearly-calendar-2026", "SASSA payment calendar 2026 printable", "I", "P3", "M", "B", "/payment-dates"],
  ["/payment-dates/yearly-calendar-2027", "SASSA payment calendar 2027 printable", "I", "P2", "L", "B", "/payment-dates"],
  ["/payment-dates/historical-trend-analysis", "SASSA payment date historical trends", "I", "P1", "VL", "B,A", "/payment-dates"],
];

// ─── EXPANDED OFFICES (aim for 30+ total) ────────────────────────────────────

export const officeExpanded: PageEntry[] = [
  ["/offices/gp-johannesburg-city", "SASSA office Johannesburg CBD", "C", "P4", "H", "B,L", "/offices"],
  ["/offices/gp-tembisa", "SASSA office Tembisa", "C", "P2", "M", "B,L", "/offices"],
  ["/offices/gp-tshwane-north", "SASSA office Tshwane North", "C", "P2", "L", "B,L", "/offices"],
  ["/offices/wc-mitchells-plain", "SASSA office Mitchells Plain", "C", "P2", "M", "B,L", "/offices"],
  ["/offices/wc-stellenbosch", "SASSA office Stellenbosch", "C", "P2", "L", "B,L", "/offices"],
  ["/offices/wc-worcester", "SASSA office Worcester", "C", "P2", "L", "B,L", "/offices"],
  ["/offices/kzn-richards-bay", "SASSA office Richards Bay", "C", "P2", "M", "B,L", "/offices"],
  ["/offices/kzn-pinetown", "SASSA office Pinetown", "C", "P2", "M", "B,L", "/offices"],
  ["/offices/kzn-newcastle", "SASSA office Newcastle", "C", "P2", "L", "B,L", "/offices"],
  ["/offices/ec-mthatha", "SASSA office Mthatha", "C", "P2", "M", "B,L", "/offices"],
  ["/offices/ec-queenstown", "SASSA office Queenstown", "C", "P2", "L", "B,L", "/offices"],
  ["/offices/ec-bhisho", "SASSA office Bhisho", "C", "P1", "L", "B,L", "/offices"],
  ["/offices/lp-tzaneen", "SASSA office Tzaneen", "C", "P2", "L", "B,L", "/offices"],
  ["/offices/lp-mokopane", "SASSA office Mokopane", "C", "P2", "L", "B,L", "/offices"],
  ["/offices/mp-witbank", "SASSA office Witbank", "C", "P2", "M", "B,L", "/offices"],
  ["/offices/mp-sekhukhune", "SASSA office Sekhukhune", "C", "P1", "L", "B,L", "/offices"],
  ["/offices/fs-welkom", "SASSA office Welkom", "C", "P2", "M", "B,L", "/offices"],
  ["/offices/fs-bethlehem", "SASSA office Bethlehem", "C", "P1", "L", "B,L", "/offices"],
  ["/offices/nw-rustenburg", "SASSA office Rustenburg", "C", "P3", "M", "B,L", "/offices"],
  ["/offices/nw-klerksdorp", "SASSA office Klerksdorp", "C", "P2", "M", "B,L", "/offices"],
  ["/offices/nc-upington", "SASSA office Upington", "C", "P1", "L", "B,L", "/offices"],
  ["/offices/nc-springbok", "SASSA office Springbok", "C", "P1", "L", "B,L", "/offices"],
];

// ─── EXPANDED DOWNLOADS ──────────────────────────────────────────────────────

export const downloadExpanded: PageEntry[] = [
  ["/downloads/sassa-medical-report-form", "SASSA medical report form download", "T", "P3", "M", "B", "/downloads"],
  ["/downloads/sassa-reinstatement-form", "SASSA grant reinstatement form", "T", "P2", "M", "B", "/downloads"],
  ["/downloads/sassa-appeal-form-other-grants", "SASSA appeal form non-SRD grants", "T", "P2", "M", "B", "/downloads"],
  ["/downloads/sassa-foster-care-form", "SASSA foster care grant form", "T", "P2", "L", "B", "/downloads"],
  ["/downloads/sassa-care-dependency-form", "SASSA care dependency application form", "T", "P2", "L", "B", "/downloads"],
  ["/downloads/sassa-war-veterans-form", "SASSA war veterans application form", "T", "P1", "VL", "B", "/downloads"],
  ["/downloads/sassa-grant-in-aid-form", "SASSA grant in aid application form", "T", "P2", "L", "B", "/downloads"],
  ["/downloads/sassa-proof-of-income-form", "SASSA proof of income form", "T", "P2", "M", "B", "/downloads"],
  ["/downloads/sassa-marital-status-declaration", "SASSA marital status declaration", "T", "P2", "M", "B", "/downloads"],
  ["/downloads/sassa-child-support-school-form", "SASSA child support school attendance form", "T", "P2", "M", "B", "/downloads"],
];

// ─── EXPANDED BANKING ────────────────────────────────────────────────────────

export const bankingExpanded: PageEntry[] = [
  ["/banking/cash-send-retailer-list", "SASSA Cash Send retailers", "N", "P3", "M", "B", "/banking"],
  ["/banking/cash-send-limits", "SASSA Cash Send limits", "I", "P3", "M", "B,F", "/banking"],
  ["/banking/bank-transfer-delays", "SASSA bank transfer delays", "I", "P3", "H", "B,F", "/banking"],
  ["/banking/change-from-bank-to-cash-send", "change SASSA from bank to cash send", "T", "P3", "M", "B,H", "/banking"],
  ["/banking/change-from-cash-send-to-bank", "change SASSA from cash send to bank", "T", "P3", "M", "B,H", "/banking"],
  ["/banking/third-party-bank-accounts", "SASSA third party bank account rules", "I", "P3", "H", "B,F", "/banking"],
  ["/banking/no-bank-account-options", "SASSA no bank account options", "I", "P3", "H", "B,F", "/banking"],
  ["/banking/bank-account-name-mismatch", "SASSA bank account name mismatch fix", "I", "P4", "H", "B,H", "/banking"],
  ["/banking/sassa-card-atm-withdrawal", "SASSA card ATM withdrawal guide", "I", "P2", "M", "B,H", "/banking"],
];

// ─── EXPANDED GUIDES ─────────────────────────────────────────────────────────

export const guideExpanded: PageEntry[] = [
  ["/guides/how-to-check-if-grant-is-approved", "check if SASSA grant is approved", "N", "P4", "H", "B,H", "/guides"],
  ["/guides/how-to-check-payment-date", "check SASSA payment date", "N", "P4", "H", "B,H", "/guides"],
  ["/guides/how-to-update-address", "update SASSA address", "T", "P2", "M", "B,H", "/guides"],
  ["/guides/how-to-change-phone-number", "change SASSA phone number", "T", "P3", "H", "B,H", "/guides"],
  ["/guides/how-to-report-fraud", "report SASSA fraud", "T", "P2", "M", "B,H", "/guides"],
  ["/guides/how-to-get-proof-of-residence", "proof of residence for SASSA", "T", "P3", "M", "B,H", "/guides"],
  ["/guides/how-to-get-marriage-certificate", "marriage certificate for SASSA", "T", "P2", "L", "B,H", "/guides"],
  ["/guides/how-to-get-death-certificate", "death certificate for SASSA", "T", "P2", "L", "B,H", "/guides"],
  ["/guides/how-to-certify-documents", "certify documents for SASSA", "T", "P3", "M", "B,H", "/guides"],
  ["/guides/how-to-translate-documents", "translate documents for SASSA", "T", "P2", "L", "B,H", "/guides"],
  ["/guides/how-to-avoid-sassa-scams", "avoid SASSA scams", "I", "P3", "H", "B,A", "/guides"],
  ["/guides/sassa-fraud-hotline", "SASSA fraud hotline", "N", "P3", "M", "B", "/guides"],
  ["/guides/application-timeline-expectations", "SASSA application timeline expectations", "I", "P3", "M", "B,A", "/guides"],
  ["/guides/back-to-back-months-declined", "SASSA multiple months declined what to do", "I", "P3", "H", "B,A", "/guides"],
  ["/guides/moving-between-provinces", "move SASSA grant between provinces", "T", "P2", "M", "B,H", "/guides"],
];

// ─── EXPANDED FAQ ────────────────────────────────────────────────────────────

export const faqExpanded: PageEntry[] = [
  ["/faq/after-grant-approval", "after SASSA approval FAQ", "I", "P3", "M", "B,F", "/faq"],
  ["/faq/collecting-payments", "collecting SASSA payments FAQ", "I", "P3", "M", "B,F", "/faq"],
  ["/faq/grant-renewal", "SASSA grant renewal FAQ", "I", "P3", "M", "B,F", "/faq"],
  ["/faq/grant-transfer", "SASSA grant transfer FAQ", "I", "P2", "L", "B,F", "/faq"],
  ["/faq/lost-or-stolen-card", "SASSA lost or stolen card FAQ", "I", "P3", "M", "B,F", "/faq"],
  ["/faq/name-change-after-marriage", "SASSA name change after marriage FAQ", "I", "P2", "L", "B,F", "/faq"],
  ["/faq/refugee-and-asylum-seeker", "SASSA refugee FAQ", "I", "P2", "L", "B,F", "/faq"],
  ["/faq/sassa-and-home-affairs", "SASSA and Home Affairs FAQ", "I", "P2", "M", "B,F", "/faq"],
  ["/faq/sassa-and-sars", "SASSA and SARS FAQ", "I", "P2", "M", "B,F", "/faq"],
  ["/faq/grant-pause-or-hold", "SASSA grant pause or hold FAQ", "I", "P2", "M", "B,F", "/faq"],
];

// ─── EXPANDED NEWS (back-fill + forward-looking) ──────────────────────────────

export const newsExpanded: PageEntry[] = [
  ["/news/2025-grant-increases", "2025 social grant increases", "I", "P2", "M", "B,N", "/news"],
  ["/news/srd-r370-extension-2026", "SRD R370 extension 2026", "I", "P3", "H", "B,N", "/news"],
  ["/news/foster-care-grant-increase-2026", "foster care grant increase 2026", "I", "P2", "L", "B,N", "/news"],
  ["/news/care-dependency-grant-increase-2026", "care dependency grant increase 2026", "I", "P2", "L", "B,N", "/news"],
  ["/news/grant-in-aid-increase-2026", "grant in aid increase 2026", "I", "P2", "L", "B,N", "/news"],
  ["/news/war-veterans-grant-increase-2026", "war veterans grant increase 2026", "I", "P1", "VL", "B,N", "/news"],
  ["/news/sassa-payment-system-upgrade", "SASSA payment system upgrade", "I", "P2", "M", "B,N", "/news"],
  ["/news/public-holiday-schedule-2026-2027", "SASSA public holiday schedule 2026 2027", "I", "P2", "M", "B,N", "/news"],
  ["/news/sassa-banking-partnership-changes", "SASSA banking partnership changes", "I", "P2", "M", "B,N", "/news"],
  ["/news/end-of-year-payment-schedule", "SASSA end of year payment schedule", "I", "P2", "M", "B,N", "/news"],
  ["/news/sassa-appeals-backlog", "SASSA appeals backlog update", "I", "P2", "L", "B,N", "/news"],
  ["/news/sassa-portal-maintenance", "SASSA portal maintenance schedule", "I", "P2", "L", "B,N", "/news"],
];

// ─── EXPANDED LANDING PAGES ──────────────────────────────────────────────────

export const landingExpanded: PageEntry[] = [
  ["/landing/sassa-grant-types-comparison", "SASSA grant types comparison", "I", "P3", "H", "B,A", ""],
  ["/landing/sassa-application-process", "SASSA application process complete guide", "I", "P3", "H", "B,A,F", ""],
  ["/landing/sassa-payment-troubleshooting", "SASSA payment troubleshooting guide", "I", "P3", "H", "B,A,F", ""],
  ["/landing/sassa-identity-issues", "SASSA identity verification guide", "I", "P3", "M", "B,A,F", ""],
  ["/landing/sassa-banking-setup", "SASSA banking setup guide", "I", "P3", "M", "B,A,F", ""],
  ["/landing/sassa-province-by-province", "SASSA province by province guide", "I", "P3", "M", "B,A", ""],
  ["/landing/sassa-2026-changes", "SASSA changes 2026 complete overview", "I", "P3", "H", "B,A", ""],
];

// ─── EXPANDED RESOURCES ──────────────────────────────────────────────────────

export const resourceExpanded: PageEntry[] = [
  ["/resources/important-phone-numbers", "SASSA important phone numbers", "N", "P3", "H", "B", ""],
  ["/resources/useful-links", "SASSA useful links official portals", "N", "P3", "M", "B", ""],
  ["/resources/sassa-vs-dsd", "SASSA vs DSD explained", "I", "P2", "M", "B,A", ""],
  ["/resources/grant-calculation-methodology", "how SASSA calculates grant amounts", "I", "P2", "M", "B,A", ""],
  ["/resources/backpay-explanation", "SASSA backpay explained", "I", "P3", "H", "B,A", ""],
  ["//resources/beneficiary-ombudsman", "SASSA beneficiary ombudsman", "I", "P2", "M", "B,A", ""],
  ["/resources/legal-aid-for-grant-issues", "legal aid for SASSA grant issues", "I", "P2", "M", "B,A", ""],
];

// ─── EXPANDED TOOLS ──────────────────────────────────────────────────────────

export const toolExpanded: PageEntry[] = [
  ["/tools/grant-renewal-reminder", "SASSA grant renewal reminder tool", "T", "P2", "M", "B", "/tools"],
  ["/tools/bank-verification-checker", "SASSA bank verification checker", "T", "P3", "H", "B", "/tools"],
  ["/tools/srd-monthly-tracker", "SRD monthly status tracker", "T", "P3", "H", "B", "/tools"],
  ["/tools/appeal-letter-generator", "SASSA appeal letter generator", "T", "P3", "M", "B", "/tools"],
  ["/tools/grant-amount-comparison", "SASSA grant amount comparison tool", "D", "P2", "M", "B", "/tools"],
  ["/tools/budget-planner-for-beneficiaries", "SASSA grant budget planner", "I", "P2", "L", "B", "/tools"],
  ["/tools/province-office-lookup", "SASSA province office lookup", "N", "P2", "M", "B", "/tools"],
];

// ─── COLLECTION PAGES (topic-organized link pages) ───────────────────────────

export const collectionPages: PageEntry[] = [
  ["/collections/srd-grant", "SRD R370 complete resource collection", "I", "P4", "VH", "B,C", ""],
  ["/collections/older-person-grant", "Older Person Grant complete resource collection", "I", "P4", "H", "B,C", ""],
  ["/collections/child-grants", "SASSA child grants resource collection", "I", "P3", "H", "B,C", ""],
  ["/collections/disability-grants", "SASSA disability grants resource collection", "I", "P3", "M", "B,C", ""],
  ["/collections/all-grants", "SASSA all grants resource collection", "I", "P4", "H", "B,C", ""],
  ["/collections/payments", "SASSA payments resource collection", "I", "P3", "H", "B,C", ""],
  ["/collections/appeals", "SASSA appeals resource collection", "I", "P3", "H", "B,C", ""],
  ["/collections/documents", "SASSA documents resource collection", "I", "P3", "M", "B,C", ""],
  ["/collections/offices-by-province", "SASSA offices by province collection", "N", "P3", "M", "B,C", ""],
  ["/collections/faq-by-topic", "SASSA FAQ by topic collection", "I", "P3", "M", "B,C", ""],
  ["/collections/beginner-guides", "SASSA beginner guides collection", "I", "P3", "H", "B,C", ""],
];

// ─── EVERGREEN REFERENCE PAGES ──────────────────────────────────────────────

export const evergreenPages: PageEntry[] = [
  ["/reference/income-thresholds-2026", "SASSA income thresholds 2026", "I", "P3", "H", "B", ""],
  ["/reference/asset-limits-2026", "SASSA asset limits 2026", "I", "P3", "M", "B", ""],
  ["/reference/grant-amounts-table-2026", "SASSA grant amounts table 2026", "I", "P4", "VH", "B", ""],
  ["/reference/payment-date-formula", "how SASSA sets payment dates", "I", "P2", "L", "B,A", ""],
  ["/reference/sassa-legislation", "SASSA governing legislation", "I", "P1", "L", "B,A", ""],
  ["/reference/sassa-annual-report", "SASSA annual report highlights", "I", "P1", "L", "B,A", ""],
];

// ─── AGGREGATE ALL EXPANDED ──────────────────────────────────────────────────

export const EXPANDED_PAGES: PageEntry[] = [
  ...grantExpanded,
  ...statusExpanded,
  ...appealExpanded,
  ...eligibilityExpanded,
  ...paymentExpanded,
  ...officeExpanded,
  ...downloadExpanded,
  ...bankingExpanded,
  ...guideExpanded,
  ...faqExpanded,
  ...newsExpanded,
  ...landingExpanded,
  ...resourceExpanded,
  ...toolExpanded,
  ...collectionPages,
  ...evergreenPages,
];

export const EXPANSION_SUMMARY: Record<string, number> = {
  grants: grantExpanded.length,
  statuses: statusExpanded.length,
  appeals: appealExpanded.length,
  eligibility: eligibilityExpanded.length,
  payments: paymentExpanded.length,
  offices: officeExpanded.length,
  downloads: downloadExpanded.length,
  banking: bankingExpanded.length,
  guides: guideExpanded.length,
  faq: faqExpanded.length,
  news: newsExpanded.length,
  landing: landingExpanded.length,
  resources: resourceExpanded.length,
  tools: toolExpanded.length,
  collections: collectionPages.length,
  evergreen: evergreenPages.length,
  TOTAL: EXPANDED_PAGES.length,
};
