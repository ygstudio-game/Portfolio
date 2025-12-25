import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql,
  SiGit, SiDocker, SiVercel,
  SiHtml5, SiCss3, SiPython,
} from 'react-icons/si';
import { Code2, Zap, Database } from 'lucide-react';
import MagneticWrapper from '../features/MagneticWrapper';
import LogoLoop from '../features/LogoLoop';
import { portfolioData } from '@data/portfolioData';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Icon mapping - only includes icons for skills in your data
  const iconMap = {
    // Frontend
    'React': SiReact,
    'Next.js': SiNextdotjs,
    'TypeScript': SiTypescript,
    'JavaScript': SiJavascript,
    'Tailwind CSS': SiTailwindcss,
    'HTML/CSS': SiHtml5,
    
    // Backend
    'Node.js': SiNodedotjs,
    'Express': SiExpress,
    'Python': SiPython,
    'Java': Code2,
    
    // Database
    'MongoDB': SiMongodb,
    
    // Tools
    'Git': SiGit,
    'Docker': SiDocker,
    'AWS': Database,  
    'Vercel': SiVercel,
  };

  // Transform portfolio data into logo format with fallback icon
  const transformSkillsToLogos = (skillsArray) => {
    return skillsArray
      .filter(skill => iconMap[skill.name]) // Only include skills with icons
      .map(skill => {
        const Icon = iconMap[skill.name];
        return {
          node: <Icon className="w-full h-full" />,
          title: skill.name,
          ariaLabel: skill.name,
          level: skill.level
        };
      });
  };

  // Get skills from portfolio data
  const { frontend, backend, database, tools } = portfolioData.skills;

  // Organize skills into rows - only skills with icons
  const frontendLogos = transformSkillsToLogos(frontend);
  const backendLogos = transformSkillsToLogos([...backend, ...database]);
  const toolsLogos = transformSkillsToLogos(tools);

  const allSkills = [...frontendLogos, ...backendLogos, ...toolsLogos];

  // Render function for skill items
  const renderSkillItem = (item, key) => (
    <div 
      key={key}
      className="relative group/tech"
    >
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-yellow-300 shadow-lg flex items-center justify-center group-hover/tech:border-yellow-400 group-hover/tech:shadow-yellow-500/50 transition-all duration-300 p-4 text-gray-800">
        {item.node}
      </div>
      
      {/* Tooltip with skill level */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
        <div className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium whitespace-nowrap shadow-xl">
          <div className="text-center mb-1">{item.title}</div>
          {item.level && (
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-yellow-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.level}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              <span className="text-xs text-yellow-400">{item.level}%</span>
            </div>
          )}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      </div>
    </div>
  );

  return (
    <section 
      id="skills" 
      ref={ref} 
      className="relative py-20 px-4 bg-gradient-to-b from-white via-yellow-50/30 to-white overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
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

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-100 border-2 border-yellow-300 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-700">Tech Stack</span>
          </motion.div>

          <MagneticWrapper strength={0.2}>
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 cursor-pointer"
              style={{ 
                color: '#C3E41D',
                fontFamily: "'Fira Code', monospace"
              }}
            >
              Technologies & Tools
            </h2>
          </MagneticWrapper>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Hover over icons to slow down and see details
          </p>
        </motion.div>

        {/* Icon Loops - Only show if there are skills */}
        <div className="space-y-4 pb-16">
          {/* Row 1 - Frontend Technologies */}
          {frontendLogos.length > 0 && (
            <LogoLoop
              logos={frontendLogos}
              speed={120}
              direction="left"
              logoHeight={900}
              gap={32}
              hoverSpeed={20}
              scaleOnHover
              fadeOut
              fadeOutColor="#ffffff"
              ariaLabel="Frontend technologies"
              renderItem={renderSkillItem}
            />
          )}

          {/* Row 2 - Backend & Database */}
          {backendLogos.length > 0 && (
            <LogoLoop
              logos={backendLogos}
              speed={100}
              direction="right"
              logoHeight={900}
              gap={32}
              hoverSpeed={20}
              scaleOnHover
              fadeOut
              fadeOutColor="#ffffff"
              ariaLabel="Backend technologies"
              renderItem={renderSkillItem}
            />
          )}

          {/* Row 3 - Tools */}
          {toolsLogos.length > 0 && (
            <LogoLoop
              logos={toolsLogos}
              speed={140}
              direction="left"
              logoHeight={900}
              gap={32}
              hoverSpeed={25}
              scaleOnHover
              fadeOut
              fadeOutColor="#ffffff"
              ariaLabel="Development tools"
              renderItem={renderSkillItem}
            />
          )}
        </div>

        {/* Stats Section - Dynamic from data */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Technologies', value: allSkills.length, icon: Code2 },
            { label: 'Frontend', value: frontendLogos.length, icon: SiReact },
            { label: 'Backend', value: backendLogos.length, icon: Database },
            { label: 'Tools', value: toolsLogos.length, icon: SiGit },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-300 group"
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <motion.div
                className="flex justify-center mb-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-8 h-8 text-yellow-600 group-hover:text-yellow-500 transition-colors" />
              </motion.div>
              <motion.div
                className="text-4xl font-bold text-yellow-600 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring" }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
