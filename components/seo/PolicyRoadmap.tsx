import { Award, DollarSign, ShieldAlert, RefreshCw } from "lucide-react";

export default function PolicyRoadmap() {
  return (
    <div className="space-y-6">

      {/* Policy Tab */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-surface-dim rounded-3xl p-6 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-accent-light/20 flex items-center justify-center text-accent-dark">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-ink">1. Double-Layer E-E-A-T Blueprint</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">Google enforces strict YMYL criteria for government assistance guidelines.</p>
          <ul className="space-y-2 text-xs text-surface0">
            <li className="flex items-start gap-1.5"><span className="w-1 h-1 rounded-full bg-accent mt-1.5"></span><span><strong>Author Byline Verification</strong>: Every article is reviewed by a registered South African social consultant.</span></li>
            <li className="flex items-start gap-1.5"><span className="w-1 h-1 rounded-full bg-accent mt-1.5"></span><span><strong>Government Link Citation</strong>: Direct outbound links to relevant DSD government gazettes.</span></li>
          </ul>
        </div>
        <div className="bg-white border border-surface-dim rounded-3xl p-6 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center text-accent-dark">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-ink">2. AdSense & User UX Compliance</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">To pass AdSense audits without manual policy violations:</p>
          <ul className="space-y-2 text-xs text-surface0">
            <li className="flex items-start gap-1.5"><span className="w-1 h-1 rounded-full bg-amber mt-1.5"></span><span><strong>Ad Density Caps</strong>: Ads take up less than 30% of vertical screen height.</span></li>
            <li className="flex items-start gap-1.5"><span className="w-1 h-1 rounded-full bg-amber mt-1.5"></span><span><strong>No Deceptive CTAs</strong>: Interactive tools have distinct borders separate from ad blocks.</span></li>
          </ul>
        </div>
        <div className="bg-white border border-surface-dim rounded-3xl p-6 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-trading-down/10 flex items-center justify-center text-trading-down">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-ink">3. Spam & Thin Content Defense</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">Programmatic portals can risk penalties due to automatic page duplication.</p>
          <ul className="space-y-2 text-xs text-surface0">
            <li className="flex items-start gap-1.5"><span className="w-1 h-1 rounded-full bg-trading-down mt-1.5"></span><span><strong>No Low-Value AI Templates</strong>: Every status explanation includes unique troubleshooting steps.</span></li>
            <li className="flex items-start gap-1.5"><span className="w-1 h-1 rounded-full bg-trading-down mt-1.5"></span><span><strong>Client-Side Aggregation</strong>: Uses client-side filter trees to group local content.</span></li>
          </ul>
        </div>
      </div>

      {/* Roadmap Tab */}
      <div className="bg-white border border-surface-dim rounded-3xl p-6 shadow-xs space-y-6">
        <div>
          <h3 className="text-sm font-extrabold text-ink flex items-center gap-1.5">
            <RefreshCw className="w-4.5 h-4.5 text-accent-dark" />
            Topical Authority & Content Rollout Timeline
          </h3>
          <p className="text-xs text-outline font-mono mt-0.5">A 4-phase program to systematically build and sustain SEO dominance</p>
        </div>
        <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-dim">
          {[
            { phase: "Phase 1: Foundation (Weeks 1-4)", focus: "Launch Primary Pillars", action: "Publish Payment Centre, complete primary grant guides, index core schemas.", kpi: "Gain indexing status for primary search terms." },
            { phase: "Phase 2: Semantic Expansion (Weeks 5-8)", focus: "Status Codes & ITSAA Appeal Silos", action: "Generate 24 supporting articles mapping status codes.", kpi: "Establish first page positions on long-tail statuses." },
            { phase: "Phase 3: Interactive Superiority (Weeks 9-12)", focus: "Launch 8 Diagnostic Tools", action: "Connect eligibility checker, child support expiry, and appeal calculator.", kpi: "Double CTR using rich snippet FAQs." },
            { phase: "Phase 4: Hyper-Local Dominance (Weeks 13+)", focus: "Office Finder & Regional Guides", action: "Generate localized province-by-province hubs.", kpi: "Establish absolute domain dominance for SASSA queries." }
          ].map((step, idx) => (
            <div key={idx} className="relative pl-8 space-y-1.5">
              <div className="absolute left-1.5 top-1 w-4 h-4 rounded-full bg-accent-dark border-4 border-white shadow-xs"></div>
              <span className="text-xs font-mono font-bold text-accent-dark uppercase block">{step.phase}</span>
              <h4 className="text-xs font-extrabold text-ink">{step.focus}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">{step.action}</p>
              <div className="text-xs bg-surface rounded-lg p-2 max-w-xl font-mono text-surface0 border border-surface-dim"><strong>Target KPI:</strong> {step.kpi}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
