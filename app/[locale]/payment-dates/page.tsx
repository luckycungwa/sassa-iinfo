import type { Metadata } from "next";
import Link from "next/link";
import PaymentCentre from "../../../components/PaymentCentre";
import { paymentMonths } from "../../../lib/data/paymentDates";
import { ArrowRight, CalendarDays } from "lucide-react";
import { canonicalUrl } from "@/lib/canonical";
import { webpageSchema, breadcrumbSchema, faqSchema } from "@/lib/json-ld";
import AdUnit from "@/components/ads/AdUnit";

const faqs = [
  { question: "When are SASSA grants paid each month?", answer: "Payment dates are staggered by grant type. Older Persons grants are paid first (2nd-5th), followed by Disability grants (3rd-6th), then Children's grants (4th-7th). SRD R370 is paid between the 25th and 30th of each month." },
  { question: "Do I need to withdraw my SASSA grant on the first day?", answer: "No. Your grant remains available in your account. You can withdraw any time after the pay date. Avoiding peak queues by collecting a few days later is recommended." },
  { question: "How long does a SASSA bank transfer take?", answer: "Bank transfers typically reflect 1-3 business days after the official pay date. Plan your budget accordingly. If funds have not reflected after 5 business days, contact SASSA." },
  { question: "What if I lose the Cash Send SMS from SASSA?", answer: "Contact SASSA at 0800 60 10 11 to request a resend. You can also visit a SASSA office with your ID for a replacement voucher." },
  { question: "Can SASSA payment dates change?", answer: "Yes, payment dates can shift due to public holidays, weekends, or special circumstances. Check the official schedule each month. SASSA usually announces changes in advance." },
  { question: "How do I check my SASSA payment date?", answer: "Check your status on the SRD portal at srd.sassa.gov.za, or use the SASSA WhatsApp line at 082 046 8553. Your payment date is displayed alongside your approved status." },
];

export const metadata: Metadata = {
  title: "SASSA Payment Dates 2026 — Check Your Monthly Payouts",
  description: "SASSA payment dates for 2026: check monthly payout days for Older Person, Disability, Child Support and SRD R370 grants, plus tips to avoid pay-point queues.",
  alternates: { canonical: canonicalUrl("/payment-dates") },
  openGraph: {
    title: "SASSA Payment Dates 2026 — Check Your Monthly Payouts",
    description: "SASSA payment dates for 2026: check monthly payout days for Older Person, Disability, Child Support and SRD R370 grants.",
  },
};

export default function PaymentDatesPage() {
  const currentMonth = paymentMonths.find((m) => m.isCurrent);
  const nextMonth = paymentMonths.find((m) => m.isFuture);
  const holidayMonth = paymentMonths.find((m) => m.month === 12);

  const pageSchema = webpageSchema("SASSA Payment Dates 2026 — Check Your Monthly Payouts", "SASSA payment dates for 2026: check monthly payout days for Older Person, Disability, Child Support and SRD R370 grants.", "/payment-dates");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Payment Dates", url: "/payment-dates" },
  ]);
  const faq = faqSchema(faqs);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />}
      <section className="bg-slate text-white py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-muted uppercase tracking-widest mb-3">payment calendar</p>
          <h1 className="text-[40px] md:text-[57px] font-black text-white leading-[1.15] tracking-[-0.007em]">
            SASSA payment dates 2026
          </h1>
          <p className="text-[21px] text-body mt-4 max-w-xl leading-relaxed">
            Monthly payout schedules for all SASSA grants - Older Person, Disability, Child Support, SRD R370, and more.
          </p>
        </div>
      </section>

      <AdUnit slot="PAYMENTDATES_HUB" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" />

      <section className="bg-paper py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">SASSA payment date quick links</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href={"/payment-dates/" + (currentMonth?.slug || "2026-july")} className="flex items-center gap-3 p-4 rounded-[2.85px] bg-yellow/30 hover:bg-yellow/50 transition group border-2 border-yellow">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <CalendarDays className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">{currentMonth?.label || "July 2026"}</p>
                <p className="text-xs text-ash">Current month</p>
              </div>
            </Link>
            <Link href={"/payment-dates/" + (nextMonth?.slug || "2026-august")} className="flex items-center gap-3 p-4 card hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <CalendarDays className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">{nextMonth?.label || "August 2026"}</p>
                <p className="text-xs text-ash">Next month</p>
              </div>
            </Link>
            <Link href="/banking" className="flex items-center gap-3 p-4 card hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <CalendarDays className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">Payment Methods</p>
                <p className="text-xs text-ash">Collection options</p>
              </div>
            </Link>
            <Link href="/payment-dates/older-persons-grant-payment-dates" className="flex items-center gap-3 p-4 card hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <CalendarDays className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">Older Persons Grant Dates</p>
                <p className="text-xs text-ash">Pension payout schedule</p>
              </div>
            </Link>
            <Link href="/payment-dates/disability-grant-payment-dates" className="flex items-center gap-3 p-4 card hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <CalendarDays className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">Disability Grant Dates</p>
                <p className="text-xs text-ash">Payout schedule</p>
              </div>
            </Link>
            <Link href="/guides/how-to-check-sassa-status" className="flex items-center gap-3 p-4 card hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <CalendarDays className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">Check My Payment Date</p>
                <p className="text-xs text-ash">Online, WhatsApp or USSD</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-fog py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] font-black text-carbon tracking-[-0.007em]">Monthly archive</h2>
            <span className="text-xs text-ash font-mono">{paymentMonths.length} months available</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {paymentMonths.map((m) => (
              <Link
                key={m.id}
                href={`/payment-dates/${m.slug}`}
                className="flex items-center gap-2 text-sm font-bold px-4 py-3 card text-carbon hover:bg-yellow/50 transition"
              >
                <CalendarDays className="w-3.5 h-3.5 text-violet shrink-0" />
                {m.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <PaymentCentre />
        </div>
      </section>

      <section className="bg-fog py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[21px] font-black text-carbon tracking-[-0.007em] mb-6">Common SASSA payment questions</h2>
          <div className="space-y-2 max-w-2xl">
            {faqs.map((faq) => (
              <details key={faq.question} className="group card overflow-hidden">
                <summary className="text-sm font-bold text-carbon p-4 cursor-pointer list-none flex items-center justify-between hover:bg-paper/80 transition">
                  {faq.question}
                  <svg className="w-4 h-4 text-ash shrink-0 ml-2 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-sm text-body leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[19px] leading-relaxed max-w-2xl mx-auto">
            <Link href="/grants" className="text-accent font-bold hover:underline">Browse all SASSA grants</Link>
            <span className="text-white/30 mx-3">|</span>
            <Link href="/status" className="text-accent font-bold hover:underline">Check your SASSA status</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
