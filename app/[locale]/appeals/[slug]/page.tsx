import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, loadAllContent } from "../../../../lib/content-loader";
import { canonicalUrl, localeAlternates } from "@/lib/canonical";
import { appeals } from "../../../../lib/data/appeals";
import { ContentBlockRenderer } from "../../../../components/ContentBlockRenderer";
import { faqSchema, breadcrumbSchema, articleSchema } from "../../../../lib/json-ld";
import type { FAQBlock } from "../../../../lib/schema/contentSchema";

export function generateStaticParams() {
  const allPages = loadAllContent();
  const jsonSlugs = allPages
    .filter((p) => p.slug.startsWith("/appeals/"))
    .map((p) => ({ slug: p.slug.replace("/appeals/", "") }));
  const existingSlugs = new Set(jsonSlugs.map((s) => s.slug));
  const tsSlugs = appeals
    .filter((a) => !existingSlugs.has(a.slug))
    .map((a) => ({ slug: a.slug }));
  return [...tsSlugs, ...jsonSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;

  const content = getPageBySlug(`/appeals/${slug}`, locale);
  if (content) {
    return { title: content.seo.metaTitle, description: content.seo.metaDescription, alternates: { canonical: canonicalUrl(`/appeals/${slug}`, locale), languages: localeAlternates(`/appeals/${slug}`) } };
  }

  const appeal = appeals.find((a) => a.slug === slug);
  if (!appeal) return {};
  return { title: `${appeal.title} | SASSA Appeals Guide`, description: appeal.shortDescription, alternates: { canonical: canonicalUrl(`/appeals/${slug}`, locale), languages: localeAlternates(`/appeals/${slug}`) } };
}

export default async function AppealDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;

  const content = getPageBySlug(`/appeals/${slug}`, locale);
  if (content) {
    const faqBlock = content.contentBlocks.find((b): b is FAQBlock => b.type === "faq");
    const schema = articleSchema(content.seo?.metaTitle || content.title, content.seo?.metaDescription || content.description, content.lastUpdated, `/appeals/${slug}`, content.lastUpdated);
    return (
      <>
        {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
        {faqBlock && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqBlock.faqs)) }} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Appeals Centre", url: "/appeals" },
          { name: content.title, url: content.slug },
        ])) }} />
        <ContentBlockRenderer page={content} blocks={content.contentBlocks} />
      </>
    );
  }

  const appeal = appeals.find((a) => a.slug === slug);
  if (!appeal) notFound();

  const faqJsonLd = faqSchema(appeal.faqs);
  const schema = null;

  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Appeals Centre", url: "/appeals" },
        { name: appeal.title, url: `/appeals/${appeal.slug}` },
      ])) }} />
      <div className="space-y-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">{appeal.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{appeal.shortDescription}</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="text-sm text-muted-foreground leading-relaxed">{appeal.introduction}</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-3">Step-by-Step Process</h2>
          <ul className="space-y-2">
            {appeal.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-accent font-bold flex-shrink-0">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-accent-light border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-accent-dark mb-2">Timeline</h2>
          <p className="text-sm text-accent-dark leading-relaxed">{appeal.timeline}</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-3">Required Documents</h2>
          <ul className="space-y-2">
            {appeal.documents.map((doc, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-status-pending mt-1.5 flex-shrink-0" />
                {doc}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-3">Common Reasons for Appeal</h2>
          <ul className="space-y-2">
            {appeal.commonReasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-3">Possible Outcomes</h2>
          <ul className="space-y-2">
            {appeal.outcomes.map((outcome, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${i === 0 ? "bg-status-approved" : "bg-status-declined"}`} />
                {outcome}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-3">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {appeal.faqs.map((faq, i) => (
              <details key={i} className="border border-border rounded-lg group">
                <summary className="text-sm font-bold text-ink p-3 cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0 ml-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </summary>
                <p className="text-sm text-muted-foreground p-3 pt-0 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
