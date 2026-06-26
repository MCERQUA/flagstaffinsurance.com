import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site";
import { FadeIn } from "@/components/animations/FadeIn";

export function Testimonials() {
  return (
    <section className="section-pad bg-warm-white">
      <div className="container-xl">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="font-body text-sm font-bold text-ember-orange uppercase tracking-widest mb-3">Client Stories</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-bark font-bold mb-4">Flagstaff Businesses Who Trust Us</h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-border h-full flex flex-col">
                <Quote className="w-8 h-8 text-forest-green/30 mb-4" />
                <p className="font-body text-sm text-bark leading-relaxed flex-1 mb-6 italic">"{t.quote}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-body font-bold text-bark text-sm">{t.name}</p>
                  <p className="font-body text-xs text-muted">{t.role}</p>
                  <p className="font-body text-xs text-ember-orange">{t.location}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
