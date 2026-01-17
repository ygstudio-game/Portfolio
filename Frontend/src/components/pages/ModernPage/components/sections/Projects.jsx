import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '@data/portfolioData';
import MagneticWrapper from '../features/MagneticWrapper';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const { projects } = portfolioData;
  const isScrolling = useRef(false);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      
      // Only handle scroll when section is in view
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const scrollProgress = (window.innerHeight - rect.top) / (rect.height + window.innerHeight);
        const newIndex = Math.min(
          projects.length - 1,
          Math.floor(scrollProgress * projects.length)
        );
        
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      }
    };

    const throttledScroll = () => {
      if (!isScrolling.current) {
        isScrolling.current = true;
        requestAnimationFrame(() => {
          handleScroll();
          isScrolling.current = false;
        });
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [projects.length, activeIndex]);

  const currentProject = projects[activeIndex];

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      style={{ height: `${projects.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-yellow-300">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="relative flex flex-col justify-center p-8 md:p-16 border-r border-black/10">
{/* Pagination Bars */}
<div className="flex space-x-2 z-20 mb-8 md:mb-12 md:absolute md:top-28 md:left-16">
  {projects.map((_, index) => (
    <div
      key={index}
      className={`h-1 rounded-full transition-all duration-500 ease-in-out ${
        index === activeIndex ? 'w-12 bg-black/80' : 'w-6 bg-black/20'
      }`}
    />
  ))}
</div>


            {/* Project Info */}
            <div className="relative h-auto w-full">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`${index === activeIndex ? 'relative' : 'absolute'} inset-0 transition-all duration-700 ease-in-out ${
                    index === activeIndex
                      ? 'opacity-100 translate-y-0 z-10'
                      : 'opacity-0 translate-y-10 pointer-events-none'
                  }`}
                >
                  <div className="mb-4">
                    <span className="px-4 py-2 rounded-full bg-black/10 text-black text-sm font-semibold">
                      {project.category}
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black mb-6">
                    {project.title}
                  </h2>
                  
                  <p className="text-lg md:text-xl max-w-md text-black/80 mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs rounded-full bg-black/10 text-black border border-black/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    <MagneticWrapper strength={0.4}>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-black text-yellow-300 font-semibold rounded-full hover:bg-gray-800 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </MagneticWrapper>

                    <MagneticWrapper strength={0.4}>
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    </MagneticWrapper>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div 
            className="hidden md:flex items-center justify-center p-8"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '3.5rem 3.5rem',
            }}
          >
            <div className="relative w-[60%] h-[70vh] rounded-2xl overflow-hidden shadow-2xl border-4 border-black/10">
              <div
                className="absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateY(-${activeIndex * 100}%)` }}
              >
                {projects.map((project, index) => (
                  <div key={index} className="w-full h-full">
                    <div className="w-full h-full bg-linear-to-br from-yellow-100 to-yellow-50 flex items-center justify-center text-[120px] font-bold text-black/10">
                      {project.title.charAt(0)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
