"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { business } from "@/data/content";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/bookings", label: "Bookings" },
  { href: "/cafe", label: "Cafe" },
  { href: "/shop", label: "Shop" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const activeHref = useMemo(() => {
    if (!pathname) return "/";
    if (pathname === "/") return "/";
    const hit = navItems.find((i) => i.href !== "/" && pathname.startsWith(i.href));
    return hit?.href ?? "/";
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          isScrolled ? "py-3" : "py-5",
        )}
      >
        <div className="sp-container">
          <div
            className={cn(
              "relative flex items-center justify-between gap-4 rounded-2xl border border-white/10 px-4 py-2 sm:px-5 sm:py-2.5",
              isScrolled ? "bg-[rgba(20,24,33,0.55)] backdrop-blur-xl" : "bg-transparent",
            )}
            style={{
              boxShadow: isScrolled ? "0 18px 50px rgba(0,0,0,0.55)" : "none",
            }}
          >
            <div className="flex items-center gap-3">
              <Logo />
            </div>

            <nav className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) => {
                const isActive = activeHref === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative text-sm font-medium tracking-wide text-white/80 transition-colors",
                      "hover:text-white",
                      isActive && "text-white",
                    )}
                  >
                    <span className="relative">
                      {item.label}
                      <span
                        className={cn(
                          "pointer-events-none absolute -bottom-2 left-1/2 h-[2px] w-10 -translate-x-1/2 rounded-full opacity-0 blur-[1px] transition-opacity duration-300",
                          isActive ? "opacity-100" : "group-hover:opacity-100",
                        )}
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, var(--sp-red), transparent)",
                        }}
                      />
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${business.phone.replace(/\s/g, "")}`}
                className={cn(
                  "hidden rounded-xl px-3 py-2 text-sm font-semibold tracking-wide text-white/90 lg:inline-flex",
                  "border border-white/10 bg-white/5 backdrop-blur",
                  "transition-all duration-300 hover:-translate-y-[1px] hover:text-white hover:bg-white/10",
                )}
              >
                {business.phone}
              </a>
              <Link
                href="/bookings"
                className={cn(
                  "hidden rounded-xl px-4 py-2 text-sm font-semibold tracking-wide text-white lg:inline-flex",
                  "border border-white/10 bg-white/5 backdrop-blur",
                  "transition-all duration-300 hover:-translate-y-[1px]",
                )}
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(255,43,60,0.35), 0 0 24px rgba(255,43,60,0.18)",
                }}
              >
                Book Now
              </Link>

              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90 backdrop-blur transition-colors hover:bg-white/10 lg:hidden"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            <div
              className="pointer-events-none absolute inset-x-10 -top-px h-px opacity-60"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,43,60,0.65), transparent)",
              }}
            />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background:
                  "radial-gradient(900px 600px at 20% 10%, rgba(255,43,60,0.20), transparent 55%), linear-gradient(180deg, rgba(15,17,21,0.92), rgba(20,24,33,0.94))",
              }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="relative mx-auto flex h-full max-w-md flex-col justify-between px-6 pb-10 pt-24"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
            >
              <div className="sp-glass sp-neon-border p-5">
                <div className="mb-4 flex items-center justify-between">
                  <Logo />
                  <Link
                    href="/bookings"
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm font-semibold tracking-wide text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,43,60,0.95), rgba(255,77,94,0.85))",
                      boxShadow: "0 0 28px rgba(255,43,60,0.25)",
                    }}
                  >
                    Book Now
                  </Link>
                </div>

                <div className="grid gap-2">
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * idx }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-base font-semibold tracking-wide text-white/90",
                          "transition-all duration-300 hover:bg-white/10",
                        )}
                      >
                        <span>{item.label}</span>
                        <span
                          className="h-[10px] w-[10px] rounded-full opacity-70"
                          style={{
                            background:
                              activeHref === item.href
                                ? "var(--sp-red)"
                                : "rgba(255,255,255,0.30)",
                            boxShadow:
                              activeHref === item.href
                                ? "0 0 18px rgba(255,43,60,0.55)"
                                : "none",
                          }}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <a
                  href={`tel:${business.phone.replace(/\s/g, "")}`}
                  onClick={() => setOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold tracking-wide text-white/90 transition-colors hover:bg-white/10"
                >
                  {business.phone}
                </a>
              </div>

              <div className="mt-10 text-center text-xs text-white/55">
                <div className="font-mono tracking-[0.22em]">SIM PODIUM</div>
                <div className="mt-1">Premium Sim Racing Lounge • Bengaluru</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

