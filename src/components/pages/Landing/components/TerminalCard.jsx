import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, ChevronRight } from "lucide-react";
import  Card  from "../../../ui/card";
import  Button  from "../../../ui/button";
import { useNavigate } from "react-router-dom";  

export function TerminalCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const fullText = "> Welcome to Terminal Portfolio_";
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    if (!isHovered) {
      setDisplayText("");
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isHovered]);
  const handleNavigate = () => {
    navigate("/terminal");
    };

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 2, rotateX: 2 }}
      transition={{ duration: 0.3 }}
      style={{ perspective: 1000 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="bg-black border-2 border-green-500 overflow-hidden h-full flex flex-col relative group cursor-pointer">
        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(0,255,0,0.03)_50%)] bg-[length:100%_4px] pointer-events-none animate-[scan_8s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Content */}
        <div className="p-8 flex-1 flex flex-col relative z-10">
          {/* Icon */}
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/50">
              <Terminal className="h-8 w-8 text-green-500" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-3xl text-green-500 mb-4 font-mono">
            Terminal Portfolio
          </h3>

          {/* Description */}
          <div className="space-y-2 mb-6 flex-1">
            <p className="text-green-400 font-mono text-sm">
              {">"} Retro CLI aesthetic
            </p>
            <p className="text-green-400 font-mono text-sm">
              {">"} Interactive typing animations
            </p>
            <p className="text-green-400 font-mono text-sm">
              {">"} Command-line navigation
            </p>
            <p className="text-green-400 font-mono text-sm">
              {">"} ASCII art & glitch effects
            </p>
          </div>

          {/* Typing Animation Preview */}
          <div className="bg-green-950/50 border border-green-500/30 rounded p-4 mb-6 min-h-[60px] flex items-center">
            <span className="text-green-400 font-mono text-sm">
              {displayText}
              {isHovered && displayText.length < fullText.length && (
                <span className="animate-pulse">|</span>
              )}
            </span>
          </div>

          {/* Button */}
          <Button
            className="relative bg-green-500 hover:bg-green-400 text-black w-full group/btn overflow-hidden transition-all"
             onClick={handleNavigate}
          >
            <span className="font-mono relative z-10">Explore Terminal</span>
            <ChevronRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform z-10" />
            <div className="absolute inset-0 bg-green-400/40 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          </Button>
        </div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none animate-[gridMove_20s_linear_infinite]">
          <div className="h-full w-full bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,0,1)_25%,rgba(0,255,0,1)_26%,transparent_27%,transparent_74%,rgba(0,255,0,1)_75%,rgba(0,255,0,1)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
        </div>
      </Card>
    </motion.div>
  );
}
