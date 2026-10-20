import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building, MapPin, Phone, Users } from "lucide-react";
import { provinces } from "../../../lib/data/provinces";
import { canonicalUrl } from "@/lib/canonical";
import { webpageSchema, breadcrumbSchema, faqSchema } from "@/lib/json-ld";

const provinceFaqs = [
  { question: "Are SASSA payment dates the same in every province?", answer: "Yes. All SASSA grant payments are synchronised nationally. Beneficiaries in every province receive their payments on the same scheduled dates." },
  { question: "Can I collect my grant in a different province from where I applied?", answer: "Yes. You can collect your cash grant at any participating retailer (Pick n Pay, Shoprite, Boxer, Checkers, Usave) anywhere in South Africa, regardless of your home province." },
  { question: "Which province has the most SASSA beneficiaries?", answer: "Gauteng has the highest number of beneficiaries due to its large population, followed by KwaZulu-Natal and the Eastern Cape." },
];

export const metadata: Metadata = {
  title: "SASSA Offices by Province 2026 — Find & Collect Near You",
  description: "Find SASSA provincial offices, regional addresses, phone numbers and collection points for all 9 provinces in 2026.",
  alternates: { canonical: canonicalUrl("/provinces") },
  openGraph: {
    title: "SASSA Offices by Province 2026 — Find & Collect Near You",
    description: "Find SASSA provincial offices, regional addresses, phone numbers and collection points for all 9 provinces in 2026.",
  },
};

export default function ProvincesHubPage() {
  const pageSchema = webpageSchema("SASSA Offices by Province 2026 — Find & Collect Near You", "Find SASSA provincial offices, regional addresses, phone numbers and collection points for all 9 provinces in 2026.", "/provinces");
  const breadcrumb = breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Province Hubs", url: "/provinces" }]);
  const faq = faqSchema(provinceFaqs);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />}
      <section className="bg-yellow py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">province hubs</p>
          <h1 className="text-[40px] md:text-[57px] font-black text-carbon leading-[1.15] tracking-[-0.007em]">
            SASSA information by province
          </h1>
          <p className="text-[21px] text-body mt-4 max-w-xl leading-relaxed">
            Regional office addresses, payment collection points, and frequently asked questions for all 9 provinces.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="#all-provinces"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet text-white rounded-[28.5px] text-sm font-bold hover:opacity-90 transition btn-violet"
            >
              Browse provinces <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/offices"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-carbon/20 text-carbon rounded-[28.5px] text-sm font-bold hover:bg-carbon/5 transition"
            >
              Office Finder
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">SASSA province quick stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Building, label: "Total Provinces", value: "9" },
              { icon: MapPin, label: "Regional Offices", value: "9" },
              { icon: Phone, label: "Helpline", value: "0800 60 10 11" },
              { icon: Users, label: "Beneficiaries", value: "18m+" },
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

      <section id="all-provinces" className="bg-fog py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] font-black text-carbon tracking-[-0.007em] mb-6">All provinces</h2>
          <div className="space-y-2">
            {provinces.map((p) => (
              <Link
                key={p.id}
                href={`/provinces/${p.slug}`}
                className="flex items-center gap-4 p-4 card hover:bg-yellow/30 transition group"
              >
                <Building className="w-5 h-5 text-violet shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-carbon group-hover:text-violet transition">{p.name}</p>
                  <div className="flex items-center gap-3 text-xs text-ash mt-0.5">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />Capital: {p.capital}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{p.regionalOfficePhone}</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-ash group-hover:text-violet transition shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[21px] font-black text-carbon tracking-[-0.007em] mb-6">Province information</h2>
          <div className="space-y-2 max-w-2xl">
            {provinceFaqs.map((faq) => (
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
              <p className="text-[19px] font-bold text-white">Looking for a specific office address?</p>
              <p className="text-sm text-white/70">Use our office finder to locate your nearest branch</p>
            </div>
            <div className="flex gap-2">
              <Link href="/offices" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent text-accent-foreground rounded-[22px] text-xs font-bold hover:opacity-90 transition">
                Office Finder <ArrowRight className="w-3 h-3" />
              </Link>
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
