import { Timeline } from '@ui/Timeline';
import { Briefcase, GraduationCap, Award, Code2, Zap, ChevronDown } from 'lucide-react';
import { portfolioData } from '@data/portfolioData';
import { motion } from 'framer-motion';

const Experience = () => {
  const { experience } = portfolioData;

  const getIcon = (index) => {
    const icons = [Briefcase, GraduationCap, Award, Code2];
    const Icon = icons[index % icons.length];
    return Icon;
  };

  // Transform your data to match Timeline component structure
  const timelineData = experience.map((item, index) => {
    const Icon = getIcon(index);
    
    return {
      title: item.date,
      content: (
        <div className="group/content">
          {/* Header with Icon */}
          <div className="flex items-start gap-4 mb-6">
            <motion.div 
              className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-yellow-100 to-amber-100 border-2 border-yellow-300 flex items-center justify-center"
              whileHover={{ 
                scale: 1.15,
                rotate: [0, -10, 10, 0],
                borderColor: '#f59e0b',
                boxShadow: "0 10px 25px rgba(252, 211, 77, 0.4)"
              }}
              transition={{ duration: 0.4 }}
            >
              <Icon className="w-6 h-6 text-gray-800 group-hover/content:text-yellow-600 transition-colors duration-300" />
            </motion.div>
            
            <div className="flex-1">
              <motion.h3 
                className="text-xl md:text-2xl font-bold text-gray-900 mb-2"
                whileHover={{ 
                  color: '#C3E41D',
                  x: 5
                }}
                transition={{ duration: 0.3 }}
              >
                {item.title}
              </motion.h3>
              <motion.p 
                className="text-base md:text-lg text-gray-600 font-medium mb-2"
                whileHover={{ 
                  color: '#f59e0b',
                  x: 5
                }}
                transition={{ duration: 0.3 }}
              >
                {item.organization}
              </motion.p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            {item.description}
          </p>

          {/* Hover Details - Hidden by default, shown in Timeline component */}
          {item.hoverDetails && item.hoverDetails.length > 0 && (
            <div className="hover-details-section mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px flex-1 bg-linear-to-r from-yellow-200 to-transparent"></div>
                <span className="text-xs font-semibold text-yellow-600 uppercase tracking-wide flex items-center gap-1">
                  <ChevronDown className="w-3 h-3" />
                  Key Highlights
                </span>
                <div className="h-px flex-1 bg-linear-to-l from-yellow-200 to-transparent"></div>
              </div>
              
              <ul className="space-y-2">
                {item.hoverDetails.map((detail, detailIndex) => (
                  <motion.li
                    key={detailIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: detailIndex * 0.1 }}
                    className="flex items-start gap-3 text-sm text-gray-700"
                  >
                    <span className="shrink-0 w-5 h-5 rounded-full bg-yellow-100 border border-yellow-300 flex items-center justify-center text-yellow-600 font-bold text-xs mt-0.5">
                      {detailIndex + 1}
                    </span>
                    <span className="flex-1">{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills with Individual Hover */}
          {item.skills && item.skills.length > 0 && (
            <div className="pt-4 border-t border-yellow-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Technologies Used
              </p>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="px-3 py-1 text-xs md:text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full border border-yellow-300"
                    whileHover={{ 
                      scale: 1.1,
                      y: -2,
                      backgroundColor: '#fef3c7',
                      borderColor: '#f59e0b',
                      boxShadow: "0 5px 15px rgba(252, 211, 77, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
    };
  });

  return (
    <section id="experience" className="relative bg-linear-to-b from-white via-yellow-50/20 to-white">
      {/* Background Pattern with Animation */}
      <motion.div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
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
      </motion.div>

      {/* Custom Header */}
      <div className="max-w-7xl mx-auto pt-20 px-4 md:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-100 border-2 border-yellow-300 mb-6"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(252, 211, 77, 0.3)"
            }}
            transition={{ duration: 0.3 }}
          >
            <Zap className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-700">My Journey</span>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 cursor-pointer"
            style={{ 
              color: '#C3E41D',
              fontFamily: "'Fira Code', monospace"
            }}
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 5px 20px rgba(195, 228, 29, 0.3)"
            }}
            transition={{ duration: 0.3 }}
          >
            Experience & Education
          </motion.h2>
          <span className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Hover over cards to see detailed highlights
          </span>
        </motion.div>
      </div>

      {/* Timeline Component */}
      <Timeline data={timelineData} />
    </section>
  );
};

export default Experience;
