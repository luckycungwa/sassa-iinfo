import fs from "fs";
import path from "path";
import type { BasePage, PageClassification } from "./schema/contentSchema";
import { validateBasePage } from "./schema/contentSchema";

const CONTENT_DIR = path.resolve(process.cwd(), "content");

/**
 * Non-default locales that can have a mirrored content tree under
 * `content/<locale>/...`. English (the default) lives directly under
 * `content/<type>/...`.
 */
export const NON_DEFAULT_LOCALES = ["zu", "xh", "af"] as const;

let cache: BasePage[] | null = null;
const localeCaches = new Map<string, BasePage[]>();

function isLocaleFolder(name: string): boolean {
  return (NON_DEFAULT_LOCALES as readonly string[]).includes(name);
}

function collectContentPaths(dir: string, skipLocaleDirs = true): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (skipLocaleDirs && isLocaleFolder(entry.name)) continue;
      results.push(...collectContentPaths(fullPath, skipLocaleDirs));
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
  cache = loadFromPaths(collectContentPaths(CONTENT_DIR, true), CONTENT_DIR);
  return cache;
}

/**
 * Loads every page for a given locale. Localized files (mirrored under
 * `content/<locale>/...`) override the English versions by slug; pages
 * without a translation fall back to English.
 */
export function loadPagesForLocale(locale?: string): BasePage[] {
  if (!locale || locale === "en") return loadAllContent();

  const cached = localeCaches.get(locale);
  if (cached) return cached;

  const localeDir = path.join(CONTENT_DIR, locale);
  const localPages: BasePage[] = fs.existsSync(localeDir)
    ? loadFromPaths(collectContentPaths(localeDir, false), localeDir)
    : [];

  const bySlug = new Map<string, BasePage>();
  for (const p of loadAllContent()) bySlug.set(p.slug, p);
  for (const p of localPages) bySlug.set(p.slug, p);

  const merged = Array.from(bySlug.values()).sort((a, b) => a.slug.localeCompare(b.slug));
  localeCaches.set(locale, merged);
  return merged;
}

/** Slugs that have an explicit (non-English) translation file for a locale. */
export function getLocalizedSlugs(locale: string): string[] {
  const localeDir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(localeDir)) return [];
  return loadFromPaths(collectContentPaths(localeDir, false), localeDir).map((p) => p.slug);
}

export function getPageBySlug(slug: string, locale?: string): BasePage | undefined {
  return loadPagesForLocale(locale).find((p) => p.slug === slug);
}

export function getPagesByClassification(
  classification: PageClassification,
  locale?: string
): BasePage[] {
  return loadPagesForLocale(locale).filter((p) => p.classification === classification);
}

export function getRelatedPages(page: BasePage, locale?: string): BasePage[] {
  if (!page.relatedPages) return [];
  const bySlug = new Map(loadPagesForLocale(locale).map((p) => [p.slug, p]));
  return page.relatedPages
    .map((r) => bySlug.get(r.slug))
    .filter((p): p is BasePage => Boolean(p));
}

export function clearContentCache() {
  cache = null;
  localeCaches.clear();
}