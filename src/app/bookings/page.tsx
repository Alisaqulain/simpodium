import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features } from "@/config/features";
import { BookingWidget } from "./ui/BookingWidget";

export const metadata = {
  title: "Bookings",
  description:
    "Online simulator booking at SIM PODIUM — coming soon. Pick your rig, date, and time on the website.",
};

export default function BookingsPage() {
  if (!features.bookingSlots) {
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
            <SectionHeading
              eyebrow="BOOKINGS"
              title="Online booking is coming soon."
              desc="We are building a seamless way to pick your rig, choose a slot, and confirm instantly on the website. Check back soon."
            />
          </Reveal>
        </section>

        <section className="py-10 sm:py-14">
          <Reveal>
            <div className="mx-auto max-w-xl sp-glass sp-neon-border p-8 text-center">
              <p className="text-sm leading-7 text-white/70">
                Online and phone booking are not available yet. Visit our homepage to preview
                what&apos;s launching.
              </p>
            </div>
          </Reveal>
        </section>
      </div>
    );
  }

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
          <SectionHeading
            eyebrow="BOOKINGS"
            title="Lock your slot. Chase lap times."
            desc="Select a simulator, pick a date and time, and confirm. This demo stores bookings locally on your device."
          />
        </Reveal>
      </section>

      <section className="py-10 sm:py-14">
        <Reveal>
          <BookingWidget />
        </Reveal>
      </section>
    </div>
  );
}
