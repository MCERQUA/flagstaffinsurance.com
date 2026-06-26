import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { FadeIn } from "@/components/animations/FadeIn";

export function CTABand() {
  return (
    <section className="bg-forest-green py-20">
      <div className="container-xl text-center">
        <FadeIn>
          <h2 className="font-heading text-3xl sm:text-4xl text-white font-bold mb-4">
            Ready to Protect What Matters Most?
          </h2>
          <p className="font-body text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Get a free quote in minutes. Home, auto, renters, life, and business insurance — we shop 12+ carriers for the people of Flagstaff and surrounding areas. Over 20 years of local service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 bg-ember-orange text-white px-8 py-4 rounded-lg font-body font-bold text-base hover:bg-ember-orange-dark transition-colors"
            >
              Get Your Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white px-8 py-4 rounded-lg font-body font-bold text-base hover:bg-white/20 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {SITE.phone}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
