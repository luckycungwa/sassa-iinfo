import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Banknote, CreditCard, Building2, Smartphone, ShieldCheck } from "lucide-react";
import { bankingGuides } from "../../../lib/data/banking";
import { loadAllContent } from "../../../lib/content-loader";
import { canonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "SASSA Banking | Payment Methods & Bank Details Guide",
  description: "Complete guide to SASSA payment methods, bank verification, and how to update your bank details for grant payments.",
  alternates: { canonical: canonicalUrl("/banking") },
};

const guideIcons: Record<string, React.ReactNode> = {
  "payment-methods": <CreditCard className="w-5 h-5" />,
  "how-to-register-for-srd-portal": <Smartphone className="w-5 h-5" />,
  "update-bank-details": <Building2 className="w-5 h-5" />,
  "cash-send-guide": <Banknote className="w-5 h-5" />,
  "bank-verification-process": <ShieldCheck className="w-5 h-5" />,
};

const jsonBankingGuides = loadAllContent()
  .filter((p) => p.slug.startsWith("/banking/"))
  .map((p) => ({ id: p.id, slug: p.slug.replace("/banking/", ""), title: p.title, description: p.seo.metaDescription }));
const seenJsonSlugs = new Set(jsonBankingGuides.map((g) => g.slug));
const allBankingGuides = [
  ...jsonBankingGuides,
  ...bankingGuides
    .filter((g) => !seenJsonSlugs.has(g.slug))
    .map((g) => ({ id: g.id, slug: g.slug, title: g.title, description: g.description })),
];

export default function BankingHubPage() {
  return (
    <div>
      <section className="bg-slate text-white py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-muted uppercase tracking-widest mb-3">banking & payments</p>
          <h1 className="text-[40px] md:text-[57px] font-black text-white leading-[1.15] tracking-[-0.007em]">
            How SASSA pays your grant
          </h1>
          <p className="text-[21px] text-body mt-4 max-w-xl leading-relaxed">
            Four ways to receive your grant Ã¢â‚¬â€ bank transfer, Cash Send, Post Office, or mobile pay points.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/banking/payment-methods"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet text-white rounded-[28.5px] text-sm font-bold hover:opacity-90 transition btn-violet"
            >
              Compare payment methods <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/banking/update-bank-details"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white rounded-[28.5px] text-sm font-bold hover:bg-white/10 transition"
            >
              Update bank details
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-yellow py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Banknote, label: "Payment Methods", value: "4" },
              { icon: Building2, label: "Major Retailers", value: "5+" },
              { icon: ShieldCheck, label: "Bank Verification", value: "2-3 days" },
              { icon: CreditCard, label: "SASSA Card", value: "Free" },
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

      <section className="bg-paper py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] font-black text-carbon tracking-[-0.007em] mb-6">Most-requested guides</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {allBankingGuides.filter((g) => ["payment-methods", "how-to-register-for-srd-portal", "update-bank-details"].includes(g.slug)).map((guide) => (
              <Link
                key={guide.id}
                href={`/banking/${guide.slug}`}
                className="p-5 card hover:bg-yellow/30 transition group"
              >
                <div className="w-10 h-10 rounded-[2.85px] bg-violet/10 flex items-center justify-center mb-3">
                  {guideIcons[guide.slug] || <CreditCard className="w-5 h-5 text-violet" />}
                </div>
                <p className="text-[19px] font-black text-carbon group-hover:text-violet transition">{guide.title}</p>
                <p className="text-sm text-ash mt-1 leading-snug">{guide.description}</p>
                <span className="text-xs font-bold text-violet mt-3 inline-flex items-center gap-1">
                  Read guide <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-fog py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] font-black text-carbon tracking-[-0.007em] mb-6">All banking guides</h2>
          <div className="space-y-2">
            {allBankingGuides.map((guide) => (
              <Link
                key={guide.id}
                href={`/banking/${guide.slug}`}
                className="flex items-center gap-3 p-4 card hover:bg-yellow/30 transition group"
              >
                <div className="w-8 h-8 rounded-[2.85px] bg-violet/10 flex items-center justify-center shrink-0">
                  {guideIcons[guide.slug] || <CreditCard className="w-4 h-4 text-violet" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-carbon group-hover:text-violet transition">{guide.title}</p>
                  <p className="text-xs text-ash line-clamp-1">{guide.description}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-ash group-hover:text-violet transition shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[21px] font-black text-carbon tracking-[-0.007em] mb-6">Common banking questions</h2>
          <div className="space-y-2 max-w-2xl">
            {[
              { q: "How do I switch my payment method?", a: "Log into the SRD portal at srd.sassa.gov.za, go to Payment Methods, and select your preferred option. Changes take effect from the next payment cycle." },
              { q: "How long does bank verification take?", a: "Bank verification typically takes 2-3 business days. SASSA sends a small test deposit (less than R10) to your account. You enter the amount on the portal to confirm ownership." },
              { q: "Which stores can I collect Cash Send at?", a: "Pick n Pay, Shoprite, Checkers, Boxer, Usave, and Spar. Take your SMS voucher and ID to the till point. No bank account needed." },
              { q: "Can I use someone else's bank account?", a: "No. The bank account must be in your name as it appears on your ID. Using another person's account will cause payment delays. Use Cash Send if you do not have your own bank account." },
            ].map((faq) => (
              <details key={faq.q} className="group card overflow-hidden">
                <summary className="text-sm font-bold text-carbon p-4 cursor-pointer list-none flex items-center justify-between hover:bg-fog/80 transition">
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
              <p className="text-[19px] font-bold text-white">Need more help with banking?</p>
              <p className="text-sm text-muted">Visit the SRD Portal or check payment dates</p>
            </div>
            <div className="flex gap-2">
              <a href="https://srd.sassa.gov.za" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent text-accent-foreground rounded-[22px] text-xs font-bold hover:opacity-90 transition">
                SRD Portal <ArrowRight className="w-3 h-3" />
              </a>
              <Link href="/payment-dates" className="inline-flex items-center gap-1.5 px-5 py-2.5 border-2 border-white/30 text-white rounded-[22px] text-xs font-bold hover:bg-white/10 transition">
                Payment Dates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
