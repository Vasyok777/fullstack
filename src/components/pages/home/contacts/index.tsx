import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui";
import { ContactForm } from "./contact-form";

export async function Contacts() {
  const t = await getTranslations("contactForm");

  const translations = {
    title: t("title"),
    nameLabel: t("nameLabel"),
    emailLabel: t("emailLabel"),
    phoneLabel: t("phoneLabel"),
    messageLabel: t("messageLabel"),
    privacyText: t("privacyText"),
    privacyLink: t("privacyLink"),
    channelLabel: t("channelLabel"),
    submit: t("submit"),
    success: t("success"),
    errorRequired: t("errorRequired"),
    errorEmail: t("errorEmail"),
    chTelegram: t("chTelegram"),
    chWhatsapp: t("chWhatsapp"),
    chViber: t("chViber"),
    chPhone: t("chPhone"),
    chEmail: t("chEmail"),
  };

  return (
    <section
      id="contacts"
      className="relative overflow-hidden py-14 md:py-20 lg:py-28"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/contacts-bg.png"
          alt=""
          fill
          className="object-cover object-right grayscale brightness-[0.35]"
        />
      </div>

      <Container className="relative z-10">
        <div className="max-w-150">
          <ContactForm t={translations} />
        </div>
      </Container>
    </section>
  );
}
