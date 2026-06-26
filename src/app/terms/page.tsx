import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${SITE.name}.`,
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-warm-white pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-heading text-3xl sm:text-4xl text-bark font-bold mb-8">Terms of Service</h1>
          <div className="space-y-6 font-body text-muted text-sm leading-relaxed">
            <p>Last updated: June 2026. By using {SITE.url}, you agree to these terms.</p>
            <div><h2 className="font-heading text-lg text-bark font-bold mb-2">No Coverage Guarantee</h2><p>Information on this site is for educational purposes only and does not constitute an insurance policy or guarantee of coverage. Coverage is subject to policy terms and carrier approval.</p></div>
            <div><h2 className="font-heading text-lg text-bark font-bold mb-2">Licensing</h2><p>{SITE.name} operates under NPN #{SITE.npn}. Serving Northern Arizona.</p></div>
            <div><h2 className="font-heading text-lg text-bark font-bold mb-2">Limitation of Liability</h2><p>We are not liable for damages arising from use of this website. All insurance decisions should be made with guidance from a licensed insurance professional.</p></div>
            <div><h2 className="font-heading text-lg text-bark font-bold mb-2">Contact</h2><p><a href={`mailto:${SITE.email}`} className="text-forest-green">{SITE.email}</a> | <a href={SITE.phoneHref} className="text-forest-green">{SITE.phone}</a></p></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
