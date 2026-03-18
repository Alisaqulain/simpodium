import { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Real words from racers, fans, and esports players who experienced SIM PODIUM in Bengaluru.",
};

async function getTestimonials() {
  const db = await connectToDatabase();
  const docs = await db
    .collection("testimonials")
    .find({})
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();
  return docs.map((t) => ({
    id: t._id.toString(),
    name: t.name as string,
    role: t.role as string,
    quote: t.quote as string,
    avatarUrl: (t.avatarUrl as string | null) ?? null,
  }));
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="sp-container pb-20 pt-20">
      <section className="py-10 sm:py-14">
        <Reveal>
          <SectionHeading
            eyebrow="TESTIMONIALS"
            title="Racers, fans, and friends of SIM PODIUM"
            desc="A live feed of reviews and quotes curated from our community, events, and repeat racers."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Reveal key={t.id}>
              <article className="sp-glass sp-glow-hover h-full rounded-2xl border border-white/10 p-6">
                <div className="flex items-center gap-3">
                  {t.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.avatarUrl}
                      alt={t.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-white/10" />
                  )}
                  <div>
                    <div className="text-sm font-semibold tracking-wide text-white/90">
                      {t.name}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                      {t.role}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/75">“{t.quote}”</p>
              </article>
            </Reveal>
          ))}
          {testimonials.length === 0 ? (
            <p className="text-sm text-white/60">
              No testimonials added yet. Use the admin dashboard to create your first quote.
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}

