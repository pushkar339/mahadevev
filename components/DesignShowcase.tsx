import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const DesignShowcase: React.FC = () => {
  const { t } = useLanguage();

  const images = [
      "./assets/crown_rider.png",
      "./assets/precision.png",
      "./assets/night.png",
      "./assets/freedom.png"
  ];

  return (
    <section className="py-24 bg-zinc-50 relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
             <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase mb-4 block">Aesthetics</span>
             <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-zinc-900">
                {t.design.title}
             </h2>
             <p className="text-lg text-zinc-500 font-light">
                {t.design.sub}
             </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.design.cards.map((card, i) => (
                <div key={i} className="group relative overflow-hidden rounded-none border border-zinc-200 bg-zinc-100 aspect-[4/3] shadow-sm">
                    <img 
                        src={images[i]} 
                        alt={card.title} 
                        className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <div className="h-0.5 w-12 bg-white mb-4 transition-all duration-300 group-hover:w-20" />
                        <h3 className="text-3xl font-bold text-white mb-2">
                            {card.title}
                        </h3>
                        <p className="text-zinc-300 text-sm tracking-wide uppercase">
                            {card.subtitle}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};