import fs from "fs";
import path from "path";
import type { BasePage, PageClassification } from "./schema/contentSchema";
import { validateBasePage } from "./schema/contentSchema";

const CONTENT_DIR = path.resolve(process.cwd(), "content");

let cache: BasePage[] | null = null;

function collectContentPaths(dir: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectContentPaths(fullPath));
    } else if (entry.name.endsWith(".json") && entry.name !== "_index.json") {
      results.push(fullPath);
    }
  }
  return results;
}

export function loadAllContent(): BasePage[] {
  if (cache) return cache;

  const contentPaths = collectContentPaths(CONTENT_DIR);
  const pages: BasePage[] = [];

  for (const filePath of contentPaths) {
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(raw) as BasePage;
      const result = validateBasePage(data);
      if (result.isValid) {
        pages.push(data);
      } else {
        const relPath = path.relative(CONTENT_DIR, filePath);
        console.warn(`[content-loader] Skipping ${relPath}: ${result.errors.join("; ")}`);
      }
    } catch (err) {
      const relPath = path.relative(CONTENT_DIR, filePath);
      console.warn(`[content-loader] Error reading ${relPath}: ${err}`);
    }
  }

  cache = pages;
  return pages;
}

export function getPageBySlug(slug: string): BasePage | undefined {
  return loadAllContent().find((p) => p.slug === slug);
}

export function getPagesByClassification(classification: PageClassification): BasePage[] {
  return loadAllContent().filter((p) => p.classification === classification);
}

export function getRelatedPages(page: BasePage): BasePage[] {
  if (!page.relatedPages) return [];
  const slugs = new Set(page.relatedPages.map((r) => r.slug));
  return loadAllContent().filter((p) => slugs.has(p.slug));
}

export function clearContentCache() {
  cache = null;
}
