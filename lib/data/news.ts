export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    id: "srd-extended-2027",
    slug: "srd-r370-grant-extended-to-march-2027",
    title: "SRD R370 Grant Extended to March 2027",
    date: "2026-06-15",
    summary: "Government confirms the Social Relief of Distress grant at R370 per month will continue until at least March 2027.",
    content: "The South African government has confirmed that the SRD R370 grant will be extended through to March 2027. The extension ensures continued support for millions of unemployed South Africans. Beneficiaries do not need to reapply — existing applications will continue to be evaluated on a monthly basis.\n\nKey points:\n- The grant remains at R370 per month\n- Eligibility criteria remain unchanged\n- Monthly bank verification continues\n- Appeals process remains active for declined months\n\nBeneficiaries should continue checking their status on the SRD portal each month.",
    tags: ["SRD", "R370", "extension", "government"],
  },
  {
    id: "grant-increase-2026",
    slug: "social-grant-increases-2026",
    title: "Social Grant Increases Announced for 2026",
    date: "2026-02-20",
    summary: "Annual social grant increases announced in the 2026 national budget. Older Person Grant rises to R2,400 per month.",
    content: "The Minister of Finance announced the annual social grant increases during the 2026 budget speech. The increases are effective from April 2026.\n\nNew monthly amounts:\n- Older Person Grant: R2,400 (R2,420 for ages 75+)\n- Disability Grant: R2,400\n- Foster Care Grant: R1,295\n- Child Support Grant: R580\n- Care Dependency Grant: R2,400\n- War Veterans Grant: R2,420\n- Grant-in-Aid: R580\n- SRD R370 Grant: R370 (unchanged)\n\nBeneficiaries do not need to take any action — increases are applied automatically.",
    tags: ["grant increase", "budget", "2026", "amounts"],
  },
  {
    id: "sassa-scam-warning-july-2026",
    slug: "sassa-scam-warning-july-2026",
    title: "SASSA Issues Fresh Scam Warning: Fake SMS Targeting SRD Beneficiaries",
    date: "2026-07-15",
    summary: "SASSA warns of a new SMS scam telling beneficiaries their grant has been stopped and directing them to a fake website. How to spot it and what to do.",
    content: "SASSA has issued an urgent fraud alert about a new wave of SMS scams targeting SRD R370 grant beneficiaries. The fake messages claim the recipient's grant has been 'stopped' or 'suspended' and include a link to a fraudulent website that mimics the official SASSA portal.\n\nHow the scam works:\n- You receive an SMS from an unknown number claiming to be SASSA\n- The message says your grant has been stopped and you need to 'verify' your details\n- A link takes you to a fake website that looks like srd.sassa.gov.za\n- The fake site asks for your ID number, bank details, and OTP\n\nWhat SASSA wants you to know:\n- SASSA never sends SMS messages with links asking you to verify your details\n- SASSA will never ask for your bank PIN, OTP, or online banking password\n- The only official SASSA website is sassa.gov.za\n- The only official SRD portal is srd.sassa.gov.za\n\nIf you receive a suspicious SMS:\n1. Do not click any links\n2. Delete the message immediately\n3. Report the number to SASSA on 0800 60 10 11\n4. If you entered your details, contact your bank immediately",
    tags: ["scam alert", "fraud", "SMS scam", "SRD", "security"],
  },
  {
    id: "srd-july-payment-update",
    slug: "srd-july-2026-payment-dates",
    title: "SRD R370 July 2026 Payments: Batch Schedule Confirmed",
    date: "2026-07-01",
    summary: "SASSA confirms SRD R370 payments for July 2026 will be processed from 23-24 July. Permanent grant dates also confirmed.",
    content: "SASSA has confirmed the payment schedule for July 2026. SRD R370 beneficiaries can expect their payments from 23 to 24 July 2026. This is earlier than the usual 25th start, as the 25th falls on a Saturday.\n\nJuly 2026 payment dates at a glance:\n- Older Persons Grant: 3 July 2026\n- Disability Grant: 4 July 2026\n- Children's Grants: 5 July 2026\n- SRD R370 Grant: 23-24 July 2026\n\nSRD beneficiaries are reminded that each month is assessed independently. Being approved in June does not guarantee July approval. Check your status on the SRD portal after the 15th of the month to see if you qualify for the July cycle.\n\nIf your SRD status shows 'Pending' for July, wait until after the 20th before following up. Processing volumes are highest at the start of each quarterly review cycle.",
    tags: ["SRD", "R370", "payment dates", "July 2026", "batch schedule"],
  },
  {
    id: "august-2026-payment-dates",
    slug: "august-2026-payment-dates",
    title: "August 2026 SASSA Payment Dates Confirmed — Fourth Day Added for Grant Reviews",
    date: "2026-07-29",
    summary: "SASSA confirms August 2026 payment dates: Older Persons 4 Aug, Disability 5 Aug, Children's 6 Aug, with an additional fourth day on 7 August for beneficiaries flagged for grant reviews.",
    content: "SASSA has confirmed the payment schedule for August 2026. This month introduces a notable change: a fourth payment day on 7 August has been added for beneficiaries who are flagged for grant reviews or require eLife certification verification.\n\nAugust 2026 payment dates at a glance:\n- Older Persons Grant: 4 August 2026\n- Disability Grant: 5 August 2026\n- Children's Grants: 6 August 2026\n- Review & Verification Day: 7 August 2026 (new)\n- SRD R370 Grant: 25-31 August 2026\n\nWhat is the fourth day (7 August)?\nSASSA has set aside 7 August as a dedicated day for grant review processing. If you received a notification about a grant review or incomplete eLife certification, this day is for resolving those matters. Beneficiaries who are not flagged will still receive their payments on the standard dates (4-6 August).\n\nKey points for beneficiaries:\n- Check your status before visiting a pay point. If you are not flagged, collect on your normal date.\n- If you are flagged, visit your nearest SASSA office on or before 7 August to complete your review.\n- SRD R370 payments run from 25-31 August as usual.\n- Bank transfers may take 1-3 business days to reflect after the official pay date.\n\nDo you need to collect on the 4th or the 7th?\nIf you received a letter or SMS from SASSA about a grant review, check the notification carefully. The date is specified in your notification. If you did not receive any notification, collect on your standard date (4th for Older Persons, 5th for Disability, 6th for Children's).",
    tags: ["payment dates", "August 2026", "grant review", "fourth day", "SASSA"],
  },
];

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}
