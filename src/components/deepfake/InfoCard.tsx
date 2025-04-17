
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NeonCard from '../ui/NeonCard';
import GlitchText from '../ui/GlitchText';

gsap.registerPlugin(ScrollTrigger);

interface InfoCardProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
  color?: 'purple' | 'cyan' | 'pink';
  index?: number;
}

const InfoCard = ({ title, content, icon, color = 'purple', index = 0 }: InfoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    // Create scroll-triggered animation
    gsap.fromTo(
      card,
      { 
        y: 50, 
        opacity: 0,
        scale: 0.9
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          end: "bottom center",
          toggleActions: "play none none reverse",
        }
      }
    );
    
    return () => {
      // Clean up scroll trigger
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === card) {
          trigger.kill();
        }
      });
    };
  }, []);
  
  return (
    <div ref={cardRef} className="w-full">
      <NeonCard
        color={color}
        className={`h-full transition-all duration-500 delay-${index * 100}`}
      >
        <div className="flex flex-col items-center text-center">
          {icon && <div className="mb-4">{icon}</div>}
          
          <GlitchText
            text={title}
            tag="h3"
            color={color}
            className="mb-2 text-lg font-semibold font-orbitron"
          />
          
          <p className="text-sm text-gray-300">{content}</p>
        </div>
      </NeonCard>
    </div>
  );
};

export default InfoCard;
