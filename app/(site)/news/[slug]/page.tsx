import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, loadAllContent } from "../../../../lib/content-loader";
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
    return { title: content.seo.metaTitle, description: content.seo.metaDescription };
  }

  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) return {};
  return { title: `${article.title} | SASSA News`, description: article.summary };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const content = getPageBySlug(`/news/${slug}`);
  if (content) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "News", url: "/news" },
          { name: content.title, url: content.slug },
        ])) }} />
        <ContentBlockRenderer blocks={content.contentBlocks} />
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
      <div className="space-y-6 max-w-3xl">
        <div>
          <p className="text-xs font-mono text-muted mb-1">{article.date}</p>
          <h1 className="text-2xl font-black text-ink tracking-tight">{article.title}</h1>
          <p className="text-sm text-muted mt-2">{article.summary}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="prose prose-sm prose-slate max-w-none">
            {article.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-sm text-slate-600 leading-relaxed mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-mono font-bold bg-canvas text-muted px-2.5 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
