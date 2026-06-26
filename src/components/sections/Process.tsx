import { ClipboardList, Search, CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

const STEPS = [
  { icon: ClipboardList, step: "01", title: "Tell Us About Your Operation", desc: "Answer a few quick questions about your crew size, revenue, states worked, and coverage history." },
  { icon: Search, step: "02", title: "Review Your Quote", desc: "We shop specialty markets and present competitive options — GL, WC, tools, auto, and bundle discounts." },
  { icon: CheckCircle, step: "03", title: "Get Insured Today", desc: "Bind coverage and receive your certificates same-day. Certificates issued immediately after binding." },
];

export function Process() {
  return (
    <section className="section-pad bg-white">
      <div className="container-xl">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="font-body text-sm font-bold text-ember-orange uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-bark font-bold mb-4">Get Insured in 3 Simple Steps</h2>
            <p className="font-body text-muted max-w-xl mx-auto">
              From initial quote to bound coverage — our process is designed for busy contractors who don't have time to waste.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s, i) => (
            <FadeIn key={s.step} delay={i * 0.1}>
              <div className="relative text-center">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-border" />
                )}
                <div className="relative w-20 h-20 bg-forest-green-50 border-2 border-forest-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <s.icon className="w-8 h-8 text-forest-green" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-ember-orange text-white text-xs font-bold rounded-full flex items-center justify-center font-body">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-bark text-lg mb-3">{s.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
