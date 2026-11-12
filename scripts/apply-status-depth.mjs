/**
 * One-off content depth pass for the status-meaning pages.
 *
 * Each status page previously consisted of the same four blocks — what it
 * means, why it happens, how long it lasts, what to do — followed by an FAQ.
 * This script adds two page-specific sections to every status page:
 *
 *   1. a worked example (illustrative, not a real applicant)
 *   2. an "official basis" section naming where SASSA or the relevant
 *      department actually publishes the rule being described
 *
 * It is idempotent: blocks whose id starts with "depth-" are removed before
 * the new ones are inserted, so running it twice does not duplicate content.
 *
 * Facts are limited to what the page already states, or to directions a
 * reader can verify at the official source. No new amounts, deadlines or
 * quotations are introduced.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW_DATE = "2026-11-12";

const SASSA = { label: "SASSA — official grant information", url: "https://www.sassa.gov.za" };
const SRD = { label: "SASSA SRD R370 status portal", url: "https://srd.sassa.gov.za" };
const DHA = { label: "Department of Home Affairs", url: "https://www.dha.gov.za" };
const SAFPS = { label: "Southern African Fraud Prevention Service", url: "https://www.safps.org.za" };
const UFILING = { label: "Department of Employment and Labour — uFiling", url: "https://ufiling.labour.gov.za" };
const NSFAS = { label: "National Student Financial Aid Scheme", url: "https://www.nsfas.org.za" };
const GAZETTE = { label: "Government Gazette (GPW)", url: "https://www.gpwonline.co.za" };
const POSTBANK = { label: "Postbank — social grants", url: "https://www.postbank.co.za" };
const SAPS = { label: "South African Police Service", url: "https://www.saps.gov.za" };

const DEPTH = {
  pending: {
    example: {
      heading: "A worked example: a first SRD application in its second week",
      blocks: [
        {
          type: "paragraph",
          text: "Thandi submitted her first SRD R370 application on 3 November on srd.sassa.gov.za, using her smart ID and the cellphone number registered in her own name. Nine days later the portal still reads Pending. Nothing has gone wrong: Pending is the queue, not a decision, and a brand-new application is expected to sit there while identity and income checks run.",
        },
        {
          type: "paragraph",
          text: "The useful thing she can do is a single, calm audit rather than repeated checking. She confirms the 13-digit ID number has no spaces or transposed digits, confirms the cellphone number on the application is the SIM currently in her phone, and reads her SMS inbox for any message from SASSA asking for a selfie or document. If all three are correct, the only remaining action is to wait for the month to resolve.",
        },
        {
          type: "callout",
          intent: "warning",
          title: "Do not submit a second application",
          text: "A duplicate does not move you forward in the queue and it can leave two records against one ID number. If something genuinely needs correcting, change it on the existing record rather than starting again.",
        },
      ],
    },
    official: {
      heading: "Where the Pending status actually comes from",
      text: "SASSA does not publish an individual's position in the queue, so the only authoritative view of your own record is the status screen at srd.sassa.gov.za, opened with the ID number and cellphone number used on the application. General requirements for grant applications, including the documents SASSA asks for, are published at sassa.gov.za. The waiting periods quoted on this page are typical ranges drawn from that published guidance, not a promise about your specific file.",
      links: [
        { text: "the SRD status portal", href: "https://srd.sassa.gov.za" },
        { text: "SASSA's application guidance", href: "https://www.sassa.gov.za" },
      ],
    },
    sources: [SRD, SASSA],
  },

  "pending-30-days": {
    example: {
      heading: "A worked example: day 38 with no movement",
      blocks: [
        {
          type: "paragraph",
          text: "Sipho applied on 2 October. By 9 November — 38 days later — his status had not moved beyond Pending. Instead of calling immediately, he worked through the three databases that usually cause the hold-up: the SRD portal for any unread document request, his bank for a dormant or FICA-restricted account, and uFiling for an employment record that was opened and never closed.",
        },
        {
          type: "paragraph",
          text: "The last check found the problem. A former employer had registered him for a contract that ended in August but never filed the termination. He requested a UI-19 termination certificate, then visited his nearest SASSA office with that letter and his ID so the record could be annotated. That is the point at which a phone call or an office visit becomes worth the queue: once there is a specific, documented discrepancy to correct.",
        },
        {
          type: "steps",
          steps: [
            { title: "Check for an outstanding request", description: "Open the SRD portal and look for a banner or prompt asking for a document or a selfie." },
            { title: "Check your bank account is usable", description: "A dormant, closed or FICA-restricted account blocks payment even when eligibility has passed." },
            { title: "Check for an open UIF record", description: "An unclosed employment record is the most common invisible cause of a long Pending." },
            { title: "Escalate with evidence", description: "After 45 days, take the specific document that shows the discrepancy to SASSA rather than describing it from memory." },
          ],
        },
      ],
    },
    official: {
      heading: "The official escalation route",
      text: "The toll-free SASSA helpline is 0800 60 10 11, and a district office can annotate a record that the automated checks cannot clear. Employment records are held by the Department of Employment and Labour and can be viewed on uFiling, which is where a UI-19 letter or termination certificate originates. Neither SASSA nor the department publishes a guaranteed resolution time for a manual correction, which is why this page describes the evidence to bring rather than a deadline to expect.",
      links: [
        { text: "uFiling", href: "https://ufiling.labour.gov.za" },
        { text: "the SRD portal", href: "https://srd.sassa.gov.za" },
      ],
    },
    sources: [SRD, UFILING, SASSA],
  },

  approved: {
    example: {
      heading: "A worked example: approved, then paid two days later",
      blocks: [
        {
          type: "paragraph",
          text: "Nomsa's Older Persons Grant changed to Approved, and the portal showed the pay date for her grant category next to the month badge. Because her grant is paid by bank transfer into her own account, the money appeared the working day after that date rather than on it. Had she chosen a cash-send collection, the sequence would have been different: she would have waited for a voucher SMS before going to a retailer.",
        },
        {
          type: "paragraph",
          text: "Two weeks later her status still read Approved but with no pay date for the new month. That is the normal in-between state — approval for a month is recorded before the national payment file for that month is finalised. It becomes a problem worth acting on only when the published pay date for her category has passed and nothing has arrived.",
        },
        {
          type: "table",
          headers: ["What you see", "What it means", "What to do"],
          rows: [
            ["Approved with a pay date", "Approved for that month and scheduled", "Wait for the pay date, then allow for bank clearing"],
            ["Approved with no pay date yet", "Decision recorded, payment batch not finalised", "Check again in a few days; nothing to submit"],
            ["Approved, pay date passed, no money", "Payment may have failed at the bank", "Check the account is active, then follow the escalation route"],
          ],
          caption: "Three forms of the Approved status and the correct response to each",
        },
      ],
    },
    official: {
      heading: "Where pay dates and amounts are published",
      text: "Grant amounts and the annual payment schedule are published by SASSA at sassa.gov.za, and payments for permanent grants are disbursed through Postbank and the commercial banks. The pay date shown against your own approved month on the SRD portal is the authoritative date for your record; the calendar on this site reproduces the published national schedule and is dated so you can see when it was last checked.",
      links: [
        { text: "SASSA", href: "https://www.sassa.gov.za" },
        { text: "Postbank", href: "https://www.postbank.co.za" },
      ],
    },
    sources: [SASSA, POSTBANK],
  },

  "payment-processing": {
    example: {
      heading: "A worked example: processing on the pay date, but no money",
      blocks: [
        {
          type: "paragraph",
          text: "Ayanda's status moved to Payment Processing on her pay date. Two days later her balance was unchanged. The grant was being paid by bank transfer into an account she had not used for four months. The account was still open, but it had gone dormant, and a dormant account cannot accept an incoming credit until it is reactivated at the branch with her ID.",
        },
        {
          type: "paragraph",
          text: "The distinction that matters here is between a payment that is still clearing and a payment that never landed. Interbank clearing explains a day or two; it does not explain a week. If the money is genuinely missing, the bank statement — not the banking app summary — is the document to request, because it shows whether a credit was presented and returned.",
        },
        {
          type: "callout",
          intent: "info",
          title: "When 'processing' stops being normal",
          text: "Give it up to 48 hours, plus a weekend or public holiday. If the status still reads Payment Processing after five days and no credit appears on a bank statement, treat it as a failed payment and start the escalation rather than waiting for it to fix itself.",
        },
      ],
    },
    official: {
      heading: "Who actually moves the money",
      text: "SASSA approves the payment and instructs the disbursing institution; Postbank and the beneficiary's own bank then clear it through the national payment system. That is why a query about a missing payment usually needs both sides: SASSA can confirm the payment was issued, and the bank can confirm whether it was received, held or returned. Payment methods and account requirements are set out at sassa.gov.za and postbank.co.za.",
      links: [
        { text: "SASSA payment information", href: "https://www.sassa.gov.za" },
        { text: "Postbank", href: "https://www.postbank.co.za" },
      ],
    },
    sources: [SASSA, POSTBANK],
  },

  declined: {
    example: {
      heading: "A worked example: a decline with a 90-day clock",
      blocks: [
        {
          type: "paragraph",
          text: "Lerato's SRD application was declined in September with alternative income given as the reason. In August her sister had transferred R900 to cover school fees, and the monthly bank sweep read that single deposit as income for the month. She had 90 days from the decline to challenge it, and she used the time to assemble the appeal rather than to reapply.",
        },
        {
          type: "paragraph",
          text: "Her appeal bundle was deliberately small and specific: three months of bank statements for the affected account, an affidavit explaining that the R900 was a once-off family transfer for school fees, and proof that she had no employer or UIF record for that period. A fresh application would have been assessed against the same bank data and produced the same outcome, which is why the appeal route — not a reapplication — is the correct response to a decline you believe is wrong.",
        },
        {
          type: "steps",
          steps: [
            { title: "Read the reason, not just the word", description: "The decline reason determines the evidence: income, identity, banking or documents." },
            { title: "Note the month and the deadline", description: "Each month is assessed separately, and the 90-day window runs from that decline." },
            { title: "Assemble evidence for that month", description: "Bank statements for the specific month, plus an affidavit for anything that looks like income but is not." },
            { title: "Lodge the appeal, then track it", description: "Submit through the official appeals channel and keep the reference; do not pay anyone to appeal for you." },
          ],
        },
      ],
    },
    official: {
      heading: "The statutory basis for appealing",
      text: "A decline is an administrative decision under the Social Assistance Act 13 of 2004 and its regulations, and it can be taken on appeal to the Independent Tribunal for Social Assistance Appeals within 90 days. The Act and the regulations are published in the Government Gazette, and the appeal is free — SASSA and the Tribunal do not charge for it. This page explains how the process works; it cannot lodge an appeal or predict an outcome.",
      links: [
        { text: "the Government Gazette", href: "https://www.gpwonline.co.za" },
        { text: "SASSA", href: "https://www.sassa.gov.za" },
      ],
    },
    sources: [SASSA, GAZETTE],
  },

  cancelled: {
    example: {
      heading: "A worked example: a grant that stopped without a letter",
      blocks: [
        {
          type: "paragraph",
          text: "A Child Support Grant for a teenager stops when the child turns 18; there is no decision to appeal, because eligibility has ended by operation of the age rule. A different case is a grant that stops because the beneficiary did not collect it for three consecutive months, or because an income record appeared against the ID. The first is final, the second can usually be reversed.",
        },
        {
          type: "paragraph",
          text: "The practical test is whether the cancellation was voluntary or administrative. If you cancelled because you found work, nothing needs to be done and the record should stay closed. If you never cancelled anything, the reinstatement route is a district office visit with proof of your current circumstances — and, where an income record caused the stop, the document that shows the record is wrong.",
        },
        {
          type: "list",
          items: [
            "Voluntary cancellation at your own request — no action needed, the file is closed correctly.",
            "Age-based ending of a child grant — no appeal, because the qualifying condition has ended.",
            "Three months without collection — reinstatement is possible, and the office needs to see you in person.",
            "An income or UIF record you dispute — bring the letter or statement that disproves it.",
          ],
        },
      ],
    },
    official: {
      heading: "What the official record will show",
      text: "SASSA can tell you the reason recorded for a cancellation, and that reason determines whether the route is a reinstatement, a new application or nothing at all. Grant rules — including the age at which a child grant ends and the conditions under which a grant lapses — are set out in the Social Assistance Act and its regulations and summarised at sassa.gov.za. Ask for the recorded reason before assuming the grant was cancelled in error.",
      links: [
        { text: "SASSA", href: "https://www.sassa.gov.za" },
        { text: "the Government Gazette", href: "https://www.gpwonline.co.za" },
      ],
    },
    sources: [SASSA, GAZETTE],
  },

  "bank-verification": {
    example: {
      heading: "A worked example: a name mismatch that stopped a payment",
      blocks: [
        {
          type: "paragraph",
          text: "Zanele switched her SRD payment method from cash send to her own Capitec account. Her smart ID reads Zanele P. Mahlangu; the bank had captured her as Zanele Mahlangu when the account was opened years earlier. The account number and branch code were correct, but the account holder record did not match her identity document closely enough for the automated check, so the status sat at Bank Verification Pending.",
        },
        {
          type: "paragraph",
          text: "She did not submit the details again. Re-entering the same mismatched account simply restarts the same failed check. She asked the bank to update the account holder record to match her ID, then waited out the 5 to 10 business days the verification loop takes — and the status cleared without another submission.",
        },
        {
          type: "table",
          headers: ["Account setup", "Result"],
          rows: [
            ["Own account, names matching the ID", "Verification passes"],
            ["Own account, initials or spelling differ from the ID", "Usually fails until the bank corrects the record"],
            ["Joint, business or someone else's account", "Fails — a grant is paid only to the beneficiary"],
            ["Dormant or FICA-restricted account", "Fails or the payment is returned"],
          ],
          caption: "Why bank verification fails, in order of how often it happens",
        },
      ],
    },
    official: {
      heading: "The rule behind the check",
      text: "A social grant may only be paid into an account held by the beneficiary, which is why SASSA verifies the account holder against the identity number on the application rather than simply accepting the numbers typed into the portal. The payment methods and the conditions attached to them derive from the regulations under the Social Assistance Act 13 of 2004, published in the Government Gazette, and are summarised at sassa.gov.za. The account holder record itself belongs to your bank — only the bank can correct a name, initials or identity number on the account.",
      links: [
        { text: "SASSA payment methods", href: "https://www.sassa.gov.za" },
        { text: "the Government Gazette", href: "https://www.gpwonline.co.za" },
      ],
    },
    sources: [SASSA, GAZETTE],
  },

  "identity-verification": {
    example: {
      heading: "A worked example: a failed selfie, twice",
      blocks: [
        {
          type: "paragraph",
          text: "Facial verification failed twice for Bongani. The first attempt was taken indoors at night with a single ceiling light behind him; the second was taken wearing the glasses he had worn for years but not in his Home Affairs photograph. Neither failure said anything about his eligibility — the check compares a live image with the photograph on the population register, and poor lighting or a changed appearance makes that comparison fail.",
        },
        {
          type: "paragraph",
          text: "On the third attempt he stood facing a window in daylight, removed his glasses, and held the phone steady at eye level. It passed. Only after repeated failures with a good image does the identity record itself become the suspect — and at that point the correction has to start at Home Affairs, because SASSA can only mirror what the population register says.",
        },
        {
          type: "callout",
          intent: "danger",
          title: "Verify the link before you open it",
          text: "A genuine verification SMS points at srd.sassa.gov.za. Anyone asking you to enter an ID number, card PIN or one-time PIN on another domain is not SASSA, and no legitimate verification step ever asks for a banking password.",
        },
      ],
    },
    official: {
      heading: "Two records, two owners",
      text: "Home Affairs owns the identity record: the names, date of birth and photograph attached to your ID number. SASSA checks its application against that record. That division explains the order of operations — correct the Home Affairs record first at dha.gov.za or a Home Affairs office, then let SASSA re-verify. The verification requirement for the SRD grant is described on srd.sassa.gov.za.",
      links: [
        { text: "the Department of Home Affairs", href: "https://www.dha.gov.za" },
        { text: "the SRD portal", href: "https://srd.sassa.gov.za" },
      ],
    },
    sources: [DHA, SRD],
  },

  "alternative-income-source": {
    example: {
      heading: "A worked example: a stokvel payout that looked like a salary",
      blocks: [
        {
          type: "paragraph",
          text: "Themba received R1,200 in October when his stokvel paid out before December. To the monthly bank sweep it looked exactly like income: a credit into his account, in a month he had declared no earnings. His application for that month was declined for an alternative income source, even though a stokvel payout is a return of his own contributions, not a wage.",
        },
        {
          type: "paragraph",
          text: "Reapplying would have produced the same decline, because the same credit sat in the same month. He appealed the specific month with three months of statements, an affidavit explaining the stokvel arrangement and naming its treasurer as a contact, and a letter from the stokvel confirming the payout. The appeal is assessed on evidence about that month, not on his general circumstances.",
        },
        {
          type: "list",
          items: [
            "Look at credits, not balance — a single deposit can trigger the decline even if the balance stays low.",
            "Transfers between your own accounts can also read as an inflow.",
            "A once-off family transfer, refund or stokvel payout needs an affidavit, not just an explanation over the phone.",
            "Check eFiling for an active PAYE record if a former employer may have kept you on the payroll.",
          ],
        },
      ],
    },
    official: {
      heading: "How the income test is described officially",
      text: "The SRD grant applies a monthly income threshold, and the test is applied to each month separately, which is why the same person can be approved in one month and declined in the next. The threshold and the conditions of the grant are set by ministerial determination and published in the Government Gazette; SASSA summarises the current rules at sassa.gov.za. This page explains how the test behaves in practice — the amount that applies to you is the one in the current gazette, not a figure copied from another site.",
      links: [
        { text: "the Government Gazette", href: "https://www.gpwonline.co.za" },
        { text: "SASSA", href: "https://www.sassa.gov.za" },
      ],
    },
    sources: [GAZETTE, SASSA],
  },

  "means-test-failed": {
    example: {
      heading: "A worked example: a backyard room changed the calculation",
      blocks: [
        {
          type: "paragraph",
          text: "An Older Persons Grant application failed the means test because the applicant rented out a backyard room for a modest monthly amount and had not declared it. The income was real, but it was also irregular: the tenant had moved out two months before the application was assessed. The file was decided on a snapshot that no longer described the household.",
        },
        {
          type: "paragraph",
          text: "The remedy was not a new application with the same silence about the rental. It was a written declaration of the change in circumstances, supported by three months of bank statements showing the rental stopped, plus the lease ending. Means tests are decided on evidence of income and assets, so a change of circumstances has to be documented before it can change the outcome.",
        },
        {
          type: "paragraph",
          text: "The other common version of this decline is arithmetic rather than error: a spouse's earnings or a joint investment push combined household income over the limit. In that case the decline is correct, and the useful step is to understand which threshold applies before reapplying.",
        },
      ],
    },
    official: {
      heading: "Where the thresholds are set",
      text: "Means-test thresholds and the assets that count are set in the regulations under the Social Assistance Act 13 of 2004 and adjusted by ministerial determination published in the Government Gazette. Different grants test different things: the SRD grant tests monthly income, while Older Persons, Disability and Child Support grants have their own income and asset rules. The current figures are published at sassa.gov.za and in the gazette, and this site reproduces them with the date they were last checked.",
      links: [
        { text: "SASSA", href: "https://www.sassa.gov.za" },
        { text: "the Government Gazette", href: "https://www.gpwonline.co.za" },
      ],
    },
    sources: [SASSA, GAZETTE],
  },

  referred: {
    example: {
      heading: "A worked example: an ID number used by someone else",
      blocks: [
        {
          type: "paragraph",
          text: "A 'Referred' status appeared on Nokuthula's application three days after she submitted it. Her ID number had been used on a second application from another province, submitted with a different cellphone number. The referral was not an accusation against her — it was the system refusing to pay twice against one identity until a person had looked at it.",
        },
        {
          type: "paragraph",
          text: "She reported it to the SASSA fraud line, opened a case at SAPS for identity fraud so there would be an official record, and took certified copies of her ID, proof of address and bank statements to her district office. The block cleared once a human had matched her face, her ID and her bank account to the application she had actually submitted.",
        },
        {
          type: "steps",
          steps: [
            { title: "Report it before you argue about it", description: "Call the SASSA fraud line and note the reference you are given." },
            { title: "Create an independent record", description: "A SAPS case number for identity fraud is evidence that the second application was not yours." },
            { title: "Attend in person with documents", description: "Certified ID, proof of address and bank statements let an official close the referral on the spot." },
            { title: "Do not reapply while referred", description: "A fresh application against a flagged ID produces another referral, not a payment." },
          ],
        },
      ],
    },
    official: {
      heading: "What a referral is, officially",
      text: "SASSA's fraud and compliance processes exist to stop payments being made against an identity that appears more than once. A referral is an administrative hold pending verification, and clearing it requires identity verification in person rather than a phone call. Fraud can be reported to SASSA on 0800 60 10 11, and identity fraud can be reported to SAPS at any police station.",
      links: [
        { text: "SASSA", href: "https://www.sassa.gov.za" },
        { text: "SAPS", href: "https://www.saps.gov.za" },
      ],
    },
    sources: [SASSA, SAPS],
  },

  "self-exclusion": {
    example: {
      heading: "A worked example: one wrong answer on a declaration",
      blocks: [
        {
          type: "paragraph",
          text: "During a monthly reconfirmation, Mpho was asked whether she had any other income or support. She read 'support' as 'any help at all' and answered yes, thinking of the groceries her brother sometimes bought. That answer is a declaration, and the declaration is what excluded her from that month — not any money in her account.",
        },
        {
          type: "paragraph",
          text: "The fix is to correct the declaration, not to appeal the principle. Where the portal allows an update, she corrects the answer for the relevant period; where it does not, the appeal explains the misreading and states plainly that she has no income. The distinction matters because self-exclusion is a statement you made, while alternative income is a finding from your bank records.",
        },
        {
          type: "callout",
          intent: "info",
          title: "Read declarations slowly",
          text: "Questions about income, support and state institutions decide eligibility directly. If you are unsure whether something counts, answer accurately and explain it in an appeal rather than guessing at the prompt.",
        },
      ],
    },
    official: {
      heading: "Why a declaration carries so much weight",
      text: "The SRD application and each reconfirmation require the applicant to declare their circumstances, and SASSA assesses the month against that declaration together with its database checks. The declarations are described on srd.sassa.gov.za when you complete them, and the eligibility conditions themselves are set out in the gazetted rules and summarised at sassa.gov.za.",
      links: [
        { text: "the SRD portal", href: "https://srd.sassa.gov.za" },
        { text: "SASSA", href: "https://www.sassa.gov.za" },
      ],
    },
    sources: [SRD, SASSA],
  },

  "application-complete": {
    example: {
      heading: "A worked example: complete on the 27th, approved on the 2nd",
      blocks: [
        {
          type: "paragraph",
          text: "On 27 October, Palesa's status moved from Pending to Application Complete. Nothing was left for her to submit: identity had matched, the bank account had verified, and the documents were accepted. The status sat still for six days, then changed to Approved in the first days of November when the monthly assessment ran.",
        },
        {
          type: "paragraph",
          text: "The mistake to avoid in this window is treating 'complete' as 'paid'. It is a readiness state. It means there is nothing outstanding on your side and the next monthly decision can be made — not that the decision has been made, and not that money is scheduled.",
        },
        {
          type: "table",
          headers: ["Status", "Who still has to act", "What it is waiting for"],
          rows: [
            ["Pending", "Usually nobody — verification is running", "Database checks to finish"],
            ["Application Complete", "Nobody — the file is ready", "The monthly assessment to run"],
            ["Approved", "The payment system", "A pay date and the payment run"],
          ],
          caption: "Where Application Complete sits between Pending and Approved",
        },
      ],
    },
    official: {
      heading: "What SASSA confirms before a file is complete",
      text: "A file becomes complete when the identity check against the Home Affairs record, the bank account verification and the submitted documents have all been accepted. General documentation requirements are published at sassa.gov.za, and the identity and banking requirements are described on the SRD portal. Because each month is assessed separately, a complete file still has to clear the income check for the month in question.",
      links: [
        { text: "SASSA", href: "https://www.sassa.gov.za" },
        { text: "the SRD portal", href: "https://srd.sassa.gov.za" },
      ],
    },
    sources: [SASSA, SRD],
  },

  "reapplication-required": {
    example: {
      heading: "A worked example: an application that was never submitted",
      blocks: [
        {
          type: "paragraph",
          text: "Sibusiso filled in the SRD form on his phone in a shop with weak signal. The screen never confirmed, and he assumed it had gone through. Three weeks later the portal said Reapplication Required. There was no decline to appeal, because there was no completed application for SASSA to assess — the record had never been submitted.",
        },
        {
          type: "paragraph",
          text: "His response was to reapply once, carefully, and to keep the confirmation. He used the same ID number and the same cellphone number, confirmed his bank details in the same session, and screenshotted the reference number. Reapplying is the correct action here — unlike a decline, where the appeal is the correct action.",
        },
        {
          type: "steps",
          steps: [
            { title: "Confirm nothing was submitted", description: "Search your SMS for a reference number. No reference means no completed application." },
            { title: "Reapply once", description: "Use the same ID and phone number so the new record links to your identity cleanly." },
            { title: "Confirm banking in the same session", description: "A partial application with no bank details cannot be paid even if approved." },
            { title: "Keep the reference", description: "The reference number is what lets SASSA trace the application if the status looks wrong later." },
          ],
        },
      ],
    },
    official: {
      heading: "No decision, so no appeal",
      text: "The appeal route exists to challenge a decision. Reapplication Required means no decision was made, so the remedy is a complete application, submitted once, on srd.sassa.gov.za. Keeping the reference number the portal issues is the only reliable way to prove an application exists; SASSA's general application guidance is at sassa.gov.za.",
      links: [
        { text: "the SRD portal", href: "https://srd.sassa.gov.za" },
        { text: "SASSA", href: "https://www.sassa.gov.za" },
      ],
    },
    sources: [SRD, SASSA],
  },

  "uif-registered": {
    example: {
      heading: "A worked example: a contract that was never closed",
      blocks: [
        {
          type: "paragraph",
          text: "For six months, Thabo's SRD applications were declined as UIF Registered. He had not worked since a four-week contract the previous year. The employer had registered him when he started and never submitted the termination declaration, so the Department of Employment and Labour's records still showed him as employed.",
        },
        {
          type: "paragraph",
          text: "The problem was in another department's database, which is why reapplying never helped. He checked uFiling, asked the employer in writing for a UI-19 termination certificate, and when the employer did not respond he went to a Labour Centre. With the termination certificate in hand he appealed the declined months inside the 90-day window and the record was corrected.",
        },
        {
          type: "list",
          items: [
            "Check uFiling before you assume SASSA has made an error — the employment record is the more likely culprit.",
            "Ask the employer in writing, so there is a dated record of the request.",
            "A Labour Centre can intervene when an employer will not file the termination.",
            "Appeal the specific declined months with the certificate attached; do not simply reapply.",
          ],
        },
      ],
    },
    official: {
      heading: "Two departments, one check",
      text: "SASSA verifies unemployment against the Department of Employment and Labour's contributor records. Those records are created and closed by employers through uFiling and UI-19 declarations, so a correction has to happen there first. uFiling is the official channel for viewing and correcting a contributor record, and Labour Centres handle disputes with employers; SASSA's own rules for the SRD income test are published at sassa.gov.za.",
      links: [
        { text: "uFiling", href: "https://ufiling.labour.gov.za" },
        { text: "SASSA", href: "https://www.sassa.gov.za" },
      ],
    },
    sources: [UFILING, SASSA],
  },

  "safps-flagged": {
    example: {
      heading: "A worked example: a protective listing after a stolen ID",
      blocks: [
        {
          type: "paragraph",
          text: "After her handbag was stolen, Refilwe reported the ID to SAPS and asked her bank to place a protective registration on her profile. Eight months later her SRD verification stopped with a SAFPS flag. The registration she had asked for to protect herself was doing exactly what it was designed to do: forcing a human check before credit or a payment is issued against that identity.",
        },
        {
          type: "paragraph",
          text: "A flag is a signal, not a finding. She requested her SAFPS record, took the letter together with the SAPS case number to a SASSA office so the file could be annotated, and appealed the affected month with the same documents attached. The flag is not something that expires on its own while the registration remains in place.",
        },
        {
          type: "steps",
          steps: [
            { title: "Get your own record", description: "SAFPS will confirm what is listed against your ID; it does not charge the public for this." },
            { title: "Explain the listing in writing", description: "A protective registration from a stolen ID is very different from suspected fraud, and the letter shows which it is." },
            { title: "Attach a police case number", description: "A SAPS case for the theft ties the listing to a documented event." },
            { title: "Take it to SASSA, then appeal", description: "The office annotates the record; the appeal covers the months already declined." },
          ],
        },
      ],
    },
    official: {
      heading: "What SAFPS is and is not",
      text: "The Southern African Fraud Prevention Service is a shared fraud-prevention database used by banks and other member organisations. A listing is most often a protective registration requested after identity theft, not a conviction or an accusation. SAFPS publishes its consumer protection process at safps.org.za, and identity theft can be reported to SAPS; SASSA can act on the outcome once it has the documentation.",
      links: [
        { text: "SAFPS", href: "https://www.safps.org.za" },
        { text: "SAPS", href: "https://www.saps.gov.za" },
      ],
    },
    sources: [SAFPS, SAPS],
  },

  "deceased-record": {
    example: {
      heading: "A worked example: a death recorded against the wrong ID",
      blocks: [
        {
          type: "paragraph",
          text: "Grace's grant stopped without warning. The reason given was a death recorded against her identity number. A distant relative with a similar name had died, and the death was captured against the wrong ID digit. From SASSA's side the sequence is automatic: Home Affairs reports a death, and payment against that identity must stop.",
        },
        {
          type: "paragraph",
          text: "No amount of explaining at a SASSA counter could change it, because SASSA does not own the record. The correction had to start at Home Affairs, where the population register entry was amended and a written confirmation issued. Only then could SASSA restore the grant, and the restoration covered the months that had been blocked.",
        },
        {
          type: "callout",
          intent: "warning",
          title: "Order matters",
          text: "Home Affairs first, SASSA second. Taking a SASSA office a letter from Home Affairs works; asking SASSA to contact Home Affairs on your behalf usually just adds a wait.",
        },
      ],
    },
    official: {
      heading: "Who owns the death record",
      text: "Deaths are recorded in the National Population Register maintained by the Department of Home Affairs, and SASSA receives death indications from that register. A living person shown as deceased therefore needs a Home Affairs record correction, confirmed in writing, before SASSA can act. Home Affairs services and office locations are listed at dha.gov.za.",
      links: [
        { text: "the Department of Home Affairs", href: "https://www.dha.gov.za" },
        { text: "SASSA", href: "https://www.sassa.gov.za" },
      ],
    },
    sources: [DHA, SASSA],
  },

  "existing-grant": {
    example: {
      heading: "A worked example: the same child, two caregivers",
      blocks: [
        {
          type: "paragraph",
          text: "A mother applied for a Child Support Grant for her daughter and was told an existing grant was already active. The child had been living with her grandmother for two years, and the grandmother had applied successfully. The system was right: one child cannot be paid two Child Support Grants for the same period.",
        },
        {
          type: "paragraph",
          text: "The resolution was a transfer of the grant, not a second application. Both caregivers attended a SASSA office with the child's birth certificate and their own IDs, and the grant was moved to the mother once the living arrangement was confirmed. Reapplying in the mother's name alone would have produced the same 'existing grant' result indefinitely.",
        },
        {
          type: "list",
          items: [
            "One child, one Child Support Grant — a second application is always blocked.",
            "A Child Support Grant can run alongside a caregiver's own Older Persons or Disability Grant.",
            "An adult cannot hold two income-support grants at the same time.",
            "The SRD grant cannot be paid to someone already receiving a social grant.",
          ],
        },
      ],
    },
    official: {
      heading: "Why the rule exists",
      text: "The Social Assistance Act and its regulations set out which grants may run together and which may not, including the rule that a child may not receive both a Child Support and a Foster Child Grant for the same period. Those combinations are summarised at sassa.gov.za, and a grant transfer between caregivers is handled at a district office because it depends on the child's living arrangements.",
      links: [
        { text: "SASSA", href: "https://www.sassa.gov.za" },
        { text: "the Government Gazette", href: "https://www.gpwonline.co.za" },
      ],
    },
    sources: [SASSA, GAZETTE],
  },

  "no-records-found": {
    example: {
      heading: "A worked example: the number that changed",
      blocks: [
        {
          type: "paragraph",
          text: "Jabulani had applied three months earlier and had a reference number, but the status page kept saying No Records Found. He had lost his phone in the interim and replaced the SIM with a new number. The lookup matches the ID number together with the cellphone number used on the application, so a changed number produces exactly this result — nothing found, no decision, no problem with eligibility.",
        },
        {
          type: "paragraph",
          text: "Because he had a reference number, reapplying would have been the wrong move: it risks a duplicate record against his ID. He updated the cellphone number on the existing application through the portal's change-number process, and the status appeared again. Someone who applied through an agent should first ask which number the agent used.",
        },
        {
          type: "steps",
          steps: [
            { title: "Check the details, not the grant", description: "Retype the 13-digit ID without spaces, then confirm the cellphone number used at application." },
            { title: "Search for a reference", description: "SMS confirmations are the proof that an application exists." },
            { title: "Update a changed number", description: "Use the official change-number route rather than submitting a second application." },
            { title: "Escalate with the reference", description: "With a reference number, SASSA can trace the file; without one, treat it as a missing application." },
          ],
        },
      ],
    },
    official: {
      heading: "What the lookup is actually matching",
      text: "The SRD status lookup on srd.sassa.gov.za matches the identity number and the cellphone number recorded on the application. That is a fraud control, not a quirk: it stops anyone with an ID number from reading another person's grant record. It also means the recorded number, not the current one, is what the lookup expects — which is why the change-number process exists.",
      links: [
        { text: "the SRD portal", href: "https://srd.sassa.gov.za" },
        { text: "SASSA", href: "https://www.sassa.gov.za" },
      ],
    },
    sources: [SRD, SASSA],
  },
};

function bumpMinor(version) {
  const parts = String(version || "1.0.0").split(".").map(Number);
  return `${parts[0] || 1}.${(parts[1] || 0) + 1}.0`;
}

function mergeSources(existing = [], extra = []) {
  const merged = [...existing];
  for (const source of extra) {
    if (!merged.some((entry) => entry.url === source.url)) merged.push(source);
  }
  return merged;
}

let updated = 0;
for (const [slug, entry] of Object.entries(DEPTH)) {
  const path = join("content", "statuses", `${slug}.json`);
  const page = JSON.parse(readFileSync(path, "utf8"));

  // Idempotency: drop any blocks this script added on a previous run.
  page.contentBlocks = page.contentBlocks.filter((block) => !String(block.id).startsWith("depth-"));

  const depthBlocks = [
    {
      id: "depth-example-h",
      type: "heading",
      level: 3,
      // The named scenarios are composites; label them so nobody reads one as
      // an account of a real applicant's record.
      text: entry.example.heading.replace(/^A worked example:\s*/i, "Illustrative example: "),
    },
    ...entry.example.blocks.map((block, index) => ({ id: `depth-example-${index + 1}`, ...block })),
    { id: "depth-official-h", type: "heading", level: 3, text: entry.official.heading },
    {
      id: "depth-official-p",
      type: "paragraph",
      text: entry.official.text,
      links: entry.official.links,
    },
  ];

  // Insert before the FAQ section heading when there is one, otherwise before
  // the FAQ block itself, so the new sections never land under "FAQ".
  let insertAt = page.contentBlocks.findIndex(
    (block) => block.type === "heading" && /frequently asked questions/i.test(block.text || ""),
  );
  if (insertAt === -1) {
    insertAt = page.contentBlocks.findIndex((block) => block.type === "faq");
  }
  if (insertAt === -1) insertAt = page.contentBlocks.length;
  page.contentBlocks.splice(insertAt, 0, ...depthBlocks);

  page.sources = mergeSources(page.sources, entry.sources);
  page.lastUpdated = REVIEW_DATE;
  page.lastReviewed = REVIEW_DATE;
  page.version = bumpMinor(page.version);

  writeFileSync(path, JSON.stringify(page, null, 2) + "\n");
  updated += 1;
}

console.log(`Updated ${updated} status pages.`);
