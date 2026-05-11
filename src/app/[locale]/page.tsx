import { getTranslations, setRequestLocale } from "next-intl/server";
import { RunLine } from "@/components/sections/run-line";
import { Hero } from "@/components/pages/home";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <main className="flex-1 pt-18">
      <Hero />
      <RunLine text={t("runLine")} />
    </main>
  );
}
