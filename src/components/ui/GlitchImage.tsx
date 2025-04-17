
import { useEffect, useRef, ImgHTMLAttributes } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface GlitchImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  glitchIntensity?: 'low' | 'medium' | 'high';
  interval?: number;
}

const GlitchImage = ({ 
  src, 
  alt = "", 
  className = "", 
  glitchIntensity = 'medium', 
  interval = 5,
  ...props 
}: GlitchImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const intensityFactor = {
    low: 0.3,
    medium: 1,
    high: 2
  }[glitchIntensity];
  
  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;
    
    const container = containerRef.current;
    const image = imageRef.current;
    
    // Create glitch effect elements
    const createGlitchLayers = () => {
      // Clear previous layers if any
      const existingLayers = container.querySelectorAll('.glitch-layer');
      existingLayers.forEach(layer => layer.remove());
      
      // Create RGB shift layers
      const redLayer = document.createElement('div');
      const greenLayer = document.createElement('div');
      const blueLayer = document.createElement('div');
      
      [redLayer, greenLayer, blueLayer].forEach((layer, i) => {
        layer.className = 'glitch-layer absolute inset-0 overflow-hidden mix-blend-screen';
        layer.style.backgroundImage = `url(${src})`;
        layer.style.backgroundSize = 'cover';
        layer.style.backgroundPosition = 'center';
        
        if (i === 0) layer.style.filter = 'url(#redFilter)';
        if (i === 1) layer.style.filter = 'url(#greenFilter)';
        if (i === 2) layer.style.filter = 'url(#blueFilter)';
        
        container.appendChild(layer);
      });
      
      return [redLayer, greenLayer, blueLayer];
    };
    
    const layers = createGlitchLayers();
    
    // Set up glitch animation
    const timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: interval + Math.random() * 2,
    });
    
    const createGlitch = () => {
      timeline.clear();
      
      // Random number of glitch iterations
      const iterations = 2 + Math.floor(Math.random() * 3 * intensityFactor);
      
      for (let i = 0; i < iterations; i++) {
        const duration = 0.1 + Math.random() * 0.2;
        const offset = 0.05;
        
        timeline.to(layers[0], {
          x: () => (Math.random() * 10 - 5) * intensityFactor,
          y: () => (Math.random() * 4 - 2) * intensityFactor,
          opacity: 0.8 + Math.random() * 0.2,
          duration: duration,
          ease: "none",
        }, offset * i);
        
        timeline.to(layers[1], {
          x: () => (Math.random() * 10 - 5) * intensityFactor,
          y: () => (Math.random() * 4 - 2) * intensityFactor,
          opacity: 0.8 + Math.random() * 0.2,
          duration: duration,
          ease: "none",
        }, offset * i);
        
        timeline.to(layers[2], {
          x: () => (Math.random() * 10 - 5) * intensityFactor,
          y: () => (Math.random() * 4 - 2) * intensityFactor,
          opacity: 0.8 + Math.random() * 0.2,
          duration: duration,
          ease: "none",
        }, offset * i);
        
        // Occasionally add a horizontal slice effect
        if (Math.random() < 0.3 * intensityFactor) {
          const sliceY = Math.random() * 100;
          const sliceHeight = 5 + Math.random() * 10;
          
          timeline.to(image, {
            clipPath: `polygon(0% 0%, 100% 0%, 100% ${sliceY}%, 0% ${sliceY}%, 0% ${sliceY + sliceHeight}%, 100% ${sliceY + sliceHeight}%, 100% 100%, 0% 100%)`,
            duration: duration,
            ease: "none",
          }, offset * i);
        }
      }
      
      // Reset everything
      timeline.to([...layers, image], {
        x: 0,
        y: 0,
        opacity: 1,
        clipPath: 'none',
        duration: 0.2,
        ease: "power1.out"
      });
    };
    
    createGlitch();
    
    return () => {
      timeline.kill();
    };
  }, [src, glitchIntensity, interval, intensityFactor]);
  
  return (
    <div 
      ref={containerRef} 
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="redFilter">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            />
          </filter>
          <filter id="greenFilter">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            />
          </filter>
          <filter id="blueFilter">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
      
      <img 
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default GlitchImage;
