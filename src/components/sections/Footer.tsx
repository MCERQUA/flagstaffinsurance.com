import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE, SERVICES, NAV_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-bark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-forest-green rounded-md flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">FI</span>
              </div>
              <span className="font-heading font-bold text-white text-lg">
                Flagstaff<span className="text-ember-orange">Insurance</span>
              </span>
            </div>
            <p className="font-body text-sm text-white/70 leading-relaxed mb-4">
              Independent insurance agency serving Flagstaff and Northern Arizona since 2005.
            </p>
            <div className="space-y-2">
              <a href={SITE.phoneHref} className="flex items-center gap-2 font-body text-sm text-ember-orange hover:text-ember-orange-light transition-colors">
                <Phone className="w-4 h-4" />{SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 font-body text-sm text-white/70 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />{SITE.email}
              </a>
              <div className="flex items-start gap-2 font-body text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{SITE.address.street}, {SITE.address.city}, {SITE.address.state} {SITE.address.zip}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="font-body text-sm text-white/70 hover:text-ember-orange transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-sm text-white/70 hover:text-ember-orange transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li><Link href="/quote" className="font-body text-sm text-ember-orange hover:text-ember-orange-light transition-colors">Get a Quote</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-white mb-4">Ready to Get Insured?</h3>
            <p className="font-body text-sm text-white/70 mb-4">Same-day quotes for flagstaff businesses. Call or fill out our quick quote form.</p>
            <Link href="/quote" className="block w-full bg-ember-orange text-white text-center px-4 py-3 rounded-lg font-body font-bold text-sm hover:bg-ember-orange-dark transition-colors mb-3">
              Get a Free Quote
            </Link>
            <a href={SITE.phoneHref} className="block w-full text-center border border-white/30 text-white px-4 py-2.5 rounded-lg font-body text-sm hover:border-white/60 transition-colors">
              Call {SITE.phone}
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/50">
            © {new Date().getFullYear()} {SITE.name}. NPN #{SITE.npn}. Serving Northern Arizona.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="font-body text-xs text-white/50 hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="/terms" className="font-body text-xs text-white/50 hover:text-white/70 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
