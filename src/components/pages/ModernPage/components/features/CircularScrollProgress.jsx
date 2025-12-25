// src/components/features/CircularScrollProgress.jsx
import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import './CircularScrollProgress.css';

const CircularScrollProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth spring animation for progress
  const smoothProgress = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      setScrollPercentage(scrolled);
      smoothProgress.set(scrolled);
      
      // Show indicator after scrolling 5%
      setIsVisible(scrolled > 5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [smoothProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollPercentage / 100) * circumference;

  return (
    <motion.div
      className="circular-scroll-progress"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.5,
        y: isVisible ? 0 : 20
      }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
    >
      {/* Glass background */}
      <div className="progress-glass-bg" />
      
      <svg className="progress-ring" width="60" height="60">
        {/* Background Circle */}
        <circle
          className="progress-ring-bg"
          cx="30"
          cy="30"
          r={radius}
          strokeWidth="3"
          fill="none"
        />
        
        {/* Progress Circle */}
        <motion.circle
          className="progress-ring-circle"
          cx="30"
          cy="30"
          r={radius}
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          animate={{ 
            strokeDashoffset: strokeDashoffset,
          }}
          transition={{ duration: 0.1 }}
        />
        
        {/* Yellow gradient */}
        <defs>
          <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#C3E41D" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Percentage Text */}
      <motion.span 
        className="progress-text"
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 0.3,
          repeat: scrollPercentage === 100 ? Infinity : 0,
          repeatDelay: 0.5
        }}
      >
        {Math.round(scrollPercentage)}
      </motion.span>

      {/* Up Arrow Icon */}
      <motion.div
        className="progress-arrow"
        animate={{ 
          y: [-2, 2, -2],
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path 
            d="M6 2L6 10M6 2L2 6M6 2L10 6" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default CircularScrollProgress;
