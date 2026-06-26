import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Phone } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CTABand } from "@/components/sections/CTABand";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE, CREDENTIALS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Flagstaff Insurance",
  description: `${SITE.name} — specialized insurance for flagstaff businesses since ${SITE.founded}. Licensed in all 50 states, A.M. Best A+ rated carriers.`,
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-forest-green pt-24 pb-16">
          <div className="container-xl">
            <FadeIn>
              <h1 className="font-heading text-4xl sm:text-5xl text-white font-bold mb-4">About Flagstaff Insurance</h1>
              <p className="font-body text-white/80 text-lg max-w-2xl">Specialists in flagstaff business insurance since 2005.</p>
            </FadeIn>
          </div>
        </section>

        <section className="section-pad bg-warm-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <FadeIn>
                  <h2 className="font-heading text-3xl sm:text-4xl text-bark font-bold mb-6">Insurance Built for the Flagstaff Trade</h2>
                  <div className="space-y-4 font-body text-muted text-base leading-relaxed">
                    <p>Flagstaff Insurance is a specialty division of Contractors Choice Agency, an insurance agency founded in 2005 and dedicated to serving construction contractors and tradespeople.</p>
                    <p>We've specialized in flagstaff business insurance long enough to know the nuances that matter: the difference between code 5645 and 5403, why completed operations is non-negotiable for structural trades, and what GCs are actually looking for in a certificate beyond the boilerplate.</p>
                    <p>Our approach is straightforward: understand your operation, shop specialty markets that price flagstaff risk fairly, and provide the certificates and service a working flagstaff crew actually needs.</p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {CREDENTIALS.map((c) => (
                      <div key={c} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-forest-green flex-shrink-0" />
                        <span className="font-body text-sm text-bark">{c}</span>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>

              <FadeIn direction="left">
                <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl">
                  <Image src="/images/about-agent.jpg" alt="Professional insurance agent" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container-xl">
            <FadeIn>
              <div className="bg-forest-green-50 border border-forest-green/20 rounded-2xl p-8 md:p-12 text-center">
                <h2 className="font-heading text-2xl sm:text-3xl text-bark font-bold mb-4">Ready to Get Your Flagstaff Operation Insured?</h2>
                <p className="font-body text-muted mb-8 max-w-xl mx-auto">Same-day quotes for flagstaff businesses. Call or fill out our quote form and we'll have your options ready today.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/quote" className="inline-flex items-center justify-center gap-2 bg-ember-orange text-white px-7 py-3.5 rounded-lg font-body font-bold hover:bg-ember-orange-dark transition-colors">
                    Get a Free Quote
                  </Link>
                  <a href={SITE.phoneHref} className="inline-flex items-center justify-center gap-2 border-2 border-forest-green text-forest-green px-7 py-3.5 rounded-lg font-body font-bold hover:bg-forest-green hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />{SITE.phone}
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />
    </>
  );
}
