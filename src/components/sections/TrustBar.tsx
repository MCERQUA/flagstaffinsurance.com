import { Shield, Award, MapPin, Clock, Users } from "lucide-react";

const ITEMS = [
  { icon: Shield, text: "A.M. Best A+ Carriers" },
  { icon: Award, text: "Founded 2005" },
  { icon: MapPin, text: "Serving Northern Arizona" },
  { icon: Clock, text: "Same-Day Quotes" },
  { icon: Users, text: "Flagstaff Specialists" },
];

export function TrustBar() {
  return (
    <section className="bg-forest-green py-4">
      <div className="container-xl">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {ITEMS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-ember-orange flex-shrink-0" />
              <span className="font-body text-sm font-bold text-white whitespace-nowrap">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
