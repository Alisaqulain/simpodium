import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cafeItems, business } from "@/data/content";

type CafeItemRecord = {
  id: string;
  name: string;
  price: string;
  desc: string;
  category: string;
};

export const metadata = {
  title: "Cafe",
  description:
    "Cafe menu at SIM PODIUM — coffee, cold drinks, energy drinks, snacks, and fast food in a premium gaming lounge vibe.",
};

const categories = [
  {
    name: "Coffee",
    items: [
      { name: "Espresso", price: "₹129", desc: "Short, strong, clean finish" },
      { name: "Cappuccino", price: "₹169", desc: "Foamy, balanced, smooth" },
      { name: "Latte", price: "₹179", desc: "Silky milk, mellow roast" },
    ],
  },
  {
    name: "Cold Drinks",
    items: [
      { name: "Iced Lemon Tea", price: "₹129", desc: "Citrus, chilled, crisp" },
      { name: "Cola", price: "₹79", desc: "Classic refresh" },
      { name: "Lemonade", price: "₹99", desc: "Sweet + tangy" },
    ],
  },
  {
    name: "Energy Drinks",
    items: [
      { name: "Boost", price: "₹199", desc: "Focus for late laps" },
      { name: "Nitro", price: "₹249", desc: "High energy, cold served" },
    ],
  },
  {
    name: "Snacks",
    items: [
      { name: "Fries", price: "₹149", desc: "Salted, crispy" },
      { name: "Nachos", price: "₹199", desc: "Cheese + salsa" },
      { name: "Wings", price: "₹249", desc: "Spicy glaze" },
    ],
  },
  {
    name: "Fast Food",
    items: [
      { name: "Burger", price: "₹249", desc: "Classic / Chicken / Double" },
      { name: "Pizza", price: "₹299", desc: "Thin crust • Loaded toppings" },
      { name: "Wrap", price: "₹199", desc: "Quick bite, big flavor" },
    ],
  },
] as const;

async function getCafeItems(): Promise<CafeItemRecord[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/cafe-items`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return [];
    }
    const json = (await res.json()) as CafeItemRecord[];
    return json;
  } catch {
    return [];
  }
}

export default async function CafePage() {
  const liveItems = await getCafeItems();
  const mergedCafeItems =
    liveItems.length > 0
      ? liveItems
      : cafeItems.map((i) => ({
          id: i.name,
          name: i.name,
          price: i.price,
          desc: i.desc,
          category: "General",
        }));
  return (
    <div className="sp-container pb-20">
      <section className="relative overflow-hidden py-10 sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(900px 600px at 20% 20%, rgba(255,43,60,0.18), transparent 60%), radial-gradient(900px 600px at 80% 10%, rgba(255,77,94,0.12), transparent 60%)",
          }}
        />
        <Reveal>
          <SectionHeading
            eyebrow="CAFE"
            title="Fuel for the next lap"
            desc="Premium comfort food and drinks designed for long sessions, late-night events, and post-race chill."
          />
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-8 grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="sp-glass sp-glow-hover overflow-hidden p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {mergedCafeItems.map((i) => (
                    <div
                      key={i.name}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5"
                    >
                      <div className="text-sm font-semibold tracking-wide text-white/90">
                        {i.name}
                      </div>
                      <div className="mt-2 text-sm text-white/70">{i.desc}</div>
                      <div className="mt-4 font-mono text-sm tracking-[0.18em] text-white/80">
                        {i.price}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-xs text-white/50">
                  Menu and pricing may vary by day/event.
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="sp-glass sp-neon-border overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1600&q=80"
                  alt="Cafe drinks"
                  width={1600}
                  height={1100}
                  className="h-[360px] w-full object-cover"
                  priority
                />
              </div>
              <div className="mt-4 sp-glass p-5">
                <div className="text-sm font-semibold tracking-wide text-white/90">
                  Visit
                </div>
                <div className="mt-2 text-sm leading-7 text-white/70">
                  {business.addressOneLine}
                </div>
                <div className="mt-4">
                  <Button href="/bookings" size="lg" className="w-full">
                    Book & Grab a Bite
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="MENU"
            title="Categories"
            desc="Fast, premium, and session-friendly."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {categories.map((c) => (
            <Reveal key={c.name}>
              <div className="sp-glass sp-glow-hover p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-base font-semibold tracking-wide text-white/90">
                    {c.name}
                  </div>
                  <div className="font-mono text-xs tracking-[0.22em] text-white/55">
                    HOT • COLD • FAST
                  </div>
                </div>
                <div className="mt-5 grid gap-3">
                  {c.items.map((i) => (
                    <div
                      key={i.name}
                      className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                    >
                      <div>
                        <div className="text-sm font-semibold text-white/85">
                          {i.name}
                        </div>
                        <div className="mt-1 text-sm text-white/65">{i.desc}</div>
                      </div>
                      <div className="font-mono text-sm tracking-[0.18em] text-white/80">
                        {i.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

