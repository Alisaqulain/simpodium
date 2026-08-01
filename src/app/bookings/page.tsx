import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { business } from "@/data/content";
import { features } from "@/config/features";
import { BookingWidget } from "./ui/BookingWidget";

export const metadata = {
  title: "Bookings",
  description:
    "Book your SIM PODIUM simulator slot — select rig, date, time, and get confirmation instantly.",
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
              title="Online booking is temporarily unavailable."
              desc="Please call or message us to reserve a simulator slot. We will bring online booking back soon."
            />
          </Reveal>
        </section>

        <section className="py-10 sm:py-14">
          <Reveal>
            <div className="mx-auto max-w-xl sp-glass sp-neon-border p-8 text-center">
              <p className="text-sm leading-7 text-white/70">
                Reach us directly and we will help you pick a rig, date, and time.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button href={`tel:${business.phone.replace(/\s/g, "")}`} size="lg">
                  Call {business.phone}
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Contact Us
                </Button>
              </div>
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
