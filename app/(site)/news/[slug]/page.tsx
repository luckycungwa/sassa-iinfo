import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { getPageBySlug, loadAllContent } from "../../../../lib/content-loader";
import { canonicalUrl } from "@/lib/canonical";
import { newsArticles } from "../../../../lib/data/news";
import { ContentBlockRenderer } from "../../../../components/ContentBlockRenderer";
import { articleSchema, breadcrumbSchema } from "../../../../lib/json-ld";

export function generateStaticParams() {
  const allPages = loadAllContent();
  const jsonSlugs = allPages
    .filter((p) => p.slug.startsWith("/news/"))
    .map((p) => ({ slug: p.slug.replace("/news/", "") }));
  const existingSlugs = new Set(jsonSlugs.map((s) => s.slug));
  const tsSlugs = newsArticles
    .filter((a) => !existingSlugs.has(a.slug))
    .map((a) => ({ slug: a.slug }));
  return [...tsSlugs, ...jsonSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const content = getPageBySlug(`/news/${slug}`);
  if (content) {
    return { title: content.seo.metaTitle, description: content.seo.metaDescription, alternates: { canonical: canonicalUrl(`/news/${slug}`) } };
  }

  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) return {};
  return { title: `${article.title} | SASSA News`, description: article.summary, alternates: { canonical: canonicalUrl(`/news/${slug}`) } };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const content = getPageBySlug(`/news/${slug}`);
  if (content) {
    const jsonArticleSchema = articleSchema(content.seo.metaTitle, content.seo.metaDescription, content.lastUpdated);
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonArticleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "News", url: "/news" },
          { name: content.title, url: content.slug },
        ])) }} />
        <ContentBlockRenderer page={content} blocks={content.contentBlocks} />
      </>
    );
  }

  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const articleJsonLd = articleSchema(article.title, article.summary, article.date);
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "News", url: "/news" },
    { name: article.title, url: `/news/${article.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="space-y-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {article.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-outline" />
            <span>by Lucky Cungwa</span>
          </div>
          <h1 className="text-2xl font-black text-ink tracking-tight">{article.title}</h1>
          <p className="text-sm text-muted mt-3 leading-relaxed">{article.summary}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="max-w-none space-y-4">
            {article.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-sm text-muted leading-relaxed">{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono font-bold bg-surface text-muted px-2.5 py-1 rounded-full border border-border">
              #{tag}
            </span>
          ))}
        </div>
        <div className="bg-gold/5 border border-gold/10 rounded-xl p-4 text-xs text-muted leading-relaxed">
          Information in this article was verified against official SASSA communications at time of publication.
          Grant policies may change. Check the <Link href="/news" className="text-gold hover:underline font-bold">news section</Link> for updates.
        </div>
      </div>
    </>
  );
}
