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
  { label: "Behance", href: "#", Icon: IconBehance },
  { label: "LinkedIn", href: "#", Icon: IconLinkedIn },
  { label: "Twitter", href: "#", Icon: IconTwitter },
  { label: "Upwork", href: "#", Icon: IconUpwork },
  { label: "Dribbble", href: "#", Icon: IconDribbble },
  { label: "Clutch", href: "#", Icon: IconClutch },
];

export async function FooterSimple() {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-background border-t border-[#363636]">
      <Container>
        {/* Mobile */}
        <div className="flex md:hidden flex-col items-center py-5 gap-5">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Fullstack Innovations"
              width={230}
              height={52}
              unoptimized
              priority
              className="w-52.5"
            />
          </Link>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {SOCIALS.map(({ label, Icon }) => (
              <span
                key={label}
                aria-label={label}
                className="text-white hover:text-[#D4AF37] transition-colors duration-200 cursor-default"
              >
                <Icon />
              </span>
            ))}
          </div>
          <div className="w-full border-t border-white/10 pt-4.5">
            <p className="text-[#D9D9D9] text-sm font-normal leading-[130%] text-center">
              {t("copyright")}
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 items-center py-8">
          <div className="flex items-center gap-4 lg:gap-5">
            {SOCIALS.map(({ label, Icon }) => (
              <span
                key={label}
                aria-label={label}
                className="text-white hover:text-[#D4AF37] transition-colors duration-200 cursor-default"
              >
                <Icon />
              </span>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Fullstack Innovations"
                width={230}
                height={52}
                unoptimized
                priority
                className="w-57.5"
              />
            </Link>
          </div>

          <div className="flex justify-end">
            <p className="text-[#D9D9D9] text-sm font-normal leading-[130%] text-right">
              {t("copyright")}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
