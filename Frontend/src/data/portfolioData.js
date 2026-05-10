// src/data/portfolioData.js
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const portfolioData = {
  personalInfo: {
    name: "Yadnyesh Borole",
    title: "Full-Stack Developer",
    titles: [
      "Full-Stack Developer",
      "React & Next.js Specialist",
      "AI Integrator",
      "UI/UX Engineer"
    ],
    bio: "Full-stack developer passionate about building modern, high-performance web applications with React, Next.js, Node.js and AI-powered features. I focus on clean UI/UX, automation, and scalable engineering.",
    location: "India",
    email: "yadnyeshsunilborole@gmail.com",
    phone: "+91-8999617312",
    social: {
      github: "https://github.com/ygstudio-game/",
      linkedin: "https://www.linkedin.com/in/yadnyesh-borole-51aa0532a/",
      instagram: "https://www.instagram.com/yadnyeshborole/",
    },
resume: `${BACKEND_URL}/api/resume`,
  },

  aboutme: [
    {
      iconName: 'Code2',
      title: "Who I Am",
      description: "A passionate full-stack developer who loves building clean, modern, and intelligent applications using React, Next.js, Node.js, and AI integrations. I turn ideas into optimized digital experiences.",
      gradient: 'from-yellow-100 to-yellow-50',
      accentColor: '#C3E41D'
    },
    {
      iconName: 'Target',
      title: "Current Focus",
      description: "Working on AI-integrated applications, smart health platforms, automation tools, and improving deep UI/UX practices with animation-heavy React experiences.",
      gradient: 'from-amber-100 to-yellow-50',
      accentColor: '#f59e0b'
    },
    {
      iconName: 'Briefcase',
      title: "Experience",
      description: "2+ years of experience building web apps using React, Next.js, Node.js, and cloud deployments. Worked with startups, events, and personal SaaS projects.",
      gradient: 'from-yellow-50 to-amber-50',
      accentColor: '#fcd34d'
    },
    {
      iconName: 'Wrench',
      title: "Tech Stack",
      description: "React, Next.js, JavaScript, TypeScript, Node.js, Tailwind, Java, MongoDB, PostgreSQL, Botpress, and AI tools (OpenAI, Gemini, HuggingFace).",
      gradient: 'from-amber-50 to-yellow-100',
      accentColor: '#f59e0b'
    },
    {
      iconName: 'Rocket',
      title: "What I Do",
      description: "Full-stack apps, UI/UX design, chatbot development, automation tools, portfolio systems, and AI-powered dashboards with real-time interaction.",
      gradient: 'from-yellow-100 to-amber-100',
      accentColor: '#C3E41D'
    },
    {
      iconName: 'BookOpen',
      title: "Currently Learning",
      description: "Advanced animations, design systems, WebGL, Framer Motion, system design, and building SaaS-ready architectures.",
      gradient: 'from-amber-100 to-yellow-100',
      accentColor: '#fcd34d'
    }
  ],

projects: [
  {
    id: 1,
    title: "Printly – Smart Print Management System",
    description:
      "Desktop and web-based print management system built with Electron and MERN stack to handle print orders, job tracking, payments, and shop workflow automation. Reduced customer wait times by ~80%.",
    image: "/projects/printly.png",
    techStack: ["Electron", "React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    features: [
      "Multi-branch print order management",
      "Real-time job status and queue tracking",
      "Customer and shop dashboards",
      "Invoice and payment handling"
    ],
    githubLink: "https://github.com/ygstudio-game/Printly", 
    liveLink: "https://printlyapp.vercel.app/",  
    category: "Desktop and Web App"
  },
  {
    id: 2,
    title: "Pulse – Advanced AI Chat Platform",
    description:
      "High-fidelity, real-time chat application built for the Tars Full Stack Engineer Internship Challenge. Features AI smart replies, real-time calling, and audio transcriptions. Built using AI-assisted coding tools like Antigravity (Gemini 3.1 Pro).",
    image: "/projects/chatpulse.png", // Make sure to add this image to your public folder
    techStack: ["Next.js", "TypeScript", "React 19", "Tailwind CSS", "Convex", "LiveKit", "Gemini 2.0 Flash"],
    features: [
      "AI Smart Replies, Summarization & Voice Transcriptions",
      "Real-time Audio & Video Calls via LiveKit",
      "Premium Glassmorphic UI with Framer Motion",
      "Docker containerized backend & real-time Convex DB"
    ],
    githubLink: "https://github.com/ygstudio-game/chatPulse",  
    liveLink: "https://chat-pulseyb.vercel.app",  
    category: "AI & Full-Stack"
  },
  {
    id: 3,
    title: "Height Comparison Calculator",
    description:
      "A comprehensive, interactive web application developed during a frontend internship. It provides a suite of tools for visualizing height differences, predicting growth, analyzing percentiles, and exploring global height statistics.",
    image: "/projects/heightcomparison.png", // Make sure to add this image to your public folder
    techStack: ["Next.js", "TypeScript", "React 19", "Tailwind CSS", "MongoDB", "Sanity CMS", "Zustand"],
    features: [
      "Interactive 2D/3D visual height dashboard",
      "Multiple health, growth, and percentile calculators",
      "Shareable custom charts with hashed short URLs (MongoDB)",
      "Integrated SEO-friendly dynamic blog using Sanity CMS"
    ],
    githubLink: "", // Leave empty or add if you make the repo public later
    liveLink: "https://www.heightcomparisoncalculator.com/",
    category: "Internship Project"
  },
  {
    id: 4,
    title: "BreatheSafeAI Platform",
    description:
      "AI-powered health and environmental risk intelligence platform that uses real-time AQI and weather data to predict health risks, detect anomalies, and provide interactive visual dashboards.",
    image: "/projects/breathesafe.png",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Python", "AI/ML"],
    features: [
      "Personalized health & eco risk assessment",
      "Trend and anomaly detection for climate data",
      "Predictive visualization dashboards",
      "Integration with external AQI and weather APIs"
    ],
    githubLink: "https://github.com/Anup2006/BreatheSafe",
    liveLink: "https://breathe-safe-s2xn.vercel.app/",
    category: "AI"
  },
  {
    id: 5,
    title: "Roborashtra 2K26 Event Website",
    description:
      "Official showcase website for Roborashtra 2K26 built with Next.js and Tailwind CSS, highlighting event information, rulebooks, team, and contact details in a modern responsive UI.",
    image: "/projects/roborashtra2k26.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: [
      "Event information and highlights",
      "Glimpses and media gallery",
      "Rulebook access and downloads",
      "Team and contact sections"
    ],
    githubLink: "https://github.com/Shreyapatil2142/Roborashtra2K26",
    liveLink: "https://www.roborashtra.com",
    category: "UI/UX"
  }
],

skills: {
    frontend: [
      { name: "Next.js 14", level: 95 },
      { name: "React 19", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
      { name: "Zustand", level: 85 }
    ],
    backend: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 85 },
      { name: "Python", level: 80 },
      { name: "Java", level: 85 }
    ],
    database: [
      { name: "MongoDB", level: 90 },
      { name: "Convex", level: 85 },
      { name: "Sanity CMS", level: 85 }
    ],
    aiAndIntegrations: [
      { name: "Gemini API", level: 90 },
      { name: "LiveKit", level: 85 },
      { name: "OpenAI / HuggingFace", level: 80 }
    ],
    tools: [
      { name: "Git & GitHub", level: 90 },
      { name: "Docker", level: 60 },
      { name: "AWS", level: 60 },
      { name: "Vercel", level: 95 }
    ]
  },

experience: [
  {
    id: 1,
    date: "March 2026 - April 2026",
    title: "Full-Stack Engineering Intern",
    organization: "LaunchPit",
    description:
      "Engineered the end-to-end full-stack architecture for HeightComparisonCalculator.com, scaling a high-performance visualization engine.",
    skills: ["Next.js", "TypeScript", "React 19", "MongoDB", "Sanity CMS", "Zustand","AWS"],
    hoverDetails: [
      "Developed a comprehensive interactive 2D/3D visual height dashboard using Next.js and Tailwind CSS.",
      "Built a robust chart-sharing backend with MongoDB, featuring SHA-256 hash duplication detection and short URLs.",
      "Integrated a fully functional, SEO-friendly dynamic blog system leveraging Sanity CMS.",
      "Implemented seamless metric/imperial unit conversions and global state management using Zustand."
    ]
  },
  {
    id: 2,
    date: "July 2025 - Present",
    title: "Web Head & Technical Team Member",
    organization: "CodeCraft X PCCOE&R",
    description:
      "Leading web development initiatives, deploying club platforms, and collaborating on technical architectures for college events.",
    skills: ["React", "Next.js", "Team Leadership", "Web Development", "UI/UX"],
    hoverDetails: [
      "Promoted to Web Head (Jan 2026) to direct technical strategies and oversee digital platform deployments.",
      "Collaborated with peers utilizing agile-style workflows and version control (Git/GitHub).",
      "Architected and maintained event websites with a focus on modern, responsive, and accessible UI design."
    ]
  },
  {
    id: 3,
    date: "August 2025 - Present",
    title: "Web Developer",
    organization: "Robohawk PCCOER",
    description:
      "Core web development team member responsible for building and maintaining the digital presence for the college robotics team.",
    skills: ["Frontend Development", "JavaScript", "Tailwind CSS", "React"],
    hoverDetails: [
      "Developed interactive web pages to showcase the team's robotics projects, hardware builds, and competition results.",
      "Optimized website performance and ensured cross-device compatibility for mobile and desktop users.",
      "Worked closely with hardware and PR teams to translate physical engineering achievements into engaging digital content."
    ]
  },
  {
    id: 4,
    date: "2020 - Present",
    title: "Full-Stack & AI Developer (Independent)",
    organization: "Self-Directed",
    description:
      "Building advanced, production-ready applications focusing on scalable architecture, GenAI integration, and premium UI/UX.",
    skills: ["Next.js", "Node.js", "MongoDB", "TypeScript", "Python"],
    hoverDetails: [
      "Developed Pulse, an advanced AI chat platform featuring real-time LiveKit calling and Gemini-powered smart replies.",
      "Engineered BreatheSafeAI, a predictive health dashboard integrating real-time climate data and anomaly detection.",
      "Built Printly, an Electron + MERN print management MVP that reduced customer wait times by ~80%.",
      "Continuously exploring GenAI, agentic workflows, and data structures (C++/Python) to build impactful solutions."
    ]
  }
],

};
