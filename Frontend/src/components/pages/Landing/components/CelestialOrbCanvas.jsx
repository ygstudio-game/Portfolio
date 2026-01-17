// Create a new file: CelestialOrbCanvas.jsx (without text)
'use client';

import React, { useRef, useEffect } from 'react';

const CelestialOrbCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      constructor(x, y, radius, color, isOrbiter = false) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.isOrbiter = isOrbiter;
        this.orbitRadius = Math.random() * 240 + 100;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.02 + 0.01;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      update(center) {
        if (this.isOrbiter) {
          this.angle += this.speed;
          this.x = center.x + Math.cos(this.angle) * this.orbitRadius;
          this.y = center.y + Math.sin(this.angle) * this.orbitRadius;
        }
        this.draw();
      }
    }

    const centerPoint = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      targetX: canvas.width / 2,
      targetY: canvas.height / 2,
    };

    const init = () => {
      particles = [];
      particles.push(
        new Particle(centerPoint.x, centerPoint.y, 60, 'rgba(50, 180, 56, 0.5)', true)
      );
      for (let i = 0; i < 50; i++) {
        particles.push(
          new Particle(
            0,
            0,
            Math.random() * 4 + 1,
            `hsl(${Math.random() * 60 + 100}, 70%, 60%)`,
            true
          )
        );
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      centerPoint.targetX = mouse.x;
      centerPoint.targetY = mouse.y;
      centerPoint.x += (centerPoint.targetX - centerPoint.x) * 0.05;
      centerPoint.y += (centerPoint.targetY - centerPoint.y) * 0.05;

      particles[0].x = centerPoint.x;
      particles[0].y = centerPoint.y;
      particles[0].draw();

      for (let i = 1; i < particles.length; i++) {
        particles[i].update(centerPoint);
      }
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute "
    />
  );
};

export default CelestialOrbCanvas;
