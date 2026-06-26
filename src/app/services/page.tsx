import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, HardHat, Wrench, Truck, CheckCircle, FileText, Umbrella } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CTABand } from "@/components/sections/CTABand";
import { FadeIn } from "@/components/animations/FadeIn";
import { SERVICES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Flagstaff Business Insurance Services",
  description: `Complete insurance coverage for flagstaff businesses — GL, workers comp, tools & equipment, commercial auto, completed operations, surety bonds, and umbrella. ${SITE.statesLicensed}.`,
};

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, HardHat, Wrench, Truck, CheckCircle, FileText, Umbrella,
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-forest-green pt-24 pb-16">
          <div className="container-xl">
            <FadeIn>
              <p className="font-body text-sm font-bold text-ember-orange uppercase tracking-widest mb-3">Coverage Options</p>
              <h1 className="font-heading text-4xl sm:text-5xl text-white font-bold mb-4">Flagstaff Business Insurance</h1>
              <p className="font-body text-white/80 text-lg max-w-2xl">
                Every policy a flagstaff business needs — in one place, from specialists who know the trade.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="section-pad bg-warm-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {SERVICES.map((service, i) => {
                const Icon = ICONS[service.icon] ?? Shield;
                return (
                  <FadeIn key={service.slug} delay={i * 0.05}>
                    <div className="bg-white rounded-2xl border border-border p-7 h-full flex flex-col hover:border-forest-green hover:shadow-md transition-all">
                      <div className="w-12 h-12 bg-forest-green rounded-xl flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="font-heading font-bold text-bark text-xl mb-3">{service.title}</h2>
                      <p className="font-body text-sm text-muted leading-relaxed mb-4 flex-1">{service.description}</p>
                      <ul className="space-y-1.5 mb-6">
                        {service.coverages.slice(0, 4).map((c) => (
                          <li key={c} className="flex items-center gap-2 font-body text-xs text-bark">
                            <span className="w-1.5 h-1.5 bg-ember-orange rounded-full flex-shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-forest-green font-body font-bold text-sm hover:text-ember-orange transition-colors"
                      >
                        Full coverage details <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />
    </>
  );
}
