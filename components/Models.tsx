import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/Button';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ModelCardProps {
  model: {
    name: string;
    desc: string;
    specs: string[];
    priceLabel: string;
    btn: string;
  };
  staticData: {
    id: string;
    price: string;
    images: string[];
  };
}

const ModelCard: React.FC<ModelCardProps> = ({ model, staticData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % staticData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + staticData.images.length) % staticData.images.length);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white border border-zinc-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-zinc-200/50 flex-shrink-0 w-full max-w-xs sm:w-80 snap-start hover:-translate-y-1">
      <div className="aspect-square w-full overflow-hidden bg-zinc-100 relative">
        <img 
          src={staticData.images[currentImageIndex]} 
          alt={model.name} 
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <button 
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 touch-manipulation"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 touch-manipulation"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="p-6 md:p-8">
        <div className="mb-4 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-zinc-900">{model.name}</h3>
            <span className="text-xl font-semibold text-zinc-900">{staticData.price}</span>
        </div>
        
        <p className="mb-6 text-sm text-zinc-500 leading-relaxed">{model.desc}</p>
        
        <div className="mb-8 grid grid-cols-2 gap-y-2 gap-x-4">
          {model.specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-2 text-zinc-600">
              <Check size={14} className="text-black" />
              <span className="text-xs font-medium">{spec}</span>
            </div>
          ))}
        </div>

        <a href="#contact" className="block">
          <Button className="w-full">{model.btn}</Button>
        </a>
      </div>
    </div>
  );
};

export const Models: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const staticModelData = [
    {
      id: "01",
      price: "₹52,500",
      images: [
        "/vehicle_models/active_pro/active_pro_front.png",
        "/vehicle_models/active_pro/active_pro_back.png",
        "/vehicle_models/active_pro/active_pro_leftView.png",
        "/vehicle_models/active_pro/active_pro_RightView.png"
      ]
    },
    {
      id: "02",
      price: "₹54,500",
      images: [
        "/vehicle_models/bmw_pro/bmw_pro_front.png",
        "/vehicle_models/bmw_pro/bmw_pro_back.png",
        "/vehicle_models/bmw_pro/bmw_pro_leftView.png",
        "/vehicle_models/bmw_pro/bmw_pro_right.png"
      ]
    },
    {
      id: "03",
      price: "₹55,500",
      images: [
        "/vehicle_models/Crown/crown_front.png",
        "/vehicle_models/Crown/crown_back.png",
        "/vehicle_models/Crown/crown_leftView.png",
        "/vehicle_models/Crown/crown_rightView.png"
      ]
    },
    {
      id: "04",
      price: "₹40,000",
      images: [
        "/vehicle_models/duel_pro/duel_pro_front.png",
        "/vehicle_models/duel_pro/duel_pro_back.png",
        "/vehicle_models/duel_pro/duel_pro_leftView.png",
        "/vehicle_models/duel_pro/duel_pro_rightView.png"
      ]
    },
    {
      id: "05",
      price: "₹35,000",
      images: [
        "/vehicle_models/sports_one/sports_one_front.png",
        "/vehicle_models/sports_one/sports_one_backView.png",
        "/vehicle_models/sports_one/sports_one_leftView.png",
        "/vehicle_models/sports_one/sports_one_rightView.png"
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="models" className="py-24 px-4 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-6xl mx-auto">
        <div className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
           <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-zinc-900">
             {t.models.heading1}{t.models.heading2}
           </h2>
           <p className="text-zinc-500 max-w-2xl mx-auto">
             {t.models.sub}
           </p>
        </div>

        <div className={`flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {t.models.items.map((model, idx) => (
             <ModelCard 
                key={idx} 
                model={model} 
                staticData={staticModelData[idx]} 
             />
          ))}
        </div>
      </div>
    </section>
  );
};