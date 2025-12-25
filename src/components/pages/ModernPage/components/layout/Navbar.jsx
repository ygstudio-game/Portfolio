// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import MagneticWrapper from '../features/MagneticWrapper';
import { LiquidButton } from '@ui/LiquidGlassButton';
import { Menu, X, Terminal } from 'lucide-react';
import { portfolioData } from '@data/portfolioData';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isTerminalMode = location.pathname === '/terminal';
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 50);
      
      // Track active section
      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const toggleTerminalMode = () => {
    if (isTerminalMode) {
      navigate('/');
    } else {
      navigate('/terminal');
    }
    setMobileOpen(false);
  };

  const navItems = ['About', 'Projects', 'Skills', 'Experience', 'Contact'];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/5 backdrop-blur-xl shadow-lg border-b-2 border-yellow-200/60' 
          : 'bg-white/50 backdrop-blur-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo - Enhanced with better visibility */}
        <MagneticWrapper strength={0.3}>
          <button 
            onClick={() => scrollToSection('hero')} 
            className="relative group"
          >
            {/* Background glow for better visibility */}
            <motion.div
              className="absolute -inset-2 rounded-lg bg-linear-to-r from-yellow-200/50 to-amber-200/50 blur-lg opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            
            <span 
              className="relative text-2xl md:text-3xl font-bold transition-all duration-300 group-hover:scale-110 inline-block"
              style={{ 
                color: scrolled ? '#B5D312' : '#C3E41D',
                fontFamily: "'Fira Code', monospace",
                textShadow: scrolled 
                  ? '0 0 20px rgba(195, 228, 29, 0.5), 0 2px 4px rgba(0, 0, 0, 0.2)'
                  : '0 0 15px rgba(195, 228, 29, 0.4), 0 2px 4px rgba(0, 0, 0, 0.1)',
                WebkitTextStroke: scrolled ? '2px rgba(0, 0, 0, 0.1)' : '0px transparent'
              }}
            >
              {portfolioData.personalInfo.name.split(' ')[0]}
            </span>
            
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-1 left-0 h-1 bg-linear-to-r from-yellow-400 via-amber-500 to-yellow-400 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileHover={{ width: '100%', opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </button>
        </MagneticWrapper>

        {/* Desktop Menu - Enhanced Glass Pills */}
        <div className={`hidden md:flex items-center gap-2 rounded-full p-2 border transition-all duration-300 ${
          scrolled 
            ? 'bg-white/15 backdrop-blur-lg border-yellow-300/70 shadow-md' 
            : 'bg-white/40 backdrop-blur-md border-yellow-200/50'
        }`}>
          {navItems.map((item, index) => {
            const isActive = activeSection === item.toLowerCase();
            const isHovered = hoveredItem === item;
            
            return (
              <MagneticWrapper key={item} strength={0.2}>
                <motion.button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  onHoverStart={() => setHoveredItem(item)}
                  onHoverEnd={() => setHoveredItem(null)}
                  className={`relative px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                    isActive 
                      ? 'text-gray-900' 
                      : scrolled 
                        ? 'text-gray-700'
                        : 'text-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Hover ripple effect */}
                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          background: 'radial-gradient(circle, rgba(252, 211, 77, 0.3) 0%, transparent 70%)'
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Hover background */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-yellow-100 to-amber-100 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered && !isActive ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  {/* Active background with shimmer */}
                  {isActive && (
                    <>
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-linear-to-r from-yellow-300 to-amber-300 rounded-full shadow-lg"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          background: [
                            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 50%, transparent 100%)'
                          ],
                          backgroundPosition: ['200% 0%', '-200% 0%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{ backgroundSize: '200% 100%' }}
                      />
                    </>
                  )}
                  
                  {/* Hover glow */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      initial={{ boxShadow: '0 0 0 rgba(252, 211, 77, 0)' }}
                      animate={{ 
                        boxShadow: isHovered 
                          ? '0 0 20px rgba(252, 211, 77, 0.5), inset 0 0 15px rgba(252, 211, 77, 0.2)'
                          : '0 0 0 rgba(252, 211, 77, 0)'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  {/* Text with particle effect on hover */}
                  <span className={`relative z-10 inline-block ${
                    scrolled ? 'drop-shadow-sm' : ''
                  }`}>
                    {item}
                  </span>
                  
                  {/* Bottom line indicator */}
                  {!isActive && (
                    <motion.div
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-linear-to-r from-yellow-400 to-amber-400 rounded-full"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ 
                        width: isHovered ? '70%' : 0,
                        opacity: isHovered ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Sparkle effect on hover */}
                  {isHovered && !isActive && (
                    <>
                      <motion.div
                        className="absolute -top-1 right-2 w-1 h-1 bg-yellow-400 rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          y: [-5, -10]
                        }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      />
                      <motion.div
                        className="absolute -bottom-1 left-3 w-1 h-1 bg-amber-400 rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          y: [5, 10]
                        }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      />
                    </>
                  )}
                </motion.button>
              </MagneticWrapper>
            );
          })}
        </div>

        {/* Desktop Actions - Terminal Toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Terminal Toggle Button */}
          <MagneticWrapper strength={0.3}>
            <motion.button
              onClick={toggleTerminalMode}
              title='Switch to Terminal Mode'
              className={`relative p-3 rounded-xl font-bold transition-all duration-300 overflow-hidden group ${
                isTerminalMode
                  ? 'bg-linear-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/50'
                  : scrolled 
                    ? 'bg-gray-800 text-green-400 shadow-md hover:shadow-lg hover:shadow-gray-800/50' 
                    : 'bg-gray-900 text-green-400 shadow-md hover:shadow-lg hover:shadow-gray-900/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background animation */}
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-green-400/20 to-emerald-500/20"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Icon with pulse animation */}
              <motion.div
                animate={{
                  scale: isTerminalMode ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 1.5,
                  repeat: isTerminalMode ? Infinity : 0,
                }}
                className="relative z-10"
              >
                <Terminal className="w-5 h-5" />
              </motion.div>

              {/* Glitch effect on hover */}
              <motion.div
                className="absolute inset-0 bg-green-400/30"
                initial={{ opacity: 0, x: '-100%' }}
                whileHover={{ 
                  opacity: [0, 0.5, 0],
                  x: ['100%', '-100%']
                }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Tooltip */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                <div className="px-3 py-1 rounded-md bg-gray-900 text-green-400 text-xs font-medium shadow-xl">
                  {isTerminalMode ? 'Exit Terminal' : 'Terminal Mode'}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
              </div>
            </motion.button>
          </MagneticWrapper>

          {/* CTA Button */}
          <MagneticWrapper strength={0.4}>
            <LiquidButton
              onClick={() => scrollToSection('contact')}
              className={`text-gray-900 font-bold bg-linear-to-r from-yellow-300 to-amber-400 hover:from-yellow-400 hover:to-amber-500 transition-all duration-300 ${
                scrolled 
                  ? 'shadow-lg hover:shadow-xl hover:shadow-yellow-500/50' 
                  : 'shadow-md hover:shadow-lg hover:shadow-yellow-500/40'
              }`}
            >
              Let's Talk
            </LiquidButton>
          </MagneticWrapper>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
            scrolled 
              ? 'bg-white/70 backdrop-blur-lg border border-yellow-300/70 shadow-md' 
              : 'bg-white/50 backdrop-blur-md border border-yellow-200/50'
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <motion.div
            animate={{ rotate: mobileOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" style={{ color: '#C3E41D' }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: scrolled ? '#404040' : '#6b7280' }} />
            )}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu - Enhanced */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 overflow-hidden"
          >
            <div className={`rounded-2xl p-4 space-y-2 border transition-all duration-300 ${
              scrolled 
                ? 'bg-white/85 backdrop-blur-xl border-yellow-300/70 shadow-lg' 
                : 'bg-white/70 backdrop-blur-lg border-yellow-200/50'
            }`}>
              {navItems.map((item, index) => {
                const isActive = activeSection === item.toLowerCase();
                
                return (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`relative block w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden ${
                      isActive 
                        ? 'bg-linear-to-r from-yellow-300 to-amber-300 text-gray-900 shadow-md' 
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ x: 5 }}
                  >
                    {/* Hover background */}
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 bg-linear-to-r from-yellow-100 to-amber-100"
                        initial={{ opacity: 0, x: -100 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    <div className="relative flex items-center justify-between">
                      <span>{item}</span>
                      {isActive && (
                        <motion.div
                          className="w-2 h-2 rounded-full bg-gray-900"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        />
                      )}
                    </div>
                  </motion.button>
                );
              })}

              {/* Terminal Toggle - Mobile */}
              <motion.button
                
                onClick={toggleTerminalMode}
                className={`relative block w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden ${
                  isTerminalMode
                    ? 'bg-linear-to-r from-green-400 to-emerald-500 text-white shadow-md'
                    : 'bg-gray-900 text-green-400'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                whileTap={{ scale: 0.98 }}
                whileHover={{ x: 5 }}
              >
                <div className="relative flex items-center gap-3">
                  <Terminal className="w-5 h-5" />
                  <span>{isTerminalMode ? 'Exit Terminal Mode' : 'Terminal Mode'}</span>
                </div>
              </motion.button>

              {/* CTA Button - Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navItems.length + 1) * 0.1 }}
                className="pt-2"
              >
                <LiquidButton
                  onClick={() => scrollToSection('contact')}
                  className="w-full text-gray-900 font-bold bg-linear-to-r from-yellow-300 to-amber-400 hover:from-yellow-400 hover:to-amber-500 shadow-lg"
                >
                  Let's Talk
                </LiquidButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
