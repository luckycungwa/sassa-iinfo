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
    shortDescription: "SASSA is still evaluating your grant application — no action needed while verification is in progress.",
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
    shortDescription: "Your SASSA application has been pending verification for over 30 days — contact SASSA if it exceeds 45 days.",
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
    shortDescription: "Your SASSA grant has been approved and funds are scheduled for payout on the assigned pay date.",
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
    id: "declined",
    slug: "declined",
    statusName: "Declined",
    shortDescription: "Your SASSA grant application was declined — you have 90 days to file an appeal with the Independent Tribunal.",
    explanation: "The 'Declined' status means SASSA has evaluated your application and determined that you do not currently qualify for the grant. This is not necessarily permanent — you have the right to appeal the decision to the Independent Tribunal within 90 days of receiving the decline notice.",
    whyItHappens: [
      "Your declared income or assets exceed the means test threshold.",
      "SASSA detected an alternative income source (UIF, NSFAS, employment).",
      "Your identity or bank verification failed.",
      "You did not submit required documents within the specified timeframe."
    ],
    howLongItLasts: "The decline applies to the current application cycle. You can re-apply or file an appeal within 90 days to reverse the decision.",
    whatYouShouldDo: [
      "Log into the SASSA DSD Appeals portal and file your appeal within 90 days.",
      "Check the specific reason for the decline listed in your application status.",
      "Gather supporting documents (bank statements, affidavit, proof of unemployment) to attach to your appeal."
    ],
    faqs: [
      {
        question: "Can I re-apply if my grant was declined?",
        answer: "Yes. You can submit a new application and SASSA will evaluate it from scratch based on your current financial situation."
      },
      {
        question: "How long does an appeal take?",
        answer: "The Independent Tribunal aims to process appeals within 60 to 90 days. You will receive an SMS notification with the outcome."
      }
    ],
    relatedStatuses: [
      { name: "Alternative Income Source", slug: "alternative-income-source" },
      { name: "Means Test Failed", slug: "means-test-failed" }
    ]
  },
  {
    id: "cancelled",
    slug: "cancelled",
    statusName: "Cancelled",
    shortDescription: "Your SASSA grant has been cancelled or stopped — visit a SASSA office to request reinstatement if needed.",
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
    shortDescription: "SASSA is verifying your bank account details with your bank to confirm ownership and active status.",
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
    shortDescription: "SASSA could not verify your ID with Home Affairs records — complete facial verification or update your details.",
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
    shortDescription: "SASSA detected other income or funding in your bank account — file an appeal if this is incorrect.",
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
    shortDescription: "SASSA determined your income or assets exceed the legal grant threshold — check the limits or file an appeal.",
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
    shortDescription: "Your SASSA application was flagged for suspected fraud — contact the SASSA Fraud Hotline to resolve this.",
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
    shortDescription: "Your application shows you declared another income source — file an appeal if this was a mistake.",
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
    shortDescription: "Your SASSA profile is fully verified and placed in the monthly approval cycle.",
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
    shortDescription: "SASSA is processing your grant payment — funds should reach your account within 24 to 48 hours.",
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
  },
  {
    id: "reapplication-required",
    slug: "reapplication-required",
    statusName: "Reapplication Required",
    shortDescription: "Your application has closed and a fresh application is needed for this period — this is not a decline.",
    explanation: "The application on record can no longer be assessed, usually because it was never completed, has lapsed, or needs updated details. Nothing has been decided about your eligibility.",
    whyItHappens: [
      "The application was started but never submitted.",
      "The application period closed before a decision was made.",
      "Contact or banking details could not be confirmed.",
      "A previous application was withdrawn or replaced."
    ],
    howLongItLasts: "Until you submit a new application or SASSA corrects the record. There is no automatic reinstatement.",
    whatYouShouldDo: [
      "Note which month the status refers to.",
      "Reapply with the same ID number and the same phone number you used before.",
      "Confirm your bank details in the same session.",
      "Keep the new reference number and check the status weekly."
    ],
    faqs: [
      {
        question: "Is Reapplication Required a decline?",
        answer: "No. A decline is a decision that you did not qualify. This status means there was no complete application for SASSA to assess."
      },
      {
        question: "Will the missed months be backdated?",
        answer: "SRD is paid per approved month and does not backdate across a gap, so reapply as soon as possible."
      }
    ],
    relatedStatuses: [
      { name: "No Records Found", slug: "no-records-found" },
      { name: "Declined", slug: "declined" }
    ]
  },
  {
    id: "uif-registered",
    slug: "uif-registered",
    statusName: "UIF Registered",
    shortDescription: "Your ID is linked to an active UIF record, so SASSA treats you as covered by unemployment insurance.",
    explanation: "SASSA checks your ID against Department of Labour records. An active UIF record — often left open because an employer never declared your termination — blocks the SRD month.",
    whyItHappens: [
      "A former employer registered you and never submitted a termination declaration.",
      "A short contract record was opened and never closed.",
      "Your ID was captured incorrectly by an employer.",
      "You receive UIF benefits for the same period."
    ],
    howLongItLasts: "Until the Department of Labour closes or corrects the record. Reapplying without fixing it usually produces the same decline.",
    whatYouShouldDo: [
      "Request a UI-19 termination certificate or UIF status letter.",
      "Visit a Labour Centre if the employer will not cooperate.",
      "Appeal the declined month within 90 days with the letter attached.",
      "Reapply once the record is corrected."
    ],
    faqs: [
      {
        question: "Can I receive SRD and UIF at the same time?",
        answer: "No. Both cover unemployment for the same period; if you qualify for UIF you are expected to claim it instead of SRD."
      }
    ],
    relatedStatuses: [
      { name: "Declined", slug: "declined" },
      { name: "Alternative Income Source", slug: "alternative-income-source" }
    ]
  },
  {
    id: "safps-flagged",
    slug: "safps-flagged",
    statusName: "SAFPS Flagged",
    shortDescription: "An identity or fraud-protection listing on your ID stopped the automated verification check.",
    explanation: "SAFPS is a fraud-prevention database used by banks and other members. A listing is usually a protective registration created after a lost ID, not a finding of wrongdoing, but SASSA cannot finalise verification until it is explained in writing.",
    whyItHappens: [
      "A protective registration exists against your ID.",
      "Someone used your ID to open accounts or applications.",
      "A lost or stolen ID was reported and never cleared.",
      "Your details were captured differently by a member organisation."
    ],
    howLongItLasts: "Until you supply a SAFPS letter or the listing is removed. The flag does not expire on its own.",
    whatYouShouldDo: [
      "Call SAFPS on 011 867 2234 for a copy of your letter or confirmation of your record.",
      "Open a SAPS case if impersonation is suspected.",
      "Take the letter to a SASSA office so the record can be annotated.",
      "Appeal the declined month with the same documents."
    ],
    faqs: [
      {
        question: "Does a SAFPS flag mean I committed fraud?",
        answer: "No. Most listings are protective registrations intended to stop identity theft."
      },
      {
        question: "Does SAFPS charge for a letter?",
        answer: "No. SAFPS does not charge the public for protective registration or for a copy of a listing letter."
      }
    ],
    relatedStatuses: [
      { name: "Identity Verification", slug: "identity-verification" },
      { name: "Referred", slug: "referred" }
    ]
  },
  {
    id: "deceased-record",
    slug: "deceased-record",
    statusName: "Deceased Record",
    shortDescription: "Home Affairs shows a death registered against the applicant's ID, so the grant is blocked.",
    explanation: "SASSA receives death indications from Home Affairs and must stop payments when one appears. For a living beneficiary this is a data error, often caused by a death captured under the wrong ID number.",
    whyItHappens: [
      "A death was registered against the wrong ID number.",
      "A duplicated identity file exists, with one marked deceased.",
      "A family member reported a death using incorrect details.",
      "Conflicting late birth registration records."
    ],
    howLongItLasts: "Until Home Affairs corrects the record. Payments stay blocked in the meantime.",
    whatYouShouldDo: [
      "Visit Home Affairs with your ID and request a record correction.",
      "Ask for written confirmation that you are alive and the record is fixed.",
      "Take the confirmation to a SASSA office.",
      "Ask about restoring the grant and payment for the blocked months."
    ],
    faqs: [
      {
        question: "Can SASSA fix this at their office?",
        answer: "No. SASSA can update its record only after Home Affairs confirms the correction."
      },
      {
        question: "What if the beneficiary has actually died?",
        answer: "Notify SASSA immediately, stop using the card, and deal with any amount still due through the estate."
      }
    ],
    relatedStatuses: [
      { name: "Identity Verification", slug: "identity-verification" },
      { name: "No Records Found", slug: "no-records-found" }
    ]
  },
  {
    id: "existing-grant",
    slug: "existing-grant",
    statusName: "Existing Grant",
    shortDescription: "SASSA records already show an active grant on this ID or for this child, so the new application is blocked.",
    explanation: "Some grants may run together and others may not. An adult may hold only one income-support grant, and a child cannot receive both a Child Support and a Foster Child Grant for the same period.",
    whyItHappens: [
      "You already receive the grant you applied for.",
      "You hold a conflicting income-support grant.",
      "The child is already on a grant under another caregiver.",
      "An old cancelled grant still shows as active.",
      "A duplicate identity record is linked to a grant."
    ],
    howLongItLasts: "Until the duplicate or conflicting record is resolved. Reapplying without changes gives the same result.",
    whatYouShouldDo: [
      "Check which grant and which child the existing record refers to.",
      "Ask SASSA which grant must be cancelled if you are switching.",
      "Arrange a child's grant transfer at an office with both caregivers and the birth certificate.",
      "Request a record clean-up if an old grant still shows as active."
    ],
    faqs: [
      {
        question: "Can I receive two SASSA grants?",
        answer: "Only in specific combinations. You cannot hold two income-support grants, but you can receive a Child Support Grant for a child while receiving your own Older Persons or Disability Grant."
      }
    ],
    relatedStatuses: [
      { name: "Reapplication Required", slug: "reapplication-required" },
      { name: "UIF Registered", slug: "uif-registered" }
    ]
  },
  {
    id: "no-records-found",
    slug: "no-records-found",
    statusName: "No Records Found",
    shortDescription: "SASSA could not match the ID and phone number you entered to any application — this is not a decline.",
    explanation: "The status lookup matches the ID number and cellphone number against the application record. A typo, a changed number, or an application that was never submitted leaves nothing to display.",
    whyItHappens: [
      "The ID number was typed incorrectly.",
      "The phone number is not the one used on the application.",
      "The application was started but never submitted.",
      "An agent submitted it under their own number.",
      "An older application was closed."
    ],
    howLongItLasts: "Until the correct details are used or a new application is submitted. It will not change on its own if no application exists.",
    whatYouShouldDo: [
      "Retry with your ID number exactly as printed and the original phone number.",
      "Look for an SMS confirmation or reference number.",
      "Ask any agent which number they used.",
      "If no reference exists, submit a fresh application and keep the confirmation.",
      "Call 0800 60 10 11 if you are certain an application exists."
    ],
    faqs: [
      {
        question: "Does No Records Found mean my grant was cancelled?",
        answer: "No. It means no application could be matched to the details you entered."
      },
      {
        question: "Should I reapply if I have a reference number?",
        answer: "No. Reapplying can create a duplicate; ask SASSA to trace the existing application instead."
      }
    ],
    relatedStatuses: [
      { name: "Reapplication Required", slug: "reapplication-required" },
      { name: "Pending", slug: "pending" }
    ]
  }
];
