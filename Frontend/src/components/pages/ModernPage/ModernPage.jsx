import React, { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'framer-motion';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Feature Components
import ScrollIndicator from './components/features/ScrollIndicator';
import CircularScrollProgress from './components/features/CircularScrollProgress';

// Section Components
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';

const ModernPage = () => {
const isMobile = window.innerWidth <= 768;

  return (
    <ReactLenis root>
      <div className="relative min-h-screen bg-white">
        {/* Scroll Indicators */}
        <ScrollIndicator />
        <CircularScrollProgress />
        
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Fixed Bottom Blur - Shows after Hero */}
        <AnimatePresence>
          { (
            <motion.div 
              className="fixed bottom-0 left-0 right-0 pointer-events-none z-50"
              {...(isMobile ? { style: { height: '6rem' } } : { style: { height: '8rem' } })}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <div className="relative w-full h-full">
                {[...Array(3)].map((_, i) => {
                  const progress = (i + 1) / 6;
                  const blurValue = Math.pow(2, progress * 2) * 0.0625 * 2.5;
                  const maskStart = ((100 / 6) * i).toFixed(1);
                  const maskEnd = ((100 / 6) * (i + 1)).toFixed(1);
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.9 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: i * 0.05 
                      }}
                      style={{
                        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
                        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
                        maskImage: `linear-gradient(to bottom, transparent ${maskStart}%, black ${maskEnd}%)`,
                        WebkitMaskImage: `linear-gradient(to bottom, transparent ${maskStart}%, black ${maskEnd}%)`,
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ReactLenis>
  );
};

export default ModernPage;
