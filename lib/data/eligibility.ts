export interface EligibilityGuide {
  id: string;
  slug: string;
  scenario: string;
  title: string;
  shortDescription: string;
  introduction: string;
  checklist: string[];
  recommendedGrants: { name: string; slug: string; amount: string }[];
  stepsToQualify: string[];
  restrictions: string[];
  faqs: { question: string; answer: string }[];
}

export const eligibilityGuides: EligibilityGuide[] = [
  {
    id: "unemployed",
    slug: "i-am-unemployed",
    scenario: "Unemployed",
    title: "SASSA Options for Unemployed South Africans",
    shortDescription: "If you are unemployed and have no income, find out which SASSA grants you can apply for.",
    introduction: "Unemployment affects millions of South Africans. SASSA provides several social grants designed to assist individuals and families with no regular income.",
    checklist: [
      "Must be a South African citizen or permanent resident.",
      "Must be unemployed (zero monthly salary).",
      "Must have bank statements showing no recurring deposits.",
      "Must have a valid South African ID number."
    ],
    recommendedGrants: [
      { name: "Social Relief of Distress (SRD R370)", slug: "srd-r370-grant", amount: "R370 / month" },
      { name: "Child Support Grant (if you have children)", slug: "child-support-grant", amount: "R530 / month" }
    ],
    stepsToQualify: [
      "Register an account on the official SASSA portal.",
      "Submit an application for the SRD R370 grant.",
      "Wait for bank verification and monthly review cycles."
    ],
    restrictions: [
      "You cannot receive this grant if you are receiving UIF, NSFAS, or any other social grant."
    ],
    faqs: [
      {
        question: "Can I get a grant if I do casual work?",
        answer: "Only if your casual work earnings fall below the monthly means test threshold (under R624/month for SRD)."
      }
    ]
  },
  {
    id: "student",
    slug: "i-am-a-student",
    scenario: "Student",
    title: "Can Students Get SASSA Grants?",
    shortDescription: "Find out if tertiary or secondary school students are eligible for SASSA social grants.",
    introduction: "Students in South Africa often struggle with living costs. However, social grant eligibility for students depends strictly on whether you receive other state funding.",
    checklist: [
      "Must be enrolled in a school or tertiary institution.",
      "Must not receive NSFAS or other government bursaries.",
      "Must meet the basic age and income requirements."
    ],
    recommendedGrants: [
      { name: "Social Relief of Distress (SRD R370) - If not funded by NSFAS", slug: "srd-r370-grant", amount: "R370 / month" },
      { name: "Child Support Grant (if caregiver is low-income)", slug: "child-support-grant", amount: "R530 / month" }
    ],
    stepsToQualify: [
      "Ensure you have a letter or document proving you do not receive NSFAS funding.",
      "Apply online or at a SASSA branch with your academic proof and ID."
    ],
    restrictions: [
      "Active NSFAS recipients are completely excluded from receiving the SRD R370 grant."
    ],
    faqs: [
      {
        question: "Can I get a grant if I am studying at a TVET college?",
        answer: "Yes, provided you do NOT receive any NSFAS allowance, transport bursary, or accommodation funding."
      }
    ]
  },
  {
    id: "over-60",
    slug: "i-am-over-60",
    scenario: "Over 60 years old",
    title: "Pension and Older Person Grant Eligibility Guide",
    shortDescription: "Detailed breakdown of qualifying for South Africa's older person pension grant.",
    introduction: "When you reach the age of 60, you transition from unemployment support (SRD) to the state pension. Here is how to apply and qualify.",
    checklist: [
      "Must be 60 years or older.",
      "Must be a South African citizen or permanent resident.",
      "Annual income must be below R96,240 (Single) or R192,480 (Married)."
    ],
    recommendedGrants: [
      { name: "Older Person Grant (Pension)", slug: "older-person-grant", amount: "R2,180 / month" },
      { name: "Grant-in-Aid (if you require 24/7 care)", slug: "grant-in-aid", amount: "R530 / month" }
    ],
    stepsToQualify: [
      "Gather your green ID book/smart card and proof of marital status.",
      "Visit your local SASSA office to fill in the Older Person application forms.",
      "SASSA will take fingerprints and verify assets."
    ],
    restrictions: [
      "You cannot receive the SRD R370 grant once you turn 60; you must migrate to the Older Person Grant."
    ],
    faqs: [
      {
        question: "When does the payout increase to R2,200?",
        answer: "Beneficiaries aged 75 and older receive an extra R20 per month, bringing their total pension to R2,200."
      }
    ]
  },
  {
    id: "disabled",
    slug: "i-am-disabled",
    scenario: "Living with Disability",
    title: "Disability Grant Eligibility and Medical Vetting Guide",
    shortDescription: "Complete guide for disabled South Africans seeking financial assistance.",
    introduction: "Individuals who cannot work due to a physical or mental condition can qualify for SASSA's Disability Grant. Vetting requires official medical clearance.",
    checklist: [
      "Must be aged 18 to 59.",
      "Must possess a medical report completed by a SASSA-commissioned medical officer.",
      "Must have a disability that prevents employment for longer than 6 months."
    ],
    recommendedGrants: [
      { name: "Disability Grant", slug: "disability-grant", amount: "R2,180 / month" },
      { name: "Grant-in-Aid (if you require a full-time caregiver)", slug: "grant-in-aid", amount: "R530 / month" }
    ],
    stepsToQualify: [
      "Book a medical evaluation at your local clinic or through the SASSA portal.",
      "Get evaluated by the designated SASSA medical officer.",
      "Take the signed medical report and ID to the SASSA office to complete your application."
    ],
    restrictions: [
      "Your grant can be temporarily reviewed if your health condition improves."
    ],
    faqs: [
      {
        question: "Can I receive a disability grant if I get a private pension?",
        answer: "Only if the private pension income falls below the strict means test threshold of R96,240 per year."
      }
    ]
  }
];
