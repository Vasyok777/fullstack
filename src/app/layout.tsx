import type { Metadata } from "next";
import { Montserrat, Russo_One, Manrope, Zen_Dots } from "next/font/google";
import { Header } from "@/components/layout/header";
import { ScrollProvider } from "@/components/layout/scroll-provider";
import { SocialFloat } from "@/components/layout/social-float";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

const russoOne = Russo_One({
  variable: "--font-russo-one",
  subsets: ["latin", "cyrillic"],
  weight: "400",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const zenDots = Zen_Dots({
  variable: "--font-zen-dots",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Fullstack Innovations",
  description: "Developing websites that deliver results",
  icons: {
    icon: "/fav.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${montserrat.variable} ${russoOne.variable} ${manrope.variable} ${zenDots.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <ScrollProvider>
          <Header />
          {children}
          <SocialFloat />
        </ScrollProvider>
      </body>
    </html>
  );
}
