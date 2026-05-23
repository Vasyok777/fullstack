import { getTranslations, setRequestLocale } from "next-intl/server";
import { RunLine } from "@/components/sections/run-line";
import {
  Hero,
  Benefits,
  Services,
  Portfolio,
  Contacts,
  Clients,
  Company,
  Reviews,
  Partnership,
} from "@/components/pages/home";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <main className="flex-1 flex pt-18 flex-col gap-10 md:gap-20 lg:gap-36">
      <div className="min-h-[calc(100dvh-4.5rem)] flex flex-col">
        <Hero />
        <div className="mt-auto">
          <RunLine text={t("runLine")} />
        </div>
      </div>
      <Benefits />
      <Services />
      <Portfolio />
      <Company />
      <Partnership />
      <Reviews />
      <Clients />
      <Contacts />
    </main>
  );
}
