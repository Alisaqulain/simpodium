import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { shopProducts } from "@/data/content";
import { features } from "@/config/features";

type ShopItem = {
  id: string;
  name: string;
  price: string;
  desc: string;
  img: string;
  featured: boolean;
  mrp?: string | null;
  salePrice?: string | null;
  points?: number | null;
};

async function getShopItems(): Promise<ShopItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/shop-items`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return [];
    }
    const json = (await res.json()) as ShopItem[];
    return json;
  } catch {
    return [];
  }
}

export async function ShopPageContent() {
  const items = await getShopItems();
  const displayItems =
    (items.length > 0 ? items : shopProducts) as Array<
      ShopItem | { name: string; desc: string; price: string; img: string }
    >;

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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayItems.map((p) => (
            <Reveal key={"id" in p ? p.id : p.name}>
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
                  {"mrp" in p && p.mrp && p.salePrice && p.salePrice !== p.mrp ? (
                    <div className="absolute left-4 top-4 rounded-xl border border-white/10 bg-[rgba(20,24,33,0.75)] px-3 py-2 text-[11px] font-semibold tracking-wide text-white/90 backdrop-blur">
                      <span className="mr-2 line-through text-white/60">{p.mrp}</span>
                      <span>{p.salePrice}</span>
                    </div>
                  ) : (
                    <div className="absolute left-4 top-4 rounded-xl border border-white/10 bg-[rgba(20,24,33,0.55)] px-3 py-2 text-xs font-semibold tracking-wide text-white/85 backdrop-blur">
                      {p.price}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-base font-semibold tracking-wide text-white/90">
                      {p.name}
                    </div>
                    {"points" in p && typeof p.points === "number" ? (
                      <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-mono tracking-[0.18em] text-white/70">
                        {p.points.toString().padStart(2, "0")} PTS
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-2 text-sm leading-7 text-white/70">{p.desc}</div>
                  <div
                    className={
                      features.bookingSlots ? "mt-6 grid grid-cols-2 gap-3" : "mt-6"
                    }
                  >
                    <Button href="/contact" variant="secondary" className="w-full">
                      Enquire
                    </Button>
                    {features.bookingSlots ? (
                      <Button href="/bookings" className="w-full">
                        Try In Lounge
                      </Button>
                    ) : null}
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
