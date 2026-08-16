import { Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = {
  eyebrow: string;
  title: string;
  desc: string;
};

export function ComingSoonPage({ eyebrow, title, desc }: Props) {
  return (
    <div className="sp-container pb-20">
      <section className="relative overflow-hidden py-10 sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(900px 600px at 18% 20%, rgba(255,43,60,0.18), transparent 60%), radial-gradient(900px 600px at 82% 10%, rgba(255,77,94,0.12), transparent 60%)",
          }}
        />
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} desc={desc} />
        </Reveal>
      </section>

      <section className="py-10 sm:py-14">
        <Reveal>
          <div className="mx-auto max-w-xl sp-glass sp-neon-border sp-coming-soon-popup p-8 text-center sm:p-10">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-[rgba(255,43,60,0.35)] bg-[rgba(255,43,60,0.12)] text-[#ff2b3c] shadow-[0_0_28px_rgba(255,43,60,0.25)]">
              <Sparkles size={24} className="sp-blink-icon" aria-hidden />
            </div>
            <div className="sp-blink-label inline-flex items-center gap-2 rounded-full border border-[rgba(255,43,60,0.35)] bg-[rgba(255,43,60,0.1)] px-4 py-2 text-[10px] font-semibold tracking-[0.24em] text-white/90 sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff2b3c] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff2b3c]" />
              </span>
              COMING SOON
            </div>
            <p className="mt-5 text-sm leading-7 text-white/70">
              We&apos;re putting the finishing touches on this section. Check back soon for
              the full experience.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
