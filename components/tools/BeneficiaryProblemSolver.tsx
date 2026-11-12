'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  Clock,
  HelpCircle,
  ExternalLink,
  Phone,
  FileText,
  Copy,
  Check,
  RotateCcw,
  Shield,
  ArrowRight,
  Filter,
} from 'lucide-react';

export interface ProblemScenario {
  id: string;
  category: 'srd' | 'banking' | 'appeals' | 'permanent';
  title: string;
  badge: string;
  shortSummary: string;
  whatItMeans: string;
  whatCouldCauseIt: string[];
  whatToCheck: string[];
  diagnosticQuestion?: {
    question: string;
    options: {
      label: string;
      advice: string;
    }[];
  };
  whatToDoNext: {
    steps: string[];
    officialAction: {
      label: string;
      url: string;
      isExternal: boolean;
    };
    contactPhone?: string;
    requiredDocuments?: string[];
    deadline?: string;
    guideUrl: string;
    guideTitle: string;
  };
}

export const problemScenarios: ProblemScenario[] = [
  {
    id: 'approved-no-pay-date',
    category: 'srd',
    title: 'Status shows Approved, but there is no payment date',
    badge: 'Approved (No Date)',
    shortSummary: 'Your application passed monthly verification, but your payment batch has not been scheduled yet.',
    whatItMeans:
      'SASSA has confirmed you qualify for this calendar month. However, payment dates are not issued immediately on approval. Payments are queued and released in batches once bank account verification confirms your details.',
    whatCouldCauseIt: [
      'Banking details were submitted or edited recently and are still in the 7 to 10 working day bank verification cycle.',
      'Your payment method is set to Cash Send, which requires Postbank or retailer cash vouchers to generate an SMS token.',
      'SASSA is still processing earlier application batches for the month. Approval notices run several days ahead of payment scheduling.',
      'Your bank account name does not match the spelling on your green ID book or smart ID card.',
    ],
    whatToCheck: [
      'Check the SRD portal to confirm your payment method says your active bank account, not an old account or pending cash send.',
      'Check that your bank account is active and able to receive electronic fund transfers without debit stop orders.',
      'Confirm you have not exceeded your bank account deposit limit (some basic digital accounts have monthly limits).',
      'Check your cellphone for SMS notifications from SASSA or your bank regarding voucher PINs.',
    ],
    diagnosticQuestion: {
      question: 'Which payment method is listed on your SASSA profile?',
      options: [
        {
          label: 'Personal Bank Account',
          advice:
            'If your bank account was added more than 14 days ago, check that your bank account holder name matches your ID exactly. Banks reject SASSA deposits if initials or surnames differ.',
        },
        {
          label: 'Cash Send / Retail Collection',
          advice:
            'Cash Send payments require a phone voucher SMS before you can collect at Pick n Pay, Boxer, Checkers or Shoprite. If your SIM card changed, update your number immediately.',
        },
      ],
    },
    whatToDoNext: {
      steps: [
        'Do not re-apply or delete your banking details while approved; doing so resets your verification timer.',
        'Wait 5 to 7 working days from the approval date for SASSA to assign your monthly pay day.',
        'If no date appears after 14 working days, log into the official SRD portal and review your bank details tab.',
        'If selecting Cash Send, ensure your registered cellphone number is active to receive the voucher SMS and PIN.',
      ],
      officialAction: {
        label: 'Check Pay Day on Official SRD Portal',
        url: 'https://srd.sassa.gov.za',
        isExternal: true,
      },
      contactPhone: '0800 60 10 11',
      deadline: 'Re-checked every calendar month',
      guideUrl: '/status/approved',
      guideTitle: 'Full Guide: What to Do When Approved Without a Payment Date',
    },
  },
  {
    id: 'alternative-income-detected',
    category: 'appeals',
    title: 'Declined: Alternative Income Source Detected',
    badge: 'Decline Reason',
    shortSummary: 'SASSA detected money entering your bank account or records of external income exceeding R624.',
    whatItMeans:
      'During monthly automated audits, SASSA cross-references your ID number with banking institutions, SARS tax registries, and employer databases. If your account received deposits totaling R624 or more in that calendar month, the system automatically marks you as having an alternative income.',
    whatCouldCauseIt: [
      'A family member or friend deposited money into your account for emergencies, groceries, or school fees.',
      'You transferred money between two of your own accounts, which the automated scanner misread as a new income deposit.',
      'Someone else used your bank account to receive their own funds.',
      'An old employer still has your tax number registered as active under PAYE, even though you no longer work there.',
      'You received a refund or loan repayment that was categorized as general income.',
    ],
    whatToCheck: [
      'Download your bank statements for the specific calendar month that was declined.',
      'Add up every single deposit or transfer into that account. If the total is R624 or higher, that triggered the decline.',
      'Check if an old employer submitted an IRP5 tax certificate in your name to SARS.',
      'Verify if any casual or temporary job was reported under your tax profile.',
    ],
    diagnosticQuestion: {
      question: 'Did your bank account receive R624 or more in the declined month?',
      options: [
        {
          label: 'Yes, but it was a family gift, loan, or emergency help',
          advice:
            'You must lodge an appeal with ITSAA. Write a sworn affidavit at a police station explaining that the deposit was once-off financial assistance from family and not recurring earned income.',
        },
        {
          label: 'No, my total deposits were under R624',
          advice:
            'This indicates a bank or database mismatch. Obtain official 3-month bank statements stamped by your bank and lodge an ITSAA appeal immediately attaching your bank proof.',
        },
      ],
    },
    whatToDoNext: {
      steps: [
        'Lodge an appeal with the Independent Tribunal (ITSAA) at srd.dsd.gov.za within 90 days of the decline.',
        'Submit a separate appeal for each month that was declined. SASSA evaluates each month as a standalone claim.',
        'Obtain a sworn police affidavit explaining non-income deposits if the funds were family support or emergency aid.',
        'Monitor your appeal status every 14 days on the DSD portal.',
      ],
      officialAction: {
        label: 'Lodge Appeal on DSD Portal',
        url: 'https://srd.dsd.gov.za',
        isExternal: true,
      },
      requiredDocuments: [
        'Bank statements for the declined month',
        'Sworn affidavit explaining one-off non-income deposits',
        'UI-19 termination form (if dispute involves past employment)',
      ],
      deadline: '90 days from the date of decline',
      guideUrl: '/appeals/appeal-after-income-source',
      guideTitle: 'Step-by-Step Guide: Appealing Alternative Income Source Declines',
    },
  },
  {
    id: 'uif-registered',
    category: 'appeals',
    title: 'Declined: UIF Registered / Department of Labour',
    badge: 'Decline Reason',
    shortSummary: 'The Department of Labour database shows you as currently employed or receiving UIF payouts.',
    whatItMeans:
      'SASSA checks Department of Employment and Labour records monthly. If your ID appears on the UIF registry as currently receiving unemployment benefits or registered as an active employee, your SRD application is declined.',
    whatCouldCauseIt: [
      'Your previous employer never submitted a UI-19 termination form to the Department of Labour when your contract ended.',
      'The Department of Labour database has not updated your employment status to terminated.',
      'You previously claimed UIF, but the payout cycle ended and the record remains flagged as open.',
      'Administrative delay between your retrenchment and government database synchronization.',
    ],
    whatToCheck: [
      'Log into the Department of Labour uFiling portal (ufiling.labour.gov.za) to inspect your employment status.',
      'Check if your last employer submitted a UI-19 form confirming your employment end date.',
      'Check whether your last UIF payment was received and what the official claim status shows.',
      'Confirm that you are not currently receiving active payments from the Unemployment Insurance Fund.',
    ],
    diagnosticQuestion: {
      question: 'When did you last work for the employer registered on your UIF record?',
      options: [
        {
          label: 'More than 3 months ago, but no UI-19 was submitted',
          advice:
            'Contact your former employer immediately to issue a signed UI-19 termination form. If the company closed down, visit your local Labour Centre for an affidavit.',
        },
        {
          label: 'I never worked for that employer or it is an administrative error',
          advice:
            'Visit the nearest Department of Labour centre with your ID to request an employment status printout confirming non-employment.',
        },
      ],
    },
    whatToDoNext: {
      steps: [
        'Get a signed UI-19 termination document or non-employment certificate from the Department of Labour.',
        'Lodge an appeal with the Independent Tribunal (ITSAA) at srd.dsd.gov.za for every declined month.',
        'Provide your UI-19 form or stamped Department of Labour proof showing your employment ended before the claim month.',
        'Check back on the ITSAA appeals portal within 60 to 90 days for the tribunal decision.',
      ],
      officialAction: {
        label: 'Lodge UIF Appeal on DSD Portal',
        url: 'https://srd.dsd.gov.za',
        isExternal: true,
      },
      contactPhone: '0800 030 007 (Department of Labour)',
      requiredDocuments: [
        'Signed UI-19 form showing termination date',
        'Letter of retrenchment or resignation acceptance',
        'Sworn affidavit if employer cannot be reached',
      ],
      deadline: '90 days from monthly decline notification',
      guideUrl: '/appeals/appeal-after-uif',
      guideTitle: 'How to Clear a False UIF Registration Decline on SASSA',
    },
  },
  {
    id: 'nsfas-registered',
    category: 'appeals',
    title: 'Declined: NSFAS Registered (Student Funding Detected)',
    badge: 'Decline Reason',
    shortSummary: 'SASSA detected active funding or student registration under the National Student Financial Aid Scheme.',
    whatItMeans:
      'Under social assistance regulations, students who receive NSFAS bursaries, living allowances, or university accommodation are excluded from receiving the SRD R370 grant because government already subsidizes their living expenses.',
    whatCouldCauseIt: [
      'You were previously funded by NSFAS in earlier years, but NSFAS records still mark your profile as active.',
      'You applied for NSFAS and were approved, but never actually registered at a tertiary institution.',
      'You completed your degree, diploma, or certificate, but the institution did not deregister you on the central bursary system.',
      'Your institution delayed sending graduation or dropout notification lists to NSFAS.',
    ],
    whatToCheck: [
      'Log into your myNSFAS student account (my.nsfas.org.za) to inspect your funding status for the current academic year.',
      'Check whether your academic institution released a formal completion letter, deregistration notice, or drop-out certificate.',
      'Confirm you have not received any NSFAS allowance payments into your bank account during this grant cycle.',
    ],
    diagnosticQuestion: {
      question: 'Are you currently registered and studying at a university or TVET college?',
      options: [
        {
          label: 'No, I graduated or dropped out',
          advice:
            'Download your completion certificate or cancellation letter from your university. You will need to attach this to your ITSAA appeal to prove you no longer receive student allowances.',
        },
        {
          label: 'Yes, but NSFAS rejected or cancelled my funding',
          advice:
            'Download the official rejection letter from your myNSFAS portal showing no funding was disbursed, and use it as evidence in your appeal.',
        },
      ],
    },
    whatToDoNext: {
      steps: [
        'Obtain an official NSFAS cancellation letter or university deregistration letter confirming funding ended.',
        'Lodge an appeal with ITSAA on srd.dsd.gov.za for each declined month.',
        'Attach your university deregistration letter or graduation certificate as supporting evidence.',
        'Allow 60 to 90 days for the Independent Tribunal to verify records with NSFAS.',
      ],
      officialAction: {
        label: 'Submit NSFAS Appeal to DSD',
        url: 'https://srd.dsd.gov.za',
        isExternal: true,
      },
      contactPhone: '0800 067 327 (NSFAS Helpline)',
      requiredDocuments: [
        'myNSFAS funding cancellation notice',
        'Academic transcript or completion certificate',
        '3 months bank statement proving zero NSFAS deposits',
      ],
      deadline: '90 days from decline date',
      guideUrl: '/appeals/appeal-after-nsfas',
      guideTitle: 'Appealing NSFAS Declines: Complete Checklist and Evidence',
    },
  },
  {
    id: 'bank-verification-pending',
    category: 'banking',
    title: 'Bank Verification Pending (Details Not Cleared)',
    badge: 'Banking Status',
    shortSummary: 'SASSA has sent your banking details to the commercial clearing system to verify your identity.',
    whatItMeans:
      'When you submit or update bank details, SASSA does not process payments immediately. Your details are sent to the banking clearance bureau (PASANet) to verify that the account is active, registered in your exact ID number, and open for electronic deposits.',
    whatCouldCauseIt: [
      'Bank details were submitted recently. Automated verification takes between 7 and 10 business days.',
      'The bank account is registered under a family member or friend instead of your own legal name.',
      'Mismatched name format (for example, missing second name or maiden surname on your bank records).',
      'The bank account is dormant, blocked, or frozen due to incomplete FICA documentation with your bank.',
    ],
    whatToCheck: [
      'Check your bank statement header to confirm your full names and ID number match your green ID book or smart card exactly.',
      'Check whether your bank has sent a FICA compliance alert requiring you to re-verify your proof of residence.',
      'Make sure you did not enter a joint bank account or an account belonging to someone else.',
      'Verify that the branch code, account number, and bank name were entered without typographical errors.',
    ],
    diagnosticQuestion: {
      question: 'Is the bank account in your own legal name and registered with your ID?',
      options: [
        {
          label: 'Yes, it is my personal account',
          advice:
            'If submitted within the last 10 working days, allow the banking clearing cycle to finish. Do not submit details again, as that restarts the 10-day counter.',
        },
        {
          label: 'No, it belongs to someone else',
          advice:
            'SASSA will reject this account. Regulations strictly forbid payments into third-party accounts. You must open a zero-fee account in your own name or choose Cash Send.',
        },
      ],
    },
    whatToDoNext: {
      steps: [
        'Leave the details untouched for 10 working days if recently submitted to let verification complete.',
        'If verification fails, open a bank account in your own name (many banks offer no-monthly-fee digital accounts).',
        'Alternatively, switch your payment method to Cash Send on the SRD portal if you do not have a bank account.',
        'Never use a third-party bank account; social assistance payments require matched beneficiary identification.',
      ],
      officialAction: {
        label: 'Manage Bank Details on SRD Portal',
        url: 'https://srd.sassa.gov.za',
        isExternal: true,
      },
      deadline: '7 to 10 working days typical duration',
      guideUrl: '/banking/bank-verification-process',
      guideTitle: 'SASSA Bank Verification Guide: Timelines and Rules',
    },
  },
  {
    id: 'lost-phone-number',
    category: 'banking',
    title: 'Lost Registered Cellphone Number (Cannot Receive OTP)',
    badge: 'Account Access',
    shortSummary: 'You lost your SIM card or changed numbers and cannot receive the security OTP to log in.',
    whatItMeans:
      'SASSA uses your registered cellphone number as your primary authentication key. Without receiving the one-time PIN (OTP), you cannot view your status, update bank details, or change your payment method online.',
    whatCouldCauseIt: [
      'SIM card lost, stolen, or expired due to inactivity (RICA deactivation).',
      'You changed network providers and lost access to your previous number.',
      'Someone else registered your original grant application using their own phone number.',
    ],
    whatToCheck: [
      'Check if your old SIM can still be recovered via a RICA SIM-swap at your mobile network branch.',
      'Have your 13-digit South African ID number and the Application ID from your original confirmation SMS ready.',
      'Verify whether you have an active email address linked to your profile.',
    ],
    whatToDoNext: {
      steps: [
        'Visit the official SRD portal and navigate to the "Change Phone Number" section.',
        'Enter your 13-digit South African ID number and Application ID.',
        'If you do not have your Application ID, use the automated biometric / facial verification option on the portal.',
        'If online identity vetting fails, call the SASSA toll-free helpline on 0800 60 10 11 or visit your nearest SASSA local branch with your original green ID or smart ID card.',
      ],
      officialAction: {
        label: 'Change Phone Number on SRD Portal',
        url: 'https://srd.sassa.gov.za',
        isExternal: true,
      },
      contactPhone: '0800 60 10 11',
      requiredDocuments: [
        'Original South African ID book or Smart ID card',
        'New RICA-registered SIM card in your name',
        'Affidavit of lost SIM card (if visiting an office)',
      ],
      guideUrl: '/guides/change-srd-phone-number',
      guideTitle: 'How to Change Your SASSA Phone Number Without the Old SIM',
    },
  },
  {
    id: 'status-pending-long',
    category: 'srd',
    title: 'Status is Pending (or Pending for 30+ Days)',
    badge: 'Application Pending',
    shortSummary: 'Your monthly verification is delayed in database queues or waiting on third-party government sync.',
    whatItMeans:
      'A pending status means your application has not been approved or declined yet. The SASSA system is actively awaiting verification responses from government partner databases including Home Affairs, SARS, UIF, or credit bureaus.',
    whatCouldCauseIt: [
      'High monthly volume during batch evaluation at the start or middle of the month.',
      'System outage or backlog with a partner database such as the Department of Labour or Home Affairs.',
      'Recent update to your profile details triggering secondary fraud risk verification.',
      'Initial application submitted close to monthly cut-off dates.',
    ],
    whatToCheck: [
      'Check the SRD portal to verify whether only the current month is pending or previous months are also unresolved.',
      'Check that your registered ID number and phone number are correct on your profile.',
      'Confirm you do not have multiple active applications created across different channels.',
    ],
    whatToDoNext: {
      steps: [
        'Do not submit a new application while pending; this creates duplicate records and delays processing.',
        'Check your status once a week on the official SRD portal or via USSD *134*7737#.',
        'If your application has been pending for more than 45 days, call SASSA on 0800 60 10 11 to request a manual escalation.',
        'If the status changes to Declined, you will have 90 days from that date to lodge an appeal.',
      ],
      officialAction: {
        label: 'Check Status on Official Portal',
        url: 'https://srd.sassa.gov.za',
        isExternal: true,
      },
      contactPhone: '0800 60 10 11',
      guideUrl: '/status/pending',
      guideTitle: 'Why Your SASSA Status Is Pending and How to Escalate',
    },
  },
  {
    id: 'referred-safps-flagged',
    category: 'appeals',
    title: 'Status shows Referred or SAFPS Flagged',
    badge: 'Security Risk Flag',
    shortSummary: 'Your ID or contact details have been flagged for fraud prevention or identity theft verification.',
    whatItMeans:
      'The South African Fraud Prevention Services (SAFPS) or SASSA internal risk engines detected high-risk activity linked to your ID number. This occurs when an ID is suspected of identity theft, multiple SIM card changes, or suspicious banking adjustments.',
    whatCouldCauseIt: [
      'Your ID number was reported as compromised or involved in identity theft.',
      'The same cellphone number or bank account was linked to multiple different grant applicants.',
      'Multiple rapid changes were made to your banking details or contact info within a short window.',
      'Your details triggered an automated risk threshold in the national fraud registry.',
    ],
    whatToCheck: [
      'Check if your ID document was recently lost, copied, or stolen.',
      'Confirm whether anyone else used your banking details or phone number for their own grant.',
      'Check your credit report or contact SAFPS to see if a protective protective listing was registered.',
    ],
    whatToDoNext: {
      steps: [
        'Send an email to referred@sassa.gov.za providing your 13-digit ID number and proof of identification.',
        'Complete the biometric / facial verification process when prompted on the official SRD portal.',
        'If you suspect someone opened accounts in your name, report identity fraud at a police station and obtain a case number.',
        'Visit your nearest SASSA local branch in person with your original ID book or smart card to verify your physical identity.',
      ],
      officialAction: {
        label: 'Official SRD Facial Verification',
        url: 'https://srd.sassa.gov.za',
        isExternal: true,
      },
      contactPhone: '0800 60 10 11',
      requiredDocuments: [
        'Original South African ID book or Smart ID card',
        'Proof of residential address',
        'Police case number (if identity theft suspected)',
        '3 months stamped bank statement in your name',
      ],
      guideUrl: '/status/referred',
      guideTitle: 'How to Resolve SASSA Referred and SAFPS Flagged Statuses',
    },
  },
  {
    id: 'pay-day-passed-no-money',
    category: 'banking',
    title: 'Payment Date Passed, but No Money in Bank Account',
    badge: 'Missing Payment',
    shortSummary: 'Your approved payment date has passed, but the funds have not cleared in your commercial bank account.',
    whatItMeans:
      'SASSA issues payment instructions according to batch dates. While the portal may state a specific payment date, inter-bank clearing cycles (BankservAfrica) can take 2 to 3 business days depending on which commercial bank you use.',
    whatCouldCauseIt: [
      'Inter-bank clearing delays, especially over weekends, public holidays, or month-end volume spikes.',
      'Your bank account was temporarily frozen due to overdue FICA documentation or KYC verification.',
      'The payment date fell on a Friday or weekend, causing funds to reflect on the next working Tuesday.',
      'Bank debit order took the incoming payment immediately upon clearance.',
    ],
    whatToCheck: [
      'Check your recent bank account transaction history for pending incoming EFT clearances.',
      'Check whether the payment date fell on a weekend or public holiday.',
      'Confirm whether your account balance was debited for banking fees or automatic stop orders.',
      'Check with your bank call centre whether an incoming EFT from SASSA/Postbank is currently pending clearance.',
    ],
    whatToDoNext: {
      steps: [
        'Wait 2 to 3 full business days from the stated payment date (excluding weekends and public holidays).',
        'Contact your bank customer care line with the payment date to confirm if an incoming transaction was queued or returned.',
        'If after 5 working days the money is not found, obtain a 30-day bank statement showing no deposit was received.',
        'Call the SASSA helpline (0800 60 10 11) to log an unpaid batch query with your ID number and payment date reference.',
      ],
      officialAction: {
        label: 'Check Status on SRD Portal',
        url: 'https://srd.sassa.gov.za',
        isExternal: true,
      },
      contactPhone: '0800 60 10 11',
      guideUrl: '/banking/payment-not-reflecting',
      guideTitle: 'Payment Not Reflecting: Step-by-Step Escalation Protocol',
    },
  },
  {
    id: 'permanent-grant-suspended',
    category: 'permanent',
    title: 'Older Persons or Disability Grant Suspended / Stopped',
    badge: 'Permanent Grants',
    shortSummary: 'Your monthly pension or disability grant was halted due to regular reviews, medical review, or means testing.',
    whatItMeans:
      'Permanent social grants are subject to periodic regulatory reviews under the Social Assistance Act. If SASSA issues a review notice and the beneficiary fails to respond within 90 days, or if circumstances change, the grant is placed on suspension.',
    whatCouldCauseIt: [
      'Failure to respond to a mandatory SASSA review letter sent via post or SMS within 90 days.',
      'A temporary Disability Grant (valid 6 to 12 months) has reached its medical expiry date.',
      'Changes in your financial means test (e.g., selling property, new spouse income, or new pension payout).',
      'Postbank Gold card expiry or non-migration to the new Postbank Black card.',
      'Suspected fraudulent claim or identity audit flag.',
    ],
    whatToCheck: [
      'Check whether your Disability Grant was permanent or temporary (temporary grants expire automatically after 6 or 12 months).',
      'Check if you received an official registered letter or SMS from SASSA requesting a grant review appointment.',
      'Verify that your Postbank Gold card is still operational or whether you need the new Black card.',
    ],
    whatToDoNext: {
      steps: [
        'Visit your local SASSA branch in person within 90 days of suspension to apply for grant restoration.',
        'Take your original ID, proof of income, 3 months bank statements, and proof of residence.',
        'If a temporary Disability Grant expired, book a new medical assessment with a SASSA-contracted medical doctor.',
        'If the restoration is refused, lodge a formal appeal with the Department of Social Development Minister within 90 days.',
      ],
      officialAction: {
        label: 'Find Nearest SASSA Office',
        url: '/offices',
        isExternal: false,
      },
      contactPhone: '0800 60 10 11',
      requiredDocuments: [
        'Original South African ID book or Smart ID card',
        'Proof of physical address',
        '3 months bank statements',
        'Medical assessment report (if disability grant)',
      ],
      deadline: '90 days from suspension date to apply for restoration',
      guideUrl: '/guides/sassa-suspense-restoration-guide',
      guideTitle: 'How to Restore a Suspended SASSA Pension or Disability Grant',
    },
  },
  {
    id: 'child-support-stopped',
    category: 'permanent',
    title: 'Child Support Grant Stopped or Caregiver Review Flagged',
    badge: 'Child Support',
    shortSummary: 'Payment for the Child Support Grant has stopped due to child age limit, caregiver review, or school verification.',
    whatItMeans:
      'The Child Support Grant pays R580 per child per month. Payouts stop automatically when the child turns 18 years old, if school attendance records fail to update, or if another relative claims primary care of the child.',
    whatCouldCauseIt: [
      'The child reached 18 years of age (grant terminates at the end of the month the child turns 18).',
      'Another relative or biological parent lodged a conflicting claim of primary caregiving.',
      'The primary caregiver failed to respond to a periodic SASSA review letter.',
      'The caregiver passed away or moved without notifying SASSA of a transfer of custody.',
    ],
    whatToCheck: [
      'Verify the child’s exact date of birth on their unabridged birth certificate.',
      'Confirm whether your household monthly income has exceeded the single caregiver (R5,000/mo) or married (R10,000/mo) means test.',
      'Check if someone else has registered the child at another SASSA branch.',
    ],
    whatToDoNext: {
      steps: [
        'If the child is under 18 and payment stopped unexpectedly, visit your local SASSA office immediately.',
        'Bring the child’s birth certificate, your ID, road-to-health clinic card, and school attendance certificate.',
        'If you are an informal caregiver (not the biological parent), bring a sworn affidavit from the biological parent or social worker confirmation.',
        'Request an immediate printout of your grant payment ledger from the SASSA service desk.',
      ],
      officialAction: {
        label: 'SASSA Office Directory by Province',
        url: '/provinces',
        isExternal: false,
      },
      contactPhone: '0800 60 10 11',
      requiredDocuments: [
        'Original 13-digit barcode birth certificate of the child',
        'Caregiver original South African ID',
        'School attendance report (if child is school-age)',
        'Clinic card / immunization proof (for infants)',
      ],
      guideUrl: '/grants/child-support-grant',
      guideTitle: 'Child Support Grant Requirements and Caregiver Reviews',
    },
  },
  {
    id: 'means-test-failed',
    category: 'appeals',
    title: 'Declined: Means Test Failed (Exceeded Income Limit)',
    badge: 'Decline Reason',
    shortSummary: 'SASSA financial checks determined that your personal income or assets exceed regulatory thresholds.',
    whatItMeans:
      'Every SASSA grant has an income threshold established by the Minister of Social Development. For the SRD R370 grant, the threshold is R624 per month. For Older Persons and Disability grants, the single income threshold is R9,920/mo and married is R19,840/mo.',
    whatCouldCauseIt: [
      'Bank account received deposits totaling more than the R624 threshold in that month.',
      'For permanent grants: Spouse earnings, private pension payouts, or property assets pushed household income over limits.',
      'Outdated tax assessment on SARS records indicating historic earnings that no longer exist.',
    ],
    whatToCheck: [
      'Check your bank statement for every deposit during the evaluated month.',
      'Check your SARS tax return status to ensure an old business or employment was closed.',
      'For pension/disability applicants, verify the exact calculation used for joint spousal assets.',
    ],
    whatToDoNext: {
      steps: [
        'Review your actual bank statement to calculate whether your deposits genuinely exceeded R624.',
        'If deposits were once-off non-income assistance, obtain an affidavit and appeal on srd.dsd.gov.za within 90 days.',
        'For permanent grant means test disputes, request a written reasons letter from the SASSA branch manager.',
        'Lodge an administrative appeal to the DSD Independent Tribunal with financial statements as proof.',
      ],
      officialAction: {
        label: 'Lodge Means Test Appeal to DSD',
        url: 'https://srd.dsd.gov.za',
        isExternal: true,
      },
      requiredDocuments: [
        '3 months bank statements for all accounts held',
        'SARS tax certificate or notice of non-assessment',
        'Sworn affidavit of financial dependency',
      ],
      deadline: '90 days from decline date',
      guideUrl: '/guides/understanding-means-test',
      guideTitle: 'SASSA Means Test Explained: Rules, Thresholds & Calculations',
    },
  },
  {
    id: 'identity-verification-required',
    category: 'srd',
    title: 'Identity Verification Required (Biometric / Facial Vetting)',
    badge: 'Verification Needed',
    shortSummary: 'SASSA requires electronic facial verification to confirm you are the true owner of the application.',
    whatItMeans:
      'To combat syndicate fraud and unauthorized banking changes, SASSA requires beneficiaries to complete automated facial recognition. An SMS link is sent to your registered phone number with a secure camera link to confirm your face matches Home Affairs ID records.',
    whatCouldCauseIt: [
      'You requested a change to your registered phone number or bank details.',
      'Your profile was selected in a high-risk security batch audit.',
      'Multiple applications were detected originating from the same IP address or device.',
    ],
    whatToCheck: [
      'Check that your smartphone camera lens is clean and you have adequate lighting.',
      'Confirm the SMS link came from official SASSA communication (ensure the link starts with srd.sassa.gov.za).',
      'Ensure you are in a quiet room with a plain background when taking the facial verification photo.',
    ],
    whatToDoNext: {
      steps: [
        'Click the official verification link received via SMS on your registered phone number.',
        'Follow on-screen instructions: look directly into the camera, blink when prompted, and hold steady.',
        'Do not wear hats, sunglasses, or face coverings during the biometric scan.',
        'If the online camera test fails repeatedly, visit your nearest SASSA local branch with your physical ID card for manual in-person verification.',
      ],
      officialAction: {
        label: 'Official SRD Portal Verification',
        url: 'https://srd.sassa.gov.za',
        isExternal: true,
      },
      contactPhone: '0800 60 10 11',
      requiredDocuments: [
        'Original green South African ID book or Smart ID card',
        'Smartphone with active camera and mobile data',
      ],
      guideUrl: '/status/identity-verification',
      guideTitle: 'SASSA Biometric & Facial Verification: Troubleshooting Guide',
    },
  },
  {
    id: 'gold-card-expiry',
    category: 'banking',
    title: 'Postbank Gold Card Expiry & Black Card Transition',
    badge: 'Card & Cash',
    shortSummary: 'Postbank and SASSA are phasing out old Gold Cards in favor of new Black Postbank cards or direct bank deposits.',
    whatItMeans:
      'SASSA Gold Cards issued by Postbank remain valid for social grant withdrawals, but beneficiaries are advised to swap to the new Postbank Black card or switch payments directly to personal commercial bank accounts (Capitec, TymeBank, FNB, Standard Bank, Nedbank, Absa) to avoid ATM disruptions.',
    whatCouldCauseIt: [
      'Postbank ATM system updates and card replacement drives nationwide.',
      'Damaged magnetic strip or chip errors on old cards at retail tills.',
      'Card expired or swallowed by an ATM.',
    ],
    whatToCheck: [
      'Check the expiration date stamped on the front of your Postbank Gold card.',
      'Check whether your card still functions at major retailers (Boxer, Pick n Pay, Shoprite, Spar).',
      'Determine whether you already have a personal bank account in your own name.',
    ],
    whatToDoNext: {
      steps: [
        'You can continue using your Gold card at retail tills and ATMs while valid.',
        'To get the new Postbank Black card, visit a designated Postbank site or participating retailer with your ID.',
        'Alternatively, switch your payment method directly to your own commercial bank account on the SRD portal or at a SASSA branch.',
        'Direct bank deposits are faster, safer, and eliminate the risk of ATM card-swallowing or long Post Office queues.',
      ],
      officialAction: {
        label: 'Read Black Card Swap Guide',
        url: '/banking/black-card-swap',
        isExternal: false,
      },
      contactPhone: '0800 53 54 55 (Postbank Hotline)',
      requiredDocuments: [
        'Original green ID book or smart ID card',
        'Current Postbank Gold card',
        'Proof of residence (for bank updates)',
      ],
      guideUrl: '/banking/sassa-card-replacement',
      guideTitle: 'Lost, Stolen or Expired SASSA Card Replacement Guide',
    },
  },
];

export default function BeneficiaryProblemSolver() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProblemId, setSelectedProblemId] = useState<string>('approved-no-pay-date');
  const [diagnosticAnswer, setDiagnosticAnswer] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<boolean>(false);

  const filteredProblems = useMemo(() => {
    return problemScenarios.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.badge.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeProblem = useMemo(() => {
    return (
      problemScenarios.find((p) => p.id === selectedProblemId) ||
      filteredProblems[0] ||
      problemScenarios[0]
    );
  }, [selectedProblemId, filteredProblems]);

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handleCopyPlan = () => {
    if (!activeProblem) return;
    const planText = `SASSA GRANT HUB ACTION PLAN
Situation: ${activeProblem.title}
Summary: ${activeProblem.shortSummary}

WHAT IT MEANS:
${activeProblem.whatItMeans}

WHAT COULD CAUSE IT:
${activeProblem.whatCouldCauseIt.map((c) => `- ${c}`).join('\n')}

WHAT TO CHECK:
${activeProblem.whatToCheck.map((c) => `[ ] ${c}`).join('\n')}

WHAT TO DO NEXT:
${activeProblem.whatToDoNext.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Official Link: ${activeProblem.whatToDoNext.officialAction.url}
Helpline: ${activeProblem.whatToDoNext.contactPhone || '0800 60 10 11'}
Full Guide: https://www.sassagranthub.co.za${activeProblem.whatToDoNext.guideUrl}

Generated privately on SassaGrantHub.co.za`;

    navigator.clipboard.writeText(planText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden" id="problem-solver">
      {/* Banner / Header */}
      <div className="bg-slate text-white p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow/20 text-yellow text-xs font-bold uppercase tracking-wider mb-2">
              <Shield className="w-3.5 h-3.5" />
              Beneficiary Problem-Solving Centre
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              What is happening with your SASSA grant?
            </h2>
            <p className="text-white/80 text-sm mt-1.5 max-w-2xl leading-relaxed">
              Select your exact situation below to get an immediate, verified diagnosis: what it means, what could cause it, what to check, and your step-by-step action plan.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl p-3.5 text-xs text-white/90 max-w-xs shrink-0">
            <p className="font-bold flex items-center gap-1.5 text-yellow">
              <Shield className="w-4 h-4" /> 100% Private &amp; Client-Side
            </p>
            <p className="mt-1 leading-snug text-white/75">
              Runs completely in your browser. We never collect or store your ID number, bank details, or OTPs.
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-white/50" />
            <input
              type="text"
              placeholder="Search problem (e.g. approved no pay date, income source, UIF, bank verification)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-yellow transition"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {[
              { id: 'all', label: 'All Situations' },
              { id: 'srd', label: 'SRD R370' },
              { id: 'banking', label: 'Bank & Cards' },
              { id: 'appeals', label: 'Declines & Appeals' },
              { id: 'permanent', label: 'Older Persons / Child / Disability' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-yellow text-slate font-black'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Two-Column Interactive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        {/* Left Column: Problem List */}
        <div className="lg:col-span-5 border-r border-border bg-paper/50 p-4 md:p-5 space-y-2 overflow-y-auto max-h-[700px]">
          <p className="text-xs font-bold text-ash uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
            <span>Select Your Situation ({filteredProblems.length})</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-violet hover:underline lowercase font-normal"
              >
                clear search
              </button>
            )}
          </p>

          {filteredProblems.length === 0 ? (
            <div className="p-8 text-center text-ash bg-surface rounded-xl border border-border">
              <HelpCircle className="w-8 h-8 mx-auto mb-2 text-ash/60" />
              <p className="text-sm font-bold text-carbon">No matching situation found</p>
              <p className="text-xs text-ash mt-1">Try another keyword or select &quot;All Situations&quot;.</p>
            </div>
          ) : (
            filteredProblems.map((problem) => {
              const isSelected = activeProblem.id === problem.id;
              return (
                <button
                  key={problem.id}
                  onClick={() => {
                    setSelectedProblemId(problem.id);
                    setDiagnosticAnswer(null);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-yellow/20 border-yellow text-carbon shadow-xs'
                      : 'bg-surface border-border hover:border-border-strong text-body hover:bg-canvas'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                        isSelected
                          ? 'bg-yellow text-slate'
                          : 'bg-fog text-ash'
                      }`}
                    >
                      {problem.badge}
                    </span>
                    <span className="text-xs font-mono text-ash capitalize">{problem.category}</span>
                  </div>
                  <h3 className="text-sm font-bold text-carbon leading-snug">{problem.title}</h3>
                  <p className="text-xs text-ash line-clamp-2 leading-relaxed">{problem.shortSummary}</p>
                </button>
              );
            })
          )}
        </div>

        {/* Right Column: 4-Pillar Differentiating Diagnostic Plan */}
        <div className="lg:col-span-7 p-6 md:p-8 space-y-6 bg-surface overflow-y-auto max-h-[700px]">
          {/* Header of Active Problem */}
          <div className="border-b border-border pb-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-yellow/30 text-carbon uppercase tracking-wider">
                {activeProblem.badge}
              </span>
              <button
                onClick={handleCopyPlan}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-violet hover:underline py-1 px-2.5 rounded-md hover:bg-fog transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Action Plan Copied!' : 'Copy Action Plan'}
              </button>
            </div>
            <h1 className="text-2xl font-black text-carbon tracking-tight">{activeProblem.title}</h1>
            <p className="text-sm text-ash mt-1 leading-relaxed">{activeProblem.shortSummary}</p>
          </div>

          {/* Pillar 1: What It Means */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate text-white text-xs font-black flex items-center justify-center shrink-0">
                1
              </span>
              <h2 className="text-sm font-black text-carbon uppercase tracking-wider">
                What this status means
              </h2>
            </div>
            <div className="p-4 rounded-xl bg-fog border border-border text-sm text-body leading-relaxed">
              {activeProblem.whatItMeans}
            </div>
          </div>

          {/* Pillar 2: What Could Cause It */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate text-white text-xs font-black flex items-center justify-center shrink-0">
                2
              </span>
              <h2 className="text-sm font-black text-carbon uppercase tracking-wider">
                What could cause it
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-body">
              {activeProblem.whatCouldCauseIt.map((cause, i) => (
                <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-paper border border-border">
                  <AlertTriangle className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                  <span className="leading-snug">{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Diagnostic Refinement Question (if applicable) */}
          {activeProblem.diagnosticQuestion && (
            <div className="p-4 rounded-xl bg-yellow/15 border border-yellow/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-carbon uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-violet" />
                Refine Your Diagnosis
              </div>
              <p className="text-sm font-bold text-carbon">
                {activeProblem.diagnosticQuestion.question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeProblem.diagnosticQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setDiagnosticAnswer(idx)}
                    className={`p-3 text-left rounded-lg text-xs font-semibold border transition ${
                      diagnosticAnswer === idx
                        ? 'bg-yellow border-slate text-slate font-black shadow-xs'
                        : 'bg-surface border-border hover:bg-canvas text-body'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {diagnosticAnswer !== null && (
                <div className="p-3 bg-surface rounded-lg border border-border text-xs text-body leading-relaxed">
                  <p className="font-bold text-carbon mb-1">Tailored Recommendation:</p>
                  {activeProblem.diagnosticQuestion.options[diagnosticAnswer].advice}
                </div>
              )}
            </div>
          )}

          {/* Pillar 3: What to Check */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate text-white text-xs font-black flex items-center justify-center shrink-0">
                  3
                </span>
                <h2 className="text-sm font-black text-carbon uppercase tracking-wider">
                  What to check right now
                </h2>
              </div>
              <span className="text-xs text-ash">Check items as you verify</span>
            </div>
            <div className="space-y-2">
              {activeProblem.whatToCheck.map((item, i) => {
                const isChecked = Boolean(checkedItems[item]);
                return (
                  <label
                    key={i}
                    onClick={() => toggleCheck(item)}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition select-none ${
                      isChecked
                        ? 'bg-fog border-border text-ash line-through'
                        : 'bg-surface border-border hover:border-border-strong text-body'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 rounded border-border text-violet focus:ring-violet"
                    />
                    <span className="text-xs sm:text-sm leading-snug">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Pillar 4: What to Do Next */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-violet text-white text-xs font-black flex items-center justify-center shrink-0">
                4
              </span>
              <h2 className="text-sm font-black text-carbon uppercase tracking-wider">
                What to do next (Action Plan)
              </h2>
            </div>

            <ol className="space-y-2.5">
              {activeProblem.whatToDoNext.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-body leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-fog border border-border text-carbon font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            {/* Required Documents / Contacts box if any */}
            {(activeProblem.whatToDoNext.requiredDocuments ||
              activeProblem.whatToDoNext.contactPhone ||
              activeProblem.whatToDoNext.deadline) && (
              <div className="p-4 rounded-xl bg-fog border border-border text-xs space-y-2.5 mt-4">
                {activeProblem.whatToDoNext.deadline && (
                  <div className="flex items-center gap-2 text-carbon">
                    <Clock className="w-4 h-4 text-amber shrink-0" />
                    <span>
                      <strong>Deadline:</strong> {activeProblem.whatToDoNext.deadline}
                    </span>
                  </div>
                )}
                {activeProblem.whatToDoNext.contactPhone && (
                  <div className="flex items-center gap-2 text-carbon">
                    <Phone className="w-4 h-4 text-violet shrink-0" />
                    <span>
                      <strong>Official Line:</strong>{' '}
                      <a href={`tel:${activeProblem.whatToDoNext.contactPhone.replace(/\s+/g, '')}`} className="font-bold underline">
                        {activeProblem.whatToDoNext.contactPhone}
                      </a>
                    </span>
                  </div>
                )}
                {activeProblem.whatToDoNext.requiredDocuments && (
                  <div>
                    <p className="font-bold text-carbon mb-1 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-ash" /> Documents to prepare:
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-ash pl-1">
                      {activeProblem.whatToDoNext.requiredDocuments.map((doc, dIdx) => (
                        <li key={dIdx}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Direct Official Portal Button & In-Depth Guide Link */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <a
                href={activeProblem.whatToDoNext.officialAction.url}
                target={activeProblem.whatToDoNext.officialAction.isExternal ? '_blank' : '_self'}
                rel={activeProblem.whatToDoNext.officialAction.isExternal ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet text-white text-xs font-bold hover:opacity-90 transition shadow-xs text-center"
              >
                <span>{activeProblem.whatToDoNext.officialAction.label}</span>
                {activeProblem.whatToDoNext.officialAction.isExternal ? (
                  <ExternalLink className="w-3.5 h-3.5" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
              </a>

              <Link
                href={activeProblem.whatToDoNext.guideUrl}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-border text-carbon text-xs font-bold hover:bg-fog transition text-center"
              >
                <span>Read Verified Guide</span>
                <ArrowRight className="w-3.5 h-3.5 text-ash" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
