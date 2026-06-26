import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

const REASONS = [
  { title: "Independent Agency — We Work for You", desc: "We're not tied to one company. We shop your coverage across 40+ carriers to find the best combination of price and protection for your specific situation." },
  { title: "Personal &amp; Commercial Lines", desc: "From auto and home for Flagstaff families to GL, workers comp, and commercial property for local businesses — we cover it all under one roof." },
  { title: "Same-Day Quotes &amp; Binding", desc: "Need coverage fast? We can quote, bind, and issue certificates the same day — whether it's a renters policy or a business package." },
  { title: "Serving All of Northern Arizona", desc: "Whether you're in Flagstaff, Sedona, Williams, Winslow, or anywhere in between — we cover families and businesses across the region." },
  { title: "Founded in 2005", desc: "20+ years serving Northern Arizona. We know the local risks — wildfire exposure, mountain weather, and the Flagstaff market — and which carriers deliver." },
  { title: "Claims Advocacy", desc: "When a claim happens, we're in your corner — not hiding behind carrier call centers. Direct advocate support for every client." },
];

export function WhyChooseUs() {
  return (
    <section className="section-pad bg-warm-white">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/flagstaff-structure.jpg"
                alt="Flagstaff contractor structure"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-forest-green/20 to-transparent" />
            </div>
          </FadeIn>

          <div>
            <FadeIn>
              <p className="font-body text-sm font-bold text-ember-orange uppercase tracking-widest mb-3">Why Choose Us</p>
              <h2 className="font-heading text-3xl sm:text-4xl text-bark font-bold mb-4">
                Why Flagstaff Families &amp; Businesses Choose Us
              </h2>
              <p className="font-body text-muted leading-relaxed mb-8">
                We're a local independent agency that shops your coverage across 40+ carriers. Whether you need home, auto, renters, life, or business insurance — we find the right fit at the right price for people of Northern Arizona.
              </p>
            </FadeIn>

            <div className="space-y-5">
              {REASONS.map((r, i) => (
                <FadeIn key={r.title} delay={i * 0.05}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-forest-green rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="font-body font-bold text-bark text-sm mb-0.5">{r.title}</p>
                      <p className="font-body text-sm text-muted leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
