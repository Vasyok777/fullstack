import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui";

const SOCIALS = [
  {
    label: "Behance",
    href: "https://behance.net",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9.5 7H4v10h5.5c2.2 0 4-1.8 4-4 0-1.1-.4-2.1-1.1-2.8.4-.6.6-1.3.6-2C13 8.3 11.4 7 9.5 7zm0 4H6.5V9.5h3c.8 0 1.5.7 1.5 1.5s-.7 1-1.5 1zm.5 4H6.5v-2h3.5c.8 0 1.5.7 1.5 1.5S10.8 15 10 15zM15.5 9.5h5v1.5h-5V9.5zM18 11c-1.9 0-3.5 1.6-3.5 3.5S16.1 18 18 18s3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5zm0 5.5c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M6.5 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM5.5 10h2v8.5h-2V10zM9.5 10h2v1.2c.5-.8 1.5-1.4 2.5-1.4 2 0 3.5 1.6 3.5 3.5v5.2h-2V13.5c0-1-.9-1.8-2-1.8s-2 .8-2 1.8v5H9.5V10z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 005.001-1.721 4.036 4.036 0 01-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 01-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 01-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 008.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 014.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 002.556-.973 4.02 4.02 0 01-1.771 2.22 8.073 8.073 0 002.319-.624 8.645 8.645 0 01-2.019 2.083z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Upwork",
    href: "https://upwork.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M17.46 13.5c-.98 0-1.9-.4-2.64-1.03L15.5 9h4.5v4.13c-.74.25-1.6.37-2.54.37zM12 9l-.76 3.9C10.58 14.4 9.4 15.5 8 15.5c-1.93 0-3.5-1.57-3.5-3.5S6.07 8.5 8 8.5c.79 0 1.5.27 2.06.73L12 9zm5.46 6.5c1.47 0 2.83-.5 3.87-1.33L21 17.5h-2l-.44-1.26a6.5 6.5 0 01-1.1.26v1H15.5v-1a6.5 6.5 0 01-3.04-1.57A5.5 5.5 0 018 17C5.24 17 3 14.76 3 12s2.24-5 5-5a5 5 0 014.96 4.44L13.5 7H16l-.28 1.38A5.46 5.46 0 0117.46 15.5z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.6 4.93c1.3 1.56 2.1 3.55 2.1 5.72 0 .3-.3.55-.6.55-.6 0-2.7-.45-4.8-.2-1-2.7-1.8-4.8-2.1-5.5 1.9.44 3.5 1.4 4.4 2.43H18.6zM12 4.3c.3 0 .6 0 .9.05.3.8 1.2 2.95 2.1 5.6-2.65.7-4.99.7-5.28.7H4.7C5.4 7.43 8.4 4.3 12 4.3zM4.3 12c0-.15 0-.3.05-.45h.15c.3 0 3.1-.05 6.05-.85.15.3.3.6.45.9-3.05.85-5.75 3.05-6.45 3.65A7.91 7.91 0 014.3 12zm7.7 7.7c-2.35 0-4.5-.85-6.1-2.25.6-.55 3.05-2.65 6.4-3.6.05 0 .1-.05.15-.05 1 2.6 1.45 4.8 1.55 5.6-.65.2-1.3.3-2 .3zm3.9-1.15c-.15-.85-.55-2.9-1.45-5.4 1.9-.3 3.65.2 3.9.25-.55 2.2-1.6 4.05-2.45 5.15z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Clutch",
    href: "https://clutch.co",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5c-1.1.9-2.5 1.5-4.1 1.5-3.6 0-6.4-2.9-6.4-6.5S8.8 5 12.4 5c1.6 0 3 .6 4.1 1.5l-1.6 2c-.7-.6-1.5-.9-2.5-.9-2.1 0-3.8 1.7-3.8 3.9s1.7 3.9 3.8 3.9c1 0 1.8-.3 2.5-.9l1.6 2z" fill="currentColor"/>
      </svg>
    ),
  },
];

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-background border-t border-white/10">
      <Container>
        <div className="flex flex-col items-center py-8 md:py-10 gap-5">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Fullstack Innovations"
              width={160}
              height={50}
              unoptimized
              priority
            />
          </Link>

          {/* Social icons */}
          <div className="flex items-center gap-5 md:gap-6">
            {SOCIALS.map((s) => (
              <span
                key={s.label}
                aria-label={s.label}
                className="text-white/50 hover:text-white transition-colors duration-200 cursor-default"
              >
                {s.icon}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Copyright */}
        <div className="py-4 flex justify-center">
          <p className="text-white/35 font-sans text-[12px]">
            {t("copyright")}
          </p>
        </div>
      </Container>
    </footer>
  );
}