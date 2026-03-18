import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { AnimatedCursor } from "@/components/site/AnimatedCursor";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://simpodium.in"),
  title: {
    default: "SIM PODIUM — Premium Sim Racing Lounge, Bengaluru",
    template: "%s — SIM PODIUM",
  },
  description:
    "SIM PODIUM is a premium racing simulator gaming cafe in Indiranagar, Bengaluru. Book pro-grade simulators, multiplayer racing, esports practice, and cafe experiences.",
  keywords: [
    "Sim Racing Bangalore",
    "Racing Simulator Bangalore",
    "Gaming Cafe Bangalore",
    "Sim Racing Experience India",
    "Esports Practice Bangalore",
    "Racing Simulator Indiranagar",
  ],
  openGraph: {
    title: "SIM PODIUM — Premium Sim Racing Lounge, Bengaluru",
    description:
      "The ultimate sim racing experience in Bangalore. Book your slot, race like a pro, and chill in a premium gaming cafe vibe.",
    type: "website",
    locale: "en_IN",
    url: "/",
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
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ScrollProgress />
        <AnimatedCursor />
        <Navbar />
        <main className="relative z-10 pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
