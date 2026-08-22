import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, loadAllContent } from "../../../../lib/content-loader";
import { canonicalUrl } from "@/lib/canonical";
import { bankingGuides } from "../../../../lib/data/banking";
import { ContentBlockRenderer } from "../../../../components/ContentBlockRenderer";
import { breadcrumbSchema, faqSchema } from "../../../../lib/json-ld";
import type { FAQBlock } from "../../../../lib/schema/contentSchema";

export function generateStaticParams() {
  const allPages = loadAllContent();
  const jsonSlugs = allPages
    .filter((p) => p.slug.startsWith("/banking/"))
    .map((p) => ({ slug: p.slug.replace("/banking/", "") }));
  const existingSlugs = new Set(jsonSlugs.map((s) => s.slug));
  const tsSlugs = bankingGuides
    .filter((g) => !existingSlugs.has(g.slug))
    .map((g) => ({ slug: g.slug }));
  return [...tsSlugs, ...jsonSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const content = getPageBySlug(`/banking/${slug}`);
  if (content) {
    return { title: content.seo.metaTitle, description: content.seo.metaDescription, alternates: { canonical: canonicalUrl(`/banking/${slug}`) } };
  }

  const guide = bankingGuides.find((g) => g.slug === slug);
  if (!guide) return {};
  return { title: `${guide.title} | SASSA Banking Guide`, description: guide.description, alternates: { canonical: canonicalUrl(`/banking/${slug}`) } };
}

export default async function BankingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const content = getPageBySlug(`/banking/${slug}`);
  if (content) {
    const faqBlock = content.contentBlocks.find((b): b is FAQBlock => b.type === "faq");
    return (
      <>
        {faqBlock && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqBlock.faqs)) }} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Banking", url: "/banking" },
          { name: content.title, url: content.slug },
        ])) }} />
        <ContentBlockRenderer page={content} blocks={content.contentBlocks} />
      </>
    );
  }

  const guide = bankingGuides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Banking", url: "/banking" },
    { name: guide.title, url: `/banking/${guide.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div className="space-y-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">{guide.title}</h1>
          <p className="text-sm text-muted mt-1">{guide.description}</p>
        </div>
        <div className="space-y-4">
          {guide.content.map((section, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-5">
              <h2 className="text-sm font-extrabold text-ink mb-2">{section.heading}</h2>
              <p className="text-sm text-muted leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
