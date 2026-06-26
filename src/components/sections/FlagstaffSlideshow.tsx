"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/images/flagstaff/san-francisco-peaks.jpg",
    alt: "San Francisco Peaks — Flagstaff's iconic volcanic mountain range",
    caption: "San Francisco Peaks",
  },
  {
    src: "/images/flagstaff/lowell-observatory.jpg",
    alt: "Clear dark skies above Flagstaff — home of Lowell Observatory",
    caption: "Lowell Observatory & Dark Sky Country",
  },
  {
    src: "/images/flagstaff/flagstaff-forest.jpg",
    alt: "Ponderosa pine forest surrounding Flagstaff, Arizona",
    caption: "Ponderosa Pine Country",
  },
  {
    src: "/images/flagstaff/route-66.jpg",
    alt: "Historic Route 66 through Northern Arizona",
    caption: "Historic Route 66",
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
                <span className="text-white font-heading font-semibold text-lg drop-shadow">
                  {slide.caption}
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
