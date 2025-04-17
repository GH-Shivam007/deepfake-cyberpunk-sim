
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface ScanningAnimationProps {
  isScanning: boolean;
  color?: 'purple' | 'cyan' | 'pink';
  className?: string;
  onComplete?: () => void;
  duration?: number;
}

const ScanningAnimation = ({
  isScanning,
  color = 'cyan',
  className = '',
  onComplete,
  duration = 3
}: ScanningAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [binaryNumbers, setBinaryNumbers] = useState<Array<{position: {top: string, left: string}, value: string}>>([]);
  
  const colorClass = {
    purple: 'bg-cyberpunk-purple',
    cyan: 'bg-cyberpunk-cyan',
    pink: 'bg-cyberpunk-pink'
  }[color];
  
  const colorGlow = {
    purple: 'shadow-[0_0_10px_rgba(155,77,255,0.7)]',
    cyan: 'shadow-[0_0_10px_rgba(0,255,255,0.7)]',
    pink: 'shadow-[0_0_10px_rgba(255,0,255,0.7)]'
  }[color];

  const borderColor = {
    purple: 'border-cyberpunk-purple',
    cyan: 'border-cyberpunk-cyan',
    pink: 'border-cyberpunk-pink'
  }[color];
  
  // Generate binary background
  useEffect(() => {
    const rows = 15;
    const cols = 30;
    const binary = [];
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const rand = Math.random();
        // Control density of numbers
        if (rand > 0.7) {
          binary.push({
            position: {
              top: `${(i / rows) * 100}%`,
              left: `${(j / cols) * 100}%`
            },
            value: Math.round(Math.random()).toString()
          });
        }
      }
    }
    
    setBinaryNumbers(binary);
  }, []);
  
  useEffect(() => {
    if (!scanlineRef.current || !progressRef.current || !containerRef.current) return;
    
    const scanline = scanlineRef.current;
    const progress = progressRef.current;
    const container = containerRef.current;
    
    if (isScanning) {
      // Reset the animation
      gsap.set(scanline, { y: -container.offsetHeight });
      gsap.set(progress, { width: '0%' });
      
      // Create the scanning animation
      const timeline = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });
      
      // Scanline moves from top to bottom
      timeline.to(scanline, {
        y: container.offsetHeight,
        duration: duration,
        ease: 'power1.inOut',
        repeat: 0
      });
      
      // Progress bar fills simultaneously
      timeline.to(progress, {
        width: '100%',
        duration: duration,
        ease: 'linear'
      }, 0);
      
      // Numbers changing rapidly effect
      const intervalIds: number[] = [];
      
      binaryNumbers.forEach((_, index) => {
        const intervalId = window.setInterval(() => {
          setBinaryNumbers(prev => {
            const newNumbers = [...prev];
            if (newNumbers[index]) {
              newNumbers[index] = {
                ...newNumbers[index],
                value: Math.round(Math.random()).toString()
              };
            }
            return newNumbers;
          });
        }, 100 + Math.random() * 200);
        
        intervalIds.push(intervalId);
      });
      
      // Clear intervals when animation completes
      timeline.call(() => {
        intervalIds.forEach(id => clearInterval(id));
      }, [], duration);
      
      return () => {
        timeline.kill();
        intervalIds.forEach(id => clearInterval(id));
      };
    }
  }, [isScanning, onComplete, duration, binaryNumbers]);
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative w-full h-full overflow-hidden border-2 border-opacity-50 rounded-md',
        className,
        borderColor
      )}
    >
      {/* Binary background for cyberpunk effect */}
      <div className="absolute inset-0 text-gray-400 opacity-30">
        {binaryNumbers.map((binary, index) => (
          <span 
            key={index} 
            className="binary-number text-xs absolute opacity-30"
            style={{ 
              top: binary.position.top, 
              left: binary.position.left,
            }}
          >
            {binary.value}
          </span>
        ))}
      </div>
      
      {/* Scanning line */}
      <div 
        ref={scanlineRef} 
        className={cn(
          'absolute left-0 w-full h-1 -translate-y-1/2 opacity-70',
          colorClass,
          colorGlow
        )}
      />
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800 bg-opacity-30">
        <div 
          ref={progressRef} 
          className={cn(
            'h-full w-0',
            colorClass,
            colorGlow
          )}
        />
      </div>
      
      {/* Content goes here */}
      <div className="relative z-10 w-full h-full">
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className={`text-sm font-orbitron animate-pulse ${color === 'purple' ? 'text-cyberpunk-purple' : color === 'cyan' ? 'text-cyberpunk-cyan' : 'text-cyberpunk-pink'}`}>
                SCANNING
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanningAnimation;
