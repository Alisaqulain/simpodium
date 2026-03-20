"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const slides = [
  {
    title: "Arena Lounge",
    img: "/h2.jpg",
  },
  {
    title: "Neon Immersion",
    img: "/h3.jpeg",
  },
  {
    title: "Red Room Vibe",
    img: "/h4.jpeg",
  },
  {
    title: "Neon Rig Row",
    img: "/h1.jpg",
  },
];

export function HeroGamingSlider() {
  const [coarsePointer, setCoarsePointer] = useState(() => {
    if (typeof window === "undefined") return false;
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    const isSmallScreen = window.innerWidth < 640;
    return coarse || isSmallScreen;
  });

  useEffect(() => {
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    const isSmallScreen = window.innerWidth < 640;
    setCoarsePointer(coarse || isSmallScreen);
  }, []);

  return (
    <div className="relative h-[220px] w-full overflow-hidden rounded-[22px] border border-white/10 bg-black/20 shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_32px_rgba(255,43,60,0.15)] backdrop-blur-[0px] sm:backdrop-blur sm:h-[320px] lg:h-[420px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        initialSlide={0}
        loop={!coarsePointer}
        autoplay={coarsePointer ? false : { delay: 3200, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="hero-gaming-slider absolute inset-0 h-full w-full"
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={s.title} className="h-full w-full">
            <div className="relative h-full w-full">
              <Image
                src={s.img}
                alt={s.title}
                fill
                className="object-cover"
                priority={idx === 0}
                loading={idx === 0 ? "eager" : "lazy"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 520px, 520px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <div className="hidden absolute inset-x-5 bottom-5 sm:flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[rgba(20,24,33,0.6)] px-4 py-3 backdrop-blur">
                <span className="text-xs font-semibold tracking-[0.2em] text-white/90">
                  LOUNGE • SIMULATORS • CAFE
                </span>
                <span className="font-mono text-xs tracking-[0.16em] text-white/60">
                  {s.title}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
