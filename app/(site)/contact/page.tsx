import type { Metadata } from "next";
import { Mail, MapPin, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | SASSA Resource Platform",
  description: "Contact the SASSA Resource Platform team. For official SASSA services, visit srd.sassa.gov.za or your nearest SASSA office.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent-light border border-border flex items-center justify-center flex-shrink-0">
          <Mail className="w-6 h-6 text-accent-dark" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">Contact Us</h1>
          <p className="text-sm text-muted mt-1">Get in touch with the SASSA Resource Platform team</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">About This Contact Page</h2>
        <p className="text-sm text-muted leading-relaxed">
          This contact page is for inquiries about the SASSA Resource Platform website itself — content suggestions, corrections, technical issues, or general questions about our resource.
        </p>
        <p className="text-sm text-muted leading-relaxed">
          For official SASSA services — checking your grant status, applying for grants, updating personal details, or lodging appeals — please use the official SASSA channels listed below.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">Official SASSA Services</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-canvas border border-border rounded-lg p-4">
            <ExternalLink className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-ink">SRD Grant Portal</p>
              <a href="https://srd.sassa.gov.za" target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline">srd.sassa.gov.za</a>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-canvas border border-border rounded-lg p-4">
            <ExternalLink className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-ink">Appeal Portal</p>
              <a href="https://srd.dsd.gov.za" target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline">srd.dsd.gov.za</a>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-canvas border border-border rounded-lg p-4">
            <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-ink">SASSA Head Office</p>
              <p className="text-xs text-muted">Find your nearest SASSA office via our <a href="/offices" className="text-accent hover:underline">Office Finder</a></p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-ink">Website Inquiries</h2>
        <p className="text-sm text-muted leading-relaxed">
          For feedback, corrections, or content suggestions regarding this resource platform, please reach out to us.
        </p>
        <p className="text-sm text-muted italic">
          Note: We cannot process or assist with individual grant applications, status checks, or appeals. Those must be handled through official SASSA channels.
        </p>
      </div>
    </div>
  );
}
