import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE.name}.`,
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-warm-white pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-heading text-3xl sm:text-4xl text-bark font-bold mb-8">Privacy Policy</h1>
          <div className="space-y-6 font-body text-muted text-sm leading-relaxed">
            <p>Last updated: June 2026. {SITE.name} ("{SITE.name}", "we", "our") is committed to protecting your privacy.</p>
            <div><h2 className="font-heading text-lg text-bark font-bold mb-2">Information We Collect</h2><p>We collect information you provide when requesting a quote or contacting us: name, email, phone, business information. We also collect standard web analytics data.</p></div>
            <div><h2 className="font-heading text-lg text-bark font-bold mb-2">How We Use Your Information</h2><p>To prepare insurance quotes, respond to inquiries, and improve our services. We do not sell your personal information to third parties.</p></div>
            <div><h2 className="font-heading text-lg text-bark font-bold mb-2">Cookies</h2><p>We use cookies for analytics and to improve your browsing experience. You can disable cookies in your browser settings.</p></div>
            <div><h2 className="font-heading text-lg text-bark font-bold mb-2">Contact</h2><p>Questions? Email <a href={`mailto:${SITE.email}`} className="text-forest-green">{SITE.email}</a> or call <a href={SITE.phoneHref} className="text-forest-green">{SITE.phone}</a>.</p></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
