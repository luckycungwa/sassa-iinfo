import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { canonicalUrl, localeAlternates } from "@/lib/canonical";
import { getPageBySlug, loadAllContent } from "../../../../lib/content-loader";
import { grants } from "../../../../lib/data/grants";
import { grantToBasePage } from "../../../../lib/data/adapters/grants-adapter";
import { EditorialRenderer } from "../../../../components/ContentBlockRenderer";
import { faqSchema, breadcrumbSchema, articleSchema } from "../../../../lib/json-ld";
import type { FAQBlock } from "../../../../lib/schema/contentSchema";

export function generateStaticParams() {
  const allPages = loadAllContent();
  const grantPages = allPages.filter((p) => p.slug.startsWith("/grants/"));
  const jsonSlugs = grantPages.map((p) => ({
    slug: p.slug.replace("/grants/", "").split("/"),
  }));
  const existingSlugs = new Set(grantPages.map((p) => p.slug));
  const tsSlugs = grants
    .filter((g) => !existingSlugs.has("/grants/" + g.slug))
    .map((g) => ({ slug: [g.slug] }));
  return [...tsSlugs, ...jsonSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string[] }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const slugPath = "/grants/" + slug.join("/");
  const content = getPageBySlug(slugPath, locale);
  if (content) {
    return { title: content.seo.metaTitle, description: content.seo.metaDescription, alternates: { canonical: canonicalUrl(slugPath, locale), languages: localeAlternates(slugPath) } };
  }
  const grantSlug = slug[0];
  const grant = grants.find((g) => g.slug === grantSlug);
  if (!grant) return {};
  return {
    title: grant.title + " | SASSA Grant Guide " + grant.amount,
    description: grant.title + " -- " + grant.amount + " " + grant.frequency + ". Eligibility criteria, required documents, how to apply, and FAQs. " + grant.targetGroup,
alternates: { canonical: canonicalUrl(`/grants/${grantSlug}`, locale), languages: localeAlternates(`/grants/${grantSlug}`) },
  };
}

export default async function GrantDetailPage({ params }: { params: Promise<{ locale: string; slug: string[] }> }) {
  const { locale, slug } = await params;
  const slugPath = "/grants/" + slug.join("/");

  const content = getPageBySlug(slugPath, locale);
  if (content) {
    const faqBlock = content.contentBlocks.find((b): b is FAQBlock => b.type === "faq");
    const schema = articleSchema(content.seo?.metaTitle || content.title, content.seo?.metaDescription || content.description, content.lastUpdated, slugPath, content.lastUpdated);
    return (
      <>
        {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
        {faqBlock && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqBlock.faqs)) }} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Grant Library", url: "/grants" },
          { name: content.title, url: content.slug },
        ])) }} />
        <EditorialRenderer page={content} blocks={content.contentBlocks} />
      </>
    );
  }

  const grantSlug = slug[0];
  const grant = grants.find((g) => g.slug === grantSlug);
  if (!grant) notFound();

  const basePage = grantToBasePage(grant);
  const schema = null;

  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(grant.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Grant Library", url: "/grants" },
        { name: grant.title, url: "/grants/" + grant.slug },
      ])) }} />
      <EditorialRenderer page={basePage} blocks={basePage.contentBlocks} />
    </>
  );
}
