import React from 'react';
import { Phone, MapPin, Mail, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const CTA: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-zinc-50 border-t border-zinc-200 relative overflow-hidden">
       {/* Background decoration */}
       <div className="absolute inset-0 bg-[linear-gradient(#e4e4e7_1px,transparent_1px),linear-gradient(90deg,#e4e4e7_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_100%)] opacity-60 pointer-events-none" />

       <div className="max-w-6xl mx-auto px-4 relative z-10">
         <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
              {t.cta.title}
            </h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
              {t.cta.desc}
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm relative group overflow-hidden hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-1 h-full bg-zinc-900 transition-all duration-300 group-hover:w-2" />
                <div className="flex flex-col h-full items-start relative z-10">
                    <div className="mb-4 text-zinc-900 p-3 bg-zinc-50 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <MapPin size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 mb-4 transition-colors duration-300 group-hover:text-zinc-700">{t.cta.showroom}</h3>
                    <div className="text-zinc-600 mb-6 flex-grow transition-colors duration-300 group-hover:text-zinc-500">
                        <p>{t.cta.address[0]}</p>
                        <p>{t.cta.address[1]}</p>
                        <p>{t.cta.address[2]}</p>
                    </div>
                    <a 
                      href="https://maps.app.goo.gl/V6yB94L2RF2nYXcbA" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-zinc-900 font-medium text-base transition-all duration-300 hover:translate-x-2 hover:text-zinc-700"
                    >
                        <img src="/assets/maps.jpg" alt="Maps" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                        {t.cta.directions} <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm relative group overflow-hidden hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-300 hover:-translate-y-1">
                 <div className="absolute top-0 left-0 w-1 h-full bg-zinc-900 transition-all duration-300 group-hover:w-2" />
                 <div className="flex flex-col h-full items-start relative z-10">
                     <div className="mb-4 text-zinc-900 p-3 bg-zinc-50 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Phone size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 mb-4 transition-colors duration-300 group-hover:text-zinc-700">{t.cta.contact}</h3>
                    <div className="space-y-4 w-full flex-grow mb-6">
                        <div className="flex flex-col transition-all duration-300 hover:scale-105">
                            <span className="text-xs text-zinc-400 uppercase font-semibold mb-1">{t.cta.sales}</span>
                            <span className="text-lg font-medium text-zinc-900 transition-colors duration-300 group-hover:text-zinc-700">9808124592</span>
                        </div>
                        <div className="flex flex-col transition-all duration-300 hover:scale-105">
                             <span className="text-xs text-zinc-400 uppercase font-semibold mb-1">{t.cta.email}</span>
                             <span className="text-lg text-zinc-600 transition-colors duration-300 group-hover:text-zinc-500">info@mahadevautomotives.com</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500 text-sm transition-colors duration-300 group-hover:text-zinc-400">
                        <Clock size={14} className="transition-transform duration-300 group-hover:scale-110" />
                        <span>{t.cta.hours}</span>
                    </div>
                </div>
            </div>
         </div>

         <footer className="text-center text-xs text-zinc-400 border-t border-zinc-200/50 pt-8 transition-all duration-300 hover:text-zinc-500">
           <p>{t.cta.footer}</p>
         </footer>
       </div>
    </section>
  );
};