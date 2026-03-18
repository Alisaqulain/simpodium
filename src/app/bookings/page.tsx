import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingWidget } from "./ui/BookingWidget";

export const metadata = {
  title: "Bookings",
  description:
    "Book your SIM PODIUM simulator slot — select rig, date, time, and get confirmation instantly.",
};

export default function BookingsPage() {
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

