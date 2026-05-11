"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui";
import { Flag, type FlagCode } from "@/components/icons/flags";

type Locale = "en" | "ua" | "pl" | "de" | "es" | "ru";
const LOCALES: Locale[] = ["en", "ua", "pl", "de", "es", "ru"];

const NAV: Record<Locale, Record<string, string>> = {
  en: {
    services: "Services",
    portfolio: "Portfolio",
    about: "About us",
    partnership: "Partnership",
    blog: "Blog",
    contacts: "Contacts",
  },
  ua: {
    services: "Послуги",
    portfolio: "Портфоліо",
    about: "Про нас",
    partnership: "Партнерство",
    blog: "Блог",
    contacts: "Контакти",
  },
  pl: {
    services: "Usługi",
    portfolio: "Portfolio",
    about: "O nas",
    partnership: "Partnerstwo",
    blog: "Blog",
    contacts: "Kontakty",
  },
  de: {
    services: "Leistungen",
    portfolio: "Portfolio",
    about: "Über uns",
    partnership: "Partnerschaft",
    blog: "Blog",
    contacts: "Kontakte",
  },
  es: {
    services: "Servicios",
    portfolio: "Portafolio",
    about: "Sobre nosotros",
    partnership: "Asociación",
    blog: "Blog",
    contacts: "Contactos",
  },
  ru: {
    services: "Услуги",
    portfolio: "Портфолио",
    about: "О нас",
    partnership: "Партнёрство",
    blog: "Блог",
    contacts: "Контакты",
  },
};


const PHONES: Record<
  Locale,
  { flag: FlagCode; primary: string; extra: { flag: FlagCode; number: string }[] }
> = {
  en: {
    flag: "en",
    primary: "+1 (647) 283-2846",
    extra: [
      { flag: "es", number: "+(380) 63 682 6299" },
      { flag: "de", number: "+(380) 63 682 6299" },
    ],
  },
  ua: {
    flag: "ua",
    primary: "+(380) 63 682 6299",
    extra: [
      { flag: "en", number: "+1 (647) 283-2846" },
      { flag: "de", number: "+(380) 63 682 6299" },
    ],
  },
  pl: {
    flag: "pl",
    primary: "+(380) 63 682 6299",
    extra: [
      { flag: "en", number: "+1 (647) 283-2846" },
      { flag: "de", number: "+(380) 63 682 6299" },
    ],
  },
  de: {
    flag: "de",
    primary: "+(380) 63 682 6299",
    extra: [
      { flag: "en", number: "+1 (647) 283-2846" },
      { flag: "es", number: "+(380) 63 682 6299" },
    ],
  },
  es: {
    flag: "es",
    primary: "+(380) 63 682 6299",
    extra: [
      { flag: "en", number: "+1 (647) 283-2846" },
      { flag: "de", number: "+(380) 63 682 6299" },
    ],
  },
  ru: {
    flag: "ru",
    primary: "+(380) 63 682 6299",
    extra: [
      { flag: "en", number: "+1 (647) 283-2846" },
      { flag: "de", number: "+(380) 63 682 6299" },
    ],
  },
};

function ArrowDown({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={cn("transition-transform duration-200 shrink-0", open && "rotate-180")}
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHover = useRef(false);

  useEffect(() => {
    isHover.current = window.matchMedia("(hover: hover)").matches;

    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  function open_() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function close_() {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  // Desktop: open only (close via mouseleave); Mobile: toggle
  function toggle() {
    if (isHover.current) open_();
    else setOpen((v) => !v);
  }

  return { open, setOpen, ref, open_, close_, toggle };
}

function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split("/")[1] as Locale;
  return LOCALES.includes(seg) ? seg : "en";
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);

  const locale = getLocaleFromPath(pathname);
  const nav = NAV[locale];
  const phone = PHONES[locale];

  const navItems = [
    { key: "services", href: `/${locale}/services` },
    { key: "portfolio", href: `/${locale}/portfolio` },
    { key: "about", href: `/${locale}/about` },
    { key: "partnership", href: `/${locale}/partnership` },
    { key: "blog", href: `/${locale}/blog` },
    { key: "contacts", href: `/${locale}/contacts` },
  ];

  function switchLocale(next: Locale) {
    const segments = pathname.split("/");
    segments[1] = next;
    startTransition(() => router.push(segments.join("/")));
  }

  const phoneDd = useDropdown();
  const langDd = useDropdown();

  return (
    <>


      <header className="fixed top-0 left-0 right-0 z-50">
        <Container className="max-w-370 h-18 lg:h-23 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href={`/${locale}`} className="shrink-0">
            <Image
              src="/logo.svg"
              alt="Fullstack Innovations"
              width={212}
              height={52}
              className="h-9 lg:h-13 w-auto"
              priority
              placeholder="empty"
              unoptimized
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="whitespace-nowrap cursor-pointer transition-colors"
                style={{
                  color: pathname === item.href ? "var(--brand-accent)" : "#F6F6F6",
                  fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "130%",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = pathname === item.href ? "var(--brand-accent)" : "#F6F6F6")}
              >
                {nav[item.key]}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Phone dropdown */}
            <div
              ref={phoneDd.ref}
              className="relative hidden md:block"
              onMouseEnter={phoneDd.open_}
              onMouseLeave={phoneDd.close_}
            >
              <button
                onClick={phoneDd.toggle}
                className="flex items-center gap-1.5 cursor-pointer"
                style={{
                  color: "#F6F6F6",
                  fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  lineHeight: "130%",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#F6F6F6")}
              >
                <Flag code={phone.flag} />
                <span>{phone.primary}</span>
                <ArrowDown open={phoneDd.open} />
              </button>

              {phoneDd.open && (
                <div
                  className="absolute top-full left-0 mt-3 w-max rounded-xl border shadow-2xl z-50 backdrop-blur flex flex-col gap-3"
                  style={{
                    background: "var(--surface-dropdown)",
                    borderColor: "var(--border-subtle)",
                    padding: "20px",
                  }}
                >
                  {phone.extra.map((p, i) => (
                    <a
                      key={i}
                      href={`tel:${p.number.replace(/[\s()]/g, "")}`}
                      className="flex items-center gap-3 transition-colors cursor-pointer"
                      style={{
                        color: "#F6F6F6",
                        fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                        fontSize: "15px",
                        fontWeight: 700,
                        lineHeight: "130%",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#F6F6F6")}
                    >
                      <Flag code={p.flag} />
                      <span>{p.number}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div
              className="hidden md:block w-px h-4"
              style={{ background: "var(--border-divider)" }}
            />

            {/* Lang switcher */}
            <div
              ref={langDd.ref}
              className="relative"
              onMouseEnter={langDd.open_}
              onMouseLeave={langDd.close_}
            >
              <button
                onClick={langDd.toggle}
                className="flex items-center gap-1 text-sm font-semibold uppercase cursor-pointer"
                style={{ color: "#F6F6F6", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#F6F6F6")}
              >
                {locale}
                <ArrowDown open={langDd.open} />
              </button>

              {langDd.open && (
                <div
                  className="absolute top-full right-0 mt-3 z-50 flex w-12 flex-col items-center gap-2 rounded-[20px] border p-2.5 backdrop-blur-[5px]"
                  style={{
                    background: "var(--surface-glass)",
                    borderColor: "var(--border-accent)",
                  }}
                >
                  {LOCALES.filter((l) => l !== locale).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        langDd.setOpen(false);
                        switchLocale(l);
                      }}
                      className="w-full text-center text-[14px] font-bold leading-[130%] uppercase cursor-pointer"
                      style={{ color: "#F6F6F6", transition: "color 0.2s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#F6F6F6")}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Burger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden transition-colors hover:text-accent ml-1"
              style={{ color: "var(--text-primary)" }}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 top-18 z-40 backdrop-blur-sm flex flex-col px-6 pt-8 pb-10 gap-1 transition-all duration-300 lg:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        style={{ background: "var(--surface-mobile)" }}
      >
        {navItems.map((item) => (
          <a
            key={item.key}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className="text-lg font-medium py-4 border-b transition-colors hover:text-accent cursor-pointer"
            style={{
              color:
                pathname === item.href
                  ? "var(--brand-accent)"
                  : "var(--text-muted)",
              borderColor: "var(--border-faint)",
            }}
          >
            {nav[item.key]}
          </a>
        ))}
        <div className="mt-6 flex items-center gap-3">
          <Flag code={phone.flag} />
          <a
            href={`tel:${phone.primary.replace(/[\s()]/g, "")}`}
            className="text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {phone.primary}
          </a>
        </div>
      </div>
    </>
  );
}
