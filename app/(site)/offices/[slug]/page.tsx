import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, loadAllContent } from "../../../../lib/content-loader";
import { pageMetadata } from "@/lib/metadata";
import { offices } from "../../../../lib/data/offices";
import { ContentBlockRenderer } from "../../../../components/ContentBlockRenderer";
import { breadcrumbSchema, articleSchema } from "../../../../lib/json-ld";

export function generateStaticParams() {
  const allPages = loadAllContent();
  const jsonSlugs = allPages
    .filter((p) => p.slug.startsWith("/offices/"))
    .map((p) => ({ slug: p.slug.replace("/offices/", "") }));
  const existingSlugs = new Set(jsonSlugs.map((s) => s.slug));
  const tsSlugs = offices
    .filter((o) => !existingSlugs.has(o.id))
    .map((o) => ({ slug: o.id }));
  return [...tsSlugs, ...jsonSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const content = getPageBySlug(`/offices/${slug}`);
  if (content) {
    return pageMetadata({ title: content.seo.metaTitle, description: content.seo.metaDescription, path: `/offices/${slug}`, absoluteTitle: true, noindex: content.classification === "office-location" });
  }

  const office = offices.find((o) => o.id === slug);
  if (!office) return {};
  return pageMetadata({
    title: `${office.name} — Address, Phone & Hours`,
    description: `${office.name} in ${office.city}. This directory entry has not been independently verified; confirm local office details with SASSA before travelling.`,
    path: `/offices/${slug}`,
    absoluteTitle: true,
    noindex: true,
  });
}

export default async function OfficeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const content = getPageBySlug(`/offices/${slug}`);
  if (content) {
    const schema = articleSchema(content.seo?.metaTitle || content.title, content.seo?.metaDescription || content.description, content.lastUpdated, `/offices/${slug}`, content.lastUpdated);
    return (
      <>
        {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Office Finder", url: "/offices" },
          { name: content.title, url: content.slug },
        ])) }} />
        <ContentBlockRenderer page={content} blocks={content.contentBlocks} />
      </>
    );
  }

  const office = offices.find((o) => o.id === slug);
  if (!office) notFound();

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Office Finder", url: "/offices" },
    { name: office.name, url: `/offices/${office.id}` },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="space-y-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">{office.name}</h1>
          <p className="text-sm text-muted-foreground mt-1 capitalize">{office.city}, {office.province}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5 space-y-3">
          <h2 className="text-sm font-extrabold text-ink">Confirm details before travelling</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This directory entry is not backed by a current, independently verified SASSA branch record.
            We are not publishing its stored street address, phone number, opening hours or service list as confirmed facts.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Call the official SASSA helpline on <strong>0800 60 10 11</strong> to confirm the correct local office,
            available service, address and opening hours before making the trip.
          </p>
          <p className="text-xs text-muted-foreground">
            For provincial regional contacts, see the <a href="/provinces" className="font-bold text-accent underline">SASSA province guides</a>.
          </p>
        </div>
      </div>
    </>
  );
}
