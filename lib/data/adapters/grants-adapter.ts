import type { BasePage, ContentBlock } from "../../schema/contentSchema";
import { grants, type Grant } from "../grants";

function grantToBlocks(grant: Grant): ContentBlock[] {
  const blocks: ContentBlock[] = [
    { id: `${grant.id}-summary`, type: "grant-summary", amount: grant.amount, frequency: grant.frequency, targetGroup: grant.targetGroup },
    { id: `${grant.id}-intro`, type: "paragraph", text: grant.overview },
    { id: `${grant.id}-eligibility-h`, type: "heading", level: 3, text: "Eligibility Criteria" },
    { id: `${grant.id}-eligibility-list`, type: "list", ordered: false, items: grant.eligibilityCriteria },
    { id: `${grant.id}-docs-h`, type: "heading", level: 3, text: "Required Documents" },
    { id: `${grant.id}-docs`, type: "document-checklist", documents: grant.documentsRequired.map((d) => ({ label: d, required: true })) },
    { id: `${grant.id}-apply-h`, type: "heading", level: 3, text: "How to Apply" },
    { id: `${grant.id}-apply-steps`, type: "steps", steps: grant.howToApply.map((s, i) => ({ title: `Step ${i + 1}`, description: s })) },
  ];

  if (grant.appealNotes) {
    blocks.push(
      { id: `${grant.id}-appeal-h`, type: "heading", level: 3, text: "Appeal Information" },
      { id: `${grant.id}-appeal`, type: "callout", intent: "info", title: "Appeal Notes", text: grant.appealNotes },
    );
  }

  if (grant.faqs.length > 0) {
    blocks.push(
      { id: `${grant.id}-faq-h`, type: "heading", level: 3, text: "Frequently Asked Questions" },
      { id: `${grant.id}-faq`, type: "faq", faqs: grant.faqs },
    );
  }

  return blocks;
}

export function grantToBasePage(grant: Grant): BasePage {
  return {
    id: `grant-${grant.id}`,
    slug: `/grants/${grant.slug}`,
    classification: "grant-detail",
    title: grant.title,
    description: grant.overview.slice(0, 160),
    lastUpdated: "2026-06-30",
    version: "1.0.0",
    status: "published",
    author: { name: "Grant Guide Editorial Team", role: "Content Editor", verified: true },
    seo: {
      metaTitle: `${grant.title} — SRD Grant Guide ${grant.amount}`,
      metaDescription: `${grant.title} — ${grant.amount} ${grant.frequency}. Eligibility criteria, required documents, how to apply, and FAQs. ${grant.targetGroup}`,
      keywords: [grant.title, "SASSA grant", "social grant South Africa"],
    },
    contentBlocks: grantToBlocks(grant),
  };
}

export function getAllGrantsAsBasePages(): BasePage[] {
  return grants.map(grantToBasePage);
}
