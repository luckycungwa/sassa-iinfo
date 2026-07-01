import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, loadAllContent } from "../../../../lib/content-loader";
import { guides } from "../../../../lib/data/guides";
import { ContentBlockRenderer } from "../../../../components/ContentBlockRenderer";
import { breadcrumbSchema } from "../../../../lib/json-ld";

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
    return { title: content.seo.metaTitle, description: content.seo.metaDescription };
  }

  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return { title: `${guide.title} | SASSA Guide`, description: guide.description };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const content = getPageBySlug(`/guides/${slug}`);
  if (content) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Guides", url: "/guides" },
          { name: content.title, url: content.slug },
        ])) }} />
        <ContentBlockRenderer blocks={content.contentBlocks} />
      </>
    );
  }

  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Guides", url: "/guides" },
        { name: guide.title, url: `/guides/${guide.slug}` },
      ])) }} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">{guide.title}</h1>
          <p className="text-sm text-muted mt-1">{guide.description}</p>
        </div>
        <div className="space-y-6">
          {guide.steps.map((step, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-800 text-white text-xs font-black flex items-center justify-center flex-shrink-0">
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
