import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import {
  LaunchingSoonBanner,
  launchingSoonBannerOffsetClass,
} from "@/components/site/LaunchingSoonBanner";
import { features } from "@/config/features";
import { cn } from "@/lib/utils";

const ScrollProgress = dynamic(
  () =>
    import("@/components/site/ScrollProgress").then((m) => m.ScrollProgress),
  { ssr: false },
);

const ComingSoonPopup = dynamic(
  () =>
    import("@/components/site/ComingSoonPopup").then((m) => m.ComingSoonPopup),
  { ssr: false },
);

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://simpodium.in"),
  title: {
    default: "SIM PODIUM — Premium Sim Racing Lounge, Bengaluru",
    template: "%s — SIM PODIUM",
  },
  description:
    "SIM PODIUM is a premium racing simulator gaming cafe in Indiranagar, Bengaluru. F1-inspired simulators, static & motion racing rigs, multiplayer racing, esports practice, and an arcade lounge experience.",
  keywords: [
    "sim racing Bangalore",
    "racing simulator Bangalore",
    "best sim racing experience in Bangalore",
    "F1 simulator Bangalore",
    "F1 racing simulator experience Bangalore",
    "professional racing simulator experience India",
    "gaming cafe Bangalore",
    "esports cafe Bangalore",
    "racing themed cafe Bangalore",
    "racing simulator gaming cafe in Bangalore",
    "where to try racing simulator in Bangalore",
    "sim racing competition Bangalore",
    "racing simulator near me",
    "sim racing near me",
    "sim racing arcade Bangalore",
    "racing arcade Bangalore",
    "racing game cafe Bangalore",
    "racing simulator Indiranagar",
    "sim racing Indiranagar",
    "gaming cafe Indiranagar",
  ],
  openGraph: {
    title: "SIM PODIUM — Premium Sim Racing Lounge, Bengaluru",
    description:
      "The ultimate sim racing experience in Bangalore. Race like a pro and chill in a premium gaming cafe vibe.",
    type: "website",
    locale: "en_IN",
    url: "/",
  },
  icons: {
    icon: "/Sim Podium final logo.png",
    shortcut: "/Sim Podium final logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={cn(
          `${inter.variable} ${jetbrainsMono.variable} antialiased`,
          launchingSoonBannerOffsetClass,
        )}
      >
        <ScrollProgress />
        <LaunchingSoonBanner />
        <ComingSoonPopup />
        <Navbar />
        <main
          className={cn(
            "relative z-10",
            features.bookingSlots ? "pt-24" : "pt-[calc(var(--sp-banner-h)+6rem)]",
          )}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
