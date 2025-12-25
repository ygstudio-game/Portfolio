---

# 🚀 Yadnyesh Borole | Full-Stack Developer Portfolio

Welcome to the repository of my personal portfolio. This project showcases my journey as a developer, highlighting my technical skills, featured projects, and professional experience through a modern, highly interactive web interface.

## 🛠️ The Tech Stack

This portfolio is built with performance and aesthetics in mind, utilizing the latest web technologies:

* **Frontend**: [React.js](https://reactjs.org/) (Functional Components, Hooks)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a utility-first, responsive design.
* **Animations**: [Framer Motion](https://www.framer.com/motion/) for micro-interactions and [GSAP](https://greensock.com/gsap/) for complex scroll-triggered effects.
* **Smooth Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis) for a premium feel.
* **Build Tool**: [Vite](https://vitejs.dev/) for lightning-fast development and optimized production builds.

---

## 🌟 Featured Projects

| Project | Description | Tech Stack |
| --- | --- | --- |
| **Printly** | A cloud-based printing solution for seamless document management. | React, Node.js, MongoDB |
| **Farm2Factory** | A supply-chain platform connecting farmers directly to industrial buyers. | MERN, Google Maps API |
| **Roborashtra 2K26** | Official portal for a national-level robotics event with live tracking. | React, GSAP, Firebase |
| **BreatheSafeAI** | AI-driven air quality monitoring and safety prediction tool. | Python, React, FastAPI |

---

## 📂 Project Structure

The project follows a modular architecture for easy maintenance:

```text
src/
├── assets/          # Images, icons, and static media
├── components/      # Reusable UI components (Buttons, Cards, etc.)
│   ├── layout/      # Navbar, Footer, Section Wrappers
│   └── ui/          # Animated and styled primitive components
├── data/            
│   └── portfolioData.js  <-- EDIT THIS to update all text content
├── hooks/           # Custom React hooks (useScroll, useMousePosition)
├── sections/        # Main page sections (Hero, About, Projects, Contact)
├── App.jsx          # Main application entry
└── main.jsx         # Global styles and renderer

```

---
 🔧 Customization
All textual content is driven by src/data/portfolioData.js.

Personal Information
Update the personalInfo object for:

Name, Title, Bio.

Social Links (LinkedIn, GitHub).

Resume URL.

Projects
Modify the projects array to add new work:

title & description: Project overview.

techStack: Array of technologies used.

features: Bullet points highlighting key functionalities.

links: GitHub and Live deployment URLs.

 
## 🌐 Deployment

This project is optimized for one-click deployment:

1. **Vercel / Netlify**: Connect your GitHub repository. The build settings are automatically detected (`Build Command: npm run build`, `Output Directory: dist`).
 
---

## 🛣️ Roadmap

* [ ] Integrate a 3D Hero element using **Three.js / React Three Fiber**.
* [ ] Implement a blog section using Markdown files.
 
---
 