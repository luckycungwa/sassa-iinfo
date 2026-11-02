import { TEAM } from "./team";
import { SITE_URL } from "./site";

const siteUrl = SITE_URL;

const authorPerson = {
  "@type": "Person",
  name: TEAM.author.name,
  jobTitle: TEAM.author.role,
  description: TEAM.author.credentials,
};

const reviewedByPersons = [
  ...(TEAM.medicalReviewer
    ? [{
        "@type": "Person" as const,
        name: TEAM.medicalReviewer.name,
        jobTitle: TEAM.medicalReviewer.role,
        description: TEAM.medicalReviewer.credentials,
      }]
    : []),
  ...(TEAM.legalReviewer
    ? [{
        "@type": "Person" as const,
        name: TEAM.legalReviewer.name,
        jobTitle: TEAM.legalReviewer.role,
        description: TEAM.legalReviewer.credentials,
      }]
    : []),
];

export function faqSchema(questions: { question: string; answer: string }[]) {
  if (!questions.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}

export function articleSchema(title: string, description: string, datePublished: string, slug: string, dateModified?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}${slug}`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "SASSA Grant Hub",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon-512.png`,
      },
    },
    author: authorPerson,
    ...(reviewedByPersons.length ? { reviewedBy: reviewedByPersons } : {}),
  };
}

/**
 * NewsArticle schema for the Updates blog. Unlike the evergreen Article schema,
 * this carries the real publication date, modification date, article section
 * and the named author recorded in the content file.
 */
export function newsArticleSchema(page: {
  title: string;
  description: string;
  slug: string;
  publishedAt?: string;
  lastUpdated: string;
  topics?: string[];
  author: { name: string; role?: string; credentials?: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: page.title,
    description: page.description,
    datePublished: page.publishedAt ?? page.lastUpdated,
    dateModified: page.lastUpdated,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}${page.slug}`,
    },
    inLanguage: "en-ZA",
    isAccessibleForFree: true,
    ...(page.topics?.length
      ? { articleSection: page.topics[0], keywords: page.topics.join(", ") }
      : {}),
    author: {
      "@type": "Person",
      name: page.author.name,
      ...(page.author.role ? { jobTitle: page.author.role } : {}),
      ...(page.author.credentials ? { description: page.author.credentials } : {}),
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "SASSA Grant Hub",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon-512.png`,
      },
    },
  };
}

export function howToSchema(steps: { title: string; detail: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.detail,
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "SASSA Grant Hub",
    description: "Independent South African resource for SASSA grant statuses, payment dates, applications and appeals. Operated by 44tagstudios.",
    url: siteUrl,
    logo: `${siteUrl}/main-logo.svg`,
    image: `${siteUrl}/og-image.png`,
    sameAs: ["https://44tagstudios.co.za"],
    founder: {
      "@type": "Person",
      name: "Lucky Cungwa",
      url: "https://44tagstudios.co.za",
    },
  };
}

export function webpageSchema(title: string, description: string, slug: string, dateModified?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}${slug}`,
    name: title,
    description,
    url: `${siteUrl}${slug}`,
    inLanguage: "en-ZA",
    isAccessibleForFree: true,
    author: authorPerson,
    ...(reviewedByPersons.length ? { reviewedBy: reviewedByPersons } : {}),
    ...(dateModified ? { dateModified } : {}),
  };
}

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteUrl}/about`,
    name: "About SASSA Grant Hub",
    description: "Learn about SASSA Grant Hub, an independent South African grant information resource built by Lucky Cungwa.",
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteUrl}/contact`,
    name: "Contact SASSA Grant Hub",
    description: "Contact the SASSA Grant Hub editorial team about corrections or content questions.",
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/about/lucky-cungwa`,
    name: "Lucky Cungwa",
    jobTitle: "Editor & Founder, SASSA Grant Hub",
    description: "Founder and editor of SASSA Grant Hub, an independent resource for South African social grant information.",
    url: `${siteUrl}/about/lucky-cungwa`,
    sameAs: ["https://44tagstudios.co.za"],
    worksFor: {
      "@type": "Organization",
      name: "44tagstudios",
      url: "https://44tagstudios.co.za",
    },
  };
}
