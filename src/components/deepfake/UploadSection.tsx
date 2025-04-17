
import { useState, useRef } from 'react';
import NeonCard from '../ui/NeonCard';
import NeonButton from '../ui/NeonButton';
import GlitchText from '../ui/GlitchText';
import ScanningAnimation from './ScanningAnimation';
import DetectionResult from './DetectionResult';

interface UploadSectionProps {
  onUpload?: () => void;
}

const UploadSection = ({ onUpload }: UploadSectionProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleScanButtonClick = () => {
    setIsScanning(true);
    if (onUpload) onUpload();
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
    }, 3500);
  };
  
  const handleReset = () => {
    setSelectedFile(null);
    setIsScanning(false);
    setShowResult(false);
  };
  
  return (
    <div className="relative">
      <NeonCard 
        color="cyan" 
        intensity="medium"
        className="w-full max-w-2xl mx-auto"
      >
        <div className="text-center">
          <GlitchText 
            text="DEEPFAKE DETECTION" 
            tag="h2"
            color="cyan"
            intensity="medium"
            className="mb-4 text-xl"
          />
          
          <p className="mb-6 text-sm text-gray-300">
            Upload a video to scan for deepfake manipulation
          </p>
          
          <div 
            className={`relative p-8 mb-6 border-2 border-dashed rounded-lg transition-all ${
              isDragging 
                ? 'border-cyberpunk-cyan bg-cyberpunk-cyan bg-opacity-10' 
                : 'border-gray-600 hover:border-cyberpunk-cyan hover:bg-cyberpunk-cyan hover:bg-opacity-5'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isScanning ? (
              <ScanningAnimation 
                isScanning={isScanning} 
                onComplete={() => setIsScanning(false)}
              />
            ) : (
              <div className="text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="video/*"
                />
                
                {selectedFile ? (
                  <div>
                    <div className="flex items-center justify-center mb-4 text-cyberpunk-cyan">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="mb-2 font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-gray-400">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-center mb-4 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 8.7l3 3m0 0l-3 3m3-3H9" />
                      </svg>
                    </div>
                    <p className="mb-2">Drag and drop your video file here</p>
                    <p className="text-xs text-gray-400">or</p>
                    <NeonButton 
                      color="cyan" 
                      variant="outline" 
                      size="sm"
                      className="mt-2"
                      onClick={handleUploadClick}
                    >
                      Browse Files
                    </NeonButton>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex justify-center gap-4">
            {selectedFile && !isScanning && (
              <>
                <NeonButton 
                  color="purple" 
                  variant="outline"
                  onClick={handleReset}
                >
                  Reset
                </NeonButton>
                <NeonButton 
                  color="cyan" 
                  onClick={handleScanButtonClick}
                >
                  Analyze Video
                </NeonButton>
              </>
            )}
          </div>
        </div>
      </NeonCard>
      
      <DetectionResult isVisible={showResult} onReset={handleReset} />
    </div>
  );
};

export default UploadSection;
