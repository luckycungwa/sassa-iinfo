import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Clock, Building, ArrowRight } from "lucide-react";
import { offices } from "../../../lib/data/offices";
import { canonicalUrl } from "@/lib/canonical";
import { webpageSchema, breadcrumbSchema, faqSchema } from "../../../lib/json-ld";

const officeFaqs = [
  { question: "Do I need an appointment to visit a SASSA office?", answer: "Most SASSA offices operate on a walk-in basis. Arrive early (before 08:00) to avoid long queues. Some high-volume branches may issue queue numbers that run out by midday." },
  { question: "What should I bring to a SASSA office?", answer: "Bring your original green ID book or smart ID card, certified copies of supporting documents, and any previous correspondence from SASSA. Keep your phone charged for SMS verification codes." },
  { question: "Can someone else visit a SASSA office on my behalf?", answer: "Only if they have a signed power of attorney or an official SASSA consent letter. You must be present for biometric verification (fingerprints) during new applications." },
];

export const metadata: Metadata = {
  title: "SASSA Office Finder | Local Branch Locations & Contact Details",
  description: "Find your nearest SASSA local office. Addresses, phone numbers, operating hours, services offered, and accessibility information for all 9 provincial branches.",
  alternates: { canonical: canonicalUrl("/offices") },
  robots: { index: false, follow: true },
  openGraph: {
    title: "SASSA Office Finder | Local Branch Locations & Contact Details",
    description: "Find your nearest SASSA local office with addresses, phone numbers, and operating hours.",
  },
};

const provinces = [...new Set(offices.map((o) => o.province))];

export default function OfficesHubPage() {
  const pageSchema = webpageSchema("SASSA Office Finder | Local Branch Locations & Contact Details", "Find your nearest SASSA local office across all 9 provinces.", "/offices");
  const breadcrumb = breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Office Finder", url: "/offices" }]);
  const faq = faqSchema(officeFaqs);
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />}
      <section className="bg-yellow py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">office finder</p>
          <h1 className="text-[40px] md:text-[57px] font-black text-carbon leading-[1.15] tracking-[-0.007em]">
            Find your nearest SASSA office
          </h1>
          <p className="text-[21px] text-body mt-4 max-w-xl leading-relaxed">
            Locate SASSA local offices across all 9 provinces with addresses, phone numbers, and operating hours.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="#all-offices"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet text-white rounded-[28.5px] text-sm font-bold hover:opacity-90 transition btn-violet"
            >
              Browse offices <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/provinces"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-carbon/20 text-carbon rounded-[28.5px] text-sm font-bold hover:bg-carbon/5 transition"
            >
              Province info
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Building, label: "Offices Listed", value: `${offices.length}` },
              { icon: MapPin, label: "Provinces Covered", value: `${provinces.length}` },
              { icon: Clock, label: "Open Hours", value: "07:30\u201316:00" },
              { icon: Phone, label: "Helpline", value: "0800 60 10 11" },
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

      <section id="all-offices" className="bg-fog py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] font-black text-carbon tracking-[-0.007em] mb-6">All SASSA offices</h2>
          <div className="space-y-2">
            {offices.map((o) => (
              <Link
                key={o.id}
                href={`/offices/${o.id}`}
                className="flex items-center justify-between p-4 bg-paper rounded-[2.85px] hover:bg-yellow/30 transition group"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-carbon group-hover:text-violet transition">{o.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-ash flex-wrap">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{o.city}, {o.province}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{o.phone}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{o.operatingHours}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    {o.servicesOffered.slice(0, 3).map((s) => (
                      <span key={s} className="text-xs text-ash/70">{s}</span>
                    ))}
                    {o.servicesOffered.length > 3 && (
                      <span className="text-xs text-ash/50">+{o.servicesOffered.length - 3} more</span>
                    )}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-ash group-hover:text-violet transition shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[21px] font-black text-carbon tracking-[-0.007em] mb-6">SASSA office visit tips</h2>
          <div className="space-y-2 max-w-2xl">
            {[
              { q: "Do I need an appointment?", a: "Most SASSA offices operate on a walk-in basis. Arrive early (before 08:00) to avoid long queues. Some high-volume branches may issue queue numbers that run out by midday." },
              { q: "What should I bring?", a: "Bring your original green ID book or smart ID card, certified copies of supporting documents, and any previous correspondence from SASSA. Keep your phone charged for SMS verification codes." },
              { q: "Can someone else visit on my behalf?", a: "Only if they have a signed power of attorney or an official SASSA consent letter. You must be present for biometric verification (fingerprints) during new applications." },
            ].map((faq) => (
              <details key={faq.q} className="group bg-fog rounded-[2.85px] overflow-hidden">
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
              <p className="text-[19px] font-bold text-white">Can&apos;t find your local office?</p>
              <p className="text-sm text-muted">Visit the province hubs for regional information</p>
            </div>
            <div className="flex gap-2">
              <Link href="/provinces" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent text-accent-foreground rounded-[22px] text-xs font-bold hover:opacity-90 transition">
                Province Hubs <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-1.5 px-5 py-2.5 border-2 border-white/30 text-white rounded-[22px] text-xs font-bold hover:bg-white/10 transition">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
