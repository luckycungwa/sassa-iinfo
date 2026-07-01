export interface Guide {
  id: string;
  slug: string;
  title: string;
  description: string;
  steps: { title: string; detail: string }[];
}

export const guides: Guide[] = [
  {
    id: "how-to-apply-sassa-grant",
    slug: "how-to-apply-sassa-grant",
    title: "How to Apply for a SASSA Grant",
    description: "A complete walkthrough for applying to any SASSA social grant, online or in person.",
    steps: [
      { title: "Determine Your Eligibility", detail: "Check the specific grant requirements on our Grant Library. Each grant has age limits, income thresholds (means test), and documentation needs." },
      { title: "Gather Your Documents", detail: "Required documents typically include: original ID/smart card, proof of residence, 3 months bank statements, and income affidavits. Grant-specific documents may include medical reports or court orders." },
      { title: "Visit Your Nearest SASSA Office", detail: "Find your nearest office using our Office Finder. Bring all original documents plus photocopies. Arrive early as queues can be long." },
      { title: "Complete the Application Form", detail: "A SASSA officer will assist you in filling out the official application form. Do not sign until instructed. Your fingerprints will be taken." },
      { title: "Receive Your Receipt", detail: "After submission, you will receive a dated receipt with an application reference number. Keep this safe — you will need it for follow-ups." },
      { title: "Wait for Processing", detail: "Applications take up to 3 months to process. Check your status online or via the SASSA portal. If approved, payments are backdated to the application date." },
    ],
  },
  {
    id: "how-to-check-sassa-status",
    slug: "how-to-check-sassa-status",
    title: "How to Check Your SASSA Grant Status",
    description: "Multiple ways to check your SASSA grant application or payment status online, via WhatsApp, or at an office.",
    steps: [
      { title: "Online Portal (SRD)", detail: "Visit srd.sassa.gov.za. Enter your ID number and the phone number used during application. You will receive an OTP via SMS to access your status dashboard." },
      { title: "SASSA WhatsApp Line", detail: "Save 082 046 8553 to your phone. Send 'SASSA' to start. Follow the prompts to check your balance, payment date, or application status. Free on most networks." },
      { title: "USSD Code", detail: "Dial *134*7737# on your mobile phone. Follow the menu to check your grant status. Standard network rates apply." },
      { title: "Visit a SASSA Office", detail: "Bring your ID to any SASSA local office. A clerk can look up your status and provide a printout if needed." },
    ],
  },
  {
    id: "sassa-documents-checklist",
    slug: "sassa-documents-checklist",
    title: "SASSA Required Documents Checklist",
    description: "Complete checklist of documents you need when applying for any SASSA grant.",
    steps: [
      { title: "Identification", detail: "Original 13-digit barcoded Smart Card ID or green ID book. Certified copy acceptable for some applications." },
      { title: "Proof of Residence", detail: "Utility bill (electricity, water, rates) in your name dated within the last 3 months. Alternatively, a letter from your local traditional leader or ward councillor." },
      { title: "Proof of Income", detail: "Last 3 months bank statements showing all deposits. If unemployed, a sworn affidavit confirming unemployment (stamped at SAPS)." },
      { title: "Marital Status Documents", detail: "Marriage certificate, divorce order, or death certificate of spouse (if applicable). Required for the means test calculation." },
      { title: "Medical Reports (if applicable)", detail: "For Disability Grant and Care Dependency Grant: a SASSA medical assessment report completed by an approved medical officer." },
      { title: "Court Orders (if applicable)", detail: "For Foster Care Grant: a valid Children's Court order confirming foster placement." },
    ],
  },
  {
    id: "understanding-means-test",
    slug: "understanding-means-test",
    title: "Understanding the SASSA Means Test",
    description: "How the SASSA means test works, income thresholds, asset limits, and how your grant eligibility is calculated.",
    steps: [
      { title: "What Is the Means Test?", detail: "The means test is a financial assessment SASSA uses to determine if your income and assets fall below the legal threshold for grant eligibility. It ensures grants go to those who need them most." },
      { title: "Income Thresholds (Single)", detail: "For most grants: single applicants must have annual income below R96,240. For the SRD R370 grant: bank inflows must be below R624 per month." },
      { title: "Income Thresholds (Married)", detail: "For married applicants: combined annual income must be below R192,480 (or R127,200 for Child Support Grant)." },
      { title: "Asset Limits", detail: "Single applicant assets must be below R1,372,800. Married couple combined assets must be below R2,745,600. Assets include property (excluding primary residence), investments, savings, and vehicles." },
      { title: "What Counts as Income?", detail: "Salary/wages, pension payments, rental income, farm income, regular gifts or remittances, UIF payments, NSFAS allowances, and interest from investments." },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
