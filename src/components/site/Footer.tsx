import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(255,43,60,0.18), transparent 40%), repeating-linear-gradient(120deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 18px)",
        }}
      />
      <div className="sp-container relative z-10 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
              Premium sim racing lounge in Indiranagar, Bengaluru—built for
              cinematic immersion, competitive practice, and unforgettable race
              nights.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Social href="#" label="Instagram" Icon={Instagram} />
              <Social href="#" label="Facebook" Icon={Facebook} />
              <Social href="#" label="YouTube" Icon={Youtube} />
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-sm font-semibold tracking-wide text-white/90">
              Quick Links
            </div>
            <div className="mt-4 grid gap-2 text-sm">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/bookings">Bookings</FooterLink>
              <FooterLink href="/cafe">Cafe</FooterLink>
              <FooterLink href="/shop">Shop</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="text-sm font-semibold tracking-wide text-white/90">
              Contact
            </div>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              <div>
                #1133, 3rd Floor, 100 Feet Rd, HAL 2nd Stage, Indiranagar,
                Bengaluru, Karnataka 560038
              </div>
              <div>
                <span className="text-white/60">Email:</span>{" "}
                <a className="hover:text-white" href="mailto:hello@simpodium.in">
                  hello@simpodium.in
                </a>
              </div>
              <div>
                <span className="text-white/60">Phone:</span>{" "}
                <a className="hover:text-white" href="tel:+919999999999">
                  +91 99999 99999
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} SIM PODIUM. All rights reserved.</div>
          <div className="font-mono tracking-[0.24em]">
            SIM RACING • GAMING CAFE • ESPORTS
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="w-fit text-white/70 transition-colors hover:text-white"
    >
      {children}
    </Link>
  );
}

function Social({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ComponentType<{ size?: number | string }>;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80 backdrop-blur transition-all hover:-translate-y-[1px] hover:bg-white/10 hover:text-white"
      style={{
        boxShadow: "inset 0 0 0 1px rgba(255,43,60,0.18)",
      }}
    >
      <Icon size={18} />
    </a>
  );
}

