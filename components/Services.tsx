import React from 'react';
import { SpotlightCard } from './ui/SpotlightCard';
import { Wrench, ShoppingBag, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Services: React.FC = () => {
  const { t } = useLanguage();

  const icons = [
    <ShoppingBag className="w-6 h-6 text-zinc-900" />,
    <Wrench className="w-6 h-6 text-zinc-900" />,
    <Settings className="w-6 h-6 text-zinc-900" />
  ];

  return (
    <section id="services" className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:20px_20px] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-500 uppercase tracking-widest">
            What we do
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-zinc-900">
            {t.services.title}
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
            {t.services.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.services.items.map((service, idx) => (
            <SpotlightCard key={idx} className="p-8 h-full flex flex-col justify-between bg-white border border-zinc-200 shadow-sm hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-300 hover:-translate-y-2 group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center mb-6 border border-zinc-100 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {icons[idx]}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3 transition-colors duration-300 group-hover:text-zinc-700">{service.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed mb-6 transition-colors duration-300 group-hover:text-zinc-500">{service.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {service.badges.map((badge, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-zinc-50 text-zinc-600 border border-zinc-200 transition-all duration-300 hover:bg-zinc-100 hover:scale-105">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};