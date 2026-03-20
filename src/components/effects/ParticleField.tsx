"use client";

import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
};

export function ParticleField({
  density = 70,
  className,
}: {
  density?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const coarsePointer =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: coarse)")?.matches;

    const isHeavyMode = !!(reduceMotion || coarsePointer);
    const connectionRange = isHeavyMode ? 80 : 110;
    const frameIntervalMs = isHeavyMode ? 1000 / 20 : 1000 / 40;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    let raf = 0;
    let lastFrame = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const effectiveDensity = isHeavyMode ? Math.min(density, 40) : density;
      const count = Math.round((w * h) / (14000 - effectiveDensity * 70));
      dots = Array.from({ length: Math.max(28, Math.min(140, count)) }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 0.9 + Math.random() * 1.4,
        a: 0.18 + Math.random() * 0.25,
      }));
    };

    const draw = () => {
      const now = performance.now();
      if (now - lastFrame < frameIntervalMs) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastFrame = now;

      ctx.clearRect(0, 0, w, h);
      // particles
      for (const p of dots) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,43,60,${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // subtle connections (skip on mobile/touch for smoothness)
      if (!isHeavyMode) {
        for (let i = 0; i < dots.length; i++) {
          for (let j = i + 1; j < dots.length; j++) {
            const a = dots[i];
            const b = dots[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.hypot(dx, dy);
            if (dist < connectionRange) {
              const alpha = (1 - dist / connectionRange) * 0.10;
              ctx.strokeStyle = `rgba(255,77,94,${alpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden
    />
  );
}

