import { TEAM } from "./team";

const siteUrl = process.env.APP_URL || "https://sassaiinfo.co.za";

const authorPerson = {
  "@type": "Person",
  name: TEAM.author.name,
  jobTitle: TEAM.author.role,
  description: TEAM.author.credentials,
};

const reviewedByPersons = [
  {
    "@type": "Person",
    name: TEAM.medicalReviewer.name,
    jobTitle: TEAM.medicalReviewer.role,
    description: TEAM.medicalReviewer.credentials,
  },
  {
    "@type": "Person",
    name: TEAM.legalReviewer.name,
    jobTitle: TEAM.legalReviewer.role,
    description: TEAM.legalReviewer.credentials,
  },
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
      name: "SASSA Grant Guide",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon-512.png`,
      },
    },
    author: authorPerson,
    reviewedBy: reviewedByPersons,
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
    name: "SASSA Grant Guide",
    description: "Independent guide to SASSA social grants in South Africa. Created by 44tagstudios.",
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
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
    reviewedBy: reviewedByPersons,
    ...(dateModified ? { dateModified } : {}),
  };
}

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteUrl}/about`,
    name: "About SASSA Grant Guide",
    description: "Learn about the independent SASSA Grant Guide resource built by Lucky Cungwa.",
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteUrl}/contact`,
    name: "Contact Us",
    description: "Get in touch with the SASSA Grant Guide team.",
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/about/lucky-cungwa`,
    name: "Lucky Cungwa",
    jobTitle: "Editor & Founder, SASSA Grant Guide",
    description: "Founder and editor of the SASSA Grant Guide, an independent resource for South African social grant information.",
    url: `${siteUrl}/about/lucky-cungwa`,
    sameAs: ["https://44tagstudios.co.za"],
    worksFor: {
      "@type": "Organization",
      name: "44tagstudios",
      url: "https://44tagstudios.co.za",
    },
  };
}
