import type { Metadata } from "next";
import { Shield, Scale, FileText, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | SASSA Resource Platform",
  description: "South Africa's most complete independent SASSA resource centre. We exist to educate, explain, simplify, and guide beneficiaries through the social grant system.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent-light border border-border flex items-center justify-center flex-shrink-0">
          <Shield className="w-6 h-6 text-accent-dark" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">About Us</h1>
          <p className="text-sm text-muted mt-1">South Africa&rsquo;s Trusted Independent SASSA Resource Centre</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">Our Mission</h2>
        <p className="text-sm text-muted leading-relaxed">
          The SASSA Resource Platform exists to become South Africa&rsquo;s most complete, trustworthy, and genuinely useful independent SASSA knowledge base. We are not the official SASSA website. We are not a government portal. We are not a status-checking service. We are an independent educational and informational resource.
        </p>
        <p className="text-sm text-muted leading-relaxed">
          Every page on this platform is designed to answer a real beneficiary question. We exist to educate, explain, simplify, and guide. Whenever official actions are required, we direct users to the appropriate government service.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">What We Are Not</h2>
        <ul className="space-y-2">
          {[
            "The official SASSA website",
            "A government portal",
            "A status checking service",
            "An application portal",
            "A financial institution",
            "A news website",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">Our Standards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "Accuracy", desc: "All information is verified against official sources and clearly dated." },
            { title: "Clarity", desc: "Complex government processes are explained in plain, accessible language." },
            { title: "Completeness", desc: "Every page answers who, what, why, how, and what to do next." },
            { title: "Independence", desc: "We are not affiliated with SASSA or any government entity." },
            { title: "Transparency", desc: "We clearly mark what is confirmed, what may change, and when information was last reviewed." },
            { title: "User Safety", desc: "We never ask for ID numbers, banking details, or personal information." },
          ].map((item) => (
            <div key={item.title} className="bg-canvas border border-border rounded-lg p-4">
              <h3 className="text-xs font-bold text-ink mb-1">{item.title}</h3>
              <p className="text-xs text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">For Official Services</h2>
        <p className="text-sm text-muted leading-relaxed">
          If you need to check your grant status, apply for a grant, update your details, or submit an appeal, visit the official SASSA portal directly:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-sm text-muted">
            <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <span>SRD Portal: <a href="https://srd.sassa.gov.za" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">srd.sassa.gov.za</a></span>
          </li>
          <li className="flex items-start gap-2 text-sm text-muted">
            <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <span>Government Portal: <a href="https://www.gov.za" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">gov.za</a></span>
          </li>
        </ul>
      </div>
    </div>
  );
}
