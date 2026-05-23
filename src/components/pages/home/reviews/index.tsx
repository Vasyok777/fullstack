import { getTranslations } from "next-intl/server";
import { Container, SectionTitle } from "@/components/ui";
import { ReviewsSlider } from "./reviews-slider";

export async function Reviews() {
  const t = await getTranslations("reviews");

  return (
    <section>
      <Container>
        <SectionTitle>
          {t("title")}
        </SectionTitle>
        <ReviewsSlider />
      </Container>
    </section>
  );
}