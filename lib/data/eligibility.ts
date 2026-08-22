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
      { name: "Child Support Grant (if you have children)", slug: "child-support-grant", amount: "R580 / month" }
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
      { name: "Child Support Grant (if caregiver is low-income)", slug: "child-support-grant", amount: "R580 / month" }
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
      { name: "Older Person Grant (Pension)", slug: "older-person-grant", amount: "R2,400 / month" },
      { name: "Grant-in-Aid (if you require 24/7 care)", slug: "grant-in-aid", amount: "R580 / month" }
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
        question: "When does the payout increase to R2,420?",
        answer: "Beneficiaries aged 75 and older receive an extra R20 per month, bringing their total pension to R2,420."
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
      { name: "Disability Grant", slug: "disability-grant", amount: "R2,400 / month" },
      { name: "Grant-in-Aid (if you require a full-time caregiver)", slug: "grant-in-aid", amount: "R580 / month" }
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
  },
  {
    id: "receive-uif",
    slug: "i-receive-uif",
    scenario: "Receiving UIF",
    title: "Can I Get a SASSA Grant if I Receive UIF?",
    shortDescription: "Understand how UIF payments affect your SASSA grant eligibility and what to do if you are declined.",
    introduction: "Many South Africans transition between UIF and SASSA grants. If you currently receive Unemployment Insurance Fund (UIF) payments, your SASSA eligibility depends on the amount and duration of your UIF payouts.",
    checklist: [
      "UIF payments are considered income by SASSA's means test.",
      "If your UIF payout exceeds R624 per month, you will not qualify for SRD R370.",
      "If your UIF has ended, you can reapply for SASSA grants immediately."
    ],
    recommendedGrants: [
      { name: "Social Relief of Distress (SRD R370)", slug: "srd-r370-grant", amount: "R370 / month" },
      { name: "Child Support Grant", slug: "child-support-grant", amount: "R580 / month" }
    ],
    stepsToQualify: [
      "Check your UIF monthly payout amount on the UIF portal.",
      "If UIF payouts are below the means test threshold, submit your SASSA application with your UIF letter.",
      "If UIF has ended, request a UI-19 termination letter from the Department of Labour and attach it to your SASSA application."
    ],
    restrictions: [
      "Active UIF payments above R624/month disqualify you from SRD R370.",
      "You cannot receive both UIF and a full social grant simultaneously if the UIF exceeds the threshold."
    ],
    faqs: [
      {
        question: "SASSA declined me saying I have UIF, but I no longer receive it. What do I do?",
        answer: "This is a common database error. Get a UI-19 termination letter from the Department of Labour and appeal the decision on the ITSAA portal."
      },
      {
        question: "Can I get backpay if my UIF stopped months ago?",
        answer: "Yes. Once you provide proof your UIF has ended, your grant can be backdated to the month after your last UIF payout."
      }
    ]
  },
  {
    id: "receive-nsfas",
    slug: "i-receive-nsfas",
    scenario: "Receiving NSFAS",
    title: "SASSA Grant Eligibility for NSFAS-Funded Students",
    shortDescription: "Find out if you qualify for SASSA grants while receiving NSFAS funding or after your studies end.",
    introduction: "NSFAS-funded students are generally not eligible for SRD R370 or other social grants, because NSFAS already covers living allowances. However, if your NSFAS funding has been cancelled or completed, you may qualify.",
    checklist: [
      "Active NSFAS recipients are excluded from all SASSA grants.",
      "If your NSFAS was cancelled, you need a cancellation letter from NSFAS.",
      "If you completed your studies, you need a completion certificate from your institution."
    ],
    recommendedGrants: [
      { name: "Social Relief of Distress (SRD R370) - Only after NSFAS ends", slug: "srd-r370-grant", amount: "R370 / month" }
    ],
    stepsToQualify: [
      "Request a NSFAS cancellation or completion letter via the myNSFAS portal.",
      "Wait for confirmation that your name has been removed from the active bursary registry.",
      "Submit your SASSA application with the NSFAS letter attached as proof."
    ],
    restrictions: [
      "You cannot receive NSFAS and a SASSA grant in the same month."
    ],
    faqs: [
      {
        question: "I finished my degree but SASSA says I am still funded by NSFAS. Why?",
        answer: "NSFAS databases are not always updated immediately. Upload your graduation certificate or academic transcript along with a NSFAS completion letter to trigger the update."
      },
      {
        question: "Can I get a SASSA grant during my NSFAS-funded vacation?",
        answer: "No. If you are registered as an active NSFAS student, you are excluded from SASSA grants for the full academic year, including vacation months."
      }
    ]
  },
  {
    id: "no-bank-account",
    slug: "i-have-no-bank-account",
    scenario: "No Bank Account",
    title: "SASSA Grants Without a Bank Account: Cash Collection Guide",
    shortDescription: "Complete guide on how to receive your SASSA grant if you do not have a personal bank account.",
    introduction: "Not having a bank account does not disqualify you from receiving SASSA grants. SASSA offers multiple cash collection methods including retail payouts and mobile pay points for unbanked beneficiaries.",
    checklist: [
      "You do NOT need a bank account to receive a SASSA grant.",
      "You need a valid South African ID or smart ID card.",
      "You need a working cellphone number to receive SMS cash vouchers."
    ],
    recommendedGrants: [
      { name: "Social Relief of Distress (SRD R370)", slug: "srd-r370-grant", amount: "R370 / month" }
    ],
    stepsToQualify: [
      "Apply for your grant online via the SRD portal or at a SASSA local office.",
      "Select 'Cash Send' or 'Retail Collection' as your payment method during application.",
      "Once approved, wait for an SMS voucher from SASSA with a unique collection code.",
      "Take your ID and the SMS to any participating retailer (Pick n Pay, Boxer, Shoprite, Checkers, Usave) to collect your cash."
    ],
    restrictions: [
      "Cash Send limits apply — you may not be able to collect more than one month's grant at a time.",
      "The SMS voucher expires within 7-10 days."
    ],
    faqs: [
      {
        question: "How do I change from bank transfer to cash collection?",
        answer: "Log into the SRD portal, go to 'Payment Method', and switch from 'Bank Transfer' to 'Cash Send'. Changes take effect from the next month."
      },
      {
        question: "Can someone else collect my grant using my SMS voucher?",
        answer: "No. The retailer will verify your ID before releasing funds. Only the registered beneficiary can collect."
      }
    ]
  }
];
