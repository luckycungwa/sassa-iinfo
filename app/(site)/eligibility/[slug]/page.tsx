import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPageBySlug, loadAllContent } from "../../../../lib/content-loader";
import { canonicalUrl } from "@/lib/canonical";
import { eligibilityGuides } from "../../../../lib/data/eligibility";
import { ContentBlockRenderer } from "../../../../components/ContentBlockRenderer";
import { faqSchema, breadcrumbSchema } from "../../../../lib/json-ld";
import type { FAQBlock } from "../../../../lib/schema/contentSchema";

export function generateStaticParams() {
  const allPages = loadAllContent();
  const jsonSlugs = allPages
    .filter((p) => p.slug.startsWith("/eligibility/"))
    .map((p) => ({ slug: p.slug.replace("/eligibility/", "") }));
  const existingSlugs = new Set(jsonSlugs.map((s) => s.slug));
  const tsSlugs = eligibilityGuides
    .filter((e) => !existingSlugs.has(e.slug))
    .map((e) => ({ slug: e.slug }));
  return [...tsSlugs, ...jsonSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const content = getPageBySlug(`/eligibility/${slug}`);
  if (content) {
    return { title: content.seo.metaTitle, description: content.seo.metaDescription, alternates: { canonical: canonicalUrl(`/eligibility/${slug}`) } };
  }

  const guide = eligibilityGuides.find((e) => e.slug === slug);
  if (!guide) return {};
  return { title: `${guide.title} | SASSA Eligibility Guide`, description: guide.shortDescription, alternates: { canonical: canonicalUrl(`/eligibility/${slug}`) } };
}

export default async function EligibilityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const content = getPageBySlug(`/eligibility/${slug}`);
  if (content) {
    const faqBlock = content.contentBlocks.find((b): b is FAQBlock => b.type === "faq");
    return (
      <>
        {faqBlock && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqBlock.faqs)) }} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Eligibility Centre", url: "/eligibility" },
          { name: content.title, url: content.slug },
        ])) }} />
        <ContentBlockRenderer page={content} blocks={content.contentBlocks} />
      </>
    );
  }

  const guide = eligibilityGuides.find((e) => e.slug === slug);
  if (!guide) notFound();

  const faqJsonLd = faqSchema(guide.faqs);
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Eligibility Centre", url: "/eligibility" },
    { name: guide.title, url: `/eligibility/${guide.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="space-y-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">{guide.title}</h1>
          <p className="text-sm text-muted mt-1">{guide.shortDescription}</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="text-sm text-muted leading-relaxed">{guide.introduction}</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-3">Checklist</h2>
          <ul className="space-y-2">
            {guide.checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-3">Recommended Grants</h2>
          <div className="space-y-2">
            {guide.recommendedGrants.map((rg, i) => (
              <Link
                key={i}
                href={`/grants/${rg.slug}`}
                className="flex items-center justify-between bg-accent-light border border-border rounded-lg p-3 hover:bg-accent-light/40 transition"
              >
                <span className="text-sm font-bold text-accent-dark">{rg.name}</span>
                <span className="text-xs font-mono font-bold text-accent-dark">{rg.amount}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-3">Steps to Qualify</h2>
          <ul className="space-y-2">
            {guide.stepsToQualify.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted">
                <span className="text-accent font-bold flex-shrink-0">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-accent-light border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-accent-dark mb-2">Restrictions</h2>
          <ul className="space-y-1">
            {guide.restrictions.map((restriction, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-accent-dark">
                <span className="text-muted font-bold flex-shrink-0">&bull;</span>
                {restriction}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-3">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {guide.faqs.map((faq, i) => (
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
      </div>
    </>
  );
}
