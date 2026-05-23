import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui";
import {
  IconBehance,
  IconLinkedIn,
  IconTwitter,
  IconUpwork,
  IconDribbble,
  IconClutch,
} from "@/components/icons";

const SOCIALS = [
  { label: "Behance", href: "https://behance.net", Icon: IconBehance },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: IconLinkedIn },
  { label: "Twitter", href: "https://twitter.com", Icon: IconTwitter },
  { label: "Upwork", href: "https://upwork.com", Icon: IconUpwork },
  { label: "Dribbble", href: "https://dribbble.com", Icon: IconDribbble },
  { label: "Clutch", href: "https://clutch.co", Icon: IconClutch },
];

export async function FooterSimple() {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-background border-t border-[#363636]">
      <Container>
        <div className="flex flex-col items-center py-8 md:py-10 pt-12.5 gap-5">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Fullstack Innovations"
              width={230}
              height={52}
              unoptimized
              priority
              className="w-52.5 lg:w-57.5"
            />
          </Link>

          <div className="flex items-center gap-4 md:gap-5 flex-wrap justify-center">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white hover:text-[#D4AF37] transition-colors duration-200"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10" />

        <div className="py-8  lg:p-10 lg:pb-14 flex items-center justify-center">
          <p className="text-[#D9D9D9] text-sm font-normal leading-[130%]">
            {t("copyright")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
