export function faqSchema(questions: { question: string; answer: string }[]) {
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
      item: item.url,
    })),
  };
}

export function articleSchema(title: string, description: string, dateModified: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    dateModified,
    publisher: {
      "@type": "Organization",
      name: "SASSA Resource Platform",
      url: process.env.APP_URL || "https://sassa-resource.vercel.app",
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SASSA Resource Platform",
    description: "South Africa's most trusted public assistance knowledge base and interactive resource directory.",
    url: process.env.APP_URL || "https://sassa-resource.vercel.app",
  };
}
