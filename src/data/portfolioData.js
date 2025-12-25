// src/data/portfolioData.js

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
    resume: "/Yadnyesh_Borole_Resume.pdf",
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
      "Desktop and web-based print management system built with Electron and MERN stack to handle print orders, job tracking, payments, and shop workflow automation.",
    image: "/projects/printly.png",
    techStack: ["Electron", "React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    features: [
      "Multi-branch print order management",
      "Real-time job status and queue tracking",
      "Customer and shop dashboards",
      "Invoice and payment handling"
    ],
    githubLink: "https://github.com/ygstudio-game/Printly", 
    liveLink: "",  
    category: "Desktop and Web App"
  },
  {
    id: 2,
    title: "Farm2Factory – Farmer to Factory Platform",
    description:
      "End-to-end digital bridge between farmers and factories with separate frontends, secure backend APIs, and real-time notifications for crop orders and contracts.",
    image: "/projects/farm2factory.png",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "WebSockets"],
    features: [
      "Farmer and factory portals with dedicated workflows",
      "Crop CRUD and order/contract management",
      "JWT-based authentication and authorization",
      "Real-time notifications and email alerts"
    ],
    githubLink: "https://github.com/ygstudio-game/Fram2Factory",  
    liveLink: "https://fram2factory.vercel.app/",  
    category: "Full-Stack"
  },
  {
    id: 3,
    title: "Roborashtra 2K26 Event Website",
    description:
      "Official showcase website for Roborashtra 2K26 built with Next.js and Tailwind CSS, highlighting event information, rulebooks, team, and contact details in a modern responsive UI.[web:3]",
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
  },
  {
    id: 4,
    title: "BreatheSafeAI Platform",
    description:
      "AI-powered health and environmental risk intelligence platform that uses real-time AQI and weather data to predict health risks, detect anomalies, and provide interactive visual dashboards.[web:4]",
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
  }
],


  skills: {
    frontend: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML/CSS", level: 95 }
    ],
    backend: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "Java", level: 90 },
      { name: "Python", level: 70 }
    ],
    database: [
      { name: "MongoDB", level: 80 },
    ],
    tools: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 40 },
      { name: "AWS", level: 40 },
      { name: "Vercel", level: 90 }
    ]
  },

experience: [
  {
    id: 1,
    date: "2023 - Present",
    title: "Full-Stack Developer (Freelance & Personal Projects)",
    organization: "Self-Directed",
    description:
      "Building full-stack and AI-powered applications, focusing on production-ready architecture, UI/UX, and automation.",
    skills: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "AI APIs"],
    hoverDetails: [
      "Developed Printly, an Electron + MERN print management MVP",
      "Built Farm2Factory, a farmer–factory crop procurement platform",
      "Co-built Roborashtra 2K26 event site using Next.js and Tailwind CSS",
      "Worked on BreatheSafeAI, an AI-driven health and environment dashboard",
      "Implemented authentication, dashboards, and responsive design across projects"
    ]
  },
  {
    id: 2,
    date: "2022 - 2023",
    title: "Frontend & UI Engineer (Student Projects)",
    organization: "College & Hackathon Projects",
    description:
      "Led frontend development for multiple academic and hackathon projects with a focus on modern React-based UIs.",
    skills: ["React", "Tailwind CSS", "Framer Motion", "JavaScript"],
    hoverDetails: [
      "Designed and implemented animated landing pages and dashboards",
      "Improved performance and UX for project teams using best practices",
      "Collaborated with peers using Git/GitHub and agile-style workflows",
      "Experimented with component libraries and design systems",
      "Integrated REST APIs and basic real-time features into UIs"
    ]
  }
],

};
