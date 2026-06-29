export interface StatusMeaning {
  id: string;
  slug: string;
  statusName: string;
  shortDescription: string;
  explanation: string;
  whyItHappens: string[];
  howLongItLasts: string;
  whatYouShouldDo: string[];
  faqs: { question: string; answer: string }[];
  relatedStatuses: { name: string; slug: string }[];
}

export const statuses: StatusMeaning[] = [
  {
    id: "pending",
    slug: "pending",
    statusName: "Pending",
    shortDescription: "SASSA has received your application but has not finalized the evaluation.",
    explanation: "The 'Pending' status is the initial stage of any SASSA application or monthly review. It signifies that your application is in the verification pipeline where details are cross-referenced with government databases like Home Affairs, SARS, and UIF.",
    whyItHappens: [
      "You have just submitted a new application.",
      "A new calendar month has started and SASSA is recalculating eligibility for the month.",
      "Automated batch systems are currently scanning your record for changes in income."
    ],
    howLongItLasts: "Usually 7 to 14 business days, but can take up to 30 days during peak processing periods or at the start of financial quarters.",
    whatYouShouldDo: [
      "Check back weekly; no direct action is needed while the status is 'Pending'.",
      "Ensure your contact details and banking records are completely correct in the system in case they need to contact you."
    ],
    faqs: [
      {
        question: "Can I speed up a pending status?",
        answer: "No. SASSA processes millions of claims simultaneously via automated monthly schedules. Calling the helpline will not accelerate a pending review."
      },
      {
        question: "Does pending mean I am approved?",
        answer: "No, it is a neutral state. It simply means verification is in progress."
      }
    ],
    relatedStatuses: [
      { name: "Application Complete", slug: "application-complete" },
      { name: "Pending 30 Days", slug: "pending-30-days" }
    ]
  },
  {
    id: "pending-30-days",
    slug: "pending-30-days",
    statusName: "Pending for 30+ Days",
    shortDescription: "Your application has been stuck in the verification phase for more than a month.",
    explanation: "If your status remains 'Pending' for over 30 days, it indicates a backlog in verification or a bottleneck with third-party databases (like the Department of Labour or Home Affairs).",
    whyItHappens: [
      "Unusually high volume of applicant reviews.",
      "Delays in receiving database confirmation from UIF (UIF server offline or slow response).",
      "Mismatched contact or bank detail flags that require manual secondary vetting by a SASSA officer."
    ],
    howLongItLasts: "Variable. It remains in this state until a SASSA clerk or the automated database sync overrides it with 'Approved' or 'Declined'.",
    whatYouShouldDo: [
      "Log into the portal to check if there is an outstanding action or document request.",
      "Verify that your bank account is active and verified by visiting the 'Update Bank Details' section.",
      "If 45 days pass without progress, contact the SASSA toll-free call centre or visit your local office."
    ],
    faqs: [
      {
        question: "Will I get backpay if my application is pending for months?",
        answer: "Yes. Once approved, SASSA backdates payment to the month you first applied, meaning you will receive a lump sum for all months that were pending."
      }
    ],
    relatedStatuses: [
      { name: "Pending", slug: "pending" },
      { name: "Bank Verification", slug: "bank-verification" }
    ]
  },
  {
    id: "approved",
    slug: "approved",
    statusName: "Approved",
    shortDescription: "Congratulations! Your grant application has been successful and is scheduled for payout.",
    explanation: "An 'Approved' status means SASSA has completed all safety and means tests, confirmed you qualify, and allocated funds for your payment.",
    whyItHappens: [
      "You met all eligibility and means test requirements.",
      "Third-party databases (SARS, UIF) confirmed you have no other active income.",
      "Your ID and bank details have been successfully verified."
    ],
    howLongItLasts: "This state persists until the payment is processed and handed over to your bank, or until the next monthly review cycle.",
    whatYouShouldDo: [
      "Look for a 'Pay Date' (e.g., 2026/07/04) shown alongside the status.",
      "If you receive payment via bank transfer, expect the funds in your account 1 to 3 days after the pay date.",
      "If you receive payment via Retailer Cash Send, wait for the SMS voucher before visiting Pick n Pay, Boxers, or USave."
    ],
    faqs: [
      {
        question: "My status says approved but there is no pay date. What does that mean?",
        answer: "This is common. It means you are approved for the month, but the national treasury has not yet finalized the payment batch file. A pay date will typically appear within 2-5 days."
      },
      {
        question: "Can an approved status change back to pending?",
        answer: "Yes. Every month is evaluated as a separate cycle. If you receive an inflow of cash in your bank account mid-month, the next cycle might show pending or declined."
      }
    ],
    relatedStatuses: [
      { name: "Payment Processing", slug: "payment-processing" }
    ]
  },
  {
    id: "cancelled",
    slug: "cancelled",
    statusName: "Cancelled",
    shortDescription: "Your grant has been stopped or archived.",
    explanation: "The 'Cancelled' status indicates that your grant is no longer active. This occurs either because you voluntarily cancelled it, you reached the age limit, or SASSA detected major non-compliance.",
    whyItHappens: [
      "You requested to cancel your grant (e.g., you found a new job).",
      "For child support grants, the child turned 18, which automatically terminates eligibility.",
      "You have not collected your grant payouts for 3 consecutive months.",
      "SASSA detected you are receiving an alternative income source like NSFAS or a pension."
    ],
    howLongItLasts: "Permanent, unless you file a formal reinstatement or appeal.",
    whatYouShouldDo: [
      "If this was a mistake, visit a SASSA office with proof of unemployment to request a grant reinstatement.",
      "If you voluntarily cancelled, no further action is required."
    ],
    faqs: [
      {
        question: "Can I reinstate a cancelled grant?",
        answer: "Yes, you can apply for reinstatement if your financial situation has worsened again. You will need to provide current bank statements and proof of unemployment."
      }
    ],
    relatedStatuses: [
      { name: "Alternative Income Source", slug: "alternative-income-source" },
      { name: "Referred", slug: "referred" }
    ]
  },
  {
    id: "bank-verification",
    slug: "bank-verification",
    statusName: "Bank Verification Pending",
    shortDescription: "SASSA is waiting for your bank to confirm that the account belongs to you.",
    explanation: "SASSA uses an automated verification system with South Africa's major commercial banks to ensure that grants are only paid into bank accounts matching the ID number of the approved beneficiary.",
    whyItHappens: [
      "You recently submitted or updated your bank details (account number, bank name).",
      "You switched your payment method from Post Office / Cash Send to a personal bank account.",
      "Your bank account has been flagged for a potential mismatch in name spelling or ID digits."
    ],
    howLongItLasts: "Typically takes 5 to 10 business days for the bank to complete the verification loop.",
    whatYouShouldDo: [
      "Ensure the bank account is registered in YOUR own name. SASSA will NOT pay a grant into a third-party's bank account.",
      "Make sure the account is active, not frozen, and has no limits that block incoming EFT transfers."
    ],
    faqs: [
      {
        question: "Can I use my relative's bank account?",
        answer: "No, absolutely not. SASSA bank verification will automatically fail if the ID registered at the bank does not match the applicant's SASSA ID."
      }
    ],
    relatedStatuses: [
      { name: "Identity Verification", slug: "identity-verification" }
    ]
  },
  {
    id: "identity-verification",
    slug: "identity-verification",
    statusName: "Identity Verification Failed / Pending",
    shortDescription: "SASSA was unable to verify your ID details with the Department of Home Affairs.",
    explanation: "This status indicates a critical error where the personal details (Name, Surname, ID Number) you provided do not match the official records at the Department of Home Affairs, or your facial verification has failed.",
    whyItHappens: [
      "Typographical error in spelling your name or entering the 13-digit ID.",
      "Your ID card has been reported lost, stolen, or flagged as deceased.",
      "Your biometric/facial verification process (required for SRD) failed to match your Home Affairs photo."
    ],
    howLongItLasts: "This block remains until you supply verified documentation or complete facial biometric verification.",
    whatYouShouldDo: [
      "Log into the SASSA portal and double-check your application details against your physical ID.",
      "If prompted for facial verification, click the secure biometric link sent to your phone and complete the selfie scan in high lighting.",
      "If the issue persists, visit a Home Affairs office to check your status, then bring your ID to SASSA to update your profile."
    ],
    faqs: [
      {
        question: "How do I do facial verification?",
        answer: "SASSA will send an SMS with a link starting with 'srd.sassa.gov.za'. Open the link on a smartphone, grant camera permissions, and follow the on-screen prompts to scan your face."
      }
    ],
    relatedStatuses: [
      { name: "Bank Verification", slug: "bank-verification" }
    ]
  },
  {
    id: "alternative-income-source",
    slug: "alternative-income-source",
    statusName: "Alternative Income Source Detected",
    shortDescription: "SASSA declined your grant because they found proof of other income.",
    explanation: "Social grants are safety nets strictly for those with little to no financial support. If SASSA's monthly audit scans detect that you have received income, wages, interest, or funding elsewhere, your application is automatically declined.",
    whyItHappens: [
      "You have an active job or are registered for PAYE tax.",
      "You are receiving a monthly payout from the Unemployment Insurance Fund (UIF).",
      "You are receiving funding from the National Student Financial Aid Scheme (NSFAS).",
      "Your bank statement showed a deposit/inflow higher than the legislated threshold (e.g., R624 for SRD)."
    ],
    howLongItLasts: "Applies to the month of detection. It will repeat each month as long as the cash flow or registration is found in the system.",
    whatYouShouldDo: [
      "If you are indeed unemployed and this is a mistake, you must submit an appeal on the DSD Appeals portal.",
      "Obtain an official UIF de-registration letter or NSFAS cancellation slip if you used to receive those funds but no longer do.",
      "Keep bank inflows to a minimum to avoid triggering the automated means test threshold."
    ],
    faqs: [
      {
        question: "A friend sent me R700. Will I get declined?",
        answer: "Yes. Any bank deposit, even a gift from family or friends, counts as income during SASSA's bank audit and can result in 'Alternative Income Source' decline."
      }
    ],
    relatedStatuses: [
      { name: "Means Test Failed", slug: "means-test-failed" }
    ]
  },
  {
    id: "means-test-failed",
    slug: "means-test-failed",
    statusName: "Means Test Failed",
    shortDescription: "Your declared income or assets exceed the maximum limit allowed.",
    explanation: "To qualify for most SASSA grants, applicants must undergo a financial 'means test'. This status indicates that your assets or household income exceed the legal threshold for the grant you applied for.",
    whyItHappens: [
      "Your annual income is higher than the single or married limit.",
      "The value of your property, shares, or bank assets exceeds the maximum threshold."
    ],
    howLongItLasts: "Remains active until you submit updated financial records showing you fall below the thresholds.",
    whatYouShouldDo: [
      "Check the threshold limits for your specific grant on our Grant Library page.",
      "If your financial situation has changed (e.g., you sold assets or lost income), submit a new financial declaration with your latest 3 months bank statements."
    ],
    faqs: [
      {
        question: "What is included in the means test?",
        answer: "Income from work, pensions, rentals, farm income, and assets like property (excluding the home you live in), investments, and cash in the bank."
      }
    ],
    relatedStatuses: [
      { name: "Alternative Income Source", slug: "alternative-income-source" }
    ]
  },
  {
    id: "referred",
    slug: "referred",
    statusName: "Referred",
    shortDescription: "Your application has been flagged for suspected fraudulent activity or audit.",
    explanation: "A 'Referred' status is a safety check. It means that SASSA's fraud detection system flagged your profile. This usually happens if your details are associated with multiple numbers, suspicious bank activity, or are identical to another applicant's profile.",
    whyItHappens: [
      "Your ID was used in multiple different applications.",
      "Your phone number is registered under a different name.",
      "An automated audit flagged your profile for manual human inspection."
    ],
    howLongItLasts: "This is a serious block and can remain active for weeks or months until a full fraud investigation is conducted.",
    whatYouShouldDo: [
      "Contact the SASSA Fraud Hotline on 0800 60 10 11.",
      "You will likely be required to visit a local SASSA office with certified copies of your ID, proof of address, and bank statements to clear your name."
    ],
    faqs: [
      {
        question: "Does referred mean I will be arrested?",
        answer: "No. It is a precautionary administrative lock to prevent unauthorized grant payouts. Once you verify your identity in person, the lock is lifted."
      }
    ],
    relatedStatuses: [
      { name: "Self Exclusion", slug: "self-exclusion" }
    ]
  },
  {
    id: "self-exclusion",
    slug: "self-exclusion",
    statusName: "Self Exclusion",
    shortDescription: "You have indicated in your application that you have another support source.",
    explanation: "This status occurs if you answered 'Yes' to certain questions in the application declaration, indicating that you have other means of survival, or if you are currently residing in a state-sponsored shelter, prison, or old-age home.",
    whyItHappens: [
      "You marked that you receive alternative funding.",
      "You marked that you are staying in a state-funded institution."
    ],
    howLongItLasts: "Active until you file an appeal or correct your application declaration.",
    whatYouShouldDo: [
      "If you made a mistake on your declaration, log into the portal and update your responses.",
      "If you do not have other support, file an appeal explaining your current living situation."
    ],
    faqs: [
      {
        question: "What is a state institution?",
        answer: "A government-funded facility like a state hospital, prison, or state old age home where your lodging and meals are fully covered by tax funds."
      }
    ],
    relatedStatuses: [
      { name: "Referred", slug: "referred" }
    ]
  },
  {
    id: "application-complete",
    slug: "application-complete",
    statusName: "Application Complete",
    shortDescription: "Your application and verification are complete, and you are waiting for monthly scheduling.",
    explanation: "This is a very positive status. It means SASSA has all your details, bank verification has passed, and your profile is fully complete. You are now placed in the monthly approval cycle.",
    whyItHappens: [
      "Your initial application and documents have been approved.",
      "Your bank account verification was successful."
    ],
    howLongItLasts: "Usually changes to 'Approved' or 'Declined' within the first week of the new calendar month.",
    whatYouShouldDo: [
      "Monitor the portal at the start of each month to see your approved pay dates."
    ],
    faqs: [
      {
        question: "Does complete mean I will definitely get paid?",
        answer: "Almost always, yes, provided your means test does not fail during the final monthly bank sweep."
      }
    ],
    relatedStatuses: [
      { name: "Approved", slug: "approved" }
    ]
  },
  {
    id: "payment-processing",
    slug: "payment-processing",
    statusName: "Payment Processing",
    shortDescription: "SASSA is currently transferring your funds to your bank or cash outlet.",
    explanation: "This is the final state of the payment cycle. It means SASSA has instructed the bank or payment merchant to release your funds.",
    whyItHappens: [
      "Your grant was approved and the pay date has arrived or is imminent.",
      "The national payment file was successfully submitted to the reserve bank."
    ],
    howLongItLasts: "Typically takes 24 to 48 hours to reflect in your bank account.",
    whatYouShouldDo: [
      "Check your bank account balance or wait for the SMS notification.",
      "If the status shows 'Payment Processing' for more than 5 days without reflection, request a bank statement to verify pending deposits."
    ],
    faqs: [
      {
        question: "Why is processing taking longer than 2 days?",
        answer: "Public holidays, weekends, or inter-bank clearing delays can occasionally extend the processing time."
      }
    ],
    relatedStatuses: [
      { name: "Approved", slug: "approved" }
    ]
  }
];
