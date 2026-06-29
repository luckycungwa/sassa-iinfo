export interface DownloadableForm {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  purpose: string;
  howToFill: string[];
  documentChecklist: string[];
  approxSize: string;
  pdfPlaceholderContent: string;
}

export const downloadableForms: DownloadableForm[] = [
  {
    id: "sassa-application-form",
    slug: "sassa-application-form",
    title: "Official SASSA Social Grant Application Form",
    shortDescription: "The master application form required to apply for Older Person, Disability, and Child Support Grants.",
    purpose: "This is the legal registration document where you declare your personal details, marital status, income, assets, and details of children under your care.",
    howToFill: [
      "Use black ink only and write in clear block letters.",
      "Fill in your personal 13-digit ID number, surname, and full names matching your ID document.",
      "Check the box indicating which grant you are applying for (e.g., 'Older Person', 'Child Support').",
      "Declare your monthly income, assets, and specify any alternative funding sources.",
      "DO NOT sign the form until you are in front of a SASSA commissioner or local officer at the branch."
    ],
    documentChecklist: [
      "Original ID document or smart ID card.",
      "3 months certified bank statements.",
      "Proof of address (utility bill or chief's letter).",
      "Marital status certificates (if married/divorced/widowed)."
    ],
    approxSize: "1.2 MB (PDF)",
    pdfPlaceholderContent: "SASSA_SOCIAL_GRANT_APPLICATION_FORM_V2026.pdf"
  },
  {
    id: "bank-change-form",
    slug: "sassa-bank-change-form",
    title: "SASSA Consent Form for Bank Payment",
    shortDescription: "The form required to submit, update, or change your bank details for direct grant transfers.",
    purpose: "This form grants SASSA permission to pay your monthly social grant directly into your commercial bank account instead of cash points or retailers.",
    howToFill: [
      "Enter your active social grant number and 13-digit ID.",
      "Fill in your bank's name, account number, branch code, and account type (Savings/Cheque).",
      "Sign and date the consent section allowing SASSA to verify your details with the bank.",
      "Take this form to your bank to be officially stamped by a bank teller (mandatory step for validation)."
    ],
    documentChecklist: [
      "Original ID card.",
      "Official bank statement showing account owner's name and account details (must be stamped by bank).",
      "SASSA card or reference receipt."
    ],
    approxSize: "450 KB (PDF)",
    pdfPlaceholderContent: "SASSA_BANK_PAYMENT_CONSENT_FORM_V2026.pdf"
  },
  {
    id: "srd-appeal-form",
    slug: "srd-appeal-form",
    title: "SRD R370 Formal Appeal Application Template",
    shortDescription: "The appeal form template for lodging manual monthly appeals with the Independent Tribunal.",
    purpose: "Used by beneficiaries who are unable to access the online portal and wish to lodge their monthly SRD appeals via mail or physical delivery.",
    howToFill: [
      "State your name, ID, and phone number clearly.",
      "Check the specific calendar month you are appealing (e.g., 'June 2026').",
      "List the reason why you are contesting the decline status.",
      "Attach physical copies of your bank statements and unemployment affidavit."
    ],
    documentChecklist: [
      "Completed appeal application page.",
      "Certified copy of ID.",
      "Unemployment affidavit stamped by SAPS."
    ],
    approxSize: "580 KB (PDF)",
    pdfPlaceholderContent: "ITSAA_SRD_R370_APPEAL_FORM_TEMPLATE.pdf"
  }
];
