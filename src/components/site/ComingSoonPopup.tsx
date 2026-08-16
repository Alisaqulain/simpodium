"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { features } from "@/config/features";

const STORAGE_KEY = "simpodium-coming-soon-dismissed";

type PopupContext = "welcome" | "cafe" | "shop";

const copy: Record<
  PopupContext,
  { title: string; desc: string; button: string; highlight?: "booking" | "shop" | "cafe" }
> = {
  welcome: {
    title: "We're launching shortly",
    desc: "SIM PODIUM is getting ready. Online booking, shop, and cafe will open on the website very soon.",
    button: "Got it — explore the lounge",
  },
  cafe: {
    title: "Cafe menu — coming soon",
    desc: "Our lounge menu is almost ready. Coffee, snacks, and fast food for long racing sessions — launching on the website shortly.",
    button: "Got it",
    highlight: "cafe",
  },
  shop: {
    title: "Shop — coming soon",
    desc: "Premium sim racing gear — wheels, pedals, gloves, and more — will be available to browse here very soon.",
    button: "Got it",
    highlight: "shop",
  },
};

export function isComingSoonPromoActive() {
  return !features.bookingSlots || !features.shop || !features.cafe;
}

function resolveContext(pathname: string): PopupContext | null {
  if (pathname === "/cafe" && !features.cafe) return "cafe";
  if (pathname === "/shop" && !features.shop) return "shop";
  if (pathname !== "/cafe" && pathname !== "/shop" && isComingSoonPromoActive()) {
    if (typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY)) {
      return null;
    }
    return "welcome";
  }
  return null;
}

export function ComingSoonPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const [context, setContext] = useState<PopupContext>("welcome");

  const showPopup = useCallback((ctx: PopupContext, delay = 400) => {
    const timer = window.setTimeout(() => {
      setContext(ctx);
      setOpen(true);
      setEntered(false);
      requestAnimationFrame(() => setEntered(true));
    }, delay);
    return timer;
  }, []);

  useEffect(() => {
    if (!isComingSoonPromoActive()) {
      setOpen(false);
      return;
    }

    const ctx = resolveContext(pathname ?? "/");
    if (!ctx) {
      setEntered(false);
      setOpen(false);
      return;
    }

    const delay = ctx === "cafe" || ctx === "shop" ? 120 : 450;
    const timer = showPopup(ctx, delay);
    return () => window.clearTimeout(timer);
  }, [pathname, showPopup]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const dismiss = () => {
    setEntered(false);
    if (context === "welcome") {
      sessionStorage.setItem(STORAGE_KEY, "1");
    }
    window.setTimeout(() => setOpen(false), 220);
  };

  if (!isComingSoonPromoActive() || !open) return null;

  const content = copy[context];

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close coming soon notice"
        className={cn(
          "absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300",
          entered ? "opacity-100" : "opacity-0",
        )}
        onClick={dismiss}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="coming-soon-title"
        className={cn(
          "sp-coming-soon-popup relative w-full max-w-md overflow-hidden rounded-[22px] border border-[rgba(255,43,60,0.45)] bg-[rgba(15,17,21,0.97)] shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-300",
          "max-h-[min(90vh,640px)] overflow-y-auto",
          entered
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-8 scale-[0.96] opacity-0 sm:translate-y-4",
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(circle at 20% 0%, rgba(255,43,60,0.35), transparent 55%), radial-gradient(circle at 80% 100%, rgba(255,77,94,0.2), transparent 50%)",
          }}
          aria-hidden
        />

        <button
          type="button"
          aria-label="Close"
          onClick={dismiss}
          className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-4 sm:top-4"
        >
          <X size={18} />
        </button>

        <div className="relative px-5 pb-5 pt-6 sm:px-7 sm:pb-7 sm:pt-8">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-[rgba(255,43,60,0.4)] bg-[rgba(255,43,60,0.15)] text-[#ff2b3c] sm:h-14 sm:w-14">
            <Sparkles size={22} className="sp-blink-icon" aria-hidden />
          </div>

          <div className="sp-blink-label mx-auto w-fit rounded-full border border-[rgba(255,43,60,0.45)] bg-[rgba(255,43,60,0.12)] px-4 py-2 text-[10px] font-semibold tracking-[0.28em] text-white sm:text-xs">
            COMING SOON
          </div>

          <h2
            id="coming-soon-title"
            className="text-glow mt-4 text-center text-xl font-semibold leading-tight text-white sm:text-2xl"
          >
            {content.title}
          </h2>

          <p className="mt-3 text-center text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
            {content.desc}
          </p>

          <ul className="mt-5 space-y-2.5">
            {!features.bookingSlots ? (
              <FlashItem
                label="Online booking"
                detail="Pick rig • Choose slot • Confirm"
                active={content.highlight === "booking"}
              />
            ) : null}
            {!features.shop ? (
              <FlashItem
                label="Shop"
                detail="Racing gear & accessories"
                active={content.highlight === "shop"}
              />
            ) : null}
            {!features.cafe ? (
              <FlashItem
                label="Cafe menu"
                detail="Coffee, snacks & lounge food"
                active={content.highlight === "cafe"}
              />
            ) : null}
          </ul>

          <button
            type="button"
            onClick={dismiss}
            className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl text-sm font-semibold tracking-wide text-white transition-transform active:scale-[0.98] sm:h-14 sm:text-base"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,43,60,0.98), rgba(255,77,94,0.86))",
              boxShadow: "0 12px 40px rgba(255,43,60,0.35), 0 0 24px rgba(255,43,60,0.2)",
            }}
          >
            {content.button}
          </button>
        </div>
      </div>
    </div>
  );
}

function FlashItem({
  label,
  detail,
  active = false,
}: {
  label: string;
  detail: string;
  active?: boolean;
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-xl border px-3.5 py-3 sm:px-4",
        active
          ? "border-[rgba(255,43,60,0.45)] bg-[rgba(255,43,60,0.12)]"
          : "border-white/10 bg-white/[0.04]",
      )}
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff2b3c] opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff2b3c]" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-white/90">{label}</div>
        <div className="text-xs text-white/55">{detail}</div>
      </div>
      <span className="sp-blink-label ml-auto shrink-0 text-[10px] font-semibold tracking-[0.2em] text-[#ff6b78]">
        SOON
      </span>
    </li>
  );
}
