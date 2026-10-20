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

function loadFromPaths(contentPaths: string[], rootDir: string): BasePage[] {
  const pages: BasePage[] = [];
  for (const filePath of contentPaths) {
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(raw) as BasePage;
      const result = validateBasePage(data);
      if (result.isValid) {
        pages.push(data);
      } else {
        const relPath = path.relative(rootDir, filePath);
        console.warn(`[content-loader] Skipping ${relPath}: ${result.errors.join("; ")}`);
      }
    } catch (err) {
      const relPath = path.relative(rootDir, filePath);
      console.warn(`[content-loader] Error reading ${relPath}: ${err}`);
    }
  }
  return pages;
}

export function loadAllContent(): BasePage[] {
  if (cache) return cache;
  cache = loadFromPaths(collectContentPaths(CONTENT_DIR), CONTENT_DIR);
  return cache;
}

export function getPageBySlug(slug: string): BasePage | undefined {
  return loadAllContent().find((p) => p.slug === slug);
}

export function getPagesByClassification(
  classification: PageClassification
): BasePage[] {
  return loadAllContent().filter((p) => p.classification === classification);
}

export function getRelatedPages(page: BasePage): BasePage[] {
  if (!page.relatedPages) return [];
  const bySlug = new Map(loadAllContent().map((p) => [p.slug, p]));
  return page.relatedPages
    .map((r) => bySlug.get(r.slug))
    .filter((p): p is BasePage => Boolean(p));
}

export function clearContentCache() {
  cache = null;
}
