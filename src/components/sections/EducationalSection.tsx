
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlitchText from '../ui/GlitchText';
import InfoCard from '../deepfake/InfoCard';

gsap.registerPlugin(ScrollTrigger);

const EducationalSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;
    
    const section = sectionRef.current;
    const title = titleRef.current;
    
    // Create scroll-triggered animations
    gsap.fromTo(
      title,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'top top',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const infoCardData = [
    {
      title: "What Are Deepfakes?",
      content: "Deepfakes use artificial intelligence to create or manipulate audio and video content to show people saying and doing things they never did in reality.",
      color: "purple",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-cyberpunk-purple"
        >
          <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z"></path>
          <path d="M12 12v-8"></path>
          <path d="M12 12 16 16"></path>
        </svg>
      )
    },
    {
      title: "Detection Methods",
      content: "Advanced detection systems analyze pixel-level inconsistencies, facial landmarks, reflection patterns, and other visual artifacts that humans might miss.",
      color: "cyan",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-cyberpunk-cyan"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      )
    },
    {
      title: "Potential Risks",
      content: "Deepfakes pose threats including misinformation spread, reputation damage, identity theft, and undermining trust in digital media.",
      color: "pink",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-cyberpunk-pink"
        >
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      )
    },
    {
      title: "Digital Media Literacy",
      content: "Developing skills to question and verify digital content is crucial in navigating today's information environment.",
      color: "purple",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-cyberpunk-purple"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
      )
    },
    {
      title: "Detection Technology",
      content: "AI-based detection systems are improving, but deepfake creation technology is advancing rapidly as well, creating an ongoing technological race.",
      color: "cyan",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-cyberpunk-cyan"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      title: "Protecting Yourself",
      content: "Verify sources, be skeptical of sensational content, and use multiple information sources to validate questionable videos or audio.",
      color: "pink",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-cyberpunk-pink"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      )
    }
  ];
  
  return (
    <div ref={sectionRef} className="py-24 bg-cyberpunk-dark">
      <div className="max-w-6xl px-4 mx-auto">
        <div ref={titleRef} className="mb-12 text-center">
          <GlitchText
            text="UNDERSTANDING DEEPFAKES"
            tag="h2"
            color="cyan"
            className="mb-6 text-3xl font-bold"
          />
          <p className="max-w-2xl mx-auto text-gray-300">
            Learn about the technology behind synthetic media and how to protect yourself
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {infoCardData.map((card, index) => (
            <InfoCard
              key={index}
              title={card.title}
              content={card.content}
              color={card.color as 'purple' | 'cyan' | 'pink'}
              icon={card.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationalSection;
