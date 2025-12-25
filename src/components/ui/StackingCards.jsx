// src/components/ui/StackingCards.jsx
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll } from 'motion/react';
import { useRef, forwardRef } from 'react';
import MagneticWrapper from '../pages/ModernPage/components/features/MagneticWrapper';

export const Card = ({
  i,
  icon,
  title,
  description,
  gradient,
  accentColor,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-screen w-full flex items-center justify-center sticky top-0'
    >
      <MagneticWrapper  strength={0.15}>
        <motion.div
          style={{
            scale,
            top: `calc(-5vh + ${i * 25}px)`,
          }}
          className={`flex flex-col relative -top-[25%] h-[450px] w-[90%] max-w-5xl rounded-[40px] p-10 md:p-12 origin-top bg-linear-to-br ${gradient} border-2 border-yellow-200 shadow-2xl hover:shadow-yellow-300/50 transition-shadow duration-300`}
        >
          <div className="flex flex-col h-full justify-between">
            {/* Icon with magnetic effect */}
            <MagneticWrapper strength={0.3}>
              <div 
                className="inline-flex p-4 rounded-2xl bg-white/90 w-fit backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300" 
                style={{ color: accentColor }}
              >
                {icon}
              </div>
            </MagneticWrapper>

            {/* Content */}
            <div className="mt-6 flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 hover:text-yellow-700 transition-colors duration-300">
                {title}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Bottom Bar */}
            <div className="mt-auto pt-6 flex items-center justify-between">
              <motion.div 
                className="h-1 rounded-full"
                style={{ backgroundColor: accentColor }}
                initial={{ width: '6rem' }}
                whileHover={{ width: '8rem' }}
                transition={{ duration: 0.3 }}
              />
              <span className="text-sm font-mono text-gray-400">0{i + 1}</span>
            </div>
          </div>
        </motion.div>
      </MagneticWrapper>
    </div>
  );
};

const StackingCards = forwardRef(({ cards }, ref) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div className='  w-full' ref={container}>
      {/* Title Section */}
      <section className='h-[20vh] w-full bg-white grid place-content-center relative'>
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-30 pointer-events-none'>
          <div 
            className='w-full h-full'
            style={{
              backgroundImage: `
                linear-gradient(rgba(252, 211, 77, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(252, 211, 77, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <div className='relative z-10 text-center px-4'>
          <MagneticWrapper strength={0.2}>
            <motion.h1 
              className='text-6xl md:text-7xl font-bold mb-6 cursor-pointer'
              style={{ color: '#C3E41D', fontFamily: "'Fira Code', monospace" }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              About Me
            </motion.h1>
          </MagneticWrapper>
          <motion.p 
            className='text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Transforming ideas into beautiful, interactive digital experiences
          </motion.p>
        </div>
      </section>

      {/* Stacking Cards */}
<section className="w-full bg-[radial-gradient(circle,white,rgba(255,235,23,0.2),white)]">
        {cards.map((card, i) => {
          const targetScale = 1 - (cards.length - i) * 0.05;
          return (
            <Card
              key={`card_${i}`}
              i={i}
              icon={card.icon}
              title={card.title}
              description={card.description}
              gradient={card.gradient}
              accentColor={card.accentColor}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </section>

      {/* Spacer */}
     </div>
  );
});

StackingCards.displayName = 'StackingCards';

export default StackingCards;
