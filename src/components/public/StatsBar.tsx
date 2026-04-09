import { Calendar, Users, Egg, MapPin } from "lucide-react";

const stats = [
  { icon: Calendar, value: "40+", label: "Years in Business" },
  { icon: Users, value: "500+", label: "Business Clients" },
  { icon: Egg, value: "10,000+", label: "Daily Eggs Delivered" },
  { icon: MapPin, value: "50+", label: "Delivery Locations" },
];

export function StatsBar() {
  return (
    <section className="bg-kp-green-900 text-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-kp-gold-500/15 text-kp-gold-400 mb-3">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <p className="font-serif text-3xl md:text-4xl text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
