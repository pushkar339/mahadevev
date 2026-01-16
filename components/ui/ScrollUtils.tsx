import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useInView,
  animate
} from "framer-motion";

// --- VELOCITY MARQUEE ---

interface VelocityMarqueeProps {
  children: string;
  baseVelocity: number;
  className?: string;
}

export const VelocityMarquee: React.FC<VelocityMarqueeProps> = ({ children, baseVelocity = 100, className }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // We wrap the position to create infinite scroll effect.
  // Assuming the content is duplicated enough to cover the screen.
  // The % range depends on how many times we repeat the text.
  // For 4 repetitions, we wrap between 0% and -25%.
  const x = useTransform(baseX, (v) => `${wrap(0, -25, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Switch direction based on scroll direction
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className={`flex flex-nowrap gap-8 ${className}`} style={{ x }}>
        {/* Repeat 4 times to ensure coverage for wrap logic */}
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
      </motion.div>
    </div>
  );
};

// Helper for wrapping
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};


// --- COUNT UP ANIMATION ---

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export const CountUp: React.FC<CountUpProps> = ({ value, suffix = "", prefix = "", decimals = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (inView && ref.current) {
      const node = ref.current;
      const controls = animate(0, value, {
        duration: 2,
        ease: [0.22, 1, 0.36, 1], // Custom cubic bezier
        onUpdate: (latest) => {
          node.textContent = prefix + latest.toFixed(decimals) + suffix;
        }
      });
      return () => controls.stop();
    }
  }, [inView, value, suffix, prefix, decimals]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
};
