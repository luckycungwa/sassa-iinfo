import type { Metadata } from "next";
import Link from "next/link";
import { Search, Clock, AlertTriangle, ShieldCheck, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { statuses } from "../../../lib/data/statuses";
import { canonicalUrl } from "@/lib/canonical";
import { webpageSchema, breadcrumbSchema } from "@/lib/json-ld";

const featuredStatuses = statuses.filter((s) => ["pending", "approved", "declined", "alternative-income-source"].includes(s.slug));

export const metadata: Metadata = {
  title: "SASSA Status Meanings Explained | SRD & Grant Application Status Codes 2026",
  description: "Complete guide to all SASSA grant status codes including Pending, Approved, Declined, Cancelled, Bank Verification, Alternative Income Source, Means Test Failed, and more. Learn what each status means and what to do next.",
  alternates: { canonical: canonicalUrl("/status") },
  openGraph: {
    title: "SASSA Status Meanings Explained | SRD & Grant Application Status Codes 2026",
    description: "Complete guide to all SASSA grant status codes. Learn what Pending, Approved, Declined, and other statuses mean.",
  },
};

export default function StatusHubPage() {
  const pageSchema = webpageSchema("SASSA Status Meanings Explained | SRD & Grant Application Status Codes 2026", "Complete guide to all SASSA grant status codes with explanations and next steps.", "/status");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Status Meanings", url: "/status" },
  ]);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <section className="bg-slate text-white py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-muted uppercase tracking-widest mb-3">status centre</p>
          <h1 className="text-[40px] md:text-[57px] font-black text-white leading-[1.15] tracking-[-0.007em]">
            SASSA status meanings explained
          </h1>
          <p className="text-[21px] text-body mt-4 max-w-xl leading-relaxed">
            Your SASSA application status tells you exactly where things stand. Whether it says Pending, Approved, Declined, or something else, we explain what it means and what to do next.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="#common-statuses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet text-white rounded-[28.5px] text-sm font-bold hover:opacity-90 transition btn-violet"
            >
              View common statuses <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/status/pending"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white rounded-[28.5px] text-sm font-bold hover:bg-white/10 transition"
            >
              Why is my status pending?
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[19px] font-black text-carbon tracking-[-0.007em] mb-4">Common problems right now</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { href: "/status/approved", title: "Approved, no pay date", desc: "What it means when approval shows without a pay day" },
              { href: "/banking/payment-not-reflecting", title: "Pay day passed, no money", desc: "Escalation steps when your payment is overdue" },
              { href: "/status/payment-processing", title: "Payment date changed", desc: "Why dates shift and what your status is telling you" },
              { href: "/banking/update-bank-details", title: "Bank details problem", desc: "Fix banking details stuck in verification" },
              { href: "/guides/change-srd-phone-number", title: "Changed or lost number", desc: "Update your SRD cellphone number, even without the SIM" },
              { href: "/appeals/how-to-appeal", title: "Declined â€” appeal", desc: "Lodge an ITSAA appeal within the 90-day window" },
            ].map((p) => (
              <Link key={p.href} href={p.href} className="flex flex-col p-4 card hover:bg-yellow/30 transition group">
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">{p.title}</p>
                <p className="text-xs text-ash mt-1 leading-snug">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-yellow py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">SASSA status quick facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { icon: Search, label: "Status Codes", value: statuses.length.toString() },
              { icon: Clock, label: "Typical Processing", value: "7-30 days" },
              { icon: AlertTriangle, label: "Appeal Window", value: "90 days" },
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

      <section className="bg-paper py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[19px] font-black text-carbon tracking-[-0.007em] mb-4">Quick answers by status</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/status/pending" className="flex items-center gap-3 p-4 card hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">Pending</p>
                <p className="text-xs text-ash">No action needed</p>
              </div>
            </Link>
            <Link href="/status/approved" className="flex items-center gap-3 p-4 card hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">Approved</p>
                <p className="text-xs text-ash">Payment scheduled</p>
              </div>
            </Link>
            <Link href="/status/declined" className="flex items-center gap-3 p-4 card hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <XCircle className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">Declined</p>
                <p className="text-xs text-ash">You can appeal</p>
              </div>
            </Link>
            <Link href="/status/alternative-income-source" className="flex items-center gap-3 p-4 card hover:bg-yellow/30 transition group">
              <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-violet" />
              </div>
              <div>
                <p className="text-sm font-black text-carbon group-hover:text-violet transition">Income Source</p>
                <p className="text-xs text-ash">Bank deposit flag</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section id="common-statuses" className="bg-fog py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] font-black text-carbon tracking-[-0.007em] mb-6">Most common SASSA statuses</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {featuredStatuses.map((s) => (
              <Link
                key={s.id}
                href={"/status/" + s.slug}
                className="flex items-center justify-between p-5 card hover:bg-yellow/30 transition group"
              >
                <div className="min-w-0">
                  <p className="text-[19px] font-black text-carbon group-hover:text-violet transition">{s.statusName}</p>
                  <p className="text-sm text-ash mt-1">{s.shortDescription}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-ash group-hover:text-violet transition shrink-0 ml-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] font-black text-carbon tracking-[-0.007em] mb-6">All SASSA status meanings</h2>
          <div className="space-y-2">
            {statuses.map((s) => (
              <Link
                key={s.id}
                href={"/status/" + s.slug}
                className="flex items-center gap-3 p-4 card hover:bg-yellow/30 transition group"
              >
                <ShieldCheck className="w-5 h-5 text-violet shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-carbon group-hover:text-violet transition">{s.statusName}</p>
                  <p className="text-xs text-ash line-clamp-1">{s.shortDescription}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-ash group-hover:text-violet transition shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[19px] font-bold text-white">Need help with a specific SASSA status?</p>
              <p className="text-sm text-muted">Check your status online or visit the appeals centre</p>
            </div>
            <div className="flex gap-2">
              <a href="https://srd.sassa.gov.za" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent text-accent-foreground rounded-[22px] text-xs font-bold hover:opacity-90 transition">
                Check Status <ArrowRight className="w-3 h-3" />
              </a>
              <Link href="/appeals" className="inline-flex items-center gap-1.5 px-5 py-2.5 border-2 border-white/30 text-white rounded-[22px] text-xs font-bold hover:bg-white/10 transition">
                Appeals Centre
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
