import { Calendar, Gamepad2, ShoppingBag, Sparkles, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";
import { features } from "@/config/features";

type Props = {
  className?: string;
};

export function HeroLaunchBanner({ className }: Props) {
  if (features.bookingSlots && features.shop && features.cafe) return null;

  const items = [
    !features.bookingSlots && {
      icon: Calendar,
      label: "Online booking",
      detail: "Pick rig • Slot • Confirm",
    },
    !features.shop && {
      icon: ShoppingBag,
      label: "Shop",
      detail: "Racing gear & accessories",
    },
    !features.cafe && {
      icon: UtensilsCrossed,
      label: "Cafe menu",
      detail: "Coffee, snacks & more",
    },
  ].filter(Boolean) as Array<{
    icon: typeof Calendar;
    label: string;
    detail: string;
  }>;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "sp-hero-flash-banner relative w-full overflow-hidden rounded-[22px] border border-[rgba(255,43,60,0.55)]",
        className,
      )}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,43,60,0.22) 0%, rgba(15,17,21,0.92) 45%, rgba(20,24,33,0.95) 100%)",
        boxShadow:
          "0 0 40px rgba(255,43,60,0.35), 0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(255,43,60,0.45), transparent 50%), radial-gradient(circle at 100% 100%, rgba(255,77,94,0.25), transparent 45%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "repeating-linear-gradient(-12deg, transparent 0px, transparent 14px, rgba(255,255,255,0.06) 14px, rgba(255,255,255,0.06) 15px)",
        }}
        aria-hidden
      />

      <div className="relative px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff2b3c] opacity-70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff2b3c] shadow-[0_0_12px_rgba(255,43,60,0.8)]" />
          </span>
          <div className="sp-blink-label inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,43,60,0.45)] bg-[rgba(255,43,60,0.15)] px-3 py-1.5 text-[10px] font-bold tracking-[0.24em] text-white sm:text-xs">
            <Sparkles size={12} aria-hidden />
            LAUNCHING SOON
          </div>
        </div>

        <div className="mt-3 flex items-start gap-3 sm:mt-4">
          <div className="hidden shrink-0 sm:grid sm:h-12 sm:w-12 sm:place-items-center sm:rounded-2xl sm:border sm:border-[rgba(255,43,60,0.35)] sm:bg-[rgba(255,43,60,0.12)] sm:text-[#ff2b3c]">
            <Gamepad2 size={22} className="sp-blink-icon" aria-hidden />
          </div>
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <h2 className="text-glow sp-blink-banner-text text-lg font-semibold leading-tight text-white sm:text-xl lg:text-2xl">
              Online booking & more — coming to the website
            </h2>
            <p className="mt-2 text-xs leading-5 text-white/70 sm:text-sm sm:leading-6">
              Reserve simulators, browse the shop, and explore our cafe menu — all launching
              on Simpodium.in very soon. Stay tuned.
            </p>
          </div>
        </div>

        {items.length > 0 ? (
          <ul className="mt-4 grid gap-2 sm:grid-cols-3 sm:gap-2.5">
            {items.map(({ icon: Icon, label, detail }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/25 px-3 py-2.5 sm:flex-col sm:items-start sm:gap-1.5 sm:px-3.5 sm:py-3"
              >
                <Icon size={16} className="shrink-0 text-[#ff6b78]" aria-hidden />
                <div className="min-w-0 flex-1 sm:flex-none">
                  <div className="text-xs font-semibold text-white/90 sm:text-sm">{label}</div>
                  <div className="text-[10px] text-white/50 sm:text-xs">{detail}</div>
                </div>
                <span className="sp-blink-label ml-auto shrink-0 text-[9px] font-bold tracking-[0.18em] text-[#ff6b78] sm:ml-0 sm:mt-1">
                  SOON
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <div
          className="sp-blink-banner-text mt-4 rounded-xl border border-[rgba(255,43,60,0.35)] bg-[rgba(255,43,60,0.12)] px-3 py-2.5 text-center text-[11px] font-semibold tracking-[0.14em] text-white sm:text-xs sm:tracking-[0.18em]"
        >
          ONLINE BOOKING • SHOP • CAFE — ALL LAUNCHING SOON
        </div>
      </div>
    </div>
  );
}
