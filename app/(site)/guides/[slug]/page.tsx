import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, loadAllContent } from "../../../../lib/content-loader";
import { canonicalUrl } from "@/lib/canonical";
import { guides } from "../../../../lib/data/guides";
import { ContentBlockRenderer } from "../../../../components/ContentBlockRenderer";
import { breadcrumbSchema, howToSchema, faqSchema } from "../../../../lib/json-ld";
import type { FAQBlock } from "../../../../lib/schema/contentSchema";

export function generateStaticParams() {
  const allPages = loadAllContent();
  const jsonSlugs = allPages
    .filter((p) => p.slug.startsWith("/guides/"))
    .map((p) => ({ slug: p.slug.replace("/guides/", "") }));
  const existingSlugs = new Set(jsonSlugs.map((s) => s.slug));
  const tsSlugs = guides
    .filter((g) => !existingSlugs.has(g.slug))
    .map((g) => ({ slug: g.slug }));
  return [...tsSlugs, ...jsonSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const content = getPageBySlug(`/guides/${slug}`);
  if (content) {
    return { title: content.seo.metaTitle, description: content.seo.metaDescription, alternates: { canonical: canonicalUrl(`/guides/${slug}`) } };
  }

  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return { title: `${guide.title} | SASSA Step-by-Step Guide`, description: guide.description, alternates: { canonical: canonicalUrl(`/guides/${slug}`) } };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const content = getPageBySlug(`/guides/${slug}`);
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
          { name: "Guides", url: "/guides" },
          { name: content.title, url: content.slug },
        ])) }} />
        <ContentBlockRenderer page={content} blocks={content.contentBlocks} />
      </>
    );
  }

  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const howTo = howToSchema(guide.steps);
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Guides", url: "/guides" },
    { name: guide.title, url: `/guides/${guide.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div className="space-y-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">{guide.title}</h1>
          <p className="text-sm text-muted mt-1">{guide.description}</p>
        </div>
        <div className="space-y-4">          {guide.steps.map((step, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-7 h-7 rounded-lg bg-accent-dark text-black text-xs font-black flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <h2 className="text-sm font-extrabold text-ink">{step.title}</h2>
              </div>
              <p className="text-sm text-muted leading-relaxed ml-10">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
