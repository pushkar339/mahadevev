import React from 'react';
import { SpotlightCard } from './ui/SpotlightCard';
import { Battery, Wind, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Features: React.FC = () => {
  const { t } = useLanguage();

  const icons = [
    <Battery className="w-6 h-6 text-zinc-900" />,
    <Wind className="w-6 h-6 text-zinc-900" />,
    <ShieldCheck className="w-6 h-6 text-zinc-900" />
  ];

  return (
    <section id="features" className="py-24 px-4 bg-zinc-50 border-t border-zinc-200 relative overflow-hidden">
      {/* Decorative Diagonal Pattern */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#e4e4e7_0px,#e4e4e7_1px,transparent_1px,transparent_16px)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-zinc-900">
              {t.features.heading}
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-light">
              {t.features.sub}
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.features.items.map((feature, idx) => (
            <SpotlightCard key={idx} className="p-8 h-full flex flex-col justify-between bg-white shadow-sm border border-zinc-200">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center mb-6 border border-zinc-200">
                    {icons[idx]}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-500 leading-relaxed text-sm mb-6">
                    {feature.desc}
                  </p>
                </div>
                <div className="h-1 w-12 bg-zinc-900 rounded-full mt-auto opacity-10" />
            </SpotlightCard>
          ))}
        </div>


      </div>
    </section>
  );
};