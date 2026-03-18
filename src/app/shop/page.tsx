import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { shopProducts } from "@/data/content";
import { brands } from "@/data/brands";
import { BrandMarquee } from "@/components/ui/BrandMarquee";

export const metadata = {
  title: "Shop",
  description:
    "Shop sim racing accessories — steering wheels, pedals, gloves, headsets, and seats. Premium gear for premium laps.",
};

export default function ShopPage() {
  return (
    <div className="sp-container pb-20">
      <section className="relative overflow-hidden py-10 sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(900px 600px at 18% 18%, rgba(255,43,60,0.18), transparent 60%), radial-gradient(900px 600px at 82% 10%, rgba(255,77,94,0.12), transparent 60%)",
          }}
        />
        <Reveal>
          <SectionHeading
            eyebrow="SHOP"
            title="Premium gear. Real control."
            desc="Upgrade your home setup with racing accessories curated for feel, precision, and durability."
          />
        </Reveal>
      </section>

      <section className="py-10 sm:py-14">
        <Reveal>
          <SectionHeading
            eyebrow="BRANDS"
            title="Collectibles & icons we vibe with"
            desc="Mini GT, Tomica, Bburago, MJX HyperGo and more—plus the legends that inspired the vibe: Ferrari, Red Bull, McLaren, Mercedes, Audi, BMW, Lamborghini."
          />
        </Reveal>
        <div className="mt-8">
          <BrandMarquee items={brands} />
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shopProducts.map((p) => (
            <Reveal key={p.name}>
              <div className="group sp-glass sp-glow-hover overflow-hidden">
                <div className="relative overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.name}
                    width={1400}
                    height={900}
                    className="h-[240px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    priority={p.name === "Steering Wheels"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-xl border border-white/10 bg-[rgba(20,24,33,0.55)] px-3 py-2 text-xs font-semibold tracking-wide text-white/85 backdrop-blur">
                    {p.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-base font-semibold tracking-wide text-white/90">
                    {p.name}
                  </div>
                  <div className="mt-2 text-sm leading-7 text-white/70">
                    {p.desc}
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button href="/contact" variant="secondary" className="w-full">
                      Enquire
                    </Button>
                    <Button href="/bookings" className="w-full">
                      Try In Lounge
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

