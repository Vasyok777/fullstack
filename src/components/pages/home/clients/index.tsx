import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container, CircleOfferButton, SectionTitle } from "@/components/ui";

export async function Clients() {
  const t = await getTranslations("clients");

  return (
    <section>
      <Container>
        <SectionTitle>
          {t("title")}
        </SectionTitle>

        <div className="relative w-full aspect-2/1">
          <Image
            src="/home/map.png"
            alt=""
            fill
            className="object-contain object-center select-none pointer-events-none"
            unoptimized
          />

          <div className="absolute hidden md:block left-[34%] top-[67%] -translate-x-1/2 -translate-y-1/2">
            <CircleOfferButton href="#contacts" label={t("getOffer")} />
          </div>
        </div>
      </Container>
    </section>
  );
}
