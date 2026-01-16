import React from 'react';
import { Button } from './ui/Button';
import { useLanguage } from '../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden text-center px-4">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('/assets/main_image.png')] bg-cover bg-center bg-no-repeat"
        style={{ filter: 'blur(2px)' }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Since 2020 – HERO TOP RIGHT (text only) */}
      <div className="absolute right-6 top-[88px] z-30">
        <span className="text-xs uppercase tracking-[0.35em] text-white/80">
          Since 2020
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-2">
        
        {/* Tag */}
        <div className="mb-6 flex justify-center">
          <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs tracking-widest text-white/80 backdrop-blur">
            {t.hero.tag}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-6 leading-none">
          <span className="block text-4xl sm:text-5xl md:text-7xl xl:text-9xl font-extrabold uppercase bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            {t.hero.title1}
          </span>
          <span className="block mt-2 text-4xl sm:text-5xl md:text-7xl xl:text-9xl font-extrabold uppercase bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            {t.hero.title2}
          </span>
        </h1>

        {/* Tagline */}
        <div className="text-xl sm:text-3xl font-bold tracking-[0.35em] text-white/75 uppercase mb-6">
          {t.hero.tagline}
        </div>

        {/* Subtext */}
        <p className="max-w-xl mx-auto text-base sm:text-lg text-white/70 mb-8">
          {t.hero.sub}
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#models">
            <Button icon>{t.hero.btnPrimary}</Button>
          </a>
          <a href="#services">
            <Button variant="outline-light">{t.hero.btnSecondary}</Button>
          </a>
        </div>
      </div>
    </div>
  );
};
