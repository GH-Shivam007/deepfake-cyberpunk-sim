
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import GlitchText from '../ui/GlitchText';
import NeonButton from '../ui/NeonButton';

const LandingSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Create an animated grid background effect
    const createGridLines = () => {
      const gridContainer = document.createElement('div');
      gridContainer.className = 'absolute inset-0 overflow-hidden';
      
      // Horizontal lines
      for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.className = 'absolute w-full h-px bg-cyberpunk-purple opacity-20';
        line.style.top = `${(i * 100) / 20}%`;
        gridContainer.appendChild(line);
      }
      
      // Vertical lines
      for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.className = 'absolute w-px h-full bg-cyberpunk-purple opacity-20';
        line.style.left = `${(i * 100) / 20}%`;
        gridContainer.appendChild(line);
      }
      
      container.prepend(gridContainer);
      
      // Animate the grid
      gsap.to('.bg-cyberpunk-purple', {
        opacity: 0.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.1,
          from: 'random',
        }
      });
    };
    
    createGridLines();
    
    // Initial animation
    const timeline = gsap.timeline();
    
    // Content fade in
    timeline.fromTo(
      '.landing-content',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
  }, []);
  
  const handleScrollToExplore = () => {
    const nextSection = document.getElementById('upload-section');
    if (nextSection) {
      window.scrollTo({
        top: nextSection.offsetTop,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center h-screen bg-cyberpunk-dark"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyberpunk-dark via-cyberpunk-dark to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyberpunk-purple/10 via-transparent to-cyberpunk-cyan/10" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 px-4 text-center landing-content">
        <div className="mb-6">
          <GlitchText
            text="DEEPFAKE"
            color="purple"
            intensity="high"
            className="text-6xl font-bold"
          />
          <GlitchText
            text="DETECTION"
            color="cyan"
            intensity="medium"
            className="text-5xl font-bold"
            delay={0.3}
          />
          <GlitchText
            text="SIMULATION"
            color="pink"
            intensity="low"
            className="text-4xl font-bold"
            delay={0.6}
          />
        </div>
        
        <div className="max-w-md mx-auto mb-8">
          <p className="mb-6 text-gray-300">
            Explore the world of synthetic media detection in this futuristic cyberpunk experience
          </p>
        </div>
        
        <NeonButton
          color="purple"
          size="lg"
          onClick={handleScrollToExplore}
          className="animate-pulse-glow"
        >
          Enter Simulation
        </NeonButton>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-cyberpunk-purple"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
  );
};

export default LandingSection;
