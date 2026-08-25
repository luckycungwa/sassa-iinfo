import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, FileCheck, Download } from "lucide-react";
import { downloadableForms } from "../../../lib/data/downloads";
import { canonicalUrl } from "@/lib/canonical";
import { webpageSchema, breadcrumbSchema, faqSchema } from "../../../lib/json-ld";

const downloadFaqs = [
  { question: "How do I fill in SASSA forms correctly?", answer: "Use black ink only, write in clear block letters, and do NOT sign the form until instructed by a SASSA official. Each form on this page includes a detailed how-to-fill guide." },
  { question: "Do I need to print SASSA forms or can I fill them online?", answer: "Most SASSA forms must be printed and filled by hand. Bring the completed form plus all required documents to your nearest SASSA office for submission." },
  { question: "Which SASSA form do I need for my situation?", answer: "Start with the Official Grant Application Form for most grants. Use the Bank Change Form if you need to update payment details, or the SRD Appeal Template if you're appealing a decline." },
];

export const metadata: Metadata = {
  title: "SASSA Download Centre | Official Grant Forms & Templates",
  description: "Download official SASSA forms including grant application forms, bank consent forms, and SRD appeal templates. Each form includes a detailed guide and document checklist.",
  alternates: { canonical: canonicalUrl("/downloads") },
  openGraph: {
    title: "SASSA Download Centre | Official Grant Forms & Templates",
    description: "Download official SASSA forms including grant application forms, bank consent forms, and SRD appeal templates.",
  },
};

export default function DownloadsHubPage() {
  const pageSchema = webpageSchema("SASSA Download Centre | Official Grant Forms & Templates", "Download official SASSA forms with step-by-step filling guides.", "/downloads");
  const breadcrumb = breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Download Centre", url: "/downloads" }]);
  const faq = faqSchema(downloadFaqs);
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />}
      <section className="bg-slate text-white py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-muted uppercase tracking-widest mb-3">download centre</p>
          <h1 className="text-[40px] md:text-[57px] font-black text-white leading-[1.15] tracking-[-0.007em]">
            SASSA forms & documents
          </h1>
          <p className="text-[21px] text-body mt-4 max-w-xl leading-relaxed">
            Download official SASSA forms with step-by-step filling guides and document checklists.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="#all-forms"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet text-white rounded-[28.5px] text-sm font-bold hover:opacity-90 transition btn-violet"
            >
              Browse all forms <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={"/downloads/" + downloadableForms[0]?.slug}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white rounded-[28.5px] text-sm font-bold hover:bg-white/10 transition"
            >
              Most popular
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-yellow py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: FileText, label: "Total Forms", value: `${downloadableForms.length}` },
              { icon: FileCheck, label: "Includes Checklists", value: "All" },
              { icon: Download, label: "Avg File Size", value: "~420 KB" },
              { icon: ArrowRight, label: "Filling Guides", value: "Detailed" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 bg-paper rounded-[2.85px] p-4">
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

      <section id="all-forms" className="bg-paper py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] font-black text-carbon tracking-[-0.007em] mb-6">All downloadable forms</h2>
          <div className="space-y-2">
            {downloadableForms.map((d) => (
              <Link
                key={d.id}
                href={`/downloads/${d.slug}`}
                className="flex items-center gap-4 p-4 rounded-[2.85px] bg-fog hover:bg-yellow/30 transition group"
              >
                <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-violet" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-carbon group-hover:text-violet transition">{d.title}</p>
                  <p className="text-xs text-ash line-clamp-1">{d.shortDescription}</p>
                </div>
                <span className="text-xs text-violet font-mono shrink-0">{d.approxSize}</span>
                <ArrowRight className="w-3.5 h-3.5 text-ash group-hover:text-violet transition shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-fog py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[21px] font-black text-carbon tracking-[-0.007em] mb-6">SASSA form tips</h2>
          <div className="space-y-2 max-w-2xl">
            {[
              { q: "How do I fill in SASSA forms correctly?", a: "Use black ink only, write in clear block letters, and do NOT sign the form until instructed by a SASSA official. Each form on this page includes a detailed how-to-fill guide." },
              { q: "Do I need to print the forms or can I fill them online?", a: "Most SASSA forms must be printed and filled by hand. Bring the completed form plus all required documents to your nearest SASSA office." },
              { q: "Which form do I need for my situation?", a: "Start with the Official Grant Application Form for most grants. Use the Bank Change Form if you need to update payment details, or the SRD Appeal Template if you're appealing a decline." },
            ].map((faq) => (
              <details key={faq.q} className="group bg-paper rounded-[2.85px] overflow-hidden">
                <summary className="text-sm font-bold text-carbon p-4 cursor-pointer list-none flex items-center justify-between hover:bg-paper/80 transition">
                  {faq.q}
                  <svg className="w-4 h-4 text-ash shrink-0 ml-2 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-sm text-body leading-relaxed">{faq.a}</p>
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
              <p className="text-[19px] font-bold text-white">Not sure which form you need?</p>
              <p className="text-sm text-muted">Browse grants or check your eligibility first</p>
            </div>
            <div className="flex gap-2">
              <Link href="/grants" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent text-accent-foreground rounded-[22px] text-xs font-bold hover:opacity-90 transition">
                View Grants <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/guides" className="inline-flex items-center gap-1.5 px-5 py-2.5 border-2 border-white/30 text-white rounded-[22px] text-xs font-bold hover:bg-white/10 transition">
                How-To Guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
