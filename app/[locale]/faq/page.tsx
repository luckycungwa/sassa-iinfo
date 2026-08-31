import type { Metadata } from "next";
import Link from "next/link";
import { faqCategories } from "../../../lib/data/faq";
import { faqSchema, breadcrumbSchema } from "../../../lib/json-ld";
import { canonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "SASSA FAQ — Answers to Common Grant Questions",
  description: "Get answers to the most frequently asked SASSA questions: application status, payment dates, eligibility, appeals, banking, and more.",
  alternates: { canonical: canonicalUrl("/faq") },
};

export default function FAQPage() {
  const allFaqs = faqCategories.flatMap((c) => c.questions);
  const faqJsonLd = faqSchema(allFaqs);
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">Frequently Asked Questions</h1>
          <p className="text-sm text-muted-foreground mt-1">Common questions about SASSA grants, payments, statuses, and appeals.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {faqCategories.map((c) => (
            <Link
              key={c.id}
              href={`#${c.id}`}
              className="text-xs font-bold px-4 py-2 rounded-full bg-surface border border-border text-ink hover:bg-accent-light hover:border-accent transition"
            >
              {c.title}
            </Link>
          ))}
        </div>

        {faqCategories.map((category) => (
          <div key={category.id} id={category.id}>
            <h2 className="text-lg font-extrabold text-ink mb-3">{category.title}</h2>
            <div className="space-y-3">
              {category.questions.map((faq, i) => (
                <details key={i} className="bg-surface border border-border rounded-xl group">
                  <summary className="text-sm font-bold text-ink p-4 cursor-pointer list-none flex items-center justify-between group-open:border-b group-open:border-border">
                    {faq.question}
                    <span className="text-muted group-open:rotate-180 transition-transform flex-shrink-0 ml-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </span>
                  </summary>
                  <p className="text-sm text-muted leading-relaxed p-4 pt-3">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
