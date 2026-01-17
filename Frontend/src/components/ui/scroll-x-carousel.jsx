'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';

// Context for sharing scroll progress
const ScrollXCarouselContext = React.createContext(null);

export function useScrollXCarousel() {
  const context = React.useContext(ScrollXCarouselContext);
  if (!context) {
    throw new Error('useScrollXCarousel must be used within a ScrollXCarousel');
  }
  return context;
}

// Main Carousel Wrapper
export function ScrollXCarousel({ children, className, ...props }) {
  const carouselRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: carouselRef,
  });

  return (
    <ScrollXCarouselContext.Provider value={{ scrollYProgress }}>
      <div
        ref={carouselRef}
        className={cn('relative w-screen max-w-full', className)}
        {...props}
      >
        {children}
      </div>
    </ScrollXCarouselContext.Provider>
  );
}

// Sticky Container
export function ScrollXCarouselContainer({ className, ...props }) {
  return (
    <div
      className={cn(
        'sticky overflow-x-auto overflow-y-hidden max-width-[100vw] w-full top-0 left-0 scroll-smooth snap-x snap-mandatory',
        className
      )}
      {...props}
    />
  );
}

// Horizontal Wrap with Motion
export function ScrollXCarouselWrap({ className, style, xRagnge = ['0%', '-80%'], ...props }) {
  const { scrollYProgress } = useScrollXCarousel();
  const x = useTransform(scrollYProgress, [0, 1], xRagnge);

  return (
    <motion.div
      className={cn('w-fit flex [&>*]:snap-center', className)}
      style={{ x, ...style }}
      {...props}
    />
  );
}

// Scroll Progress Bar
export function ScrollXCarouselProgress({ className, style, progressStyle, ...props }) {
  const { scrollYProgress } = useScrollXCarousel();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className={cn('max-w-screen overflow-hidden', className)} {...props}>
      <motion.div
        className={cn('origin-left', progressStyle)}
        style={{ scaleX, ...style }}
      />
    </div>
  );
}
