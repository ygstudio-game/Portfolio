import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Text, Float } from '@react-three/drei'
import { gsap } from 'gsap'
import * as THREE from 'three'
import LightRays from './LightRays'
import CelestialOrbHero from './CelestialOrbCanvas'

// 3D PARTICLE COMPONENT

function ParticleField({ count = 2000 }) {
  const particles = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 15
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (!particles.current) return
    const positions = particles.current.geometry.attributes.position.array
    for (let i = 0; i < count * 3; i += 3) {
      positions[i + 1] += Math.sin(clock.elapsedTime + i) * 0.002
      positions[i + 0] += Math.cos(clock.elapsedTime + i) * 0.002
    }
    particles.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00ffea"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// FLOATING TEXT COMPONENT - Responsive
function FloatingText() {
  const textRef = useRef()

  // Responsive font size based on viewport
  const fontSize = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.3 : 0.5
  const position = typeof window !== 'undefined' && window.innerWidth < 768 ? [0, 1.5, -2] : [0, 2, -2]

  return (
    <Float speed={2} rotationIntensity={0.9} floatIntensity={1}>
      <Text
        ref={textRef}
        position={position}
        fontSize={fontSize}
        color="#00ffea"
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
        textAlign="center"
      >
        Full-Stack Developer
      </Text>
    </Float>
  )
}

// MAIN HERO SECTION - FIXED RESPONSIVE

export default function HeroSection() {
  const containerRef = useRef()

  useEffect(() => {
    gsap.from('.hero-text', {
      opacity: 0,
      y: 100,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out'
    })
    
    gsap.to('.scroll-indicator', {
      y: 20,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'sine.inOut'
    })
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full bg-[#080412] overflow-hidden flex items-center justify-center"
      style={{ 
        position: 'relative',
        touchAction: 'pan-y' // Prevent touch interference on mobile
      }}
    >
      {/* Layer 1: Celestial Orb Canvas Background (z-0) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          zIndex: 0,
          pointerEvents: 'none' // Prevent interaction
        }}
      >
        <CelestialOrbHero />
      </div>

      {/* Layer 2: 3D Particle Field (z-5) - FIXED */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          zIndex: 5,
          pointerEvents: 'none' // Prevent interaction
        }}
      >
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 60 }} 
          className="absolute inset-0 w-full h-full"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none' // Prevent canvas from capturing touches
          }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
          }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} color="#00ffea" intensity={1} />
          
          <ParticleField count={2000} />
          
          <FloatingText />
        </Canvas>
      </div>
      
      {/* Layer 3: Light Rays Overlay (z-10) */}
      <div 
        className="absolute inset-0"
        style={{ 
          zIndex: 10,
          pointerEvents: 'none'
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1}
          lightSpread={1.4}
          rayLength={1}
          followMouse={true}
          mouseInfluence={0.5}
          noiseAmount={0.4}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      {/* Layer 4: Foreground Text Content (z-20) - FIXED */}
      <div 
        className="relative w-full h-full flex flex-col items-center justify-center text-center px-4"
        style={{ 
          zIndex: 20,
          pointerEvents: 'auto' // Allow interaction with text/buttons
        }}
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}      
          className="hero-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-amber-100 bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          Transformative Digital Experiences
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}        
          className="hero-text text-base sm:text-lg md:text-xl lg:text-2xl font-mono text-cyan-300 max-w-2xl px-4" 
        >
          _{`<code magic & creative solutions in 3D space/>`}
        </motion.p>

        <motion.div 
          className="scroll-indicator absolute bottom-8 md:bottom-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="w-px h-8 md:h-12 bg-gradient-to-t from-cyan-400 to-transparent" />
          <span className="text-cyan-300 text-xs md:text-sm font-mono tracking-widest">
            EXPLORE PORTFOLIO
          </span>
        </motion.div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          canvas {
            transform-origin: center center;
          }
        }
      `}</style>
    </section>
  )
}
