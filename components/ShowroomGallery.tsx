import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  "/gallery/crown_all_colors.jpeg",
  "/gallery/IMG_20260114_132235_285.jpg",
  "/gallery/IMG_20260114_132414_228.jpg",
  "/gallery/IMG_20260114_132445_471.jpg",
  "/gallery/IMG_20260114_132456_356.jpg",
  "/gallery/IMG_20260114_132556_279.jpg",
  "/gallery/IMG_20260114_132557_570.jpg",
  "/gallery/IMG_20260114_132619_031.jpg",
  "/gallery/IMG_20260114_132714_290.jpg",
  "/gallery/IMG_20260114_132715_477.jpg",
  "/gallery/IMG_20260114_132733_315.jpg",
  "/gallery/IMG_20260114_132743_302.jpg",
  "/gallery/IMG_20260114_133001_941.jpg",
  "/gallery/IMG_20260114_133056_994.jpg",
  "/gallery/IMG_20260114_134103_705.jpg",
  "/gallery/IMG-20260116-WA0005.jpg",
  "/gallery/IMG-20260116-WA0007.jpg",
  "/gallery/IMG-20260116-WA0008.jpg",
  "/gallery/IMG-20260116-WA0009.jpg",
  "/gallery/IMG-20260116-WA0010.jpg",
  "/gallery/IMG-20260116-WA0011.jpg",
  "/gallery/IMG-20260116-WA0012.jpg",
  "/gallery/IMG-20260116-WA0013.jpg",
  "/gallery/IMG-20260116-WA0014.jpg",
  "/gallery/IMG-20260116-WA0015.jpg"
];

export const ShowroomGallery: React.FC = () => {
  const { t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Split images into rows for horizontal scrolling
  const rows = [];
  const imagesPerRow = 5;
  for (let i = 0; i < images.length; i += imagesPerRow) {
    rows.push(images.slice(i, i + imagesPerRow));
  }

  const openModal = (globalIndex: number) => {
    setSelectedImageIndex(globalIndex);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImageIndex === null) return;
    
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImageIndex]);

  return (
    <section className="bg-zinc-950 py-12 md:py-16 border-t border-zinc-900 overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* 
           Improved Animation Logic: 
           We duplicate the content 4 times.
           We slide by -25% (the width of 1 set).
           This guarantees a seamless loop with no gaps.
        */
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        /* Apply animation to the track, not the container */
        .track-scroll-left {
          animation: scrollLeft 30s linear infinite;
        }
        .track-scroll-right {
          animation: scrollRight 30s linear infinite;
        }
        
        /* Pause on hover for better UX */
        .hover-pause:hover .track-scroll-left,
        .hover-pause:hover .track-scroll-right {
          animation-play-state: paused;
        }

        .delay-0 { animation-delay: 0ms; }
        .delay-50 { animation-delay: 50ms; }
        .delay-100 { animation-delay: 100ms; }
        .delay-150 { animation-delay: 150ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-250 { animation-delay: 250ms; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
         <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tighter mb-3">
             {t.gallery.title1} <span className="text-zinc-500">{t.gallery.title2}</span>
         </h2>
         <p className="text-zinc-500 max-w-xl mx-auto text-sm md:text-base">{t.gallery.sub}</p>
      </div>

      <div className="space-y-4 md:space-y-6 w-full">
        {rows.map((rowImages, rowIndex) => (
          // Hover pause wrapper
          <div key={rowIndex} className="hover-pause w-full relative">
            {/* 
               Viewport with gradient mask to fade edges.
               This hides the entry/exit points and looks very premium.
            */}
            <div className="w-full overflow-hidden mask-gradient">
              {/* 
                  The Moving Track 
                  - width: max-content ensures it doesn't wrap
                  - We use padding-right (pr-2) on items instead of gap to ensure 
                    mathematically perfect loops when translateX(-25%) runs.
              */}
              <div 
                className={`flex w-max ${rowIndex % 2 === 0 ? 'track-scroll-left' : 'track-scroll-right'}`}
              >
                {/* 
                   Duplicate the set 4 times. 
                   With 5 images per row, 4 sets = 20 images total.
                   This covers ~4000px width, enough for 4K screens without gaps.
                */}
                {[...rowImages, ...rowImages, ...rowImages, ...rowImages].map((src, i) => {
                  // Calculate original index to ensure modal opens correct image
                  // i % rowImages.length gives us 0..4
                  const originalIndexInRow = i % rowImages.length;
                  const globalIndex = (rowIndex * imagesPerRow) + originalIndexInRow;
                  
                  return (
                    <div
                      key={`${rowIndex}-${i}`}
                      // Use padding instead of gap for perfect math
                      className="pr-2 md:pr-3 flex-shrink-0" 
                    >
                      <div 
                        className={`w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 overflow-hidden rounded-lg bg-zinc-900 animate-fade-in-up cursor-pointer relative group`}
                        style={{ animationDelay: `${(originalIndexInRow * 50)}ms` }}
                        onClick={() => openModal(globalIndex)}
                      >
                        <img
                          src={src}
                          alt={`Gallery ${globalIndex + 1}`}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal - Unchanged logic, just ensure z-index is high enough */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-2 md:p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div className="relative w-full h-full max-w-7xl max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={images[selectedImageIndex]} 
              alt={`Gallery ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full w-auto h-auto object-contain shadow-2xl"
              style={{ maxWidth: '95vw', maxHeight: '90vh' }}
            />
            
            <button 
              onClick={closeModal}
              className="absolute top-2 right-2 md:top-4 md:right-4 bg-zinc-900/80 hover:bg-zinc-800 text-white p-2 md:p-3 rounded-full transition-all border border-zinc-800"
            >
              <X size={20} className="md:w-6 md:h-6" />
            </button>
            
            <button 
              onClick={prevImage}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-zinc-800 text-white p-2 md:p-3 rounded-full transition-all border border-zinc-800"
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-zinc-800 text-white p-2 md:p-3 rounded-full transition-all border border-zinc-800"
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900/80 text-white px-4 py-2 rounded-full text-xs md:text-sm border border-zinc-800">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};