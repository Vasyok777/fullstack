import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container, SectionTitle } from "@/components/ui";
import { MapPins } from "./map-pins";

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
            src="/home/map.svg"
            alt=""
            fill
            className="object-contain object-center select-none pointer-events-none"
            unoptimized
          />

          <MapPins />


        </div>
      </Container>
    </section>
  );
}
