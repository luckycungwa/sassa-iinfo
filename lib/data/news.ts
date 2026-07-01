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
    summary: "Annual social grant increases announced in the 2026 national budget. Older Person Grant rises to R2,180 per month.",
    content: "The Minister of Finance announced the annual social grant increases during the 2026 budget speech. The increases are effective from April 2026.\n\nNew monthly amounts:\n- Older Person Grant: R2,180 (R2,200 for ages 75+)\n- Disability Grant: R2,180\n- Foster Care Grant: R1,180\n- Child Support Grant: R530\n- Care Dependency Grant: R2,180\n- War Veterans Grant: R2,200\n- Grant-in-Aid: R530\n- SRD R370 Grant: R370 (unchanged)\n\nBeneficiaries do not need to take any action — increases are applied automatically.",
    tags: ["grant increase", "budget", "2026", "amounts"],
  },
];

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}
