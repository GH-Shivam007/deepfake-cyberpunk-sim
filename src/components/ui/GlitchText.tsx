
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface GlitchTextProps {
  text: string;
  className?: string;
  color?: 'purple' | 'cyan' | 'pink';
  intensity?: 'low' | 'medium' | 'high';
  tag?: keyof JSX.IntrinsicElements;
  delay?: number;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = '',
  color = 'purple',
  intensity = 'medium',
  tag: Tag = 'h1',
  delay = 0
}) => {
  const textRef = useRef<HTMLElement>(null);
  
  const colorClass = {
    purple: 'neon-text',
    cyan: 'neon-text-cyan',
    pink: 'neon-text-pink'
  }[color];
  
  const intensityFactor = {
    low: 0.5,
    medium: 1,
    high: 2
  }[intensity];
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const element = textRef.current;
    
    // Initial reveal animation
    gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay }
    );
    
    // Random glitch effect
    const timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 3 + Math.random() * 5
    });
    
    const createGlitch = () => {
      timeline.to(element, {
        skewX: () => Math.random() * 5 * intensityFactor,
        skewY: () => Math.random() * 2 * intensityFactor,
        duration: 0.1,
        ease: "power1.inOut"
      });
      
      for (let i = 0; i < 3 + Math.floor(Math.random() * 5 * intensityFactor); i++) {
        timeline.to(element, {
          x: () => (Math.random() * 10 - 5) * intensityFactor,
          y: () => (Math.random() * 4 - 2) * intensityFactor,
          opacity: () => 0.8 + Math.random() * 0.2,
          duration: 0.1,
          ease: "none"
        });
      }
      
      timeline.to(element, {
        x: 0,
        y: 0,
        skewX: 0,
        skewY: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power1.out"
      });
    };
    
    createGlitch();
    
    return () => {
      timeline.kill();
    };
  }, [text, intensity, delay]);
  
  const Component = Tag as any;
  
  return (
    <Component 
      ref={textRef} 
      data-text={text}
      className={`glitch-text font-orbitron ${colorClass} ${className}`}
    >
      {text}
    </Component>
  );
};

export default GlitchText;
