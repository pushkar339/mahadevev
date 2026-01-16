import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue, useSpring } from 'framer-motion';

interface FloatingCubeProps {
  x?: string | number;
  y?: string | number;
  z?: number;
  size?: number;
  delay?: number;
  rotationSpeed?: number;
  scrollSpeed?: number;
  opacity?: number;
}

export const FloatingCube: React.FC<FloatingCubeProps> = ({ 
  x = '10%', 
  y = '20%', 
  z = 0,
  size = 60, 
  delay = 0, 
  rotationSpeed = 1,
  scrollSpeed = 1,
  opacity = 0.2
}) => {
  const { scrollY } = useScroll();
  
  // Create rotation based on scroll
  const rotateX = useTransform(scrollY, [0, 2000], [0, 360 * rotationSpeed]);
  const rotateY = useTransform(scrollY, [0, 2000], [0, 180 * rotationSpeed]);
  
  // Parallax movement
  const moveY = useTransform(scrollY, [0, 2000], [0, -300 * scrollSpeed]);

  const half = size / 2;
  // Wireframe style: Minimalist, tech-focused
  const faceStyle = "absolute inset-0 border border-zinc-400/40 bg-white/5 backdrop-blur-[0px]";

  return (
    <motion.div
        style={{
            left: x,
            top: y,
            width: size,
            height: size,
            rotateX,
            rotateY,
            y: moveY,
            z: z,
            opacity: opacity,
        }}
        className="absolute preserve-3d pointer-events-none z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: opacity, scale: 1 }}
        transition={{ duration: 1.5, delay, ease: "easeOut" }}
    >
        {/* CSS 3D Cube Construction */}
        <div className={faceStyle} style={{ transform: `translateZ(${half}px)` }} />
        <div className={faceStyle} style={{ transform: `rotateY(180deg) translateZ(${half}px)` }} />
        <div className={faceStyle} style={{ transform: `rotateY(90deg) translateZ(${half}px)` }} />
        <div className={faceStyle} style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }} />
        <div className={faceStyle} style={{ transform: `rotateX(90deg) translateZ(${half}px)` }} />
        <div className={faceStyle} style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }} />
    </motion.div>
  );
};

export const FloatingGrid: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => {
    return (
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
            <div 
                className="absolute inset-0" 
                style={{ 
                    backgroundImage: `linear-gradient(to right, #000000 ${opacity}, transparent 1px), linear-gradient(to bottom, #000000 ${opacity}, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                }} 
            />
        </div>
    )
}

interface ParallaxRingProps {
  width?: number;
  height?: number;
  delay?: number;
  opacity?: number;
  x?: string;
  y?: string;
  rotateSpeed?: number;
  color?: string;
  thickness?: number;
}

export const ParallaxRing: React.FC<ParallaxRingProps> = ({ 
  width = 300, 
  height = 300, 
  delay = 0, 
  opacity = 0.1, 
  x = '0%', 
  y = '0%', 
  rotateSpeed = 1,
  color = "border-zinc-900",
  thickness = 1
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 180 * rotateSpeed]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360 * rotateSpeed]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 90 * rotateSpeed]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
  const translateY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        width, 
        height, 
        left: x, 
        top: y,
        rotateX, 
        rotateY,
        rotateZ,
        scale,
        y: translateY,
        opacity
      }}
      className={`absolute ${color} rounded-full pointer-events-none z-0`}
      // Dynamic border width via inline style as Tailwind utility might not be precise enough for 1px vs 2px logic sometimes
      // but strictly using class is better. using border-[thickness]px if custom, otherwise use default
      initial={{ opacity: 0 }}
      whileInView={{ opacity }}
      transition={{ duration: 1, delay }}
    >
       <div className={`w-full h-full rounded-full border border-inherit`} style={{ borderWidth: thickness }} />
       {/* Optional inner ring for more complexity */}
       <div className={`absolute top-[15%] left-[15%] right-[15%] bottom-[15%] rounded-full border border-inherit opacity-50`} style={{ borderWidth: Math.max(1, thickness - 1) }} />
    </motion.div>
  );
};

export const GeometricScatter: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <ParallaxRing width={400} height={400} x="-5%" y="10%" rotateSpeed={0.5} opacity={0.03} thickness={1} />
            <ParallaxRing width={250} height={250} x="85%" y="50%" rotateSpeed={1.2} opacity={0.04} thickness={1} />
            <ParallaxRing width={500} height={500} x="30%" y="80%" rotateSpeed={0.3} opacity={0.02} thickness={2} />
        </div>
    )
}

export const ScrollProgressLine: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed left-0 top-0 bottom-0 w-1 z-50 bg-zinc-200/50 hidden md:block"
      style={{ scaleY, transformOrigin: "top" }}
    >
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent" />
    </motion.div>
  );
};

// --- NEW COMPONENT: Persistent 3D decoration visible globally ---
const PersistentWireframeCube: React.FC<{ size?: number; x?: string; y?: string; rotateSpeed?: number }> = ({ size = 100, x = '10%', y = '10%', rotateSpeed = 1 }) => {
    const { scrollY } = useScroll();
    
    // Continuous rotation based on absolute scroll value
    const rotateX = useTransform(scrollY, [0, 5000], [0, 360 * rotateSpeed]);
    const rotateY = useTransform(scrollY, [0, 5000], [0, 180 * rotateSpeed]);
    
    // Gentle bobbing effect
    const bob = useTransform(scrollY, (v) => Math.sin(v / 400) * 30);

    const half = size / 2;
    // Increased transparency slightly for better background blending
    const faceStyle = "absolute inset-0 border border-white/30 bg-transparent";

    return (
        <motion.div
            style={{
                left: x,
                top: y,
                width: size,
                height: size,
                rotateX,
                rotateY,
                y: bob,
            }}
            className="absolute preserve-3d"
        >
            <div className={faceStyle} style={{ transform: `translateZ(${half}px)` }} />
            <div className={faceStyle} style={{ transform: `rotateY(180deg) translateZ(${half}px)` }} />
            <div className={faceStyle} style={{ transform: `rotateY(90deg) translateZ(${half}px)` }} />
            <div className={faceStyle} style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }} />
            <div className={faceStyle} style={{ transform: `rotateX(90deg) translateZ(${half}px)` }} />
            <div className={faceStyle} style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }} />
        </motion.div>
    );
};

export const GlobalScrollDecoration: React.FC = () => {
    const { scrollY } = useScroll();
    
    const rotateRing = useTransform(scrollY, [0, 5000], [0, 360]);
    const rotateRingReverse = useTransform(scrollY, [0, 5000], [0, -180]);
    
    return (
        // Changed z-index from 60 to 1 to sit behind content (which is usually z-10+)
        // Reduced opacity to 0.3 to be less intrusive
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden mix-blend-difference opacity-30">
            {/* Top Right Cluster */}
            <PersistentWireframeCube size={120} x="88vw" y="15vh" rotateSpeed={0.5} />
            <PersistentWireframeCube size={60} x="82vw" y="25vh" rotateSpeed={0.8} />

            {/* Bottom Left Cluster */}
            <PersistentWireframeCube size={80} x="8vw" y="75vh" rotateSpeed={-0.3} />

            {/* Middle Floating */}
            <PersistentWireframeCube size={40} x="45vw" y="90vh" rotateSpeed={1} />
            
            {/* Large Geometric Rings */}
            <motion.div 
                style={{ rotate: rotateRing }}
                className="absolute top-[-10vh] right-[-10vw] w-[50vh] h-[50vh] border border-zinc-500/30 rounded-[40%]"
            />
            <motion.div 
                style={{ rotate: rotateRingReverse }}
                className="absolute top-[10vh] right-[-5vw] w-[30vh] h-[30vh] border border-zinc-500/30 rounded-[35%]"
            />
             <motion.div 
                style={{ rotate: rotateRingReverse }}
                className="absolute bottom-[-10vh] left-[-5vw] w-[60vh] h-[60vh] border border-zinc-500/30 rounded-full border-dashed"
            />
        </div>
    );
};