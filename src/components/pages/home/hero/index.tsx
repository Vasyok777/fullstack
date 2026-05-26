import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { GiftTrigger } from "./gift-trigger";
import { Container, CTAButton, CircleOfferButton } from "@/components/ui";
import { ScrollDown } from "./scroll-down";
import { StatsCounter } from "./stats-counter";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative flex-1 flex flex-col">
      {/* Left decor */}
      <div className="absolute top-[-50%] left-[-20%] pointer-events-none select-none max-lg:hidden z-0">
        <Image
          src="/home/hero-lelf-devor.svg"
          alt=""
          width={200}
          height={200}
          priority
          unoptimized
          className="w-auto h-auto"
        />
      </div>

      <Container className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 md:items-center w-full py-10 lg:py-16">
          {/* Right column */}
          <div className="order-1 md:order-2 relative flex items-center justify-center min-h-72 md:min-h-88 lg:min-h-150">
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-32.25 h-32.25 md:w-71 md:h-71 rounded-full bg-[#D4AF37] blur-[85px] md:blur-[188px] pointer-events-none select-none z-0" />

            <Image
              src="/home/hero.svg"
              alt="Hero"
              fill
              priority
              className="object-contain z-10"
            />
            <div className="absolute left-[0%] top-[22%] -translate-y-1/2 z-20">
              <CircleOfferButton href="#contacts" label={t("offer")} />
            </div>
            <div className="absolute -bottom-2.5 md:bottom-0 -translate-x-1/2 md:translate-x-0 right-[-10%] md:left-auto md:right-8 z-10">
              <StatsCounter value={200} suffix=" +" label={t("statsLabel")} />
            </div>
          </div>

          {/* Left column — текст */}
          <div className="order-2 md:order-1 relative flex flex-col justify-center pt-8 md:pt-0">
            <h1 className="font-display uppercase text-[22px] md:text-[35px] lg:text-[50px] mb-2 md:mb-3 lg:mb-4 leading-[normal] text-[#D4AF37] font-normal">
              {t("title").split("\n").map((line, i) => (
                <span key={i}>{i > 0 && <br />}{line}</span>
              ))}
            </h1>

            <div className="flex items-start gap-2 md:block mb-4 md:mb-6 lg:mb-0">
              <p className="text-[12px] md:text-[14px] max-w-137.5 lg:text-[16px] lg:mb-9 text-[#D9D9D9] font-sans font-medium leading-[130%]">
                {t("description")}
              </p>
              <div className="shrink-0 md:hidden">
                <GiftTrigger />
              </div>
            </div>

            <div className="flex items-center gap-6 md:gap-9.25">
              <CTAButton href="#contacts" className="max-md:flex-1 max-md:justify-between">{t("cta")}</CTAButton>
              <div className="hidden md:block">
                <GiftTrigger />
              </div>
              <div className="md:hidden">
                <ScrollDown text={t("scrollDown")} />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="absolute md:bottom-5 lg:bottom-8 left-1/2 -translate-x-1/2 z-10 max-md:hidden">
        <ScrollDown text={t("scrollDown")} />
      </div>
    </section>
  );
}
