"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const slides = [
  { title: "Arena Lounge", img: "/h2.jpg" },
  { title: "Neon Immersion", img: "/h3.jpeg" },
  { title: "Red Room Vibe", img: "/h4.jpeg" },
  { title: "Neon Rig Row", img: "/h1.jpg" },
];

export function HeroGamingSlider() {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 640;
    if (reduced || coarse || small || !autoplay) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [autoplay]);

  return (
    <div
      className="relative h-[220px] w-full overflow-hidden rounded-[22px] border border-white/10 bg-black/20 shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_32px_rgba(255,43,60,0.15)] sm:h-[320px] lg:h-[420px]"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      {slides.map((s, i) => (
        <div
          key={s.title}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-out",
            i === index ? "z-[1] opacity-100" : "z-0 opacity-0",
          )}
          aria-hidden={i !== index}
        >
          <Image
            src={s.img}
            alt={s.title}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 520px, 520px"
            fetchPriority={i === 0 ? "high" : "low"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          <div className="absolute inset-x-5 bottom-5 hidden items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[rgba(20,24,33,0.6)] px-4 py-3 backdrop-blur sm:flex">
            <span className="text-xs font-semibold tracking-[0.2em] text-white/90">
              LOUNGE • SIMULATORS • CAFE
            </span>
            <span className="font-mono text-xs tracking-[0.16em] text-white/60">
              {s.title}
            </span>
          </div>
        </div>
      ))}

      <div
        className="absolute bottom-3 left-0 right-0 z-[2] flex justify-center gap-2"
        role="tablist"
        aria-label="Hero images"
      >
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show slide: ${s.title}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 w-2 rounded-full transition-[transform,box-shadow] duration-200",
              i === index
                ? "scale-110 bg-[#ff2b3c] shadow-[0_0_12px_rgba(255,43,60,0.5)]"
                : "bg-white/35 hover:bg-white/55",
            )}
          />
        ))}
      </div>
    </div>
  );
}
