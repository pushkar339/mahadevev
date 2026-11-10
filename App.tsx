import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Models } from './components/Models';
import { Services } from './components/Services';
import { DesignShowcase } from './components/DesignShowcase';
import { ShowroomGallery } from './components/ShowroomGallery';
import { TechSpecs } from './components/TechSpecs';
import { Proof } from './components/Proof';
import { CTA } from './components/CTA';
import { Comments } from './components/Comments';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  useEffect(() => {
    if (window.location.hash !== '#comments') return;

    const scrollToComments = () => {
      document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const frame = window.requestAnimationFrame(scrollToComments);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white text-zinc-950 selection:bg-zinc-200 selection:text-black">
        {/* Since 2020 Badge */}
        <div className="fixed top-4 right-4 z-50 bg-zinc-900 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
          since-2020
        </div>
        <Header />
        <main>
          <Hero />
          <Services />
          <Features />
          <DesignShowcase />
          <Models />
          <TechSpecs />
          <div id="gallery">
            <ShowroomGallery />
          </div>
          <Proof />
          <Comments />
          <CTA />
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;
