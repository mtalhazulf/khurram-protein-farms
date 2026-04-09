import { Egg, Truck, ShieldCheck, Award, Leaf, Package } from "lucide-react";
import type { Service } from "@/types";

const iconMap: Record<string, typeof Egg> = {
  egg: Egg,
  truck: Truck,
  "shield-check": ShieldCheck,
  award: Award,
  leaf: Leaf,
  package: Package,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon_name ?? ""] ?? Egg;

  return (
    <article className="bg-white border border-kp-green-100 rounded-2xl p-8 hover:shadow-lg hover:border-kp-gold-500/40 transition-all duration-300 group">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-kp-green-100 text-kp-green-800 mb-6 group-hover:bg-kp-gold-500 group-hover:text-kp-green-900 transition-colors">
        <Icon className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <h3 className="font-serif text-xl text-kp-green-900 mb-3">
        {service.title}
      </h3>
      <p className="text-sm text-kp-black/70 leading-relaxed">
        {service.description}
      </p>
    </article>
  );
}
