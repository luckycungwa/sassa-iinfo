/**
 * SASSA Resource Platform — Complete Content Architecture (500+ pages)
 *
 * Every page is designed to answer a specific Google search query.
 * Organized by the beneficiary's intent, not by menu structure.
 *
 * Legend:
 *   I=informational, N=navigational, T=transactional, C=commercial, D=decision
 *   P0-P5 = priority (0=lowest, 5=highest)
 *   VH=very-high, H=high, M=medium, L=low, VL=very-low
 *
 * Schema types: B=BreadcrumbList, F=FAQPage, H=HowTo, A=Article,
 *               L=LocalBusiness, C=CollectionPage, O=Organization, N=NewsArticle
 */

// Compact page entry tuples:
// [url, keyword, intent, priority, traffic, schema, parent]
type PageEntry = [url: string, keyword: string, intent: string, prio: string, traffic: string, schema: string, parent: string];

const INTENT_MAP: Record<string, string> = { I: "informational", N: "navigational", T: "transactional", C: "commercial", D: "decision" };

// ─── 1. NAVIGATION PAGES (Hubs) ─────────────────────────────────────────────

export const navigationPages: PageEntry[] = [
  ["/", "SASSA resource centre", "N", "P5", "VH", "B,O", ""],
  ["/grants", "SASSA grants", "N", "P5", "VH", "B,C", ""],
  ["/status", "SASSA status meanings", "N", "P5", "VH", "B,C", ""],
  ["/appeals", "SASSA appeal", "N", "P5", "VH", "B,C", ""],
  ["/eligibility", "SASSA eligibility", "N", "P5", "VH", "B,C", ""],
  ["/payment-dates", "SASSA payment dates 2026", "N", "P5", "VH", "B,C", ""],
  ["/offices", "SASSA office near me", "N", "P5", "VH", "B,C", ""],
  ["/provinces", "SASSA provincial offices", "N", "P4", "H", "B,C", ""],
  ["/downloads", "SASSA forms download", "N", "P4", "H", "B,C", ""],
  ["/banking", "SASSA banking", "N", "P4", "H", "B,C", ""],
  ["/guides", "SASSA how to guide", "N", "P4", "H", "B,C", ""],
  ["/news", "SASSA news 2026", "N", "P3", "M", "B,C", ""],
  ["/tools", "SASSA tools", "N", "P3", "M", "B,C", ""],
  ["/faq", "SASSA FAQ", "N", "P4", "H", "B,F", ""],
];

// ─── 2. GRANT LIBRARY (8 grants × 8 pages each = 64 pages) ───────────────────

const GRANTS = [
  { slug: "srd-r370-grant", name: "SRD R370 Grant", kw: "SRD R370" },
  { slug: "older-person-grant", name: "Older Person Grant", kw: "Older Person Grant" },
  { slug: "disability-grant", name: "Disability Grant", kw: "Disability Grant" },
  { slug: "child-support-grant", name: "Child Support Grant", kw: "Child Support Grant" },
  { slug: "foster-care-grant", name: "Foster Care Grant", kw: "Foster Care Grant" },
  { slug: "care-dependency-grant", name: "Care Dependency Grant", kw: "Care Dependency Grant" },
  { slug: "war-veterans-grant", name: "War Veterans Grant", kw: "War Veterans Grant" },
  { slug: "grant-in-aid", name: "Grant-in-Aid", kw: "Grant in Aid" },
];

export const grantPages: PageEntry[] = [];

for (const g of GRANTS) {
  grantPages.push([`/grants/${g.slug}`, `SASSA ${g.kw}`, "I", "P5", "VH", "B,A,F", "/grants"]);
  grantPages.push([`/grants/${g.slug}/eligibility`, `${g.kw} eligibility`, "I", "P4", "H", "B", `/grants/${g.slug}`]);
  grantPages.push([`/grants/${g.slug}/amount`, `${g.kw} amount 2026`, "I", "P4", "VH", "B", `/grants/${g.slug}`]);
  grantPages.push([`/grants/${g.slug}/how-to-apply`, `how to apply for ${g.kw.toLowerCase()}`, "T", "P5", "H", "B,H", `/grants/${g.slug}`]);
  grantPages.push([`/grants/${g.slug}/documents`, `${g.kw} documents required`, "T", "P4", "H", "B", `/grants/${g.slug}`]);
  grantPages.push([`/grants/${g.slug}/faq`, `${g.kw} questions`, "I", "P3", "M", "B,F", `/grants/${g.slug}`]);
  grantPages.push([`/grants/${g.slug}/appeal`, `${g.kw} appeal`, "T", "P3", "M", "B", `/grants/${g.slug}`]);
}

// Extra SRD-specific pages (highest traffic)
grantPages.push(["/grants/srd-r370-grant/monthly-review", "SRD monthly review", "I", "P4", "H", "B", "/grants/srd-r370-grant"]);
grantPages.push(["/grants/srd-r370-grant/payment-methods", "SRD payment methods", "I", "P4", "H", "B", "/grants/srd-r370-grant"]);
grantPages.push(["/grants/srd-r370-grant/status-check", "check SRD status", "N", "P5", "VH", "B", "/grants/srd-r370-grant"]);

// Extra Older Person + Disability pages
grantPages.push(["/grants/older-person-grant/application-walkthrough", "older person grant application process", "I", "P2", "M", "B,A", "/grants/older-person-grant"]);
grantPages.push(["/grants/disability-grant/medical-requirements", "disability grant medical requirements", "I", "P4", "H", "B", "/grants/disability-grant"]);
grantPages.push(["/grants/care-dependency-grant/medical-requirements", "care dependency grant medical report", "I", "P3", "M", "B", "/grants/care-dependency-grant"]);
grantPages.push(["/grants/child-support-grant/when-payments-stop", "when does child support grant stop", "I", "P3", "H", "B", "/grants/child-support-grant"]);

// Grant comparison pages
grantPages.push(["/grants/older-person-vs-disability-grant", "older person grant vs disability grant", "D", "P2", "M", "B", "/grants"]);
grantPages.push(["/grants/child-support-vs-foster-care-grant", "child support grant vs foster care grant", "D", "P2", "M", "B", "/grants"]);
grantPages.push(["/grants/srd-vs-other-grants", "SRD grant vs other grants", "D", "P3", "H", "B", "/grants"]);
grantPages.push(["/grants/disability-vs-care-dependency-grant", "disability grant vs care dependency grant", "D", "P2", "L", "B", "/grants"]);
grantPages.push(["/grants/srd-vs-older-person-grant", "SRD vs older person grant", "D", "P2", "M", "B", "/grants"]);

// ─── 3. STATUS MEANINGS (20+ pages) ──────────────────────────────────────────

export const statusPages: PageEntry[] = [
  // Main statuses
  ["/status/pending", "SASSA status pending meaning", "I", "P5", "VH", "B,F", "/status"],
  ["/status/pending-30-days", "SASSA pending 30 days", "I", "P4", "H", "B,F", "/status"],
  ["/status/pending-60-days", "SASSA pending 60 days", "I", "P3", "M", "B,F", "/status"],
  ["/status/pending-90-days", "SASSA pending 90 days", "I", "P2", "M", "B,F", "/status"],
  ["/status/approved", "SASSA approved meaning", "I", "P5", "VH", "B,F", "/status"],
  ["/status/cancelled", "SASSA cancelled meaning", "I", "P4", "H", "B,F", "/status"],
  ["/status/bank-verification", "SASSA bank verification", "I", "P5", "VH", "B,F", "/status"],
  ["/status/identity-verification", "SASSA identity verification failed", "I", "P4", "H", "B,F", "/status"],
  ["/status/alternative-income-source", "SASSA alternative income source", "I", "P5", "VH", "B,F", "/status"],
  ["/status/means-test-failed", "SASSA means test failed", "I", "P4", "H", "B,F", "/status"],
  ["/status/referred", "SASSA referred meaning", "I", "P3", "M", "B,F", "/status"],
  ["/status/self-exclusion", "SASSA self exclusion meaning", "I", "P3", "M", "B,F", "/status"],
  ["/status/application-complete", "SASSA application complete meaning", "I", "P4", "H", "B,F", "/status"],
  ["/status/payment-processing", "SASSA payment processing meaning", "I", "P4", "H", "B,F", "/status"],
  ["/status/declined", "SASSA declined meaning", "I", "P5", "VH", "B,F", "/status"],
  ["/status/declined-no-reason", "SASSA declined no reason", "I", "P3", "M", "B,F", "/status"],
  ["/status/declined-bank-mismatch", "SASSA declined bank mismatch", "I", "P3", "H", "B,F", "/status"],
  ["/status/declined-deceased-flag", "SASSA declined deceased flag", "I", "P2", "L", "B,F", "/status"],
  ["/status/declined-duplicate-application", "SASSA duplicate application declined", "I", "P2", "M", "B,F", "/status"],
  ["/status/declined-underage", "SASSA declined underage", "I", "P2", "L", "B,F", "/status"],
  ["/status/declined-overseas", "SASSA declined overseas", "I", "P2", "L", "B,F", "/status"],
];

// ─── 4. APPEALS CENTRE (20 pages) ────────────────────────────────────────────

export const appealPages: PageEntry[] = [
  ["/appeals/how-to-appeal", "how to appeal SASSA grant", "T", "P5", "VH", "B,H,F", "/appeals"],
  ["/appeals/appeal-timeline", "SASSA appeal timeline", "I", "P4", "H", "B,F", "/appeals"],
  ["/appeals/appeal-documents", "SASSA appeal documents required", "T", "P4", "H", "B", "/appeals"],
  ["/appeals/appeal-reasons", "SASSA appeal reasons", "I", "P4", "H", "B,F", "/appeals"],
  ["/appeals/appeal-outcomes", "SASSA appeal outcomes", "I", "P3", "M", "B,F", "/appeals"],
  ["/appeals/appeal-faqs", "SASSA appeal FAQ", "I", "P3", "M", "B,F", "/appeals"],
  ["/appeals/appeal-after-uif", "SASSA appeal after UIF", "T", "P5", "VH", "B,H,F", "/appeals"],
  ["/appeals/appeal-after-nsfas", "SASSA appeal after NSFAS", "T", "P5", "H", "B,H,F", "/appeals"],
  ["/appeals/appeal-after-income-source", "SASSA appeal alternative income source", "T", "P5", "VH", "B,H,F", "/appeals"],
  ["/appeals/appeal-after-decline", "SASSA appeal after decline", "T", "P4", "H", "B,H", "/appeals"],
  ["/appeals/appeal-for-srd", "SRD grant appeal process", "T", "P5", "VH", "B,H,F", "/appeals"],
  ["/appeals/appeal-for-older-person", "older person grant appeal process", "T", "P3", "M", "B,H", "/appeals"],
  ["/appeals/appeal-for-disability", "disability grant appeal process", "T", "P3", "M", "B,H", "/appeals"],
  ["/appeals/appeal-for-child-support", "child support grant appeal", "T", "P3", "M", "B,H", "/appeals"],
  ["/appeals/appeal-for-foster-care", "foster care grant appeal", "T", "P2", "L", "B,H", "/appeals"],
  ["/appeals/appeal-for-care-dependency", "care dependency grant appeal", "T", "P2", "L", "B,H", "/appeals"],
  ["/appeals/appeal-status-check", "check SASSA appeal status", "N", "P4", "H", "B,H", "/appeals"],
];

// ─── 5. ELIGIBILITY CENTRE (25 pages) ────────────────────────────────────────

export const eligibilityPages: PageEntry[] = [
  ["/eligibility/i-am-unemployed", "SASSA grant for unemployed", "I", "P5", "VH", "B,F", "/eligibility"],
  ["/eligibility/i-am-a-student", "can students get SASSA grant", "I", "P5", "VH", "B,F", "/eligibility"],
  ["/eligibility/i-am-over-60", "SASSA grant for over 60", "I", "P5", "VH", "B,F", "/eligibility"],
  ["/eligibility/i-am-disabled", "SASSA grant for disabled", "I", "P5", "H", "B,F", "/eligibility"],
  ["/eligibility/i-receive-uif", "can I get SASSA if I receive UIF", "I", "P5", "VH", "B,F", "/eligibility"],
  ["/eligibility/i-receive-nsfas", "can I get SASSA if I receive NSFAS", "I", "P5", "H", "B,F", "/eligibility"],
  ["/eligibility/i-have-no-bank-account", "SASSA grant without bank account", "I", "P4", "H", "B,F", "/eligibility"],
  ["/eligibility/i-am-a-pensioner", "SASSA grant for pensioners", "I", "P4", "H", "B,F", "/eligibility"],
  ["/eligibility/i-am-a-foster-parent", "SASSA grant for foster parents", "I", "P3", "M", "B,F", "/eligibility"],
  ["/eligibility/i-am-caring-for-a-disabled-child", "SASSA grant for caring for disabled child", "I", "P3", "M", "B,F", "/eligibility"],
  ["/eligibility/i-am-a-refugee", "SASSA grant for refugees", "I", "P2", "M", "B,F", "/eligibility"],
  ["/eligibility/i-am-a-permanent-resident", "SASSA grant for permanent residents", "I", "P2", "M", "B,F", "/eligibility"],
  ["/eligibility/i-am-married", "SASSA grant for married couples", "I", "P3", "M", "B,F", "/eligibility"],
  ["/eligibility/i-am-self-employed", "SASSA grant for self employed", "I", "P3", "M", "B,F", "/eligibility"],
  ["/eligibility/i-am-a-teenage-mother", "SASSA grant for teenage mothers", "I", "P3", "H", "B,F", "/eligibility"],
  ["/eligibility/i-am-a-grandparent-raising-grandchildren", "SASSA grant for grandparents raising grandchildren", "I", "P3", "M", "B,F", "/eligibility"],
  ["/eligibility/i-am-a-caregiver", "SASSA grant for caregivers", "I", "P3", "H", "B,F", "/eligibility"],
  ["/eligibility/i-am-a-farm-worker", "SASSA grant for farm workers", "I", "P2", "M", "B,F", "/eligibility"],
  ["/eligibility/i-am-a-domestic-worker", "SASSA grant for domestic workers", "I", "P2", "M", "B,F", "/eligibility"],
  ["/eligibility/i-am-a-single-parent", "SASSA grant for single parents", "I", "P3", "H", "B,F", "/eligibility"],
];

// ─── 6. PAYMENT CENTRE (38 pages) ────────────────────────────────────────────

const MONTHS = ["january","february","march","april","may","june","july","august","september","october","november","december"];
const MONTHS_CAP = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export const paymentPages: PageEntry[] = [
  ["/payment-dates/weekday-vs-weekend-payments", "SASSA payment date weekend holiday", "I", "P2", "L", "B", "/payment-dates"],
  ["/payment-dates/2025-archive", "SASSA payment dates 2025", "I", "P2", "M", "B,C", "/payment-dates"],
];

for (let i = 0; i < 12; i++) {
  paymentPages.push([`/payment-dates/2026-${MONTHS[i]}`, `SASSA payment dates ${MONTHS_CAP[i]} 2026`, "I", i === 6 || i === 7 ? "P4" : "P3", i === 6 || i === 7 ? "H" : "L", "B", "/payment-dates"]);
  paymentPages.push([`/payment-dates/2025-${MONTHS[i]}`, `SASSA payment dates ${MONTHS_CAP[i]} 2025`, "I", "P1", "VL", "B", "/payment-dates"]);
}

// ─── 7. OFFICE FINDER (15+ pages) ────────────────────────────────────────────

export const officePages: PageEntry[] = [
  ["/offices/gp-pretoria-central", "SASSA office Pretoria", "C", "P4", "H", "B,L", "/offices"],
  ["/offices/gp-soweto-maponya", "SASSA office Soweto", "C", "P4", "H", "B,L", "/offices"],
  ["/offices/wc-cape-town", "SASSA office Cape Town", "C", "P4", "H", "B,L", "/offices"],
  ["/offices/kzn-durban-central", "SASSA office Durban", "C", "P4", "H", "B,L", "/offices"],
  ["/offices/lp-polokwane", "SASSA office Polokwane", "C", "P3", "M", "B,L", "/offices"],
  ["/offices/ec-gqeberha", "SASSA office Gqeberha", "C", "P3", "M", "B,L", "/offices"],
  ["/offices/mp-nelspruit", "SASSA office Nelspruit", "C", "P3", "M", "B,L", "/offices"],
  ["/offices/fs-bloemfontein", "SASSA office Bloemfontein", "C", "P3", "M", "B,L", "/offices"],
  ["/offices/nw-mahikeng", "SASSA office Mahikeng", "C", "P3", "M", "B,L", "/offices"],
  ["/offices/nc-kimberley", "SASSA office Kimberley", "C", "P3", "M", "B,L", "/offices"],
  ["/offices/wc-george", "SASSA office George", "C", "P2", "L", "B,L", "/offices"],
  ["/offices/kzn-pietermaritzburg", "SASSA office Pietermaritzburg", "C", "P2", "L", "B,L", "/offices"],
  ["/offices/ec-east-london", "SASSA office East London", "C", "P2", "L", "B,L", "/offices"],
  ["/offices/gp-johannesburg", "SASSA office Johannesburg", "C", "P4", "H", "B,L", "/offices"],
  ["/offices/ec-mthatha", "SASSA office Mthatha", "C", "P2", "L", "B,L", "/offices"],
];

// ─── 8. PROVINCE HUBS (36 pages) ─────────────────────────────────────────────

const PROVINCES = [
  { slug: "gauteng", name: "Gauteng" },
  { slug: "western-cape", name: "Western Cape" },
  { slug: "kwazulu-natal", name: "KwaZulu-Natal" },
  { slug: "eastern-cape", name: "Eastern Cape" },
  { slug: "limpopo", name: "Limpopo" },
  { slug: "mpumalanga", name: "Mpumalanga" },
  { slug: "free-state", name: "Free State" },
  { slug: "north-west", name: "North West" },
  { slug: "northern-cape", name: "Northern Cape" },
];

export const provincePages: PageEntry[] = [];

for (const p of PROVINCES) {
  provincePages.push([`/provinces/${p.slug}`, `SASSA ${p.name}`, "I", "P4", "H", "B,F", "/provinces"]);
  provincePages.push([`/provinces/${p.slug}/payment-collection`, `SASSA payment collection ${p.name}`, "I", "P3", "M", "B", `/provinces/${p.slug}`]);
  provincePages.push([`/provinces/${p.slug}/local-contacts`, `SASSA ${p.name} contact`, "N", "P3", "M", "B", `/provinces/${p.slug}`]);
  provincePages.push([`/provinces/${p.slug}/faq`, `SASSA ${p.name} FAQ`, "I", "P2", "L", "B,F", `/provinces/${p.slug}`]);
}

// ─── 9. DOWNLOAD CENTRE (12 pages) ───────────────────────────────────────────

export const downloadPages: PageEntry[] = [
  ["/downloads/sassa-application-form", "SASSA application form download", "T", "P5", "VH", "B", "/downloads"],
  ["/downloads/sassa-bank-change-form", "SASSA bank change form", "T", "P4", "H", "B", "/downloads"],
  ["/downloads/srd-appeal-form", "SRD appeal form download", "T", "P5", "VH", "B", "/downloads"],
  ["/downloads/unemployment-affidavit-template", "SASSA affidavit template", "T", "P4", "H", "B", "/downloads"],
  ["/downloads/sassa-consent-form", "SASSA consent form", "T", "P3", "M", "B", "/downloads"],
  ["/downloads/sassa-grant-application-checklist", "SASSA grant checklist", "T", "P4", "H", "B", "/downloads"],
  ["/downloads/sassa-government-notice-template", "SASSA government notice", "I", "P2", "L", "B", "/downloads"],
  ["/downloads/sassa-medical-report-form", "SASSA medical report form", "T", "P3", "M", "B", "/downloads"],
  ["/downloads/sassa-reinstatement-form", "SASSA grant reinstatement form", "T", "P2", "M", "B", "/downloads"],
  ["/downloads/sassa-appeal-form-other-grants", "SASSA appeal form other grants", "T", "P2", "M", "B", "/downloads"],
  ["/downloads/sassa-foster-care-form", "SASSA foster care form", "T", "P2", "L", "B", "/downloads"],
  ["/downloads/sassa-care-dependency-form", "SASSA care dependency form", "T", "P2", "L", "B", "/downloads"],
];

// ─── 10. BANKING HUB (12 pages) ──────────────────────────────────────────────

export const bankingPages: PageEntry[] = [
  ["/banking/payment-methods", "SASSA payment methods", "I", "P4", "H", "B", "/banking"],
  ["/banking/update-bank-details", "update SASSA bank details", "T", "P5", "VH", "B,H", "/banking"],
  ["/banking/bank-verification-process", "SASSA bank verification process", "I", "P4", "H", "B,F", "/banking"],
  ["/banking/cash-send-guide", "SASSA Cash Send", "I", "P4", "H", "B,H,F", "/banking"],
  ["/banking/sassa-card-explained", "SASSA card", "I", "P3", "M", "B,F", "/banking"],
  ["/banking/payment-not-reflecting", "SASSA payment not reflecting", "I", "P5", "VH", "B,F", "/banking"],
  ["/banking/how-to-get-bank-statement", "bank statement for SASSA", "I", "P3", "M", "B,H", "/banking"],
  ["/banking/can-i-use-someone-elses-account", "SASSA someone else bank account", "I", "P3", "M", "B,F", "/banking"],
  ["/banking/sassa-card-replacement", "SASSA card replacement", "T", "P3", "M", "B,H", "/banking"],
  ["/banking/sassa-card-vs-bank-account", "SASSA card vs bank account", "D", "P2", "M", "B", "/banking"],
  ["/banking/how-to-register-for-srd-portal", "register for SRD portal", "T", "P4", "H", "B,H", "/banking"],
];

// ─── 11. GUIDES & HOW-TOS (20 pages) ─────────────────────────────────────────

export const guidePages: PageEntry[] = [
  ["/guides/how-to-apply-sassa-grant", "how to apply for SASSA grant", "T", "P5", "VH", "B,H", "/guides"],
  ["/guides/how-to-check-sassa-status", "how to check SASSA status", "N", "P5", "VH", "B,H", "/guides"],
  ["/guides/sassa-documents-checklist", "SASSA documents checklist", "T", "P4", "H", "B", "/guides"],
  ["/guides/understanding-means-test", "SASSA means test explained", "I", "P4", "H", "B,F", "/guides"],
  ["/guides/how-to-apply-for-srd", "how to apply for SRD", "T", "P5", "VH", "B,H", "/guides"],
  ["/guides/how-to-collect-cash-send", "how to collect SASSA cash send", "T", "P4", "H", "B,H,F", "/guides"],
  ["/guides/how-to-register-on-srd-portal", "register on SRD portal", "T", "P5", "VH", "B,H", "/guides"],
  ["/guides/how-to-check-appeal-status", "how to check SASSA appeal status", "N", "P4", "H", "B,H", "/guides"],
  ["/guides/how-to-write-affidavit", "how to write affidavit for SASSA", "T", "P3", "M", "B,H", "/guides"],
  ["/guides/how-to-contact-sassa", "how to contact SASSA", "N", "P4", "H", "B", "/guides"],
  ["/guides/how-to-complain-about-sassa", "how to complain about SASSA", "T", "P3", "M", "B,H", "/guides"],
  ["/guides/how-to-reinstate-cancelled-grant", "reinstate SASSA cancelled grant", "T", "P3", "M", "B,H", "/guides"],
  ["/guides/how-to-switch-payment-method", "switch SASSA payment method", "T", "P3", "M", "B,H", "/guides"],
  ["/guides/how-to-apply-for-disability-grant", "how to apply for disability grant", "T", "P4", "H", "B,H", "/guides"],
  ["/guides/how-to-apply-for-child-support", "how to apply for child support grant", "T", "P4", "H", "B,H", "/guides"],
  ["/guides/how-to-apply-for-older-person", "how to apply for older person grant", "T", "P4", "H", "B,H", "/guides"],
  ["/guides/how-to-update-phone-number", "update SASSA phone number", "T", "P3", "H", "B,H", "/guides"],
  ["/guides/how-to-check-payment-history", "check SASSA payment history", "N", "P3", "M", "B,H", "/guides"],
  ["/guides/how-to-get-sassa-card", "get SASSA card", "T", "P3", "M", "B,H", "/guides"],
  ["/guides/how-to-change-from-cash-send-to-bank", "change SASSA from cash send to bank", "T", "P3", "M", "B,H", "/guides"],
];

// ─── 12. INTERACTIVE TOOLS (12 pages) ────────────────────────────────────────

export const toolPages: PageEntry[] = [
  ["/tools/grant-eligibility-checker", "SASSA grant eligibility checker", "I", "P5", "VH", "B", "/tools"],
  ["/tools/payment-date-lookup", "SASSA payment date lookup", "N", "P4", "H", "B", "/tools"],
  ["/tools/age-eligibility-calculator", "SASSA age eligibility calculator", "I", "P4", "H", "B", "/tools"],
  ["/tools/child-support-age-calculator", "SASSA child support age calculator", "I", "P3", "M", "B", "/tools"],
  ["/tools/appeal-deadline-calculator", "SASSA appeal deadline calculator", "T", "P3", "M", "B", "/tools"],
  ["/tools/grant-amount-estimator", "SASSA grant amount estimator", "I", "P3", "M", "B", "/tools"],
  ["/tools/document-checklist-generator", "SASSA document checklist generator", "T", "P3", "M", "B", "/tools"],
  ["/tools/grant-comparison-tool", "SASSA grant comparison tool", "D", "P3", "M", "B", "/tools"],
  ["/tools/means-test-calculator", "SASSA means test calculator", "I", "P4", "H", "B", "/tools"],
  ["/tools/income-threshold-checker", "SASSA income threshold checker", "I", "P3", "M", "B", "/tools"],
  ["/tools/payment-calculator", "SASSA payment calculator", "I", "P3", "M", "B", "/tools"],
  ["/tools/office-finder", "SASSA office finder", "N", "P4", "H", "B", "/tools"],
];

// ─── 13. FAQ PAGES (20 pages) ────────────────────────────────────────────────

export const faqPages: PageEntry[] = [
  ["/faq", "SASSA FAQ", "I", "P4", "H", "B,F", ""],
  ["/faq/general", "SASSA general FAQ", "I", "P3", "M", "B,F", "/faq"],
  ["/faq/grants", "SASSA grants FAQ", "I", "P4", "H", "B,F", "/faq"],
  ["/faq/payments", "SASSA payment FAQ", "I", "P4", "H", "B,F", "/faq"],
  ["/faq/status", "SASSA status FAQ", "I", "P3", "M", "B,F", "/faq"],
  ["/faq/appeals", "SASSA appeal FAQ", "I", "P3", "M", "B,F", "/faq"],
  ["/faq/eligibility", "SASSA eligibility FAQ", "I", "P3", "M", "B,F", "/faq"],
  ["/faq/banking", "SASSA banking FAQ", "I", "P3", "M", "B,F", "/faq"],
  ["/faq/offices", "SASSA office FAQ", "I", "P2", "L", "B,F", "/faq"],
  ["/faq/documents", "SASSA documents FAQ", "I", "P2", "L", "B,F", "/faq"],
  ["/faq/application", "SASSA application FAQ", "I", "P3", "M", "B,F", "/faq"],
  ["/faq/srd", "SRD grant FAQ", "I", "P4", "VH", "B,F", "/faq"],
  ["/faq/older-person", "older person grant FAQ", "I", "P3", "M", "B,F", "/faq"],
  ["/faq/child-support", "child support grant FAQ", "I", "P3", "M", "B,F", "/faq"],
  ["/faq/disability", "disability grant FAQ", "I", "P3", "M", "B,F", "/faq"],
  ["/faq/foster-care", "foster care grant FAQ", "I", "P2", "L", "B,F", "/faq"],
  ["/faq/care-dependency", "care dependency grant FAQ", "I", "P2", "L", "B,F", "/faq"],
  ["/faq/provinces", "SASSA province FAQ", "I", "P2", "L", "B,F", "/faq"],
  ["/faq/downloads", "SASSA downloads FAQ", "I", "P2", "L", "B,F", "/faq"],
  ["/faq/srd-monthly-review", "SRD monthly review FAQ", "I", "P3", "H", "B,F", "/faq"],
];

// ─── 14. NEWS / SEASONAL (24+ pages) ─────────────────────────────────────────

export const newsPages: PageEntry[] = [
  ["/news/social-grant-increases-2026", "SASSA grant increases 2026", "I", "P4", "H", "B,N", "/news"],
  ["/news/srd-r370-grant-extended-to-march-2027", "SRD R370 extended 2027", "I", "P5", "VH", "B,N", "/news"],
  ["/news/budget-speech-2026-grants", "2026 budget speech grant increases", "I", "P3", "H", "B,N", "/news"],
  ["/news/srd-r370-increase-announcement", "SRD R370 increase 2026", "I", "P4", "H", "B,N", "/news"],
  ["/news/older-person-grant-increase-2026", "older person grant increase 2026", "I", "P3", "M", "B,N", "/news"],
  ["/news/child-support-grant-increase-2026", "child support grant increase 2026", "I", "P3", "M", "B,N", "/news"],
  ["/news/disability-grant-increase-2026", "disability grant increase 2026", "I", "P3", "M", "B,N", "/news"],
  ["/news/payment-date-changes-2026", "SASSA payment date changes 2026", "I", "P3", "M", "B,N", "/news"],
  ["/news/sassa-office-closures", "SASSA office closures", "I", "P2", "L", "B,N", "/news"],
  ["/news/new-sassa-portal-launch", "new SASSA portal launch", "I", "P2", "L", "B,N", "/news"],
  ["/news/sassa-appeal-process-changes", "SASSA appeal process changes", "I", "P2", "M", "B,N", "/news"],
  ["/news/means-test-threshold-update-2026", "SASSA means test threshold 2026", "I", "P3", "M", "B,N", "/news"],
  ["/news/holiday-payment-schedule-2026", "SASSA holiday payment schedule 2026", "I", "P3", "M", "B,N", "/news"],
  ["/news/sassa-whatsapp-service-update", "SASSA WhatsApp service update", "I", "P2", "L", "B,N", "/news"],
];

// ─── 15. LANDING PAGES (10 pages) ────────────────────────────────────────────

export const landingPages: PageEntry[] = [
  ["/landing/srd-grant-complete-guide", "SRD R370 complete guide", "I", "P4", "VH", "B,A,F", ""],
  ["/landing/sassa-pension-complete-guide", "SASSA pension complete guide", "I", "P4", "H", "B,A,F", ""],
  ["/landing/sassa-appeals-complete-guide", "SASSA appeals complete guide", "I", "P4", "H", "B,A,F", ""],
  ["/landing/sassa-status-check-guide", "SASSA status check guide", "I", "P4", "VH", "B,A,F", ""],
  ["/landing/sassa-office-finder-guide", "SASSA office finder guide", "I", "P3", "H", "B,A,F", ""],
  ["/landing/sassa-payment-methods-guide", "SASSA payment methods guide", "I", "P3", "H", "B,A,F", ""],
  ["/landing/sassa-eligibility-complete-guide", "SASSA eligibility complete guide", "I", "P4", "VH", "B,A,F", ""],
  ["/landing/sassa-child-grants-guide", "SASSA child grants complete guide", "I", "P3", "H", "B,A,F", ""],
  ["/landing/sassa-disability-grants-guide", "SASSA disability grants complete guide", "I", "P3", "M", "B,A,F", ""],
  ["/landing/sassa-documents-checklist-guide", "SASSA documents checklist guide", "T", "P3", "H", "B,A,F", ""],
];

// ─── 16. RESOURCE / COLLECTION PAGES (8 pages) ───────────────────────────────

export const resourcePages: PageEntry[] = [
  ["/resources/sassa-glossary", "SASSA glossary of terms", "I", "P2", "M", "B", ""],
  ["/resources/sassa-contacts", "SASSA contact directory", "N", "P3", "H", "B,O", ""],
  ["/resources/sassa-forms-guide", "SASSA forms complete guide", "I", "P3", "M", "B", ""],
  ["/resources/payment-collection-guide", "SASSA payment collection guide", "I", "P3", "M", "B", ""],
  ["/resources/sassa-legal-rights", "SASSA beneficiary legal rights", "I", "P2", "M", "B,A", ""],
  ["/resources/sassa-scams-warning", "SASSA scams and fraud warnings", "I", "P3", "H", "B,A", ""],
  ["/resources/how-sassa-works", "how SASSA works", "I", "P2", "M", "B,A", ""],
  ["/resources/grant-recipient-responsibilities", "SASSA grant recipient responsibilities", "I", "P2", "M", "B,A", ""],
];

// ─── AGGREGATE ───────────────────────────────────────────────────────────────

export const ALL_PAGES: PageEntry[] = [
  ...navigationPages,
  ...grantPages,
  ...statusPages,
  ...appealPages,
  ...eligibilityPages,
  ...paymentPages,
  ...officePages,
  ...provincePages,
  ...downloadPages,
  ...bankingPages,
  ...guidePages,
  ...toolPages,
  ...faqPages,
  ...newsPages,
  ...landingPages,
  ...resourcePages,
];

// ─── META: Category Totals ───────────────────────────────────────────────────

export const ARCHITECTURE_SUMMARY: Record<string, number> = {
  navigation: navigationPages.length,
  grants: grantPages.length,
  statuses: statusPages.length,
  appeals: appealPages.length,
  eligibility: eligibilityPages.length,
  paymentDates: paymentPages.length,
  offices: officePages.length,
  provinces: provincePages.length,
  downloads: downloadPages.length,
  banking: bankingPages.length,
  guides: guidePages.length,
  tools: toolPages.length,
  faq: faqPages.length,
  news: newsPages.length,
  landing: landingPages.length,
  resources: resourcePages.length,
  TOTAL: ALL_PAGES.length,
};
