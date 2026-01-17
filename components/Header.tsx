import React, { useState } from 'react';
import { Zap, Phone, Menu, X } from 'lucide-react';
import { Button } from './ui/Button';
import { useLanguage } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-4 backdrop-blur-md border-b border-zinc-200 bg-white/90">
      
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white">
          <Zap size={20} fill="currentColor" />
        </div>
        <span className="text-sm md:text-xl font-bold tracking-tight text-zinc-900 uppercase">
          {t.header.brand}
        </span>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <a href="#services" className="nav-link">{t.header.services}</a>
        <a href="#models" className="nav-link">{t.header.scooters}</a>
        <a href="#gallery" className="nav-link">{t.header.gallery}</a>
        <a href="#contact" className="nav-link">{t.header.contact}</a>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 text-zinc-900"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop CTA */}
      <div className="hidden md:flex items-center">
        <a href="#contact">
          <Button variant="secondary" className="h-9 px-4 text-xs gap-2">
            <Phone size={14} />
            <span>{t.header.call}</span>
          </Button>
        </a>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-zinc-200 md:hidden transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col py-4">
          <a href="#services" className="mobile-link">{t.header.services}</a>
          <a href="#models" className="mobile-link">{t.header.scooters}</a>
          <a href="#gallery" className="mobile-link">{t.header.gallery}</a>
          <a href="#contact" className="mobile-link border-t mt-2 pt-4">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>{t.header.call}</span>
            </div>
          </a>
        </nav>
      </div>
    </header>
  );
};
