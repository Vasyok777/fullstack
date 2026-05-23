import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui";
import { ServiceVideoBg } from "./video-bg";
import { ArrowDiagonalIcon } from "@/components/icons";

export async function Services() {
  const t = await getTranslations("services");

  const items = [
    { title: t("item1Title"), desc: t("item1Desc"), terms: t("item1Terms"), href: "/services" },
    { title: t("item2Title"), desc: t("item2Desc"), terms: t("item2Terms"), href: "/services" },
    { title: t("item3Title"), desc: t("item3Desc"), terms: t("item3Terms"), href: "/services" },
    { title: t("item4Title"), desc: t("item4Desc"), terms: t("item4Terms"), href: "/services" },
  ];

  return (
    <section className="relative overflow-hidden py-10 md:py-12.5 lg:py-28 border border-black">
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
          <div className="pt-1">
            <span className="text-[22px] md:text-[30px] text-[#6D6D6D] font-display font-normal leading-normal uppercase">
              {t("sectionLabel")}
            </span>
          </div>

          {/* Right: service list */}
          <div>
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="group relative flex items-start px-4 py-5 gap-2 md:px-6 md:py-7.5 md:gap-3 lg:gap-5 border-b border-[#3D3D3D]"
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none backdrop-blur-[12.5px] bg-[rgba(12,12,12,0.10)]" />

                {/* Text content */}
                <div className="relative z-10 flex-1 min-w-0 md:pr-17.5 max-w-137.5">
                  <h3 className="text-white group-hover:text-[#D4AF37] transition-colors duration-300 mb-3 text-[22px] md:text-[30px] lg:text-[40px] uppercase leading-normal font-display font-normal">
                    {item.title}
                  </h3>
                  <p className="mb-2 text-[13px] md:text-[14px] text-[#D9D9D9] font-sans font-medium leading-[130%]">
                    {item.desc}
                  </p>
                  <span className="text-[13px] md:text-[14px] font-black text-[#D9D9D9] font-sans leading-[130%]">
                    {item.terms}
                  </span>
                </div>

                {/* Arrow button */}
                <div className="absolute top-2.5 right-2.5 w-10 h-10 md:w-12 md:h-12 lg:w-15 lg:h-15 p-2.9 flex items-center justify-center transition-all duration-300 group-hover:[outline:1px_solid_rgba(212,175,55,0.70)] group-hover:outline-offset-[6px] md:group-hover:outline-offset-10 [background:var(--gradient-gold)]">
                  <ArrowDiagonalIcon />
                </div>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}