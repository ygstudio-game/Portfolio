import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticWrapper = ({ 
  children, 
  strength = 0.3,
  disabled = false 
}) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Check if touch device
  const isTouchDevice = () => {
    return window.matchMedia('(pointer: coarse)').matches;
  };

  const handleMouse = (e) => {
    if (disabled || isTouchDevice()) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = (clientX - (left + width / 2)) * strength;
    const middleY = (clientY - (top + height / 2)) * strength;
    setPosition({ x: middleX, y: middleY });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      style={{ position: 'relative', display: 'flex' ,justifyContent: 'center', alignItems: 'center'}}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ 
        type: 'spring', 
        stiffness: 150, 
        damping: 15, 
        mass: 0.1 
      }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticWrapper;
