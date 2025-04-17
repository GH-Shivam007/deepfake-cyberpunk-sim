
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SpaceshipProps {
  scrollProgress: number;
}

// Spaceship model - we're using a basic model for demonstration
const Spaceship = ({ scrollProgress }: SpaceshipProps) => {
  const spaceshipRef = useRef<THREE.Group>(null);
  
  // Animation based on scroll progress
  useEffect(() => {
    if (!spaceshipRef.current) return;
    
    gsap.to(spaceshipRef.current.rotation, {
      y: scrollProgress * Math.PI * 2,
      x: scrollProgress * Math.PI / 6,
      ease: "none",
    });
    
    gsap.to(spaceshipRef.current.position, {
      z: 2 - scrollProgress * 4,
      ease: "none",
    });
  }, [scrollProgress]);

  // Add gentle rotation animation
  useFrame(({ clock }) => {
    if (spaceshipRef.current) {
      spaceshipRef.current.rotation.y += 0.001;
      spaceshipRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={spaceshipRef} position={[0, 0, 2]}>
      {/* Main body */}
      <mesh>
        <coneGeometry args={[0.5, 2, 8]} />
        <meshStandardMaterial color="#9b4dff" emissive="#9b4dff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Wings */}
      <mesh position={[0, -0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.3, 1.2, 3]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Thrusters */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
};

interface CyberpunkCityProps {
  scrollProgress: number;
}

// City background
const CyberpunkCity = ({ scrollProgress }: CyberpunkCityProps) => {
  const cityRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (!cityRef.current) return;
    
    // Move the city down as we scroll
    gsap.to(cityRef.current.position, {
      y: -5 - scrollProgress * 10,
      ease: "none",
    });
  }, [scrollProgress]);
  
  return (
    <group ref={cityRef} position={[0, -5, -10]}>
      {/* Generate buildings */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = (i % 5) * 2 - 4;
        const z = Math.floor(i / 5) * 2 - 4;
        const height = 1 + Math.random() * 4;
        
        return (
          <mesh key={i} position={[x, height / 2, z]}>
            <boxGeometry args={[0.8, height, 0.8]} />
            <meshStandardMaterial 
              color={i % 3 === 0 ? "#9b4dff" : i % 3 === 1 ? "#00ffff" : "#ff00ff"} 
              emissive={i % 3 === 0 ? "#9b4dff" : i % 3 === 1 ? "#00ffff" : "#ff00ff"}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
};

interface SceneProps {
  scrollProgress: number;
}

// Main scene setup
const Scene = ({ scrollProgress = 0 }: SceneProps) => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={1} color="#9b4dff" />
      <pointLight position={[5, 0, 0]} intensity={1} color="#00ffff" />
      <pointLight position={[-5, 0, 0]} intensity={1} color="#ff00ff" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} fade />
      <Spaceship scrollProgress={scrollProgress} />
      <CyberpunkCity scrollProgress={scrollProgress} />
    </>
  );
};

interface SpaceshipSceneProps {
  className?: string;
}

const SpaceshipScene = ({ className = "" }: SpaceshipSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      const totalScrollable = docHeight - windowHeight;
      const progress = Math.min(scrollPos / totalScrollable, 1);
      
      scrollProgressRef.current = progress;
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div ref={containerRef} className={`w-full h-screen ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene scrollProgress={scrollProgressRef.current} />
      </Canvas>
    </div>
  );
};

export default SpaceshipScene;
