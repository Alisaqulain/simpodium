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
                <p className="mt-6 text-xs font-semibold tracking-[0.28em] text-white/70">
                  SIM PODIUM • BENGALURU
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <h1 className="text-glow-red-strong mt-3 text-4xl font-semibold tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.2rem]">
                  FROM ZERO TO HOT LAP IN MINUTES
                </h1>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="text-glow mt-4 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
                  Drop into a fully tuned sim racing lounge with cinematic lighting,
                  pro-grade rigs, and a Formula 1–inspired atmosphere. Learn, practice,
                  or host race nights—without touching a setup menu.
                </p>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    href="/bookings"
                    size="lg"
                    className="relative overflow-hidden"
                  >
                    <span className="absolute inset-0 -z-[1] rounded-full bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.22),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(255,43,60,0.85),transparent_60%)] opacity-80" />
                    <span className="relative">Book Your Session</span>
                  </Button>
                  <Button
                    href="#simulators"
                    variant="secondary"
                    size="lg"
                    className="border-white/30 bg-white/5 hover:bg-white/10"
                  >
                    Explore Packages
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
            <div className="relative">
              <div className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-10 opacity-60">
                <Image
                  src="/Ferrari.jpeg"
                  alt="Ferrari paddock lighting"
                  fill
                  sizes="50vw"
                  className="object-cover blur-md"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/60 to-black/85" />
              </div>
              <Reveal>
                <SectionHeading
                  eyebrow="TRUSTED BRANDS & RACING PARTNERS"
                  title="Premium manufacturers, race teams, and collectibles"
                  desc="A curated grid across MJX HyperGo, Mini GT, Pop Race, Tomica, Bburago and iconic teams like Ferrari, Red Bull, McLaren, Mercedes, Audi, BMW, and Lamborghini."
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

      {/* HOW IT WORKS — premium timeline */}
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
              title="Racer onboarding that feels like a formation lap"
              desc="Three quick steps from walking in to chasing hot laps on your favourite circuits."
            />
          </Reveal>
          <div className="mt-12">
            <div className="relative mx-auto max-w-4xl">
              <div className="pointer-events-none absolute left-4 top-4 bottom-4 hidden w-px bg-gradient-to-b from-[rgba(255,43,60,0.65)] via-white/20 to-transparent lg:block" />
              <div className="space-y-8 lg:space-y-10">
                <StepCard
                  n="01"
                  title="Select your simulator rig"
                  desc="Choose between motion rigs, ultra-wide setups, or multiplayer cockpits tuned for comfort and control."
                  icon="sim"
                  variant="primary"
                />
                <StepCard
                  n="02"
                  title="Lock your slot"
                  desc="Pick date and time, confirm in a few taps, and get ready. No friction, no overthinking."
                  icon="calendar"
                />
                <StepCard
                  n="03"
                  title="Chase podium laps"
                  desc="Dial in assists, push for personal bests, and relive your best sectors with friends."
                  icon="trophy"
                />
              </div>
            </div>
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
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {packages.map((p) => {
              const isPopular = p.accent === "primary";
              return (
                <Reveal key={p.name}>
                  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.75)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.75)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(255,43,60,0.55)]">
                    {isPopular && (
                      <div className="absolute right-4 top-4 rounded-full bg-[rgba(255,43,60,0.18)] px-3 py-1 text-[10px] font-semibold tracking-[0.22em] text-white/80 backdrop-blur">
                        POPULAR
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold tracking-[0.22em] text-white/50">
                          SIM PACKAGE
                        </div>
                        <div className="mt-2 text-sm font-semibold tracking-wide text-white/90">
                          {p.name}
                        </div>
                        <div className="mt-1 text-xs text-white/60">{p.note}</div>
                      </div>
                      <div className="text-glow-red font-mono text-lg font-semibold tracking-[0.18em] text-white">
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
                        variant={isPopular ? "primary" : "secondary"}
                        className="w-full transition-transform duration-300 group-hover:-translate-y-[1px]"
                      >
                        Book {p.name} <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
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
              eyebrow="CAFE & LOUNGE"
              title="Fuel like a night race paddock"
              desc="Neon-lit cafe with coffee, cold drinks, snacks, burgers, and pizza—curated for long practice stints and post-race debriefs."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {cafeItems.map((i) => (
              <Reveal key={i.name}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[rgba(15,23,42,0.85)] via-[rgba(15,23,42,0.7)] to-[rgba(255,43,60,0.15)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(255,43,60,0.45)]">
                  <div className="pointer-events-none absolute inset-0 opacity-35">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.18),transparent_52%),radial-gradient(circle_at_100%_100%,rgba(255,43,60,0.6),transparent_55%)]" />
                  </div>
                  <div className="relative">
                    <div className="text-xs font-semibold tracking-[0.22em] text-white/55">
                      LOUNGE MENU
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold tracking-wide text-white/90">
                        {i.name}
                      </div>
                      <div className="font-mono text-xs tracking-[0.18em] text-white/80">
                        {i.price}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-white/75">{i.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10">
              <Button
                href="/cafe"
                variant="secondary"
                size="lg"
                className="relative overflow-hidden"
              >
                <span className="absolute inset-0 -z-[1] bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.16),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(255,43,60,0.55),transparent_55%)] opacity-80" />
                <span className="relative flex items-center gap-2">
                  Explore Full Menu
                  <ArrowRight size={16} />
                </span>
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
              title="Racers on the SIM PODIUM experience"
              desc="Snapshots from F1 fans, casual drivers, and esports grinders who turned their first session into a habit."
            />
          </Reveal>
          <div className="mt-10">
            <div className="flex gap-5 overflow-x-auto pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {testimonials.map((t) => (
                <Reveal key={t.name}>
                  <div className="min-w-[260px] max-w-sm flex-1 rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.85)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.8)] backdrop-blur-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(255,43,60,0.9),transparent_55%)]" />
                      <div>
                        <div className="text-sm font-semibold tracking-wide text-white/90">
                          {t.name}
                        </div>
                        <div className="text-[11px] font-semibold tracking-[0.22em] text-white/55">
                          {t.role.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-[rgba(255,190,92,0.95)]">
                      {"★★★★★"}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-white/75">“{t.quote}”</p>
                  </div>
                </Reveal>
              ))}
            </div>
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
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <Button
                      href="/contact"
                      variant="secondary"
                      size="md"
                      className="w-full"
                    >
                      Contact & Map
                    </Button>
                    <Button
                      href={business.mapEmbed.replace("&output=embed", "")}
                      variant="primary"
                      size="md"
                      className="w-full"
                    >
                      Get Directions
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

type StepIcon = "sim" | "calendar" | "trophy" | "default";

function StepIconBadge({ icon }: { icon: StepIcon }) {
  if (icon === "calendar") {
    return (
      <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 shadow-[0_0_25px_rgba(255,43,60,0.35)]">
        <span className="text-[11px] font-semibold tracking-[0.16em]">CAL</span>
      </div>
    );
  }
  if (icon === "trophy") {
    return (
      <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.8),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.9),transparent_55%)] text-[11px] font-semibold tracking-[0.16em] text-black shadow-[0_0_30px_rgba(255,215,0,0.65)]">
        WIN
      </div>
    );
  }
  if (icon === "sim") {
    return (
      <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.75),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(255,43,60,0.9),transparent_55%)] text-[11px] font-semibold tracking-[0.16em] text-black shadow-[0_0_30px_rgba(255,43,60,0.65)]">
        SIM
      </div>
    );
  }
  return (
    <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold tracking-[0.16em] text-white/80">
      STEP
    </div>
  );
}

function StepCard({
  n,
  title,
  desc,
  icon = "default",
  variant = "default",
}: {
  n: string;
  title: string;
  desc: string;
  icon?: StepIcon;
  variant?: "default" | "primary";
}) {
  return (
    <Reveal>
      <div className="relative grid gap-4 rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.8)] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(255,43,60,0.55)] lg:grid-cols-[auto,1fr]">
        <div className="relative flex flex-col items-center gap-3">
          <div className="font-mono text-xs tracking-[0.22em] text-white/60">
            {n}
          </div>
          <StepIconBadge icon={icon} />
          <div className="hidden flex-1 lg:block">
            <div className="mx-auto h-full w-px bg-gradient-to-b from-[rgba(255,43,60,0.75)] via-white/20 to-transparent" />
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold tracking-wide text-white/90">
            {title}
          </div>
          <div className="mt-2 text-sm leading-7 text-white/70">{desc}</div>
          {variant === "primary" && (
            <div className="mt-4 h-[2px] w-full rounded-full bg-white/10">
              <div
                className="h-full w-2/3 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,43,60,0.0), rgba(255,43,60,0.95))",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

