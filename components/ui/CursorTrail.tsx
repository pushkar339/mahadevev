import React, { useEffect, useRef } from 'react';

export const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    // Store history of mouse positions
    const trail: { x: number; y: number }[] = [];
    const trailLength = 20;

    // Mouse coordinates
    const mouse = { x: 0, y: 0 };
    let isActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isActive = true;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    resize();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update trail
      if (isActive) {
        trail.push({ x: mouse.x, y: mouse.y });
        if (trail.length > trailLength) {
          trail.shift();
        }
      }

      // Draw the line
      if (trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);

        for (let i = 1; i < trail.length; i++) {
           // Smooth curve using quadratic bezier
           const p0 = trail[i - 1];
           const p1 = trail[i];
           const midX = (p0.x + p1.x) / 2;
           const midY = (p0.y + p1.y) / 2;
           ctx.quadraticCurveTo(p0.x, p0.y, midX, midY);
        }
        
        ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Gradient stroke
        const gradient = ctx.createLinearGradient(
            trail[0].x, trail[0].y, 
            trail[trail.length - 1].x, trail[trail.length - 1].y
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)'); // Black trail
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[100] mix-blend-difference opacity-60" 
    />
  );
};