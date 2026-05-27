import { getTranslations } from "next-intl/server";
import { Container, SectionTitle } from "@/components/ui";
import { CTAButton } from "@/components/ui";
import { PortfolioSlider } from "./portfolio-slider";

const ITEMS = [
  {
    id: 1,
    image: "/portfolio/dressinupartatelier_1.png",
    name: "DRESSING UP",
    category: "Веб-розробка",
    href: "https://dressinupartatelier.com/",
  },
  {
    id: 2,
    image: "/portfolio/yufglass_2.png",
    name: "YUF GLASS",
    category: "Веб-розробка",
    href: "https://www.yufglass.com/",
  },
  {
    id: 3,
    image: "/portfolio/skm-music_3.png",
    name: "SKM MUSIC",
    category: "Веб-розробка",
    href: "https://skm-music.com.ua/",
  },
  {
    id: 4,
    image: "/portfolio/baylap_4.png",
    name: "BAYLAP",
    category: "Веб-розробка",
    href: "https://baylap.com/",
  },
  {
    id: 5,
    image: "/portfolio/litfad_5.png",
    name: "LITFAD",
    category: "Веб-розробка",
    href: "https://www.litfad.com/",
  },
  {
    id: 6,
    image: "/portfolio/idol_6.png",
    name: "IDOL",
    category: "Веб-розробка",
    href: "https://www.idol.cz/en/",
  },
  {
    id: 7,
    image: "/portfolio/lakiq_7.png",
    name: "LAKIQ",
    category: "Веб-розробка",
    href: "https://www.lakiq.com/",
  },
];

export async function Portfolio() {
  const t = await getTranslations("portfolio");

  return (
    <section id="portfolio" className="scroll-mt-20 lg:scroll-mt-24">
      <Container>
        <div className="flex items-start md:items-center justify-between">
          <SectionTitle className="mb-0 md:mb-0">{t("title")}</SectionTitle>
          <CTAButton
            href="#contacts"
            className="hidden md:inline-flex cta-btn-outline"
          >
            {t("cta")}
          </CTAButton>
        </div>

        <div className="mt-8">
          <PortfolioSlider items={ITEMS} visitSiteLabel={t("visitSite")} />
        </div>

        <div className="mt-5 md:hidden">
          <CTAButton
            href="#contacts"
            className="cta-btn-outline w-full justify-center max-md:justify-between"
          >
            {t("cta")}
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
