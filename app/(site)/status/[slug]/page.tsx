import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPageBySlug, getPagesByClassification } from "../../../../lib/content-loader";
import { statuses } from "../../../../lib/data/statuses";
import { ContentBlockRenderer } from "../../../../components/ContentBlockRenderer";
import { faqSchema, breadcrumbSchema } from "../../../../lib/json-ld";
import type { FAQBlock } from "../../../../lib/schema/contentSchema";

export function generateStaticParams() {
  const tsSlugs = statuses.map((s) => ({ slug: s.slug }));
  const jsonPages = getPagesByClassification("status-meaning");
  const jsonSlugs = jsonPages
    .map((p) => ({ slug: p.slug.replace("/status/", "") }))
    .filter((s) => !tsSlugs.find((t) => t.slug === s.slug));
  return [...tsSlugs, ...jsonSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const content = getPageBySlug(`/status/${slug}`);
  if (content) {
    return { title: content.seo.metaTitle, description: content.seo.metaDescription };
  }

  const status = statuses.find((s) => s.slug === slug);
  if (!status) return {};
  return {
    title: `SASSA "${status.statusName}" Status Meaning | What It Means & What To Do`,
    description: status.shortDescription,
  };
}

export default async function StatusDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const content = getPageBySlug(`/status/${slug}`);
  if (content) {
    const faqBlock = content.contentBlocks.find((b): b is FAQBlock => b.type === "faq");
    return (
      <>
        {faqBlock && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqBlock.faqs)) }} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Status Meanings", url: "/status" },
          { name: content.title, url: content.slug },
        ])) }} />
        <ContentBlockRenderer blocks={content.contentBlocks} />
      </>
    );
  }

  const status = statuses.find((s) => s.slug === slug);
  if (!status) notFound();

  const faqJsonLd = faqSchema(status.faqs);
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Status Meanings", url: "/status" },
    { name: status.statusName, url: `/status/${status.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">{status.statusName}</h1>
          <p className="text-base text-muted mt-1">{status.shortDescription}</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-2">What It Means</h2>
          <p className="text-sm text-muted leading-relaxed">{status.explanation}</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-2">Why It Happens</h2>
          <ul className="space-y-2">
            {status.whyItHappens.map((reason, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-2">How Long It Lasts</h2>
          <p className="text-sm text-muted leading-relaxed">{status.howLongItLasts}</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-2">What You Should Do</h2>
          <ul className="space-y-2">
            {status.whatYouShouldDo.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted">
                <span className="text-accent font-bold flex-shrink-0">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-3">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {status.faqs.map((faq, i) => (
              <details key={i} className="border border-border rounded-lg group">
                <summary className="text-sm font-bold text-ink p-3 cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-muted group-open:rotate-180 transition-transform flex-shrink-0 ml-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </summary>
                <p className="text-sm text-muted p-3 pt-0 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {status.relatedStatuses.length > 0 && (
          <div>
            <h2 className="text-sm font-extrabold text-ink mb-2">Related Statuses</h2>
            <div className="flex flex-wrap gap-2">
              {status.relatedStatuses.map((rs) => (
                <Link
                  key={rs.slug}
                  href={`/status/${rs.slug}`}
                  className="text-xs font-bold bg-canvas text-slate-700 hover:bg-accent-light hover:text-accent-dark px-3 py-1.5 rounded-full transition"
                >
                  {rs.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
