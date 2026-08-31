import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, HelpCircle, ShieldCheck, Scale, CalendarDays, Search } from "lucide-react";
import { grants } from "../../../lib/data/grants";
import { canonicalUrl } from "@/lib/canonical";
import { webpageSchema, breadcrumbSchema, faqSchema } from "@/lib/json-ld";
import AdUnit from "@/components/ads/AdUnit";

const faqs = [
  { question: "How do I know which SASSA grant I qualify for?", answer: "Use our Eligibility Checker tool to find grants matching your situation. You can also browse each grant's eligibility criteria on its detail page. Key factors include your age, income level, employment status, and household situation." },
  { question: "Can I receive more than one SASSA grant?", answer: "Generally, you can only receive one social grant at a time. However, you may qualify for a Grant-in-Aid in addition to certain grants if you require full-time care. The SRD R370 grant also cannot be combined with other grants." },
  { question: "How long does SASSA grant processing take?", answer: "Standard grants take up to 3 months to process from the date of application. The SRD R370 grant is reviewed monthly and typically updates around the 15th-20th of each month. Check your application status regularly for updates." },
  { question: "What happens if my SASSA grant application is declined?", answer: "You have 90 days from the date of the decline to submit an appeal through the Independent Tribunal for Social Assistance Appeals (ITSAA). Visit our Appeals Centre for step-by-step guidance on the appeal process." },
  { question: "How are SASSA grant amounts determined?", answer: "Grant amounts are set by the South African government through the annual national budget process. Increases are typically announced in February during the budget speech and take effect from April each year." },
];

export const metadata: Metadata = {
  title: "All SASSA Social Grants - Complete Grant Library 2026 | Amounts, Eligibility & How to Apply",
  description: "Browse all 8 SASSA social grants: Older Person R2,400, Child Support R580, Disability R2,400, Foster Care R1,295, Care Dependency R2,400, War Veterans R2,420, Grant-in-Aid R580, and SRD R370. Compare amounts, eligibility criteria, and application steps.",
  alternates: { canonical: canonicalUrl("/grants") },
  openGraph: {
    title: "All SASSA Social Grants - Complete Grant Library 2026",
    description: "Browse all 8 SASSA social grants with current amounts, eligibility criteria, and step-by-step application guides.",
  },
};

export default function GrantsHubPage() {
  const pageSchema = webpageSchema("All SASSA Social Grants - Complete Grant Library 2026", "Browse all 8 SASSA social grants with amounts, eligibility, and how to apply.", "/grants");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "All Grants", url: "/grants" },
  ]);
  const faq = faqSchema(faqs);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />}
      <section className="bg-yellow py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">grant library</p>
              <h1 className="text-[40px] md:text-[57px] font-black text-carbon leading-[1.15] tracking-[-0.007em]">
                All SASSA social grants
              </h1>
              <p className="text-[21px] text-body mt-4 max-w-xl leading-relaxed">
                South Africa&apos;s social grant system provides financial support to millions. Below are all eight grants with eligibility, amounts, and application guides.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href="#all-grants"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-violet text-white rounded-[28.5px] text-sm font-bold hover:opacity-90 transition btn-violet"
                >
                  Browse all grants <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/eligibility"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-carbon/20 text-carbon rounded-[28.5px] text-sm font-bold hover:bg-carbon/5 transition"
                >
                  Check eligibility
                </Link>
              </div>
            </div>
            <div className="w-52 shrink-0">
              <Image
                src="/hero-srd.webp"
                alt="SASSA SRD R370 grant - social relief of distress"
                width={208}
                height={140}
                className="w-full h-auto rounded-[2.85px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <AdUnit slot="GRANTS_HUB" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" />

      <section className="bg-paper py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">SASSA grant quick navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/eligibility" className="flex items-center gap-3 p-4 card hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <Search className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">Eligibility</p>
                <p className="text-xs text-ash">Check if you qualify</p>
              </div>
            </Link>
            <Link href="/status" className="flex items-center gap-3 p-4 card hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">Status</p>
                <p className="text-xs text-ash">Check application status</p>
              </div>
            </Link>
            <Link href="/appeals" className="flex items-center gap-3 p-4 card hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">Appeals</p>
                <p className="text-xs text-ash">Appeal a declined grant</p>
              </div>
            </Link>
            <Link href="/payment-dates" className="flex items-center gap-3 p-4 card hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <CalendarDays className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">Pay Dates</p>
                <p className="text-xs text-ash">Monthly payment schedule</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section id="all-grants" className="bg-fog py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">Complete list of SASSA grant types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {grants.map((g) => (
              <Link
                key={g.id}
                href={"/grants/" + g.slug}
                className="flex items-center justify-between p-5 card hover:bg-yellow/30 transition group"
              >
                <div className="min-w-0">
                  <p className="text-[19px] font-black text-carbon group-hover:text-violet transition">{g.title}</p>
                  <p className="text-sm text-ash mt-0.5">{g.targetGroup}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <span className="text-lg font-black text-carbon">{g.amount}</span>
                  <span className="text-sm text-ash">/month</span>
                  <ArrowRight className="w-4 h-4 text-ash group-hover:text-violet transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-yellow py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[29px] font-black text-carbon leading-[1.1] tracking-[-0.007em] mb-8">Common SASSA grant questions</h2>
          <div className="space-y-3 max-w-2xl">
            {faqs.map((faq) => (
              <details key={faq.question} className="group card overflow-hidden">
                <summary className="text-sm font-bold text-carbon p-5 cursor-pointer list-none flex items-center justify-between hover:bg-paper/80 transition">
                  {faq.question}
                  <svg className="w-4 h-4 text-ash shrink-0 ml-2 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm text-body leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-fog py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-violet shrink-0" />
              <div>
                <p className="text-[19px] font-bold text-carbon">Not sure where to start?</p>
                <p className="text-sm text-ash">Check your eligibility or view payment dates</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link href="/eligibility" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-violet text-white rounded-[22px] text-xs font-bold hover:opacity-90 transition btn-violet">
                Check Eligibility <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/payment-dates" className="inline-flex items-center gap-1.5 px-5 py-2.5 border-2 border-carbon/20 text-carbon rounded-[22px] text-xs font-bold hover:bg-carbon/5 transition">
                Payment Dates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
