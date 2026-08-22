import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Scale, Clock, FileText, CheckCircle2, AlertTriangle } from "lucide-react";
import { appeals } from "../../../lib/data/appeals";
import { canonicalUrl } from "@/lib/canonical";
import { webpageSchema, breadcrumbSchema } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "SASSA Appeals Centre | How to Appeal a Declined Grant in 90 Days",
  description: "Complete guide to appealing a declined SASSA grant through ITSAA. Step-by-step instructions, 90-day appeal window, required documents, UIF and NSFAS decline appeals, and appeal outcome guide.",
  alternates: { canonical: canonicalUrl("/appeals") },
  openGraph: {
    title: "SASSA Appeals Centre | How to Appeal a Declined Grant in 90 Days",
    description: "Complete guide to appealing a declined SASSA grant through ITSAA within 90 days.",
  },
};

export default function AppealsHubPage() {
  const pageSchema = webpageSchema("SASSA Appeals Centre | How to Appeal a Declined Grant in 90 Days", "Complete guide to appealing a declined SASSA grant through ITSAA within 90 days.", "/appeals");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Appeals Centre", url: "/appeals" },
  ]);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <section className="bg-yellow py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-carbon/50 uppercase tracking-widest mb-3">appeals centre</p>
          <h1 className="text-[40px] md:text-[57px] font-black text-carbon leading-[1.15] tracking-[-0.007em]">
            How to appeal a declined SASSA grant
          </h1>
          <p className="text-[21px] text-carbon/70 mt-4 max-w-xl leading-relaxed">
            If SASSA declined your application, you have 90 days to appeal through the Independent Tribunal for Social Assistance Appeals (ITSAA).
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/appeals/how-to-appeal"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet text-white rounded-[28.5px] text-sm font-bold hover:opacity-90 transition btn-violet"
            >
              Start your appeal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/appeals/appeal-timeline"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-carbon/20 text-carbon rounded-[28.5px] text-sm font-bold hover:bg-carbon/5 transition"
            >
              View timeline
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">SASSA appeal key facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Clock, label: "Appeal Window", value: "90 days" },
              { icon: Scale, label: "ITSAA Tribunal", value: "Independent" },
              { icon: FileText, label: "Appeal Guides", value: `${appeals.length}` },
              { icon: CheckCircle2, label: "Backpay on Approval", value: "Yes" },
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

      <section className="bg-paper py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[19px] font-black text-carbon tracking-[-0.007em] mb-4">How to appeal guides</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/appeals/how-to-appeal" className="flex items-center gap-3 p-4 rounded-[2.85px] bg-fog hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">How to Appeal</p>
                <p className="text-xs text-ash">Step-by-step guide</p>
              </div>
            </Link>
            <Link href="/appeals/appeal-timeline" className="flex items-center gap-3 p-4 rounded-[2.85px] bg-fog hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">Timeline</p>
                <p className="text-xs text-ash">60-90 day process</p>
              </div>
            </Link>
            <Link href="/appeals/appeal-documents" className="flex items-center gap-3 p-4 rounded-[2.85px] bg-fog hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">Documents</p>
                <p className="text-xs text-ash">What you need</p>
              </div>
            </Link>
            <Link href="/appeals/appeal-reasons" className="flex items-center gap-3 p-4 rounded-[2.85px] bg-fog hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">Reasons</p>
                <p className="text-xs text-ash">Why grants are declined</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-fog py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] font-black text-carbon tracking-[-0.007em] mb-6">Start here: general appeal guide</h2>
          <Link
            href="/appeals/how-to-appeal"
            className="flex items-start gap-4 p-6 rounded-[2.85px] bg-paper hover:bg-yellow/30 transition group"
          >
            <Scale className="w-8 h-8 text-violet shrink-0 mt-1" />
            <div>
              <p className="text-[19px] font-black text-carbon group-hover:text-violet transition">How to Appeal a Declined SASSA Grant Application</p>
              <p className="text-sm text-ash mt-1 leading-relaxed">A comprehensive guide on lodging an appeal with the Independent Tribunal for Social Assistance Appeals (ITSAA). Covers every step from receiving your decline letter to the tribunal ruling.</p>
              <span className="text-xs font-bold text-violet mt-3 inline-flex items-center gap-1">
                Read full guide <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] font-black text-carbon tracking-[-0.007em] mb-6">All SASSA appeal guides</h2>
          <div className="space-y-2">
            {appeals.map((a) => (
              <Link
                key={a.id}
                href={"/appeals/" + a.slug}
                className="flex items-center gap-3 p-4 rounded-[2.85px] bg-fog hover:bg-yellow/30 transition group"
              >
                <FileText className="w-5 h-5 text-violet shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-carbon group-hover:text-violet transition">{a.title}</p>
                  <p className="text-xs text-ash line-clamp-1">{a.shortDescription}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-ash group-hover:text-violet transition shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-fog py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] font-black text-carbon tracking-[-0.007em] mb-6">Most common SASSA decline reasons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link href="/appeals/appeal-after-uif" className="flex items-center gap-3 p-4 rounded-[2.85px] bg-paper hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-violet" /></div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-carbon group-hover:text-violet transition truncate">UIF Registered</p>
                <p className="text-xs text-ash truncate">Submit UI-19 termination letter</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-ash group-hover:text-violet transition shrink-0 ml-auto" />
            </Link>
            <Link href="/appeals/appeal-after-nsfas" className="flex items-center gap-3 p-4 rounded-[2.85px] bg-paper hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-violet" /></div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-carbon group-hover:text-violet transition truncate">NSFAS Funded</p>
                <p className="text-xs text-ash truncate">Get NSFAS cancellation letter</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-ash group-hover:text-violet transition shrink-0 ml-auto" />
            </Link>
            <Link href="/appeals/appeal-after-income-source" className="flex items-center gap-3 p-4 rounded-[2.85px] bg-paper hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0"><AlertTriangle className="w-5 h-5 text-violet" /></div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-carbon group-hover:text-violet transition truncate">Income Source</p>
                <p className="text-xs text-ash truncate">Explain bank deposits</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-ash group-hover:text-violet transition shrink-0 ml-auto" />
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link href="/appeals/appeal-reasons" className="text-xs font-bold text-violet hover:underline inline-flex items-center gap-1">
              View all decline reasons <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow shrink-0" />
              <div>
                <p className="text-[19px] font-bold text-white">Need to submit an appeal right now?</p>
                <p className="text-sm text-white/60">Visit the official SRD appeal portal</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="https://srd.dsd.gov.za" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-yellow text-carbon rounded-[22px] text-xs font-bold hover:opacity-90 transition">
                SRD Appeal Portal <ArrowRight className="w-3 h-3" />
              </a>
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
