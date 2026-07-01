import Fuse from "fuse.js";
import { grants } from "./data/grants";
import { statuses } from "./data/statuses";
import { appeals } from "./data/appeals";
import { eligibilityGuides } from "./data/eligibility";
import { offices } from "./data/offices";
import { downloadableForms } from "./data/downloads";
import { provinces } from "./data/provinces";
import { guides } from "./data/guides";
import { bankingGuides } from "./data/banking";
import { faqCategories } from "./data/faq";
import { newsArticles } from "./data/news";

export interface SearchResult {
  title: string;
  description: string;
  url: string;
  category: string;
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  grants.forEach((g) => {
    results.push({ title: g.title, description: `${g.amount} — ${g.targetGroup}`, url: `/grants/${g.slug}`, category: "Grant" });
    g.faqs.forEach((f) => results.push({ title: f.question, description: f.answer.slice(0, 120), url: `/grants/${g.slug}`, category: "Grant FAQ" }));
  });

  statuses.forEach((s) => {
    results.push({ title: `${s.statusName} Status`, description: s.shortDescription, url: `/status/${s.slug}`, category: "Status" });
    s.faqs.forEach((f) => results.push({ title: f.question, description: f.answer.slice(0, 120), url: `/status/${s.slug}`, category: "Status FAQ" }));
  });

  appeals.forEach((a) => {
    results.push({ title: a.title, description: a.shortDescription, url: `/appeals/${a.slug}`, category: "Appeal" });
    a.faqs.forEach((f) => results.push({ title: f.question, description: f.answer.slice(0, 120), url: `/appeals/${a.slug}`, category: "Appeal FAQ" }));
  });

  eligibilityGuides.forEach((e) => {
    results.push({ title: e.title, description: e.shortDescription, url: `/eligibility/${e.slug}`, category: "Eligibility" });
  });

  offices.forEach((o) => {
    results.push({ title: o.name, description: `${o.city}, ${o.province} — ${o.address}`, url: `/offices/${o.id}`, category: "Office" });
  });

  downloadableForms.forEach((d) => {
    results.push({ title: d.title, description: d.shortDescription, url: `/downloads/${d.slug}`, category: "Download" });
  });

  provinces.forEach((p) => {
    results.push({ title: `${p.name} Province`, description: `Regional office: ${p.regionalOfficeAddress}`, url: `/provinces/${p.slug}`, category: "Province" });
  });

  guides.forEach((g) => {
    results.push({ title: g.title, description: g.description, url: `/guides/${g.slug}`, category: "Guide" });
  });

  bankingGuides.forEach((b) => {
    results.push({ title: b.title, description: b.description, url: `/banking/${b.slug}`, category: "Banking" });
  });

  faqCategories.forEach((c) => {
    c.questions.forEach((q) => results.push({ title: q.question, description: q.answer.slice(0, 120), url: "/faq", category: "FAQ" }));
  });

  newsArticles.forEach((n) => {
    results.push({ title: n.title, description: n.summary, url: `/news/${n.slug}`, category: "News" });
  });

  return results;
}

let fuseInstance: Fuse<SearchResult> | null = null;

export function getFuse(): Fuse<SearchResult> {
  if (!fuseInstance) {
    const index = buildIndex();
    fuseInstance = new Fuse(index, {
      keys: ["title", "description"],
      threshold: 0.4,
      minMatchCharLength: 2,
    });
  }
  return fuseInstance;
}

export function search(query: string): SearchResult[] {
  const fuse = getFuse();
  return fuse.search(query).map((r) => r.item).slice(0, 20);
}
