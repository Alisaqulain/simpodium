import Image from "next/image";
import type { BrandItem } from "@/data/brands";
import { Reveal } from "@/components/motion/Reveal";

function kindLabel(kind: BrandItem["kind"]) {
  if (kind === "team") return "TEAM";
  if (kind === "manufacturer") return "MANUFACTURER";
  return "COLLECTIBLE";
}

export function BrandGrid({ items }: { items: BrandItem[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((b) => (
        <Reveal key={b.name}>
          <article className="sp-glass sp-glow-hover overflow-hidden rounded-2xl border border-white/10 bg-[rgba(8,10,16,0.9)]">
            <div className="relative h-40 w-full sm:h-44">
              <Image
                src={b.img}
                alt={b.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] font-semibold tracking-[0.22em] text-white/80">
                {kindLabel(b.kind)}
              </div>
            </div>
            <div className="px-4 pb-4 pt-3">
              <h3 className="text-glow text-base font-semibold tracking-tight text-white">
                {b.name}
              </h3>
              {b.subtitle ? (
                <p className="text-glow-red mt-1 text-xs font-semibold tracking-wide text-white/80">
                  {b.subtitle}
                </p>
              ) : null}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

