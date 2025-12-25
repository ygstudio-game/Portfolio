import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import DrawerNavbar from "./components/DrawerNavbar";
import MouseSpy from "./components/MouseSpy";
import HeroSection from "./components/HeroSection";
import { PortfolioCards } from "./components/PortfolioCard";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function LandingPage() {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.5,
      effects: true,
    });
  }, []);

  return (
    <div ref={wrapperRef}>
      <DrawerNavbar />
      <MouseSpy />
      <div ref={contentRef} className="w-full">
        <HeroSection />
        <PortfolioCards />
      </div>
    </div>
  );
}
