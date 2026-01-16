import React, { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-light';
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon = false, className, ...props }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  const baseStyles = "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300";
  
  // Spotlight gradient overlay
  const SpotlightOverlay = () => (
    <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{ 
            opacity,
            background: `radial-gradient(100px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.15), transparent 100%)`
        }} 
    />
  );

  const DarkSpotlightOverlay = () => (
     <div 
         className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0 rounded-full"
         style={{ 
             opacity,
             background: `radial-gradient(120px circle at ${position.x}px ${position.y}px, rgba(0,0,0,0.05), transparent 100%)`
         }} 
     />
   );

  if (variant === 'primary') {
    return (
      <button 
        ref={btnRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${baseStyles} group ${className}`} 
        {...props}
      >
        {/* Border Spin */}
        <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f4f4f5_0%,#000000_50%,#f4f4f5_100%)] opacity-20" />
        
        {/* Button Content */}
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-colors group-hover:bg-zinc-900 relative overflow-hidden">
          <SpotlightOverlay />
          <span className="relative z-20 flex items-center">
             {children}
             {icon && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
          </span>
        </span>
      </button>
    );
  }

  if (variant === 'outline-light') {
      return (
        <button 
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative inline-flex h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 text-sm font-medium text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-md overflow-hidden ${className}`} 
            {...props}
        >
          <SpotlightOverlay />
          <span className="relative z-20">{children}</span>
        </button>
      );
  }

  // Secondary / Outline default (Dark text on light background)
  return (
    <button 
        ref={btnRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-8 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-200 overflow-hidden ${className}`} 
        {...props}
    >
      <DarkSpotlightOverlay />
      <span className="relative z-20">{children}</span>
    </button>
  );
};