import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  return (
    <main className="flex-1 pt-18 lg:pt-23">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-white uppercase">
          {t("about")}
        </h1>
      </section>
    </main>
  );
}