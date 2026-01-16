import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Proof: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="proof" className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
          
          <div className="flex-1">
             <h3 className="text-2xl font-bold mb-6 text-zinc-900">{t.proof.title}</h3>
             <p className="text-zinc-600 mb-8 leading-relaxed text-xl font-light italic">
               {t.proof.quote}
             </p>
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-zinc-200" />
               <div>
                 <p className="text-base font-semibold text-zinc-900">Alex Chen</p>
                 <p className="text-sm text-zinc-500">{t.proof.role}</p>
               </div>
             </div>
          </div>

          <div className="flex-1 w-full">
            <div className="grid grid-cols-3 gap-6">
               <div className="text-center p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="text-3xl font-bold text-zinc-900 mb-1">12k+</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">{t.proof.stats[0]}</div>
               </div>
               <div className="text-center p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="text-3xl font-bold text-zinc-900 mb-1">2.4M</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">{t.proof.stats[1]}</div>
               </div>
               <div className="text-center p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="text-3xl font-bold text-zinc-900 mb-1">450t</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">{t.proof.stats[2]}</div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};