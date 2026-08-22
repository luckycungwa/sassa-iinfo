export interface FAQCategory {
  id: string;
  title: string;
  questions: { question: string; answer: string }[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: "general",
    title: "General SASSA Questions",
    questions: [
      { question: "What is SASSA?", answer: "The South African Social Security Agency (SASSA) is a national agency responsible for distributing social grants to eligible South African citizens, permanent residents, and refugees. It operates under the Department of Social Development." },
      { question: "How do I contact SASSA?", answer: "SASSA toll-free helpline: 0800 60 10 11. Lines are open Monday to Friday, 07:30 to 16:00. You can also visit your nearest SASSA local office. For SRD-specific queries, use the SRD portal at srd.sassa.gov.za." },
      { question: "Is this website affiliated with SASSA?", answer: "No. This is an independent resource platform. We are not affiliated with SASSA, the Department of Social Development, or the South African Government. Always verify critical information with official sources." },
      { question: "What are SASSA's operating hours?", answer: "SASSA offices are typically open Monday to Friday from 07:30 to 16:00. Some offices may close earlier on Fridays. It is advisable to arrive early, especially during peak grant payment weeks." },
      { question: "Does SASSA have a WhatsApp number?", answer: "Yes. SASSA's official WhatsApp line is 082 046 8553. Save this number to your phone and send 'SASSA' to start. You can check your balance, payment date, or application status. This service is free on most networks." },
    ],
  },
  {
    id: "srd",
    title: "SRD R370 Grant",
    questions: [
      { question: "What is the SRD R370 grant?", answer: "The Social Relief of Distress (SRD) grant is a temporary monthly payment of R370 for unemployed South Africans aged 18-59 who have no income or financial support. It was originally introduced as the R350 grant and increased to R370." },
      { question: "Who qualifies for the SRD R370 grant?", answer: "You must be a South African citizen, permanent resident, refugee, or asylum seeker aged 18-59, unemployed with no income, and not receiving any other social grant, UIF, NSFAS, or pension." },
      { question: "How do I apply for the SRD R370 grant?", answer: "Apply online at srd.sassa.gov.za. Enter your ID number, provide your phone number, agree to the terms, and submit your bank details or cash send preference. You can also apply through the SASSA WhatsApp line at 082 046 8553." },
      { question: "How is the SRD R370 grant paid?", answer: "The SRD grant is paid via bank transfer (EFT) into your personal bank account, or via Cash Send (SMS voucher) that you can collect at Pick n Pay, Boxer, Shoprite, Checkers, or USave." },
      { question: "Why was my SRD grant declined?", answer: "Common reasons include: alternative income source detected (bank deposits over R624), UIF registration, NSFAS funding, identity verification failure, or means test failure. Check your status for the specific reason and file an appeal within 90 days." },
      { question: "How long does the SRD grant take to process?", answer: "Applications are reviewed monthly. Your status typically updates around the 15th-20th of each month. If approved, payment is made between the 23rd and 30th of the month." },
      { question: "Can I get the SRD grant if I have a bank account?", answer: "Yes, having a bank account is fine. The bank account must be in your own name. SASSA will verify it automatically. Excessive deposits or inflows may trigger the 'Alternative Income Source' status." },
      { question: "How long will the SRD R370 grant continue?", answer: "The SRD grant has been extended to at least March 2027. It is reviewed annually by the government and extended based on economic conditions and budget availability." },
      { question: "Can I get SRD if I receive UIF?", answer: "Only if your UIF payments are below R624 per month. If your UIF has stopped, you can reapply. You will need a UI-19 termination letter from the Department of Labour." },
      { question: "What does 'Pending' mean for SRD?", answer: "Pending means SASSA is still evaluating your eligibility for the current month. This typically resolves to Approved or Declined within 7-14 business days. No action is needed during this time." },
    ],
  },
  {
    id: "grants",
    title: "Grant Applications & Eligibility",
    questions: [
      { question: "How long does a SASSA grant application take?", answer: "Applications typically take up to 3 months to process. Payments are backdated to the application date if approved. Some grants like the SRD R370 are reviewed and paid monthly." },
      { question: "Can I apply for more than one SASSA grant?", answer: "You can only receive one social grant at a time, except for the Grant-in-Aid which is a top-up to an existing grant (Older Person, Disability, or War Veterans Grant)." },
      { question: "What happens if my grant application is declined?", answer: "You have 90 days from receiving the decline notification to appeal. Appeals are handled by the Independent Tribunal for Social Assistance Appeals (ITSAA), not SASSA itself." },
      { question: "Can I get a SASSA grant if I have a job?", answer: "Only if your income falls below the means test threshold. For most grants, single applicants must earn under R96,240 per year. For the SRD R370, monthly bank inflows must be under R624." },
      { question: "What documents do I need to apply for a SASSA grant?", answer: "You typically need: original 13-digit ID or smart card, proof of residence, last 3 months bank statements, and proof of income or unemployment affidavit. Some grants require additional documents like medical reports or court orders." },
      { question: "Can I apply for a SASSA grant online?", answer: "Yes, the SRD R370 grant can be applied for entirely online at srd.sassa.gov.za. Other grants like the Older Person, Disability, and Child Support grants require an in-person visit to a SASSA office." },
      { question: "Do I need to reapply for grants every year?", answer: "Permanent grants (Older Person, Disability) do not require annual reapplication but are subject to periodic reviews. The SRD R370 grant is reviewed monthly and automatically evaluated - you do not need to reapply each month." },
      { question: "What is the means test for SASSA grants?", answer: "The means test is a financial assessment that checks your income and assets against legal thresholds. For single applicants, annual income must be below R96,240 and assets below R1,372,800. Married applicants have higher combined limits." },
      { question: "Can foreigners get SASSA grants?", answer: "Yes, permanent residents, refugees, asylum seekers, and special permit holders may qualify for certain SASSA grants. You must provide the relevant permit or status document with your application." },
    ],
  },
  {
    id: "amounts",
    title: "Grant Amounts & Increases",
    questions: [
      { question: "How much is the SASSA Older Person Grant in 2026?", answer: "The Older Person Grant is R2,400 per month. Beneficiaries aged 75 and older receive an additional R20, bringing their total to R2,420 per month." },
      { question: "How much is the SASSA Child Support Grant in 2026?", answer: "The Child Support Grant is R580 per child per month. There is also a Child Support Top-Up of R250 for orphaned children living with relatives, bringing the total to R830 per month." },
      { question: "How much is the SASSA Disability Grant in 2026?", answer: "The Disability Grant is R2,400 per month. This applies to both temporary and permanent disability grants for persons aged 18-59." },
      { question: "How much is the SASSA Foster Care Grant in 2026?", answer: "The Foster Care Grant is R1,295 per child per month. This is paid to court-appointed foster parents." },
      { question: "When are SASSA grant increases announced?", answer: "Grant increases are typically announced by the Minister of Finance during the annual national budget speech in February. Increases take effect from April (first half) and October (second half) of each year." },
      { question: "Do SASSA grants increase automatically?", answer: "Yes, grant increases are applied automatically to all eligible beneficiaries. You do not need to submit any forms or visit a SASSA office to receive the increased amount." },
      { question: "What is the Grant-in-Aid amount in 2026?", answer: "The Grant-in-Aid is R580 per month. This is a top-up paid on top of your primary grant (Older Person, Disability, or War Veterans Grant) if you require full-time care." },
    ],
  },
  {
    id: "payments",
    title: "Payments & Collection",
    questions: [
      { question: "When are SASSA grants paid each month?", answer: "Payment dates are staggered by grant type each month. Older Persons grants are paid first (2nd-5th), followed by Disability (3rd-6th), then Children's grants (4th-7th). SRD R370 is paid between the 23rd and 30th." },
      { question: "Do I need to withdraw my grant on the first day?", answer: "No. Your grant remains available in your account or at the collection point. You can withdraw any time after the pay date. Avoiding peak days (first 3 days) can save you from long queues." },
      { question: "How long does a SASSA bank transfer take?", answer: "Bank transfers typically reflect 1-3 business days after the official pay date. Plan your budget accordingly. If funds have not reflected after 5 business days, contact SASSA." },
      { question: "What if I lose the cash send SMS from SASSA?", answer: "Contact SASSA at 0800 60 10 11 to request a resend. You can also visit a SASSA office with your ID to get a replacement voucher." },
      { question: "Can someone else collect my SASSA grant?", answer: "No. SASSA grants are strictly personal. The beneficiary must collect in person with a valid ID. In exceptional circumstances, a formal power of attorney may be arranged through a SASSA office." },
      { question: "Can I change my SASSA payment method?", answer: "Yes. Log into the SRD portal and go to 'Payment Method'. You can switch between bank transfer and Cash Send. Changes take effect from the next payment cycle." },
      { question: "What is the SASSA Black Card?", answer: "The SASSA Black Card (also called the SASSA SAPO Card) is a payment card issued by Postbank for grant beneficiaries. It replaced the older Gold Card. Beneficiaries can use it to withdraw cash at stores and ATMs." },
      { question: "How do I get a SASSA Black Card?", answer: "Visit your nearest SASSA office or Post Office with your ID. Request the SASSA Black Card (Postbank card). You may need to complete a consent form for payment into the card account." },
      { question: "What if I don't have a bank account for SASSA grants?", answer: "You can select 'Cash Send' as your payment method. SASSA will send an SMS voucher that you take to any participating retailer (Pick n Pay, Boxer, Shoprite, Checkers, USave) to collect your cash." },
    ],
  },
  {
    id: "status",
    title: "Application Status",
    questions: [
      { question: "How do I check my SASSA grant status?", answer: "You can check your status online at srd.sassa.gov.za (for SRD), via the SASSA WhatsApp line at 082 046 8553, using USSD code *134*7737#, or by visiting your nearest SASSA office in person." },
      { question: "What does 'Pending' mean for my SASSA application?", answer: "Pending means SASSA has received your application but has not completed the verification process. It usually takes 7-14 business days. No action is needed while the status is Pending." },
      { question: "Why does my status say 'Alternative Income Source'?", answer: "This means SASSA detected a bank deposit or financial activity above the threshold (R624 for SRD), or you are registered for UIF, NSFAS, or PAYE tax. File an appeal if this is incorrect." },
      { question: "Can my approved SASSA status change back?", answer: "Yes. Every month is evaluated as a separate cycle. If your financial situation changes (e.g., you receive a deposit), your status may change the following month. Always check your status monthly." },
      { question: "What does 'Referred' status mean?", answer: "Referred means your application has been flagged for suspected fraudulent activity or audit. Contact the SASSA Fraud Hotline on 0800 60 10 11 to resolve. You may need to visit a SASSA office with your ID." },
      { question: "What does 'Application Complete' mean?", answer: "Application Complete means your profile is fully verified and placed in the monthly approval cycle. This is a positive status that usually changes to 'Approved' or 'Declined' within the first week of the month." },
      { question: "What does 'Payment Processing' mean?", answer: "Payment Processing means SASSA has instructed the bank to release your funds. It typically takes 24-48 hours to reflect in your account. If it takes longer than 5 days, contact SASSA." },
      { question: "How long does SASSA status take to update?", answer: "Status updates typically happen between the 15th and 20th of each month for SRD grants. Permanent grant statuses update within 7-14 business days of application. Processing may take longer during peak periods." },
    ],
  },
  {
    id: "appeals",
    title: "Appeals",
    questions: [
      { question: "How do I appeal a declined SASSA grant?", answer: "Visit the DSD Appeal website (srd.dsd.gov.za for SRD, or contact your local office for social grants). Enter your ID and phone number, verify with OTP, select the declined month, choose your reason, and submit." },
      { question: "How long do I have to appeal a SASSA decline?", answer: "You have 90 days from the date of receiving the decline notification. Appeals submitted after 90 days will be rejected. The date is calculated from when the status changed to Declined." },
      { question: "How long does the SASSA appeal process take?", answer: "The Independent Tribunal for Social Assistance Appeals (ITSAA) typically takes 60 to 90 days to issue a final ruling. You will be notified via SMS and the online portal." },
      { question: "Do I need to appeal every month for SRD?", answer: "Yes. Because SASSA checks eligibility monthly, you must appeal for each individual month that shows a 'Declined' status. Each month is treated as a separate decline decision." },
      { question: "Can I appeal a SASSA decline in person?", answer: "Yes. For non-SRD grants, you can visit your nearest SASSA office with your documents and request a manual appeal submission. For SRD grants, the online portal is the primary method." },
      { question: "What documents do I need for a SASSA appeal?", answer: "You need: certified copy of your ID, latest 3 months bank statements, the decline notification, and evidence specific to your decline reason (UIF letter, NSFAS letter, affidavit). Documents must be certified within the last 6 months." },
      { question: "What happens after a successful SASSA appeal?", answer: "If your appeal is upheld, SASSA must pay all backdated amounts within 14 business days. Backpay covers all months from the original decline date to the month the appeal was approved." },
      { question: "Can I appeal a SASSA decision twice?", answer: "No, you cannot appeal the tribunal's decision a second time. However, you can submit a fresh grant application if your financial situation has changed since the original application." },
      { question: "What is ITSAA?", answer: "ITSAA stands for the Independent Tribunal for Social Assistance Appeals. It is an independent body that reviews declined SASSA grant applications. ITSAA is not part of SASSA, ensuring fair and impartial review of appeals." },
    ],
  },
  {
    id: "banking",
    title: "Banking & Payment Details",
    questions: [
      { question: "How do I change my SASSA banking details?", answer: "Log into the SRD portal at srd.sassa.gov.za, go to 'Update Bank Details', enter your new account number and branch code, and verify with the OTP sent to your phone." },
      { question: "Can I use someone else's bank account for SASSA?", answer: "No. The bank account must be registered in your own name and match your ID number exactly. SASSA's automated verification system will reject any account that does not match." },
      { question: "How long does SASSA bank verification take?", answer: "Bank verification typically takes 5-10 business days. The system communicates with South Africa's major banks (Standard Bank, FNB, Absa, Nedbank, Capitec) to confirm account ownership." },
      { question: "Why did my SASSA bank verification fail?", answer: "Common reasons: the account is in a different name, ID number mismatch, account is dormant or frozen, or the account type does not support EFT deposits. Visit your bank to check your account status." },
      { question: "Can I switch from bank transfer to cash collection?", answer: "Yes. Log into the SRD portal, go to 'Payment Method', and switch from 'Bank Transfer' to 'Cash Send'. The change takes effect from the next payment cycle." },
      { question: "What is the SASSA USSD code?", answer: "The SASSA USSD code is *134*7737#. Dial this code on your mobile phone and follow the menu prompts to check your grant balance, payment date, or application status. Standard network rates apply." },
    ],
  },
];

export function getAllFAQs() {
  return faqCategories.flatMap((c) => c.questions);
}
