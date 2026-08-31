import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { canonicalUrl, localeAlternates } from "@/lib/canonical";
import { getPageBySlug, getPagesByClassification } from "../../../../lib/content-loader";
import { statuses } from "../../../../lib/data/statuses";
import { EditorialRenderer } from "../../../../components/ContentBlockRenderer";
import { faqSchema, breadcrumbSchema, articleSchema } from "../../../../lib/json-ld";
import type { FAQBlock } from "../../../../lib/schema/contentSchema";

export function generateStaticParams() {
  const tsSlugs = statuses.map((s) => ({ slug: s.slug }));
  const jsonPages = getPagesByClassification("status-meaning");
  const jsonSlugs = jsonPages
    .map((p) => ({ slug: p.slug.replace("/status/", "") }))
    .filter((s) => !tsSlugs.find((t) => t.slug === s.slug));
  return [...tsSlugs, ...jsonSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const content = getPageBySlug("/status/" + slug, locale);
  if (content) {
    return { title: content.seo.metaTitle, description: content.seo.metaDescription, alternates: { canonical: canonicalUrl(`/status/${slug}`, locale), languages: localeAlternates(`/status/${slug}`) } };
  }
  const status = statuses.find((s) => s.slug === slug);
  if (!status) return {};
  return {
    title: "SASSA \"" + status.statusName + "\" Status Meaning | What It Means & What To Do",
    description: status.shortDescription,
    alternates: { canonical: canonicalUrl(`/status/${slug}`, locale), languages: localeAlternates(`/status/${slug}`) },
  };
}

export default async function StatusDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;

  const content = getPageBySlug("/status/" + slug, locale);
  if (content) {
    const faqBlock = content.contentBlocks.find((b): b is FAQBlock => b.type === "faq");
    const schema = articleSchema(content.seo?.metaTitle || content.title, content.seo?.metaDescription || content.description, content.lastUpdated, `/status/${slug}`, content.lastUpdated);
    return (
      <>
        {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
        {faqBlock && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqBlock.faqs)) }} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Status Meanings", url: "/status" },
          { name: content.title, url: content.slug },
        ])) }} />
        <EditorialRenderer page={content} blocks={content.contentBlocks} />
      </>
    );
  }

  const status = statuses.find((s) => s.slug === slug);
  if (!status) notFound();

  const basePage = {
    id: "status-" + status.id,
    slug: "/status/" + status.slug,
    classification: "status-meaning" as const,
    title: status.statusName,
    description: status.shortDescription,
    lastUpdated: "2026-07-01",
    readingTime: "3 min read",
    version: "1.0.0",
    status: "published" as const,
    author: { name: "Status Guide Team", role: "Content Editor", credentials: "SASSA information specialist", verified: true },
    seo: {
      metaTitle: "SASSA \"" + status.statusName + "\" Status Meaning",
      metaDescription: status.shortDescription,
      keywords: [status.statusName, "SASSA status", "grant status"],
    },
    contentBlocks: [
      {
        id: "hero-" + status.id,
        type: "hero" as const,
        title: status.statusName + " \u2014 What It Means",
        description: status.shortDescription,
        readingTime: "3 min read",
        lastUpdated: "2026-07-01",
      },
      {
        id: "explanation-h",
        type: "heading" as const,
        level: 2 as const,
        text: "What This Status Means",
      },
      {
        id: "explanation",
        type: "paragraph" as const,
        text: status.explanation,
      },
      {
        id: "why-h",
        type: "heading" as const,
        level: 2 as const,
        text: "Why It Happens",
      },
      {
        id: "why-list",
        type: "list" as const,
        ordered: false,
        items: status.whyItHappens,
      },
      {
        id: "duration-h",
        type: "heading" as const,
        level: 2 as const,
        text: "How Long It Lasts",
      },
      {
        id: "duration",
        type: "paragraph" as const,
        text: status.howLongItLasts,
      },
      {
        id: "action-h",
        type: "heading" as const,
        level: 2 as const,
        text: "What You Should Do",
      },
      {
        id: "action-list",
        type: "list" as const,
        ordered: true,
        items: status.whatYouShouldDo,
      },
      {
        id: "faq-h",
        type: "heading" as const,
        level: 2 as const,
        text: "Frequently Asked Questions",
      },
      {
        id: "faq",
        type: "faq" as const,
        faqs: status.faqs,
      },
    ],
    relatedPages: status.relatedStatuses.map((rs) => ({ title: rs.name, slug: "/status/" + rs.slug })),
  };

  const schema = null;

  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(status.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Status Meanings", url: "/status" },
        { name: status.statusName, url: "/status/" + status.slug },
      ])) }} />
      <EditorialRenderer page={basePage} blocks={basePage.contentBlocks} />
    </>
  );
}
