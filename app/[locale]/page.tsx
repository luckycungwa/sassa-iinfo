import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/canonical";
import { webpageSchema } from "@/lib/json-ld";
import GoldCardBanner from "@/components/GoldCardBanner";
import { ArrowRight, Shield, MapPin, Calculator, BookOpen, CalendarDays, FilePlus2, XCircle, Hourglass, Wallet, RefreshCw, Scale, Smartphone } from "lucide-react";
import { newsArticles } from "@/lib/data/news";
import { loadAllContent } from "@/lib/content-loader";
import AdUnit from "@/components/ads/AdUnit";

const grants = [
  { name: "SRD R370", amount: "R370", href: "/grants/srd-r370-grant", desc: "Social Relief of Distress for unemployed adults 18-59" },
  { name: "Older Person", amount: "R2,400", href: "/grants/older-person-grant", desc: "State pension for men 60+ and women 60+" },
  { name: "Disability", amount: "R2,400", href: "/grants/disability-grant", desc: "For adults unable to work due to disability" },
  { name: "Child Support", amount: "R580", href: "/grants/child-support-grant", desc: "Per child per month for primary caregivers" },
  { name: "Foster Care", amount: "R1,295", href: "/grants/foster-care-grant", desc: "For foster parents caring for children" },
  { name: "Care Dependency", amount: "R2,400", href: "/grants/care-dependency-grant", desc: "For children with disabilities" },
  { name: "War Veterans", amount: "R2,420", href: "/grants/war-veterans-grant", desc: "For military veterans or their surviving partners" },
  { name: "Grant-in-Aid", amount: "R580", href: "/grants/grant-in-aid", desc: "Additional support for grant recipients who need full-time care" },
];

export const metadata: Metadata = {
  title: 'SASSA Status Check & Grant Guide 2026 — Independent South African Resource',
  description: 'Complete guide to SASSA grants: check your SRD status, payment dates, appeal process, and eligibility. Step-by-step guides for all 8 social grants including SRD R370, Older Person, Child Support, and Disability grants.',
  alternates: { canonical: canonicalUrl("/") },
  openGraph: {
    title: 'SASSA Status Check & Grant Guide 2026 — Independent South African Resource',
    description: 'Complete guide to SASSA grants: check your SRD status, payment dates, appeal process, and eligibility.',
  },
};

export default function HomePage() {
  const pageSchema = webpageSchema(
    "SASSA Status Check & Grant Guide 2026",
    "Complete guide to SASSA grants: check your SRD status, payment dates, appeal process, and eligibility.",
    "/"
  );

  const jsonArticles = loadAllContent().filter((p) => p.classification === "news-article");
  const jsonSlugs = new Set(jsonArticles.map((a) => a.slug));
  const tsArticles = newsArticles.filter((a) => !jsonSlugs.has("/news/" + a.slug));
  const latestNews = [
    ...jsonArticles.map((a) => ({ href: a.slug, title: a.title, date: a.lastUpdated })),
    ...tsArticles.map((a) => ({ href: "/news/" + a.slug, title: a.title, date: a.date })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const formatShortDate = (dateStr: string) => {
    try { return new Date(dateStr).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }); }
    catch { return dateStr; }
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <section className="bg-slate text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/hero-bg.avif')] bg-cover bg-center opacity-[0.06]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-4">sassa grant guide</p>
              <h1 className="text-[40px] md:text-[57px] lg:text-[68px] font-black leading-[1.15] text-white tracking-[-0.007em]">
                Every grant,<br />made clear
              </h1>
              <p className="text-[21px] md:text-[24px] text-white/80 leading-relaxed mt-6 max-w-lg">
                Every grant amount, payment date, and appeal deadline - checked against official sources and written in plain language.
              </p>
              <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                <Link
                  href="/grants"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-violet text-white rounded-[28.5px] text-[21px] font-bold hover:opacity-90 transition btn-violet"
                >
                  Browse all grants <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/status"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white rounded-[28.5px] text-[21px] font-bold hover:bg-white/10 transition"
                >
                  Check your status
                </Link>
              </div>
            </div>
            <div className="w-60 md:w-72 shrink-0">
              <Image
                src="/sassa-hand.webp"
                alt="SASSA grant assistance - check your social grant status online"
                width={288}
                height={240}
                className="w-full h-auto rounded-[2.85px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <AdUnit slot="HOME_LEADERBOARD" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" />

      <GoldCardBanner />

      <section className="bg-yellow py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[40px] md:text-[57px] font-black text-carbon leading-[1.15] tracking-[-0.007em]">
            SASSA social grants
          </h2>
          <p className="text-[21px] text-body mt-4 max-w-lg mx-auto">
            Eight grants supporting millions of South Africans. Everything you need to know.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-carbon/60 font-mono">
            <span>18M+ recipients</span>
            <span className="w-1 h-1 rounded-full bg-carbon/20" />
            <span>8 grant types</span>
            <span className="w-1 h-1 rounded-full bg-carbon/20" />
            <span>R370 to R2,420/month</span>
            <span className="w-1 h-1 rounded-full bg-carbon/20" />
            <span>80+ guides</span>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">All SASSA grant types and amounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {grants.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="card group hover:bg-yellow/30 p-5 transition block"
              >
                <p className="text-[21px] font-black text-carbon group-hover:text-violet transition">{g.name}</p>
                <p className="text-sm text-ash mt-1 leading-snug">{g.desc}</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="text-lg font-black text-carbon">{g.amount}</span>
                  <span className="text-sm text-ash">/month</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/grants"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet text-white rounded-[28.5px] text-sm font-bold hover:opacity-90 transition btn-violet"
            >
              View all grants <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-yellow py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[34px] md:text-[40px] font-black text-carbon leading-[1.15] tracking-[-0.007em] text-center">
            What are you looking for?
          </h2>
          <p className="text-center text-base text-body mt-3 max-w-xl mx-auto">
            Jump straight to the task you need to get done.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            <Link href="/status" className="card flex items-start gap-4 p-5 transition group">
              <Shield className="w-6 h-6 text-violet shrink-0 mt-0.5" />
              <div>
                <p className="text-[19px] font-bold text-carbon group-hover:text-violet transition">Check my SASSA status</p>
                <p className="text-sm text-muted-foreground mt-1 leading-snug">Understand every SRD and grant status from Pending to Approved, Declined, and everything between.</p>
              </div>
            </Link>
            <Link href="/payment-dates" className="card flex items-start gap-4 p-5 transition group">
              <CalendarDays className="w-6 h-6 text-violet shrink-0 mt-0.5" />
              <div>
                <p className="text-[19px] font-bold text-carbon group-hover:text-violet transition">Payment dates</p>
                <p className="text-sm text-muted-foreground mt-1 leading-snug">Monthly schedules for every grant, including SRD batch windows and permanent grant paydays.</p>
              </div>
            </Link>
            <Link href="/guides/how-to-apply-sassa-grant" className="card flex items-start gap-4 p-5 transition group">
              <FilePlus2 className="w-6 h-6 text-violet shrink-0 mt-0.5" />
              <div>
                <p className="text-[19px] font-bold text-carbon group-hover:text-violet transition">Apply for a grant</p>
                <p className="text-sm text-muted-foreground mt-1 leading-snug">How to apply for every SASSA grant, plus the documents and steps each one needs.</p>
              </div>
            </Link>
            <Link href="/banking/sassa-ussd-codes" className="card flex items-start gap-4 p-5 transition group">
              <Smartphone className="w-6 h-6 text-violet shrink-0 mt-0.5" />
              <div>
                <p className="text-[19px] font-bold text-carbon group-hover:text-violet transition">Check by phone</p>
                <p className="text-sm text-muted-foreground mt-1 leading-snug">USSD menu, WhatsApp line, and toll-free helpline — no data or smartphone needed.</p>
              </div>
            </Link>
            <Link href="/status/declined" className="card flex items-start gap-4 p-5 transition group">
              <XCircle className="w-6 h-6 text-violet shrink-0 mt-0.5" />
              <div>
                <p className="text-[19px] font-bold text-carbon group-hover:text-violet transition">My grant was declined</p>
                <p className="text-sm text-muted-foreground mt-1 leading-snug">Why applications get declined and how to appeal through ITSAA within 90 days.</p>
              </div>
            </Link>
            <Link href="/status/pending" className="card flex items-start gap-4 p-5 transition group">
              <Hourglass className="w-6 h-6 text-violet shrink-0 mt-0.5" />
              <div>
                <p className="text-[19px] font-bold text-carbon group-hover:text-violet transition">My status is pending</p>
                <p className="text-sm text-muted-foreground mt-1 leading-snug">What Pending means, how long it lasts, and when to follow up with SASSA.</p>
              </div>
            </Link>
            <Link href="/banking/payment-not-reflecting" className="card flex items-start gap-4 p-5 transition group">
              <Wallet className="w-6 h-6 text-violet shrink-0 mt-0.5" />
              <div>
                <p className="text-[19px] font-bold text-carbon group-hover:text-violet transition">Payment not received</p>
                <p className="text-sm text-muted-foreground mt-1 leading-snug">Approved but the money never arrived? Work through the checks and get it resolved.</p>
              </div>
            </Link>
            <Link href="/banking/update-bank-details" className="card flex items-start gap-4 p-5 transition group">
              <RefreshCw className="w-6 h-6 text-violet shrink-0 mt-0.5" />
              <div>
                <p className="text-[19px] font-bold text-carbon group-hover:text-violet transition">Change my banking details</p>
                <p className="text-sm text-muted-foreground mt-1 leading-snug">Update your bank account, biometrics, or payment method with SASSA step by step.</p>
              </div>
            </Link>
            <Link href="/appeals" className="card flex items-start gap-4 p-5 transition group">
              <Scale className="w-6 h-6 text-violet shrink-0 mt-0.5" />
              <div>
                <p className="text-[19px] font-bold text-carbon group-hover:text-violet transition">Appeal a SASSA decision</p>
                <p className="text-sm text-muted-foreground mt-1 leading-snug">Step-by-step guide to challenging a declined grant through ITSAA within 90 days.</p>
              </div>
            </Link>
            <Link href="/tools" className="card flex items-start gap-4 p-5 transition group">
              <Calculator className="w-6 h-6 text-violet shrink-0 mt-0.5" />
              <div>
                <p className="text-[19px] font-bold text-carbon group-hover:text-violet transition">SASSA tools & calculators</p>
                <p className="text-sm text-muted-foreground mt-1 leading-snug">Eligibility checker, grant calculator, payment lookup, and appeal deadline timer.</p>
              </div>
            </Link>
            <Link href="/offices" className="card flex items-start gap-4 p-5 transition group">
              <MapPin className="w-6 h-6 text-violet shrink-0 mt-0.5" />
              <div>
                <p className="text-[19px] font-bold text-carbon group-hover:text-violet transition">Find a SASSA office</p>
                <p className="text-sm text-muted-foreground mt-1 leading-snug">Provincial SASSA offices with addresses, contact numbers, and operating hours.</p>
              </div>
            </Link>
            <Link href="/guides" className="card flex items-start gap-4 p-5 transition group">
              <BookOpen className="w-6 h-6 text-violet shrink-0 mt-0.5" />
              <div>
                <p className="text-[19px] font-bold text-carbon group-hover:text-violet transition">Step-by-step guides</p>
                <p className="text-sm text-muted-foreground mt-1 leading-snug">How to apply, change payment method, check status, cancel, and more.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-sm font-bold text-violet uppercase tracking-widest mb-3">How it works</p>
              <h2 className="text-[29px] md:text-[34px] font-black text-carbon leading-[1.1] tracking-[-0.007em]">South Africa&apos;s social grant system</h2>
              <div className="space-y-3 text-base text-body leading-relaxed mt-6">
                <p>
                  SASSA administers eight grant types, from the Older Person Grant for seniors to the Child Support
                  Grant for caregivers and the SRD R370 for unemployed adults. Each has its own eligibility criteria
                  based on age, income, and personal circumstances.
                </p>
                <p>
                  Some grants you can apply for online. Others need a visit to a SASSA office with your original documents.
                  <Link href="/grants" className="text-violet hover:underline font-bold ml-1">Read the full guide</Link>
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="card p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/srd-bg.avif')] bg-cover bg-center opacity-[0.06]" />
                <div className="relative">
                  <p className="text-sm font-bold text-violet uppercase tracking-widest mb-2">Why I built this</p>
                  <p className="text-base text-body leading-relaxed">
                    I&apos;m Lucky Cungwa, a South African developer. I created this site because the official
                    information is hard to navigate and the appeals process is barely documented.
                  </p>
                  <Link href="/about/lucky-cungwa" className="inline-flex items-center gap-1.5 text-violet font-bold text-sm mt-4 hover:underline">
                    More about me <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] font-black text-carbon tracking-[-0.007em]">Latest SASSA updates</h2>
            <Link href="/news" className="text-sm text-violet hover:underline font-bold">View all</Link>
          </div>
          <div className="space-y-2">
            {latestNews.map((article) => (
              <Link key={article.href} href={article.href} className="flex items-baseline gap-4 group py-3">
                <span className="text-sm text-ash shrink-0 w-28">{formatShortDate(article.date)}</span>
                <span className="text-base text-carbon group-hover:text-violet transition font-medium">{article.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[19px] leading-relaxed max-w-2xl mx-auto">
            <strong>Independent resource.</strong> Not affiliated with SASSA or the South African government.
            For official applications and status checks,&nbsp;
            <a href="https://srd.sassa.gov.za" target="_blank" rel="noopener noreferrer" className="text-accent font-bold hover:underline">srd.sassa.gov.za</a>
            &nbsp;or call 0800 60 10 11.
          </p>
        </div>
      </section>
    </div>
  );
}
