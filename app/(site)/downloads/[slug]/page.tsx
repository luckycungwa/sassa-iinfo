import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, loadAllContent } from "../../../../lib/content-loader";
import { downloadableForms } from "../../../../lib/data/downloads";
import { ContentBlockRenderer } from "../../../../components/ContentBlockRenderer";
import { breadcrumbSchema } from "../../../../lib/json-ld";
import { FileText } from "lucide-react";

export function generateStaticParams() {
  const allPages = loadAllContent();
  const jsonSlugs = allPages
    .filter((p) => p.slug.startsWith("/downloads/"))
    .map((p) => ({ slug: p.slug.replace("/downloads/", "") }));
  const existingSlugs = new Set(jsonSlugs.map((s) => s.slug));
  const tsSlugs = downloadableForms
    .filter((d) => !existingSlugs.has(d.slug))
    .map((d) => ({ slug: d.slug }));
  return [...tsSlugs, ...jsonSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const content = getPageBySlug(`/downloads/${slug}`);
  if (content) {
    return { title: content.seo.metaTitle, description: content.seo.metaDescription };
  }

  const form = downloadableForms.find((d) => d.slug === slug);
  if (!form) return {};
  return { title: `${form.title} | SASSA Form Download & Guide`, description: form.shortDescription };
}

export default async function DownloadDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const content = getPageBySlug(`/downloads/${slug}`);
  if (content) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Download Centre", url: "/downloads" },
          { name: content.title, url: content.slug },
        ])) }} />
        <ContentBlockRenderer blocks={content.contentBlocks} />
      </>
    );
  }

  const form = downloadableForms.find((d) => d.slug === slug);
  if (!form) notFound();

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Download Centre", url: "/downloads" },
    { name: form.title, url: `/downloads/${form.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent-light text-accent-dark border border-border flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-ink tracking-tight">{form.title}</h1>
            <p className="text-sm text-muted mt-1">{form.shortDescription}</p>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-2">Purpose</h2>
          <p className="text-sm text-muted leading-relaxed">{form.purpose}</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-3">How to Fill This Form</h2>
          <ul className="space-y-2">
            {form.howToFill.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted">
                <span className="text-accent font-bold flex-shrink-0">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-3">Document Checklist</h2>
          <ul className="space-y-2">
            {form.documentChecklist.map((doc, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-status-pending mt-1.5 flex-shrink-0" />
                {doc}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div>
            <p className="text-xs font-bold text-muted font-mono uppercase tracking-wider">File Size</p>
            <p className="text-sm font-bold text-ink mt-0.5">{form.approxSize}</p>
          </div>
          <div className="text-xs text-muted font-mono">{form.pdfPlaceholderContent}</div>
        </div>
      </div>
    </>
  );
}
