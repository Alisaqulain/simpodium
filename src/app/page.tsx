import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParticleField } from "@/components/effects/ParticleField";
import { HeroVideo } from "@/components/site/HeroVideo";
import { HeroGamingSlider } from "@/components/site/HeroGamingSlider";
import { GallerySlider } from "@/components/ui/GallerySlider";
import { BrandMarquee } from "@/components/ui/BrandMarquee";
import { BrandGrid } from "@/components/site/BrandGrid";
import {
  business,
  cafeItems,
  experienceCards,
  gallery,
  packages,
  testimonials,
} from "@/data/content";
import { brands } from "@/data/brands";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* HERO — background video, no 3D wheel; gaming cafe vibe */}
      <section className="relative min-h-[85vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HeroVideo />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <ParticleField className="h-full w-full opacity-70" />
        </div>
        <div className="sp-container relative z-10 py-16 sm:py-20 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.26em] text-white/80 backdrop-blur">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: "var(--sp-red)",
                      boxShadow: "0 0 18px rgba(255,43,60,0.55)",
                    }}
                  />
                  PREMIUM SIM RACING • INDlRANAGAR
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="text-glow-red-strong mt-6 text-4xl font-semibold tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
                  SIM PODIUM
                </h1>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="text-glow mt-4 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
                  The Ultimate Sim Racing Experience in Bangalore — cinematic
                  lighting, pro-grade rigs, real physics, and an esports lounge
                  vibe.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button href="/bookings" size="lg">
                    Book Now
                  </Button>
                  <Button href="#simulators" variant="secondary" size="lg">
                    Explore Simulators
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                  <DashStat label="Rigs" value="06+" />
                  <DashStat label="FPS" value="120+" />
                  <DashStat label="Tracks" value="50+" />
                  <DashStat label="Lap Timer" value="LED" />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.12}>
                <HeroGamingSlider />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS / SEGMENTS */}
      <section className="relative py-12 sm:py-16">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/Ferrari.jpeg"
            alt="Premium manufacturer grid"
            fill
            priority={false}
            className="object-cover opacity-45 blur-sm"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/92 to-black/95" />
        </div>
        <div className="sp-container relative z-10">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="BRAND PARTNERS"
                  title="Die-cast, manufacturers, and race teams"
                  desc="A curated lineup across MJX HyperGo, Mini GT, Pop Race, Tomica, Bburago and iconic teams like Ferrari, Red Bull, McLaren, Mercedes, Audi, BMW, and Lamborghini."
                />
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-6 grid max-w-md grid-cols-2 gap-3 text-xs text-white/75">
                  <div className="sp-glass sp-glow-hover rounded-2xl px-4 py-3">
                    <div className="font-mono text-lg font-semibold tracking-[0.18em] text-white">
                      {brands.filter((b) => b.kind === "collectible").length}
                    </div>
                    <div className="mt-1 text-[11px] font-semibold tracking-[0.22em] text-white/55">
                      COLLECTIBLE LINES
                    </div>
                  </div>
                  <div className="sp-glass sp-glow-hover rounded-2xl px-4 py-3">
                    <div className="font-mono text-lg font-semibold tracking-[0.18em] text-white">
                      {brands.filter((b) => b.kind !== "collectible").length}
                    </div>
                    <div className="mt-1 text-[11px] font-semibold tracking-[0.22em] text-white/55">
                      TEAMS & OEMS
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="space-y-10">
              <Reveal delay={0.08}>
                <BrandMarquee items={brands} />
              </Reveal>
              <Reveal delay={0.14}>
                <BrandGrid items={brands} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="simulators" className="relative py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/h2.jpg"
            alt="Esports lounge rigs"
            fill
            className="object-cover opacity-35 blur-sm"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/88 to-black/92" />
        </div>
        <div className="sp-container relative z-10">
          <Reveal>
            <SectionHeading
              eyebrow="EXPERIENCE"
              title="The Future of Racing Simulation"
              desc="Built like an esports arena, tuned like a race garage—every detail engineered for immersion."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {experienceCards.map((c) => (
              <FeatureCard key={c.title} title={c.title} desc={c.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="relative py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/h3.jpeg"
            alt="Immersive gaming gallery"
            fill
            className="object-cover opacity-35 blur-sm"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/90 to-black/95" />
        </div>
        <div className="sp-container relative z-10">
          <Reveal>
            <SectionHeading
              eyebrow="SIMULATOR GALLERY"
              title="Rigs that feel like a podium moment"
              desc="Interactive gallery with premium reflections, zoom, and cinematic framing."
            />
          </Reveal>

          <div className="mt-10">
            <GallerySlider items={gallery as unknown as { title: string; img: string }[]} />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/h1.jpg"
            alt="Sim rigs in action"
            fill
            className="object-cover opacity-35 blur-sm"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/82 via-black/90 to-black/96" />
        </div>
        <div className="sp-container relative z-10">
          <Reveal>
            <SectionHeading
              eyebrow="HOW IT WORKS"
              title="From zero to hot-lap in minutes"
              desc="A premium flow designed for first-timers and pros alike."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <StepCard
              n="01"
              title="Select Simulator"
              desc="Pick the rig style that matches your race mood."
            />
            <StepCard
              n="02"
              title="Book Your Slot"
              desc="Choose date + time. Instant confirmation."
            />
            <StepCard
              n="03"
              title="Race Like a Pro"
              desc="Dial in settings, chase lap times, hit the podium."
            />
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="relative py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/h4.jpeg"
            alt="Tournament lounge vibe"
            fill
            className="object-cover opacity-35 blur-sm"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/82 via-black/90 to-black/96" />
        </div>
        <div className="sp-container relative z-10">
          <Reveal>
            <SectionHeading
              eyebrow="PACKAGES"
              title="Choose your race mode"
              desc="Quick sessions, deep practice, group battles, and tournament nights."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {packages.map((p) => (
              <Reveal key={p.name}>
                <div className="sp-glass sp-glow-hover overflow-hidden p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold tracking-wide text-white/90">
                        {p.name}
                      </div>
                      <div className="mt-1 text-xs text-white/60">{p.note}</div>
                    </div>
                    <div className="text-glow-red font-mono text-lg font-semibold tracking-[0.14em] text-white">
                      {p.price}
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-white/70">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <span
                          className="mt-2 h-1.5 w-1.5 rounded-full"
                          style={{ background: "var(--sp-red)" }}
                        />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button
                      href="/bookings"
                      variant={p.accent === "primary" ? "primary" : "secondary"}
                      className="w-full"
                    >
                      Book {p.name} <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CAFE PREVIEW */}
      <section className="relative py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/Cafe-bg.jpg"
            alt="Cafe and lounge area"
            fill
            className="object-cover opacity-35 blur-sm"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/82 via-black/90 to-black/96" />
        </div>
        <div className="sp-container relative z-10">
          <Reveal>
            <SectionHeading
              eyebrow="CAFE"
              title="Fuel for the next lap"
              desc="Coffee, cold drinks, snacks, burgers, and pizza—served in a lounge vibe."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {cafeItems.map((i) => (
              <Reveal key={i.name}>
                <div className="sp-glass sp-glow-hover p-5">
                  <div className="text-sm font-semibold tracking-wide text-white/90">
                    {i.name}
                  </div>
                  <div className="mt-2 text-sm text-white/70">{i.desc}</div>
                  <div className="mt-4 font-mono text-sm tracking-[0.18em] text-white/80">
                    {i.price}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-8">
              <Button href="/cafe" variant="secondary" size="lg">
                Explore Cafe Menu <ArrowRight size={16} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/Redbull.jpeg"
            alt="Community and race nights"
            fill
            className="object-cover opacity-35 blur-sm"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/82 via-black/90 to-black/96" />
        </div>
        <div className="sp-container relative z-10">
          <Reveal>
            <SectionHeading
              eyebrow="REVIEWS"
              title="What racers say"
              desc="Real reactions from our sim racing community."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {testimonials.map((t) => (
              <Reveal key={t.name}>
                <div className="sp-glass sp-glow-hover p-6">
                  <p className="text-sm leading-7 text-white/75">“{t.quote}”</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold tracking-wide text-white/90">
                      {t.name}
                    </div>
                    <div className="text-xs font-semibold tracking-[0.22em] text-white/55">
                      {t.role.toUpperCase()}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="relative pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/McLaren.jpeg"
            alt="City and track inspired backdrop"
            fill
            className="object-cover opacity-35 blur-sm"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/82 via-black/90 to-black/96" />
        </div>
        <div className="sp-container relative z-10">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h3 className="text-glow text-xl font-semibold text-white">Location</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  {business.addressOneLine}
                </p>
                <div className="mt-6 sp-glass sp-neon-border p-5">
                  <div className="text-sm font-semibold tracking-wide text-white/90">
                    Quick directions
                  </div>
                  <p className="mt-2 text-sm text-white/70">
                    Indiranagar • 100 Feet Road • HAL 2nd Stage
                  </p>
                  <div className="mt-4">
                    <Button
                      href="/contact"
                      variant="secondary"
                      size="md"
                      className="w-full"
                    >
                      Contact & Map
                    </Button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/5 backdrop-blur">
                  <iframe
                    title="SIM PODIUM location map"
                    loading="lazy"
                    className="h-[340px] w-full"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={business.mapEmbed}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function DashStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="sp-glass sp-glow-hover rounded-2xl px-4 py-3">
      <div className="text-glow-red font-mono text-lg font-semibold tracking-[0.18em] text-white">
        {value}
      </div>
      <div className="mt-1 text-[11px] font-semibold tracking-[0.22em] text-white/55">
        {label.toUpperCase()}
      </div>
    </div>
  );
}

function MiniChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold tracking-wide text-white/80">
      {children}
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <Reveal>
      <div className="sp-glass sp-glow-hover sp-neon-border h-full p-5">
        <div className="text-sm font-semibold tracking-wide text-white/90">
          {title}
        </div>
        <p className="mt-2 text-sm leading-6 text-white/70">{desc}</p>
        <div className="mt-5 h-[2px] w-full rounded-full bg-white/10">
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

function StepCard({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <Reveal>
      <div className="sp-glass sp-glow-hover overflow-hidden p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="font-mono text-sm tracking-[0.22em] text-white/60">
            {n}
          </div>
          <div className="h-[2px] flex-1 rounded-full bg-white/10" aria-hidden />
          <div
            className="h-2 w-2 rounded-full"
            style={{
              background: "var(--sp-red)",
              boxShadow: "0 0 18px rgba(255,43,60,0.45)",
            }}
            aria-hidden
          />
        </div>
        <div className="mt-4 text-base font-semibold tracking-wide text-white/90">
          {title}
        </div>
        <div className="mt-2 text-sm leading-7 text-white/70">{desc}</div>
      </div>
    </Reveal>
  );
}

