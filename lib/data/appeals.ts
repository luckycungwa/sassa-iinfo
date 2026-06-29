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
  }
];
