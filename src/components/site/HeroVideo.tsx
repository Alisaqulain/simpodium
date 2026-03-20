"use client";

import { useEffect, useState } from "react";

export const HERO_VIDEO_SRC = "/Sim Podium Web Video_1.mp4";

export function HeroVideo() {
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    setAutoPlay(!(coarse || reduce));
  }, []);

  return (
    <>
      <video
        autoPlay={autoPlay}
        preload="metadata"
        muted
        loop
        playsInline
        poster="/h2.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      {/* Dark + red tint so text stays readable, gaming cafe mood */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(15,17,21,0.82) 0%, rgba(15,17,21,0.45) 45%, rgba(20,24,33,0.6) 100%), radial-gradient(800px 500px at 15% 30%, rgba(255,43,60,0.18), transparent 50%), radial-gradient(600px 400px at 85% 60%, rgba(255,77,94,0.12), transparent 45%)",
        }}
      />
    </>
  );
}

/** Right-column card: same video in a glass frame — lounge / cafe vibe, no 3D wheel */
export function HeroVideoCard() {
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    setAutoPlay(!(coarse || reduce));
  }, []);

  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-[22px] border border-white/10 bg-black/20 shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_32px_rgba(255,43,60,0.15)] backdrop-blur sm:h-[380px]">
      <video
        autoPlay={autoPlay}
        preload="metadata"
        muted
        loop
        playsInline
        poster="/h2.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[rgba(20,24,33,0.6)] px-4 py-3 backdrop-blur">
        <span className="text-xs font-semibold tracking-[0.2em] text-white/90">
          LOUNGE • SIMULATORS • CAFE
        </span>
        <span className="font-mono text-xs tracking-[0.16em] text-white/60">
          WATCH
        </span>
      </div>
    </div>
  );
}
