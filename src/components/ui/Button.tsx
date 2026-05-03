"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-6 text-base",
} as const;

export function Button({
  href,
  type = "button",
  onClick,
  disabled,
  variant = "primary",
  size = "md",
  className,
  children,
}: Props) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-2xl font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,43,60,0.35)] focus-visible:ring-offset-0";

  const variantClass =
    variant === "primary"
      ? "text-white"
      : variant === "secondary"
        ? "border border-white/12 bg-white/5 text-white/90 backdrop-blur hover:bg-white/10"
        : "text-white/85 hover:text-white";

  const style =
    variant === "primary"
      ? {
          background:
            "linear-gradient(135deg, rgba(255,43,60,0.98), rgba(255,77,94,0.86))",
          boxShadow:
            "0 18px 50px rgba(0,0,0,0.55), 0 0 34px rgba(255,43,60,0.22)",
        }
      : undefined;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
          variant === "primary" && "group-hover:opacity-100",
        )}
        style={{
          background:
            "radial-gradient(500px 220px at 30% 10%, rgba(255,255,255,0.25), transparent 55%)",
        }}
      />
    </>
  );

  const cls = cn(base, sizes[size], variantClass, className);

  if (href) {
    return (
      <Link href={href} className={cls} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
      style={style}
    >
      {content}
    </button>
  );
}
