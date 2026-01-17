import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronRight, Palette, Zap, Layout } from "lucide-react";
import  Card  from "../../../ui/card";
import  Button  from "../../../ui/button";
import { useNavigate } from "react-router-dom";  

export function ModernCard() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const floatingIcons = [
    { Icon: Palette, delay: 0 },
    { Icon: Zap, delay: 0.2 },
    { Icon: Layout, delay: 0.4 },
  ];
  const handleNavigate = (path) => {
    navigate(path);
  }
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: -2, rotateX: 2 }}
      transition={{ duration: 0.3 }}
      style={{ perspective: 1000 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 border-0 overflow-hidden h-full flex flex-col relative group cursor-pointer">
        {/* Glassmorphic Overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />

        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            x: isHovered ? [0, 20, 0] : 0,
            y: isHovered ? [0, -20, 0] : 0,
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: isHovered ? [1, 1.3, 1] : 1,
            x: isHovered ? [0, -20, 0] : 0,
            y: isHovered ? [0, 20, 0] : 0,
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />

        {/* Content */}
        <div className="p-8 flex-1 flex flex-col relative z-10">
          {/* Icon */}
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/30">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-3xl text-white mb-4">Modern UI Portfolio</h3>

          {/* Description */}
          <div className="space-y-2 mb-6 flex-1">
            <p className="text-white/90">✓ Smooth glassmorphic design</p>
            <p className="text-white/90">✓ Interactive micro-animations</p>
            <p className="text-white/90">✓ Beautiful gradient overlays</p>
            <p className="text-white/90">✓ Responsive card layouts</p>
          </div>

          {/* Animated Preview */}
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-4 mb-6 min-h-[60px] relative overflow-hidden">
            <div className="flex gap-2 justify-center items-center h-full">
              {floatingIcons.map(({ Icon, delay }, index) => (
                <motion.div
                  key={index}
                  animate={
                    isHovered
                      ? { y: [0, -10, 0], rotate: [0, 10, -10, 0] }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay,
                  }}
                >
                  <Icon className="h-6 w-6 text-white" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Button */}
          <Button
            className="bg-white hover:bg-white/90 text-purple-600 w-full group/btn"
            onClick={() => handleNavigate("/modern-ui")}
          >
            <span>Explore Modern UI</span>
            <ChevronRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Shine Effect on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%", skewX: -20 }}
          animate={isHovered ? { x: "200%" } : { x: "-100%" }}
          transition={{ duration: 0.8 }}
        />
      </Card>
    </motion.div>
  );
}
