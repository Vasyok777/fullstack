import type { Metadata } from "next";
import { Montserrat, Russo_One, Manrope } from "next/font/google";
import { Header } from "@/components/layout/header";
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

export const metadata: Metadata = {
  title: "Fullstack Innovations",
  description: "Developing websites that deliver results",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${montserrat.variable} ${russoOne.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Header />
        {children}
      </body>
    </html>
  );
}