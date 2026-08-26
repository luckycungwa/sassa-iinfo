import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { canonicalUrl } from "@/lib/canonical";
import { personSchema, webpageSchema, breadcrumbSchema } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Lucky Cungwa â€” Editor, SASSA Grant Guide",
  description: "Meet Lucky Cungwa, editor and founder of the SASSA Grant Guide. Read about the person behind this independent SASSA resource and how content is researched and verified.",
  alternates: { canonical: canonicalUrl("/about/lucky-cungwa") },
  openGraph: {
    title: "Lucky Cungwa â€” Editor, SASSA Grant Guide",
    description: "The person behind the independent SASSA Grant Guide and how content is verified.",
  },
};

export default function AuthorPage() {
  const pageSchema = webpageSchema("Lucky Cungwa â€” Editor, SASSA Grant Guide", "Meet the editor behind the SASSA Grant Guide.", "/about/lucky-cungwa");
  const authorSchema = personSchema();
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Lucky Cungwa", url: "/about/lucky-cungwa" },
  ]);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <section className="bg-yellow py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">author</p>
          <h1 className="text-[40px] md:text-[57px] font-black text-carbon leading-[1.15] tracking-[-0.007em]">
            Lucky Cungwa
          </h1>
          <p className="text-[21px] text-body mt-4 max-w-xl leading-relaxed">
            Editor and founder of the SASSA Grant Guide. Every page on this site is researched, written, and reviewed by me.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-[29px] font-black text-carbon leading-[1.1] tracking-[-0.007em]">Who I am</h2>
              <div className="space-y-3 text-base text-body leading-relaxed mt-6">
                <p>
                  I&apos;m a South African developer and the founder of 44tagstudios. I built the SASSA Grant Guide
                  because so many beneficiaries were struggling to find clear, trustworthy answers about their grants.
                </p>
                <p>
                  I&apos;m not affiliated with SASSA, the Department of Social Development, or any government body.
                  That independence is deliberate â€” it lets me tell you honestly what is confirmed, what may change,
                  and when information was last checked.
                </p>
                <p className="text-sm card p-4">
                  <strong>How content is verified:</strong> every article is checked against official SASSA publications,
                  Government Gazettes, and the Social Assistance Act, and each page carries a last-review date so you
                  always know how current the information is.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-[29px] font-black text-carbon leading-[1.1] tracking-[-0.007em]">My standards</h2>
              <div className="space-y-3 mt-6">
                {[
                  { title: "Verified, not repeated", desc: "Facts are cross-checked against official sources rather than copied from other websites." },
                  { title: "Dated and traceable", desc: "Every page shows when it was last reviewed so you can judge how current it is." },
                  { title: "Plain language", desc: "Government jargon is translated into clear steps anyone can follow." },
                  { title: "No personal data", desc: "This site never asks for your ID number, banking details, or passwords." },
                ].map((s) => (
                  <div key={s.title} className="card p-4">
                    <p className="text-base font-black text-carbon">{s.title}</p>
                    <p className="text-sm text-body mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="text-[24px] font-black text-carbon tracking-[-0.007em] mb-6">Editorial policy</h2>
            <p className="text-base text-body leading-relaxed max-w-2xl">
              All content is written or reviewed by me personally. We do not use automated content generation for
              articles or guides, and any factual claim can be traced to a public official source. If you spot an
              error, please report it so I can correct it.
            </p>
            <Link href="/editorial-policy" className="inline-flex items-center gap-1.5 text-sm text-violet font-bold mt-4 hover:underline">
              Read the full editorial policy <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[19px] font-bold text-white">Spotted an error or outdated info?</p>
              <p className="text-sm text-muted">Help keep this resource accurate</p>
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
