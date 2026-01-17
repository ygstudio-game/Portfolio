import { motion } from 'motion/react';
import { TerminalCard } from './TerminalCard';
import { ModernCard } from './ModernCard';

export function PortfolioCards() {
  return (
    <div className="min-h-screen bg-[#040505] flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Pick Your Portfolio Style
          </h2>
          <p className="text-xl text-white/70">
            Hover to preview, click to explore the full experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <TerminalCard />
          <ModernCard />
        </div>
      </div>
    </div>
  );
}
