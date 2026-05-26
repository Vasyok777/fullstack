import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui";
import { PartnershipSlider } from "./partnership-slider";
import { PartnershipVideoBg } from "./video-bg";

export async function Partnership() {
  const t = await getTranslations("partnership");

  const items = [
    { id: 1, title: t("item1Title"), desc: t("item1Desc") },
    { id: 2, title: t("item2Title"), desc: t("item2Desc") },
    { id: 3, title: t("item3Title"), desc: t("item3Desc") },
  ];

  return (
    <section id="partnership" className="relative overflow-hidden py-10 md:py-12.5 lg:py-27.5 bg-[#0a0a0a] scroll-mt-20 lg:scroll-mt-24">
      <div className="absolute inset-0 z-0">
        <PartnershipVideoBg />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <Container className="relative z-10 flex flex-col items-center gap-5 md:gap-7.5 lg:gap-15">
        <p className="font-sans font-bold text-[#D9D9D9] text-[14px] leading-[130%] text-center md:font-display md:font-normal md:text-white md:text-[18px] md:leading-tight md:uppercase lg:font-sans lg:normal-case lg:font-bold lg:text-[#D9D9D9] lg:text-[20px] lg:leading-[130%] lg:max-w-233.75">
          {t("intro1")}
          {" "}
          {t("intro2")}
        </p>

        <PartnershipSlider items={items} />
      </Container>
    </section>
  );
}