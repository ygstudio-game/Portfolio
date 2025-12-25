import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown, Download, Mail, Sparkles } from 'lucide-react';
import MagneticWrapper from '../features/MagneticWrapper';
import { portfolioData } from '@data/portfolioData';
import photo from '@assets/photo.png';

// Floating Particles with Velocity
const FloatingParticles = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -150]);
  const y3 = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => {
        const size = Math.random() * 6 + 2;
        const yTransform = i % 3 === 0 ? y1 : i % 3 === 1 ? y2 : y3;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: `radial-gradient(circle, ${
                i % 4 === 0 ? '#C3E41D' : i % 4 === 1 ? '#f59e0b' : i % 4 === 2 ? '#fcd34d' : '#fbbf24'
              }, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              y: yTransform,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        );
      })}
    </div>
  );
};

// Scroll Velocity Text
const ScrollVelocityText = () => {
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [0, 1000], [0, -500]);
  const x2 = useTransform(scrollY, [0, 1000], [0, 500]);

  const skills = [
    "React", "TypeScript", "Node.js", "Next.js", "MongoDB", "PostgreSQL",
    "TailwindCSS", "Framer Motion", "GSAP", "Three.js", "WebGL", "Docker"
  ];

  return (
    <div className="absolute bottom-32 left-0 right-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ x }}
        className="flex gap-8 whitespace-nowrap text-yellow-500/20 text-6xl font-bold py-4"
      >
        {[...skills, ...skills].map((skill, i) => (
          <span key={i}>{skill}</span>
        ))}
      </motion.div>
      <motion.div
        style={{ x: x2 }}
        className="flex gap-8 whitespace-nowrap text-yellow-500/10 text-5xl font-bold py-4"
      >
        {[...skills, ...skills].reverse().map((skill, i) => (
          <span key={i}>{skill}</span>
        ))}
      </motion.div>
    </div>
  );
};

// Text Flip Animation
const FlipText = ({ children, delay = 0 }) => {
  return (
    <motion.span
      initial={{ rotateX: -90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      style={{ 
        display: "inline-block",
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {children}
    </motion.span>
  );
};

// Animated Word Component
const AnimatedWord = ({ text, delay = 0 }) => {
  return (
    <motion.span
      className="inline-block"
      initial={{ y: 50, opacity: 0, rotateX: -90 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {text}
    </motion.span>
  );
};

// Grid Background with Parallax
const ParallaxGrid = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [0.3, 0]);

  return (
    <motion.div 
      className="absolute inset-0"
      style={{ y, opacity }}
    >
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(252, 211, 77, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(252, 211, 77, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 80%)'
        }}
      />
    </motion.div>
  );
};

const Hero = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const { name } = portfolioData.personalInfo;
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSubtitle(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    mouseX.set(e.clientX - rect.left - centerX);
    mouseY.set(e.clientY - rect.top - centerY);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const roles = [
    "Full-Stack Developer",
    2000,
    "UI/UX Designer",
    2000,
    "Problem Solver",
    2000,
    "Tech Enthusiast",
    2000,
  ];

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-linear-to-b from-white via-yellow-50/30 to-white"
      onMouseMove={handleMouseMove}
    >
      {/* Background Effects */}
      <ParallaxGrid />
      <FloatingParticles />
      <ScrollVelocityText />

      {/* Radial Gradient */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        <div style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(195, 228, 29, 0.15) 0%, transparent 70%)'
        }} className="w-full h-full" />
      </motion.div>

      {/* Main Content */}
      <motion.main 
        className="relative min-h-screen flex flex-col justify-center items-center px-4 py-26"
        style={{ y, scale }}
      >
        {/* Sparkle Icon */}
        <motion.div
          className="mb-6"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-8 h-8 text-yellow-500" />
        </motion.div>

        {/* Greeting Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-yellow-100 to-amber-100 border-2 border-yellow-300 text-yellow-800 text-sm font-semibold shadow-lg">
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              👋
            </motion.span>
            Welcome to my digital space
          </span>
        </motion.div>

        {/* Main Title with 3D */}
        <motion.div 
          className="relative mb-8 text-center"
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        >
          {/* Name with Flip Animation */}
          <div className="mb-4 overflow-hidden">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
              {name.split('').map((char, i) => (
                <FlipText key={i} delay={i * 0.05}>
                  {char === ' ' ? '\u00A0' : char}
                </FlipText>
              ))}
            </h1>
          </div>

{/* Large Title */}
<div className="relative z-[-1]">
  <h1 
    className="text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px] font-bold leading-[0.85] tracking-tighter relative z-0 pointer-events-none"
    style={{
      fontFamily: "'Fira Code', monospace"
    }}
  >
    <div className="flex flex-col items-center">
      <motion.span
        className="inline-block"
        initial={{ y: 50, opacity: 0, rotateX: -90 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          type: "spring",
          stiffness: 100,
        }}
        style={{ 
          transformStyle: "preserve-3d",
          background: 'linear-gradient(135deg, #C3E41D 0%, #f59e0b 40%, #fcd34d 60%, #C3E41D 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        FULL-STACK
      </motion.span>
      
      <motion.span
        className="inline-block"
        initial={{ y: 50, opacity: 0, rotateX: -90 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          type: "spring",
          stiffness: 100,
        }}
        style={{ 
          transformStyle: "preserve-3d",
          background: 'linear-gradient(135deg, #C3E41D 0%, #f59e0b 40%, #fcd34d 60%, #C3E41D 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        DEVELOPER
      </motion.span>
    </div>
  </h1>

  {/* Profile Picture with Extended Hover Area */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
    {/* Extended hover area for magnetic effect */}
    <div className="absolute inset-0 -m-16 sm:-m-20 md:-m-24 lg:-m-28 pointer-events-auto">
      <MagneticWrapper strength={0.6}>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="relative cursor-pointer flex items-center justify-center w-full h-full"
        >
          {/* Center the actual photo */}
          <div className="relative">
            {/* Animated Rings */}
            <motion.div
              className="absolute inset-0 -m-3 pointer-events-none"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-400/30" />
            </motion.div>

            <motion.div
              className="absolute inset-0 -m-5 pointer-events-none"
              animate={{
                rotate: [360, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-dotted border-amber-400/20" />
            </motion.div>

            {/* Profile Image */}
            <div className="w-[65px] h-[110px] sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px] lg:w-[129px] lg:h-[218px] rounded-full overflow-hidden shadow-2xl border-4 border-yellow-300 relative bg-linear-to-br from-yellow-200 to-amber-200">
              <motion.img
                src={photo}
                alt="Profile"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Pulsing Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-yellow-400 pointer-events-none"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Status Dot */}
            <motion.div
              className="absolute bottom-2 right-2 z-20 pointer-events-none"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-5 h-5 bg-green-400 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </MagneticWrapper>
    </div>
  </div>
</div>

        </motion.div>

        {/* Typing Animation for Role */}
        <motion.div
          className="mb-8 h-12 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <TypeAnimation
            sequence={roles}
            wrapper="span"
            speed={50}
            className="text-2xl md:text-3xl font-bold text-gray-700"
            repeat={Infinity}
          />
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-yellow-500 text-3xl ml-1"
          >
            |
          </motion.span>
        </motion.div>

        {/* Subtitle with Fade In */}
        <AnimatePresence>
          {showSubtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto text-center mb-10 px-4"
            >
              Crafting innovative digital solutions with modern technologies.
              <br />
              <span className="text-yellow-600 font-semibold">Let's build something amazing together!</span>
            </motion.p>
          )}
        </AnimatePresence>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <MagneticWrapper strength={0.3}>
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="group relative px-8 py-4 rounded-full bg-linear-to-r from-yellow-300 via-amber-400 to-yellow-300 text-gray-900 font-semibold shadow-xl hover:shadow-yellow-500/50 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
              <span>Let's Connect</span>
            </motion.button>
          </MagneticWrapper>

          <MagneticWrapper strength={0.3}>
            <motion.button
              className="px-8 py-4 rounded-full bg-white border-2 border-yellow-300 text-gray-900 font-semibold hover:bg-yellow-50 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              Download CV
            </motion.button>
          </MagneticWrapper>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 md:gap-12 max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          {[
            { number: 3, suffix: "+", label: "Years Experience" },
            { number: 50, suffix: "+", label: "Projects Done" },
            { number: 100, suffix: "%", label: "Satisfaction" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center group"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className="text-4xl md:text-5xl font-bold text-yellow-600 mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2 + idx * 0.1, type: "spring" }}
              >
                {stat.number}{stat.suffix}
              </motion.div>
              <div className="text-sm text-gray-600 font-medium group-hover:text-yellow-600 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <MagneticWrapper strength={0.3}>
            <motion.button
              onClick={() => scrollToSection('about')}
              className="flex flex-col items-center gap-2 text-gray-500 hover:text-yellow-600 transition-colors duration-300 group"
            >
              <span className="text-xs font-medium uppercase tracking-wider">Explore More</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="p-2 rounded-full bg-yellow-100 group-hover:bg-yellow-200 transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </MagneticWrapper>
        </motion.div>
      </motion.main>

      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>
    </section>
  );
};


export default Hero;
