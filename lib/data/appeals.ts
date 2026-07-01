export interface AppealGuide {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  introduction: string;
  steps: string[];
  timeline: string;
  documents: string[];
  commonReasons: string[];
  outcomes: string[];
  faqs: { question: string; answer: string }[];
}

export const appeals: AppealGuide[] = [
  {
    id: "how-to-appeal",
    slug: "how-to-appeal",
    title: "How to Appeal a Declined SASSA Grant Application",
    shortDescription: "A comprehensive guide on lodging an appeal with the Independent Tribunal for Social Assistance Appeals (ITSAA).",
    introduction: "If your social grant application was declined, you have the legal right to challenge the decision. Appeals are not handled by SASSA itself, but rather by an independent tribunal (ITSAA) to ensure fairness.",
    steps: [
      "Obtain your official rejection notification from SASSA detailing the decline code.",
      "Visit the official DSD Appeal website (srd.dsd.gov.za for SRD, or contact local office for social grants).",
      "Enter your ID number and the mobile phone number used during your original application.",
      "Request an OTP (One-Time PIN) and enter it on the website to verify your identity.",
      "Select the month or the specific grant application you are appealing.",
      "Choose your reason for appeal from the dropdown menu (e.g., 'Unemployed', 'No income', 'UIF mistake').",
      "Submit the appeal and keep a record of your Appeal Reference Number."
    ],
    timeline: "You must lodge your appeal within 90 days from the date of receiving the decline decision. The tribunal can take up to 60 to 90 days to issue a final ruling.",
    documents: [
      "Certified copy of your South African ID.",
      "Latest 3 months bank statements showing all inflows.",
      "UIF de-registration letter (if previously employed).",
      "NSFAS cancellation letter (if previously a student)."
    ],
    commonReasons: [
      "Miscalculated Means Test.",
      "Stale or incorrect databases showing you receive UIF or NSFAS when you do not.",
      "Administrative system errors in scanning your bank account."
    ],
    outcomes: [
      "Upheld (Successful): The decline decision is reversed. SASSA will pay you all backdated funds.",
      "Dismissed (Unsuccessful): The decline decision is upheld. You will not be paid."
    ],
    faqs: [
      {
        question: "Do I have to appeal every month for the SRD grant?",
        answer: "Yes, because SASSA checks eligibility criteria dynamically every month, you must appeal for EACH month that shows a 'Declined' status."
      },
      {
        question: "Can I appeal by phone?",
        answer: "No, appeals must be submitted either online via the portal or in writing using official forms at a local SASSA branch."
      }
    ]
  },
  {
    id: "appeal-after-uif",
    slug: "appeal-after-uif",
    title: "Appealing a Decline Due to UIF Registration",
    shortDescription: "What to do if SASSA declines your grant claiming you are receiving UIF when you are not.",
    introduction: "A very common reason for grant rejection is 'UIF Registered'. This happens because SASSA's database checks find your ID registered on the Department of Labour's UIF database, even if you are no longer receiving payments.",
    steps: [
      "Visit your local Department of Labour office to request a UI-19 form or a UIF Status Letter.",
      "Ensure the letter clearly states your employment has terminated and you are no longer receiving monthly UIF payouts.",
      "Scan or take a clear photo of this official letter.",
      "Submit your appeal online, and upload the proof of UIF termination if prompted, or present it to a SASSA officer."
    ],
    timeline: "Submit as soon as you receive the decline, within 90 days. The Department of Labour can take 5-10 days to print your status letter.",
    documents: [
      "UI-19 form or official UIF status confirmation letter.",
      "Copy of your ID.",
      "Unemployment affidavit."
    ],
    commonReasons: [
      "Employer failed to update your termination status with the Department of Labour.",
      "Legacy database error on the state servers."
    ],
    outcomes: [
      "Tribunal confirms you do not receive active UIF and instructs SASSA to approve your grant."
    ],
    faqs: [
      {
        question: "Why did SASSA say I have UIF when I was retrenched years ago?",
        answer: "This is almost always because your former employer never submitted your UI-19 termination form to the Department of Labour, leaving your status active on their database."
      }
    ]
  },
  {
    id: "appeal-after-nsfas",
    slug: "appeal-after-nsfas",
    title: "Appealing a Decline Due to NSFAS Funding",
    shortDescription: "Guide to appealing if SASSA claims you are funded by NSFAS but your funding was cancelled or completed.",
    introduction: "Students who previously received National Student Financial Aid Scheme (NSFAS) funding are often declined for SASSA grants. If your studies are finished or you no longer receive NSFAS, you need to appeal this decision.",
    steps: [
      "Request a NSFAS Cancellation Letter or Completion Letter from NSFAS.",
      "Log onto the ITSAA appeal portal.",
      "Submit your appeal stating that you are no longer an active student and receive no educational allowances."
    ],
    timeline: "Must be filed within 90 days. NSFAS letters can be requested via the myNSFAS portal.",
    documents: [
      "NSFAS Cancellation or Completion certificate.",
      "Academic transcript showing completion.",
      "Unemployment affidavit."
    ],
    commonReasons: [
      "NSFAS database has not cleared your name from the active bursary registry."
    ],
    outcomes: [
      "Approval of grant once non-student status is verified."
    ],
    faqs: [
      {
        question: "Can active students get SASSA grants?",
        answer: "No, active tertiary students receiving NSFAS are not eligible for social grants as their living costs are already subsidised by the state."
      }
    ]
  },
  {
    id: "appeal-timeline",
    slug: "appeal-timeline",
    title: "SASSA Appeal Timeline: How Long Does an Appeal Take?",
    shortDescription: "Complete breakdown of the SASSA appeal process timeline, from submission to tribunal ruling.",
    introduction: "Understanding the appeal timeline helps you plan and avoid unnecessary follow-ups. The Independent Tribunal for Social Assistance Appeals (ITSAA) has specific timeframes for each stage of the process.",
    steps: [
      "Submit your appeal on the ITSAA portal within 90 days of receiving the decline decision.",
      "ITSAA acknowledges receipt within 5-10 business days via SMS or email.",
      "The tribunal reviews your case and requests additional documentation if needed (2-4 weeks).",
      "A final ruling is issued within 60-90 days from the date of submission."
    ],
    timeline: "The full appeal process takes 60 to 90 days from submission to final ruling. Complex cases involving fraud flags or medical evidence may take up to 120 days.",
    documents: [
      "Appeal reference number for tracking purposes.",
      "Copy of the original decline notification from SASSA.",
      "Any supporting evidence uploaded with your appeal."
    ],
    commonReasons: [
      "Incomplete documentation submitted with the appeal.",
      "High volume of appeals causing tribunal backlog.",
      "Missing medical or financial evidence for disability-related declines."
    ],
    outcomes: [
      "Ruling in your favour within 60-90 days — backdated payments issued within 2 weeks.",
      "Ruling against you — you may reapply for the grant fresh if your circumstances change."
    ],
    faqs: [
      {
        question: "Can I speed up the appeal process?",
        answer: "No, but submitting complete documentation upfront avoids delays from follow-up requests. Calling the tribunal will not accelerate the review."
      },
      {
        question: "Do I get paid during the appeal process?",
        answer: "No. Payments only resume if and when your appeal is approved, at which point you receive backpay to the original decline date."
      }
    ]
  },
  {
    id: "appeal-documents",
    slug: "appeal-documents",
    title: "Required Documents for SASSA Grant Appeal",
    shortDescription: "Complete checklist of documents you need to submit a successful SASSA grant appeal.",
    introduction: "Submitting the correct documents with your appeal is critical. Missing or incorrect documents are the most common reason for appeal delays or dismissals.",
    steps: [
      "Gather all required documents before starting your appeal submission.",
      "Ensure all documents are certified (stamped by SAPS or a commissioner of oaths).",
      "Upload clear scanned copies or photos of each document on the ITSAA portal.",
      "Keep original copies in a safe place — you may need them for a follow-up office visit."
    ],
    timeline: "Submit documents within 90 days of the decline letter. Certification must be dated within the last 6 months.",
    documents: [
      "Certified copy of your 13-digit South African ID (front and back).",
      "Latest 3 months bank statements showing all deposits and withdrawals.",
      "Unemployment affidavit sworn at a SAPS station.",
      "UIF de-registration letter (UI-19 form) if applicable.",
      "NSFAS cancellation or completion letter if applicable.",
      "Medical report (for disability grant appeals only).",
      "Proof of address (utility bill or tribal authority letter)."
    ],
    commonReasons: [
      "Documents not certified or certification expired (>6 months old).",
      "Bank statements not covering all 3 required months.",
      "Affidavit not commissioned by a SAPS officer."
    ],
    outcomes: [
      "Complete documentation leads to faster processing.",
      "Incomplete documentation may result in a 'Documents Pending' status on your appeal."
    ],
    faqs: [
      {
        question: "Can I upload documents after submitting my appeal?",
        answer: "Yes. The ITSAA portal allows you to upload additional documents after submission. Look for the 'Upload Documents' option on your appeal dashboard."
      },
      {
        question: "Do I need a lawyer to prepare appeal documents?",
        answer: "No. SASSA appeals are designed to be submitted without legal representation. The forms are straightforward and designed for self-representation."
      }
    ]
  },
  {
    id: "appeal-reasons",
    slug: "appeal-reasons",
    title: "Common Reasons for SASSA Grant Decline & How to Appeal Them",
    shortDescription: "Every official SASSA decline reason explained with the exact appeal strategy for each.",
    introduction: "SASSA declines grants for specific coded reasons. Knowing exactly why you were declined helps you file a targeted appeal with the right evidence.",
    steps: [
      "Check your decline notification for the specific reason code or description.",
      "Select the matching reason from the ITSAA appeal dropdown menu.",
      "Upload evidence that directly addresses the decline reason.",
      "Wait for the tribunal to review your appeal against the evidence."
    ],
    timeline: "Appeals must be lodged within 90 days. The tribunal takes 60-90 days to issue a ruling.",
    documents: [
      "Decline notification from SASSA showing the reason code.",
      "Supporting evidence specific to your decline reason (see above).",
      "Unemployment affidavit."
    ],
    commonReasons: [
      "UIF Registered — Your ID is linked to a UIF record. Submit a UI-19 termination letter.",
      "NSFAS Funded — Your ID is in the NSFAS database. Submit a NSFAS cancellation letter.",
      "Alternative Income Source — Bank deposits detected. Submit bank statements showing no income.",
      "Means Test Failed — Income or assets exceed threshold. Submit updated financial records.",
      "Identity Verification Failed — ID mismatch with Home Affairs. Visit Home Affairs to correct your details.",
      "Bank Verification Failed — Bank details mismatch. Ensure the account is in your name and active.",
      "Self Exclusion — You declared other support. File an appeal explaining your actual situation."
    ],
    outcomes: [
      "Successful appeal: decline is reversed and backpay is issued.",
      "Unsuccessful appeal: you may reapply with corrected information."
    ],
    faqs: [
      {
        question: "Can I appeal if I do not know the reason for decline?",
        answer: "Yes. Select 'Other' as the reason and explain your situation. The tribunal will investigate the underlying cause."
      },
      {
        question: "What if I have multiple decline reasons?",
        answer: "Address each reason in your appeal with separate evidence for each. Upload multiple documents labeled clearly."
      }
    ]
  },
  {
    id: "appeal-outcomes",
    slug: "appeal-outcomes",
    title: "SASSA Appeal Outcomes: What Happens After You Appeal?",
    shortDescription: "Complete guide to possible appeal outcomes, what they mean, and what happens next in each scenario.",
    introduction: "After ITSAA reviews your appeal, you will receive one of several possible outcomes. Understanding each outcome helps you plan your next steps.",
    steps: [
      "Wait for the tribunal ruling notification via SMS or the ITSAA portal.",
      "Read the outcome letter carefully — it explains the tribunal's reasoning.",
      "Follow the instructions: for approval, wait for payment; for dismissal, consider your options."
    ],
    timeline: "Rulings are typically issued 60-90 days after submission. Notifications are sent via SMS within 5 business days of the ruling.",
    documents: [
      "Appeal outcome notification letter (download from ITSAA portal).",
      "Original SASSA decline notification."
    ],
    commonReasons: [
      "Insufficient evidence submitted with the appeal.",
      "Tribunal agrees with SASSA's original assessment.",
      "SASSA's databases were confirmed correct by the tribunal."
    ],
    outcomes: [
      "Upheld (Successful): The decline is overturned. SASSA must pay all backdated amounts within 14 business days.",
      "Dismissed (Unsuccessful): The decline stands. You may reapply fresh if your circumstances change.",
      "Partially Upheld: Some months are approved, others remain declined (common for SRD appeals).",
      "Referred Back: The tribunal sends the case back to SASSA for re-evaluation with instructions."
    ],
    faqs: [
      {
        question: "Can I appeal again if my first appeal was dismissed?",
        answer: "No, you cannot appeal the tribunal's decision. However, you can submit a fresh grant application if your financial situation has changed."
      },
      {
        question: "How long after a successful appeal do I get paid?",
        answer: "SASSA has 14 business days to process the payment after receiving the tribunal's ruling. Backpay includes all months from the original decline date."
      }
    ]
  },
  {
    id: "appeal-after-decline",
    slug: "appeal-after-decline",
    title: "How to Appeal a SASSA Grant After Initial Decline",
    shortDescription: "Step-by-step guide to appealing after your initial SASSA grant application was declined for any reason.",
    introduction: "A declined grant application is not the end of the road. You have 90 days to file an appeal with the Independent Tribunal for Social Assistance Appeals (ITSAA). This guide covers every step from receiving your decline notification to receiving the tribunal ruling.",
    steps: [
      "Read your SASSA decline notification carefully to understand the specific reason.",
      "Gather evidence that directly refutes the decline reason (UIF letter, bank statements, NSFAS letter).",
      "Visit the ITSAA appeal portal at srd.dsd.gov.za (for SRD) or your local SASSA office (for other grants).",
      "Enter your ID number and phone number to verify your identity via OTP.",
      "Select the month(s) you are appealing and provide your supporting evidence.",
      "Submit and save your Appeal Reference Number for tracking.",
      "Monitor the portal for updates and wait for the tribunal ruling."
    ],
    timeline: "You have 90 days from the date of the decline notification to file your appeal. The tribunal has 60-90 days to issue a ruling.",
    documents: [
      "Certified copy of your ID (front and back).",
      "Decline notification from SASSA.",
      "3 months bank statements.",
      "Any additional evidence specific to your decline reason."
    ],
    commonReasons: [
      "Not understanding why your application was declined.",
      "Missing the 90-day appeal window.",
      "Not having the right supporting documents ready."
    ],
    outcomes: [
      "Appeal upheld: Grant is approved with backpay to the original application date.",
      "Appeal dismissed: Decline stands. You may reapply fresh if circumstances change."
    ],
    faqs: [
      {
        question: "What if it has been more than 90 days since my decline?",
        answer: "Unfortunately, appeals cannot be accepted after 90 days. You must submit a completely new grant application."
      },
      {
        question: "Can I appeal in person at a SASSA office?",
        answer: "Yes. For non-SRD grants, you can visit your nearest SASSA office with your documents and request a manual appeal submission."
      }
    ]
  },
  {
    id: "appeal-after-income-source",
    slug: "appeal-after-income-source",
    title: "Appealing a Decline Due to Alternative Income Source Detection",
    shortDescription: "What to do when SASSA declines your grant saying you have an alternative income source but you disagree.",
    introduction: "One of the most common SRD decline reasons is 'Alternative Income Source Detected'. This happens when SASSA's automated bank audit finds deposits in your account. If these deposits are not actual income, you need a specific appeal strategy.",
    steps: [
      "Review your bank statements for the months in question and identify all deposits.",
      "For each deposit, prepare an explanation (gift from family, loan repayment, savings transfer).",
      "Write a sworn affidavit at your nearest SAPS station explaining the nature of each deposit.",
      "Submit your appeal on the ITSAA portal and upload the affidavit and bank statements.",
      "Tick the option that says 'Deposits are not income — they are gifts/loans/savings'."
    ],
    timeline: "File within 90 days. Each month is treated separately — you must appeal each declined month individually.",
    documents: [
      "Bank statements showing the deposits that triggered the decline.",
      "Sworn affidavit explaining each deposit (commissioned by SAPS).",
      "Proof of your current unemployment status (if applicable).",
      "Supporting letters from family members if deposits were gifts."
    ],
    commonReasons: [
      "Family member sent money for groceries or emergencies.",
      "Friend repaid a loan or debt.",
      "You transferred money between your own accounts.",
      "A family member uses your account for their transactions."
    ],
    outcomes: [
      "Successful: The tribunal accepts your explanation and instructs SASSA to approve your grant.",
      "Unsuccessful: The tribunal deems the deposits as income and upholds the decline."
    ],
    faqs: [
      {
        question: "My friend sent me R500 as a birthday gift. Will SASSA count this as income?",
        answer: "Yes, any deposit into your account can trigger the 'Alternative Income Source' flag. You can appeal by providing a sworn statement from your friend confirming it was a gift."
      },
      {
        question: "How much money in deposits can trigger this status?",
        answer: "Any single deposit over R624 (the SRD threshold) can trigger the flag. Multiple smaller deposits totalling over R624 can also trigger it."
      }
    ]
  }
];
