import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, loadAllContent } from "../../../../lib/content-loader";
import { canonicalUrl, localeAlternates } from "@/lib/canonical";
import { ContentBlockRenderer } from "../../../../components/ContentBlockRenderer";
import { articleSchema, breadcrumbSchema, faqSchema } from "../../../../lib/json-ld";
import type { FAQBlock } from "../../../../lib/schema/contentSchema";

export function generateStaticParams() {
  return loadAllContent()
    .filter((p) => p.slug.startsWith("/news/") && p.status === "published")
    .map((p) => ({ slug: p.slug.replace("/news/", "") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = getPageBySlug(`/news/${slug}`);
  if (!content || content.status !== "published") return {};
  return { title: content.seo.metaTitle, description: content.seo.metaDescription, alternates: { canonical: canonicalUrl(`/news/${slug}`), languages: localeAlternates(`/news/${slug}`) } };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getPageBySlug(`/news/${slug}`);
  if (!content || content.status !== "published") notFound();

  const jsonArticleSchema = articleSchema(content.seo.metaTitle, content.seo.metaDescription, content.lastUpdated, content.slug);
  const faqBlock = content.contentBlocks.find((b): b is FAQBlock => b.type === "faq");
  const faqJsonLd = faqBlock ? faqSchema(faqBlock.faqs) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "News", url: "/news" },
        { name: content.title, url: content.slug },
      ])) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <ContentBlockRenderer page={content} blocks={content.contentBlocks} />
    </>
  );
}
