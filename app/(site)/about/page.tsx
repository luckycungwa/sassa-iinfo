import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { canonicalUrl } from "@/lib/canonical";
import { aboutPageSchema, webpageSchema, breadcrumbSchema } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "About \u2014 SASSA Grant Guide | Independent Resource by Lucky Cungwa",
  description: "Founded by Lucky Cungwa (44tagstudios). An independent, educational resource hub for SASSA social grant information in South Africa. Not affiliated with SASSA.",
  alternates: { canonical: canonicalUrl("/about") },
  openGraph: {
    title: "About \u2014 SASSA Grant Guide | Independent Resource by Lucky Cungwa",
    description: "Independent SASSA social grant information resource built by Lucky Cungwa.",
  },
};

const standards = [
  { title: "Accuracy", desc: "All information is verified against official sources and clearly dated." },
  { title: "Clarity", desc: "Complex government processes are explained in plain, accessible language." },
  { title: "Completeness", desc: "Every page answers who, what, why, how, and what to do next." },
  { title: "Independence", desc: "We are not affiliated with SASSA or any government entity." },
  { title: "Transparency", desc: "We clearly mark what is confirmed, what may change, and when information was last reviewed." },
  { title: "User Safety", desc: "We never ask for ID numbers, banking details, or personal information." },
];

export default function AboutPage() {
  const pageSchema = webpageSchema("About \u2014 SASSA Grant Guide | Independent Resource by Lucky Cungwa", "Independent SASSA grant information resource built by Lucky Cungwa.", "/about");
  const aboutSchema = aboutPageSchema();
  const breadcrumb = breadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about" }]);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <section className="bg-yellow py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">about</p>
          <h1 className="text-[40px] md:text-[57px] font-black text-carbon leading-[1.15] tracking-[-0.007em]">
            About this guide
          </h1>
          <p className="text-[21px] text-body mt-4 max-w-xl leading-relaxed">
            Independent SASSA grant information resource built by Lucky Cungwa.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-[29px] font-black text-carbon leading-[1.1] tracking-[-0.007em]">Why I built this</h2>
              <div className="space-y-3 text-base text-body leading-relaxed mt-6">
                <p>
                  I created this resource to help South Africans navigate the SASSA social grant system with clear,
                  accurate, and genuinely useful information. After seeing how confusing and fragmented official
                  information can be &mdash; and how many beneficiaries struggle with application statuses, declines,
                  and the appeals process &mdash; I built this platform to fill that gap.
                </p>
                <p>
                  Every page is researched against official SASSA publications, Government Gazettes, and the
                  Social Assistance Act. All factual claims are sourced and dated.
                </p>
                <p className="text-sm bg-fog rounded-[2.85px] p-4">
                  <strong>Disclaimer:</strong> This is an independent, educational resource. We are not affiliated with
                  SASSA, the South African Social Security Agency, or any government department.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-[29px] font-black text-carbon leading-[1.1] tracking-[-0.007em]">Our standards</h2>
              <div className="space-y-3 mt-6">
                {standards.map((s) => (
                  <div key={s.title} className="bg-fog rounded-[2.85px] p-4">
                    <p className="text-base font-black text-carbon">{s.title}</p>
                    <p className="text-sm text-body mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-fog py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-[21px] font-black text-carbon">Meet the author</p>
              <p className="text-sm text-ash mt-1 max-w-xl">
                Every page is researched, written, and reviewed by Lucky Cungwa, founder of 44tagstudios.
              </p>
            </div>
            <Link href="/about/lucky-cungwa" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-violet text-white rounded-[22px] text-xs font-bold hover:opacity-90 transition btn-violet">
              About Lucky Cungwa <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[19px] font-bold text-white">Found an error or outdated info?</p>
              <p className="text-sm text-muted">Help us keep this resource accurate</p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent text-accent-foreground rounded-[22px] text-xs font-bold hover:opacity-90 transition">
              Contact Us <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
