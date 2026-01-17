import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Zap, Award, Mail } from 'lucide-react';
import './ScrollIndicator.css';

const ScrollIndicator = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [currentSection, setCurrentSection] = useState('Hero');
  const [isVisible, setIsVisible] = useState(false);

  // Define sections with their IDs and icons
  const sections = [
    { id: 'hero', name: 'Hero', icon: Home },
    { id: 'about', name: 'About', icon: User },
    { id: 'projects', name: 'Projects', icon: Briefcase },
    { id: 'skills', name: 'Skills', icon: Zap },
    { id: 'experience', name: 'Experience', icon: Award },
    { id: 'contact', name: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const calculateScrollPercentage = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollPercentage(scrolled);

      // Show indicator after scrolling
      setIsVisible(winScroll > 100);

      // Automatically detect current section
      const current = sections.find(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (current) {
        setCurrentSection(current.name);
      }
    };

    window.addEventListener('scroll', calculateScrollPercentage, { passive: true });
    calculateScrollPercentage();

    return () => window.removeEventListener('scroll', calculateScrollPercentage);
  }, []);

  const currentSectionData = sections.find(s => s.name === currentSection);
  const CurrentIcon = currentSectionData?.icon || Home;

  return (
    <>
      {/* Progress Bar */}
      <div className="scroll-indicator-wrapper">
        <motion.div
          className="scroll-progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${scrollPercentage}%` }}
          transition={{ duration: 0.1 }}
        >
          <motion.div
            className="progress-glow"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>

      {/* Section Badge */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="scroll-badge"
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Icon with Animation */}
            <motion.div
              key={currentSection}
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="section-icon-wrapper"
            >
              <CurrentIcon className="section-icon" />
            </motion.div>

            {/* Section Name */}
            <motion.span
              key={`name-${currentSection}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="section-name"
            >
              {currentSection}
            </motion.span>

            {/* Divider */}
            <div className="divider" />

            {/* Percentage */}
            <motion.span
              className="percentage"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.3 }}
            >
              {Math.round(scrollPercentage)}%
            </motion.span>

            {/* Progress Ring */}
            <svg className="progress-ring" width="40" height="40">
              <circle
                className="progress-ring-bg"
                cx="20"
                cy="20"
                r="16"
                strokeWidth="2"
              />
              <motion.circle
                className="progress-ring-circle"
                cx="20"
                cy="20"
                r="16"
                strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * 16}`}
                initial={{ strokeDashoffset: `${2 * Math.PI * 16}` }}
                animate={{
                  strokeDashoffset: `${2 * Math.PI * 16 * (1 - scrollPercentage / 100)}`
                }}
                transition={{ duration: 0.1 }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollIndicator;
