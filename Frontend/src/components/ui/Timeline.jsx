// src/components/ui/Timeline.jsx
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [magneticPositions, setMagneticPositions] = useState({});

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, hoveredIndex]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Check if touch device
  const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches;
  };

  // Magnetic effect handler
  const handleMouseMove = (e, index, cardRef) => {
    if (isTouchDevice()) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = cardRef.getBoundingClientRect();
    
    // Calculate magnetic strength (0.15 for subtle effect)
    const strength = 0.15;
    const middleX = (clientX - (left + width / 2)) * strength;
    const middleY = (clientY - (top + height / 2)) * strength;
    
    setMagneticPositions(prev => ({
      ...prev,
      [index]: { x: middleX, y: middleY }
    }));
  };

  // Reset magnetic position
  const resetMagneticPosition = (index) => {
    setMagneticPositions(prev => ({
      ...prev,
      [index]: { x: 0, y: 0 }
    }));
  };

  return (
    <div
      className="w-full bg-white font-sans md:px-10"
      ref={containerRef}
    >
      {/* Timeline Content */}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => {
          const cardRef = useRef(null);
          const magneticPos = magneticPositions[index] || { x: 0, y: 0 };

          return (
            <motion.div
              key={index}
              className="flex justify-start pt-10 md:pt-40 md:gap-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Sticky Date Section */}
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                {/* Timeline Dot with Enhanced Hover */}
                <motion.div 
                  className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-yellow-300 cursor-pointer"
                  whileHover={{ 
                    scale: 1.3,
                    borderColor: '#f59e0b',
                    boxShadow: "0 10px 30px rgba(252, 211, 77, 0.5)"
                  }}
                  animate={{
                    boxShadow: hoveredIndex === index
                      ? [
                          '0 0 0 rgba(252, 211, 77, 0.5)',
                          '0 0 20px rgba(252, 211, 77, 0.8)',
                          '0 0 0 rgba(252, 211, 77, 0.5)',
                        ]
                      : '0 5px 15px rgba(0, 0, 0, 0.1)',
                  }}
                  transition={{
                    repeat: hoveredIndex === index ? Infinity : 0,
                    duration: 1.5,
                  }}
                >
                  <motion.div 
                    className="h-4 w-4 rounded-full border-2 p-2"
                    style={{ 
                      backgroundColor: '#C3E41D',
                      borderColor: '#f59e0b'
                    }}
                    whileHover={{ 
                      scale: 1.3,
                      rotate: 180
                    }}
                    animate={{
                      rotate: hoveredIndex === index ? [0, 360] : 0,
                    }}
                    transition={{ 
                      duration: hoveredIndex === index ? 2 : 0.3,
                      repeat: hoveredIndex === index ? Infinity : 0,
                    }}
                  />
                </motion.div>
                
                {/* Date Text with Hover */}
                <motion.h3 
                  className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-gray-500"
                  whileHover={{ 
                    scale: 1.05,
                    color: '#C3E41D',
                    x: 10,
                    textShadow: "0 5px 15px rgba(195, 228, 29, 0.3)"
                  }}
                  animate={{
                    color: hoveredIndex === index ? '#C3E41D' : '#6b7280'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.title}
                </motion.h3>
              </div>

              {/* Content Section */}
              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                {/* Mobile Date */}
                <motion.h3 
                  className="md:hidden block text-2xl mb-4 text-left font-bold text-gray-500"
                  whileHover={{ 
                    color: '#C3E41D',
                    x: 5
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.title}
                </motion.h3>
                
                {/* Content Card with Magnetic Effect */}
                <motion.div
                  ref={cardRef}
                  layout
                  className="relative bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-yellow-200 overflow-hidden shadow-md cursor-pointer"
                  onMouseMove={(e) => handleMouseMove(e, index, cardRef.current)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    resetMagneticPosition(index);
                  }}
                  animate={{
                    x: magneticPos.x,
                    y: magneticPos.y + (hoveredIndex === index ? -8 : 0),
                    scale: hoveredIndex === index ? 1.01 : 1,
                    borderColor: hoveredIndex === index ? '#f59e0b' : '#fef08a',
                    boxShadow: hoveredIndex === index 
                      ? "0 25px 50px rgba(252, 211, 77, 0.4)" 
                      : "0 10px 25px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ 
                    x: { 
                      type: 'spring', 
                      stiffness: 150, 
                      damping: 15, 
                      mass: 0.1 
                    },
                    y: { 
                      type: 'spring', 
                      stiffness: 150, 
                      damping: 15, 
                      mass: 0.1 
                    },
                    scale: { duration: 0.3 },
                    borderColor: { duration: 0.3 },
                    boxShadow: { duration: 0.3 },
                    layout: { duration: 0.3 }
                  }}
                >
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-br from-yellow-50/0 to-amber-50/0 pointer-events-none"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    style={{
                      background: hoveredIndex === index 
                        ? 'linear-gradient(135deg, rgba(254, 243, 199, 0.3) 0%, rgba(252, 211, 77, 0.2) 100%)'
                        : 'transparent'
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content with padding */}
                  <div className="relative z-10 p-6 md:p-8">
                    {/* Always visible content */}
                    <div className="mb-4">
                      {React.Children.toArray(item.content.props.children).slice(0, 2)}
                    </div>

                    {/* Expandable hover details section */}
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: "auto", 
                            opacity: 1,
                          }}
                          exit={{ 
                            height: 0, 
                            opacity: 0,
                          }}
                          transition={{ 
                            duration: 0.4,
                            ease: "easeInOut"
                          }}
                          className="overflow-hidden"
                        >
                          {/* Find and render the hover-details-section */}
                          {React.Children.toArray(item.content.props.children).find(
                            child => child.props?.className?.includes('hover-details-section')
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Skills section - always visible */}
                    <div className="mt-4">
                      {React.Children.toArray(item.content.props.children).slice(-1)}
                    </div>
                  </div>
                  
                    {/* Bottom accent bar */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-1"
                    style={{
                      background: "linear-gradient(to right, #facc15, #f59e0b, #facc15)"
                    }}
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: hoveredIndex === index ? "100%" : "0%",
                    }}
                  />


                  {/* Top corner indicator */}
                  <motion.div 
                    className="absolute top-4 right-4 w-3 h-3 rounded-full bg-yellow-400"
                    animate={{ 
                      scale: hoveredIndex === index ? [1, 1.5, 1] : 1,
                      opacity: hoveredIndex === index ? [0.7, 1, 0.7] : 0.5,
                    }}
                    transition={{ 
                      repeat: hoveredIndex === index ? Infinity : 0, 
                      duration: 2,
                    }}
                  />

                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-20"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
                      transform: 'translateX(-100%)',
                    }}
                    animate={{
                      transform: hoveredIndex === index ? 'translateX(100%)' : 'translateX(-100%)',
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Corner decoration */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 opacity-20"
                    style={{
                      background: 'radial-gradient(circle at top right, #facc15, transparent 70%)',
                    }}
                    animate={{
                      scale: hoveredIndex === index ? 1.5 : 1,
                      opacity: hoveredIndex === index ? 0.3 : 0.1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
        
        {/* Animated Progress Line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-0.5 bg-linear-to-b from-transparent from-0% via-gray-200 to-transparent to-99% mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              background: "linear-gradient(to top, #facc15 0%, #f59e0b 10%, transparent 100%)"
            }}
            className="absolute inset-x-0 top-0 w-0.5 rounded-full"
            animate={{
              boxShadow: [
                "0 0 5px rgba(252, 211, 77, 0.5)",
                "0 0 20px rgba(252, 211, 77, 0.8)",
                "0 0 5px rgba(252, 211, 77, 0.5)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </div>
  );
};
