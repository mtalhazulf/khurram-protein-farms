import { Calendar, Users, Egg, MapPin } from "lucide-react";

const stats = [
  { icon: Calendar, value: "40+", label: "Years in Business" },
  { icon: Users, value: "500+", label: "Business Clients" },
  { icon: Egg, value: "10,000+", label: "Daily Eggs Delivered" },
  { icon: MapPin, value: "50+", label: "Delivery Locations" },
];

export function StatsBar() {
  return (
    <section className="bg-kp-green-900 text-white py-14 md:py-18 relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M0 0h1v1H0z'/%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center group cursor-default"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-kp-gold-500/15 text-kp-gold-400 mb-3 transition-all duration-300 group-hover:bg-kp-gold-500/25 group-hover:scale-110">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <p className="font-serif text-3xl md:text-4xl text-white mb-1 transition-colors duration-200 group-hover:text-kp-gold-400">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-white/55 transition-colors duration-200 group-hover:text-white/75">
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
