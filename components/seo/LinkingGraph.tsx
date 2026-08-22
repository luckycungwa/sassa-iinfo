import { Network, CheckCircle2 } from "lucide-react";

export default function LinkingGraph() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-surface-dim rounded-3xl p-6 shadow-xs space-y-6">
        <div>
          <h3 className="text-sm font-extrabold text-ink flex items-center gap-1.5">
            <Network className="w-4.5 h-4.5 text-accent-dark" />
            Semantic Silo Internal Linking Simulator
          </h3>
          <p className="text-xs text-outline font-mono mt-0.5">How authority flows from the Parent Pillar down to child supporting nodes</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="p-4 bg-surface rounded-2xl border border-surface-dim text-center space-y-3">
            <span className="text-xs bg-ink text-white font-mono px-2 py-0.5 rounded-full font-bold">Pillar Node URL</span>
            <div className="p-3 bg-white border border-surface-container rounded-xl font-bold text-xs text-ink shadow-sm">
              /appeals-centre
              <span className="block text-xs font-mono text-accent-dark mt-1">ITSAA Appeal Hub</span>
            </div>
            <p className="text-xs text-surface0 leading-normal">Receives top-level brand links and redirects.</p>
            <div className="flex justify-center"><div className="w-0.5 h-8 bg-dashed bg-outline-variant"></div></div>
            <span className="text-xs font-mono text-accent-dark font-black block">&darr; Upwards-pointing breadcrumbs &darr;</span>
          </div>
          <div className="p-5 bg-gradient-to-r from-surface to-accent-light/20/50 rounded-2xl border border-dashed border-accent-light/60 space-y-4">
            <h4 className="text-xs font-bold text-ink text-center">Link Flow Rule Matrix</h4>
            <div className="space-y-2.5 text-xs text-muted-foreground">
              <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" /><p><strong>Upward Links</strong>: Every child page contains a canonical breadcrumb pointing back to the core pillar.</p></div>
              <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" /><p><strong>Lateral Silo Isolation</strong>: Child pages in the Appeals silo ONLY cross-link to relevant Status Meanings pages.</p></div>
              <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" /><p><strong>Tool Grounding</strong>: High-intent keywords link dynamically to interactive tools to maximize user stay-time.</p></div>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-xs text-outline font-mono font-bold uppercase tracking-wider block px-1">Supporting Child Nodes (Appeals Hub)</span>
            {[
              { slug: "/appeals/appeal-after-uif", label: "UIF Alternative Income", anchor: "SASSA UIF appeal guide" },
              { slug: "/appeals/appeal-after-nsfas", label: "NSFAS Decline Remedy", anchor: "NSFAS status appeal" },
              { slug: "/appeals/appeal-after-income-source", label: "Alternative Income Source", anchor: "appeal SASSA means test" },
              { slug: "/appeals/how-to-appeal", label: "Failed ID Verification", anchor: "ID mismatch appeal" }
            ].map((child, i) => (
              <div key={i} className="p-3 bg-white border border-surface-dim rounded-xl hover:border-outline-variant transition text-xs flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-ink block leading-tight">{child.label}</span>
                  <span className="text-xs font-mono text-outline">{child.slug}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-accent-light/20 text-accent-dark font-mono px-1.5 py-0.5 rounded-full block">Anchor: &ldquo;{child.anchor}&rdquo;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
