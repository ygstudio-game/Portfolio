import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { portfolioData } from "@data/portfolioData";

gsap.registerPlugin(CustomEase);
CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
gsap.defaults({ ease: "main", duration: 0.7 });

const Navbar = () => {
  const navRef = useRef(null);
  const headerRef = useRef(null);
  const overlayRef = useRef(null);
  const menuRef = useRef(null);
  const menuButtonIconRef = useRef(null);
  const menuButtonTextsRef = useRef([null]);
  const menuLinksRef = useRef([null]);
  const fadeTargetsRef = useRef([null]);
  const bgPanelsRef = useRef([null]);

  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "main", duration: 0.7 } });

    const openNav = () => {
      tl.clear()
        .set(navRef.current, { display: "block" })
        .fromTo(menuRef.current, { xPercent: 100 }, { xPercent: 0 }, "<")
        .fromTo(menuButtonIconRef.current, { rotate: 0 }, { rotate: 315 }, "<")
        .fromTo(menuButtonTextsRef.current, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 }, "<")
        .fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
        .fromTo(
          bgPanelsRef.current,
          { xPercent: 101 },
          { xPercent: 0, stagger: 0.12, duration: 0.6 },
          "<"
        )
        .fromTo(
          menuLinksRef.current,
          { yPercent: 50, rotate: 5, autoAlpha: 0 },
          { yPercent: 0, rotate: 0, autoAlpha: 1, stagger: 0.06, duration: 0.6 },
          "<+=0.35"
        )
        .fromTo(
          fadeTargetsRef.current,
          { autoAlpha: 0, yPercent: 30 },
          { autoAlpha: 1, yPercent: 0, stagger: 0.06, duration: 0.6 },
          "<+=0.4"
        );
    };

    const closeNav = () => {
      tl.clear()
        .to(overlayRef.current, { autoAlpha: 0 })
        .to(menuRef.current, { xPercent: 100 }, "<")
        .to(menuButtonIconRef.current, { rotate: 0 }, "<")
        .to(menuButtonTextsRef.current, { yPercent: 0 }, "<")
        .set(navRef.current, { display: "none" });
    };

    navOpen ? openNav() : closeNav();

    const handleEscape = (e) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [navOpen]);

  return (
    <div>
      {/* Header - With Scroll Background (Hidden when drawer is open) */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-[110] flex justify-between items-center p-6 text-white transition-all duration-500 ${
          scrolled && !navOpen
            ? "bg-black/80 backdrop-blur-lg  border-white/10"
            : "bg-transparent"
        }`}
      >
        <a
          href="#"
          className={`text-lg font-bold transition-all duration-300 ${
            scrolled && !navOpen ? "text-cyan-400" : "text-white"
          }`}
        >
          {portfolioData.personalInfo.name.split(" ")[0]}
        </a>

        <button
          className={`flex items-center gap-2 p-2 z-50 transition-colors duration-300 ${
            navOpen
              ? "text-black hover:text-red-500"
              : scrolled
              ? "text-cyan-400 hover:text-yellow-300"
              : "text-white hover:text-yellow-300"
          }`}
          onClick={() => setNavOpen(!navOpen)}
        >
          <div className="flex flex-col overflow-hidden h-5 text-right">
            {["Menu", "Close"].map((text, i) => (
              <p
                key={i}
                ref={(el) => (menuButtonTextsRef.current[i] = el)}
                className="text-sm font-medium transition-colors duration-300"
              >
                {text}
              </p>
            ))}
          </div>
          <svg
            ref={menuButtonIconRef}
            className="w-4 h-4 transition-transform"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M7.333 16V0h1.333v16H7.333Z" fill="currentColor" />
            <path d="M16 8.667H0V7.333h16v1.334Z" fill="currentColor" />
          </svg>
        </button>
      </header>

      {/* Nav Overlay */}
      <div
        ref={navRef}
        className="nav fixed inset-0 hidden z-[100]"
        style={{ display: "none", position: "fixed", inset: 0, zIndex: 100 }}
      >
        <div
          ref={overlayRef}
          className="overlay backdrop-blur-sm bg-black/70"
          onClick={() => setNavOpen(false)}
        ></div>

        <nav
          ref={menuRef}
          className="menu relative w-80 max-w-full h-full bg-black shadow-xl overflow-hidden text-white"
        >
          {/* Background Panels */}
          <div className="absolute inset-0 -z-10">
            {["bg-black", "bg-neutral-900", "bg-neutral-800"].map((bg, i) => (
              <div
                key={i}
                ref={(el) => (bgPanelsRef.current[i] = el)}
                className={`absolute top-0 bottom-0 right-0 w-full rounded-l-2xl ${bg}`}
              />
            ))}
          </div>

          <div className="menu-inner relative z-10 h-full flex flex-col justify-between">
            {/* Menu Links */}
            <ul className="flex flex-col gap-8 menu-list">
              <h2
                className="text-sm pl-4 font-semibold uppercase tracking-widest text-gray-500 mb-6"
                ref={(el) => (fadeTargetsRef.current[0] = el)}
              >
                Portfolio Types
              </h2>
              {["Terminal", "Modern UI"].map((item, index) => (
                <li className="menu-list-item" key={index}>
                  <NavLink
                    to={index === 0 ? "/terminal" : "/modern-ui"}
                    onClick={() => setNavOpen(false)}
                    className="menu-link w-inline-block relative flex items-baseline gap-2 group"
                    ref={(el) => (menuLinksRef.current[index] = el)}
                  >
                    <p className="menu-link-heading text-5xl font-extrabold uppercase transition-transform duration-500 group-hover:-translate-y-2">
                      {item}
                    </p>
                    <p className="eyebrow">{`0${index + 1}`}</p>
                    <div className="menu-link-bg"></div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
