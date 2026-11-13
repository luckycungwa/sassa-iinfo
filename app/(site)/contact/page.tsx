import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Mail, ExternalLink, MapPin } from "lucide-react";
import { contactPageSchema, webpageSchema, breadcrumbSchema } from "@/lib/json-ld";

export const metadata = pageMetadata({
  title: "Contact Us | SASSA Grant Hub",
  description:
    "Contact the SASSA Grant Hub team about corrections or content questions. For official SASSA services, use srd.sassa.gov.za or your nearest office.",
  path: "/contact",
  absoluteTitle: true,
});

export default function ContactPage() {
  const pageSchema = webpageSchema("Contact Us | SASSA Grant Hub", "Contact the SASSA Grant Hub team. Official SASSA services at srd.sassa.gov.za.", "/contact");
  const contactSchema = contactPageSchema();
  const breadcrumb = breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <section className="bg-yellow py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-accent-foreground/70 uppercase tracking-widest mb-3">contact</p>
          <h1 className="text-[40px] md:text-[57px] font-black text-accent-foreground leading-[1.15] tracking-[-0.007em]">
            Get in touch
          </h1>
          <p className="text-[21px] text-accent-foreground/85 mt-4 max-w-xl leading-relaxed">
            Corrections, content questions and site feedback are welcome — use the email address below.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-[29px] font-black text-carbon leading-[1.1] tracking-[-0.007em]">Website inquiries</h2>
              <p className="text-base text-body leading-relaxed mt-4">
                This contact page is for inquiries about the SASSA Grant Hub website itself — content suggestions,
                corrections, technical issues, or general questions about our resource.
              </p>
              <p className="text-base text-body leading-relaxed mt-3">
                For official SASSA services — checking your grant status, applying for grants, updating personal
                details, or lodging appeals — please use the official SASSA channels listed on this page.
              </p>
              <div className="space-y-2 mt-6">
                <a href="mailto:44tagstudios@gmail.com" className="flex items-center gap-4 card p-4 hover:bg-yellow/30 transition group">
                  <Mail className="w-5 h-5 text-violet shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-carbon">Email the editor</p>
                    <p className="text-xs text-ash">44tagstudios@gmail.com</p>
                  </div>
                </a>
              </div>
              <p className="text-xs text-ash mt-3">
                We aim to acknowledge a specific factual correction within two working days.
              </p>
              <div className="card p-5 mt-6">
                <p className="text-sm text-body italic">
                  <strong>Note:</strong> We cannot process or assist with individual grant applications, status checks,
                  or appeals. Those must be handled through official SASSA channels.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-[21px] font-black text-carbon tracking-[-0.007em]">Official SASSA services</h2>
              <div className="space-y-2">
                <a href="https://srd.sassa.gov.za" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 card p-4 hover:bg-yellow/30 transition group">
                  <ExternalLink className="w-5 h-5 text-violet shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-carbon">SRD Grant Portal</p>
                    <p className="text-xs text-ash">srd.sassa.gov.za</p>
                  </div>
                </a>
                <a href="https://srd.dsd.gov.za" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 card p-4 hover:bg-yellow/30 transition group">
                  <ExternalLink className="w-5 h-5 text-violet shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-carbon">Appeal Portal</p>
                    <p className="text-xs text-ash">srd.dsd.gov.za</p>
                  </div>
                </a>
                <Link href="/offices" className="flex items-center gap-4 card p-4 hover:bg-yellow/30 transition group">
                  <MapPin className="w-5 h-5 text-violet shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-carbon">SASSA Office Finder</p>
                    <p className="text-xs text-ash">Find your nearest SASSA office</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[19px] leading-relaxed max-w-2xl mx-auto">
            <Link href="/" className="text-accent font-bold hover:underline">Return to homepage</Link>
            <span className="text-white/30 mx-3">|</span>
            <Link href="/about" className="text-accent font-bold hover:underline">About this guide</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
