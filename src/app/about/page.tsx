import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { business, owners, services } from "@/data/content";
import { features } from "@/config/features";
import { FounderCard } from "@/components/site/FounderCard";

export const metadata = {
  title: "About",
  description:
    "Learn about SIM PODIUM—our story, vision, simulators, and why we're building the most premium sim racing lounge in Bengaluru.",
};

export default function AboutPage() {
  return (
    <div className="sp-container pb-20">
      <section className="relative overflow-hidden py-10 sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(900px 600px at 15% 20%, rgba(255,43,60,0.18), transparent 60%), radial-gradient(900px 600px at 85% 10%, rgba(255,77,94,0.12), transparent 60%)",
          }}
        />
        <Reveal>
          <SectionHeading
            eyebrow="ABOUT"
            title="A premium racing lounge built for immersion"
            desc="SIM PODIUM is where cinematic lighting meets competitive sim racing—designed like an esports arena, tuned like a race garage."
          />
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-8 grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="sp-glass sp-glow-hover overflow-hidden p-6">
                <div className="text-sm font-semibold tracking-wide text-white/90">
                  Our Story
                </div>
                <p className="mt-3 text-sm leading-7 text-white/70 sm:text-base">
                  We started SIM PODIUM to create a space that feels like a night
                  race—deep dark ambience, neon red lighting, and technology
                  that reacts to every input. Whether you’re chasing a personal
                  best, practicing for esports, or just here for the thrill, we
                  want every visit to feel like a highlight reel.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {services.map((s) => (
                    <div
                      key={s}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="sp-glass sp-neon-border overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80"
                  alt="Sim racing setup"
                  width={1600}
                  height={1100}
                  className="h-[320px] w-full object-cover"
                  priority
                />
              </div>
              <div className="mt-4 sp-glass p-5">
                <div className="text-sm font-semibold tracking-wide text-white/90">
                  Location
                </div>
                <div className="mt-2 text-sm leading-7 text-white/70">
                  {business.addressOneLine}
                </div>
                {features.bookingSlots ? (
                  <div className="mt-4">
                    <Button href="/bookings" size="lg">
                      Book a Session
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="VISION"
            title="Technology-forward, racer-first"
            desc="We obsess over feel—controls, response, seating geometry, and the vibe that keeps you locked in."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Card
            title="Immersion"
            desc="Neon lighting, cinematic contrast, and a cockpit-first layout."
          />
          <Card
            title="Performance"
            desc="High refresh visuals, low-latency response, and consistent feedback."
          />
          <Card
            title="Community"
            desc="Events, tournaments, and a space made for rivalry and friendships."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="OWNERS"
            title="Meet the Owners"
            desc="Founders building a premium sim racing destination in Bengaluru."
          />
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {owners.map((o) => (
            <Reveal key={o.name}>
              <FounderCard
                name={o.name}
                title={o.title}
                img={o.img}
                bio={o.bio}
                tagline={o.tagline}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <Reveal>
      <div className="sp-glass sp-glow-hover p-6">
        <div className="text-base font-semibold tracking-wide text-white/90">
          {title}
        </div>
        <div className="mt-3 text-sm leading-7 text-white/70">{desc}</div>
        <div className="mt-6 h-[2px] w-full rounded-full bg-white/10">
          <div
            className="h-full w-2/3 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,43,60,0.0), rgba(255,43,60,0.95))",
            }}
          />
        </div>
      </div>
    </Reveal>
  );
}

