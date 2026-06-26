"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/site";
import { FadeIn } from "@/components/animations/FadeIn";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-pad bg-white">
      <div className="container-xl">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="font-body text-sm font-bold text-ember-orange uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-bark font-bold mb-4">Common Questions</h2>
          </div>
        </FadeIn>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <div className="border border-border rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left bg-warm-white hover:bg-forest-green-50 transition-colors"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-body font-bold text-bark text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-forest-green flex-shrink-0 transition-transform duration-200 ${
                      open === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {open === i && (
                  <div className="px-5 pb-5 bg-white">
                    <p className="font-body text-sm text-muted leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
