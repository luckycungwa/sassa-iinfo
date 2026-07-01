export interface BankingGuide {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: { heading: string; text: string }[];
}

export const bankingGuides: BankingGuide[] = [
  {
    id: "payment-methods",
    slug: "payment-methods",
    title: "SASSA Payment Methods",
    description: "How SASSA pays your social grant — bank transfer, cash send, and collection options.",
    content: [
      { heading: "Bank Transfer (EFT)", text: "SASSA deposits your grant directly into your personal South African bank account. Processing takes 1-3 business days after the official pay date. Your bank account must be registered in your own name and match your ID number exactly." },
      { heading: "Cash Send (Retail Collection)", text: "If you do not have a bank account, SASSA sends a cash voucher via SMS. Take the SMS and your ID to any participating retailer (Pick n Pay, Boxer, Shoprite, Checkers, USave) to collect your grant in cash." },
      { heading: "Post Office Collection", text: "Some beneficiaries collect their grants at designated South African Post Office branches. This option is being phased out in favour of bank transfers and retail collection." },
      { heading: "Mobile Pay Points", text: "In remote rural areas, SASSA operates mobile pay points on scheduled dates. Check your local SASSA office or province hub for the monthly schedule." },
    ],
  },
  {
    id: "update-bank-details",
    slug: "update-bank-details",
    title: "How to Update Your SASSA Bank Details",
    description: "Step-by-step guide to changing your bank account for grant payments.",
    content: [
      { heading: "Online Portal", text: "Log into the official SASSA SRD website (srd.sassa.gov.za). Navigate to 'Update Bank Details'. Enter your ID number, phone number, and the new bank account details. Verify with the OTP sent to your phone." },
      { heading: "SASSA Office Visit", text: "Visit your nearest SASSA local office with your ID and a official bank statement or letter from your bank confirming the new account. Complete the SASSA Consent Form for Bank Payment." },
      { heading: "Important Notes", text: "The bank account must be in your own name. SASSA will not pay grants into third-party accounts. Bank verification takes 5-10 business days. Do not close your old account until the first payment arrives in the new account." },
    ],
  },
  {
    id: "bank-verification",
    slug: "bank-verification-process",
    title: "SASSA Bank Verification Process Explained",
    description: "How SASSA verifies your bank account and what to do if verification fails.",
    content: [
      { heading: "How Verification Works", text: "SASSA uses an automated system that communicates with South Africa's major banks (Standard Bank, FNB, Absa, Nedbank, Capitec). The system checks that the ID number and name on the bank account match the SASSA applicant's details exactly." },
      { heading: "Why Verification Fails", text: "Common reasons: the bank account is registered under a different name, the ID number on the account does not match, the account has been dormant or frozen, or the account type does not support EFT deposits." },
      { heading: "What to Do If Verification Fails", text: "1. Check that the account details entered are 100% correct. 2. Visit your bank to confirm your account is active and registered under your exact ID. 3. If the problem persists, switch to Cash Send collection via retail outlet while resolving the bank issue." },
    ],
  },
];

export const allBankingContent = bankingGuides.flatMap((g) => g.content);

export function getBankingGuide(slug: string): BankingGuide | undefined {
  return bankingGuides.find((g) => g.slug === slug);
}
