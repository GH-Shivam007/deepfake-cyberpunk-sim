
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import LandingSection from '@/components/sections/LandingSection';
import UploadSection from '@/components/deepfake/UploadSection';
import EducationalSection from '@/components/sections/EducationalSection';
import OutroSection from '@/components/sections/OutroSection';
import SpaceshipScene from '@/components/three/SpaceshipScene';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  const appRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Set up smooth scrolling effect
    const setupSmoothScroll = () => {
      // Reset scroll position on reload
      window.history.scrollRestoration = 'manual';
      
      // Set up scroll animations that respond to forward and backward scrolling
      ScrollTrigger.defaults({
        toggleActions: 'play none none reverse',
        markers: false
      });
      
      // Smooth scroll to sections - removing the ease property that was causing the error
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: "#upload-section",
          offsetY: 70,
          autoKill: true
        }
      });
    };
    
    setupSmoothScroll();
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.history.scrollRestoration = 'auto';
    };
  }, []);
  
  return (
    <div ref={appRef} className="min-h-screen bg-cyberpunk-dark font-inter text-white">
      {/* 3D Background Scene */}
      <div className="fixed inset-0 pointer-events-none">
        <SpaceshipScene />
      </div>

      {/* Landing section with animated titles */}
      <LandingSection />
      
      {/* Upload section */}
      <section id="upload-section" className="relative py-24 z-10">
        <div className="max-w-6xl px-4 mx-auto">
          <UploadSection />
        </div>
      </section>
      
      {/* Educational cards section */}
      <EducationalSection />
      
      {/* Outro section */}
      <OutroSection />
    </div>
  );
};

export default Index;
