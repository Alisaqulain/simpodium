"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

export function GallerySlider({
  items,
}: {
  items: { title: string; img: string }[];
}) {
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/5 backdrop-blur">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(700px 360px at 20% 20%, rgba(255,43,60,0.18), transparent 60%), radial-gradient(700px 360px at 80% 70%, rgba(255,77,94,0.12), transparent 60%)",
        }}
      />

      <Swiper
        modules={[EffectCoverflow, Pagination, Autoplay]}
        effect="coverflow"
        centeredSlides
        slidesPerView={"auto"}
        grabCursor
        loop
        autoplay={{ delay: 2600, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        coverflowEffect={{
          rotate: 18,
          stretch: 0,
          depth: 160,
          modifier: 1,
          slideShadows: false,
        }}
        className="relative z-10 py-10"
      >
        {items.map((it) => (
          <SwiperSlide
            key={it.title}
            style={{ width: "min(520px, 86vw)" }}
            className="px-3"
          >
            <motion.div
              className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-black/20"
              whileHover={{ rotateX: 2, rotateY: -3, y: -2 }}
              transition={{ duration: 0.25 }}
              style={{
                boxShadow:
                  "0 24px 70px rgba(0,0,0,0.55), 0 0 44px rgba(255,43,60,0.12)",
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src={it.img}
                alt={it.title}
                width={1600}
                height={1000}
                className="h-[340px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-[rgba(20,24,33,0.55)] px-4 py-3 backdrop-blur">
                <div className="text-sm font-semibold tracking-wide text-white/90">
                  {it.title}
                </div>
                <div className="mt-1 text-xs font-semibold tracking-[0.22em] text-white/55">
                  SWIPE • HOVER • GLOW
                </div>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute -left-16 -top-24 h-56 w-56 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "rgba(255,43,60,0.22)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-20 h-56 w-56 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "rgba(255,77,94,0.18)" }}
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.25);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #ff2b3c;
          box-shadow: 0 0 18px rgba(255, 43, 60, 0.45);
        }
      `}</style>
    </div>
  );
}

