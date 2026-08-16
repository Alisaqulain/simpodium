import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/data/content";
import { features } from "@/config/features";
import { ContactForm } from "./ui/ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Contact SIM PODIUM — email, address, and map. Get in touch for events, partnerships, and general inquiries.",
};

export default function ContactPage() {
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
            eyebrow="CONTACT"
            title="Get in touch"
            desc="Events, group racing nights, partnerships, and general inquiries — reach out and we’ll respond quickly."
          />
        </Reveal>
      </section>

      <section className="py-10 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="sp-glass sp-neon-border p-6">
                <div className="text-sm font-semibold tracking-wide text-white/90">
                  Contact Info
                </div>
                <div className="mt-4 space-y-3 text-sm text-white/70">
                  <div>
                    <div className="text-xs font-semibold tracking-[0.22em] text-white/55">
                      ADDRESS
                    </div>
                    <div className="mt-1 leading-7">{business.addressOneLine}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-[0.22em] text-white/55">
                      EMAIL
                    </div>
                    <a className="mt-1 block hover:text-white" href={`mailto:${business.email}`}>
                      {business.email}
                    </a>
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-[0.22em] text-white/55">
                      PHONE
                    </div>
                    {features.bookingSlots ? (
                      <a
                        className="mt-1 block hover:text-white"
                        href={`tel:${business.phone.replace(/\s/g, "")}`}
                      >
                        {business.phone}
                      </a>
                    ) : (
                      <div className="mt-1">{business.phone}</div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-6 overflow-hidden rounded-[22px] border border-white/10 bg-white/5 backdrop-blur">
                <iframe
                  title="SIM PODIUM location map"
                  loading="lazy"
                  className="h-[340px] w-full"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={business.mapEmbed}
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="sp-glass sp-glow-hover p-6">
                <div className="text-sm font-semibold tracking-wide text-white/90">
                  Send a message
                </div>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Share your message and we&apos;ll get back to you about events, partnerships,
                  or general questions.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

