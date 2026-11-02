/**
 * Single source of truth for the grant amounts displayed across the site.
 *
 * Figures reflect the 2026/27 national budget allocation. The Foster Care
 * Grant rose from R1 290 to R1 300 on 1 October 2026; every other amount has
 * been unchanged since the April 2026 increase. Update this file first, then
 * run `npm run validate:content`, so page copy cannot drift from the tables.
 */
export const GRANT_AMOUNTS_EFFECTIVE = "1 October 2026";

export const GRANT_AMOUNTS_SOURCE = {
  label: "National Treasury — 2026 Budget Review and social grant allocation",
  url: "https://www.treasury.gov.za/documents/national%20budget/default.aspx",
} as const;

export interface GrantAmount {
  slug: string;
  name: string;
  shortName: string;
  amount: string;
  amountValue: number;
  note?: string;
  href: string;
}

export const grantAmounts: GrantAmount[] = [
  {
    slug: "srd-r370-grant",
    name: "Social Relief of Distress (SRD R370)",
    shortName: "SRD R370",
    amount: "R370",
    amountValue: 370,
    note: "Paid per approved month; reviewed monthly.",
    href: "/grants/srd-r370-grant",
  },
  {
    slug: "older-person-grant",
    name: "Older Person Grant",
    shortName: "Older Person",
    amount: "R2,400",
    amountValue: 2400,
    note: "R2,420 for beneficiaries aged 75 and older.",
    href: "/grants/older-person-grant",
  },
  {
    slug: "disability-grant",
    name: "Disability Grant",
    shortName: "Disability",
    amount: "R2,400",
    amountValue: 2400,
    note: "Temporary and permanent disability grants.",
    href: "/grants/disability-grant",
  },
  {
    slug: "child-support-grant",
    name: "Child Support Grant",
    shortName: "Child Support",
    amount: "R580",
    amountValue: 580,
    note: "Per child, per month.",
    href: "/grants/child-support-grant",
  },
  {
    slug: "foster-care-grant",
    name: "Foster Care Grant",
    shortName: "Foster Care",
    amount: "R1,300",
    amountValue: 1300,
    note: "Rose from R1,290 to R1,300 on 1 October 2026.",
    href: "/grants/foster-care-grant",
  },
  {
    slug: "care-dependency-grant",
    name: "Care Dependency Grant",
    shortName: "Care Dependency",
    amount: "R2,400",
    amountValue: 2400,
    note: "For children with a severe disability.",
    href: "/grants/care-dependency-grant",
  },
  {
    slug: "war-veterans-grant",
    name: "War Veterans Grant",
    shortName: "War Veterans",
    amount: "R2,420",
    amountValue: 2420,
    href: "/grants/war-veterans-grant",
  },
  {
    slug: "grant-in-aid",
    name: "Grant-in-Aid",
    shortName: "Grant-in-Aid",
    amount: "R580",
    amountValue: 580,
    note: "A top-up for grant recipients who need full-time care.",
    href: "/grants/grant-in-aid",
  },
];

const amountsBySlug = new Map(grantAmounts.map((grant) => [grant.slug, grant]));

export function getGrantAmount(slug: string): GrantAmount | undefined {
  return amountsBySlug.get(slug);
}
