import { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Blog & Updates",
  description:
    "Stories, race nights, setup tips, and behind-the-scenes updates from the SIM PODIUM team.",
};

const placeholderPosts = [
  {
    title: "Night race vibes in Indiranagar",
    date: "Coming soon",
    summary:
      "We’re curating stories from events, hot laps, and community race nights. Watch this space for updates.",
  },
];

export default function BlogPage() {
  return (
    <div className="sp-container pb-20 pt-20">
      <section className="py-10 sm:py-14">
        <Reveal>
          <SectionHeading
            eyebrow="BLOG"
            title="Stories from the grid"
            desc="Long-form updates coming soon. For now, explore testimonials and live bookings to get a feel for the lounge."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {placeholderPosts.map((p) => (
            <Reveal key={p.title}>
              <article className="sp-glass sp-glow-hover h-full rounded-2xl border border-white/10 p-6">
                <div className="text-xs font-semibold tracking-[0.22em] text-white/55">
                  {p.date}
                </div>
                <h2 className="mt-2 text-base font-semibold tracking-wide text-white/90">
                  {p.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/70">{p.summary}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

