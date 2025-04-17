
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { Stars, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SpaceshipProps {
  scrollProgress: number;
  isZoomed: boolean;
}

// Enhanced spaceship model with more detail
const Spaceship = ({ scrollProgress, isZoomed }: SpaceshipProps) => {
  const spaceshipRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (!spaceshipRef.current || !isZoomed) return;
    
    gsap.to(spaceshipRef.current.position, {
      z: -2,
      duration: 2,
      ease: "power2.inOut"
    });
    
    gsap.to(spaceshipRef.current.rotation, {
      y: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
  }, [isZoomed]);

  useFrame((state, delta) => {
    if (spaceshipRef.current && !isZoomed) {
      spaceshipRef.current.rotation.y += delta * 0.2;
      spaceshipRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={spaceshipRef} position={[0, 0, isZoomed ? -10 : -15]}>
      {/* Main body */}
      <mesh castShadow receiveShadow>
        <coneGeometry args={[0.5, 2, 16]} />
        <meshStandardMaterial 
          color="#9b4dff"
          metalness={0.9}
          roughness={0.1}
          emissive="#9b4dff"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Wings with metallic finish */}
      <mesh castShadow receiveShadow position={[0, -0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.3, 1.2, 6]} />
        <meshStandardMaterial
          color="#00ffff"
          metalness={0.9}
          roughness={0.1}
          emissive="#00ffff"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Engine glow */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 0.2, 16]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
      
      {/* Engine particles */}
      <points position={[0, -1.2, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={new Float32Array(300).map(() => Math.random() * 0.5 - 0.25)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#ff00ff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

// Enhanced space environment
const SpaceEnvironment = () => {
  return (
    <>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0.5}
        fade
        speed={1}
      />
      
      {/* Distant galaxies */}
      {[...Array(20)].map((_, i) => (
        <mesh key={i} position={[
          Math.random() * 100 - 50,
          Math.random() * 100 - 50,
          -Math.random() * 50 - 30
        ]}>
          <sphereGeometry args={[Math.random() * 2 + 0.5, 32, 32]} />
          <meshBasicMaterial
            color={new THREE.Color().setHSL(Math.random(), 0.5, 0.5)}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
      
      <Environment preset="night" />
    </>
  );
};

interface SceneProps {
  scrollProgress: number;
  isZoomed: boolean;
}

const Scene = ({ scrollProgress, isZoomed }: SceneProps) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#9b4dff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
      
      <SpaceEnvironment />
      <Spaceship scrollProgress={scrollProgress} isZoomed={isZoomed} />
      
      <fog attach="fog" args={['#000', 30, 100]} />
    </>
  );
};

interface SpaceshipSceneProps {
  className?: string;
}

const SpaceshipScene = ({ className = "" }: SpaceshipSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      const totalScrollable = docHeight - windowHeight;
      const progress = Math.min(scrollPos / totalScrollable, 1);
      
      scrollProgressRef.current = progress;
      setIsZoomed(progress > 0.1); // Zoom when scrolled past 10%
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div ref={containerRef} className={`w-full h-screen ${className}`}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene scrollProgress={scrollProgressRef.current} isZoomed={isZoomed} />
      </Canvas>
    </div>
  );
};

export default SpaceshipScene;
