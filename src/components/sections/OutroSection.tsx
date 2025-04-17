
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlitchText from '../ui/GlitchText';
import NeonButton from '../ui/NeonButton';

gsap.registerPlugin(ScrollTrigger);

const OutroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;
    
    const section = sectionRef.current;
    const content = contentRef.current;
    
    // Animate stars in the background
    const starsContainer = document.createElement('div');
    starsContainer.className = 'absolute inset-0 overflow-hidden';
    
    // Create stars
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'absolute rounded-full';
      
      // Random position, size and color
      const size = Math.random() * 3 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Random color
      const colors = ['#9b4dff', '#00ffff', '#ff00ff', '#ffffff'];
      star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Random opacity
      star.style.opacity = (Math.random() * 0.7 + 0.3).toString();
      
      starsContainer.appendChild(star);
    }
    
    section.prepend(starsContainer);
    
    // Animate stars twinkling
    gsap.to('.rounded-full', {
      opacity: 0.2,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.1,
        from: 'random',
      }
    });
    
    // Scroll animation
    gsap.fromTo(
      content,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'center center',
          toggleActions: 'play none none reverse',
          scrub: 1
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div 
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-cyberpunk-dark to-black"
    >
      <div className="max-w-4xl px-4 mx-auto">
        <div 
          ref={contentRef}
          className="text-center"
        >
          <GlitchText
            text="STAY VIGILANT"
            tag="h2"
            color="pink"
            className="mb-6 text-3xl font-bold"
          />
          
          <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-300">
            As deepfake technology evolves, so must our ability to detect and question digital content. 
            The future of media literacy depends on our collective awareness.
          </p>
          
          <div className="mb-12">
            <div className="p-6 border border-cyberpunk-pink border-opacity-30 rounded-lg bg-black bg-opacity-50">
              <p className="mb-4 font-orbitron text-cyberpunk-pink">Security Advisory</p>
              <p className="text-sm text-gray-400">
                "In a world where seeing is no longer believing, our best defense is knowledge.
                Stay informed, verify sources, and approach sensational content with healthy skepticism."
              </p>
            </div>
          </div>
          
          <NeonButton
            color="purple"
            size="lg"
            onClick={handleScrollToTop}
          >
            Return to Simulation
          </NeonButton>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default OutroSection;
