import { ShieldCheck, Award, ThermometerSun, Recycle } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    title: "Quality Tested",
    desc: "Every batch monitored to meet agricultural standards",
  },
  {
    icon: Award,
    title: "HACCP Compliant",
    desc: "Following international food safety protocols",
  },
  {
    icon: ThermometerSun,
    title: "Cold Chain",
    desc: "Temperature-controlled storage and delivery",
  },
  {
    icon: Recycle,
    title: "Sustainable",
    desc: "Eco-friendly farming and packaging practices",
  },
];

export function QualityBadges() {
  return (
    <section className="bg-kp-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.title} className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-kp-gold-500/30 text-kp-gold-500 mb-4">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h4 className="font-serif text-sm md:text-base text-kp-green-900 mb-1">
                  {badge.title}
                </h4>
                <p className="text-xs text-kp-black/60 leading-relaxed">
                  {badge.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
