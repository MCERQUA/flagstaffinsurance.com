"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Photographs of the actual Flagstaff landmarks, sourced from Wikimedia Commons.
// Each alt describes what is IN the frame; each credit names the photographer and licence.
// The previous four files were mislabelled stock: "san-francisco-peaks.jpg" was a man in a
// workshop, "lowell-observatory.jpg" a generic Milky Way, "flagstaff-forest.jpg" alpine peaks
// above a cloud sea, "route-66.jpg" a red apple. Do not swap these for stock again.
const slides = [
  {
    src: "/images/flagstaff/san-francisco-peaks.jpg",
    alt: "The snow-capped San Francisco Peaks rising above juniper high desert north of Flagstaff, Arizona",
    caption: "San Francisco Peaks",
    credit: "Bernard Gagnon / Wikimedia Commons, CC BY-SA 3.0",
  },
  {
    src: "/images/flagstaff/lowell-observatory.jpg",
    alt: "The open dome of Lowell Observatory in Flagstaff with the historic Clark refracting telescope inside",
    caption: "Lowell Observatory",
    credit: "Mukhtiaraliunar / Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    src: "/images/flagstaff/route-66.jpg",
    alt: "A large Flagstaff Route 66 highway shield sign mounted on a brick wall downtown",
    caption: "Historic Route 66",
    credit: "Marine 69-71 / Wikimedia Commons, public domain",
  },
  {
    src: "/images/flagstaff/downtown-flagstaff.jpg",
    alt: "Downtown Flagstaff at dusk, with lit storefronts and the Hotel Monte Vista sign along the street",
    caption: "Downtown Flagstaff",
    credit: "Deborah Lee Soltesz / Wikimedia Commons, CC0",
  },
];

export function FlagstaffSlideshow() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section className="py-16 bg-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-bark mb-3">
            Proudly Serving <span className="text-forest-green">Flagstaff</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            We live and work in this community. From the Peaks to Route 66, Flagstaff is home.
          </p>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl shadow-xl"
          style={{ aspectRatio: "16/7" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === current ? 1 : 0 }}
              aria-hidden={i !== current}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="(max-width: 1200px) 100vw, 1152px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-16">
                <span className="text-white font-heading font-semibold text-lg drop-shadow block">
                  {slide.caption}
                </span>
                <span className="text-white/70 text-[11px] drop-shadow block mt-0.5">
                  {slide.credit}
                </span>
              </div>
            </div>
          ))}

          {/* Prev / Next */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-bark rounded-full p-2 shadow transition"
            aria-label="Previous photo"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-bark rounded-full p-2 shadow transition"
            aria-label="Next photo"
          >
            <ChevronRight size={22} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-white scale-125" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
