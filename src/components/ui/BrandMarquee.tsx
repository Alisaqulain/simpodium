"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { BrandItem } from "@/data/brands";

function kindAccent(kind: BrandItem["kind"]) {
  if (kind === "team") return "rgba(255,43,60,0.55)";
  if (kind === "manufacturer") return "rgba(255,77,94,0.45)";
  return "rgba(255,255,255,0.22)";
}

export function BrandMarquee({
  items,
  className,
}: {
  items: BrandItem[];
  className?: string;
}) {
  const doubled = useMemo(() => [...items, ...items], [items]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[22px] border border-white/10 bg-white/5 backdrop-blur",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(800px 420px at 25% 20%, rgba(255,43,60,0.14), transparent 60%), radial-gradient(800px 420px at 80% 70%, rgba(255,77,94,0.10), transparent 60%)",
        }}
      />
      <div className="relative z-10 py-6">
        <div className="sp-marquee group flex gap-4 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          {doubled.map((b, idx) => (
            <BrandTile key={`${b.name}_${idx}`} item={b} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BrandTile({ item }: { item: BrandItem }) {
  const accent = kindAccent(item.kind);
  return (
    <div
      className="relative w-[220px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[rgba(20,24,33,0.55)] px-5 py-5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgba(20,24,33,0.68)]"
      style={{ boxShadow: "0 18px 50px rgba(0,0,0,0.45)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl"
        style={{ background: accent }}
      />

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-glow text-xs font-semibold tracking-[0.22em] text-white/70">
            {item.kind.toUpperCase()}
          </div>
          <div className="text-glow mt-2 text-lg font-semibold tracking-tight text-white">
            {item.name}
          </div>
          {item.subtitle ? (
            <div className="text-glow-red mt-1 text-sm font-semibold tracking-wide text-white/85">
              {item.subtitle}
            </div>
          ) : null}
        </div>
        <div
          className="mt-1 h-9 w-9 rounded-xl border border-white/10 bg-white/5"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(255,43,60,0.18)",
          }}
          aria-hidden
        />
      </div>

      <div className="mt-5 h-[2px] w-full rounded-full bg-white/10">
        <div
          className="h-full w-2/3 rounded-full"
          style={{
            background: `linear-gradient(90deg, rgba(255,43,60,0.0), ${accent})`,
          }}
        />
      </div>
    </div>
  );
}

