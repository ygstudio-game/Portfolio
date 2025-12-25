import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/pages/Landing/LandingPage.jsx";
import TerminalMode from "./components/pages/TerminalPage/TerminalMode.jsx";
import ModernPage from "./components/pages/ModernPage/ModernPage.jsx";
import ScrollToTop from "./ScrollToTop";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/terminal" element={<TerminalMode />} />
        <Route path="/modern-ui" element={<ModernPage />} />
      </Routes>
    </Router>
  );
}
