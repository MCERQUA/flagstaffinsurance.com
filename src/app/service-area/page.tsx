import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, CheckCircle, Phone } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Area — Insurance Across Flagstaff, Coconino County & Northern Arizona",
  description:
    "Flagstaff Insurance serves Flagstaff, Sedona, Williams, Winslow, Holbrook, Prescott, Kingman, Show Low, and all of Northern Arizona. Free quotes for auto, home, business, renters, and life insurance.",
};

const CITIES = [
  { city: "Flagstaff", county: "Coconino", note: "Home base — serving all neighborhoods and ZIP codes" },
  { city: "Sedona", county: "Coconino / Yavapai", note: "Red Rock area home, vacation rental & auto specialists" },
  { city: "Williams", county: "Coconino", note: "Small business, ranch & Route 66 corridor coverage" },
  { city: "Page", county: "Coconino", note: "Lake Powell area auto, boat & home coverage" },
  { city: "Winslow", county: "Navajo", note: "Commercial, agricultural & residential coverage" },
  { city: "Holbrook", county: "Navajo", note: "Route 66 business insurance & personal lines" },
  { city: "Prescott", county: "Yavapai", note: "Retirement & residential coverage specialists" },
  { city: "Camp Verde", county: "Yavapai", note: "Ranch, agricultural & Verde Valley coverage" },
  { city: "Cottonwood", county: "Yavapai", note: "Verde Valley residential & business coverage" },
  { city: "Kingman", county: "Mohave", note: "Auto & business insurance along I-40" },
  { city: "Show Low", county: "Navajo", note: "White Mountains vacation home & cabin coverage" },
  { city: "Pinetop-Lakeside", county: "Navajo", note: "Seasonal property & cabin insurance specialists" },
];

const LINES = [
  "Auto Insurance",
  "Homeowners Insurance",
  "Renters Insurance",
  "Business / Commercial Insurance",
  "Life Insurance",
  "Umbrella Insurance",
];

export default function ServiceAreaPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-forest-green pt-24 pb-16">
          <div className="container-xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-5">
                <MapPin className="w-4 h-4 text-ember-orange" />
                <span className="font-body text-sm font-bold text-white">Northern Arizona Coverage Area</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl text-white font-bold mb-4 leading-tight">
                Serving Flagstaff, Coconino County<br className="hidden sm:block" /> & All of Northern Arizona
              </h1>
              <p className="font-body text-white/80 text-lg max-w-2xl leading-relaxed">
                As an independent agency licensed in all 50 states, we serve clients throughout Northern Arizona — from Flagstaff to Sedona, Williams to Winslow, and everywhere in between.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="section-pad bg-warm-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <FadeIn>
                  <h2 className="font-heading text-3xl text-bark font-bold mb-4">
                    Cities & Communities We Serve
                  </h2>
                  <p className="font-body text-muted mb-8 leading-relaxed">
                    Our clients span Coconino County and neighboring Yavapai and Navajo counties. Whether you&apos;re a Flagstaff homeowner, a Sedona vacation rental owner, a Williams small business, or a Show Low cabin owner — we can find the right coverage for your situation.
                  </p>
                </FadeIn>
                <div className="space-y-3">
                  {CITIES.map((c, i) => (
                    <FadeIn key={c.city} delay={i * 0.04}>
                      <div className="flex items-start gap-3 bg-white rounded-xl border border-border p-4">
                        <MapPin className="w-5 h-5 text-forest-green mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-body font-bold text-bark text-sm">
                            {c.city}, AZ{" "}
                            <span className="text-muted font-normal">— {c.county} County</span>
                          </p>
                          <p className="font-body text-xs text-muted mt-0.5">{c.note}</p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <FadeIn direction="left">
                  <div className="bg-white rounded-2xl border border-border p-8">
                    <h3 className="font-heading text-xl text-bark font-bold mb-5">
                      Insurance Lines Available Statewide
                    </h3>
                    <div className="space-y-3">
                      {LINES.map((line) => (
                        <div key={line} className="flex items-center gap-2.5">
                          <CheckCircle className="w-5 h-5 text-forest-green flex-shrink-0" />
                          <span className="font-body text-sm text-bark">{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
                <FadeIn direction="left" delay={0.05}>
                  <div className="bg-forest-green rounded-2xl p-8">
                    <h3 className="font-heading text-lg text-white font-bold mb-3">
                      Get a Quote in Your Area
                    </h3>
                    <p className="font-body text-white/70 text-sm mb-5 leading-relaxed">
                      No matter where you are in Northern Arizona, we compare rates from 12+ carriers to find you the best coverage for your needs.
                    </p>
                    <div className="space-y-3">
                      <Link
                        href="/quote"
                        className="block w-full bg-ember-orange text-white text-center px-5 py-3 rounded-lg font-body font-bold text-sm hover:bg-ember-orange-dark transition-colors"
                      >
                        Get a Free Quote
                      </Link>
                      <a
                        href={SITE.phoneHref}
                        className="flex items-center justify-center gap-2 text-white font-body text-sm font-bold hover:text-white/80 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {SITE.phone}
                      </a>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad bg-white">
          <div className="container-xl max-w-3xl">
            <FadeIn>
              <h2 className="font-heading text-3xl text-bark font-bold mb-8">
                Northern Arizona Insurance Considerations
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="font-heading text-xl text-bark font-bold mb-3">
                    Flagstaff&apos;s Unique Risk Profile
                  </h3>
                  <p className="font-body text-muted leading-relaxed">
                    At 6,900 feet elevation, Flagstaff faces risks that set it apart from the rest of Arizona — 100+ inches of annual snowfall, wildland-urban interface (WUI) wildfire exposure, active elk collision zones on US-89 and I-40, and mountain driving hazards. These factors influence which carriers actively write in the market, what rates look like, and which endorsements Flagstaff homeowners and drivers need.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl text-bark font-bold mb-3">
                    Sedona Vacation Rentals & Second Homes
                  </h3>
                  <p className="font-body text-muted leading-relaxed">
                    Sedona&apos;s popularity creates a large short-term rental market. Standard homeowners policies typically exclude vacation rental activity — landlord policies or vacation rental endorsements are usually required. We help Sedona property owners identify the right coverage for their specific rental structure, whether it&apos;s a primary residence rented occasionally or a dedicated investment property.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl text-bark font-bold mb-3">
                    White Mountains Cabin Owners
                  </h3>
                  <p className="font-body text-muted leading-relaxed">
                    Show Low, Pinetop-Lakeside, and surrounding communities attract Flagstaff and Phoenix residents seeking summer cabins. Seasonal vacancy periods affect homeowners insurance underwriting — standard policies may exclude or limit coverage for homes unoccupied for 30+ days. We work with carriers comfortable writing seasonal and vacation home policies in the White Mountains.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl text-bark font-bold mb-3">
                    Route 66 Corridor Businesses
                  </h3>
                  <p className="font-body text-muted leading-relaxed">
                    From Kingman through Winslow to Flagstaff, Route 66 supports a unique mix of motels, restaurants, tourist shops, and small businesses with seasonal revenue patterns. Whether you need a BOP for a roadside diner, commercial property for a Route 66 inn, or liquor liability for a bar, we understand the specific coverage needs of Northern Arizona&apos;s tourism-driven businesses.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
