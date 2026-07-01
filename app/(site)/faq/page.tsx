import type { Metadata } from "next";
import { faqCategories } from "../../../lib/data/faq";
import { faqSchema, breadcrumbSchema } from "../../../lib/json-ld";

export const metadata: Metadata = {
  title: "SASSA FAQ | Frequently Asked Questions About Social Grants",
  description: "Answers to the most common SASSA questions: grant applications, payment dates, status meanings, appeals, eligibility, and contact information.",
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
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">Frequently Asked Questions</h1>
          <p className="text-sm text-muted mt-1">Common questions about SASSA grants, payments, statuses, and appeals.</p>
        </div>
        {faqCategories.map((category) => (
          <div key={category.id}>
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
                  <p className="text-sm text-slate-600 leading-relaxed p-4 pt-3">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
