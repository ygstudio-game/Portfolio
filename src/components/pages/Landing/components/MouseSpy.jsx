import gsap, { Expo } from "gsap";
import React, { useEffect, useLayoutEffect, useRef, useCallback } from "react";
import './MouseSpy.css';

function useTicker(callback, paused) {
  useLayoutEffect(() => {
    if (!paused && callback) gsap.ticker.add(callback);
    return () => gsap.ticker.remove(callback);
  }, [callback, paused]);
}

const EMPTY = {};
function useInstance(value = {}) {
  const ref = useRef(EMPTY);
  if (ref.current === EMPTY) {
    ref.current = typeof value === "function" ? value() : value;
  }
  return ref.current;
}

function getScale(diffX, diffY) {
  const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
  return Math.min(distance / 735, 0.35);
}

function getAngle(diffX, diffY) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

const MouseSpy = () => {
  const jellyRef = useRef(null);
  const textRef = useRef(null);

  const pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel = useInstance(() => ({ x: 0, y: 0 }));
  const set = useInstance();

  useLayoutEffect(() => {
    set.x = gsap.quickSetter(jellyRef.current, "x", "px");
    set.y = gsap.quickSetter(jellyRef.current, "y", "px");
    set.r = gsap.quickSetter(jellyRef.current, "rotate", "deg");
    set.sx = gsap.quickSetter(jellyRef.current, "scaleX");
    set.sy = gsap.quickSetter(jellyRef.current, "scaleY");
    set.width = gsap.quickSetter(jellyRef.current, "width","px");
  }, []);

  const loop = useCallback(() => {
    const rotation = getAngle(vel.x, vel.y);
    const scale = getScale(vel.x, vel.y);

    set.x(pos.x);
    set.y(pos.y);
    set.width(100 + scale * 150);
    set.r(rotation);
    set.sx(1 + scale);
    set.sy(1 - scale);
  }, []);

  useLayoutEffect(() => {
    const setFromEvent = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      gsap.to(pos, {
        x,
        y,
        duration: 1.25,
        ease: Expo.easeOut,
        onUpdate: () => {
          vel.x = x - pos.x;
          vel.y = y - pos.y;
        }
      });
      loop();

      // Move the OPEN text (centered)
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        gsap.to(textRef.current, {
          x: x - rect.width / 2,
          y: y - rect.height / 2,
          duration: 0.1,
          ease: "power1.out",
        });
      }
    };

    window.addEventListener("mousemove", setFromEvent);
    return () => window.removeEventListener("mousemove", setFromEvent);
  }, []);

  useTicker(loop);

  // Show/hide text on card hover
useEffect(() => {
  const cards = document.querySelectorAll('.portfolio-card');
  console.log(cards);
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (textRef.current && jellyRef.current) {
        const rect = textRef.current.getBoundingClientRect();

        // Animate jelly blob to rectangle that fits the text
        gsap.to(jellyRef.current, {
          width: rect.width + 20,  // padding
          height: rect.height + 20,
          borderRadius: 10,        // small radius for rectangle corners
          duration: 0.3,
          ease: "back.out(1.7)",
        });

        gsap.to(textRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      if (textRef.current && jellyRef.current) {
        // Return to original circle shape
        gsap.to(jellyRef.current, {
          width: 100,
          height: 100,
          borderRadius: 50, // circle
          duration: 0.3,
          ease: "back.in(1.7)",
        });

        gsap.to(textRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "back.in(1.7)",
        });
      }
    });
  });
}, []);



  return (
    <div className="container-div">
      <div ref={jellyRef} className="jelly-blob"></div>
      <span ref={textRef} className="mouse-text">OPEN</span>
    </div>
  );
};

export default MouseSpy;
