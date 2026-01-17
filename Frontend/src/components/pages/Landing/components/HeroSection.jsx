import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Float, Environment } from '@react-three/drei'
import LightRays from './LightRays'
import CelestialOrbHero from './CelestialOrbCanvas'
import { useNavigate } from 'react-router-dom';
// --- OPTIMIZED 3D PARTICLES (Mobile Performance Tuned) ---
function ParticleField({ count = 1500 }) {
  const particles = useRef()
   // Memoize positions to prevent recalculation on re-renders
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      // Spread particles wider for better mobile coverage
      arr[i] = (Math.random() - 0.5) * 20 
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (!particles.current) return
    const time = clock.elapsedTime * 0.1
    // Simple rotation is more performant than per-particle updates
    particles.current.rotation.y = time
    particles.current.rotation.z = time * 0.2
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
        size={0.03}
        color="#22d3ee" // Cyan-400
        transparent
        opacity={0.4}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  )
}

// --- INTERACTIVE CARD COMPONENT ---
const PortfolioChoiceCard = ({ title, subtitle, mode, onClick, delay }) => {
  const isTerminal = mode === 'terminal'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, type: "spring" }}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative group overflow-hidden rounded-2xl border p-6 md:p-8 cursor-pointer w-full md:w-[320px] lg:w-[380px] h-[200px] md:h-[280px] flex flex-col justify-between transition-all duration-300
        ${isTerminal 
          ? 'bg-black/80 border-green-500/30 hover:border-green-400 hover:shadow-[0_0_40px_rgba(74,222,128,0.15)]' 
          : 'bg-white/5 backdrop-blur-xl border-white/10 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]'
        }`}
    >
      {/* Background Gradient Effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br 
        ${isTerminal ? 'from-green-900/20 via-transparent' : 'from-cyan-900/20 via-transparent'}`} 
      />

      {/* Card Content */}
      <div className="relative z-10">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4
          ${isTerminal ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-cyan-900/30 text-cyan-400 border border-cyan-500/30'}`}>
          <span>{isTerminal ? 'root@system:~$' : 'UI/UX Mode'}</span>
        </div>
        
        <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${isTerminal ? 'text-green-50 font-mono' : 'text-white font-sans'}`}>
          {title}
        </h3>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Call to Action Arrow */}
      <div className={`relative z-10 flex items-center gap-2 text-sm font-semibold mt-4
        ${isTerminal ? 'text-green-400' : 'text-cyan-400'}`}
        
        >
        <span>LAUNCH</span>
        <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </motion.div>
  )
}

// --- MAIN RESPONSIVE HERO ---
export default function HeroSection() {
  const scrollRef = useRef()
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
 
  const handleScrollDown = () => {
    // Smooth scroll to the next section (PortfolioCards)
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  }

  const navigateTo = (path) => {
    console.log(`Navigate to ${path}`)
      navigate(path);
  }

  return (
    <section 
      className="relative w-full min-h-[100dvh] bg-[#030014] overflow-hidden flex flex-col items-center justify-center pt-20 pb-10 md:py-0"
    >
      {/* --- LAYER 1: 3D BACKGROUND (Pointer Events None for Scrolling) --- */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <CelestialOrbHero />
        </div>
      )}

      <div className="absolute inset-0 z-10 opacity-60 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#4ade80"
          raysSpeed={0.5}
        />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas 
          dpr={[1, 2]} // Optimization for high DPI screens
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: false }} // Performance boost
        >
          <ParticleField count={1200} />
        </Canvas>
      </div>

      {/* --- LAYER 2: CONTENT (Pointer Events Auto) --- */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* Left/Top Column: Introduction Text */}
        <div className="flex-1 text-center md:text-left pt-8 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-cyan-400 font-mono tracking-widest text-sm md:text-base mb-4">
              FULL STACK DEVELOPER PORTFOLIO
            </h2>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Choose Your <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                Experience
              </span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed mb-8">
              Explore my digital universe through two distinct interfaces. 
              Dive into the code via Terminal or enjoy the visual journey via Modern UI.
            </p>
          </motion.div>
        </div>

        {/* Right/Bottom Column: The Cards */}
        <div className="flex-1 w-full flex flex-col gap-6 items-center md:items-start lg:items-end justify-center">
          
          <PortfolioChoiceCard 
            mode="terminal"
            title="Terminal"
            subtitle="Command Line Interface. Execute scripts, browse file systems, and view raw code."
            onClick={() => navigateTo('/terminal')}
            delay={0.2}
          />
          
          <PortfolioChoiceCard 
            mode="modern"
            title="Modern UI"
            subtitle="Immersive 3D Experience. Rich visuals, interactive galleries, and smooth motion."
            onClick={() => navigateTo('/modern-ui')}
            delay={0.4}
          />

        </div>
      </div>

      {/* --- LAYER 3: SCROLL INDICATOR --- */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        onClick={handleScrollDown}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase opacity-70">
            More Projects
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent"></div>
        </div>
      </motion.div>

    </section>
  )
}
