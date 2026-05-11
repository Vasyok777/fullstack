import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { GiftButton } from "./gift-button";
import { Container, CTAButton } from "@/components/ui";
import { ScrollDown } from "./scroll-down";
import { StatsCounter } from "./stats-counter";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative">
      {/* Left decor */}
      <div className="absolute top-[-50%] left-[-20%] pointer-events-none select-none max-lg:hidden z-0">
        <Image
          src="/home/hero-lelf-devor.svg"
          alt=""
          width={200}
          height={200}
          priority
          unoptimized
          style={{
            width: "auto",
            height: "auto",
          }}
        />
      </div>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full pt-5 md:pt-7.5 lg:pt-10 pb-5 md:pb-12.5 lg:pb-40">
          {/* Right column */}
          <div className="order-1 md:order-2 relative flex items-center justify-center min-h-72 md:min-h-88 lg:min-h-150">
            <Image
              src="/home/hero-right-decor.svg"
              alt=""
              width={1000}
              height={1000}
              priority
              unoptimized
              className="object-contain object-center absolute left-[-11%] top-[-29%] pointer-events-none select-none z-0"
            />
            <Image
              src="/home/hero.png"
              alt="Hero"
              fill
              priority
              className="object-contain z-10"
            />
            <div className="absolute bottom-[-10px] md:bottom-0 -translate-x-1/2 md:translate-x-0 right-[-10%] md:left-auto md:right-8 z-10">
              <StatsCounter value={200} suffix=" +" label={t("statsLabel")} />
            </div>
          </div>

          {/* Left column — текст */}
          <div className="order-2 md:order-1 relative flex flex-col justify-center pt-8 md:pt-0">
            <h1
              className="font-display uppercase text-[22px] md:text-[35px] lg:text-[60px] mb-2 md:mb-3 lg:mb-4 leading-[normal]"
              style={{ color: "var(--color-gold)", fontWeight: 400 }}
            >
              {t("title")}
            </h1>

            <div className="flex items-start gap-2 md:block mb-4 md:mb-6 lg:mb-0">
              <p
                className="text-[12px] md:text-[14px] lg:text-[16px] lg:mb-9"
                style={{
                  color: "var(--color-text-body)",
                  fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                  fontWeight: 500,
                  lineHeight: "130%",
                }}
              >
                {t("description")}
              </p>
              <div className="shrink-0 md:hidden">
                <GiftButton href="#offer" />
              </div>
            </div>

            <div className="flex items-center gap-5 md:gap-9.25">
              <CTAButton href="#contacts">{t("cta")}</CTAButton>
              <div className="hidden md:block">
                <GiftButton href="#offer" />
              </div>
              <div className="md:hidden">
                <ScrollDown text={t("scrollDown")} />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="absolute md:bottom-5 lg:bottom-22.5 left-1/2 -translate-x-1/2 z-10 max-md:hidden">
        <ScrollDown text={t("scrollDown")} />
      </div>
    </section>
  );
}
