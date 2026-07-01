import Link from "next/link";
import { Calendar, BookOpen, Search, Scale, Sliders, Sparkles, MapPin, FileText, Compass, Briefcase, HelpCircle, Newspaper, ChevronRight, ArrowRight } from "lucide-react";

const quickActions = [
  { href: "/status", label: "Check Status", description: "Track your application progress", icon: Search },
  { href: "/banking", label: "Banking Details", description: "Update your bank information", icon: Briefcase },
  { href: "/offices", label: "Office Locator", icon: MapPin },
];

const grantTypes = [
  { href: "/grants/srd-r370", label: "SRD R370 Grant", icon: Sparkles },
  { href: "/grants/child-support", label: "Child Support", icon: BookOpen },
  { href: "/grants/old-age", label: "Old Age Grant", icon: Scale },
];

export default function HomePage() {
  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero Section */}
      <section className="bg-midnight text-surface py-20 px-6 md:px-12 rounded-sassa">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
            Simplified Access to <span className="text-gold">SASSA Social Grants</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
            Empowering South Africans with independent, clear, and actionable resources to navigate the social assistance system with confidence.
          </p>
          <div className="flex gap-4">
            <Link
              href="/grants"
              className="px-6 py-3 bg-gold text-midnight rounded-sassa font-bold hover:bg-gold-dark transition"
            >
              Apply Now
            </Link>
            <Link
              href="/guides"
              className="px-6 py-3 border border-surface rounded-sassa font-bold text-surface hover:bg-surface hover:text-midnight transition"
            >
              View All Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className="bg-gold p-6 rounded-sassa text-midnight flex flex-col gap-4 hover:shadow-lg transition-transform hover:-translate-y-1"
            >
              <Icon className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold">{action.label}</h3>
                {action.description && <p className="text-sm opacity-90">{action.description}</p>}
              </div>
              <ArrowRight className="w-5 h-5 ml-auto" />
            </Link>
          );
        })}
      </section>

      {/* Information Hub */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-ink">Explore Grant Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {grantTypes.map((grant) => {
            const Icon = grant.icon;
            return (
              <Link
                key={grant.href}
                href={grant.href}
                className="group p-6 border border-border rounded-sassa hover:border-gold transition flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-sassa bg-slate-100 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gold-dark" />
                </div>
                <h3 className="text-lg font-bold text-ink group-hover:text-gold-dark transition">{grant.label}</h3>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
