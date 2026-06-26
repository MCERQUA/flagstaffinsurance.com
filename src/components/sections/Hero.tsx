import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";
import { SITE } from "@/lib/site";
import { FadeIn } from "@/components/animations/FadeIn";

const HIGHLIGHTS = [
  "Same-day quote turnaround",
  "Licensed all 50 states",
  "Serving Flagstaff since 2005",
];

export function Hero() {
  return (
    <section className="relative bg-warm-white pt-24 pb-0 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-forest-green-50 opacity-40 -skew-x-6 translate-x-20" />
      <div className="container-xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh] pb-12">
          <div className="py-12">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-ember-orange/10 border border-ember-orange/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-ember-orange rounded-full" />
                <span className="font-body text-sm font-bold text-ember-orange">Serving Flagstaff &amp; Northern Arizona</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-bark font-bold leading-tight mb-6">
                Insurance for the{" "}
                <span className="text-forest-green">People of Flagstaff</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="font-body text-lg text-muted leading-relaxed mb-8 max-w-lg">
                Auto, home, renters, life, and business coverage — all under one roof. We shop 12+ carriers to find the right protection for Flagstaff families, homeowners, and local businesses. Same-day quotes, competitive rates.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 bg-ember-orange text-white px-7 py-3.5 rounded-lg font-body font-bold text-base hover:bg-ember-orange-dark transition-colors"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center justify-center gap-2 border-2 border-forest-green text-forest-green px-7 py-3.5 rounded-lg font-body font-bold text-base hover:bg-forest-green hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {SITE.phone}
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-3">
                {HIGHLIGHTS.map((h) => (
                  <div key={h} className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-forest-green flex-shrink-0" />
                    <span className="font-body text-sm text-bark">{h}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.1} direction="left" className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/hero-flagstaff.jpg"
              alt="Professional flagstaff crew at construction site"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bark/30 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg">
              <p className="font-body text-xs text-muted mb-1">Most Popular Bundle</p>
              <p className="font-heading font-bold text-bark text-sm">Auto + Home + Umbrella Package</p>
              <p className="font-body text-xs text-forest-green font-bold mt-1">Compare rates from 12+ carriers</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
