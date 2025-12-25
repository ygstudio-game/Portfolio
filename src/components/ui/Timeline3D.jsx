  // src/components/ui/Timeline3D.jsx
  import React, { useState, useEffect, useRef } from 'react';
  import { motion, useAnimation } from 'framer-motion';
  import { useInView } from 'react-intersection-observer';

  export const Timeline3D = ({ events }) => {
    const [activeEvent, setActiveEvent] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
      const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
        });
      };

      const container = containerRef.current;
      if (container) {
        container.addEventListener('mousemove', handleMouseMove);
      }

      return () => {
        if (container) {
          container.removeEventListener('mousemove', handleMouseMove);
        }
      };
    }, []);

    return (
      <div
        className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        ref={containerRef}
      >
        <div className="max-w-7xl mx-auto relative">
          {/* Decorative floating elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-yellow-300 opacity-10"
                animate={{
                  x: [`${20 + i * 10}%`, `${30 + i * 8}%`, `${20 + i * 10}%`],
                  y: [`${10 + i * 12}%`, `${20 + i * 10}%`, `${10 + i * 12}%`],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 15 + i * 2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
                style={{
                  width: `${60 + i * 20}px`,
                  height: `${60 + i * 20}px`,
                  filter: 'blur(8px)',
                }}
              />
            ))}
          </div>

          {/* Title */}
          <motion.div
            className="relative z-10 text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-5xl md:text-6xl font-bold mb-4"
              style={{ color: '#C3E41D', fontFamily: "'Fira Code', monospace" }}
            >
              Journey & Experience
            </h2>
            <p className="text-xl text-gray-600">
              My professional path and key milestones
            </p>
          </motion.div>

          <div className="relative">
            {/* Central line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-yellow-300 rounded-full shadow-lg" />

            {/* Timeline events */}
            {events.map((event, index) => {
              const [ref, inView] = useInView({
                threshold: 0.3,
                triggerOnce: false,
              });
              const controls = useAnimation();

              useEffect(() => {
                if (inView) {
                  controls.start('visible');
                }
              }, [controls, inView]);

              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={event.id}
                  ref={ref}
                  className={`relative mb-16 md:mb-24 ${isEven ? 'md:ml-auto' : 'md:mr-auto'} md:w-1/2 flex ${
                    isEven ? 'md:justify-start' : 'md:justify-end'
                  }`}
                  initial="hidden"
                  animate={controls}
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: isEven ? 50 : -50,
                      y: 20,
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: 'easeOut',
                      },
                    },
                  }}
                >
                  {/* Timeline node */}
                  <div
                    className={`absolute left-1/2 md:left-auto ${
                      isEven ? 'md:left-0' : 'md:right-0'
                    } top-0 transform -translate-x-1/2 z-20`}
                  >
                    <motion.div
                      className="w-10 h-10 rounded-full bg-linear-to-br from-yellow-300 to-amber-400 flex items-center justify-center border-4 border-white shadow-lg cursor-pointer"
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setActiveEvent(activeEvent === event.id ? null : event.id)}
                      animate={{
                        boxShadow:
                          activeEvent === event.id
                            ? [
                                '0 0 0 rgba(252, 211, 77, 0.5)',
                                '0 0 20px rgba(252, 211, 77, 0.8)',
                                '0 0 0 rgba(252, 211, 77, 0.5)',
                              ]
                            : '0 0 0 rgba(252, 211, 77, 0)',
                      }}
                      transition={{
                        repeat: activeEvent === event.id ? Infinity : 0,
                        duration: 1.5,
                      }}
                    >
                      {event.icon}
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <motion.div
                    className={`relative z-10 bg-linear-to-br from-yellow-50 to-amber-50 rounded-2xl overflow-hidden shadow-xl w-full md:w-[calc(100%-2rem)] ${
                      isEven ? 'md:ml-12' : 'md:mr-12'
                    } border-2 border-yellow-200`}
                    whileHover={{
                      y: -5,
                      x: isEven ? 5 : -5,
                      transition: { duration: 0.3 },
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `perspective(1000px) rotateY(${
                        mousePosition.x * (isEven ? -3 : 3)
                      }deg) rotateX(${mousePosition.y * -3}deg)`,
                    }}
                    onMouseEnter={() => setActiveEvent(event.id)}
                    onMouseLeave={() => setActiveEvent(null)}
                  >
                    <div className="p-6">
                      {/* Date */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-mono text-yellow-700 tracking-wider font-bold">
                          {event.date}
                        </span>
                        <motion.div 
                          className="w-3 h-3 rounded-full bg-yellow-400"
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7] 
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 2,
                          }}
                        />
                      </div>

                      {/* Organization Badge */}
                      {event.organization && (
                        <span className="inline-block px-3 py-1 rounded-full bg-yellow-200 text-yellow-800 text-xs font-semibold mb-3">
                          {event.organization}
                        </span>
                      )}

                      {/* Title */}
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">{event.title}</h3>
                      
                      {/* Description */}
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: activeEvent === event.id ? 'auto' : 0,
                          opacity: activeEvent === event.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-700 mt-3 leading-relaxed">
                          {event.description}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {event.skills?.map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs rounded-full bg-white text-gray-700 border border-yellow-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Bottom accent bar */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-yellow-400 to-amber-500"
                      initial={{ width: "0%" }}
                      animate={{ width: activeEvent === event.id ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  export default Timeline3D;
