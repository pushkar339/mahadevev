import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const TechSpecs: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
                <div className="text-blue-500 font-mono text-xs mb-2 tracking-widest">SYSTEM ARCHITECTURE</div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Technical Specifications</h2>
            </div>
            <p className="text-zinc-500 max-w-xs text-sm text-right">Engineering breakdown of the Veloce platform.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {t.techSpecs.items.map((spec, i) => (
                <div key={i} className="flex flex-col border-l border-white/10 pl-6 relative group">
                    <div className="absolute left-[-1px] top-0 h-0 w-[1px] bg-blue-500 transition-all duration-500 group-hover:h-full" />
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">{spec.category}</span>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{spec.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{spec.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};