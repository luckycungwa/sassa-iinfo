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
      { question: "What is SASSA?", answer: "The South African Social Security Agency (SASSA) is a national agency responsible for distributing social grants to eligible South African citizens, permanent residents, and refugees." },
      { question: "How do I contact SASSA?", answer: "SASSA toll-free helpline: 0800 60 10 11. Lines are open Monday to Friday, 07:30 to 16:00. You can also visit your nearest SASSA local office." },
      { question: "Is this website affiliated with SASSA?", answer: "No. This is an independent resource platform. We are not affiliated with SASSA, the Department of Social Development, or the South African Government. Always verify critical information with official sources." },
    ],
  },
  {
    id: "grants",
    title: "Grant Applications & Eligibility",
    questions: [
      { question: "How long does a SASSA grant application take?", answer: "Applications typically take up to 3 months to process. Payments are backdated to the application date if approved." },
      { question: "Can I apply for more than one SASSA grant?", answer: "You can only receive one social grant at a time, except for the Grant-in-Aid which is a top-up to an existing grant (Older Person, Disability, or War Veterans Grant)." },
      { question: "What happens if my grant application is declined?", answer: "You have 90 days from receiving the decline notification to appeal. Appeals are handled by the Independent Tribunal for Social Assistance Appeals (ITSAA), not SASSA itself." },
      { question: "Can I get a SASSA grant if I have a job?", answer: "Only if your income falls below the means test threshold (under R96,240 per year for single applicants, or R624/month for SRD R370)." },
    ],
  },
  {
    id: "payments",
    title: "Payments & Collection",
    questions: [
      { question: "When are SASSA grants paid?", answer: "Payment dates are staggered by grant type each month. Older Persons grants are paid first, followed by Disability, then Children's grants. SRD R370 is paid between the 25th and 30th." },
      { question: "Do I need to withdraw my grant on the first day?", answer: "No. Your grant remains available in your account or at the collection point. You can withdraw any time after the pay date." },
      { question: "What if I lose the cash send SMS?", answer: "Contact SASSA to request a resend. You can also visit a SASSA office with your ID to get a replacement voucher." },
      { question: "Can someone else collect my grant?", answer: "No. SASSA grants are strictly personal. The beneficiary must collect in person with a valid ID. In exceptional circumstances, a formal power of attorney may be arranged through a SASSA office." },
    ],
  },
  {
    id: "status",
    title: "Application Status",
    questions: [
      { question: "What does 'Pending' mean for my SRD application?", answer: "Pending means SASSA has received your application but has not completed the verification process. It usually takes 7-14 business days. No action is needed." },
      { question: "Why does my status say 'Alternative Income Source'?", answer: "This means SASSA detected a bank deposit or financial activity above the threshold (R624 for SRD), or you are registered for UIF, NSFAS, or PAYE tax." },
      { question: "Can my approved status change?", answer: "Yes. Every month is evaluated as a separate cycle. If your financial situation changes (e.g., you receive a deposit), your status may change the following month." },
      { question: "What does 'Referred' status mean?", answer: "Referred means your application has been flagged for suspected fraudulent activity or audit. Contact the SASSA Fraud Hotline on 0800 60 10 11 to resolve." },
    ],
  },
  {
    id: "appeals",
    title: "Appeals",
    questions: [
      { question: "How do I appeal a declined grant?", answer: "Visit the DSD Appeal website (srd.dsd.gov.za for SRD, or contact your local office for social grants). Enter your ID and phone number, verify with OTP, select the declined month, and submit your reason for appeal." },
      { question: "How long do I have to appeal?", answer: "You have 90 days from the date of receiving the decline notification. Appeals submitted after 90 days may be rejected." },
      { question: "How long does the appeal process take?", answer: "The tribunal can take 60 to 90 days to issue a final ruling. You will be notified of the outcome via SMS and the online portal." },
      { question: "Do I need to appeal every month for SRD?", answer: "Yes. Because SASSA checks eligibility monthly, you must appeal for each individual month that shows a 'Declined' status." },
    ],
  },
];

export function getAllFAQs() {
  return faqCategories.flatMap((c) => c.questions);
}
