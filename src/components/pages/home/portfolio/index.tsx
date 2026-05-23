import { getTranslations } from "next-intl/server";
import { Container, SectionTitle } from "@/components/ui";
import { CTAButton } from "@/components/ui";
import { PortfolioSlider } from "./portfolio-slider";

const ITEMS = [
  {
    id: 1,
    image: "/portfolio/1.jpg",
    name: "CHINASES SUSHI ROLL",
    category: "App Development",
    href: "#",
  },
  {
    id: 2,
    image: "/portfolio/2.jpg",
    name: "TIMES EVENT",
    category: "Web Development",
    href: "#",
  },
  {
    id: 3,
    image: "/portfolio/3.jpg",
    name: "KRAKEN",
    category: "Branding",
    href: "#",
  },
  {
    id: 4,
    image: "/portfolio/1.jpg",
    name: "CHINASES SUSHI ROLL",
    category: "App Development",
    href: "#",
  },
  {
    id: 5,
    image: "/portfolio/2.jpg",
    name: "TIMES EVENT",
    category: "Web Development",
    href: "#",
  },
  {
    id: 6,
    image: "/portfolio/3.jpg",
    name: "KRAKEN",
    category: "Branding",
    href: "#",
  },
  {
    id: 7,
    image: "/portfolio/1.jpg",
    name: "CHINASES SUSHI ROLL",
    category: "App Development",
    href: "#",
  },
];

export async function Portfolio() {
  const t = await getTranslations("portfolio");

  return (
    <section id="portfolio">
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
