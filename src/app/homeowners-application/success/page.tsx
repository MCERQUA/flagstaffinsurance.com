import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE } from "@/lib/site";
import { CheckCircle, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Application Received",
  description: "Your homeowners insurance application has been received.",
  robots: { index: false, follow: true },
};

export default function HomeownersApplicationSuccessPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="section-pad bg-warm-white pt-32">
          <div className="container-xl">
            <FadeIn className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl border border-border p-10 md:p-12 text-center">
                <CheckCircle className="w-14 h-14 text-forest-green mx-auto mb-4" />
                <h1 className="font-heading text-2xl md:text-3xl text-bark font-bold mb-3">
                  Application received
                </h1>
                <p className="font-body text-muted mb-2">
                  Thank you. Your homeowners insurance application is in and a licensed agent will
                  review it and reach out within one business day.
                </p>
                <p className="font-body text-sm text-muted">
                  Need it sooner, or want to add documents? Reach us directly:
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-4 font-body text-sm">
                  <a
                    href={SITE.phoneHref}
                    className="inline-flex items-center gap-2 text-forest-green font-bold hover:underline"
                  >
                    <Phone className="w-4 h-4" /> {SITE.phone}
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="inline-flex items-center gap-2 text-forest-green font-bold hover:underline"
                  >
                    <Mail className="w-4 h-4" /> {SITE.email}
                  </a>
                </div>
                <Link
                  href="/"
                  className="mt-7 inline-flex items-center justify-center bg-ember-orange text-white px-6 py-3 rounded-lg font-body font-bold hover:bg-ember-orange-dark transition-colors"
                >
                  Back to home
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
