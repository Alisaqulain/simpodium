import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="SIM PODIUM"
      className="group relative inline-flex items-center"
    >
      <span className="relative grid h-18 w-18 shrink-0 place-items-center overflow-visible sm:h-16 sm:w-16">
        <span
          className="absolute inset-0 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,43,60,0.65), transparent 70%)",
          }}
        />
        <Image
          src="/Sim Podium final logo_7.png"
          alt="SIM PODIUM logo"
          width={160}
          height={160}
          priority
          className="relative h-full w-full scale-150 object-contain sm:scale-[1.75]"
        />
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
