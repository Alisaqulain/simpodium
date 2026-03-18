import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  desc,
  className,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {eyebrow ? (
        <div className="text-glow inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.26em] text-white/90 backdrop-blur">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              background: "var(--sp-red)",
              boxShadow: "0 0 18px rgba(255,43,60,0.55)",
            }}
          />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-glow text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {desc ? (
        <p className="text-glow max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

