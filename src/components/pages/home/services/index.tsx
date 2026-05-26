import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui";
import { ServiceVideoBg } from "./video-bg";
import { ServiceItem } from "./service-item";

export async function Services() {
  const t = await getTranslations("services");

  const items = [
    {
      title: t("item1Title"),
      desc: t("item1Desc"),
      terms: t("item1Terms"),
      price: t("item1Price"),
      prefillMsg: t("item1Prefill"),
    },
    {
      title: t("item2Title"),
      desc: t("item2Desc"),
      terms: t("item2Terms"),
      price: t("item2Price"),
      prefillMsg: t("item2Prefill"),
    },
    {
      title: t("item3Title"),
      desc: t("item3Desc"),
      terms: t("item3Terms"),
      price: t("item3Price"),
      prefillMsg: t("item3Prefill"),
    },
    {
      title: t("item4Title"),
      desc: t("item4Desc"),
      terms: t("item4Terms"),
      price: t("item4Price"),
      prefillMsg: t("item4Prefill"),
    },
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden py-10 md:py-12.5 lg:py-28 border border-black scroll-mt-20 lg:scroll-mt-24"
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <ServiceVideoBg />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <Container className="relative z-10">
        <div className="flex items-center gap-3 mb-5 md:mb-7.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            aria-hidden
            className="shrink-0 overflow-visible"
          >
            <circle
              cx="11.5"
              cy="11.5"
              r="11.5"
              fill="#D4AF37"
              className="transform-fill origin-center animate-[sonar-ping_2.2s_ease-out_infinite]"
            />
            <circle
              cx="11.5"
              cy="11.5"
              r="7.5"
              fill="#D4AF37"
              className="transform-fill origin-center animate-[sonar-ping_2.2s_ease-out_0.65s_infinite]"
            />
            <circle cx="11.5" cy="11.5" r="3.5" fill="#D4AF37" />
          </svg>
          <span className="text-[15px] md:text-[18px] text-white font-normal leading-normal [font-family:var(--font-zen-dots),'Zen_Dots',sans-serif]">
            Fullstack Innovations
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[340px_1fr] lg:gap-8">
          {/* Left: SERVICES label */}
          <div className="pt-1 lg:pt-9.5">
            <span className="text-[22px] md:text-[30px] text-[#6D6D6D] font-display font-normal leading-normal uppercase">
              {t("sectionLabel")}
            </span>
          </div>

          {/* Right: service list */}
          <div>
            {items.map((item, index) => (
              <ServiceItem key={index} {...item} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
