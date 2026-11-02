import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, loadAllContent } from "../../../../lib/content-loader";
import { canonicalUrl, localeAlternates } from "@/lib/canonical";
import { ContentBlockRenderer } from "../../../../components/ContentBlockRenderer";
import ArticleProvenance from "../../../../components/ArticleProvenance";
import { newsArticleSchema, breadcrumbSchema, faqSchema } from "../../../../lib/json-ld";
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
  const publishedAt = content.publishedAt ?? content.lastUpdated;
  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
    alternates: { canonical: canonicalUrl(`/news/${slug}`), languages: localeAlternates(`/news/${slug}`) },
    openGraph: {
      type: "article",
      title: content.seo.metaTitle,
      description: content.seo.metaDescription,
      url: canonicalUrl(`/news/${slug}`),
      publishedTime: publishedAt,
      modifiedTime: content.lastUpdated,
      authors: [content.author.name],
    },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getPageBySlug(`/news/${slug}`);
  if (!content || content.status !== "published") notFound();

  const articleJsonLd = newsArticleSchema({
    title: content.title,
    description: content.description,
    slug: content.slug,
    publishedAt: content.publishedAt,
    lastUpdated: content.lastUpdated,
    topics: content.topics,
    author: content.author,
  });
  const faqBlock = content.contentBlocks.find((b): b is FAQBlock => b.type === "faq");
  const faqJsonLd = faqBlock ? faqSchema(faqBlock.faqs) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Updates", url: "/news" },
        { name: content.title, url: content.slug },
      ])) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <ContentBlockRenderer
        page={content}
        blocks={content.contentBlocks}
        notice={
          <ArticleProvenance
            author={content.author}
            publishedAt={content.publishedAt}
            lastUpdated={content.lastUpdated}
            topics={content.topics}
          />
        }
      />
    </>
  );
}
