import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, Users, CheckCircle2, AlertTriangle } from "lucide-react";
import { eligibilityGuides } from "../../../lib/data/eligibility";
import { canonicalUrl } from "@/lib/canonical";
import { webpageSchema, breadcrumbSchema, faqSchema } from "@/lib/json-ld";

const faqs = [
  { question: "What is the income limit for SASSA grants?", answer: "For most grants, single applicants must earn below R112,200 per year. For the SRD R370 grant, your monthly bank inflows must stay under R624." },
  { question: "Can I get a SASSA grant if I have a part-time job?", answer: "You may still qualify if your earnings fall below the means test threshold. Casual or gig economy income under R624/month generally won't disqualify you from the SRD grant." },
  { question: "Does UIF or NSFAS affect my SASSA eligibility?", answer: "Yes. Active UIF payments above R624/month or any NSFAS funding will disqualify you from the SRD R370 grant. We have specific guides for both scenarios." },
  { question: "What if my situation changes after I'm approved for a grant?", answer: "You must report changes in income, employment, or household composition to SASSA. Failure to do so can result in overpayment recovery or cancellation of your grant." },
];

export const metadata: Metadata = {
  title: "SASSA Grant Eligibility Guide 2026 | Do You Qualify?",
  description: "Not sure which SASSA grant you qualify for? Select your situation: unemployed, student, over 60, disabled, UIF recipient, or no bank account. Find matching grants with full eligibility criteria and means test thresholds.",
  alternates: { canonical: canonicalUrl("/eligibility") },
  openGraph: {
    title: "SASSA Grant Eligibility Guide 2026 | Do You Qualify?",
    description: "Not sure which SASSA grant you qualify for? Find matching grants based on your situation.",
  },
};

const commonSituations = eligibilityGuides.filter((g) =>
  ["i-am-unemployed", "i-am-over-60", "i-am-disabled", "i-receive-uif"].includes(g.slug)
);

const commonMistakes = [
  { title: "Hidden bank deposits", desc: "Any deposit over R624 can flag you as having income. Check your statements.", icon: AlertTriangle },
  { title: "UIF on old database", desc: "Even old UIF records can trigger a decline. Get a UI-19 termination letter.", icon: AlertTriangle },
  { title: "Overlooking Grant-in-Aid", desc: "If you care for a grant recipient 24/7, you may qualify for an extra R580/month.", icon: AlertTriangle },
];

export default function EligibilityHubPage() {
  const pageSchema = webpageSchema("SASSA Grant Eligibility Guide 2026 | Do You Qualify?", "Not sure which SASSA grant you qualify for? Select your situation to find matching grants.", "/eligibility");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Eligibility Centre", url: "/eligibility" },
  ]);
  const faq = faqSchema(faqs);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />}
      <section className="bg-yellow py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">eligibility centre</p>
          <h1 className="text-[40px] md:text-[57px] font-black text-carbon leading-[1.15] tracking-[-0.007em]">
            Do you qualify for a SASSA grant?
          </h1>
          <p className="text-[21px] text-body mt-4 max-w-xl leading-relaxed">
            Your circumstances determine which grants you can access. Select your situation below for a personalised eligibility breakdown.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="#all-guides"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet text-white rounded-[28.5px] text-sm font-bold hover:opacity-90 transition btn-violet"
            >
              Browse all situations <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/grants/srd-r370-grant"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-carbon/20 text-carbon rounded-[28.5px] text-sm font-bold hover:bg-carbon/5 transition"
            >
              SRD R370 Guide
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">SASSA eligibility quick facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Search, label: "Situation Guides", value: `${eligibilityGuides.length}` },
              { icon: Users, label: "Most Common", value: "Unemployed" },
              { icon: CheckCircle2, label: "Income Threshold", value: "R624/mo" },
              { icon: CheckCircle2, label: "Grant Types", value: "8 Available" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 card p-4">
                <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-violet" />
                </div>
                <div>
                  <p className="text-lg font-black text-carbon">{stat.value}</p>
                  <p className="text-xs text-ash">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-fog py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[19px] font-black text-carbon tracking-[-0.007em] mb-4">Most common situations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {commonSituations.map((s) => (
              <Link key={s.id} href={`/eligibility/${s.slug}`} className="flex items-center gap-3 p-4 card hover:bg-yellow/30 transition group">
                <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                  <Search className="w-5 h-5 text-violet" />
                </div>
                <div>
                  <p className="text-sm font-black text-carbon group-hover:text-violet transition">{s.title}</p>
                  <p className="text-xs text-ash truncate">{s.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="all-guides" className="bg-paper py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] font-black text-carbon tracking-[-0.007em] mb-6">Find your situation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {eligibilityGuides.map((e) => (
              <Link
                key={e.id}
                href={`/eligibility/${e.slug}`}
                className="flex items-center justify-between p-4 card hover:bg-yellow/30 transition group"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-carbon group-hover:text-violet transition">{e.title}</p>
                  <p className="text-xs text-ash line-clamp-1">{e.shortDescription}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-ash group-hover:text-violet transition shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-fog py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[21px] font-black text-carbon tracking-[-0.007em] mb-6">Common mistakes that affect eligibility</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {commonMistakes.map((m) => (
              <div key={m.title} className="flex items-start gap-3 p-4 card">
                <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0 mt-0.5">
                  <m.icon className="w-5 h-5 text-violet" />
                </div>
                <div>
                  <p className="text-sm font-bold text-carbon">{m.title}</p>
                  <p className="text-xs text-ash mt-1 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[21px] font-black text-carbon tracking-[-0.007em] mb-6">Common SASSA eligibility questions</h2>
          <div className="space-y-2 max-w-2xl">
            {faqs.map((faq) => (
              <details key={faq.question} className="group card overflow-hidden">
                <summary className="text-sm font-bold text-carbon p-4 cursor-pointer list-none flex items-center justify-between hover:bg-fog/80 transition">
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[19px] font-bold text-white">Not sure which situation fits you?</p>
              <p className="text-sm text-white/70">Browse all grants or check the SRD R370 guide</p>
            </div>
            <div className="flex gap-2">
              <Link href="/grants" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent text-accent-foreground rounded-[22px] text-xs font-bold hover:opacity-90 transition">
                View All Grants <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/status" className="inline-flex items-center gap-1.5 px-5 py-2.5 border-2 border-white/30 text-white rounded-[22px] text-xs font-bold hover:bg-white/10 transition">
                Check Status
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
