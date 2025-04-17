
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import NeonCard from '../ui/NeonCard';
import GlitchText from '../ui/GlitchText';
import NeonButton from '../ui/NeonButton';

interface DetectionResultProps {
  isVisible: boolean;
  onReset: () => void;
}

const DetectionResult = ({ isVisible, onReset }: DetectionResultProps) => {
  const [result, setResult] = useState<'authentic' | 'deepfake' | null>(null);
  const [confidence, setConfidence] = useState(0);
  
  useEffect(() => {
    if (isVisible) {
      // Randomly determine if the video is a deepfake or authentic
      const isDeepfake = Math.random() > 0.5;
      const randomConfidence = Math.floor(85 + Math.random() * 15); // Between 85% and 99%
      
      // Delay the result to simulate processing
      const timer = setTimeout(() => {
        setResult(isDeepfake ? 'deepfake' : 'authentic');
        
        // Animate the confidence percentage
        gsap.fromTo(
          ".confidence-value",
          { textContent: "0" },
          {
            textContent: randomConfidence.toString(),
            duration: 2,
            ease: "power1.out",
            snap: { textContent: 1 },
            onUpdate: () => {
              setConfidence(parseInt(document.querySelector(".confidence-value")?.textContent || "0"));
            }
          }
        );
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      // Reset states when not visible
      setResult(null);
      setConfidence(0);
    }
  }, [isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <NeonCard
        color={result === 'deepfake' ? 'pink' : result === 'authentic' ? 'cyan' : 'purple'}
        intensity="high"
        className="w-full max-w-md animate-scale-in"
      >
        <div className="text-center">
          {result ? (
            <>
              <GlitchText
                text={result === 'deepfake' ? 'DEEPFAKE DETECTED' : 'VIDEO AUTHENTIC'}
                color={result === 'deepfake' ? 'pink' : 'cyan'}
                intensity="high"
                className="mb-4 text-2xl"
              />
              
              <div className="flex items-center justify-center mb-6 gap-x-2">
                <div className="text-xl font-orbitron">
                  <span className="confidence-value">{confidence}</span>%
                </div>
                <div className="text-sm text-gray-400">confidence</div>
              </div>
              
              <div className="p-4 mb-6 border border-gray-700 rounded-md bg-cyberpunk-dark">
                {result === 'deepfake' ? (
                  <div className="space-y-2 text-left">
                    <p className="text-sm text-gray-300">
                      This video appears to be synthetically generated or manipulated.
                    </p>
                    <ul className="pl-5 mt-2 space-y-1 text-xs text-gray-400 list-disc">
                      <li>Unnatural facial movements detected</li>
                      <li>Inconsistent lighting patterns</li>
                      <li>Audio-visual synchronization issues</li>
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-2 text-left">
                    <p className="text-sm text-gray-300">
                      Our analysis indicates this is likely an authentic video.
                    </p>
                    <ul className="pl-5 mt-2 space-y-1 text-xs text-gray-400 list-disc">
                      <li>Natural facial expressions</li>
                      <li>Consistent lighting and shadows</li>
                      <li>Proper audio-visual alignment</li>
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center gap-4">
                <NeonButton
                  color={result === 'deepfake' ? 'pink' : 'cyan'}
                  onClick={onReset}
                >
                  Test Another Video
                </NeonButton>
              </div>
            </>
          ) : (
            <div className="py-10">
              <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-cyberpunk-purple border-t-transparent animate-spin" />
              <p className="font-orbitron text-cyberpunk-purple">Analyzing results...</p>
            </div>
          )}
        </div>
      </NeonCard>
    </div>
  );
};

export default DetectionResult;
