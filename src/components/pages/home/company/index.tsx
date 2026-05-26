import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container, CTAButton, SectionTitle } from "@/components/ui";
import { AnimatedStat } from "./animated-stat";

export async function Company() {
  const t = await getTranslations("company");

  const stats = [
    { value: 200, suffix: "+", label: t("stat1Label") },
    { value: 12, suffix: "", label: t("stat2Label") },
    { value: 5, suffix: "", label: t("stat3Label") },
    { value: 99, suffix: "%", label: t("stat4Label") },
  ];

  return (
    <section id="about" className="relative pt-5 lg:pt-25 overflow-hidden scroll-mt-20 lg:scroll-mt-24">
      {/* Background */}
      <div className="absolute right-0 top-0 w-[55%] h-full z-0 hidden md:block">
        <Image
          src="/about.png"
          alt=""
          fill
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/40 to-transparent" />
      </div>

      <Container className="relative z-10">
        {/* Text block */}
        <div className="max-w-full lg:max-w-175">
          <SectionTitle>{t("title")}</SectionTitle>

          <p className="mb-3 font-sans max-md:text-[13px] text-[15px] leading-[130%] text-[#D9D9D9]">
            {t("desc1")}
          </p>

          <p className="mb-8 font-sans max-md:text-[13px] text-[15px] leading-[130%] text-[#D9D9D9]">
            {t("desc2")}
          </p>

          <CTAButton href="#contacts" className="justify-between md:w-auto">
            {t("cta")}
          </CTAButton>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 mt-6 lg:mt-22.5">
          {stats.map((stat) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
