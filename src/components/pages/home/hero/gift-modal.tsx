"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { CTAButton } from "@/components/ui";

type Props = { onClose: () => void; onQuiz: () => void };

function BulletIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
    >
      <circle cx="11.5" cy="11.5" r="11.5" fill="#D4AF37" fillOpacity="0.2" />
      <circle cx="11.5" cy="11.5" r="7.5" fill="#D4AF37" fillOpacity="0.2" />
      <circle cx="11.5" cy="11.5" r="3.5" fill="#D4AF37" />
    </svg>
  );
}

export function GiftModal({ onClose, onQuiz }: Props) {
  const t = useTranslations("giftModal");
  const features = [t("feature1"), t("feature2"), t("feature3")];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-[954px] border border-[rgba(212,175,55,0.35)] [background:linear-gradient(90deg,rgba(212,175,55,0.08)_0%,rgba(255,218,99,0.08)_100%)] backdrop-blur-2xl flex flex-col items-center gap-6 pt-20 px-7.5 pb-7.5 md:gap-8.5 md:px-15 md:pt-25 md:pb-15"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gift image */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-[-65%] md:translate-y-[-72%] pointer-events-none">
          <Image
            src="/gif.svg"
            alt="gift"
            width={200}
            height={200}
            unoptimized
            className="w-29.5 h-auto md:w-50"
          />
        </div>

        {/* Features */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-5 justify-center items-start md:items-center w-full">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <BulletIcon />
              <span className="font-sans text-[14px] font-bold leading-[130%] uppercase text-[#D9D9D9]">
                {f}
              </span>
            </div>
          ))}
        </div>

        {/* Title */}
        <div>
          <h2 className="font-display mb-1.5 md:mb-3 uppercase text-[22px] md:text-[32px] font-normal leading-normal text-[#D4AF37] text-center max-w-175">
            {t("title")}
          </h2>

          {/* Description */}
          <p className="font-sans text-[14px] font-medium leading-[130%] text-[#D9D9D9] text-left md:text-center">
            {t("description")}
          </p>
        </div>

        {/* CTA */}
        <CTAButton
          onClick={onQuiz}
          className="w-full md:w-auto justify-center"
        >
          {t("cta")}
        </CTAButton>
      </div>
    </div>
  );
}
