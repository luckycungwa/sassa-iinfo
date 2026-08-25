import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, loadAllContent } from "../../../../lib/content-loader";
import { canonicalUrl } from "@/lib/canonical";
import { provinces } from "../../../../lib/data/provinces";
import { ContentBlockRenderer } from "../../../../components/ContentBlockRenderer";
import { breadcrumbSchema, faqSchema } from "../../../../lib/json-ld";
import type { FAQBlock } from "../../../../lib/schema/contentSchema";

export function generateStaticParams() {
  const allPages = loadAllContent();
  const jsonSlugs = allPages
    .filter((p) => p.slug.startsWith("/provinces/"))
    .map((p) => ({ slug: p.slug.replace("/provinces/", "") }));
  const existingSlugs = new Set(jsonSlugs.map((s) => s.slug));
  const tsSlugs = provinces
    .filter((p) => !existingSlugs.has(p.slug))
    .map((p) => ({ slug: p.slug }));
  return [...tsSlugs, ...jsonSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const content = getPageBySlug(`/provinces/${slug}`);
  if (content) {
    return { title: content.seo.metaTitle, description: content.seo.metaDescription, alternates: { canonical: canonicalUrl(`/provinces/${slug}`) } };
  }

  const province = provinces.find((p) => p.slug === slug);
  if (!province) return {};
  return {
    title: `SASSA ${province.name} | Regional Office & Grant Information`,
    description: `Complete SASSA guide for ${province.name}. Regional office at ${province.regionalOfficeAddress}. Phone: ${province.regionalOfficePhone}. Collection info and FAQs.`,
    alternates: { canonical: canonicalUrl(`/provinces/${slug}`) },
  };
}

export default async function ProvinceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const content = getPageBySlug(`/provinces/${slug}`);
  if (content) {
    const faqBlock = content.contentBlocks.find((b): b is FAQBlock => b.type === "faq");
    const faqJsonLd = faqBlock ? faqSchema(faqBlock.faqs) : null;
    return (
      <>
        {faqJsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Province Hubs", url: "/provinces" },
          { name: content.title, url: content.slug },
        ])) }} />
        <ContentBlockRenderer page={content} blocks={content.contentBlocks} />
      </>
    );
  }

  const province = provinces.find((p) => p.slug === slug);
  if (!province) notFound();

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Province Hubs", url: "/provinces" },
    { name: province.name, url: `/provinces/${province.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="space-y-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">{province.name}</h1>
          <p className="text-sm text-muted mt-1">Capital: {province.capital}</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
          <div>
            <p className="text-xs font-bold text-muted font-mono uppercase tracking-wider">Regional Office</p>
            <p className="text-sm text-ink mt-0.5">{province.regionalOfficeAddress}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-muted font-mono uppercase tracking-wider">Phone</p>
            <p className="text-sm text-ink mt-0.5">{province.regionalOfficePhone}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-muted font-mono uppercase tracking-wider">Payment Collection</p>
            <p className="text-sm text-muted mt-0.5 leading-relaxed">{province.collectionInfo}</p>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-3">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {province.faqs.map((faq, i) => (
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
