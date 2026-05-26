import Script from "next/script";
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
      <head>
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P33KT2SL');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P33KT2SL" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
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
