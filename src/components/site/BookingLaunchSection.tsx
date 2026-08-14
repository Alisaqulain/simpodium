"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, Gamepad2, Sparkles, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { business } from "@/data/content";

const slides = [
  {
    title: "Pick your rig",
    subtitle: "Motion • UltraWide • Duo • Trainer",
    desc: "Choose from pro-grade simulators tuned for comfort, precision, and multiplayer battles.",
    img: "/h2.jpg",
    icon: Gamepad2,
    chips: ["4 simulator types", "Motion & static rigs", "Multiplayer ready"],
  },
  {
    title: "Lock your slot",
    subtitle: "15-minute precision windows",
    desc: "Browse open times, pick the perfect window, and reserve without the back-and-forth.",
    img: "/h1.jpg",
    icon: Calendar,
    chips: ["Same-day slots", "Evening sessions", "Weekend grids"],
  },
  {
    title: "Instant confirmation",
    subtitle: "Book in under 60 seconds",
    desc: "Confirm your session in a few taps — no forms, no waiting on callbacks.",
    img: "/h3.jpeg",
    icon: Zap,
    chips: ["Real-time availability", "Instant receipt", "Easy rescheduling"],
  },
  {
    title: "Race with your crew",
    subtitle: "Side-by-side multiplayer",
    desc: "Grid up with friends, split packages, and chase photo-finish moments together.",
    img: "/h4.jpeg",
    icon: Users,
    chips: ["Duo cockpits", "Group nights", "Event bookings"],
  },
] as const;

export function BookingLaunchSection() {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [progress, setProgress] = useState(0);

  const SLIDE_MS = 4500;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !autoplay) return;

    const tick = 50;
    const step = (tick / SLIDE_MS) * 100;

    const progressId = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 0;
        return p + step;
      });
    }, tick);

    const slideId = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
      setProgress(0);
    }, SLIDE_MS);

    return () => {
      window.clearInterval(progressId);
      window.clearInterval(slideId);
    };
  }, [autoplay]);

  const active = slides[index];
  const ActiveIcon = active.icon;

  return (
    <section id="booking-soon" className="relative scroll-mt-28 py-14 sm:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/McLaren.jpeg"
          alt=""
          fill
          className="object-cover opacity-25 blur-sm"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/88 via-black/92 to-black/98" />
      </div>

      <div className="sp-container relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Copy + CTAs */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,43,60,0.35)] bg-[rgba(255,43,60,0.12)] px-4 py-2 text-[10px] font-semibold tracking-[0.24em] text-white/90 sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff2b3c] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff2b3c] shadow-[0_0_12px_rgba(255,43,60,0.7)]" />
              </span>
              ONLINE BOOKING • LAUNCHING SOON
            </div>

            <h2 className="text-glow mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Reserve your rig in seconds — coming online shortly
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
              We&apos;re polishing the booking experience: pick a simulator, choose your slot,
              and get instant confirmation. Until then, call or message us to lock in your session.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Rigs", value: "4" },
                { label: "Slot size", value: "15m" },
                { label: "Booking", value: "Soon" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="sp-glass rounded-2xl px-4 py-3 text-center sm:text-left"
                >
                  <div className="text-glow-red font-mono text-lg font-semibold tracking-[0.16em] text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[10px] font-semibold tracking-[0.22em] text-white/55">
                    {stat.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={`tel:${business.phone.replace(/\s/g, "")}`}
                size="lg"
                className="w-full sm:w-auto"
              >
                Call to Book
              </Button>
              <Button href="/contact" variant="secondary" size="lg" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </div>
          </div>

          {/* Slider */}
          <div
            className="lg:col-span-7"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => {
              setAutoplay(true);
              setProgress(0);
            }}
          >
            <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-black/30 shadow-[0_24px_80px_rgba(0,0,0,0.65),0_0_40px_rgba(255,43,60,0.15)]">
              {/* Slide images */}
              <div className="relative h-[280px] sm:h-[360px] lg:h-[400px]">
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
                      sizes="(max-width: 1024px) 100vw, 640px"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,43,60,0.25),transparent_50%)]" />
                  </div>
                ))}

                {/* Launching soon overlay badge */}
                <div className="absolute left-4 top-4 z-[2] flex items-center gap-2 rounded-full border border-white/15 bg-[rgba(15,17,21,0.72)] px-3 py-1.5 backdrop-blur-md sm:left-5 sm:top-5">
                  <Sparkles size={14} className="text-[#ff2b3c]" aria-hidden />
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-white/90 sm:text-xs">
                    LAUNCHING SOON
                  </span>
                </div>

                {/* Active slide content */}
                <div className="absolute inset-x-0 bottom-0 z-[2] p-4 sm:p-6">
                  <div className="rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.72)] p-4 backdrop-blur-xl sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-[rgba(255,43,60,0.18)] text-[#ff2b3c] shadow-[0_0_20px_rgba(255,43,60,0.25)]">
                        <ActiveIcon size={18} aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-semibold tracking-[0.22em] text-white/55 sm:text-xs">
                          {active.subtitle.toUpperCase()}
                        </div>
                        <div className="mt-1 text-base font-semibold tracking-wide text-white/95 sm:text-lg">
                          {active.title}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/70">{active.desc}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {active.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold tracking-wide text-white/75 sm:text-xs"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress + controls */}
              <div className="relative z-[3] border-t border-white/10 bg-[rgba(15,17,21,0.85)] px-4 py-4 backdrop-blur-md sm:px-5">
                <div className="mb-3 h-[2px] overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-[width] duration-100 ease-linear"
                    style={{
                      width: `${progress}%`,
                      background:
                        "linear-gradient(90deg, rgba(255,43,60,0.4), rgba(255,43,60,0.95))",
                      boxShadow: "0 0 12px rgba(255,43,60,0.5)",
                    }}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-white/55 sm:text-xs">
                    <Clock size={12} aria-hidden />
                    PREVIEW {String(index + 1).padStart(2, "0")} /{" "}
                    {String(slides.length).padStart(2, "0")}
                  </div>

                  <div className="flex gap-2" role="tablist" aria-label="Booking preview slides">
                    {slides.map((s, i) => (
                      <button
                        key={s.title}
                        type="button"
                        role="tab"
                        aria-selected={i === index}
                        aria-label={`Show: ${s.title}`}
                        onClick={() => {
                          setIndex(i);
                          setProgress(0);
                        }}
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          i === index
                            ? "w-7 bg-[#ff2b3c] shadow-[0_0_12px_rgba(255,43,60,0.5)]"
                            : "w-2 bg-white/30 hover:bg-white/50",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
