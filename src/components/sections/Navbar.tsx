"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-forest-green rounded-md flex items-center justify-center">
              <span className="text-white font-heading font-bold text-sm">FI</span>
            </div>
            <span className="font-heading font-bold text-bark text-lg leading-tight">
              Flagstaff<span className="text-forest-green">Insurance</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm font-bold text-bark hover:text-forest-green transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-1.5 font-body text-sm font-bold text-forest-green hover:text-forest-green-dark transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {SITE.phone}
            </a>
            <Link
              href="/quote"
              className="bg-ember-orange text-white px-4 py-2 rounded-lg font-body text-sm font-bold hover:bg-ember-orange-dark transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-bark"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block font-body font-bold text-bark hover:text-forest-green py-1"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/quote"
            className="block bg-ember-orange text-white text-center px-4 py-2.5 rounded-lg font-body font-bold"
            onClick={() => setOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
