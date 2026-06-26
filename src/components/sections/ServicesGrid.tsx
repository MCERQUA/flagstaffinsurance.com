import Link from "next/link";
import { Shield, HardHat, Wrench, Truck, CheckCircle, FileText, Umbrella, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/site";
import { FadeIn } from "@/components/animations/FadeIn";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, HardHat, Wrench, Truck, CheckCircle, FileText, Umbrella,
};

export function ServicesGrid() {
  return (
    <section className="section-pad bg-white">
      <div className="container-xl">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="font-body text-sm font-bold text-ember-orange uppercase tracking-widest mb-3">Coverage Options</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-bark font-bold mb-4">Coverage for Every Stage of Life in Flagstaff</h2>
            <p className="font-body text-muted max-w-2xl mx-auto">
              Personal lines for families, renters, and homeowners — commercial coverage for Flagstaff businesses. One independent agency, 40+ carriers, same-day service.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Shield;
            return (
              <FadeIn key={service.slug} delay={i * 0.05}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block bg-warm-white border border-border rounded-xl p-6 hover:border-forest-green hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-forest-green rounded-xl flex items-center justify-center mb-4 group-hover:bg-ember-orange transition-colors">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-bark text-base mb-2 leading-snug">{service.title}</h3>
                  <p className="font-body text-sm text-muted leading-relaxed mb-4">{service.short}</p>
                  <div className="flex items-center gap-1 text-forest-green group-hover:text-ember-orange transition-colors">
                    <span className="font-body text-xs font-bold">Learn more</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
