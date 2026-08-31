import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { newsArticles } from "../../../lib/data/news";
import { loadAllContent } from "../../../lib/content-loader";
import { canonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "SASSA News & Updates | Latest Grant Information 2026",
  description: "Stay informed with the latest SASSA news: grant reviews, payment schedule changes, policy announcements, eLife certification, and important deadlines.",
  alternates: { canonical: canonicalUrl("/news") },
};

function formatDate(dateStr: string): string {
  try { return new Date(dateStr).toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" }); }
  catch { return dateStr; }
}

function getTags(classification: string, seo: { keywords: string[] }): string[] {
  if (classification === "news-article" && seo.keywords) return seo.keywords.slice(0, 2);
  return [];
}

export default function NewsHubPage() {
  const jsonArticles = loadAllContent().filter((p) => p.classification === "news-article");
  const jsonSlugs = new Set(jsonArticles.map((a) => a.slug));
  const tsArticles = newsArticles.filter((a) => !jsonSlugs.has("/news/" + a.slug));
  const allArticles = [
    ...jsonArticles.map((a) => ({ id: a.id, slug: a.slug, title: a.title, summary: a.description, date: a.lastUpdated, tags: getTags(a.classification, a.seo) })),
    ...tsArticles.map((a) => ({ id: a.id, slug: "/news/" + a.slug, title: a.title, summary: a.summary, date: a.date, tags: a.tags })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div>
      <section className="bg-yellow py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">news</p>
          <h1 className="text-[40px] md:text-[57px] font-black text-carbon leading-[1.15] tracking-[-0.007em]">
            SASSA news & updates
          </h1>
          <p className="text-[21px] text-body mt-4 max-w-xl leading-relaxed">
            Grant reviews, payment updates, policy changes, and important deadlines.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 grid sm:grid-cols-2 gap-2">
            {allArticles.length === 0 && (
              <p className="text-sm text-ash">No news articles yet.</p>
            )}
            {allArticles.map((article) => (
              <Link
                key={article.id}
                href={article.slug}
                className="flex items-center justify-between gap-4 p-5 card hover:bg-yellow/30 transition group"
              >
                <div className="min-w-0">
                  <p className="text-[19px] font-black text-carbon group-hover:text-violet transition">{article.title}</p>
                  <p className="text-sm text-ash mt-1 line-clamp-2">{article.summary}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs font-mono text-ash">{formatDate(article.date)}</span>
                    {article.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-ash/80">#{tag}</span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-ash group-hover:text-violet transition shrink-0 ml-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-fog py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[19px] font-bold text-carbon">Looking for payment dates or grant amounts?</p>
              <p className="text-sm text-ash">Check the payment schedule or browse grant details</p>
            </div>
            <div className="flex gap-2">
              <Link href="/payment-dates" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-violet text-white rounded-[22px] text-xs font-bold hover:opacity-90 transition btn-violet">
                Payment Dates <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/grants" className="inline-flex items-center gap-1.5 px-5 py-2.5 border-2 border-carbon/20 text-carbon rounded-[22px] text-xs font-bold hover:bg-carbon/5 transition">
                Grant Library
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[19px] leading-relaxed max-w-2xl mx-auto">
            <Link href="/" className="text-accent font-bold hover:underline">Return to homepage</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
