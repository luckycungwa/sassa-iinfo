export interface BankingGuide {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: { heading: string; text: string }[];
}

export const bankingGuides: BankingGuide[] = [
  {
    id: "payment-methods",
    slug: "payment-methods",
    title: "SASSA Payment Methods",
    description: "How SASSA pays your social grant — bank transfer, cash send, and collection options.",
    content: [
      { heading: "Bank Transfer (EFT)", text: "SASSA deposits your grant directly into your personal South African bank account. Processing takes 1-3 business days after the official pay date. Your bank account must be registered in your own name and match your ID number exactly." },
      { heading: "Cash Send (Retail Collection)", text: "If you do not have a bank account, SASSA sends a cash voucher via SMS. Take the SMS and your ID to any participating retailer (Pick n Pay, Boxer, Shoprite, Checkers, USave) to collect your grant in cash." },
      { heading: "Post Office Collection", text: "Some beneficiaries collect their grants at designated South African Post Office branches. This option is being phased out in favour of bank transfers and retail collection." },
      { heading: "Mobile Pay Points", text: "In remote rural areas, SASSA operates mobile pay points on scheduled dates. Check your local SASSA office or province hub for the monthly schedule." },
    ],
  },
  {
    id: "update-bank-details",
    slug: "update-bank-details",
    title: "How to Update Your SASSA Bank Details",
    description: "Step-by-step guide to changing your bank account for grant payments.",
    content: [
      { heading: "Online Portal", text: "Log into the official SASSA SRD website (srd.sassa.gov.za). Navigate to 'Update Bank Details'. Enter your ID number, phone number, and the new bank account details. Verify with the OTP sent to your phone." },
      { heading: "SASSA Office Visit", text: "Visit your nearest SASSA local office with your ID and a official bank statement or letter from your bank confirming the new account. Complete the SASSA Consent Form for Bank Payment." },
      { heading: "Important Notes", text: "The bank account must be in your own name. SASSA will not pay grants into third-party accounts. Bank verification takes 5-10 business days. Do not close your old account until the first payment arrives in the new account." },
    ],
  },
  {
    id: "bank-verification",
    slug: "bank-verification-process",
    title: "SASSA Bank Verification Process Explained",
    description: "How SASSA verifies your bank account and what to do if verification fails.",
    content: [
      { heading: "How Verification Works", text: "SASSA uses an automated system that communicates with South Africa's major banks (Standard Bank, FNB, Absa, Nedbank, Capitec). The system checks that the ID number and name on the bank account match the SASSA applicant's details exactly." },
      { heading: "Why Verification Fails", text: "Common reasons: the bank account is registered under a different name, the ID number on the account does not match, the account has been dormant or frozen, or the account type does not support EFT deposits." },
      { heading: "What to Do If Verification Fails", text: "1. Check that the account details entered are 100% correct. 2. Visit your bank to confirm your account is active and registered under your exact ID. 3. If the problem persists, switch to Cash Send collection via retail outlet while resolving the bank issue." },
    ],
  },
  {
    id: "sassa-black-card",
    slug: "sassa-black-card-guide",
    title: "SASSA Black Card (Postbank Card) Guide",
    description: "Everything about the SASSA Black Card: how to swap your Gold Card before the 31 August 2026 deadline, where to collect it, and how to spot card scams.",
    content: [
      { heading: "The 31 August 2026 Deadline", text: "Postbank is replacing all SASSA Gold Cards with the new Postbank Black Card. The final deadline is 31 August 2026 and Postbank has confirmed it will NOT be extended. If you still use a Gold Card after this date, the card stops working and you will be unable to access your grant money until you collect a Black Card. Around 280,000 beneficiaries still needed to switch as of early August 2026 — do not wait until the last minute, as queues will be long." },
      { heading: "How to Swap Your Gold Card", text: "The swap is completely free. Take your South African ID or temporary ID to any Postbank service point or participating retailer (Shoprite, Checkers, Usave, Pick n Pay, Boxer, Spar). No forms are required and no activation is needed. Your new Black Card works immediately, and any balance on your old Gold Card transfers over automatically. You can collect the card in any province, even if your grant was approved elsewhere." },
      { heading: "Find Your Nearest Collection Point", text: "Dial *120*355# on your mobile phone to find the nearest card collection site, or call Postbank on 0800 53 54 55. Cards are available at Postbank service points inside selected Shoprite, Checkers, Usave, Pick n Pay, Boxer and Spar stores nationwide. The replacement process takes only a few minutes." },
      { heading: "How to Use Your SASSA Black Card", text: "Your Black Card works at any ATM or till point that accepts Mastercard, and you can withdraw cash for free at participating retailers (Shoprite, Checkers, Pick n Pay, Boxer, Usave) and Postbank ATMs. There are no monthly account fees. You can also use it for contactless payments at retailers that accept cards." },
      { heading: "Spotting Card Scams", text: "A genuine Black Card has 'Postbank' printed on the front. If a card does not say Postbank, it is a scam. SASSA and Postbank will NEVER ask for your PIN, OTP, or bank password, and nobody may charge you to swap cards — the swap is free. If anyone asks you to complete or sign a form to receive the card, it is not a genuine Postbank Black Card. Report scams to the SASSA Fraud Hotline on 0800 60 10 11 or Postbank on 0800 53 54 55." },
      { heading: "Lost or Stolen Black Card", text: "If your Black Card is lost or stolen, report it immediately to Postbank at 0800 53 54 55 to block the card. Then visit your nearest Postbank service point with your ID to request a replacement. Your grant payments continue as normal — the money stays in your Postbank account while you wait for the replacement card." },
    ],
  },
  {
    id: "sassa-ussd-codes",
    slug: "sassa-ussd-codes",
    title: "SASSA USSD Codes & Mobile Services",
    description: "Complete guide to SASSA USSD codes for checking grant status, balance, and payment dates from your mobile phone.",
    content: [
      { heading: "SASSA USSD Code *134*7737#", text: "Dial *134*7737# on your mobile phone to access the SASSA USSD menu. Follow the prompts to check your grant balance, payment date, or application status. Standard network rates apply. This service works on all major South African networks (Vodacom, MTN, Cell C, Telkom)." },
      { heading: "SASSA WhatsApp Line", text: "Save 082 046 8553 to your phone contacts. Send 'SASSA' as a message to start. The WhatsApp bot will guide you through options to check your balance, payment date, application status, and banking details. This service is free on most networks." },
      { heading: "SASSA Toll-Free Helpline", text: "Call 0800 60 10 11 to speak to a SASSA agent. Lines are open Monday to Friday 07:30 to 16:00. This is a toll-free number - you do not pay for the call. For lost SMS vouchers, banking issues, or general inquiries, this is the best option." },
      { heading: "SASSA Fraud Hotline", text: "Report suspicious activity or fraud to the SASSA Fraud Hotline at 0800 60 10 11. You can also report fraud at your nearest SAPS station. Keep all suspicious messages, emails, or documents as evidence." },
    ],
  },
];

export const allBankingContent = bankingGuides.flatMap((g) => g.content);

export function getBankingGuide(slug: string): BankingGuide | undefined {
  return bankingGuides.find((g) => g.slug === slug);
}
