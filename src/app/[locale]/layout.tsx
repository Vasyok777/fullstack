import { Montserrat, Russo_One, Manrope, Zen_Dots } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { ScrollProvider } from "@/components/layout/scroll-provider";
import { SocialFloat } from "@/components/layout/social-float";
import { FooterSimple } from "@/components/layout/footer-simple";
import { TimerPopup } from "@/components/layout/timer-popup";

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

const LOCALE_TO_LANG: Record<string, string> = {
  ua: "uk",
  ru: "ru",
  en: "en",
  de: "de",
  pl: "pl",
  es: "es",
};

type Locale = (typeof routing.locales)[number];
type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const lang = LOCALE_TO_LANG[locale] ?? locale;

  return (
    <html
      lang={lang}
      className={`${montserrat.variable} ${russoOne.variable} ${manrope.variable} ${zenDots.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <ScrollProvider>
          <Header />
          <NextIntlClientProvider messages={messages}>
            {children}
            <FooterSimple />
            <TimerPopup />
          </NextIntlClientProvider>
          <SocialFloat />
        </ScrollProvider>
      </body>
    </html>
  );
}
