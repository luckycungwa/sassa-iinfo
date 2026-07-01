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
  },
  {
    id: "unemployment-affidavit",
    slug: "unemployment-affidavit-template",
    title: "SASSA Unemployment Affidavit Template",
    shortDescription: "Standard sworn affidavit template for declaring unemployment status to SASSA.",
    purpose: "This affidavit is required when applying for SASSA grants or appealing a decline. It serves as a sworn declaration under oath that you have no income or employment.",
    howToFill: [
      "Complete your personal details: full name, ID number, and residential address.",
      "State clearly that you are currently unemployed and receive no income.",
      "Sign the affidavit in the presence of a SAPS officer or commissioner of oaths.",
      "Do NOT sign before arriving at the police station — it must be sworn in front of the officer."
    ],
    documentChecklist: [
      "Blank affidavit form (download below).",
      "Your green ID book or smart ID card.",
      "Pen (black ink only for signatures)."
    ],
    approxSize: "120 KB (PDF)",
    pdfPlaceholderContent: "SASSA_UNEMPLOYMENT_AFFIDAVIT_TEMPLATE.pdf"
  },
  {
    id: "consent-form",
    slug: "sassa-consent-form",
    title: "SASSA Consent and Declaration Form",
    shortDescription: "General consent form authorising SASSA to verify your personal, financial, and medical information.",
    purpose: "This form grants SASSA permission to access third-party databases (Home Affairs, SARS, banks, medical boards) to verify the information provided in your grant application.",
    howToFill: [
      "Read each consent clause carefully before signing.",
      "Tick the boxes for the specific databases you authorise SASSA to check.",
      "Provide your full ID number, full names, and contact number.",
      "Sign and date in the presence of a SASSA official at the branch."
    ],
    documentChecklist: [
      "Original ID document.",
      "Application reference number (if reapplying).",
      "Proof of residence."
    ],
    approxSize: "340 KB (PDF)",
    pdfPlaceholderContent: "SASSA_CONSENT_DECLARATION_FORM_V2026.pdf"
  },
  {
    id: "grant-checklist",
    slug: "sassa-grant-application-checklist",
    title: "SASSA Grant Application Document Checklist",
    shortDescription: "Complete checklist of documents required when applying for any SASSA social grant.",
    purpose: "Use this checklist to ensure you have all required documents before visiting a SASSA office. Missing documents is the most common reason for application delays.",
    howToFill: [
      "Print the checklist and tick each item as you gather the document.",
      "Use the 'Notes' column to track which documents still need certification.",
      "Bring this checklist with you to your SASSA office appointment."
    ],
    documentChecklist: [
      "Original 13-digit green ID book or smart ID card.",
      "Certified copy of ID (must be stamped within last 6 months).",
      "Proof of residence (utility bill, tribal authority letter, or rental agreement).",
      "3 months bank statements (certified by the bank).",
      "Marital status documents (marriage certificate, divorce decree, death certificate of spouse).",
      "Medical report (for Disability Grant only — completed by a SASSA medical officer).",
      "Proof of any other income or benefits (UIF letter, pension slip, NSFAS letter).",
      "Children's birth certificates (for Child Support Grant applications).",
      "Court order (for Foster Care Grant applications).",
      "Completed application form (available at SASSA offices)."
    ],
    approxSize: "80 KB (PDF)",
    pdfPlaceholderContent: "SASSA_GRANT_CHECKLIST_V2026.pdf"
  },
  {
    id: "government-notice",
    slug: "sassa-government-notice-template",
    title: "SASSA Government Gazette Notice Reference Guide",
    shortDescription: "Reference guide to official SASSA-related Government Gazette notices and proclamations.",
    purpose: "This reference document lists the key Government Gazette notices that govern SASSA grant amounts, means test thresholds, and payment regulations.",
    howToFill: [
      "Locate the relevant Gazette number for your grant type using the table below.",
      "Visit the South African Government website to download the full Gazette notice.",
      "Use the Gazette reference number in any formal correspondence with SASSA."
    ],
    documentChecklist: [
      "No documents required — this is a reference guide only."
    ],
    approxSize: "210 KB (PDF)",
    pdfPlaceholderContent: "SASSA_GAZETTE_REFERENCE_GUIDE_V2026.pdf"
  }
];
