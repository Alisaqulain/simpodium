import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="SIM PODIUM"
      className="group relative inline-flex items-center gap-4"
    >
      <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur sm:h-14 sm:w-14">
        <span
          className="absolute inset-0 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,43,60,0.65), transparent 70%)",
          }}
        />
        <Image
          src="/Sim Podium final logo.png"
          alt="SIM PODIUM logo"
          width={64}
          height={64}
          priority
          className="relative h-10 w-10 object-contain sm:h-12 sm:w-12"
        />
      </span>
      <span className="hidden flex-col leading-none sm:flex">
        <span className="text-glow text-sm font-semibold tracking-[0.38em] text-white/90">
          SIM
        </span>
        <span className="text-glow-red text-xl font-semibold tracking-[0.26em] text-white">
          PODIUM
        </span>
      </span>
      <span
        className="pointer-events-none absolute -bottom-3 left-1/2 h-[2px] w-20 -translate-x-1/2 rounded-full opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--sp-red), transparent)",
        }}
      />
    </Link>
  );
}

