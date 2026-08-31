export interface Grant {
  id: string;
  slug: string;
  title: string;
  amount: string;
  frequency: string;
  targetGroup: string;
  overview: string;
  eligibilityCriteria: string[];
  documentsRequired: string[];
  howToApply: string[];
  faqs: { question: string; answer: string }[];
  appealNotes: string;
}

export const grants: Grant[] = [
  {
    id: "older-person",
    slug: "older-person-grant",
    title: "Older Person Grant (State Pension)",
    amount: "R2,400",
    frequency: "Monthly (plus R20 extra for ages 75+)",
    targetGroup: "South African citizens or permanent residents aged 60 and older.",
    overview: "The SASSA Older Person Grant (often referred to as the state pension) is designed to provide financial security to South African seniors who no longer work and do not have sufficient retirement assets.",
    eligibilityCriteria: [
      "Must be a South African citizen, permanent resident, or refugee.",
      "Must be 60 years or older.",
      "Must not live in a state-funded institution (e.g., state old age home).",
      "Must not receive another social grant for yourself.",
      "Means Test (Single): Annual income must be below R112,200; assets must be below R1,584,000.",
      "Means Test (Married): Combined annual income must be below R224,400; combined assets must be below R3,168,000."
    ],
    documentsRequired: [
      "Original 13-digit barcoded Smart Card ID or green ID book.",
      "Proof of marital status (marriage certificate, divorce order, or spouse's death certificate).",
      "Proof of residence (utility bill or letter from local chief).",
      "Proof of income and assets (last 3 months bank statements, pension slips).",
      "If unemployed, an affidavit confirming unemployment."
    ],
    howToApply: [
      "Visit your nearest SASSA local office with all original documents and photocopies.",
      "Complete the application form in the presence of a SASSA officer.",
      "An interview will be conducted, fingerprints taken, and a receipt issued.",
      "Applications take up to 3 months to process, with payments backdated to the application date."
    ],
    appealNotes: "If your Older Person Grant is declined, you have 90 days from receiving the notification to appeal to the Ministry of Social Development.",
    faqs: [
      {
        question: "Can I get the pension if I am still working?",
        answer: "Yes, provided your total earnings from your employment fall below the means test threshold (under R112,200 per year for a single person)."
      },
      {
        question: "Does the pension increase automatically every year?",
        answer: "Yes, the South African Minister of Finance typically announces annual grant adjustments during the budget speech in February, effective from April and October."
      }
    ]
  },
  {
    id: "child-support",
    slug: "child-support-grant",
    title: "Child Support Grant",
    amount: "R580",
    frequency: "Monthly per child (an additional top-up may apply for orphaned children — confirm the current amount with SASSA)",
    targetGroup: "Primary caregivers of children under the age of 18.",
    overview: "The SASSA Child Support Grant is aimed at lower-income caregivers to help cover the basic food, clothing, and schooling needs of children living in South Africa.",
    eligibilityCriteria: [
      "The primary caregiver must be a South African citizen, permanent resident, or refugee.",
      "Both the caregiver and the child must live in South Africa.",
      "The child must be under 18 years of age.",
      "Must not be a foster parent (foster parents should apply for the Foster Care Grant instead).",
      "Means Test (Single): Caregiver's annual income must not exceed R69,600.",
      "Means Test (Married): Combined annual income must not exceed R139,200."
    ],
    documentsRequired: [
      "Caregiver's original ID document.",
      "Child's certified birth certificate (with 13-digit ID number).",
      "Proof of caregiver's income or affidavit of unemployment.",
      "Road to Health Chart / Clinic card (for children under 5).",
      "Proof of school attendance (school report or letter) for school-aged children."
    ],
    howToApply: [
      "Go to your nearest SASSA local office with the child (if requested) and documents.",
      "Complete the Child Support Grant application form with the help of a SASSA clerk.",
      "Keep the dated SASSA receipt containing your application number as proof."
    ],
    appealNotes: "Common rejection reasons include exceeding the income threshold. If you believe the means test was miscalculated, appeal to the ITSAA within 90 days.",
    faqs: [
      {
        question: "How many children can I claim the Child Support Grant for?",
        answer: "There is no strict legal limit on the number of biological children, but SASSA monitors claims closely to prevent abuse. For non-biological children, caregivers can claim for up to 6 children."
      },
      {
        question: "What is the Child Support Grant Top-Up?",
        answer: "It is an additional top-up added to the basic R580 for orphaned children or children living with relatives, to avoid having to go through the lengthy court process of a Foster Care Grant. The exact amount changes over time and is subject to public debate, so confirm the current figure with SASSA."
      }
    ]
  },
  {
    id: "disability",
    slug: "disability-grant",
    title: "Disability Grant",
    amount: "R2,400",
    frequency: "Monthly",
    targetGroup: "Persons aged 18 to 59 with temporary or permanent physical or mental disabilities.",
    overview: "The Disability Grant provides financial support to citizens who are unable to work due to a physical or mental disability that lasts longer than six months.",
    eligibilityCriteria: [
      "Must be a South African citizen, permanent resident, or refugee.",
      "Must be aged 18 to 59 years.",
      "Must submit a medical assessment report from a SASSA-approved doctor (medical must be less than 3 months old).",
      "The disability must prevent you from working.",
      "Means Test (Single): Annual income under R112,200; assets under R1,584,000.",
      "Means Test (Married): Combined income under R224,400; assets under R3,168,000."
    ],
    documentsRequired: [
      "Applicant's original ID.",
      "Medical assessment report completed by a SASSA-commissioned medical practitioner.",
      "Proof of income/assets or affidavit of unemployment.",
      "Proof of residence.",
      "Last 3 months bank statements."
    ],
    howToApply: [
      "Book a medical assessment through the SASSA portal or local clinic.",
      "Attend the medical examination with a SASSA-vetted doctor.",
      "Once the doctor submits the report, visit the local SASSA office to complete the formal grant application."
    ],
    appealNotes: "If declined due to 'medical criteria not met', you must file an appeal with the Minister of Social Development. Make sure to attach any supplementary medical records.",
    faqs: [
      {
        question: "What is the difference between a temporary and permanent disability grant?",
        answer: "A temporary disability grant is approved for a period of 6 to 12 months because the condition is expected to improve. A permanent grant is valid for longer but is reviewed periodically."
      }
    ]
  },
  {
    id: "foster-care",
    slug: "foster-care-grant",
    title: "Foster Care Grant",
    amount: "R1,295",
    frequency: "Monthly per foster child",
    targetGroup: "Court-appointed foster parents of children under 18.",
    overview: "This grant is paid to foster parents who have been legally appointed by a South African Children's Court to care for an orphaned, abandoned, or neglected child.",
    eligibilityCriteria: [
      "The foster parent must be a South African citizen, permanent resident, or refugee.",
      "The child must be placed in your custody by a valid Children's Court Order.",
      "The child must be under 18 years of age.",
      "No income means test applies to the foster parent, as this grant is for the support of the child, not the parent."
    ],
    documentsRequired: [
      "The valid Children's Court foster placement order.",
      "ID document of the foster parent.",
      "Birth certificate of the foster child.",
      "School attendance certificate (if child is of school age)."
    ],
    howToApply: [
      "First, consult a Social Worker at the Department of Social Development (DSD) to obtain a Children's Court order.",
      "Once you have the legal order, visit the local SASSA office to apply for the Foster Care Grant payout."
    ],
    appealNotes: "The Foster Care Grant automatically terminates when the court order expires. Ensure you renew your court order with a social worker before expiration.",
    faqs: [
      {
        question: "Can a foster care grant be extended past 18?",
        answer: "Yes, if the child is still attending secondary school or college, the grant can be extended up to the age of 21 with social worker recommendation."
      }
    ]
  },
  {
    id: "srd-grant",
    slug: "srd-r370-grant",
    title: "Social Relief of Distress (SRD R370) Grant",
    amount: "R370",
    frequency: "Monthly",
    targetGroup: "Unemployed South Africans aged 18 to 59 with no income.",
    overview: "The Social Relief of Distress (SRD) Grant (popularly called the R350 grant, recently increased to R370) is a temporary grant introduced to assist individuals with absolutely no source of income or financial aid.",
    eligibilityCriteria: [
      "Must be a South African citizen, permanent resident, refugee, asylum seeker, or special permit holder.",
      "Must be aged 18 to 59.",
      "Must be unemployed and have no other social grant, UIF, NSFAS, or formal monthly income.",
      "Means Test: Bank account must not show any deposit/inflow exceeding R624 in a given month."
    ],
    documentsRequired: [
      "Valid South African ID number, asylum seeker permit number, or special permit number.",
      "Mobile phone number registered in the applicant's name.",
      "Bank account details (for direct bank payment) or preference for cardless cash send."
    ],
    howToApply: [
      "Apply online via the official SRD website (srd.sassa.gov.za) or WhatsApp.",
      "Fill in your ID details, read the declaration, and agree to the terms.",
      "Submit your bank details for direct verification and processing."
    ],
    appealNotes: "If your SRD status shows 'Declined', you must submit an appeal on the DSD Appeal website (srd.dsd.gov.za) for EACH declined month within 90 days.",
    faqs: [
      {
        question: "Why does my SRD status say 'Alternative Income Source'?",
        answer: "This means SASSA found a bank inflow or transaction in your bank account that exceeds the threshold, or you are registered for UIF, NSFAS, or PAYE tax."
      },
      {
        question: "How long does the SRD grant last?",
        answer: "The SRD grant is extended annually by the government. It is currently funded and legislated to continue running until at least March 2027."
      }
    ]
  },
  {
    id: "care-dependency",
    slug: "care-dependency-grant",
    title: "Care Dependency Grant",
    amount: "R2,400",
    frequency: "Monthly",
    targetGroup: "Parents or primary caregivers of children with severe, permanent disabilities who require full-time home care.",
    overview: "This grant is for children aged 1 to 18 who have severe mental or physical disabilities and require 24-hour, full-time care at home.",
    eligibilityCriteria: [
      "The applicant (caregiver) and child must live in South Africa.",
      "The child must be under 18 years.",
      "A medical report from a SASSA medical officer must confirm the child's severe, permanent disability and need for permanent care.",
      "Must not be cared for in a state-run institution.",
      "Means Test: Caregiver's annual income must be below R288,000 (Single) or R576,000 (Married/Combined)."
    ],
    documentsRequired: [
      "Caregiver's original ID.",
      "Child's birth certificate.",
      "SASSA medical assessment report verifying severe disability.",
      "Proof of caregiver's income/assets."
    ],
    howToApply: [
      "Obtain a referral from a clinic or social worker to book a SASSA medical assessment.",
      "Take the child to the SASSA medical doctor for evaluation.",
      "Once evaluated, complete the grant application at the SASSA office."
    ],
    appealNotes: "If declined, file an appeal detailing the child's daily care log, school exemption letters (if applicable), and clinical history.",
    faqs: [
      {
        question: "Does this grant turn into a Disability Grant at 18?",
        answer: "Yes, once the child turns 18, the Care Dependency Grant stops, and they can apply for the adult Disability Grant in their own name."
      }
    ]
  },
  {
    id: "war-veterans",
    slug: "war-veterans-grant",
    title: "War Veterans Grant",
    amount: "R2,420",
    frequency: "Monthly",
    targetGroup: "South African veterans of World War I, World War II, or the Korean War.",
    overview: "This specialized grant supports aging military veterans who fought in historical wars and cannot support themselves.",
    eligibilityCriteria: [
      "Must be a South African citizen or permanent resident.",
      "Must have fought in WWI, WWII, or the Korean War.",
      "Must be 60 years or older, or disabled.",
      "Means Test (Single): Annual income below R112,200; assets under R1,584,000.",
      "Means Test (Married): Combined income below R224,400; assets under R3,168,000."
    ],
    documentsRequired: [
      "Applicant's ID.",
      "Certificate of military service / military record book.",
      "Proof of income/assets."
    ],
    howToApply: [
      "Visit a SASSA local office with your military discharge certificate.",
      "Complete the application forms with the assistance of a social security administrator."
    ],
    appealNotes: "For veterans, any appeals are fast-tracked via the Department of Military Veterans and Ministry of Social Development.",
    faqs: [
      {
        question: "Are modern veterans eligible for this grant?",
        answer: "This specific grant is legislated only for WWI, WWII, and Korean War veterans. Post-1994 veterans are instead integrated into military pensions via the Department of Military Veterans (DMV)."
      }
    ]
  },
  {
    id: "grant-in-aid",
    slug: "grant-in-aid",
    title: "Grant-in-Aid",
    amount: "R580",
    frequency: "Monthly (Top-up)",
    targetGroup: "Social grant beneficiaries who require permanent, 24-hour physical assistance from another person.",
    overview: "Grant-in-Aid is an extra, complementary grant paid on top of your primary grant (Older Person, Disability, or War Veteran) to help cover the costs of paying a caregiver.",
    eligibilityCriteria: [
      "Must already be a recipient of an Older Person Grant, Disability Grant, or War Veterans Grant.",
      "Must be unable to look after yourself due to severe physical or mental frailty.",
      "Must submit a medical report from a doctor certifying that you require 24-hour home care.",
      "Must not be living in a state-funded welfare institution."
    ],
    documentsRequired: [
      "Primary grant details and ID.",
      "Medical assessment report from a state-vetted doctor certifying the need for full-time care."
    ],
    howToApply: [
      "Arrange a medical assessment highlighting severe physical/mental limitations.",
      "Submit the doctor's report alongside a Grant-in-Aid application at the SASSA office."
    ],
    appealNotes: "If your primary grant is active but Grant-in-Aid is denied, verify that the doctor checked the exact box indicating 24-hour assistance is needed, and appeal.",
    faqs: [
      {
        question: "Can I get Grant-in-Aid if I receive the Child Support Grant?",
        answer: "No. Grant-in-Aid can only be added to the Older Person, Disability, or War Veterans Grant."
      }
    ]
  }
];
