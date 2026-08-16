import { Sparkles } from "lucide-react";
import { features } from "@/config/features";

export function LaunchingSoonBanner() {
  if (features.bookingSlots) return null;

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[70] overflow-hidden border-b border-[rgba(255,43,60,0.35)]"
      role="status"
      aria-live="polite"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,43,60,0.95) 0%, rgba(255,77,94,0.88) 45%, rgba(180,20,35,0.95) 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "repeating-linear-gradient(105deg, transparent 0px, transparent 18px, rgba(255,255,255,0.08) 18px, rgba(255,255,255,0.08) 19px)",
        }}
        aria-hidden
      />

      <div className="relative flex min-h-11 items-center justify-center gap-2 px-4 py-2.5 sm:min-h-12 sm:gap-3 sm:px-6">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </span>

        <Sparkles size={14} className="hidden shrink-0 text-white/90 sm:block" aria-hidden />

        <p className="text-center text-[11px] font-semibold tracking-[0.18em] text-white sm:text-xs sm:tracking-[0.22em]">
          <span className="sp-blink-banner-text sm:hidden">ONLINE BOOKING — LAUNCHING SOON</span>
          <span className="sp-blink-banner-text hidden sm:inline">
            ONLINE BOOKING LAUNCHING SOON — PICK YOUR RIG • CHOOSE YOUR SLOT • CONFIRM INSTANTLY
          </span>
        </p>

        <Sparkles size={14} className="hidden shrink-0 text-white/90 sm:block" aria-hidden />
      </div>
    </div>
  );
}

export const launchingSoonBannerOffsetClass = features.bookingSlots
  ? ""
  : "sp-has-launch-banner";
