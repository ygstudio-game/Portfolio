// src/components/layout/Footer.jsx
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Heart, Code2, Sparkles } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';
import MagneticWrapper from '../features/MagneticWrapper';
import { portfolioData } from '@data/portfolioData';
import VariableProximity from '@ui/VariableProximity';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
const containerRef = useRef(null);

  const { personalInfo } = portfolioData;

  const socialLinks = [
    { icon: Github, url: personalInfo.social.github, label: 'GitHub' },
    { icon: Linkedin, url: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: SiInstagram, url: personalInfo.social.instagram, label: 'Instagram' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-4 border-t-2 border-yellow-200/50 bg-linear-to-b from-white to-yellow-50/30 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(252, 211, 77, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(252, 211, 77, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center gap-8">
          {/* Name/Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 
              className="text-6xl md:text-7xl font-bold cursor-pointer"
              style={{ 
                color: '#C3E41D',
              }}
            >
                          <div
ref={containerRef}
style={{position: 'relative'}}
>
  <VariableProximity
    label= {personalInfo.name}
    className={'variable-proximity-demo'}
    fromFontVariationSettings="'wght' 300, 'opsz' 9"
    toFontVariationSettings="'wght' 1000, 'opsz' 40"
    containerRef={containerRef}
    radius={200}
    falloff='exponential'
  />
</div>
            </h3>
 
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {socialLinks.map((social, index) => (
              <MagneticWrapper key={index} strength={0.4}>
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 rounded-full bg-white/70 backdrop-blur-sm border-2 border-yellow-200/50 hover:border-yellow-400 text-gray-700 hover:text-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              </MagneticWrapper>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div 
            className="w-full max-w-md h-px bg-linear-to-r from-transparent via-yellow-300 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* Copyright & Credits */}
          <motion.div 
            className="text-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-gray-700 flex items-center gap-2 flex-wrap justify-center text-sm md:text-base">
              <span>© {currentYear}</span>
              <span 
                className="font-bold"
                style={{ color: '#C3E41D' }}
              >
                {personalInfo.name}
                
              </span>
              <span>•</span>
              <span>All rights reserved</span>
            </p>
            
            <motion.div 
              className="text-gray-600 flex items-center gap-2 flex-wrap justify-center text-sm"
              whileHover={{ scale: 1.02 }}
            >
              <span>Crafted with</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </motion.div>
              <span>using</span>
              <span className="font-semibold text-gray-700">React</span>
              <Code2 className="w-4 h-4 text-yellow-600" />
              <span className="font-semibold text-gray-700">Tailwind CSS</span>
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold text-gray-700">Framer Motion</span>
            </motion.div>
          </motion.div>

          {/* Back to Top Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mb-12'
          >
            <MagneticWrapper strength={0.5}>
              <motion.button
                onClick={scrollToTop}
                className="p-4 rounded-full bg-linear-to-r from-yellow-300 to-amber-400 text-gray-900 shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 group"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
              </motion.button>
            </MagneticWrapper>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
