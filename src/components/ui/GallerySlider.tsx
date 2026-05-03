import Image from "next/image";

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

      <div
        className="relative z-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-10 pb-6 [scrollbar-width:thin] [scrollbar-color:rgba(255,43,60,0.45)_rgba(255,255,255,0.06)]"
        tabIndex={0}
        aria-label="Simulator gallery, scroll horizontally"
      >
        {items.map((it, idx) => (
          <div
            key={it.title}
            className="shrink-0 snap-center px-3 first:pl-4 last:pr-4"
            style={{ width: "min(520px, 86vw)" }}
          >
            <div
              className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-black/20 shadow-[0_24px_70px_rgba(0,0,0,0.55),0_0_44px_rgba(255,43,60,0.12)] transition-transform duration-300 will-change-transform hover:-translate-y-0.5"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={it.img}
                alt={it.title}
                width={1200}
                height={750}
                className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:h-[340px]"
                sizes="(max-width: 640px) 86vw, 520px"
                loading={idx === 0 ? "eager" : "lazy"}
                decoding={idx === 0 ? "sync" : "async"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-[rgba(20,24,33,0.55)] px-4 py-3 backdrop-blur">
                <div className="text-sm font-semibold tracking-wide text-white/90">
                  {it.title}
                </div>
                <div className="mt-1 text-xs font-semibold tracking-[0.22em] text-white/55">
                  SCROLL • SNAP • GLOW
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
