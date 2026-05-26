import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fullstack Innovation — розробка сайтів під ключ",
  description:
    "Створюємо швидкі, сучасні та SEO-оптимізовані сайти для бізнесу. Лендінги, корпоративні сайти та інтернет-магазини, які допомагають отримувати більше заявок.",
  icons: {
    icon: "/fav.svg",
  },
  openGraph: {
    title: "Fullstack Innovation — розробка сайтів під ключ",
    description:
      "Лендінги, корпоративні сайти та інтернет-магазини під ключ. Швидке завантаження, SEO-структура, адаптивний дизайн і результат для бізнесу.",
    url: "https://fullstack-innovation.com",
    siteName: "Fullstack Innovation",
    images: [
      {
        url: "https://fullstack-innovation.com/opengraf.png",
        width: 1200,
        height: 630,
        alt: "Fullstack Innovation — розробка сайтів під ключ",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fullstack Innovation — розробка сайтів під ключ",
    description: "Лендінги, корпоративні сайти та інтернет-магазини під ключ для бізнесу.",
    images: ["https://fullstack-innovation.com/opengraf.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
