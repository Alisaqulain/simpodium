"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const slides = [
  {
    title: "Neon Rig Row",
    img: "/h1.jpg",
  },
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
];

export function HeroGamingSlider() {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-[22px] border border-white/10 bg-black/20 shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_32px_rgba(255,43,60,0.15)] backdrop-blur sm:h-[380px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3200, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="hero-gaming-slider absolute inset-0 h-full w-full"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.title} className="h-full w-full">
            <div className="relative h-full w-full">
              <Image
                src={s.img}
                alt={s.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 520px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[rgba(20,24,33,0.6)] px-4 py-3 backdrop-blur">
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
