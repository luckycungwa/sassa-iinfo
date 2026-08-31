import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, loadAllContent } from "../../../../lib/content-loader";
import { canonicalUrl, localeAlternates } from "@/lib/canonical";
import { offices } from "../../../../lib/data/offices";
import { ContentBlockRenderer } from "../../../../components/ContentBlockRenderer";
import { breadcrumbSchema, articleSchema } from "../../../../lib/json-ld";
import { MapPin, Phone, Clock, Accessibility } from "lucide-react";

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

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;

  const content = getPageBySlug(`/offices/${slug}`, locale);
  if (content) {
    return { title: content.seo.metaTitle, description: content.seo.metaDescription, alternates: { canonical: canonicalUrl(`/offices/${slug}`, locale), languages: localeAlternates(`/offices/${slug}`) } };
  }

  const office = offices.find((o) => o.id === slug);
  if (!office) return {};
  return {
    title: `${office.name} | SASSA Office in ${office.city}, ${office.province}`,
    description: `${office.name} in ${office.city}, ${office.province}. Address: ${office.address}. Phone: ${office.phone}. Hours: ${office.operatingHours}. Services: ${office.servicesOffered.join(", ")}.`,
    alternates: { canonical: canonicalUrl(`/offices/${slug}`, locale), languages: localeAlternates(`/offices/${slug}`) },
    robots: { index: false, follow: true },
  };
}

export default async function OfficeDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;

  const content = getPageBySlug(`/offices/${slug}`, locale);
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
  const schema = null;

  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="space-y-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">{office.name}</h1>
          <p className="text-sm text-muted-foreground mt-1 capitalize">{office.city}, {office.province}</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-muted-foreground font-mono uppercase tracking-wider">Address</p>
              <p className="text-sm text-ink mt-0.5">{office.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-muted-foreground font-mono uppercase tracking-wider">Phone</p>
              <p className="text-sm text-ink mt-0.5">{office.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-muted-foreground font-mono uppercase tracking-wider">Operating Hours</p>
              <p className="text-sm text-ink mt-0.5">{office.operatingHours}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Accessibility className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-muted-foreground font-mono uppercase tracking-wider">Accessibility</p>
              <p className="text-sm text-ink mt-0.5">{office.accessibilityNotes}</p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-3">Services Offered</h2>
          <ul className="space-y-2">
            {office.servicesOffered.map((service, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-extrabold text-ink mb-2">Directions</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{office.directions}</p>
          <p className="text-sm text-muted-foreground mt-2">
            <span className="font-bold">Nearby: </span>{office.nearbyLandmarks}
          </p>
        </div>

        {office.localTip && (
          <div className="bg-gold/5 border border-gold/20 rounded-xl p-5">
            <h2 className="text-xs font-extrabold text-accent-dark font-mono uppercase tracking-wider mb-2">Local Tip</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{office.localTip}</p>
          </div>
        )}
      </div>
    </>
  );
}
