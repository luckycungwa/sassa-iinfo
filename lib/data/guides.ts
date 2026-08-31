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
    description: "How the means test works, income thresholds for single and married applicants, asset limits, and how your grant eligibility is calculated.",
    steps: [
      { title: "What Is the Means Test?", detail: "The means test is a financial assessment SASSA uses to determine if your income and assets fall below the legal threshold for grant eligibility. It ensures grants go to those who need them most." },
      { title: "Income Thresholds (Single)", detail: "For most grants: single applicants must have annual income below R112,200. For the SRD R370 grant: bank inflows must be below R624 per month." },
      { title: "Income Thresholds (Married)", detail: "For married applicants: combined annual income must be below R224,400 (or R139,200 for Child Support Grant)." },
      { title: "Asset Limits", detail: "Single applicant assets must be below R1,584,000. Married couple combined assets must be below R3,168,000. Assets include property (excluding primary residence), investments, savings, and vehicles." },
      { title: "What Counts as Income?", detail: "Salary/wages, pension payments, rental income, farm income, regular gifts or remittances, UIF payments, NSFAS allowances, and interest from investments." },
    ],
  },
  {
    id: "sassa-scam-alert-guide",
    slug: "sassa-scam-alert-guide",
    title: "SASSA Scam Alert & Fraud Prevention Guide",
    description: "How to spot and avoid SASSA grant scams. Fake SMS messages, phishing websites, fraudulent agents, and impersonation calls.",
    steps: [
      { title: "Know the Scam Types", detail: "Fake SMS, phishing websites, WhatsApp fraud, phone impersonation, door-to-door scammers, fake card replacements, and registration fee scams are the most common." },
      { title: "Check Official Channels", detail: "SASSA official website: sassa.gov.za. Official WhatsApp: 082 046 8553. Toll-free: 0800 60 10 11. SASSA never asks for your bank PIN or application fees." },
      { title: "Report Suspicious Activity", detail: "Report scams to SASSA toll-free at 0800 60 10 11, or contact the SAPS Commercial Crime Unit. Save all suspicious messages as evidence." },
    ],
  },
  {
    id: "sassa-suspense-restoration-guide",
    slug: "sassa-suspense-restoration-guide",
    title: "SASSA Grant Suspended? — Restoration Guide",
    description: "Why SASSA grants get suspended and how to restore them. Bank verification, means test, annual review, and identity verification issues.",
    steps: [
      { title: "Why Grants Get Suspended", detail: "Common reasons: bank verification failure, means test trigger, failure to complete annual review, identity verification issue, or incorrect death report." },
      { title: "Check Your Status", detail: "Log into the SRD portal or visit your SASSA office to check your current grant status. The status message will indicate the reason for suspension." },
      { title: "Follow the Restoration Process", detail: "Each suspension reason has a specific restoration process. See the full guide for step-by-step instructions per scenario." },
    ],
  },
  {
    id: "sassa-reference-number",
    slug: "sassa-reference-number",
    title: "How to Find Your SASSA Reference Number",
    description: "Where to find your SASSA application, appeal, and payment reference numbers, and how to use them for status checks and inquiries.",
    steps: [
      { title: "Check Your Application Receipt", detail: "When you submit a SASSA grant application, you receive a dated receipt with your unique application reference number printed on it. Keep this receipt in a safe place." },
      { title: "Log Into the SRD Portal", detail: "Visit srd.sassa.gov.za and log in with your ID number and phone number. Your reference number is displayed on the status dashboard under your personal details." },
      { title: "Check SMS Notifications", detail: "SASSA sends your reference number via SMS when you first apply for a grant and again when you submit an appeal. Search your messages for 'SASSA' or 'reference'." },
      { title: "Check Your Appeal Confirmation", detail: "After submitting an appeal on the ITSAA portal (srd.dsd.gov.za), the confirmation screen and email display your Appeal Reference Number. Save this for tracking." },
      { title: "Visit a SASSA Office", detail: "Bring your ID to any SASSA local office. A clerk can look up your application reference number if you have lost your receipt or SMS." },
      { title: "Use Your Reference Number", detail: "Your reference number is required for: checking status online, tracking appeals, calling the helpline (0800 60 10 11), and visiting SASSA offices. Without it, inquiries take longer." },
    ],
  },
    {
      id: "sassa-grant-amounts-calculator",
      slug: "sassa-grant-amounts-calculator",
      title: "SASSA Grant Calculator 2026",
      description: "Estimate your monthly SASSA grant total based on your age, dependants, disability status, and other factors.",
      steps: [
        { title: "Use the Interactive Tool", detail: "Enter your age, dependants, disability status, and other details into our interactive calculator for an instant monthly estimate." },
        { title: "2026 Grant Amounts", detail: "All amounts used are from the official 2026 national budget: SRD R370, Older Person R2,400, Disability R2,400, Foster Care R1,295, and more." },
        { title: "Important Note", detail: "This calculator provides estimates only. Actual eligibility depends on the SASSA means test. Always apply through official channels." },
      ],
    },
    {
      id: "change-srd-phone-number",
      slug: "change-srd-phone-number",
      title: "How to Change Your SRD Phone Number",
      description: "Step-by-step guide to update the cellphone number on your SRD R370 grant application so you keep receiving OTPs, status updates, and payment notifications.",
      steps: [
        { title: "Understand Why It Matters", detail: "Your cellphone number is how SASSA verifies your identity with OTPs and sends your monthly payment notifications. If it is wrong or outdated, you can be locked out of your status check and miss payments." },
        { title: "Log Into the SRD Portal", detail: "Go to srd.sassa.gov.za and select the 'How do I change my cellphone number' option under the SRD section. You will need your ID number and the current number on file to begin." },
        { title: "Provide Your New Number", detail: "Enter your new cellphone number. SASSA will send a One-Time PIN (OTP) to the new number to confirm it belongs to you. Enter the OTP to verify." },
        { title: "Wait for Approval", detail: "SASSA may take up to 7 working days to approve the change. During this period your old number remains active for notifications, so keep it switched on." },
        { title: "Check Your Status Afterward", detail: "Log into the SRD portal with your new number to confirm the change went through. If approval takes longer than 7 working days, call 0800 60 10 11 for assistance." },
      ],
    },
    {
      id: "cancel-srd-application",
      slug: "cancel-srd-application",
      title: "How to Cancel Your SRD Grant Application",
      description: "How to cancel your SRD R370 grant application if you no longer need it, and what to know before you cancel.",
      steps: [
        { title: "Think Before You Cancel", detail: "Cancelling your SRD application stops your R370 payments. If your circumstances change and you become eligible again, you must re-apply and be reassessed, so only cancel if you are certain you no longer need the grant." },
        { title: "Log Into the SRD Portal", detail: "Go to srd.sassa.gov.za and log in with your ID number and cellphone number. Enter the OTP sent via SMS to access your status dashboard." },
        { title: "Select the Cancellation Option", detail: "On your status dashboard, look for the option to cancel or withdraw your application. Follow the on-screen prompts — you may be asked to confirm twice before the cancellation is processed." },
        { title: "Keep Your Reference Number", detail: "Note down the confirmation reference and date of your cancellation. You will need these if you decide to re-apply later or if a payment is processed by mistake." },
        { title: "Monitor Your Payments", detail: "Cancel at the start of the month to avoid a payment that already began processing. If a payment lands after cancellation, contact SASSA on 0800 60 10 11 to arrange the refund." },
      ],
    },
    {
      id: "reconfirm-srd-grant",
      slug: "reconfirm-srd-grant",
      title: "How to Reconfirm Your SRD Grant (Monthly Review)",
      description: "Why SASSA asks you to reconfirm your SRD R370 application, when it happens, and the exact steps to keep your grant active.",
      steps: [
        { title: "What Reconfirmation Is", detail: "Reconfirmation is SASSA's periodic verification that you are still alive, still unemployed, and still meet the SRD criteria. Missing the reconfirmation window is one of the most common reasons SRD grants get stopped." },
        { title: "Check If You Are Due", detail: "Log into the SRD portal at srd.sassa.gov.za. If reconfirmation is required, a banner will appear asking you to confirm your details. SASSA also sends an SMS or WhatsApp message when a review is due." },
        { title: "Complete the Reconfirmation", detail: "On the SRD portal, select the reconfirmation prompt and follow the steps: confirm your personal details, your banking or payment method, and answer the income questions truthfully." },
        { title: "Receive Confirmation", detail: "Once submitted, SASSA processes the reconfirmation and your status updates to show your application is active again. Keep the confirmation for your records." },
        { title: "If Your Grant Was Stopped", detail: "If your grant stopped because you missed a reconfirmation, log back in, complete the reconfirmation, and your payments usually resume within one payment cycle. If not, contact 0800 60 10 11." },
      ],
    },
  ];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
