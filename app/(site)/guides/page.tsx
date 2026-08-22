import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ListChecks, FileText } from "lucide-react";
import { guides } from "../../../lib/data/guides";
import { canonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "SASSA Guides | Step-by-Step How-To Resources",
  description: "Practical step-by-step guides for applying for SASSA grants, checking your status, gathering documents, and understanding the means test.",
  alternates: { canonical: canonicalUrl("/guides") },
};

const featuredGuides = guides.filter((g) => ["how-to-apply-sassa-grant", "how-to-check-sassa-status", "understanding-means-test"].includes(g.slug));
const otherGuides = guides.filter((g) => !["how-to-apply-sassa-grant", "how-to-check-sassa-status", "understanding-means-test"].includes(g.slug));

export default function GuidesHubPage() {
  return (
    <div>
      <section className="bg-yellow py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-carbon/50 uppercase tracking-widest mb-3">how-to guides</p>
          <h1 className="text-[40px] md:text-[57px] font-black text-carbon leading-[1.15] tracking-[-0.007em]">
            Step-by-step SASSA guides
          </h1>
          <p className="text-[21px] text-carbon/70 mt-4 max-w-xl leading-relaxed">
            Practical walkthroughs for every SASSA process â€” from applying to checking your status and understanding the means test.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href={"/guides/" + featuredGuides[0]?.slug}
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet text-white rounded-[28.5px] text-sm font-bold hover:opacity-90 transition btn-violet"
            >
              Start guide <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="#all-guides"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-carbon/20 text-carbon rounded-[28.5px] text-sm font-bold hover:bg-carbon/5 transition"
            >
              Browse all
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: BookOpen, label: "Step-by-Step Guides", value: `${guides.length}` },
              { icon: ListChecks, label: "Document Checklists", value: "Included" },
              { icon: FileText, label: "Means Test Explained", value: "5 Factors" },
              { icon: BookOpen, label: "Application Steps", value: "6 Phases" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 bg-fog rounded-[2.85px] p-4">
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

      <section className="bg-fog py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] font-black text-carbon tracking-[-0.007em] mb-6">Featured guides</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {featuredGuides.map((g) => (
              <Link key={g.id} href={"/guides/" + g.slug} className="p-5 rounded-[2.85px] bg-paper hover:bg-yellow/30 transition group">
                <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5 text-violet" />
                </div>
                <p className="text-[19px] font-black text-carbon group-hover:text-violet transition">{g.title}</p>
                <p className="text-sm text-ash mt-1 leading-snug">{g.description}</p>
                <span className="text-xs font-bold text-violet mt-3 inline-flex items-center gap-1">
                  {g.steps.length} steps <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="all-guides" className="bg-paper py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] font-black text-carbon tracking-[-0.007em] mb-6">All guides</h2>
          <div className="space-y-2">
            {otherGuides.map((g) => (
              <Link
                key={g.id}
                href={"/guides/" + g.slug}
                className="flex items-center gap-3 p-4 rounded-[2.85px] bg-fog hover:bg-yellow/30 transition group"
              >
                <FileText className="w-5 h-5 text-violet shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-carbon group-hover:text-violet transition">{g.title}</p>
                  <p className="text-xs text-ash line-clamp-1">{g.description}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-ash group-hover:text-violet transition shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-fog py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[21px] font-black text-carbon tracking-[-0.007em] mb-6">Common questions</h2>
          <div className="space-y-2 max-w-2xl">
            {[
              { q: "Which guide should I start with?", a: "If you're new to SASSA, start with 'How to Apply for a SASSA Grant' â€” it covers the entire process from eligibility to submission." },
              { q: "Do I need all the documents listed in the checklist?", a: "The checklist covers every possible document. At minimum, you need your ID, proof of residence, and proof of income. Additional documents depend on the grant type." },
              { q: "How long does the application process take?", a: "Submitting the application takes about 30-60 minutes at a SASSA office. Processing takes up to 3 months. The SRD R370 grant is reviewed monthly." },
            ].map((faq) => (
              <details key={faq.q} className="group bg-paper rounded-[2.85px] overflow-hidden">
                <summary className="text-sm font-bold text-carbon p-4 cursor-pointer list-none flex items-center justify-between hover:bg-paper/80 transition">
                  {faq.q}
                  <svg className="w-4 h-4 text-ash shrink-0 ml-2 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-sm text-carbon/70 leading-relaxed">{faq.a}</p>
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
              <p className="text-[19px] font-bold text-white">Need more help with a specific topic?</p>
              <p className="text-sm text-white/60">Visit the full grant library or check your eligibility</p>
            </div>
            <div className="flex gap-2">
              <Link href="/grants" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-yellow text-carbon rounded-[22px] text-xs font-bold hover:opacity-90 transition">
                Grant Library <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/eligibility" className="inline-flex items-center gap-1.5 px-5 py-2.5 border-2 border-white/30 text-white rounded-[22px] text-xs font-bold hover:bg-white/10 transition">
                Check Eligibility
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
