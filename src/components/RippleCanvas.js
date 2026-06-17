'use client';
import { useEffect, useRef } from 'react';

/**
 * RippleCanvas — ripples emanate from last known cursor position
 * after 5 seconds of no mouse/touch movement.
 * Color adapts to light / dark theme on each draw frame.
 */
export default function RippleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let ripples = [];
    let idleTimer = null;
    let autoInterval = null;
    let animId = null;
    let lastPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const addRipple = (x, y) => {
      ripples.push({
        x, y,
        r: 0,
        maxR: 85 + Math.random() * 75,
        alpha: 0.2,
        speed: 0.65 + Math.random() * 0.5,
      });
    };

    const startAuto = () => {
      clearInterval(autoInterval);
      // Easter egg: very rare chance (1-in-40 idle cycle) of a larger "deep pulse"
      autoInterval = setInterval(() => {
        const spread = 70;
        addRipple(
          lastPos.x + (Math.random() - 0.5) * spread,
          lastPos.y + (Math.random() - 0.5) * spread,
        );
        if (Math.random() < 0.025) {
          // "Deep pulse" — a larger, slower, dimmer ripple from origin
          ripples.push({ x: lastPos.x, y: lastPos.y, r: 0, maxR: 220, alpha: 0.09, speed: 0.35 });
        }
      }, 850);
    };

    const stopAuto = () => clearInterval(autoInterval);

    const resetIdle = () => {
      stopAuto();
      clearTimeout(idleTimer);
      idleTimer = setTimeout(startAuto, 5000);
    };

    const onMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      lastPos = { x, y };
      resetIdle();
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('resize', resize);
    idleTimer = setTimeout(startAuto, 5000);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dark = document.documentElement.classList.contains('dark');
      // Dark: cold Tethys ocean; Light: ancient sand
      const rgb = dark ? '100, 172, 210' : '185, 158, 115';
      ripples = ripples.filter((r) => r.alpha > 0.003);
      for (const rip of ripples) {
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgb}, ${rip.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        rip.r += rip.speed;
        rip.alpha *= 0.974;
        if (rip.r >= rip.maxR) rip.alpha = 0;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('resize', resize);
      clearTimeout(idleTimer);
      clearInterval(autoInterval);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.55 }}
      aria-hidden="true"
    />
  );
}
