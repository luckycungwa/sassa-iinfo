import Link from "next/link";
import { Calendar, BookOpen, Search, Scale, Sliders, Sparkles, MapPin, FileText, Compass, Briefcase, HelpCircle, Newspaper, ChevronRight } from "lucide-react";

const sections = [
  { href: "/payment-dates", label: "Payment Dates", icon: Calendar },
  { href: "/status", label: "Status Meanings", icon: Search },
  { href: "/grants", label: "Grant Library", icon: BookOpen },
  { href: "/appeals", label: "Appeals Centre", icon: Scale },
  { href: "/eligibility", label: "Eligibility Centre", icon: Sliders },
  { href: "/tools", label: "Interactive Tools", icon: Sparkles },
  { href: "/offices", label: "Office Finder", icon: MapPin },
  { href: "/downloads", label: "Download Centre", icon: FileText },
  { href: "/provinces", label: "Province Hubs", icon: Compass },
  { href: "/guides", label: "Guides", icon: BookOpen },
  { href: "/banking", label: "Banking", icon: Briefcase },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
  { href: "/news", label: "News", icon: Newspaper },
];

const stats = [
  { value: "8", label: "Grant Guides" },
  { value: "12", label: "Status Meanings" },
  { value: "8", label: "Interactive Tools" },
  { value: "6", label: "Office Locations" },
];

export default function HomePage() {
  return (
    <div className="space-y-16 animate-fade-in">
      <section className="grid grid-cols-1 md:grid-cols-5 gap-8 pt-4">
        <div className="md:col-span-3 md:pr-8">
          <div className="inline-flex items-center gap-2 bg-accent-light border border-border rounded-full px-3 py-1 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-subtle" />
            <span className="text-[10px] font-bold text-accent-dark font-mono tracking-wider uppercase">
              South Africa&rsquo;s Trusted Resource
            </span>
          </div>
          <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black tracking-tight text-ink leading-[1.1] mb-4">
            Complete SASSA<br />Resource Centre
          </h1>
          <p className="text-sm text-muted leading-relaxed max-w-prose mb-6">
            The definitive reference for South African social grants. Payment dates, status meanings,
            eligibility checkers, office locations, appeal guides, and interactive tools.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/payment-dates"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-bold hover:bg-accent-dark transition active:scale-[0.97]"
            >
              View Payment Dates
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/grants"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg text-sm font-bold text-ink hover:bg-canvas transition active:scale-[0.97]"
            >
              Browse Grants
            </Link>
          </div>
          <p className="text-[10px] text-muted font-mono mt-4">
            No authentication &middot; No ads &middot; No tracking
          </p>
        </div>
        <div className="md:col-span-2 hidden md:block">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface border border-border rounded-xl p-5 text-center">
                <p className="text-2xl font-black text-accent">{s.value}</p>
                <p className="text-[10px] font-mono text-muted mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-ink tracking-tight">Explore Resources</h2>
          <span className="text-[10px] font-mono text-muted">{sections.length} sections</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sections.map((link, i) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-4 bg-surface border border-border rounded-xl p-4 hover:border-accent/40 transition-all animate-fade-in`}
                style={{ animationDelay: `${i * 30}ms`, animationFillMode: "backwards" }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent-light border border-border flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-accent-dark" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-ink group-hover:text-accent transition-colors">{link.label}</h3>
                </div>
                <ChevronRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-surface border border-border rounded-xl p-6 md:p-8">
        <h2 className="text-lg font-bold text-ink mb-3 tracking-tight">About This Resource</h2>
        <div className="text-sm text-muted leading-relaxed space-y-3 max-w-prose">
          <p>
            The SASSA Resource Platform is an independent, comprehensive knowledge base dedicated to
            helping South Africans understand and navigate the social grant system. Every page is
            statically generated and structured for maximum clarity.
          </p>
          <p>
            Our mission is to be the single best answer to every SASSA-related question through
            detailed grant guides, status meaning explanations, interactive eligibility tools,
            and step-by-step appeal instructions.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {["social grants", "SASSA", "SRD R370", "payment dates", "appeals", "eligibility", "South Africa"].map((tag) => (
              <span key={tag} className="text-[10px] font-mono font-bold bg-accent-light text-accent-dark border border-border px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
