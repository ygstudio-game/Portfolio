# 🚀 Yadnyesh Borole | Full-Stack Developer Portfolio

Welcome to the repository of my personal portfolio. This project showcases my journey as a developer, highlighting my technical skills, featured projects, and professional experience through a modern, highly interactive web interface powered by a custom Node.js backend.

## 🛠️ The Tech Stack

This portfolio is built with performance, aesthetics, and scalability in mind, utilizing a separated frontend-backend architecture:

### **Frontend**
* **Framework**: [React.js](https://reactjs.org/) + [Vite](https://vitejs.dev/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://greensock.com/gsap/)
* **Smooth Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis)

### **Backend**
* **Runtime**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
* **Email Services**: [Nodemailer](https://nodemailer.com/) with **Google OAuth2** authentication.
* **File Serving**: Dynamic REST API for Resume downloading.
* **Security**: Environment-based configuration & CORS protection.

---

## 🌟 Featured Projects

| Project | Description | Tech Stack |
| --- | --- | --- |
| **Printly** | A cloud-based printing solution for seamless document management. | React, Node.js, MongoDB |
| **Farm2Factory** | A supply-chain platform connecting farmers directly to industrial buyers. | MERN, Google Maps API |
| **Roborashtra 2K26** | Official portal for a national-level robotics event with live tracking. | React, GSAP, Firebase |
| **BreatheSafeAI** | AI-driven air quality monitoring and safety prediction tool. | Python, React, FastAPI |

---

## 📂 Architecture & Structure

The project follows a scalable MVC-style architecture for the backend and a modular component structure for the frontend.

### **Backend Structure**
```text
backend/
├── controllers/          # Business logic (Email sending, File handling)
│   ├── contact.controller.js
│   └── resume.controller.js
├── routes/               # API Endpoint definitions
│   ├── contact.routes.js
│   └── resume.routes.js
├── utils/                # Helper functions (Nodemailer Transporter)
│   └── sendContactEmail.js
├── files/                # Static assets served via API
│   └── resume.pdf
└── server.js             # Entry point & Configuration 
```

### **Frontend Structure**

```text
src/
├── components/           # Reusable UI components
├── data/            
│   └── portfolioData.js  # Centralized Data Management
├── hooks/                # Custom React hooks
└── sections/             # Main page sections (Hero, About, Contact)

```

---

## 🔌 API Endpoints

The backend exposes specific RESTful endpoints to handle interactivity and asset delivery:

| Method | Endpoint | Description | Payload |
| --- | --- | --- | --- |
| `POST` | `/api/contact` | Sends a formatted email to the admin via Gmail OAuth2. | `{ name, email, message }` |
| `GET` | `/api/resume` | Triggers a secure download of the latest Resume PDF. | N/A |

---

## 🔧 Content Management

The portfolio is designed to be easily updated without modifying the core codebase:

1. **Portfolio Data**: All text content, experience, and project details are managed in `src/data/portfolioData.js`.
2. **Resume Updates**: The resume file is located at `backend/files/resume.pdf`. Updating this single file automatically updates the download link across the site.

---

## 🌐 Deployment Strategy

This project uses a split-deployment strategy:

* **Frontend**: Hosted on **Vercel** for edge caching and fast delivery.
* **Backend**: Hosted on **Render** (or similar Node.js PaaS) to handle API requests and email automation.
* **Integration**: The frontend communicates with the backend via secure environment variables (`VITE_BACKEND_URL`), ensuring seamless connectivity between the two services.

---

## 🛣️ Roadmap

* [ ] Integrate a 3D Hero element using **Three.js / React Three Fiber**.
* [ ] Implement a blog section using Markdown files.
* [ ] Add rate limiting to the Contact API to prevent spam.

```

```