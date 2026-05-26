"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
// import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui";
import { Flag, type FlagCode } from "@/components/icons/flags";

type Locale = "ua" | "ru" | "en";
const LOCALES: Locale[] = ["ua", "ru", "en"];
const NON_DEFAULT: Locale[] = ["ru", "en"];

const NAV: Record<Locale, Record<string, string>> = {
  ua: { services: "Послуги", portfolio: "Портфоліо", about: "Про нас", partnership: "Партнерство", contacts: "Контакти" },
  ru: { services: "Услуги", portfolio: "Портфолио", about: "О нас", partnership: "Партнёрство", contacts: "Контакты" },
  en: { services: "Services", portfolio: "Portfolio", about: "About us", partnership: "Partnership", contacts: "Contacts" },
};

const PHONES: Record<
  Locale,
  { flag: FlagCode; primary: string; extra: { flag: FlagCode; number: string }[] }
> = {
  ua: { flag: "ua", primary: "+(380) 67 835 8568", extra: [] },
  ru: { flag: "ru", primary: "+(380) 67 835 8568", extra: [] },
  en: { flag: "en", primary: "+(380) 67 835 8568", extra: [] },
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
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
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

  function toggle() {
    if (isHover.current) open_();
    else setOpen((v) => !v);
  }

  return { open, setOpen, ref, open_, close_, toggle };
}

function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split("/")[1] as Locale;
  return NON_DEFAULT.includes(seg) ? seg : "ua";
}


export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const locale = getLocaleFromPath(pathname);
  const nav = NAV[locale];
  const phone = PHONES[locale];

  const navItems = [
    { key: "services", href: "#services" },
    { key: "portfolio", href: "#portfolio" },
    { key: "about", href: "#about" },
    { key: "partnership", href: "#partnership" },
    { key: "contacts", href: "#contacts" },
  ];

  const langDd = useDropdown();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={cn("fixed top-0 left-0 right-0 z-50 transition-[backdrop-filter,background-color] duration-300", scrolled && "backdrop-blur-md bg-background/70")}>
        <Container className="max-w-370 h-18 lg:h-23 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href={locale === "ua" ? "/" : `/${locale}`} className="shrink-0">
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
                className={cn(
                  "whitespace-nowrap cursor-pointer font-sans text-[18px] font-medium leading-[130%] transition-colors duration-200 hover:text-[#D4AF37]",
                  pathname === item.href ? "text-[#D4AF37]" : "text-[#F6F6F6]"
                )}
              >
                {nav[item.key]}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Phone */}
            <a
              href="tel:+380678358568"
              className="hidden md:flex items-center gap-1.5 font-sans text-[15px] font-bold leading-[130%] text-[#F6F6F6] transition-colors duration-200 hover:text-[#D4AF37]"
            >
              <Flag code="ua" />
              <span>+(380) 67 835 8568</span>
            </a>

            {/* Divider */}
            <div className="hidden md:block w-px h-4 [background:var(--border-divider)]" />

            {/* Lang switcher */}
            <div
              ref={langDd.ref}
              className="relative"
              onMouseEnter={langDd.open_}
              onMouseLeave={langDd.close_}
            >
              <button
                onClick={langDd.toggle}
                className="flex items-center gap-1 text-sm font-semibold uppercase cursor-pointer text-[#F6F6F6] transition-colors duration-200 hover:text-[#D4AF37]"
              >
                {locale}
                <ArrowDown open={langDd.open} />
              </button>

              {langDd.open && (
                <div className="absolute top-full right-0 mt-3 z-50 flex w-12 flex-col items-center gap-2 rounded-[20px] border border-[var(--border-accent)] p-2.5 backdrop-blur-[5px] [background:var(--surface-glass)]">
                  {LOCALES.filter((l) => l !== locale).map((l) => (
                    <a
                      key={l}
                      href={l === "ua" ? "/" : `/${l}`}
                      className="w-full text-center text-[14px] font-bold leading-[130%] uppercase cursor-pointer text-[#F6F6F6] transition-colors duration-200 hover:text-[#D4AF37]"
                    >
                      {l}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Burger */}
            {/* <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden transition-colors hover:text-accent ml-1 text-[var(--text-primary)]"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button> */}
          </div>
        </Container>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 top-18 z-40 backdrop-blur-sm flex flex-col px-6 pt-8 pb-10 gap-1 transition-all duration-300 lg:hidden [background:var(--surface-mobile)]",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {navItems.map((item) => (
          <a
            key={item.key}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "text-lg font-medium py-4 border-b transition-colors hover:text-accent cursor-pointer border-[var(--border-faint)]",
              pathname === item.href ? "text-[var(--brand-accent)]" : "text-[var(--text-muted)]"
            )}
          >
            {nav[item.key]}
          </a>
        ))}
        <div className="mt-6 flex items-center gap-3">
          <Flag code={phone.flag} />
          <a
            href={`tel:${phone.primary.replace(/[\s()]/g, "")}`}
            className="text-sm text-[var(--text-muted)]"
          >
            {phone.primary}
          </a>
        </div>
      </div>
    </>
  );
}