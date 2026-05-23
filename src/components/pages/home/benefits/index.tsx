import { getTranslations } from "next-intl/server";
import { Container, SectionTitle, CTAButton } from "@/components/ui";
import { BenefitsSlider, InstallmentIcon, SeoIcon, RocketIcon } from "./benefit-card";

export async function Benefits() {
  const t = await getTranslations("benefits");

  const cards = [
    {
      image: "/home/benefits/installment.jpg",
      video: "/home/benefits/installment.mp4",
      Icon: InstallmentIcon,
      title: t("card1Title"),
      desc: t("card1Desc"),
    },
    {
      image: "/home/benefits/seo.jpg",
      video: "/home/benefits/seo.mp4",
      Icon: SeoIcon,
      title: t("card2Title"),
      desc: t("card2Desc"),
    },
    {
      image: "/home/benefits/support.jpg",
      video: "/home/benefits/support.mp4",
      Icon: RocketIcon,
      title: t("card3Title"),
      desc: t("card3Desc"),
    },
  ];

  return (
    <section className="">
      <Container>
        <div className="flex items-start justify-between gap-6 mb-8 md:mb-10 lg:mb-12.5">
          <SectionTitle className="mb-0 md:mb-0">{t("title")}</SectionTitle>
          <CTAButton
            href="#contacts"
            className="hidden md:inline-flex cta-btn-outline"
          >
            {t("cta")}
          </CTAButton>
        </div>

        <BenefitsSlider cards={cards.map((c) => ({ ...c, href: "#contacts" }))} />

        <div className="mt-5 md:hidden">
          <CTAButton
            href="#contacts"
            className="cta-btn-outline w-full justify-center"
          >
            {t("cta")}
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
