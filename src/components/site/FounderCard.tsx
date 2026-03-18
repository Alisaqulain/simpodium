import Image from "next/image";

type FounderCardProps = {
  name: string;
  title: string;
  img: string;
  bio?: string;
  tagline?: string;
};

export function FounderCard({
  name,
  title,
  img,
  bio,
  tagline,
}: FounderCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-[rgba(20,24,33,0.5)] shadow-[0_24px_60px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_80px_rgba(0,0,0,0.5),0_0_40px_rgba(255,43,60,0.12)]">
      {/* Neon accent line */}
      <div
        className="absolute left-0 top-0 z-10 h-full w-1 rounded-l-[24px] opacity-90"
        style={{
          background:
            "linear-gradient(180deg, var(--sp-red), var(--sp-red-2), transparent)",
          boxShadow: "0 0 20px rgba(255,43,60,0.4)",
        }}
      />
      <div className="flex flex-col sm:flex-row">
        {/* Photo */}
        <div className="relative h-[280px] w-full shrink-0 sm:h-[320px] sm:w-[320px]">
          <Image
            src={img}
            alt={name}
            width={400}
            height={400}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:from-transparent sm:via-transparent sm:to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5">
            <span className="inline-block rounded-full border border-white/20 bg-[rgba(20,24,33,0.85)] px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-white/90 backdrop-blur">
              {title.toUpperCase()}
            </span>
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-1 flex-col justify-center p-6 pl-7 sm:p-8 sm:pl-10">
          <h3 className="text-glow text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {name}
          </h3>
          {tagline ? (
            <p className="text-glow-red mt-2 font-mono text-sm tracking-wide text-[var(--sp-red-2)]">
              {tagline}
            </p>
          ) : null}
          {bio ? (
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/75">
              {bio}
            </p>
          ) : null}
          <div className="mt-6 flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: "var(--sp-red)",
                boxShadow: "0 0 14px rgba(255,43,60,0.55)",
              }}
            />
            <span className="text-xs font-semibold tracking-[0.24em] text-white/60">
              SIM PODIUM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
