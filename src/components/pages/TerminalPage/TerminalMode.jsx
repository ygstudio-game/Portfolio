// TerminalMode.jsx - Fixed GUI Switch & Background Reload
import { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TerminalBackground from './components/TerminalBackground';
import { portfolioData } from '@data/portfolioData';

const MemoizedTerminalBackground = memo(TerminalBackground, () => true);

// DYNAMIC COMMAND DEFINITIONS FROM DATA

const generateCommands = () => {
  const { personalInfo, aboutme, skills, projects, experience } = portfolioData;

  return {
    help: (
      <div className="text-dim">
        Available commands:<br />
        • gui - Switch to GUI Interface<br />
        • about - Learn about me<br />
        • skills - View technical skills<br />
        • projects - Browse my projects<br />
        • experience - Work history<br />
        • resume - Download my CV<br />
        • contact - Get in touch<br />
        • clear - Clear terminal<br />
        • exit - Exit the Terminal<br />
        • matrix - Enter the matrix<br />
        • sudo hire_me - Secret command
      </div>
    ),
    
    gui: (
      <div>
        <span className="text-primary">$ switching to GUI mode...</span><br />
        <span className="text-dim">Loading graphical interface...</span><br />
        <span className="text-accent">[████████████████████] 100%</span><br />
        <span className="text-success">✓ GUI mode activated!</span><br />
        <span className="text-dim">Redirecting in 1 seconds...</span>
      </div>
    ),
    
    about: (
      <div>
        <span className="text-primary">$ whoami</span><br />
        <span className="text-accent">{personalInfo.name}</span><br />
        <span className="text-dim">{personalInfo.title}</span><br /><br />
        
        {personalInfo.bio}<br /><br />
        
        <span className="text-dim">Location:</span> {personalInfo.location}<br />
        
        <div className="mt-2">
          <span className="text-primary">Key Areas:</span><br />
          {aboutme.slice(0, 3).map((item, idx) => (
            <span key={idx}>
              • {item.title}: {item.description}<br />
            </span>
          ))}
        </div>
      </div>
    ),

    skills: (
      <div>
        <span className="text-primary">$ ls -la /skills/</span><br /><br />
        
        <span className="text-accent">Frontend:</span><br />
        {skills.frontend.map((skill, idx) => (
          <span key={idx} className="text-dim">
            • {skill.name} {'█'.repeat(Math.floor(skill.level / 10))}{'░'.repeat(10 - Math.floor(skill.level / 10))} {skill.level}%<br />
          </span>
        ))}<br />
        
        <span className="text-accent">Backend:</span><br />
        {skills.backend.map((skill, idx) => (
          <span key={idx} className="text-dim">
            • {skill.name} {'█'.repeat(Math.floor(skill.level / 10))}{'░'.repeat(10 - Math.floor(skill.level / 10))} {skill.level}%<br />
          </span>
        ))}<br />
        
        <span className="text-accent">Database:</span><br />
        {skills.database.map((skill, idx) => (
          <span key={idx} className="text-dim">
            • {skill.name} {'█'.repeat(Math.floor(skill.level / 10))}{'░'.repeat(10 - Math.floor(skill.level / 10))} {skill.level}%<br />
          </span>
        ))}<br />
        
        <span className="text-accent">Tools:</span><br />
        {skills.tools.map((skill, idx) => (
          <span key={idx} className="text-dim">
            • {skill.name} {'█'.repeat(Math.floor(skill.level / 10))}{'░'.repeat(10 - Math.floor(skill.level / 10))} {skill.level}%<br />
          </span>
        ))}
      </div>
    ),

    projects: (
      <div>
        <span className="text-primary">$ find /projects -type f</span><br /><br />
        {projects.map((project, idx) => (
          <div key={project.id} className="mb-2">
            <span className="text-accent">[{idx + 1}] {project.title}</span><br />
            <span className="text-dim">    {project.description}</span><br />
            <span className="text-dim">    Tech: {project.techStack.join(', ')}</span><br />
            {project.liveLink && (
              <span className="text-success">    🔗 Live: <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="terminal-link">{project.liveLink}</a></span>
            )}<br />
            {project.githubLink && (
              <span className="text-dim">    📂 Code: <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="terminal-link">{project.githubLink}</a></span>
            )}<br />
          </div>
        ))}
      </div>
    ),

    experience: (
      <div>
        <span className="text-primary">$ cat /career/history.txt</span><br /><br />
        {experience.map((exp, idx) => (
          <div key={exp.id} className="mb-2">
            <span className="text-accent">{exp.date}</span> - <span className="text-dim">{exp.title}</span><br />
            <span className="text-dim">@ {exp.organization}</span><br />
            <span className="text-dim">{exp.description}</span><br />
            <span className="text-dim">Skills: {exp.skills.join(', ')}</span><br />
          </div>
        ))}
      </div>
    ),

    resume: (
      <div>
        <span className="text-primary">$ wget {personalInfo.resume}</span><br />
        <span className="text-dim">Downloading...</span><br />
        <span className="text-accent">[████████████████████] 100%</span><br />
        <span className="text-success">Resume downloaded successfully!</span><br />
        <a 
          href={personalInfo.resume} 
          download 
          target="_blank"
          rel="noopener noreferrer"
          className="terminal-link"
          onClick={(e) => e.stopPropagation()}
        >
          📄 Click here to download: {personalInfo.resume}
        </a>
      </div>
    ),

    contact: (
      <div>
        <span className="text-primary">$ cat /contact/info.txt</span><br /><br />
        <span className="text-dim">Name:</span> {personalInfo.name}<br />
        <span className="text-dim">Email:</span> <a href={`mailto:${personalInfo.email}`} className="terminal-link" onClick={(e) => e.stopPropagation()}>{personalInfo.email}</a><br />
        <span className="text-dim">Phone:</span> <a href={`tel:${personalInfo.phone}`} className="terminal-link" onClick={(e) => e.stopPropagation()}>{personalInfo.phone}</a><br /><br />
        
        <span className="text-primary">Social Links:</span><br />
        <span className="text-dim">GitHub:</span> <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="terminal-link" onClick={(e) => e.stopPropagation()}>{personalInfo.social.github}</a><br />
        <span className="text-dim">LinkedIn:</span> <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="terminal-link" onClick={(e) => e.stopPropagation()}>{personalInfo.social.linkedin}</a><br />
        <span className="text-dim">Instagram:</span> <a href={personalInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="terminal-link" onClick={(e) => e.stopPropagation()}>{personalInfo.social.instagram}</a>
      </div>
    ),

    matrix: (
      <div className="text-primary animate-glitch">
        <span className="text-accent">Wake up, {personalInfo.name.split(' ')[0]}...</span><br />
        The Matrix has you.<br />
        Follow the white rabbit.
      </div>
    ),

    'sudo hire_me': (
      <div>
        <span className="text-pink animate-glow">ACCESS GRANTED</span><br />
        <span className="text-accent">Initiating hire sequence for {personalInfo.name}...</span><br /><br />
        <span className="text-dim">
          [✓] Technical skills verified ({skills.frontend.length + skills.backend.length}+ skills)<br />
          [✓] Portfolio reviewed ({projects.length} projects completed)<br />
          [✓] Experience confirmed ({experience.length} positions)<br />
          [✓] Contact ready: <a href={`mailto:${personalInfo.email}`} className="terminal-link" onClick={(e) => e.stopPropagation()}>{personalInfo.email}</a><br />
          [✓] Ready to start!
        </span>
      </div>
    ),
  };
};

const getWelcomeMessage = () => {
  const { personalInfo } = portfolioData;
  
  return (
    <div>
      <pre className="text-primary text-xs mb-4">
{`
██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝
`}
      </pre>
      <span className="text-accent">{personalInfo.name}'s Portfolio Terminal</span><br />
      <span className="text-dim">{personalInfo.title} | {personalInfo.location}</span><br /><br />
      <span className="text-dim">Welcome to the terminal interface.</span><br />
      <span className="text-dim">Type 'help' for available commands.</span><br />
      <span className="text-dim">Use ↑/↓ arrow keys to navigate command history.</span>
    </div>
  );
};

// TYPE WRITER COMPONENT
const TypeWriter = memo(({ content, speed = 20, onUpdate, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const fullTextRef = useRef('');
  const contentRef = useRef(null);

  useEffect(() => {
    const extractText = (element) => {
      if (typeof element === 'string') return element;
      if (typeof element === 'number') return String(element);
      if (!element) return '';
      
      if (Array.isArray(element)) {
        return element.map(extractText).join('');
      }
      
      if (element.props) {
        if (element.type === 'br') return '\n';
        if (element.props.children) {
          return extractText(element.props.children);
        }
      }
      
      return '';
    };

    fullTextRef.current = extractText(content);
    setDisplayedText('');
    setIsComplete(false);

    let currentIndex = 0;
    const totalLength = fullTextRef.current.length;

    const typingInterval = setInterval(() => {
      if (currentIndex < totalLength) {
        const chunkSize = Math.min(2, totalLength - currentIndex);
        currentIndex += chunkSize;
        setDisplayedText(fullTextRef.current.substring(0, currentIndex));
        
        if (onUpdate) onUpdate();
      } else {
        setIsComplete(true);
        if (onComplete) onComplete();
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [content, speed, onUpdate, onComplete]);

  if (isComplete) {
    return <div ref={contentRef}>{content}</div>;
  }

  return (
    <div ref={contentRef}>
      {displayedText.split('\n').map((line, i, arr) => (
        <span key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </span>
      ))}
    </div>
  );
});

TypeWriter.displayName = 'TypeWriter';

// MAIN COMPONENT

export default function TerminalMode() {
  const navigate = useNavigate();
  
  const commands = useMemo(() => generateCommands(), []);
  
  const [history, setHistory] = useState([
    {
      id: 'welcome',
      command: 'init',
      output: getWelcomeMessage(),
      animated: false,
    },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
 
const isMobile = window.innerWidth < 768;

const bgProps = useMemo(() => ({
    scale: isMobile ? 3 : 2,
    gridMul: isMobile ? [1, 1] : [1, 1],
    digitSize: 1.2,
    timeScale: isMobile ? 0.05 : 0.08,
    pause: false,
    scanlineIntensity: isMobile ? 0.1 : 0.3,
    glitchAmount: isMobile ? 0.1 : 0.5,
    flickerAmount: isMobile ? 0 : 0.1,
    noiseAmp: isMobile ? 0.1 : 0.4,
    chromaticAberration: 0,
    dither: isMobile ? 0 : 0.2,
    curvature: isMobile ? 0 : 0.02,  
    tint: "#feee66",
    mouseReact: !isMobile,          
    mouseStrength: 0.8,
    pageLoadAnimation: !isMobile,
    brightness: isMobile ? 0.8 : 0.2,
}), [isMobile]);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isTyping) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const handleContainerClick = useCallback(() => {
    if (!isTyping) {
      inputRef.current?.focus();
    }
  }, [isTyping]);

  const handleCommand = useCallback((input) => {
    const command = input.trim().toLowerCase();

    if (!command) return;

    // Add to command history (exclude special commands)
    if (command !== 'clear' && command !== 'exit' && command !== 'back' && command !== 'gui') {
      setCommandHistory(prev => [...prev, input]);
      setHistoryIndex(-1);
    }

    if (command === 'clear') {
      setHistory([]);
      return;
    }

    if (command === 'exit' || command === 'back') {
      navigate('/');
      return;
    }

    if (command === 'matrix') {
      setIsMatrixMode(true);
      setTimeout(() => setIsMatrixMode(false), 3000);
    }

    const output = commands[command] || (
      <span className="text-error">
        Command not found: {command}<br />
        Type 'help' for available commands.
      </span>
    );

    const newEntry = {
      id: Date.now().toString(),
      command: input,
      output,
      animated: true,
      isAnimating: true,
    };

    setHistory((prev) => [...prev, newEntry]);
    setIsTyping(true);

    const getTextLength = (element) => {
      if (typeof element === 'string') return element.length;
      if (typeof element === 'number') return String(element).length;
      if (!element) return 0;
      if (Array.isArray(element)) return element.reduce((a, b) => a + getTextLength(b), 0);
      if (element.props && element.props.children) return getTextLength(element.props.children);
      return 0;
    };

    const textLength = getTextLength(output);
    const speedPerChar = 20;
    const typingDuration = Math.min(textLength * speedPerChar, 6000);

    // Handle GUI command - navigate after typing completes
    const handleTypingComplete = () => {
      setIsTyping(false);
      setHistory((prev) =>
        prev.map((item) =>
          item.id === newEntry.id ? { ...item, isAnimating: false } : item
        )
      );

      // Navigate to GUI after animation completes
      if (command === 'gui') {
        setTimeout(() => {
          navigate('/modern-ui');
        }, 1000); // 2 second delay as shown in output
      }
    };

    // setTimeout(handleTypingComplete, typingDuration);
  }, [navigate, commands]);

  const handleKeyDown = useCallback((e) => {
    if (isTyping) {
      e.preventDefault();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      
      const newIndex = historyIndex === -1 
        ? commandHistory.length - 1 
        : Math.max(0, historyIndex - 1);
      
      setHistoryIndex(newIndex);
      setCurrentInput(commandHistory[newIndex]);
    }
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      
      if (historyIndex === -1) return;
      
      const newIndex = historyIndex + 1;
      
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setCurrentInput('');
      } else {
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    }
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentInput.trim()) {
        handleCommand(currentInput);
        setCurrentInput('');
        setHistoryIndex(-1);
      }
    }
  }, [isTyping, commandHistory, historyIndex, currentInput, handleCommand]);

  const handleExit = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="terminal-container"
      onClick={handleContainerClick}
    >
      {/* Fixed: Background with fixed height to prevent reload */}
      <div style={{ 
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <MemoizedTerminalBackground {...bgProps} />
      </div>

      {isMatrixMode && (
        <div className="matrix-overlay">
          <div className="matrix-rain" />
        </div>
      )}

      <div className="cyber-grid" />

      <button onClick={handleExit} className="terminal-exit-btn">
        EXIT
      </button>

      <div ref={terminalRef} className="terminal-content">
        {history.map((item) => (
          <div key={item.id} className="terminal-entry">
            {item.command !== 'init' && (
              <div className="terminal-command-line">
                <span className="terminal-prompt">visitor@portfolio:~$</span>
                <span className="terminal-command">{item.command}</span>
              </div>
            )}
<div className="terminal-output">
  {item.animated && item.isAnimating ? (
    <TypeWriter 
      content={item.output} 
      speed={15}
      onUpdate={scrollToBottom}
      onComplete={() => {
        setIsTyping(false);
        setHistory((prev) =>
          prev.map((histItem) =>
            histItem.id === item.id ? { ...histItem, isAnimating: false } : histItem
          )
        );

        // Handle GUI navigation
        if (item.command.toLowerCase() === 'gui') {
          setTimeout(() => {
            navigate('/modern-ui');
          }, 1000);
        }
      }}
    />
  ) : (
    item.output
  )}
</div>

          </div>
        ))}

        {!isTyping && (
          <div className="terminal-input-line">
            <span className="terminal-prompt">visitor@portfolio:~$</span>
            
            <div className="terminal-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-input"
                autoComplete="off"
                spellCheck={false}
                disabled={isTyping}
              />
              <span
                className="terminal-cursor"
                style={{ left: `${currentInput.length}ch` }}
              />
            </div>
          </div>
        )}
      </div>

      <style >{`
        .terminal-container {
          --terminal-bg-primary: #0a0e1a;
          --terminal-bg-secondary: #151b2e;
          --terminal-text-primary: #e0e0e0;
          --terminal-text-dim: #6b7280;
          --terminal-neon-green: #00ff41;
          --terminal-neon-blue: #00d9ff;
          --terminal-neon-pink: #ff006e;
          --terminal-neon-purple: #bd00ff;
          --terminal-error: #ff3b3b;
          --terminal-success: #00ff88;
          --terminal-warning: #ffd700;
          --terminal-border: #2a3f5f;
          --terminal-glow-green: 0 0 10px rgba(0, 255, 65, 0.5),
            0 0 20px rgba(0, 255, 65, 0.3);
        }

        .terminal-container {
          min-height: 100vh;
          background-color: var(--terminal-bg-primary);
          color: var(--terminal-text-primary);
          font-family: "Fira Code", "Courier New", monospace;
          padding: 1rem 1rem 0rem 1rem;
          position: relative;
          overflow: hidden;
          cursor: text;
        }

        .terminal-content {
          min-height: 100vh;
          max-height: 100vh;
          overflow-y: auto;
          position: relative;
          z-index: 2;
          padding-bottom: 2rem;
        }

        .terminal-entry {
          margin-bottom: 1rem;
        }

        .terminal-command-line {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }

        .terminal-prompt {
          color: var(--terminal-neon-green);
          text-shadow: var(--terminal-glow-green);
          font-weight: 600;
          flex-shrink: 0;
        }

        .terminal-command {
          color: var(--terminal-text-primary);
        }

        .terminal-output {
          margin-left: 1rem;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .terminal-link {
          color: var(--terminal-neon-blue);
          text-decoration: underline;
          cursor: pointer;
          transition: all 0.2s ease;
          pointer-events: auto;
        }

        .terminal-link:hover {
          color: var(--terminal-neon-green);
          text-shadow: var(--terminal-glow-green);
          text-decoration: none;
        }

        .terminal-input-line {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-bottom: 1rem;
        }

        .terminal-input-wrapper {
          position: relative;
          display: inline-block;
          min-width: 200px;
        }

        .terminal-input {
          background: transparent;
          border: none;
          color: var(--terminal-text-primary);
          outline: none;
          font-family: inherit;
          font-size: inherit;
          width: auto;
          min-width: 2ch;
        }

        .terminal-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .terminal-cursor {
          position: absolute;
          top: 0;
          width: 8px;
          height: 1.2em;
          background: var(--terminal-neon-green);
          animation: blink 1s infinite;
          pointer-events: none;
          transform: translateY(0.1em);
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .terminal-exit-btn {
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 10;
          background: transparent;
          border: 1px solid var(--terminal-border);
          color: var(--terminal-neon-green);
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .terminal-exit-btn:hover {
          border-color: var(--terminal-neon-green);
          box-shadow: var(--terminal-glow-green);
          transform: scale(1.05);
        }

        .cyber-grid {
          position: fixed;
          inset: 0;
          background-image: linear-gradient(
              rgba(0, 255, 65, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
          opacity: 0.2;
          z-index: 1;
        }

        .matrix-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9;
        }

        .matrix-rain {
          width: 100%;
          height: 100%;
          background: var(--terminal-bg-primary);
          animation: matrix-fall 3s linear forwards;
        }

        @keyframes matrix-fall {
          from {
            opacity: 1;
            transform: translateY(-100%);
          }
          to {
            opacity: 0;
            transform: translateY(0);
          }
        }

        .text-primary { color: var(--terminal-neon-green); }
        .text-accent { color: var(--terminal-neon-blue); }
        .text-pink { color: var(--terminal-neon-pink); }
        .text-dim { color: var(--terminal-text-dim); }
        .text-error { color: var(--terminal-error); }
        .text-success { color: var(--terminal-success); }
        .text-xs { font-size: 0.75rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-2 { margin-bottom: 0.5rem; }

        .animate-glitch {
          animation: glitch 1s infinite;
        }

        @keyframes glitch {
          0%, 100% {
            text-shadow: 2px 0 var(--terminal-neon-blue),
              -2px 0 var(--terminal-neon-pink);
          }
          25% {
            text-shadow: -2px 0 var(--terminal-neon-blue),
              2px 0 var(--terminal-neon-pink);
          }
          50% {
            text-shadow: 2px 0 var(--terminal-neon-pink),
              -2px 0 var(--terminal-neon-blue);
          }
          75% {
            text-shadow: -2px 0 var(--terminal-neon-pink),
              2px 0 var(--terminal-neon-blue);
          }
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: var(--terminal-glow-green);
          }
          50% {
            text-shadow: 0 0 20px rgba(0, 255, 65, 0.8),
              0 0 30px rgba(0, 255, 65, 0.6), 0 0 40px rgba(0, 255, 65, 0.4);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .terminal-cursor,
          .animate-glitch,
          .animate-glow,
          .matrix-rain {
            animation: none;
          }
        }

        @media (max-width: 768px) {
          .terminal-container {
            padding: 0.5rem;
            font-size: 0.875rem;
          }

          .terminal-output {
            margin-left: 0.5rem;
          }

          .terminal-exit-btn {
            padding: 0.375rem 0.75rem;
            font-size: 0.75rem;
            background: var(--terminal-bg-secondary);
          }

          .text-xs {
            font-size: 0.625rem;
          }
        }
      `}</style>
    </motion.div>
  );
}
